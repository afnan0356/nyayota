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
  | 'token-overlap';              // Multi-token intersection across metadata

export type AmbiguityStatus =
  | 'unambiguous'                       // Act and section are clearly matched or concept is singular
  | 'ambiguous-section-multiple-acts'   // Section number was provided without a clear Act, matching multiple statutes
  | 'section-only-no-act'               // User typed only a section number (e.g. "Section 54")
  | 'act-found-section-missing'         // The Act is known in Nyayota, but the requested section is not in the curated subset
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

  /** Retrieval execution time in milliseconds */
  executionTimeMs: number;

  /** High-level retrieval outcome status */
  status: 'success' | 'no-match' | 'empty-query' | 'ambiguous-section' | 'act-found-section-missing';
}
