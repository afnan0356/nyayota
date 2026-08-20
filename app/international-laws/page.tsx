'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Globe, Search, ArrowRight, BookOpen, ShieldCheck, Filter, Sparkles, Scale } from 'lucide-react';
import { LAWS_DATABASE, LawItem } from '@/lib/legal-data';

export default function InternationalLawsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const intLaws = LAWS_DATABASE.filter((l) => l.jurisdiction === 'International');

  const categories = ['All', 'Human Rights', 'International Humanitarian', 'Commercial & Contract'];

  const filteredLaws = intLaws.filter((law) => {
    const matchesCategory = selectedCategory === 'All' || law.category === selectedCategory;
    const matchesSearch =
      law.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      law.titleBn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      law.overview.toLowerCase().includes(searchQuery.toLowerCase()) ||
      law.keywords.some((k) => k.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-10">
      {/* Header Banner */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 text-xs font-semibold">
          <Globe className="w-3.5 h-3.5" />
          <span>Global Legal Repositories</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
          International Laws & Treaties Library
        </h1>
        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
          Access foundational multilateral conventions, United Nations human rights declarations, international humanitarian rules of conflict, and maritime governance instruments with bilingual summaries and section citations.
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
              id={`int-filter-cat-${cat.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-sm'
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
            id="int-laws-search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter international treaties..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/40 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400"
          />
        </div>
      </div>

      {/* Catalog Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredLaws.length > 0 ? (
          filteredLaws.map((law) => (
            <div
              key={law.id}
              className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-blue-500/40 shadow-sm transition-all flex flex-col justify-between space-y-5"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                    {law.category}
                  </span>
                  <div className="flex items-center space-x-2 text-xs text-zinc-500 dark:text-zinc-400">
                    <span className="font-semibold text-zinc-700 dark:text-zinc-300">{law.status}</span>
                    <span>•</span>
                    <span>Adopted {law.enactmentYear}</span>
                  </div>
                </div>

                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-white">
                    {law.title}
                  </h2>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">{law.titleBn}</p>
                </div>

                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  {law.overview}
                </p>

                {/* Key Highlights */}
                <div className="space-y-1.5 pt-2">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">Key Provisions:</p>
                  <ul className="space-y-1 text-xs text-zinc-600 dark:text-zinc-400">
                    {law.keyHighlights.slice(0, 2).map((h, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <span className="text-blue-500 shrink-0">•</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs">
                <span className="text-zinc-500">
                  {law.signatoriesCount ? `${law.signatoriesCount} State Parties` : 'Universal Standard'}
                </span>
                <div className="flex items-center space-x-3">
                  <Link
                    href={`/ai-assistant?query=${encodeURIComponent(`Explain key principles of ${law.title}`)}`}
                    className="text-zinc-500 hover:text-amber-500 flex items-center space-x-1"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>AI Breakdown</span>
                  </Link>
                  <Link
                    href={`/law/${law.id}`}
                    id={`int-open-reading-${law.id}`}
                    className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold inline-flex items-center space-x-1.5 transition-colors shadow-sm"
                  >
                    <span>Read Full Treaty</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-2 p-12 text-center bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 text-zinc-500">
            <p className="text-sm">No international treaties matching your search query.</p>
          </div>
        )}
      </div>
    </div>
  );
}
