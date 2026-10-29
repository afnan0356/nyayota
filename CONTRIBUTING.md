# Contributing to Nyayota

Thank you for your interest in contributing to **Nyayota**, an open-access educational legal knowledge and statutory research platform for Bangladesh and International Law.

Nyayota is dedicated to making codified legislation, constitutional jurisprudence, procedural codes, and international multilateral treaties transparent, searchable, and understandable for citizens, law students, and researchers.

---

## 1. Code of Conduct & Civic Mission

Nyayota is an educational, non-partisan public resource. Contributors are expected to:
- Act with integrity, respect, and neutrality.
- Prioritize factual statutory accuracy over personal or political editorializing.
- Respect the strict non-advocacy boundary: Nyayota provides educational information, not legal representation or legal advice.

---

## 2. Technical Stack & Prerequisites

Before contributing code, ensure your environment meets these specifications:
- **Runtime:** Node.js 18.x or 20.x, or [Bun](https://bun.sh)
- **Framework:** Next.js 15.4+ (App Router)
- **UI Library:** React 19+
- **Language:** TypeScript 5.9+ (strict mode enabled)
- **Styling:** Tailwind CSS v4
- **AI SDK:** `@google/genai` (server-side only)
- **Icons:** `lucide-react` (never introduce custom SVGs or alternative icon fonts)

---

## 3. Getting Started & Development Workflow

### Step 1: Fork and Clone
```bash
git clone https://github.com/afnan0356/nyayota.git
cd nyayota
```

### Step 2: Install Dependencies
```bash
npm install
# or
bun install
```

### Step 3: Run the Development Server
```bash
npm run dev
# Server boots at http://localhost:3000
```

### Step 4: Run Verification Commands
Before submitting changes, all checks must pass cleanly:
```bash
# 1. Run full automated test suite (119+ tests)
bun test
# or: npm test

# 2. Run ESLint flat config
npm run lint

# 3. Verify production compilation and type checks
npm run build
```

---

## 4. Legal Data Curation & Statutory Standards

The integrity of statutory content on Nyayota is paramount. When submitting, editing, or digitizing legal provisions, you must adhere to these standards:

### 4.1 Primary Source Grounding
Every statute or section added must originate from an authoritative primary publisher:
- **Domestic Bangladesh Law:** Legislative and Parliamentary Affairs Division, Ministry of Law, Justice and Parliamentary Affairs ([Laws of Bangladesh](http://bdlaws.minlaw.gov.bd) or [The Bangladesh Code](https://bdcode.gov.bd)).
- **Official Gazettes:** *The Bangladesh Gazette Extraordinary*.
- **International Treaties:** Office of Legal Affairs, United Nations (*United Nations Treaty Series — UNTS*).

### 4.2 Required Metadata Fields
When adding records to `lib/bdcode-data/*` or `lib/legal-data.ts`, provide:
- `id`: Unique kebab-case slug (e.g., `bd-penal-code-1860`).
- `title` & `titleBn`: Official statutory title in English and Bengali.
- `actNumber`: Exact legislative designation (e.g., `Act No. XLV of 1860`).
- `enactmentYear`: Year of passage.
- `volumeNumber` & `volumeCitation`: Official volume in *The Bangladesh Code*.
- `sourceUrl`: Direct hyperlink to `bdlaws.minlaw.gov.bd`.
- `officialGazetteCitation`: Gazette date and notification number.
- `lastVerifiedDate`: ISO date when the text was verified against the government portal.

### 4.3 Editorial & Translation Boundaries
- **Statutory Text (`content` / `contentBn`):** Must be a faithful transcription of the official Gazette / Bangladesh Code text. Do not modernize archaic statutory language in the primary text field.
- **Educational Summaries (`simpleExplanation` / `explainLike15`):** Clear, objective, non-jargon explanations designed for everyday citizens.
- **No Copyright Infringement:** Never copy headnotes, commentaries, case digests, or annotations from commercial legal publishers, textbooks, or proprietary subscription databases.

### 4.4 Data Integrity vs. Statutory Authenticity
- Nyayota computes SHA-256 hashes (`checksumSha256`) of local statutory JSON data structures. This is a software engineering mechanism to detect accidental repository drift or transmission corruption.
- Contributors and users must understand that SHA-256 integrity does **not** substitute for official government authentication. Authoritative legal validity rests exclusively with *The Bangladesh Gazette Extraordinary* and the official Acts published by the Government of Bangladesh.

---

## 5. Security & Privacy Rules

- **Zero Telemetry:** Do not introduce third-party trackers, analytics pixels, or external tracking cookies. User notes and bookmarks must remain strictly client-side in `localStorage`.
- **Server-Side API Key Isolation:** Any interaction with external AI APIs (`@google/genai`) must occur exclusively in server-side Next.js route handlers (`app/api/*`). Never prefix API keys with `NEXT_PUBLIC_`.
- **Never Commit Secrets:** Do not commit `.env`, `.env.local`, or any private API keys into Git.
- **Input Sanitization:** Ensure all user inputs undergo size caps (e.g. 1,500 char query limit), rate limiting, and strict type validation.

---

## 6. Pull Request Guidelines

1. **Create a focused branch:**
   ```bash
   git checkout -b feature/expand-cyber-security-sections
   # or
   git checkout -b fix/crpc-section-54-bengali-title
   ```
2. **Commit messages:** Write clear, imperative commit messages (e.g., `feat(bdcode): add sections 154 and 167 to crpc-1898`).
3. **Open a PR:** Open a Pull Request targeting the `main` branch. Provide:
   - A clear summary of what was added or fixed.
   - Primary source citations (`bdlaws.minlaw.gov.bd` links or Gazette references).
   - Confirmation that `bun test`, `npm run lint`, and `npm run build` pass without warnings.

---

## 7. Questions and Feedback

For editorial questions, bug reports, or partnership proposals, open an issue on GitHub or reach out to maintainers at **`nyayota.contact@gmail.com`**.
