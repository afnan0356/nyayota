/**
 * Nyayota — Bangladesh Code Integration Architecture
 * 
 * Official Primary Source: Bangladesh Code (https://bdcode.gov.bd & http://bdlaws.minlaw.gov.bd)
 * Published by the Legislative and Parliamentary Affairs Division, Ministry of Law, Justice and Parliamentary Affairs.
 * 
 * This module defines the scalable architecture for cataloging, ingesting, validating,
 * and querying the entire statutory corpus of Bangladesh (from 1836 to the present day).
 */

import { StandardTaxonomyCategory } from './architecture';

// ============================================================================
// 1. BANGLADESH CODE STRUCTURAL ENUMS & TYPES
// ============================================================================

/**
 * Historical legislative eras of Bangladesh statutory law
 */
export type BangladeshLegislativeEra =
  | 'british-era'      // 1836 – 1947: Pre-partition British Indian Statutes codified into Bangladesh Code
  | 'pakistan-era'     // 1947 – 1971: East Pakistan / Pakistan central statutes adopted via P.O. 48/1972
  | 'bangladesh-era';  // 1971 – Present: Post-independence Acts of Jatiya Sangsad, Ordinances & President's Orders

export interface LegislativeEraMeta {
  id: BangladeshLegislativeEra;
  titleEn: string;
  titleBn: string;
  yearRange: [number, number];
  description: string;
  historicalContext: string;
}

export const BANGLADESH_LEGISLATIVE_ERAS: Record<BangladeshLegislativeEra, LegislativeEraMeta> = {
  'british-era': {
    id: 'british-era',
    titleEn: 'British Colonial Era (1836–1947)',
    titleBn: 'ব্রিটিশ ঔপনিবেশিক আমল (১৮৩৬–১৯৪৭)',
    yearRange: [1836, 1947],
    description: 'Foundational substantive and procedural codes drafted by the Indian Law Commissions.',
    historicalContext: 'Adopted and codified into Bangladesh Code via the Bangladesh Laws (Revision and Declaration) Act, 1973 (Act No. VIII of 1973).',
  },
  'pakistan-era': {
    id: 'pakistan-era',
    titleEn: 'Pakistan & East Bengal Era (1947–1971)',
    titleBn: 'পাকিস্তান ও পূর্ব বাংলা আমল (১৯৪৭–১৯৭১)',
    yearRange: [1947, 1971],
    description: 'Statutes, regional ordinances, and state acquisition enactments during the 1947-1971 period.',
    historicalContext: 'Preserved by the Laws Continuance Enforcement Order 1971 and subsequent Presidential Orders.',
  },
  'bangladesh-era': {
    id: 'bangladesh-era',
    titleEn: 'Independent Bangladesh Era (1971–Present)',
    titleBn: 'স্বাধীন বাংলাদেশ আমল (১৯৭১–বর্তমান)',
    yearRange: [1971, 2030],
    description: 'Sovereign enactments of the Jatiya Sangsad, Presidential Orders (1972-1973), and contemporary digital/specialized laws.',
    historicalContext: 'Enacted pursuant to the Constitution of the People’s Republic of Bangladesh (1972).',
  },
};

/**
 * Statutory instrument classification in Bangladesh Code
 */
export type BangladeshActType =
  | 'Act of Parliament'         // Act passed by Jatiya Sangsad or colonial legislature
  | 'Ordinance'                 // Promulgated by the President when parliament is dissolved
  | "President's Order (P.O.)"  // Promulgated during 1972-1973 transition
  | 'Constitutional Amendment'  // Constitutional provisions under Art. 142
  | 'Statutory Rules & Orders'; // S.R.O. delegated legislation

/**
 * Status of statutory instrument
 */
export type BangladeshLawStatus =
  | 'In Force'
  | 'Amended'
  | 'Repealed'
  | 'Partially Repealed'
  | 'Omitted'
  | 'Pending Gazette Enforcement';

/**
 * Official source verification & ingestion integrity status
 */
export type IngestionIntegrityStatus =
  | 'fully-verified'       // Verified against official gazette & bdcode.gov.bd
  | 'provisional-indexed'  // Catalog metadata verified, full section extraction in progress
  | 'source-syncing'       // Scheduled for automated gazette sync
  | 'amendment-pending';   // Recent legislative amendment awaiting gazette text integration

// ============================================================================
// 2. BANGLADESH CODE STATUTE DATA MODEL
// ============================================================================

export interface BangladeshSection {
  number: string;                    // e.g. "Section 302", "Section 144", "Article 102"
  title: string;                     // English section heading
  titleBn?: string;                  // Bangla section heading (ধারা শিরোনাম)
  content: string;                   // Complete statutory text
  contentBn?: string;                // Complete Bangla statutory text
  simpleExplanation: string;         // Plain-language legal breakdown
  penalty?: string;                  // Codified sentence/fine (if applicable)
  isBailable?: boolean;              // Procedural bail status
  isCognizable?: boolean;            // Police arrest without warrant power
  isCompoundable?: boolean;          // Settlement capability
  triableBy?: string;                // Jurisdiction of court (e.g. "Court of Session", "Magistrate of 1st Class")
  amendmentHistory?: string[];       // Chronological list of modifying enactments
  subSections?: string[];            // Sub-clauses (1), (2), (a), (b)
  provisos?: string[];               // "Provided that..." conditional clauses
  explanations?: string[];           // Statutory explanations attached by legislature
  illustrations?: string[];          // Case illustrations drafted into the original act
}

export interface BangladeshChapter {
  number: string;                    // e.g. "Chapter XVI", "Part III", "Order XXXIX"
  title: string;                     // e.g. "Of Offences Affecting the Human Body"
  titleBn?: string;                  // e.g. "মানবদেহ সংক্রান্ত অপরাধসমূহ"
  sectionRange: string;              // e.g. "Sections 299 to 377"
  sections: BangladeshSection[];
}

export interface BangladeshLawRecord {
  // Core Identification
  id: string;                        // Canonical slug (e.g. "bd-penal-code-1860")
  title: string;                     // Full Official English Title ("The Penal Code, 1860")
  titleBn: string;                   // Official Bangla Title ("দণ্ডবিধি, ১৮৬০")
  shortTitle: string;                // Common abbreviation ("Penal Code", "দণ্ডবিধি")
  alternateTitles?: string[];        // Search aliases ["Act XLV of 1860", "Indian Penal Code (Bangladesh)"]

  // Chronological & Codification Meta
  enactmentYear: number;             // e.g. 1860
  actNumber: string;                 // Official Act Citation: "Act No. XLV of 1860", "Act No. XXVII of 2023"
  actType: BangladeshActType;
  era: BangladeshLegislativeEra;
  volumeNumber?: number;             // Volume in Bangladesh Code (e.g. 1 to 55)
  volumeCitation?: string;           // "The Bangladesh Code, Volume I, pp. 1-120"
  
  // Categorization & Subject Matter
  category: string;                  // Standard taxonomy canonical category name
  categorySlug: string;              // e.g. "criminal-law", "cyber-digital"
  subcategories: string[];           // ["Offenses Against Body", "Homicide", "Bail"]
  ministry?: string;                 // Responsible ministry (e.g. "Ministry of Law, Justice and Parliamentary Affairs")
  keywords: string[];                // Multi-lingual search tokens

  // Legal Status & Governance
  jurisdiction: 'Bangladesh';
  jurisdictionCode: 'BD';
  status: BangladeshLawStatus;
  enactmentDate?: string;            // Exact assent/gazette date (e.g. "6th October 1860")
  commencementDate?: string;         // Date of coming into force (e.g. "1st May 1862")
  lastAmendedYear?: number;
  lastAmendmentAct?: string;         // e.g. "Act No. XXVII of 2023"

  // Substantive Legal Content
  overview: string;                  // Executive summary of legal scope
  overviewBn?: string;               // Bangla summary
  chapters?: BangladeshChapter[];    // Hierarchical chapter divisions
  sections: BangladeshSection[];     // Flat list of all sections for direct querying
  totalSectionsCount?: number;       // Total count of provisions in the official enactment

  // Source Transparency & Integrity (Mandatory for Bangladesh Code Integration)
  officialSource: 'Bangladesh Code (bdcode.gov.bd)';
  sourceUrl: string;                 // Direct canonical link on bdcode.gov.bd or bdlaws.minlaw.gov.bd
  mirrorSourceUrl?: string;          // Secondary mirror link
  officialGazetteCitation: string;   // Gazette publication reference
  importDate: string;                // ISO date when record was ingested
  lastVerifiedDate: string;          // ISO date when checked against bdcode.gov.bd
  integrityStatus: IngestionIntegrityStatus;
  checksumSha256?: string;           // Data integrity verification hash

  // Relational & Cross-References
  relatedLawIds: string[];           // IDs of associated Bangladesh statutes (e.g. ["bd-crpc-1898", "bd-evidence-act-1872"])
  companionStatutes?: string[];      // Relevant procedural or subordinate rules
}

// ============================================================================
// 3. BANGLADESH CODE VOLUME REGISTRY (VOLUMES 1 TO 55+)
// ============================================================================

export interface BangladeshCodeVolumeMeta {
  volumeNumber: number;
  romanNumber: string;
  yearRange: [number, number];
  description: string;
  statutesCount: number;
}

export const BANGLADESH_CODE_VOLUMES: BangladeshCodeVolumeMeta[] = [
  { volumeNumber: 1, romanNumber: 'Vol. I', yearRange: [1836, 1871], description: 'Early colonial enactments, Revenue Courts & The Penal Code, 1860', statutesCount: 24 },
  { volumeNumber: 2, romanNumber: 'Vol. II', yearRange: [1872, 1882], description: 'Contract Act 1872, Evidence Act 1872, Specific Relief Act 1877, Transfer of Property Act 1882', statutesCount: 28 },
  { volumeNumber: 3, romanNumber: 'Vol. III', yearRange: [1882, 1897], description: 'Negotiable Instruments Act 1881, Trusts Act 1882, General Clauses Act 1897', statutesCount: 22 },
  { volumeNumber: 4, romanNumber: 'Vol. IV', yearRange: [1898, 1908], description: 'Code of Criminal Procedure 1898, Code of Civil Procedure 1908, Limitation Act 1908', statutesCount: 19 },
  { volumeNumber: 5, romanNumber: 'Vol. V', yearRange: [1909, 1920], description: 'Registration Act 1908, Electricity Act 1910, Companies Act heritage', statutesCount: 26 },
  { volumeNumber: 10, romanNumber: 'Vol. X', yearRange: [1947, 1955], description: 'Post-partition adaptations, East Bengal State Acquisition and Tenancy Act 1950', statutesCount: 31 },
  { volumeNumber: 15, romanNumber: 'Vol. XV', yearRange: [1971, 1973], description: 'Constitution of Bangladesh 1972, Presidential Orders 1972-1973', statutesCount: 45 },
  { volumeNumber: 25, romanNumber: 'Vol. XXV', yearRange: [1985, 1995], description: 'Special Powers Act, Family Courts Ordinance 1985, Companies Act 1994', statutesCount: 38 },
  { volumeNumber: 35, romanNumber: 'Vol. XXXV', yearRange: [2000, 2008], description: 'Nari O Shishu Nirjatan Daman Ain 2000, Money Laundering Prevention Act, Labour Act 2006', statutesCount: 42 },
  { volumeNumber: 45, romanNumber: 'Vol. XLV', yearRange: [2009, 2018], description: 'Right to Information Act 2009, CrPC Amendment 2009, Digital Security Act 2018', statutesCount: 50 },
  { volumeNumber: 55, romanNumber: 'Vol. LV', yearRange: [2019, 2026], description: 'Cyber Security Act 2023, Data Protection provisions, contemporary amendments', statutesCount: 36 },
];

// Helper to determine legislative era from year
export function getLegislativeEraFromYear(year: number): BangladeshLegislativeEra {
  if (year < 1947) return 'british-era';
  if (year >= 1947 && year < 1971) return 'pakistan-era';
  return 'bangladesh-era';
}
