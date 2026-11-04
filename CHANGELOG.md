# Nyayota Platform Changelog

All notable changes to the Nyayota platform are documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased] - 2026-03

### Changed
- **Statutory Data Integrity:** Removed all 11 fabricated SHA-256 strings (`checksumSha256`) from `lib/bdcode-data/constitutional-criminal.ts`.
- **Integrity Status Modernization:** Replaced 70 misleading `fully-verified` labels with honest `source-linked` statuses across all Bangladesh Code statutory records.
- **Data Architecture:** Modernized `IngestionIntegrityStatus` to `'unverified' | 'source-linked' | 'reviewed' | 'independently-verified'`.
- **Source Verification Transparency:** Updated `components/SourceVerificationModal.tsx` to dynamically render authentic status badges and disclaimers instead of a static "Archival Record Verified" banner. Added Escape key listener and background backdrop dismissal.
- **Copyright & Content Rights:** Created `CONTENT-LICENSE.md` with a comprehensive Dataset Rights Register covering Bangladesh statutory corpus, international treaties, and procedural guides. Clarified MIT software boundary vs. curated editorial content.
- **API Security Hardening:** Hardened `app/api/ai-assistant/route.ts`:
  - Enforced trusted `x-vercel-forwarded-for` IP extraction with IPv4/IPv6 port stripping and bracket parsing.
  - Implemented true byte-level body size measurement rejecting >32KB payloads with HTTP 413.
  - Strictly rejected client-supplied `role: 'system'` messages.
  - Enforced strict length limits on `lawContext` fields.
  - Preserved backward-compatible response interface while strictly maintaining public 503 suspension.
- **Next.js & Security Headers:** Cleaned `next.config.ts` by removing wildcard `run.app` from CSP `frame-ancestors`, removing unused `picsum.photos` remotePattern, and enabling ESLint during production builds.
- **Package Configuration:** Renamed package to `nyayota` in `package.json`, aligned dependencies, added `npm run typecheck` script, added `engines`, and pinned `packageManager: "bun@1.4.4"`.
- **Storage Resilience:** Wrapped all `localStorage` writes in `lib/research.ts` with try/catch blocks to gracefully handle quota errors and private browsing modes.
- **UI Robustness:** Added root `app/error.tsx` error boundary and accessible `app/loading.tsx` spinner.
- **Bengali Typography:** Added Bengali font fallbacks (`Hind Siliguri`, `Kalpurush`, `SolaimanLipi`, `Noto Sans Bengali`) in `app/globals.css`.
- **Sitemap Refinement:** Removed suspended `/ai-assistant` route from `app/sitemap.ts` without inventing publication dates.
- **Test Suite Expansion:** Added `tests/nyayota-security-remediation.test.ts` bringing total test suite to 299 tests across 13 test files (0 failures).

---

## [0.8.0] - Phase 8: Streaming Architecture & Benchmark Evaluation
- Implemented SSE streaming response engine (`lib/nyayota-ai/streaming-response-engine.ts`).
- Added stream chunk parser with XML boundary safeguards (`lib/nyayota-ai/stream-parser.ts`).
- Added comprehensive AI performance benchmark script (`scripts/benchmark-ai.ts`).
- Preserved strict HTTP 503 public assistant suspension pending live model launch.

## [0.7.0] - Phase 7: Deterministic Retrieval & Caching Optimizations
- Implemented deterministic legal provision indexer and in-memory cache.
- Added Bengali numeral normalization (`১, ২, ৩` <-> `1, 2, 3`).
- Refined source-grounded prompt engineering with strict statute boundaries.

## [0.6.0] - Phase 6: Natural Conversational Response Engine
- Implemented natural response generator powered by Google GenAI SDK.
- Implemented multi-turn conversational reasoning, follow-ups, and analogies.
- Built context tracker and reference resolver for legal dialogues.

## [0.5.0] - Phase 5: Civic Information, Outcomes & Transparency
- Built citizen Legal Outcome Guides for bail, arrest rights, FIR, and disputes.
- Built bilingual legal glossary with Bengali definitions and Latin doctrines.
- Built comparative statute analysis matrix.
- Structured voluntary donation transparency roadmap.
