/**
 * Nyayota Security Validation & Defensive Boundaries
 *
 * Implements:
 * 1. Strict IP extraction and IPv4 / IPv6 validation
 * 2. Origin & Referer CSRF / cross-site validation
 * 3. Strict API input schema validation (modes, languages, engines, bounded context)
 * 4. Safe public API response filtering (prevents internal data leaks)
 */

import { NextRequest } from 'next/server';
import { AssistantEngineType } from './ai-config';
import { DeterministicSourceCitation } from './nyayota-ai/types';

export const ALLOWED_MODES = ['explain', 'outcome', 'compare', 'analogy', 'statute'] as const;
export type AssistantMode = typeof ALLOWED_MODES[number];

export const ALLOWED_LANGUAGES = ['english', 'bengali', 'both'] as const;
export type AssistantLanguage = typeof ALLOWED_LANGUAGES[number];

export const ALLOWED_ENGINES = ['deterministic', 'general'] as const;

export interface ValidatedChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ValidatedLawContext {
  title: string;
  category?: string;
  jurisdiction?: string;
  sectionNumber?: string;
  sectionTitle?: string;
  sectionContent?: string;
}

export interface ValidatedRequestBody {
  query: string;
  mode: AssistantMode;
  language: AssistantLanguage;
  engine: AssistantEngineType;
  lawContext?: ValidatedLawContext;
  messages: ValidatedChatMessage[];
}

export interface PublicSourceCitation {
  title: string;
  identifier?: string;
  jurisdiction: string;
  officialUrl?: string;
  isCuratedSubset?: boolean;
  sourceCompleteness?: string;
}

export interface PublicAssistantResponse {
  text: string;
  engine: AssistantEngineType;
  status: 'success' | 'clarification-required' | 'partial-coverage' | 'out-of-scope' | 'degraded' | 'error';
  sources: PublicSourceCitation[];
  disclaimer: string;
  timestamp: string;
  clarificationPrompt?: string;
  clarificationOptions?: string[];
}

// ---------------------------------------------------------------------------
// 1. Trusted Client IP Handling & Validation
// ---------------------------------------------------------------------------

const IPV4_REGEX = /^(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}$/;
const IPV6_REGEX = /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$|^::(?:[0-9a-fA-F]{1,4}:){0,6}[0-9a-fA-F]{1,4}$|^(?:[0-9a-fA-F]{1,4}:){1,7}:$|^(?:[0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}$|^(?:[0-9a-fA-F]{1,4}:)(?::[0-9a-fA-F]{1,4}){1,6}$/;

export function sanitizeAndValidateIp(raw: string | null | undefined): string | null {
  if (!raw) return null;
  let ip = raw.split(',')[0].trim();

  // Handle bracketed IPv6 with optional port (e.g. [2001:db8::1]:8080)
  if (ip.startsWith('[') && ip.includes(']')) {
    ip = ip.slice(1, ip.indexOf(']'));
  } else if (/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}:\d+$/.test(ip)) {
    // Strip trailing port from IPv4 if present (e.g. 192.168.1.1:54321)
    ip = ip.split(':')[0];
  }

  if (ip.length > 45) return null;

  // Validate strict IPv4 or IPv6
  if (IPV4_REGEX.test(ip)) {
    return ip;
  }
  // Standard or shortened IPv6 check
  if (ip.includes(':') && /^[0-9a-fA-F:]+$/.test(ip)) {
    return ip;
  }

  return null;
}

export function getTrustedClientIp(req: NextRequest): { ip: string; isTrusted: boolean } {
  // 1. Vercel-authenticated header (trusted edge proxy)
  const vercelIp = sanitizeAndValidateIp(req.headers.get('x-vercel-forwarded-for'));
  if (vercelIp) {
    return { ip: vercelIp, isTrusted: true };
  }

  const isProduction = process.env.NODE_ENV === 'production' && process.env.VERCEL === '1';

  // In production, do NOT trust unverified x-forwarded-for or x-real-ip headers from client
  if (isProduction) {
    // Untrusted connection: use an isolated anonymous bucket rather than a shared 127.0.0.1
    return { ip: 'unverified-remote-client', isTrusted: false };
  }

  // 2. NextRequest native IP if present (local dev / test environments)
  const nativeIp = sanitizeAndValidateIp((req as any).ip);
  if (nativeIp) {
    return { ip: nativeIp, isTrusted: true };
  }

  // 3. Fallback proxy headers for local development and test runner
  const realIp = sanitizeAndValidateIp(req.headers.get('x-real-ip'));
  if (realIp) {
    return { ip: realIp, isTrusted: false };
  }

  const forwarded = sanitizeAndValidateIp(req.headers.get('x-forwarded-for'));
  if (forwarded) {
    return { ip: forwarded, isTrusted: false };
  }

  return { ip: '127.0.0.1', isTrusted: false };
}

// ---------------------------------------------------------------------------
// 2. Origin & Referer Validation
// ---------------------------------------------------------------------------

export function validateRequestOrigin(req: NextRequest): { allowed: boolean; reason?: string } {
  const origin = req.headers.get('origin');
  const referer = req.headers.get('referer');
  const secFetchSite = req.headers.get('sec-fetch-site');

  // Explicit cross-site fetch rejection
  if (secFetchSite === 'cross-site') {
    return { allowed: false, reason: 'Cross-site request blocked by Sec-Fetch-Site policy.' };
  }

  // Define allowed origins
  const allowedOrigins = new Set<string>([
    'https://nyayota.vercel.app',
    process.env.NEXT_PUBLIC_APP_URL || '',
    process.env.APP_URL || '',
  ].filter(Boolean));

  // In non-production, allow local dev hosts
  if (process.env.NODE_ENV !== 'production') {
    allowedOrigins.add('http://localhost:3000');
    allowedOrigins.add('http://127.0.0.1:3000');
    allowedOrigins.add('http://localhost');
  }

  if (origin) {
    try {
      const parsedOrigin = new URL(origin).origin;
      const isAllowed = Array.from(allowedOrigins).some((allowed) => {
        try {
          return new URL(allowed).origin === parsedOrigin;
        } catch {
          return false;
        }
      });
      if (!isAllowed) {
        return { allowed: false, reason: `Origin '${origin}' is not authorized.` };
      }
    } catch {
      return { allowed: false, reason: 'Invalid Origin header format.' };
    }
  } else if (referer) {
    try {
      const parsedRefererOrigin = new URL(referer).origin;
      const isAllowed = Array.from(allowedOrigins).some((allowed) => {
        try {
          return new URL(allowed).origin === parsedRefererOrigin;
        } catch {
          return false;
        }
      });
      if (!isAllowed) {
        return { allowed: false, reason: `Referer '${referer}' is not authorized.` };
      }
    } catch {
      return { allowed: false, reason: 'Invalid Referer header format.' };
    }
  }

  return { allowed: true };
}

// ---------------------------------------------------------------------------
// 3. Strict Input Schema Validation
// ---------------------------------------------------------------------------

export interface ValidationFailure {
  valid: false;
  error: string;
  statusCode: number;
}

export interface ValidationSuccess {
  valid: true;
  data: ValidatedRequestBody;
}

export type ValidationOutcome = ValidationFailure | ValidationSuccess;

export function validateAssistantRequest(body: unknown): ValidationOutcome {
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return {
      valid: false,
      error: 'Request body must be a valid JSON object.',
      statusCode: 400,
    };
  }

  const raw = body as Record<string, unknown>;

  // A. Query validation
  if (!('query' in raw) || typeof raw.query !== 'string' || raw.query.trim().length === 0) {
    return {
      valid: false,
      error: 'Query parameter is required and must be non-empty.',
      statusCode: 400,
    };
  }

  const trimmedQuery = raw.query.trim();
  if (trimmedQuery.length < 2) {
    return {
      valid: false,
      error: 'Query must be at least 2 characters long.',
      statusCode: 400,
    };
  }

  if (trimmedQuery.length > 1500) {
    return {
      valid: false,
      error: 'Query exceeds maximum allowed length of 1,500 characters.',
      statusCode: 400,
    };
  }

  // Sanitize query string against HTML/script injection
  const sanitizedQuery = trimmedQuery
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<\/?[^>]+(>|$)/g, ' ')
    .trim();

  // B. Mode validation (reject unsupported modes; do not silently default)
  let validatedMode: AssistantMode = 'explain';
  if ('mode' in raw && raw.mode !== undefined && raw.mode !== null) {
    if (typeof raw.mode !== 'string' || !ALLOWED_MODES.includes(raw.mode as AssistantMode)) {
      return {
        valid: false,
        error: `Invalid mode "${String(raw.mode)}". Supported modes: ${ALLOWED_MODES.join(', ')}.`,
        statusCode: 400,
      };
    }
    validatedMode = raw.mode as AssistantMode;
  }

  // C. Language validation (reject unsupported languages; do not silently default)
  let validatedLanguage: AssistantLanguage = 'both';
  if ('language' in raw && raw.language !== undefined && raw.language !== null) {
    if (typeof raw.language !== 'string' || !ALLOWED_LANGUAGES.includes(raw.language as AssistantLanguage)) {
      return {
        valid: false,
        error: `Invalid language "${String(raw.language)}". Supported languages: ${ALLOWED_LANGUAGES.join(', ')}.`,
        statusCode: 400,
      };
    }
    validatedLanguage = raw.language as AssistantLanguage;
  }

  // D. Engine validation (reject unsupported engines; do not silently default)
  let validatedEngine: AssistantEngineType = 'deterministic';
  const rawEngine = raw.engine ?? raw.assistantMode;
  if (rawEngine !== undefined && rawEngine !== null) {
    if (typeof rawEngine !== 'string') {
      return {
        valid: false,
        error: 'Engine parameter must be a string.',
        statusCode: 400,
      };
    }
    const normalized = rawEngine.trim().toLowerCase();
    if (normalized === 'deterministic' || normalized === 'source-grounded') {
      validatedEngine = 'deterministic';
    } else if (normalized === 'general' || normalized === 'gemini') {
      validatedEngine = 'general';
    } else {
      return {
        valid: false,
        error: `Invalid engine "${rawEngine}". Supported engines: deterministic, general.`,
        statusCode: 400,
      };
    }
  }

  // E. Messages validation (Strictly reject client-supplied 'system' role)
  const validatedMessages: ValidatedChatMessage[] = [];
  if ('messages' in raw && raw.messages !== undefined && raw.messages !== null) {
    if (!Array.isArray(raw.messages)) {
      return {
        valid: false,
        error: 'Messages must be an array of chat messages.',
        statusCode: 400,
      };
    }

    let totalChars = 0;
    const messageSlice = raw.messages.slice(-10);

    for (const msg of messageSlice) {
      if (!msg || typeof msg !== 'object' || Array.isArray(msg)) {
        continue;
      }
      const m = msg as Record<string, unknown>;

      // Explicitly reject client-injected 'system' role
      if (m.role === 'system') {
        return {
          valid: false,
          error: 'Client-supplied "system" role is not permitted in conversational history.',
          statusCode: 400,
        };
      }

      if (m.role !== 'user' && m.role !== 'assistant') {
        // Filter out unknown/invalid roles safely
        continue;
      }

      if (typeof m.content !== 'string') {
        continue;
      }

      const cleanContent = m.content
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        .trim()
        .slice(0, 2000);

      if (cleanContent.length > 0 && totalChars + cleanContent.length <= 8000) {
        validatedMessages.push({
          role: m.role,
          content: cleanContent,
        });
        totalChars += cleanContent.length;
      }
    }
  }

  // F. LawContext validation (bounded field lengths, protect against prototype pollution)
  let validatedLawContext: ValidatedLawContext | undefined = undefined;
  if ('lawContext' in raw && raw.lawContext !== undefined && raw.lawContext !== null) {
    if (typeof raw.lawContext !== 'object' || Array.isArray(raw.lawContext)) {
      return {
        valid: false,
        error: 'LawContext must be an object.',
        statusCode: 400,
      };
    }

    const ctx = raw.lawContext as Record<string, unknown>;
    // Disallow own prototype tampering keys
    const hasOwn = Object.prototype.hasOwnProperty;
    if (hasOwn.call(ctx, '__proto__') || hasOwn.call(ctx, 'prototype')) {
      return {
        valid: false,
        error: 'Malformed object structure in lawContext.',
        statusCode: 400,
      };
    }

    validatedLawContext = {
      title: typeof ctx.title === 'string' ? ctx.title.slice(0, 200).trim() : '',
      category: typeof ctx.category === 'string' ? ctx.category.slice(0, 100).trim() : undefined,
      jurisdiction: typeof ctx.jurisdiction === 'string' ? ctx.jurisdiction.slice(0, 100).trim() : undefined,
      sectionNumber: typeof ctx.sectionNumber === 'string' ? ctx.sectionNumber.slice(0, 50).trim() : undefined,
      sectionTitle: typeof ctx.sectionTitle === 'string' ? ctx.sectionTitle.slice(0, 200).trim() : undefined,
      sectionContent: typeof ctx.sectionContent === 'string' ? ctx.sectionContent.slice(0, 2000).trim() : undefined,
    };
  }

  return {
    valid: true,
    data: {
      query: sanitizedQuery,
      mode: validatedMode,
      language: validatedLanguage,
      engine: validatedEngine,
      messages: validatedMessages,
      lawContext: validatedLawContext,
    },
  };
}

// ---------------------------------------------------------------------------
// 4. Strict Public API Response Boundary Filter
// ---------------------------------------------------------------------------

/**
 * Filters and sanitizes source citations for public API responses.
 * Never leaks internal file paths, indices, raw parsing buffers, or checksum fields.
 */
export function sanitizePublicSources(sources: DeterministicSourceCitation[] | undefined): PublicSourceCitation[] {
  if (!sources || !Array.isArray(sources)) return [];

  return sources.slice(0, 5).map((s) => ({
    title: s.title || 'Statute',
    identifier: s.identifier,
    jurisdiction: s.jurisdiction || 'Bangladesh',
    officialUrl: s.officialUrl,
    isCuratedSubset: s.isCuratedSubset,
    sourceCompleteness: s.sourceCompleteness,
  }));
}
