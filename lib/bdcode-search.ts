/**
 * Nyayota — Bangladesh Code Search Indexer & Autocomplete Engine
 * 
 * High-performance search indexing designed to support thousands of statutes
 * across dual English & Bangla titles, Act numbers, chronological years, chapters,
 * sections, and legal keywords with low-latency client-side autocomplete.
 */

import { BangladeshLawRecord } from './bdcode-architecture';
import { BANGLADESH_CODE_CATALOG } from './bdcode-catalog';

export interface AutocompleteSuggestion {
  id: string;
  type: 'law' | 'section' | 'act-number' | 'keyword' | 'category';
  title: string;
  subtitle: string;
  badge: string;
  url: string;
  matchedText: string;
  relevanceScore: number;
}

export interface SearchFacetItem {
  key: string;
  label: string;
  count: number;
}

export interface CategorizedSearchResults {
  query: string;
  totalMatches: number;
  lawTitleMatches: Array<{ law: BangladeshLawRecord; matchHighlight: string }>;
  actNumberMatches: Array<{ law: BangladeshLawRecord; matchHighlight: string }>;
  sectionMatches: Array<{
    law: BangladeshLawRecord;
    sectionNumber: string;
    sectionTitle: string;
    snippet: string;
  }>;
  suggestedKeywords: string[];
}

/**
 * Fast prefix and token search across Bangladesh Code catalog
 */
export function getBangladeshCodeAutocomplete(
  query: string,
  limit: number = 8,
  catalog: BangladeshLawRecord[] = BANGLADESH_CODE_CATALOG
): AutocompleteSuggestion[] {
  const normalized = query.trim().toLowerCase();
  if (normalized.length === 0) return [];

  const suggestions: AutocompleteSuggestion[] = [];
  const seenIds = new Set<string>();

  // 1. Check Exact & Prefix Matches on Act Numbers
  for (const law of catalog) {
    const actLower = law.actNumber.toLowerCase();
    if (actLower.includes(normalized)) {
      const idKey = `act-${law.id}`;
      if (!seenIds.has(idKey)) {
        seenIds.add(idKey);
        suggestions.push({
          id: idKey,
          type: 'act-number',
          title: law.actNumber,
          subtitle: `${law.title} (${law.enactmentYear})`,
          badge: law.era === 'british-era' ? 'Colonial Era' : 'BD Act',
          url: `/law/${law.id}`,
          matchedText: law.actNumber,
          relevanceScore: 90,
        });
      }
    }
  }

  // 2. Check Law Title & Alternate Title Matches (English & Bangla)
  for (const law of catalog) {
    const titleLower = law.title.toLowerCase();
    const titleBnLower = law.titleBn.toLowerCase();
    const shortTitleLower = law.shortTitle.toLowerCase();
    const alternates = (law.alternateTitles || []).map((t) => t.toLowerCase());

    const isMatch =
      titleLower.includes(normalized) ||
      titleBnLower.includes(normalized) ||
      shortTitleLower.includes(normalized) ||
      alternates.some((a) => a.includes(normalized));

    if (isMatch) {
      const idKey = `law-${law.id}`;
      if (!seenIds.has(idKey)) {
        seenIds.add(idKey);
        const startsWith = titleLower.startsWith(normalized) || shortTitleLower.startsWith(normalized);
        suggestions.push({
          id: idKey,
          type: 'law',
          title: law.title,
          subtitle: `${law.titleBn} • ${law.actNumber}`,
          badge: law.category,
          url: `/law/${law.id}`,
          matchedText: law.title,
          relevanceScore: startsWith ? 100 : 80,
        });
      }
    }
  }

  // 3. Check Section Level Matches (e.g. "Section 302", "Art 102", "Sec 54")
  for (const law of catalog) {
    for (const sec of law.sections) {
      const secNumLower = sec.number.toLowerCase();
      const secTitleLower = (sec.title + ' ' + (sec.titleBn || '')).toLowerCase();

      if (secNumLower.includes(normalized) || secTitleLower.includes(normalized)) {
        const idKey = `sec-${law.id}-${sec.number}`;
        if (!seenIds.has(idKey)) {
          seenIds.add(idKey);
          suggestions.push({
            id: idKey,
            type: 'section',
            title: `${sec.number}: ${sec.title}`,
            subtitle: `${law.shortTitle} • ${sec.simpleExplanation.slice(0, 70)}...`,
            badge: 'Section',
            url: `/law/${law.id}?section=${encodeURIComponent(sec.number)}`,
            matchedText: `${sec.number}: ${sec.title}`,
            relevanceScore: secNumLower.startsWith(normalized) ? 85 : 70,
          });
        }
      }
    }
  }

  // 4. Sort and Slice
  suggestions.sort((a, b) => b.relevanceScore - a.relevanceScore);
  return suggestions.slice(0, limit);
}

/**
 * Categorized Search for In-depth Bangladesh Code Discovery
 */
export function executeCategorizedBangladeshSearch(
  query: string,
  catalog: BangladeshLawRecord[] = BANGLADESH_CODE_CATALOG
): CategorizedSearchResults {
  const normalized = query.trim().toLowerCase();
  const tokens = normalized.split(/\s+/).filter(Boolean);

  const lawTitleMatches: CategorizedSearchResults['lawTitleMatches'] = [];
  const actNumberMatches: CategorizedSearchResults['actNumberMatches'] = [];
  const sectionMatches: CategorizedSearchResults['sectionMatches'] = [];
  const suggestedKeywords = new Set<string>();

  if (tokens.length === 0) {
    return {
      query,
      totalMatches: 0,
      lawTitleMatches: [],
      actNumberMatches: [],
      sectionMatches: [],
      suggestedKeywords: [],
    };
  }

  for (const law of catalog) {
    const titleText = `${law.title} ${law.titleBn} ${law.shortTitle}`.toLowerCase();
    const actText = law.actNumber.toLowerCase();

    // Check law title
    if (tokens.every((t) => titleText.includes(t)) || titleText.includes(normalized)) {
      lawTitleMatches.push({
        law,
        matchHighlight: law.title,
      });
      law.keywords.forEach((k) => suggestedKeywords.add(k));
    }

    // Check act number
    if (tokens.every((t) => actText.includes(t)) || actText.includes(normalized)) {
      actNumberMatches.push({
        law,
        matchHighlight: law.actNumber,
      });
    }

    // Check individual sections
    for (const sec of law.sections) {
      const secText = `${sec.number} ${sec.title} ${sec.titleBn || ''} ${sec.content} ${sec.simpleExplanation}`.toLowerCase();
      if (tokens.some((t) => secText.includes(t))) {
        let snippet = sec.simpleExplanation;
        if (sec.content.toLowerCase().includes(normalized)) {
          const idx = sec.content.toLowerCase().indexOf(normalized);
          const start = Math.max(0, idx - 40);
          const end = Math.min(sec.content.length, idx + normalized.length + 80);
          snippet = `...${sec.content.slice(start, end)}...`;
        }

        sectionMatches.push({
          law,
          sectionNumber: sec.number,
          sectionTitle: sec.title,
          snippet,
        });
      }
    }
  }

  const totalMatches = lawTitleMatches.length + actNumberMatches.length + sectionMatches.length;

  return {
    query,
    totalMatches,
    lawTitleMatches,
    actNumberMatches,
    sectionMatches: sectionMatches.slice(0, 15),
    suggestedKeywords: Array.from(suggestedKeywords).slice(0, 6),
  };
}
