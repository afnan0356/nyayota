'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  BookOpen,
  Search,
  Volume2,
  Sparkles,
  ChevronRight,
  Filter,
  Scale,
  GraduationCap,
  Layers,
  ArrowRight
} from 'lucide-react';
import { GLOSSARY_TERMS, GlossaryTerm } from '@/lib/legal-data';
import { GlossaryModal } from '@/components/GlossaryModal';

export default function LegalGlossaryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedJurisdiction, setSelectedJurisdiction] = useState<string>('All');
  const [activeModalTerm, setActiveModalTerm] = useState<GlossaryTerm | null>(null);

  // Extract unique categories
  const categories = useMemo(() => {
    const set = new Set(GLOSSARY_TERMS.map((t) => t.category));
    return ['All', ...Array.from(set)];
  }, []);

  const filteredTerms = useMemo(() => {
    return GLOSSARY_TERMS.filter((t) => {
      const matchSearch =
        !searchQuery.trim() ||
        t.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (t.termBn && t.termBn.toLowerCase().includes(searchQuery.toLowerCase())) ||
        t.definition.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.simpleExplanation.toLowerCase().includes(searchQuery.toLowerCase());

      const matchCategory =
        selectedCategory === 'All' || t.category === selectedCategory;

      const matchJurisdiction =
        selectedJurisdiction === 'All' ||
        t.jurisdiction === selectedJurisdiction ||
        (selectedJurisdiction === 'Universal' && t.jurisdiction === 'Universal');

      return matchSearch && matchCategory && matchJurisdiction;
    });
  }, [searchQuery, selectedCategory, selectedJurisdiction]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs text-zinc-500">
        <Link href="/" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3 h-3 text-zinc-400" />
        <span className="font-semibold text-zinc-800 dark:text-zinc-200">
          Legal Glossary & Terminology
        </span>
      </nav>

      {/* Hero Header */}
      <section className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-950 border border-zinc-800 text-white space-y-4 shadow-xl">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Legal Glossary & Maxims Directory
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400">
              Clear definitions, phonetic pronunciations, and plain-language breakdowns of complex legal terminology
            </p>
          </div>
        </div>

        {/* Real-time Search Input */}
        <div className="relative pt-2">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            id="glossary-search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search terms (e.g. Tort, Negligence, Mens Rea, Habeas Corpus, Bail)..."
            className="w-full pl-10 pr-4 py-3 rounded-2xl bg-zinc-800/80 border border-zinc-700 text-sm text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>
      </section>

      {/* Filter Tabs Bar */}
      <section className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm text-xs">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="font-bold text-zinc-400 uppercase tracking-wider text-[10px] mr-1">
            Category:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              id={`glossary-cat-${cat.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-amber-500 text-zinc-950 shadow-sm shadow-amber-500/20'
                  : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Count */}
        <div className="text-zinc-500 text-xs font-semibold">
          Showing <strong>{filteredTerms.length}</strong> legal terms
        </div>
      </section>

      {/* Glossary Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTerms.map((term, idx) => (
          <div
            key={idx}
            className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-amber-500/50 hover:shadow-lg transition-all flex flex-col justify-between space-y-4 group"
          >
            <div className="space-y-3">
              {/* Card Header */}
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                  {term.category}
                </span>
                <span className="text-[10px] text-zinc-400 font-semibold">
                  {term.jurisdiction}
                </span>
              </div>

              {/* Title & Bangla Name */}
              <div>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                  {term.term}
                </h3>
                {term.termBn && (
                  <p className="text-sm font-bangla text-zinc-500">
                    {term.termBn}
                  </p>
                )}
              </div>

              {/* Pronunciation */}
              {term.pronunciation && (
                <div className="flex items-center space-x-1.5 text-xs text-zinc-500">
                  <Volume2 className="w-3.5 h-3.5 text-amber-500" />
                  <span className="font-mono text-zinc-700 dark:text-zinc-300">
                    /{term.pronunciation}/
                  </span>
                </div>
              )}

              {/* Formal Definition */}
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block">
                  Formal Definition:
                </span>
                <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed line-clamp-3">
                  {term.definition}
                </p>
              </div>

              {/* Simplified Explainer */}
              <div className="p-3 rounded-2xl bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/20 space-y-1">
                <div className="flex items-center space-x-1 text-amber-700 dark:text-amber-400 text-[10px] font-bold uppercase tracking-wider">
                  <Sparkles className="w-3 h-3" />
                  <span>Plain Meaning:</span>
                </div>
                <p className="text-xs text-zinc-800 dark:text-zinc-200 leading-relaxed font-medium">
                  {term.simpleExplanation}
                </p>
              </div>
            </div>

            {/* Quick Action */}
            <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
              <button
                type="button"
                id={`open-glossary-modal-${term.term.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                onClick={() => setActiveModalTerm(term)}
                className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline inline-flex items-center space-x-1"
              >
                <span>View Full Definition & Examples</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredTerms.length === 0 && (
        <div className="p-12 text-center text-zinc-500 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
          No terms found matching your search. Try another keyword.
        </div>
      )}

      {/* Definition Modal */}
      <GlossaryModal
        term={activeModalTerm}
        isOpen={!!activeModalTerm}
        onClose={() => setActiveModalTerm(null)}
      />
    </div>
  );
}
