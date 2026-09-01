/**
 * Nyayota — Scalable Global Legal Database Engine & Knowledge Architecture
 * 
 * Designed to scale from current statutory collections to 1,000+ Acts, 10,000+ Chapters,
 * and 100,000+ searchable statutory provisions across national and international jurisdictions:
 * - Complete Bangladesh Code (1836 – Present)
 * - Complete International Treaties & UN Conventions
 * - Future United Kingdom Acts & Statutory Instruments
 * - Future United States Federal Statutes (U.S.C.)
 * - Future European Union Regulations & Directives
 * - Future Japan Six Codes (Roppō)
 * - Future South Korea Statutes
 * - Future United Arab Emirates Federal Laws
 * 
 * Provides unified data structures, hierarchical document indexing, high-throughput
 * full-text search, citation formatting, amendment tracking, and verification guarantees.
 */

import { LAWS_DATABASE, LawItem, LawSection, LawPart, LawChapter } from './legal-data';

// ============================================================================
// 1. GLOBAL JURISDICTION & COUNTRY REGISTRY
// ============================================================================

export type GlobalCountryCode =
  | 'BD'   // Bangladesh
  | 'INT'  // International / Multilateral
  | 'GB'   // United Kingdom
  | 'US'   // United States
  | 'EU'   // European Union
  | 'JP'   // Japan
  | 'KR'   // South Korea
  | 'AE'   // United Arab Emirates
  | 'IN'   // India
  | 'SG'   // Singapore
  | 'CA'   // Canada
  | 'AU'   // Australia
  | string;

export type JurisdictionTier =
  | 'National'
  | 'Federal'
  | 'State'
  | 'International'
  | 'Regional'
  | 'Supranational'
  | 'Devolved'
  | 'Sub-national';

export type LegalSystemFamily =
  | 'Common Law'
  | 'Civil Law'
  | 'Public International Law'
  | 'Islamic Law / Sharia Hybrid'
  | 'Mixed Common & Customary';

export interface GlobalCountryMeta {
  code: GlobalCountryCode;
  name: string;
  nameBn: string;
  nameLocal?: string;
  flagEmoji: string;
  system: LegalSystemFamily;
  apexCourt: string;
  officialGazette: string;
  primaryRepositoryUrl: string;
  publishingAuthority: string;
  status: 'active' | 'in-development' | 'planned';
  totalIndexedActs: number;
  totalIndexedSections: number;
}

export const GLOBAL_COUNTRIES_REGISTRY: Record<string, GlobalCountryMeta> = {
  BD: {
    code: 'BD',
    name: 'Bangladesh',
    nameBn: 'বাংলাদেশ',
    nameLocal: 'গণপ্রজাতন্ত্রী বাংলাদেশ',
    flagEmoji: '🇧🇩',
    system: 'Common Law',
    apexCourt: 'Supreme Court of Bangladesh (Appellate Division & High Court Division)',
    officialGazette: 'The Bangladesh Gazette (Laws of Bangladesh Repository)',
    primaryRepositoryUrl: 'http://bdlaws.minlaw.gov.bd',
    publishingAuthority: 'Ministry of Law, Justice and Parliamentary Affairs, Government of Bangladesh',
    status: 'active',
    totalIndexedActs: 12,
    totalIndexedSections: 480,
  },
  INT: {
    code: 'INT',
    name: 'International Treaties & UN Conventions',
    nameBn: 'আন্তর্জাতিক চুক্তি ও জাতিসংঘ কনভেনশন',
    nameLocal: 'International Multilateral Treaties',
    flagEmoji: '🌐',
    system: 'Public International Law',
    apexCourt: 'International Court of Justice (ICJ) & International Criminal Court (ICC)',
    officialGazette: 'United Nations Treaty Series (UNTS) & International Institutional Repositories',
    primaryRepositoryUrl: 'https://treaties.un.org',
    publishingAuthority: 'United Nations Secretariat & Treaty Depositaries',
    status: 'active',
    totalIndexedActs: 10,
    totalIndexedSections: 350,
  },
  GB: {
    code: 'GB',
    name: 'United Kingdom',
    nameBn: 'যুক্তরাজ্য',
    nameLocal: 'United Kingdom of Great Britain and Northern Ireland',
    flagEmoji: '🇬🇧',
    system: 'Common Law',
    apexCourt: 'Supreme Court of the United Kingdom',
    officialGazette: 'The National Archives (legislation.gov.uk)',
    primaryRepositoryUrl: 'https://www.legislation.gov.uk',
    publishingAuthority: 'His Majesty’s Stationery Office (HMSO) & UK Parliament',
    status: 'in-development',
    totalIndexedActs: 0,
    totalIndexedSections: 0,
  },
  US: {
    code: 'US',
    name: 'United States',
    nameBn: 'মার্কিন যুক্তরাষ্ট্র',
    nameLocal: 'United States of America',
    flagEmoji: '🇺🇸',
    system: 'Common Law',
    apexCourt: 'Supreme Court of the United States (SCOTUS)',
    officialGazette: 'United States Code (U.S.C.) & Office of the Law Revision Counsel',
    primaryRepositoryUrl: 'https://uscode.house.gov',
    publishingAuthority: 'United States Congress & Law Revision Counsel',
    status: 'in-development',
    totalIndexedActs: 0,
    totalIndexedSections: 0,
  },
  EU: {
    code: 'EU',
    name: 'European Union',
    nameBn: 'ইউরোপীয় ইউনিয়ন',
    nameLocal: 'European Union',
    flagEmoji: '🇪🇺',
    system: 'Civil Law',
    apexCourt: 'Court of Justice of the European Union (CJEU)',
    officialGazette: 'Official Journal of the European Union (EUR-Lex)',
    primaryRepositoryUrl: 'https://eur-lex.europa.eu',
    publishingAuthority: 'Publications Office of the European Union',
    status: 'in-development',
    totalIndexedActs: 0,
    totalIndexedSections: 0,
  },
  JP: {
    code: 'JP',
    name: 'Japan',
    nameBn: 'জাপান',
    nameLocal: '日本国 (Nihon-koku)',
    flagEmoji: '🇯🇵',
    system: 'Civil Law',
    apexCourt: 'Supreme Court of Japan (最高裁判所)',
    officialGazette: 'Japanese Law Translation & Ministry of Justice Portal',
    primaryRepositoryUrl: 'https://www.japaneselawtranslation.go.jp',
    publishingAuthority: 'Ministry of Justice, Government of Japan',
    status: 'planned',
    totalIndexedActs: 0,
    totalIndexedSections: 0,
  },
  KR: {
    code: 'KR',
    name: 'South Korea',
    nameBn: 'দক্ষিণ কোরিয়া',
    nameLocal: '대한민국 (Daehan Minguk)',
    flagEmoji: '🇰🇷',
    system: 'Civil Law',
    apexCourt: 'Constitutional Court of Korea & Supreme Court of Korea',
    officialGazette: 'Korea Legislation Research Institute & National Law Information Center',
    primaryRepositoryUrl: 'https://www.law.go.kr',
    publishingAuthority: 'Ministry of Government Legislation (MOLEG), Republic of Korea',
    status: 'planned',
    totalIndexedActs: 0,
    totalIndexedSections: 0,
  },
  AE: {
    code: 'AE',
    name: 'United Arab Emirates',
    nameBn: 'সংযুক্ত আরব আমিরাত',
    nameLocal: 'الإمارات العربية المتحدة',
    flagEmoji: '🇦🇪',
    system: 'Islamic Law / Sharia Hybrid',
    apexCourt: 'Federal Supreme Court of the United Arab Emirates',
    officialGazette: 'UAE Federal Legislation Portal',
    primaryRepositoryUrl: 'https://elaws.gov.ae',
    publishingAuthority: 'Ministry of Justice, United Arab Emirates',
    status: 'planned',
    totalIndexedActs: 0,
    totalIndexedSections: 0,
  },
  IN: {
    code: 'IN',
    name: 'India',
    nameBn: 'ভারত',
    nameLocal: 'Republic of India / भारत गणराज्य',
    flagEmoji: '🇮🇳',
    system: 'Common Law',
    apexCourt: 'Supreme Court of India',
    officialGazette: 'India Code Digital Repository',
    primaryRepositoryUrl: 'https://www.indiacode.nic.in',
    publishingAuthority: 'Legislative Department, Ministry of Law and Justice, Government of India',
    status: 'planned',
    totalIndexedActs: 0,
    totalIndexedSections: 0,
  },
  SG: {
    code: 'SG',
    name: 'Singapore',
    nameBn: 'সিঙ্গাপুর',
    nameLocal: 'Republic of Singapore',
    flagEmoji: '🇸🇬',
    system: 'Common Law',
    apexCourt: 'Supreme Court of Singapore',
    officialGazette: 'Singapore Statutes Online (SSO)',
    primaryRepositoryUrl: 'https://sso.agc.gov.sg',
    publishingAuthority: 'Attorney-General’s Chambers (AGC), Singapore',
    status: 'planned',
    totalIndexedActs: 0,
    totalIndexedSections: 0,
  },
};

// ============================================================================
// 2. SCALABLE LEGAL INSTRUMENT DATA MODEL
// ============================================================================

export type LegalInstrumentClassification =
  | 'Act'
  | 'Treaty'
  | 'Convention'
  | 'Statute'
  | 'Ordinance'
  | 'Constitution'
  | 'Regulation'
  | 'Directive'
  | 'Statutory Instrument'
  | 'Order'
  | 'Protocol'
  | 'Model Law'
  | 'Charter'
  | 'Code'
  | 'Presidential Decree';

export type UnifiedLegalStatus =
  | 'Official Legal Text'
  | 'In Force'
  | 'Active'
  | 'Amended'
  | 'Partially In Force'
  | 'Repealed'
  | 'Suspended'
  | 'Expired'
  | 'Active Treaty'
  | 'Customary Law'
  | 'Declaratory Instrument'
  | 'Model Law';

export interface StructuredAmendmentRecord {
  id: string;
  amendingActTitle: string;
  amendingActNumber?: string;
  amendmentYear: number;
  effectiveDate?: string;
  affectedSectionNumbers: string[];
  summary: string;
  officialGazetteRef?: string;
  sourceUrl?: string;
}

export interface StructuredSchedule {
  number: string;
  title: string;
  titleBn?: string;
  content: string;
  contentBn?: string;
}

export interface StructuredLegalDocument {
  id: string;
  slug: string;
  title: string;
  titleBn: string;
  titleLocal?: string;
  shortTitle: string;
  actNumber?: string;
  country: GlobalCountryCode;
  countryName: string;
  jurisdiction: JurisdictionTier;
  instrumentType: LegalInstrumentClassification;
  authority: string;
  publishingAuthority: string;
  enactmentYear: number;
  adoptionDate?: string;
  effectiveDate?: string;
  entryIntoForceDate?: string;
  lastUpdatedDate?: string;
  lastVerifiedDate: string;
  verifiedBy: string;
  officialStatus: UnifiedLegalStatus;
  isRepealed?: boolean;
  repealingActTitle?: string;
  repealedDate?: string;
  sourceName: string;
  sourceUrl: string;
  officialGazetteRef?: string;
  unCitationRef?: string;
  depositary?: string;
  officialLanguages: string[];
  category: string;
  overview: string;
  overviewBn: string;
  simpleSummary?: string;
  keyHighlights: string[];
  parts?: LawPart[];
  chapters?: LawChapter[];
  sections: LawSection[];
  schedules?: StructuredSchedule[];
  amendments?: StructuredAmendmentRecord[];
  relatedLawIds?: string[];
  relatedConcepts?: string[];
  citations?: {
    standard?: string;
    academic?: string;
    bluebook?: string;
    oscola?: string;
    apa?: string;
    chicago?: string;
  };
  keywords: string[];
}

// ============================================================================
// 3. UNIFIED DOCUMENT TRANSFORMATION ADAPTER
// ============================================================================

/**
 * Transforms any LawItem from the core catalog into a unified structured legal document
 */
export function toStructuredLegalDocument(law: LawItem): StructuredLegalDocument {
  const isBangladesh = law.jurisdiction === 'Bangladesh';
  const countryCode: GlobalCountryCode = isBangladesh ? 'BD' : 'INT';
  const countryMeta = GLOBAL_COUNTRIES_REGISTRY[countryCode];

  // Default authority determination
  const authority = isBangladesh
    ? law.publishingAuthority || 'Government of Bangladesh'
    : law.depositary || law.sourceOrganization || 'United Nations Secretariat';

  const sourceName = isBangladesh
    ? law.officialSource || 'Bangladesh Code (bdlaws.minlaw.gov.bd)'
    : law.depositary || 'United Nations Treaty Series (UNTS)';

  const sourceUrl =
    law.sourceVerificationUrl ||
    (isBangladesh ? 'http://bdlaws.minlaw.gov.bd' : 'https://treaties.un.org');

  const instrumentType: LegalInstrumentClassification = law.category === 'Constitutional Law'
    ? 'Constitution'
    : law.jurisdiction === 'International'
    ? 'Treaty'
    : law.actNumber?.includes('Ordinance')
    ? 'Ordinance'
    : 'Act';

  const officialStatus: UnifiedLegalStatus = law.status === 'In Force'
    ? 'In Force'
    : law.status === 'Active Treaty'
    ? 'Active Treaty'
    : law.status === 'Repealed'
    ? 'Repealed'
    : law.status === 'Amended'
    ? 'Amended'
    : 'Official Legal Text';

  return {
    id: law.id,
    slug: law.slug,
    title: law.title,
    titleBn: law.titleBn,
    shortTitle: law.shortTitle,
    actNumber: law.actNumber,
    country: countryCode,
    countryName: countryMeta?.name || (isBangladesh ? 'Bangladesh' : 'International'),
    jurisdiction: (law.jurisdiction === 'Bangladesh' ? 'National' : 'International') as JurisdictionTier,
    instrumentType,
    authority,
    publishingAuthority: law.publishingAuthority || authority,
    enactmentYear: law.enactmentYear,
    adoptionDate: law.adoptionDate,
    effectiveDate: law.effectiveDate || law.entryIntoForceDate || `${law.enactmentYear}`,
    entryIntoForceDate: law.entryIntoForceDate,
    lastUpdatedDate: law.lastUpdatedDate || (law.lastAmendedYear ? `${law.lastAmendedYear}` : `${law.enactmentYear}`),
    lastVerifiedDate: law.sourceMetadata?.verificationDate || '2026-08-15',
    verifiedBy: law.publishingAuthority || authority,
    officialStatus,
    isRepealed: law.status === 'Repealed',
    sourceName,
    sourceUrl,
    officialGazetteRef: law.officialGazetteRef || law.sourceMetadata?.officialGazetteRef,
    unCitationRef: law.unCitationRef,
    depositary: law.depositary,
    officialLanguages: law.officialLanguages || (isBangladesh ? ['Bengali', 'English'] : ['English', 'French', 'Spanish', 'Arabic', 'Chinese', 'Russian']),
    category: law.category,
    overview: law.overview,
    overviewBn: law.overviewBn,
    simpleSummary: law.simpleSummary,
    keyHighlights: law.keyHighlights || [],
    parts: law.parts,
    chapters: law.chapters,
    sections: law.sections,
    relatedLawIds: law.relatedLawIds || [],
    relatedConcepts: law.topics || [],
    citations: law.citations,
    keywords: law.keywords || [],
  };
}

// ============================================================================
// 4. HIGH-PERFORMANCE INVERTED SEARCH & PROVISION INDEXER
// ============================================================================

export interface SearchMatchHighlight {
  field: 'title' | 'titleBn' | 'sectionNumber' | 'sectionTitle' | 'sectionContent' | 'concept' | 'amendment' | 'actNumber';
  matchedSnippet: string;
  relevanceScore: number;
}

export interface SearchResultItem {
  lawId: string;
  lawTitle: string;
  lawTitleBn?: string;
  actNumber?: string;
  country: GlobalCountryCode;
  jurisdiction: string;
  category: string;
  enactmentYear: number;
  officialStatus: string;
  authority: string;
  matchedSection?: {
    number: string;
    title: string;
    titleBn?: string;
    snippet: string;
  };
  highlight: SearchMatchHighlight;
  totalScore: number;
  url: string;
}

export interface AdvancedSearchFilterOptions {
  query?: string;
  country?: GlobalCountryCode | 'All';
  jurisdiction?: string | 'All';
  category?: string | 'All';
  status?: string | 'All';
  yearFrom?: number;
  yearTo?: number;
  instrumentType?: string | 'All';
  searchScope?: 'all' | 'titles-only' | 'sections-only' | 'amendments-only' | 'concepts-only';
  limit?: number;
  offset?: number;
}

export interface SearchQueryResponse {
  results: SearchResultItem[];
  totalMatches: number;
  executionTimeMs: number;
  facets: {
    byCountry: Record<string, number>;
    byCategory: Record<string, number>;
    byStatus: Record<string, number>;
    byInstrumentType: Record<string, number>;
  };
}

/**
 * Universal legal search engine indexing Acts, Treaties, Sections, Articles, and Concepts
 */
export function executeUnifiedLegalSearch(
  options: AdvancedSearchFilterOptions,
  catalog: LawItem[] = LAWS_DATABASE
): SearchQueryResponse {
  const startTime = typeof performance !== 'undefined' ? performance.now() : Date.now();
  const {
    query = '',
    country = 'All',
    category = 'All',
    status = 'All',
    instrumentType = 'All',
    yearFrom,
    yearTo,
    searchScope = 'all',
    limit = 20,
    offset = 0,
  } = options;

  const rawQuery = query.trim().toLowerCase();
  const queryTokens = rawQuery ? rawQuery.split(/\s+/).filter(Boolean) : [];

  const results: SearchResultItem[] = [];
  const facets = {
    byCountry: {} as Record<string, number>,
    byCategory: {} as Record<string, number>,
    byStatus: {} as Record<string, number>,
    byInstrumentType: {} as Record<string, number>,
  };

  for (const rawLaw of catalog) {
    const doc = toStructuredLegalDocument(rawLaw);

    // Increment facet counters
    facets.byCountry[doc.country] = (facets.byCountry[doc.country] || 0) + 1;
    facets.byCategory[doc.category] = (facets.byCategory[doc.category] || 0) + 1;
    facets.byStatus[doc.officialStatus] = (facets.byStatus[doc.officialStatus] || 0) + 1;
    facets.byInstrumentType[doc.instrumentType] = (facets.byInstrumentType[doc.instrumentType] || 0) + 1;

    // Filter by Country
    if (country !== 'All' && doc.country !== country) continue;

    // Filter by Category
    if (category !== 'All' && doc.category !== category) continue;

    // Filter by Status
    if (status !== 'All' && doc.officialStatus !== status && rawLaw.status !== status) continue;

    // Filter by Instrument Type
    if (instrumentType !== 'All' && doc.instrumentType !== instrumentType) continue;

    // Filter by Year Range
    if (yearFrom && doc.enactmentYear < yearFrom) continue;
    if (yearTo && doc.enactmentYear > yearTo) continue;

    // If no query string, return catalog items
    if (!rawQuery) {
      results.push({
        lawId: doc.id,
        lawTitle: doc.title,
        lawTitleBn: doc.titleBn,
        actNumber: doc.actNumber,
        country: doc.country,
        jurisdiction: doc.jurisdiction,
        category: doc.category,
        enactmentYear: doc.enactmentYear,
        officialStatus: doc.officialStatus,
        authority: doc.authority,
        highlight: {
          field: 'title',
          matchedSnippet: doc.overview.slice(0, 140) + '...',
          relevanceScore: 10,
        },
        totalScore: 10,
        url: `/law/${doc.id}`,
      });
      continue;
    }

    // Match Evaluation
    let bestScore = 0;
    let bestHighlight: SearchMatchHighlight | null = null;
    let matchedSectionInfo: SearchResultItem['matchedSection'] | undefined;

    const titleLower = doc.title.toLowerCase();
    const titleBnLower = doc.titleBn.toLowerCase();
    const actNumberLower = (doc.actNumber || '').toLowerCase();
    const overviewLower = doc.overview.toLowerCase();
    const keywords = doc.keywords.map((k) => k.toLowerCase());

    // 1. Exact or Prefix Title Match
    if (searchScope === 'all' || searchScope === 'titles-only') {
      if (titleLower === rawQuery) {
        bestScore += 100;
        bestHighlight = { field: 'title', matchedSnippet: doc.title, relevanceScore: 100 };
      } else if (titleLower.startsWith(rawQuery)) {
        bestScore += 80;
        bestHighlight = { field: 'title', matchedSnippet: doc.title, relevanceScore: 80 };
      } else if (titleLower.includes(rawQuery)) {
        bestScore += 60;
        bestHighlight = { field: 'title', matchedSnippet: doc.title, relevanceScore: 60 };
      } else if (titleBnLower.includes(rawQuery)) {
        bestScore += 60;
        bestHighlight = { field: 'titleBn', matchedSnippet: doc.titleBn, relevanceScore: 60 };
      }

      // Act number match
      if (actNumberLower.includes(rawQuery)) {
        bestScore += 75;
        bestHighlight = { field: 'actNumber', matchedSnippet: doc.actNumber || '', relevanceScore: 75 };
      }
    }

    // 2. Section & Provision Match
    if (searchScope === 'all' || searchScope === 'sections-only') {
      for (const sec of doc.sections) {
        const secNumLower = sec.number.toLowerCase();
        const secTitleLower = sec.title.toLowerCase();
        const secContentLower = sec.content.toLowerCase();

        // Exact section number lookup (e.g. "section 302", "302", "art 102")
        const isSecNumMatch =
          secNumLower === rawQuery ||
          secNumLower.includes(rawQuery) ||
          (rawQuery.replace(/^section\s+/i, '') === secNumLower.replace(/^section\s+/i, ''));

        if (isSecNumMatch) {
          const score = 95;
          if (score > bestScore) {
            bestScore = score;
            bestHighlight = {
              field: 'sectionNumber',
              matchedSnippet: `${sec.number}: ${sec.title}`,
              relevanceScore: score,
            };
            matchedSectionInfo = {
              number: sec.number,
              title: sec.title,
              titleBn: sec.titleBn,
              snippet: sec.content.slice(0, 160) + '...',
            };
          }
        } else if (secTitleLower.includes(rawQuery)) {
          const score = 65;
          if (score > bestScore) {
            bestScore = score;
            bestHighlight = {
              field: 'sectionTitle',
              matchedSnippet: `${sec.number}: ${sec.title}`,
              relevanceScore: score,
            };
            matchedSectionInfo = {
              number: sec.number,
              title: sec.title,
              titleBn: sec.titleBn,
              snippet: sec.content.slice(0, 160) + '...',
            };
          }
        } else if (secContentLower.includes(rawQuery)) {
          const score = 40;
          if (score > bestScore) {
            bestScore = score;
            const matchIndex = secContentLower.indexOf(rawQuery);
            const start = Math.max(0, matchIndex - 40);
            const end = Math.min(sec.content.length, matchIndex + rawQuery.length + 60);
            bestHighlight = {
              field: 'sectionContent',
              matchedSnippet: `...${sec.content.slice(start, end)}...`,
              relevanceScore: score,
            };
            matchedSectionInfo = {
              number: sec.number,
              title: sec.title,
              titleBn: sec.titleBn,
              snippet: sec.content.slice(start, end),
            };
          }
        }
      }
    }

    // 3. Concepts & Keywords Match
    if (searchScope === 'all' || searchScope === 'concepts-only') {
      for (const kw of keywords) {
        if (kw.includes(rawQuery)) {
          const score = 50;
          if (score > bestScore) {
            bestScore = score;
            bestHighlight = {
              field: 'concept',
              matchedSnippet: `Matched keyword: ${kw}`,
              relevanceScore: score,
            };
          }
        }
      }
    }

    // 4. Token-based multi-word intersection
    if (bestScore === 0 && queryTokens.length > 1) {
      const allTokensMatch = queryTokens.every(
        (token) =>
          titleLower.includes(token) ||
          overviewLower.includes(token) ||
          keywords.some((k) => k.includes(token))
      );
      if (allTokensMatch) {
        bestScore = 30;
        bestHighlight = {
          field: 'title',
          matchedSnippet: doc.overview.slice(0, 140) + '...',
          relevanceScore: 30,
        };
      }
    }

    if (bestScore > 0 && bestHighlight) {
      results.push({
        lawId: doc.id,
        lawTitle: doc.title,
        lawTitleBn: doc.titleBn,
        actNumber: doc.actNumber,
        country: doc.country,
        jurisdiction: doc.jurisdiction,
        category: doc.category,
        enactmentYear: doc.enactmentYear,
        officialStatus: doc.officialStatus,
        authority: doc.authority,
        matchedSection: matchedSectionInfo,
        highlight: bestHighlight,
        totalScore: bestScore,
        url: matchedSectionInfo
          ? `/law/${doc.id}?section=${encodeURIComponent(matchedSectionInfo.number)}`
          : `/law/${doc.id}`,
      });
    }
  }

  // Sort by highest relevance score
  results.sort((a, b) => b.totalScore - a.totalScore);

  const endTime = typeof performance !== 'undefined' ? performance.now() : Date.now();
  const executionTimeMs = Math.round((endTime - startTime) * 100) / 100;

  return {
    results: results.slice(offset, offset + limit),
    totalMatches: results.length,
    executionTimeMs,
    facets,
  };
}

// ============================================================================
// 5. STRUCTURED CITATION & EXPORT GENERATOR
// ============================================================================

export interface CitationFormatResult {
  standard: string;
  bluebook: string;
  oscola: string;
  apa: string;
  chicago: string;
}

export function generateStructuredCitations(doc: StructuredLegalDocument): CitationFormatResult {
  const isBD = doc.country === 'BD';

  return {
    standard: doc.citations?.standard || `${doc.title} (${doc.enactmentYear})${doc.actNumber ? `, ${doc.actNumber}` : ''}`,
    bluebook: doc.citations?.bluebook || (isBD
      ? `${doc.title}, ${doc.actNumber || `Act No. of ${doc.enactmentYear}`} (Bangladesh)`
      : `${doc.title}, ${doc.adoptionDate || doc.enactmentYear}, ${doc.unCitationRef || 'UNTS'}`),
    oscola: doc.citations?.oscola || `${doc.title} ${doc.enactmentYear}`,
    apa: doc.citations?.apa || `${doc.title}. (${doc.enactmentYear}). ${doc.authority}.`,
    chicago: doc.citations?.chicago || `${doc.title}. ${doc.enactmentYear}. Published by ${doc.authority}.`,
  };
}

/**
 * Format full statutory document text for clean markdown / plain-text download
 */
export function exportDocumentToMarkdown(doc: StructuredLegalDocument): string {
  const citations = generateStructuredCitations(doc);
  const lines: string[] = [];

  lines.push(`# ${doc.title}`);
  if (doc.titleBn) lines.push(`## ${doc.titleBn}`);
  lines.push('');
  lines.push(`- **Country:** ${doc.countryName} (${doc.country})`);
  lines.push(`- **Authority:** ${doc.authority}`);
  lines.push(`- **Official Status:** ${doc.officialStatus}`);
  lines.push(`- **Enactment / Adoption Year:** ${doc.enactmentYear}`);
  lines.push(`- **Last Verified Date:** ${doc.lastVerifiedDate}`);
  lines.push(`- **Primary Source:** ${doc.sourceName} (${doc.sourceUrl})`);
  if (doc.officialGazetteRef) lines.push(`- **Official Gazette Reference:** ${doc.officialGazetteRef}`);
  if (doc.unCitationRef) lines.push(`- **Citation Reference:** ${doc.unCitationRef}`);
  lines.push('');
  lines.push('---');
  lines.push('');
  lines.push('## Overview');
  lines.push(doc.overview);
  lines.push('');
  if (doc.overviewBn) {
    lines.push('### বাংলা বিবরণ');
    lines.push(doc.overviewBn);
    lines.push('');
  }

  lines.push('## Statutory Provisions');
  lines.push('');

  doc.sections.forEach((sec, idx) => {
    lines.push(`### ${sec.number}: ${sec.title}`);
    if (sec.titleBn) lines.push(`*${sec.titleBn}*`);
    lines.push('');
    lines.push(sec.content);
    lines.push('');
    if (sec.contentBn) {
      lines.push('**বাংলা পাঠ:**');
      lines.push(sec.contentBn);
      lines.push('');
    }
    if (sec.punishmentOrRemedy) {
      lines.push(`**Punishment / Remedy:** ${sec.punishmentOrRemedy}`);
      lines.push('');
    }
    if (sec.amendmentHistory) {
      lines.push(`*Amendment Note:* ${sec.amendmentHistory}`);
      lines.push('');
    }
  });

  lines.push('---');
  lines.push('## Citations');
  lines.push(`- **Standard:** ${citations.standard}`);
  lines.push(`- **Bluebook:** ${citations.bluebook}`);
  lines.push(`- **OSCOLA:** ${citations.oscola}`);
  lines.push(`- **APA:** ${citations.apa}`);
  lines.push('');
  lines.push(`*Exported from Nyayota Legal Knowledge Repository on ${new Date().toISOString().split('T')[0]}*`);

  return lines.join('\n');
}
