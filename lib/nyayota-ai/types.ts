/**
 * Nyayota AI — Legal Retrieval Engine Types
 * 
 * Defines the common result representation, ambiguity classifications,
 * provenance metadata, and query options for source-grounded legal retrieval.
 */

export type RetrievalRecordType =
  | 'statutory-provision'   // Exact section or article text from curated LAWS_DATABASE or Bangladesh Code
  | 'statute-metadata'      // Overall statute overview, act number, year, authority
  | 'glossary-term'          // Legal definition and plain-language explanation from GLOSSARY_TERMS
  | 'treaty-provision'      // International treaty article from INTERNATIONAL_TREATIES_DATABASE
  | 'outcome-scenario';     // Step-by-step procedural roadmap from LEGAL_OUTCOME_SCENARIOS_DATA

export type MatchReasonType =
  | 'exact-act-and-section'       // User specified both the Act and section number
  | 'exact-section-candidate'     // Exact section match where Act was ambiguous or unspecified
  | 'exact-act-title'             // Query matched full or short title of the Act
  | 'act-abbreviation'            // Query matched common abbreviation (e.g., "CrPC", "CPC", "UDHR")
  | 'glossary-exact'              // Query matched a legal doctrine or term exactly
  | 'scenario-match'              // Query matched a procedural legal outcome scenario
  | 'section-title-match'         // Query matched section heading
  | 'statutory-content-match'     // Matched verbatim statutory text
  | 'explanation-match'           // Matched curated plain-language breakdown
  | 'keyword-match'               // Matched explicit indexing keywords
  | 'cross-reference-mention'     // Section queried is cited in another section's text/penalty
  | 'token-overlap';              // Multi-token intersection across metadata

export type AmbiguityStatus =
  | 'unambiguous'                       // Act and section are clearly matched or concept is singular
  | 'ambiguous-section-multiple-acts'   // Section number was provided without a clear Act, matching multiple statutes
  | 'section-only-no-act'               // User typed only a section number (e.g. "Section 54")
  | 'act-found-section-missing'         // The Act is known in Nyayota, but the requested section is not in the curated subset
  | 'section-exceeds-statute-range'     // Section number exceeds the total codified sections count of the Act
  | 'none';                             // No ambiguity detected / broad topic query

export type SourceCompleteness =
  | 'full-statutory-text'      // Verbatim section text exists in the database
  | 'curated-section-subset'   // Verbatim section text exists as part of a curated high-frequency subset
  | 'catalog-metadata-only'    // Only Act-level overview, volume, and gazette metadata exist (provision unindexed)
  | 'conceptual-definition'    // Definition from the legal glossary
  | 'procedural-guide';        // Practical procedural steps from outcome scenarios

export interface AmbiguityCandidateDetails {
  sectionNumber: string;
  candidateLawIds: string[];
  candidateLawTitles: string[];
  note: string;
}

export interface LegalRetrievalResult {
  /** Unique composite identifier (e.g., "bd-penal-code-1860:Section 300") */
  id: string;

  /** Category of legal knowledge record */
  recordType: RetrievalRecordType;

  /** Primary statute or collection identifier (e.g. "bd-penal-code-1860") */
  sourceId: string;

  /** Human-readable title of the statute or document */
  displayTitle: string;

  /** Official Bengali title if present in source */
  displayTitleBn?: string;

  /** Section number, Article number, or Order/Rule if applicable */
  identifier?: string;

  /** Bengali section or article identifier */
  identifierBn?: string;

  /** Verbatim excerpt of the legal provision or definition */
  matchingText: string;

  /** Verbatim Bengali text if present in source */
  matchingTextBn?: string;

  /** Plain-language educational explanation from source data */
  explanation?: string;

  /** Statutory consequence, penalty, or civil remedy if present in source */
  penaltyOrRemedy?: string;

  /** Deterministic relevance score (0 - 100) */
  relevanceScore: number;

  /** Reasons explaining why this record was retrieved */
  matchReasons: MatchReasonType[];

  /** Verified internal URL within Nyayota (e.g. "/law/bd-penal-code-1860?section=Section%20300") */
  internalDestination?: string;

  /** Authentic external source URL (only if present in the verified dataset) */
  officialSourceUrl?: string;

  /** Official Gazette notification or legislative publication reference */
  officialGazetteRef?: string;

  /** Degree of statutory completeness in Nyayota's repository */
  sourceCompleteness: SourceCompleteness;

  /** Jurisdiction (e.g. "Bangladesh", "International") */
  jurisdiction: string;

  /** Statutory status (e.g. "In Force", "Repealed", "Amended") */
  status?: string;

  /** Mandatory warning note if statute was repealed or amended */
  repealNote?: string;

  /** Indicates if this result is one of several ambiguous candidates */
  isAmbiguous?: boolean;

  /** Structured ambiguity context if multiple candidate statutes exist */
  ambiguityDetails?: AmbiguityCandidateDetails;
}

export interface RetrievalOptions {
  /** Maximum number of results to return (default: 8, max: 25) */
  limit?: number;

  /** Minimum relevance score to include in final output (default: 20) */
  minScore?: number;

  /** Filter by jurisdiction */
  targetJurisdiction?: 'Bangladesh' | 'International' | 'All';

  /** Restrict to specific record types */
  recordTypes?: RetrievalRecordType[];

  /** Whether to search Bangladesh Code Catalog records alongside LAWS_DATABASE */
  includeCatalogRecords?: boolean;
}

export interface LegalRetrievalResponse {
  /** Original user input string */
  query: string;

  /** Sanitized, lowercase, trimmed query */
  normalizedQuery: string;

  /** Total matching results returned */
  totalMatches: number;

  /** Ranked, deduplicated retrieval records */
  results: LegalRetrievalResult[];

  /** Ambiguity assessment for the query */
  ambiguityStatus: AmbiguityStatus;

  /** If query contains an ambiguous section, list of candidate provisions across Acts */
  ambiguousCandidates?: LegalRetrievalResult[];

  /** Detected Act hints from user tokens */
  detectedActHints?: string[];

  /** Detected section or article number token */
  detectedSectionNumber?: string;

  /** Cross-reference mentions where the queried section is referenced in another section's text/penalty */
  crossReferenceMentions?: CrossReferenceMention[];

  /** Whether the queried section exceeds total statutory sections count */
  sectionExceedsStatuteRange?: {
    sectionNumber: string;
    statuteTitle: string;
    totalStatutorySections: number;
  };

  /** Retrieval execution time in milliseconds */
  executionTimeMs: number;

  /** High-level retrieval outcome status */
  status:
    | 'success'
    | 'no-match'
    | 'empty-query'
    | 'ambiguous-section'
    | 'act-found-section-missing'
    | 'section-exceeds-statute-range';
}

export interface CrossReferenceMention {
  statuteId: string;
  statuteTitle: string;
  referencingSection: string;
  referencingSectionTitle: string;
  context: string;
  note: string;
}

// ============================================================================
// Phase 3: Intent Classification & Query Routing Types
// ============================================================================

/**
 * 10 Deterministic Intent Categories for Nyayota AI
 */
export type IntentCategory =
  | 'greeting'                   // Greetings and simple conversational openings
  | 'nyayota_help'                // Questions about using Nyayota, features, languages, bug/correction reports
  | 'direct_legal_reference'     // Specific statute, section, article, order, or rule reference
  | 'legal_concept'              // Legal term, maxim, doctrine, or definition
  | 'statute_overview'           // Overview or summary request for a specific statute
  | 'legal_scenario'             // Procedural legal question or citizen scenario
  | 'clarification_needed'       // Ambiguous query (e.g. standalone section number, cross-jurisdiction confusion)
  | 'unsupported_legal_query'    // Legal request outside indexed Bangladesh/international materials (e.g. foreign law)
  | 'out_of_scope'               // Completely non-legal query (coding, weather, trivia, recipes, etc.)
  | 'unknown';                   // Unintelligible text, gibberish, or keyboard smash

/**
 * Detected Jurisdiction for Query Routing
 */
export type DetectedJurisdiction =
  | 'Bangladesh'      // Domestic Bangladesh law (Acts of Parliament, BD Code, Constitution)
  | 'International'   // Multilateral treaties, UN conventions, international law
  | 'India'           // Explicitly Indian law (IPC, Indian CrPC, Supreme Court of India)
  | 'unclear'         // Ambiguous jurisdiction (e.g. "IPC" mixed with BD context or standalone foreign terms)
  | 'unknown';        // Non-legal or undetectable jurisdiction

/**
 * Execution pipeline routing path
 */
export type ProcessingPath =
  | 'greeting_handler'           // Deterministic greeting response
  | 'nyayota_help_handler'        // Deterministic Nyayota platform help & contact guidance
  | 'retrieval_engine'           // Route to legal retrieval engine (LAWS_DATABASE, BD Code, Treaties, Glossary)
  | 'clarification_handler'      // Deterministic clarification prompt generator
  | 'unsupported_legal_handler'   // Clear notice that query is outside indexed legal scope
  | 'out_of_scope_handler'       // Polite redirect for non-legal queries
  | 'unknown_handler';           // Prompt to clarify with legal keywords

/**
 * Structured result of deterministic intent classification
 */
export interface IntentClassificationResult {
  /** Original user query */
  originalQuery: string;

  /** Lowercased, whitespace-collapsed, Bengali-numeral normalized query */
  normalizedQuery: string;

  /** Primary categorized intent */
  primaryIntent: IntentCategory;

  /** Classification confidence score (0.0 to 1.0) */
  confidence: number;

  /** Detected legal jurisdiction */
  detectedJurisdiction: DetectedJurisdiction;

  /** Explanation for jurisdiction classification */
  jurisdictionReason?: string;

  /** Next processing stage in the engine */
  suggestedProcessingPath: ProcessingPath;

  /** Matching regex patterns or rule identifiers triggered */
  matchedPatterns: string[];

  /** Detected statute candidate names or abbreviations */
  detectedActHints: string[];

  /** Detected section, article, or rule number */
  detectedSectionNumber?: string;

  /** Detected legal concepts or glossary terms */
  detectedLegalTerms: string[];

  /** Detected language */
  detectedLanguage: 'en' | 'bn' | 'mixed';

  /** Whether the query is too ambiguous to answer directly */
  requiresClarification: boolean;

  /** Clarification prompt explaining ambiguity to the user */
  clarificationPrompt?: string;

  /** Structured options the user can select to disambiguate */
  clarificationOptions?: string[];
}

/**
 * Complete outcome of the Query Routing Engine
 */
export interface QueryRouteResult {
  /** Original user query */
  query: string;

  /** Normalized query */
  normalizedQuery: string;

  /** Intent classification analysis */
  intent: IntentClassificationResult;

  /** Selected processing path */
  processingPath: ProcessingPath;

  /** Legal retrieval response if retrieval was executed */
  retrievalResponse?: LegalRetrievalResponse;

  /** Deterministic English message for non-retrieval paths */
  deterministicMessage?: string;

  /** Deterministic Bengali message for non-retrieval paths */
  deterministicMessageBn?: string;

  /** Clarification question for ambiguous queries */
  clarificationPrompt?: string;

  /** Disambiguation options */
  clarificationOptions?: string[];

  /** Technical reason for routing decision */
  routingReason: string;

  /** Total routing & retrieval execution time in milliseconds */
  executionTimeMs: number;

  /** High-level routing status */
  status:
    | 'routed-to-retrieval'
    | 'handled-deterministically'
    | 'clarification-required'
    | 'unsupported'
    | 'out-of-scope'
    | 'unknown';
}

// ============================================================================
// Phase 4: Source-Grounded Deterministic Response Generator Types
// ============================================================================

/**
 * High-level generation status of the deterministic response
 */
export type ResponseStatus =
  | 'grounded-answer'         // Answer fully supported by retrieved statutory, treaty, or glossary records
  | 'partial-coverage'        // Curated subset available; certain provisions of the Act are unindexed
  | 'clarification-required'  // Query requires user disambiguation (IPC notice or multi-act section)
  | 'unsupported-scope'       // Query is outside indexed legal collection or asks for foreign law
  | 'out-of-scope'            // Query is non-legal (coding, weather, trivia, recipes)
  | 'conversational'          // Greetings, platform help, website feature guides
  | 'no-records-found'        // Legitimate legal query, but 0 matches in current Nyayota index
  | 'unintelligible';         // Empty string or gibberish input

/**
 * Traceable, verified legal citation attached to a deterministic response
 */
export interface DeterministicSourceCitation {
  /** Primary identifier of the statute or document (e.g. "bd-penal-code-1860") */
  sourceId: string;

  /** Human-readable title of the statute */
  title: string;

  /** Official Bengali title if available */
  titleBn?: string;

  /** Section number, Article number, or Order/Rule if applicable */
  identifier?: string;

  /** Type of legal record retrieved */
  recordType: RetrievalRecordType;

  /** Degree of statutory completeness in Nyayota's repository */
  sourceCompleteness: SourceCompleteness;

  /** Jurisdiction (e.g. "Bangladesh", "International") */
  jurisdiction: string;

  /** Verified internal link within Nyayota (e.g. "/law/bd-penal-code-1860?section=Section%20300") */
  internalUrl?: string;

  /** Authentic external official government or UN source URL (only if present in dataset) */
  officialUrl?: string;

  /** Official Gazette notification or legislative publication reference */
  officialGazetteRef?: string;

  /** Statutory status (e.g. "In Force", "Repealed", "Amended") */
  status?: string;

  /** Repeal or amendment warning note */
  repealNote?: string;

  /** Whether the parent statute is only partially indexed as a curated subset */
  isCuratedSubset: boolean;

  /** Verbatim excerpt of the legal provision or definition */
  verbatimExcerpt: string;

  /** Verbatim Bengali text if available in dataset */
  verbatimExcerptBn?: string;
}

/**
 * Complete, structured, source-grounded response generated deterministically
 */
export interface DeterministicLegalResponse {
  /** Original user query */
  query: string;

  /** Normalized query */
  normalizedQuery: string;

  /** Detected intent category */
  detectedIntent: IntentCategory;

  /** Detected legal jurisdiction */
  detectedJurisdiction: DetectedJurisdiction;

  /** High-level generation status */
  status: ResponseStatus;

  /** Main heading for the response card */
  headline: string;

  /** Main heading in Bengali */
  headlineBn?: string;

  /** Concise plain-language summary of the legal answer */
  summary: string;

  /** Concise plain-language summary in Bengali */
  summaryBn?: string;

  /** Comprehensive structured educational explanation (Markdown formatted) */
  structuredExplanation: string;

  /** Comprehensive structured educational explanation in Bengali (Markdown formatted) */
  structuredExplanationBn?: string;

  /** List of verified, traceable source records supporting the response */
  sources: DeterministicSourceCitation[];

  /** Explicit statutory limitations, coverage notes, or omissions */
  limitations: string[];

  /** Explicit statutory limitations in Bengali */
  limitationsBn?: string[];

  /** Prompt question when user disambiguation is required */
  clarificationPrompt?: string;

  /** Structured disambiguation options for the user to select */
  clarificationOptions?: string[];

  /** Proportionate legal educational disclaimer */
  disclaimer: string;

  /** Proportionate legal educational disclaimer in Bengali */
  disclaimerBn?: string;

  /** Timestamp of generation */
  generatedAt: string;

  /** End-to-end execution time in milliseconds */
  executionTimeMs: number;
}


