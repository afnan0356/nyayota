# Nyayota Content Rights, Copyright & Dataset Register

**Project:** Nyayota — Civic Legal Knowledge & Statutory Research Platform  
**Document Version:** 1.0.0  
**Date:** March 2026  
**Maintainer:** Md. Afnan (`nyayota.contact@gmail.com`)  
**Repository:** [github.com/afnan0356/nyayota](https://github.com/afnan0356/nyayota)  
**Software License:** MIT License (Applies exclusively to platform source code, software architecture, UI components, and scripts)

---

## 1. Scope & Separation of Intellectual Property

Nyayota distinguishes strictly between:
1. **Software Engine & Code (MIT License):** All Next.js source code, React components, Tailwind styling, utility libraries, algorithms, and automated test suites in this repository are licensed under the permissive [MIT License](LICENSE).
2. **Editorial Content, Explanations & Curated Annotations:** Plain-language educational summaries ("Explain Like I'm 15"), procedural guidance workflows, comparative alignments, curated cross-references, and bilingual concept mappings created by Nyayota contributors are original works. They are made available for non-commercial educational, civic, and academic research purposes with required attribution.
3. **Primary Statutory & Treaty Texts:** Primary legislative instruments (Acts of Parliament, Presidential Orders, Ordinances, Gazette Notifications, UN Treaties) originated from public governments and international bodies. No claim of proprietary monopoly is made over verbatim legislative enactments.
4. **Trademarks & Brand Identity:** The names "Nyayota", "Nyayota AI", "ন্যায়তা", and platform logos are trademarks and are not licensed under the MIT license.

---

## 2. Dataset Rights Register

The following register documents the rights status, source repositories, publication authorities, reproduction terms, and legal review statuses for every statutory and treaty dataset curated in Nyayota.

| Field | Register Specification |
|---|---|
| **Collection** | Specific dataset or sub-corpus name |
| **Source URL** | Canonical digital repository hyperlink |
| **Original Rights Holder** | Originating sovereign state, parliament, or international organization |
| **Publishing Authority** | Official department, press, or treaty depository |
| **Publication Date** | Enactment or official publication date range |
| **Permission / License Basis** | Legal framework governing access and reproduction |
| **Translation Ownership** | Ownership status of English/Bengali versions |
| **Reproduction Restrictions** | Commercial, attribution, or integrity limitations |
| **Review Status** | Independent legal review classification |
| **Outstanding Questions** | Open questions requiring professional legal verification |

---

### Dataset 1: Bangladesh Statutory Corpus (The Bangladesh Code & Laws of Bangladesh)

- **Collection:** Bangladesh Code Enactments (1836 – Present) (`lib/bdcode-data/*.ts`, `lib/bdcode-catalog.ts`)
- **Source URL:** [http://bdlaws.minlaw.gov.bd](http://bdlaws.minlaw.gov.bd) and [https://bdcode.gov.bd](https://bdcode.gov.bd)
- **Original Rights Holder:** People's Republic of Bangladesh / Sovereign legislative bodies of historic eras (British Indian Legislature, East Pakistan Legislature, Jatiya Sangsad)
- **Publishing Authority:** Legislative and Parliamentary Affairs Division, Ministry of Law, Justice and Parliamentary Affairs, Government of the People's Republic of Bangladesh; printed officially by the Bangladesh Government Press (BG Press).
- **Publication Date:** 1836 to 2026 (Continuous official publication).
- **Permission / License Basis:** Section 24 and Section 72 of the Copyright Act, 2000 (Act No. XXVIII of 2000) of Bangladesh provide that the reproduction or publication of any Act of Parliament or government reports does not constitute infringement of copyright when published for educational, informational, or judicial reference.
- **Translation Ownership:** Official Bengali texts and historical English texts published in the official *Bangladesh Gazette* are official state instruments. Where Nyayota provides supplemental plain-language summaries or terminology clarifications, copyright in those editorial texts belongs to the Nyayota project contributors.
- **Reproduction Restrictions:** Verbatim primary texts must not be misleadingly altered or falsely attributed. The official disclaimer must clarify that digital mirrors do not substitute for certified court copies issued by the Bangladesh Government Press.
- **Review Status:** `Source-Linked (Digital Repository Verified) — Requires formal legal review on database compilation rights`.
- **Outstanding Questions:** Confirmation of the application of database compilation protections under Bangladesh copyright jurisprudence for structured JSON/TypeScript adaptations of public statutes.

---

### Dataset 2: International Multilateral Treaties & Conventions

- **Collection:** International Humanitarian, Human Rights & Multilateral Treaties (`lib/international-law-data.ts`)
- **Source URL:** [https://treaties.un.org](https://treaties.un.org) (United Nations Treaty Series / UNTS)
- **Original Rights Holder:** Signatory sovereign member states and the United Nations General Assembly / Diplomatic Conferences.
- **Publishing Authority:** Treaty Section of the Office of Legal Affairs, United Nations Secretariat, New York / Geneva; International Committee of the Red Cross (ICRC).
- **Publication Date:** 1945 to 2026.
- **Permission / License Basis:** United Nations regulations and publications policy permit the dissemination and reproduction of official treaty texts for research, educational, and public information purposes (UN General Assembly resolutions on public access to UNTS).
- **Translation Ownership:** Official treaty languages (English, French, Arabic, Chinese, Russian, Spanish) are authentic texts deposited with the UN Secretary-General. Bengali translations provided for educational context are unofficial reference translations unless adopted by Bangladesh through domestic legislation.
- **Reproduction Restrictions:** Must acknowledge official UNTS citation numbers (e.g., `UNTS Vol. 999, p. 171`). No commercial distortion or claim of UN endorsement.
- **Review Status:** `Source-Linked (UNTS Verified) — Requires formal legal review on translation notice standards`.
- **Outstanding Questions:** Harmonization of UN publication copyright terms with local domestic educational fair use frameworks.

---

### Dataset 3: Citizen Procedural Guidance & Workflows

- **Collection:** Legal Outcome Guides & Citizen Action Paths (`app/legal-outcome-guide/page.tsx`, `lib/legal-database-engine.ts`)
- **Source URL:** Original synthesis compiled from the Code of Criminal Procedure (1898), Police Regulations of Bengal (PRB 1943), and Supreme Court of Bangladesh directives.
- **Original Rights Holder:** Nyayota Project (Original synthesis and educational flow diagrams).
- **Publishing Authority:** Nyayota Project Maintainers.
- **Publication Date:** 2026.
- **Permission / License Basis:** Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0) for editorial workflows; MIT for associated interactive code.
- **Translation Ownership:** Nyayota Project Contributors.
- **Reproduction Restrictions:** Non-commercial educational usage permitted with clear attribution to Nyayota (`https://nyayota.vercel.app`). Commercial resale or paywalled distribution is prohibited without prior written consent.
- **Review Status:** `Editorial Work — Requires ongoing review by certified Bangladesh legal practitioners`.
- **Outstanding Questions:** Regular review required whenever statutory procedural amendments or High Court Division circulars are issued.

---

## 3. Policy on Commercial Ingestion & Scraping

1. **Academic and Civic Use:** Non-profit educational institutions, legal aid clinics, law students, and civic technologists are encouraged to study, link to, and reference Nyayota's research collections freely.
2. **Commercial Exploitation:** Entities seeking to scrape, package, or incorporate Nyayota's curated datasets, "Explain Like I'm 15" syntheses, or AI contextual knowledge graphs into fee-charging commercial services must obtain express written authorization from the maintainer (`nyayota.contact@gmail.com`).
3. **No Legal Certification:** Nyayota is not a legal publisher authorized by the Ministry of Law, Justice and Parliamentary Affairs. Any publication derived from this repository must include a prominent notice stating that the text is an educational mirror and does not constitute certified primary evidence in judicial proceedings.
