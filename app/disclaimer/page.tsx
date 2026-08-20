'use client';

import React from 'react';
import Link from 'next/link';
import { AlertTriangle, Scale, PhoneCall, ArrowRight, ShieldAlert } from 'lucide-react';

export default function DisclaimerPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 text-xs font-semibold">
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>Legal Disclaimer</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
          Educational Legal Disclaimer
        </h1>
        <p className="text-xs text-zinc-500">Comprehensive Statement Regarding Legal Information vs. Legal Advice</p>
      </div>

      <div className="p-6 sm:p-7 rounded-3xl bg-rose-500/5 dark:bg-rose-500/10 border border-rose-500/20 text-zinc-800 dark:text-zinc-200 space-y-3">
        <h2 className="text-base sm:text-lg font-bold text-rose-700 dark:text-rose-400 flex items-center space-x-2">
          <ShieldAlert className="w-5 h-5 text-rose-500 shrink-0" />
          <span>No Attorney-Client Relationship</span>
        </h2>
        <p className="text-xs sm:text-sm leading-relaxed">
          Accessing Nyayota, using its search tools, reading statutory explanations, or interacting with our AI Legal Knowledge Explainer <strong>does NOT create an attorney-client relationship</strong> between you and Nyayota, its developers, or its contributors.
        </p>
      </div>

      <div className="prose dark:prose-invert max-w-none text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 space-y-6 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white">1. Nature of Content</h2>
          <p>
            The content on Nyayota is designed exclusively for public education, academic research, legal awareness, and civic literacy. Law is highly dynamic, subject to judicial discretion, jurisdictional nuances, factual circumstances, and recent legislative amendments. Information on this site may not reflect the most recent case law precedents or emergency government ordinances.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white">2. AI Explanations and Summaries</h2>
          <p>
            AI-generated summaries and plain language explanations are provided to simplify complex legal concepts. While configured with high accuracy standards, AI outputs may contain simplifications or interpretive nuances and should always be verified against the official government gazette or statutory source text.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white">3. Seeking Professional Legal Assistance</h2>
          <p>
            If you are currently facing criminal charges, civil disputes, labor conflicts, property litigation, or human rights violations, you should immediately consult an advocate licensed to practice in the relevant jurisdiction.
          </p>
          <div className="p-4 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2 not-prose">
            <p className="text-xs font-bold text-zinc-900 dark:text-white flex items-center space-x-1.5">
              <PhoneCall className="w-4 h-4 text-emerald-500" />
              <span>Government Legal Aid Hotlines (Bangladesh):</span>
            </p>
            <p className="text-xs text-zinc-600 dark:text-zinc-400">
              National Legal Aid Services Organization (NLASO) provides free legal assistance to eligible citizens: <strong>Toll-Free Helpline: 16430</strong>.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
