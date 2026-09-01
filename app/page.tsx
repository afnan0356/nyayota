'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import {
  Scale,
  Globe,
  Search,
  Sparkles,
  BookOpen,
  ArrowRight,
  Shield,
  Compass,
  FileText,
  CheckCircle2,
  HelpCircle,
  Layers,
  ArrowUpRight,
  BookmarkCheck,
  AlertCircle,
  Users,
  Leaf,
  ShieldAlert,
  Clock,
  PhoneCall,
  Flame,
  Zap,
  Tag
} from 'lucide-react';
import { GlobalSearch } from '@/components/GlobalSearch';
import {
  LAWS_DATABASE,
  GLOSSARY_TERMS,
  LEGAL_CATEGORIES_DATA,
  LEGAL_OUTCOME_PATHWAYS,
  ROADMAP_DATA,
  LawItem
} from '@/lib/legal-data';
import {
  fadeUpVariants,
  staggerContainerVariants,
  staggerItemVariants,
  tabContentVariants,
  TRANSITION_NORMAL,
  TRANSITION_GENTLE,
  cardHoverProps
} from '@/lib/motion';

export default function HomePage() {
  const router = useRouter();

  // Tab state for Featured / Recent laws
  const [activeLawTab, setActiveLawTab] = useState<'featured' | 'recently_added' | 'recently_updated'>('featured');

  // Interactive sample AI queries state for the AI Assistant Showcase
  const sampleAIQuestions = [
    {
      id: 'arrest-rights',
      question: 'What are my constitutional rights if arrested in Bangladesh?',
      questionBn: 'গ্রেপ্তার হলে সাংবিধানিক অধিকারগুলো কী কী?',
      shortAnswer: 'Under Article 33 of the Bangladesh Constitution & CrPC Section 61, you must be informed of the grounds of arrest immediately, allowed to consult an advocate of your choice, and MUST be produced before the nearest Judicial Magistrate within 24 hours of arrest (excluding travel time). Confessions made to police in custody are legally inadmissible under Evidence Act Section 25.',
      lawRef: 'Constitution of Bangladesh (Art. 33) & CrPC 1898 (Sec. 61)',
      targetUrl: '/legal-outcome-guide?topic=arrest-and-bail-rights'
    },
    {
      id: 'mens-rea',
      question: 'Explain the legal principle of "Mens Rea" in simple terms.',
      questionBn: 'সহজ ভাষায় "Mens Rea" বা অপরাধমূলক মানসিকতা কী?',
      shortAnswer: 'Mens Rea (Latin for "guilty mind") is the mental intent or knowledge required to commit a crime. For almost all criminal offenses (such as murder under Penal Code Section 300), the prosecution must prove both the physical wrongful act (Actus Reus) AND that the accused had intentional or reckless mental culpability (Mens Rea).',
      lawRef: 'Penal Code 1860 & Criminal Jurisprudence',
      targetUrl: '/ai-assistant?term=Mens+Rea'
    },
    {
      id: 'fir-vs-gd',
      question: 'What is the practical difference between an FIR and a General Diary (GD)?',
      questionBn: 'এজাহার (FIR) এবং সাধারণ ডায়েরি (GD)-র মধ্যে পার্থক্য কী?',
      shortAnswer: 'An FIR (First Information Report) is lodged under CrPC Section 154 for serious "Cognizable" crimes (e.g. theft, physical assault, cyber extortion) and compels police to immediately initiate a formal criminal investigation. A General Diary (GD) under Section 155 records non-cognizable incidents, lost official documents, or safety apprehension threats.',
      lawRef: 'Code of Criminal Procedure 1898 (Sec. 154 & 155)',
      targetUrl: '/legal-outcome-guide?topic=fir-police-investigation'
    },
    {
      id: 'article-102-writs',
      question: 'What is Article 102 High Court Writ jurisdiction?',
      questionBn: 'সংবিধানের ১০২ অনুচ্ছেদের রিট এখতিয়ার কী?',
      shortAnswer: 'Article 102 empowers the High Court Division to issue constitutional remedies (Writs of Habeas Corpus, Mandamus, Certiorari, Prohibition, and Quo Warranto) to enforce Fundamental Rights and declare unlawful government actions void whenever an aggrieved citizen or public interest litigant petitions the court.',
      lawRef: 'Constitution of Bangladesh, 1972 (Article 102)',
      targetUrl: '/law/bd-constitution-1972?section=Article+102'
    }
  ];

  const [selectedAIQuestion, setSelectedAIQuestion] = useState(sampleAIQuestions[0]);

  // Featured laws collection
  const featuredLaws = LAWS_DATABASE.slice(0, 6);

  // Recently updated statutes list
  const recentlyUpdatedLaws = [
    {
      id: 'bd-cyber-security-2023',
      title: 'Cyber Security Act, 2023',
      titleBn: 'সাইবার নিরাপত্তা আইন, ২০২৩',
      jurisdiction: 'Bangladesh',
      updateYear: '2023',
      updateNote: 'Enacted to replace Digital Security Act 2018; converted several non-bailable speech offenses into bailable and fine-based sanctions.',
      url: '/law/bd-cyber-security-2023'
    },
    {
      id: 'bd-penal-code-1860',
      title: 'The Penal Code, 1860',
      titleBn: 'দণ্ডবিধি, ১৮৬০',
      jurisdiction: 'Bangladesh',
      updateYear: '2023',
      updateNote: 'Parliamentary rationalization of archaic monetary fines and penalties across economic sections.',
      url: '/law/bd-penal-code-1860'
    },
    {
      id: 'int-paris-agreement-2015',
      title: 'Paris Agreement on Climate Change',
      titleBn: 'প্যারিস জলবায়ু চুক্তি',
      jurisdiction: 'International',
      updateYear: '2023',
      updateNote: 'First Global Stocktake concluded at COP28 setting updated Nationally Determined Contribution (NDC) frameworks.',
      url: '/law/int-paris-agreement-2015'
    },
    {
      id: 'bd-muslim-family-laws-1961',
      title: 'Muslim Family Laws Ordinance, 1961',
      titleBn: 'মুসলিম পারিবারিক আইন অধ্যাদেশ',
      jurisdiction: 'Bangladesh',
      updateYear: '2019',
      updateNote: 'Enhanced criminal fine penalties for unregistered polygamy and accelerated family court arbitration.',
      url: '/law/bd-muslim-family-laws-1961'
    }
  ];

  // Recently added statutes list
  const recentlyAddedLaws = [
    {
      id: 'bd-cpc-1908',
      title: 'The Code of Civil Procedure, 1908',
      titleBn: 'দেওয়ানি কার্যবিধি, ১৯০৮',
      jurisdiction: 'Bangladesh',
      category: 'Civil Procedure',
      url: '/law/bd-cpc-1908'
    },
    {
      id: 'bd-environment-act-1995',
      title: 'Bangladesh Environment Conservation Act, 1995',
      titleBn: 'বাংলাদেশ পরিবেশ সংরক্ষণ আইন, ১৯৯৫',
      jurisdiction: 'Bangladesh',
      category: 'Environmental Law',
      url: '/law/bd-environment-act-1995'
    },
    {
      id: 'int-cisg-1980',
      title: 'UN Convention on Contracts for the International Sale of Goods (CISG)',
      titleBn: 'আন্তর্জাতিক পণ্য বিক্রয় চুক্তি সংক্রান্ত জাতিসংঘ কনভেনশন',
      jurisdiction: 'International',
      category: 'Commercial & Contract',
      url: '/law/int-cisg-1980'
    },
    {
      id: 'int-geneva-1949',
      title: 'The Geneva Conventions of 1949',
      titleBn: 'জেনেভা কনভেনশন (১৯৪৯)',
      jurisdiction: 'International',
      category: 'International Humanitarian',
      url: '/law/int-geneva-1949'
    }
  ];

  const popularTopics = [
    { label: 'Penal Code Section 300 (Murder)', href: '/law/bd-penal-code-1860?section=Section+300' },
    { label: 'Arrest & 24-Hour Rule (Art. 33)', href: '/legal-outcome-guide?topic=arrest-and-bail-rights' },
    { label: 'Universal Declaration of Human Rights', href: '/law/int-udhr-1948' },
    { label: 'Writ Petitions (Art. 102)', href: '/law/bd-constitution-1972?section=Article+102' },
    { label: 'Filing an FIR vs GD', href: '/legal-outcome-guide?topic=fir-police-investigation' },
    { label: 'Meaning of Mens Rea', href: '/ai-assistant?term=Mens+Rea' },
    { label: 'Temporary Injunction (Order 39)', href: '/law/bd-cpc-1908?section=Section+9' },
    { label: 'Talaq Notice & Maintenance', href: '/law/bd-muslim-family-laws-1961?section=Section+7' }
  ];

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Shield': return Shield;
      case 'Scale': return Scale;
      case 'Globe': return Globe;
      case 'Sparkles': return Sparkles;
      case 'Layers': return Layers;
      case 'Compass': return Compass;
      case 'FileText': return FileText;
      case 'Users': return Users;
      case 'Leaf': return Leaf;
      case 'ShieldAlert': return ShieldAlert;
      default: return Scale;
    }
  };

  return (
    <div className="w-full flex flex-col space-y-16 sm:space-y-20 pb-24">
      {/* ========================================================================= */}
      {/* SECTION 1 — Hero Area: Institutional Search Gateway                        */}
      {/* ========================================================================= */}
      <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 border-b border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-950">
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-7"
        >
          {/* Institutional Badge */}
          <motion.div variants={staggerItemVariants} className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400" />
            <span className="font-serif italic">Nyayota Legal Knowledge Repository</span>
            <span className="text-zinc-300 dark:text-zinc-700">•</span>
            <span className="text-zinc-500 font-normal">Open Public Access</span>
          </motion.div>

          {/* Editorial Headline & Mission */}
          <motion.div variants={staggerItemVariants} className="space-y-3.5 max-w-3xl mx-auto">
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 font-serif leading-[1.18]">
              Search, Learn, and Understand Law
            </h1>
            <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              Explore official statutory codifications, international treaties, and plain-language judicial guides across jurisdictions.
            </p>
          </motion.div>

          {/* Centralized Search Desk */}
          <motion.div variants={staggerItemVariants} className="max-w-2xl mx-auto pt-2">
            <div className="bg-white dark:bg-zinc-900 p-2 rounded-xl shadow-sm border border-zinc-300 dark:border-zinc-700/80 transition-all">
              <GlobalSearch isModal={false} />
            </div>

            {/* Statutory Quick Links */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
              <span className="font-medium text-zinc-700 dark:text-zinc-300 mr-1 text-[11px] uppercase tracking-wider font-mono">
                Curated References:
              </span>
              {popularTopics.map((t, idx) => (
                <Link
                  key={idx}
                  href={t.href}
                  id={`home-trending-${idx}`}
                  className="px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white transition-colors border border-zinc-200/80 dark:border-zinc-800 text-[11px]"
                >
                  {t.label}
                </Link>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2 — Real-World Situations & Immediate Guidance                    */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="mb-6 border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 font-mono">
            Practical Legal Pathways
          </p>
          <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100 font-serif mt-1">
            Statutory Guidance for Real-World Scenarios
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-0.5">
            Structured statutory explanations, constitutional protections, and procedural rights for citizens, students, and practitioners.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Situation 1 */}
          <div className="p-5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/90 shadow-xs flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-rose-700 dark:text-rose-400 px-2 py-0.5 rounded bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 inline-block">
                Constitutional Safeguard
              </span>
              <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                Arrest &amp; Police Custody
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Mandatory 24-hour court production, right to consult an advocate, and statutory remand protections under criminal procedure.
              </p>
              <div className="pt-1 text-[11px] text-zinc-500 space-y-0.5 font-mono">
                <div>• Art. 33 (Constitution)</div>
                <div>• CrPC Sec. 54 &amp; 167 (Remand)</div>
              </div>
            </div>
            <Link
              href="/legal-outcome-guide?topic=arrest-and-bail-rights"
              className="pt-2.5 border-t border-zinc-100 dark:border-zinc-800 text-xs font-semibold text-zinc-900 dark:text-zinc-100 hover:text-amber-600 dark:hover:text-amber-400 transition-colors flex items-center justify-between"
            >
              <span>View Statutory Steps</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Situation 2 */}
          <div className="p-5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/90 shadow-xs flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400 px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/50 inline-block">
                Digital Security
              </span>
              <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                Cyber Harassment &amp; Threats
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Statutory protections against online extortion, non-consensual image distribution, identity fraud, and reporting helplines.
              </p>
              <div className="pt-1 text-[11px] text-zinc-500 space-y-0.5 font-mono">
                <div>• Cyber Security Act 2023</div>
                <div>• Helpline: 01320-010148</div>
              </div>
            </div>
            <Link
              href="/law/bd-cyber-security-2023"
              className="pt-2.5 border-t border-zinc-100 dark:border-zinc-800 text-xs font-semibold text-zinc-900 dark:text-zinc-100 hover:text-amber-600 dark:hover:text-amber-400 transition-colors flex items-center justify-between"
            >
              <span>Review Cyber Provisions</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Situation 3 */}
          <div className="p-5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/90 shadow-xs flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 inline-block">
                Property &amp; Civil Law
              </span>
              <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                Eviction &amp; Land Disputes
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Notice requirements, temporary civil injunction standards, and lawful possession remedies under the Code of Civil Procedure.
              </p>
              <div className="pt-1 text-[11px] text-zinc-500 space-y-0.5 font-mono">
                <div>• CPC 1908 (Order 39)</div>
                <div>• Sec. 9 Civil Jurisdiction</div>
              </div>
            </div>
            <Link
              href="/law/bd-cpc-1908"
              className="pt-2.5 border-t border-zinc-100 dark:border-zinc-800 text-xs font-semibold text-zinc-900 dark:text-zinc-100 hover:text-amber-600 dark:hover:text-amber-400 transition-colors flex items-center justify-between"
            >
              <span>Explore Civil Remedies</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Situation 4 */}
          <div className="p-5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/90 shadow-xs flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 inline-block">
                Academic Research
              </span>
              <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                Legal Education &amp; Bar Prep
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Structured learning paths, Latin jurisprudence maxims, standard citations, and comparative statutory frameworks.
              </p>
              <div className="pt-1 text-[11px] text-zinc-500 space-y-0.5 font-mono">
                <div>• Doctrines &amp; Maxims</div>
                <div>• Standard Bluebook Format</div>
              </div>
            </div>
            <Link
              href="/knowledge-paths"
              className="pt-2.5 border-t border-zinc-100 dark:border-zinc-800 text-xs font-semibold text-zinc-900 dark:text-zinc-100 hover:text-amber-600 dark:hover:text-amber-400 transition-colors flex items-center justify-between"
            >
              <span>View Learning Modules</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3 — Quick Access Gateways                                         */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="mb-6">
          <p className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
            Legal Resources
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mt-1">
            Where would you like to start?
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Browse codified statutory libraries, step-by-step procedural guides, and interactive AI assistance.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Bangladesh Laws Library */}
          <Link
            href="/bangladesh-laws"
            id="quick-card-bangladesh-laws"
            className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-emerald-500/50 hover:shadow-lg transition-all group flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-500/20 group-hover:scale-105 transition-transform">
                <Scale className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  National Statutes
                </span>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white mt-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  Bangladesh Laws
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">বাংলাদেশ আইন ভাণ্ডার</p>
              </div>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Acts of Parliament, The Constitution 1972, Penal Code 1860, CrPC, Cyber Security Act 2023, and Labour standards with bilingual English and Bangla texts.
              </p>
            </div>
            <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs font-bold text-emerald-600 dark:text-emerald-400">
              <span>Browse {LAWS_DATABASE.filter((l) => l.jurisdiction === 'Bangladesh').length} Codified Acts</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 2: International Laws Library */}
          <Link
            href="/international-laws"
            id="quick-card-international-laws"
            className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-blue-500/50 hover:shadow-lg transition-all group flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center border border-blue-500/20 group-hover:scale-105 transition-transform">
                <Globe className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400">
                  Global Treaties
                </span>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white mt-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  International Laws
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">আন্তর্জাতিক আইন ও চুক্তি</p>
              </div>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Multilateral conventions, Universal Declaration of Human Rights (UDHR), Geneva Conventions, UNCLOS maritime law, and Paris Climate Agreement.
              </p>
            </div>
            <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs font-bold text-blue-600 dark:text-blue-400">
              <span>Browse {LAWS_DATABASE.filter((l) => l.jurisdiction === 'International').length} Global Treaties</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 3: Legal Outcome Guide */}
          <Link
            href="/legal-outcome-guide"
            id="quick-card-outcome-guide"
            className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-amber-500/50 hover:shadow-lg transition-all group flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center border border-amber-500/20 group-hover:scale-105 transition-transform">
                <Compass className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400">
                  Step-by-Step Pathways
                </span>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white mt-2 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                  Legal Outcome Guide
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">আইনি প্রক্রিয়া ও প্রতিকার নির্দেশিকা</p>
              </div>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Educational procedural frameworks explaining FIR filing, arrest safeguards, 24-hour court production, bail hearings, and Article 102 Writs.
              </p>
            </div>
            <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs font-bold text-amber-600 dark:text-amber-400">
              <span>View Procedural Steps</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 4: AI Legal Assistant */}
          <Link
            href="/ai-assistant"
            id="quick-card-ai-assistant"
            className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-purple-500/50 hover:shadow-lg transition-all group flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center border border-purple-500/20 group-hover:scale-105 transition-transform">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-purple-500/10 text-purple-600 dark:text-purple-400">
                  AI Knowledge Engine
                </span>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white mt-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  AI Legal Assistant
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">এআই আইনি ব্যাখ্যা ও গবেষণা</p>
              </div>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Interactive legal query assistant, plain-language section summarizer, Latin maxim dictionary, and Bluebook / Academic citation generator.
              </p>
            </div>
            <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs font-bold text-purple-600 dark:text-purple-400">
              <span>Ask Legal Questions</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3 — Legal Categories Grid (10 Core Categories)                    */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-2">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Subject Discovery
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mt-1">
              Browse by Legal Category
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              Explore 10 curated legal domains covering statutory codes, procedural rules, and international norms.
            </p>
          </div>
          <Link
            href="/search"
            className="text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline flex items-center space-x-1"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {LEGAL_CATEGORIES_DATA.map((cat) => {
            const Icon = getCategoryIcon(cat.iconName);
            return (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                id={`home-category-card-${cat.slug}`}
                className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-amber-500/50 hover:shadow-md transition-all group flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-amber-600 dark:text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400">
                      {cat.primaryJurisdiction}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-zinc-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                      {cat.title}
                    </h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">{cat.titleBn}</p>
                  </div>

                  <p className="text-[11px] text-zinc-600 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="pt-2.5 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-[11px]">
                  <span className="text-zinc-500 font-medium truncate max-w-[120px]">{cat.countLabel}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-amber-600 dark:group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 4 — Featured and Recent Laws                                      */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-8 gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Statutory Repository
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mt-1">
              Featured & Recent Legislation
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              Authoritative legislative texts, amendment histories, and simple language explanations.
            </p>
          </div>

          {/* Interactive Filter Tabs */}
          <div className="flex items-center p-1 rounded-xl bg-zinc-200/80 dark:bg-zinc-800/80 border border-zinc-300/40 dark:border-zinc-700 text-xs">
            <button
              type="button"
              id="home-tab-featured"
              onClick={() => setActiveLawTab('featured')}
              className={`px-3.5 py-1.5 rounded-lg font-semibold transition-all ${
                activeLawTab === 'featured'
                  ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-sm'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              Featured Laws ({featuredLaws.length})
            </button>
            <button
              type="button"
              id="home-tab-recently-updated"
              onClick={() => setActiveLawTab('recently_updated')}
              className={`px-3.5 py-1.5 rounded-lg font-semibold transition-all ${
                activeLawTab === 'recently_updated'
                  ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-sm'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              Recently Updated
            </button>
            <button
              type="button"
              id="home-tab-recently-added"
              onClick={() => setActiveLawTab('recently_added')}
              className={`px-3.5 py-1.5 rounded-lg font-semibold transition-all ${
                activeLawTab === 'recently_added'
                  ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-sm'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              Recently Added
            </button>
          </div>
        </div>

        {/* Tab Content with Smooth Animation */}
        <AnimatePresence mode="wait">
          {activeLawTab === 'featured' && (
            <motion.div
              key="tab-featured"
              variants={tabContentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {featuredLaws.map((law) => (
                <div
                  key={law.id}
                  className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-amber-500/40 shadow-sm transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                          law.jurisdiction === 'Bangladesh'
                            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
                            : 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20'
                        }`}
                      >
                        {law.jurisdiction}
                      </span>
                      <span className="text-xs text-zinc-400 font-medium">
                        {law.actNumber || `Enacted ${law.enactmentYear}`}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-zinc-900 dark:text-white line-clamp-1">
                        {law.title}
                      </h3>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">{law.titleBn}</p>
                    </div>

                    <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-3 leading-relaxed">
                      {law.overview}
                    </p>

                    <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800/80">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 block mb-1">
                        Plain Language Summary
                      </span>
                      <p className="text-zinc-600 dark:text-zinc-300 text-xs line-clamp-2 leading-relaxed">
                        {law.simpleSummary}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs">
                    <span className="text-zinc-500">{law.sections.length} Core Sections</span>
                    <Link
                      href={`/law/${law.id}`}
                      id={`featured-law-read-${law.id}`}
                      className="font-bold text-amber-600 dark:text-amber-400 hover:underline inline-flex items-center space-x-1"
                    >
                      <span>Read Full Statute</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* Tab 2: Recently Updated Laws */}
          {activeLawTab === 'recently_updated' && (
            <motion.div
              key="tab-updated"
              variants={tabContentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {recentlyUpdatedLaws.map((law) => (
                <div
                  key={law.id}
                  className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                      Amended / Updated {law.updateYear}
                    </span>
                    <span className="text-xs text-zinc-400">{law.jurisdiction}</span>
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-zinc-900 dark:text-white">{law.title}</h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">{law.titleBn}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800 text-xs space-y-1">
                    <span className="font-semibold text-zinc-800 dark:text-zinc-200 block">Amendment Overview:</span>
                    <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">{law.updateNote}</p>
                  </div>
                  <div className="pt-2 flex justify-end">
                    <Link
                      href={law.url}
                      className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center space-x-1"
                    >
                      <span>View Amendment History & Full Text</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* Tab 3: Recently Added Laws */}
          {activeLawTab === 'recently_added' && (
            <motion.div
              key="tab-added"
              variants={tabContentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {recentlyAddedLaws.map((law) => (
                <div
                  key={law.id}
                  className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                        Recently Indexed
                      </span>
                      <span className="text-xs text-zinc-400">{law.jurisdiction}</span>
                    </div>
                    <h3 className="text-base font-bold text-zinc-900 dark:text-white">{law.title}</h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">{law.titleBn}</p>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400">
                      Category: <strong className="text-zinc-800 dark:text-zinc-200">{law.category}</strong>
                    </p>
                  </div>
                  <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex justify-end">
                    <Link
                      href={law.url}
                      className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center space-x-1"
                    >
                      <span>Open Statute</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 5 — AI Legal Assistant Interactive Showcase                       */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="p-8 sm:p-10 rounded-3xl bg-zinc-900 border border-zinc-800 text-white relative overflow-hidden shadow-2xl">
          {/* Background Ambient Glow */}
          <div className="absolute top-0 right-0 -mt-16 -mr-16 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left Column: Information & Triggers */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-2">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-semibold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Interactive AI Research Engine</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  Understand Any Statute in Plain Language
                </h2>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  Translates archaic legal clauses into accessible English and Bangla, breaks down Latin maxims, and formats legal citations instantly.
                </p>
              </div>

              {/* Sample Prompts Interactive Switcher */}
              <div className="space-y-2">
                <span className="text-xs font-semibold text-zinc-400 block">
                  Select a live question to preview explanation:
                </span>
                <div className="flex flex-col gap-2">
                  {sampleAIQuestions.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      id={`home-ai-sample-${item.id}`}
                      onClick={() => setSelectedAIQuestion(item)}
                      className={`text-left p-3 rounded-xl text-xs font-medium transition-all border ${
                        selectedAIQuestion.id === item.id
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-sm'
                          : 'bg-zinc-950/60 text-zinc-300 border-zinc-800 hover:bg-zinc-800 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{item.question}</span>
                        {selectedAIQuestion.id === item.id && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 ml-2" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Link
                  href={`/ai-assistant?q=${encodeURIComponent(selectedAIQuestion.question)}`}
                  id="home-open-ai-assistant-btn"
                  className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs sm:text-sm flex items-center space-x-2 shadow-lg shadow-amber-500/20 transition-colors"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Ask in Full AI Assistant</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/legal-outcome-guide"
                  className="px-4 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-semibold text-xs sm:text-sm transition-colors border border-zinc-700"
                >
                  View Procedural Guides
                </Link>
              </div>
            </div>

            {/* Right Column: Live Simulated Response Card */}
            <div className="lg:col-span-6">
              <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 shadow-inner space-y-4">
                <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3 text-xs">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                    <span className="font-semibold text-amber-400">Plain Language Legal Explanation</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 font-medium">
                    Official Legal Text
                  </span>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedAIQuestion.id}
                    variants={tabContentVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="space-y-3"
                  >
                    <div className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800/80">
                      <span className="text-[10px] uppercase font-bold text-zinc-500 block">Question</span>
                      <p className="text-xs font-semibold text-zinc-200 mt-0.5">{selectedAIQuestion.question}</p>
                      <p className="text-[11px] text-zinc-400">{selectedAIQuestion.questionBn}</p>
                    </div>

                    <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-amber-300">Plain Meaning Breakdown:</span>
                        <span className="text-[10px] text-zinc-400 font-mono">{selectedAIQuestion.lawRef}</span>
                      </div>
                      <p className="text-xs text-zinc-300 leading-relaxed">
                        {selectedAIQuestion.shortAnswer}
                      </p>
                    </div>

                    <div className="pt-2 flex items-center justify-between text-[11px] text-zinc-500">
                      <span className="flex items-center space-x-1">
                        <AlertCircle className="w-3.5 h-3.5 text-zinc-400" />
                        <span>Educational research • Not legal representation</span>
                      </span>
                      <Link
                        href={selectedAIQuestion.targetUrl}
                        className="font-bold text-amber-400 hover:underline flex items-center space-x-1"
                      >
                        <span>Explore Reference</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 6 — Legal Outcome Guide Preview                                   */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="p-8 sm:p-10 rounded-3xl bg-zinc-100 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 space-y-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center space-x-2 text-xs font-semibold text-amber-600 dark:text-amber-400">
                <Compass className="w-4 h-4" />
                <span>Procedural Guidance & Practical Rights</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white">
                The Legal Outcome Guide
              </h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Clear step-by-step pathways explaining real-world legal journeys, key rights, common pitfalls, and emergency contacts.
              </p>
            </div>
            <Link
              href="/legal-outcome-guide"
              id="home-view-all-outcomes-btn"
              className="px-5 py-2.5 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-100 font-bold text-xs sm:text-sm shrink-0 transition-colors shadow-sm"
            >
              Browse All Procedural Pathways →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {LEGAL_OUTCOME_PATHWAYS.map((path) => (
              <div
                key={path.id}
                className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-amber-600 dark:text-amber-400">{path.category}</span>
                    <span className="px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-500 text-[10px] font-semibold">
                      {path.stages.length} Stages
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-zinc-900 dark:text-white">{path.title}</h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">{path.titleBn}</p>
                  </div>

                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-3">
                    {path.summary}
                  </p>

                  <div className="p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800/80 text-[11px] space-y-1">
                    <span className="text-zinc-400 font-medium">Estimated Timeline:</span>
                    <p className="font-semibold text-zinc-700 dark:text-zinc-300">{path.estimatedTimeline}</p>
                  </div>
                </div>

                <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs">
                  <span className="text-zinc-500">{path.jurisdiction}</span>
                  <Link
                    href={`/legal-outcome-guide?topic=${path.id}`}
                    id={`outcome-card-link-${path.id}`}
                    className="font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center space-x-1"
                  >
                    <span>Read Guide</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Emergency Helpline Banner */}
          <div className="p-4 sm:p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div className="flex items-center space-x-3">
              <PhoneCall className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />
              <div>
                <span className="font-bold text-zinc-900 dark:text-white block">
                  Bangladesh Official Emergency Legal & Safety Numbers
                </span>
                <span className="text-zinc-600 dark:text-zinc-400">
                  National Emergency: <strong>999</strong> • Legal Aid Helpline: <strong>16430</strong> • Cyber Crime Unit: <strong>01320-010148</strong>
                </span>
              </div>
            </div>
            <Link
              href="/legal-outcome-guide"
              className="font-bold text-amber-700 dark:text-amber-400 hover:underline shrink-0"
            >
              View Full Emergency Directory →
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 7 — What We Are Working On (Roadmap Preview)                       */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="border-t border-zinc-200 dark:border-zinc-800/80 pt-10 space-y-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                Future Development
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mt-0.5">
                What We Are Working On
              </h2>
              <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
                Our ongoing progress from core national legislation toward cross-border legal understanding.
              </p>
            </div>
            <Link
              href="/roadmap"
              id="home-view-full-roadmap-btn"
              className="text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline flex items-center space-x-1"
            >
              <span>View Full Development Plan</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Available Now */}
            <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  Available Now
                </span>
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              </div>
              <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                Core Bangladesh &amp; International Statutes
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Foundational acts with plain explanations, multilateral treaties, fast bilingual search, AI research assistant, and procedural guides.
              </p>
              <div className="pt-2 text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                Active &amp; Open to All
              </div>
            </div>

            {/* In Development */}
            <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                  In Development
                </span>
                <Clock className="w-4 h-4 text-blue-500" />
              </div>
              <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                Section Comparisons &amp; Gazette Timelines
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Clause-by-clause comparative tools, complete amendment history logs, automatic citation generator, and print-ready research exports.
              </p>
              <div className="pt-2 text-[11px] text-blue-600 dark:text-blue-400 font-semibold">
                Currently Being Built
              </div>
            </div>

            {/* Planned Next */}
            <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
                  Planned Next
                </span>
                <Globe className="w-4 h-4 text-purple-500" />
              </div>
              <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                Expanded International Jurisdictions
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Adding national statutes from the UK, US, European Union, and Asian jurisdictions, alongside private saved research notes.
              </p>
              <div className="pt-2 text-[11px] text-purple-600 dark:text-purple-400 font-semibold">
                Next Stage of Work
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
