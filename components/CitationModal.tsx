'use client';

import React, { useState } from 'react';
import { Quote, Copy, Check, X, BookOpen, GraduationCap, Scale } from 'lucide-react';
import { LawItem } from '@/lib/legal-data';

interface CitationModalProps {
  law: LawItem;
  isOpen: boolean;
  onClose: () => void;
}

export function CitationModal({ law, isOpen, onClose }: CitationModalProps) {
  const [activeFormat, setActiveFormat] = useState<'apa' | 'mla' | 'chicago' | 'bluebook' | 'academic' | 'standard'>('apa');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentYear = new Date().getFullYear();

  const citationFormats = {
    apa: {
      label: 'APA (7th Edition)',
      description: 'American Psychological Association style for social science & policy papers',
      text: law.citations?.apa || `${law.title}. (${law.enactmentYear}). ${law.officialSource}. Retrieved from Nyayota Legal Platform.`
    },
    mla: {
      label: 'MLA (9th Edition)',
      description: 'Modern Language Association standard for humanities and law essays',
      text: law.citations?.mla || `"${law.title}." ${law.jurisdiction} Legal Statutes, ${law.enactmentYear}. Nyayota Platform, accessed ${currentYear}.`
    },
    chicago: {
      label: 'Chicago (17th Edition)',
      description: 'Notes and bibliography format for legal history and academic publishing',
      text: law.citations?.chicago || `${law.title} (${law.enactmentYear}). ${law.officialSource}. Nyayota Legal Research System.`
    },
    bluebook: {
      label: 'Bluebook (21st Edition)',
      description: 'Standard legal citation system used in courts, law journals, and legal briefs',
      text: law.citations?.bluebook || `${law.title}, Act No. ${law.actNumber || 'N/A'} of ${law.enactmentYear} (${law.jurisdictionCode === 'BD' ? 'Bangl.' : 'Intl.'}).`
    },
    academic: {
      label: 'Academic / Law Review',
      description: 'Comprehensive citation style for dissertations and peer-reviewed journals',
      text: law.citations?.academic || `${law.title} (${law.enactmentYear}), ${law.officialSource}, Nyayota Digital Legal Repository.`
    },
    standard: {
      label: 'Standard Public Citation',
      description: 'Short universal statutory reference for general reports and citations',
      text: law.citations?.standard || `${law.title} (${law.enactmentYear})`
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const activeText = citationFormats[activeFormat].text;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="citation-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/70 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div
        className="relative w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between bg-zinc-50/50 dark:bg-zinc-950/50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30 flex items-center justify-center">
              <Quote className="w-5 h-5" />
            </div>
            <div>
              <h3 id="citation-modal-title" className="text-base font-bold text-zinc-900 dark:text-white">
                Generate Legal Citation
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Standardized academic and practitioner citations for {law.shortTitle || law.title}
              </p>
            </div>
          </div>
          <button
            type="button"
            id="close-citation-modal"
            onClick={onClose}
            aria-label="Close citation modal"
            className="p-2 rounded-xl text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Format Tabs */}
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5 p-1.5 rounded-2xl bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
            {(Object.keys(citationFormats) as Array<keyof typeof citationFormats>).map((fmt) => (
              <button
                key={fmt}
                type="button"
                id={`citation-tab-${fmt}`}
                onClick={() => setActiveFormat(fmt)}
                className={`py-2 px-1 text-xs font-bold rounded-xl transition-all uppercase tracking-wider ${
                  activeFormat === fmt
                    ? 'bg-amber-500 text-zinc-950 shadow-md shadow-amber-500/20'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50'
                }`}
              >
                {fmt}
              </button>
            ))}
          </div>

          {/* Active Citation Card */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-zinc-900 dark:text-zinc-200">
                {citationFormats[activeFormat].label}
              </span>
              <span className="text-[11px] text-zinc-500">
                {citationFormats[activeFormat].description}
              </span>
            </div>

            <div className="relative group p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 font-serif text-sm leading-relaxed text-zinc-800 dark:text-zinc-200">
              {activeText}
            </div>
          </div>

          {/* Quick Copy Action */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20">
            <div className="flex items-center space-x-2 text-xs text-zinc-700 dark:text-zinc-300">
              <GraduationCap className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
              <span>Ready for copy-paste into bibliographies, research papers, or legal briefs.</span>
            </div>

            <button
              type="button"
              id="copy-citation-btn"
              onClick={() => handleCopy(activeText)}
              className={`w-full sm:w-auto px-5 py-2.5 rounded-xl font-bold text-xs inline-flex items-center justify-center space-x-2 transition-all shadow-md ${
                copied
                  ? 'bg-emerald-600 text-white shadow-emerald-600/20'
                  : 'bg-amber-500 hover:bg-amber-400 text-zinc-950 shadow-amber-500/20'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Citation</span>
                </>
              )}
            </button>
          </div>

          {/* Format Quick Reference Guide */}
          <div className="space-y-2 pt-2 border-t border-zinc-100 dark:border-zinc-800 text-[11px] text-zinc-500">
            <span className="font-bold text-zinc-700 dark:text-zinc-300 block">
              Which format should I use?
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800">
                <span className="font-bold text-zinc-900 dark:text-white block">Law Students & Advocates:</span>
                Use <strong>Bluebook</strong> or <strong>Academic</strong> for moot court briefs, petitions, and legal journal submissions.
              </div>
              <div className="p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800">
                <span className="font-bold text-zinc-900 dark:text-white block">Academic Researchers:</span>
                Use <strong>APA</strong> for public policy or social sciences, and <strong>MLA</strong> for humanities.
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/50 flex items-center justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 font-bold text-xs transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
