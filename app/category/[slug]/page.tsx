'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  Scale,
  Globe,
  BookOpen,
  ArrowRight,
  Shield,
  Layers,
  Compass,
  FileText,
  Users,
  Leaf,
  ShieldAlert,
  Sparkles,
  Search,
  CheckCircle2,
  HelpCircle,
  Clock,
  ArrowLeft
} from 'lucide-react';
import {
  LEGAL_CATEGORIES_DATA,
  LAWS_DATABASE,
  GLOSSARY_TERMS,
  LEGAL_OUTCOME_PATHWAYS,
  LegalCategoryInfo,
  LawItem
} from '@/lib/legal-data';

interface PageProps {
  params: Promise<{ slug: string }>;
}

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Shield,
  Scale,
  Globe,
  Sparkles,
  Layers,
  Compass,
  FileText,
  Users,
  Leaf,
  ShieldAlert,
};

function CategoryIcon({ name, className }: { name: string; className?: string }) {
  const Icon = ICON_MAP[name] || Scale;
  return <Icon className={className} />;
}

export default function CategoryDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;

  const category = LEGAL_CATEGORIES_DATA.find((c) => c.slug === slug);

  if (!category) {
    // If category not found, return 404
    notFound();
  }

  // Find laws matching this category
  const matchingLaws = LAWS_DATABASE.filter(
    (l) => l.category.toLowerCase() === category.title.toLowerCase() ||
           l.category.toLowerCase().includes(category.slug.replace('-', ' ')) ||
           (category.slug === 'commercial-contract' && l.category === 'Commercial & Contract') ||
           (category.slug === 'cyber-digital' && l.category === 'Cyber & Digital') ||
           (category.slug === 'labor-employment' && l.category === 'Labor & Employment') ||
           (category.slug === 'family-law' && l.category === 'Family Law') ||
           (category.slug === 'environmental-law' && l.category === 'Environmental Law') ||
           (category.slug === 'civil-procedure' && l.category === 'Civil Procedure') ||
           (category.slug === 'international-humanitarian' && l.category === 'International Humanitarian')
  );

  // Find glossary terms matching this category
  const matchingGlossary = GLOSSARY_TERMS.filter(
    (g) => g.category.toLowerCase().includes(category.title.toLowerCase()) ||
           category.title.toLowerCase().includes(g.category.toLowerCase())
  );

  // Find outcome guides
  const matchingOutcomes = LEGAL_OUTCOME_PATHWAYS.filter(
    (o) => o.category.toLowerCase().includes(category.title.toLowerCase()) ||
           category.title.toLowerCase().includes(o.category.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-12">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center space-x-2 text-xs text-zinc-500 dark:text-zinc-400">
        <Link href="/" className="hover:text-zinc-900 dark:hover:text-white flex items-center space-x-1">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Home</span>
        </Link>
        <span>/</span>
        <span className="text-zinc-700 dark:text-zinc-300 font-medium">Categories</span>
        <span>/</span>
        <span className="text-amber-600 dark:text-amber-400 font-semibold">{category.title}</span>
      </div>

      {/* Category Header Banner */}
      <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-3 max-w-3xl">
          <div className="flex items-center space-x-3">
            <div className="p-3.5 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
              <CategoryIcon name={category.iconName} className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 block">
                Legal Category Archive
              </span>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white">
                {category.title} <span className="text-zinc-400 font-normal text-lg sm:text-2xl">({category.titleBn})</span>
              </h1>
            </div>
          </div>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed pt-1">
            {category.description} • {category.descriptionBn}
          </p>
          <div className="flex flex-wrap items-center gap-2 pt-2 text-xs">
            <span className="px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 font-medium">
              Jurisdiction: <strong>{category.primaryJurisdiction}</strong>
            </span>
            <span className="px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 font-medium">
              {category.countLabel}
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 w-full md:w-auto shrink-0">
          <Link
            href={`/search?category=${encodeURIComponent(category.title)}`}
            className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs flex items-center justify-center space-x-2 transition-colors shadow-sm"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Search in this Category</span>
          </Link>
          <Link
            href={`/ai-assistant?q=${encodeURIComponent(`Explain key principles of ${category.title}`)}`}
            className="px-4 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 font-semibold text-xs flex items-center justify-center space-x-2 transition-colors border border-zinc-200 dark:border-zinc-700"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Ask AI About this Domain</span>
          </Link>
        </div>
      </div>

      {/* 1. Codified Statutes & Treaties */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white">
              Authoritative Statutes & Treaties ({matchingLaws.length})
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
              Primary legislation and international conventions in {category.title}.
            </p>
          </div>
        </div>

        {matchingLaws.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {matchingLaws.map((law) => (
              <div
                key={law.id}
                className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-amber-500/40 shadow-sm transition-all flex flex-col justify-between space-y-5"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                      {law.jurisdiction}
                    </span>
                    <span className="text-xs text-zinc-400">
                      {law.actNumber || `Year ${law.enactmentYear}`}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                      {law.title}
                    </h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">{law.titleBn}</p>
                  </div>

                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-3">
                    {law.overview}
                  </p>

                  <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800 text-xs">
                    <span className="font-semibold text-zinc-900 dark:text-white block mb-1">
                      Plain Language Summary:
                    </span>
                    <p className="text-zinc-600 dark:text-zinc-400 text-[11px] leading-relaxed">
                      {law.simpleSummary}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs">
                  <span className="text-zinc-500">{law.sections.length} Core Sections</span>
                  <Link
                    href={`/law/${law.id}`}
                    className="font-bold text-amber-600 dark:text-amber-400 hover:underline inline-flex items-center space-x-1"
                  >
                    <span>Read Full Law</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-dashed border-zinc-300 dark:border-zinc-800 text-center space-y-3">
            <BookOpen className="w-8 h-8 text-zinc-400 mx-auto" />
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              No direct statute assigned yet in this specific category archive. Use global search or AI Assistant.
            </p>
            <Link
              href="/search"
              className="inline-flex items-center space-x-1 text-xs font-bold text-amber-600 hover:underline"
            >
              <span>Search All Repositories</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        )}
      </section>

      {/* 2. Procedural Pathways & Guides */}
      {matchingOutcomes.length > 0 && (
        <section className="space-y-6">
          <div className="border-b border-zinc-200 dark:border-zinc-800 pb-3">
            <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white">
              Procedural Outcome Guides in this Field
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
              Step-by-step practical guides on court processes, police reports, and rights.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {matchingOutcomes.map((path) => (
              <div
                key={path.id}
                className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-amber-600 dark:text-amber-400">{path.jurisdiction}</span>
                  <span className="text-zinc-400">{path.stages.length} Stages</span>
                </div>
                <div>
                  <h3 className="text-base font-bold text-zinc-900 dark:text-white">{path.title}</h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">{path.titleBn}</p>
                </div>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {path.summary}
                </p>
                <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs">
                  <span className="text-zinc-400 font-mono text-[11px]">{path.estimatedTimeline}</span>
                  <Link
                    href={`/legal-outcome-guide?topic=${path.id}`}
                    className="font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center space-x-1"
                  >
                    <span>View Step-by-Step Guide</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 3. Key Legal Terminology & Glossary */}
      {matchingGlossary.length > 0 && (
        <section className="space-y-6">
          <div className="border-b border-zinc-200 dark:border-zinc-800 pb-3">
            <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white">
              Related Legal Terminology ({matchingGlossary.length})
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
              Essential concepts, Latin maxims, and definitions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {matchingGlossary.map((term, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-zinc-900 dark:text-white">{term.term}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-500">{term.jurisdiction}</span>
                </div>
                <p className="text-xs text-amber-600 dark:text-amber-400 font-medium">{term.termBn}</p>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">{term.simpleExplanation}</p>
                <Link
                  href={`/ai-assistant?term=${encodeURIComponent(term.term)}`}
                  className="text-[11px] font-semibold text-amber-600 hover:underline inline-flex items-center space-x-1 pt-1"
                >
                  <span>Explore In-Depth</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Other Legal Categories Quick Switcher */}
      <section className="border-t border-zinc-200 dark:border-zinc-800 pt-8 space-y-4">
        <h3 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider">
          Explore Other Legal Domains
        </h3>
        <div className="flex flex-wrap gap-2">
          {LEGAL_CATEGORIES_DATA.filter((c) => c.slug !== category.slug).map((c) => (
            <Link
              key={c.id}
              href={`/category/${c.slug}`}
              className="px-3 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-amber-500/10 hover:text-amber-600 dark:hover:text-amber-400 text-xs font-medium transition-colors border border-zinc-200 dark:border-zinc-700/50"
            >
              {c.title} ({c.titleBn})
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
