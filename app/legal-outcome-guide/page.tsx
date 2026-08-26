'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import {
  Compass,
  Scale,
  Shield,
  Clock,
  FileCheck,
  AlertTriangle,
  PhoneCall,
  ArrowRight,
  Sparkles,
  Search,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  Info,
  ShieldAlert,
  Gavel,
  HelpCircle,
  Check,
  AlertCircle
} from 'lucide-react';
import {
  LEGAL_OUTCOME_SCENARIOS_DATA,
  LegalOutcomeScenario
} from '@/lib/legal-data';
import {
  tabContentVariants,
  TRANSITION_NORMAL,
  TRANSITION_FAST
} from '@/lib/motion';

function LegalOutcomeGuideContent() {
  const searchParams = useSearchParams();
  const scenarioParam = searchParams.get('scenario') || '';

  const [selectedScenarioId, setSelectedScenarioId] = useState<string>(
    scenarioParam || LEGAL_OUTCOME_SCENARIOS_DATA[0].id
  );
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Cyber & Digital Law', 'Commercial & Contract Law', 'Constitutional Law', 'Criminal Law'];

  const filteredScenarios = LEGAL_OUTCOME_SCENARIOS_DATA.filter((s) => {
    const matchCat = filterCategory === 'All' || s.legalArea === filterCategory;
    const matchSearch =
      !searchQuery.trim() ||
      s.topicTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.topicTitleBn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.scenarioSummary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.applicableStatutes.some((l) => l.title.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCat && matchSearch;
  });

  const activeScenario =
    LEGAL_OUTCOME_SCENARIOS_DATA.find((s) => s.id === selectedScenarioId) ||
    filteredScenarios[0] ||
    LEGAL_OUTCOME_SCENARIOS_DATA[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-6">
        <div className="space-y-2 max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-xs font-semibold">
            <Compass className="w-3.5 h-3.5" />
            <span>Interactive Legal Outcome Guide</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            Legal Outcome & Procedural Pathways
          </h1>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Explore scenario-based roadmaps, statutory remedies, required evidence checklists, and trial court classifications for everyday legal challenges.
          </p>
        </div>

        {/* Mandatory Educational Disclaimer */}
        <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-300 text-xs max-w-xs shrink-0 space-y-1">
          <div className="flex items-center space-x-1.5 font-bold">
            <ShieldAlert className="w-4 h-4 text-amber-500 shrink-0" />
            <span>Educational Guide Only</span>
          </div>
          <p className="text-[11px] text-zinc-600 dark:text-zinc-400 leading-tight">
            Not formal legal counsel. For active court cases, consult a licensed advocate or government legal aid (16430).
          </p>
        </div>
      </div>

      {/* Main Two-Column Layout: Scenario Selector + Detail Pathway */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Scenario Selector (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-5 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white">
                Select a Legal Scenario
              </span>
              <span className="text-[10px] font-mono text-zinc-400">{LEGAL_OUTCOME_SCENARIOS_DATA.length} Guides</span>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search scenario (e.g. extortion, breach, arrest)..."
                className="w-full pl-8 pr-3 py-2 text-xs bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/40 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 font-medium"
              />
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-1 pt-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setFilterCategory(cat)}
                  className={`px-2 py-0.5 rounded-lg text-[11px] font-medium transition-colors ${
                    filterCategory === cat
                      ? 'bg-amber-500 text-zinc-950 font-bold'
                      : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                  }`}
                >
                  {cat === 'All' ? 'All' : cat.replace(' Law', '')}
                </button>
              ))}
            </div>

            {/* Scenario List */}
            <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1 pt-1">
              {filteredScenarios.map((scenario) => {
                const isSelected = activeScenario.id === scenario.id;
                return (
                  <button
                    key={scenario.id}
                    type="button"
                    id={`scenario-btn-${scenario.id}`}
                    onClick={() => setSelectedScenarioId(scenario.id)}
                    className={`w-full text-left p-3 rounded-2xl border transition-all ${
                      isSelected
                        ? 'bg-amber-500/10 border-amber-500/60 text-zinc-900 dark:text-white shadow-xs'
                        : 'bg-zinc-50 dark:bg-zinc-950/60 border-zinc-200 dark:border-zinc-800/80 text-zinc-700 dark:text-zinc-300 hover:border-zinc-300 dark:hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                        {scenario.legalArea}
                      </span>
                      <span className="text-[10px] text-zinc-400">{scenario.jurisdiction}</span>
                    </div>

                    <h3 className="text-xs font-bold text-zinc-900 dark:text-white leading-snug">
                      {scenario.topicTitle}
                    </h3>
                    <p className="text-[11px] text-amber-600 dark:text-amber-400 font-bangla font-medium">
                      {scenario.topicTitleBn}
                    </p>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400 line-clamp-2 mt-1">
                      {scenario.scenarioSummary}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Helpline Card */}
          <div className="p-5 rounded-3xl bg-zinc-900 text-white border border-zinc-800 shadow-sm space-y-3">
            <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-amber-400">
              <PhoneCall className="w-4 h-4" />
              <span>National Legal Helplines</span>
            </div>
            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-between">
                <div>
                  <span className="font-bold text-white block">National Legal Aid Services</span>
                  <span className="text-[11px] text-zinc-400">Government Free Legal Counsel</span>
                </div>
                <span className="font-mono font-bold text-amber-400 text-sm">16430</span>
              </div>

              <div className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-between">
                <div>
                  <span className="font-bold text-white block">National Emergency Service</span>
                  <span className="text-[11px] text-zinc-400">Police / Fire / Ambulance</span>
                </div>
                <span className="font-mono font-bold text-amber-400 text-sm">999</span>
              </div>

              <div className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-between">
                <div>
                  <span className="font-bold text-white block">Cyber Police Helpline</span>
                  <span className="text-[11px] text-zinc-400">CID Cyber Police Center</span>
                </div>
                <span className="font-mono font-bold text-amber-400 text-xs">01320000888</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Active Scenario Deep Dive (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeScenario.id}
              variants={tabContentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-6"
            >
              {/* Top Tag & Title */}
              <div className="space-y-2 border-b border-zinc-100 dark:border-zinc-800 pb-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-xs font-bold">
                    {activeScenario.legalArea} • {activeScenario.jurisdiction}
                  </span>

                  <Link
                    href={`/ai-assistant?query=${encodeURIComponent(`Explain procedural rights and statutory remedies for the scenario: ${activeScenario.topicTitle}`)}`}
                    className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs inline-flex items-center space-x-1.5 shadow-sm transition-colors"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Ask AI About This Scenario</span>
                  </Link>
                </div>

                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-zinc-900 dark:text-white">
                    {activeScenario.topicTitle}
                  </h2>
                  <p className="text-sm font-bold text-amber-600 dark:text-amber-400 font-bangla">
                    {activeScenario.topicTitleBn}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  {activeScenario.scenarioSummary}
                </p>
              </div>

              {/* Procedural Classification Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                <div className="p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-0.5">
                  <span className="text-[10px] font-bold uppercase text-zinc-400 block">Cognizability:</span>
                  <span className="font-semibold text-zinc-800 dark:text-zinc-200 text-[11px] leading-tight block">
                    {activeScenario.proceduralClassification.cognizableStatus}
                  </span>
                </div>

                <div className="p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-0.5">
                  <span className="text-[10px] font-bold uppercase text-zinc-400 block">Bail Category:</span>
                  <span className="font-semibold text-amber-600 dark:text-amber-400 text-[11px] leading-tight block">
                    {activeScenario.proceduralClassification.bailStatus}
                  </span>
                </div>

                <div className="p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-0.5">
                  <span className="text-[10px] font-bold uppercase text-zinc-400 block">Trial Court:</span>
                  <span className="font-semibold text-zinc-800 dark:text-zinc-200 text-[11px] leading-tight block">
                    {activeScenario.proceduralClassification.trialCourt}
                  </span>
                </div>

                <div className="p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-0.5">
                  <span className="text-[10px] font-bold uppercase text-zinc-400 block">Filing Mode:</span>
                  <span className="font-semibold text-zinc-800 dark:text-zinc-200 text-[11px] leading-tight block">
                    {activeScenario.proceduralClassification.filingMechanism}
                  </span>
                </div>
              </div>

              {/* Applicable Statutes & Sections */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 flex items-center space-x-2">
                  <Scale className="w-4 h-4 text-amber-500" />
                  <span>Applicable Codified Statutes & Sections</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeScenario.applicableStatutes.map((statute, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-zinc-900 dark:text-white">
                          {statute.title}
                        </span>
                        <Link
                          href={`/law/${statute.lawId}`}
                          className="text-[11px] font-bold text-amber-600 dark:text-amber-400 hover:underline inline-flex items-center space-x-0.5"
                        >
                          <span>View</span>
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                      </div>
                      <span className="px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-700 dark:text-amber-300 text-[10px] font-mono font-bold inline-block">
                        {statute.section}
                      </span>
                      <p className="text-[11px] text-zinc-600 dark:text-zinc-400 leading-relaxed">
                        {statute.explanation}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Procedural Step-by-Step Roadmap */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 flex items-center space-x-2">
                  <Compass className="w-4 h-4 text-emerald-500" />
                  <span>Step-by-Step Practical Rights & Procedures</span>
                </h3>

                <div className="space-y-3">
                  {activeScenario.proceduralSteps.map((step, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 flex items-start space-x-3.5"
                    >
                      <div className="w-6 h-6 rounded-full bg-emerald-500 text-zinc-950 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {step.step}
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-white">
                          {step.title}
                        </h4>
                        <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Evidence Checklist + Consequences Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Evidence Checklist */}
                <div className="p-4 sm:p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white flex items-center space-x-2">
                    <FileCheck className="w-4 h-4 text-amber-500" />
                    <span>Evidence Preservation Checklist</span>
                  </h4>
                  <ul className="space-y-2">
                    {activeScenario.evidentiaryRequirements.map((ev, idx) => (
                      <li key={idx} className="flex items-start space-x-2 text-xs text-zinc-700 dark:text-zinc-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                        <span>{ev}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Statutory Consequences & Remedies */}
                <div className="p-4 sm:p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white flex items-center space-x-2">
                    <Gavel className="w-4 h-4 text-purple-500" />
                    <span>Consequences & Remedies</span>
                  </h4>

                  <div className="space-y-2 text-xs">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block">
                        Potential Penalties:
                      </span>
                      <ul className="space-y-1 pt-1">
                        {activeScenario.statutoryConsequences.potentialPenalties.map((pen, pIdx) => (
                          <li key={pIdx} className="text-xs text-rose-700 dark:text-rose-400 font-medium">
                            • {pen}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block">
                        Civil Remedies / Restitution:
                      </span>
                      <ul className="space-y-1 pt-1">
                        {activeScenario.statutoryConsequences.civilRemedies.map((rem, rIdx) => (
                          <li key={rIdx} className="text-xs text-emerald-700 dark:text-emerald-400 font-medium">
                            • {rem}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Aggravating & Mitigating Factors */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-rose-500/5 border border-rose-500/20 space-y-2 text-xs">
                  <span className="font-bold text-rose-700 dark:text-rose-400 flex items-center space-x-1.5">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Aggravating Factors (Harsher Sentence):</span>
                  </span>
                  <ul className="space-y-1">
                    {activeScenario.outcomeFactors.aggravating.map((agg, idx) => (
                      <li key={idx} className="text-zinc-700 dark:text-zinc-300">
                        • {agg}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 space-y-2 text-xs">
                  <span className="font-bold text-emerald-700 dark:text-emerald-400 flex items-center space-x-1.5">
                    <Check className="w-3.5 h-3.5" />
                    <span>Mitigating Factors (Leniency / Relief):</span>
                  </span>
                  <ul className="space-y-1">
                    {activeScenario.outcomeFactors.mitigating.map((mit, idx) => (
                      <li key={idx} className="text-zinc-700 dark:text-zinc-300">
                        • {mit}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom Official Legal Aid Link Banner */}
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                <div className="space-y-0.5">
                  <span className="font-bold text-zinc-900 dark:text-white block">
                    Need official state legal aid assistance for this matter?
                  </span>
                  <span className="text-zinc-600 dark:text-zinc-400 text-[11px]">
                    Eligible citizens can receive free government advocates via the National Legal Aid Services Organization (NLASO).
                  </span>
                </div>

                <div className="flex items-center space-x-2 shrink-0">
                  <span className="px-3 py-1.5 rounded-xl bg-amber-500 text-zinc-950 font-bold text-xs flex items-center space-x-1">
                    <PhoneCall className="w-3 h-3" />
                    <span>Call 16430</span>
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
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
