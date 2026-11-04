# Security Policy & Vulnerability Disclosure

The Nyayota team and maintainers take the security, privacy, and integrity of the platform and its statutory data seriously. As an open-access civic and educational platform, we follow responsible security practices to protect our users and infrastructure.

---

## 1. Reporting a Vulnerability

If you discover a security vulnerability or potential risk in the Nyayota codebase, infrastructure, or deployment, please report it to us confidentially:

- **Security Contact:** `nyayota.contact@gmail.com`
- **Subject Line:** `[SECURITY] Vulnerability Report: <Brief Description>`
- **Expected Details:**
  - Detailed description of the potential vulnerability or weakness.
  - Step-by-step reproduction instructions or Proof-of-Concept (PoC).
  - Affected files, endpoints, or components.
  - Impact assessment (e.g., Denial of Service, token exhaustion, sensitive information disclosure).

Please **do NOT** file public GitHub issues for undisclosed security vulnerabilities.

---

## 2. Maintenance & Support Model

Nyayota is an independent civic open-source initiative maintained by volunteers. While we do not operate a commercial 24/7 Security Operations Center (SOC), our maintenance commitments include:
- **Acknowledgement:** We aim to acknowledge receipt of credible security reports within **48 to 72 hours**.
- **Assessment & Triage:** We will assess severity and investigate the reported issue promptly.
- **Remediation & Patching:** Once validated, we will commit patches to a private testing branch and deploy to production within a reasonable timeline based on severity.
- **Coordinated Disclosure:** We kindly request that security researchers allow up to **30 days** following a confirmed fix before publicly discussing or publishing details.

---

## 3. Scope of Security Coverage

### In-Scope
- Server-side API abuse, rate-limiting bypasses, and request flooding on `/api/ai-assistant`.
- Unauthorized exposure or leakage of server-side environment variables (e.g. `GEMINI_API_KEY`).
- Cross-Site Scripting (XSS) or HTML injection in statutory readers, markdown rendering, or search interfaces.
- Memory exhaustion, regular expression Denial of Service (ReDoS), or prototype pollution in legal retrieval algorithms.
- Server-Side Request Forgery (SSRF) or unvalidated external redirect vulnerabilities.

### Out-of-Scope
- Denial of Service attacks aimed at general third-party hosting infrastructure (Vercel edge networks).
- Spamming voluntary crypto donation addresses on public blockchains.
- Issues requiring physical access to a user's unlocked device or compromised browser extensions.
- Theoretical vulnerabilities without demonstrated real-world exploitability or actionable proof.

---

## 4. Current Security Architecture

Nyayota is intentionally engineered with defensive safeguards:

1. **Zero Remote User Data:** Nyayota has no user accounts, database credentials, or centralized user stores. User bookmarks, notes, and search history reside exclusively in the client's `window.localStorage`.
2. **Server-Side API Isolation:** External AI model keys (`@google/genai`) are isolated within server-side API routes (`app/api/*`). Secrets are never prefixed with `NEXT_PUBLIC_` and are never bundled into client JavaScript.
4. **Multi-Tier Request Safeguards & Stream-Level Bounds:**
   - Strict `Content-Type: application/json` enforcement.
   - Stream-level bounded body reader (`req.body.getReader()`) terminating read immediately upon exceeding 32 KB (32,768 bytes), returning HTTP 413 Payload Too Large before memory exhaustion.
   - User query text cap at 1,500 characters with script tag sanitization.
   - Conversation history capped at 10 messages (8,000 characters total) with strict rejection of client-injected `system` roles.
   - Strict input schema validation: unsupported `mode`, `language`, or `engine` parameters are rejected with HTTP 400 rather than silently defaulted.
   - Upstream model generation timeout capped at 12 seconds with native `AbortController` cancellation to terminate upstream Google GenAI requests upon timeout or client disconnect.
5. **Differentiated Rate Limiting & Distributed Architecture (Phase 2):**
   - General AI mode (Gemini): 15 requests per 60 seconds (`Ratelimit.slidingWindow(15, "60 s")`).
   - Deterministic legal retrieval: 30 requests per 60 seconds (`Ratelimit.slidingWindow(30, "60 s")`).
   - Distributed serverless deployment: Employs `@upstash/ratelimit` with `@upstash/redis` via `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`.
   - Honest status reporting: Process-local in-memory rate limiting is isolated as development/test fallback only and never misrepresented as distributed in production.
   - Trusted IP extraction: Prioritizes platform-authenticated `x-vercel-forwarded-for` on Vercel to block client IP spoofing, with strict IPv4 octet validation, IPv6 parsing, and port stripping.
6. **Origin Validation & CSRF Protection:**
   - Cross-site POST requests to `/api/ai-assistant` are validated against authorized origins (`https://nyayota.vercel.app`, `APP_URL`). Unauthorized origins and requests with `Sec-Fetch-Site: cross-site` are rejected with HTTP 403 Forbidden.
7. **Strict Public Response Boundaries (Data Leak Prevention):**
   - The public `/api/ai-assistant` route returns strictly: `text`, `engine`, `status`, `sources`, `disclaimer`, `timestamp`, and safe clarification prompts.
   - Internal objects (`deterministicResponse`, `pipelineResult`, raw model response payloads, tokens, server configurations, internal scores, and file paths) are strictly filtered out and never transmitted to the browser.
8. **Defensive Headers:** API responses emit `Cache-Control: no-store, no-cache, must-revalidate`, `X-Content-Type-Options: nosniff`, and `X-Frame-Options: DENY`.
9. **Statutory Source Provenance & Integrity:** Ingested statutory records are source-linked directly to official digital publications (`bdlaws.minlaw.gov.bd` and `bdcode.gov.bd`) with structured ingestion status audits (`source-linked`, `reviewed`, `unverified`, `independently-verified`). Technical data checks do not substitute for official court gazette certification.

---

## 5. Safe Harbor

Nyayota supports ethical security research conducted in good faith. If you:
- Make a good-faith effort to avoid privacy violations, data destruction, and service interruption;
- Give us reasonable time to remediate before disclosing to the public;
- Comply with all applicable laws;

We will not pursue legal action against you for your research activities.
