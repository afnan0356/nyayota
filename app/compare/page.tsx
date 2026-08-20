'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeftRight,
  Scale,
  Globe,
  Sparkles,
  Printer,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Building2,
  Calendar,
  Layers
} from 'lucide-react';
import {
  LAWS_DATABASE,
  LAW_COMPARISON_PRESETS,
  LawComparisonProfile,
  LawItem,
  getEnrichedLaw
} from '@/lib/legal-data';

function CompareToolContent() {
  const searchParams = useSearchParams();
  const initialLawAId = searchParams.get('lawA') || 'bd-penal-code-1860';
  const initialLawBId = searchParams.get('lawB') || 'bd-crpc-1898';
  const initialPresetId = searchParams.get('preset');

  const [lawAId, setLawAId] = useState<string>(initialLawAId);
  const [lawBId, setLawBId] = useState<string>(initialLawBId);

  const lawA = useMemo(() => getEnrichedLaw(lawAId), [lawAId]);
  const lawB = useMemo(() => getEnrichedLaw(lawBId), [lawBId]);

  // Find if there's a curated comparison profile
  const activePreset = useMemo<LawComparisonProfile | undefined>(() => {
    return LAW_COMPARISON_PRESETS.find(
      (p) =>
        (p.lawIdA === lawAId && p.lawIdB === lawBId) ||
        (p.lawIdA === lawBId && p.lawIdB === lawAId)
    );
  }, [lawAId, lawBId]);

  const handleSelectPreset = (preset: LawComparisonProfile) => {
    setLawAId(preset.lawIdA);
    setLawBId(preset.lawIdB);
  };

  const handleSwapLaws = () => {
    const temp = lawAId;
    setLawAId(lawBId);
    setLawBId(temp);
  };

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8">
      {/* Header Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center justify-between text-xs text-zinc-500">
        <div className="flex items-center space-x-2">
          <Link href="/" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3 text-zinc-400" />
          <span className="font-semibold text-zinc-800 dark:text-zinc-200">
            Law Comparison Engine
          </span>
        </div>

        <button
          type="button"
          onClick={handlePrint}
          className="px-3 py-1.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-amber-500/40 text-zinc-700 dark:text-zinc-300 text-xs font-semibold inline-flex items-center space-x-1.5 transition-colors"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Print Comparison</span>
        </button>
      </nav>

      {/* Hero Header */}
      <section className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-950 border border-zinc-800 text-white space-y-4 shadow-xl">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
            <ArrowLeftRight className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Comparative Law Analysis Tool
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400">
              Side-by-side statutory breakdown across jurisdictions, legal doctrines, and procedural remedies
            </p>
          </div>
        </div>

        {/* Curated Presets Pill Selector */}
        <div className="pt-2 border-t border-zinc-800/80 space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 block">
            Featured Comparative Presets:
          </span>
          <div className="flex flex-wrap gap-2">
            {LAW_COMPARISON_PRESETS.map((preset) => {
              const isSelected =
                (preset.lawIdA === lawAId && preset.lawIdB === lawBId) ||
                (preset.lawIdA === lawBId && preset.lawIdB === lawAId);
              return (
                <button
                  key={preset.id}
                  type="button"
                  id={`preset-btn-${preset.id}`}
                  onClick={() => handleSelectPreset(preset)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                    isSelected
                      ? 'bg-amber-500 text-zinc-950 border-amber-400 shadow-md shadow-amber-500/20'
                      : 'bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 border-zinc-700'
                  }`}
                >
                  {preset.title.split(' vs. ')[0]} vs {preset.title.split(' vs. ')[1]}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Selectors Bar (Law A and Law B) */}
      <section className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-11 gap-4 items-center">
          {/* Law A Selector */}
          <div className="md:col-span-5 space-y-1.5">
            <label htmlFor="select-law-a" className="text-xs font-bold text-zinc-700 dark:text-zinc-300 block uppercase tracking-wider">
              Primary Statute (Law A)
            </label>
            <select
              id="select-law-a"
              value={lawAId}
              onChange={(e) => setLawAId(e.target.value)}
              className="w-full p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs font-semibold text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              {LAWS_DATABASE.map((law) => (
                <option key={law.id} value={law.id} disabled={law.id === lawBId}>
                  [{law.jurisdictionCode}] {law.title} ({law.enactmentYear})
                </option>
              ))}
            </select>
          </div>

          {/* Swap Button */}
          <div className="md:col-span-1 flex justify-center pt-4 md:pt-6">
            <button
              type="button"
              id="swap-comparison-laws-btn"
              onClick={handleSwapLaws}
              className="p-3 rounded-2xl bg-zinc-100 dark:bg-zinc-800 hover:bg-amber-500/10 text-zinc-700 dark:text-zinc-300 hover:text-amber-600 dark:hover:text-amber-400 border border-zinc-200 dark:border-zinc-700 transition-colors shadow-sm"
              title="Swap primary and secondary laws"
            >
              <ArrowLeftRight className="w-4 h-4" />
            </button>
          </div>

          {/* Law B Selector */}
          <div className="md:col-span-5 space-y-1.5">
            <label htmlFor="select-law-b" className="text-xs font-bold text-zinc-700 dark:text-zinc-300 block uppercase tracking-wider">
              Comparative Statute (Law B)
            </label>
            <select
              id="select-law-b"
              value={lawBId}
              onChange={(e) => setLawBId(e.target.value)}
              className="w-full p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs font-semibold text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              {LAWS_DATABASE.map((law) => (
                <option key={law.id} value={law.id} disabled={law.id === lawAId}>
                  [{law.jurisdictionCode}] {law.title} ({law.enactmentYear})
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Side-by-Side Metadata Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Law A Card */}
        <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
              Statute A • {lawA.jurisdiction}
            </span>
            <span className="text-xs font-bold text-zinc-500">
              {lawA.status}
            </span>
          </div>

          <div>
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
              {lawA.title}
            </h3>
            {lawA.titleBn && (
              <p className="text-sm font-bangla text-zinc-500">
                {lawA.titleBn}
              </p>
            )}
          </div>

          <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-1 text-xs">
            <span className="font-bold text-zinc-500 block uppercase tracking-wider text-[10px]">
              Category & Official Authority
            </span>
            <p className="font-semibold text-zinc-800 dark:text-zinc-200">
              {lawA.category} • {lawA.sourceOrganization}
            </p>
          </div>

          <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
            {lawA.simpleSummary || lawA.overview}
          </p>

          <Link
            href={`/law/${lawA.id}`}
            className="inline-flex items-center space-x-1 text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline pt-2"
          >
            <span>Open Full Law Detail</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Law B Card */}
        <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
              Statute B • {lawB.jurisdiction}
            </span>
            <span className="text-xs font-bold text-zinc-500">
              {lawB.status}
            </span>
          </div>

          <div>
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
              {lawB.title}
            </h3>
            {lawB.titleBn && (
              <p className="text-sm font-bangla text-zinc-500">
                {lawB.titleBn}
              </p>
            )}
          </div>

          <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-1 text-xs">
            <span className="font-bold text-zinc-500 block uppercase tracking-wider text-[10px]">
              Category & Official Authority
            </span>
            <p className="font-semibold text-zinc-800 dark:text-zinc-200">
              {lawB.category} • {lawB.sourceOrganization}
            </p>
          </div>

          <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
            {lawB.simpleSummary || lawB.overview}
          </p>

          <Link
            href={`/law/${lawB.id}`}
            className="inline-flex items-center space-x-1 text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline pt-2"
          >
            <span>Open Full Law Detail</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* COMPARATIVE ANALYSIS SYNTHESIS */}
      {activePreset ? (
        <section className="p-6 sm:p-8 rounded-3xl bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/20 space-y-6">
          <div>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30">
              Curated Legal Synthesis
            </span>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white mt-2">
              {activePreset.title}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed mt-1">
              {activePreset.summary}
            </p>
          </div>

          {/* Similarities & Differences */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-3">
              <span className="font-bold text-xs uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block">
                Key Doctrinal Similarities
              </span>
              <ul className="space-y-2 text-xs text-zinc-700 dark:text-zinc-300">
                {activePreset.keySimilarities.map((item, i) => (
                  <li key={i} className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-3">
              <span className="font-bold text-xs uppercase tracking-wider text-amber-600 dark:text-amber-400 block">
                Key Doctrinal Differences
              </span>
              <ul className="space-y-2 text-xs text-zinc-700 dark:text-zinc-300">
                {activePreset.keyDifferences.map((item, i) => (
                  <li key={i} className="flex items-start space-x-2">
                    <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Comparative Provision Matrix Table */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-900 dark:text-white">
              Comparative Provision Matrix
            </h3>

            <div className="overflow-x-auto rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-zinc-50 dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 text-zinc-500 font-bold uppercase tracking-wider text-[10px]">
                    <th className="p-4 w-1/4">Doctrinal Aspect</th>
                    <th className="p-4 w-3/8 text-amber-600 dark:text-amber-400">
                      {lawA.shortTitle || lawA.title}
                    </th>
                    <th className="p-4 w-3/8 text-blue-600 dark:text-blue-400">
                      {lawB.shortTitle || lawB.title}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                  {activePreset.provisionMatrix.map((row, idx) => (
                    <tr key={idx} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-950/50 transition-colors">
                      <td className="p-4 font-bold text-zinc-900 dark:text-white align-top">
                        {row.aspect}
                      </td>
                      <td className="p-4 text-zinc-700 dark:text-zinc-300 leading-relaxed align-top">
                        {row.lawAProvision}
                      </td>
                      <td className="p-4 text-zinc-700 dark:text-zinc-300 leading-relaxed align-top">
                        {row.lawBProvision}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      ) : (
        /* Dynamic Comparison Matrix for custom pairings */
        <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-6">
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-white">
              Dynamic Statutory Comparison Matrix
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Comparing structural and statutory characteristics of {lawA.title} and {lawB.title}.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-zinc-200 dark:border-zinc-800">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-zinc-50 dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 text-zinc-500 font-bold uppercase tracking-wider text-[10px]">
                  <th className="p-4 w-1/4">Attribute</th>
                  <th className="p-4 w-3/8 text-amber-600 dark:text-amber-400">{lawA.title}</th>
                  <th className="p-4 w-3/8 text-blue-600 dark:text-blue-400">{lawB.title}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                <tr>
                  <td className="p-4 font-bold text-zinc-900 dark:text-white">Jurisdiction</td>
                  <td className="p-4 text-zinc-700 dark:text-zinc-300">{lawA.jurisdiction}</td>
                  <td className="p-4 text-zinc-700 dark:text-zinc-300">{lawB.jurisdiction}</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-zinc-900 dark:text-white">Category</td>
                  <td className="p-4 text-zinc-700 dark:text-zinc-300">{lawA.category}</td>
                  <td className="p-4 text-zinc-700 dark:text-zinc-300">{lawB.category}</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-zinc-900 dark:text-white">Enactment & Effective Date</td>
                  <td className="p-4 text-zinc-700 dark:text-zinc-300">{lawA.effectiveDate || `${lawA.enactmentYear}`}</td>
                  <td className="p-4 text-zinc-700 dark:text-zinc-300">{lawB.effectiveDate || `${lawB.enactmentYear}`}</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-zinc-900 dark:text-white">Statutory Status</td>
                  <td className="p-4 text-zinc-700 dark:text-zinc-300">{lawA.status}</td>
                  <td className="p-4 text-zinc-700 dark:text-zinc-300">{lawB.status}</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-zinc-900 dark:text-white">Publishing Authority</td>
                  <td className="p-4 text-zinc-700 dark:text-zinc-300">{lawA.sourceOrganization}</td>
                  <td className="p-4 text-zinc-700 dark:text-zinc-300">{lawB.sourceOrganization}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* SECTION BY SECTION COMPARISON PREVIEW */}
      <section className="space-y-4">
        <h3 className="text-base font-bold text-zinc-900 dark:text-white">
          Side-by-Side Provision Samples
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Law A Sections */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-amber-600 dark:text-amber-400 block uppercase tracking-wider">
              {lawA.title} — Key Provisions
            </span>
            {lawA.sections.slice(0, 3).map((sec, i) => (
              <div key={i} className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-1 text-xs">
                <span className="font-bold text-amber-600 dark:text-amber-400 block uppercase text-[10px]">
                  {sec.number}: {sec.title}
                </span>
                <p className="text-zinc-700 dark:text-zinc-300 line-clamp-3 leading-relaxed">
                  {sec.content}
                </p>
              </div>
            ))}
          </div>

          {/* Law B Sections */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 block uppercase tracking-wider">
              {lawB.title} — Key Provisions
            </span>
            {lawB.sections.slice(0, 3).map((sec, i) => (
              <div key={i} className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-1 text-xs">
                <span className="font-bold text-blue-600 dark:text-blue-400 block uppercase text-[10px]">
                  {sec.number}: {sec.title}
                </span>
                <p className="text-zinc-700 dark:text-zinc-300 line-clamp-3 leading-relaxed">
                  {sec.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default function LawComparePage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-16 text-center text-zinc-500">Loading comparison tool...</div>}>
      <CompareToolContent />
    </Suspense>
  );
}
