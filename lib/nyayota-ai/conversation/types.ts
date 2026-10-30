/**
 * Nyayota AI — Conversational Understanding & Intent Detection Types (Phase 6A)
 * 
 * Defines the structured contracts for conversation context, language detection,
 * intent categorization, reference resolution, and explicit routing decisions.
 */

import { DeterministicSourceCitation, IntentCategory } from '../types';

/**
 * 7 Core Intent Categories for Conversational AI
 */
export type ConversationalIntent =
  | 'casual_conversation'     // Greetings, how-are-you, good morning, thanks, goodbye
  | 'platform_question'       // What is Nyayota, features, languages, corrections, citations
  | 'legal_research'          // Specific Bangladesh statutory research, section, act, doctrine
  | 'legal_follow_up'         // Contextual follow-up (punishment, exceptions, simplification, comparison)
  | 'general_explanation'     // Broad educational legal questions (what is a constitution, civil vs criminal)
  | 'ambiguous_request'       // Underspecified questions lacking context (is it legal? what is the punishment?)
  | 'out_of_scope';           // Non-legal queries (coding, weather, trivia, recipes, movies)

/**
 * Controlled Response Modes
 */
export type ResponseMode =
  | 'conversation'            // Natural conversational response without legal retrieval
  | 'platform_help'           // Verified Nyayota capabilities and feature guidance
  | 'legal_retrieval'         // Standard source-grounded legal retrieval
  | 'legal_follow_up'         // Context-aware continuation/simplification or targeted retrieval
  | 'general_explanation'     // General educational legal concept explanation (no BD statutory search needed)
  | 'clarification'           // Short disambiguation question without inventing context
  | 'out_of_scope';           // Polite redirection to Nyayota's legal scope

/**
 * Supported Language Detection
 */
export type LanguageDetected = 'en' | 'bn' | 'banglish';

/**
 * Supported legal jurisdictions in conversational tracking.
 * Nyayota currently indexes Bangladesh statutes and International treaties/declarations,
 * with architecture designed to support progressive multi-jurisdiction expansion.
 */
export type LegalJurisdiction =
  | 'Bangladesh'
  | 'International'
  | 'India'
  | 'United Kingdom'
  | 'United States'
  | 'Other'
  | 'unknown';

/**
 * Single turn in conversational history
 */
export interface ConversationMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp?: number;
  identifiedAct?: string;
  identifiedSection?: string;
  identifiedTopic?: string;
  identifiedJurisdiction?: LegalJurisdiction;
  retrievedSources?: Array<{
    title: string;
    identifier?: string;
    sourceId: string;
    url?: string;
  }>;
}

/**
 * Structured legal reference tracked in conversation context
 */
export interface TrackedLegalReference {
  /** Title of the Act, Code, or Treaty */
  actTitle?: string;

  /** Internal statutory ID if matched to an in-repo record */
  actId?: string;

  /** Section, Article, or Rule number (e.g. "Section 302", "Article 102") */
  sectionOrArticle?: string;

  /** Extracted topic or doctrine (e.g. "murder", "bail", "writ") */
  topic?: string;

  /** Legal jurisdiction */
  jurisdiction: LegalJurisdiction;

  /** Zero-based turn index in the bounded messages array where this reference appeared */
  turnIndex: number;

  /** Role of this reference in the conversation */
  role: 'primary' | 'compared' | 'mentioned';

  /** Verified sources cited by assistant for this reference */
  citedSources?: DeterministicSourceCitation[];
}

/**
 * Active conversational context tracked across turns (request-scoped)
 */
export interface ConversationContext {
  /** Bounded conversation messages (max 10 recent turns) */
  messages: ConversationMessage[];

  /** Currently discussed legal topic (e.g. "murder", "bail", "cheque dishonour") */
  currentTopic?: string;

  /** Previously identified Act or statute (e.g. "The Penal Code, 1860") */
  activeAct?: {
    id?: string;
    title: string;
    shortTitle?: string;
    jurisdiction?: LegalJurisdiction;
  };

  /** Previously identified Section, Article, or Rule (e.g. "Section 302") */
  activeSection?: string;

  /** Established legal jurisdiction */
  activeJurisdiction: LegalJurisdiction;

  /** Primary active legal reference */
  activeReference?: TrackedLegalReference;

  /** Secondary reference if a comparison was previously requested */
  comparedReference?: TrackedLegalReference;

  /** All legal references discovered across the conversation history */
  legalReferences: TrackedLegalReference[];

  /** Whether the conversation is currently in an active comparison between multiple provisions */
  isMultiReferenceComparison?: boolean;

  /** References requiring clarification if an ambiguous pronoun was used */
  ambiguousReferences?: TrackedLegalReference[];

  /** Sources cited in the immediately preceding assistant response (strictly validated) */
  lastRetrievedSources?: DeterministicSourceCitation[];

  /** Summary or key content of last assistant message */
  lastResponseSummary?: string;

  /** Number of consecutive follow-up questions in session */
  followUpCount: number;
}

/**
 * Reference resolution result from context
 */
export interface ResolvedContext {
  /** Whether anaphoric/elliptical reference was successfully resolved */
  isResolved: boolean;

  /** Target topic resolved from history */
  resolvedTopic?: string;

  /** Target Act resolved from history */
  resolvedAct?: string;

  /** Target Section resolved from history */
  resolvedSection?: string;

  /** Target jurisdiction */
  resolvedJurisdiction?: LegalJurisdiction;

  /** Type of reference detected */
  referenceType:
    | 'pronoun'            // "it", "that", "this law", "ঐ আইন"
    | 'punishment'         // "what about punishment?", "its punishment", "এর শাস্তি কী?"
    | 'exception'          // "are there exceptions?", "what exceptions?", "ব্যতিক্রম"
    | 'simplification'     // "explain simply", "in plain English", "সহজ করে বলুন"
    | 'age_condition'      // "if under 18", "minor", "শিশু হলে কি হবে"
    | 'comparison'         // "compare with previous", "আগের ধারার সাথে তুলনা"
    | 'jurisdiction_scope' // "does this apply internationally?", "what about other countries?"
    | 'continuation'       // general follow-up continuation
    | 'none';

  /** Whether an ambiguous reference between multiple compared provisions was detected */
  isAmbiguousMultiReference?: boolean;

  /** Competing references that caused the ambiguity */
  competingReferences?: TrackedLegalReference[];

  /** Synthesized effective search query combining resolved context */
  synthesizedQuery?: string;

  /** Confidence score in reference resolution (0.0 to 1.0) */
  resolutionConfidence: number;

  /** Explanatory note for the resolution */
  resolutionNote?: string;
}

/**
 * Structured routing decision produced before any retrieval or generation
 */
export interface RoutingDecision {
  /** High-level conversational intent */
  intent: ConversationalIntent;

  /** Confidence score of intent classification (0.0 to 1.0) */
  confidence: number;

  /** Controlled response mode */
  responseMode: ResponseMode;

  /** Strict boolean flag: whether source-grounded legal retrieval MUST be executed */
  shouldRetrieve: boolean;

  /** Whether the query lacks sufficient clarity/context to answer directly */
  requiresClarification: boolean;

  /** Reason why clarification is necessary */
  clarificationReason?: string;

  /** Prompt to ask the user if clarification is needed */
  clarificationPrompt?: string;

  /** Structured disambiguation options if available */
  clarificationOptions?: string[];

  /** Resolved contextual references from prior turns */
  resolvedContext?: ResolvedContext;

  /** Detected user language */
  language: LanguageDetected;

  /** Technical explanation of the routing choice */
  reasoningSummary: string;

  /** Triggered pattern identifiers */
  matchedPatterns: string[];

  /** Normalized query string */
  normalizedQuery: string;

  /** Effective query to send to retrieval engine if shouldRetrieve is true */
  effectiveRetrievalQuery?: string;

  /** Latency of intent routing in milliseconds */
  executionTimeMs: number;
}
