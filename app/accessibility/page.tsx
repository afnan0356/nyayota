'use client';

import React from 'react';
import Link from 'next/link';
import { Eye, Keyboard, Sparkles, CheckCircle2, MessageSquare } from 'lucide-react';

export default function AccessibilityPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-semibold">
          <Eye className="w-3.5 h-3.5" />
          <span>Accessibility Statement</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
          Accessibility at Nyayota
        </h1>
        <p className="text-xs text-zinc-500">Commitment to Inclusive Access to Legal Information</p>
      </div>

      <div className="prose dark:prose-invert max-w-none text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 space-y-6 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white">1. Our Accessibility Standard</h2>
          <p>
            Nyayota is committed to providing a digital platform accessible to the widest possible audience, regardless of ability, device, or visual impairment. We actively design in accordance with the <strong>Web Content Accessibility Guidelines (WCAG) 2.1 Level AA</strong>.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white">2. Implemented Accessibility Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose">
            <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-1.5">
              <div className="flex items-center space-x-2 text-xs font-bold text-zinc-900 dark:text-white">
                <Keyboard className="w-4 h-4 text-amber-500" />
                <span>Full Keyboard Navigation</span>
              </div>
              <p className="text-xs text-zinc-600 dark:text-zinc-400">
                Global search triggers via <code className="px-1 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 font-mono text-[11px]">Cmd/Ctrl + K</code>. All interactive tabs, buttons, and law cards are fully navigable via standard Tab/Enter sequences.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-1.5">
              <div className="flex items-center space-x-2 text-xs font-bold text-zinc-900 dark:text-white">
                <Eye className="w-4 h-4 text-emerald-500" />
                <span>High-Contrast Color Modes</span>
              </div>
              <p className="text-xs text-zinc-600 dark:text-zinc-400">
                Optimized light and dark themes strictly calibrated to meet WCAG AA contrast ratios (4.5:1 for body text, 3:1 for large display titles).
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-2">
          <h2 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white">3. Responsive Typography & Zoom</h2>
          <p>
            The interface supports standard browser zoom up to 200% without loss of functionality or horizontal scroll overflow. Body typography uses clean mathematical line spacing (1.6) for sustained reading comfort.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white">4. Feedback & Continuous Improvement</h2>
          <p>
            We continually test our platform across screen readers and keyboard setups. If you experience an accessibility barrier or have suggestions for improvement, please let us know via our{' '}
            <Link href="/contact" className="text-amber-600 dark:text-amber-400 underline font-medium">
              Contact Page
            </Link>.
          </p>
        </section>
      </div>
    </div>
  );
}
