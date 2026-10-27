/**
 * Nyayota AI — Phase 5B Test Suite
 * 
 * Verifies Phase 5B Assistant Integration, Citation Cards, Clarification Cards,
 * and Cryptocurrency Donation Configuration & Safety.
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
import { SUPPORT_DONATION_CONFIG } from '@/components/Footer';
import { executeNyayotaAIPipeline } from '@/lib/nyayota-ai';

describe('Nyayota AI — Phase 5B Integration & Donation Suite', () => {
  // ==========================================================================
  // Group 1: Deterministic Engine Integration via API Route
  // ==========================================================================
  describe('1. API Route Mode Routing & Deterministic Execution', () => {
    it('executes deterministic mode without invoking Gemini when engine is deterministic', async () => {
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
      expect(data.text).toContain('Murder');
      expect(data.deterministicResponse).toBeDefined();
      expect(data.deterministicResponse.sources.length).toBeGreaterThan(0);
      expect(data.deterministicResponse.sources[0].title).toBe('The Penal Code, 1860');
    });

    it('routes to general AI mode when engine is general', async () => {
      const req = new NextRequest('http://localhost:3000/api/ai-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: 'What is negligence in everyday terms?',
          engine: 'general',
        }),
      });

      const res = await POST(req);
      expect(res.status).toBe(200);
      const data = await res.json();

      expect(data.engine).toBe('general');
      // In environment without active Gemini API key, it falls back to nyayota-legal-engine-v1
      expect(['gemini-2.5-flash', 'nyayota-legal-engine-v1']).toContain(data.provider);
      expect(data.text).toBeDefined();
      expect(data.text.toLowerCase()).toContain('negligence');
    });

    it('safely defaults invalid or unrecognised engine strings to deterministic mode', async () => {
      const req = new NextRequest('http://localhost:3000/api/ai-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: 'CrPC Section 54',
          engine: 'unsupported-arbitrary-engine-xyz',
        }),
      });

      const res = await POST(req);
      expect(res.status).toBe(200);
      const data = await res.json();

      expect(data.engine).toBe('deterministic');
      expect(data.provider).toBe('nyayota-deterministic-engine');
      expect(data.text).toContain('without warrant');
    });

    it('rejects malformed non-JSON requests safely', async () => {
      const req = new NextRequest('http://localhost:3000/api/ai-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: 'invalid plain text payload',
      });

      const res = await POST(req);
      expect(res.status).toBe(415);
      const data = await res.json();
      expect(data.error).toContain('Invalid Content-Type');
    });

    it('rejects empty or whitespace-only queries safely', async () => {
      const req = new NextRequest('http://localhost:3000/api/ai-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: '   ',
          engine: 'deterministic',
        }),
      });

      const res = await POST(req);
      expect(res.status).toBe(400);
      const data = await res.json();
      expect(data.error).toContain('Query parameter is required');
    });
  });

  // ==========================================================================
  // Group 2: Clarification and Disambiguation Data Accuracy
  // ==========================================================================
  describe('2. Clarification Generation from In-Repo Data', () => {
    it('generates real candidate options when Section 54 is queried alone', async () => {
      const result = await executeNyayotaAIPipeline({
        query: 'Section 54',
      });

      expect(result.status).toBe('ambiguous-section-multiple-acts');
      expect(result.clarificationOptions).toBeDefined();
      expect(result.clarificationOptions!.length).toBeGreaterThanOrEqual(2);
      expect(result.clarificationOptions).toContain('The Code of Criminal Procedure, 1898');
      expect(result.clarificationOptions).toContain('The Penal Code, 1860');
      expect(result.clarificationPrompt).toBeDefined();
    });

    it('does not generate clarification options for exact unique section matches', async () => {
      const result = await executeNyayotaAIPipeline({
        query: 'The Penal Code, 1860 Section 420',
      });

      expect(result.status).toBe('exact-provision-found');
      expect(result.clarificationOptions).toBeUndefined();
    });
  });

  // ==========================================================================
  // Group 3: Citation Completeness and URL Integrity
  // ==========================================================================
  describe('3. Citation Completeness & Verified URL Integrity', () => {
    it('verifies that curated provisions have valid completeness tags and links', async () => {
      const result = await executeNyayotaAIPipeline({
        query: 'The Code of Criminal Procedure, 1898 Section 54',
      });

      expect(result.sources.length).toBeGreaterThan(0);
      const topCitation = result.sources[0];

      expect(topCitation.title).toBe('The Code of Criminal Procedure, 1898');
      expect(topCitation.identifier).toBe('Section 54');
      expect(topCitation.jurisdiction).toBe('Bangladesh');
      expect(topCitation.completeness).toBe('curated-provision');
      expect(topCitation.officialUrl).toBeDefined();
      expect(topCitation.officialUrl).toContain('bdlaws.minlaw.gov.bd');
    });

    it('does not fabricate official URLs for synthetic or missing records', async () => {
      const result = await executeNyayotaAIPipeline({
        query: 'non_existent_statute_xyz_99999',
      });

      for (const citation of result.sources) {
        if (citation.officialUrl) {
          expect(
            citation.officialUrl.startsWith('https://bdlaws.minlaw.gov.bd') ||
            citation.officialUrl.startsWith('http://bdlaws.minlaw.gov.bd') ||
            citation.officialUrl.startsWith('https://treaties.un.org')
          ).toBe(true);
        }
      }
    });
  });

  // ==========================================================================
  // Group 4: Cryptocurrency Donation Configuration & Exact Addresses
  // ==========================================================================
  describe('4. Cryptocurrency Donation Addresses & Configuration', () => {
    it('reproduces the exact Bitcoin mainnet address without mutation', () => {
      const expectedBtc = 'bc1qczt3r9yhwezgdnvdcl39d093u8ehtt37l44mj5';
      expect(BITCOIN_ADDRESS).toBe(expectedBtc);

      const btcConfig = CRYPTO_NETWORKS.find((n) => n.id === 'bitcoin');
      expect(btcConfig).toBeDefined();
      expect(btcConfig!.address).toBe(expectedBtc);
      expect(btcConfig!.networkName).toBe('Bitcoin Mainnet');
      expect(btcConfig!.ticker).toBe('BTC');
    });

    it('reproduces the exact EVM address for Ethereum Mainnet (ERC-20)', () => {
      const expectedEvm = '0xD14b56A067Bd9B016415d32Ecc49dd846A06F91E';
      expect(EVM_ADDRESS).toBe(expectedEvm);

      const ethConfig = CRYPTO_NETWORKS.find((n) => n.id === 'ethereum');
      expect(ethConfig).toBeDefined();
      expect(ethConfig!.address).toBe(expectedEvm);
      expect(ethConfig!.networkStandard).toBe('ERC-20');
      expect(ethConfig!.ticker).toBe('ETH');
    });

    it('reproduces the exact EVM address for BNB Smart Chain (BEP-20)', () => {
      const expectedEvm = '0xD14b56A067Bd9B016415d32Ecc49dd846A06F91E';
      const bscConfig = CRYPTO_NETWORKS.find((n) => n.id === 'binance-smart-chain');

      expect(bscConfig).toBeDefined();
      expect(bscConfig!.address).toBe(expectedEvm);
      expect(bscConfig!.networkStandard).toBe('BEP-20');
      expect(bscConfig!.ticker).toBe('BNB');
    });

    it('maintains three distinct network options with customized cautions', () => {
      expect(CRYPTO_NETWORKS.length).toBe(3);
      const ids = CRYPTO_NETWORKS.map((n) => n.id);
      expect(ids).toContain('bitcoin');
      expect(ids).toContain('ethereum');
      expect(ids).toContain('binance-smart-chain');

      for (const net of CRYPTO_NETWORKS) {
        expect(net.networkWarning.length).toBeGreaterThan(20);
        expect(net.recommendedAssets.length).toBeGreaterThan(0);
      }
    });

    it('verifies that Footer donation configuration links to /donate', () => {
      expect(SUPPORT_DONATION_CONFIG.isConfigured).toBe(true);
      expect(SUPPORT_DONATION_CONFIG.donationUrl).toBe('/donate');
      expect(DONATION_CONFIG.donationUrl).toBe('/donate');
    });
  });
});
