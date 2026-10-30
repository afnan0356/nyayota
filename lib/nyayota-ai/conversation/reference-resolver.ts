/**
 * Nyayota AI — Contextual Reference Resolver
 * 
 * Resolves anaphoric pronouns, elliptical questions, and follow-up topics
 * using the bounded ConversationContext:
 * - Understands references like "it", "that law", "this section", "its punishment",
 *   "explain more simply", "what are the exceptions", "what happens if under 18".
 * - If antecedent context exists: resolves cleanly into a concrete legal inquiry.
 * - If NO context exists: flags as unresolved ambiguous request so clarification can be asked.
 * - Strictly avoids hallucinating missing context or guessing arbitrary statutes.
 */

import { ConversationContext, ResolvedContext } from './types';
import { normalizeConversationalText } from './language-detector';

// Pronoun & demonstrative reference markers
const PRONOUN_REFERENCE_REGEX = /\b(it|its|that|that law|this law|that act|this act|that section|this section|that provision|this provision|the previous one|the former|the latter)\b|এই আইন|ঐ আইন|এই ধারা|ঐ ধারা|পূর্ববর্তী ধারা|আগের ধারা/i;

// Follow-up intention patterns
const PUNISHMENT_REGEX = /\b(punishment|penalty|fine|sentence|imprisonment|jail term|how many years|what is the punishment|what about the punishment|its punishment|punishment ki|shasti|sasti)\b|শাস্তি|দণ্ড|দন্ড|কারাদণ্ড|জরিমানা|শাস্তি কি|দণ্ড কি/i;
const EXCEPTION_REGEX = /\b(exception|exceptions|is there an exception|are there any exceptions|any defense|defenses|any relief)\b|ব্যতিক্রম|ব্যতিক্রম আছে কি|ব্যতিক্রমগুলো কি/i;
const SIMPLIFICATION_REGEX = /\b(explain that again|explain again|explain more simply|explain that more simply|in simple words|in plain english|simpler language|make it simple|can you simplify|sohoj kore|shohoj)\b|সহজ ভাষায় বলুন|সহজ করে বলুন|আবার বলুন|সহজ ভাষায় ব্যাখ্যা/i;
const AGE_CONDITION_REGEX = /\b(under 18|minor|child|juvenile|below 18|eighteen|age of consent|শিশু|নাবালক|১৮ বছরের নিচে|১৮ বছর)/i;
const COMPARISON_REGEX = /\b(compare|comparison|difference between|compare with the previous|compare with section|আগের ধারার সাথে তুলনা|তুলনা)/i;

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

  const isFollowUpPattern =
    hasPronoun ||
    hasPunishment ||
    hasException ||
    hasSimplification ||
    hasAgeCondition ||
    hasComparison ||
    /^what about\b/i.test(norm) ||
    /^and what if\b/i.test(norm) ||
    /^what if\b/i.test(norm) ||
    /^how about\b/i.test(norm) ||
    /^তারপরে কি\b/i.test(norm) ||
    /^তাহলে কি\b/i.test(norm);

  // If query is an independent, complete query that contains its own Act or Section
  const containsExplicitProvision =
    /(?:section|sec\.?|s\.|ধারা|article|art\.?|অনুচ্ছেদ)\s*\d+/i.test(norm) ||
    /(penal code|crpc|cpc|constitution|labor act|evidence act|contract act|দণ্ডবিধি|কার্যবিধি|সংবিধান)/i.test(norm);

  if (containsExplicitProvision && !hasComparison && !hasPronoun && !hasSimplification) {
    return {
      isResolved: true,
      referenceType: 'none',
      resolutionConfidence: 1.0,
      resolutionNote: 'Query contains explicit legal provision or statute without relying on prior context.',
    };
  }

  // Determine reference type
  let referenceType: ResolvedContext['referenceType'] = 'none';
  if (hasSimplification) referenceType = 'simplification';
  else if (hasPunishment) referenceType = 'punishment';
  else if (hasException) referenceType = 'exception';
  else if (hasAgeCondition) referenceType = 'age_condition';
  else if (hasComparison) referenceType = 'comparison';
  else if (hasPronoun) referenceType = 'pronoun';
  else if (isFollowUpPattern) referenceType = 'continuation';

  // Check if we have context in conversation history
  const hasContextAct = Boolean(context.activeAct?.title);
  const hasContextSection = Boolean(context.activeSection);
  const hasContextTopic = Boolean(context.currentTopic);

  const hasAnyContext = hasContextAct || hasContextSection || hasContextTopic;

  // Case 1: Elliptical follow-up WITH antecedent context available
  if (isFollowUpPattern && hasAnyContext) {
    const actTitle = context.activeAct?.title || '';
    const section = context.activeSection || '';
    const topic = context.currentTopic || '';

    let synthesizedQuery = query;

    if (referenceType === 'punishment') {
      synthesizedQuery = `${actTitle} ${section} punishment penalty`.trim();
    } else if (referenceType === 'exception') {
      synthesizedQuery = `${actTitle} ${section} exceptions defenses`.trim();
    } else if (referenceType === 'simplification') {
      synthesizedQuery = `${actTitle} ${section} plain language explanation`.trim();
    } else if (referenceType === 'age_condition') {
      synthesizedQuery = `${actTitle} ${section} minor under 18 child provisions`.trim();
    } else if (referenceType === 'comparison') {
      synthesizedQuery = `${actTitle} ${section} comparison`.trim();
    } else if (hasPronoun && (actTitle || section)) {
      synthesizedQuery = `${actTitle} ${section} ${query.replace(PRONOUN_REFERENCE_REGEX, '').trim()}`.trim();
    }

    return {
      isResolved: true,
      resolvedAct: actTitle || undefined,
      resolvedSection: section || undefined,
      resolvedTopic: topic || undefined,
      resolvedJurisdiction: context.activeJurisdiction || 'Bangladesh',
      referenceType,
      synthesizedQuery: synthesizedQuery || query,
      resolutionConfidence: 0.9,
      resolutionNote: `Resolved reference using prior turn context (${actTitle} ${section})`,
    };
  }

  // Case 2: Elliptical follow-up WITHOUT antecedent context available (ambiguous request)
  if (isFollowUpPattern && !hasAnyContext) {
    return {
      isResolved: false,
      referenceType,
      resolutionConfidence: 0.2,
      resolutionNote: 'Query refers to an antecedent or pronoun, but no prior context exists in this session.',
    };
  }

  // Case 3: Standard query, no anaphora detected
  return {
    isResolved: true,
    referenceType: 'none',
    resolutionConfidence: 0.8,
    resolutionNote: 'Query does not contain anaphoric references.',
  };
}
