import { GoogleGenAI } from '@google/genai';
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
//
// Architectural Limitations & Low-Budget Production Hardening:
// In serverless environments (such as Vercel), each ephemeral function container
// maintains its own in-memory state. Under high horizontal concurrency, separate
// container instances do not share memory.
//
// Production Mitigations:
// 1. Zero-Cost / Low-Budget Layer: Cloudflare WAF Free Tier (Edge rate limiting
//    rules enforced before requests reach Vercel origin).
// 2. Shared State Layer: Upstash Redis (Serverless Redis free tier with 10k daily
//    commands, providing global atomic token-bucket synchronization across all containers).
//
// This per-instance sliding-window limiter prevents single-container flooding and
// runaway token exhaustion without requiring paid external infrastructure.
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

  // Retain only timestamps within the sliding window
  const activeTimestamps = record.timestamps.filter((ts) => now - ts < config.windowMs);

  if (activeTimestamps.length >= config.maxRequests) {
    rateLimitMap.set(rateLimitKey, { timestamps: activeTimestamps });
    return { allowed: false, remaining: 0, limit: config.maxRequests };
  }

  activeTimestamps.push(now);
  rateLimitMap.set(rateLimitKey, { timestamps: activeTimestamps });

  // Periodically clean stale entries to prevent memory buildup in warm containers
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

// Safely extract client IP respecting edge proxies without blind header trust
function getClientIp(req: NextRequest): string {
  const sanitizeIp = (raw: string | null | undefined): string | null => {
    if (!raw) return null;
    let ip = raw.split(',')[0].trim();
    // Strip IPv4 port if present
    if (/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}:\d+$/.test(ip)) {
      ip = ip.split(':')[0];
    }
    // Strip IPv6 square brackets if present
    if (ip.startsWith('[') && ip.includes(']')) {
      ip = ip.replace(/[\[\]]/g, '').split(':')[0];
    }
    // Verify safe IP characters
    if (/^[0-9a-fA-F:.]+$/.test(ip) && ip.length <= 45) {
      return ip;
    }
    return null;
  };

  // 1. Vercel Edge / Serverless trusted header
  const vercelIp = sanitizeIp(req.headers.get('x-vercel-forwarded-for'));
  if (vercelIp) return vercelIp;

  // 2. Standard X-Real-IP
  const realIp = sanitizeIp(req.headers.get('x-real-ip'));
  if (realIp) return realIp;

  // 3. X-Forwarded-For: take first IP in proxy chain, sanitize
  const forwarded = sanitizeIp(req.headers.get('x-forwarded-for'));
  if (forwarded) return forwarded;

  return '127.0.0.1';
}

const SECURITY_HEADERS = {
  'Cache-Control': 'no-store, no-cache, must-revalidate',
  'X-Content-Type-Options': 'nosniff',
};

export async function POST(req: NextRequest) {
  try {
    // 1. Strict Content-Type check (prevent CSRF and non-JSON body attacks)
    const contentType = req.headers.get('content-type') || '';
    if (!contentType.toLowerCase().includes('application/json')) {
      return NextResponse.json(
        { error: 'Invalid Content-Type. Expected application/json.' },
        { status: 415, headers: SECURITY_HEADERS }
      );
    }

    // 2. Payload size safeguard (prevent memory exhaustion)
    const contentLength = req.headers.get('content-length');
    if (contentLength && parseInt(contentLength, 10) > 32768) {
      return NextResponse.json(
        { error: 'Payload exceeds maximum permitted size of 32KB.' },
        { status: 413, headers: SECURITY_HEADERS }
      );
    }

    // 3. Safe body parsing
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

    // Validate query parameter
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

    // Enforce 1,500 character upper limit to avoid token exhaustion and DoS
    if (trimmedQuery.length > 1500) {
      return NextResponse.json(
        { error: 'Query exceeds maximum allowed length of 1,500 characters.' },
        { status: 400, headers: SECURITY_HEADERS }
      );
    }

    // Validate mode and language against strict whitelists
    const safeMode = typeof mode === 'string' && ['explain', 'outcome', 'compare', 'analogy', 'statute'].includes(mode)
      ? mode
      : 'explain';
    const safeLanguage = typeof language === 'string' && ['english', 'bengali', 'both'].includes(language)
      ? language
      : 'both';

    // Validate engine / assistant mode selection
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
      : 'deterministic'; // Default to deterministic source-grounded research for Nyayota

    // Enforce differentiated rate limits per engine mode
    const clientIp = getClientIp(req);
    const rateLimit = checkDifferentiatedRateLimit(clientIp, selectedEngine);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          error: selectedEngine === 'general'
            ? 'General AI assistant rate limit exceeded (15 requests/min). Please wait a moment before sending additional queries, or switch to Source-Grounded Legal Research.'
            : 'Legal research rate limit exceeded (30 requests/min). Please wait a moment before sending additional inquiries.',
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

    // -------------------------------------------------------------------------
    // Deterministic Source-Grounded Legal Pipeline (Zero External AI dependency)
    // -------------------------------------------------------------------------
    if (selectedEngine === 'deterministic') {
      try {
        const deterministicResult = await executeNyayotaAIPipeline({
          query: trimmedQuery,
          language: safeLanguage === 'bengali' ? 'bn' : safeLanguage === 'english' ? 'en' : 'both',
          mode: safeMode === 'compare' ? 'compare' : safeMode === 'statute' ? 'cite' : 'explain',
          lawContext,
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

    // Limit conversation history to latest 10 messages with 2,000 char cap per message and 8,000 char total cap
    const validatedMessages: ChatMessage[] = [];
    let totalHistoryLength = 0;
    if (Array.isArray(messages)) {
      messages.slice(-10).forEach((msg) => {
        if (msg && typeof msg === 'object' && typeof msg.content === 'string') {
          const sanitizedContent = msg.content.trim().slice(0, 2000);
          if (sanitizedContent && totalHistoryLength + sanitizedContent.length <= 8000) {
            validatedMessages.push({
              role: msg.role === 'user' ? 'user' : 'assistant',
              content: sanitizedContent,
            });
            totalHistoryLength += sanitizedContent.length;
          }
        }
      });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    // Strict Educational System Prompt
    const systemInstruction = `You are the Nyayota AI Legal Knowledge Assistant, a specialized educational legal research system for citizens, students, and legal researchers.
Your mission is to make codified statutes, legal concepts, court procedures, and terminology understandable, neutral, accurate, and accessible.

CRITICAL OPERATIONAL RULES:
1. EDUCATIONAL USE ONLY: You provide educational legal knowledge and statutory analysis. You are NOT a lawyer and do NOT give formal legal representation or legal advice.
2. NEVER GUARANTEE OUTCOMES: Never claim certainty about court rulings or guarantee specific judicial decisions. Explain possible legal consequences, standards, and factors.
3. CLEAR DISCLAIMERS: Always remind users that this is educational legal information.
4. JURISDICTION AWARENESS: Default to Bangladesh codified law and International Law (UDHR, ICCPR, treaties) unless another jurisdiction is specified. Provide clear English and Bengali (বাংলা) terminology where appropriate.
5. PLAIN LANGUAGE: Explain difficult Latin maxims, archaic statutory wording, or legal jargon in crystal-clear, structured terms with a relatable everyday analogy.
6. STRUCTURED RESPONSES: Use clear Markdown headings (###), bullet points, bold key terms, and statutory section citations (e.g., Section 300, Penal Code 1860; Article 102, Constitution).`;

    // Construct enriched prompt
    let userPrompt = '';
    if (lawContext && typeof lawContext === 'object') {
      const safeTitle = typeof lawContext.title === 'string' ? lawContext.title.slice(0, 150) : 'N/A';
      const safeJurisdiction = typeof lawContext.jurisdiction === 'string' ? lawContext.jurisdiction.slice(0, 60) : 'N/A';
      const safeCategory = typeof lawContext.category === 'string' ? lawContext.category.slice(0, 60) : 'N/A';
      userPrompt += `[ACTIVE STATUTE CONTEXT]\nTitle: ${safeTitle}\nJurisdiction: ${safeJurisdiction}\nCategory: ${safeCategory}\n`;
      if (lawContext.sectionNumber) {
        const safeSecNum = String(lawContext.sectionNumber).slice(0, 30);
        const safeSecTitle = typeof lawContext.sectionTitle === 'string' ? lawContext.sectionTitle.slice(0, 150) : '';
        const safeSecContent = typeof lawContext.sectionContent === 'string' ? lawContext.sectionContent.slice(0, 600) : '';
        userPrompt += `Selected Section: ${safeSecNum} - ${safeSecTitle}\nContent Excerpt: ${safeSecContent}\n`;
      }
      userPrompt += '\n';
    }

    userPrompt += `User Inquiry: ${trimmedQuery}\nMode: ${safeMode}\nTarget Language: ${safeLanguage}`;

    if (apiKey) {
      try {
        const ai = new GoogleGenAI({
          apiKey,
          httpOptions: {
            headers: {
              'User-Agent': 'nyayota-legal-platform',
            },
          },
        });

        // Format conversation history
        const contents: any[] = [];
        if (validatedMessages.length > 0) {
          validatedMessages.slice(-6).forEach((msg) => {
            contents.push({
              role: msg.role === 'user' ? 'user' : 'model',
              parts: [{ text: msg.content }]
            });
          });
        }
        contents.push({
          role: 'user',
          parts: [{ text: userPrompt }]
        });

        // Upstream generation timeout race to prevent hanging requests
        const timeoutPromise = new Promise<never>((_, reject) =>
          setTimeout(
            () => reject(new Error(`AI upstream generation request timed out after ${AI_CONFIG.timeoutMs / 1000} seconds`)),
            AI_CONFIG.timeoutMs
          )
        );

        const response = await Promise.race([
          ai.models.generateContent({
            model: AI_CONFIG.model,
            contents,
            config: {
              systemInstruction,
              temperature: AI_CONFIG.generationConfig.temperature,
              topK: AI_CONFIG.generationConfig.topK,
              topP: AI_CONFIG.generationConfig.topP,
            },
          }),
          timeoutPromise,
        ]);

        return NextResponse.json(
          {
            text: response.text,
            provider: AI_CONFIG.model,
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
      } catch (geminiError: unknown) {
        // Sanitized server-side error logging: never echo raw query payload or API keys
        const errorMsg = geminiError instanceof Error ? geminiError.message : 'Unknown upstream error';
        console.error('Upstream AI generation request encountered an issue:', errorMsg);
      }
    }

    // High precision fallback educational analysis if API key is missing, timed out, or offline
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

  // If specific lawContext was passed (e.g. from "Ask About This Law")
  if (lawContext && lawContext.title) {
    const sectionInfo = lawContext.sectionNumber ? ` - ${lawContext.sectionNumber}` : '';
    return `### Legal Analysis: ${lawContext.title}${sectionInfo}

**Jurisdictional Context:** ${lawContext.jurisdiction || 'Bangladesh'} • **Branch:** ${lawContext.category || 'Codified Law'}

**Key Statutory Purpose & Provisions:**
- **Statutory Foundation:** ${lawContext.title} serves as a governing framework in ${lawContext.jurisdiction || 'Bangladesh'}.
${lawContext.sectionNumber ? `- **Target Provision:** ${lawContext.sectionNumber} (${lawContext.sectionTitle || ''}) sets out specific statutory rules and legal requirements.` : ''}
${lawContext.overview ? `- **Statutory Scope:** ${lawContext.overview}` : ''}

**Plain Language Breakdown (সহজ ভাষায় ব্যাখ্যা):**
In everyday terms, this law ensures that rights, duties, and procedural steps are transparently defined. When individuals or institutions interact in this area, they must comply with statutory standards to maintain legality and avoid enforcement sanctions or invalidation.

**Important Legal Concepts to Understand:**
1. **Rule of Law & Statutory Legality:** Actions must be anchored within explicit statutory authority (*intra vires*).
2. **Procedural Due Process:** Any penalty, dispute resolution, or obligation must afford fair notice and natural justice.
3. **Remedies & Enforcement:** Affected parties can seek statutory relief through competent civil or criminal courts.

**Next Research Steps in Nyayota:**
- Review the official authenticated text in the **Law Detail Page**.
- Cross-reference related statutes using the **Related Laws** and **Compare** tools.
- Check relevant judicial interpretations in the Supreme Court Law Reports.

---
*Educational Information Only — Not Legal Advice. Nyayota is an educational platform. For specific legal proceedings, consult a licensed advocate.*`;
  }

  // 1. Negligence / Tort
  if (q.includes('negligence') || q.includes('অবহেলা') || q.includes('duty of care')) {
    return `### Legal Explanation: Negligence & The Duty of Care

**Core Definition:**
*Negligence* is the failure to exercise the standard of care that a reasonably prudent person would have exercised in a similar situation, resulting in unintended injury or loss to another party.

**The 4 Essential Legal Pillars of Negligence:**
1. **Duty of Care:** The defendant owed a legal obligation to protect the plaintiff from foreseeable harm (e.g., a driver owes a duty of care to pedestrians).
2. **Breach of Duty:** The defendant failed to meet the required standard of care through reckless or careless action.
3. **Causation (Cause in Fact & Proximate Cause):** The breach directly resulted in the claimant's injury.
4. **Damages:** Measurable physical, emotional, or financial harm was suffered.

**Explain Like I'm 15 (সহজ উদাহরণ):**
Imagine a shopkeeper mops the floor with slippery soap but puts up no warning sign. If a customer slips, falls, and breaks their arm, the shopkeeper was negligent: they had a duty to warn customers, breached it by forgetting the sign, and caused direct injury.

**Remedies under Law:**
- **Compensatory Damages:** Money awarded to cover medical expenses, property repair, or lost earnings.
- **Injunctions:** Court orders requiring hazardous practices to cease immediately.

---
*Educational Information Only — Not Legal Advice.*`;
  }

  // 2. Cyber Law in Simple Language
  if (q.includes('cyber') || q.includes('সাইবার') || q.includes('hacking') || q.includes('online')) {
    return `### Plain Language Guide: Cyber & Digital Law

**Primary Statute in Bangladesh:** Cyber Security Act 2023 (সাইবার সুরক্ষা আইন)

**What is Cyber Law?**
Cyber law governs all legal matters related to the internet, computers, electronic networks, digital data, and online communications.

**Key Digital Offenses & Statutory Protections:**
1. **Unauthorized Access & Hacking (Section 17-19):** Logging into accounts, servers, or databases without permission is a criminal offense even if no data is stolen.
2. **Cyber Extortion & Blackmail (Section 28):** Threatening to leak private photos or confidential credentials for financial or personal demands carries severe prison penalties.
3. **Identity Impersonation (Section 24):** Creating fake accounts or spoofing websites to deceive the public.
4. **Data Protection & Privacy:** Protecting citizens' electronic records and critical information infrastructure from unlawful interception.

**How to Protect Your Rights Online:**
- Always preserve electronic evidence (full screenshots with URLs, server headers, and dates).
- Report cyber extortion immediately to the specialized Cyber Crime Division or local police station.

---
*Educational Information Only — Not Legal Advice.*`;
  }

  // 3. Human Rights
  if (q.includes('human rights') || q.includes('মানবাধিকার') || q.includes('udhr') || q.includes('iccpr')) {
    return `### International Law Framework: Universal Human Rights

**Foundational International Covenants:**
1. **Universal Declaration of Human Rights (UDHR, 1948):** The historic proclamation of 30 universal articles recognizing that all human beings are born free and equal in dignity and rights.
2. **International Covenant on Civil and Political Rights (ICCPR, 1966):** Legally binding multilateral treaty guaranteeing the right to life, freedom of speech, freedom of religion, and fair trial rights.
3. **Convention Against Torture (CAT, 1984):** Absolute prohibition of cruel, inhuman, or degrading treatment by state authorities.

**How International Rights Connect with National Law:**
In Bangladesh, universal human rights principles are codified into **Part III of the Constitution (Fundamental Rights, Articles 26–47A)**. When fundamental rights are infringed:
- Citizens can file an **Article 102 Writ Petition** directly in the High Court Division.
- High Court judges have constitutional power to issue mandatory orders (Writs of Habeas Corpus, Mandamus, Certiorari) to enforce fundamental rights.

---
*Educational Information Only — Not Legal Advice.*`;
  }

  // 4. Murder vs Culpable Homicide
  if (q.includes('murder') || q.includes('homicide') || q.includes('300') || q.includes('299') || q.includes('খুন')) {
    return `### Criminal Law Analysis: Murder vs. Culpable Homicide

**Primary Statute:** The Penal Code, 1860 (দণ্ডবিধি ১৮৬০)

**1. Culpable Homicide (Section 299):**
- Genus (the broader category): Causing death by doing an act with the intention of causing death, or with the intention of causing bodily injury likely to cause death, or with the knowledge that the act is likely to cause death.
- Penalty under Section 304: Imprisonment for life or up to 10 years.

**2. Murder (Section 300):**
- Species (the aggravated category): Culpable homicide becomes Murder when there is premeditated intention or when the bodily injury intended is sufficient in the ordinary course of nature to cause death.
- Penalty under Section 302: **Death Penalty** or **Imprisonment for Life**, plus fine.

**Key Difference in Plain Language:**
All murders are culpable homicides, but not all culpable homicides are murders. If death occurs under sudden and grave provocation, in good faith self-defense exceeding legal limits, or in a sudden heat of passion without premeditation, it is treated as Culpable Homicide Not Amounting to Murder.

**Procedural Status:**
- **Cognizable:** Police can arrest without warrant.
- **Non-Bailable:** Bail is strictly discretionary and rare.
- **Trial Court:** Exclusively Court of Sessions.

---
*Educational Information Only — Not Legal Advice.*`;
  }

  // 5. Compare two legal concepts
  if (q.includes('compare') || q.includes('difference between') || q.includes('বনাম') || q.includes('পার্থক্য')) {
    return `### Comparative Legal Analysis

**Inquiry:** "${query}"

**1. Conceptual Comparison:**
Legal concepts are categorized by:
- **Substantive Law vs. Procedural Law:** Substantive law (e.g. Penal Code, Contract Act) defines rights and offenses; Procedural law (e.g. CrPC, CPC) defines how cases are filed and tried.
- **Civil Law vs. Criminal Law:** Civil law focuses on private disputes, compensation, and contract remedies; Criminal law focuses on public offenses, state prosecution, and statutory punishment.

**2. Practical Key Differences:**
- **Standard of Proof:** Criminal cases require proof *beyond reasonable doubt*; Civil cases require proof on the *balance of probabilities*.
- **Initiator of Action:** Criminal complaints are often prosecuted by the state; Civil lawsuits are instituted by individual plaintiffs.
- **Primary Remedy:** Criminal law imposes imprisonment and state fines; Civil law awards damages, injunctions, and specific restitution.

---
*Educational Information Only — Not Legal Advice.*`;
  }

  // Default response
  return `### Nyayota Legal Analysis & Provisions

**Inquiry:** "${query}"

**Statutory & Conceptual Breakdown:**
- **Jurisdiction:** Evaluated under Bangladesh Statutory Law and Universal Legal Principles.
- **Core Principle:** Legal obligations require statutory authorization (*intra vires*), absence of arbitrary exercise, and adherence to natural justice.
- **Recommended Research Pathway:** Cross-reference the primary sections in Nyayota's codified statute repository (The Penal Code 1860, Constitution of Bangladesh, Contract Act 1872, or CrPC 1898).

**How to Proceed with Legal Research:**
1. Identify whether the matter involves Civil, Criminal, Constitutional, or Cyber jurisdiction.
2. Review the exact statutory text and accredited Bengali translation on the statute detail page.
3. Consult High Court Division precedents and legal outcome guides.

---
*Educational Information Only — Not Legal Advice. Nyayota is an educational platform. For active legal disputes, please consult a licensed advocate or national legal aid helpline (16430 in Bangladesh).*`;
}

