'use client';

import React from 'react';
import Link from 'next/link';
import {
  Scale,
  ShieldCheck,
  BookOpen,
  Globe,
  GraduationCap,
  Users,
  Building2,
  AlertTriangle,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

export default function AboutPage() {
  const audiences = [
    { title: 'The General Public', description: 'Citizens seeking to understand their statutory rights, consumer protections, and court procedural stages.', icon: Users },
    { title: 'Students & Law Learners', description: 'Undergraduate and postgraduate students analyzing legal texts, Latin maxims, and statutory structures.', icon: GraduationCap },
    { title: 'Researchers & Academics', description: 'Scholars conducting comparative legal research between domestic legislation and international treaties.', icon: BookOpen },
    { title: 'Journalists & Media', description: 'Reporters verifying legal terminology, constitutional articles, and criminal trial procedures accurately.', icon: Globe },
    { title: 'Legal Professionals', description: 'Advocates, apprentices, and paralegals quickly searching act numbers, section citations, and legislative amendments.', icon: Scale }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="space-y-4 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-xs font-semibold">
          <Scale className="w-3.5 h-3.5" />
          <span>About Nyayota</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
          Democratizing Legal Knowledge and Research
        </h1>
        <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
          Nyayota is a free, open-access legal research and knowledge platform built to make codified statutes, international treaties, and judicial procedures understandable to all.
        </p>
      </div>

      {/* Core Non-Advisory Notice */}
      <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-zinc-900 dark:text-zinc-100 space-y-2">
        <div className="flex items-center space-x-2 text-amber-700 dark:text-amber-400 font-bold text-sm">
          <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />
          <span>Educational Mandate & Distinction from Legal Advice</span>
        </div>
        <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
          <strong>Nyayota is not a law firm and does not provide legal advice or legal representation.</strong> All content, statutory interpretations, translations, and AI summaries provided on this platform are for academic, informational, and civic educational purposes only. If you require legal counsel or are party to an active dispute, you should consult a licensed advocate or contact a government-sponsored legal aid authority.
        </p>
      </div>

      {/* Mission & Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-7 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-3">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            <span>Our Mission</span>
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            To eliminate the barrier of archaic legal jargon by making statutory laws searchable, multilingual, understandable, and free of cost. We believe that knowledge of the law is a fundamental prerequisite for justice, civic empowerment, and the rule of law.
          </p>
        </div>

        <div className="p-7 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-3">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            <span>Our Vision</span>
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            To build a comprehensive global legal knowledge infrastructure where any person, anywhere in the world, can explore and compare legal systems across international borders with instant linguistic clarity, historical context, and citation precision.
          </p>
        </div>
      </div>

      {/* Who Nyayota Serves */}
      <div className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">Who Nyayota Serves</h2>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
            Tailored for diverse audiences seeking verified statutory clarity.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {audiences.map((aud, idx) => {
            const Icon = aud.icon;
            return (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-2.5"
              >
                <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                  <Icon className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-zinc-900 dark:text-white">{aud.title}</h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">{aud.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Platform Values */}
      <div className="p-8 rounded-3xl bg-zinc-100 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 space-y-6">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-white">Our Core Principles</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300">
          <div className="flex items-start space-x-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
            <div>
              <strong className="text-zinc-900 dark:text-white block">No Paywalls, No Subscriptions</strong>
              Public legal texts should remain completely open to every citizen without commercial gates.
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
            <div>
              <strong className="text-zinc-900 dark:text-white block">Uncompromising Accuracy</strong>
              Directly grounded in official government gazettes, act registries, and UN treaty documents.
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
            <div>
              <strong className="text-zinc-900 dark:text-white block">Bilingual Accessibility</strong>
              Bridging English legislative frameworks with native Bengali terminology for domestic inclusivity.
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
            <div>
              <strong className="text-zinc-900 dark:text-white block">Zero Tracking, Privacy First</strong>
              Researchers and citizens can read and search without personal profile tracking or commercial cookies.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
