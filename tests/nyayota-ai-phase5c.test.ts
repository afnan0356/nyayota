/**
 * Nyayota AI — Phase 5C Production Quality Assurance, Legal Trust & Donation Safety Suite
 * 
 * Verifies:
 * 1. Dual-engine isolation and explicit fallback attribution
 * 2. Strict request validation (empty, oversized, malformed JSON, invalid content-type)
 * 3. Retrieval integrity, anti-substitution, and statutory range boundaries
 * 4. Citation fidelity and official URL verification
 * 5. Cryptocurrency donation native asset restrictions and exact addresses
 */

import { describe, it, expect } from 'bun:test';
import { POST } from '@/app/api/ai-assistant/route';
import { NextRequest } from 'next/server';
import {
  DONATION_CONFIG,
  CRYPTO_NETWORKS,
  BITCOIN_ADDRESS,
  EVM_ADDRESS,
} from '@/lib/donation-config';
import { executeNyayotaAIPipeline } from '@/lib/nyayota-ai';
import { isVerifiedOfficialUrl } from '@/components/CitationCard';

describe('Nyayota AI — Phase 5C QA & Safety Suite', () => {

  // ==========================================================================
  // Group 1: Engine Isolation & Fallback Attribution
  // ==========================================================================
  describe('1. Engine Isolation & Fallback Attribution', () => {
    it('deterministic mode executes local pipeline without invoking Gemini', async () => {
      const req = new NextRequest('http://localhost:3000/api/ai-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: 'The Penal Code, 1860 Section 300',
          engine: 'deterministic',
        }),
      });

      const res = await POST(req);
      expect(res.status).toBe(200);
      const data = await res.json();

      expect(data.engine).toBe('deterministic');
      expect(data.provider).toBe('nyayota-deterministic-engine');
      expect(data.text).toBeDefined();
      expect(data.text.toLowerCase()).toContain('murder');
      expect(data.deterministicResponse).toBeDefined();
    });

    it('identifies provider clearly in general mode', async () => {
      const req = new NextRequest('http://localhost:3000/api/ai-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: 'What is negligence in tort law?',
          engine: 'general',
        }),
      });

      const res = await POST(req);
      expect(res.status).toBe(200);
      const data = await res.json();

      expect(data.engine).toBe('general');
      expect(['gemini-3.8-flash', 'gemini-2.5-flash', 'nyayota-legal-engine-v1']).toContain(data.provider);
      expect(data.text).toBeDefined();
      expect(data.text.toLowerCase()).toContain('negligence');
    }, 15000);

    it('defaults invalid or unknown engine values safely to deterministic pipeline', async () => {
      const req = new NextRequest('http://localhost:3000/api/ai-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: 'CrPC Section 54',
          engine: 'attacker-injected-mode',
        }),
      });

      const res = await POST(req);
      expect(res.status).toBe(200);
      const data = await res.json();

      expect(data.engine).toBe('deterministic');
      expect(data.provider).toBe('nyayota-deterministic-engine');
      expect(data.text.toLowerCase()).toContain('arrest');
    });
  });

  // ==========================================================================
  // Group 2: Strict Request Validation & Security Boundaries
  // ==========================================================================
  describe('2. Strict Request Validation & Defensive Security', () => {
    it('rejects empty query string with 400 status', async () => {
      const req = new NextRequest('http://localhost:3000/api/ai-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: '' }),
      });

      const res = await POST(req);
      expect(res.status).toBe(400);
      const data = await res.json();
      expect(data.error).toContain('Query parameter is required');
    });

    it('rejects whitespace-only queries with 400 status', async () => {
      const req = new NextRequest('http://localhost:3000/api/ai-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: '     \n\t   ' }),
      });

      const res = await POST(req);
      expect(res.status).toBe(400);
      const data = await res.json();
      expect(data.error).toContain('Query parameter is required');
    });

    it('rejects queries shorter than 2 characters with 400 status', async () => {
      const req = new NextRequest('http://localhost:3000/api/ai-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: 'a' }),
      });

      const res = await POST(req);
      expect(res.status).toBe(400);
      const data = await res.json();
      expect(data.error).toContain('at least 2 characters');
    });

    it('rejects queries exceeding 1500 characters with 400 status', async () => {
      const longQuery = 'Section 300 '.repeat(200);
      const req = new NextRequest('http://localhost:3000/api/ai-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: longQuery }),
      });

      const res = await POST(req);
      expect(res.status).toBe(400);
      const data = await res.json();
      expect(data.error).toContain('1,500 characters');
    });

    it('rejects non-JSON Content-Type with 415 status', async () => {
      const req = new NextRequest('http://localhost:3000/api/ai-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: 'query=Section+300',
      });

      const res = await POST(req);
      expect(res.status).toBe(415);
      const data = await res.json();
      expect(data.error).toContain('Invalid Content-Type');
    });

    it('rejects malformed JSON payload with 400 status', async () => {
      const req = new NextRequest('http://localhost:3000/api/ai-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: '{"query": "broken json payload',
      });

      const res = await POST(req);
      expect(res.status).toBe(400);
      const data = await res.json();
      expect(data.error).toContain('Malformed JSON');
    });

    it('handles unexpected lawContext properties defensively without crashing', async () => {
      const req = new NextRequest('http://localhost:3000/api/ai-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: 'Section 300',
          engine: 'deterministic',
          lawContext: {
            title: null,
            unexpectedField: [1, 2, 3],
            sectionNumber: { invalid: true },
          },
        }),
      });

      const res = await POST(req);
      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data.text).toBeDefined();
    });
  });

  // ==========================================================================
  // Group 3: Legal Retrieval Accuracy & Anti-Substitution Protection
  // ==========================================================================
  describe('3. Legal Retrieval Accuracy & Anti-Substitution Protection', () => {
    it('retrieves verbatim text for Penal Code Section 300 (Murder)', async () => {
      const result = await executeNyayotaAIPipeline({
        query: 'The Penal Code, 1860 Section 300',
      });

      expect(result.text.toLowerCase()).toContain('murder');
      expect(result.text.toLowerCase()).toContain('culpable homicide is murder');
      expect(result.sources.length).toBeGreaterThan(0);
      expect(result.sources[0].identifier).toBe('Section 300');
    });

    it('retrieves verbatim text for CrPC Section 54 (Arrest without warrant)', async () => {
      const result = await executeNyayotaAIPipeline({
        query: 'The Code of Criminal Procedure, 1898 Section 54',
      });

      expect(result.text.toLowerCase()).toContain('arrest');
      expect(result.sources.length).toBeGreaterThan(0);
      expect(result.sources[0].title).toBe('The Code of Criminal Procedure, 1898');
      expect(result.sources[0].identifier).toBe('Section 54');
    });

    it('does NOT substitute Section 300 for Section 302 and explains cross-reference', async () => {
      const result = await executeNyayotaAIPipeline({
        query: 'The Penal Code, 1860 Section 302',
      });

      // Must be missing from curated subset, not substituted with Section 300
      expect(result.status).toBe('partial-coverage');
      expect(result.text).toContain('not present in the current curated dataset');
      expect(result.crossReferenceMentions).toBeDefined();
      expect(result.crossReferenceMentions!.length).toBeGreaterThan(0);
      expect(result.crossReferenceMentions![0].referencingSection).toBe('Section 300');
    });

    it('distinguishes missing curated provision from statutory non-existence', async () => {
      // Section 54 exists in Penal Code (511 sections)
      const res54 = await executeNyayotaAIPipeline({ query: 'The Penal Code, 1860 Section 54' });
      expect(res54.text).toContain('The Penal Code, 1860');
      expect(res54.text).toContain('not present in the current curated dataset');

      // Section 999 exceeds total codified sections (511 sections)
      const res999 = await executeNyayotaAIPipeline({ query: 'The Penal Code, 1860 Section 999' });
      expect(res999.text).toContain('exceeds the maximum number of sections');
    });

    it('requires clarification for standalone ambiguous Section 54', async () => {
      const result = await executeNyayotaAIPipeline({ query: 'Section 54' });
      expect(result.status).toBe('clarification-required');
      expect(result.clarificationOptions).toBeDefined();
      expect(result.clarificationOptions!.length).toBeGreaterThanOrEqual(2);
      expect(result.clarificationOptions!.some((o) => o.includes('Criminal Procedure, 1898'))).toBe(true);
      expect(result.clarificationOptions!.some((o) => o.includes('Penal Code, 1860'))).toBe(true);
    });

    it('normalizes Bengali numerals and statute terms accurately', async () => {
      const result = await executeNyayotaAIPipeline({ query: 'দণ্ডবিধি ধারা ৩০০' });
      expect(result.text.toLowerCase()).toContain('murder');
      expect(result.sources.length).toBeGreaterThan(0);
      expect(result.sources[0].identifier).toBe('Section 300');
    });

    it('separates Indian Penal Code (IPC) from Bangladesh jurisdiction', async () => {
      const result = await executeNyayotaAIPipeline({ query: 'IPC Section 302' });
      expect(result.detectedJurisdiction).toBe('India');
      expect(result.text).toContain('Indian Penal Code');
      expect(result.text).toContain('The Penal Code, 1860');
    });

    it('rejects non-legal queries politely', async () => {
      const result = await executeNyayotaAIPipeline({ query: 'how to bake chocolate cookies' });
      expect(result.status).toBe('out-of-scope');
      expect(result.detectedIntent).toBe('out_of_scope');
      expect(result.text).toContain('Dedicated Legal Scope');
    });
  });

  // ==========================================================================
  // Group 4: Citation Integrity & Official URL Verification
  // ==========================================================================
  describe('4. Citation Integrity & Official URL Verification', () => {
    it('validates authentic government and UN domains via isVerifiedOfficialUrl', () => {
      expect(isVerifiedOfficialUrl('http://bdlaws.minlaw.gov.bd/act-details-28.html')).toBe(true);
      expect(isVerifiedOfficialUrl('https://bdlaws.minlaw.gov.bd/act-details-28.html')).toBe(true);
      expect(isVerifiedOfficialUrl('https://treaties.un.org/pages/ViewDetails.aspx?src=TREATY&mtdsg_no=IV-4')).toBe(true);
      expect(isVerifiedOfficialUrl('https://supremecourt.gov.bd/')).toBe(true);
    });

    it('rejects untrusted or fabricated domains via isVerifiedOfficialUrl', () => {
      expect(isVerifiedOfficialUrl('https://fake-laws.com/act')).toBe(false);
      expect(isVerifiedOfficialUrl('https://suspicious-archive.org/bdlaw')).toBe(false);
      expect(isVerifiedOfficialUrl('javascript:alert(1)')).toBe(false);
      expect(isVerifiedOfficialUrl('')).toBe(false);
      expect(isVerifiedOfficialUrl(undefined)).toBe(false);
    });
  });

  // ==========================================================================
  // Group 5: Cryptocurrency Donation Safety & Native Asset Focus
  // ==========================================================================
  describe('5. Cryptocurrency Donation Safety & Native Asset Focus', () => {
    it('reproduces exact Bitcoin address', () => {
      expect(BITCOIN_ADDRESS).toBe('bc1qczt3r9yhwezgdnvdcl39d093u8ehtt37l44mj5');
    });

    it('reproduces exact EVM address for Ethereum and BSC', () => {
      expect(EVM_ADDRESS).toBe('0xD14b56A067Bd9B016415d32Ecc49dd846A06F91E');
    });

    it('strictly recommends native assets only (BTC, ETH, BNB)', () => {
      const btc = CRYPTO_NETWORKS.find((n) => n.id === 'bitcoin');
      const eth = CRYPTO_NETWORKS.find((n) => n.id === 'ethereum');
      const bsc = CRYPTO_NETWORKS.find((n) => n.id === 'binance-smart-chain');

      expect(btc).toBeDefined();
      expect(btc!.recommendedAssets).toBe('BTC (Native)');

      expect(eth).toBeDefined();
      expect(eth!.recommendedAssets).toBe('ETH (Native)');

      expect(bsc).toBeDefined();
      expect(bsc!.recommendedAssets).toBe('BNB (Native)');
    });

    it('contains strict warnings against cross-chain broadcasting', () => {
      for (const net of CRYPTO_NETWORKS) {
        const warning = net.networkWarning.toLowerCase();
        expect(warning.includes('loss') || warning.includes('lost')).toBe(true);
      }
    });

    it('confirms voluntary support and non-tax-deductible disclosure', () => {
      expect(DONATION_CONFIG.transparencyNotice).toContain('not tax-deductible');
      expect(DONATION_CONFIG.transparencyNotice).toContain('non-refundable');
    });
  });
});
