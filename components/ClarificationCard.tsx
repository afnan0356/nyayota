'use client';

import React from 'react';
import { HelpCircle, ChevronRight, Scale, ArrowRight } from 'lucide-react';

interface ClarificationCardProps {
  originalQuery: string;
  clarificationPrompt?: string;
  clarificationOptions?: string[];
  onSelectOption: (scopedQuery: string) => void;
  isLoading?: boolean;
}

export function ClarificationCard({
  originalQuery,
  clarificationPrompt,
  clarificationOptions = [],
  onSelectOption,
  isLoading = false,
}: ClarificationCardProps) {
  if (!clarificationOptions || clarificationOptions.length === 0) {
    return null;
  }

  // Helper to build a correctly scoped query from the chosen candidate option
  const buildScopedQuery = (option: string) => {
    // If the original query had a section number (e.g. "Section 54" or "ধারা ৫৪")
    const sectionMatch = originalQuery.match(/(?:section|sec|ধারা)\s*([০-৯0-9]+[a-z]?)/i);
    if (sectionMatch) {
      return `${sectionMatch[0]} ${option}`;
    }
    // Otherwise combine original query with selected statute
    return `${originalQuery} (${option})`;
  };

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-zinc-900 dark:text-zinc-100 space-y-3.5 my-2 animate-in fade-in">
      <div className="flex items-start space-x-2.5">
        <div className="w-7 h-7 rounded-lg bg-amber-500 text-zinc-950 flex items-center justify-center font-bold shrink-0 mt-0.5">
          <HelpCircle className="w-4 h-4" />
        </div>
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 block">
            Clarification Required
          </span>
          <p className="text-xs sm:text-sm font-semibold">
            {clarificationPrompt || 'Multiple statutes match your inquiry. Which one are you researching?'}
          </p>
        </div>
      </div>

      <div className="space-y-2 pt-1">
        <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 block">
          Select target statute to narrow your research:
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {clarificationOptions.map((option, idx) => {
            const scopedQuery = buildScopedQuery(option);
            return (
              <button
                key={idx}
                type="button"
                disabled={isLoading}
                id={`clarification-option-btn-${idx}`}
                onClick={() => onSelectOption(scopedQuery)}
                aria-label={`Research ${option}`}
                className="p-3 rounded-xl bg-white dark:bg-zinc-900 hover:bg-amber-500/15 dark:hover:bg-amber-500/15 border border-zinc-200 dark:border-zinc-800 hover:border-amber-500/60 text-left transition-all group flex items-center justify-between shadow-xs disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <div className="flex items-center space-x-2">
                  <Scale className="w-4 h-4 text-amber-500 shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-amber-600 dark:group-hover:text-amber-400">
                    {option}
                  </span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-amber-500 group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
