'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Globe,
  Search,
  ArrowRight,
  BookOpen,
  ShieldCheck,
  Filter,
  Sparkles,
  Scale,
  Building2,
  Calendar,
  Layers,
  FileText,
  ExternalLink,
  CheckCircle2,
  Copy,
  Check,
  Info,
  SlidersHorizontal,
  Table as TableIcon,
  LayoutGrid,
  HeartHandshake,
  ShieldAlert,
  Gavel,
  Anchor,
  Briefcase,
  Users,
  Lightbulb,
  TreePine,
  DollarSign,
  Landmark,
  Compass,
  X,
  ChevronDown,
  ChevronUp,
  GraduationCap
} from 'lucide-react';
import { LAWS_DATABASE, LawItem } from '@/lib/legal-data';
import {
  INTERNATIONAL_LAW_CATEGORIES,
  INTERNATIONAL_SOURCES_REGISTRY,
  InternationalCategoryMeta,
  OfficialSourceRegistryItem
} from '@/lib/international-law-architecture';

// Map icon name string to Lucide component
function getCategoryIcon(iconName: string) {
  switch (iconName) {
    case 'HeartHandshake':
      return <HeartHandshake className="w-4 h-4" />;
    case 'ShieldAlert':
      return <ShieldAlert className="w-4 h-4" />;
    case 'Gavel':
      return <Gavel className="w-4 h-4" />;
    case 'Anchor':
      return <Anchor className="w-4 h-4" />;
    case 'Briefcase':
      return <Briefcase className="w-4 h-4" />;
    case 'Users':
      return <Users className="w-4 h-4" />;
    case 'Lightbulb':
      return <Lightbulb className="w-4 h-4" />;
    case 'TreePine':
      return <TreePine className="w-4 h-4" />;
    case 'DollarSign':
      return <DollarSign className="w-4 h-4" />;
    case 'Landmark':
      return <Landmark className="w-4 h-4" />;
    case 'Compass':
      return <Compass className="w-4 h-4" />;
    case 'Globe':
    default:
      return <Globe className="w-4 h-4" />;
  }
}

export default function InternationalLawsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedInstrumentType, setSelectedInstrumentType] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDepositary, setSelectedDepositary] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [copiedCitationId, setCopiedCitationId] = useState<string | null>(null);
  const [sourcesModalOpen, setSourcesModalOpen] = useState<boolean>(false);
  const [activeSourceDetail, setActiveSourceDetail] = useState<OfficialSourceRegistryItem | null>(null);
  const [educationalFrameworkOpen, setEducationalFrameworkOpen] = useState<boolean>(false);

  // All International instruments in database
  const internationalInstruments = useMemo(() => {
    return LAWS_DATABASE.filter(
      (l) => l.jurisdiction === 'International' || l.jurisdictionCode === 'INT' || l.jurisdiction === 'Regional' || l.jurisdiction === 'Supranational'
    );
  }, []);

  // Compute category instrument counts dynamically
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: internationalInstruments.length };
    INTERNATIONAL_LAW_CATEGORIES.forEach((cat) => {
      counts[cat.name] = internationalInstruments.filter((l) => l.category === cat.name).length;
    });
    return counts;
  }, [internationalInstruments]);

  // List of distinct depositaries
  const depositaryList = useMemo(() => {
    const deps = new Set<string>();
    internationalInstruments.forEach((l) => {
      if (l.depositary) deps.add(l.depositary);
      else if (l.sourceOrganization) deps.add(l.sourceOrganization);
    });
    return ['All', ...Array.from(deps)];
  }, [internationalInstruments]);

  // Filter logic
  const filteredInstruments = useMemo(() => {
    return internationalInstruments.filter((law) => {
      const matchesCategory =
        selectedCategory === 'All' || law.category === selectedCategory;

      const matchesInstrumentType =
        selectedInstrumentType === 'All' || law.instrumentType === selectedInstrumentType;

      const matchesDepositary =
        selectedDepositary === 'All' ||
        law.depositary === selectedDepositary ||
        law.sourceOrganization === selectedDepositary;

      const matchesStatus =
        selectedStatus === 'All' || law.status === selectedStatus;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        law.title.toLowerCase().includes(q) ||
        law.titleBn.toLowerCase().includes(q) ||
        law.shortTitle.toLowerCase().includes(q) ||
        law.overview.toLowerCase().includes(q) ||
        (law.alternativeTitles && law.alternativeTitles.some((alt) => alt.toLowerCase().includes(q))) ||
        (law.unCitationRef && law.unCitationRef.toLowerCase().includes(q)) ||
        (law.keywords && law.keywords.some((k) => k.toLowerCase().includes(q))) ||
        (law.depositary && law.depositary.toLowerCase().includes(q)) ||
        (law.bangladeshRatificationStatus && law.bangladeshRatificationStatus.toLowerCase().includes(q)) ||
        (law.bangladeshDomesticApplicationNote && law.bangladeshDomesticApplicationNote.toLowerCase().includes(q));

      return matchesCategory && matchesInstrumentType && matchesDepositary && matchesStatus && matchesSearch;
    });
  }, [internationalInstruments, selectedCategory, selectedInstrumentType, selectedDepositary, selectedStatus, searchQuery]);

  const handleCopyCitation = (id: string, citationText: string) => {
    navigator.clipboard.writeText(citationText);
    setCopiedCitationId(id);
    setTimeout(() => setCopiedCitationId(null), 2000);
  };

  const selectedCategoryMeta = useMemo(() => {
    return INTERNATIONAL_LAW_CATEGORIES.find((c) => c.name === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-10">
      {/* Header Banner */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-zinc-200 dark:border-zinc-800">
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 text-xs font-semibold">
            <Globe className="w-3.5 h-3.5" />
            <span>Multilateral Treaty & Statutory Repository</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            International Law Library
          </h1>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
            A comprehensive, lawyer-grade repository of multilateral treaties, United Nations conventions, declarations, international humanitarian rules of armed conflict, maritime governance, and trade dispute instruments with bilingual statutory texts, cross-citations, and state party records.
          </p>
        </div>

        {/* Source Ingestion Transparency Action */}
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            type="button"
            id="open-source-registry-modal-btn"
            onClick={() => setSourcesModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white text-xs font-bold inline-flex items-center space-x-2 border border-zinc-200 dark:border-zinc-700 transition-colors shadow-sm cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Official Sources & Ingestion Registry ({INTERNATIONAL_SOURCES_REGISTRY.length})</span>
          </button>
        </div>
      </div>

      {/* Bangladesh & International Law: Practical Research Framework */}
      <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-linear-to-br from-blue-50/50 via-white to-zinc-50/50 dark:from-zinc-900 dark:via-zinc-900/90 dark:to-zinc-950 p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center space-x-2 text-xs font-bold text-blue-700 dark:text-blue-400">
              <GraduationCap className="w-4 h-4" />
              <span>Bangladesh & International Law: Practical Research Framework</span>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white">
              Dualism, Constitutional Directives & Domestic Enabling Statutes
            </h2>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 max-w-3xl leading-relaxed">
              How international instruments operate in Bangladesh courts, from parliamentary transposition under Articles 25 &amp; 145A of the Constitution to the critical differences between Multilateral Treaties, Declaratory Instruments, and Model Laws.
            </p>
          </div>
          <button
            type="button"
            id="toggle-educational-framework-btn"
            onClick={() => setEducationalFrameworkOpen(!educationalFrameworkOpen)}
            className="px-3.5 py-2 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white inline-flex items-center space-x-2 shrink-0 transition-colors cursor-pointer self-start md:self-center shadow-xs"
          >
            <span>{educationalFrameworkOpen ? 'Hide Research Framework' : 'Explore Legal Principles'}</span>
            {educationalFrameworkOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {educationalFrameworkOpen && (
          <div className="mt-6 pt-6 border-t border-zinc-200/80 dark:border-zinc-800/80 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-zinc-600 dark:text-zinc-300">
            {/* Column 1: Dualist Doctrine & Constitution */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2 font-bold text-zinc-900 dark:text-white text-xs uppercase tracking-wider">
                <Scale className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>1. Dualist Constitutional Baseline</span>
              </div>
              <p className="leading-relaxed text-[11px]">
                <strong>Dualism in Bangladesh:</strong> International treaties are <em>not self-executing</em> in domestic courts. A treaty entered into or ratified by the State does not automatically become municipal law without domestic enabling legislation enacted by the Jatiya Sangsad (Parliament).
              </p>
              <div className="p-3 rounded-2xl bg-white/80 dark:bg-zinc-950/60 border border-zinc-200/70 dark:border-zinc-800 space-y-1.5 text-[11px]">
                <div>
                  <span className="font-bold text-zinc-900 dark:text-zinc-100">Article 25 (State Policy):</span>
                  <p className="text-zinc-500 dark:text-zinc-400 mt-0.5">Mandates respect for international law and UN Charter principles in international relations. While non-justiciable under Art. 8(2), it acts as an interpretive guide for fundamental rights.</p>
                </div>
                <div className="pt-1.5 border-t border-zinc-100 dark:border-zinc-800">
                  <span className="font-bold text-zinc-900 dark:text-zinc-100">Article 145A (Treaties):</span>
                  <p className="text-zinc-500 dark:text-zinc-400 mt-0.5">Requires all foreign treaties to be submitted to the President, who shall cause them to be laid before Parliament.</p>
                </div>
              </div>
            </div>

            {/* Column 2: Instrument Typology */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2 font-bold text-zinc-900 dark:text-white text-xs uppercase tracking-wider">
                <FileText className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <span>2. Typology of Instruments</span>
              </div>
              <ul className="space-y-2 text-[11px] leading-relaxed">
                <li className="p-2.5 rounded-xl bg-white/80 dark:bg-zinc-950/60 border border-zinc-200/70 dark:border-zinc-800">
                  <strong className="text-zinc-900 dark:text-white block">Multilateral Treaties (e.g. ICCPR, UNCLOS):</strong>
                  Binding interstate covenants requiring signature, ratification/accession, and domestic incorporation.
                </li>
                <li className="p-2.5 rounded-xl bg-white/80 dark:bg-zinc-950/60 border border-zinc-200/70 dark:border-zinc-800">
                  <strong className="text-zinc-900 dark:text-white block">Declaratory Instruments (e.g. UDHR):</strong>
                  Non-treaty resolutions adopted by the UN General Assembly. Morally authoritative, often codifying customary international law (opinio juris).
                </li>
                <li className="p-2.5 rounded-xl bg-white/80 dark:bg-zinc-950/60 border border-zinc-200/70 dark:border-zinc-800">
                  <strong className="text-zinc-900 dark:text-white block">Model Laws (e.g. UNCITRAL Model Law):</strong>
                  Legislative blueprints not open to state ratification; rather, enacted by parliaments into domestic codes.
                </li>
              </ul>
            </div>

            {/* Column 3: Domestic Transposition & Precedent */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2 font-bold text-zinc-900 dark:text-white text-xs uppercase tracking-wider">
                <Gavel className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>3. Domestic Transposition in BD</span>
              </div>
              <div className="p-3 rounded-2xl bg-white/80 dark:bg-zinc-950/60 border border-zinc-200/70 dark:border-zinc-800 space-y-2 text-[11px]">
                <strong className="text-zinc-900 dark:text-white block">Key Enabling Acts in Bangladesh:</strong>
                <div className="space-y-1 text-zinc-600 dark:text-zinc-400">
                  <div>• <strong>Arbitration Act, 2001 (Act 1 of 2001):</strong> Domestic enactment of the UNCITRAL Model Law.</div>
                  <div>• <strong>Geneva Conventions Act, 2007 (Act 59 of 2007):</strong> Transposition of the 1949 Geneva Conventions.</div>
                  <div>• <strong>Maritime Zones Act, 1974 / 2021:</strong> Domestic statutory regime implementing UNCLOS 1982.</div>
                </div>
                <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 text-[10px] text-zinc-500 italic">
                  <strong>Judicial Precedent:</strong> In <em>BNWLA v. Bangladesh</em>, the Supreme Court confirmed international human rights conventions may be used by the judiciary to interpret and expand domestic fundamental rights when not in conflict with statutory law.
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 12-Division Taxonomy Carousel / Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 flex items-center space-x-1.5">
            <Layers className="w-3.5 h-3.5 text-blue-500" />
            <span>International Law Divisions ({INTERNATIONAL_LAW_CATEGORIES.length})</span>
          </span>
          <span className="text-xs text-zinc-400">
            {internationalInstruments.length} Global Instruments Indexed
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
          {/* "All" button */}
          <button
            type="button"
            id="cat-pill-all"
            onClick={() => setSelectedCategory('All')}
            className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between space-y-2 cursor-pointer ${
              selectedCategory === 'All'
                ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-600/20 ring-2 ring-blue-500/20'
                : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-blue-500/40 hover:bg-zinc-50 dark:hover:bg-zinc-800/60'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className={`p-1.5 rounded-lg ${selectedCategory === 'All' ? 'bg-white/20 text-white' : 'bg-blue-500/10 text-blue-600 dark:text-blue-400'}`}>
                <Globe className="w-4 h-4" />
              </div>
              <span className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded-full ${selectedCategory === 'All' ? 'bg-white/20 text-white' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'}`}>
                {categoryCounts['All'] || 0}
              </span>
            </div>
            <div>
              <div className="text-xs font-bold truncate">All Categories</div>
              <div className={`text-[10px] truncate ${selectedCategory === 'All' ? 'text-blue-100' : 'text-zinc-400'}`}>
                Complete Library
              </div>
            </div>
          </button>

          {/* 12 Individual Categories */}
          {INTERNATIONAL_LAW_CATEGORIES.map((cat) => {
            const count = categoryCounts[cat.name] || 0;
            const isSelected = selectedCategory === cat.name;

            return (
              <button
                key={cat.id}
                type="button"
                id={`cat-pill-${cat.slug}`}
                onClick={() => setSelectedCategory(cat.name)}
                className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between space-y-2 cursor-pointer ${
                  isSelected
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-600/20 ring-2 ring-blue-500/20'
                    : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-blue-500/40 hover:bg-zinc-50 dark:hover:bg-zinc-800/60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-white/20 text-white' : 'bg-zinc-100 dark:bg-zinc-800 text-blue-600 dark:text-blue-400'}`}>
                    {getCategoryIcon(cat.iconName)}
                  </div>
                  <span className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded-full ${isSelected ? 'bg-white/20 text-white' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'}`}>
                    {count}
                  </span>
                </div>
                <div>
                  <div className="text-xs font-bold truncate" title={cat.name}>
                    {cat.name}
                  </div>
                  <div className={`text-[10px] font-bangla truncate ${isSelected ? 'text-blue-100' : 'text-zinc-400'}`}>
                    {cat.nameBn}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Category Descriptive Strip */}
      {selectedCategoryMeta && (
        <div className="p-5 rounded-2xl bg-blue-500/5 dark:bg-blue-950/20 border border-blue-500/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-bold text-zinc-900 dark:text-white">
                {selectedCategoryMeta.name}
              </span>
              <span className="text-xs font-bangla text-zinc-500 dark:text-zinc-400">
                ({selectedCategoryMeta.nameBn})
              </span>
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-300 max-w-3xl leading-relaxed">
              {selectedCategoryMeta.description}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-1.5 shrink-0">
            {selectedCategoryMeta.featuredThemes.slice(0, 3).map((theme, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-[11px] text-zinc-600 dark:text-zinc-300 font-medium"
              >
                {theme}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            id="int-laws-search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search treaties by name, alias (e.g. VCLT, Montego Bay), UNTS citation, state party..."
            className="w-full pl-10 pr-4 py-2 text-xs bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/40 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 text-xs"
            >
              Clear
            </button>
          )}
        </div>

        {/* Filters and View Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Instrument Type Filter */}
          <select
            id="instrument-type-filter-select"
            value={selectedInstrumentType}
            onChange={(e) => setSelectedInstrumentType(e.target.value)}
            className="px-3 py-2 text-xs bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-700 dark:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
          >
            <option value="All">All Instrument Types</option>
            <option value="Multilateral Treaty">Multilateral Treaty</option>
            <option value="Declaratory Instrument">Declaratory Instrument</option>
            <option value="Model Law">Model Law</option>
            <option value="Constitutive Statute">Constitutive Statute</option>
            <option value="Treaty Protocol">Treaty Protocol</option>
          </select>

          {/* Status Filter */}
          <select
            id="status-filter-select"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 text-xs bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-700 dark:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
          >
            <option value="All">All Legal Statuses</option>
            <option value="Active Treaty">Active Treaty</option>
            <option value="In Force">In Force</option>
            <option value="Customary Law">Customary Law</option>
            <option value="Declaratory Instrument">Declaratory Instrument</option>
            <option value="Statute / Constitutional Charter">Statute / Charter</option>
          </select>

          {/* Depositary Filter */}
          <select
            id="depositary-filter-select"
            value={selectedDepositary}
            onChange={(e) => setSelectedDepositary(e.target.value)}
            className="px-3 py-2 text-xs bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-700 dark:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-blue-500/40 max-w-[200px] truncate"
          >
            {depositaryList.map((dep) => (
              <option key={dep} value={dep}>
                {dep === 'All' ? 'All Depositaries' : dep}
              </option>
            ))}
          </select>

          {/* Grid vs Table View Mode Switcher */}
          <div className="flex items-center p-1 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
            <button
              type="button"
              id="view-mode-grid-btn"
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg text-xs font-semibold transition-colors ${
                viewMode === 'grid'
                  ? 'bg-white dark:bg-zinc-900 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
              }`}
              title="Card Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              type="button"
              id="view-mode-table-btn"
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg text-xs font-semibold transition-colors ${
                viewMode === 'table'
                  ? 'bg-white dark:bg-zinc-900 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
              }`}
              title="Comparative Table View"
            >
              <TableIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Results Count & Active Filter Indicator */}
      <div className="flex items-center justify-between text-xs text-zinc-500">
        <div>
          Showing <span className="font-bold text-zinc-900 dark:text-white">{filteredInstruments.length}</span> of {internationalInstruments.length} international instruments
          {selectedCategory !== 'All' && <span> in <strong className="text-blue-600 dark:text-blue-400">{selectedCategory}</strong></span>}
          {selectedInstrumentType !== 'All' && <span> (<span className="text-purple-600 dark:text-purple-400 font-semibold">{selectedInstrumentType}</span>)</span>}
        </div>
        {(selectedCategory !== 'All' || selectedInstrumentType !== 'All' || selectedStatus !== 'All' || selectedDepositary !== 'All' || searchQuery) && (
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('All');
              setSelectedInstrumentType('All');
              setSelectedStatus('All');
              setSelectedDepositary('All');
              setSearchQuery('');
            }}
            className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-medium"
          >
            Reset all filters
          </button>
        )}
      </div>

      {/* VIEW MODE 1: RICH CATALOG GRID */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredInstruments.length > 0 ? (
            filteredInstruments.map((law) => (
              <div
                key={law.id}
                className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-blue-500/40 shadow-sm transition-all flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  {/* Top Badges */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                        {law.category}
                      </span>
                      {law.instrumentType && (
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                          law.instrumentType === 'Declaratory Instrument'
                            ? 'bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-500/30'
                            : law.instrumentType === 'Model Law'
                            ? 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/30'
                            : law.instrumentType === 'Constitutive Statute'
                            ? 'bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border-indigo-500/30'
                            : 'bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border-cyan-500/30'
                        }`}>
                          {law.instrumentType}
                        </span>
                      )}
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
                        {law.status}
                      </span>
                      {law.bangladeshRatificationStatus && (
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border inline-flex items-center space-x-1 ${
                          law.bangladeshRatificationStatus.includes('Ratified') ||
                          law.bangladeshRatificationStatus.includes('Party') ||
                          law.bangladeshRatificationStatus.includes('Domestically Enacted')
                            ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/30'
                            : law.bangladeshRatificationStatus.includes('Customary')
                            ? 'bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/30'
                            : 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/30'
                        }`}>
                          <span>🇧🇩 {law.bangladeshRatificationStatus}</span>
                        </span>
                      )}
                      {law.verificationStatus && (
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 inline-flex items-center space-x-1">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>{law.verificationStatus}</span>
                        </span>
                      )}
                    </div>

                    <div className="text-xs text-zinc-500 dark:text-zinc-400 font-mono">
                      {law.enactmentYear}
                    </div>
                  </div>

                  {/* Title and Bangla */}
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-white leading-tight">
                      {law.title}
                    </h2>
                    {law.titleBn && (
                      <p className="text-xs font-bangla text-zinc-500 dark:text-zinc-400 mt-1">
                        {law.titleBn}
                      </p>
                    )}
                  </div>

                  {/* Alternative Titles / Aliases */}
                  {law.alternativeTitles && law.alternativeTitles.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1 text-[11px]">
                      <span className="text-zinc-400 font-semibold">Also cited as:</span>
                      {law.alternativeTitles.map((alt, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 font-mono"
                        >
                          {alt}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Overview Text */}
                  <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                    {law.overview}
                  </p>

                  {/* Governance & Depository Info Strip */}
                  <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200/80 dark:border-zinc-800 grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-zinc-400 block">Depositary / Authority</span>
                      <span className="font-semibold text-zinc-800 dark:text-zinc-200 truncate block" title={law.depositary || law.sourceOrganization || 'International Organization'}>
                        {law.depositary || law.sourceOrganization || 'International Organization'}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-zinc-400 block">State Parties / Signatories</span>
                      <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                        {law.ratificationsCount || law.signatoriesCount
                          ? `${law.ratificationsCount || law.signatoriesCount} State Parties`
                          : 'Customary Global Standard'}
                      </span>
                    </div>
                  </div>

                  {/* Bangladesh Legal Application & Enabling Note */}
                  {law.bangladeshDomesticApplicationNote && (
                    <div className="p-3 rounded-2xl bg-emerald-500/5 dark:bg-emerald-950/20 border border-emerald-500/20 space-y-1">
                      <div className="flex items-center space-x-1.5 text-emerald-700 dark:text-emerald-400 font-bold text-[11px]">
                        <Scale className="w-3.5 h-3.5" />
                        <span>Bangladesh Legal Application &amp; Enabling Framework</span>
                      </div>
                      <p className="text-zinc-600 dark:text-zinc-300 text-xs leading-relaxed">
                        {law.bangladeshDomesticApplicationNote}
                      </p>
                    </div>
                  )}

                  {/* Key Highlights */}
                  {law.keyHighlights && law.keyHighlights.length > 0 && (
                    <div className="space-y-1.5 pt-1">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                        Core Statutory Benchmarks:
                      </p>
                      <ul className="space-y-1 text-xs text-zinc-600 dark:text-zinc-400">
                        {law.keyHighlights.slice(0, 2).map((h, i) => (
                          <li key={i} className="flex items-start space-x-2">
                            <span className="text-blue-500 shrink-0 font-bold">•</span>
                            <span className="leading-relaxed">{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Card Footer Actions */}
                <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
                  {/* Citation Copy Button */}
                  <button
                    type="button"
                    onClick={() =>
                      handleCopyCitation(
                        law.id,
                        law.citations?.bluebook || law.citations?.standard || `${law.title} (${law.enactmentYear})`
                      )
                    }
                    className="text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 inline-flex items-center space-x-1 font-medium"
                    title="Copy Bluebook / Standard Citation"
                  >
                    {copiedCitationId === law.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold">Citation Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-zinc-400" />
                        <span>Copy Citation</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center space-x-2.5">
                    {/* Ask AI Assistant */}
                    <Link
                      href={`/ai-assistant?lawId=${law.id}&lawTitle=${encodeURIComponent(law.title)}&query=${encodeURIComponent(`Explain key principles and legal effects of ${law.title}`)}`}
                      className="px-3 py-1.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 font-semibold inline-flex items-center space-x-1.5 transition-colors"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      <span>AI Analysis</span>
                    </Link>

                    {/* Open Law Reader */}
                    <Link
                      href={`/law/${law.id}`}
                      id={`int-open-reading-${law.id}`}
                      className="px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold inline-flex items-center space-x-1.5 transition-colors shadow-sm"
                    >
                      <span>Read Treaty</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-2 p-12 text-center bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 space-y-3">
              <Globe className="w-8 h-8 text-zinc-400 mx-auto" />
              <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                No international legal instruments match your criteria
              </h3>
              <p className="text-xs text-zinc-500 max-w-md mx-auto">
                Try adjusting your category filter, clearing your search query, or selecting &quot;All Categories&quot; to browse the repository.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('All');
                  setSelectedStatus('All');
                  setSelectedDepositary('All');
                  setSearchQuery('');
                }}
                className="px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold text-xs inline-block"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      ) : (
        /* VIEW MODE 2: COMPACT COMPARATIVE TABLE */
        <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-zinc-50 dark:bg-zinc-950/70 border-b border-zinc-200 dark:border-zinc-800 text-[11px] uppercase font-bold text-zinc-500 tracking-wider">
                <tr>
                  <th className="px-5 py-3.5">Instrument Title</th>
                  <th className="px-3 py-3.5">Type</th>
                  <th className="px-3 py-3.5">Category</th>
                  <th className="px-3 py-3.5">Adoption</th>
                  <th className="px-3 py-3.5">Depositary</th>
                  <th className="px-3 py-3.5">Parties</th>
                  <th className="px-3 py-3.5">Bangladesh Status</th>
                  <th className="px-3 py-3.5">Status</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/80">
                {filteredInstruments.map((law) => (
                  <tr key={law.id} className="hover:bg-zinc-50/80 dark:hover:bg-zinc-800/40 transition-colors">
                    <td className="px-5 py-4">
                      <div className="font-bold text-zinc-900 dark:text-white">
                        <Link href={`/law/${law.id}`} className="hover:text-blue-600 dark:hover:text-blue-400">
                          {law.title}
                        </Link>
                      </div>
                      <div className="text-[11px] font-bangla text-zinc-500 dark:text-zinc-400">
                        {law.titleBn}
                      </div>
                      {law.unCitationRef && (
                        <span className="font-mono text-[10px] text-blue-600 dark:text-blue-400 block mt-0.5">
                          {law.unCitationRef}
                        </span>
                      )}
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap">
                      {law.instrumentType ? (
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                          law.instrumentType === 'Declaratory Instrument'
                            ? 'bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-500/30'
                            : law.instrumentType === 'Model Law'
                            ? 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/30'
                            : law.instrumentType === 'Constitutive Statute'
                            ? 'bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border-indigo-500/30'
                            : 'bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border-cyan-500/30'
                        }`}>
                          {law.instrumentType}
                        </span>
                      ) : (
                        <span className="text-zinc-400 text-[11px]">Treaty</span>
                      )}
                    </td>
                    <td className="px-3 py-4">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 whitespace-nowrap">
                        {law.category}
                      </span>
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap">
                      <span className="font-mono text-zinc-800 dark:text-zinc-200 font-semibold">{law.enactmentYear}</span>
                      {law.entryIntoForceDate && (
                        <span className="text-[10px] text-zinc-400 block">In force: {law.entryIntoForceDate}</span>
                      )}
                    </td>
                    <td className="px-3 py-4 text-zinc-600 dark:text-zinc-300">
                      <span className="truncate block max-w-[160px]" title={law.depositary || law.sourceOrganization || ''}>
                        {law.depositary || law.sourceOrganization || 'International Agency'}
                      </span>
                    </td>
                    <td className="px-3 py-4 font-semibold text-zinc-800 dark:text-zinc-200 whitespace-nowrap">
                      {law.ratificationsCount || law.signatoriesCount
                        ? `${law.ratificationsCount || law.signatoriesCount} States`
                        : 'Customary'}
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap">
                      {law.bangladeshRatificationStatus ? (
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border inline-flex items-center space-x-1 ${
                          law.bangladeshRatificationStatus.includes('Ratified') ||
                          law.bangladeshRatificationStatus.includes('Party') ||
                          law.bangladeshRatificationStatus.includes('Domestically Enacted')
                            ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/30'
                            : law.bangladeshRatificationStatus.includes('Customary')
                            ? 'bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/30'
                            : 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/30'
                        }`}>
                          <span>🇧🇩 {law.bangladeshRatificationStatus}</span>
                        </span>
                      ) : (
                        <span className="text-zinc-400 text-[11px]">—</span>
                      )}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                        {law.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right whitespace-nowrap">
                      <div className="inline-flex items-center space-x-2">
                        <button
                          type="button"
                          onClick={() =>
                            handleCopyCitation(
                              law.id,
                              law.citations?.bluebook || law.citations?.standard || `${law.title} (${law.enactmentYear})`
                            )
                          }
                          className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
                          title="Copy citation"
                        >
                          {copiedCitationId === law.id ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                        <Link
                          href={`/law/${law.id}`}
                          className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs inline-flex items-center space-x-1"
                        >
                          <span>Open</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* OFFICIAL SOURCES & INGESTION TRANSPARENCY MODAL */}
      {sourcesModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-4xl max-h-[85vh] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="p-6 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
              <div className="space-y-1">
                <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Institutional Repository Architecture</span>
                </div>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
                  Official Sources & Ingestion Transparency Registry
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSourcesModalOpen(false)}
                className="p-2 rounded-xl text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content Scroll */}
            <div className="p-6 overflow-y-auto space-y-6 text-xs text-zinc-600 dark:text-zinc-300">
              <div className="p-4 rounded-2xl bg-blue-500/5 dark:bg-blue-950/30 border border-blue-500/20 space-y-1 text-blue-900 dark:text-blue-200">
                <strong className="block text-sm font-bold">Nyayota Source Transparency Commitment:</strong>
                <p className="leading-relaxed">
                  International instruments on Nyayota are indexed from official depositary sources, certified UN Treaty Series publications, and institutional databases. We provide verified depositary notices, official citation references, and direct hyperlinks to authenticated archives.
                </p>
              </div>

              {/* Source Cards List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {INTERNATIONAL_SOURCES_REGISTRY.map((src) => (
                  <div
                    key={src.id}
                    className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-3 flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="px-2 py-0.5 rounded-md font-mono font-bold text-[11px] bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200">
                          {src.acronym}
                        </span>
                        <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                          {src.status}
                        </span>
                      </div>

                      <h4 className="font-bold text-zinc-900 dark:text-white text-sm">
                        {src.name}
                      </h4>

                      <p className="text-zinc-600 dark:text-zinc-400 text-xs leading-relaxed">
                        {src.scope}
                      </p>

                      <div className="text-[11px] text-zinc-500 space-y-0.5 pt-1">
                        <div><strong>Authority:</strong> {src.depositaryType}</div>
                        <div><strong>Capacity:</strong> {src.verifiedInstrumentsCount}</div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
                      <a
                        href={src.officialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-blue-400 font-semibold inline-flex items-center space-x-1 hover:underline"
                      >
                        <span>Visit Repository</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-end">
              <button
                type="button"
                onClick={() => setSourcesModalOpen(false)}
                className="px-5 py-2 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-bold text-xs"
              >
                Close Registry
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
