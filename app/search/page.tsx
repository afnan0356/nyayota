'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  Search,
  Scale,
  Globe,
  BookOpen,
  ArrowRight,
  Sparkles,
  Filter,
  Layers,
  FileText,
  HelpCircle,
  Shield
} from 'lucide-react';
import { LAWS_DATABASE, GLOSSARY_TERMS, LawItem, LawSection, GlossaryTerm } from '@/lib/legal-data';

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const [selectedJurisdiction, setSelectedJurisdiction] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Criminal Law', 'Constitutional Law', 'Human Rights', 'Cyber & Digital', 'Labor & Employment', 'Commercial & Contract'];

  // Search through laws
  const matchedLaws = useMemo(() => {
    return LAWS_DATABASE.filter((law) => {
      const matchJurisdiction = selectedJurisdiction === 'All' || law.jurisdiction === selectedJurisdiction;
      const matchCategory = selectedCategory === 'All' || law.category === selectedCategory;
      if (!matchJurisdiction || !matchCategory) return false;

      if (!query.trim()) return true;

      const q = query.toLowerCase();
      return (
        law.title.toLowerCase().includes(q) ||
        law.titleBn.toLowerCase().includes(q) ||
        law.shortTitle.toLowerCase().includes(q) ||
        law.overview.toLowerCase().includes(q) ||
        law.keywords.some((k) => k.toLowerCase().includes(q))
      );
    });
  }, [query, selectedJurisdiction, selectedCategory]);

  // Search through sections
  const matchedSections = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    const results: { law: LawItem; section: LawSection }[] = [];

    LAWS_DATABASE.forEach((law) => {
      if (selectedJurisdiction !== 'All' && law.jurisdiction !== selectedJurisdiction) return;
      if (selectedCategory !== 'All' && law.category !== selectedCategory) return;

      law.sections.forEach((section) => {
        if (
          section.number.toLowerCase().includes(q) ||
          section.title.toLowerCase().includes(q) ||
          (section.titleBn && section.titleBn.toLowerCase().includes(q)) ||
          section.content.toLowerCase().includes(q) ||
          (section.contentBn && section.contentBn.toLowerCase().includes(q)) ||
          section.simpleExplanation.toLowerCase().includes(q)
        ) {
          results.push({ law, section });
        }
      });
    });

    return results;
  }, [query, selectedJurisdiction, selectedCategory]);

  // Search through glossary
  const matchedGlossary = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return GLOSSARY_TERMS.filter(
      (term) =>
        term.term.toLowerCase().includes(q) ||
        term.termBn.toLowerCase().includes(q) ||
        term.definition.toLowerCase().includes(q) ||
        term.simpleExplanation.toLowerCase().includes(q)
    );
  }, [query]);

  const totalResults = matchedLaws.length + matchedSections.length + matchedGlossary.length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-8">
      {/* Search Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-xs font-semibold">
          <Search className="w-3.5 h-3.5" />
          <span>Unified Legal Search</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
          Comprehensive Legal Index
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
          Search across codified acts, treaty articles, procedural guides, and Latin maxims.
        </p>
      </div>

      {/* Search Controls */}
      <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
        <div className="relative">
          <Search className="w-5 h-5 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            id="deep-search-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by act title, section (e.g. 300, 54, 102), Latin maxim, or topic..."
            className="w-full pl-12 pr-4 py-3.5 text-sm bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-500/40 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 font-medium"
          />
        </div>

        {/* Filter Badges */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 text-xs">
          {/* Jurisdiction toggle */}
          <div className="flex items-center space-x-1.5 p-1 bg-zinc-100 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800">
            {['All', 'Bangladesh', 'International'].map((jur) => (
              <button
                key={jur}
                type="button"
                id={`search-filter-jur-${jur.toLowerCase()}`}
                onClick={() => setSelectedJurisdiction(jur)}
                className={`px-3 py-1 rounded-lg font-medium transition-all ${
                  selectedJurisdiction === jur
                    ? 'bg-amber-500 text-zinc-950 shadow-xs'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                {jur === 'All' ? 'All Jurisdictions' : jur}
              </button>
            ))}
          </div>

          {/* Category Dropdown/Pills */}
          <div className="flex items-center space-x-2">
            <span className="text-zinc-500">Category:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="p-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 text-xs focus:outline-none"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results Meta */}
      <div className="flex items-center justify-between text-xs text-zinc-500 px-1">
        <span>
          Showing {totalResults} result{totalResults !== 1 ? 's' : ''} {query ? `for "${query}"` : ''}
        </span>
        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            className="text-amber-600 dark:text-amber-400 hover:underline font-semibold"
          >
            Clear Search
          </button>
        )}
      </div>

      {/* Result Groups */}
      <div className="space-y-10">
        {/* 1. Direct Statute Matches */}
        {matchedLaws.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-500 flex items-center space-x-2">
              <Scale className="w-4 h-4 text-amber-500" />
              <span>Statutes & Treaties ({matchedLaws.length})</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {matchedLaws.map((law) => (
                <div
                  key={law.id}
                  className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-amber-500/40 transition-all flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400">
                        {law.jurisdiction} • {law.category}
                      </span>
                      <span className="text-[11px] text-zinc-400 font-mono">Enacted {law.enactmentYear}</span>
                    </div>
                    <h3 className="text-base font-bold text-zinc-900 dark:text-white">{law.title}</h3>
                    <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">{law.titleBn}</p>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2">{law.overview}</p>
                  </div>

                  <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs">
                    <span className="text-zinc-500">{law.sections.length} Indexed Sections</span>
                    <Link
                      href={`/law/${law.id}`}
                      className="text-amber-600 dark:text-amber-400 font-bold hover:underline inline-flex items-center space-x-1"
                    >
                      <span>Read Statute</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 2. Specific Section Matches */}
        {matchedSections.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-500 flex items-center space-x-2">
              <FileText className="w-4 h-4 text-emerald-500" />
              <span>Specific Sections & Articles ({matchedSections.length})</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {matchedSections.map(({ law, section }, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-emerald-500/40 transition-all flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                        {section.number}
                      </span>
                      <span className="text-[10px] text-zinc-400">{law.shortTitle}</span>
                    </div>
                    <h3 className="text-sm font-bold text-zinc-900 dark:text-white">{section.title}</h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2">
                      {section.simpleExplanation}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs">
                    <Link
                      href={`/ai-assistant?query=${encodeURIComponent(`Explain ${law.shortTitle} ${section.number}`)}`}
                      className="text-zinc-500 hover:text-amber-500 flex items-center space-x-1"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>AI Explainer</span>
                    </Link>
                    <Link
                      href={`/law/${law.id}?section=${encodeURIComponent(section.number)}`}
                      className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline inline-flex items-center space-x-1"
                    >
                      <span>View Section</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. Glossary Term Matches */}
        {matchedGlossary.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-500 flex items-center space-x-2">
              <BookOpen className="w-4 h-4 text-purple-500" />
              <span>Legal Terminology & Maxims ({matchedGlossary.length})</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {matchedGlossary.map((term, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-zinc-900 dark:text-white">{term.term}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-500">
                      {term.jurisdiction}
                    </span>
                  </div>
                  <p className="text-xs text-amber-600 dark:text-amber-400 font-medium">{term.termBn}</p>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2">{term.simpleExplanation}</p>
                  <div className="pt-2">
                    <Link
                      href={`/ai-assistant?term=${encodeURIComponent(term.term)}`}
                      className="text-[11px] font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center space-x-1"
                    >
                      <span>Explore Term in AI Assistant</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty state */}
        {totalResults === 0 && (
          <div className="p-12 text-center bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 space-y-3">
            <HelpCircle className="w-10 h-10 text-zinc-400 mx-auto" />
            <h3 className="text-base font-bold text-zinc-900 dark:text-white">No Legal Matches Found</h3>
            <p className="text-xs text-zinc-500 max-w-sm mx-auto">
              We couldn&apos;t find any laws or sections matching &quot;{query}&quot;. Try searching for &quot;Penal Code&quot;, &quot;Murder&quot;, &quot;Arrest&quot;, or &quot;Constitution&quot;.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-20 text-center text-zinc-500 text-sm">
          Loading Unified Search...
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
