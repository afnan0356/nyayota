'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Scale, Search, ArrowRight, BookOpen, Shield, Sparkles, Filter } from 'lucide-react';
import { LAWS_DATABASE, LawItem } from '@/lib/legal-data';

export default function BangladeshLawsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const bdLaws = LAWS_DATABASE.filter((l) => l.jurisdiction === 'Bangladesh');

  const categories = ['All', 'Criminal Law', 'Constitutional Law', 'Cyber & Digital', 'Labor & Employment'];

  const filteredLaws = bdLaws.filter((law) => {
    const matchesCategory = selectedCategory === 'All' || law.category === selectedCategory;
    const matchesSearch =
      law.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      law.titleBn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      law.shortTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      law.overview.toLowerCase().includes(searchQuery.toLowerCase()) ||
      law.keywords.some((k) => k.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-10">
      {/* Header Banner */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-semibold">
          <Scale className="w-3.5 h-3.5" />
          <span>Bangladesh Legal Code & Acts</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
          Bangladesh Laws Library (বাংলাদেশ আইনসমূহ)
        </h1>
        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
          Search substantive and procedural statutes of the People&apos;s Republic of Bangladesh. Review constitutional fundamental rights, penal provisions, cyber regulations, labor standards, and procedural rules in dual English and Bangla.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              id={`bd-filter-cat-${cat.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Local Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            id="bd-laws-search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Bangladesh Acts (e.g. 1860, CrPC)..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/40 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400"
          />
        </div>
      </div>

      {/* Catalog Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredLaws.length > 0 ? (
          filteredLaws.map((law) => (
            <div
              key={law.id}
              className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-emerald-500/40 shadow-sm transition-all flex flex-col justify-between space-y-5"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    {law.category}
                  </span>
                  <div className="flex items-center space-x-2 text-xs text-zinc-500 dark:text-zinc-400">
                    <span className="font-semibold text-zinc-700 dark:text-zinc-300">{law.status}</span>
                    <span>•</span>
                    <span>Act of {law.enactmentYear}</span>
                  </div>
                </div>

                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-white">
                    {law.title}
                  </h2>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium mt-0.5">{law.titleBn}</p>
                </div>

                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  {law.overview}
                </p>

                {/* Section Previews */}
                <div className="space-y-2 pt-1">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">Indexed Sections:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {law.sections.map((sec, i) => (
                      <Link
                        key={i}
                        href={`/law/${law.id}?section=${encodeURIComponent(sec.number)}`}
                        className="p-2 rounded-lg bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800/80 hover:border-emerald-500/40 transition-colors text-xs"
                      >
                        <span className="font-semibold text-zinc-900 dark:text-white block line-clamp-1">{sec.number}: {sec.title}</span>
                        <span className="text-[10px] text-zinc-500 block line-clamp-1">{sec.simpleExplanation}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs">
                <span className="text-zinc-500">
                  {law.lastAmendedYear ? `Last Amended ${law.lastAmendedYear}` : `Original Enactment ${law.enactmentYear}`}
                </span>
                <div className="flex items-center space-x-3">
                  <Link
                    href={`/ai-assistant?query=${encodeURIComponent(`Explain key sections of ${law.title}`)}`}
                    className="text-zinc-500 hover:text-amber-500 flex items-center space-x-1"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>AI Breakdown</span>
                  </Link>
                  <Link
                    href={`/law/${law.id}`}
                    id={`bd-open-reading-${law.id}`}
                    className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold inline-flex items-center space-x-1.5 transition-colors shadow-sm"
                  >
                    <span>Read Full Code</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-2 p-12 text-center bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 text-zinc-500">
            <p className="text-sm">No statutes found matching your filter criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
