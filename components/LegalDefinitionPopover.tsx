'use client';

import React, { useState } from 'react';
import { BookOpen, Volume2, Sparkles, X, ArrowRight, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { GLOSSARY_TERMS, GlossaryTerm } from '@/lib/legal-data';

interface LegalDefinitionPopoverProps {
  termName: string;
  children?: React.ReactNode;
  onOpenFullGlossary?: (term: GlossaryTerm) => void;
}

export function LegalDefinitionPopover({
  termName,
  children,
  onOpenFullGlossary
}: LegalDefinitionPopoverProps) {
  const [isOpen, setIsOpen] = useState(false);

  const term = GLOSSARY_TERMS.find(
    (g) => g.term.toLowerCase() === termName.toLowerCase()
  );

  if (!term) {
    return <span className="font-semibold text-zinc-900 dark:text-zinc-100">{children || termName}</span>;
  }

  return (
    <span className="relative inline-block">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center space-x-1 text-blue-600 dark:text-blue-400 font-semibold underline decoration-blue-500/40 hover:decoration-blue-500 underline-offset-2 transition-all cursor-pointer"
        title={`Click to view legal definition of ${term.term}`}
      >
        <span>{children || term.term}</span>
      </button>

      {isOpen && (
        <div
          role="dialog"
          aria-label={`Definition of ${term.term}`}
          className="absolute z-50 bottom-full mb-2 left-1/2 -translate-x-1/2 w-72 sm:w-80 p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl space-y-3 text-left animate-in fade-in zoom-in-95 duration-150"
        >
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full">
                {term.category}
              </span>
              <h4 className="text-sm font-bold text-zinc-900 dark:text-white mt-1">
                {term.term}
              </h4>
              {term.termBn && (
                <p className="text-xs font-bangla text-zinc-500 dark:text-zinc-400">
                  {term.termBn}
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Definition */}
          <div className="space-y-1 text-xs">
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
              {term.definition}
            </p>
          </div>

          {/* Plain English */}
          <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] space-y-1">
            <span className="font-bold text-amber-700 dark:text-amber-400 flex items-center space-x-1">
              <Sparkles className="w-3 h-3" />
              <span>In Plain Terms:</span>
            </span>
            <p className="text-zinc-800 dark:text-zinc-200 leading-normal">
              {term.simpleExplanation}
            </p>
          </div>

          {/* Actions */}
          <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs">
            {onOpenFullGlossary ? (
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  onOpenFullGlossary(term);
                }}
                className="text-blue-600 dark:text-blue-400 font-semibold hover:underline flex items-center space-x-1"
              >
                <span>Full details & examples</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            ) : (
              <Link
                href="/glossary"
                className="text-blue-600 dark:text-blue-400 font-semibold hover:underline flex items-center space-x-1"
              >
                <span>Legal Glossary</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            )}
          </div>
        </div>
      )}
    </span>
  );
}
