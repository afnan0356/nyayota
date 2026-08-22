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
  CheckCircle2,
  HeartHandshake,
  FileCheck2,
  MessageSquareQuote,
  Mail
} from 'lucide-react';

export default function AboutPage() {
  const audiences = [
    { title: 'The General Public', description: 'Citizens navigating everyday legal challenges — from police questioning and rental disputes to consumer rights and cyber harassment.', icon: Users },
    { title: 'Students & Law Learners', description: 'Undergraduate and postgraduate students analyzing statutes, exploring Latin maxims, and preparing for Bar Council examinations.', icon: GraduationCap },
    { title: 'Researchers & Scholars', description: 'Academics comparing domestic statutory provisions against international conventions and human rights treaties.', icon: BookOpen },
    { title: 'Journalists & Fact-Checkers', description: 'Reporters verifying legal terminology, constitutional articles, and trial procedures under tight editorial deadlines.', icon: Globe },
    { title: 'Apprentice Lawyers & Paralegals', description: 'Legal practitioners quickly searching act numbers, section citations, and legislative amendments.', icon: Scale }
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
          Why We Built Nyayota
        </h1>
        <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
          An open civic legal resource making statutory law and constitutional rights understandable, searchable, and free for everyone.
        </p>
      </div>

      {/* The Problem & The Origin Story */}
      <div className="p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-6">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
          The Problem We Are Trying to Solve
        </h2>
        <div className="space-y-4 text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed">
          <p>
            In Bangladesh and across many legal systems, the law governs every single aspect of daily life — yet it is largely inaccessible to the people it governs. Statutes are often written in archaic 19th-century colonial phrasing, scattered across unindexed government gazette PDFs, or locked behind expensive proprietary software.
          </p>
          <p>
            When an ordinary person is faced with an eviction notice, an arbitrary arrest, or online harassment, finding out what the law actually says should not require days of searching or thousands of taka in consultation fees just to read a basic statutory protection.
          </p>
          <p>
            <strong>Nyayota</strong> (from the Sanskrit and Bengali concept of <em>Nyay</em> — justice, fairness, and right) was started as an independent civic technology and legal research initiative. Our goal is straightforward: take the official verbatim law, keep it completely authoritative, and place plain-language explanations, bilingual terms, and step-by-step procedural context right alongside it.
          </p>
        </div>
      </div>

      {/* Clear Distinction from Legal Advice */}
      <div className="p-6 sm:p-7 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-zinc-900 dark:text-zinc-100 space-y-3">
        <div className="flex items-center space-x-2.5 text-amber-800 dark:text-amber-400 font-bold text-base">
          <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />
          <span>What Nyayota Is — And What It Is Not</span>
        </div>
        <div className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed space-y-2">
          <p>
            <strong>Nyayota is an educational legal research platform, not a law firm.</strong> We do not provide legal representation, we do not file petitions on your behalf, and using this site does not create an advocate-client relationship.
          </p>
          <p>
            Our summaries, AI syntheses, and procedural outlines are designed to help you understand what statutes mean and what questions to ask. If you are dealing with an active court case, criminal charges, or immediate property dispute, you should always consult a registered Advocate or reach out to the National Legal Aid Services Authority (Helpline: <strong>16430</strong>).
          </p>
        </div>
      </div>

      {/* Sourcing & Verification Process */}
      <div className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
            How We Source and Verify Legal Texts
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
            Trust and accuracy are the foundation of any legal resource. Here is how our data is curated:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-500/20">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-zinc-900 dark:text-white">
              Official Government Gazettes
            </h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Every domestic statute is cross-referenced with the <em>Laws of Bangladesh</em> repository maintained by the Legislative &amp; Parliamentary Affairs Division, Ministry of Law, Justice and Parliamentary Affairs.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center border border-blue-500/20">
              <Globe className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-zinc-900 dark:text-white">
              UN &amp; Treaty Registries
            </h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              International conventions (UDHR, Geneva Conventions, UNCLOS, Paris Agreement) are verified directly against the United Nations Treaty Collection (UNTC) and ICRC databases.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center border border-amber-500/20">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-zinc-900 dark:text-white">
              Human Review &amp; Errata Policy
            </h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Plain-language summaries and AI educational breakdowns are reviewed to ensure they do not introduce false legal promises or misleading simplifications.
            </p>
          </div>
        </div>
      </div>

      {/* Who Nyayota Serves */}
      <div className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">Who Nyayota Is Built For</h2>
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

      {/* Community Contribution & Feedback */}
      <div className="p-8 rounded-3xl bg-zinc-100 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
            Found an Error or Have a Suggestion?
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Legal accuracy requires ongoing vigilance. If you notice a typo in a section number, an outdated amendment reference, or would like to request an act to be added, please let us know.
          </p>
        </div>
        <Link
          href="/contact"
          className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs sm:text-sm inline-flex items-center space-x-2 transition-colors shrink-0 shadow-sm"
        >
          <Mail className="w-4 h-4" />
          <span>Send Feedback &amp; Corrections</span>
        </Link>
      </div>
    </div>
  );
}
