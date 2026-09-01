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
  AlertTriangle,
  FileCheck2,
  Mail,
  Info,
  Clock
} from 'lucide-react';

export default function AboutPage() {
  const audiences = [
    {
      title: 'Citizens & Everyday Users',
      description: 'People looking for clear explanations of their rights during tenancy disputes, employment questions, cyber safety issues, or routine interactions with authorities.',
      icon: Users
    },
    {
      title: 'Law Students & Exam Candidates',
      description: 'Students preparing for coursework, Bar Council examinations, or Judicial Service tests who need structured access to acts, sections, and legal doctrines.',
      icon: GraduationCap
    },
    {
      title: 'Researchers & Academics',
      description: 'Scholars examining statutory frameworks, comparative international treaties, human rights conventions, and historical amendments.',
      icon: BookOpen
    },
    {
      title: 'Journalists & Fact-Checkers',
      description: 'Writers and reporters verifying statutory names, section numbers, penal penalties, and constitutional clauses under tight deadlines.',
      icon: Globe
    },
    {
      title: 'Legal Professionals & Paralegals',
      description: 'Practitioners and junior advocates needing quick reference, bilingual terminology lookup, and cross-statute cross-referencing.',
      icon: Scale
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="space-y-4 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 text-xs font-medium">
          <Scale className="w-3.5 h-3.5" />
          <span>About Nyayota</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-zinc-100 font-serif tracking-tight">
          Making the Law Accessible, Transparent, and Searchable
        </h1>
        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl mx-auto">
          Nyayota is an independent, open legal information project. We organize primary laws, international treaties, and procedural guides to make legal knowledge clear and accessible to everyone.
        </p>
      </div>

      {/* NEW SECTION: Who Built Nyayota */}
      <div className="p-8 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-5">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center border border-blue-500/20">
            <Info className="w-4 h-4" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100 font-serif">
            Who Built Nyayota
          </h2>
        </div>
        <div className="space-y-4 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
          <p>
            Nyayota is an independent project started by developers and researchers who were frustrated by how difficult it is to look up and understand everyday laws.
          </p>
          <p>
            In many countries, finding the text of a law means digging through old scanned PDFs, navigating broken government websites, or paying for expensive proprietary databases. Even when you find the text, it is often written in dense, archaic legal jargon that ordinary people cannot decipher without help.
          </p>
          <p>
            We built Nyayota to solve that problem. There is no large corporation, foundation, or institutional lobby behind this project. It is an independent effort to collect official public statutes, clean up the text, make it instantly searchable, and provide plain-language bilingual summaries so that anyone can read what the law says.
          </p>
          <p>
            We believe that the rules governing society should be open, legible, and freely accessible to everyone who lives under them.
          </p>
        </div>
      </div>

      {/* The Mission & Purpose */}
      <div className="p-8 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100 font-serif">
          Why Legal Information Matters
        </h2>
        <div className="space-y-4 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
          <p>
            The law touches almost every part of everyday life: work contracts, rental agreements, personal privacy, consumer rights, and civil liberties. Yet most people only encounter the legal system during a moment of crisis, when they have the least time and fewest resources to figure out what their rights are.
          </p>
          <p>
            When someone faces an unlawful eviction, a workplace dispute, or harassment, they should be able to look up the relevant statute immediately without encountering paywalls or impossible formatting.
          </p>
          <p>
            The name <strong>Nyayota</strong> comes from the root concept of <em>Nyay</em> — justice, fairness, and law. Our focus is straightforward: keep the full, authoritative statutory text intact, and pair it with clear summaries, clear section breakdowns, and structured procedural guidance.
          </p>
        </div>
      </div>

      {/* Legal Disclaimer & Scope */}
      <div className="p-6 rounded-xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/50 text-zinc-900 dark:text-zinc-100 space-y-3">
        <div className="flex items-center space-x-2 text-zinc-900 dark:text-zinc-100 font-bold text-sm">
          <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
          <span>Important Legal Disclaimer</span>
        </div>
        <div className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed space-y-2">
          <p>
            <strong>Nyayota is an educational and informational tool, not a law firm.</strong> We do not provide legal advice, professional counsel, or representation in any court. Using this website or interacting with its AI assistant does not create a lawyer-client relationship.
          </p>
          <p>
            The summaries and explanations provided here are meant to assist study, research, and legal literacy. If you are dealing with an active legal case, dispute, or police investigation, you should always consult a qualified lawyer or contact the National Legal Aid Services Organization (NLASO Helpline: <strong>16430</strong>).
          </p>
        </div>
      </div>

      {/* Sourcing & Verification */}
      <div className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100 font-serif">
            How We Source and Verify Legal Texts
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
            Legal accuracy requires building directly on official primary records.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2.5">
            <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 flex items-center justify-center border border-zinc-200 dark:border-zinc-700">
              <FileCheck2 className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
              Official Government Gazettes
            </h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Bangladesh acts, ordinances, and codes are sourced directly from the official digital gazette maintained by the Ministry of Law, Justice and Parliamentary Affairs.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2.5">
            <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 flex items-center justify-center border border-zinc-200 dark:border-zinc-700">
              <Globe className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
              UN &amp; International Repositories
            </h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              International treaties and conventions are indexed from certified archives including the UN Treaty Series, OHCHR, and the International Committee of the Red Cross.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2.5">
            <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 flex items-center justify-center border border-zinc-200 dark:border-zinc-700">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
              Continuous Editorial Review
            </h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Summaries and bilingual terms are reviewed against primary statutory provisions to prevent misleading generalizations or loss of legal meaning.
            </p>
          </div>
        </div>
      </div>

      {/* Target Audiences */}
      <div className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100 font-serif">
            Who Uses Nyayota
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
            Built for anyone who needs fast, readable, and verifiable legal information.
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

      {/* PART 3: Current Status & Transparency Note */}
      <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-3">
        <div className="flex items-center space-x-2 text-zinc-900 dark:text-zinc-100 font-bold text-sm">
          <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
          <span>Current Status</span>
        </div>
        <div className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed space-y-2">
          <p>
            Nyayota is actively being developed. Our database of statutes, case precedents, and treaties is expanding over time, and some platform features remain in progress.
          </p>
          <p>
            While we strive for precision and keep texts closely aligned with official publications, laws are amended periodically and court interpretations evolve. For binding legal proceedings, formal compliance, or critical life decisions, you should always verify the current official gazette text and consult qualified legal counsel.
          </p>
        </div>
      </div>

      {/* Corrections & Errata Reporting */}
      <div className="p-6 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1.5 max-w-xl">
          <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
            Corrections &amp; Feedback
          </h2>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
            If you spot a typo in a section number, an outdated amendment, or a translation discrepancy, please let us know so we can fix it quickly.
          </p>
        </div>
        <Link
          href="/contact"
          className="px-4 py-2.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-white text-white dark:text-zinc-900 font-semibold text-xs inline-flex items-center space-x-2 transition-colors shrink-0"
        >
          <Mail className="w-3.5 h-3.5" />
          <span>Report a Correction</span>
        </Link>
      </div>
    </div>
  );
}
