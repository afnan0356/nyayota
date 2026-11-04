import { NextRequest, NextResponse } from 'next/server';
import { executeNyayotaAIPipeline } from '@/lib/nyayota-ai';
import { AI_CONFIG } from '@/lib/ai-config';
import { checkRateLimit } from '@/lib/rate-limiter';
import { readBoundedJson } from '@/lib/request-body-reader';
import {
  getTrustedClientIp,
  validateRequestOrigin,
  validateAssistantRequest,
  sanitizePublicSources,
  PublicAssistantResponse,
} from '@/lib/security-validation';

export const dynamic = 'force-dynamic';

const SECURITY_HEADERS = {
  'Cache-Control': 'no-store, no-cache, must-revalidate',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
};

export async function POST(req: NextRequest) {
  // -------------------------------------------------------------------------
  // 1. PUBLIC ASSISTANT TEMPORARY SUSPENSION CHECK
  // Server-controlled flag: AI_CONFIG.isPublicAssistantAvailable
  // When false: immediately return HTTP 503 without executing Gemini or
  // the legal retrieval pipeline, and without leaking internal traces.
  // No client-side parameter, query param, or header can override this.
  // -------------------------------------------------------------------------
  if (!AI_CONFIG.isPublicAssistantAvailable) {
    return NextResponse.json(
      AI_CONFIG.maintenanceResponse,
      {
        status: 503,
        headers: {
          ...SECURITY_HEADERS,
          'Retry-After': '86400',
        },
      }
    );
  }

  // -------------------------------------------------------------------------
  // 2. ORIGIN & CROSS-SITE REQUEST VALIDATION
  // Validates Origin and Referer headers against allowed domains.
  // Blocks unauthorized cross-origin POST requests.
  // -------------------------------------------------------------------------
  const originValidation = validateRequestOrigin(req);
  if (!originValidation.allowed) {
    return NextResponse.json(
      { error: originValidation.reason || 'Forbidden: Unauthorized request origin.' },
      { status: 403, headers: SECURITY_HEADERS }
    );
  }

  // -------------------------------------------------------------------------
  // 3. CONTENT-TYPE ENFORCEMENT
  // Rejects non-JSON payloads before stream consumption.
  // -------------------------------------------------------------------------
  const contentType = req.headers.get('content-type') || '';
  if (!contentType.toLowerCase().includes('application/json')) {
    return NextResponse.json(
      { error: 'Invalid Content-Type. Expected application/json.' },
      { status: 415, headers: SECURITY_HEADERS }
    );
  }

  try {
    // -----------------------------------------------------------------------
    // 4. STREAM-LEVEL BOUNDED REQUEST BODY CONSUMPTION (32 KB CAP)
    // Enforces the 32 KB limit while reading stream chunks.
    // Immediately aborts the reader if byte count exceeds 32,768 bytes.
    // -----------------------------------------------------------------------
    const readResult = await readBoundedJson(req, 32768);
    if (!readResult.success) {
      return NextResponse.json(
        { error: readResult.error },
        { status: readResult.statusCode, headers: SECURITY_HEADERS }
      );
    }

    // -----------------------------------------------------------------------
    // 5. STRICT INPUT SCHEMA VALIDATION
    // Validates query bounds, enums (mode, language, engine), chat roles,
    // and bounded lawContext. Rejects invalid parameters without silent fallback.
    // -----------------------------------------------------------------------
    const validationResult = validateAssistantRequest(readResult.data);
    if (!validationResult.valid) {
      return NextResponse.json(
        { error: validationResult.error },
        { status: validationResult.statusCode, headers: SECURITY_HEADERS }
      );
    }

    const { query, mode, language, engine, messages, lawContext } = validationResult.data;

    // -----------------------------------------------------------------------
    // 6. TRUSTED CLIENT IP & DISTRIBUTED RATE LIMITING
    // Extracts IP prioritizing Vercel's trusted platform header.
    // Checks Upstash Redis rate limiter (15 req/min general, 30 req/min deterministic).
    // -----------------------------------------------------------------------
    const clientIpInfo = getTrustedClientIp(req);
    const rateLimit = await checkRateLimit(clientIpInfo.ip, engine);

    const rateLimitHeaders = {
      ...SECURITY_HEADERS,
      'X-RateLimit-Limit': String(rateLimit.limit),
      'X-RateLimit-Remaining': String(rateLimit.remaining),
    };

    if (!rateLimit.allowed) {
      const retryAfterSec = Math.max(1, Math.ceil(rateLimit.resetMs / 1000));
      return NextResponse.json(
        {
          error: engine === 'general'
            ? 'General AI assistant rate limit exceeded (15 requests/min).'
            : 'Legal research rate limit exceeded (30 requests/min).',
          retryAfterSeconds: retryAfterSec,
        },
        {
          status: 429,
          headers: {
            ...rateLimitHeaders,
            'Retry-After': String(retryAfterSec),
            'X-RateLimit-Remaining': '0',
          },
        }
      );
    }

    // -----------------------------------------------------------------------
    // 7. PIPELINE EXECUTION & STRICT PUBLIC RESPONSE FILTERING
    // Executes deterministic or general pipeline with client AbortSignal.
    // Returns strictly: text, engine, status, safe sources, disclaimer, timestamp.
    // Strips internal retrieval objects, raw model payloads, tokens, and debug data.
    // -----------------------------------------------------------------------
    const serviceLanguage = language === 'bengali' ? 'bn' : language === 'english' ? 'en' : 'both';
    const serviceMode = mode === 'compare' ? 'compare' : mode === 'statute' ? 'cite' : 'explain';

    if (engine === 'deterministic') {
      try {
        const pipelineResult = await executeNyayotaAIPipeline({
          query,
          language: serviceLanguage,
          mode: serviceMode,
          lawContext,
          messages,
          signal: req.signal,
        });

        const responseStatus = pipelineResult.status === 'clarification-required'
          ? 'clarification-required'
          : pipelineResult.status === 'out-of-scope'
          ? 'out-of-scope'
          : 'success';

        const publicResponse: PublicAssistantResponse = {
          text: pipelineResult.text,
          engine: 'deterministic',
          status: responseStatus,
          sources: sanitizePublicSources(pipelineResult.sources),
          disclaimer: pipelineResult.disclaimer || 'Educational Information Only — Not Legal Advice.',
          timestamp: new Date().toISOString(),
          clarificationPrompt: pipelineResult.clarificationPrompt,
          clarificationOptions: pipelineResult.clarificationOptions,
        };

        return NextResponse.json(publicResponse, { headers: rateLimitHeaders });
      } catch (detError: unknown) {
        const msg = detError instanceof Error ? detError.message : 'Unknown error';
        console.error('Deterministic legal pipeline error:', msg);
        return NextResponse.json(
          { error: 'An error occurred during deterministic legal retrieval.' },
          { status: 500, headers: SECURITY_HEADERS }
        );
      }
    }

    // Engine: General AI (Gemini Grounded / Conversational)
    const apiKey = process.env.GEMINI_API_KEY;
    const isApiKeyConfigured = Boolean(apiKey && apiKey !== 'MY_GEMINI_API_KEY' && !apiKey.startsWith('test') && apiKey.length > 10);

    // If server Gemini key is not configured, gracefully return degraded legal analysis
    if (!isApiKeyConfigured) {
      console.warn('GEMINI_API_KEY is not configured on server; returning degraded deterministic response.');
      const fallbackResult = await executeNyayotaAIPipeline({
        query,
        language: serviceLanguage,
        mode: serviceMode,
        lawContext,
        messages,
        signal: req.signal,
      });

      const publicResponse: PublicAssistantResponse = {
        text: fallbackResult.text,
        engine: 'general',
        status: 'degraded',
        sources: sanitizePublicSources(fallbackResult.sources),
        disclaimer: fallbackResult.disclaimer || 'Educational Information Only — Not Legal Advice.',
        timestamp: new Date().toISOString(),
        clarificationPrompt: fallbackResult.clarificationPrompt,
        clarificationOptions: fallbackResult.clarificationOptions,
      };

      return NextResponse.json(publicResponse, { headers: rateLimitHeaders });
    }

    try {
      const pipelineResult = await executeNyayotaAIPipeline({
        query,
        language: serviceLanguage,
        mode: serviceMode,
        lawContext,
        messages,
        generateNaturalResponse: true,
        apiKey,
        signal: req.signal,
      });

      const responseStatus = pipelineResult.status === 'clarification-required'
        ? 'clarification-required'
        : pipelineResult.status === 'out-of-scope'
        ? 'out-of-scope'
        : 'success';

      const publicResponse: PublicAssistantResponse = {
        text: pipelineResult.text,
        engine: 'general',
        status: responseStatus,
        sources: sanitizePublicSources(pipelineResult.sources),
        disclaimer: pipelineResult.disclaimer || 'Educational Information Only — Not Legal Advice.',
        timestamp: new Date().toISOString(),
        clarificationPrompt: pipelineResult.clarificationPrompt,
        clarificationOptions: pipelineResult.clarificationOptions,
      };

      return NextResponse.json(publicResponse, { headers: rateLimitHeaders });
    } catch (pipelineError: unknown) {
      const msg = pipelineError instanceof Error ? pipelineError.message : 'Unknown error';
      console.error('General conversational legal pipeline error:', msg);

      // Resilient local degraded fallback if external pipeline fails or aborts
      const fallbackResult = await executeNyayotaAIPipeline({
        query,
        language: serviceLanguage,
        mode: serviceMode,
        lawContext,
        messages,
        signal: req.signal,
      });

      const publicResponse: PublicAssistantResponse = {
        text: fallbackResult.text,
        engine: 'general',
        status: 'degraded',
        sources: sanitizePublicSources(fallbackResult.sources),
        disclaimer: 'Educational Information Only — Not Legal Advice.',
        timestamp: new Date().toISOString(),
      };

      return NextResponse.json(publicResponse, { headers: rateLimitHeaders });
    }
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : 'Internal error';
    console.error('AI assistant route encountered an unhandled error:', errorMsg);
    return NextResponse.json(
      { error: 'An error occurred while analyzing the legal query.' },
      { status: 500, headers: SECURITY_HEADERS }
    );
  }
}
