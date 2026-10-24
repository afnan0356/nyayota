'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Lock, EyeOff, Server, HelpCircle, HardDrive } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Transparency and Privacy</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-xs text-zinc-500">Effective Date: Launch Version 1.0 | Last Reviewed: 2026</p>
      </div>

      <div className="prose dark:prose-invert max-w-none text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 space-y-6 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white">1. Core Commitment: Open Access Without Tracking</h2>
          <p>
            Nyayota is founded on the fundamental principle that access to statutory legal information should be unhindered, public, and private. <strong>No user registration, account creation, or login is required</strong> to search, read, compare, or explore any statute, international treaty, or procedural guide on the platform.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white">2. Zero-Cookie Architecture</h2>
          <p>
            Nyayota operates on a zero-tracking cookie architecture. We do not set marketing, third-party analytics, retargeting, or advertising cookies on your device. You can navigate the entire statutory repository without cookie consent banners because no non-essential cookies are ever deployed.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white">3. Local Device Storage Disclosures</h2>
          <p>
            To deliver responsive offline-first tools without transmitting personal data to remote servers, Nyayota utilizes standard client-side browser storage (<code className="px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 font-mono text-xs">localStorage</code>). The specific keys used are:
          </p>
          <div className="overflow-x-auto my-3">
            <table className="w-full text-xs text-left border-collapse border border-zinc-200 dark:border-zinc-800">
              <thead>
                <tr className="bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100">
                  <th className="p-2 border border-zinc-200 dark:border-zinc-800 font-mono">Storage Key</th>
                  <th className="p-2 border border-zinc-200 dark:border-zinc-800">Function</th>
                  <th className="p-2 border border-zinc-200 dark:border-zinc-800">Persistence</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2 border border-zinc-200 dark:border-zinc-800 font-mono text-amber-600 dark:text-amber-400">nyayota_theme</td>
                  <td className="p-2 border border-zinc-200 dark:border-zinc-800">Saves visual appearance preference (light or dark mode)</td>
                  <td className="p-2 border border-zinc-200 dark:border-zinc-800">Client browser only</td>
                </tr>
                <tr>
                  <td className="p-2 border border-zinc-200 dark:border-zinc-800 font-mono text-amber-600 dark:text-amber-400">nyayota_saved_bookmarks_v1</td>
                  <td className="p-2 border border-zinc-200 dark:border-zinc-800">Stores sections and articles bookmarked by the user</td>
                  <td className="p-2 border border-zinc-200 dark:border-zinc-800">Client browser only</td>
                </tr>
                <tr>
                  <td className="p-2 border border-zinc-200 dark:border-zinc-800 font-mono text-amber-600 dark:text-amber-400">nyayota_search_history</td>
                  <td className="p-2 border border-zinc-200 dark:border-zinc-800">Stores recent search terms locally for quick navigation</td>
                  <td className="p-2 border border-zinc-200 dark:border-zinc-800">Client browser only</td>
                </tr>
                <tr>
                  <td className="p-2 border border-zinc-200 dark:border-zinc-800 font-mono text-amber-600 dark:text-amber-400">nyayota_research_notes</td>
                  <td className="p-2 border border-zinc-200 dark:border-zinc-800">Preserves researcher scratchpad notes locally</td>
                  <td className="p-2 border border-zinc-200 dark:border-zinc-800">Client browser only</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-zinc-500">
            You can clear these at any time via your browser settings without affecting repository access.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white">4. AI Explainer Inquiries</h2>
          <p>
            When you submit a query to the AI Legal Knowledge Assistant, the query string and selected statutory context are transmitted server-side to generate an educational summary. Queries are evaluated through rate-limited proxies and are not linked to user accounts or tracking identifiers. Server error logs never reflect raw query text.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white">5. Direct Inquiries and Communications</h2>
          <p>
            If you contact the Nyayota team via our official email address (<span className="font-mono text-zinc-900 dark:text-zinc-100 font-semibold">nyayota.contact@gmail.com</span>), the submitted email and details are used solely to evaluate, research, and respond to your inquiry or statutory amendment notice.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white">6. Contact Data Protection Desk</h2>
          <p>
            For questions or verification regarding Nyayota privacy practices, contact us directly at{' '}
            <a href="mailto:nyayota.contact@gmail.com" className="text-amber-600 dark:text-amber-400 underline font-mono">
              nyayota.contact@gmail.com
            </a>.
          </p>
        </section>
      </div>
    </div>
  );
}
