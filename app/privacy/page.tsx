'use client';

import React from 'react';
import { ShieldCheck, Lock, EyeOff, Server, HelpCircle } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Transparency & Privacy</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-xs text-zinc-500">Effective Date: Launch Version 1.0 • Last Reviewed: 2026</p>
      </div>

      <div className="prose dark:prose-invert max-w-none text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 space-y-6 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white">1. Core Commitment: Open Access Without Tracking</h2>
          <p>
            Nyayota is founded on the principle that access to statutory legal information should be unhindered and private. At our current launch release (v1.0), <strong>no user registration or login is required</strong> to search, read, compare, or explore any statute, international treaty, or procedural guide on the platform.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white">2. Information We Do Not Collect</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>We do not require names, passwords, phone numbers, or credit cards to access legal materials.</li>
            <li>We do not maintain user tracking profiles or sell browsing telemetry to third-party advertising networks.</li>
            <li>We do not inject commercial retargeting or cross-site tracking pixels.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white">3. Local Device Storage (Client Preferences)</h2>
          <p>
            Nyayota utilizes your browser&apos;s standard local storage (<code className="px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 font-mono text-xs">localStorage</code>) strictly to preserve your visual display preferences (e.g. Dark Mode vs. Light Mode selection). This data remains entirely within your local browser and is never transmitted to external analytics servers.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white">4. AI Explainer & Search Queries</h2>
          <p>
            When you enter a legal question into our AI Explainer or search bar, the query string is processed server-side to generate educational legal summaries. Queries are not tied to personal identities or persistent user records.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white">5. Contact and Communications</h2>
          <p>
            If you voluntarily submit an inquiry through our Contact Form, the provided email address and message content are used exclusively to evaluate and respond to your statutory correction or research inquiry.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white">6. Updates to This Policy</h2>
          <p>
            As Nyayota expands in future versions to support voluntary encrypted personal research vaults and bookmarking, any associated privacy updates will be documented clearly in advance of feature deployment.
          </p>
        </section>
      </div>
    </div>
  );
}
