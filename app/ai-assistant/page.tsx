import React from 'react';
import Link from 'next/link';
import {
  Scale,
  ArrowLeft,
  BookOpen,
  Layers,
  Search,
  ExternalLink,
  ShieldAlert,
  Hammer,
  FileText,
  Clock
} from 'lucide-react';

export const metadata = {
  title: 'Legal Assistant Under Development | Nyayota',
  description: 'Nyayota Legal Assistant is temporarily unavailable while conversational capabilities and source-grounded legal retrieval are being upgraded.',
};

export default function AIAssistantPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Navigation Breadcrumb */}
      <div>
        <Link
          href="/"
          className="inline-flex items-center space-x-1.5 text-xs font-semibold text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500/50 rounded-lg px-1.5 py-0.5"
          aria-label="Back to home page"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </Link>
      </div>

      {/* Main Maintenance Card */}
      <div className="rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm p-6 sm:p-10 space-y-8">
        {/* Under Development Status Pill */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20 text-xs font-semibold">
            <Hammer className="w-3.5 h-3.5 text-amber-500" />
            <span>Assistant Under Development</span>
          </div>

          <span className="inline-flex items-center space-x-1.5 text-xs text-zinc-500 dark:text-zinc-400 font-medium">
            <Clock className="w-3.5 h-3.5" />
            <span>Temporarily Suspended for System Upgrade</span>
          </span>
        </div>

        {/* Headline & Explanatory Statement */}
        <div className="space-y-4">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            Nyayota Legal Assistant is under development
          </h1>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed">
            We&apos;re improving Nyayota&apos;s legal research and conversational capabilities to make answers clearer, more reliable, and better grounded in primary legal sources.
          </p>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            The assistant is temporarily unavailable while this work continues. In the meantime, you can directly explore our codified statutes, search legal provisions, or study guided legal knowledge paths.
          </p>
        </div>

        {/* Primary Navigation Actions */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <Link
            href="/bangladesh-laws"
            id="maintenance-btn-laws-catalog"
            className="px-5 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs sm:text-sm inline-flex items-center space-x-2 transition-all shadow-xs focus:outline-none focus:ring-2 focus:ring-amber-500/50 cursor-pointer"
          >
            <BookOpen className="w-4 h-4" />
            <span>Browse Bangladesh Laws</span>
          </Link>

          <Link
            href="/"
            id="maintenance-btn-home"
            className="px-5 py-2.5 rounded-2xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 font-semibold text-xs sm:text-sm inline-flex items-center space-x-2 transition-all focus:outline-none focus:ring-2 focus:ring-zinc-500/50 cursor-pointer"
          >
            <span>Return to Homepage</span>
          </Link>
        </div>

        {/* Alternate Statutory Research Channels */}
        <div className="border-t border-zinc-200 dark:border-zinc-800 pt-8 space-y-4">
          <div className="flex items-center space-x-2">
            <Scale className="w-4 h-4 text-amber-500" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
              Explore Available Legal Research Resources
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              href="/bangladesh-laws"
              className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 hover:border-amber-500/40 transition-all space-y-2 group"
            >
              <div className="flex items-center justify-between text-zinc-900 dark:text-white font-bold text-sm group-hover:text-amber-500">
                <span>Codified Laws</span>
                <BookOpen className="w-4 h-4 text-zinc-400 group-hover:text-amber-500" />
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Search the Constitution, Penal Code 1860, CrPC 1898, and other Bangladesh Code enactments.
              </p>
            </Link>

            <Link
              href="/concepts"
              className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 hover:border-amber-500/40 transition-all space-y-2 group"
            >
              <div className="flex items-center justify-between text-zinc-900 dark:text-white font-bold text-sm group-hover:text-amber-500">
                <span>Legal Glossary</span>
                <Layers className="w-4 h-4 text-zinc-400 group-hover:text-amber-500" />
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Review definitions, legal maxims, and terminology with English and Bengali translations.
              </p>
            </Link>

            <Link
              href="/knowledge-paths"
              className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 hover:border-amber-500/40 transition-all space-y-2 group"
            >
              <div className="flex items-center justify-between text-zinc-900 dark:text-white font-bold text-sm group-hover:text-amber-500">
                <span>Knowledge Paths</span>
                <FileText className="w-4 h-4 text-zinc-400 group-hover:text-amber-500" />
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Structured step-by-step guides on fundamental constitutional rights and criminal procedure.
              </p>
            </Link>
          </div>
        </div>
      </div>

      {/* Official Government Source Reference */}
      <div className="p-6 rounded-3xl bg-zinc-100/70 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-600 dark:text-zinc-400 space-y-3">
        <div className="flex items-center space-x-2 font-bold text-zinc-900 dark:text-zinc-200">
          <ShieldAlert className="w-4 h-4 text-amber-500" />
          <span>Statutory Authority & Official Sources</span>
        </div>
        <p className="text-[11px] leading-relaxed">
          For authoritative statutory text and official gazettes of Bangladesh legislation, consult the Legislative and Parliamentary Affairs Division portal at{' '}
          <a
            href="https://bdlaws.minlaw.gov.bd/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-600 dark:text-amber-400 underline font-semibold inline-flex items-center space-x-0.5"
          >
            <span>bdlaws.minlaw.gov.bd</span>
            <ExternalLink className="w-3 h-3 ml-0.5 inline" />
          </a>
          . Nyayota provides civic educational resources and is not a substitute for licensed legal representation.
        </p>
      </div>
    </div>
  );
}
