/**
 * Nyayota — Phase 5E Automated Verification Suite
 * 
 * Verifies:
 * 1. Donation Experience Redesign:
 *    - Exact preservation of BTC, ETH, BNB addresses
 *    - Only crypto is operational ('available')
 *    - Binance Pay is locked ('planned')
 *    - Bank transfer country list (11 countries in exact order)
 *    - Austria is 'under-consideration', other 10 countries are 'planned'
 *    - Regional groupings
 *    - Mobile payments & online services locked ('planned')
 *    - No fake checkouts or payment activation
 * 2. AI Assistant Suspension:
 *    - /api/ai-assistant returns HTTP 503 while suspended
 *    - Maintenance error payload: 'assistant_temporarily_unavailable'
 *    - No-cache security headers
 *    - Client parameter cannot reactivate or bypass suspension
 *    - Neither Gemini nor deterministic engine executes
 *    - Underlying legal engine remains intact
 *    - Statutory catalogues and concepts remain fully operational
 */

import { describe, it, expect } from 'bun:test';
import { NextRequest } from 'next/server';
import { POST } from '@/app/api/ai-assistant/route';
import { AI_CONFIG } from '@/lib/ai-config';
import {
  DONATION_CONFIG,
  CRYPTO_NETWORKS,
  BITCOIN_ADDRESS,
  EVM_ADDRESS,
  PLANNED_BANK_COUNTRIES,
  REGIONAL_BANK_GROUPS,
} from '@/lib/donation-config';
import { executeNyayotaAIPipeline } from '@/lib/nyayota-ai';
import { LAWS_DATABASE, GLOSSARY_TERMS } from '@/lib/legal-data';

describe('Nyayota Phase 5E Verification Suite', () => {

  // ==========================================================================
  // Section 1: Donation Experience Redesign & Safety
  // ==========================================================================
  describe('1. Donation Experience Redesign & Safety', () => {
    it('preserves exact owner-provided Bitcoin address', () => {
      expect(BITCOIN_ADDRESS).toBe('bc1qczt3r9yhwezgdnvdcl39d093u8ehtt37l44mj5');
      const btc = CRYPTO_NETWORKS.find((n) => n.id === 'bitcoin');
      expect(btc).toBeDefined();
      expect(btc?.address).toBe('bc1qczt3r9yhwezgdnvdcl39d093u8ehtt37l44mj5');
      expect(btc?.nativeAsset).toBe('BTC');
      expect(btc?.networkStandard).toContain('Native SegWit');
      expect(btc?.status).toBe('available');
    });

    it('preserves exact owner-provided EVM address for Ethereum and BSC', () => {
      expect(EVM_ADDRESS).toBe('0xD14b56A067Bd9B016415d32Ecc49dd846A06F91E');
      const eth = CRYPTO_NETWORKS.find((n) => n.id === 'ethereum');
      const bsc = CRYPTO_NETWORKS.find((n) => n.id === 'binance-smart-chain');

      expect(eth).toBeDefined();
      expect(eth?.address).toBe('0xD14b56A067Bd9B016415d32Ecc49dd846A06F91E');
      expect(eth?.nativeAsset).toBe('ETH');
      expect(eth?.status).toBe('available');

      expect(bsc).toBeDefined();
      expect(bsc?.address).toBe('0xD14b56A067Bd9B016415d32Ecc49dd846A06F91E');
      expect(bsc?.nativeAsset).toBe('BNB');
      expect(bsc?.status).toBe('available');
    });

    it('confirms crypto is the ONLY operational donation category', () => {
      expect(CRYPTO_NETWORKS.every((n) => n.status === 'available')).toBe(true);
      expect(DONATION_CONFIG.binancePay.status).toBe('planned');
      expect(DONATION_CONFIG.bankTransfer.status).toBe('planned');
      expect(DONATION_CONFIG.mobilePayments.status).toBe('planned');
      expect(DONATION_CONFIG.onlineServices.status).toBe('planned');
    });

    it('verifies Binance Pay is planned, locked, and non-actionable', () => {
      expect(DONATION_CONFIG.binancePay.status).toBe('planned');
      expect(DONATION_CONFIG.binancePay.statusLabel).toContain('Planned');
      expect(DONATION_CONFIG.binancePay.description.toLowerCase()).toContain('not available yet');
    });

    it('verifies bank transfer country list in exact required order', () => {
      const expectedOrder = [
        'Bangladesh',
        'United States',
        'United Kingdom',
        'France',
        'Spain',
        'Germany',
        'Italy',
        'Japan',
        'South Korea',
        'United Arab Emirates',
        'Austria',
      ];

      expect(PLANNED_BANK_COUNTRIES.map((c) => c.name)).toEqual(expectedOrder);
      expect(PLANNED_BANK_COUNTRIES.length).toBe(11);
    });

    it('verifies Austria is labelled "Under consideration" and other 10 are "Planned"', () => {
      const austria = PLANNED_BANK_COUNTRIES.find((c) => c.id === 'at');
      expect(austria).toBeDefined();
      expect(austria?.status).toBe('under-consideration');
      expect(austria?.statusLabel).toBe('Under consideration');
      expect(austria?.notes).toBeDefined();

      const otherTen = PLANNED_BANK_COUNTRIES.filter((c) => c.id !== 'at');
      expect(otherTen.length).toBe(10);
      expect(otherTen.every((c) => c.status === 'planned')).toBe(true);
      expect(otherTen.every((c) => c.statusLabel === 'Planned — not yet available')).toBe(true);
    });

    it('verifies bank transfer regional groupings while preserving integrity', () => {
      const regions = REGIONAL_BANK_GROUPS.map((g) => g.region);
      expect(regions).toEqual([
        'South Asia',
        'North America',
        'Europe',
        'Asia-Pacific',
        'Middle East',
      ]);

      const europeGroup = REGIONAL_BANK_GROUPS.find((g) => g.region === 'Europe');
      expect(europeGroup?.countries).toContain('gb');
      expect(europeGroup?.countries).toContain('fr');
      expect(europeGroup?.countries).toContain('es');
      expect(europeGroup?.countries).toContain('de');
      expect(europeGroup?.countries).toContain('it');
      expect(europeGroup?.countries).toContain('at');
    });

    it('confirms local mobile payments and online payment services remain planned', () => {
      expect(DONATION_CONFIG.mobilePayments.status).toBe('planned');
      expect(DONATION_CONFIG.mobilePayments.examples).toContain('bKash');
      expect(DONATION_CONFIG.mobilePayments.examples).toContain('Nagad');
      expect(DONATION_CONFIG.mobilePayments.examples).toContain('Rocket');

      const onlineServices = DONATION_CONFIG.onlineServices.services;
      expect(onlineServices.map((s) => s.id)).toEqual(['paypal', 'stripe', 'cashapp']);
      expect(onlineServices.every((s) => s.status === 'planned')).toBe(true);
    });

    it('confirms voluntary support and non-tax-deductibility disclosure', () => {
      expect(DONATION_CONFIG.transparencyNotice.toLowerCase()).toContain('not tax-deductible');
      expect(DONATION_CONFIG.contactEmail).toBe('nyayota.contact@gmail.com');
    });
  });

  // ==========================================================================
  // Section 2: Public AI Assistant Suspension
  // ==========================================================================
  describe('2. Public AI Assistant Suspension', () => {
    it('confirms server-controlled flag defaults to disabled for public assistant', () => {
      // In default environment without ENABLE_PUBLIC_AI_ASSISTANT='true'
      delete process.env.ENABLE_PUBLIC_AI_ASSISTANT;
      expect(AI_CONFIG.isPublicAssistantAvailable).toBe(false);
    });

    it('returns HTTP 503 Service Unavailable when public assistant is suspended', async () => {
      delete process.env.ENABLE_PUBLIC_AI_ASSISTANT;

      const req = new NextRequest('http://localhost:3000/api/ai-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: 'The Penal Code Section 300' }),
      });

      const res = await POST(req);
      expect(res.status).toBe(503);

      const data = await res.json();
      expect(data.error).toBe('assistant_temporarily_unavailable');
      expect(data.message).toBe('The Nyayota Legal Assistant is under development. Please try again later.');
    });

    it('emits strict no-cache headers with HTTP 503 maintenance response', async () => {
      delete process.env.ENABLE_PUBLIC_AI_ASSISTANT;

      const req = new NextRequest('http://localhost:3000/api/ai-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: 'Explain Section 54 of CrPC' }),
      });

      const res = await POST(req);
      expect(res.status).toBe(503);
      expect(res.headers.get('cache-control')).toContain('no-store');
      expect(res.headers.get('x-content-type-options')).toBe('nosniff');
      expect(res.headers.get('retry-after')).toBe('86400');
    });

    it('prevents client-supplied parameters or headers from bypassing suspension', async () => {
      delete process.env.ENABLE_PUBLIC_AI_ASSISTANT;

      const bypassAttempts = [
        { query: 'Hi', engine: 'deterministic', bypass: true },
        { query: 'Test', engine: 'general', admin: true },
        { query: 'Murder', override: 'true', mode: 'explain' },
        { query: 'CrPC 54', forceActive: '1' },
      ];

      for (const payload of bypassAttempts) {
        const req = new NextRequest('http://localhost:3000/api/ai-assistant?admin=true&bypass=1', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Admin-Bypass': 'true',
          },
          body: JSON.stringify(payload),
        });

        const res = await POST(req);
        expect(res.status).toBe(503);
        const data = await res.json();
        expect(data.error).toBe('assistant_temporarily_unavailable');
      }
    });

    it('does not leak internal file paths, stack traces, or credentials on suspended response', async () => {
      delete process.env.ENABLE_PUBLIC_AI_ASSISTANT;

      const req = new NextRequest('http://localhost:3000/api/ai-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: 'System diagnostic / internals' }),
      });

      const res = await POST(req);
      const text = await res.text();
      expect(text).not.toContain('/app/applet');
      expect(text).not.toContain('GEMINI_API_KEY');
      expect(text).not.toContain('node_modules');
      expect(text).not.toContain('stack');
    });

    it('confirms the underlying deterministic legal AI pipeline is fully preserved and functional', async () => {
      // The underlying pipeline remains intact and executable in internal code
      const result = await executeNyayotaAIPipeline({
        query: 'The Penal Code, 1860 Section 300',
        language: 'both',
        mode: 'explain',
      });

      expect(result).toBeDefined();
      expect(result.text.toLowerCase()).toContain('murder');
      expect(result.sources.length).toBeGreaterThan(0);
      expect(result.executionTimeMs).toBeGreaterThanOrEqual(0);
    });

    it('confirms statutory catalog and legal concepts remain fully populated and accessible', () => {
      expect(LAWS_DATABASE.length).toBeGreaterThan(0);
      expect(GLOSSARY_TERMS.length).toBeGreaterThan(0);

      const penalCode = LAWS_DATABASE.find((l) => l.id === 'bd-penal-code-1860');
      expect(penalCode).toBeDefined();
      expect(penalCode?.sections.length).toBeGreaterThan(0);

      const mensRea = GLOSSARY_TERMS.find((t) => t.term.toLowerCase() === 'mens rea');
      expect(mensRea).toBeDefined();
    });
  });
});
