'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Sparkles,
  Send,
  BookOpen,
  Scale,
  Copy,
  Check,
  Globe,
  Info,
  Layers,
  HelpCircle,
  Volume2,
  Share2,
  RefreshCw
} from 'lucide-react';
import { GLOSSARY_TERMS, GlossaryTerm } from '@/lib/legal-data';

function AIAssistantContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('query') || '';
  const termParam = searchParams.get('term') || '';

  const [inputQuery, setInputQuery] = useState(initialQuery || (termParam ? `Define the legal term: ${termParam}` : ''));
  const [mode, setMode] = useState<'explain' | 'bangla' | 'glossary' | 'cite'>('explain');
  const [isLoading, setIsLoading] = useState(false);
  const [responseOutput, setResponseOutput] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [glossarySearch, setGlossarySearch] = useState(termParam || '');
  const [selectedGlossaryTerm, setSelectedGlossaryTerm] = useState<GlossaryTerm | null>(
    termParam ? GLOSSARY_TERMS.find((t) => t.term.toLowerCase() === termParam.toLowerCase()) || null : null
  );

  const samplePrompts = [
    { title: 'Murder vs Culpable Homicide', query: 'What is the exact legal difference between Section 299 Culpable Homicide and Section 300 Murder under Bangladesh Penal Code?' },
    { title: 'Arrest & 24-Hour Rule', query: 'Explain my rights when arrested without a warrant under Section 54 CrPC and Article 33 of the Constitution.' },
    { title: 'Mens Rea & Actus Reus', query: 'Define Mens Rea and Actus Reus with a simple everyday scenario.' },
    { title: 'High Court Writs (Art. 102)', query: 'Explain how Habeas Corpus and Mandamus writs work under Article 102 of the Bangladesh Constitution.' },
    { title: 'UDHR Free Speech', query: 'How does UDHR Article 19 define freedom of opinion and expression internationally?' }
  ];

  const handleGenerate = async (queryText: string, queryMode = mode) => {
    if (!queryText.trim()) return;
    setIsLoading(true);
    setResponseOutput(null);

    try {
      const res = await fetch('/api/ai-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: queryText,
          mode: queryMode,
          language: queryMode === 'bangla' ? 'bn' : 'both',
        }),
      });

      const data = await res.json();
      if (data.text) {
        setResponseOutput(data.text);
      } else {
        setResponseOutput('Unable to process the legal query at this moment. Please check your query.');
      }
    } catch {
      setResponseOutput('A network error occurred while communicating with the legal assistant. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (responseOutput) {
      navigator.clipboard.writeText(responseOutput);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const filteredGlossary = GLOSSARY_TERMS.filter(
    (t) =>
      t.term.toLowerCase().includes(glossarySearch.toLowerCase()) ||
      t.termBn.toLowerCase().includes(glossarySearch.toLowerCase()) ||
      t.definition.toLowerCase().includes(glossarySearch.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-10">
      {/* Header Banner */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>AI Legal Knowledge Assistant</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
          AI Legal Assistant & Plain Language Explainer
        </h1>
        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
          Ask questions about statutory provisions, request crystal-clear plain language summaries in English and Bangla, inspect legal maxims, or generate properly formatted legal citations.
        </p>
      </div>

      {/* Main Grid: Interactive Prompt Console + Glossary Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left/Main Column: Query Engine */}
        <div className="lg:col-span-8 space-y-6">
          {/* Mode Selector */}
          <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-semibold">
            <button
              type="button"
              id="ai-mode-explain"
              onClick={() => setMode('explain')}
              className={`px-4 py-2 rounded-xl transition-all ${
                mode === 'explain'
                  ? 'bg-amber-500 text-zinc-950 shadow-sm'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              Plain Language Explainer
            </button>
            <button
              type="button"
              id="ai-mode-bangla"
              onClick={() => setMode('bangla')}
              className={`px-4 py-2 rounded-xl transition-all ${
                mode === 'bangla'
                  ? 'bg-amber-500 text-zinc-950 shadow-sm'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              Bangla Translation & Context (বাংলা ব্যাখ্যা)
            </button>
            <button
              type="button"
              id="ai-mode-cite"
              onClick={() => setMode('cite')}
              className={`px-4 py-2 rounded-xl transition-all ${
                mode === 'cite'
                  ? 'bg-amber-500 text-zinc-950 shadow-sm'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              Citation Generator
            </button>
          </div>

          {/* Input Box */}
          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
            <div className="space-y-2">
              <label htmlFor="ai-legal-query-input" className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                {mode === 'explain' && 'Enter statute section or legal inquiry:'}
                {mode === 'bangla' && 'আইনের ধারা বা প্রশ্ন লিখুন:'}
                {mode === 'cite' && 'Enter statute name or court judgment to format:'}
              </label>
              <textarea
                id="ai-legal-query-input"
                rows={3}
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                placeholder={
                  mode === 'explain'
                    ? 'e.g., Explain Section 420 Penal Code cheating with an everyday example...'
                    : mode === 'bangla'
                    ? 'যেমন: ফৌজদারি কার্যবিধির ৫৪ ধারায় গ্রেপ্তারের ক্ষেত্রে কী কী মৌলিক অধিকার থাকে?'
                    : 'e.g., The Code of Criminal Procedure 1898 Act V or Constitution Article 27...'
                }
                className="w-full p-3.5 text-sm bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/40 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 resize-none"
              />
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
              <span className="text-[11px] text-zinc-500 dark:text-zinc-400 flex items-center space-x-1">
                <Info className="w-3.5 h-3.5 shrink-0" />
                <span>Strictly educational legal information. Not legal advice.</span>
              </span>

              <button
                type="button"
                id="ai-submit-query-btn"
                disabled={isLoading || !inputQuery.trim()}
                onClick={() => handleGenerate(inputQuery)}
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-zinc-950 font-bold text-xs sm:text-sm flex items-center justify-center space-x-2 transition-colors shadow-md shadow-amber-500/20"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Analyzing Legal Statutes...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Analyze & Explain</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Preset Prompts Pill Carousel */}
          <div className="space-y-2">
            <p className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 px-1">
              Sample Research Queries:
            </p>
            <div className="flex flex-wrap gap-2">
              {samplePrompts.map((p, idx) => (
                <button
                  key={idx}
                  type="button"
                  id={`ai-sample-prompt-${idx}`}
                  onClick={() => {
                    setInputQuery(p.query);
                    handleGenerate(p.query);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-amber-500/50 hover:bg-amber-500/5 text-xs text-zinc-700 dark:text-zinc-300 transition-all text-left"
                >
                  {p.title}
                </button>
              ))}
            </div>
          </div>

          {/* Response Output Area */}
          {responseOutput && (
            <div className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
                <div className="flex items-center space-x-2 text-xs font-bold text-amber-600 dark:text-amber-400">
                  <Sparkles className="w-4 h-4" />
                  <span>AI Legal Knowledge Output</span>
                </div>
                <button
                  type="button"
                  id="ai-copy-response-btn"
                  onClick={handleCopy}
                  className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 text-xs flex items-center space-x-1.5 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              {/* Rendered markdown-like text */}
              <div className="text-xs sm:text-sm text-zinc-800 dark:text-zinc-200 leading-relaxed whitespace-pre-line font-sans space-y-2">
                {responseOutput}
              </div>

              <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 text-[11px] text-zinc-500 flex items-center justify-between">
                <span>Nyayota Legal Knowledge Synthesis v1.0</span>
                <span>Audited for educational accuracy</span>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Interactive Legal Glossary */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white">
                <BookOpen className="w-4 h-4 text-amber-500" />
                <span>Legal Glossary & Maxims</span>
              </div>
              <span className="text-[10px] font-mono text-zinc-400">{GLOSSARY_TERMS.length} Terms</span>
            </div>

            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Essential Latin maxims, procedural terms, and Bengali legal equivalents.
            </p>

            {/* Glossary Search Bar */}
            <input
              type="text"
              id="glossary-search-input"
              value={glossarySearch}
              onChange={(e) => setGlossarySearch(e.target.value)}
              placeholder="Search legal terms (e.g. Mens Rea, Writ)..."
              className="w-full p-2.5 text-xs bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/40 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400"
            />

            {/* Glossary Term List */}
            <div className="max-h-96 overflow-y-auto space-y-2 pr-1">
              {filteredGlossary.map((t) => {
                const isSelected = selectedGlossaryTerm?.term === t.term;
                return (
                  <button
                    key={t.term}
                    type="button"
                    id={`glossary-item-${t.term.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                    onClick={() => setSelectedGlossaryTerm(t)}
                    className={`w-full text-left p-3 rounded-xl transition-all border ${
                      isSelected
                        ? 'bg-amber-500/10 border-amber-500/50 text-zinc-900 dark:text-white shadow-sm'
                        : 'bg-zinc-50 dark:bg-zinc-950/60 border-zinc-200 dark:border-zinc-800/80 text-zinc-700 dark:text-zinc-300 hover:border-zinc-300 dark:hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold">{t.term}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                        {t.jurisdiction}
                      </span>
                    </div>
                    <p className="text-[11px] text-amber-600 dark:text-amber-400 font-medium mt-0.5">{t.termBn}</p>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1 line-clamp-1">{t.simpleExplanation}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selected Term Detail Card */}
          {selectedGlossaryTerm && (
            <div className="p-6 rounded-2xl bg-zinc-900 text-white border border-zinc-800 shadow-xl space-y-3 animate-in fade-in">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-500/20 text-amber-400">
                  {selectedGlossaryTerm.category}
                </span>
                {selectedGlossaryTerm.pronunciation && (
                  <span className="text-xs text-zinc-400 italic">/{selectedGlossaryTerm.pronunciation}/</span>
                )}
              </div>

              <div>
                <h3 className="text-lg font-bold text-white">{selectedGlossaryTerm.term}</h3>
                <p className="text-xs text-amber-400 font-medium">{selectedGlossaryTerm.termBn}</p>
              </div>

              <div className="space-y-2 text-xs">
                <p className="text-zinc-300 leading-relaxed font-sans">
                  <strong>Definition:</strong> {selectedGlossaryTerm.definition}
                </p>
                <div className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-300">
                  <span className="text-amber-300 font-semibold block mb-0.5">Everyday Meaning:</span>
                  {selectedGlossaryTerm.simpleExplanation}
                </div>
                <div className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-400 text-[11px]">
                  <span className="text-zinc-300 font-semibold block mb-0.5">Example in Law:</span>
                  &quot;{selectedGlossaryTerm.exampleUsage}&quot;
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  const q = `Explain the practical legal application of ${selectedGlossaryTerm.term} (${selectedGlossaryTerm.termBn}) under Bangladesh and universal law.`;
                  setInputQuery(q);
                  handleGenerate(q);
                }}
                className="w-full py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs flex items-center justify-center space-x-1.5 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Deep AI Analysis for {selectedGlossaryTerm.term}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AIAssistantPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-20 text-center text-zinc-500 text-sm">
          Loading AI Legal Assistant...
        </div>
      }
    >
      <AIAssistantContent />
    </Suspense>
  );
}
