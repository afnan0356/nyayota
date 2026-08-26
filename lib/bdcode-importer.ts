/**
 * Nyayota — Bangladesh Code Import & Ingestion Validation Framework
 * 
 * Scalable ingestion pipeline designed to support the complete Bangladesh statutory corpus
 * (thousands of laws) with duplicate detection, schema validation, source transparency verification,
 * broken import diagnostics, and non-destructive incremental updates.
 * 
 * Adheres strictly to Content Safety Mandate: Never invents legal texts or sections.
 */

import {
  BangladeshLawRecord,
  BangladeshSection,
  getLegislativeEraFromYear,
} from './bdcode-architecture';
import { BANGLADESH_CODE_CATALOG } from './bdcode-catalog';

// ============================================================================
// IMPORT PAYLOAD & VALIDATION SCHEMAS
// ============================================================================

export interface BangladeshLawImportPayload {
  id?: string;
  title: string;
  titleBn?: string;
  shortTitle?: string;
  alternateTitles?: string[];
  enactmentYear: number;
  actNumber: string;
  actType?: string;
  volumeNumber?: number;
  volumeCitation?: string;
  category: string;
  subcategories?: string[];
  ministry?: string;
  keywords?: string[];
  status?: string;
  enactmentDate?: string;
  commencementDate?: string;
  overview: string;
  overviewBn?: string;
  sections: Array<{
    number: string;
    title: string;
    titleBn?: string;
    content: string;
    contentBn?: string;
    simpleExplanation?: string;
    penalty?: string;
    isBailable?: boolean;
    isCognizable?: boolean;
  }>;
  totalSectionsCount?: number;
  officialSource?: string;
  sourceUrl: string;
  officialGazetteCitation?: string;
  relatedLawIds?: string[];
}

export type DiagnosticSeverity = 'critical' | 'warning' | 'info';

export interface DiagnosticIssue {
  code: string;
  field: string;
  message: string;
  severity: DiagnosticSeverity;
  recommendation: string;
}

export interface IngestionValidationReport {
  isValid: boolean;
  isDuplicate: boolean;
  duplicateOfId?: string;
  duplicateReason?: string;
  issues: DiagnosticIssue[];
  metrics: {
    sectionsFound: number;
    emptySectionsCount: number;
    hasBanglaTitle: boolean;
    hasOfficialSourceUrl: boolean;
    integrityScore: number; // 0 to 100
  };
}

export interface IngestionAuditSummary {
  auditTimestamp: string;
  totalStatutesAudited: number;
  totalSectionsIndexed: number;
  verifiedCount: number;
  duplicateCollisionsFound: number;
  brokenImportsFound: number;
  missingSectionsWarnings: number;
  statutesWithSourceLinks: number;
  statutesWithGazetteCitations: number;
  averageIntegrityScore: number;
  statuteReports: Array<{
    id: string;
    title: string;
    actNumber: string;
    volumeNumber?: number;
    sourceUrl: string;
    sectionsCount: number;
    integrityScore: number;
    issuesCount: number;
  }>;
}

// ============================================================================
// INGESTION VALIDATOR & DUPLICATE DETECTOR
// ============================================================================

/**
 * Normalizes an Act Number string for rigorous duplicate collision detection
 * e.g., "Act No. XLV of 1860" -> "act-45-1860"
 */
export function normalizeActNumber(actNumber: string, year: number): string {
  const romanMap: Record<string, number> = {
    i: 1, ii: 2, iii: 3, iv: 4, v: 5, vi: 6, vii: 7, viii: 8, ix: 9, x: 10,
    xv: 15, xx: 20, xxvii: 27, xxxii: 32, xlii: 42, xlv: 45, lxv: 65,
  };

  const clean = actNumber.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
  const matchRoman = clean.match(/\b([ivxlcdm]+)\b/);
  let numVal = '';
  if (matchRoman && romanMap[matchRoman[1]]) {
    numVal = String(romanMap[matchRoman[1]]);
  } else {
    const matchNum = clean.match(/\b\d+\b/);
    if (matchNum) numVal = matchNum[0];
  }

  return `act-${numVal || 'unknown'}-${year}`;
}

/**
 * Generates canonical ID slug if not provided
 */
export function generateCanonicalLawId(title: string, year: number): string {
  const cleanTitle = title
    .toLowerCase()
    .replace(/^(the\s+|an\s+|a\s+)/i, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return `bd-${cleanTitle}-${year}`;
}

/**
 * Validates an incoming Bangladesh Law payload before insertion or update
 */
export function validateBangladeshLawPayload(
  payload: BangladeshLawImportPayload,
  existingCatalog: BangladeshLawRecord[] = BANGLADESH_CODE_CATALOG
): IngestionValidationReport {
  const issues: DiagnosticIssue[] = [];
  let isDuplicate = false;
  let duplicateOfId: string | undefined;
  let duplicateReason: string | undefined;

  // 1. Mandatory Field Validation
  if (!payload.title || payload.title.trim().length < 3) {
    issues.push({
      code: 'ERR_TITLE_REQUIRED',
      field: 'title',
      message: 'Statute title is missing or too short.',
      severity: 'critical',
      recommendation: 'Specify the full official title as published on bdcode.gov.bd.',
    });
  }

  if (!payload.enactmentYear || payload.enactmentYear < 1836 || payload.enactmentYear > 2035) {
    issues.push({
      code: 'ERR_INVALID_YEAR',
      field: 'enactmentYear',
      message: `Enactment year (${payload.enactmentYear}) is outside valid Bangladesh legislative range (1836–present).`,
      severity: 'critical',
      recommendation: 'Verify the enactment year from the official gazette header.',
    });
  }

  if (!payload.actNumber || payload.actNumber.trim().length < 3) {
    issues.push({
      code: 'ERR_ACT_NUMBER_MISSING',
      field: 'actNumber',
      message: 'Official Act Number citation is missing.',
      severity: 'critical',
      recommendation: 'Provide the official Act number citation (e.g. Act No. XLV of 1860).',
    });
  }

  // 2. Official Source URL Transparency Validation
  if (!payload.sourceUrl || !payload.sourceUrl.startsWith('http')) {
    issues.push({
      code: 'ERR_SOURCE_URL_INVALID',
      field: 'sourceUrl',
      message: 'Official source URL is missing or malformed.',
      severity: 'critical',
      recommendation: 'Include direct canonical URL on bdcode.gov.bd or bdlaws.minlaw.gov.bd.',
    });
  } else if (!payload.sourceUrl.includes('bdcode.gov.bd') && !payload.sourceUrl.includes('bdlaws.minlaw.gov.bd')) {
    issues.push({
      code: 'WARN_NON_GOV_SOURCE',
      field: 'sourceUrl',
      message: 'Source URL is not from the official government legislative domain (bdcode.gov.bd).',
      severity: 'warning',
      recommendation: 'Ensure the primary source links to the official Bangladesh Code repository.',
    });
  }

  // 3. Duplicate Detection Check
  const incomingNormalizedAct = normalizeActNumber(payload.actNumber, payload.enactmentYear);
  const incomingSlug = payload.id || generateCanonicalLawId(payload.title, payload.enactmentYear);

  for (const existing of existingCatalog) {
    const existingNormalizedAct = normalizeActNumber(existing.actNumber, existing.enactmentYear);
    
    // Check Act Number + Year collision
    if (incomingNormalizedAct === existingNormalizedAct && incomingNormalizedAct !== 'act-unknown-' + payload.enactmentYear) {
      if (existing.id !== incomingSlug) {
        isDuplicate = true;
        duplicateOfId = existing.id;
        duplicateReason = `Act citation collision with existing statute: ${existing.title} (${existing.actNumber})`;
        issues.push({
          code: 'WARN_DUPLICATE_ACT',
          field: 'actNumber',
          message: `Statute with identical Act number and Year already exists: ${existing.title} (${existing.id}).`,
          severity: 'warning',
          recommendation: 'Use update mode rather than inserting as a new statute.',
        });
      }
    }

    // Check exact title collision
    if (existing.title.toLowerCase().trim() === payload.title.toLowerCase().trim() && existing.id !== incomingSlug) {
      isDuplicate = true;
      duplicateOfId = existing.id;
      duplicateReason = `Identical title collision with: ${existing.title} (${existing.id})`;
      issues.push({
        code: 'WARN_DUPLICATE_TITLE',
        field: 'title',
        message: `Statute with identical title already exists: ${existing.id}.`,
        severity: 'warning',
        recommendation: 'Verify if this is an amendment act or an existing statute version.',
      });
    }
  }

  // 4. Section Integrity & Content Safety Auditing
  let emptySectionsCount = 0;
  if (!payload.sections || payload.sections.length === 0) {
    issues.push({
      code: 'WARN_NO_SECTIONS',
      field: 'sections',
      message: 'No sections were provided in this payload (provisional catalog metadata only).',
      severity: 'warning',
      recommendation: 'Mark statute status as "provisional-indexed" until sections are fully parsed.',
    });
  } else {
    const seenSectionNumbers = new Set<string>();
    for (const [idx, sec] of payload.sections.entries()) {
      if (!sec.number || sec.number.trim().length === 0) {
        issues.push({
          code: 'ERR_EMPTY_SECTION_NUM',
          field: `sections[${idx}].number`,
          message: `Section at index ${idx} is missing a section number identifier.`,
          severity: 'critical',
          recommendation: 'Provide standard section label (e.g. Section 144, Article 102).',
        });
      } else {
        const cleanSecNum = sec.number.trim().toLowerCase();
        if (seenSectionNumbers.has(cleanSecNum)) {
          issues.push({
            code: 'WARN_DUPLICATE_SECTION',
            field: `sections[${idx}].number`,
            message: `Duplicate section number found within statute: "${sec.number}".`,
            severity: 'warning',
            recommendation: 'Verify section numbering structure from Bangladesh Code.',
          });
        }
        seenSectionNumbers.add(cleanSecNum);
      }

      if (!sec.content || sec.content.trim().length < 5) {
        emptySectionsCount++;
        issues.push({
          code: 'WARN_EMPTY_SECTION_TEXT',
          field: `sections[${idx}].content`,
          message: `Section ${sec.number || idx} has empty or placeholder statutory text.`,
          severity: 'warning',
          recommendation: 'Never hallucinate text. If unavailable, mark provision as "Gazette Text Pending".',
        });
      }
    }
  }

  // 5. Compute Integrity Quality Score (0 to 100)
  let score = 100;
  const criticalCount = issues.filter((i) => i.severity === 'critical').length;
  const warningCount = issues.filter((i) => i.severity === 'warning').length;

  score -= criticalCount * 30;
  score -= warningCount * 10;
  if (!payload.titleBn) score -= 5;
  if (!payload.officialGazetteCitation) score -= 5;
  if (emptySectionsCount > 0) score -= Math.min(20, emptySectionsCount * 5);
  score = Math.max(0, Math.min(100, score));

  return {
    isValid: criticalCount === 0,
    isDuplicate,
    duplicateOfId,
    duplicateReason,
    issues,
    metrics: {
      sectionsFound: payload.sections ? payload.sections.length : 0,
      emptySectionsCount,
      hasBanglaTitle: Boolean(payload.titleBn && payload.titleBn.length > 0),
      hasOfficialSourceUrl: Boolean(payload.sourceUrl && payload.sourceUrl.startsWith('http')),
      integrityScore: score,
    },
  };
}

/**
 * Runs a complete integrity audit across all statutes currently in the catalog
 */
export function runCatalogIntegrityAudit(
  catalog: BangladeshLawRecord[] = BANGLADESH_CODE_CATALOG
): IngestionAuditSummary {
  let totalSections = 0;
  let verifiedCount = 0;
  let duplicateCollisions = 0;
  let brokenImports = 0;
  let missingSectionsWarnings = 0;
  let withSourceLinks = 0;
  let withGazetteCitations = 0;
  let totalIntegrityScore = 0;

  const statuteReports: IngestionAuditSummary['statuteReports'] = [];

  for (const law of catalog) {
    totalSections += law.sections.length;
    if (law.integrityStatus === 'fully-verified') verifiedCount++;
    if (law.sourceUrl && law.sourceUrl.startsWith('http')) withSourceLinks++;
    if (law.officialGazetteCitation) withGazetteCitations++;

    const payload: BangladeshLawImportPayload = {
      id: law.id,
      title: law.title,
      titleBn: law.titleBn,
      actNumber: law.actNumber,
      enactmentYear: law.enactmentYear,
      category: law.category,
      overview: law.overview,
      sourceUrl: law.sourceUrl,
      officialGazetteCitation: law.officialGazetteCitation,
      sections: law.sections,
    };

    const report = validateBangladeshLawPayload(payload, catalog);
    totalIntegrityScore += report.metrics.integrityScore;

    if (!report.isValid) brokenImports++;
    if (report.isDuplicate) duplicateCollisions++;
    if (report.metrics.emptySectionsCount > 0 || report.metrics.sectionsFound === 0) {
      missingSectionsWarnings++;
    }

    statuteReports.push({
      id: law.id,
      title: law.title,
      actNumber: law.actNumber,
      volumeNumber: law.volumeNumber,
      sourceUrl: law.sourceUrl,
      sectionsCount: law.sections.length,
      integrityScore: report.metrics.integrityScore,
      issuesCount: report.issues.length,
    });
  }

  const averageScore = catalog.length > 0 ? Math.round(totalIntegrityScore / catalog.length) : 0;

  return {
    auditTimestamp: new Date().toISOString(),
    totalStatutesAudited: catalog.length,
    totalSectionsIndexed: totalSections,
    verifiedCount,
    duplicateCollisionsFound: duplicateCollisions,
    brokenImportsFound: brokenImports,
    missingSectionsWarnings,
    statutesWithSourceLinks: withSourceLinks,
    statutesWithGazetteCitations: withGazetteCitations,
    averageIntegrityScore: averageScore,
    statuteReports,
  };
}

/**
 * Ingests a new Bangladesh Law record incrementally into the runtime catalog
 */
export function ingestBangladeshLawRecord(
  payload: BangladeshLawImportPayload
): { success: boolean; message: string; record?: BangladeshLawRecord; report: IngestionValidationReport } {
  const report = validateBangladeshLawPayload(payload, BANGLADESH_CODE_CATALOG);

  if (!report.isValid) {
    return {
      success: false,
      message: `Ingestion rejected: ${report.issues.map((i) => i.message).join(' ')}`,
      report,
    };
  }

  const lawId = payload.id || generateCanonicalLawId(payload.title, payload.enactmentYear);
  const era = getLegislativeEraFromYear(payload.enactmentYear);

  const cleanSections: BangladeshSection[] = (payload.sections || []).map((s) => ({
    number: s.number.trim(),
    title: s.title.trim(),
    titleBn: s.titleBn,
    content: s.content.trim(),
    contentBn: s.contentBn,
    simpleExplanation: s.simpleExplanation || 'Statutory legal provision of Bangladesh Code.',
    penalty: s.penalty,
    isBailable: s.isBailable,
    isCognizable: s.isCognizable,
  }));

  const record: BangladeshLawRecord = {
    id: lawId,
    title: payload.title.trim(),
    titleBn: payload.titleBn || payload.title,
    shortTitle: payload.shortTitle || payload.title,
    alternateTitles: payload.alternateTitles || [],
    enactmentYear: payload.enactmentYear,
    actNumber: payload.actNumber.trim(),
    actType: (payload.actType as any) || 'Act of Parliament',
    era,
    volumeNumber: payload.volumeNumber,
    volumeCitation: payload.volumeCitation,
    category: payload.category,
    categorySlug: payload.category.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    subcategories: payload.subcategories || [],
    ministry: payload.ministry || 'Ministry of Law, Justice and Parliamentary Affairs',
    keywords: payload.keywords || [payload.title.toLowerCase()],
    jurisdiction: 'Bangladesh',
    jurisdictionCode: 'BD',
    status: (payload.status as any) || 'In Force',
    enactmentDate: payload.enactmentDate,
    commencementDate: payload.commencementDate,
    overview: payload.overview,
    overviewBn: payload.overviewBn,
    officialSource: 'Bangladesh Code (bdcode.gov.bd)',
    sourceUrl: payload.sourceUrl,
    officialGazetteCitation: payload.officialGazetteCitation || 'Bangladesh Gazette Reference Pending',
    importDate: new Date().toISOString(),
    lastVerifiedDate: new Date().toISOString(),
    integrityStatus: report.metrics.emptySectionsCount > 0 ? 'provisional-indexed' : 'fully-verified',
    totalSectionsCount: payload.totalSectionsCount || cleanSections.length,
    relatedLawIds: payload.relatedLawIds || [],
    sections: cleanSections,
  };

  // Check if updating existing or inserting
  const existingIdx = BANGLADESH_CODE_CATALOG.findIndex((l) => l.id === lawId);
  if (existingIdx >= 0) {
    BANGLADESH_CODE_CATALOG[existingIdx] = record;
  } else {
    BANGLADESH_CODE_CATALOG.push(record);
  }

  return {
    success: true,
    message: existingIdx >= 0 ? `Updated existing statute: ${record.title}` : `Successfully ingested: ${record.title}`,
    record,
    report,
  };
}
