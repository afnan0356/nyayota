'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import {
  Layers,
  BookOpen,
  Clock,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Shield,
  HelpCircle,
  Share2,
  Award,
  Check,
  Eye,
  EyeOff
} from 'lucide-react';
import {
  KNOWLEDGE_PATHS_DATA,
  KnowledgePath,
  LAWS_DATABASE
} from '@/lib/legal-data';

function KnowledgePathsContent() {
  const [selectedPathId, setSelectedPathId] = useState<string>(KNOWLEDGE_PATHS_DATA[0].id);
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({});
  const [revealedAnswers, setRevealedAnswers] = useState<Record<string, boolean>>({});

  const activePath =
    KNOWLEDGE_PATHS_DATA.find((p) => p.id === selectedPathId) || KNOWLEDGE_PATHS_DATA[0];

  const toggleStepCompleted = (stepKey: string) => {
    setCompletedSteps((prev) => ({
      ...prev,
      [stepKey]: !prev[stepKey],
    }));
  };

  const toggleAnswer = (key: string) => {
    setRevealedAnswers((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const pathCompletedCount = activePath.milestones.filter(
    (m, idx) => completedSteps[`${activePath.id}-${idx}`]
  ).length;

  const progressPercentage = Math.round(
    (pathCompletedCount / activePath.milestones.length) * 100
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-6">
        <div className="space-y-2 max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-xs font-semibold">
            <Layers className="w-3.5 h-3.5" />
            <span>Structured Legal Curriculum</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            Curated Legal Knowledge Paths
          </h1>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Step-by-step educational journeys crafted for students, civic researchers, and advocates to master legal domains systematically.
          </p>
        </div>

        <div className="flex items-center space-x-2 shrink-0">
          <Link
            href="/concepts"
            className="px-4 py-2 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 font-bold text-xs hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors"
          >
            Concepts Encyclopedia
          </Link>
          <Link
            href="/ai-assistant"
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs flex items-center space-x-1.5 shadow-sm transition-colors"
          >
            <Sparkles className="w-4 h-4" />
            <span>AI Guided Tutor</span>
          </Link>
        </div>
      </div>

      {/* Main Grid: Path Selector + Milestone Flow */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Available Knowledge Paths (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-5 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white block">
              Available Learning Pathways
            </span>

            <div className="space-y-2">
              {KNOWLEDGE_PATHS_DATA.map((path) => {
                const isSelected = activePath.id === path.id;
                return (
                  <button
                    key={path.id}
                    type="button"
                    id={`path-btn-${path.id}`}
                    onClick={() => setSelectedPathId(path.id)}
                    className={`w-full text-left p-3.5 rounded-2xl border transition-all ${
                      isSelected
                        ? 'bg-amber-500/10 border-amber-500/60 text-zinc-900 dark:text-white shadow-xs'
                        : 'bg-zinc-50 dark:bg-zinc-950/60 border-zinc-200 dark:border-zinc-800/80 text-zinc-700 dark:text-zinc-300 hover:border-zinc-300 dark:hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                        {path.level}
                      </span>
                      <span className="text-[10px] text-zinc-400 font-mono flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{path.totalTimeEstimate}</span>
                      </span>
                    </div>

                    <h3 className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-white leading-snug">
                      {path.title}
                    </h3>
                    <p className="text-[11px] text-amber-600 dark:text-amber-400 font-bangla font-medium">
                      {path.titleBn}
                    </p>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400 line-clamp-2 mt-1">
                      {path.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Learning Tip */}
          <div className="p-5 rounded-3xl bg-zinc-900 text-white border border-zinc-800 space-y-2 text-xs">
            <span className="font-bold text-amber-400 flex items-center space-x-1">
              <Award className="w-4 h-4" />
              <span>Self-Paced Research Curriculum</span>
            </span>
            <p className="text-zinc-300 text-[11px] leading-relaxed">
              Complete each milestone by reading the statutory excerpts, checking off key learning points, and testing your comprehension with self-check questions.
            </p>
          </div>
        </div>

        {/* Right Column: Path Detail & Milestones (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-6">
            {/* Header with Progress Bar */}
            <div className="space-y-3 border-b border-zinc-100 dark:border-zinc-800 pb-6">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-xs font-bold">
                  {activePath.category} • {activePath.level}
                </span>

                <span className="text-xs font-bold text-zinc-500 flex items-center space-x-1">
                  <Clock className="w-3.5 h-3.5 text-amber-500" />
                  <span>Est. Duration: {activePath.totalTimeEstimate}</span>
                </span>
              </div>

              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-zinc-900 dark:text-white">
                  {activePath.title}
                </h2>
                <p className="text-sm font-bold text-amber-600 dark:text-amber-400 font-bangla">
                  {activePath.titleBn}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                {activePath.description}
              </p>

              {/* Progress Bar */}
              <div className="space-y-1.5 pt-2">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-zinc-500">Milestone Progress:</span>
                  <span className="text-amber-600 dark:text-amber-400">
                    {pathCompletedCount} of {activePath.milestones.length} Completed ({progressPercentage}%)
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                  <div
                    className="h-full bg-amber-500 transition-all duration-300 rounded-full"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Milestones Stepper */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Curriculum Milestones:
              </h3>

              <div className="space-y-5">
                {activePath.milestones.map((milestone, idx) => {
                  const stepKey = `${activePath.id}-${idx}`;
                  const isDone = Boolean(completedSteps[stepKey]);
                  const isAnswerVisible = Boolean(revealedAnswers[stepKey]);

                  return (
                    <div
                      key={idx}
                      className={`p-5 sm:p-6 rounded-3xl border transition-all space-y-4 ${
                        isDone
                          ? 'bg-emerald-500/5 border-emerald-500/30'
                          : 'bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start space-x-3.5">
                          <button
                            type="button"
                            onClick={() => toggleStepCompleted(stepKey)}
                            className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 transition-colors ${
                              isDone
                                ? 'bg-emerald-500 text-zinc-950 shadow-xs'
                                : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-amber-500 hover:text-zinc-950'
                            }`}
                            title={isDone ? 'Mark as incomplete' : 'Mark as completed'}
                          >
                            {isDone ? <CheckCircle2 className="w-4 h-4" /> : milestone.stepNumber}
                          </button>

                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              <span className="text-[10px] font-mono font-bold text-amber-600 dark:text-amber-400">
                                {milestone.durationMinutes} mins
                              </span>
                              <h4 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-white">
                                {milestone.title}
                              </h4>
                            </div>
                            <p className="text-xs font-bangla text-amber-600/90 dark:text-amber-400/90 font-medium">
                              {milestone.titleBn}
                            </p>
                            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed pt-1">
                              {milestone.summary}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Key Takeaways */}
                      {milestone.takeaways && milestone.takeaways.length > 0 && (
                        <div className="p-3.5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-1.5">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block">
                            Key Jurisprudential Takeaways:
                          </span>
                          <ul className="space-y-1">
                            {milestone.takeaways.map((takeaway, tIdx) => (
                              <li key={tIdx} className="text-xs text-zinc-700 dark:text-zinc-300 flex items-start space-x-2">
                                <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                                <span>{takeaway}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Linked Statutes */}
                      {milestone.keyStatutes && milestone.keyStatutes.length > 0 && (
                        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                          {milestone.keyStatutes.map((statute, sIdx) => (
                            <Link
                              key={sIdx}
                              href={`/law/${statute.lawId}${statute.section ? `?section=${encodeURIComponent(statute.section)}` : ''}`}
                              className="px-2.5 py-1 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 font-bold text-emerald-600 dark:text-emerald-400 hover:border-emerald-500 inline-flex items-center space-x-1 shadow-2xs"
                            >
                              <span>{statute.title} ({statute.section || 'All'})</span>
                              <ExternalLink className="w-3 h-3" />
                            </Link>
                          ))}

                          <Link
                            href={`/ai-assistant?query=${encodeURIComponent(`Explain milestone: ${milestone.title} in the context of ${activePath.title}`)}`}
                            className="px-2.5 py-1 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 font-semibold text-amber-600 dark:text-amber-400 hover:border-amber-500 inline-flex items-center space-x-1 shadow-2xs"
                          >
                            <Sparkles className="w-3 h-3" />
                            <span>Ask AI Tutor</span>
                          </Link>
                        </div>
                      )}

                      {/* Self-Check Question */}
                      {milestone.selfCheckQuestion && (
                        <div className="p-3.5 rounded-2xl bg-amber-500/5 border border-amber-500/20 space-y-2 text-xs">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-amber-700 dark:text-amber-400 flex items-center space-x-1.5">
                              <HelpCircle className="w-3.5 h-3.5" />
                              <span>Comprehension Check:</span>
                            </span>
                            <button
                              type="button"
                              onClick={() => toggleAnswer(stepKey)}
                              className="font-bold text-[11px] text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 flex items-center space-x-1"
                            >
                              {isAnswerVisible ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                              <span>{isAnswerVisible ? 'Hide Answer' : 'Reveal Answer'}</span>
                            </button>
                          </div>
                          <p className="text-zinc-800 dark:text-zinc-200 font-medium">
                            {milestone.selfCheckQuestion}
                          </p>
                          {isAnswerVisible && (
                            <div className="p-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-amber-500/30 text-emerald-600 dark:text-emerald-400 font-medium animate-in fade-in duration-150">
                              <strong>Answer:</strong> {milestone.selfCheckAnswer}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Path Footer */}
            <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <span className="text-zinc-500">
                Ready for deep practice? Test scenarios in the Legal Outcome Guide.
              </span>
              <Link
                href="/legal-outcome-guide"
                className="text-amber-600 dark:text-amber-400 font-bold hover:underline inline-flex items-center space-x-1"
              >
                <span>Go to Legal Outcome Guide</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function KnowledgePathsPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-20 text-center text-zinc-500 text-sm">
          Loading Knowledge Paths...
        </div>
      }
    >
      <KnowledgePathsContent />
    </Suspense>
  );
}
