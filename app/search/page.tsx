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
  Shield,
  SlidersHorizontal,
  RotateCcw,
  CheckCircle2,
  Calendar,
  Tag,
  Hash,
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import {
  LAWS_DATABASE,
  GLOSSARY_TERMS,
  POPULAR_SEARCHES_DATA,
  LawItem,
  LawSection,
  GlossaryTerm
} from '@/lib/legal-data';

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const initialCat = searchParams.get('category') || 'All';
  const initialJur = searchParams.get('jurisdiction') || 'All';

  const [query, setQuery] = useState(initialQuery);
  const [selectedJurisdiction, setSelectedJurisdiction] = useState<string>(initialJur);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCat);
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [searchScope, setSearchScope] = useState<'all' | 'title' | 'sections'>('all');
  const [sortBy, setSortBy] = useState<'relevance' | 'title' | 'year-desc' | 'year-asc' | 'sections'>('relevance');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const categories = [
    'All',
    'Criminal Law',
    'Constitutional Law',
    'Human Rights',
    'Cyber & Digital',
    'Labor & Employment',
    'Commercial & Contract',
    'Environment & Land',
    'Corporate & Governance'
  ];

  const jurisdictions = ['All', 'Bangladesh', 'International', 'United Kingdom'];
  const statuses = ['All', 'Active', 'Amended', 'Repealed', 'Draft'];

  const handleResetFilters = () => {
    setQuery('');
    setSelectedJurisdiction('All');
    setSelectedCategory('All');
    setSelectedStatus('All');
    setSearchScope('all');
    setSortBy('relevance');
  };

  // Search through laws
  const matchedLaws = useMemo(() => {
    let results = LAWS_DATABASE.filter((law) => {
      const matchJurisdiction = selectedJurisdiction === 'All' || law.jurisdiction === selectedJurisdiction;
      const matchCategory = selectedCategory === 'All' || law.category === selectedCategory;
      const matchStatus = selectedStatus === 'All' || law.status === selectedStatus;
      if (!matchJurisdiction || !matchCategory || !matchStatus) return false;

      if (!query.trim()) return true;

      const q = query.toLowerCase();

      if (searchScope === 'title') {
        return (
          law.title.toLowerCase().includes(q) ||
          law.titleBn.toLowerCase().includes(q) ||
          law.shortTitle.toLowerCase().includes(q)
        );
      }

      if (searchScope === 'sections') {
        return law.sections.some(
          (s) =>
            s.number.toLowerCase().includes(q) ||
            s.title.toLowerCase().includes(q) ||
            s.content.toLowerCase().includes(q)
        );
      }

      // Default 'all'
      return (
        law.title.toLowerCase().includes(q) ||
        law.titleBn.toLowerCase().includes(q) ||
        law.shortTitle.toLowerCase().includes(q) ||
        law.overview.toLowerCase().includes(q) ||
        law.keywords.some((k) => k.toLowerCase().includes(q)) ||
        law.sections.some((s) => s.number.toLowerCase().includes(q) || s.title.toLowerCase().includes(q))
      );
    });

    // Sorting
    results.sort((a, b) => {
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      if (sortBy === 'year-desc') return b.enactmentYear - a.enactmentYear;
      if (sortBy === 'year-asc') return a.enactmentYear - b.enactmentYear;
      if (sortBy === 'sections') return b.sections.length - a.sections.length;
      return 0; // relevance preserves original order
    });

    return results;
  }, [query, selectedJurisdiction, selectedCategory, selectedStatus, searchScope, sortBy]);

  // Search through sections
  const matchedSections = useMemo(() => {
    if (!query.trim() || searchScope === 'title') return [];
    const q = query.toLowerCase();
    const results: { law: LawItem; section: LawSection }[] = [];

    LAWS_DATABASE.forEach((law) => {
      if (selectedJurisdiction !== 'All' && law.jurisdiction !== selectedJurisdiction) return;
      if (selectedCategory !== 'All' && law.category !== selectedCategory) return;
      if (selectedStatus !== 'All' && law.status !== selectedStatus) return;

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
  }, [query, selectedJurisdiction, selectedCategory, selectedStatus, searchScope]);

  // Search through glossary
  const matchedGlossary = useMemo(() => {
    if (!query.trim() || searchScope === 'sections') return [];
    const q = query.toLowerCase();
    return GLOSSARY_TERMS.filter(
      (term) =>
        term.term.toLowerCase().includes(q) ||
        (term.termBn && term.termBn.toLowerCase().includes(q)) ||
        term.definition.toLowerCase().includes(q) ||
        term.simpleExplanation.toLowerCase().includes(q)
    );
  }, [query, searchScope]);

  const totalResults = matchedLaws.length + matchedSections.length + matchedGlossary.length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-6">
        <div className="space-y-2 max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-xs font-semibold">
            <Search className="w-3.5 h-3.5" />
            <span>Intelligent Legal Search Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            Advanced Legal Discovery & Search
          </h1>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Query statutory articles, comparative legal provisions, Latin maxims, and judicial principles across jurisdictions.
          </p>
        </div>

        <div className="flex items-center space-x-2 shrink-0">
          <Link
            href="/ai-assistant"
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs flex items-center space-x-2 shadow-sm transition-colors"
          >
            <Sparkles className="w-4 h-4" />
            <span>AI Legal Assistant</span>
          </Link>
          <Link
            href="/research"
            className="px-4 py-2 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 font-bold text-xs hover:bg-zinc-100 dark:hover:bg-zinc-700/80 transition-colors"
          >
            Research Workspace
          </Link>
        </div>
      </div>

      {/* Main Search Panel */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-5 h-5 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            id="advanced-search-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by statutory title, section (e.g. 300, 54, 102), Latin maxim, or legal topic..."
            className="w-full pl-12 pr-4 py-3.5 text-xs sm:text-sm bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-500/40 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 font-medium"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
            >
              Clear
            </button>
          )}
        </div>

        {/* Primary Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs pt-1">
          {/* Quick Jurisdiction Selector */}
          <div className="flex items-center space-x-1 p-1 bg-zinc-100 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800">
            {jurisdictions.map((jur) => (
              <button
                key={jur}
                type="button"
                id={`filter-jur-${jur.toLowerCase()}`}
                onClick={() => setSelectedJurisdiction(jur)}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                  selectedJurisdiction === jur
                    ? 'bg-amber-500 text-zinc-950 font-bold shadow-xs'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                {jur}
              </button>
            ))}
          </div>

          {/* Secondary Controls & Filter Toggle */}
          <div className="flex items-center space-x-2">
            <button
              type="button"
              id="toggle-advanced-filters-btn"
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center space-x-1.5 transition-colors ${
                showAdvancedFilters
                  ? 'bg-amber-500/10 border-amber-500/40 text-amber-600 dark:text-amber-400'
                  : 'bg-zinc-100 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters & Sorting</span>
            </button>

            {(selectedCategory !== 'All' || selectedStatus !== 'All' || searchScope !== 'all' || sortBy !== 'relevance') && (
              <button
                type="button"
                id="reset-all-filters-btn"
                onClick={handleResetFilters}
                className="px-2.5 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 text-zinc-500 hover:text-zinc-800 dark:hover:text-white text-xs flex items-center space-x-1 transition-colors"
                title="Reset all filters"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Expandable Advanced Filters Drawer */}
        {showAdvancedFilters && (
          <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs animate-in fade-in">
            {/* Category */}
            <div className="space-y-1">
              <label className="font-bold text-zinc-500 uppercase tracking-wider text-[10px]">Legal Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-2 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 font-medium focus:outline-none"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Status */}
            <div className="space-y-1">
              <label className="font-bold text-zinc-500 uppercase tracking-wider text-[10px]">Statutory Status</label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full p-2 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 font-medium focus:outline-none"
              >
                {statuses.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* Search Scope */}
            <div className="space-y-1">
              <label className="font-bold text-zinc-500 uppercase tracking-wider text-[10px]">Search In</label>
              <select
                value={searchScope}
                onChange={(e) => setSearchScope(e.target.value as any)}
                className="w-full p-2 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 font-medium focus:outline-none"
              >
                <option value="all">Entire Statute & Index</option>
                <option value="title">Act Titles Only</option>
                <option value="sections">Sections & Articles Only</option>
              </select>
            </div>

            {/* Sort Order */}
            <div className="space-y-1">
              <label className="font-bold text-zinc-500 uppercase tracking-wider text-[10px]">Sort Order</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full p-2 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 font-medium focus:outline-none"
              >
                <option value="relevance">Relevance</option>
                <option value="title">Title (Alphabetical)</option>
                <option value="year-desc">Enactment Year (Newest)</option>
                <option value="year-asc">Enactment Year (Oldest)</option>
                <option value="sections">Number of Sections</option>
              </select>
            </div>
          </div>
        )}

        {/* Popular Legal Search Terms Chips */}
        <div className="flex items-center space-x-2 pt-1 overflow-x-auto text-xs pb-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 shrink-0">Popular:</span>
          <div className="flex items-center space-x-1.5 flex-nowrap">
            {POPULAR_SEARCHES_DATA.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setQuery(item.query)}
                className="px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 hover:border-amber-500/40 text-[11px] text-zinc-600 dark:text-zinc-400 hover:text-amber-500 whitespace-nowrap transition-colors"
              >
                {item.query}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-zinc-500 px-1">
        <span>
          Found <strong>{totalResults}</strong> result{totalResults !== 1 ? 's' : ''} {query ? `matching "${query}"` : ''}
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

      {/* Results Presentation */}
      <div className="space-y-10">
        {/* 1. Direct Statute Matches */}
        {matchedLaws.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-900 dark:text-white flex items-center space-x-2">
              <Scale className="w-4 h-4 text-amber-500" />
              <span>Statutes & Legislative Acts ({matchedLaws.length})</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {matchedLaws.map((law) => (
                <div
                  key={law.id}
                  id={`search-result-law-${law.id}`}
                  className="p-5 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-amber-500/40 transition-all flex flex-col justify-between space-y-4 shadow-xs"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                        {law.jurisdiction} • {law.category}
                      </span>
                      <div className="flex items-center space-x-2 text-[11px] text-zinc-400 font-mono">
                        <span>Enacted {law.enactmentYear}</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          law.status === 'Active' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-zinc-500/10 text-zinc-400'
                        }`}>
                          {law.status}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-base font-bold text-zinc-900 dark:text-white leading-snug">
                      {law.title}
                    </h3>
                    <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium font-bangla">
                      {law.titleBn}
                    </p>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                      {law.overview}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-3 text-zinc-500">
                      <span>{law.sections.length} Sections</span>
                      <Link
                        href={`/ai-assistant?lawId=${law.id}`}
                        className="hover:text-amber-500 font-semibold flex items-center space-x-1"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Ask AI</span>
                      </Link>
                    </div>

                    <Link
                      href={`/law/${law.id}`}
                      className="px-3.5 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-amber-500 hover:text-zinc-950 text-zinc-900 dark:text-zinc-100 font-bold transition-all inline-flex items-center space-x-1 text-xs"
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

        {/* 2. Specific Section & Article Matches */}
        {matchedSections.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-900 dark:text-white flex items-center space-x-2">
              <FileText className="w-4 h-4 text-emerald-500" />
              <span>Specific Sections & Articles ({matchedSections.length})</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {matchedSections.map(({ law, section }, idx) => (
                <div
                  key={idx}
                  id={`search-result-section-${law.id}-${idx}`}
                  className="p-5 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-emerald-500/40 transition-all flex flex-col justify-between space-y-3 shadow-xs"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                        {section.number}
                      </span>
                      <span className="text-[11px] text-zinc-400">{law.shortTitle}</span>
                    </div>

                    <h3 className="text-sm font-bold text-zinc-900 dark:text-white">
                      {section.title}
                    </h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                      {section.simpleExplanation}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-xs">
                    <Link
                      href={`/ai-assistant?lawId=${law.id}&section=${encodeURIComponent(section.number)}`}
                      className="text-zinc-500 hover:text-amber-500 flex items-center space-x-1 font-semibold"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Explain in Plain Language</span>
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

        {/* 3. Glossary & Terminology Matches */}
        {matchedGlossary.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-900 dark:text-white flex items-center space-x-2">
              <BookOpen className="w-4 h-4 text-purple-500" />
              <span>Legal Terminology & Maxims ({matchedGlossary.length})</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {matchedGlossary.map((term, idx) => (
                <div
                  key={idx}
                  id={`search-result-term-${idx}`}
                  className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2 shadow-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-zinc-900 dark:text-white">{term.term}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-500">
                      {term.jurisdiction}
                    </span>
                  </div>
                  <p className="text-xs text-amber-600 dark:text-amber-400 font-medium font-bangla">{term.termBn}</p>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2">{term.simpleExplanation}</p>
                  <div className="pt-2">
                    <Link
                      href={`/ai-assistant?term=${encodeURIComponent(term.term)}`}
                      className="text-[11px] font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center space-x-1"
                    >
                      <span>Explore in AI Assistant</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty Search State */}
        {totalResults === 0 && (
          <div className="p-12 text-center bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 space-y-4">
            <HelpCircle className="w-10 h-10 text-zinc-400 mx-auto" />
            <h3 className="text-base font-bold text-zinc-900 dark:text-white">No Legal Matches Found</h3>
            <p className="text-xs text-zinc-500 max-w-sm mx-auto leading-relaxed">
              We couldn&apos;t find any laws or sections matching &quot;{query}&quot; with current filters. Try relaxing the category or jurisdiction filter.
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="px-4 py-2 rounded-xl bg-amber-500 text-zinc-950 font-bold text-xs inline-flex items-center space-x-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset All Filters</span>
            </button>
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
          Loading Unified Legal Search...
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
