import { describe, expect, it } from 'bun:test';
import fs from 'node:fs';
import path from 'node:path';
import {
  DONATION_CONFIG,
  CRYPTO_NETWORKS,
  BITCOIN_ADDRESS,
  EVM_ADDRESS,
  CRYPTO_COMPACT_INSTRUCTIONS,
  PLANNED_BANK_COUNTRIES,
  OTHER_METHODS_INSTRUCTION,
  PAYMENT_CATEGORIES
} from '../lib/donation-config';

describe('Nyayota Phase 5F: Hierarchical Donation Architecture & Safety Verification', () => {
  describe('1. Top-Level Payment Categories Structure & Order', () => {
    it('defines exactly 4 top-level payment categories in strict required order', () => {
      expect(PAYMENT_CATEGORIES).toHaveLength(4);
      expect(PAYMENT_CATEGORIES[0].id).toBe('cryptocurrency');
      expect(PAYMENT_CATEGORIES[1].id).toBe('binance-pay');
      expect(PAYMENT_CATEGORIES[2].id).toBe('bank-transfer');
      expect(PAYMENT_CATEGORIES[3].id).toBe('other-methods');
    });

    it('marks cryptocurrency as the only available payment category', () => {
      const cryptoCat = PAYMENT_CATEGORIES.find((c) => c.id === 'cryptocurrency');
      expect(cryptoCat).toBeDefined();
      expect(cryptoCat?.isAvailable).toBe(true);
      expect(cryptoCat?.badge).toBe('Available now');

      const binanceCat = PAYMENT_CATEGORIES.find((c) => c.id === 'binance-pay');
      expect(binanceCat?.isAvailable).toBe(false);
      expect(binanceCat?.badge).toBe('Coming soon');

      const bankCat = PAYMENT_CATEGORIES.find((c) => c.id === 'bank-transfer');
      expect(bankCat?.isAvailable).toBe(false);
      expect(bankCat?.badge).toBe('Coming soon');

      const otherCat = PAYMENT_CATEGORIES.find((c) => c.id === 'other-methods');
      expect(otherCat?.isAvailable).toBe(false);
      expect(otherCat?.badge).toBe('Coming soon');
    });
  });

  describe('2. Cryptocurrency Method Navigation & Wallet Safety', () => {
    it('provides exactly 3 supported cryptocurrency methods', () => {
      expect(CRYPTO_NETWORKS).toHaveLength(3);
      const ids = CRYPTO_NETWORKS.map((n) => n.id);
      expect(ids).toEqual(['bitcoin', 'ethereum', 'binance-smart-chain']);
    });

    it('contains exact maintainer-supplied Bitcoin address', () => {
      const btc = CRYPTO_NETWORKS.find((n) => n.id === 'bitcoin');
      expect(btc).toBeDefined();
      expect(btc?.address).toBe('bc1qczt3r9yhwezgdnvdcl39d093u8ehtt37l44mj5');
      expect(btc?.ticker).toBe('BTC');
      expect(btc?.networkName).toBe('Bitcoin Mainnet');
      expect(btc?.networkStandard).toBe('Native SegWit (Bech32)');
      expect(btc?.status).toBe('available');
    });

    it('contains exact maintainer-supplied Ethereum address', () => {
      const eth = CRYPTO_NETWORKS.find((n) => n.id === 'ethereum');
      expect(eth).toBeDefined();
      expect(eth?.address).toBe('0xD14b56A067Bd9B016415d32Ecc49dd846A06F91E');
      expect(eth?.ticker).toBe('ETH');
      expect(eth?.networkName).toBe('Ethereum Mainnet');
      expect(eth?.networkStandard).toBe('ERC-20');
      expect(eth?.status).toBe('available');
    });

    it('contains exact maintainer-supplied BNB address on BNB Smart Chain', () => {
      const bnb = CRYPTO_NETWORKS.find((n) => n.id === 'binance-smart-chain');
      expect(bnb).toBeDefined();
      expect(bnb?.address).toBe('0xD14b56A067Bd9B016415d32Ecc49dd846A06F91E');
      expect(bnb?.ticker).toBe('BNB');
      expect(bnb?.networkName).toBe('BNB Smart Chain (BSC)');
      expect(bnb?.networkStandard).toBe('BEP-20');
      expect(bnb?.status).toBe('available');
    });

    it('confirms Ethereum and BNB share the identical EVM address', () => {
      expect(BITCOIN_ADDRESS).toBe('bc1qczt3r9yhwezgdnvdcl39d093u8ehtt37l44mj5');
      expect(EVM_ADDRESS).toBe('0xD14b56A067Bd9B016415d32Ecc49dd846A06F91E');
      const eth = CRYPTO_NETWORKS.find((n) => n.id === 'ethereum');
      const bnb = CRYPTO_NETWORKS.find((n) => n.id === 'binance-smart-chain');
      expect(eth?.address).toBe(bnb?.address);
    });

    it('provides clear 5-step compact instructions for cryptocurrency donations', () => {
      expect(CRYPTO_COMPACT_INSTRUCTIONS).toHaveLength(5);
      expect(CRYPTO_COMPACT_INSTRUCTIONS[0]).toContain('Choose your preferred cryptocurrency');
      expect(CRYPTO_COMPACT_INSTRUCTIONS[1]).toContain('Copy the receiving address or scan');
      expect(CRYPTO_COMPACT_INSTRUCTIONS[2]).toContain('matching network');
      expect(CRYPTO_COMPACT_INSTRUCTIONS[3]).toContain('native asset');
      expect(CRYPTO_COMPACT_INSTRUCTIONS[4]).toContain('verify the recipient address');
    });
  });

  describe('3. Bank Transfer Planned Country Roadmap', () => {
    it('defines exactly 11 planned countries in strict required sequence', () => {
      expect(PLANNED_BANK_COUNTRIES).toHaveLength(11);

      const expectedSequence = [
        { id: 'bd', name: 'Bangladesh', status: 'coming-soon' },
        { id: 'us', name: 'United States', status: 'coming-soon' },
        { id: 'gb', name: 'United Kingdom', status: 'coming-soon' },
        { id: 'fr', name: 'France', status: 'coming-soon' },
        { id: 'es', name: 'Spain', status: 'coming-soon' },
        { id: 'de', name: 'Germany', status: 'coming-soon' },
        { id: 'it', name: 'Italy', status: 'coming-soon' },
        { id: 'jp', name: 'Japan', status: 'coming-soon' },
        { id: 'kr', name: 'South Korea', status: 'coming-soon' },
        { id: 'ae', name: 'United Arab Emirates', status: 'coming-soon' },
        { id: 'at', name: 'Austria', status: 'under-consideration' },
      ];

      expectedSequence.forEach((expected, idx) => {
        const country = PLANNED_BANK_COUNTRIES[idx];
        expect(country.id).toBe(expected.id);
        expect(country.name).toBe(expected.name);
        expect(country.status).toBe(expected.status);
      });
    });

    it('confirms countries 1-10 are Coming Soon and country 11 (Austria) is Under Consideration', () => {
      for (let i = 0; i < 10; i++) {
        expect(PLANNED_BANK_COUNTRIES[i].status).toBe('coming-soon');
        expect(PLANNED_BANK_COUNTRIES[i].statusLabel).toBe('Coming soon');
      }

      const austria = PLANNED_BANK_COUNTRIES[10];
      expect(austria.id).toBe('at');
      expect(austria.name).toBe('Austria');
      expect(austria.status).toBe('under-consideration');
      expect(austria.statusLabel).toBe('Under consideration');
      expect(austria.notes).toContain('evaluated by the project maintainers');
    });

    it('ensures bank transfer description clearly states non-operational status', () => {
      expect(DONATION_CONFIG.bankTransfer.description).toContain(
        'The countries below indicate planned coverage only; no bank-transfer payments are currently available'
      );
    });
  });

  describe('4. Other Methods Roadmap & Disclaimers', () => {
    it('provides standard non-operational compact instruction for other methods', () => {
      expect(OTHER_METHODS_INSTRUCTION).toBe(
        'This payment option is not available yet. No payment can be made through this method at present.'
      );
    });

    it('includes regional mobile financial services with explicit illustrative disclaimers', () => {
      expect(DONATION_CONFIG.mobilePayments.status).toBe('coming-soon');
      expect(DONATION_CONFIG.mobilePayments.examples).toContain('bKash');
      expect(DONATION_CONFIG.mobilePayments.examples).toContain('Nagad');
      expect(DONATION_CONFIG.mobilePayments.examples).toContain('Rocket');
      expect(DONATION_CONFIG.mobilePayments.exampleDisclaimer).toContain(
        'illustrative examples of potential future integration channels, not active payment accounts'
      );
    });

    it('includes online payment services (PayPal, Stripe, Cash App) as coming soon', () => {
      const services = DONATION_CONFIG.onlineServices.services;
      expect(services).toHaveLength(3);
      const serviceIds = services.map((s) => s.id);
      expect(serviceIds).toEqual(['paypal', 'stripe', 'cashapp']);
      services.forEach((s) => {
        expect(s.status).toBe('coming-soon');
      });
    });
  });

  describe('5. UI Source File Verifications', () => {
    it('verifies app/donate/page.tsx has no checkbox surveys or selection states', () => {
      const donateCode = fs.readFileSync(path.join(process.cwd(), 'app/donate/page.tsx'), 'utf-8');

      // Must NOT contain checkbox inputs or checkbox roles
      expect(donateCode).not.toContain('role="checkbox"');
      expect(donateCode).not.toContain('type="checkbox"');
      expect(donateCode).not.toContain('toggleCountrySelection');
      expect(donateCode).not.toContain('selectedCountryIds');
      expect(donateCode).not.toContain('Clear Selection');

      // Must contain hierarchical view states
      expect(donateCode).toContain("'categories'");
      expect(donateCode).toContain("'crypto-list'");
      expect(donateCode).toContain("'crypto-detail'");
      expect(donateCode).toContain("'bank-roadmap'");
      expect(donateCode).toContain("'other-methods'");

      // Must contain exact addresses bindings and constants
      expect(donateCode).toContain('activeNetwork.address');
      expect(donateCode).toContain('BITCOIN_ADDRESS');
      expect(donateCode).toContain('EVM_ADDRESS');

      // Must include SVG brand logos
      expect(donateCode).toContain('BitcoinLogo');
      expect(donateCode).toContain('EthereumLogo');
      expect(donateCode).toContain('BnbLogo');
      expect(donateCode).toContain('BinancePayLogo');
      expect(donateCode).toContain('PaypalLogo');
      expect(donateCode).toContain('StripeLogo');
      expect(donateCode).toContain('CashAppLogo');
    });

    it('verifies app/contact/page.tsx includes Phone Support coming soon card without fake phone numbers', () => {
      const contactCode = fs.readFileSync(path.join(process.cwd(), 'app/contact/page.tsx'), 'utf-8');

      expect(contactCode).toContain('contact-phone-support-card');
      expect(contactCode).toContain('Phone Support');
      expect(contactCode).toContain('Coming soon');
      expect(contactCode).toContain('Phone support is planned for a future update. No phone contact number is currently available.');

      // Must NOT contain fake telephone links or dummy numbers
      expect(contactCode).not.toContain('tel:');
      expect(contactCode).not.toContain('+880');
      expect(contactCode).not.toContain('+1-800');

      // Must preserve official email
      expect(contactCode).toContain('nyayota.contact@gmail.com');
    });

    it('verifies docs/TRADEMARKS_AND_THIRD_PARTY_ASSETS.md exists and documents policy', () => {
      const docPath = path.join(process.cwd(), 'docs/TRADEMARKS_AND_THIRD_PARTY_ASSETS.md');
      expect(fs.existsSync(docPath)).toBe(true);

      const docContent = fs.readFileSync(docPath, 'utf-8');
      expect(docContent).toContain('Project Independence & Non-Affiliation');
      expect(docContent).toContain('Ownership of Trademarks & Brand Assets');
      expect(docContent).toContain('Separation from the MIT Software License');
      expect(docContent).toContain('Bitcoin');
      expect(docContent).toContain('Ethereum');
      expect(docContent).toContain('BNB');
      expect(docContent).toContain('Binance');
      expect(docContent).toContain('PayPal');
      expect(docContent).toContain('Stripe');
      expect(docContent).toContain('Cash App');
    });
  });
});
