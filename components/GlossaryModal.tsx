'use client';

import React from 'react';
import { BookOpen, Volume2, Sparkles, X, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { GlossaryTerm } from '@/lib/legal-data';

interface GlossaryModalProps {
  term: GlossaryTerm | null;
  isOpen: boolean;
  onClose: () => void;
}

export function GlossaryModal({ term, isOpen, onClose }: GlossaryModalProps) {
  if (!isOpen || !term) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="glossary-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/70 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div
        className="relative w-full max-w-lg bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 border-b border-zinc-100 dark:border-zinc-800 flex items-start justify-between bg-zinc-50/50 dark:bg-zinc-950/50">
          <div>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 mb-2 inline-block">
              {term.category} • {term.jurisdiction}
            </span>
            <h3 id="glossary-modal-title" className="text-xl font-bold text-zinc-900 dark:text-white">
              {term.term}
            </h3>
            {term.termBn && (
              <p className="text-sm font-bangla text-zinc-500 dark:text-zinc-400">
                {term.termBn}
              </p>
            )}
          </div>
          <button
            type="button"
            id="close-glossary-modal"
            onClick={onClose}
            aria-label="Close glossary modal"
            className="p-2 rounded-xl text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto text-xs">
          {term.pronunciation && (
            <div className="flex items-center space-x-2 text-zinc-500 text-xs">
              <Volume2 className="w-3.5 h-3.5 text-amber-500" />
              <span>Pronunciation:</span>
              <span className="font-mono font-semibold text-zinc-800 dark:text-zinc-200">
                /{term.pronunciation}/
              </span>
            </div>
          )}

          {/* Formal Legal Definition */}
          <div className="space-y-1.5 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
            <span className="font-bold text-[11px] text-zinc-500 uppercase tracking-wider block">
              Formal Legal Definition
            </span>
            <p className="text-zinc-800 dark:text-zinc-200 text-sm leading-relaxed">
              {term.definition}
            </p>
          </div>

          {/* Plain English / 15-Year-Old Explanation */}
          <div className="space-y-1.5 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20">
            <div className="flex items-center space-x-1.5 text-amber-600 dark:text-amber-400 font-bold text-[11px] uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Explained Simply (No Jargon)</span>
            </div>
            <p className="text-zinc-900 dark:text-zinc-100 text-xs leading-relaxed font-medium">
              {term.simpleExplanation}
            </p>
          </div>

          {/* Practical Usage Example */}
          {term.exampleUsage && (
            <div className="space-y-1.5 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
              <span className="font-bold text-[11px] text-zinc-500 uppercase tracking-wider block">
                Practical Application / Court Example
              </span>
              <p className="text-zinc-700 dark:text-zinc-300 italic leading-relaxed">
                &ldquo;{term.exampleUsage}&rdquo;
              </p>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/50 flex items-center justify-between">
          <Link
            href="/glossary"
            onClick={onClose}
            className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline inline-flex items-center space-x-1"
          >
            <span>View Full Legal Glossary</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs shadow-md shadow-amber-500/20 transition-colors"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
}
