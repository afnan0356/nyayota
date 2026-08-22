'use client';

import React from 'react';
import Link from 'next/link';
import {
  Scale,
  ShieldCheck,
  BookOpen,
  Globe,
  GraduationCap,
  Users,
  Building2,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  FileCheck2,
  Mail
} from 'lucide-react';

export default function AboutPage() {
  const audiences = [
    {
      title: 'Citizens & the General Public',
      description: 'Individuals seeking clear explanations of their statutory rights when navigating police interactions, landlord-tenant disputes, labor rights, and cyber threats.',
      icon: Users
    },
    {
      title: 'Law Students & Candidates',
      description: 'Undergraduate law students, Bar Council aspirants, and Judicial Service Examination candidates studying codified statutes, comparative doctrines, and legal maxims.',
      icon: GraduationCap
    },
    {
      title: 'Legal Scholars & Researchers',
      description: 'Academics comparing domestic statutory frameworks against international human rights covenants, environmental treaties, and international humanitarian law.',
      icon: BookOpen
    },
    {
      title: 'Journalists & Fact-Checkers',
      description: 'Newsrooms and court reporters verifying statutory section numbers, bailable vs non-bailable offense schedules, and constitutional provisions under publication deadlines.',
      icon: Globe
    },
    {
      title: 'Junior Advocates & Paralegals',
      description: 'Legal professionals conducting fast keyword indexing, cross-statute references, and procedural order verifications.',
      icon: Scale
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="space-y-4 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 text-xs font-medium">
          <Scale className="w-3.5 h-3.5" />
          <span>About the Nyayota Initiative</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-zinc-100 font-serif tracking-tight">
          Making the Law Accessible, Transparent, and Searchable
        </h1>
        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl mx-auto">
          Nyayota is an open public legal knowledge repository. We index primary statutes, international conventions, and procedural guides to provide transparent legal information to everyone.
        </p>
      </div>

      {/* The Problem & The Mission */}
      <div className="p-8 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100 font-serif">
          Why Nyayota Exists
        </h2>
        <div className="space-y-4 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
          <p>
            Law governs fundamental aspects of daily life — from civil rights and employment protections to tenancy agreements and digital privacy. However, in many jurisdictions, statutory laws remain practically inaccessible to the general public. Official texts are often distributed across fragmented gazette scans, archaic 19th-century colonial terminology, or closed commercial research databases.
          </p>
          <p>
            When citizens face urgent situations — such as police questioning, unlawful eviction, or online harassment — discovering their basic statutory rights should not be prevented by prohibitive costs or obscure formatting.
          </p>
          <p>
            <strong>Nyayota</strong> (derived from the root concept of <em>Nyay</em> — justice, fairness, and jurisprudence) was established as an open legal information repository. Our approach is straightforward: preserve the verbatim, authoritative text of official statutes while providing adjacent plain-language syntheses, bilingual legal definitions, and clear procedural steps.
          </p>
        </div>
      </div>

      {/* Institutional Disclaimer & Scope */}
      <div className="p-6 rounded-xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/50 text-zinc-900 dark:text-zinc-100 space-y-3">
        <div className="flex items-center space-x-2 text-zinc-900 dark:text-zinc-100 font-bold text-sm">
          <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
          <span>Institutional Charter &amp; Non-Representation Notice</span>
        </div>
        <div className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed space-y-2">
          <p>
            <strong>Nyayota is a legal information and research platform, not a legal practice or law firm.</strong> We do not provide individual legal counsel, advocate services, or court representation. Accessing materials on this site does not constitute an advocate-client relationship.
          </p>
          <p>
            Our statutory overviews and computational syntheses are educational materials designed to assist research and legal literacy. If you are involved in pending criminal proceedings, civil suits, or transactional disputes, you should retain qualified legal counsel or reach out to the National Legal Aid Services Organization (NLASO Helpline: <strong>16430</strong>).
          </p>
        </div>
      </div>

      {/* Sourcing & Verification Methodology */}
      <div className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100 font-serif">
            Statutory Sourcing &amp; Verification
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
            Legal reliability depends on rigorous adherence to official gazettes and primary records.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2.5">
            <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 flex items-center justify-center border border-zinc-200 dark:border-zinc-700">
              <FileCheck2 className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
              Official Government Gazette
            </h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Domestic enactments are sourced and verified against the <em>Laws of Bangladesh</em> digital gazette maintained by the Ministry of Law, Justice and Parliamentary Affairs.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2.5">
            <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 flex items-center justify-center border border-zinc-200 dark:border-zinc-700">
              <Globe className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
              UN Treaty Series &amp; Registries
            </h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Multilateral conventions (UDHR, ICCPR, Geneva Conventions, UNCLOS) are indexed from the United Nations Treaty Collection and International Committee of the Red Cross (ICRC).
            </p>
          </div>

          <div className="p-5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2.5">
            <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 flex items-center justify-center border border-zinc-200 dark:border-zinc-700">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
              Editorial Review &amp; Errata Policy
            </h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Plain-language summaries and educational glossaries undergo structured editorial review to eliminate misleading simplifications and maintain legal precision.
            </p>
          </div>
        </div>
      </div>

      {/* Target Audiences */}
      <div className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100 font-serif">
            Who Nyayota Serves
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
            Structured for researchers, students, and citizens requiring verifiable statutory clarity.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {audiences.map((aud, idx) => {
            const Icon = aud.icon;
            return (
              <div
                key={idx}
                className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/80 shadow-xs space-y-2"
              >
                <div className="w-7 h-7 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 flex items-center justify-center">
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <h3 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">{aud.title}</h3>
                <p className="text-[11px] text-zinc-600 dark:text-zinc-400 leading-relaxed">{aud.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Errata and Editorial Notice */}
      <div className="p-6 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1.5 max-w-xl">
          <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
            Statutory Corrections &amp; Errata Reporting
          </h2>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Statutes and subordinate rules change over time. If you identify a missing amendment, typographical error in a section numbering, or translation discrepancy, please submit a correction notice.
          </p>
        </div>
        <Link
          href="/contact"
          className="px-4 py-2.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-white text-white dark:text-zinc-900 font-semibold text-xs inline-flex items-center space-x-2 transition-colors shrink-0"
        >
          <Mail className="w-3.5 h-3.5" />
          <span>Submit Correction Notice</span>
        </Link>
      </div>
    </div>
  );
}
