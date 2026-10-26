/**
 * Focused Unit Tests for Nyayota AI Legal Retrieval Engine
 * Uses real in-repo records from LAWS_DATABASE, BANGLADESH_CODE_CATALOG,
 * GLOSSARY_TERMS, and LEGAL_OUTCOME_SCENARIOS_DATA.
 */

import { describe, it, expect } from 'bun:test';
import { retrieveLegalSources } from '@/lib/nyayota-ai/retrieval-engine';

describe('Nyayota AI — Legal Retrieval Engine', () => {

  // Test 1: Empty and whitespace-only queries
  it('handles empty and whitespace-only queries safely', () => {
    const emptyResult = retrieveLegalSources('');
    expect(emptyResult.status).toBe('empty-query');
    expect(emptyResult.results.length).toBe(0);
    expect(emptyResult.totalMatches).toBe(0);

    const whitespaceResult = retrieveLegalSources('   \t\n  ');
    expect(whitespaceResult.status).toBe('empty-query');
    expect(whitespaceResult.results.length).toBe(0);
  });

  // Test 2: Exact Act title lookup
  it('retrieves accurate Act metadata for exact title searches', () => {
    const result = retrieveLegalSources('The Penal Code, 1860');
    expect(result.status).toBe('success');
    expect(result.results.length).toBeGreaterThan(0);
    
    const topResult = result.results[0];
    expect(topResult.sourceId).toBe('bd-penal-code-1860');
    expect(topResult.displayTitle).toBe('The Penal Code, 1860');
    expect(topResult.officialSourceUrl).toBe('http://bdlaws.minlaw.gov.bd/act-11.html');
    expect(topResult.relevanceScore).toBeGreaterThanOrEqual(80);
  });

  // Test 3: Exact section lookup where provision exists in real data
  it('retrieves exact section provision when Act and section are specified', () => {
    const result = retrieveLegalSources('Penal Code Section 300');
    expect(result.status).toBe('success');
    expect(result.ambiguityStatus).toBe('unambiguous');

    const sectionMatch = result.results.find((r) => r.identifier === 'Section 300');
    expect(sectionMatch).toBeDefined();
    expect(sectionMatch?.sourceId).toBe('bd-penal-code-1860');
    expect(sectionMatch?.matchingText).toContain('culpable homicide is murder');
    expect(sectionMatch?.matchReasons).toContain('exact-act-and-section');
    expect(sectionMatch?.relevanceScore).toBe(100);
    expect(sectionMatch?.internalDestination).toBe('/law/bd-penal-code-1860?section=Section%20300');
  });

  // Test 4: Section-number ambiguity across multiple Acts
  it('identifies ambiguity when a standalone section number matches multiple Acts or lacks Act context', () => {
    // "Section 54" appears in CrPC (police arrest without warrant)
    const result = retrieveLegalSources('Section 54');
    expect(['section-only-no-act', 'ambiguous-section-multiple-acts']).toContain(result.ambiguityStatus);
    expect(result.results.length).toBeGreaterThan(0);

    const crpcMatch = result.results.find((r) => r.sourceId === 'bd-crpc-1898');
    expect(crpcMatch).toBeDefined();
    expect(crpcMatch?.identifier).toBe('Section 54');
    expect(crpcMatch?.matchReasons).toContain('exact-section-candidate');
  });

  // Test 5: Bengali terms that actually exist in the repository
  it('supports Bengali statute and provision queries accurately', () => {
    // দণ্ডবিধি (Penal Code)
    const bdResult = retrieveLegalSources('দণ্ডবিধি');
    expect(bdResult.status).toBe('success');
    expect(bdResult.results.some((r) => r.sourceId === 'bd-penal-code-1860')).toBe(true);

    // ধারা ৩০০ (Section 300 with Bengali numeral)
    const secResult = retrieveLegalSources('দণ্ডবিধি ধারা ৩০০');
    expect(secResult.status).toBe('success');
    const sec300 = secResult.results.find((r) => r.identifier === 'Section 300');
    expect(sec300).toBeDefined();
    expect(sec300?.sourceId).toBe('bd-penal-code-1860');

    // অনুচ্ছেদ ১০২ (Article 102 of Constitution)
    const artResult = retrieveLegalSources('অনুচ্ছেদ ১০২');
    expect(artResult.status).toBe('success');
    const art102 = artResult.results.find((r) => r.sourceId === 'bd-constitution-1972');
    expect(art102).toBeDefined();
  });

  // Test 6: English glossary lookups
  it('retrieves verified definitions for legal terms and doctrines', () => {
    const resJudicata = retrieveLegalSources('Res Judicata');
    expect(resJudicata.status).toBe('success');
    const glossaryEntry = resJudicata.results.find((r) => r.recordType === 'glossary-term');
    expect(glossaryEntry).toBeDefined();
    expect(glossaryEntry?.displayTitle).toBe('Res Judicata');
    expect(glossaryEntry?.matchingText).toContain('adjudicated by a competent court');
    expect(glossaryEntry?.sourceCompleteness).toBe('conceptual-definition');
  });

  // Test 7: Treaty and international-law lookups
  it('retrieves international treaties with authentic UN source metadata', () => {
    const result = retrieveLegalSources('UDHR Universal Declaration');
    expect(result.status).toBe('success');
    const treaty = result.results.find((r) => r.sourceId === 'int-udhr-1948');
    expect(treaty).toBeDefined();
    expect(treaty?.displayTitle).toContain('Universal Declaration of Human Rights');
    expect(treaty?.jurisdiction).toBe('International');
    expect(treaty?.officialSourceUrl).toContain('un.org');
  });

  // Test 8: A known query with no matching source
  it('returns no-match when queried topic does not exist in the collection', () => {
    const result = retrieveLegalSources('Maritime Admiralty Smuggling in Greenlandic Glaciers 1740');
    expect(result.status).toBe('no-match');
    expect(result.results.length).toBe(0);
    expect(result.totalMatches).toBe(0);
  });

  // Test 9: Act found but requested section is missing from curated subset
  it('detects when an Act is recognized but the requested section is absent from curated data', () => {
    // Penal Code has 511 sections in full statute, but Nyayota has a curated subset.
    // Section 450 is not in the curated subset.
    const result = retrieveLegalSources('Penal Code Section 450');
    expect(result.status).toBe('act-found-section-missing');
    expect(result.ambiguityStatus).toBe('act-found-section-missing');
    
    // Confirms it does NOT fabricate Section 450 text, but returns the Act metadata
    const fabricatedSection = result.results.find((r) => r.identifier === 'Section 450');
    expect(fabricatedSection).toBeUndefined();

    const actMetadata = result.results.find((r) => r.sourceId === 'bd-penal-code-1860');
    expect(actMetadata).toBeDefined();
  });

  // Test 10: Deduplication & limits
  it('prevents duplicate entries and respects configurable result limits', () => {
    const result = retrieveLegalSources('penal code', { limit: 3 });
    expect(result.results.length).toBeLessThanOrEqual(3);

    // Verify all returned result IDs are unique
    const idSet = new Set(result.results.map((r) => r.id));
    expect(idSet.size).toBe(result.results.length);
  });

  // Test 11: Deterministic ranking
  it('ranks exact Act+Section matches above broad keyword matches deterministically', () => {
    const result = retrieveLegalSources('The Penal Code, 1860 Section 300');
    expect(result.results.length).toBeGreaterThan(1);
    
    // Top result must be Section 300
    expect(result.results[0].identifier).toBe('Section 300');
    expect(result.results[0].relevanceScore).toBe(100);

    // Subsequent results must have score <= top result
    for (let i = 1; i < result.results.length; i++) {
      expect(result.results[i].relevanceScore).toBeLessThanOrEqual(result.results[i - 1].relevanceScore);
    }
  });

});
