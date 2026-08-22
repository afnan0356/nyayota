'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import {
  Compass,
  Sparkles,
  Layers,
  BookOpen,
  Scale,
  Search,
  ArrowRight,
  TrendingUp,
  Award,
  ChevronRight,
  ExternalLink,
  Shield,
  FileText,
  Clock
} from 'lucide-react';
import {
  LAWS_DATABASE,
  KNOWLEDGE_PATHS_DATA,
  LEGAL_CONCEPTS_DATA,
  LEGAL_OUTCOME_SCENARIOS_DATA,
  POPULAR_SEARCHES_DATA,
  getLawRecommendations
} from '@/lib/legal-data';

function DiscoverContent() {
  // Recommended laws for the home discover feed
  const recommendedLaws = getLawRecommendations('bd-penal-code-1860', 4);
  const featuredPaths = KNOWLEDGE_PATHS_DATA.slice(0, 3);
  const featuredConcepts = LEGAL_CONCEPTS_DATA.slice(0, 4);
  const featuredScenarios = LEGAL_OUTCOME_SCENARIOS_DATA.slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-12">
      {/* Hero Discovery Banner */}
      <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-amber-500/10 via-zinc-900 to-zinc-950 border border-amber-500/30 text-white space-y-6 shadow-xl relative overflow-hidden">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold">
            <Compass className="w-3.5 h-3.5" />
            <span>Nyayota Discovery Engine</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Explore Legal Knowledge & Statutory Systems
          </h1>
          <p className="text-sm text-zinc-300 leading-relaxed">
            Discover codified laws, step-by-step educational curriculums, practical procedural guides, and AI-powered statutory explainers in one unified hub.
          </p>
        </div>

        {/* Global Discovery Search Gateway */}
        <div className="max-w-xl">
          <Link
            href="/search"
            className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-zinc-900/90 border border-amber-500/40 text-zinc-400 hover:text-white hover:border-amber-400 text-xs sm:text-sm font-medium shadow-inner transition-all group"
          >
            <div className="flex items-center space-x-2.5">
              <Search className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
              <span>Search acts, sections, Latin maxims, or constitutional writs...</span>
            </div>
            <ArrowRight className="w-4 h-4 text-amber-400" />
          </Link>
        </div>

        {/* Popular Tags */}
        <div className="flex items-center space-x-2 pt-2 text-xs overflow-x-auto">
          <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 shrink-0">
            Trending Searches:
          </span>
          <div className="flex items-center space-x-1.5 flex-nowrap">
            {POPULAR_SEARCHES_DATA.slice(0, 5).map((s, idx) => (
              <Link
                key={idx}
                href={s.targetHref || `/search?q=${encodeURIComponent(s.query)}`}
                className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-amber-500/20 text-zinc-300 hover:text-amber-300 border border-white/10 text-[11px] whitespace-nowrap transition-colors"
              >
                {s.query}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 1: KNOWLEDGE PATHS (STRUCTURED LEARNING) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-xl font-extrabold text-zinc-900 dark:text-white flex items-center space-x-2">
              <Layers className="w-5 h-5 text-amber-500" />
              <span>Curated Knowledge Paths</span>
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Structured step-by-step legal curriculums for students, advocates, and researchers.
            </p>
          </div>

          <Link
            href="/knowledge-paths"
            className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center space-x-1"
          >
            <span>Explore All Paths</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {featuredPaths.map((path) => (
            <Link
              key={path.id}
              href={`/knowledge-paths`}
              className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-amber-500/50 hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400">
                    {path.category}
                  </span>
                  <span className="text-[11px] text-zinc-400 font-mono flex items-center space-x-1">
                    <Clock className="w-3 h-3 text-zinc-400" />
                    <span>{path.totalTimeEstimate}</span>
                  </span>
                </div>
                <h3 className="text-base font-bold text-zinc-900 dark:text-white group-hover:text-amber-500 transition-colors">
                  {path.title}
                </h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                  {path.description}
                </p>
              </div>

              <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs font-bold text-amber-600 dark:text-amber-400">
                <span>{path.milestones.length} Milestones</span>
                <span className="group-hover:translate-x-1 transition-transform inline-flex items-center">
                  Start Path <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* SECTION 2: LEGAL OUTCOME GUIDES (PRACTICAL PATHWAYS) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-xl font-extrabold text-zinc-900 dark:text-white flex items-center space-x-2">
              <Compass className="w-5 h-5 text-emerald-500" />
              <span>Legal Outcome & Procedural Guides</span>
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Scenario-based roadmaps detailing legal rights, evidence preservation, and remedies.
            </p>
          </div>

          <Link
            href="/legal-outcome-guide"
            className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center space-x-1"
          >
            <span>View All Guides</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {featuredScenarios.map((sc) => (
            <Link
              key={sc.id}
              href={`/legal-outcome-guide?scenario=${sc.id}`}
              className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-emerald-500/50 hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-2.5">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  {sc.legalArea}
                </span>
                <h3 className="text-base font-bold text-zinc-900 dark:text-white group-hover:text-emerald-500 transition-colors">
                  {sc.topicTitle}
                </h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                  {sc.scenarioSummary}
                </p>
              </div>

              <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs font-bold text-emerald-600 dark:text-emerald-400">
                <span>{sc.proceduralSteps?.length || 4} Action Steps</span>
                <span className="group-hover:translate-x-1 transition-transform inline-flex items-center">
                  Read Guide <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* SECTION 3: RECOMMENDED STATUTES & ENCYCLOPEDIA */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Recommended Laws (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-extrabold text-zinc-900 dark:text-white flex items-center space-x-2">
              <Scale className="w-5 h-5 text-amber-500" />
              <span>Recommended Statutory Acts</span>
            </h2>
            <Link href="/search" className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline">
              All Statutes
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {recommendedLaws.map((law) => (
              <div
                key={law.id}
                className="p-5 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-amber-500/40 transition-all flex flex-col justify-between space-y-3 shadow-xs"
              >
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                    {law.category}
                  </span>
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-white leading-snug">
                    {law.title}
                  </h3>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                    {law.simpleSummary || law.overview}
                  </p>
                </div>

                <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs">
                  <span className="text-zinc-400 text-[11px]">{law.sections.length} Sections</span>
                  <Link
                    href={`/law/${law.id}`}
                    className="text-amber-600 dark:text-amber-400 font-bold hover:underline inline-flex items-center space-x-1"
                  >
                    <span>Read Act</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Legal Concepts Library Highlights (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-extrabold text-zinc-900 dark:text-white flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-purple-500" />
              <span>Legal Doctrines & Maxims</span>
            </h2>
            <Link href="/concepts" className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline">
              View All
            </Link>
          </div>

          <div className="p-5 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-3">
            {featuredConcepts.map((concept) => (
              <Link
                key={concept.id}
                href="/concepts"
                className="p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 hover:border-purple-500/40 flex items-center justify-between text-xs transition-colors group block"
              >
                <div>
                  <span className="font-bold text-zinc-900 dark:text-white block group-hover:text-purple-400">
                    {concept.name}
                  </span>
                  <span className="text-[11px] text-amber-600 dark:text-amber-400 font-bangla">
                    {concept.nameBn}
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:text-purple-400" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DiscoverPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-20 text-center text-zinc-500 text-sm">
          Loading Discovery Hub...
        </div>
      }
    >
      <DiscoverContent />
    </Suspense>
  );
}
