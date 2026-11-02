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
  CrossReferenceMention,
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

interface CompiledActMeta {
  lawId: string;
  canonicalTitle: string;
  asciiPatterns: RegExp[];
  nonAsciiAliases: string[];
}

const COMPILED_ACT_REGISTRY: CompiledActMeta[] = KNOWN_ACT_REGISTRY.map((act) => {
  const asciiPatterns: RegExp[] = [];
  const nonAsciiAliases: string[] = [];

  for (const alias of act.aliases) {
    if (/[^\x00-\x7F]/.test(alias)) {
      nonAsciiAliases.push(alias);
    } else {
      asciiPatterns.push(new RegExp(`\\b${alias.replace(/\./g, '\\.')}\\b`, 'i'));
    }
  }

  return {
    lawId: act.lawId,
    canonicalTitle: act.canonicalTitle,
    asciiPatterns,
    nonAsciiAliases,
  };
});

/**
 * Extracts statutory provision tokens (Section, Article, Order/Rule)
 * and detects known Act aliases from the normalized query.
 */
export function extractLegalTokens(query: string): ParsedLegalTokens {
  const normalized = normalizeQueryString(query);
  let detectedActId: string | undefined;
  let detectedActTitle: string | undefined;

  // 1. Detect explicit Act references using precompiled matchers
  for (const act of COMPILED_ACT_REGISTRY) {
    for (const nonAscii of act.nonAsciiAliases) {
      if (normalized.includes(nonAscii)) {
        detectedActId = act.lawId;
        detectedActTitle = act.canonicalTitle;
        break;
      }
    }
    if (detectedActId) break;

    for (const pattern of act.asciiPatterns) {
      if (pattern.test(normalized)) {
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

  // 5. Detect number attached to detected Act (e.g. "Penal Code 302", "CrPC 54", "দণ্ডবিধি ৩০২")
  if (detectedActId) {
    const enactmentYears = new Set(['1860', '1898', '1908', '1972', '2006', '1872', '1961', '1995', '2023', '1948', '1966']);
    const numbersInQuery = normalized.match(/\b([0-9]+[a-z]?)\b/gi) || [];
    const nonYearNumbers = numbersInQuery.filter((n) => !enactmentYears.has(n));
    if (nonYearNumbers.length === 1) {
      const num = nonYearNumbers[0].toUpperCase();
      return {
        sectionNumber: `Section ${num}`,
        detectedActId,
        detectedActTitle,
        cleanRemainingTokens: normalized.split(' ').filter(Boolean),
      };
    }
  }

  // 6. Detect Standalone numeric token if query is short (e.g. "300", "54", "102", "89A")
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
// 4. PRE-INDEXED LEGAL DATASETS (MODULE-LEVEL STATIC OPTIMIZATIONS)
// ============================================================================

export const EXISTING_LAW_IDS: ReadonlySet<string> = new Set(LAWS_DATABASE.map((l) => l.id));

interface IndexedLawSection {
  number: string;
  normSec: string;
  title: string;
  titleLower: string;
  titleBn?: string;
  titleBnLower?: string;
  content: string;
  contentLower: string;
  contentBn?: string;
  simpleExplanation?: string;
  explainLower: string;
  punishmentOrRemedy?: string;
  penaltyLower: string;
}

interface IndexedLawItem {
  raw: LawItem;
  id: string;
  jurisdiction: string;
  title: string;
  titleLower: string;
  titleBn: string;
  titleBnLower: string;
  shortTitleLower: string;
  overview: string;
  overviewLower: string;
  actNumber?: string;
  actNumberLower: string;
  totalStatutorySectionsCount?: number;
  sections: IndexedLawSection[];
  exactSectionMap: Map<string, IndexedLawSection>;
}

const INDEXED_LAWS_DB: IndexedLawItem[] = LAWS_DATABASE.map((law) => {
  const sections: IndexedLawSection[] = (law.sections || []).map((sec) => ({
    number: sec.number,
    normSec: normalizeSectionIdentifier(sec.number),
    title: sec.title,
    titleLower: sec.title.toLowerCase(),
    titleBn: sec.titleBn,
    titleBnLower: sec.titleBn ? sec.titleBn.toLowerCase() : undefined,
    content: sec.content,
    contentLower: sec.content.toLowerCase(),
    contentBn: sec.contentBn,
    simpleExplanation: sec.simpleExplanation,
    explainLower: (sec.simpleExplanation || '').toLowerCase(),
    punishmentOrRemedy: sec.punishmentOrRemedy,
    penaltyLower: (sec.punishmentOrRemedy || '').toLowerCase(),
  }));

  const exactSectionMap = new Map<string, IndexedLawSection>();
  for (const s of sections) {
    if (!exactSectionMap.has(s.normSec)) {
      exactSectionMap.set(s.normSec, s);
    }
  }

  return {
    raw: law,
    id: law.id,
    jurisdiction: law.jurisdiction,
    title: law.title,
    titleLower: law.title.toLowerCase(),
    titleBn: law.titleBn,
    titleBnLower: law.titleBn.toLowerCase(),
    shortTitleLower: (law.shortTitle || '').toLowerCase(),
    overview: law.overview,
    overviewLower: law.overview.toLowerCase(),
    actNumber: law.actNumber,
    actNumberLower: (law.actNumber || '').toLowerCase(),
    totalStatutorySectionsCount: law.totalStatutorySectionsCount,
    sections,
    exactSectionMap,
  };
});

interface IndexedCatalogSection {
  number: string;
  title: string;
  titleBn?: string;
  content: string;
  contentBn?: string;
  simpleExplanation?: string;
  penalty?: string;
  normSec: string;
}

interface IndexedCatalogRecord {
  raw: BangladeshLawRecord;
  id: string;
  title: string;
  titleLower: string;
  titleBn?: string;
  titleBnLower: string;
  shortTitleLower: string;
  actNumber: string;
  actNumberLower: string;
  keywordsLower: string[];
  sections: IndexedCatalogSection[];
}

const INDEXED_CATALOG: IndexedCatalogRecord[] = BANGLADESH_CODE_CATALOG
  .filter((record) => !EXISTING_LAW_IDS.has(record.id))
  .map((record) => ({
    raw: record,
    id: record.id,
    title: record.title,
    titleLower: record.title.toLowerCase(),
    titleBn: record.titleBn,
    titleBnLower: (record.titleBn || '').toLowerCase(),
    shortTitleLower: (record.shortTitle || '').toLowerCase(),
    actNumber: record.actNumber,
    actNumberLower: (record.actNumber || '').toLowerCase(),
    keywordsLower: (record.keywords || []).map((k) => k.toLowerCase()),
    sections: (record.sections || []).map((s) => ({
      number: s.number,
      title: s.title,
      titleBn: s.titleBn,
      content: s.content,
      contentBn: s.contentBn,
      simpleExplanation: s.simpleExplanation,
      penalty: s.penalty,
      normSec: normalizeSectionIdentifier(s.number),
    })),
  }));

interface IndexedGlossaryItem {
  raw: GlossaryTerm;
  termLower: string;
  termBnLower: string;
  defLower: string;
}

const INDEXED_GLOSSARY: IndexedGlossaryItem[] = GLOSSARY_TERMS.map((item) => ({
  raw: item,
  termLower: item.term.toLowerCase(),
  termBnLower: (item.termBn || '').toLowerCase(),
  defLower: item.definition.toLowerCase(),
}));

interface IndexedScenarioItem {
  raw: LegalOutcomeScenario;
  id: string;
  titleLower: string;
  titleBnLower: string;
  summaryLower: string;
  legalAreaLower: string;
}

const INDEXED_SCENARIOS: IndexedScenarioItem[] = LEGAL_OUTCOME_SCENARIOS_DATA.map((scenario) => ({
  raw: scenario,
  id: scenario.id,
  titleLower: scenario.topicTitle.toLowerCase(),
  titleBnLower: scenario.topicTitleBn.toLowerCase(),
  summaryLower: scenario.scenarioSummary.toLowerCase(),
  legalAreaLower: scenario.legalArea.toLowerCase(),
}));

// ============================================================================
// 5. MULTI-DATASET SEARCH & SCORING IMPLEMENTATION
// ============================================================================

interface LawsDbSearchResult {
  results: LegalRetrievalResult[];
  sectionExceeds?: {
    sectionNumber: string;
    statuteTitle: string;
    totalStatutorySections: number;
  };
}

function searchLawsDatabase(
  query: string,
  normalized: string,
  parsedTokens: ParsedLegalTokens,
  targetJurisdiction?: string,
  crossReferenceMentions: CrossReferenceMention[] = []
): LawsDbSearchResult {
  const results: LegalRetrievalResult[] = [];
  let sectionExceeds: { sectionNumber: string; statuteTitle: string; totalStatutorySections: number } | undefined;

  // Hoist query-level regex and normalized section tokens before statute loops
  let queryNormSec: string | undefined;
  let secRefRegex: RegExp | undefined;

  if (parsedTokens.sectionNumber) {
    queryNormSec = normalizeSectionIdentifier(parsedTokens.sectionNumber);
    secRefRegex = new RegExp(`\\b(?:section|sec|ধারা)?\\s*${queryNormSec}\\b`, 'i');
  }

  for (const law of INDEXED_LAWS_DB) {
    if (targetJurisdiction && targetJurisdiction !== 'All' && law.jurisdiction !== targetJurisdiction) {
      continue;
    }

    const isTargetAct = parsedTokens.detectedActId === law.id;

    // Check if queried section exceeds total codified sections of this statute
    if (isTargetAct && parsedTokens.sectionNumber && law.totalStatutorySectionsCount && queryNormSec) {
      const qNum = parseInt(queryNormSec, 10);
      if (!isNaN(qNum) && qNum > law.totalStatutorySectionsCount) {
        sectionExceeds = {
          sectionNumber: parsedTokens.sectionNumber,
          statuteTitle: law.title,
          totalStatutorySections: law.totalStatutorySectionsCount,
        };
      }
    }

    // --- A. Section-Level Provision Matching ---
    if (law.sections.length > 0) {
      if (parsedTokens.sectionNumber && queryNormSec) {
        // FAST-PATH: If target Act is explicitly known and this is a different Act,
        // it cannot match the section or produce target cross-references.
        if (parsedTokens.detectedActId && !isTargetAct) {
          // Skip section evaluation entirely for non-target statutes
        } else {
          for (const sec of law.sections) {
            if (queryNormSec === sec.normSec) {
              const score = isTargetAct ? 100 : 88;
              const matchReason: MatchReasonType = isTargetAct
                ? 'exact-act-and-section'
                : 'exact-section-candidate';

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
                matchReasons: [matchReason],
                internalDestination: `/law/${law.id}?section=${encodeURIComponent(sec.number)}`,
                officialSourceUrl: law.raw.sourceVerificationUrl,
                officialGazetteRef: law.raw.officialGazetteRef,
                sourceCompleteness: law.raw.isCuratedSubset ? 'curated-section-subset' : 'full-statutory-text',
                jurisdiction: law.jurisdiction,
                status: law.raw.status,
                repealNote: law.raw.repealNote,
              });
            } else if (secRefRegex) {
              // Queried section does not match this provision's section number.
              // Check if this section references the queried section in its penalty or text
              if (
                secRefRegex.test(sec.penaltyLower) ||
                secRefRegex.test(sec.contentLower) ||
                secRefRegex.test(sec.explainLower)
              ) {
                if (isTargetAct || !parsedTokens.detectedActId) {
                  crossReferenceMentions.push({
                    statuteId: law.id,
                    statuteTitle: law.title,
                    referencingSection: sec.number,
                    referencingSectionTitle: sec.title,
                    context: sec.punishmentOrRemedy || sec.content,
                    note: `${sec.number} (${sec.title}) cross-references ${parsedTokens.sectionNumber} in its penalty or procedural clause.`,
                  });
                }
              }
            }
          }
        }
      } else {
        // General topic queries without specific section number
        for (const sec of law.sections) {
          const matchReasons: MatchReasonType[] = [];
          let score = 0;

          if (
            sec.titleLower.includes(normalized) ||
            (sec.titleBnLower && sec.titleBnLower.includes(normalized))
          ) {
            score = Math.max(score, isTargetAct ? 85 : 70);
            matchReasons.push('section-title-match');
          }

          if (sec.contentLower.includes(normalized)) {
            score = Math.max(score, isTargetAct ? 65 : 45);
            matchReasons.push('statutory-content-match');
          } else if (sec.explainLower.includes(normalized)) {
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
              officialSourceUrl: law.raw.sourceVerificationUrl,
              officialGazetteRef: law.raw.officialGazetteRef,
              sourceCompleteness: law.raw.isCuratedSubset ? 'curated-section-subset' : 'full-statutory-text',
              jurisdiction: law.jurisdiction,
              status: law.raw.status,
              repealNote: law.raw.repealNote,
            });
          }
        }
      }
    }

    // --- B. Statute-Level Metadata Matching ---
    let actScore = 0;
    const actReasons: MatchReasonType[] = [];

    if (isTargetAct) {
      actScore = parsedTokens.sectionNumber ? 75 : 90;
      actReasons.push('exact-act-title');
    } else if (law.titleLower.includes(normalized) || law.titleBnLower.includes(normalized)) {
      actScore = 80;
      actReasons.push('exact-act-title');
    } else if (law.shortTitleLower.includes(normalized) || law.actNumberLower.includes(normalized)) {
      actScore = 75;
      actReasons.push('act-abbreviation');
    } else if (law.overviewLower.includes(normalized)) {
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
        matchingTextBn: law.raw.overviewBn,
        explanation: law.raw.simpleSummary || law.overview,
        relevanceScore: actScore,
        matchReasons: actReasons,
        internalDestination: `/law/${law.id}`,
        officialSourceUrl: law.raw.sourceVerificationUrl,
        officialGazetteRef: law.raw.officialGazetteRef,
        sourceCompleteness: law.raw.isCuratedSubset ? 'curated-section-subset' : 'full-statutory-text',
        jurisdiction: law.jurisdiction,
        status: law.raw.status,
        repealNote: law.raw.repealNote,
      });
    }
  }

  return { results, sectionExceeds };
}

/**
 * Searches pre-indexed Bangladesh Code Catalog records
 */
function searchBangladeshCodeCatalog(
  normalized: string,
  parsedTokens: ParsedLegalTokens
): LegalRetrievalResult[] {
  const results: LegalRetrievalResult[] = [];
  const queryNormSec = parsedTokens.sectionNumber
    ? normalizeSectionIdentifier(parsedTokens.sectionNumber)
    : undefined;

  for (const item of INDEXED_CATALOG) {
    let recordScore = 0;
    const reasons: MatchReasonType[] = [];

    if (item.titleLower.includes(normalized) || (item.titleBnLower && item.titleBnLower.includes(normalized))) {
      recordScore = 80;
      reasons.push('exact-act-title');
    } else if (item.shortTitleLower.includes(normalized) || item.actNumberLower.includes(normalized)) {
      recordScore = 75;
      reasons.push('act-abbreviation');
    } else if (item.keywordsLower.some((kw) => kw.includes(normalized))) {
      recordScore = 55;
      reasons.push('keyword-match');
    }

    if (recordScore > 0) {
      results.push({
        id: `${item.id}:catalog`,
        recordType: 'statute-metadata',
        sourceId: item.id,
        displayTitle: item.title,
        displayTitleBn: item.titleBn,
        identifier: item.actNumber,
        matchingText: item.raw.overview,
        matchingTextBn: item.raw.overviewBn,
        explanation: item.raw.overview,
        relevanceScore: recordScore,
        matchReasons: reasons,
        internalDestination: `/law/${item.id}`,
        officialSourceUrl: item.raw.sourceUrl,
        officialGazetteRef: item.raw.officialGazetteCitation,
        sourceCompleteness: 'catalog-metadata-only',
        jurisdiction: item.raw.jurisdiction,
        status: item.raw.status,
      });
    }

    // Check catalog sections if present
    if (queryNormSec && item.sections.length > 0) {
      if (parsedTokens.detectedActId && parsedTokens.detectedActId !== item.id) {
        continue;
      }
      for (const sec of item.sections) {
        if (queryNormSec === sec.normSec) {
          results.push({
            id: `${item.id}:${sec.number}`,
            recordType: 'statutory-provision',
            sourceId: item.id,
            displayTitle: item.title,
            displayTitleBn: item.titleBn,
            identifier: sec.number,
            identifierBn: sec.titleBn,
            matchingText: sec.content,
            matchingTextBn: sec.contentBn,
            explanation: sec.simpleExplanation,
            penaltyOrRemedy: sec.penalty,
            relevanceScore: parsedTokens.detectedActId === item.id ? 98 : 86,
            matchReasons:
              parsedTokens.detectedActId === item.id
                ? ['exact-act-and-section']
                : ['exact-section-candidate'],
            internalDestination: `/law/${item.id}?section=${encodeURIComponent(sec.number)}`,
            officialSourceUrl: item.raw.sourceUrl,
            officialGazetteRef: item.raw.officialGazetteCitation,
            sourceCompleteness: 'curated-section-subset',
            jurisdiction: item.raw.jurisdiction,
            status: item.raw.status,
          });
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

  for (const item of INDEXED_GLOSSARY) {
    let score = 0;
    const reasons: MatchReasonType[] = [];

    if (item.termLower === normalized || (item.termBnLower && item.termBnLower === normalized)) {
      score = 90;
      reasons.push('glossary-exact');
    } else if (
      normalized.includes(item.termLower) ||
      item.termLower.includes(normalized) ||
      (item.termBnLower && normalized.includes(item.termBnLower))
    ) {
      score = 80;
      reasons.push('glossary-exact');
    } else if (item.defLower.includes(normalized)) {
      score = 45;
      reasons.push('statutory-content-match');
    }

    if (score > 0) {
      results.push({
        id: `glossary:${item.raw.term}`,
        recordType: 'glossary-term',
        sourceId: 'NYAYOTA_GLOSSARY',
        displayTitle: item.raw.term,
        displayTitleBn: item.raw.termBn,
        identifier: `Term (${item.raw.category})`,
        matchingText: item.raw.definition,
        explanation: item.raw.simpleExplanation,
        relevanceScore: score,
        matchReasons: reasons,
        internalDestination: `/glossary?term=${encodeURIComponent(item.raw.term)}`,
        sourceCompleteness: 'conceptual-definition',
        jurisdiction: item.raw.jurisdiction || 'Universal',
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

  for (const item of INDEXED_SCENARIOS) {
    let score = 0;
    const reasons: MatchReasonType[] = [];

    const isExactTitle = item.titleLower === normalized || (item.titleBnLower && item.titleBnLower === normalized);
    const isContained =
      normalized.includes(item.titleLower) ||
      item.titleLower.includes(normalized) ||
      (item.titleBnLower && normalized.includes(item.titleBnLower));

    const isKeywordHit =
      (normalized.includes('cheque') && item.id === 'scenario-cheque-dishonor-ni-act') ||
      (normalized.includes('arrest') && item.id === 'scenario-unlawful-arrest') ||
      (normalized.includes('gd') && item.id === 'scenario-unlawful-arrest') ||
      (normalized.includes('theft') && item.id === 'scenario-theft-fraud') ||
      (normalized.includes('contract') && item.id === 'scenario-commercial-contract-breach') ||
      (normalized.includes('injunction') && item.id === 'scenario-temporary-injunction-property') ||
      (normalized.includes('cyber') && item.id === 'scenario-cyber-extortion');

    if (isExactTitle) {
      score = 90;
      reasons.push('scenario-match');
    } else if (isContained) {
      score = 80;
      reasons.push('scenario-match');
    } else if (isKeywordHit) {
      score = 75;
      reasons.push('scenario-match');
    } else if (
      item.summaryLower.includes(normalized) ||
      item.legalAreaLower.includes(normalized) ||
      normalized.includes(item.legalAreaLower)
    ) {
      score = 58;
      reasons.push('keyword-match');
    }

    if (score > 0) {
      results.push({
        id: `outcome:${item.id}`,
        recordType: 'outcome-scenario',
        sourceId: item.id,
        displayTitle: item.raw.topicTitle,
        displayTitleBn: item.raw.topicTitleBn,
        matchingText:
          item.raw.proceduralSteps && item.raw.proceduralSteps.length > 0
            ? `${item.raw.scenarioSummary}\n\nProcedural Steps:\n` +
              item.raw.proceduralSteps.map((s) => `${s.step}. ${s.title}: ${s.description}`).join('\n')
            : item.raw.scenarioSummary,
        matchingTextBn: item.raw.scenarioSummaryBn,
        explanation: `Procedural guidance: ${item.raw.proceduralClassification.filingMechanism} (${item.raw.proceduralClassification.trialCourt})`,
        penaltyOrRemedy:
          item.raw.statutoryConsequences.civilRemedies.join('; ') ||
          item.raw.statutoryConsequences.potentialPenalties.join('; '),
        relevanceScore: score,
        matchReasons: reasons,
        internalDestination: `/legal-outcome-guide?topic=${encodeURIComponent(item.id)}`,
        sourceCompleteness: 'procedural-guide',
        jurisdiction: item.raw.jurisdiction,
      });
    }
  }

  return results;
}

// ============================================================================
// 6. PUBLIC RETRIEVAL ENGINE ENTRY POINT
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
  const crossReferenceMentions: CrossReferenceMention[] = [];
  const { results: lawsDbMatches, sectionExceeds } = searchLawsDatabase(
    query,
    normalized,
    parsedTokens,
    options.targetJurisdiction,
    crossReferenceMentions
  );

  // Search Bangladesh Code catalog if enabled
  const catalogMatches =
    options.includeCatalogRecords !== false
      ? searchBangladeshCodeCatalog(normalized, parsedTokens)
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
      } else if (sectionExceeds) {
        ambiguityStatus = 'section-exceeds-statute-range';
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
      } else {
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
  if (sectionExceeds) {
    status = 'section-exceeds-statute-range';
  } else if (ambiguityStatus === 'act-found-section-missing') {
    status = 'act-found-section-missing';
  } else if (ambiguityStatus === 'ambiguous-section-multiple-acts' || ambiguityStatus === 'section-only-no-act') {
    status = 'ambiguous-section';
  } else if (finalResults.length === 0) {
    status = 'no-match';
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
    crossReferenceMentions: crossReferenceMentions.length > 0 ? crossReferenceMentions : undefined,
    sectionExceedsStatuteRange: sectionExceeds,
    executionTimeMs,
    status,
  };
}
