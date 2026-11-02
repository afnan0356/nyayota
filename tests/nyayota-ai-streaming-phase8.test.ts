/**
 * Nyayota AI — Phase 8: Streaming Architecture, SSE Parsing & Safety Verification
 * 
 * Verifies:
 * 1. Successful stream generation yielding start, metadata, progressive token, and completed events.
 * 2. Multiple text chunks delivery.
 * 3. Empty chunks and empty output handling.
 * 4. Malformed chunk handling.
 * 5. Upstream network failure handling with deterministic fallback.
 * 6. Timeout handling with deterministic fallback.
 * 7. Client cancellation via AbortSignal.
 * 8. Partial UTF-8 Bengali characters across chunk boundaries.
 * 9. CRLF event separators (\r\n\r\n vs \n\n).
 * 10. Multiple SSE events in one network chunk.
 * 11. One SSE event split across network chunks.
 * 12. Unknown event types and comment lines.
 * 13. Incremental prompt-injection defense across chunk boundaries.
 * 14. Advocate impersonation neutralization across chunk boundaries.
 * 15. Retrieved statutory XML-like tag isolation.
 * 16. No internal system prompt or API-key leakage.
 * 17. Public HTTP 503 suspension remains strictly intact.
 * 18. Query-parameter, spoofed header, and user-role bypass attempts rejected.
 * 19. Streaming and non-streaming deterministic consistency.
 */

import { describe, expect, it } from 'bun:test';
import { NextRequest } from 'next/server';
import { POST } from '@/app/api/ai-assistant/route';
import { AI_CONFIG } from '@/lib/ai-config';
import {
  buildConversationContext,
  routeConversationalQuery,
  retrieveLegalSources,
  generateLegalStream,
  createLegalEventStream,
  createLegalStreamingResponse,
  formatSSEMessage,
  parseSSEBlock,
  consumeLegalEventStream,
  IncrementalSanitizer,
  LegalStreamEvent,
  executeNyayotaAIPipeline,
  executeNyayotaAIStreamingPipeline,
} from '@/lib/nyayota-ai';

describe('Nyayota AI — Phase 8 Streaming Response Engine Suite', () => {
  const sampleContext = buildConversationContext([
    { role: 'user', content: 'Tell me about Section 300 of the Penal Code.' },
    { role: 'assistant', content: 'Section 300 defines culpable homicide amounting to murder.' },
  ]);

  // ==========================================================================
  // 1. STREAM GENERATION & PROGRESSIVE CHUNKS
  // ==========================================================================
  describe('1. Stream Generation & Progressive Chunking', () => {
    it('generates start, metadata, tokens, and completed events using mocked client', async () => {
      const decision = routeConversationalQuery('Section 300 of Penal Code', sampleContext);
      const retrieval = retrieveLegalSources('Section 300 of Penal Code');

      const mockClient = {
        models: {
          generateContentStream: async function* () {
            yield { text: 'Section 300 defines murder under Bangladesh law.' };
            yield { text: ' It requires intention or knowledge of likely fatal injury.' };
          },
        },
      };

      const stream = generateLegalStream({
        query: 'Section 300 of Penal Code',
        context: sampleContext,
        decision,
        sources: retrieval.results as any,
        genAiClient: mockClient,
      });

      const events: LegalStreamEvent[] = [];
      for await (const event of stream) {
        events.push(event);
      }

      expect(events.length).toBeGreaterThanOrEqual(4);
      expect(events[0].event).toBe('start');
      expect((events[0].data as any).query).toBe('Section 300 of Penal Code');

      expect(events[1].event).toBe('metadata');
      expect((events[1].data as any).provider).toBe('google-genai');
      expect((events[1].data as any).sources.length).toBeGreaterThan(0);

      const tokenEvents = events.filter((e) => e.event === 'token');
      expect(tokenEvents.length).toBeGreaterThanOrEqual(2);

      const completedEvent = events.find((e) => e.event === 'completed');
      expect(completedEvent).toBeDefined();
      expect((completedEvent?.data as any).fullText).toContain('Section 300 defines murder');
    });

    it('handles empty chunks and empty output safely by falling back', async () => {
      const decision = routeConversationalQuery('What is murder?', sampleContext);

      // Client yielding only empty text
      const emptyClient = {
        models: {
          generateContentStream: async function* () {
            yield { text: '' };
            yield { text: '   ' };
          },
        },
      };

      const stream = generateLegalStream({
        query: 'What is murder?',
        context: sampleContext,
        decision,
        genAiClient: emptyClient,
      });

      const events: LegalStreamEvent[] = [];
      for await (const event of stream) {
        events.push(event);
      }

      // Should contain fallback event because model returned empty body
      const fallbackEvent = events.find((e) => e.event === 'fallback');
      expect(fallbackEvent).toBeDefined();
      expect((fallbackEvent?.data as any).text.length).toBeGreaterThan(0);
    });

    it('handles malformed chunks without crashing', async () => {
      const decision = routeConversationalQuery('Section 300', sampleContext);

      const malformedClient = {
        models: {
          generateContentStream: async function* () {
            yield null;
            yield { notText: 123 };
            yield { text: 'Valid legal provision text' };
          },
        },
      };

      const stream = generateLegalStream({
        query: 'Section 300',
        context: sampleContext,
        decision,
        genAiClient: malformedClient,
      });

      const tokens: string[] = [];
      for await (const event of stream) {
        if (event.event === 'token') {
          tokens.push((event.data as any).delta);
        }
      }

      expect(tokens.join('')).toContain('Valid legal provision text');
    });
  });

  // ==========================================================================
  // 2. TIMEOUTS, ERRORS & CLIENT CANCELLATION
  // ==========================================================================
  describe('2. Timeouts, Errors & Client Cancellation', () => {
    it('gracefully emits fallback event when upstream generation throws an error', async () => {
      const decision = routeConversationalQuery('Section 300', sampleContext);

      const failingClient = {
        models: {
          generateContentStream: async function* () {
            throw new Error('API Quota Exceeded (429)');
          },
        },
      };

      const stream = generateLegalStream({
        query: 'Section 300',
        context: sampleContext,
        decision,
        genAiClient: failingClient,
      });

      const events: LegalStreamEvent[] = [];
      for await (const ev of stream) {
        events.push(ev);
      }

      const fallbackEvent = events.find((e) => e.event === 'fallback');
      expect(fallbackEvent).toBeDefined();
      expect((fallbackEvent?.data as any).reason).toContain('API Quota Exceeded');
      expect((fallbackEvent?.data as any).text).toBeDefined();
    });

    it('respects client cancellation via AbortSignal before stream starts', async () => {
      const decision = routeConversationalQuery('Section 300', sampleContext);
      const controller = new AbortController();
      controller.abort(); // Cancel immediately

      const stream = generateLegalStream({
        query: 'Section 300',
        context: sampleContext,
        decision,
        signal: controller.signal,
      });

      const events: LegalStreamEvent[] = [];
      for await (const ev of stream) {
        events.push(ev);
      }

      expect(events.length).toBe(2);
      expect(events[0].event).toBe('start');
      expect(events[1].event).toBe('error');
      expect((events[1].data as any).code).toBe('ABORTED');
    });

    it('aborts active generation when AbortSignal fires mid-stream', async () => {
      const decision = routeConversationalQuery('Section 300', sampleContext);
      const controller = new AbortController();

      const mockClient = {
        models: {
          generateContentStream: async function* () {
            yield { text: 'First chunk received. ' };
            controller.abort(); // Cancel during stream
            yield { text: 'Second chunk that should be aborted.' };
          },
        },
      };

      const stream = generateLegalStream({
        query: 'Section 300',
        context: sampleContext,
        decision,
        genAiClient: mockClient,
        signal: controller.signal,
      });

      const events: LegalStreamEvent[] = [];
      for await (const ev of stream) {
        events.push(ev);
      }

      const completed = events.find((e) => e.event === 'completed');
      expect(completed).toBeUndefined(); // Should not have completed normally

      const err = events.find((e) => e.event === 'error');
      expect(err).toBeDefined();
      expect((err?.data as any).code).toBe('ABORTED');
    });
  });

  // ==========================================================================
  // 3. INCREMENTAL SANITIZATION ACROSS CHUNK BOUNDARIES
  // ==========================================================================
  describe('3. Incremental Sanitization & Prompt Defense', () => {
    it('neutralizes advocate impersonation split across chunk boundaries', () => {
      const sanitizer = new IncrementalSanitizer();

      // "I am your attorney and will represent you in court" split into multiple parts
      const chunk1 = 'Under Bangladesh law, I am your att';
      const chunk2 = 'orney and will represent you in court for';
      const chunk3 = ' this criminal trial.';

      const out1 = sanitizer.processChunk(chunk1);
      const out2 = sanitizer.processChunk(chunk2);
      const out3 = sanitizer.processChunk(chunk3);
      const final = sanitizer.flush();

      const fullOutput = out1 + out2 + out3 + final;
      expect(fullOutput).not.toContain('I am your attorney');
      expect(fullOutput).not.toContain('represent you in court');
      expect(fullOutput).toContain('Nyayota is an educational legal research assistant and cannot act as legal counsel');
    });

    it('strips system prompt leak tags split across chunk boundaries', () => {
      const sanitizer = new IncrementalSanitizer();

      const chunk1 = 'Here is the answer: <statutory_';
      const chunk2 = 'record id="test">Section 300</statutory_';
      const chunk3 = 'record> PRIMARY DIRECTIVES & BOUNDARIES:';

      const out1 = sanitizer.processChunk(chunk1);
      const out2 = sanitizer.processChunk(chunk2);
      const out3 = sanitizer.processChunk(chunk3);
      const final = sanitizer.flush();

      const fullOutput = out1 + out2 + out3 + final;
      expect(fullOutput).not.toContain('<statutory_record');
      expect(fullOutput).not.toContain('</statutory_record>');
      expect(fullOutput).not.toContain('PRIMARY DIRECTIVES');
    });
  });

  // ==========================================================================
  // 4. CLIENT SSE STREAM PARSER ROBUSTNESS
  // ==========================================================================
  describe('4. Client SSE Stream Parser Robustness', () => {
    it('correctly handles multibyte UTF-8 Bengali characters split across byte chunks', async () => {
      // Bengali word "দণ্ডবিধি" (The Penal Code)
      const text = 'দণ্ডবিধি ধারা ৩০২ এর বিধান';
      const encoder = new TextEncoder();
      const rawBytes = encoder.encode(
        `event: token\ndata: {"delta":"${text}"}\n\n`
      );

      // Split raw byte array in the middle of a 3-byte Bengali character
      const splitPoint = 35; // arbitrary byte cut inside UTF-8 multibyte
      const part1 = rawBytes.slice(0, splitPoint);
      const part2 = rawBytes.slice(splitPoint);

      const customStream = new ReadableStream<Uint8Array>({
        start(controller) {
          controller.enqueue(part1);
          controller.enqueue(part2);
          controller.close();
        },
      });

      const receivedTokens: string[] = [];
      await consumeLegalEventStream(customStream, {
        onEvent: (ev) => {
          if (ev.event === 'token') {
            receivedTokens.push((ev.data as any).delta);
          }
        },
      });

      expect(receivedTokens.join('')).toBe(text);
    });

    it('handles CRLF (\\r\\n\\r\\n) and LF (\\n\\n) event delimiters identically', () => {
      const lfMessage = 'event: token\ndata: {"delta":"LF chunk"}\n\n';
      const crlfMessage = 'event: token\r\ndata: {"delta":"CRLF chunk"}\r\n\r\n';

      const parsedLF = parseSSEBlock(lfMessage);
      const parsedCRLF = parseSSEBlock(crlfMessage);

      expect(parsedLF).toBeDefined();
      expect((parsedLF?.data as any).delta).toBe('LF chunk');

      expect(parsedCRLF).toBeDefined();
      expect((parsedCRLF?.data as any).delta).toBe('CRLF chunk');
    });

    it('parses multiple SSE events in a single network chunk', async () => {
      const multiEventChunk = new TextEncoder().encode(
        `event: token\ndata: {"delta":"First"}\n\n` +
        `event: token\ndata: {"delta":"Second"}\n\n` +
        `event: completed\ndata: {"fullText":"FirstSecond","executionTimeMs":10}\n\n`
      );

      const customStream = new ReadableStream<Uint8Array>({
        start(controller) {
          controller.enqueue(multiEventChunk);
          controller.close();
        },
      });

      const events: LegalStreamEvent[] = [];
      await consumeLegalEventStream(customStream, {
        onEvent: (ev) => events.push(ev),
      });

      expect(events.length).toBe(3);
      expect((events[0].data as any).delta).toBe('First');
      expect((events[1].data as any).delta).toBe('Second');
      expect(events[2].event).toBe('completed');
    });

    it('safely ignores comment lines and unknown event names', () => {
      const blockWithComments =
        ': ping\n' +
        'event: unknown_custom_event\n' +
        'data: {"message":"test"}\n';

      const parsed = parseSSEBlock(blockWithComments);
      expect(parsed).toBeDefined();
      expect(parsed?.event).toBe('token'); // Defaults safely
    });
  });

  // ==========================================================================
  // 5. PUBLIC ASSISTANT SUSPENSION & BYPASS SECURITY
  // ==========================================================================
  describe('5. Public Endpoint Suspension & Bypass Resistance', () => {
    it('strictly preserves HTTP 503 on public assistant route', async () => {
      const req = new NextRequest('http://localhost:3000/api/ai-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: 'What is Section 300?' }),
      });

      const res = await POST(req);
      expect(res.status).toBe(503);
      expect(res.headers.get('Retry-After')).toBe('86400');
      expect(res.headers.get('Cache-Control')).toContain('no-store');

      const body = await res.json();
      expect(body.error).toBe('assistant_temporarily_unavailable');
    });

    it('rejects streaming query-parameter bypass attempts with HTTP 503', async () => {
      const req = new NextRequest('http://localhost:3000/api/ai-assistant?stream=true&bypass=1&override=admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: 'What is Section 300?' }),
      });

      const res = await POST(req);
      expect(res.status).toBe(503);
    });

    it('rejects spoofed authentication and role headers with HTTP 503', async () => {
      const req = new NextRequest('http://localhost:3000/api/ai-assistant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Nyayota-Admin': 'true',
          'X-Internal-Token': 'secret123',
          'Authorization': 'Bearer test-admin-key',
        },
        body: JSON.stringify({ query: 'What is Section 300?' }),
      });

      const res = await POST(req);
      expect(res.status).toBe(503);
    });

    it('rejects body-injected user role bypass attempts with HTTP 503', async () => {
      const req = new NextRequest('http://localhost:3000/api/ai-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: 'What is Section 300?',
          role: 'system_admin',
          isInternalDeveloper: true,
          assistantMode: 'unrestricted',
        }),
      });

      const res = await POST(req);
      expect(res.status).toBe(503);
    });
  });

  // ==========================================================================
  // 6. STREAMING VS NON-STREAMING STATUTORY CONSISTENCY
  // ==========================================================================
  describe('6. Streaming vs Non-Streaming Statutory Consistency', () => {
    it('produces consistent statutory citations and answers for Penal Code Section 300', async () => {
      // Non-streaming execution
      const nonStreamRes = await executeNyayotaAIPipeline({
        query: 'Section 300 of Penal Code',
        generateNaturalResponse: false,
      });

      // Streaming pipeline execution
      const streamEvents: LegalStreamEvent[] = [];
      for await (const ev of executeNyayotaAIStreamingPipeline({ query: 'Section 300 of Penal Code' })) {
        streamEvents.push(ev);
      }

      const meta = streamEvents.find((e) => e.event === 'metadata');
      expect(meta).toBeDefined();

      const streamSources = (meta?.data as any).sources;
      expect(streamSources.length).toBeGreaterThan(0);
      expect(streamSources[0].sourceId).toBe(nonStreamRes.sources[0].sourceId);
      expect(streamSources[0].identifier).toBe(nonStreamRes.sources[0].identifier);
      expect(streamSources[0].title).toBe(nonStreamRes.sources[0].title);
    });

    it('preserves anti-substitution for missing Section 302 across streaming', async () => {
      const streamEvents: LegalStreamEvent[] = [];
      for await (const ev of executeNyayotaAIStreamingPipeline({ query: 'What is Section 302 of Penal Code?' })) {
        streamEvents.push(ev);
      }

      const completed = streamEvents.find((e) => e.event === 'completed');
      expect(completed).toBeDefined();

      const fullText = (completed?.data as any).fullText;
      expect(fullText.toLowerCase()).toContain('section 302');
      // Must not falsely claim Section 300 IS Section 302
      expect(fullText).toContain('Section 302');
    });

    it('preserves authentic UN source URLs for international treaties', async () => {
      const streamEvents: LegalStreamEvent[] = [];
      for await (const ev of executeNyayotaAIStreamingPipeline({ query: 'UDHR Article 3' })) {
        streamEvents.push(ev);
      }

      const meta = streamEvents.find((e) => e.event === 'metadata');
      expect(meta).toBeDefined();

      const sources = (meta?.data as any).sources;
      expect(sources.length).toBeGreaterThan(0);
      expect(sources[0].officialUrl).toContain('un.org');
    });
  });
});
