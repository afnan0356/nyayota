/**
 * Nyayota AI Assistant - Centralized AI & Model Configuration
 *
 * Centralizes model definitions, runtime fallbacks, and operational limits.
 * Adheres to @google/genai guidelines while allowing configurable deployment.
 */

export const AI_CONFIG = {
  /**
   * Public AI Assistant Availability Flag (Server-Controlled).
   * 
   * Defaults to false in all deployed environments.
   * When false:
   * - /api/ai-assistant returns HTTP 503 Service Unavailable immediately.
   * - Neither Gemini nor the deterministic pipeline executes.
   * - No client query parameter, header, or payload can bypass this flag.
   * - The underlying legal AI engine, retrieval engine, and tests remain intact for internal development.
   */
  get isPublicAssistantAvailable(): boolean {
    return process.env.ENABLE_PUBLIC_AI_ASSISTANT === 'true';
  },

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
    general: {
      windowMs: 60 * 1000, // 60 seconds
      maxRequests: 15,
    },
    deterministic: {
      windowMs: 60 * 1000, // 60 seconds
      maxRequests: 30,
    },
  },

  /**
   * Maintenance response payload for suspended public assistant.
   */
  maintenanceResponse: {
    error: 'assistant_temporarily_unavailable',
    message: 'The Nyayota Legal Assistant is under development. Please try again later.',
  },
};

export type AssistantEngineType = 'deterministic' | 'general';
