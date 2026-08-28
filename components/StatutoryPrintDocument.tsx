'use client';

import React from 'react';
import { LawItem, LawSection } from '@/lib/legal-data';
import { Scale, CheckCircle2, Shield, Calendar, BookOpen, Globe, FileText } from 'lucide-react';

export interface PrintOptions {
  scope: 'all' | 'active';
  includeBangla: boolean;
  includeExplanation: boolean;
  includeCrossReferences: boolean;
  includeNotes: boolean;
  includeMetadata: boolean;
}

interface StatutoryPrintDocumentProps {
  law: LawItem;
  activeSection?: LawSection;
  options: PrintOptions;
}

export function StatutoryPrintDocument({
  law,
  activeSection,
  options
}: StatutoryPrintDocumentProps) {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const sectionsToPrint =
    options.scope === 'active' && activeSection
      ? [activeSection]
      : law.sections;

  return (
    <div
      id="statutory-print-document-root"
      className="hidden print:block statutory-print-document font-serif text-zinc-900 bg-white"
    >
      {/* ========================================================================= */}
      {/* 1. OFFICIAL DOCUMENT HEADER */}
      {/* ========================================================================= */}
      <header className="border-b-2 border-zinc-900 pb-5 mb-6">
        {/* National / International Heading Authority Banner */}
        <div className="flex items-center justify-between border-b border-zinc-300 pb-3 mb-4 text-[10pt] uppercase tracking-widest font-sans text-zinc-600 font-semibold">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-zinc-900">
              {law.jurisdiction === 'Bangladesh'
                ? 'GOVERNMENT OF THE PEOPLE’S REPUBLIC OF BANGLADESH'
                : 'INTERNATIONAL LEGAL REPOSITORY & TREATY ARCHIVE'}
            </span>
          </div>
          <div className="text-right text-[9pt] font-mono text-zinc-500">
            NYAYOTA CODIFICATION MIRROR • {law.jurisdictionCode || 'BD'}
          </div>
        </div>

        {/* Primary Act / Statute Title */}
        <div className="space-y-1.5 text-center my-3">
          {law.actNumber && (
            <p className="text-[11pt] font-mono font-bold tracking-wider text-zinc-700 uppercase">
              {law.actNumber}
            </p>
          )}
          <h1 className="text-2xl font-bold tracking-tight text-zinc-950 uppercase font-sans">
            {law.title}
          </h1>
          {law.titleBn && options.includeBangla && (
            <h2 className="text-lg font-bold text-zinc-800 font-bangla pt-0.5">
              {law.titleBn}
            </h2>
          )}
        </div>

        {/* Key Statutory Enactment Metadata Bar */}
        <div className="grid grid-cols-4 gap-2 mt-4 pt-3 border-t border-zinc-200 text-[9pt] font-sans text-zinc-700">
          <div>
            <span className="block text-zinc-500 uppercase text-[8pt] font-bold">Enactment Year</span>
            <span className="font-semibold text-zinc-900">{law.enactmentYear}</span>
          </div>
          <div>
            <span className="block text-zinc-500 uppercase text-[8pt] font-bold">Effective Date</span>
            <span className="font-semibold text-zinc-900">{law.effectiveDate || law.enactmentYear}</span>
          </div>
          <div>
            <span className="block text-zinc-500 uppercase text-[8pt] font-bold">Status</span>
            <span className="font-bold uppercase text-zinc-900">{law.status}</span>
          </div>
          <div>
            <span className="block text-zinc-500 uppercase text-[8pt] font-bold">Scope Printed</span>
            <span className="font-semibold text-zinc-900">
              {options.scope === 'active' && activeSection
                ? `Section ${activeSection.number}`
                : `${sectionsToPrint.length} Codified Provisions`}
            </span>
          </div>
        </div>

        {/* Official Source & Gazette Verification */}
        {options.includeMetadata && (
          <div className="mt-3 p-2.5 rounded bg-zinc-50 border border-zinc-300 text-[8.5pt] font-sans text-zinc-700 flex items-center justify-between">
            <div>
              <span className="font-bold text-zinc-900">Official Publication: </span>
              <span>{law.officialSource}</span>
              {law.officialGazetteRef && (
                <span className="ml-1 text-zinc-600">({law.officialGazetteRef})</span>
              )}
            </div>
            <div className="text-zinc-500 font-mono text-[8pt]">
              Authenticated Mirror • Retrieved on {currentDate}
            </div>
          </div>
        )}
      </header>

      {/* ========================================================================= */}
      {/* 2. STATUTORY PREAMBLE & LEGISLATIVE OVERVIEW */}
      {/* ========================================================================= */}
      {options.includeMetadata && options.scope === 'all' && (
        <section className="mb-6 p-4 rounded border border-zinc-300 bg-zinc-50/70 print-page-break-inside-avoid text-[10pt]">
          <h3 className="text-[10pt] font-bold font-sans uppercase tracking-wider text-zinc-900 mb-1.5 flex items-center gap-1.5">
            <span>Statutory Scope &amp; Legislative Preamble</span>
          </h3>
          <p className="text-zinc-800 leading-relaxed italic mb-2">
            &ldquo;{law.overview}&rdquo;
          </p>
          {law.overviewBn && options.includeBangla && (
            <p className="text-zinc-700 text-[9.5pt] leading-relaxed font-bangla border-t border-zinc-200 pt-2 mt-2">
              {law.overviewBn}
            </p>
          )}
        </section>
      )}

      {/* ========================================================================= */}
      {/* 3. TABLE OF CODIFIED SECTIONS (For multi-section print) */}
      {/* ========================================================================= */}
      {options.scope === 'all' && sectionsToPrint.length > 2 && (
        <section className="mb-6 border border-zinc-300 rounded p-3.5 print-page-break-inside-avoid font-sans text-[9pt]">
          <h4 className="font-bold text-[9.5pt] uppercase tracking-wider text-zinc-900 border-b border-zinc-200 pb-1.5 mb-2">
            Index of Codified Provisions ({sectionsToPrint.length} Provisions)
          </h4>
          <div className="grid grid-cols-2 gap-x-6 gap-y-1">
            {sectionsToPrint.map((sec) => (
              <div key={sec.number} className="flex items-baseline justify-between border-b border-dotted border-zinc-200 py-0.5">
                <span className="font-bold text-zinc-900 shrink-0 mr-2">{sec.number}</span>
                <span className="text-zinc-700 truncate">{sec.title}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* 4. STATUTORY PROVISIONS BODY */}
      {/* ========================================================================= */}
      <main className="space-y-6">
        {sectionsToPrint.map((sec, index) => {
          return (
            <article
              key={sec.number || index}
              className="border border-zinc-300 rounded-lg p-4 bg-white print-page-break-inside-avoid space-y-3"
            >
              {/* Hierarchy Info (Part / Chapter) */}
              {(sec.partTitle || sec.chapterTitle) && (
                <div className="text-[8.5pt] font-sans font-bold uppercase tracking-wider text-zinc-600 border-b border-zinc-200 pb-1 flex flex-wrap gap-2">
                  {sec.partTitle && <span>{sec.partTitle}</span>}
                  {sec.partTitle && sec.chapterTitle && <span>•</span>}
                  {sec.chapterTitle && <span>{sec.chapterTitle}</span>}
                </div>
              )}

              {/* Section Header */}
              <div className="flex items-baseline justify-between gap-3 border-b border-zinc-900/40 pb-2">
                <div>
                  <span className="font-sans font-extrabold text-[11pt] text-zinc-950 uppercase tracking-wide mr-2">
                    {sec.provisionType ? `${sec.provisionType} ${sec.number}` : `Section ${sec.number}`}
                  </span>
                  <span className="font-sans font-bold text-[11pt] text-zinc-900">
                    — {sec.title}
                  </span>
                  {sec.titleBn && options.includeBangla && (
                    <span className="block font-bangla text-[10pt] text-zinc-700 font-semibold mt-0.5">
                      {sec.titleBn}
                    </span>
                  )}
                </div>
                {sec.amendmentHistory && (
                  <span className="font-mono text-[8pt] text-zinc-600 uppercase shrink-0 border border-zinc-300 px-1.5 py-0.5 rounded">
                    {sec.amendmentHistory}
                  </span>
                )}
              </div>

              {/* Official Statutory Text (English) */}
              <div className="space-y-1.5 pt-1">
                <div className="text-[8.5pt] font-sans font-bold uppercase tracking-wider text-zinc-500">
                  Official Statutory Provision
                </div>
                <div className="text-[10pt] text-zinc-900 leading-relaxed pl-3 border-l-2 border-zinc-900 whitespace-pre-line font-serif">
                  {sec.content}
                </div>
              </div>

              {/* Official Statutory Text (Bengali) */}
              {options.includeBangla && sec.contentBn && (
                <div className="space-y-1 pt-1.5 border-t border-zinc-200">
                  <div className="text-[8.5pt] font-sans font-bold uppercase tracking-wider text-zinc-500">
                    বাংলা পাঠ্য (Certified Bengali Text)
                  </div>
                  <div className="text-[9.5pt] text-zinc-800 leading-relaxed font-bangla pl-3 border-l-2 border-zinc-400 whitespace-pre-line">
                    {sec.contentBn}
                  </div>
                </div>
              )}

              {/* Plain-Language Legal Explanation */}
              {options.includeExplanation && sec.simpleExplanation && (
                <div className="p-2.5 rounded bg-zinc-50 border border-zinc-200 text-[9pt] font-sans text-zinc-800 space-y-0.5">
                  <span className="font-bold text-[8pt] uppercase tracking-wider text-zinc-600 block">
                    Plain Language Meaning &amp; Analysis
                  </span>
                  <p className="leading-snug text-zinc-700">
                    {sec.simpleExplanation}
                  </p>
                </div>
              )}

              {/* Punishment / Prescribed Remedy */}
              {sec.punishmentOrRemedy && (
                <div className="p-2.5 rounded bg-zinc-100 border border-zinc-300 text-[9pt] font-sans text-zinc-900">
                  <span className="font-bold text-[8pt] uppercase tracking-wider text-zinc-700 block">
                    Prescribed Punishment / Statutory Remedy
                  </span>
                  <p className="font-semibold text-zinc-900 mt-0.5">
                    {sec.punishmentOrRemedy}
                  </p>
                </div>
              )}

              {/* Statutory Notes & Legislative Guidance */}
              {options.includeNotes && sec.statutoryNotes && sec.statutoryNotes.length > 0 && (
                <div className="pt-1.5 border-t border-zinc-200 space-y-1.5 font-sans text-[8.5pt]">
                  <span className="font-bold uppercase tracking-wider text-zinc-500 text-[8pt] block">
                    Statutory Notes &amp; Judicial Clarifications
                  </span>
                  {sec.statutoryNotes.map((note, nIdx) => (
                    <div key={nIdx} className="p-2 rounded bg-zinc-50 border border-zinc-200 text-zinc-700">
                      <span className="font-bold uppercase text-[7.5pt] text-zinc-800 block">
                        {note.type.replace('-', ' ')} {note.citation ? `(${note.citation})` : ''}
                      </span>
                      <p className="text-zinc-800 text-[8.5pt] mt-0.5">{note.content}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Statutory Cross-References */}
              {options.includeCrossReferences && sec.crossReferences && sec.crossReferences.length > 0 && (
                <div className="pt-1.5 border-t border-zinc-200 font-sans text-[8.5pt]">
                  <span className="font-bold uppercase tracking-wider text-zinc-500 text-[8pt] block mb-1">
                    Connected Provisions &amp; Cross-References
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {sec.crossReferences.map((ref, rIdx) => (
                      <div key={rIdx} className="p-1.5 rounded bg-zinc-50 border border-zinc-200 text-[8pt]">
                        <span className="font-bold text-zinc-900">{ref.targetLawTitle} ({ref.targetSectionNumber})</span>
                        <span className="block text-zinc-600 mt-0.5">{ref.description}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </main>

      {/* ========================================================================= */}
      {/* 5. OFFICIAL COLOPHON & CITATION FOOTER */}
      {/* ========================================================================= */}
      <footer className="mt-8 pt-4 border-t-2 border-zinc-900 text-[8.5pt] font-sans text-zinc-600 print-page-break-inside-avoid space-y-3">
        {/* Standard Academic Citation Block */}
        {law.citations && (
          <div className="p-2.5 rounded border border-zinc-300 bg-zinc-50">
            <span className="font-bold text-zinc-900 uppercase text-[8pt] block mb-0.5">
              Standard Legal Citation
            </span>
            <p className="font-mono text-[8pt] text-zinc-800">
              {law.citations.bluebook || law.citations.standard || `${law.title}, ${law.actNumber || law.enactmentYear}`}
            </p>
          </div>
        )}

        {/* Institutional & Legal Disclaimer */}
        <div className="flex flex-col sm:flex-row items-start justify-between gap-3 text-[7.5pt] text-zinc-500 pt-2 border-t border-zinc-200">
          <div className="space-y-0.5">
            <p className="font-bold text-zinc-700">
              Nyayota Legal Research &amp; Open Knowledge Platform
            </p>
            <p>
              Digital document generated on {currentDate} for research, academic, and civic reference.
            </p>
            <p className="italic">
              Official legislative text remains authoritative. For certified gazette copies, refer to the Government Printing Press.
            </p>
          </div>
          <div className="text-right font-mono text-[7.5pt]">
            <p>Document ID: NYA-{law.id.toUpperCase()}-{law.enactmentYear}</p>
            <p>Jurisdiction: {law.jurisdiction} ({law.jurisdictionCode})</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
