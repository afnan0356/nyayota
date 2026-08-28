'use client';

import React from 'react';
import {
  ShieldCheck,
  ExternalLink,
  Building2,
  Calendar,
  FileCheck,
  Layers,
  Globe,
  Lock,
  Info,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Clock,
  Sparkles,
  BookOpen
} from 'lucide-react';
import { LawItem, CoverageStatus } from '@/lib/legal-data';

interface SourceTransparencyPanelProps {
  law: LawItem;
  onOpenFullAuditModal?: () => void;
}

export function SourceTransparencyPanel({
  law,
  onOpenFullAuditModal
}: SourceTransparencyPanelProps) {
  // Determine coverage badge style and message
  const coverageStatus: CoverageStatus =
    law.coverageStatus || (law.isCuratedSubset ? 'Partial' : 'Complete');

  const totalSections = law.totalStatutorySectionsCount || law.sections.length;
  const indexedSections = law.sections.length;
  const coveragePercentage = Math.round((indexedSections / totalSections) * 100);

  const getCoverageBadge = (status: CoverageStatus) => {
    switch (status) {
      case 'Complete':
        return {
          bg: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/30',
          label: 'Complete Repository Index (100%)',
          icon: CheckCircle2,
          desc: 'All codified sections are verified and available in full text.'
        };
      case 'Partial':
        return {
          bg: 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/30',
          label: `Curated Key Provisions (${indexedSections}/${totalSections} Secs - ${coveragePercentage}%)`,
          icon: AlertTriangle,
          desc: 'High-frequency core provisions indexed with full statutory text and explanations. Full legislative library ingestion is underway.'
        };
      case 'In Progress':
        return {
          bg: 'bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/30',
          label: 'Active Codification Ingestion',
          icon: Clock,
          desc: 'Legislative text is currently being digitized and cross-verified against official gazette copies.'
        };
      case 'Under Review':
        return {
          bg: 'bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-500/30',
          label: 'Awaiting Legislative Audit',
          icon: Info,
          desc: 'Draft text compiled; undergoing legal scholar review and gazette reconciliation.'
        };
      default:
        return {
          bg: 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700',
          label: 'Verified Subset',
          icon: CheckCircle2,
          desc: 'Curated provisions with authoritative annotations.'
        };
    }
  };

  const badge = getCoverageBadge(coverageStatus);
  const BadgeIcon = badge.icon;

  const officialSourceUrl =
    law.sourceVerificationUrl ||
    (law.jurisdictionCode === 'BD'
      ? 'http://bdlaws.minlaw.gov.bd'
      : 'https://treaties.un.org');

  const sourceOrg =
    law.sourceOrganization ||
    (law.jurisdictionCode === 'BD'
      ? 'Ministry of Law, Justice & Parliamentary Affairs, Government of Bangladesh'
      : 'United Nations Treaty Collection (UNTS)');

  const officialSource =
    law.officialSource ||
    (law.jurisdictionCode === 'BD'
      ? 'Laws of Bangladesh (bdlaws.minlaw.gov.bd)'
      : 'United Nations Treaty Series (UNTS)');

  return (
    <div
      id="source-transparency-panel"
      className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-5"
    >
      {/* Panel Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-100 dark:border-zinc-800">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 flex items-center justify-center">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-zinc-900 dark:text-white">
              Legislative Provenance & Source Transparency
            </h3>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
              Direct metadata audit trail verifying authenticity against primary legal repositories
            </p>
          </div>
        </div>

        {onOpenFullAuditModal && (
          <button
            type="button"
            id="view-full-audit-log-btn"
            onClick={onOpenFullAuditModal}
            className="px-3 py-1.5 rounded-xl text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-500/5 hover:bg-blue-500/10 border border-blue-500/20 transition-all inline-flex items-center space-x-1.5 self-start sm:self-auto"
          >
            <span>Full Audit Log</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        )}
      </div>

      {/* Coverage Status Banner */}
      <div className={`p-4 rounded-2xl border ${badge.bg} flex items-start space-x-3`}>
        <BadgeIcon className="w-4 h-4 shrink-0 mt-0.5" />
        <div className="space-y-1 text-xs">
          <div className="flex items-center space-x-2 font-bold">
            <span>Repository Coverage:</span>
            <span>{badge.label}</span>
          </div>
          <p className="leading-relaxed opacity-90">{badge.desc}</p>
        </div>
      </div>

      {/* Structured Transparency Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
        {/* Official Authority */}
        <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-1">
          <div className="flex items-center space-x-1.5 text-zinc-500 dark:text-zinc-400 text-[11px] font-semibold">
            <Building2 className="w-3.5 h-3.5 text-amber-500" />
            <span>Publishing Authority:</span>
          </div>
          <p className="font-bold text-zinc-900 dark:text-zinc-100 pl-5 leading-snug">
            {sourceOrg}
          </p>
        </div>

        {/* Primary Repository */}
        <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-1">
          <div className="flex items-center space-x-1.5 text-zinc-500 dark:text-zinc-400 text-[11px] font-semibold">
            <FileCheck className="w-3.5 h-3.5 text-amber-500" />
            <span>Official Repository:</span>
          </div>
          <a
            href={officialSourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            id="official-source-direct-link"
            className="font-bold text-blue-600 dark:text-blue-400 hover:underline pl-5 flex items-center space-x-1 leading-snug"
          >
            <span>{officialSource}</span>
            <ExternalLink className="w-3 h-3 shrink-0" />
          </a>
        </div>

        {/* Gazette / Treaty Reference */}
        <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-1">
          <div className="flex items-center space-x-1.5 text-zinc-500 dark:text-zinc-400 text-[11px] font-semibold">
            <Lock className="w-3.5 h-3.5 text-amber-500" />
            <span>Official Gazette / Treaty Serial:</span>
          </div>
          <p className="font-mono text-zinc-800 dark:text-zinc-200 pl-5 text-[11px] leading-snug">
            {law.officialGazetteRef || `${law.actNumber || 'Official Enactment'}`}
          </p>
        </div>

        {/* Enactment & Promulgation */}
        <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-1">
          <div className="flex items-center space-x-1.5 text-zinc-500 dark:text-zinc-400 text-[11px] font-semibold">
            <Calendar className="w-3.5 h-3.5 text-amber-500" />
            <span>Enacted / Effective Date:</span>
          </div>
          <p className="font-bold text-zinc-900 dark:text-zinc-100 pl-5">
            {law.publicationDate || `${law.enactmentYear}`}
          </p>
        </div>

        {/* Legislative Currency */}
        <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-1">
          <div className="flex items-center space-x-1.5 text-zinc-500 dark:text-zinc-400 text-[11px] font-semibold">
            <Clock className="w-3.5 h-3.5 text-amber-500" />
            <span>Last Amended / Validated:</span>
          </div>
          <p className="font-bold text-zinc-900 dark:text-zinc-100 pl-5">
            {law.lastUpdatedDate || (law.lastAmendedYear ? `${law.lastAmendedYear}` : `${law.enactmentYear}`)}
          </p>
        </div>

        {/* Authentic Language */}
        <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-1">
          <div className="flex items-center space-x-1.5 text-zinc-500 dark:text-zinc-400 text-[11px] font-semibold">
            <Globe className="w-3.5 h-3.5 text-amber-500" />
            <span>Authentic Language Status:</span>
          </div>
          <p className="font-bold text-zinc-900 dark:text-zinc-100 pl-5">
            {law.jurisdictionCode === 'BD' ? 'English (Original) / Bengali (Official)' : 'Multilingual Official Treaty (UN Authentic)'}
          </p>
        </div>
      </div>
    </div>
  );
}
