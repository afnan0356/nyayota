'use client';

import React from 'react';
import { ShieldCheck, ExternalLink, X, Building2, Calendar, FileCheck, CheckCircle2, Lock } from 'lucide-react';
import { LawItem } from '@/lib/legal-data';

interface SourceVerificationModalProps {
  law: LawItem;
  isOpen: boolean;
  onClose: () => void;
}

export function SourceVerificationModal({ law, isOpen, onClose }: SourceVerificationModalProps) {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="source-verify-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/70 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div
        className="relative w-full max-w-xl bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between bg-zinc-50/50 dark:bg-zinc-950/50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 id="source-verify-modal-title" className="text-base font-bold text-zinc-900 dark:text-white">
                Statutory Source Verification
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Official repository provenance & authenticity record
              </p>
            </div>
          </div>
          <button
            type="button"
            id="close-source-verify-modal"
            onClick={onClose}
            aria-label="Close verification modal"
            className="p-2 rounded-xl text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto text-xs">
          {/* Status Indicator */}
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-start space-x-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold text-emerald-800 dark:text-emerald-300 block">
                Archival Record Verified
              </span>
              <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                This legal provision has been cross-verified against official parliamentary gazettes and authenticated treaty depositories.
              </p>
            </div>
          </div>

          {/* Details Table */}
          <div className="space-y-3">
            <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-1">
              <div className="flex items-center space-x-1.5 text-zinc-500 text-[11px] font-semibold">
                <Building2 className="w-3.5 h-3.5 text-amber-500" />
                <span>Publishing Authority / Depository:</span>
              </div>
              <p className="font-bold text-zinc-900 dark:text-white pl-5">
                {law.sourceOrganization}
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-1">
              <div className="flex items-center space-x-1.5 text-zinc-500 text-[11px] font-semibold">
                <FileCheck className="w-3.5 h-3.5 text-amber-500" />
                <span>Primary Source Repository:</span>
              </div>
              <p className="font-bold text-zinc-900 dark:text-white pl-5">
                {law.officialSource}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-1">
                <div className="flex items-center space-x-1.5 text-zinc-500 text-[11px] font-semibold">
                  <Calendar className="w-3.5 h-3.5 text-amber-500" />
                  <span>Publication Date:</span>
                </div>
                <p className="font-bold text-zinc-900 dark:text-white pl-5">
                  {law.publicationDate || `${law.enactmentYear}`}
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-1">
                <div className="flex items-center space-x-1.5 text-zinc-500 text-[11px] font-semibold">
                  <Calendar className="w-3.5 h-3.5 text-amber-500" />
                  <span>Last Updated / Amended:</span>
                </div>
                <p className="font-bold text-zinc-900 dark:text-white pl-5">
                  {law.lastUpdatedDate || `${law.enactmentYear}`}
                </p>
              </div>
            </div>

            {law.officialGazetteRef && (
              <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-1">
                <div className="flex items-center space-x-1.5 text-zinc-500 text-[11px] font-semibold">
                  <Lock className="w-3.5 h-3.5 text-amber-500" />
                  <span>Gazette Reference / Treaty Serial:</span>
                </div>
                <p className="font-mono text-zinc-800 dark:text-zinc-200 pl-5 text-[11px]">
                  {law.officialGazetteRef}
                </p>
              </div>
            )}
          </div>

          {/* Educational Purpose Disclaimer */}
          <p className="text-[11px] text-zinc-500 leading-relaxed italic">
            Note: Nyayota maintains digital mirrors for public legal education. For certified judicial copies admissible in court proceedings, consult official gazette prints or certified bar council records.
          </p>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/50 flex items-center justify-between gap-3">
          {law.sourceVerificationUrl ? (
            <a
              href={law.sourceVerificationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-amber-500/10 text-zinc-700 dark:text-zinc-200 hover:text-amber-600 dark:hover:text-amber-400 border border-zinc-200 dark:border-zinc-700 text-xs font-semibold inline-flex items-center space-x-1.5 transition-colors"
            >
              <span>Visit Official Depository</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          ) : (
            <div />
          )}

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs shadow-md shadow-amber-500/20 transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
