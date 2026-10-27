/**
 * Nyayota AI — Legal Retrieval Engine (Phase 2A Implementation)
 * 
 * Source-grounded, deterministic retrieval engine operating over Nyayota's
 * verified in-repo legal collections:
 * - LAWS_DATABASE (Curated Bangladesh Statutes & International Treaties)
 * - BANGLADESH_CODE_CATALOG (Bangladesh Code Catalog Registry)
 * - GLOSSARY_TERMS (Legal Definitions and Maxims)
 * - LEGAL_OUTCOME_SCENARIOS_DATA (Procedural Roadmaps)
 * 
 * Zero external LLMs. Zero paid APIs. Fully traceable provenance.
 */

import {
  LAWS_DATABASE,
  GLOSSARY_TERMS,
  LEGAL_OUTCOME_SCENARIOS_DATA,
  LawItem,
  LawSection,
  GlossaryTerm,
  LegalOutcomeScenario,
} from '@/lib/legal-data';
import { BANGLADESH_CODE_CATALOG } from '@/lib/bdcode-catalog';
import { BangladeshLawRecord, BangladeshSection } from '@/lib/bdcode-architecture';
import {
  LegalRetrievalResult,
  LegalRetrievalResponse,
  RetrievalOptions,
  AmbiguityStatus,
  MatchReasonType,
  SourceCompleteness,
} from './types';

// ============================================================================
// 1. TEXT NORMALIZATION & BENGALI NUMERAL CONVERSION
// ============================================================================

const BENGALI_TO_ENGLISH_DIGITS: Record<string, string> = {
  '০': '0',
  '১': '1',
  '২': '2',
  '৩': '3',
  '৪': '4',
  '৫': '5',
  '৬': '6',
  '৭': '7',
  '৮': '8',
  '৯': '9',
};

/**
 * Converts Bengali digits to English standard ASCII digits
 */
export function convertBengaliDigits(input: string): string {
  return input.replace(/[০-৯]/g, (char) => BENGALI_TO_ENGLISH_DIGITS[char] || char);
}

/**
 * Normalizes query string: strips extra whitespace, converts Bengali numerals,
 * and preserves alphanumeric legal tokens (e.g. "89A", "Order 39").
 */
export function normalizeQueryString(input: string): string {
  if (!input) return '';
  const converted = convertBengaliDigits(input.trim().toLowerCase());
  return converted.replace(/\s+/g, ' ');
}

// ============================================================================
// 2. KNOWN ACT ALIASES & IDENTIFIER PARSING
// ============================================================================

interface KnownActMeta {
  lawId: string;
  aliases: string[];
  canonicalTitle: string;
}

const KNOWN_ACT_REGISTRY: KnownActMeta[] = [
  {
    lawId: 'bd-penal-code-1860',
    canonicalTitle: 'The Penal Code, 1860',
    aliases: [
      'penal code',
      'the penal code',
      'penal code 1860',
      'দণ্ডবিধি',
      'দণ্ডবিধি ১৮৬০',
      'দন্ডবিধি',
      'act xlv of 1860',
      'act 45 of 1860',
      'penal',
    ],
  },
  {
    lawId: 'bd-crpc-1898',
    canonicalTitle: 'The Code of Criminal Procedure, 1898',
    aliases: [
      'crpc',
      'cr.p.c',
      'cr p c',
      'code of criminal procedure',
      'criminal procedure code',
      'criminal procedure',
      'ফৌজদারি কার্যবিধি',
      'ফৌজদারী কার্যবিধি',
      'act v of 1898',
      'act 5 of 1898',
    ],
  },
  {
    lawId: 'bd-cpc-1908',
    canonicalTitle: 'The Code of Civil Procedure, 1908',
    aliases: [
      'cpc',
      'c.p.c',
      'c p c',
      'code of civil procedure',
      'civil procedure code',
      'civil procedure',
      'দেওয়ানি কার্যবিধি',
      'দেওয়ানী কার্যবিধি',
      'act v of 1908',
      'act 5 of 1908',
    ],
  },
  {
    lawId: 'bd-constitution-1972',
    canonicalTitle: 'The Constitution of the People’s Republic of Bangladesh',
    aliases: [
      'constitution',
      'bangladesh constitution',
      'constitution of bangladesh',
      'সংবিধান',
      'গণপ্রজাতন্ত্রী বাংলাদেশের সংবিধান',
      'constitution 1972',
      'সংবিধান ১৯৭২',
    ],
  },
  {
    lawId: 'bd-labour-act-2006',
    canonicalTitle: 'The Bangladesh Labour Act, 2006',
    aliases: [
      'labour act',
      'labor act',
      'bangladesh labour act',
      'বাংলাদেশ শ্রম আইন',
      'শ্রম আইন',
      'শ্রম আইন ২০০৬',
      'act xlii of 2006',
      'act 42 of 2006',
    ],
  },
  {
    lawId: 'bd-contract-act-1872',
    canonicalTitle: 'The Contract Act, 1872',
    aliases: [
      'contract act',
      'the contract act',
      'চুক্তি আইন',
      'চুক্তি আইন ১৮৭২',
      'act ix of 1872',
      'act 9 of 1872',
    ],
  },
  {
    lawId: 'bd-muslim-family-laws-1961',
    canonicalTitle: 'The Muslim Family Laws Ordinance, 1961',
    aliases: [
      'muslim family laws',
      'family laws ordinance',
      'mflo',
      'মুসলিম পারিবারিক আইন',
      'পারিবারিক আইন অধ্যাদেশ',
      'ordinance viii of 1961',
    ],
  },
  {
    lawId: 'bd-environment-act-1995',
    canonicalTitle: 'Bangladesh Environment Conservation Act, 1995',
    aliases: [
      'environment conservation act',
      'environment act',
      'eca',
      'eca 1995',
      'পরিবেশ সংরক্ষণ আইন',
      'act i of 1995',
    ],
  },
  {
    lawId: 'bd-cyber-security-2023',
    canonicalTitle: 'Cyber Security Act, 2023',
    aliases: [
      'cyber security act',
      'cyber security',
      'csa',
      'সাইবার নিরাপত্তা আইন',
      'act xxvii of 2023',
    ],
  },
  {
    lawId: 'int-udhr-1948',
    canonicalTitle: 'Universal Declaration of Human Rights (UDHR)',
    aliases: [
      'udhr',
      'universal declaration of human rights',
      'universal declaration',
      'মানবাধিকারের সার্বজনীন ঘোষণাপত্র',
    ],
  },
  {
    lawId: 'int-iccpr-1966',
    canonicalTitle: 'International Covenant on Civil and Political Rights (ICCPR)',
    aliases: [
      'iccpr',
      'civil and political rights',
    ],
  },
];

export interface ParsedLegalTokens {
  sectionNumber?: string;
  isArticle?: boolean;
  isOrderRule?: boolean;
  orderNumber?: string;
  ruleNumber?: string;
  detectedActId?: string;
  detectedActTitle?: string;
  cleanRemainingTokens: string[];
}

/**
 * Extracts statutory provision tokens (Section, Article, Order/Rule)
 * and detects known Act aliases from the normalized query.
 */
export function extractLegalTokens(query: string): ParsedLegalTokens {
  const normalized = normalizeQueryString(query);
  let detectedActId: string | undefined;
  let detectedActTitle: string | undefined;

  // 1. Detect explicit Act references
  for (const act of KNOWN_ACT_REGISTRY) {
    for (const alias of act.aliases) {
      const aliasRegex = new RegExp(`\\b${alias.replace(/\./g, '\\.')}\\b`, 'i');
      if (aliasRegex.test(normalized)) {
        detectedActId = act.lawId;
        detectedActTitle = act.canonicalTitle;
        break;
      }
    }
    if (detectedActId) break;
  }

  // 2. Detect Order & Rule syntax: "Order 39 Rule 1", "Order 39, Rule 2", "আদেশ ৩৯ বিধি ১"
  const orderRuleMatch = normalized.match(
    /(?:order|আদেশ)\s*([0-9ivx]+)(?:[\s,]+(?:rule|বিধি)\s*([0-9]+))?/i
  );
  if (orderRuleMatch) {
    const orderNum = orderRuleMatch[1].toUpperCase();
    const ruleNum = orderRuleMatch[2];
    const sectionFormatted = ruleNum ? `Order ${orderNum}, Rule ${ruleNum}` : `Order ${orderNum}`;
    return {
      sectionNumber: sectionFormatted,
      isOrderRule: true,
      orderNumber: orderNum,
      ruleNumber: ruleNum,
      detectedActId: detectedActId || 'bd-cpc-1908', // CPC is the primary statutory home of Orders
      detectedActTitle: detectedActTitle || 'The Code of Civil Procedure, 1908',
      cleanRemainingTokens: normalized.split(' ').filter(Boolean),
    };
  }

  // 3. Detect Article syntax: "Article 102", "Art 32", "অনুচ্ছেদ ২৭"
  const articleMatch = normalized.match(/(?:article|art|অনুচ্ছেদ)\s*([0-9]+[a-z]?)/i);
  if (articleMatch) {
    const artNum = `Article ${articleMatch[1]}`;
    return {
      sectionNumber: artNum,
      isArticle: true,
      detectedActId: detectedActId || (detectedActId ? detectedActId : 'bd-constitution-1972'),
      detectedActTitle: detectedActTitle || 'The Constitution of the People’s Republic of Bangladesh',
      cleanRemainingTokens: normalized.split(' ').filter(Boolean),
    };
  }

  // 4. Detect Section syntax: "Section 300", "Sec 54", "ধারা ৯৬", "sec. 89a"
  const sectionMatch = normalized.match(/(?:section|sec|ধারা)\s*([0-9]+[a-z]?)/i);
  if (sectionMatch) {
    return {
      sectionNumber: `Section ${sectionMatch[1].toUpperCase()}`,
      detectedActId,
      detectedActTitle,
      cleanRemainingTokens: normalized.split(' ').filter(Boolean),
    };
  }

  // 5. Detect Standalone numeric token if query is short (e.g. "300", "54", "102", "89A")
  const standaloneNumericMatch = normalized.match(/^([0-9]+[a-z]?)$/i);
  if (standaloneNumericMatch) {
    const num = standaloneNumericMatch[1].toUpperCase();
    return {
      sectionNumber: `Section ${num}`,
      detectedActId,
      detectedActTitle,
      cleanRemainingTokens: [num],
    };
  }

  return {
    detectedActId,
    detectedActTitle,
    cleanRemainingTokens: normalized.split(' ').filter(Boolean),
  };
}

// ============================================================================
// 3. SECTION IDENTIFIER NORMALIZER
// ============================================================================

/**
 * Extracts pure numeric/alphanumeric provision token for uniform matching
 * (e.g. "Section 300" -> "300", "Article 102" -> "102", "Order 39, Rule 1" -> "39:1")
 */
export function normalizeSectionIdentifier(raw: string): string {
  const converted = convertBengaliDigits(raw).toLowerCase().trim();
  const orderRule = converted.match(/order\s*([0-9ivx]+)[\s,]+rule\s*([0-9]+)/i);
  if (orderRule) return `order-${orderRule[1]}-rule-${orderRule[2]}`.toLowerCase();

  const standard = converted.match(/(?:section|sec|article|art|ধারা|অনুচ্ছেদ)\s*([0-9]+[a-z]?)/i);
  if (standard) return standard[1].toLowerCase();

  return converted.replace(/[^a-z0-9]/gi, '');
}

// ============================================================================
// 4. MULTI-DATASET SEARCH & SCORING IMPLEMENTATION
// ============================================================================

/**
 * Searches across curated LAWS_DATABASE provisions and metadata
 */
function searchLawsDatabase(
  query: string,
  normalized: string,
  parsedTokens: ParsedLegalTokens,
  targetJurisdiction?: string
): LegalRetrievalResult[] {
  const results: LegalRetrievalResult[] = [];

  for (const law of LAWS_DATABASE) {
    if (targetJurisdiction && targetJurisdiction !== 'All' && law.jurisdiction !== targetJurisdiction) {
      continue;
    }

    const lawTitleLower = law.title.toLowerCase();
    const lawTitleBnLower = law.titleBn.toLowerCase();
    const shortTitleLower = (law.shortTitle || '').toLowerCase();
    const overviewLower = law.overview.toLowerCase();
    const actNumberLower = (law.actNumber || '').toLowerCase();
    const isTargetAct = parsedTokens.detectedActId === law.id;

    // --- A. Section-Level Provision Matching ---
    if (law.sections && law.sections.length > 0) {
      for (const sec of law.sections) {
        const secNumLower = sec.number.toLowerCase();
        const secTitleLower = sec.title.toLowerCase();
        const secContentLower = sec.content.toLowerCase();
        const secExplainLower = (sec.simpleExplanation || '').toLowerCase();

        const matchReasons: MatchReasonType[] = [];
        let score = 0;

        // 1. Exact Section Match with Identified Act
        if (parsedTokens.sectionNumber) {
          const queryNormSec = normalizeSectionIdentifier(parsedTokens.sectionNumber);
          const secNormSec = normalizeSectionIdentifier(sec.number);

          if (queryNormSec === secNormSec) {
            if (isTargetAct) {
              score = 100;
              matchReasons.push('exact-act-and-section');
            } else if (!parsedTokens.detectedActId) {
              score = 88; // Candidate section without explicit Act
              matchReasons.push('exact-section-candidate');
            }
          }
        }

        // 2. Section Title Match
        if (secTitleLower.includes(normalized) || (sec.titleBn && sec.titleBn.toLowerCase().includes(normalized))) {
          score = Math.max(score, isTargetAct ? 85 : 70);
          matchReasons.push('section-title-match');
        }

        // 3. Verbatim Content or Explanation Match
        if (secContentLower.includes(normalized)) {
          score = Math.max(score, isTargetAct ? 65 : 45);
          matchReasons.push('statutory-content-match');
        } else if (secExplainLower.includes(normalized)) {
          score = Math.max(score, isTargetAct ? 60 : 40);
          matchReasons.push('explanation-match');
        }

        if (score > 0) {
          results.push({
            id: `${law.id}:${sec.number}`,
            recordType: law.jurisdiction === 'International' ? 'treaty-provision' : 'statutory-provision',
            sourceId: law.id,
            displayTitle: law.title,
            displayTitleBn: law.titleBn,
            identifier: sec.number,
            identifierBn: sec.titleBn ? `${sec.titleBn} (${sec.number})` : undefined,
            matchingText: sec.content,
            matchingTextBn: sec.contentBn,
            explanation: sec.simpleExplanation,
            penaltyOrRemedy: sec.punishmentOrRemedy,
            relevanceScore: score,
            matchReasons,
            internalDestination: `/law/${law.id}?section=${encodeURIComponent(sec.number)}`,
            officialSourceUrl: law.sourceVerificationUrl,
            officialGazetteRef: law.officialGazetteRef,
            sourceCompleteness: law.isCuratedSubset ? 'curated-section-subset' : 'full-statutory-text',
            jurisdiction: law.jurisdiction,
            status: law.status,
            repealNote: law.repealNote,
          });
        }
      }
    }

    // --- B. Statute-Level Metadata Matching ---
    let actScore = 0;
    const actReasons: MatchReasonType[] = [];

    if (isTargetAct) {
      actScore = parsedTokens.sectionNumber ? 75 : 90;
      actReasons.push('exact-act-title');
    } else if (lawTitleLower.includes(normalized) || lawTitleBnLower.includes(normalized)) {
      actScore = 80;
      actReasons.push('exact-act-title');
    } else if (shortTitleLower.includes(normalized) || actNumberLower.includes(normalized)) {
      actScore = 75;
      actReasons.push('act-abbreviation');
    } else if (overviewLower.includes(normalized)) {
      actScore = 40;
      actReasons.push('token-overlap');
    }

    if (actScore > 0) {
      results.push({
        id: `${law.id}:root`,
        recordType: 'statute-metadata',
        sourceId: law.id,
        displayTitle: law.title,
        displayTitleBn: law.titleBn,
        identifier: law.actNumber,
        matchingText: law.overview,
        matchingTextBn: law.overviewBn,
        explanation: law.simpleSummary || law.overview,
        relevanceScore: actScore,
        matchReasons: actReasons,
        internalDestination: `/law/${law.id}`,
        officialSourceUrl: law.sourceVerificationUrl,
        officialGazetteRef: law.officialGazetteRef,
        sourceCompleteness: law.isCuratedSubset ? 'curated-section-subset' : 'full-statutory-text',
        jurisdiction: law.jurisdiction,
        status: law.status,
        repealNote: law.repealNote,
      });
    }
  }

  return results;
}

/**
 * Searches Bangladesh Code Catalog records to support statutes not in LAWS_DATABASE
 */
function searchBangladeshCodeCatalog(
  normalized: string,
  parsedTokens: ParsedLegalTokens,
  existingLawIds: Set<string>
): LegalRetrievalResult[] {
  const results: LegalRetrievalResult[] = [];

  for (const record of BANGLADESH_CODE_CATALOG) {
    // Avoid duplicate representations if the Act is already indexed in LAWS_DATABASE
    if (existingLawIds.has(record.id)) continue;

    const titleLower = record.title.toLowerCase();
    const titleBnLower = record.titleBn.toLowerCase();
    const shortTitleLower = record.shortTitle.toLowerCase();
    const actNumLower = record.actNumber.toLowerCase();
    const keywords = (record.keywords || []).map((k) => k.toLowerCase());

    let recordScore = 0;
    const reasons: MatchReasonType[] = [];

    if (titleLower.includes(normalized) || titleBnLower.includes(normalized)) {
      recordScore = 80;
      reasons.push('exact-act-title');
    } else if (shortTitleLower.includes(normalized) || actNumLower.includes(normalized)) {
      recordScore = 75;
      reasons.push('act-abbreviation');
    } else if (keywords.some((kw) => kw.includes(normalized))) {
      recordScore = 55;
      reasons.push('keyword-match');
    }

    if (recordScore > 0) {
      results.push({
        id: `${record.id}:catalog`,
        recordType: 'statute-metadata',
        sourceId: record.id,
        displayTitle: record.title,
        displayTitleBn: record.titleBn,
        identifier: record.actNumber,
        matchingText: record.overview,
        matchingTextBn: record.overviewBn,
        explanation: record.overview,
        relevanceScore: recordScore,
        matchReasons: reasons,
        internalDestination: `/law/${record.id}`,
        officialSourceUrl: record.sourceUrl,
        officialGazetteRef: record.officialGazetteCitation,
        sourceCompleteness: 'catalog-metadata-only',
        jurisdiction: record.jurisdiction,
        status: record.status,
      });
    }

    // Check catalog sections if present
    if (record.sections && record.sections.length > 0) {
      for (const sec of record.sections) {
        if (parsedTokens.sectionNumber) {
          const qSecNorm = normalizeSectionIdentifier(parsedTokens.sectionNumber);
          const secNorm = normalizeSectionIdentifier(sec.number);
          if (qSecNorm === secNorm) {
            results.push({
              id: `${record.id}:${sec.number}`,
              recordType: 'statutory-provision',
              sourceId: record.id,
              displayTitle: record.title,
              displayTitleBn: record.titleBn,
              identifier: sec.number,
              identifierBn: sec.titleBn,
              matchingText: sec.content,
              matchingTextBn: sec.contentBn,
              explanation: sec.simpleExplanation,
              penaltyOrRemedy: sec.penalty,
              relevanceScore: parsedTokens.detectedActId === record.id ? 98 : 86,
              matchReasons: parsedTokens.detectedActId === record.id ? ['exact-act-and-section'] : ['exact-section-candidate'],
              internalDestination: `/law/${record.id}?section=${encodeURIComponent(sec.number)}`,
              officialSourceUrl: record.sourceUrl,
              officialGazetteRef: record.officialGazetteCitation,
              sourceCompleteness: 'curated-section-subset',
              jurisdiction: record.jurisdiction,
              status: record.status,
            });
          }
        }
      }
    }
  }

  return results;
}

/**
 * Searches curated legal glossary entries
 */
function searchGlossary(normalized: string): LegalRetrievalResult[] {
  const results: LegalRetrievalResult[] = [];

  for (const item of GLOSSARY_TERMS) {
    const termLower = item.term.toLowerCase();
    const termBnLower = (item.termBn || '').toLowerCase();
    const defLower = item.definition.toLowerCase();

    let score = 0;
    const reasons: MatchReasonType[] = [];

    if (termLower === normalized || (termBnLower && termBnLower === normalized)) {
      score = 90;
      reasons.push('glossary-exact');
    } else if (
      normalized.includes(termLower) ||
      termLower.includes(normalized) ||
      (termBnLower && normalized.includes(termBnLower))
    ) {
      score = 80;
      reasons.push('glossary-exact');
    } else if (defLower.includes(normalized)) {
      score = 45;
      reasons.push('statutory-content-match');
    }

    if (score > 0) {
      results.push({
        id: `glossary:${item.term}`,
        recordType: 'glossary-term',
        sourceId: 'NYAYOTA_GLOSSARY',
        displayTitle: item.term,
        displayTitleBn: item.termBn,
        identifier: `Term (${item.category})`,
        matchingText: item.definition,
        explanation: item.simpleExplanation,
        relevanceScore: score,
        matchReasons: reasons,
        internalDestination: `/glossary?term=${encodeURIComponent(item.term)}`,
        sourceCompleteness: 'conceptual-definition',
        jurisdiction: item.jurisdiction || 'Universal',
      });
    }
  }

  return results;
}

/**
 * Searches practical procedural outcome scenarios
 */
function searchOutcomeScenarios(normalized: string): LegalRetrievalResult[] {
  const results: LegalRetrievalResult[] = [];

  for (const scenario of LEGAL_OUTCOME_SCENARIOS_DATA) {
    const titleLower = scenario.topicTitle.toLowerCase();
    const titleBnLower = scenario.topicTitleBn.toLowerCase();
    const summaryLower = scenario.scenarioSummary.toLowerCase();
    const legalAreaLower = scenario.legalArea.toLowerCase();

    let score = 0;
    const reasons: MatchReasonType[] = [];

    const isExactTitle = titleLower === normalized || (titleBnLower && titleBnLower === normalized);
    const isContained =
      normalized.includes(titleLower) ||
      titleLower.includes(normalized) ||
      (titleBnLower && normalized.includes(titleBnLower));

    const isKeywordHit =
      (normalized.includes('cheque') && scenario.id === 'scenario-cheque-dishonor-ni-act') ||
      (normalized.includes('arrest') && scenario.id === 'scenario-unlawful-arrest') ||
      (normalized.includes('gd') && scenario.id === 'scenario-unlawful-arrest') ||
      (normalized.includes('theft') && scenario.id === 'scenario-theft-fraud') ||
      (normalized.includes('contract') && scenario.id === 'scenario-commercial-contract-breach') ||
      (normalized.includes('injunction') && scenario.id === 'scenario-temporary-injunction-property') ||
      (normalized.includes('cyber') && scenario.id === 'scenario-cyber-extortion');

    if (isExactTitle) {
      score = 90;
      reasons.push('scenario-match');
    } else if (isContained) {
      score = 80;
      reasons.push('scenario-match');
    } else if (isKeywordHit) {
      score = 75;
      reasons.push('scenario-match');
    } else if (summaryLower.includes(normalized) || legalAreaLower.includes(normalized) || normalized.includes(legalAreaLower)) {
      score = 58;
      reasons.push('keyword-match');
    }

    if (score > 0) {
      results.push({
        id: `outcome:${scenario.id}`,
        recordType: 'outcome-scenario',
        sourceId: scenario.id,
        displayTitle: scenario.topicTitle,
        displayTitleBn: scenario.topicTitleBn,
        matchingText: scenario.proceduralSteps && scenario.proceduralSteps.length > 0
          ? `${scenario.scenarioSummary}\n\nProcedural Steps:\n` +
            scenario.proceduralSteps.map((s) => `${s.step}. ${s.title}: ${s.description}`).join('\n')
          : scenario.scenarioSummary,
        matchingTextBn: scenario.scenarioSummaryBn,
        explanation: `Procedural guidance: ${scenario.proceduralClassification.filingMechanism} (${scenario.proceduralClassification.trialCourt})`,
        penaltyOrRemedy: scenario.statutoryConsequences.civilRemedies.join('; ') || scenario.statutoryConsequences.potentialPenalties.join('; '),
        relevanceScore: score,
        matchReasons: reasons,
        internalDestination: `/legal-outcome-guide?topic=${encodeURIComponent(scenario.id)}`,
        sourceCompleteness: 'procedural-guide',
        jurisdiction: scenario.jurisdiction,
      });
    }
  }

  return results;
}

// ============================================================================
// 5. PUBLIC RETRIEVAL ENGINE ENTRY POINT
// ============================================================================

/**
 * Executes source-grounded legal retrieval over Nyayota's verified collections.
 * 
 * Features:
 * - Deterministic relevance ranking
 * - Distinguishes exact section matches from ambiguous section tokens
 * - Identifies Act-found-section-missing conditions without inventing content
 * - Deduplicates results across composite datasets
 * - Provides verified internal URLs and authentic gazette links
 */
export function retrieveLegalSources(
  query: string,
  options: RetrievalOptions = {}
): LegalRetrievalResponse {
  const startTime = typeof performance !== 'undefined' ? performance.now() : Date.now();
  const normalized = normalizeQueryString(query);

  // 1. Guard against empty queries
  if (!normalized) {
    return {
      query: query || '',
      normalizedQuery: '',
      totalMatches: 0,
      results: [],
      ambiguityStatus: 'none',
      executionTimeMs: 0,
      status: 'empty-query',
    };
  }

  const limit = Math.min(Math.max(options.limit || 8, 1), 25);
  const minScore = options.minScore || 20;
  const parsedTokens = extractLegalTokens(normalized);

  // 2. Query Curated Datasets
  const lawsDbMatches = searchLawsDatabase(
    query,
    normalized,
    parsedTokens,
    options.targetJurisdiction
  );

  const existingLawIds = new Set(LAWS_DATABASE.map((l) => l.id));

  // Search Bangladesh Code catalog if enabled
  const catalogMatches = options.includeCatalogRecords !== false
    ? searchBangladeshCodeCatalog(normalized, parsedTokens, existingLawIds)
    : [];

  const glossaryMatches = searchGlossary(normalized);
  const scenarioMatches = searchOutcomeScenarios(normalized);

  // 3. Aggregate all candidate matches
  let allMatches: LegalRetrievalResult[] = [
    ...lawsDbMatches,
    ...catalogMatches,
    ...glossaryMatches,
    ...scenarioMatches,
  ];

  // Apply optional record type filter
  if (options.recordTypes && options.recordTypes.length > 0) {
    const allowedTypes = new Set(options.recordTypes);
    allMatches = allMatches.filter((m) => allowedTypes.has(m.recordType));
  }

  // Filter by minimum score
  allMatches = allMatches.filter((m) => m.relevanceScore >= minScore);

  // 4. Handle Ambiguous Section Numbers
  let ambiguityStatus: AmbiguityStatus = 'none';
  let ambiguousCandidates: LegalRetrievalResult[] | undefined;

  if (parsedTokens.sectionNumber) {
    const sectionProvisionMatches = allMatches.filter(
      (m) =>
        m.recordType === 'statutory-provision' &&
        m.identifier &&
        normalizeSectionIdentifier(m.identifier) === normalizeSectionIdentifier(parsedTokens.sectionNumber!)
    );

    if (parsedTokens.detectedActId) {
      // Act was explicitly specified
      const exactActMatch = sectionProvisionMatches.find((m) => m.sourceId === parsedTokens.detectedActId);
      if (exactActMatch) {
        ambiguityStatus = 'unambiguous';
      } else {
        // The Act was recognized, but the section was not found in our curated subset
        ambiguityStatus = 'act-found-section-missing';
      }
    } else {
      // User provided a section number without specifying an Act (e.g. "Section 54")
      if (sectionProvisionMatches.length > 1) {
        ambiguityStatus = 'ambiguous-section-multiple-acts';
        ambiguousCandidates = sectionProvisionMatches;
        // Mark each candidate result with ambiguity provenance
        sectionProvisionMatches.forEach((cand) => {
          cand.isAmbiguous = true;
          cand.ambiguityDetails = {
            sectionNumber: parsedTokens.sectionNumber!,
            candidateLawIds: sectionProvisionMatches.map((c) => c.sourceId),
            candidateLawTitles: sectionProvisionMatches.map((c) => c.displayTitle),
            note: `Multiple statutes contain ${parsedTokens.sectionNumber}. Please specify the relevant Act.`,
          };
        });
      } else if (sectionProvisionMatches.length === 1) {
        ambiguityStatus = 'section-only-no-act';
        ambiguousCandidates = sectionProvisionMatches;
      }
    }
  }

  // 5. Deterministic Deduplication (preserve highest score per unique ID)
  const dedupedMap = new Map<string, LegalRetrievalResult>();
  for (const item of allMatches) {
    const existing = dedupedMap.get(item.id);
    if (!existing || item.relevanceScore > existing.relevanceScore) {
      dedupedMap.set(item.id, item);
    }
  }

  const dedupedResults = Array.from(dedupedMap.values());

  // 6. Sort Deterministically by Score Descending
  dedupedResults.sort((a, b) => {
    if (b.relevanceScore !== a.relevanceScore) {
      return b.relevanceScore - a.relevanceScore;
    }
    return a.displayTitle.localeCompare(b.displayTitle);
  });

  const finalResults = dedupedResults.slice(0, limit);
  const endTime = typeof performance !== 'undefined' ? performance.now() : Date.now();
  const executionTimeMs = Math.round((endTime - startTime) * 100) / 100;

  // Determine high-level outcome status
  let status: LegalRetrievalResponse['status'] = 'success';
  if (finalResults.length === 0) {
    status = 'no-match';
  } else if (ambiguityStatus === 'act-found-section-missing') {
    status = 'act-found-section-missing';
  } else if (ambiguityStatus === 'ambiguous-section-multiple-acts') {
    status = 'ambiguous-section';
  }

  return {
    query,
    normalizedQuery: normalized,
    totalMatches: dedupedResults.length,
    results: finalResults,
    ambiguityStatus,
    ambiguousCandidates,
    detectedActHints: parsedTokens.detectedActTitle ? [parsedTokens.detectedActTitle] : undefined,
    detectedSectionNumber: parsedTokens.sectionNumber,
    executionTimeMs,
    status,
  };
}
