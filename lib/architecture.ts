/**
 * Nyayota Scalable Legal Content Architecture & Platform Foundation
 * 
 * Prepares the platform for long-term growth across thousands of statutes,
 * multi-jurisdictional expansion, multilingual interfaces, standardized legal taxonomy,
 * amendment tracking histories, and structured concept relational graphs.
 */

// ============================================================================
// 1. MULTILINGUAL INFRASTRUCTURE
// ============================================================================

export type SupportedLanguage =
  | 'en' // English (Primary)
  | 'bn' // Bengali / বাংলা (Primary Regional)
  | 'es' // Spanish / Español (Planned Phase 2)
  | 'fr' // French / Français (Planned Phase 2)
  | 'de' // German / Deutsch (Planned Phase 2)
  | 'ja' // Japanese / 日本語 (Planned Phase 3)
  | 'ko' // Korean / 한국어 (Planned Phase 3)
  | 'ar' // Arabic / العربية (Planned Phase 3)
  | 'zh' // Chinese / 中文 (Planned Phase 3)
  | 'nl'; // Dutch / Nederlands (Planned Phase 3)

export interface LanguageMeta {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  direction: 'ltr' | 'rtl';
  status: 'active' | 'preview' | 'planned';
  supportedFeatures: {
    statuteTitles: boolean;
    sectionTranslations: boolean;
    glossaryTerms: boolean;
    aiSyntheses: boolean;
  };
}

export const LANGUAGE_REGISTRY: Record<SupportedLanguage, LanguageMeta> = {
  en: {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    direction: 'ltr',
    status: 'active',
    supportedFeatures: {
      statuteTitles: true,
      sectionTranslations: true,
      glossaryTerms: true,
      aiSyntheses: true,
    },
  },
  bn: {
    code: 'bn',
    name: 'Bengali',
    nativeName: 'বাংলা',
    direction: 'ltr',
    status: 'active',
    supportedFeatures: {
      statuteTitles: true,
      sectionTranslations: true,
      glossaryTerms: true,
      aiSyntheses: true,
    },
  },
  es: {
    code: 'es',
    name: 'Spanish',
    nativeName: 'Español',
    direction: 'ltr',
    status: 'preview',
    supportedFeatures: {
      statuteTitles: true,
      sectionTranslations: false,
      glossaryTerms: true,
      aiSyntheses: false,
    },
  },
  fr: {
    code: 'fr',
    name: 'French',
    nativeName: 'Français',
    direction: 'ltr',
    status: 'preview',
    supportedFeatures: {
      statuteTitles: true,
      sectionTranslations: false,
      glossaryTerms: true,
      aiSyntheses: false,
    },
  },
  de: {
    code: 'de',
    name: 'German',
    nativeName: 'Deutsch',
    direction: 'ltr',
    status: 'planned',
    supportedFeatures: {
      statuteTitles: false,
      sectionTranslations: false,
      glossaryTerms: false,
      aiSyntheses: false,
    },
  },
  ja: {
    code: 'ja',
    name: 'Japanese',
    nativeName: '日本語',
    direction: 'ltr',
    status: 'planned',
    supportedFeatures: {
      statuteTitles: false,
      sectionTranslations: false,
      glossaryTerms: false,
      aiSyntheses: false,
    },
  },
  ko: {
    code: 'ko',
    name: 'Korean',
    nativeName: '한국어',
    direction: 'ltr',
    status: 'planned',
    supportedFeatures: {
      statuteTitles: false,
      sectionTranslations: false,
      glossaryTerms: false,
      aiSyntheses: false,
    },
  },
  ar: {
    code: 'ar',
    name: 'Arabic',
    nativeName: 'العربية',
    direction: 'rtl',
    status: 'planned',
    supportedFeatures: {
      statuteTitles: false,
      sectionTranslations: false,
      glossaryTerms: false,
      aiSyntheses: false,
    },
  },
  zh: {
    code: 'zh',
    name: 'Chinese',
    nativeName: '中文',
    direction: 'ltr',
    status: 'planned',
    supportedFeatures: {
      statuteTitles: false,
      sectionTranslations: false,
      glossaryTerms: false,
      aiSyntheses: false,
    },
  },
  nl: {
    code: 'nl',
    name: 'Dutch',
    nativeName: 'Nederlands',
    direction: 'ltr',
    status: 'planned',
    supportedFeatures: {
      statuteTitles: false,
      sectionTranslations: false,
      glossaryTerms: false,
      aiSyntheses: false,
    },
  },
};

export interface MultilingualText {
  en: string;
  bn?: string;
  es?: string;
  fr?: string;
  de?: string;
  ja?: string;
  ko?: string;
  ar?: string;
  zh?: string;
  nl?: string;
}

/**
 * Helper to retrieve localized text with reliable fallback to English
 */
export function getLocalizedText(
  field: MultilingualText | string | undefined,
  lang: SupportedLanguage = 'en'
): string {
  if (!field) return '';
  if (typeof field === 'string') return field;
  return field[lang] || field.en || Object.values(field)[0] || '';
}

// ============================================================================
// 2. STANDARDIZED JURISDICTION TAXONOMY & REGISTRY
// ============================================================================

export type StandardJurisdictionCode =
  | 'BD'  // Bangladesh
  | 'INT' // International / Multilateral Treaties
  | 'US'  // United States
  | 'UK'  // United Kingdom
  | 'EU'  // European Union
  | 'IN'  // India
  | 'DE'  // Germany
  | 'FR'  // France
  | 'JP'  // Japan
  | 'KR'  // South Korea
  | 'AE'; // United Arab Emirates

export type LegalSystemType =
  | 'Common Law'
  | 'Civil Law'
  | 'Public International Law'
  | 'Islamic / Civil Hybrid'
  | 'Mixed Common & Customary';

export interface JurisdictionMetadata {
  code: StandardJurisdictionCode;
  name: string;
  nameBn: string;
  system: LegalSystemType;
  apexCourt: string;
  officialGazette: string;
  status: 'active' | 'in-development' | 'planned';
  flagEmoji: string;
  totalStatutesCount: number;
}

export const JURISDICTION_REGISTRY: Record<StandardJurisdictionCode, JurisdictionMetadata> = {
  BD: {
    code: 'BD',
    name: 'Bangladesh',
    nameBn: 'বাংলাদেশ',
    system: 'Common Law',
    apexCourt: 'Supreme Court of Bangladesh (Appellate Division & High Court Division)',
    officialGazette: 'The Bangladesh Gazette (Laws of Bangladesh Repository)',
    status: 'active',
    flagEmoji: '🇧🇩',
    totalStatutesCount: 12,
  },
  INT: {
    code: 'INT',
    name: 'International Conventions',
    nameBn: 'আন্তর্জাতিক কনভেনশন',
    system: 'Public International Law',
    apexCourt: 'International Court of Justice (ICJ) & International Criminal Court (ICC)',
    officialGazette: 'United Nations Treaty Series (UNTS) & ICRC Repositories',
    status: 'active',
    flagEmoji: '🌐',
    totalStatutesCount: 8,
  },
  US: {
    code: 'US',
    name: 'United States',
    nameBn: 'মার্কিন যুক্তরাষ্ট্র',
    system: 'Common Law',
    apexCourt: 'Supreme Court of the United States (SCOTUS)',
    officialGazette: 'United States Code (U.S.C.) & Federal Register',
    status: 'in-development',
    flagEmoji: '🇺🇸',
    totalStatutesCount: 0,
  },
  UK: {
    code: 'UK',
    name: 'United Kingdom',
    nameBn: 'যুক্তরাজ্য',
    system: 'Common Law',
    apexCourt: 'Supreme Court of the United Kingdom',
    officialGazette: 'The National Archives (legislation.gov.uk)',
    status: 'in-development',
    flagEmoji: '🇬🇧',
    totalStatutesCount: 0,
  },
  EU: {
    code: 'EU',
    name: 'European Union',
    nameBn: 'ইউরোপীয় ইউনিয়ন',
    system: 'Civil Law',
    apexCourt: 'Court of Justice of the European Union (CJEU)',
    officialGazette: 'Official Journal of the European Union (EUR-Lex)',
    status: 'in-development',
    flagEmoji: '🇪🇺',
    totalStatutesCount: 0,
  },
  IN: {
    code: 'IN',
    name: 'India',
    nameBn: 'ভারত',
    system: 'Common Law',
    apexCourt: 'Supreme Court of India',
    officialGazette: 'India Code Digital Repository',
    status: 'planned',
    flagEmoji: '🇮🇳',
    totalStatutesCount: 0,
  },
  DE: {
    code: 'DE',
    name: 'Germany',
    nameBn: 'জার্মানি',
    system: 'Civil Law',
    apexCourt: 'Federal Constitutional Court (Bundesverfassungsgericht)',
    officialGazette: 'Bundesgesetzblatt (BGB & Grundgesetz)',
    status: 'planned',
    flagEmoji: '🇩🇪',
    totalStatutesCount: 0,
  },
  FR: {
    code: 'FR',
    name: 'France',
    nameBn: 'ফ্রান্স',
    system: 'Civil Law',
    apexCourt: 'Court of Cassation & Constitutional Council',
    officialGazette: 'Légifrance (Code Civil)',
    status: 'planned',
    flagEmoji: '🇫🇷',
    totalStatutesCount: 0,
  },
  JP: {
    code: 'JP',
    name: 'Japan',
    nameBn: 'জাপান',
    system: 'Civil Law',
    apexCourt: 'Supreme Court of Japan',
    officialGazette: 'Japanese Law Translation & Six Codes (Roppō)',
    status: 'planned',
    flagEmoji: '🇯🇵',
    totalStatutesCount: 0,
  },
  KR: {
    code: 'KR',
    name: 'South Korea',
    nameBn: 'দক্ষিণ কোরিয়া',
    system: 'Civil Law',
    apexCourt: 'Constitutional Court of Korea & Supreme Court',
    officialGazette: 'Korea Legislation Research Institute',
    status: 'planned',
    flagEmoji: '🇰🇷',
    totalStatutesCount: 0,
  },
  AE: {
    code: 'AE',
    name: 'United Arab Emirates',
    nameBn: 'সংযুক্ত আরব আমিরাত',
    system: 'Islamic / Civil Hybrid',
    apexCourt: 'Federal Supreme Court of the UAE',
    officialGazette: 'UAE Federal Legislation Portal',
    status: 'planned',
    flagEmoji: '🇦🇪',
    totalStatutesCount: 0,
  },
};

// ============================================================================
// 3. STANDARDIZED LEGAL TAXONOMY & CATEGORY REGISTRY
// ============================================================================

export interface StandardTaxonomyCategory {
  id: string;
  slug: string;
  canonicalName: string;
  nameBn: string;
  scopeSummary: string;
  subcategories: string[];
  primaryJurisdictionFilter: 'BD' | 'INT' | 'All';
  icon: string;
}

export const STANDARDIZED_TAXONOMY: StandardTaxonomyCategory[] = [
  {
    id: 'criminal-law',
    slug: 'criminal-law',
    canonicalName: 'Criminal & Penal Law',
    nameBn: 'ফৌজদারি ও দণ্ডবিধি আইন',
    scopeSummary: 'Codified crimes, offenses against body and property, intent doctrine (Mens Rea), and punitive measures.',
    subcategories: ['Offenses Against Person', 'Property Crimes', 'State Security', 'Conspiracy & Joint Liability', 'Defamation'],
    primaryJurisdictionFilter: 'All',
    icon: 'Shield',
  },
  {
    id: 'constitutional-law',
    slug: 'constitutional-law',
    canonicalName: 'Constitutional & Fundamental Rights',
    nameBn: 'সাংবিধানিক ও মৌলিক অধিকার আইন',
    scopeSummary: 'Supreme governance charter, bill of fundamental rights, judicial review, separation of powers, and writ remedies.',
    subcategories: ['Fundamental Rights', 'Writ Petitions (Art. 102)', 'Directive Principles', 'Judicial Independence', 'Emergency Provisions'],
    primaryJurisdictionFilter: 'BD',
    icon: 'Scale',
  },
  {
    id: 'human-rights',
    slug: 'human-rights',
    canonicalName: 'International Human Rights Law',
    nameBn: 'আন্তর্জাতিক মানবাধিকার আইন',
    scopeSummary: 'Universal declarations, multilateral civil, political, economic covenants, anti-torture baselines, and freedom of expression.',
    subcategories: ['Universal Declarations (UDHR)', 'Civil & Political Rights (ICCPR)', 'Torture Prohibition (CAT)', 'Children Rights (CRC)'],
    primaryJurisdictionFilter: 'INT',
    icon: 'Globe',
  },
  {
    id: 'cyber-digital',
    slug: 'cyber-digital',
    canonicalName: 'Cyber, Digital & Data Security Law',
    nameBn: 'সাইবার, ডিজিটাল ও তথ্যপ্রযুক্তি আইন',
    scopeSummary: 'Critical information infrastructure, digital impersonation, unauthorized access, online extortion, and digital forensics.',
    subcategories: ['Hacking & Data Theft', 'Digital Defamation & Blackmail', 'Critical Infrastructure', 'Online Financial Fraud'],
    primaryJurisdictionFilter: 'BD',
    icon: 'Sparkles',
  },
  {
    id: 'labor-employment',
    slug: 'labor-employment',
    canonicalName: 'Labor, Workplace & Employment Law',
    nameBn: 'শ্রম, কর্মক্ষেত্র ও কর্মসংস্থান আইন',
    scopeSummary: 'Working hour ceilings, overtime formulas, workplace occupational safety, maternity leave, and collective bargaining.',
    subcategories: ['Occupational Safety', 'Working Hours & Leave', 'Maternity Benefits', 'Trade Unions & ADR', 'Termination & Severance'],
    primaryJurisdictionFilter: 'BD',
    icon: 'Layers',
  },
  {
    id: 'commercial-contract',
    slug: 'commercial-contract',
    canonicalName: 'Commercial, Contract & Maritime Law',
    nameBn: 'বাণিজ্যিক, চুক্তি ও সমুদ্র আইন',
    scopeSummary: 'Formation of valid contracts, breach damages, cross-border sales of goods (CISG), and law of the sea (UNCLOS).',
    subcategories: ['Contract Formation', 'Breach & Liquidated Damages', 'Law of the Sea (UNCLOS)', 'International Sale of Goods'],
    primaryJurisdictionFilter: 'All',
    icon: 'Compass',
  },
  {
    id: 'civil-procedure',
    slug: 'civil-procedure',
    canonicalName: 'Civil Procedure & Specific Relief',
    nameBn: 'দেওয়ানি কার্যবিধি ও সুনির্দিষ্ট প্রতিকার',
    scopeSummary: 'Filing plaints, interlocutory injunctions (Order 39), decree executions, limitation timelines, and land recovery suits.',
    subcategories: ['Temporary Injunctions', 'Pleadings & Plaints', 'Execution of Decrees', 'Specific Performance of Contracts'],
    primaryJurisdictionFilter: 'BD',
    icon: 'FileText',
  },
  {
    id: 'family-law',
    slug: 'family-law',
    canonicalName: 'Family, Succession & Personal Law',
    nameBn: 'পারিবারিক ও উত্তরাধিকার আইন',
    scopeSummary: 'Statutory marriage registration, dower enforcement, maintenance claims, dissolution of marriage, and child guardianship.',
    subcategories: ['Marriage & Dower', 'Maintenance & Support', 'Child Custody & Guardianship', 'Inheritance & Succession'],
    primaryJurisdictionFilter: 'BD',
    icon: 'Users',
  },
  {
    id: 'environmental-law',
    slug: 'environmental-law',
    canonicalName: 'Environmental & Climate Protection Law',
    nameBn: 'পরিবেশ ও জলবায়ু সুরক্ষা আইন',
    scopeSummary: 'Pollution control regulations, environmental clearance certificates, ecological zones, and Paris Climate Accords.',
    subcategories: ['Industrial Pollution', 'Ecologically Critical Areas', 'Paris Agreement Accords', 'Environmental Courts'],
    primaryJurisdictionFilter: 'All',
    icon: 'Leaf',
  },
  {
    id: 'international-humanitarian',
    slug: 'international-humanitarian',
    canonicalName: 'International Humanitarian & Geneva Accords',
    nameBn: 'আন্তর্জাতিক মানবিক আইন ও জেনেভা কনভেনশন',
    scopeSummary: 'Protection of civilians in armed conflict, treatment of prisoners of war, medical immunity, and prohibition of war crimes.',
    subcategories: ['Protection of Civilians', 'Prisoners of War (POW)', 'Prohibited Weapons', 'War Crimes Accountability'],
    primaryJurisdictionFilter: 'INT',
    icon: 'Shield',
  },
];

// ============================================================================
// 4. STATUTORY AMENDMENT & REVISION TRACKER MODEL
// ============================================================================

export type AmendmentType =
  | 'Enacted'
  | 'Substituted'
  | 'Inserted'
  | 'Amended'
  | 'Repealed'
  | 'Omitted'
  | 'Judicially Construed';

export interface StatutoryAmendmentRecord {
  id: string;
  lawId: string;
  amendmentActTitle: string;
  amendmentActNumber?: string;
  gazetteNotificationDate: string;
  effectiveDate: string;
  affectedSections: string[];
  changeType: AmendmentType;
  summaryOfModification: string;
  officialGazetteCitation: string;
  sourceVerificationUrl?: string;
}

export const STATUTORY_AMENDMENT_RECORDS: StatutoryAmendmentRecord[] = [
  {
    id: 'amend-csa-2023',
    lawId: 'bd-cyber-security-act-2023',
    amendmentActTitle: 'Cyber Security Act 2023 (Repeal and Replacement of DSA 2018)',
    amendmentActNumber: 'Act No. XXVII of 2023',
    gazetteNotificationDate: '18 September 2023',
    effectiveDate: '18 September 2023',
    affectedSections: ['All Sections'],
    changeType: 'Enacted',
    summaryOfModification: 'Repealed Digital Security Act 2018, converted selected defamation offenses from non-bailable to bailable, and reduced custodial sentence ranges.',
    officialGazetteCitation: 'Bangladesh Gazette Extra-Ordinary, 18 Sept 2023',
    sourceVerificationUrl: 'http://bdlaws.minlaw.gov.bd',
  },
  {
    id: 'amend-labour-2018',
    lawId: 'bd-labour-act-2006',
    amendmentActTitle: 'Bangladesh Labour (Amendment) Act 2018',
    amendmentActNumber: 'Act No. LXV of 2018',
    gazetteNotificationDate: '14 November 2018',
    effectiveDate: '14 November 2018',
    affectedSections: ['Section 45', 'Section 102', 'Section 179'],
    changeType: 'Amended',
    summaryOfModification: 'Enhanced maternity benefit protections, reduced trade union formation signature thresholds from 30% to 20%, and adjusted festival bonus calculations.',
    officialGazetteCitation: 'Bangladesh Gazette Extra-Ordinary, 14 Nov 2018',
    sourceVerificationUrl: 'http://bdlaws.minlaw.gov.bd',
  },
  {
    id: 'amend-crpc-2009',
    lawId: 'bd-crpc-1898',
    amendmentActTitle: 'Code of Criminal Procedure (Amendment) Act 2009',
    amendmentActNumber: 'Act No. XXXII of 2009',
    gazetteNotificationDate: '15 July 2009',
    effectiveDate: '15 July 2009',
    affectedSections: ['Section 6', 'Section 190', 'Section 497'],
    changeType: 'Substituted',
    summaryOfModification: 'Formalized the institutional separation of the Judiciary from the Executive branch in line with the landmark Masdar Hossain ratio.',
    officialGazetteCitation: 'Bangladesh Gazette Extra-Ordinary, 15 July 2009',
    sourceVerificationUrl: 'http://bdlaws.minlaw.gov.bd',
  },
];

// ============================================================================
// 5. LEGAL CONCEPT & DOCTRINE GRAPH ARCHITECTURE
// ============================================================================

export interface ConceptRelationalNode {
  id: string;
  slug: string;
  canonicalName: string;
  nameBn?: string;
  latinMaxim?: string;
  category: string;
  primaryJurisdictionContext: StandardJurisdictionCode;
  doctrinalDefinition: string;
  plainLanguageSummary: string;
  keyPrinciples: string[];
  relatedStatuteIds: string[];
  relatedSectionNumbers: { lawId: string; sectionNumber: string }[];
  connectedConceptIds: string[];
}

export const CONCEPT_RELATIONAL_GRAPH: ConceptRelationalNode[] = [
  {
    id: 'concept-mens-rea',
    slug: 'mens-rea',
    canonicalName: 'Mens Rea (Guilty Mind)',
    nameBn: 'অপরাধমূলক মানসিকতা',
    latinMaxim: 'Actus non facit reum nisi mens sit rea',
    category: 'Criminal Law',
    primaryJurisdictionContext: 'BD',
    doctrinalDefinition: 'The state of mind indicating culpable intention, knowledge, recklessness, or gross negligence required for statutory criminal culpability.',
    plainLanguageSummary: 'A person cannot generally be convicted of a serious crime unless they had the conscious intention to do something unlawful or acted with dangerous recklessness.',
    keyPrinciples: [
      'An act alone does not make a person guilty unless their intention was also guilty.',
      'Distinguishes pure honest accidents from deliberate criminal offenses.',
      'General exceptions (Sec. 76-106 of Penal Code) negate Mens Rea.',
    ],
    relatedStatuteIds: ['bd-penal-code-1860'],
    relatedSectionNumbers: [
      { lawId: 'bd-penal-code-1860', sectionNumber: 'Section 34' },
      { lawId: 'bd-penal-code-1860', sectionNumber: 'Section 299' },
      { lawId: 'bd-penal-code-1860', sectionNumber: 'Section 300' },
    ],
    connectedConceptIds: ['concept-actus-reus', 'concept-private-defence'],
  },
  {
    id: 'concept-habeas-corpus',
    slug: 'habeas-corpus',
    canonicalName: 'Writ of Habeas Corpus',
    nameBn: 'হেবিয়াস কর্পাস রিট',
    latinMaxim: 'Habeas corpus ad subjiciendum',
    category: 'Constitutional Law',
    primaryJurisdictionContext: 'BD',
    doctrinalDefinition: 'A high prerogative judicial writ directing law enforcement to bring a detained individual before the High Court Division to determine whether the detention is lawful.',
    plainLanguageSummary: 'A constitutional emergency order that forces police or state authorities to produce a missing or secretly held person in court immediately.',
    keyPrinciples: [
      'Guaranteed constitutional safeguard against secret or arbitrary police detention under Article 102(2)(b)(i).',
      'Requires presentation before a magistrate within 24 hours of arrest (Article 33).',
      'The detaining authority bears the burden of proving lawful arrest authority.',
    ],
    relatedStatuteIds: ['bd-constitution-1972', 'bd-crpc-1898'],
    relatedSectionNumbers: [
      { lawId: 'bd-constitution-1972', sectionNumber: 'Article 33' },
      { lawId: 'bd-constitution-1972', sectionNumber: 'Article 102' },
      { lawId: 'bd-crpc-1898', sectionNumber: 'Section 61' },
    ],
    connectedConceptIds: ['concept-due-process', 'concept-rule-of-law'],
  },
  {
    id: 'concept-pacta-sunt-servanda',
    slug: 'pacta-sunt-servanda',
    canonicalName: 'Pacta Sunt Servanda',
    nameBn: 'চুক্তি পালন বাধ্যবাধকতা নীতি',
    latinMaxim: 'Pacta sunt servanda',
    category: 'International Law',
    primaryJurisdictionContext: 'INT',
    doctrinalDefinition: 'A fundamental principle of international law and civil contract jurisprudence stating that every treaty and agreement in force is binding upon the parties and must be performed in good faith.',
    plainLanguageSummary: 'Agreements must be kept. Once states sign and ratify a treaty, or commercial parties execute a valid contract, they are strictly bound by its terms.',
    keyPrinciples: [
      'Codified in Article 26 of the Vienna Convention on the Law of Treaties (VCLT) 1969.',
      'Domestic statutory laws cannot be invoked as an excuse for treaty non-performance.',
      'Underpins international humanitarian conventions and climate accords.',
    ],
    relatedStatuteIds: ['int-udhr-1948', 'int-geneva-convention-iv-1949', 'int-paris-agreement-2015'],
    relatedSectionNumbers: [
      { lawId: 'int-paris-agreement-2015', sectionNumber: 'Article 2' },
      { lawId: 'int-geneva-convention-iv-1949', sectionNumber: 'Article 3' },
    ],
    connectedConceptIds: ['concept-jus-cogens'],
  },
];

// ============================================================================
// 6. SCALABLE REPOSITORY QUERY & FILTERING ENGINE
// ============================================================================

export interface LegalQueryOptions {
  query?: string;
  jurisdictionCode?: StandardJurisdictionCode | 'All';
  categorySlug?: string | 'All';
  status?: string | 'All';
  language?: SupportedLanguage;
  limit?: number;
  offset?: number;
  sortBy?: 'relevance' | 'year-desc' | 'year-asc' | 'title-asc';
}

export interface ScalableQueryResult<T> {
  items: T[];
  total: number;
  limit: number;
  offset: number;
  hasMore: boolean;
  facets: {
    byJurisdiction: Record<string, number>;
    byCategory: Record<string, number>;
    byStatus: Record<string, number>;
  };
}
