/**
 * Nyayota AI Assistant - Centralized AI & Model Configuration
 *
 * Centralizes model definitions, runtime fallbacks, and operational limits.
 * Adheres to @google/genai guidelines while allowing configurable deployment.
 */

export const AI_CONFIG = {
  /**
   * Gemini model identifier.
   * Default active model: 'gemini-3.8-flash' (verified active in Google GenAI environment)
   * or can be set via GEMINI_MODEL env var for runtime portability.
   */
  model: process.env.GEMINI_MODEL || 'gemini-3.8-flash',

  /**
   * Model family display label for UI transparency.
   */
  displayName: 'Google Gemini Flash',

  /**
   * Generation request timeout in milliseconds (prevents hanging serverless invocations).
   */
  timeoutMs: 12000,

  /**
   * Generation configuration parameters.
   */
  generationConfig: {
    temperature: 0.25,
    topK: 40,
    topP: 0.95,
  },

  /**
   * Differentiated sliding-window rate limiting thresholds per client IP.
   */
  rateLimits: {
    /**
     * General AI mode (Gemini-backed):
     * Lower limit to prevent upstream API quota exhaustion and token billing abuse.
     */
    general: {
      windowMs: 60 * 1000, // 60 seconds
      maxRequests: 15,
    },
    /**
     * Deterministic Source-Grounded Legal Research mode:
     * Higher limit since execution is local TypeScript computation with zero external API costs.
     */
    deterministic: {
      windowMs: 60 * 1000, // 60 seconds
      maxRequests: 30,
    },
  },
} as const;

export type AssistantEngineType = 'deterministic' | 'general';
