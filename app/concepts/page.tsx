'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import {
  BookOpen,
  Scale,
  Sparkles,
  Search,
  ArrowRight,
  ExternalLink,
  Tag,
  Copy,
  Check,
  Globe,
  HelpCircle,
  ChevronRight,
  ShieldCheck,
  Layers
} from 'lucide-react';
import {
  LEGAL_CONCEPTS_DATA,
  LegalConcept,
  LAWS_DATABASE
} from '@/lib/legal-data';

function ConceptsContent() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedConcept, setSelectedConcept] = useState<LegalConcept | null>(
    LEGAL_CONCEPTS_DATA[0]
  );
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = ['All', 'Criminal Law', 'Constitutional Law', 'Civil Law', 'Evidence & Procedure', 'Commercial & Contract'];

  const filteredConcepts = LEGAL_CONCEPTS_DATA.filter((c) => {
    const matchCat = selectedCategory === 'All' || c.category === selectedCategory;
    const matchSearch =
      !searchQuery.trim() ||
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.nameBn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.latinName && c.latinName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      c.definition.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.simpleExplanation.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const activeConcept = selectedConcept || filteredConcepts[0] || LEGAL_CONCEPTS_DATA[0];

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-6">
        <div className="space-y-2 max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-xs font-semibold">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Encyclopedia of Legal Doctrines</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            Legal Concepts & Maxims Library
          </h1>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Understand complex Latin maxims, fundamental doctrines, and evidentiary standards in plain language with real-world scenarios.
          </p>
        </div>

        <div className="flex items-center space-x-2 shrink-0">
          <Link
            href="/knowledge-paths"
            className="px-4 py-2 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 font-bold text-xs hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors"
          >
            Knowledge Paths
          </Link>
          <Link
            href="/ai-assistant"
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs flex items-center space-x-1.5 shadow-sm transition-colors"
          >
            <Sparkles className="w-4 h-4" />
            <span>Ask AI Explainer</span>
          </Link>
        </div>
      </div>

      {/* Main Grid: Concepts Sidebar + Active Concept Deep View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Concept List & Search (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-5 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white">
                Doctrines & Maxims
              </span>
              <span className="text-[10px] font-mono text-zinc-400">{LEGAL_CONCEPTS_DATA.length} Concepts</span>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search doctrines (e.g. Mens Rea, Ultra Vires)..."
                className="w-full pl-8 pr-3 py-2 text-xs bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/40 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 font-medium"
              />
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap gap-1 pt-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2 py-0.5 rounded-lg text-[11px] font-medium transition-colors ${
                    selectedCategory === cat
                      ? 'bg-amber-500 text-zinc-950 font-bold'
                      : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                  }`}
                >
                  {cat === 'All' ? 'All' : cat.split(' ')[0]}
                </button>
              ))}
            </div>

            {/* Concept List */}
            <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1 pt-1">
              {filteredConcepts.map((concept) => {
                const isSelected = activeConcept.id === concept.id;
                return (
                  <button
                    key={concept.id}
                    type="button"
                    id={`concept-btn-${concept.id}`}
                    onClick={() => setSelectedConcept(concept)}
                    className={`w-full text-left p-3 rounded-2xl border transition-all ${
                      isSelected
                        ? 'bg-amber-500/10 border-amber-500/60 text-zinc-900 dark:text-white shadow-xs'
                        : 'bg-zinc-50 dark:bg-zinc-950/60 border-zinc-200 dark:border-zinc-800/80 text-zinc-700 dark:text-zinc-300 hover:border-zinc-300 dark:hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                        {concept.category}
                      </span>
                    </div>

                    <h3 className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-white leading-snug">
                      {concept.name}
                    </h3>
                    <p className="text-[11px] text-amber-600 dark:text-amber-400 font-medium font-bangla">
                      {concept.nameBn}
                    </p>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400 line-clamp-2 mt-1">
                      {concept.simpleExplanation}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Active Concept Detail (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-6">
            {/* Top Bar */}
            <div className="space-y-2 border-b border-zinc-100 dark:border-zinc-800 pb-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-xs font-bold">
                  {activeConcept.category}
                </span>

                <Link
                  href={`/ai-assistant?term=${encodeURIComponent(activeConcept.name)}`}
                  className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs inline-flex items-center space-x-1.5 shadow-sm transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Explain in AI Assistant</span>
                </Link>
              </div>

              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-zinc-900 dark:text-white">
                  {activeConcept.name}
                </h2>
                {activeConcept.latinName && (
                  <p className="text-xs font-mono text-zinc-400 italic">
                    {activeConcept.latinName}
                  </p>
                )}
                <p className="text-sm font-bold text-amber-600 dark:text-amber-400 font-bangla mt-0.5">
                  {activeConcept.nameBn}
                </p>
              </div>
            </div>

            {/* Formal Definition */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Formal Jurisprudential Definition:
              </h3>
              <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs sm:text-sm text-zinc-800 dark:text-zinc-200 leading-relaxed font-serif">
                &ldquo;{activeConcept.definition}&rdquo;
              </div>
            </div>

            {/* Plain Language Explanation */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Plain Language Translation:
              </h3>
              <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20 text-xs sm:text-sm text-zinc-800 dark:text-zinc-200 leading-relaxed">
                {activeConcept.simpleExplanation}
              </div>
            </div>

            {/* Explain Like I'm 15 */}
            {activeConcept.explainLike15 && (
              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 flex items-center space-x-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Explain Like I&apos;m 15 (Everyday Analogy):</span>
                </h3>
                <div className="p-4 rounded-2xl bg-purple-500/5 border border-purple-500/20 text-xs sm:text-sm text-zinc-800 dark:text-zinc-200 leading-relaxed">
                  {activeConcept.explainLike15}
                </div>
              </div>
            )}

            {/* Courtroom Example */}
            {activeConcept.courtroomExample && (
              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  Illustrative Real-World Application:
                </h3>
                <div className="p-4 sm:p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-2">
                  <span className="text-xs font-bold text-amber-600 dark:text-amber-400 block">
                    Precedent / Scenario:
                  </span>
                  <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                    {activeConcept.courtroomExample}
                  </p>
                </div>
              </div>
            )}

            {/* Key Elements */}
            {activeConcept.keyElements && activeConcept.keyElements.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  Essential Legal Ingredients:
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeConcept.keyElements.map((elem, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs flex items-center space-x-2 text-zinc-700 dark:text-zinc-300"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>{elem}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs">
              <button
                type="button"
                onClick={() =>
                  handleCopy(
                    activeConcept.id,
                    `${activeConcept.name} (${activeConcept.nameBn})\nDefinition: ${activeConcept.definition}\nPlain Meaning: ${activeConcept.simpleExplanation}`
                  )
                }
                className="hover:text-amber-500 font-bold flex items-center space-x-1 text-zinc-500"
              >
                {copiedId === activeConcept.id ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedId === activeConcept.id ? 'Copied to Clipboard' : 'Copy Concept Summary'}</span>
              </button>

              <Link
                href={`/research`}
                className="text-amber-600 dark:text-amber-400 font-bold hover:underline inline-flex items-center space-x-1"
              >
                <span>Save to Research Dossier</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ConceptsPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-20 text-center text-zinc-500 text-sm">
          Loading Legal Concepts Library...
        </div>
      }
    >
      <ConceptsContent />
    </Suspense>
  );
}
