'use client';

import React, { useEffect, useCallback } from 'react';
import { ShieldCheck, ExternalLink, X, Building2, Calendar, FileCheck, CheckCircle2, AlertCircle, Info, Lock } from 'lucide-react';
import { LawItem } from '@/lib/legal-data';

interface SourceVerificationModalProps {
  law: LawItem;
  isOpen: boolean;
  onClose: () => void;
}

export function SourceVerificationModal({ law, isOpen, onClose }: SourceVerificationModalProps) {
  // Handle escape key to close modal
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      // Prevent body scrolling while modal is open
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  // Determine honest verification badge and description based on law attributes
  const isIndependentlyVerified =
    law.verificationStatus === 'independently-verified' ||
    (law.contentQualityStatus === 'Verified' && law.officialGazetteRef);

  const isSourceLinked = Boolean(law.sourceVerificationUrl || law.verificationStatus === 'source-linked');

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="source-verify-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/70 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between bg-zinc-50/50 dark:bg-zinc-950/50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 id="source-verify-modal-title" className="text-base font-bold text-zinc-900 dark:text-white">
                Statutory Source Transparency
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Official repository provenance & ingestion record
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
          {/* Dynamic Status Indicator */}
          {isIndependentlyVerified ? (
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-start space-x-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="font-bold text-emerald-800 dark:text-emerald-300 block">
                  Independently Cross-Verified
                </span>
                <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                  This statutory record has been cross-checked against official parliamentary gazette printings or certified legal publications.
                </p>
              </div>
            </div>
          ) : isSourceLinked ? (
            <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-start space-x-3">
              <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="font-bold text-blue-800 dark:text-blue-300 block">
                  Official Source Repository Linked
                </span>
                <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                  Direct canonical link to the official digital repository ({law.officialSource || 'bdlaws.minlaw.gov.bd'}) is verified. Ingested text is indexed for educational research and plain-language assistance.
                </p>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="font-bold text-amber-800 dark:text-amber-300 block">
                  Provisional Educational Record
                </span>
                <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                  This statutory record is indexed for educational reference and is currently undergoing structured cataloging and verification.
                </p>
              </div>
            </div>
          )}

          {/* Details Table */}
          <div className="space-y-3">
            {law.sourceOrganization && (
              <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-1">
                <div className="flex items-center space-x-1.5 text-zinc-500 text-[11px] font-semibold">
                  <Building2 className="w-3.5 h-3.5 text-amber-500" />
                  <span>Publishing Authority / Depository:</span>
                </div>
                <p className="font-bold text-zinc-900 dark:text-white pl-5">
                  {law.sourceOrganization || law.publishingAuthority}
                </p>
              </div>
            )}

            {law.officialSource && (
              <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-1">
                <div className="flex items-center space-x-1.5 text-zinc-500 text-[11px] font-semibold">
                  <FileCheck className="w-3.5 h-3.5 text-amber-500" />
                  <span>Primary Source Repository:</span>
                </div>
                <p className="font-bold text-zinc-900 dark:text-white pl-5">
                  {law.officialSource}
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-1">
                <div className="flex items-center space-x-1.5 text-zinc-500 text-[11px] font-semibold">
                  <Calendar className="w-3.5 h-3.5 text-amber-500" />
                  <span>Enactment / Publication Year:</span>
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
                  {law.lastAmendedYear ? `Amended ${law.lastAmendedYear}` : law.lastUpdatedDate ? `Reviewed ${law.lastUpdatedDate}` : `${law.enactmentYear}`}
                </p>
              </div>
            </div>

            {law.officialGazetteRef && (
              <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-1">
                <div className="flex items-center space-x-1.5 text-zinc-500 text-[11px] font-semibold">
                  <Lock className="w-3.5 h-3.5 text-amber-500" />
                  <span>Gazette Reference / Citation:</span>
                </div>
                <p className="font-mono text-zinc-800 dark:text-zinc-200 pl-5 text-[11px]">
                  {law.officialGazetteRef}
                </p>
              </div>
            )}
          </div>

          {/* Educational Purpose Disclaimer */}
          <p className="text-[11px] text-zinc-500 leading-relaxed italic">
            Notice: Nyayota is an independent educational LegalTech initiative. It does not provide certified legal copies or replace professional legal counsel. For judicial filings or statutory certainty, consult the official gazette prints published by the Bangladesh Government Press (BG Press).
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
              <span>Visit Official Source</span>
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
