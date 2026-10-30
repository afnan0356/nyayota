/**
 * Nyayota AI — Contextual Reference Resolver (Phase 6B)
 * 
 * Resolves anaphoric pronouns, elliptical questions, comparative provisions,
 * and jurisdiction inquiries using the bounded ConversationContext:
 * 
 * Capabilities:
 * - Understands references across English, Bengali, and Banglish:
 *   "it", "that law", "this section", "its punishment", "এর শাস্তি কী?", "shasti ki?",
 *   "what about exceptions?", "ব্যতিক্রম কি?", "explain more simply", "সহজ করে বলুন",
 *   "what happens if under 18?", "compare with the previous section".
 * - Multi-reference disambiguation: If multiple provisions were previously compared
 *   (e.g. Article 102 vs Article 32), singular pronouns trigger clarification rather than guessing.
 * - Sequential provision awareness: Resolves against the latest discussed provision, not older ones.
 * - Jurisdiction awareness: Identifies international scope questions and foreign legal systems.
 * - Strict grounding: Never hallucinates missing statutes or provisions.
 */

import { ConversationContext, ResolvedContext, LegalJurisdiction } from './types';
import { normalizeConversationalText } from './language-detector';

// Pronoun & demonstrative reference markers
const PRONOUN_REFERENCE_REGEX = /\b(it|its|that|that law|this law|that act|this act|that section|this section|that article|this article|that provision|this provision|the previous one|the former|the latter|this|these|under this)\b|এই আইন|ঐ আইন|এই ধারা|ঐ ধারা|এই অনুচ্ছেদ|ঐ অনুচ্ছেদ|পূর্ববর্তী ধারা|আগের ধারা|এর|ইহার|উহার/i;

// Follow-up intention patterns
const PUNISHMENT_REGEX = /\b(punishment|penalty|fine|sentence|imprisonment|jail term|how many years|what is the punishment|what about the punishment|its punishment|punishment ki|shasti|sasti|shasti ki|sasti ki)\b|শাস্তি|দণ্ড|দন্ড|কারাদণ্ড|জরিমানা|শাস্তি কি|দণ্ড কি|এর শাস্তি কী/i;
const EXCEPTION_REGEX = /\b(exception|exceptions|is there an exception|are there any exceptions|any defense|defenses|any relief|kono exception|exception ache)\b|ব্যতিক্রম|ব্যতিক্রম আছে কি|ব্যতিক্রমগুলো কি|কোন ব্যতিক্রম আছে/i;
const SIMPLIFICATION_REGEX = /\b(explain that again|explain again|explain more simply|explain that more simply|in simple words|in plain english|simpler language|make it simple|can you simplify|sohoj kore|shohoj|sohoj bhashay)\b|সহজ ভাষায় বলুন|সহজ করে বলুন|আবার বলুন|সহজ ভাষায় ব্যাখ্যা|সহজ বাংলায়/i;
const AGE_CONDITION_REGEX = /\b(under 18|minor|child|juvenile|below 18|eighteen|age of consent|শিশু|নাবালক|১৮ বছরের নিচে|১৮ বছর)/i;
const COMPARISON_REGEX = /\b(compare|comparison|difference between|compare with the previous|compare with section|compare with article|আগের ধারার সাথে তুলনা|তুলনা|পার্থক্য)/i;
const JURISDICTION_SCOPE_REGEX = /\b(does this apply internationally|apply internationally|international law|other country|another country|in another country|foreign country|what about other countries|does this apply in|outside bangladesh|in the us|in the uk|in india)\b|আন্তর্জাতিকভাবে কি প্রযোজ্য|অন্য দেশে|বিদেশে কি প্রযোজ্য|যুক্তরাষ্ট্রে কি|যুক্তরাজ্যে কি/i;

/**
 * Resolves references in a query using the conversation context.
 */
export function resolveContextualReference(
  query: string,
  context: ConversationContext
): ResolvedContext {
  const norm = normalizeConversationalText(query);

  const hasPronoun = PRONOUN_REFERENCE_REGEX.test(norm);
  const hasPunishment = PUNISHMENT_REGEX.test(norm);
  const hasException = EXCEPTION_REGEX.test(norm);
  const hasSimplification = SIMPLIFICATION_REGEX.test(norm);
  const hasAgeCondition = AGE_CONDITION_REGEX.test(norm);
  const hasComparison = COMPARISON_REGEX.test(norm);
  const hasJurisdictionScope = JURISDICTION_SCOPE_REGEX.test(norm);

  const isFollowUpPattern =
    hasPronoun ||
    hasPunishment ||
    hasException ||
    hasSimplification ||
    hasAgeCondition ||
    hasComparison ||
    hasJurisdictionScope ||
    /^what about\b/i.test(norm) ||
    /^and what if\b/i.test(norm) ||
    /^what if\b/i.test(norm) ||
    /^how about\b/i.test(norm) ||
    /^তারপরে কি\b/i.test(norm) ||
    /^তাহলে কি\b/i.test(norm);

  // If query is an independent, complete query that explicitly specifies its own provision
  const containsExplicitProvision =
    /(?:section|sec\.?|s\.|ধারা|article|art\.?|অনুচ্ছেদ)\s*\d+/i.test(norm);
  const containsExplicitStatute =
    /(penal code|crpc|cpc|constitution|labor act|evidence act|contract act|দণ্ডবিধি|কার্যবিধি|সংবিধান)/i.test(norm);

  // Check if we have context in conversation history
  const activeRef = context.activeReference;
  const hasContextAct = Boolean(context.activeAct?.title || activeRef?.actTitle);
  const hasContextSection = Boolean(context.activeSection || activeRef?.sectionOrArticle);
  const hasContextTopic = Boolean(context.currentTopic || activeRef?.topic);
  const hasAnyContext = hasContextAct || hasContextSection || hasContextTopic;

  // Standalone complete legal query (e.g. "Section 302 of Penal Code" or standalone "Section 302 er shasti ki?" in fresh session)
  if (containsExplicitProvision && !hasComparison && !hasPronoun && !hasSimplification && (!hasAnyContext || containsExplicitStatute)) {
    return {
      isResolved: true,
      referenceType: 'none',
      resolutionConfidence: 1.0,
      resolutionNote: 'Query contains explicit legal provision and does not depend on prior context.',
    };
  }

  // Determine reference type
  let referenceType: ResolvedContext['referenceType'] = 'none';
  if (hasJurisdictionScope) referenceType = 'jurisdiction_scope';
  else if (hasSimplification) referenceType = 'simplification';
  else if (hasPunishment) referenceType = 'punishment';
  else if (hasException) referenceType = 'exception';
  else if (hasAgeCondition) referenceType = 'age_condition';
  else if (hasComparison) referenceType = 'comparison';
  else if (hasPronoun) referenceType = 'pronoun';
  else if (isFollowUpPattern) referenceType = 'continuation';

  // Case 1: Ambiguous Multi-Reference in Comparison
  // If user previously compared two provisions (e.g. Article 102 and Article 32)
  // and now asks "What about its limitations?" or "What is the punishment?" using a singular pronoun
  if (context.isMultiReferenceComparison && context.ambiguousReferences && context.ambiguousReferences.length > 1) {
    const isSingularFollowUp = hasPronoun || hasPunishment || hasException || /^what about (its|the) limitations/i.test(norm);
    const mentionsSpecificRef = context.ambiguousReferences.some((r) =>
      r.sectionOrArticle && norm.toLowerCase().includes(r.sectionOrArticle.toLowerCase())
    );

    if (isSingularFollowUp && !mentionsSpecificRef) {
      return {
        isResolved: false,
        referenceType,
        isAmbiguousMultiReference: true,
        competingReferences: context.ambiguousReferences,
        resolutionConfidence: 0.3,
        resolutionNote: `Ambiguous reference: multiple provisions were compared (${context.ambiguousReferences.map((r) => r.sectionOrArticle).join(', ')}). Clarification required.`,
      };
    }
  }

  // Case 2: Elliptical follow-up WITH antecedent context available
  if ((isFollowUpPattern || (containsExplicitProvision && !containsExplicitStatute)) && hasAnyContext) {
    const actTitle = activeRef?.actTitle || context.activeAct?.title || '';
    let section = activeRef?.sectionOrArticle || context.activeSection || '';
    const topic = activeRef?.topic || context.currentTopic || '';
    const jurisdiction = (activeRef?.jurisdiction || context.activeJurisdiction || 'Bangladesh') as LegalJurisdiction;

    // If query itself introduces a new section under the same active statute (e.g. "Now explain Section 304")
    const explicitSecMatch = norm.match(/(?:section|sec\.?|s\.|ধারা)\s*(\d+[a-z]?)/i);
    const explicitArtMatch = norm.match(/(?:article|art\.?|অনুচ্ছেদ)\s*(\d+[a-z]?)/i);
    if (explicitSecMatch) {
      section = `Section ${explicitSecMatch[1]}`;
    } else if (explicitArtMatch) {
      section = `Article ${explicitArtMatch[1]}`;
    }

    let synthesizedQuery = query;

    if (referenceType === 'punishment') {
      synthesizedQuery = `${actTitle} ${section} punishment penalty শাস্তি`.trim();
    } else if (referenceType === 'exception') {
      synthesizedQuery = `${actTitle} ${section} exceptions defenses ব্যতিক্রম`.trim();
    } else if (referenceType === 'simplification') {
      synthesizedQuery = `${actTitle} ${section} plain language explanation সহজ ব্যাখ্যা`.trim();
    } else if (referenceType === 'age_condition') {
      synthesizedQuery = `${actTitle} ${section} minor under 18 child provisions নাবালক শিশু`.trim();
    } else if (referenceType === 'jurisdiction_scope') {
      synthesizedQuery = `${actTitle} ${section} international scope application`.trim();
    } else if (referenceType === 'comparison') {
      // Check if comparing with "previous section"
      if (/previous|আগের ধারা|পূর্ববর্তী/i.test(norm) && section) {
        const secDigits = parseInt(section.replace(/\D/g, ''), 10);
        const prevSec = secDigits > 1 ? `Section ${secDigits - 1}` : section;
        synthesizedQuery = `${actTitle} ${section} and ${prevSec} comparison difference`.trim();
      } else {
        synthesizedQuery = `${actTitle} ${section} comparison`.trim();
      }
    } else if (hasPronoun && (actTitle || section)) {
      synthesizedQuery = `${actTitle} ${section} ${query.replace(PRONOUN_REFERENCE_REGEX, '').trim()}`.trim();
    } else if (containsExplicitProvision && !containsExplicitStatute && actTitle) {
      // User asked "Now explain Section 304" while Penal Code is active
      synthesizedQuery = `${actTitle} ${section}`.trim();
    }

    return {
      isResolved: true,
      resolvedAct: actTitle || undefined,
      resolvedSection: section || undefined,
      resolvedTopic: topic || undefined,
      resolvedJurisdiction: jurisdiction,
      referenceType,
      synthesizedQuery: synthesizedQuery || query,
      resolutionConfidence: 0.9,
      resolutionNote: `Resolved reference using active turn context (${actTitle} ${section})`,
    };
  }

  // Case 3: Elliptical follow-up WITHOUT antecedent context available
  if (isFollowUpPattern && !hasAnyContext) {
    if (referenceType === 'jurisdiction_scope') {
      return {
        isResolved: true,
        referenceType: 'jurisdiction_scope',
        resolvedJurisdiction: 'Other',
        resolutionConfidence: 0.9,
        resolutionNote: 'Query inquires about international or foreign jurisdiction scope without requiring prior context.',
      };
    }

    return {
      isResolved: false,
      referenceType,
      resolutionConfidence: 0.2,
      resolutionNote: 'Query refers to an antecedent or pronoun, but no prior context exists in this session.',
    };
  }

  // Case 4: Standard query, no anaphora detected
  return {
    isResolved: true,
    referenceType: 'none',
    resolutionConfidence: 0.8,
    resolutionNote: 'Query does not contain anaphoric references.',
  };
}
