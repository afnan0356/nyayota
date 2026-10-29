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
3. **Multi-Tier Request Safeguards:**
   - Strict `Content-Type: application/json` enforcement.
   - Request payload cap at 32 KB.
   - User query text cap at 1,500 characters.
   - Conversation history capped at 10 messages (8,000 characters total).
   - Upstream model generation timeout capped at 12 seconds.
4. **Differentiated Sliding-Window Rate Limiting:**
   - General AI mode: 15 requests per 60 seconds.
   - Deterministic legal retrieval: 30 requests per 60 seconds.
   - Client IP extraction with IPv4/IPv6 port stripping and character sanitization.
5. **Defensive Headers:** API responses emit `Cache-Control: no-store, no-cache, must-revalidate` and `X-Content-Type-Options: nosniff`.
6. **Statutory Content Integrity:** Cryptographic SHA-256 hashes detect unintended file drift or corruption in local data structures.

---

## 5. Safe Harbor

Nyayota supports ethical security research conducted in good faith. If you:
- Make a good-faith effort to avoid privacy violations, data destruction, and service interruption;
- Give us reasonable time to remediate before disclosing to the public;
- Comply with all applicable laws;

We will not pursue legal action against you for your research activities.
