'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
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
  RefreshCw,
  Trash2,
  ArrowRight,
  Shield,
  Download,
  FileText,
  User,
  Search,
  ExternalLink,
  ChevronRight,
  ShieldAlert,
  Cpu,
  Database,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import {
  GLOSSARY_TERMS,
  GlossaryTerm,
  LAWS_DATABASE,
  LawItem
} from '@/lib/legal-data';
import { NyayotaAIServiceResponse } from '@/lib/nyayota-ai/service';
import { CitationCard } from '@/components/CitationCard';
import { ClarificationCard } from '@/components/ClarificationCard';

interface ChatMessageItem {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  lawContextTitle?: string;
  engine?: 'deterministic' | 'general';
  deterministicResponse?: NyayotaAIServiceResponse;
}

function AIAssistantContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('query') || '';
  const termParam = searchParams.get('term') || '';
  const lawIdParam = searchParams.get('lawId') || '';
  const sectionParam = searchParams.get('section') || '';
  const promptParam = searchParams.get('prompt') || '';

  // Active Law Context if coming from "Ask About This Law"
  const activeLawContext: LawItem | null = lawIdParam
    ? LAWS_DATABASE.find((l) => l.id === lawIdParam) || null
    : null;

  const [inputQuery, setInputQuery] = useState(
    promptParam || initialQuery || (termParam ? `Define the legal term: ${termParam}` : '')
  );

  // Assistant Mode: Source-Grounded Deterministic Engine vs General AI Assistant (Gemini)
  const [assistantEngine, setAssistantEngine] = useState<'deterministic' | 'general'>('deterministic');

  // Query formatting / stylistic mode
  const [mode, setMode] = useState<'explain' | 'bangla' | 'compare' | 'cite'>('explain');
  const [isLoading, setIsLoading] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessageItem[]>(() => [
    {
      id: 'welcome-msg',
      role: 'assistant',
      engine: 'deterministic',
      content: `### Welcome to Nyayota AI Legal Knowledge Assistant ⚖️

Select between two research modes above:
1. **Source-Grounded Legal Research (Deterministic):** Fast, traceable legal answers grounded exclusively in verified Bangladesh statutes and UN treaties stored in this repository. Zero external AI hallucinations.
2. **General AI Assistant (Gemini):** Broad conversational legal explainer for conceptual analogies, hypothetical fact scenarios, and cross-disciplinary legal context.

*Educational Information Only — Not Legal Advice. Nyayota is designed for educational exploration, academic research, and public legal literacy.*`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [glossarySearch, setGlossarySearch] = useState(termParam || '');
  const [selectedGlossaryTerm, setSelectedGlossaryTerm] = useState<GlossaryTerm | null>(
    termParam ? GLOSSARY_TERMS.find((t) => t.term.toLowerCase() === termParam.toLowerCase()) || null : null
  );

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages, isLoading]);

  // Suggested Prompts tailored for both statutory retrieval and conceptual inquiry
  const suggestedPrompts = [
    { title: 'Penal Code Sec 300 (Murder)', query: 'The Penal Code, 1860 Section 300' },
    { title: 'CrPC Sec 54 (Arrest)', query: 'The Code of Criminal Procedure, 1898 Section 54' },
    { title: 'Penal Code Sec 302 (Penalty)', query: 'The Penal Code, 1860 Section 302' },
    { title: 'Section 54 (Disambiguation)', query: 'Section 54' },
    { title: 'What is negligence?', query: 'What is negligence and what are the essential elements required to prove duty of care in civil law?' },
    { title: 'High Court Writs (Art 102)', query: 'Article 102 The Constitution of the People\'s Republic of Bangladesh' },
  ];

  // Law context specific prompt chips
  const lawContextChips = activeLawContext
    ? [
        `Explain ${activeLawContext.shortTitle}${sectionParam ? ` ${sectionParam}` : ''} in plain language`,
        `What are the key provisions and practical takeaways of ${activeLawContext.shortTitle}?`,
        `What are common real-world misunderstandings about ${activeLawContext.shortTitle}?`,
        `What is the prescribed penalty or statutory remedy in ${activeLawContext.shortTitle}?`,
      ]
    : [];

  const handleSendMessage = async (queryText?: string) => {
    const q = (queryText || inputQuery).trim();
    if (!q || isLoading) return;

    const userMsg: ChatMessageItem = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: q,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      lawContextTitle: activeLawContext ? `${activeLawContext.shortTitle}${sectionParam ? ` (${sectionParam})` : ''}` : undefined,
    };

    setChatMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsLoading(true);

    try {
      // Package active law context if applicable
      const lawContextPayload = activeLawContext
        ? {
            title: activeLawContext.title,
            shortTitle: activeLawContext.shortTitle,
            jurisdiction: activeLawContext.jurisdiction,
            category: activeLawContext.category,
            overview: activeLawContext.overview,
            sectionNumber: sectionParam || undefined,
            sectionTitle: sectionParam
              ? activeLawContext.sections.find((s) => s.number === sectionParam)?.title
              : undefined,
            sectionContent: sectionParam
              ? activeLawContext.sections.find((s) => s.number === sectionParam)?.content
              : undefined,
          }
        : undefined;

      const res = await fetch('/api/ai-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: q,
          engine: assistantEngine,
          mode,
          language: mode === 'bangla' ? 'bengali' : 'both',
          lawContext: lawContextPayload,
          messages: chatMessages.slice(-4).map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      const data = await res.json();

      const assistantMsg: ChatMessageItem = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        content: data.text || 'Unable to analyze the legal query at this moment. Please check your query.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        engine: data.engine || assistantEngine,
        deterministicResponse: data.deterministicResponse,
      };

      setChatMessages((prev) => [...prev, assistantMsg]);
    } catch {
      setChatMessages((prev) => [
        ...prev,
        {
          id: `ai-err-${Date.now()}`,
          role: 'assistant',
          content: 'A network communication error occurred while analyzing the legal request. Please try again.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClearChat = () => {
    setChatMessages([
      {
        id: `welcome-${Date.now()}`,
        role: 'assistant',
        engine: assistantEngine,
        content: `### New Legal Research Session Started ⚖️\n\nCurrent Engine: **${
          assistantEngine === 'deterministic'
            ? 'Source-Grounded Legal Research (Deterministic)'
            : 'General AI Assistant (Gemini)'
        }**\n\nHow can I help you analyze statutes, sections, or constitutional provisions today?\n\n*Educational Information Only — Not Legal Advice.*`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  const handleExportChat = () => {
    const exportText = chatMessages
      .map(
        (m) =>
          `[${m.timestamp}] ${m.role === 'user' ? 'USER' : `NYAYOTA AI (${m.engine || 'assistant'})`}:\n${m.content}\n\n---\n`
      )
      .join('\n');
    const blob = new Blob([exportText], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nyayota-ai-research-session-${new Date().toISOString().slice(0, 10)}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const filteredGlossary = GLOSSARY_TERMS.filter(
    (t) =>
      t.term.toLowerCase().includes(glossarySearch.toLowerCase()) ||
      (t.termBn && t.termBn.toLowerCase().includes(glossarySearch.toLowerCase())) ||
      t.definition.toLowerCase().includes(glossarySearch.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8">
      {/* Top Banner & Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-6">
        <div className="space-y-2 max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-xs font-semibold">
            <Scale className="w-3.5 h-3.5" />
            <span>Nyayota Legal Intelligence</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            AI Legal Assistant & Research Console
          </h1>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Search codified Bangladesh statutes, verify provisions, explore international covenants, and generate source-grounded legal analysis.
          </p>
        </div>

        {/* Global Mandatory Educational Disclaimer Pill */}
        <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-300 text-xs max-w-xs shrink-0 space-y-1">
          <div className="flex items-center space-x-1.5 font-bold">
            <ShieldAlert className="w-4 h-4 text-amber-500 shrink-0" />
            <span>Educational Research Only</span>
          </div>
          <p className="text-[11px] text-zinc-600 dark:text-zinc-400 leading-tight">
            Not legal representation. Does not constitute formal legal advice or guarantee court outcomes.
          </p>
        </div>
      </div>

      {/* ASSISTANT ENGINE SELECTOR (Deterministic vs General AI) */}
      <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <Cpu className="w-4 h-4 text-amber-500" />
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white">
              Assistant Mode Engine
            </span>
          </div>
          <span className="text-[11px] text-zinc-500">
            Current: <strong className="text-amber-600 dark:text-amber-400">{assistantEngine === 'deterministic' ? 'Source-Grounded Pipeline' : 'General AI (Gemini)'}</strong>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Option 1: Source-Grounded Legal Research */}
          <button
            type="button"
            id="engine-selector-deterministic"
            onClick={() => setAssistantEngine('deterministic')}
            className={`p-4 rounded-2xl border text-left transition-all ${
              assistantEngine === 'deterministic'
                ? 'bg-amber-500/10 border-amber-500 text-zinc-900 dark:text-white shadow-xs ring-1 ring-amber-500'
                : 'bg-zinc-50 dark:bg-zinc-950/70 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-zinc-300 dark:hover:border-zinc-700'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center space-x-2 font-bold text-sm">
                <Database className="w-4 h-4 text-amber-500" />
                <span>Source-Grounded Legal Research</span>
              </div>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                Deterministic
              </span>
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Fast, deterministic retrieval powered strictly by in-repo Bangladesh statutes, Bangladesh Code catalogs, and UN treaties. Zero external AI hallucinations.
            </p>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-500 mt-2 font-mono">
              • Anti-substitution guards • Verified source citations • Disambiguation
            </p>
          </button>

          {/* Option 2: General AI Assistant (Gemini) */}
          <button
            type="button"
            id="engine-selector-general"
            onClick={() => setAssistantEngine('general')}
            className={`p-4 rounded-2xl border text-left transition-all ${
              assistantEngine === 'general'
                ? 'bg-amber-500/10 border-amber-500 text-zinc-900 dark:text-white shadow-xs ring-1 ring-amber-500'
                : 'bg-zinc-50 dark:bg-zinc-950/70 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-zinc-300 dark:hover:border-zinc-700'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center space-x-2 font-bold text-sm">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>General AI Assistant</span>
              </div>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                Gemini 2.5
              </span>
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Google Gemini-powered conversational assistant for conceptual legal analogies, hypothetical scenario breakdowns, and broader academic inquiries.
            </p>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-500 mt-2 font-mono">
              • Conversational synthesis • Everyday analogies • Multi-step questions
            </p>
          </button>
        </div>
      </div>

      {/* "ASK ABOUT THIS LAW" ACTIVE CONTEXT BANNER */}
      {activeLawContext && (
        <div
          id="active-law-context-banner"
          className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-500/15 via-amber-500/10 to-zinc-900 border-2 border-amber-500/40 text-zinc-900 dark:text-white space-y-3 shadow-md animate-in slide-in-from-top-2"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-xl bg-amber-500 text-zinc-950 flex items-center justify-center font-bold">
                <Scale className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 block">
                  Active Law Context Loaded
                </span>
                <h2 className="text-sm sm:text-base font-bold">
                  {activeLawContext.title} {sectionParam && `(${sectionParam})`}
                </h2>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Link
                href={`/law/${activeLawContext.id}${sectionParam ? `?section=${encodeURIComponent(sectionParam)}` : ''}`}
                className="px-3 py-1.5 rounded-xl bg-white dark:bg-zinc-800 hover:bg-amber-500/20 text-xs font-bold text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 inline-flex items-center space-x-1 transition-colors"
              >
                <span>Read Full Statute</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
              <Link
                href="/ai-assistant"
                className="p-1.5 rounded-xl bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-xs text-zinc-600 dark:text-zinc-400"
                title="Clear law context"
              >
                ✕
              </Link>
            </div>
          </div>

          {/* Quick Context Action Chips */}
          <div className="space-y-1.5 pt-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Suggested Questions for this Statute:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {lawContextChips.map((chip, idx) => (
                <button
                  key={idx}
                  type="button"
                  id={`law-context-chip-${idx}`}
                  onClick={() => {
                    setInputQuery(chip);
                    handleSendMessage(chip);
                  }}
                  className="px-3 py-1 rounded-lg text-xs font-medium bg-white dark:bg-zinc-950 border border-amber-500/30 hover:border-amber-500 text-zinc-800 dark:text-zinc-200 hover:text-amber-600 dark:hover:text-amber-400 shadow-xs transition-all text-left"
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Grid: Chat Workspace + Research / Glossary Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Chat Console Column (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          {/* Mode Selector & Session Actions Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-2 p-2 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm text-xs font-semibold">
            {/* Mode Pills */}
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                id="ai-mode-explain"
                onClick={() => setMode('explain')}
                className={`px-3 py-1.5 rounded-xl transition-all ${
                  mode === 'explain'
                    ? 'bg-amber-500 text-zinc-950 font-bold shadow-xs'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                Plain Explainer
              </button>
              <button
                type="button"
                id="ai-mode-bangla"
                onClick={() => setMode('bangla')}
                className={`px-3 py-1.5 rounded-xl font-bangla transition-all ${
                  mode === 'bangla'
                    ? 'bg-amber-500 text-zinc-950 font-bold shadow-xs'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                বাংলা ব্যাখ্যা (Bangla)
              </button>
              <button
                type="button"
                id="ai-mode-compare"
                onClick={() => setMode('compare')}
                className={`px-3 py-1.5 rounded-xl transition-all ${
                  mode === 'compare'
                    ? 'bg-amber-500 text-zinc-950 font-bold shadow-xs'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                Concept Comparison
              </button>
              <button
                type="button"
                id="ai-mode-cite"
                onClick={() => setMode('cite')}
                className={`px-3 py-1.5 rounded-xl transition-all ${
                  mode === 'cite'
                    ? 'bg-amber-500 text-zinc-950 font-bold shadow-xs'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                Citations
              </button>
            </div>

            {/* Session Actions (Clear & Export) */}
            <div className="flex items-center space-x-1 text-zinc-500">
              <button
                type="button"
                id="ai-export-chat-btn"
                onClick={handleExportChat}
                className="p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-amber-500"
                title="Export session notes as Markdown"
              >
                <Download className="w-4 h-4" />
              </button>
              <button
                type="button"
                id="ai-clear-chat-btn"
                onClick={handleClearChat}
                className="p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-rose-500"
                title="Start new conversation"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Chat Messages Log Area */}
          <div className="p-4 sm:p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm min-h-[480px] max-h-[660px] overflow-y-auto space-y-6">
            {chatMessages.map((msg) => {
              const isUser = msg.role === 'user';
              const det = msg.deterministicResponse;

              return (
                <div
                  key={msg.id}
                  className={`flex items-start gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
                >
                  {/* Assistant Avatar */}
                  {!isUser && (
                    <div className="w-8 h-8 rounded-xl bg-amber-500 text-zinc-950 flex items-center justify-center font-bold shrink-0 mt-1 shadow-sm">
                      <Scale className="w-4 h-4" />
                    </div>
                  )}

                  {/* Message Bubble */}
                  <div
                    className={`max-w-[92%] sm:max-w-[85%] rounded-3xl p-5 space-y-3 text-xs sm:text-sm leading-relaxed transition-all shadow-xs ${
                      isUser
                        ? 'bg-amber-500 text-zinc-950 font-medium rounded-tr-none'
                        : 'bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-tl-none'
                    }`}
                  >
                    {/* Header tag if law context was attached */}
                    {msg.lawContextTitle && (
                      <div className="text-[10px] font-bold uppercase tracking-wider opacity-80 pb-1 border-b border-black/10 dark:border-white/10">
                        Context: {msg.lawContextTitle}
                      </div>
                    )}

                    {/* Engine Identifier Badge for Assistant Responses */}
                    {!isUser && (
                      <div className="flex items-center justify-between gap-2 pb-2 border-b border-zinc-200 dark:border-zinc-800 text-[10px]">
                        <span className="font-bold uppercase tracking-wider text-zinc-500">
                          {msg.engine === 'deterministic'
                            ? 'Source-Grounded Response'
                            : 'General AI Assistant Response'}
                        </span>
                        {det && (
                          <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 font-semibold font-mono">
                            {det.executionTimeMs}ms • {det.detectedJurisdiction}
                          </span>
                        )}
                      </div>
                    )}

                    {/* DETERMINISTIC RICH RESPONSE RENDERING */}
                    {!isUser && det ? (
                      <div className="space-y-4">
                        {/* Headline & Summary */}
                        <div className="space-y-1.5">
                          <h3 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-white">
                            {det.headline}
                          </h3>
                          {det.summary && (
                            <p className="text-xs text-zinc-600 dark:text-zinc-300 font-medium bg-amber-500/5 dark:bg-amber-500/10 p-3 rounded-xl border border-amber-500/20">
                              {det.summary}
                            </p>
                          )}
                        </div>

                        {/* Structured Explanation Body */}
                        <div className="whitespace-pre-line font-sans space-y-2 text-zinc-800 dark:text-zinc-200">
                          {msg.content}
                        </div>

                        {/* Interactive Clarification Card (if ambiguous or clarification needed) */}
                        {det.clarificationOptions && det.clarificationOptions.length > 0 && (
                          <ClarificationCard
                            originalQuery={det.query}
                            clarificationPrompt={det.clarificationPrompt}
                            clarificationOptions={det.clarificationOptions}
                            onSelectOption={(scopedQuery) => handleSendMessage(scopedQuery)}
                            isLoading={isLoading}
                          />
                        )}

                        {/* Cross-Reference Mentions Box (e.g. Sec 300 citing Sec 302) */}
                        {det.crossReferenceMentions && det.crossReferenceMentions.length > 0 && (
                          <div className="p-3 rounded-2xl bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/40 text-xs space-y-1.5">
                            <div className="flex items-center space-x-1.5 font-bold text-blue-900 dark:text-blue-300">
                              <Info className="w-3.5 h-3.5" />
                              <span>In-Repo Cross-Reference Notice:</span>
                            </div>
                            {det.crossReferenceMentions.map((cr, idx) => (
                              <p key={idx} className="text-[11px] text-zinc-700 dark:text-zinc-300">
                                <strong>{cr.referencingProvisionTitle}</strong> ({cr.referencingProvisionIdentifier}) references {cr.targetSectionQuery} in its penalty or procedural clause: <em>&ldquo;{cr.contextQuote}&rdquo;</em>
                              </p>
                            ))}
                          </div>
                        )}

                        {/* Verified Citation Cards */}
                        {det.sources && det.sources.length > 0 && (
                          <div className="space-y-2 pt-2 border-t border-zinc-200 dark:border-zinc-800">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 block">
                              Verified Legal Sources ({det.sources.length})
                            </span>
                            <div className="space-y-2">
                              {det.sources.map((src) => (
                                <CitationCard key={src.id} citation={src} />
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Coverage Limitations Warning if any */}
                        {det.limitations && det.limitations.length > 0 && (
                          <div className="p-3 rounded-xl bg-zinc-100 dark:bg-zinc-900 text-[11px] text-zinc-600 dark:text-zinc-400 space-y-1 border border-zinc-200 dark:border-zinc-800">
                            <span className="font-bold text-zinc-700 dark:text-zinc-300">Statutory Scope & Limitations:</span>
                            <ul className="list-disc list-inside space-y-0.5">
                              {det.limitations.map((lim, idx) => (
                                <li key={idx}>{lim}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ) : (
                      /* GENERAL AI / STANDARD MESSAGE BODY */
                      <div className="whitespace-pre-line font-sans space-y-2">
                        {msg.content}
                      </div>
                    )}

                    {/* Message Footer & Copy */}
                    <div
                      className={`flex items-center justify-between pt-2 text-[10px] border-t ${
                        isUser
                          ? 'border-black/10 text-zinc-900'
                          : 'border-zinc-200 dark:border-zinc-800/80 text-zinc-400'
                      }`}
                    >
                      <span>{msg.timestamp}</span>
                      {!isUser && (
                        <button
                          type="button"
                          onClick={() => handleCopy(msg.id, msg.content)}
                          className="hover:text-amber-500 flex items-center space-x-1 text-zinc-500 font-semibold"
                        >
                          {copiedId === msg.id ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-500" />
                              <span>Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy Response</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* User Avatar */}
                  {isUser && (
                    <div className="w-8 h-8 rounded-xl bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 flex items-center justify-center font-bold shrink-0 mt-1">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              );
            })}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex items-start gap-3 justify-start animate-pulse">
                <div className="w-8 h-8 rounded-xl bg-amber-500/50 text-zinc-950 flex items-center justify-center font-bold shrink-0 mt-1">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                </div>
                <div className="p-4 rounded-2xl bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-500 flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-amber-500 animate-spin" />
                  <span>
                    {assistantEngine === 'deterministic'
                      ? 'Executing deterministic legal retrieval & provision verification...'
                      : 'Synthesizing statutory provisions & legal analysis with Gemini...'}
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* User Input Console */}
          <div className="p-4 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-3">
            <div className="relative">
              <textarea
                id="ai-legal-query-input"
                rows={2}
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder={
                  activeLawContext
                    ? `Ask about ${activeLawContext.shortTitle}...`
                    : assistantEngine === 'deterministic'
                    ? 'Search statutes, sections, or concepts (e.g. Penal Code 300, CrPC 54, Article 102)...'
                    : 'Ask any legal question, scenario comparison, or conceptual inquiry...'
                }
                className="w-full pl-4 pr-12 py-3 text-xs sm:text-sm bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-500/40 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 resize-none font-medium"
              />

              <button
                type="button"
                id="ai-submit-query-btn"
                disabled={isLoading || !inputQuery.trim()}
                onClick={() => handleSendMessage()}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-zinc-950 font-bold transition-all shadow-md shadow-amber-500/20"
                aria-label="Send message"
              >
                {isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              </button>
            </div>

            <div className="flex items-center justify-between text-[11px] text-zinc-500 dark:text-zinc-400 px-1">
              <span>Press <strong>Enter</strong> to send, <strong>Shift+Enter</strong> for new line</span>
              <span>
                Engine:{' '}
                <strong>
                  {assistantEngine === 'deterministic' ? 'Source-Grounded' : 'Gemini AI'}
                </strong>
              </span>
            </div>
          </div>

          {/* Suggested Research Questions Carousel */}
          <div className="space-y-2 pt-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 px-1">
              Suggested Questions:
            </span>
            <div className="flex flex-wrap gap-2">
              {suggestedPrompts.map((p, idx) => (
                <button
                  key={idx}
                  type="button"
                  id={`ai-suggested-prompt-${idx}`}
                  onClick={() => {
                    setInputQuery(p.query);
                    handleSendMessage(p.query);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-amber-500 hover:bg-amber-500/5 text-xs text-zinc-700 dark:text-zinc-300 transition-all text-left shadow-xs flex items-center space-x-1.5"
                >
                  <Scale className="w-3 h-3 text-amber-500 shrink-0" />
                  <span>{p.title}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Glossary & Knowledge Paths Quick Launcher (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Quick Knowledge Paths Card */}
          <div className="p-5 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white">
                <Layers className="w-4 h-4 text-amber-500" />
                <span>Knowledge Paths</span>
              </div>
              <Link
                href="/knowledge-paths"
                className="text-[11px] font-bold text-amber-600 dark:text-amber-400 hover:underline"
              >
                View All
              </Link>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Structured educational guides for mastering specific legal domains step-by-step.
            </p>
            <div className="space-y-2">
              <Link
                href="/knowledge-paths#path-cyber-law"
                className="p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 hover:border-amber-500/40 flex items-center justify-between text-xs transition-colors group"
              >
                <div>
                  <span className="font-bold text-zinc-900 dark:text-white block group-hover:text-amber-500">
                    Cyber Law & Digital Rights
                  </span>
                  <span className="text-[11px] text-zinc-400">4 Milestones • 45 mins</span>
                </div>
                <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:text-amber-500" />
              </Link>

              <Link
                href="/knowledge-paths#path-constitution"
                className="p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 hover:border-amber-500/40 flex items-center justify-between text-xs transition-colors group"
              >
                <div>
                  <span className="font-bold text-zinc-900 dark:text-white block group-hover:text-amber-500">
                    Constitution & Part III Rights
                  </span>
                  <span className="text-[11px] text-zinc-400">4 Milestones • 50 mins</span>
                </div>
                <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:text-amber-500" />
              </Link>

              <Link
                href="/knowledge-paths#path-criminal-justice"
                className="p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 hover:border-amber-500/40 flex items-center justify-between text-xs transition-colors group"
              >
                <div>
                  <span className="font-bold text-zinc-900 dark:text-white block group-hover:text-amber-500">
                    Criminal Justice & Sec 54
                  </span>
                  <span className="text-[11px] text-zinc-400">3 Milestones • 40 mins</span>
                </div>
                <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:text-amber-500" />
              </Link>
            </div>
          </div>

          {/* Interactive Legal Glossary Panel */}
          <div className="p-5 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white">
                <BookOpen className="w-4 h-4 text-amber-500" />
                <span>Legal Glossary & Maxims</span>
              </div>
              <span className="text-[10px] font-mono text-zinc-400">{GLOSSARY_TERMS.length} Terms</span>
            </div>

            {/* Glossary Search Bar */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                id="glossary-search-input"
                value={glossarySearch}
                onChange={(e) => setGlossarySearch(e.target.value)}
                placeholder="Search terms (e.g. Mens Rea, Writ)..."
                className="w-full pl-8 pr-3 py-2 text-xs bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/40 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400"
              />
            </div>

            {/* Glossary Term List */}
            <div className="max-h-72 overflow-y-auto space-y-1.5 pr-1">
              {filteredGlossary.map((t) => {
                const isSelected = selectedGlossaryTerm?.term === t.term;
                return (
                  <button
                    key={t.term}
                    type="button"
                    id={`glossary-item-${t.term.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                    onClick={() => setSelectedGlossaryTerm(t)}
                    className={`w-full text-left p-2.5 rounded-xl transition-all border text-xs ${
                      isSelected
                        ? 'bg-amber-500/10 border-amber-500/50 text-zinc-900 dark:text-white shadow-xs font-bold'
                        : 'bg-zinc-50 dark:bg-zinc-950/60 border-zinc-200 dark:border-zinc-800/80 text-zinc-700 dark:text-zinc-300 hover:border-zinc-300 dark:hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold">{t.term}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                        {t.jurisdiction}
                      </span>
                    </div>
                    <p className="text-[11px] text-amber-600 dark:text-amber-400 font-medium font-bangla">{t.termBn}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selected Term Detail Card */}
          {selectedGlossaryTerm && (
            <div className="p-5 rounded-3xl bg-zinc-900 text-white border border-zinc-800 shadow-xl space-y-3 animate-in fade-in">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-500/20 text-amber-400">
                  {selectedGlossaryTerm.category}
                </span>
                {selectedGlossaryTerm.pronunciation && (
                  <span className="text-xs text-zinc-400 italic">/{selectedGlossaryTerm.pronunciation}/</span>
                )}
              </div>

              <div>
                <h3 className="text-base font-bold text-white">{selectedGlossaryTerm.term}</h3>
                <p className="text-xs text-amber-400 font-medium font-bangla">{selectedGlossaryTerm.termBn}</p>
              </div>

              <div className="space-y-2 text-xs">
                <p className="text-zinc-300 leading-relaxed font-sans">
                  <strong>Definition:</strong> {selectedGlossaryTerm.definition}
                </p>
                <div className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-300">
                  <span className="text-amber-300 font-semibold block mb-0.5">Plain Language:</span>
                  {selectedGlossaryTerm.simpleExplanation}
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  const q = `Explain the practical legal application of ${selectedGlossaryTerm.term} (${selectedGlossaryTerm.termBn}) under Bangladesh and universal law with real courtroom examples.`;
                  setInputQuery(q);
                  handleSendMessage(q);
                }}
                className="w-full py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs flex items-center justify-center space-x-1.5 transition-colors shadow-md shadow-amber-500/20"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Deep Analysis for {selectedGlossaryTerm.term}</span>
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
