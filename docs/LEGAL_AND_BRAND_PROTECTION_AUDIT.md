# Nyayota Legal, Intellectual Property & Brand Protection Audit

**Document Version:** 1.0.0 (Phase 3 Audit & Strategic Blueprint)  
**Date:** March 2026  
**Auditor:** Senior Software Architect, Legal-Tech Engineer & IP Systems Auditor  
**Repository:** [github.com/afnan0356/nyayota](https://github.com/afnan0356/nyayota)  
**Target Platform:** Nyayota — Bangladesh Open Legal Knowledge Platform  

---

## Executive Summary

Nyayota is an open-access legal information, research, and navigation engine designed to make Bangladesh codified legislation, constitutional jurisprudence, procedural codes, and international multilateral treaties searchable, comparable, and understandable.

As Nyayota transitions from a high-quality frontend repository to a production-grade, authoritative public resource and introduces deterministic, source-grounded retrieval capabilities (Nyayota AI), protecting the platform's intellectual property, brand reputation, and user trust is vital. 

This audit assesses:
1. The legal implications of the current root **MIT License**.
2. Risks of unauthorized commercial repackaging, proprietary closed-source hoarding, and misleading predatory "clones".
3. The legal boundary between public-domain primary statutory texts and original curated editorial works.
4. Proposed licensing and brand protection frameworks (dual-licensing and source-available alternatives).
5. Comprehensive brand protection, trademark, anti-impersonation, and editorial authenticity rules.
6. Privacy, data governance, and liability limitation policies.

---

## 1. Analysis of the Current MIT License

The repository's root `LICENSE` file currently contains the standard 1988 MIT License text:
- **Copyright Holder:** Copyright &copy; 2026 Md. Afnan
- **Core Grant:** "Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software..."

### Legal Strengths
- **Simplicity & Trust:** Developers and open-source advocates recognize the MIT License immediately. It attracts academic contributors, civic tech developers, and student contributors without legal friction.
- **Robust Disclaimer of Warranty:** Lines 15–21 provide a battle-tested liability disclaimer stating the software is provided "AS IS", without warranty of merchantability, fitness for a particular purpose, or non-infringement.

### Critical Vulnerabilities & Strategic Risks Under Pure MIT
1. **Unrestricted Commercial Sublicensing:** Any commercial entity or predatory platform can clone Nyayota, put it behind an expensive paywall, remove all mention of Nyayota's community mission, and sell public legal information back to vulnerable citizens.
2. **Proprietary Enclosure of Curated Datasets:** While the raw text of an Act passed by Parliament is in the public domain, Nyayota's bespoke database structures, plain-language explanations ("Explain Like I'm 15"), procedural roadmaps, and cross-references represent hundreds of hours of editorial synthesis. Under MIT, an enterprise could scrape or copy this structured dataset and incorporate it into closed proprietary software without contributing back.
3. **No Trademark or Brand Protection Grant Boundary:** The MIT text does not explicitly reserve trademark, trade name, or logo rights. A competitor could host a fork named "Nyayota Pro" or "Nyayota Official Bangladesh Legal Aid" and mislead the public into believing it is an official government service.

> **Crucial Legal Finding on Existing Commits:**  
> Code and commits already published to public repositories under the MIT license cannot be retroactively revoked for those specific historical commits. However, **future original releases, new major modules (such as the deterministic Nyayota AI engine), and curated proprietary database compilations can be released under an updated, source-available or protective license.**

---

## 2. Distinction: Public Domain Primary Texts vs. Curated Proprietary Works

A clear legal boundary must be drawn between the non-copyrightable primary law and Nyayota's copyrightable original intellectual property:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        LEGAL DATA CLASSIFICATION                       │
├─────────────────────────────────────────┬──────────────────────────────┤
│ PRIMARY STATUTORY INSTRUMENTS           │ CURATED ORIGINAL INTELLECTUAL│
│ (Public Domain / Government Works)      │ PROPERTY (Nyayota Original)  │
├─────────────────────────────────────────┼──────────────────────────────┤
│ • Official Acts of Parliament           │ • Bespoke TypeScript Schema  │
│ • Ordinances & President's Orders       │ • "Explain Like I'm 15" text │
│ • Bangladesh Gazette Notifications      │ • Procedural Citizen Guides  │
│ • Verbatim statutory sections           │ • Curated Cross-References   │
│ • International Treaty Texts (UNTS)     │ • Bilingual Terminology Map  │
│ • Authentic Gazette Numbers & Dates     │ • Cryptographic Hashes & IDs │
│ • Official Bengali Law Translations     │ • UI Design & Custom Engines │
└─────────────────────────────────────────┴──────────────────────────────┘
```

### Statutory Basis:
- **Section 24 & Section 72, The Copyright Act, 2000 (Bangladesh / আইন নং ২৮, ২০০০):** Acts of Parliament, government reports, judicial decisions, and official gazette notifications are published under the authority of the government. Reproduction of legislative texts for educational, research, fair dealing, or public informative purposes does not infringe copyright.
- **Fair Dealing Exemption:** Providing public access to enacted statutory law is a constitutional and fundamental rule of law safeguard. No party can claim exclusive proprietary copyright over the verbatim text of Section 302 of the Penal Code or Article 27 of the Constitution.
- **Database & Compilation Rights:** However, the **selection, arrangement, coordination, plain-language interpretation, and structured adaptation** of these statutes into a cohesive software architecture constitute an original compilation protected under copyright law.

---

## 3. Recommended Intellectual Property Protection Strategies

To prevent commercial exploitation and misleading forks while keeping Nyayota freely accessible to citizens, students, and non-profit researchers, we recommend evaluating the following licensing models:

### Option A: Dual-Licensing (Recommended for Long-Term Sustainability)
- **Open / Non-Commercial Layer (Free):** Released under **Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)** for the curated editorial text/datasets, and **AGPLv3** or **PolyForm Noncommercial 1.0.0** for the underlying engine and AI modules.
- **Commercial Exception License (Paid / Authorized):** Commercial entities, legal tech corporations, or law firms wishing to integrate Nyayota's curated API or database into commercial SaaS tools must obtain an explicit commercial license agreement from the copyright owner (Md. Afnan).

### Option B: Permissive Code + Protective Content (Source-Available Split)
- **Repository Code (UI, Components, Utilities):** Remains under the current **MIT License** to foster broad developer adoption and educational study.
- **Curated Editorial Corpora (`/lib/bdcode-data/`, `/lib/legal-data.ts`, `/lib/nyayota-ai/`):** Explicitly declared under a **Nyayota Content License (Source-Available, Non-Commercial with Required Attribution)**.

### Option C: Business Source License (BSL 1.1)
- Code is source-available and free for non-production / non-commercial usage, with a change date (e.g. 3 years) after which each release converts automatically to MIT or Apache 2.0.

---

## 4. Brand Protection & Trademark Policy

To protect the integrity of Nyayota and prevent fraudulent legal services from exploiting the project's reputation, the following Trademark & Brand Guidelines should be formally established:

### Brand Assets
- **Name:** "Nyayota", "Nyayota AI", "ন্যায়তা"
- **Domain:** `nyayota.vercel.app` (and any future registered apex domains e.g., `nyayota.org`, `nyayota.com.bd`)
- **Logo & Identity:** The balance scales / equity seal, typography, and visual branding.

### Permitted Uses
1. Referring truthfully to the Nyayota platform in academic papers, legal publications, curriculum guides, and news reporting.
2. Linking directly to Nyayota URLs (`https://nyayota.vercel.app/...`).
3. Running an unmodified private personal development instance locally.

### Prohibited Uses Without Prior Written Authorization
1. Using "Nyayota" or confusingly similar phonetic equivalents in the title of any commercial service, product, domain name, or application.
2. Promoting a modified fork as an "Official Nyayota" release.
3. Making any representation or claiming an endorsement that Nyayota is a government body, court, law firm, or authorized advocate service.
4. Using Nyayota's visual branding or trade dress to solicit money, legal fees, or confidential client disclosures.

---

## 5. Contact, Governance & Vulnerability Disclosure

- **Official Project Email:** `nyayota.contact@gmail.com`
- **Maintainer & Copyright Holder:** Md. Afnan
- **Error & Typo Reporting Policy:** Any citizen, researcher, advocate, or judge who identifies a discrepancy between Nyayota's statutory text and the official *Bangladesh Gazette* can submit a correction to `nyayota.contact@gmail.com`. Corrections are reviewed against certified gazettes and deployed with transparent version logs.
- **Security Vulnerability Disclosure:** Security concerns should be reported directly via email rather than public issue trackers to ensure timely mitigation.

---

## 6. Privacy & Data Ethics Compliance

Nyayota operates on a **zero-telemetry, zero-surveillance** principle:
1. **Client-Side Persistence:** Bookmarks, personal notes, search history, and theme settings are stored exclusively in the user's browser `localStorage`.
2. **No User Tracking:** Nyayota does not deploy invasive tracking scripts, commercial ad pixels, or third-party behavioral profiling.
3. **No Attorney-Client Privilege Infiltration:** The platform does not solicit confidential case files, national identity numbers, passport records, or litigation case secrets.

---

## 7. Proposed Updated LICENSE Notice (For Future Evaluation)

*Note: In accordance with project instructions, the existing root `LICENSE` file has NOT been modified during Phase 3. The following draft represents the recommended legal text for future adoption upon maintainer review:*

```text
Nyayota Open Source & Content License
Copyright (c) 2026 Md. Afnan. All Rights Reserved.

Platform Software Engine:
The software source code (Next.js components, layout, styling, and application logic)
is provided under the terms of the MIT License.

Curated Content & Legal Intelligence Database:
The original plain-language summaries ("Explain Like I'm 15"), procedural guides,
curated cross-references, bilingual term mapping, and Nyayota AI deterministic routing
logic are proprietary editorial works protected by copyright. They are made available
for non-commercial, educational, academic, and personal research purposes only,
subject to the condition of clear, visible attribution to "Nyayota (https://nyayota.vercel.app)".

Commercial exploitation, paid redistribution, or creation of closed-source proprietary
clones of Nyayota's curated legal database without express written permission is prohibited.

Trademarks:
"Nyayota", "Nyayota AI", and the Nyayota logos are trademarks of Md. Afnan.
No license to use these trademarks is granted except for fair, truthful attribution.

Disclaimer of Warranty & Legal Representation:
Nyayota is an educational platform, not a law firm or government agency.
All materials are provided "AS IS" without warranty of any kind.
```
