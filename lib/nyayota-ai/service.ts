/**
 * Nyayota AI — Server-Side Integration Service
 * 
 * Provides an independent, typed, production-safe boundary service for executing
 * the complete Nyayota AI deterministic legal intelligence pipeline:
 * 1. Input sanitization, size capping, and defensive validation
 * 2. Deterministic intent classification (10 categories, IPC safety rule, Bengali normalization)
 * 3. Traceable legal retrieval across verified in-repo datasets
 * 4. Source-grounded deterministic response generation
 * 
 * Architectural Isolation:
 * - 100% server-side safe
 * - Zero dependency on Gemini API or external paid LLMs
 * - Direct drop-in interface for API routes, Server Actions, or CLI scripts
 * - Leaves existing production routes untouched while providing a clean execution boundary
 */

import {
  DeterministicLegalResponse,
  DeterministicSourceCitation,
  CrossReferenceMention,
  IntentCategory,
  DetectedJurisdiction,
  ResponseStatus,
} from './types';
import { routeQuery, RoutingOptions } from './query-router';
import { generateResponseFromRoute } from './response-generator';

// ============================================================================
// Service Contracts & Payload Definitions
// ============================================================================

export interface ServiceChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface ServiceLawContext {
  title?: string;
  shortTitle?: string;
  jurisdiction?: string;
  category?: string;
  overview?: string;
  sectionNumber?: string;
  sectionTitle?: string;
  sectionContent?: string;
}

export interface NyayotaAIServiceRequest {
  /** User's natural language legal query */
  query: string;

  /** Language preference for generated response ('en' | 'bn' | 'both', default: 'both') */
  language?: 'en' | 'bn' | 'both';

  /** UI mode ('explain' | 'bangla' | 'compare' | 'cite') */
  mode?: 'explain' | 'bangla' | 'compare' | 'cite';

  /** Optional conversation history for context preservation */
  messages?: ServiceChatMessage[];

  /** Active statutory context if originating from statute view */
  lawContext?: ServiceLawContext;

  /** Optional fine-tuning options for retrieval */
  options?: {
    limit?: number;
    minScore?: number;
    targetJurisdiction?: 'Bangladesh' | 'International' | 'All';
    includeCatalogRecords?: boolean;
  };
}

export interface NyayotaAIServiceResponse {
  /** Whether the request was processed successfully */
  success: boolean;

  /** Original query string */
  query: string;

  /** Sanitized and normalized query */
  normalizedQuery: string;

  /**
   * Primary Markdown explanation text.
   * Drop-in compatible with existing UI chat displays (data.text).
   */
  text: string;

  /** Primary Bengali Markdown explanation text */
  textBn?: string;

  /** Response card headline */
  headline: string;

  /** Bengali headline */
  headlineBn?: string;

  /** Plain-language summary */
  summary: string;

  /** Plain-language summary in Bengali */
  summaryBn?: string;

  /** Generation status */
  status: ResponseStatus;

  /** Classified intent category */
  detectedIntent: IntentCategory;

  /** Verified legal jurisdiction */
  detectedJurisdiction: DetectedJurisdiction;

  /** Verified, traceable source citations */
  sources: DeterministicSourceCitation[];

  /** Statutory limitations or coverage disclaimers */
  limitations: string[];

  /** Statutory limitations in Bengali */
  limitationsBn?: string[];

  /** Disambiguation question for ambiguous inquiries */
  clarificationPrompt?: string;

  /** Structured options for user to select */
  clarificationOptions?: string[];

  /** In-repo cross-reference mentions if queried section is cited elsewhere */
  crossReferenceMentions?: CrossReferenceMention[];

  /** Educational legal disclaimer */
  disclaimer: string;

  /** Bengali disclaimer */
  disclaimerBn?: string;

  /** Generation timestamp in ISO format */
  generatedAt: string;

  /** Total execution latency in milliseconds */
  executionTimeMs: number;

  /** Validation errors or warnings if any occurred */
  validationErrors?: string[];
}

// ============================================================================
// Input Sanitization & Validation Constants
// ============================================================================

export const MAX_QUERY_LENGTH = 1500;
const CONTROL_CHARS_REGEX = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g;

/**
 * Strips dangerous control characters and trims excessive whitespace
 */
export function sanitizeInputQuery(raw: unknown): { sanitized: string; errors: string[] } {
  const errors: string[] = [];

  if (typeof raw !== 'string') {
    return { sanitized: '', errors: ['Query must be a string.'] };
  }

  // Strip ASCII control characters
  let clean = raw.replace(CONTROL_CHARS_REGEX, '');

  // Collapse multiple whitespaces
  clean = clean.trim().replace(/\s+/g, ' ');

  if (!clean) {
    return { sanitized: '', errors: ['Query cannot be empty or whitespace only.'] };
  }

  if (clean.length > MAX_QUERY_LENGTH) {
    clean = clean.slice(0, MAX_QUERY_LENGTH);
    errors.push(`Query exceeded maximum limit of ${MAX_QUERY_LENGTH} characters and was truncated.`);
  }

  return { sanitized: clean, errors };
}

// ============================================================================
// Pipeline Executor
// ============================================================================

/**
 * Executes the complete deterministic Nyayota AI pipeline.
 * Fully isolated, robustly typed, and safe for production integration.
 */
export async function executeNyayotaAIPipeline(
  request: NyayotaAIServiceRequest
): Promise<NyayotaAIServiceResponse> {
  const startTime = Date.now();

  // 1. Sanitize & Validate Input
  const { sanitized: cleanQuery, errors: validationErrors } = sanitizeInputQuery(request?.query);

  // If query is empty after sanitization, return safe conversational response
  if (!cleanQuery) {
    const fallbackResponse: NyayotaAIServiceResponse = {
      success: false,
      query: typeof request?.query === 'string' ? request.query : '',
      normalizedQuery: '',
      text: 'Please enter a legal query, statute title, section number, or legal concept to search Nyayota.',
      textBn: 'অনুগ্রহ করে অনুসন্ধানের জন্য কোনো আইনি প্রশ্ন, আইনের নাম, ধারা বা পরিভাষা লিখুন।',
      headline: 'Empty Query',
      headlineBn: 'প্রশ্ন খালি',
      summary: 'No valid query text was provided to the legal assistant.',
      summaryBn: 'আইনি সহকারীর জন্য কোনো বৈধ প্রশ্ন প্রদান করা হয়নি।',
      status: 'unintelligible',
      detectedIntent: 'unknown',
      detectedJurisdiction: 'unknown',
      sources: [],
      limitations: ['Empty input query.'],
      limitationsBn: ['প্রশ্ন খালি ছিল।'],
      disclaimer: 'Notice: This platform provides educational legal research only and does not constitute formal legal advice.',
      disclaimerBn: 'সতর্কবার্তা: এই প্ল্যাটফর্মটি শিক্ষামূলক আইনি গবেষণার জন্য এবং এটি আনুষ্ঠানিক আইনি পরামর্শ নয়।',
      generatedAt: new Date().toISOString(),
      executionTimeMs: Date.now() - startTime,
      validationErrors,
    };
    return fallbackResponse;
  }

  // 2. Incorporate Contextual Hints if query doesn't specify an Act but lawContext exists
  let effectiveQuery = cleanQuery;
  if (
    typeof request.lawContext?.title === 'string' &&
    request.lawContext.title.trim().length > 0 &&
    !/(act|code|penal|crpc|cpc|constitution|দণ্ডবিধি|কার্যবিধি|সংবিধান)/i.test(cleanQuery)
  ) {
    // If user queried only a section (e.g. "Section 300" while viewing The Penal Code)
    effectiveQuery = `${cleanQuery} (${request.lawContext.title.trim()})`;
  }

  // 3. Configure Pipeline Options
  const targetLanguage = request.language || (request.mode === 'bangla' ? 'bn' : 'both');
  const routingOptions: RoutingOptions = {
    limit: request.options?.limit || 8,
    minScore: request.options?.minScore || 20,
    targetJurisdiction: request.options?.targetJurisdiction,
    includeCatalogRecords: request.options?.includeCatalogRecords ?? true,
  };

  // 4. Execute Intent Classification & Deterministic Routing
  const route = await routeQuery(effectiveQuery, routingOptions);

  // 5. Generate Source-Grounded Deterministic Response
  const genResponse: DeterministicLegalResponse = generateResponseFromRoute(route, startTime);

  // 6. Format Markdown text payload suitable for direct rendering
  let primaryText = genResponse.structuredExplanation;
  if (targetLanguage === 'bn' && genResponse.structuredExplanationBn) {
    primaryText = genResponse.structuredExplanationBn;
  } else if (targetLanguage === 'both' && genResponse.structuredExplanationBn) {
    primaryText = `${genResponse.structuredExplanation}\n\n---\n\n${genResponse.structuredExplanationBn}`;
  }

  // Append disclaimer notice
  if (genResponse.disclaimer) {
    if (targetLanguage === 'bn' && genResponse.disclaimerBn) {
      primaryText += `\n\n---\n*${genResponse.disclaimerBn}*`;
    } else if (targetLanguage === 'both' && genResponse.disclaimerBn) {
      primaryText += `\n\n---\n*${genResponse.disclaimer}*\n\n*${genResponse.disclaimerBn}*`;
    } else {
      primaryText += `\n\n---\n*${genResponse.disclaimer}*`;
    }
  }

  const executionTimeMs = Date.now() - startTime;

  return {
    success: true,
    query: cleanQuery,
    normalizedQuery: route.normalizedQuery,
    text: primaryText,
    textBn: genResponse.structuredExplanationBn,
    headline: genResponse.headline,
    headlineBn: genResponse.headlineBn,
    summary: genResponse.summary,
    summaryBn: genResponse.summaryBn,
    status: genResponse.status,
    detectedIntent: genResponse.detectedIntent,
    detectedJurisdiction: genResponse.detectedJurisdiction,
    sources: genResponse.sources,
    limitations: genResponse.limitations,
    limitationsBn: genResponse.limitationsBn,
    clarificationPrompt: genResponse.clarificationPrompt,
    clarificationOptions: genResponse.clarificationOptions,
    crossReferenceMentions: route.retrievalResponse?.crossReferenceMentions,
    disclaimer: genResponse.disclaimer,
    disclaimerBn: genResponse.disclaimerBn,
    generatedAt: genResponse.generatedAt,
    executionTimeMs,
    validationErrors: validationErrors.length > 0 ? validationErrors : undefined,
  };
}
