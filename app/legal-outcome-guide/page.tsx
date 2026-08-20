'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  Compass,
  CheckCircle2,
  AlertTriangle,
  ShieldAlert,
  PhoneCall,
  ArrowRight,
  BookOpen,
  Scale,
  Sparkles,
  Info
} from 'lucide-react';
import { LEGAL_OUTCOME_PATHWAYS, LegalOutcomePathway } from '@/lib/legal-data';

function LegalOutcomeGuideContent() {
  const searchParams = useSearchParams();
  const topicParam = searchParams.get('topic');

  const [activePathwayId, setActivePathwayId] = useState<string>(() => {
    if (topicParam) {
      const match = LEGAL_OUTCOME_PATHWAYS.find((p) => p.id === topicParam);
      if (match) return match.id;
    }
    return LEGAL_OUTCOME_PATHWAYS[0].id;
  });

  const activePathway =
    LEGAL_OUTCOME_PATHWAYS.find((p) => p.id === activePathwayId) || LEGAL_OUTCOME_PATHWAYS[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-10">
      {/* Header Banner */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-xs font-semibold">
          <Compass className="w-3.5 h-3.5" />
          <span>Interactive Procedural Pathways</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
          The Legal Outcome Guide
        </h1>
        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
          Navigate legal workflows and understand your statutory rights step-by-step. Learn how criminal complaints are investigated, how bail is evaluated in court, and how constitutional remedies operate under the law.
        </p>
      </div>

      {/* Educational Notice */}
      <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-800 dark:text-amber-300 text-xs flex items-start space-x-3">
        <Info className="w-4 h-4 shrink-0 mt-0.5 text-amber-500" />
        <div>
          <strong>Educational Notice:</strong> These outcome guides illustrate formal statutory procedures under Bangladesh law and common law principles. They do not constitute legal advice or guarantee specific judicial outcomes. For active litigation, contact an advocate or the National Legal Aid Services (Dial 16430).
        </div>
      </div>

      {/* Main Layout: Pathway Selector Sidebar + Step Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Pathway Selector Tabs */}
        <div className="lg:col-span-4 space-y-3">
          <p className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 px-1">
            Select Legal Pathway:
          </p>
          <div className="space-y-2">
            {LEGAL_OUTCOME_PATHWAYS.map((pathway) => {
              const isSelected = pathway.id === activePathwayId;
              return (
                <button
                  key={pathway.id}
                  type="button"
                  id={`outcome-tab-${pathway.id}`}
                  onClick={() => setActivePathwayId(pathway.id)}
                  className={`w-full text-left p-4 rounded-2xl transition-all border ${
                    isSelected
                      ? 'bg-amber-500/10 dark:bg-amber-500/15 border-amber-500/50 shadow-sm text-zinc-900 dark:text-white'
                      : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-zinc-300 dark:hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                      {pathway.category}
                    </span>
                    <span className="text-[10px] text-zinc-400 font-mono">{pathway.stages.length} Stages</span>
                  </div>
                  <h3 className="text-sm font-bold leading-snug">{pathway.title}</h3>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1 line-clamp-1">
                    {pathway.titleBn}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Emergency Helplines Widget */}
          <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 text-white space-y-3 mt-6 shadow-inner">
            <div className="flex items-center space-x-2 text-xs font-bold text-amber-400">
              <PhoneCall className="w-4 h-4" />
              <span>National Support Hotlines</span>
            </div>
            <div className="space-y-2.5 text-xs">
              <div className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800/80 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-zinc-200">National Emergency</p>
                  <p className="text-[10px] text-zinc-400">Police, Ambulance, Fire</p>
                </div>
                <span className="font-mono text-base font-bold text-emerald-400">999</span>
              </div>
              <div className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800/80 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-zinc-200">Legal Aid Helpline (Govt)</p>
                  <p className="text-[10px] text-zinc-400">Free Legal Representation</p>
                </div>
                <span className="font-mono text-base font-bold text-amber-400">16430</span>
              </div>
              <div className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800/80 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-zinc-200">Cyber Crime Helpdesk</p>
                  <p className="text-[10px] text-zinc-400">DMP Cyber Division</p>
                </div>
                <span className="font-mono text-xs font-bold text-blue-400">01320-010148</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Step-by-Step Pathway Walkthrough */}
        <div className="lg:col-span-8 space-y-6">
          {/* Active Pathway Header Card */}
          <div className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                {activePathway.category}
              </span>
              <span className="text-xs text-zinc-500">
                Primary Statute: <strong>{activePathway.primaryLegislation}</strong>
              </span>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white">
                {activePathway.title}
              </h2>
              <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 font-medium mt-0.5">
                {activePathway.titleBn}
              </p>
            </div>

            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
              {activePathway.summary}
            </p>

            <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs flex items-center justify-between">
              <span className="text-zinc-500">Typical Statutory Duration:</span>
              <span className="font-semibold text-zinc-800 dark:text-zinc-200">{activePathway.estimatedTimeline}</span>
            </div>
          </div>

          {/* Step Sequence */}
          <div className="space-y-6">
            {activePathway.stages.map((stage) => (
              <div
                key={stage.stageNumber}
                className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-5 relative"
              >
                {/* Step Header */}
                <div className="flex items-start space-x-3.5">
                  <div className="w-8 h-8 rounded-xl bg-amber-500 text-zinc-950 font-bold flex items-center justify-center shrink-0 text-sm shadow-md shadow-amber-500/20">
                    {stage.stageNumber}
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white">
                      {stage.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-1 leading-relaxed">
                      {stage.description}
                    </p>
                  </div>
                </div>

                {/* Sub-blocks: Key Actions, Important Rights, Pitfalls */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  {/* Key Actions */}
                  <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800/80 space-y-2">
                    <p className="text-xs font-bold text-zinc-900 dark:text-white flex items-center space-x-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Procedural Checklist</span>
                    </p>
                    <ul className="space-y-1.5 text-xs text-zinc-600 dark:text-zinc-400">
                      {stage.keyActions.map((action, idx) => (
                        <li key={idx} className="flex items-start space-x-1.5">
                          <span className="text-emerald-500 font-bold">•</span>
                          <span>{action}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Important Rights */}
                  <div className="p-4 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/40 space-y-2">
                    <p className="text-xs font-bold text-blue-800 dark:text-blue-300 flex items-center space-x-1.5">
                      <Scale className="w-3.5 h-3.5 text-blue-500" />
                      <span>Your Enforceable Rights</span>
                    </p>
                    <ul className="space-y-1.5 text-xs text-blue-900 dark:text-blue-200">
                      {stage.importantRights.map((right, idx) => (
                        <li key={idx} className="flex items-start space-x-1.5">
                          <span className="text-blue-500 font-bold">•</span>
                          <span>{right}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Common Pitfalls Warning */}
                {stage.commonPitfalls && stage.commonPitfalls.length > 0 && (
                  <div className="p-3.5 rounded-xl bg-rose-500/5 dark:bg-rose-500/10 border border-rose-500/20 text-xs text-rose-800 dark:text-rose-300 space-y-1">
                    <span className="font-semibold flex items-center space-x-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
                      <span>Avoid Common Procedural Pitfalls:</span>
                    </span>
                    <ul className="space-y-1 pl-5 list-disc text-[11px] text-zinc-600 dark:text-zinc-400">
                      {stage.commonPitfalls.map((pitfall, idx) => (
                        <li key={idx}>{pitfall}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Direct AI Assistant Callout */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-zinc-900 dark:text-white">Have specific questions on this workflow?</h4>
              <p className="text-xs text-zinc-600 dark:text-zinc-400">
                Ask our educational AI legal assistant to break down any section or legal terminology.
              </p>
            </div>
            <Link
              href={`/ai-assistant?query=${encodeURIComponent(`Explain procedural stages for ${activePathway.title}`)}`}
              id="outcome-ask-ai-cta"
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs shrink-0 flex items-center space-x-1.5 transition-colors shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ask AI Assistant</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LegalOutcomeGuidePage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-20 text-center text-zinc-500 text-sm">
          Loading Legal Outcome Guide...
        </div>
      }
    >
      <LegalOutcomeGuideContent />
    </Suspense>
  );
}
