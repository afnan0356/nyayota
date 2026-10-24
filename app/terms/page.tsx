'use client';

import React from 'react';
import Link from 'next/link';
import { Scale, BookOpen, AlertCircle } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 text-xs font-semibold">
          <Scale className="w-3.5 h-3.5" />
          <span>Terms of Use</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
          Terms of Service
        </h1>
        <p className="text-xs text-zinc-500">Effective Date: Launch Version 1.0 | Last Reviewed: 2026</p>
      </div>

      <div className="prose dark:prose-invert max-w-none text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 space-y-6 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white">1. Acceptance of Terms</h2>
          <p>
            By accessing or using the Nyayota legal knowledge platform (&quot;Nyayota&quot;, &quot;we&quot;, &quot;our&quot;), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not access or use the platform.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white">2. Educational and Research Purpose</h2>
          <p>
            Nyayota is an open-access educational legal knowledge platform dedicated to making legislative statutes, international treaties, and judicial procedures accessible. <strong>Nyayota does not provide legal advice, legal counsel, or legal representation.</strong> Content on this platform is not intended to replace consultation with a licensed advocate or certified legal practitioner.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white">3. Public Domain Legal Texts and Attribution</h2>
          <p>
            The text of sovereign statutes, constitutions, government gazettes, and international multilateral treaties reproduced on Nyayota belong to the public legal domain. Users are free to cite, study, research, and quote statutory provisions with appropriate attribution to the underlying official gazettes and international treaty series.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white">4. Fair Use and Responsible Conduct</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>You agree not to engage in distributed denial-of-service attempts or malicious request flooding that impairs server availability for other citizens, students, and researchers.</li>
            <li>You agree not to represent Nyayota&apos;s educational explanations or AI syntheses as formal certified advocate opinions or certified court decrees.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white">5. Limitation of Liability</h2>
          <p>
            While every effort is made to maintain accurate statutory text and up-to-date amendments, Nyayota and its contributors make no express or implied warranties regarding completeness or judicial timeliness. Under no circumstances shall Nyayota be liable for legal actions, procedural defaults, or court decisions arising from reliance on platform materials.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white">6. Inquiries and Editorial Contact</h2>
          <p>
            Questions regarding terms, rights, or editorial policies should be directed to the official contact desk at{' '}
            <a href="mailto:nyayota.contact@gmail.com" className="text-amber-600 dark:text-amber-400 underline font-mono">
              nyayota.contact@gmail.com
            </a>.
          </p>
        </section>
      </div>
    </div>
  );
}
