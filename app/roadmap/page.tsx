'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  MapPin,
  CheckCircle2,
  Clock,
  Globe,
  Sparkles,
  BookmarkCheck,
  Compass,
  ArrowRight,
  ShieldCheck,
  Scale,
  Layers,
  FileCode,
  Users
} from 'lucide-react';
import { ROADMAP_DATA } from '@/lib/legal-data';

export default function RoadmapPage() {
  const [selectedJurisdictionCategory, setSelectedJurisdictionCategory] = useState<string>('All');

  const expansionJurisdictions = [
    { country: 'United States', code: 'US', system: 'Federal & State Statutory Codes + Common Law', targetPhase: 'Phase 1' },
    { country: 'United Kingdom', code: 'UK', system: 'Acts of Parliament & Precedent Law', targetPhase: 'Phase 1' },
    { country: 'European Union', code: 'EU', system: 'Directives, Regulations & CJEU Case Law', targetPhase: 'Phase 1' },
    { country: 'Germany', code: 'DE', system: 'BGB (Civil Code) & Grundgesetz', targetPhase: 'Phase 1' },
    { country: 'France', code: 'FR', system: 'Code Civil & Constitutional Council', targetPhase: 'Phase 2' },
    { country: 'Italy', code: 'IT', system: 'Codice Civile & Italian Republic Statutes', targetPhase: 'Phase 2' },
    { country: 'Japan', code: 'JP', system: 'The Six Codes (Roppō) & Supreme Court Precedents', targetPhase: 'Phase 2' },
    { country: 'South Korea', code: 'KR', system: 'Codified Legal System & Constitutional Court', targetPhase: 'Phase 2' },
    { country: 'United Arab Emirates', code: 'AE', system: 'Federal Commercial & Civil Transaction Laws', targetPhase: 'Phase 2' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-12">
      {/* Header Banner */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-xs font-semibold">
          <MapPin className="w-3.5 h-3.5" />
          <span>Development Plan</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
          Nyayota Development Roadmap
        </h1>
        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
          An open overview of what is available today, what we are actively building right now, and what is planned next for public legal research.
        </p>
      </div>

      {/* 1. Available Now */}
      <section className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-500 font-bold flex items-center justify-center text-sm border border-emerald-500/30">
            ✓
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white">
                Available Now
              </h2>
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                ACTIVE
              </span>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Core statutory libraries, bilingual search, plain-language legal explainers, and procedural guides.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {ROADMAP_DATA.currentFeatures.map((feat, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-2.5"
            >
              <div className="flex items-center justify-between">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span className="text-[10px] text-emerald-500 font-bold">Active in Platform</span>
              </div>
              <h3 className="text-sm font-bold text-zinc-900 dark:text-white">{feat.title}</h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">{feat.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 2. In Development */}
      <section className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-500 font-bold flex items-center justify-center text-sm border border-blue-500/30">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white">
                Currently In Development
              </h2>
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-500 border border-blue-500/20">
                BEING BUILT
              </span>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Deeper comparison tools, amendment timeline logs, and automated statutory citation generators.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {ROADMAP_DATA.plannedFeatures.map((feat, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-2.5"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-500/10 text-blue-500 border border-blue-500/20">
                  {feat.releaseTarget || 'In Progress'}
                </span>
                <Clock className="w-3.5 h-3.5 text-blue-400" />
              </div>
              <h3 className="text-sm font-bold text-zinc-900 dark:text-white">{feat.title}</h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">{feat.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Planned Next */}
      <section className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-500 font-bold flex items-center justify-center text-sm border border-purple-500/30">
            <Globe className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white">
                Planned Next: International Statutes
              </h2>
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-500 border border-purple-500/20">
                UPCOMING
              </span>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Expanding coverage to national legislation from additional common law and civil law jurisdictions.
            </p>
          </div>
        </div>

        {/* Global Jurisdiction Grid */}
        <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-white">
              Upcoming International Jurisdictions
            </h3>
            <span className="text-xs text-zinc-500">Scheduled for sequential indexing</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {expansionJurisdictions.map((j, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800/80 flex items-start space-x-3"
              >
                <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-500 font-bold text-xs flex items-center justify-center shrink-0 border border-purple-500/20">
                  {j.code}
                </div>
                <div className="space-y-0.5">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold text-zinc-900 dark:text-white">{j.country}</span>
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                      {j.targetPhase}
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 line-clamp-1">{j.system}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Architecture Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-zinc-900 text-white border border-zinc-800 space-y-3 shadow-inner">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <BookmarkCheck className="w-4 h-4" />
            </div>
            <h4 className="text-base font-bold">Encrypted Research Vaults</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Personalized workspaces for legal scholars, lawyers, and students to bookmark sections, organize folders, and annotate statutory clauses.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-900 text-white border border-zinc-800 space-y-3 shadow-inner">
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center">
              <Compass className="w-4 h-4" />
            </div>
            <h4 className="text-base font-bold">World Law Navigator</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              An interactive 3D comparative globe mapping treaty ratifications, extradition agreements, and common law vs civil law statutory cross-checks.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-900 text-white border border-zinc-800 space-y-3 shadow-inner">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <h4 className="text-base font-bold">Advanced Case Precedent Matcher</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Automated cross-referencing between statutory provisions and landmark judgments from the Supreme Court of Bangladesh, Privy Council, and ICJ.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
