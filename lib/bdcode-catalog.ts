/**
 * Nyayota — Bangladesh Code Catalog & Structured Database Registry
 * 
 * Official Source: Bangladesh Code (https://bdcode.gov.bd & http://bdlaws.minlaw.gov.bd)
 * Published by the Legislative and Parliamentary Affairs Division,
 * Ministry of Law, Justice and Parliamentary Affairs, Government of the People's Republic of Bangladesh.
 * 
 * This repository contains the validated Bangladesh statutory corpus,
 * structured across volumes, chronological eras, act numbers, and official gazette citations.
 */

import {
  BangladeshLawRecord,
  BangladeshLegislativeEra,
  BANGLADESH_CODE_VOLUMES,
  getLegislativeEraFromYear,
} from './bdcode-architecture';
import type { LawItem } from './legal-data';
import { CONSTITUTIONAL_CRIMINAL_LAWS } from './bdcode-data/constitutional-criminal';
import { CIVIL_FAMILY_PROPERTY_LAWS } from './bdcode-data/civil-family-property';
import { COMMERCIAL_BANKING_TAX_LAWS } from './bdcode-data/commercial-banking-tax';
import { ENVIRONMENT_ADMIN_LOCAL_CYBER_LAWS } from './bdcode-data/environment-admin-local-cyber';

// ============================================================================
// OFFICIAL BANGLADESH CODE ENRICHED CATALOG REGISTRY
// ============================================================================

export const BANGLADESH_CODE_CATALOG: BangladeshLawRecord[] = [
  ...CONSTITUTIONAL_CRIMINAL_LAWS,
  ...CIVIL_FAMILY_PROPERTY_LAWS,
  ...COMMERCIAL_BANKING_TAX_LAWS,
  ...ENVIRONMENT_ADMIN_LOCAL_CYBER_LAWS,
];

// ============================================================================
// SCALABLE REPOSITORY & RETRIEVAL API
// ============================================================================

export interface BangladeshCatalogQueryOptions {
  query?: string;
  alphabet?: string;
  era?: BangladeshLegislativeEra | 'all';
  categorySlug?: string | 'all';
  volumeNumber?: number | 'all';
  actType?: string | 'all';
  status?: string | 'all';
  startYear?: number;
  endYear?: number;
  sortBy?: 'relevance' | 'year-desc' | 'year-asc' | 'title-asc' | 'act-number';
  limit?: number;
  offset?: number;
}

export interface BangladeshCatalogQueryResult {
  items: BangladeshLawRecord[];
  total: number;
  limit: number;
  offset: number;
  hasMore: boolean;
  alphabetCounts: Record<string, number>;
  eraCounts: Record<BangladeshLegislativeEra, number>;
  categoryCounts: Record<string, number>;
  volumeCounts: Record<number, number>;
}

/**
 * High-performance scalable catalog query for Bangladesh Code
 */
export function queryBangladeshCodeCatalog(
  options: BangladeshCatalogQueryOptions = {}
): BangladeshCatalogQueryResult {
  const {
    query = '',
    alphabet,
    era = 'all',
    categorySlug = 'all',
    volumeNumber = 'all',
    actType = 'all',
    status = 'all',
    startYear,
    endYear,
    sortBy = 'relevance',
    limit = 50,
    offset = 0,
  } = options;

  const normalizedQuery = query.trim().toLowerCase();
  const queryTokens = normalizedQuery.split(/\s+/).filter(Boolean);

  // Facet accumulators
  const alphabetCounts: Record<string, number> = {};
  const eraCounts: Record<BangladeshLegislativeEra, number> = {
    'british-era': 0,
    'pakistan-era': 0,
    'bangladesh-era': 0,
  };
  const categoryCounts: Record<string, number> = {};
  const volumeCounts: Record<number, number> = {};

  // Initialize alphabet counts A-Z
  for (let i = 65; i <= 90; i++) {
    alphabetCounts[String.fromCharCode(i)] = 0;
  }

  const scoredList: { item: BangladeshLawRecord; score: number }[] = [];

  for (const law of BANGLADESH_CODE_CATALOG) {
    // 1. Tally global facets
    const firstLetter = law.title.replace(/^(The\s+|A\s+|An\s+)/i, '').charAt(0).toUpperCase();
    if (alphabetCounts[firstLetter] !== undefined) {
      alphabetCounts[firstLetter] += 1;
    }
    eraCounts[law.era] = (eraCounts[law.era] || 0) + 1;
    categoryCounts[law.category] = (categoryCounts[law.category] || 0) + 1;
    if (law.volumeNumber) {
      volumeCounts[law.volumeNumber] = (volumeCounts[law.volumeNumber] || 0) + 1;
    }

    // 2. Apply Filters
    if (alphabet && alphabet.toUpperCase() !== 'ALL') {
      const targetLetter = alphabet.toUpperCase();
      if (firstLetter !== targetLetter) {
        continue;
      }
    }

    if (era !== 'all' && law.era !== era) {
      continue;
    }

    if (categorySlug !== 'all') {
      const matchCat = law.categorySlug.toLowerCase();
      const targetCat = categorySlug.toLowerCase();
      if (matchCat !== targetCat && !law.category.toLowerCase().includes(targetCat)) {
        continue;
      }
    }

    if (volumeNumber !== 'all' && law.volumeNumber !== volumeNumber) {
      continue;
    }

    if (actType !== 'all' && law.actType.toLowerCase() !== actType.toLowerCase()) {
      continue;
    }

    if (status !== 'all' && law.status.toLowerCase() !== status.toLowerCase()) {
      continue;
    }

    if (startYear !== undefined && law.enactmentYear < startYear) {
      continue;
    }

    if (endYear !== undefined && law.enactmentYear > endYear) {
      continue;
    }

    // 3. Compute Relevance Scoring
    let score = 0;
    if (queryTokens.length === 0) {
      score = 1;
    } else {
      const titleLower = (law.title + ' ' + law.titleBn + ' ' + law.shortTitle + ' ' + (law.alternateTitles || []).join(' ')).toLowerCase();
      const actLower = law.actNumber.toLowerCase();
      const overviewLower = (law.overview + ' ' + (law.overviewBn || '')).toLowerCase();
      const keywordsLower = (law.keywords || []).join(' ').toLowerCase();

      // Exact title match
      if (titleLower.includes(normalizedQuery)) score += 60;
      if (actLower.includes(normalizedQuery)) score += 50;

      for (const token of queryTokens) {
        if (titleLower.includes(token)) score += 20;
        if (actLower.includes(token)) score += 15;
        if (keywordsLower.includes(token)) score += 10;
        if (overviewLower.includes(token)) score += 5;
      }

      // Check sections
      for (const sec of law.sections) {
        const secHeader = (sec.number + ' ' + sec.title + ' ' + (sec.titleBn || '')).toLowerCase();
        const secBody = (sec.content + ' ' + sec.simpleExplanation).toLowerCase();
        if (secHeader.includes(normalizedQuery)) score += 35;
        for (const token of queryTokens) {
          if (secHeader.includes(token)) score += 8;
          if (secBody.includes(token)) score += 2;
        }
      }
    }

    if (score > 0 || queryTokens.length === 0) {
      scoredList.push({ item: law, score });
    }
  }

  // 4. Sort Results
  if (sortBy === 'relevance' && queryTokens.length > 0) {
    scoredList.sort((a, b) => b.score - a.score);
  } else if (sortBy === 'year-desc') {
    scoredList.sort((a, b) => b.item.enactmentYear - a.item.enactmentYear);
  } else if (sortBy === 'year-asc') {
    scoredList.sort((a, b) => a.item.enactmentYear - b.item.enactmentYear);
  } else if (sortBy === 'title-asc') {
    scoredList.sort((a, b) => a.item.title.localeCompare(b.item.title));
  } else if (sortBy === 'act-number') {
    scoredList.sort((a, b) => a.item.actNumber.localeCompare(b.item.actNumber));
  }

  // 5. Pagination
  const total = scoredList.length;
  const paginated = scoredList.slice(offset, offset + limit).map((s) => s.item);

  return {
    items: paginated,
    total,
    limit,
    offset,
    hasMore: offset + limit < total,
    alphabetCounts,
    eraCounts,
    categoryCounts,
    volumeCounts,
  };
}

/**
 * Retrieve single Bangladesh Code statute record by ID
 */
export function getBangladeshLawById(id: string): BangladeshLawRecord | undefined {
  return BANGLADESH_CODE_CATALOG.find((l) => l.id === id);
}

/**
 * Convert a BangladeshLawRecord into a standard LawItem for full ecosystem interoperability
 */
export function convertBdRecordToLawItem(bd: BangladeshLawRecord): LawItem {
  return {
    id: bd.id,
    slug: bd.id,
    title: bd.title,
    titleBn: bd.titleBn,
    shortTitle: bd.shortTitle,
    actNumber: bd.actNumber,
    jurisdiction: 'Bangladesh',
    jurisdictionCode: 'BD',
    category: (bd.category as any) || 'Criminal Law',
    status: (bd.status as any) || 'In Force',
    sourceReliabilityStatus: 'Official Government Source',
    contentQualityStatus: 'Verified',
    publishingAuthority: bd.ministry || 'Ministry of Law, Justice and Parliamentary Affairs',
    totalStatutorySectionsCount: bd.totalSectionsCount || bd.sections.length,
    isCuratedSubset: (bd.totalSectionsCount || 0) > bd.sections.length,
    enactmentYear: bd.enactmentYear,
    effectiveDate: bd.commencementDate,
    lastUpdatedDate: bd.lastVerifiedDate,
    lastAmendedYear: bd.lastAmendedYear,
    officialGazetteRef: bd.officialGazetteCitation,
    officialSource: bd.officialSource,
    sourceVerificationUrl: bd.sourceUrl,
    overview: bd.overview,
    overviewBn: bd.overviewBn || bd.overview,
    keyHighlights: bd.sections.slice(0, 3).map((s) => `${s.number}: ${s.title}`),
    sections: bd.sections.map((s) => ({
      number: s.number,
      title: s.title,
      titleBn: s.titleBn,
      content: s.content,
      contentBn: s.contentBn,
      simpleExplanation: s.simpleExplanation,
      punishmentOrRemedy: s.penalty,
    })),
    keywords: bd.keywords,
  };
}
