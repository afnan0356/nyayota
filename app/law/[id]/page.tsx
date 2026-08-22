'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  BookOpen,
  Scale,
  Sparkles,
  Copy,
  Check,
  Printer,
  Share2,
  ArrowLeft,
  ArrowRight,
  Globe,
  Clock,
  CheckCircle2,
  HelpCircle,
  FileText,
  Bookmark,
  Layers,
  ChevronRight,
  Info,
  ShieldCheck,
  Download,
  Eye,
  Maximize2,
  Minimize2,
  Type,
  Languages,
  Quote,
  Search,
  ExternalLink,
  Building2,
  Calendar,
  AlertCircle,
  ArrowLeftRight,
  CheckCircle,
  History,
  FileDown
} from 'lucide-react';
import {
  LAWS_DATABASE,
  LawItem,
  LawSection,
  getEnrichedLaw,
  GLOSSARY_TERMS,
  GlossaryTerm
} from '@/lib/legal-data';
import { isLawBookmarked, toggleLocalBookmark } from '@/lib/bookmarks';
import { addCitationToCollection, isCitationCollected } from '@/lib/research';
import { SourceVerificationModal } from '@/components/SourceVerificationModal';
import { CitationModal } from '@/components/CitationModal';
import { GlossaryModal } from '@/components/GlossaryModal';

function LawDetailContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const rawId = params?.id as string;
  const initialSectionParam = searchParams.get('section');

  const law = useMemo(() => {
    return getEnrichedLaw(rawId);
  }, [rawId]);

  // Reading & UI state
  const [activeLanguageView, setActiveLanguageView] = useState<'dual' | 'en' | 'bn' | 'es' | 'fr' | 'de' | 'ar'>('dual');
  const [readingMode, setReadingMode] = useState(false);
  const [fontSize, setFontSize] = useState<'sm' | 'base' | 'lg' | 'xl'>('base');
  const [fontFamily, setFontFamily] = useState<'sans' | 'serif'>('sans');
  const [selectedSectionNumber, setSelectedSectionNumber] = useState<string>(
    initialSectionParam || law.sections[0]?.number || ''
  );
  const [searchSectionQuery, setSearchSectionQuery] = useState('');
  const [explainLike15Open, setExplainLike15Open] = useState(false);
  const [bookmarked, setBookmarked] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return isLawBookmarked(law.id);
  });
  const [copiedLink, setCopiedLink] = useState(false);
  const [addedToResearch, setAddedToResearch] = useState(false);
  const [activeTab, setActiveTab] = useState<'content' | 'timeline' | 'citations' | 'metadata'>('content');

  const handleAddCitationToWorkspace = () => {
    addCitationToCollection({
      lawId: law.id,
      lawTitle: law.title,
      lawTitleBn: law.titleBn,
      jurisdiction: law.jurisdiction,
      enactmentYear: law.enactmentYear,
      sectionNumber: activeSection?.number,
      citations: law.citations
    });
    setAddedToResearch(true);
    setTimeout(() => setAddedToResearch(false), 2500);
  };

  // Modals state
  const [sourceVerifyModalOpen, setSourceVerifyModalOpen] = useState(false);
  const [citationModalOpen, setCitationModalOpen] = useState(false);
  const [glossaryModalTerm, setGlossaryModalTerm] = useState<GlossaryTerm | null>(null);

  // Sync bookmark state on external events
  useEffect(() => {
    const handleBookmarkChange = () => {
      setBookmarked(isLawBookmarked(law.id));
    };
    window.addEventListener('nyayota-bookmarks-updated', handleBookmarkChange);
    window.addEventListener('storage', handleBookmarkChange);
    return () => {
      window.removeEventListener('nyayota-bookmarks-updated', handleBookmarkChange);
      window.removeEventListener('storage', handleBookmarkChange);
    };
  }, [law.id]);

  const handleBookmarkToggle = () => {
    const nextState = toggleLocalBookmark({
      lawId: law.id,
      lawTitle: law.title,
      lawTitleBn: law.titleBn,
      jurisdiction: law.jurisdiction,
      category: law.category
    });
    setBookmarked(nextState);
  };

  const handleShareLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const handleExportPDF = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  // Filter sections
  const filteredSections = useMemo(() => {
    if (!searchSectionQuery.trim()) return law.sections;
    const q = searchSectionQuery.toLowerCase();
    return law.sections.filter(
      (s) =>
        s.number.toLowerCase().includes(q) ||
        s.title.toLowerCase().includes(q) ||
        (s.titleBn && s.titleBn.toLowerCase().includes(q)) ||
        s.content.toLowerCase().includes(q) ||
        s.simpleExplanation.toLowerCase().includes(q)
    );
  }, [law.sections, searchSectionQuery]);

  const activeSection =
    law.sections.find((s) => s.number === selectedSectionNumber) || law.sections[0];

  const relatedLaws = useMemo(() => {
    return LAWS_DATABASE.filter(
      (l) =>
        l.id !== law.id &&
        (law.relatedLawIds?.includes(l.id) ||
          l.category === law.category ||
          l.jurisdiction === law.jurisdiction)
    ).slice(0, 3);
  }, [law]);

  // Status Badge formatting
  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case 'Active':
      case 'In Force':
      case 'Active Treaty':
        return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30';
      case 'Amended':
        return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30';
      case 'Repealed':
        return 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30';
      case 'Draft':
        return 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30';
      default:
        return 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700';
    }
  };

  // Check if a glossary term matches
  const openGlossaryByName = (termName: string) => {
    const found = GLOSSARY_TERMS.find(
      (g) => g.term.toLowerCase() === termName.toLowerCase()
    );
    if (found) {
      setGlossaryModalTerm(found);
    }
  };

  // Render text with clickable glossary annotations
  const renderAnnotatedText = (text: string) => {
    // Check key glossary terms in text
    const keyTerms = [
      'Mens Rea',
      'Actus Reus',
      'Habeas Corpus',
      'Mandamus',
      'Tort',
      'Negligence',
      'Arbitration',
      'Liability',
      'Contract',
      'Injunction',
      'Res Judicata',
      'Bail',
      'Remand',
      'Estoppel',
      'Sub Judice',
      'Locus Standi',
      'FIR',
      'Cognizable Offense',
      'Prima Facie',
      'Jus Cogens',
      'Ultra Vires',
      'Suo Motu'
    ];

    const regex = new RegExp(`\\b(${keyTerms.join('|')})\\b`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, idx) => {
      const match = keyTerms.find((k) => k.toLowerCase() === part.toLowerCase());
      if (match) {
        return (
          <button
            key={idx}
            type="button"
            onClick={() => openGlossaryByName(match)}
            className="underline decoration-amber-500/60 decoration-2 underline-offset-2 font-semibold text-amber-700 dark:text-amber-400 hover:bg-amber-500/15 rounded px-0.5 transition-colors cursor-help inline-block"
            title={`Click to view definition for ${match}`}
          >
            {part}
          </button>
        );
      }
      return <span key={idx}>{part}</span>;
    });
  };

  const fontClass =
    fontSize === 'sm'
      ? 'text-xs leading-relaxed'
      : fontSize === 'lg'
      ? 'text-base leading-loose'
      : fontSize === 'xl'
      ? 'text-lg leading-loose'
      : 'text-sm leading-relaxed';

  const familyClass = fontFamily === 'serif' ? 'font-serif' : 'font-sans';

  // -------------------------------------------------------------
  // FULLSCREEN READING MODE VIEW
  // -------------------------------------------------------------
  if (readingMode) {
    return (
      <div className="fixed inset-0 z-50 bg-white dark:bg-zinc-950 overflow-y-auto transition-colors flex flex-col">
        {/* Sticky Control Bar */}
        <header className="sticky top-0 z-20 border-b border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-950/95 backdrop-blur px-4 sm:px-8 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center space-x-3 truncate">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 shrink-0">
              Reading Mode
            </span>
            <h2 className="text-sm font-bold text-zinc-900 dark:text-white truncate">
              {law.title}
            </h2>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            {/* Font Size Adjusters */}
            <div className="flex items-center space-x-1 p-1 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs">
              <button
                type="button"
                onClick={() => setFontSize('sm')}
                className={`px-2 py-1 rounded-lg font-bold ${fontSize === 'sm' ? 'bg-white dark:bg-zinc-800 shadow-sm text-amber-600' : 'text-zinc-500'}`}
              >
                A-
              </button>
              <button
                type="button"
                onClick={() => setFontSize('base')}
                className={`px-2 py-1 rounded-lg font-bold ${fontSize === 'base' ? 'bg-white dark:bg-zinc-800 shadow-sm text-amber-600' : 'text-zinc-500'}`}
              >
                A
              </button>
              <button
                type="button"
                onClick={() => setFontSize('lg')}
                className={`px-2 py-1 rounded-lg font-bold ${fontSize === 'lg' ? 'bg-white dark:bg-zinc-800 shadow-sm text-amber-600' : 'text-zinc-500'}`}
              >
                A+
              </button>
              <button
                type="button"
                onClick={() => setFontSize('xl')}
                className={`px-2 py-1 rounded-lg font-bold ${fontSize === 'xl' ? 'bg-white dark:bg-zinc-800 shadow-sm text-amber-600' : 'text-zinc-500'}`}
              >
                A++
              </button>
            </div>

            {/* Font Family Toggle */}
            <button
              type="button"
              onClick={() => setFontFamily(fontFamily === 'serif' ? 'sans' : 'serif')}
              className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-bold text-zinc-700 dark:text-zinc-300 hover:text-amber-500"
              title="Toggle Serif / Sans Font"
            >
              <Type className="w-4 h-4" />
            </button>

            {/* Language Switch */}
            <div className="flex items-center rounded-xl bg-zinc-100 dark:bg-zinc-900 p-1 border border-zinc-200 dark:border-zinc-800 text-xs">
              <button
                type="button"
                onClick={() => setActiveLanguageView('en')}
                className={`px-2 py-1 rounded-lg font-bold ${activeLanguageView === 'en' ? 'bg-white dark:bg-zinc-800 text-amber-600 shadow-sm' : 'text-zinc-500'}`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setActiveLanguageView('bn')}
                className={`px-2 py-1 rounded-lg font-bold font-bangla ${activeLanguageView === 'bn' ? 'bg-white dark:bg-zinc-800 text-amber-600 shadow-sm' : 'text-zinc-500'}`}
              >
                বাং
              </button>
              <button
                type="button"
                onClick={() => setActiveLanguageView('dual')}
                className={`px-2 py-1 rounded-lg font-bold ${activeLanguageView === 'dual' ? 'bg-white dark:bg-zinc-800 text-amber-600 shadow-sm' : 'text-zinc-500'}`}
              >
                Dual
              </button>
            </div>

            {/* Exit Reading Mode */}
            <button
              type="button"
              id="exit-reading-mode-btn"
              onClick={() => setReadingMode(false)}
              className="px-4 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs inline-flex items-center space-x-1.5 shadow-md shadow-amber-500/20 transition-all"
            >
              <Minimize2 className="w-4 h-4" />
              <span>Exit Reader</span>
            </button>
          </div>
        </header>

        {/* Reader Document Body */}
        <main className={`flex-1 max-w-4xl mx-auto px-6 sm:px-12 py-12 w-full space-y-12 ${familyClass}`}>
          {/* Header */}
          <div className="text-center space-y-3 border-b border-zinc-200 dark:border-zinc-800 pb-8">
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-600 dark:text-amber-400">
              {law.jurisdiction} • {law.category} • Enacted {law.enactmentYear}
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
              {law.title}
            </h1>
            {law.titleBn && (
              <p className="text-xl font-bangla text-zinc-500 dark:text-zinc-400">
                {law.titleBn}
              </p>
            )}
            <p className="text-xs text-zinc-400">
              Official Source: {law.officialSource}
            </p>
          </div>

          {/* Full Statute Overview */}
          <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              Statutory Preamble / Scope
            </span>
            <p className={`${fontClass} text-zinc-800 dark:text-zinc-200 italic`}>
              {law.fullOfficialTextExcerpt}
            </p>
          </div>

          {/* Sections List */}
          <div className="space-y-10">
            {law.sections.map((section, idx) => (
              <article
                key={section.number}
                id={`reader-sec-${idx}`}
                className="space-y-4 pt-6 border-t border-zinc-100 dark:border-zinc-800/80"
              >
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-lg bg-amber-500/10 text-amber-700 dark:text-amber-400 font-bold text-xs">
                    {section.number}
                  </span>
                  <span className="text-xs text-zinc-400">
                    Section {idx + 1} of {law.sections.length}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
                  {section.title}
                  {section.titleBn && (
                    <span className="block text-sm font-normal font-bangla text-zinc-500 mt-1">
                      {section.titleBn}
                    </span>
                  )}
                </h3>

                {/* Content based on active language view */}
                {(activeLanguageView === 'en' || activeLanguageView === 'dual') && (
                  <div className="space-y-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                      Official English Text
                    </span>
                    <div className={`${fontClass} text-zinc-900 dark:text-zinc-100 leading-relaxed`}>
                      {renderAnnotatedText(section.content)}
                    </div>
                  </div>
                )}

                {(activeLanguageView === 'bn' || activeLanguageView === 'dual') && section.contentBn && (
                  <div className="space-y-2 pt-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                      অনূদিত বাংলা পাঠ (Bangla Translation)
                    </span>
                    <div className={`${fontClass} font-bangla text-zinc-800 dark:text-zinc-200 leading-relaxed bg-amber-50/50 dark:bg-zinc-900/50 p-4 rounded-xl border border-amber-500/10`}>
                      {section.contentBn}
                    </div>
                  </div>
                )}

                {/* Plain Explanation */}
                <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                    Plain Meaning & Practical Effect:
                  </span>
                  <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed">
                    {section.simpleExplanation}
                  </p>
                </div>

                {section.punishmentOrRemedy && (
                  <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs text-rose-800 dark:text-rose-300">
                    <strong>Prescribed Remedy / Penalty: </strong>
                    {section.punishmentOrRemedy}
                  </div>
                )}
              </article>
            ))}
          </div>

          {/* Reader Footer */}
          <div className="text-center pt-12 border-t border-zinc-200 dark:border-zinc-800 space-y-2 text-xs text-zinc-400">
            <p>End of Statute Text • Generated by Nyayota Educational Legal Platform</p>
            <button
              type="button"
              onClick={() => setReadingMode(false)}
              className="text-amber-600 dark:text-amber-400 font-bold hover:underline"
            >
              Exit Reading Mode & Return to Full Research Workspace
            </button>
          </div>
        </main>
      </div>
    );
  }

  // -------------------------------------------------------------
  // STANDARD RESEARCH WORKSPACE VIEW
  // -------------------------------------------------------------
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center justify-between text-xs text-zinc-500">
        <div className="flex items-center space-x-2">
          <Link
            href="/"
            className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
          >
            Home
          </Link>
          <ChevronRight className="w-3 h-3 text-zinc-400" />
          <Link
            href={law.jurisdiction === 'Bangladesh' ? '/bangladesh-laws' : '/international-laws'}
            className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
          >
            {law.jurisdiction === 'Bangladesh' ? 'Bangladesh Laws' : 'International Laws'}
          </Link>
          <ChevronRight className="w-3 h-3 text-zinc-400" />
          <span className="font-semibold text-zinc-800 dark:text-zinc-200 truncate max-w-xs sm:max-w-md">
            {law.shortTitle || law.title}
          </span>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex items-center space-x-2">
          <button
            type="button"
            id="law-header-bookmark-btn"
            onClick={handleBookmarkToggle}
            className={`px-3 py-1.5 rounded-xl border text-xs font-semibold inline-flex items-center space-x-1.5 transition-colors ${
              bookmarked
                ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30'
                : 'bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-800 hover:border-amber-500/40'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'fill-amber-500 text-amber-500' : ''}`} />
            <span>{bookmarked ? 'Saved' : 'Save'}</span>
          </button>

          <button
            type="button"
            id="law-header-share-btn"
            onClick={handleShareLink}
            className="p-1.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-amber-500 transition-colors"
            title="Copy shareable link"
          >
            {copiedLink ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
          </button>
        </div>
      </nav>

      {/* SECTION 1: TOP INFORMATION AREA */}
      <section
        aria-label="Statute Header Information"
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-950 border border-zinc-800 text-white p-6 sm:p-8 shadow-xl"
      >
        <div className="relative z-10 space-y-6">
          {/* Metadata Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30">
              {law.jurisdiction}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-zinc-800 text-zinc-300 border border-zinc-700">
              {law.category}
            </span>
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${getStatusBadgeStyle(
                law.status
              )}`}
            >
              {law.status}
            </span>
            {law.actNumber && (
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-zinc-800/80 text-zinc-300 border border-zinc-700">
                {law.actNumber}
              </span>
            )}
          </div>

          {/* Titles */}
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
              {law.title}
            </h1>
            {law.titleBn && (
              <h2 className="text-lg sm:text-2xl font-bangla text-zinc-400">
                {law.titleBn}
              </h2>
            )}
          </div>

          {/* Dates & Governance Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-zinc-800/80 text-xs">
            <div>
              <span className="text-zinc-400 block">Enactment Year</span>
              <span className="font-bold text-white text-sm">{law.enactmentYear}</span>
            </div>
            <div>
              <span className="text-zinc-400 block">Effective Date</span>
              <span className="font-bold text-white text-sm">
                {law.effectiveDate || `${law.enactmentYear}`}
              </span>
            </div>
            <div>
              <span className="text-zinc-400 block">Last Updated / Amended</span>
              <span className="font-bold text-white text-sm">
                {law.lastUpdatedDate || (law.lastAmendedYear ? `${law.lastAmendedYear}` : `${law.enactmentYear}`)}
              </span>
            </div>
            <div>
              <span className="text-zinc-400 block">Provisions Count</span>
              <span className="font-bold text-white text-sm">
                {law.sections.length} Core Sections
              </span>
            </div>
          </div>

          {/* Action Toolbar */}
          <div className="flex flex-wrap items-center gap-2.5 pt-2">
            {/* Enter Reading Mode */}
            <button
              type="button"
              id="enter-reading-mode-btn"
              onClick={() => setReadingMode(true)}
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs inline-flex items-center space-x-2 shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
            >
              <Maximize2 className="w-4 h-4" />
              <span>Enter Reading Mode</span>
            </button>

            {/* Explain Like I'm 15 Trigger */}
            <button
              type="button"
              id="explain-15-trigger-btn"
              onClick={() => setExplainLike15Open(!explainLike15Open)}
              className={`px-4 py-2.5 rounded-xl border text-xs font-bold inline-flex items-center space-x-2 transition-all ${
                explainLike15Open
                  ? 'bg-purple-600 text-white border-purple-500 shadow-lg shadow-purple-600/20'
                  : 'bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border-purple-500/30'
              }`}
            >
              <Sparkles className="w-4 h-4 text-purple-300" />
              <span>Explain Like I&apos;m 15</span>
            </button>

            {/* Ask AI Assistant */}
            <Link
              href={`/ai-assistant?lawId=${law.id}&lawTitle=${encodeURIComponent(law.title)}&query=${encodeURIComponent(`Please explain the core implications and key sections of ${law.title}`)}`}
              className="px-4 py-2.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/40 text-xs font-bold inline-flex items-center space-x-2 transition-colors"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Ask AI Assistant</span>
            </Link>

            {/* Add to Research Workspace */}
            <button
              type="button"
              id="add-to-workspace-btn"
              onClick={handleAddCitationToWorkspace}
              className={`px-4 py-2.5 rounded-xl border text-xs font-semibold inline-flex items-center space-x-2 transition-colors ${
                addedToResearch
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  : 'bg-zinc-800 hover:bg-zinc-700 text-white border-zinc-700'
              }`}
            >
              {addedToResearch ? <Check className="w-4 h-4 text-emerald-400" /> : <Bookmark className="w-4 h-4 text-amber-400" />}
              <span>{addedToResearch ? 'Saved to Workspace' : 'Add to Workspace'}</span>
            </button>

            {/* Cite This Law */}
            <button
              type="button"
              id="cite-this-law-btn"
              onClick={() => setCitationModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700 text-xs font-semibold inline-flex items-center space-x-2 transition-colors"
            >
              <Quote className="w-4 h-4 text-amber-400" />
              <span>Cite This Law</span>
            </button>

            {/* Verify Source */}
            <button
              type="button"
              id="verify-source-header-btn"
              onClick={() => setSourceVerifyModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700 text-xs font-semibold inline-flex items-center space-x-2 transition-colors"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Source Verification</span>
            </button>

            {/* Download PDF / Print Version */}
            <button
              type="button"
              id="download-pdf-btn"
              onClick={handleExportPDF}
              className="px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700 text-xs font-semibold inline-flex items-center space-x-2 transition-colors"
            >
              <Download className="w-4 h-4 text-zinc-300" />
              <span>Download PDF</span>
            </button>

            <button
              type="button"
              id="print-version-btn"
              onClick={handlePrint}
              className="p-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white border border-zinc-700 transition-colors"
              title="Print-friendly view"
            >
              <Printer className="w-4 h-4" />
            </button>

            <Link
              href={`/compare?lawA=${law.id}`}
              className="px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700 text-xs font-semibold inline-flex items-center space-x-2 transition-colors"
            >
              <ArrowLeftRight className="w-4 h-4 text-amber-400" />
              <span>Compare Law</span>
            </Link>
          </div>
        </div>
      </section>

      {/* "EXPLAIN LIKE I'M 15" COLLAPSIBLE PANEL */}
      {explainLike15Open && (
        <section
          id="explain-like-15-panel"
          className="p-6 rounded-3xl bg-gradient-to-r from-purple-950/40 to-zinc-900 border-2 border-purple-500/40 text-white space-y-4 shadow-xl animate-in slide-in-from-top-3 duration-200"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-purple-400 font-bold text-sm">
              <Sparkles className="w-5 h-5 text-purple-400" />
              <span>Explain Like I&apos;m 15 (High School & Plain Language Breakdown)</span>
            </div>
            <button
              type="button"
              onClick={() => setExplainLike15Open(false)}
              className="text-xs text-zinc-400 hover:text-white"
            >
              Dismiss
            </button>
          </div>

          <div className="p-4 rounded-2xl bg-purple-900/20 border border-purple-500/20 text-sm leading-relaxed text-zinc-200 space-y-3">
            <p className="font-medium">
              {law.explainLike15 || law.simpleSummary}
            </p>

            <div className="pt-2 border-t border-purple-500/20 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-purple-950/50 border border-purple-500/20">
                <span className="font-bold text-purple-300 block mb-1">What does this do?</span>
                <span>Sets up the ground rules for what is allowed, how citizens are protected, and what happens when someone breaks the rule.</span>
              </div>
              <div className="p-3 rounded-xl bg-purple-950/50 border border-purple-500/20">
                <span className="font-bold text-purple-300 block mb-1">Why does it matter?</span>
                <span>It prevents arbitrary punishment so government officers, courts, and individuals must follow equal rules.</span>
              </div>
              <div className="p-3 rounded-xl bg-purple-950/50 border border-purple-500/20">
                <span className="font-bold text-purple-300 block mb-1">Who does it apply to?</span>
                <span>Everyone within the jurisdiction of {law.jurisdiction}, regardless of wealth or position.</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 2: SOURCE VERIFICATION BAR */}
      <section
        aria-label="Source Verification Section"
        className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
      >
        <div className="flex items-start space-x-3.5">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div className="space-y-0.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-bold text-sm text-zinc-900 dark:text-white">
                Official Source:
              </span>
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                Authenticated Mirror
              </span>
              {law.officialGazetteRef && (
                <span className="text-[11px] font-mono text-zinc-500 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded">
                  {law.officialGazetteRef}
                </span>
              )}
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400">
              {law.officialSource} • Published by <strong>{law.sourceOrganization}</strong>
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 shrink-0">
          <button
            type="button"
            id="verify-source-action-btn"
            onClick={() => setSourceVerifyModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-amber-500/10 text-zinc-700 dark:text-zinc-200 hover:text-amber-600 dark:hover:text-amber-400 border border-zinc-200 dark:border-zinc-700 text-xs font-bold inline-flex items-center space-x-1.5 transition-colors shrink-0"
          >
            <span>View Source Metadata &amp; Citations</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* SECTION 3: AI SUMMARY & SIMPLIFIED OVERVIEW */}
      <section
        aria-label="AI Summary Section"
        className="p-6 sm:p-7 rounded-3xl bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/25 space-y-4"
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 rounded-lg bg-amber-500 text-zinc-950 flex items-center justify-center font-bold">
              <Sparkles className="w-4 h-4" />
            </div>
            <h2 className="text-base font-bold text-zinc-900 dark:text-white">
              AI Summary & Key Concepts
            </h2>
          </div>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30">
            Educational Synthesis (Non-Binding)
          </span>
        </div>

        <p className="text-sm text-zinc-800 dark:text-zinc-200 leading-relaxed font-medium">
          {law.aiSummary?.overview || law.overview}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {/* Key Concepts */}
          <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 block">
              Core Legal Concepts
            </span>
            <ul className="space-y-1.5 text-xs text-zinc-700 dark:text-zinc-300">
              {(law.aiSummary?.keyConcepts || law.keyHighlights).map((item, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <CheckCircle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Important Points & Takeaway */}
          <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 block">
              Important Points & Practical Takeaways
            </span>
            <ul className="space-y-1.5 text-xs text-zinc-700 dark:text-zinc-300">
              {(law.aiSummary?.importantPoints || [
                `Enacted to establish binding statutory standards for ${law.category}.`,
                'Provides dispute resolution, penalty, or constitutional relief pathways.'
              ]).map((pt, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <ChevronRight className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
            {law.aiSummary?.practicalTakeaway && (
              <p className="pt-2 border-t border-zinc-100 dark:border-zinc-800 text-[11px] text-zinc-500 italic">
                {law.aiSummary.practicalTakeaway}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* SECTION 4: MAIN CONTENT AREA WITH NAVIGATION & TRANSLATION CONTROLS */}
      <div className="space-y-6">
        {/* Navigation Tabs Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-3">
          {/* Main Tabs */}
          <div className="flex items-center space-x-2">
            <button
              type="button"
              id="tab-statutory-sections"
              onClick={() => setActiveTab('content')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${
                activeTab === 'content'
                  ? 'bg-amber-500 text-zinc-950 shadow-md shadow-amber-500/20'
                  : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Statutory Provisions ({law.sections.length})</span>
            </button>

            <button
              type="button"
              id="tab-statute-timeline"
              onClick={() => setActiveTab('timeline')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${
                activeTab === 'timeline'
                  ? 'bg-amber-500 text-zinc-950 shadow-md shadow-amber-500/20'
                  : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
              }`}
            >
              <History className="w-4 h-4" />
              <span>Version History ({law.timeline.length})</span>
            </button>

            <button
              type="button"
              id="tab-statute-citations"
              onClick={() => setActiveTab('citations')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${
                activeTab === 'citations'
                  ? 'bg-amber-500 text-zinc-950 shadow-md shadow-amber-500/20'
                  : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
              }`}
            >
              <Quote className="w-4 h-4" />
              <span>Citations</span>
            </button>
          </div>

          {/* Translation Switcher (English / Bangla / Dual / Multi-language selector) */}
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-zinc-500 hidden sm:inline-flex items-center space-x-1">
              <Languages className="w-3.5 h-3.5 text-amber-500" />
              <span>Translate Law:</span>
            </span>

            <div className="flex items-center p-1 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs">
              <button
                type="button"
                id="lang-view-dual"
                onClick={() => setActiveLanguageView('dual')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                  activeLanguageView === 'dual'
                    ? 'bg-white dark:bg-zinc-800 text-amber-600 dark:text-amber-400 shadow-sm'
                    : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                Dual View
              </button>
              <button
                type="button"
                id="lang-view-en"
                onClick={() => setActiveLanguageView('en')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                  activeLanguageView === 'en'
                    ? 'bg-white dark:bg-zinc-800 text-amber-600 dark:text-amber-400 shadow-sm'
                    : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                English
              </button>
              <button
                type="button"
                id="lang-view-bn"
                onClick={() => setActiveLanguageView('bn')}
                className={`px-3 py-1.5 rounded-lg font-bold font-bangla transition-all ${
                  activeLanguageView === 'bn'
                    ? 'bg-white dark:bg-zinc-800 text-amber-600 dark:text-amber-400 shadow-sm'
                    : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                বাংলা
              </button>
            </div>
          </div>
        </div>

        {/* TAB 1: STATUTORY PROVISIONS / MAIN CONTENT */}
        {activeTab === 'content' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Sidebar: Section Jump Navigator */}
            <aside className="lg:col-span-4 space-y-4">
              <div className="sticky top-20 p-5 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white">
                    Section Navigator
                  </h3>
                  <span className="text-[10px] text-zinc-400">
                    {filteredSections.length} of {law.sections.length}
                  </span>
                </div>

                {/* In-Statute Search Filter */}
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                  <input
                    type="text"
                    id="statute-section-search-input"
                    value={searchSectionQuery}
                    onChange={(e) => setSearchSectionQuery(e.target.value)}
                    placeholder="Search sections or topics..."
                    className="w-full pl-8 pr-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500 text-zinc-900 dark:text-white placeholder:text-zinc-400"
                  />
                </div>

                {/* Section Button List */}
                <div className="max-h-[60vh] overflow-y-auto space-y-1.5 pr-1">
                  {filteredSections.map((sec) => {
                    const isSelected = selectedSectionNumber === sec.number;
                    return (
                      <button
                        key={sec.number}
                        type="button"
                        id={`sec-nav-${sec.number.replace(/\s+/g, '-').toLowerCase()}`}
                        onClick={() => setSelectedSectionNumber(sec.number)}
                        className={`w-full text-left p-3 rounded-2xl text-xs transition-all flex items-start justify-between gap-2 ${
                          isSelected
                            ? 'bg-amber-500/10 text-amber-900 dark:text-amber-300 border border-amber-500/30 font-bold shadow-sm'
                            : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-transparent'
                        }`}
                      >
                        <div className="space-y-0.5 truncate">
                          <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 block uppercase">
                            {sec.number}
                          </span>
                          <span className="block truncate font-medium">
                            {sec.title}
                          </span>
                          {sec.titleBn && (
                            <span className="block truncate text-[11px] font-bangla text-zinc-500 dark:text-zinc-400">
                              {sec.titleBn}
                            </span>
                          )}
                        </div>
                        <ChevronRight className={`w-3.5 h-3.5 shrink-0 mt-1 ${isSelected ? 'text-amber-500' : 'text-zinc-400'}`} />
                      </button>
                    );
                  })}
                </div>

                {/* Glossary Quick Tip */}
                <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 text-[11px] text-zinc-500 space-y-1">
                  <div className="flex items-center space-x-1 text-amber-600 dark:text-amber-400 font-bold">
                    <Info className="w-3.5 h-3.5" />
                    <span>Interactive Legal Glossary</span>
                  </div>
                  <p>
                    Highlighted terms in the text can be clicked to view simple plain-language explanations.
                  </p>
                </div>
              </div>
            </aside>

            {/* Right Main Content: Active Section Viewer */}
            <main className="lg:col-span-8 space-y-6">
              {activeSection ? (
                <div
                  id="active-section-display-card"
                  className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-6"
                >
                  {/* Section Title Header */}
                  <div className="flex flex-wrap items-start justify-between gap-3 border-b border-zinc-100 dark:border-zinc-800 pb-4">
                    <div className="space-y-1">
                      <span className="px-3 py-1 rounded-lg bg-amber-500/10 text-amber-700 dark:text-amber-400 font-bold text-xs">
                        {activeSection.number}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white">
                        {activeSection.title}
                      </h3>
                      {activeSection.titleBn && (
                        <p className="text-base font-bangla text-zinc-500 dark:text-zinc-400">
                          {activeSection.titleBn}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center space-x-2">
                      <Link
                        href={`/ai-assistant?lawId=${law.id}&lawTitle=${encodeURIComponent(law.title)}&section=${encodeURIComponent(activeSection.number)}&query=${encodeURIComponent(`Explain ${activeSection.number} (${activeSection.title}) of ${law.title} with practical examples and judicial interpretations.`)}`}
                        className="px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-300 text-xs font-bold inline-flex items-center space-x-1.5 border border-amber-500/30 transition-colors"
                        title="Analyze this section with AI"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Analyze with AI</span>
                      </Link>

                      <button
                        type="button"
                        onClick={() => {
                          const citationText = `${law.title}, ${activeSection.number} (${law.enactmentYear})`;
                          navigator.clipboard.writeText(citationText);
                          setCopiedLink(true);
                          setTimeout(() => setCopiedLink(false), 2000);
                        }}
                        className="px-3 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-amber-500/10 text-zinc-700 dark:text-zinc-300 text-xs font-semibold inline-flex items-center space-x-1.5 transition-colors"
                        title="Copy section citation"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Section</span>
                      </button>
                    </div>
                  </div>

                  {/* Section Statutory Text (English & Bangla side-by-side or stacked) */}
                  <div className="space-y-6">
                    {(activeLanguageView === 'en' || activeLanguageView === 'dual') && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-zinc-400">
                          <span>Official Statutory Text (English)</span>
                          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
                            Primary Authentic Version
                          </span>
                        </div>
                        <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 text-sm sm:text-base leading-relaxed">
                          {renderAnnotatedText(activeSection.content)}
                        </div>
                      </div>
                    )}

                    {(activeLanguageView === 'bn' || activeLanguageView === 'dual') && activeSection.contentBn && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-zinc-400">
                          <span>বাংলা অনুবাদ (Bangla Translation)</span>
                          <span className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold">
                            Accredited Translation
                          </span>
                        </div>
                        <div className="p-5 rounded-2xl bg-amber-50/50 dark:bg-zinc-950 border border-amber-500/20 text-zinc-900 dark:text-zinc-100 text-sm sm:text-base font-bangla leading-relaxed">
                          {activeSection.contentBn}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Simplified Plain-Language Explanation */}
                  <div className="p-5 rounded-2xl bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/20 space-y-2">
                    <div className="flex items-center space-x-2 text-amber-700 dark:text-amber-400 font-bold text-xs uppercase tracking-wider">
                      <Sparkles className="w-4 h-4" />
                      <span>Plain Language Explanation</span>
                    </div>
                    <p className="text-xs sm:text-sm text-zinc-800 dark:text-zinc-200 leading-relaxed font-medium">
                      {activeSection.simpleExplanation}
                    </p>
                  </div>

                  {/* Legal Remedy or Prescribed Punishment */}
                  {activeSection.punishmentOrRemedy && (
                    <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/25 space-y-1 text-xs sm:text-sm">
                      <span className="font-bold text-rose-700 dark:text-rose-400 block uppercase tracking-wider text-[11px]">
                        Prescribed Punishment / Statutory Remedy
                      </span>
                      <p className="text-rose-900 dark:text-rose-200 font-semibold leading-relaxed">
                        {activeSection.punishmentOrRemedy}
                      </p>
                    </div>
                  )}

                  {/* Key Concepts Tags */}
                  {activeSection.keyConcepts && activeSection.keyConcepts.length > 0 && (
                    <div className="space-y-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                        Section Keywords & Concepts
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {activeSection.keyConcepts.map((kc, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700"
                          >
                            {kc}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-12 text-center text-zinc-500 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                  No section found matching your search. Try adjusting the filter.
                </div>
              )}
            </main>
          </div>
        )}

        {/* TAB 2: VERSION HISTORY & TIMELINE */}
        {activeTab === 'timeline' && (
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-6">
            <div>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                Legislative Timeline & Amendment History
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Track how this legislation evolved from original enactment through parliamentary amendments.
              </p>
            </div>

            <div className="relative pl-6 space-y-8 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-amber-500/30">
              {law.timeline.map((event, idx) => (
                <div key={idx} className="relative group">
                  {/* Timeline Node */}
                  <div className="absolute -left-[27px] top-1.5 w-3.5 h-3.5 rounded-full bg-amber-500 ring-4 ring-white dark:ring-zinc-900" />

                  <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-2 hover:border-amber-500/40 transition-colors">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
                        {event.year}
                      </span>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                        Status: {event.status}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-zinc-900 dark:text-white">
                      {event.title}
                    </h4>

                    <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: CITATIONS */}
        {activeTab === 'citations' && (
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                  Academic & Legal Citations
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Ready-to-use citations formatted for academic papers, legal journals, and court filings.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setCitationModalOpen(true)}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs shadow-md shadow-amber-500/20 transition-all"
              >
                Open Citation Generator
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                  Standard Public Citation
                </span>
                <p className="font-serif text-sm text-zinc-800 dark:text-zinc-200">
                  {law.citations?.standard}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                  Bluebook (21st Edition)
                </span>
                <p className="font-serif text-sm text-zinc-800 dark:text-zinc-200">
                  {law.citations?.bluebook}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                  APA (7th Edition)
                </span>
                <p className="font-serif text-sm text-zinc-800 dark:text-zinc-200">
                  {law.citations?.apa}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                  MLA (9th Edition)
                </span>
                <p className="font-serif text-sm text-zinc-800 dark:text-zinc-200">
                  {law.citations?.mla}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* SECTION 5: RELATED LAWS DISCOVERY */}
      {relatedLaws.length > 0 && (
        <section aria-label="Related Laws System" className="space-y-4 pt-6 border-t border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                Related Statutes & Interconnected Laws
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Explore connected statutes within the same legal branch or cross-referenced provisions.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {relatedLaws.map((relLaw) => (
              <Link
                key={relLaw.id}
                href={`/law/${relLaw.id}`}
                className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-amber-500/50 hover:shadow-lg transition-all group space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                      {relLaw.category}
                    </span>
                    <span className="text-[10px] text-zinc-400">{relLaw.enactmentYear}</span>
                  </div>

                  <h4 className="text-sm font-bold text-zinc-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors leading-snug">
                    {relLaw.title}
                  </h4>

                  {relLaw.titleBn && (
                    <p className="text-xs font-bangla text-zinc-500">
                      {relLaw.titleBn}
                    </p>
                  )}

                  <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                    {relLaw.simpleSummary || relLaw.overview}
                  </p>
                </div>

                <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-xs font-bold text-amber-600 dark:text-amber-400">
                  <span>Explore Law</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* MODALS */}
      <SourceVerificationModal
        law={law}
        isOpen={sourceVerifyModalOpen}
        onClose={() => setSourceVerifyModalOpen(false)}
      />

      <CitationModal
        law={law}
        isOpen={citationModalOpen}
        onClose={() => setCitationModalOpen(false)}
      />

      <GlossaryModal
        term={glossaryModalTerm}
        isOpen={!!glossaryModalTerm}
        onClose={() => setGlossaryModalTerm(null)}
      />
    </div>
  );
}

export default function LawDetailPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-16 text-center text-zinc-500">
          Loading legal statute repository...
        </div>
      }
    >
      <LawDetailContent />
    </Suspense>
  );
}
