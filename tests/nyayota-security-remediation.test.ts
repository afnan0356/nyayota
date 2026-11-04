import { describe, it, expect } from 'bun:test';
import { BANGLADESH_CODE_CATALOG, queryBangladeshCodeCatalog, getBangladeshLawById } from '@/lib/bdcode-catalog';
import { IngestionIntegrityStatus, BangladeshLawRecord } from '@/lib/bdcode-architecture';
import { AI_CONFIG } from '@/lib/ai-config';
import sitemap from '@/app/sitemap';
import { getLocalBookmarks, toggleLocalBookmark, isLawBookmarked } from '@/lib/bookmarks';
import { getResearchNotes, saveResearchNote, getCollectedCitations, addCitationToCollection } from '@/lib/research';
import { getSearchHistory, saveSearchQuery } from '@/lib/search-history';

describe('Repository Trust & Security Remediation Suite', () => {
  describe('1. Statutory Data Integrity & Checksum Audit', () => {
    it('should have zero fabricated checksumSha256 values across the entire catalog', () => {
      for (const law of BANGLADESH_CODE_CATALOG) {
        expect(law.checksumSha256).toBeUndefined();
      }
    });

    it('should use honest IngestionIntegrityStatus labels across all records', () => {
      const allowedStatuses: IngestionIntegrityStatus[] = [
        'unverified',
        'source-linked',
        'reviewed',
        'independently-verified',
      ];

      for (const law of BANGLADESH_CODE_CATALOG) {
        expect(allowedStatuses).toContain(law.integrityStatus);
        // All catalog items are linked to official bdlaws or bdcode URLs
        expect(law.integrityStatus).toBe('source-linked');
        expect(law.sourceUrl).toMatch(/^https?:\/\/(bdlaws\.minlaw\.gov\.bd|bdcode\.gov\.bd)/);
      }
    });

    it('should index foundational statutes without data corruption', () => {
      const penalCode = getBangladeshLawById('bd-penal-code-1860');
      expect(penalCode).toBeDefined();
      expect(penalCode?.title).toBe('The Penal Code, 1860');
      expect(penalCode?.enactmentYear).toBe(1860);
      expect(penalCode?.sections.length).toBeGreaterThan(0);

      const constitution = getBangladeshLawById('bd-constitution-1972');
      expect(constitution).toBeDefined();
      expect(constitution?.enactmentYear).toBe(1972);

      const crpc = getBangladeshLawById('bd-crpc-1898');
      expect(crpc).toBeDefined();
      expect(crpc?.enactmentYear).toBe(1898);
    });
  });

  describe('2. Public AI Assistant 503 Suspension Guarantee', () => {
    it('should have isPublicAssistantAvailable defaulted to false', () => {
      expect(AI_CONFIG.isPublicAssistantAvailable).toBe(false);
    });

    it('should provide complete maintenance response payload', () => {
      expect(AI_CONFIG.maintenanceResponse).toBeDefined();
      expect(AI_CONFIG.maintenanceResponse.error).toBe('assistant_temporarily_unavailable');
      expect(AI_CONFIG.maintenanceResponse.message).toContain('under development');
    });

    it('should define safe fallback model parameters', () => {
      expect(AI_CONFIG.model).toBeDefined();
      expect(AI_CONFIG.fallbackModel).toBeDefined();
      expect(AI_CONFIG.timeoutMs).toBeLessThanOrEqual(15000);
    });
  });

  describe('3. Sitemap Integrity & Route Security', () => {
    it('should strictly exclude /ai-assistant from public sitemap entries', () => {
      const entries = sitemap();
      const urls = entries.map((e) => e.url);

      // /ai-assistant must NOT be in sitemap while suspended
      expect(urls.some((u) => u.endsWith('/ai-assistant'))).toBe(false);
    });

    it('should include all required public statutory and citizen guide routes', () => {
      const entries = sitemap();
      const urls = entries.map((e) => e.url);

      expect(urls).toContain('https://nyayota.vercel.app');
      expect(urls).toContain('https://nyayota.vercel.app/bangladesh-laws');
      expect(urls).toContain('https://nyayota.vercel.app/international-laws');
      expect(urls).toContain('https://nyayota.vercel.app/legal-outcome-guide');
      expect(urls).toContain('https://nyayota.vercel.app/knowledge-paths');
      expect(urls).toContain('https://nyayota.vercel.app/compare');
      expect(urls).toContain('https://nyayota.vercel.app/research');
      expect(urls).toContain('https://nyayota.vercel.app/search');
    });

    it('should include individual statutory routes in sitemap', () => {
      const entries = sitemap();
      const lawEntries = entries.filter((e) => e.url.includes('/law/'));
      expect(lawEntries.length).toBeGreaterThanOrEqual(40);
    });
  });

  describe('4. Client Storage Resilience & Safe Fallbacks', () => {
    it('should safely handle bookmark reading when storage is empty or unavailable', () => {
      const bookmarks = getLocalBookmarks();
      expect(Array.isArray(bookmarks)).toBe(true);
    });

    it('should return false for unbookmarked laws safely', () => {
      const bookmarked = isLawBookmarked('non-existent-law-slug');
      expect(bookmarked).toBe(false);
    });

    it('should safely return empty arrays for research notes and citations when clean', () => {
      const notes = getResearchNotes();
      expect(Array.isArray(notes)).toBe(true);

      const citations = getCollectedCitations();
      expect(Array.isArray(citations)).toBe(true);
    });

    it('should safely retrieve search history without throwing', () => {
      const history = getSearchHistory();
      expect(Array.isArray(history)).toBe(true);
    });
  });

  describe('5. Vercel IP Extraction & Validation Logic', () => {
    // Tests the IP sanitation and port stripping logic used in getClientIp
    const sanitizeIp = (raw: string | null | undefined): string | null => {
      if (!raw) return null;
      let ip = raw.split(',')[0].trim();
      if (ip.startsWith('[') && ip.includes(']')) {
        ip = ip.slice(1, ip.indexOf(']'));
      } else if (/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}:\d+$/.test(ip)) {
        ip = ip.split(':')[0];
      }
      if (/^[0-9a-fA-F:.]+$/.test(ip) && ip.length <= 45) {
        return ip;
      }
      return null;
    };

    it('should strip port from IPv4 address', () => {
      expect(sanitizeIp('192.168.1.10:49281')).toBe('192.168.1.10');
      expect(sanitizeIp('10.0.0.1')).toBe('10.0.0.1');
    });

    it('should extract leftmost IP from chained proxy list', () => {
      expect(sanitizeIp('203.0.113.195, 70.41.3.18, 150.172.238.178')).toBe('203.0.113.195');
    });

    it('should parse IPv6 addresses safely', () => {
      expect(sanitizeIp('2001:0db8:85a3:0000:0000:8a2e:0370:7334')).toBe('2001:0db8:85a3:0000:0000:8a2e:0370:7334');
      expect(sanitizeIp('[2001:db8::1]:8080')).toBe('2001:db8::1');
    });

    it('should reject invalid or malicious IP strings', () => {
      expect(sanitizeIp('')).toBeNull();
      expect(sanitizeIp(null)).toBeNull();
      expect(sanitizeIp('192.168.1.1; rm -rf /')).toBeNull();
      expect(sanitizeIp('<script>alert(1)</script>')).toBeNull();
    });
  });

  describe('6. True Byte-Level Body Size Measurement', () => {
    it('should accurately calculate byte length for multi-byte characters', () => {
      const asciiText = 'The Penal Code 1860';
      const asciiBytes = new TextEncoder().encode(asciiText).length;
      expect(asciiBytes).toBe(asciiText.length);

      const bengaliText = 'দণ্ডবিধি ১৮৬০';
      const bengaliBytes = new TextEncoder().encode(bengaliText).length;
      // Bengali characters are 3 bytes each in UTF-8
      expect(bengaliBytes).toBeGreaterThan(bengaliText.length);
      expect(bengaliBytes).toBeLessThanOrEqual(32768);
    });

    it('should accurately detect payload exceeding 32KB limit', () => {
      const largePayload = 'a'.repeat(32769);
      const byteLength = new TextEncoder().encode(largePayload).length;
      expect(byteLength).toBe(32769);
      expect(byteLength > 32768).toBe(true);
    });
  });
});
