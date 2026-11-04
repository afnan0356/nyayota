/**
 * Nyayota Distributed Rate Limiting Module
 *
 * Implements differentiated sliding-window rate limiting:
 * - General AI Mode (Gemini): 15 requests per 60 seconds
 * - Deterministic Mode (Nyayota): 30 requests per 60 seconds
 *
 * Distributed Architecture:
 * - Uses @upstash/redis and @upstash/ratelimit for distributed edge deployments (Vercel Serverless).
 * - Distinguishes between configured Upstash Redis and unconfigured environments.
 * - In-memory rate limiting is isolated as a process-local fallback for local development and tests only.
 * - In production, missing Upstash credentials are explicitly reported as unconfigured and never
 *   falsely claimed to be distributed.
 */

import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { AI_CONFIG, AssistantEngineType } from './ai-config';

export interface RateLimitCheckResult {
  allowed: boolean;
  remaining: number;
  limit: number;
  resetMs: number;
  provider: 'upstash-redis' | 'process-local-fallback';
  isDistributed: boolean;
  error?: string;
}

export interface RateLimiterStatus {
  configured: boolean;
  provider: 'upstash-redis' | 'process-local-fallback';
  isDistributed: boolean;
  details: string;
}

// ---------------------------------------------------------------------------
// 1. Process-Local In-Memory Limiter (Development & Testing Fallback Only)
// ---------------------------------------------------------------------------
interface LocalRateLimitRecord {
  timestamps: number[];
}
const localRateLimitMap = new Map<string, LocalRateLimitRecord>();

function checkProcessLocalRateLimit(
  clientIp: string,
  engine: AssistantEngineType
): RateLimitCheckResult {
  const config = engine === 'general' ? AI_CONFIG.rateLimits.general : AI_CONFIG.rateLimits.deterministic;
  const now = Date.now();
  const rateLimitKey = `${engine}:${clientIp}`;
  const record = localRateLimitMap.get(rateLimitKey) || { timestamps: [] };

  const activeTimestamps = record.timestamps.filter((ts) => now - ts < config.windowMs);

  if (activeTimestamps.length >= config.maxRequests) {
    localRateLimitMap.set(rateLimitKey, { timestamps: activeTimestamps });
    const oldest = activeTimestamps[0] || now;
    return {
      allowed: false,
      remaining: 0,
      limit: config.maxRequests,
      resetMs: Math.max(0, config.windowMs - (now - oldest)),
      provider: 'process-local-fallback',
      isDistributed: false,
    };
  }

  activeTimestamps.push(now);
  localRateLimitMap.set(rateLimitKey, { timestamps: activeTimestamps });

  // Periodically clean up stale entries to prevent memory leaks in persistent processes
  if (localRateLimitMap.size > 2000) {
    for (const [key, val] of localRateLimitMap.entries()) {
      if (val.timestamps.every((t) => now - t >= config.windowMs)) {
        localRateLimitMap.delete(key);
      }
    }
  }

  return {
    allowed: true,
    remaining: config.maxRequests - activeTimestamps.length,
    limit: config.maxRequests,
    resetMs: config.windowMs,
    provider: 'process-local-fallback',
    isDistributed: false,
  };
}

export function resetProcessLocalRateLimits(): void {
  localRateLimitMap.clear();
}

// ---------------------------------------------------------------------------
// 2. Upstash Distributed Rate Limiting (Serverless Production Architecture)
// ---------------------------------------------------------------------------
let upstashRedisClient: Redis | null = null;
let upstashGeneralLimiter: Ratelimit | null = null;
let upstashDeterministicLimiter: Ratelimit | null = null;
let initializationAttempted = false;

function isUpstashConfigured(): boolean {
  const url = process.env.UPSTASH_REDIS_REST_URL?.trim();
  const token = process.env.UPSTASH_REDIS_REST_TOKEN?.trim();
  return Boolean(url && url.length > 0 && token && token.length > 0);
}

function initializeUpstashLimiters(): boolean {
  if (initializationAttempted && (upstashGeneralLimiter || !isUpstashConfigured())) {
    return Boolean(upstashGeneralLimiter && upstashDeterministicLimiter);
  }
  initializationAttempted = true;

  if (!isUpstashConfigured()) {
    return false;
  }

  try {
    const url = process.env.UPSTASH_REDIS_REST_URL!.trim();
    const token = process.env.UPSTASH_REDIS_REST_TOKEN!.trim();

    upstashRedisClient = new Redis({
      url,
      token,
    });

    upstashGeneralLimiter = new Ratelimit({
      redis: upstashRedisClient,
      limiter: Ratelimit.slidingWindow(AI_CONFIG.rateLimits.general.maxRequests, '60 s'),
      prefix: 'nyayota:ratelimit:general',
      analytics: false,
    });

    upstashDeterministicLimiter = new Ratelimit({
      redis: upstashRedisClient,
      limiter: Ratelimit.slidingWindow(AI_CONFIG.rateLimits.deterministic.maxRequests, '60 s'),
      prefix: 'nyayota:ratelimit:deterministic',
      analytics: false,
    });

    return true;
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    console.error('Failed to initialize Upstash Redis rate limiters:', msg);
    upstashRedisClient = null;
    upstashGeneralLimiter = null;
    upstashDeterministicLimiter = null;
    return false;
  }
}

/**
 * Returns current configuration status of the rate limiting subsystem.
 * Distinguishes genuine distributed rate limiting from local development fallback.
 */
export function getRateLimiterStatus(): RateLimiterStatus {
  const configured = isUpstashConfigured();
  if (configured) {
    return {
      configured: true,
      provider: 'upstash-redis',
      isDistributed: true,
      details: 'Upstash Redis distributed rate limiting configured for multi-region serverless deployment.',
    };
  }

  const isProduction = process.env.NODE_ENV === 'production';
  return {
    configured: false,
    provider: 'process-local-fallback',
    isDistributed: false,
    details: isProduction
      ? 'UNCONFIGURED: Upstash Redis credentials (UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN) are missing. Process-local rate limiting cannot protect distributed serverless instances in production.'
      : 'DEVELOPMENT MODE: Upstash Redis not configured. Operating with process-local sliding-window rate limiting.',
  };
}

/**
 * Executes rate limiting check for a given client IP and assistant engine.
 * Employs Upstash Redis if configured; gracefully handles Redis errors with fallback;
 * uses process-local sliding window for non-production development.
 */
export async function checkRateLimit(
  clientIp: string,
  engine: AssistantEngineType
): Promise<RateLimitCheckResult> {
  const hasUpstash = initializeUpstashLimiters();

  if (hasUpstash && upstashGeneralLimiter && upstashDeterministicLimiter) {
    try {
      const limiter = engine === 'general' ? upstashGeneralLimiter : upstashDeterministicLimiter;
      const rateLimitKey = `${engine}:${clientIp}`;
      const result = await limiter.limit(rateLimitKey);

      return {
        allowed: result.success,
        remaining: result.remaining,
        limit: result.limit,
        resetMs: Math.max(0, result.reset - Date.now()),
        provider: 'upstash-redis',
        isDistributed: true,
      };
    } catch (redisError: unknown) {
      const msg = redisError instanceof Error ? redisError.message : 'Redis connection error';
      console.warn('Upstash Redis check failed; falling back to process-local rate limit:', msg);
      // Degraded safe fallback to process-local tracking during transient Redis outages
      const localResult = checkProcessLocalRateLimit(clientIp, engine);
      return {
        ...localResult,
        error: `Distributed rate limiter degraded: ${msg}`,
      };
    }
  }

  // Process-local fallback for development and environments without Upstash credentials
  return checkProcessLocalRateLimit(clientIp, engine);
}
