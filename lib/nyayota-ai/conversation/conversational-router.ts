/**
 * Nyayota AI — Conversational Router (Phase 6A)
 * 
 * Orchestrates intent detection, reference resolution, and explicit routing decisions:
 * - Produces a strongly-typed RoutingDecision before retrieval or response generation.
 * - Strictly enforces:
 *   1. Greetings MUST NOT trigger legal retrieval (`shouldRetrieve: false`).
 *   2. Platform questions MUST NOT trigger legal retrieval (`shouldRetrieve: false`).
 *   3. General educational questions MUST NOT trigger statutory retrieval (`shouldRetrieve: false`).
 *   4. Ambiguous queries lacking antecedent context MUST trigger clarification (`shouldRetrieve: false`).
 *   5. Legal retrieval MUST occur ONLY when source-grounded statutory research is required.
 *   6. Client payload cannot bypass or override server-side routing decisions.
 */

import {
  RoutingDecision,
  ResponseMode,
  ConversationContext,
} from './types';
import { detectConversationalLanguage, normalizeConversationalText } from './language-detector';
import { detectConversationalIntent } from './intent-detector';

export interface RouteConversationOptions {
  /** Optional client-supplied suggestion (validated strictly on server) */
  clientSuggestedMode?: string;
}

/**
 * Routes conversational queries and produces an explicit, strongly-typed RoutingDecision.
 */
export function routeConversationalQuery(
  rawQuery: string,
  context: ConversationContext,
  options: RouteConversationOptions = {}
): RoutingDecision {
  const startTime = Date.now();
  const normalizedQuery = normalizeConversationalText(rawQuery);
  const language = detectConversationalLanguage(rawQuery);

  // 1. Detect conversational intent and resolve contextual references
  const detected = detectConversationalIntent(rawQuery, context);
  const matchedPatterns = [...detected.matchedPatterns];

  let responseMode: ResponseMode = 'conversation';
  let shouldRetrieve = false;
  let requiresClarification = false;
  let clarificationReason: string | undefined;
  let clarificationPrompt: string | undefined;
  let clarificationOptions: string[] | undefined;
  let effectiveRetrievalQuery: string | undefined;

  // 2. Map Intent to Response Mode & Retrieval Action
  switch (detected.intent) {
    case 'casual_conversation': {
      responseMode = 'conversation';
      shouldRetrieve = false;
      requiresClarification = false;
      break;
    }

    case 'platform_question': {
      responseMode = 'platform_help';
      shouldRetrieve = false;
      requiresClarification = false;
      break;
    }

    case 'general_explanation': {
      responseMode = 'general_explanation';
      shouldRetrieve = false;
      requiresClarification = false;
      break;
    }

    case 'legal_follow_up': {
      responseMode = 'legal_follow_up';
      const ref = detected.resolvedContext;

      if (ref && ref.isResolved) {
        if (ref.referenceType === 'simplification' || ref.referenceType === 'jurisdiction_scope') {
          // Simplification or jurisdiction scope explanation does not require fresh statutory retrieval
          shouldRetrieve = false;
        } else {
          // Follow-up on punishment, exception, age condition, or section comparison
          // requires targeted retrieval of the referenced statute/section
          shouldRetrieve = true;
          effectiveRetrievalQuery = ref.synthesizedQuery || rawQuery;
        }
      } else {
        // Fallback: If not cleanly resolved, request clarification
        responseMode = 'clarification';
        shouldRetrieve = false;
        requiresClarification = true;
        clarificationReason = 'Could not resolve the referenced statute or section from prior context.';
        clarificationPrompt =
          language === 'bn'
            ? 'আপনি কোন আইনের কোন ধারার শাস্তি বা বিধান সম্পর্কে জানতে চাচ্ছেন?'
            : 'Which specific law or section are you inquiring about?';
      }
      break;
    }

    case 'ambiguous_request': {
      responseMode = 'clarification';
      shouldRetrieve = false;
      requiresClarification = true;
      clarificationReason = detected.reason;

      // Build natural, context-appropriate clarification question
      if (detected.resolvedContext?.isAmbiguousMultiReference && detected.resolvedContext.competingReferences) {
        const refs = detected.resolvedContext.competingReferences;
        const refNames = refs.map((r) => r.sectionOrArticle || r.actTitle).filter(Boolean);
        clarificationPrompt =
          language === 'bn'
            ? `আপনি পূর্বে ${refNames.join(' এবং ')} নিয়ে আলোচনা করেছেন। আপনি কোনটির বিষয়ে বিস্তারিত জানতে চাচ্ছেন?`
            : `You recently discussed both ${refNames.join(' and ')}. Which provision would you like to explore?`;
        clarificationOptions = refNames.map((n) => `Explore ${n}`);
      } else if (detected.resolvedContext && detected.resolvedContext.referenceType === 'punishment') {
        clarificationPrompt =
          language === 'bn'
            ? 'আপনি কোন অপরাধ বা আইনের শাস্তির কথা জানতে চাচ্ছেন? যেমন: দণ্ডবিধি ধারা ৩০২ (হত্যা) বা ধারা ৩৮০ (চুরি)।'
            : 'Which legal offense or statute are you asking about? (For example: Penal Code Section 302 for murder, or Section 380 for theft).';
        clarificationOptions = [
          'Penal Code, 1860 (Offenses & Penalties)',
          'Code of Criminal Procedure, 1898 (Bail & Procedure)',
          'Negotiable Instruments Act (Cheque Dishonor)',
        ];
      } else if (/\b(legal|বৈধ|বেআইনি)\b/i.test(normalizedQuery)) {
        clarificationPrompt =
          language === 'bn'
            ? 'আপনি সুনির্দিষ্টভাবে কোন পদক্ষেপ বা বিষয়টির আইনি বৈধতা সম্পর্কে জানতে চাচ্ছেন?'
            : 'Which specific action, transaction, or situation are you asking about?';
      } else {
        clarificationPrompt =
          language === 'bn'
            ? 'আপনার আইনি প্রশ্নটি আরও স্পষ্ট করতে অনুগ্রহ করে সংশ্লিষ্ট আইনের নাম, ধারা বা বিষয়টি উল্লেখ করুন।'
            : 'To provide accurate statutory information, please specify the relevant Act, section number, or legal topic.';
        clarificationOptions = [
          'The Penal Code, 1860',
          'The Code of Criminal Procedure, 1898',
          'The Constitution of Bangladesh',
          'Browse Laws Catalog (/bangladesh-laws)',
        ];
      }
      break;
    }

    case 'out_of_scope': {
      responseMode = 'out_of_scope';
      shouldRetrieve = false;
      requiresClarification = false;
      break;
    }

    case 'legal_research':
    default: {
      responseMode = 'legal_retrieval';
      shouldRetrieve = true;
      requiresClarification = false;
      effectiveRetrievalQuery = rawQuery;
      break;
    }
  }

  // 3. Low Confidence Guard
  // If confidence is below 0.6 and not already classified as casual conversation or out of scope,
  // mandate clarification rather than proceeding with speculative retrieval.
  if (detected.confidence < 0.6 && responseMode === 'legal_retrieval') {
    responseMode = 'clarification';
    shouldRetrieve = false;
    requiresClarification = true;
    clarificationReason = 'Query confidence below threshold (0.6). Clarification required to prevent incorrect statute retrieval.';
    clarificationPrompt =
      language === 'bn'
        ? 'আপনার জিজ্ঞাসাটি পরিষ্কার করতে অনুগ্রহ করে আইনের নাম বা ধারা উল্লেখ করুন।'
        : 'Please clarify your inquiry by mentioning the specific Act name, section number, or legal concept.';
  }

  const executionTimeMs = Date.now() - startTime;

  return {
    intent: detected.intent,
    confidence: detected.confidence,
    responseMode,
    shouldRetrieve,
    requiresClarification,
    clarificationReason,
    clarificationPrompt,
    clarificationOptions,
    resolvedContext: detected.resolvedContext,
    language,
    reasoningSummary: detected.reason,
    matchedPatterns,
    normalizedQuery,
    effectiveRetrievalQuery,
    executionTimeMs,
  };
}
