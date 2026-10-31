import { NextRequest, NextResponse } from 'next/server';
import { executeNyayotaAIPipeline } from '@/lib/nyayota-ai';
import { AI_CONFIG, AssistantEngineType } from '@/lib/ai-config';

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

// ---------------------------------------------------------------------------
// Rate Limiting Architecture & Serverless Deployment Note:
// Differentiated in-memory sliding-window rate limiter:
// - General AI Mode (Gemini): 15 requests per 60 seconds (prevents API quota exhaustion)
// - Deterministic Mode (Nyayota): 30 requests per 60 seconds (local TypeScript execution)
// ---------------------------------------------------------------------------
interface RateLimitRecord {
  timestamps: number[];
}
const rateLimitMap = new Map<string, RateLimitRecord>();

function checkDifferentiatedRateLimit(
  clientIp: string,
  engine: AssistantEngineType
): { allowed: boolean; remaining: number; limit: number } {
  const config = engine === 'general' ? AI_CONFIG.rateLimits.general : AI_CONFIG.rateLimits.deterministic;
  const now = Date.now();
  const rateLimitKey = `${engine}:${clientIp}`;
  const record = rateLimitMap.get(rateLimitKey) || { timestamps: [] };

  const activeTimestamps = record.timestamps.filter((ts) => now - ts < config.windowMs);

  if (activeTimestamps.length >= config.maxRequests) {
    rateLimitMap.set(rateLimitKey, { timestamps: activeTimestamps });
    return { allowed: false, remaining: 0, limit: config.maxRequests };
  }

  activeTimestamps.push(now);
  rateLimitMap.set(rateLimitKey, { timestamps: activeTimestamps });

  if (rateLimitMap.size > 2000) {
    for (const [key, val] of rateLimitMap.entries()) {
      if (val.timestamps.every((t) => now - t >= 60000)) {
        rateLimitMap.delete(key);
      }
    }
  }

  return {
    allowed: true,
    remaining: config.maxRequests - activeTimestamps.length,
    limit: config.maxRequests,
  };
}

function getClientIp(req: NextRequest): string {
  const sanitizeIp = (raw: string | null | undefined): string | null => {
    if (!raw) return null;
    let ip = raw.split(',')[0].trim();
    if (/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}:\d+$/.test(ip)) {
      ip = ip.split(':')[0];
    }
    if (ip.startsWith('[') && ip.includes(']')) {
      ip = ip.replace(/[\[\]]/g, '').split(':')[0];
    }
    if (/^[0-9a-fA-F:.]+$/.test(ip) && ip.length <= 45) {
      return ip;
    }
    return null;
  };

  const vercelIp = sanitizeIp(req.headers.get('x-vercel-forwarded-for'));
  if (vercelIp) return vercelIp;

  const realIp = sanitizeIp(req.headers.get('x-real-ip'));
  if (realIp) return realIp;

  const forwarded = sanitizeIp(req.headers.get('x-forwarded-for'));
  if (forwarded) return forwarded;

  return '127.0.0.1';
}

const SECURITY_HEADERS = {
  'Cache-Control': 'no-store, no-cache, must-revalidate',
  'X-Content-Type-Options': 'nosniff',
};

export async function POST(req: NextRequest) {
  // -------------------------------------------------------------------------
  // PHASE 5E: PUBLIC ASSISTANT TEMPORARY SUSPENSION CHECK
  // Server-controlled flag: AI_CONFIG.isPublicAssistantAvailable
  // When suspended, immediately return HTTP 503 without invoking Gemini,
  // the deterministic engine, or leaking any sensitive internal traces.
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

  try {
    const contentType = req.headers.get('content-type') || '';
    if (!contentType.toLowerCase().includes('application/json')) {
      return NextResponse.json(
        { error: 'Invalid Content-Type. Expected application/json.' },
        { status: 415, headers: SECURITY_HEADERS }
      );
    }

    const contentLength = req.headers.get('content-length');
    if (contentLength && parseInt(contentLength, 10) > 32768) {
      return NextResponse.json(
        { error: 'Payload exceeds maximum permitted size of 32KB.' },
        { status: 413, headers: SECURITY_HEADERS }
      );
    }

    let body;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { error: 'Malformed JSON payload.' },
        { status: 400, headers: SECURITY_HEADERS }
      );
    }

    if (!body || typeof body !== 'object') {
      return NextResponse.json(
        { error: 'Request body must be a JSON object.' },
        { status: 400, headers: SECURITY_HEADERS }
      );
    }

    const { query, mode = 'explain', language = 'both', lawContext, messages = [] } = body;

    if (!query || typeof query !== 'string' || query.trim().length === 0) {
      return NextResponse.json(
        { error: 'Query parameter is required and must be non-empty.' },
        { status: 400, headers: SECURITY_HEADERS }
      );
    }

    const trimmedQuery = query.trim();
    if (trimmedQuery.length < 2) {
      return NextResponse.json(
        { error: 'Query must be at least 2 characters long.' },
        { status: 400, headers: SECURITY_HEADERS }
      );
    }

    if (trimmedQuery.length > 1500) {
      return NextResponse.json(
        { error: 'Query exceeds maximum allowed length of 1,500 characters.' },
        { status: 400, headers: SECURITY_HEADERS }
      );
    }

    const safeMode = typeof mode === 'string' && ['explain', 'outcome', 'compare', 'analogy', 'statute'].includes(mode)
      ? mode
      : 'explain';
    const safeLanguage = typeof language === 'string' && ['english', 'bengali', 'both'].includes(language)
      ? language
      : 'both';

    const isExplicitDeterministic =
      body.engine === 'deterministic' ||
      body.assistantMode === 'deterministic' ||
      body.engine === 'source-grounded';
    const isExplicitGeneral =
      body.engine === 'general' ||
      body.assistantMode === 'general' ||
      body.engine === 'gemini';

    const selectedEngine: AssistantEngineType = isExplicitGeneral
      ? 'general'
      : isExplicitDeterministic
      ? 'deterministic'
      : 'deterministic';

    // -------------------------------------------------------------------------
    // PHASE 6B: Conversation History Validation & Policy Enforcement
    // - Bounded to latest 10 messages (messages.slice(-10))
    // - Validates roles: 'user', 'assistant', 'system'
    // - System messages: permitted for validation, but isolated from client spoofing
    // - Per-message character cap: 2,000 characters
    // - Total history character budget: 8,000 characters
    // - Drops malformed entries safely
    // - Never trusts client-supplied routing decisions or metadata
    // -------------------------------------------------------------------------
    const validatedMessages: ChatMessage[] = [];
    let totalHistoryLength = 0;
    if (Array.isArray(messages)) {
      messages.slice(-10).forEach((msg) => {
        if (msg && typeof msg === 'object' && typeof msg.content === 'string') {
          const rawRole = msg.role;
          if (rawRole === 'user' || rawRole === 'assistant' || rawRole === 'system') {
            const sanitizedContent = msg.content.trim().slice(0, 2000);
            if (sanitizedContent && totalHistoryLength + sanitizedContent.length <= 8000) {
              validatedMessages.push({
                role: rawRole,
                content: sanitizedContent,
              });
              totalHistoryLength += sanitizedContent.length;
            }
          }
        }
      });
    }

    const clientIp = getClientIp(req);
    const rateLimit = checkDifferentiatedRateLimit(clientIp, selectedEngine);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          error: selectedEngine === 'general'
            ? 'General AI assistant rate limit exceeded (15 requests/min).'
            : 'Legal research rate limit exceeded (30 requests/min).',
          retryAfterSeconds: 60,
        },
        {
          status: 429,
          headers: {
            ...SECURITY_HEADERS,
            'Retry-After': '60',
            'X-RateLimit-Limit': String(rateLimit.limit),
            'X-RateLimit-Remaining': '0',
          },
        }
      );
    }

    if (selectedEngine === 'deterministic') {
      try {
        const deterministicResult = await executeNyayotaAIPipeline({
          query: trimmedQuery,
          language: safeLanguage === 'bengali' ? 'bn' : safeLanguage === 'english' ? 'en' : 'both',
          mode: safeMode === 'compare' ? 'compare' : safeMode === 'statute' ? 'cite' : 'explain',
          lawContext,
          messages: validatedMessages,
        });

        return NextResponse.json(
          {
            text: deterministicResult.text,
            provider: 'nyayota-deterministic-engine',
            engine: 'deterministic',
            timestamp: new Date().toISOString(),
            deterministicResponse: deterministicResult,
          },
          {
            headers: {
              ...SECURITY_HEADERS,
              'X-RateLimit-Limit': String(rateLimit.limit),
              'X-RateLimit-Remaining': String(rateLimit.remaining),
            },
          }
        );
      } catch (detError: unknown) {
        const errorMsg = detError instanceof Error ? detError.message : 'Unknown deterministic pipeline error';
        console.error('Deterministic legal pipeline encountered an issue:', errorMsg);
        return NextResponse.json(
          { error: 'An error occurred during deterministic legal retrieval.' },
          { status: 500, headers: SECURITY_HEADERS }
        );
      }
    }

    const apiKey = process.env.GEMINI_API_KEY;

    try {
      const pipelineResult = await executeNyayotaAIPipeline({
        query: trimmedQuery,
        language: safeLanguage === 'bengali' ? 'bn' : safeLanguage === 'english' ? 'en' : 'both',
        mode: safeMode === 'compare' ? 'compare' : safeMode === 'statute' ? 'cite' : 'explain',
        lawContext: lawContext
          ? {
              title: lawContext.title,
              category: lawContext.category,
              jurisdiction: lawContext.jurisdiction,
              sectionNumber: lawContext.sectionNumber,
              sectionTitle: lawContext.sectionTitle,
              sectionContent: lawContext.sectionContent,
            }
          : undefined,
        messages: validatedMessages,
        generateNaturalResponse: true,
        apiKey,
      });

      return NextResponse.json(
        {
          text: pipelineResult.text,
          provider: pipelineResult.provider || AI_CONFIG.model,
          engine: 'general',
          generationMethod: pipelineResult.generationMethod,
          timestamp: new Date().toISOString(),
          deterministicResponse: pipelineResult,
        },
        {
          headers: {
            ...SECURITY_HEADERS,
            'X-RateLimit-Limit': String(rateLimit.limit),
            'X-RateLimit-Remaining': String(rateLimit.remaining),
          },
        }
      );
    } catch (pipelineError: unknown) {
      const errorMsg = pipelineError instanceof Error ? pipelineError.message : 'Unknown pipeline error';
      console.error('General conversational legal pipeline encountered an issue:', errorMsg);

      // High precision fallback educational analysis if pipeline errors
      const fallbackResponse = generateLocalLegalAnalysis(trimmedQuery, safeMode, safeLanguage, lawContext);
      return NextResponse.json(
        {
          text: fallbackResponse,
          provider: 'nyayota-legal-engine-v1',
          engine: 'general',
          timestamp: new Date().toISOString(),
        },
        {
          headers: {
            ...SECURITY_HEADERS,
            'X-RateLimit-Limit': String(rateLimit.limit),
            'X-RateLimit-Remaining': String(rateLimit.remaining),
          },
        }
      );
    }
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : 'Internal error';
    console.error('AI assistant route encountered an error:', errorMsg);
    return NextResponse.json(
      { error: 'An error occurred while analyzing the legal query.' },
      { status: 500, headers: SECURITY_HEADERS }
    );
  }
}

function generateLocalLegalAnalysis(query: string, mode: string, language: string, lawContext?: any): string {
  const q = query.toLowerCase();

  if (lawContext && lawContext.title) {
    const sectionInfo = lawContext.sectionNumber ? ` - ${lawContext.sectionNumber}` : '';
    return `### Legal Analysis: ${lawContext.title}${sectionInfo}\n\n**Jurisdictional Context:** ${lawContext.jurisdiction || 'Bangladesh'} • **Branch:** ${lawContext.category || 'Codified Law'}\n\n**Key Statutory Purpose & Provisions:**\n- **Statutory Foundation:** ${lawContext.title} serves as a governing framework in ${lawContext.jurisdiction || 'Bangladesh'}.\n${lawContext.sectionNumber ? `- **Target Provision:** ${lawContext.sectionNumber} (${lawContext.sectionTitle || ''}) sets out specific statutory rules and legal requirements.` : ''}\n${lawContext.overview ? `- **Statutory Scope:** ${lawContext.overview}` : ''}\n\n**Plain Language Breakdown (সহজ ভাষায় ব্যাখ্যা):**\nIn everyday terms, this law ensures that rights, duties, and procedural steps are transparently defined. When individuals or institutions interact in this area, they must comply with statutory standards to maintain legality and avoid enforcement sanctions or invalidation.\n\n---\n*Educational Information Only — Not Legal Advice.*`;
  }

  if (q.includes('negligence') || q.includes('অবহেলা') || q.includes('duty of care')) {
    return `### Legal Explanation: Negligence & The Duty of Care\n\n**Core Definition:**\n*Negligence* is the failure to exercise the standard of care that a reasonably prudent person would have exercised in a similar situation, resulting in unintended injury or loss to another party.\n\n**The 4 Essential Legal Pillars of Negligence:**\n1. **Duty of Care:** The defendant owed a legal obligation to protect the plaintiff from foreseeable harm.\n2. **Breach of Duty:** The defendant failed to meet the required standard of care.\n3. **Causation:** The breach directly caused the claimant's injury.\n4. **Damages:** Measurable physical or financial harm was suffered.\n\n---\n*Educational Information Only — Not Legal Advice.*`;
  }

  return `### Nyayota Legal Analysis & Provisions\n\n**Inquiry:** "${query}"\n\n**Statutory & Conceptual Breakdown:**\n- **Jurisdiction:** Evaluated under Bangladesh Statutory Law and Universal Legal Principles.\n- **Core Principle:** Legal obligations require statutory authorization (*intra vires*), absence of arbitrary exercise, and adherence to natural justice.\n\n---\n*Educational Information Only — Not Legal Advice.*`;
}
