/**
 * Nyayota AI — Conversational Intent Detector (Phase 6A)
 * 
 * Accurately categorizes queries into the 7 core conversational intents:
 * 1. casual_conversation (greetings, pleasantries, thanks)
 * 2. platform_question (features, capabilities, reporting errors)
 * 3. legal_research (statutes, provisions, doctrines)
 * 4. legal_follow_up (context-grounded questions)
 * 5. general_explanation (broad legal theory, civil vs criminal, jurisdiction)
 * 6. ambiguous_request (underspecified questions lacking context)
 * 7. out_of_scope (coding, weather, trivia, recipes, movies)
 * 
 * Strict Discipline:
 * - Greetings must not trigger legal retrieval.
 * - Single isolated keywords (e.g. "law", "code", "rule") in casual contexts do NOT trigger retrieval.
 * - Follow-up questions without antecedent context are treated as ambiguous requests.
 */

import { ConversationalIntent, ConversationContext, ResolvedContext } from './types';
import { normalizeConversationalText } from './language-detector';
import { resolveContextualReference } from './reference-resolver';

// ----------------------------------------------------------------------------
// Regex Pattern Definitions
// ----------------------------------------------------------------------------

// A. Casual conversation
const CASUAL_GREETING_REGEX = /^(hello|hi|hey|greetings|good morning|good afternoon|good evening|assalamu alaikum|salam|namaskar|adab|howdy|what's up|sup)(\s+(there|everyone|nyayota|assistant|friend))?([\s,.:!?]+(how are you|how are you doing|how's it going|hope you are well))?[\s.!?]*$|^(হ্যালো|হাই|আসসালামু আলাইকুম|সালাম|নমস্কার|আদাব|শুভ সকাল|শুভ অপরাহ্ন)([\s,.:!?]+(কেমন আছেন|কেমন আছো))?[\s.!?]*$/i;
const CASUAL_PLEASANTRY_REGEX = /^(how are you|how are you doing|how's it going|how are things|are you doing well)[\s.!?]*$|^(কেমন আছেন|কেমন আছো|কি খবর)[\s.!?]*$/i;
const CASUAL_THANKS_REGEX = /^(thanks|thank you|thank you so much|thx|many thanks|much appreciated)[\s.!?]*$|^(ধন্যবাদ|অনেক ধন্যবাদ|থ্যাংকস)[\s.!?]*$/i;
const CASUAL_GOODBYE_REGEX = /^(goodbye|bye|bye bye|see you|take care|farewell)[\s.!?]*$|^(বিদায়|খোদা হাফেজ|আল্লাহ হাফেজ)[\s.!?]*$/i;

// B. Platform questions
const PLATFORM_QUESTION_REGEX = /\b(what is nyayota|what can you do|what does this website do|how does this site work|what laws can i search|what can i search|can i use it in bengali|supported languages|how to report an error|report a mistake|report an error|who built nyayota|who developed nyayota|how to cite|citation generator)\b|ন্যায়তা কি|ন্যায়তা কি করতে পারে|এই সাইট কি করে|কিভাবে ব্যবহার করব|ভুল রিপোর্ট|ইমেইল|ভাষা সমর্থন/i;

// E. General Explanatory Questions (Broad legal philosophy/theory not needing BD statute lookup)
const GENERAL_EXPLANATION_REGEX = /^(what is negligence|explain negligence|what is a constitution|what is the difference between civil and criminal law|difference between civil and criminal|explain the meaning of jurisdiction|what is jurisdiction|what is jurisprudence|what is substantive law|what is procedural law|what is common law|difference between act and ordinance|what is rule of law)[\s.!?]*$|\b(negligence|অবহেলা|duty of care)\b|\b(civil and criminal law|civil and criminal)\b.*\b(difference|distinction)\b|দেওয়ানি.*ফৌজদারি.*পার্থক্য|^(সংবিধান কি|সংবিধান কাকে বলে|এখতিয়ার কি|আইনের শাসন কি)[\s.!?]*$/i;

// G. Out of Scope (Coding, Weather, Trivia, Pop Culture, Recipes, Games, Everyday Relatives)
const OUT_OF_SCOPE_REGEX = /\b(python|javascript|typescript|react|html|css|sql query|write code|write a function|debug my code|weather|temperature|forecast|recipe|bake|baking|cookie|cookies|chocolate|cooking|food|biryani|messi|ronaldo|world cup|capital of france|who is the president of|solve the equation|quantum physics|calculate|movie review|recommend a movie|tell me a joke|chess|rules of chess|basketball|football|cricket|game|games|mother-in-law|father-in-law|sister-in-law|brother-in-law|lunch|dinner)\b|আবহাওয়া|রান্নার রেসিপি|কোডিং|প্রোগ্রামিং|জাভাস্ক্রিপ্ট|মুভি|দাবা|খেলাধুলো/i;

// F. Ambiguous Requests without Context
const AMBIGUOUS_STANDALONE_REGEX = /^(is it legal|is this legal|is that legal|can i do that|can i do this|what happens next|what is the punishment|what's the punishment|what about the punishment|punishment ki|shasti ki|kono shasti ache|what is the penalty|is there a penalty)[\s.!?]*$|^(এটা কি বৈধ|এটা কি বেআইনি|আমি কি এটা করতে পারি|এরপরে কি হবে|শাস্তি কি|কোন শাস্তি আছে কি)[\s.!?]*$/i;

// C. Substantive Legal Research Indicators
const SUBSTANTIVE_LEGAL_REGEX = /(?:section|article|order|rule|ধারা|অনুচ্ছেদ)\s*\d+|\d+\s*(?:ধারা|ধারার|অনুচ্ছেদ|অনুচ্ছেদের)|penal code|crpc|cpc|constitution|labor act|contract act|evidence act|digital security|negotiable instruments|দণ্ডবিধি|কার্যবিধি|সংবিধান|সাক্ষ্য আইন|চুক্তি আইন|শ্রম আইন|bail|anticipatory bail|habeas corpus|mens rea|actus reus|res judicata|cheque dishonour|fir|general diary|জিডি|এজাহার|জামিন|ওয়ারেন্ট/i;

export interface DetectedIntentResult {
  intent: ConversationalIntent;
  confidence: number;
  resolvedContext?: ResolvedContext;
  matchedPatterns: string[];
  reason: string;
}

/**
 * Classifies query into one of the 7 conversational intents using context.
 */
export function detectConversationalIntent(
  rawQuery: string,
  context: ConversationContext
): DetectedIntentResult {
  const norm = normalizeConversationalText(rawQuery);
  const matchedPatterns: string[] = [];

  // Check 1: Empty or whitespace
  if (!norm) {
    return {
      intent: 'ambiguous_request',
      confidence: 1.0,
      matchedPatterns: ['empty_query'],
      reason: 'Empty or whitespace-only input.',
    };
  }

  // Check 2: Out of scope (non-legal topics)
  if (OUT_OF_SCOPE_REGEX.test(norm)) {
    matchedPatterns.push('out_of_scope_regex');
    return {
      intent: 'out_of_scope',
      confidence: 0.95,
      matchedPatterns,
      reason: 'Query matched non-legal topic patterns (programming, weather, trivia, entertainment).',
    };
  }

  // Check 3: Casual Conversation (Greetings, pleasantries, thanks, goodbye)
  // Strict rule: Casual conversation must NOT contain substantive legal queries
  const isGreeting = CASUAL_GREETING_REGEX.test(norm);
  const isPleasantry = CASUAL_PLEASANTRY_REGEX.test(norm);
  const isThanks = CASUAL_THANKS_REGEX.test(norm);
  const isGoodbye = CASUAL_GOODBYE_REGEX.test(norm);

  const hasSubstantiveLegal = SUBSTANTIVE_LEGAL_REGEX.test(norm);

  if ((isGreeting || isPleasantry || isThanks || isGoodbye) && !hasSubstantiveLegal) {
    if (isGreeting) matchedPatterns.push('casual_greeting');
    if (isPleasantry) matchedPatterns.push('casual_pleasantry');
    if (isThanks) matchedPatterns.push('casual_thanks');
    if (isGoodbye) matchedPatterns.push('casual_goodbye');

    return {
      intent: 'casual_conversation',
      confidence: 0.95,
      matchedPatterns,
      reason: 'User initiated casual conversation or pleasantry without substantive legal inquiry.',
    };
  }

  // Check 4: Platform Questions (about Nyayota)
  if (PLATFORM_QUESTION_REGEX.test(norm) && !hasSubstantiveLegal) {
    matchedPatterns.push('platform_question_regex');
    return {
      intent: 'platform_question',
      confidence: 0.95,
      matchedPatterns,
      reason: 'User inquired about Nyayota capabilities, features, language support, or feedback channel.',
    };
  }

  // Check 5: General Explanatory Questions (Broad legal philosophy, jurisprudence)
  if (GENERAL_EXPLANATION_REGEX.test(norm)) {
    matchedPatterns.push('general_explanation_regex');
    return {
      intent: 'general_explanation',
      confidence: 0.9,
      matchedPatterns,
      reason: 'Broad legal conceptual question suited for educational explanation without statutory database lookup.',
    };
  }

  // Check 6: Check for Contextual Reference & Follow-up
  const resolved = resolveContextualReference(rawQuery, context);

  if (resolved.referenceType !== 'none') {
    // If reference was successfully grounded in prior context
    if (resolved.isResolved) {
      matchedPatterns.push(`follow_up_${resolved.referenceType}`);
      return {
        intent: 'legal_follow_up',
        confidence: resolved.resolutionConfidence,
        resolvedContext: resolved,
        matchedPatterns,
        reason: resolved.resolutionNote || 'Contextual follow-up resolved successfully from prior conversation history.',
      };
    }

    // If query has follow-up form or ambiguous standalone wording but NO prior context exists OR ambiguous comparison
    const ambiguityTag = resolved.isAmbiguousMultiReference ? 'ambiguous_multi_reference' : 'ambiguous_missing_antecedent';
    matchedPatterns.push(ambiguityTag);
    return {
      intent: 'ambiguous_request',
      confidence: 0.9,
      resolvedContext: resolved,
      matchedPatterns,
      reason: resolved.resolutionNote || 'Query is an elliptical follow-up or underspecified question, but no clear antecedent exists.',
    };
  }

  // Check 7: Standalone Ambiguous Questions without Context
  if (AMBIGUOUS_STANDALONE_REGEX.test(norm)) {
    matchedPatterns.push('ambiguous_standalone_regex');
    return {
      intent: 'ambiguous_request',
      confidence: 0.9,
      matchedPatterns,
      reason: 'Standalone ambiguous inquiry lacking necessary legal subject matter or action.',
    };
  }

  // Check 8: Substantive Legal Research
  if (hasSubstantiveLegal) {
    matchedPatterns.push('substantive_legal_research');
    return {
      intent: 'legal_research',
      confidence: 0.95,
      matchedPatterns,
      reason: 'Query explicitly references a statutory enactment, section, constitutional article, or legal doctrine.',
    };
  }

  // Check 9: Standalone Section Number without Act (Clarification Needed in legal research)
  if (/^(?:section|ধারা)\s*\d+[a-z]?$/i.test(norm) || /^\d+[a-z]?$/i.test(norm)) {
    matchedPatterns.push('standalone_section_number');
    return {
      intent: 'legal_research',
      confidence: 0.85,
      matchedPatterns,
      reason: 'Standalone section number provided without identifying parent Act.',
    };
  }

  // Check 10: General fallback for genuine legal mentions
  // Filter out relational family idioms like "mother-in-law"
  const cleanOfIdioms = norm.replace(/\b(mother|father|sister|brother|son|daughter)-in-law\b/gi, '');
  if (/\b(statute|court|judge|legal|courtroom|police|jail|আইন|আদালত|মামলা)\b/i.test(cleanOfIdioms) || /\b(?<!-)law\b/i.test(cleanOfIdioms)) {
    matchedPatterns.push('broad_legal_mention');
    return {
      intent: 'legal_research',
      confidence: 0.7,
      matchedPatterns,
      reason: 'Query mentions general legal terminology and will be evaluated by legal retrieval.',
    };
  }

  matchedPatterns.push('unrecognized_input_fallback');
  return {
    intent: 'ambiguous_request',
    confidence: 0.4,
    matchedPatterns,
    reason: 'Query could not be mapped with confidence to a known conversational or legal category.',
  };
}
