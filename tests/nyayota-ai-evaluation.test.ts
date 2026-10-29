/**
 * Nyayota AI — Comprehensive Phase 5A Evaluation Suite
 * 
 * Tests the deterministic legal intelligence engine against real in-repo records:
 * 1. Intent classification accuracy across all 10 categories
 * 2. Exact provision matching for known sections (Penal Code Sec 300, 420; CrPC Sec 54)
 * 3. Section 302 provision accuracy & cross-reference isolation (anti-substitution)
 * 4. Ambiguity detection for standalone section queries
 * 5. Cross-act disambiguation (CrPC Sec 54 vs Penal Code Sec 54)
 * 6. Absence from curated database vs non-existence in enacted statute (Sec 54 vs Sec 999)
 * 7. India / IPC jurisdiction separation (Rule 4 safety)
 * 8. Bengali numeral and terminology normalization
 * 9. Out-of-scope and non-legal query rejection
 * 10. Empty and unintelligible query handling
 * 11. Citation and source URL fidelity (zero fabricated URLs)
 * 12. Proportionate educational disclaimer presence
 * 13. End-to-end server integration pipeline execution via service boundary
 */

import { describe, it, expect } from 'bun:test';
import {
  classifyIntent,
  retrieveLegalSources,
  routeQuery,
  generateResponseFromRoute,
  executeNyayotaAIPipeline,
  normalizeSectionIdentifier,
} from '@/lib/nyayota-ai';

describe('Nyayota AI — Phase 5A Evaluation Suite', () => {

  // ==========================================================================
  // Group 1: Intent Classification Accuracy Across All 10 Categories
  // ==========================================================================
  describe('1. Intent Classification Accuracy (10 Categories)', () => {
    it('classifies greeting intent', () => {
      const res = classifyIntent('Hello');
      expect(res.primaryIntent).toBe('greeting');
      expect(res.suggestedProcessingPath).toBe('greeting_handler');
    });

    it('classifies platform help intent', () => {
      const res = classifyIntent('how to use nyayota and report an error');
      expect(res.primaryIntent).toBe('nyayota_help');
      expect(res.suggestedProcessingPath).toBe('nyayota_help_handler');
    });

    it('classifies direct legal reference intent', () => {
      const res = classifyIntent('The Penal Code, 1860, Section 300');
      expect(res.primaryIntent).toBe('direct_legal_reference');
      expect(res.suggestedProcessingPath).toBe('retrieval_engine');
    });

    it('classifies legal concept and glossary intent', () => {
      const res = classifyIntent('What is Habeas Corpus?');
      expect(res.primaryIntent).toBe('legal_concept');
      expect(res.suggestedProcessingPath).toBe('retrieval_engine');
    });

    it('classifies statute overview intent', () => {
      const res = classifyIntent('overview of The Contract Act, 1872');
      expect(res.primaryIntent).toBe('statute_overview');
      expect(res.suggestedProcessingPath).toBe('retrieval_engine');
    });

    it('classifies legal procedural scenario intent', () => {
      const res = classifyIntent('How to file a GD for lost document');
      expect(res.primaryIntent).toBe('legal_scenario');
      expect(res.suggestedProcessingPath).toBe('retrieval_engine');
    });

    it('classifies clarification needed for standalone section', () => {
      const res = classifyIntent('Section 54');
      expect(res.primaryIntent).toBe('clarification_needed');
      expect(res.requiresClarification).toBe(true);
    });

    it('classifies unsupported foreign legal query', () => {
      const res = classifyIntent('California labor code overtime rules');
      expect(res.primaryIntent).toBe('unsupported_legal_query');
      expect(res.suggestedProcessingPath).toBe('unsupported_legal_handler');
    });

    it('classifies completely out-of-scope non-legal query', () => {
      const res = classifyIntent('Write a python script to sort an array');
      expect(res.primaryIntent).toBe('out_of_scope');
      expect(res.suggestedProcessingPath).toBe('out_of_scope_handler');
    });

    it('classifies unknown / unintelligible query', () => {
      const res = classifyIntent('qwertyuiop asdfghjkl zxcvbnm');
      expect(res.primaryIntent).toBe('unknown');
      expect(res.suggestedProcessingPath).toBe('unknown_handler');
    });
  });

  // ==========================================================================
  // Group 2: Exact Provision Matching for Known Sections
  // ==========================================================================
  describe('2. Exact Provision Matching for Known Sections', () => {
    it('retrieves exact text for Penal Code Section 300 (Murder)', () => {
      const ret = retrieveLegalSources('The Penal Code, 1860, Section 300');
      expect(ret.status).toBe('success');
      expect(ret.ambiguityStatus).toBe('unambiguous');
      expect(ret.results.length).toBeGreaterThanOrEqual(1);

      const top = ret.results[0];
      expect(top.id).toBe('bd-penal-code-1860:Section 300');
      expect(top.identifier).toBe('Section 300');
      expect(top.relevanceScore).toBe(100);
      expect(top.matchingText).toContain('culpable homicide is murder');
      expect(top.internalDestination).toBe('/law/bd-penal-code-1860?section=Section%20300');
    });

    it('retrieves exact text for Penal Code Section 420 (Cheating)', () => {
      const ret = retrieveLegalSources('The Penal Code, 1860, Section 420');
      expect(ret.status).toBe('success');
      expect(ret.ambiguityStatus).toBe('unambiguous');

      const top = ret.results[0];
      expect(top.id).toBe('bd-penal-code-1860:Section 420');
      expect(top.identifier).toBe('Section 420');
      expect(top.relevanceScore).toBe(100);
      expect(top.matchingText).toContain('cheats and thereby dishonestly induces');
    });

    it('retrieves exact text for CrPC Section 54 (Warrantless Arrest)', () => {
      const ret = retrieveLegalSources('CrPC, 1898, Section 54');
      expect(ret.status).toBe('success');
      expect(ret.ambiguityStatus).toBe('unambiguous');

      const top = ret.results[0];
      expect(top.id).toBe('bd-crpc-1898:Section 54');
      expect(top.identifier).toBe('Section 54');
      expect(top.relevanceScore).toBe(100);
      expect(top.matchingText).toContain('without an order from a Magistrate and without a warrant');
    });
  });

  // ==========================================================================
  // Group 3: Correct Handling of Section 302 Weakness & Cross-References
  // ==========================================================================
  describe('3. Section 302 Weakness Resolution & Anti-Substitution', () => {
    it('does NOT substitute Section 300 as Section 302 when Section 302 is queried', async () => {
      const ret = retrieveLegalSources('The Penal Code, 1860, Section 302');

      // Must be classified as missing from curated subset
      expect(ret.status).toBe('act-found-section-missing');
      expect(ret.ambiguityStatus).toBe('act-found-section-missing');

      // Primary result must NOT be Section 300 statutory-provision
      const section300AsProvision = ret.results.find(
        (r) => r.recordType === 'statutory-provision' && r.identifier === 'Section 300'
      );
      expect(section300AsProvision).toBeUndefined();

      // Top result is statute metadata, NOT Section 300 text
      expect(ret.results[0].recordType).toBe('statute-metadata');
      expect(ret.results[0].sourceId).toBe('bd-penal-code-1860');

      // Cross-reference mention of Section 302 inside Section 300 is captured
      expect(ret.crossReferenceMentions).toBeDefined();
      expect(ret.crossReferenceMentions!.length).toBeGreaterThanOrEqual(1);
      const mention = ret.crossReferenceMentions![0];
      expect(mention.referencingSection).toBe('Section 300');
      expect(mention.context).toContain('Section 302');
    });

    it('generates accurate response stating Section 302 is not in curated subset while explaining Section 300 cross-reference', async () => {
      const route = await routeQuery('The Penal Code, 1860, Section 302');
      const gen = generateResponseFromRoute(route);

      expect(gen.status).toBe('partial-coverage');
      expect(gen.headline).toContain('Section 302');
      expect(gen.headline).toContain('Not in Curated Subset');

      // Headline and summary must NOT say Section 300
      expect(gen.headline).not.toContain('Section 300');

      // Structured explanation must clarify that Section 302 text is not digitized
      expect(gen.structuredExplanation).toContain('The specific section you queried (**Section 302**) is not present in the current curated dataset');

      // Must explain the cross-reference under Section 300 explicitly as a cross-reference
      expect(gen.structuredExplanation).toContain('Related In-Repo Cross-Reference Notice');
      expect(gen.structuredExplanation).toContain('Section 300 (Murder)');

      // Sources must only cite the statute metadata, NEVER Section 300 as Section 302
      expect(gen.sources.every((s) => s.identifier !== 'Section 302')).toBe(true);
      expect(gen.sources.every((s) => s.identifier !== 'Section 300')).toBe(true);
    });
  });

  // ==========================================================================
  // Group 4: Ambiguity Detection for Standalone Section Numbers
  // ==========================================================================
  describe('4. Ambiguity Detection (Standalone Sections)', () => {
    it('detects ambiguity when Section 54 is queried alone without an Act', () => {
      const ret = retrieveLegalSources('Section 54');
      expect(['ambiguous-section-multiple-acts', 'section-only-no-act']).toContain(ret.ambiguityStatus);
      expect(ret.results.length).toBeGreaterThan(0);
    });

    it('prompts user for clarification when standalone section is routed', async () => {
      const route = await routeQuery('Section 54');
      const gen = generateResponseFromRoute(route);

      expect(gen.status).toBe('clarification-required');
      expect(gen.headline).toContain('Clarification Needed');
      expect(gen.clarificationPrompt).toBeDefined();
      expect(gen.clarificationOptions).toBeDefined();
      expect(gen.clarificationOptions!.length).toBeGreaterThanOrEqual(2);
    });
  });

  // ==========================================================================
  // Group 5: Cross-Act Disambiguation (CrPC Sec 54 vs Penal Code Sec 54)
  // ==========================================================================
  describe('5. Cross-Act Disambiguation (CrPC Sec 54 vs Penal Code Sec 54)', () => {
    it('retrieves Section 54 for CrPC with 100 score and verbatim arrest text', () => {
      const ret = retrieveLegalSources('The Code of Criminal Procedure, 1898, Section 54');
      expect(ret.status).toBe('success');
      expect(ret.results[0].sourceId).toBe('bd-crpc-1898');
      expect(ret.results[0].identifier).toBe('Section 54');
      expect(ret.results[0].relevanceScore).toBe(100);
    });

    it('reports missing curated provision for Penal Code Section 54 without returning CrPC Section 54', () => {
      const ret = retrieveLegalSources('The Penal Code, 1860, Section 54');
      expect(ret.status).toBe('act-found-section-missing');
      expect(ret.results[0].sourceId).toBe('bd-penal-code-1860');

      // Must NOT contain CrPC Section 54
      const crpcInResults = ret.results.find((r) => r.sourceId === 'bd-crpc-1898');
      expect(crpcInResults).toBeUndefined();
    });
  });

  // ==========================================================================
  // Group 6: Absence from Database vs Non-Existence in Law Distinction
  // ==========================================================================
  describe('6. Absence from Database vs Non-Existence in Law', () => {
    it('distinguishes that Section 54 exists in Penal Code (511 sections) but is missing from curated set', async () => {
      const route = await routeQuery('The Penal Code, 1860, Section 54');
      const gen = generateResponseFromRoute(route);

      expect(gen.status).toBe('partial-coverage');
      expect(gen.headline).toContain('Not in Curated Subset');
      expect(gen.structuredExplanation).toContain('This section exists in enacted Bangladesh law under **The Penal Code, 1860**');
      expect(gen.limitations.some((l) => l.includes('Absence from Nyayota does not mean'))).toBe(true);
    });

    it('distinguishes that Section 999 exceeds total codified sections of Penal Code (511 sections)', async () => {
      const route = await routeQuery('The Penal Code, 1860, Section 999');
      const gen = generateResponseFromRoute(route);

      expect(gen.status).toBe('partial-coverage');
      expect(gen.structuredExplanation).toContain('511 sections');
      expect(gen.structuredExplanation).toContain('exceeds the maximum number of sections');
    });
  });

  // ==========================================================================
  // Group 7: India / IPC Jurisdiction Separation (Rule 4 Safety)
  // ==========================================================================
  describe('7. India / IPC Jurisdiction Separation', () => {
    it('classifies IPC 302 query as Indian jurisdiction and requires clarification', () => {
      const res = classifyIntent('IPC Section 302');
      expect(res.detectedJurisdiction).toBe('India');
      expect(res.requiresClarification).toBe(true);
      expect(res.primaryIntent).toBe('clarification_needed');
    });

    it('generates jurisdiction boundary notice explaining Bangladesh vs India criminal codes', async () => {
      const route = await routeQuery('What is the punishment under IPC 302?');
      const gen = generateResponseFromRoute(route);

      expect(gen.status).toBe('clarification-required');
      expect(gen.detectedJurisdiction).toBe('India');
      expect(gen.structuredExplanation).toContain('Indian Penal Code');
      expect(gen.structuredExplanation).toContain('The Penal Code, 1860');
      expect(gen.sources.length).toBe(0); // Must not attach Bangladesh provisions as Indian law
    });
  });

  // ==========================================================================
  // Group 8: Bengali Numeral and Terminology Normalization
  // ==========================================================================
  describe('8. Bengali Numeral and Terminology Normalization', () => {
    it('converts Bengali numerals in section queries accurately', () => {
      const ret = retrieveLegalSources('দণ্ডবিধি ধারা ৩০০');
      expect(ret.status).toBe('success');
      expect(ret.detectedSectionNumber).toBe('Section 300');
      const sec300 = ret.results.find((r) => r.identifier === 'Section 300');
      expect(sec300).toBeDefined();
      expect(sec300?.sourceId).toBe('bd-penal-code-1860');
    });

    it('handles Bengali CrPC Section 54 query', () => {
      const ret = retrieveLegalSources('ফৌজদারি কার্যবিধি ধারা ৫৪');
      expect(ret.status).toBe('success');
      const sec54 = ret.results.find((r) => r.identifier === 'Section 54');
      expect(sec54).toBeDefined();
      expect(sec54?.sourceId).toBe('bd-crpc-1898');
    });

    it('handles Bengali Constitution Article 102 query', () => {
      const ret = retrieveLegalSources('সংবিধান অনুচ্ছেদ ১০২');
      expect(ret.status).toBe('success');
      const art102 = ret.results.find((r) => r.identifier === 'Article 102');
      expect(art102).toBeDefined();
      expect(art102?.sourceId).toBe('bd-constitution-1972');
    });
  });

  // ==========================================================================
  // Group 9: Non-Legal Query Rejection
  // ==========================================================================
  describe('9. Non-Legal Query Rejection', () => {
    it('rejects coding queries politely', async () => {
      const route = await routeQuery('write a react hook for localstorage');
      const gen = generateResponseFromRoute(route);

      expect(gen.status).toBe('out-of-scope');
      expect(gen.detectedIntent).toBe('out_of_scope');
      expect(gen.structuredExplanation).toContain('We cannot assist with general programming');
    });

    it('rejects culinary recipe queries', async () => {
      const route = await routeQuery('how to cook kacchi biryani');
      const gen = generateResponseFromRoute(route);

      expect(gen.status).toBe('out-of-scope');
      expect(gen.sources.length).toBe(0);
    });
  });

  // ==========================================================================
  // Group 10: Empty and Gibberish Handling
  // ==========================================================================
  describe('10. Empty and Gibberish Query Handling', () => {
    it('handles empty query string safely', () => {
      const ret = retrieveLegalSources('');
      expect(ret.status).toBe('empty-query');
      expect(ret.results.length).toBe(0);
    });

    it('handles gibberish safely with search suggestions', async () => {
      const route = await routeQuery('asdfghjklqwerty123456');
      const gen = generateResponseFromRoute(route);

      expect(gen.status).toBe('unintelligible');
      expect(gen.structuredExplanation).toContain('How to Structure Your Query');
      expect(gen.sources.length).toBe(0);
    });
  });

  // ==========================================================================
  // Group 11: Citation & Source URL Fidelity
  // ==========================================================================
  describe('11. Citation & Source URL Fidelity', () => {
    it('verifies all generated citations contain valid, non-fabricated URLs', async () => {
      const route = await routeQuery('The Penal Code, 1860 Section 300');
      const gen = generateResponseFromRoute(route);

      expect(gen.sources.length).toBeGreaterThan(0);
      for (const citation of gen.sources) {
        // Internal URLs must begin with /
        if (citation.internalUrl) {
          expect(citation.internalUrl.startsWith('/')).toBe(true);
        }
        // Official external URLs must begin with http:// or https://
        if (citation.officialUrl) {
          expect(citation.officialUrl.startsWith('http')).toBe(true);
          expect(
            citation.officialUrl.includes('bdlaws.minlaw.gov.bd') ||
            citation.officialUrl.includes('un.org')
          ).toBe(true);
        }
      }
    });

    it('verifies international treaty citations contain authentic UN links', async () => {
      const route = await routeQuery('UDHR Universal Declaration of Human Rights');
      const gen = generateResponseFromRoute(route);

      expect(gen.sources.length).toBeGreaterThan(0);
      const udhr = gen.sources.find((s) => s.sourceId === 'int-udhr-1948');
      expect(udhr).toBeDefined();
      expect(udhr?.officialUrl).toContain('un.org');
    });
  });

  // ==========================================================================
  // Group 12: Mandatory Educational Disclaimer Presence
  // ==========================================================================
  describe('12. Mandatory Educational Disclaimer Presence', () => {
    it('includes formal educational disclaimers on all legal answers', async () => {
      const queries = [
        'The Penal Code, 1860, Section 300',
        'What is Mens Rea?',
        'How to file a GD for lost phone',
        'UDHR Universal Declaration of Human Rights',
      ];

      for (const q of queries) {
        const route = await routeQuery(q);
        const gen = generateResponseFromRoute(route);

        expect(gen.disclaimer).toBeDefined();
        expect(gen.disclaimer).toContain('educational and legal research purposes');
        expect(gen.disclaimer).toContain('Bangladesh Bar Council');
        expect(gen.disclaimerBn).toBeDefined();
        expect(gen.disclaimerBn).toContain('শিক্ষামূলক');
      }
    });
  });

  // ==========================================================================
  // Group 13: Server Integration Service Pipeline Boundary
  // ==========================================================================
  describe('13. Server Integration Pipeline (Service Boundary)', () => {
    it('processes valid statutory requests through executeNyayotaAIPipeline end-to-end', async () => {
      const serviceRes = await executeNyayotaAIPipeline({
        query: 'The Penal Code, 1860, Section 300',
        language: 'both',
      });

      expect(serviceRes.success).toBe(true);
      expect(serviceRes.status).toBe('partial-coverage');
      expect(serviceRes.headline).toBe('The Penal Code, 1860 — Section 300');
      expect(serviceRes.sources.length).toBeGreaterThan(0);
      expect(serviceRes.text).toContain('culpable homicide is murder');
      expect(serviceRes.text).toContain('সতর্কবার্তা');
      expect(serviceRes.executionTimeMs).toBeGreaterThanOrEqual(0);
      expect(serviceRes.executionTimeMs).toBeLessThan(150); // High-speed deterministic execution
    });

    it('sanitizes input control characters and trims whitespace in service pipeline', async () => {
      const dirtyQuery = '\x00\x08  Penal Code Section 300  \x1F\x7F';
      const serviceRes = await executeNyayotaAIPipeline({
        query: dirtyQuery,
      });

      expect(serviceRes.success).toBe(true);
      expect(serviceRes.query).toBe('Penal Code Section 300');
      expect(serviceRes.sources.length).toBeGreaterThan(0);
    });

    it('safely handles empty queries in service pipeline', async () => {
      const serviceRes = await executeNyayotaAIPipeline({
        query: '   \t  ',
      });

      expect(serviceRes.success).toBe(false);
      expect(serviceRes.status).toBe('unintelligible');
      expect(serviceRes.validationErrors).toBeDefined();
      expect(serviceRes.validationErrors!.length).toBeGreaterThan(0);
    });

    it('enforces size caps on oversized queries in service pipeline', async () => {
      const hugeQuery = 'A'.repeat(2000);
      const serviceRes = await executeNyayotaAIPipeline({
        query: hugeQuery,
      });

      expect(serviceRes.query.length).toBe(1500);
      expect(serviceRes.validationErrors).toBeDefined();
      expect(serviceRes.validationErrors![0]).toContain('exceeded maximum limit');
    });
  });
});
