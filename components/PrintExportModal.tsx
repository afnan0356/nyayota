'use client';

import React from 'react';
import { LawItem, LawSection } from '@/lib/legal-data';
import { PrintOptions } from './StatutoryPrintDocument';
import {
  Download,
  Printer,
  X,
  FileText,
  Check,
  Languages,
  BookOpen,
  Scale,
  Sparkles,
  Info,
  Layers
} from 'lucide-react';

interface PrintExportModalProps {
  law: LawItem;
  activeSection: LawSection;
  isOpen: boolean;
  onClose: () => void;
  options: PrintOptions;
  onOptionsChange: (newOptions: PrintOptions) => void;
  onTriggerPrint: () => void;
}

export function PrintExportModal({
  law,
  activeSection,
  isOpen,
  onClose,
  options,
  onOptionsChange,
  onTriggerPrint
}: PrintExportModalProps) {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="print-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-sm animate-in fade-in duration-150 print:hidden"
    >
      <div className="w-full max-w-xl rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between bg-zinc-50/50 dark:bg-zinc-950/50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30 flex items-center justify-center shrink-0">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h2
                id="print-modal-title"
                className="text-base font-bold text-zinc-900 dark:text-white"
              >
                Download Statute as PDF / Print
              </h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Format statutory provisions into a clean, professional, publication-ready document.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 overflow-y-auto">
          {/* Target Law Info */}
          <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-1">
            <div className="flex items-center space-x-2 text-xs">
              <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-700 dark:text-amber-400 font-bold uppercase text-[10px]">
                {law.jurisdiction}
              </span>
              <span className="text-zinc-500 font-mono text-[11px]">
                {law.actNumber || `${law.enactmentYear}`}
              </span>
            </div>
            <h3 className="text-sm font-bold text-zinc-900 dark:text-white">
              {law.title}
            </h3>
            {law.titleBn && (
              <p className="text-xs font-bangla text-zinc-500 dark:text-zinc-400">
                {law.titleBn}
              </p>
            )}
          </div>

          {/* Scope Selector */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
              Document Scope
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => onOptionsChange({ ...options, scope: 'all' })}
                className={`p-3.5 rounded-2xl border text-left text-xs transition-all ${
                  options.scope === 'all'
                    ? 'bg-amber-500/10 border-amber-500 text-amber-950 dark:text-amber-200 font-semibold shadow-xs ring-1 ring-amber-500'
                    : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/50'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-sm">Full Statute</span>
                  {options.scope === 'all' && <Check className="w-4 h-4 text-amber-600 dark:text-amber-400" />}
                </div>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                  All {law.sections.length} codified statutory provisions and legislative index.
                </p>
              </button>

              <button
                type="button"
                onClick={() => onOptionsChange({ ...options, scope: 'active' })}
                className={`p-3.5 rounded-2xl border text-left text-xs transition-all ${
                  options.scope === 'active'
                    ? 'bg-amber-500/10 border-amber-500 text-amber-950 dark:text-amber-200 font-semibold shadow-xs ring-1 ring-amber-500'
                    : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/50'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-sm">Active Section</span>
                  {options.scope === 'active' && <Check className="w-4 h-4 text-amber-600 dark:text-amber-400" />}
                </div>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 truncate">
                  Section {activeSection.number}: {activeSection.title}
                </p>
              </button>
            </div>
          </div>

          {/* Document Inclusions */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
              Content &amp; Document Inclusions
            </label>
            <div className="space-y-2 text-xs">
              {/* Include Bengali */}
              <label className="flex items-center justify-between p-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition-colors">
                <div className="flex items-center space-x-2.5">
                  <Languages className="w-4 h-4 text-amber-500" />
                  <div>
                    <span className="font-semibold text-zinc-900 dark:text-white block">
                      Include Certified Bengali Text (বাংলা পাঠ্য)
                    </span>
                    <span className="text-[11px] text-zinc-500">
                      Bilingual parallel statutory provisions in Bangla.
                    </span>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={options.includeBangla}
                  onChange={(e) =>
                    onOptionsChange({ ...options, includeBangla: e.target.checked })
                  }
                  className="w-4 h-4 rounded text-amber-500 focus:ring-amber-500 cursor-pointer"
                />
              </label>

              {/* Include Plain Language Explanation */}
              <label className="flex items-center justify-between p-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition-colors">
                <div className="flex items-center space-x-2.5">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <div>
                    <span className="font-semibold text-zinc-900 dark:text-white block">
                      Include Plain-Language Synthesis
                    </span>
                    <span className="text-[11px] text-zinc-500">
                      Layperson explanations and clear practical takeaways.
                    </span>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={options.includeExplanation}
                  onChange={(e) =>
                    onOptionsChange({ ...options, includeExplanation: e.target.checked })
                  }
                  className="w-4 h-4 rounded text-amber-500 focus:ring-amber-500 cursor-pointer"
                />
              </label>

              {/* Include Statutory Notes & Cross References */}
              <label className="flex items-center justify-between p-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition-colors">
                <div className="flex items-center space-x-2.5">
                  <Scale className="w-4 h-4 text-amber-500" />
                  <div>
                    <span className="font-semibold text-zinc-900 dark:text-white block">
                      Include Statutory Notes &amp; Cross-References
                    </span>
                    <span className="text-[11px] text-zinc-500">
                      Judicial interpretations, procedural caveats, and connected laws.
                    </span>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={options.includeNotes}
                  onChange={(e) =>
                    onOptionsChange({
                      ...options,
                      includeNotes: e.target.checked,
                      includeCrossReferences: e.target.checked
                    })
                  }
                  className="w-4 h-4 rounded text-amber-500 focus:ring-amber-500 cursor-pointer"
                />
              </label>

              {/* Include Official Metadata & Citations */}
              <label className="flex items-center justify-between p-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition-colors">
                <div className="flex items-center space-x-2.5">
                  <FileText className="w-4 h-4 text-amber-500" />
                  <div>
                    <span className="font-semibold text-zinc-900 dark:text-white block">
                      Include Official Gazette &amp; Citations Header
                    </span>
                    <span className="text-[11px] text-zinc-500">
                      Official gazette notification numbers, source citations, and verification ID.
                    </span>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={options.includeMetadata}
                  onChange={(e) =>
                    onOptionsChange({ ...options, includeMetadata: e.target.checked })
                  }
                  className="w-4 h-4 rounded text-amber-500 focus:ring-amber-500 cursor-pointer"
                />
              </label>
            </div>
          </div>

          {/* Quick Tip */}
          <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex items-start space-x-2.5 text-xs">
            <Info className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
              When the browser print dialog opens, select <strong>&quot;Save as PDF&quot;</strong> as the destination to download the formatted PDF file to your device.
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between bg-zinc-50/50 dark:bg-zinc-950/50">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 font-semibold text-xs transition-colors"
          >
            Cancel
          </button>

          <button
            type="button"
            id="modal-trigger-print-btn"
            onClick={() => {
              onClose();
              setTimeout(() => {
                onTriggerPrint();
              }, 100);
            }}
            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs inline-flex items-center space-x-2 shadow-md shadow-amber-500/20 transition-all cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Generate Document &amp; Print / Save PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
}
