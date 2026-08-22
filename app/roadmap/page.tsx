'use client';

import React from 'react';
import Link from 'next/link';
import {
  MapPin,
  CheckCircle2,
  Clock,
  Globe,
  FileText,
  ShieldCheck,
  Scale,
  Layers,
  Search,
  BookOpen
} from 'lucide-react';

export default function RoadmapPage() {
  const currentFeatures = [
    {
      title: 'Codified Bangladesh Statutory Library',
      description: 'Comprehensive section-by-section indexing of major Bangladesh acts including Penal Code 1860, CrPC 1898, Constitution 1972, Cyber Security Act 2023, and Labour Act 2006.',
      status: 'Active'
    },
    {
      title: 'Multilateral Treaties & International Conventions',
      description: 'Full statutory indexing of foundational international frameworks including UDHR 1948, ICCPR 1966, Geneva Convention IV 1949, UNCLOS 1982, and Paris Agreement 2015.',
      status: 'Active'
    },
    {
      title: 'Bilingual Legal Definitions & Latin Maxims',
      description: 'Curated jurisprudence glossary featuring English statutory definitions, Bengali translations, and historical Latin legal maxims with doctrine context.',
      status: 'Active'
    },
    {
      title: 'Comparative Law Matrix Engine',
      description: 'Side-by-side comparative analysis of statutes, procedural remedies, bailability schedules, and constitutional safeguards across jurisdictions.',
      status: 'Active'
    },
    {
      title: 'Client-Side Research Bookmarks',
      description: 'Private in-browser bookmarking for rapid access to individual statutory sections without requiring account creation or transmitting telemetry.',
      status: 'Active'
    },
    {
      title: 'Section-Level Cross References & AI Explainer',
      description: 'Contextual related provision discovery engine calculating relevant remedies, sister sections, and plain-language summaries.',
      status: 'Active'
    }
  ];

  const inDevelopment = [
    {
      title: 'Subordinate Legislation & Gazette Rules',
      description: 'Indexing subordinate rules, statutory regulatory orders (SROs), and schedule amendments enacted under primary parent acts.',
      target: 'Q3-Q4 2026'
    },
    {
      title: 'Court Procedure Flowcharts & Timelines',
      description: 'Step-by-step statutory timelines for filing appeals, revision petitions, and limitation periods under the Limitation Act 1908.',
      target: 'Q4 2026'
    },
    {
      title: 'Standard Citation Export (OSCOLA & Bluebook)',
      description: 'One-click copyable statutory citations formatted in OSCOLA, Bluebook, and standard domestic law journal conventions.',
      target: 'Q4 2026'
    },
    {
      title: 'Enhanced Offline PWA Caching',
      description: 'Improved offline service worker caching to allow full-text offline reading of entire statutory codifications in low-connectivity areas.',
      target: 'Q1 2027'
    }
  ];

  const futurePlans = [
    {
      jurisdiction: 'United States & UK Commonwealth',
      description: 'Indexing US Federal Code title summaries and UK primary acts of parliament for comparative common law analysis.',
      phase: 'Phase 2'
    },
    {
      jurisdiction: 'South Asian Regional Frameworks',
      description: 'Comparative statutory cross-checks across SAARC jurisdictions sharing common law heritage (India, Pakistan, Sri Lanka).',
      phase: 'Phase 2'
    },
    {
      jurisdiction: 'Civil Law Jurisdictions (France & Germany)',
      description: 'Structural comparative matrices examining the French Code Civil and German BGB principles against common law doctrines.',
      phase: 'Phase 3'
    },
    {
      jurisdiction: 'Judicial Precedent Indexing',
      description: 'Connecting statutory sections with reported Supreme Court Appellate Division and High Court Division landmark ratios.',
      phase: 'Phase 3'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-12">
      {/* Header Banner */}
      <div className="space-y-3 max-w-3xl">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 text-xs font-medium">
          <MapPin className="w-3.5 h-3.5" />
          <span>Platform Roadmap &amp; Release Log</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-zinc-100 font-serif tracking-tight">
          Development Roadmap &amp; Editorial Plan
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
          An honest, transparent overview of what is currently live on Nyayota, active engineering milestones in progress, and our long-term legal repository goals.
        </p>
      </div>

      {/* 1. Current Features (Active in Platform) */}
      <section className="space-y-5">
        <div className="flex items-center space-x-3 border-b border-zinc-200 dark:border-zinc-800 pb-3">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 dark:bg-emerald-400"></span>
          <div className="flex items-center space-x-2">
            <h2 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-100 font-serif">
              Current Features (Live in Production)
            </h2>
            <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
              Active
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentFeatures.map((feat, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-2"
            >
              <div className="flex items-center justify-between">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span className="text-[10px] font-mono text-zinc-500">Verified Live</span>
              </div>
              <h3 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">{feat.title}</h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">{feat.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 2. In Development (Active Engineering) */}
      <section className="space-y-5">
        <div className="flex items-center space-x-3 border-b border-zinc-200 dark:border-zinc-800 pb-3">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
          <div className="flex items-center space-x-2">
            <h2 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-100 font-serif">
              In Active Development
            </h2>
            <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
              In Progress
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {inDevelopment.map((feat, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
                  Target: {feat.target}
                </span>
                <Clock className="w-3.5 h-3.5 text-amber-500" />
              </div>
              <h3 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">{feat.title}</h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">{feat.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Future Plans (Long-term Indexing) */}
      <section className="space-y-5">
        <div className="flex items-center space-x-3 border-b border-zinc-200 dark:border-zinc-800 pb-3">
          <span className="w-2.5 h-2.5 rounded-full bg-zinc-400 dark:bg-zinc-600"></span>
          <div className="flex items-center space-x-2">
            <h2 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-100 font-serif">
              Future Plans &amp; Jurisdiction Expansion
            </h2>
            <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">
              Future Roadmap
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {futurePlans.map((plan, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl bg-zinc-50/70 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                  {plan.phase}
                </span>
                <Globe className="w-3.5 h-3.5 text-zinc-400" />
              </div>
              <h3 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">{plan.jurisdiction}</h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">{plan.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
