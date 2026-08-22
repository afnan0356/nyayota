'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Scale,
  Globe,
  BookOpen,
  ArrowRight,
  Shield,
  Layers,
  Compass,
  FileText,
  Users,
  Leaf,
  ShieldAlert,
  Sparkles,
  Search,
  Filter,
  ArrowLeft
} from 'lucide-react';
import { LEGAL_CATEGORIES_DATA, LAWS_DATABASE, LegalCategoryInfo } from '@/lib/legal-data';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Shield,
  Scale,
  Globe,
  Sparkles,
  Layers,
  Compass,
  FileText,
  Users,
  Leaf,
  ShieldAlert,
};

function CategoryIcon({ name, className }: { name: string; className?: string }) {
  const Icon = ICON_MAP[name] || Scale;
  return <Icon className={className} />;
}

export default function CategoriesPage() {
  const [jurisdictionFilter, setJurisdictionFilter] = useState<'All' | 'Bangladesh' | 'International'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCategories = LEGAL_CATEGORIES_DATA.filter((cat) => {
    const matchesJurisdiction =
      jurisdictionFilter === 'All' ||
      cat.primaryJurisdiction === jurisdictionFilter ||
      cat.primaryJurisdiction === 'Both';
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      cat.title.toLowerCase().includes(q) ||
      cat.titleBn.toLowerCase().includes(q) ||
      cat.description.toLowerCase().includes(q) ||
      cat.descriptionBn.toLowerCase().includes(q);
    return matchesJurisdiction && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-10">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center space-x-2 text-xs text-zinc-500 dark:text-zinc-400">
        <Link href="/" className="hover:text-zinc-900 dark:hover:text-white flex items-center space-x-1">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Home</span>
        </Link>
        <span>/</span>
        <span className="text-amber-600 dark:text-amber-400 font-semibold">Legal Categories</span>
      </div>

      {/* Header Banner */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-xs font-semibold">
          <Layers className="w-3.5 h-3.5" />
          <span>Legal Knowledge Taxonomies</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
          Browse Codified Legal Categories
        </h1>
        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
          Navigate legal provisions, procedural pathways, and international covenants organized by specific branches of law.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full sm:max-w-md">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            id="category-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search categories (e.g. Criminal, Human Rights, Labor)..."
            className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 transition-all"
          />
        </div>

        {/* Jurisdiction Filter Tabs */}
        <div className="flex items-center space-x-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {(['All', 'Bangladesh', 'International'] as const).map((jur) => (
            <button
              key={jur}
              type="button"
              id={`filter-jur-${jur.toLowerCase()}`}
              onClick={() => setJurisdictionFilter(jur)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                jurisdictionFilter === jur
                  ? 'bg-amber-500 text-zinc-950 shadow-sm'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
              }`}
            >
              {jur === 'All' ? 'All Jurisdictions' : jur}
            </button>
          ))}
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((cat) => {
          const lawsCount = LAWS_DATABASE.filter(
            (l) =>
              l.category.toLowerCase() === cat.title.toLowerCase() ||
              l.category.toLowerCase().includes(cat.slug.replace('-', ' '))
          ).length;

          return (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              id={`category-card-${cat.slug}`}
              className="group p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-amber-500/50 hover:shadow-lg transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 group-hover:scale-105 transition-transform">
                    <CategoryIcon name={cat.iconName} className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
                    {cat.primaryJurisdiction}
                  </span>
                </div>

                <div>
                  <h2 className="text-lg font-bold text-zinc-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    {cat.title}
                  </h2>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">{cat.titleBn}</p>
                </div>

                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-3">
                  {cat.description}
                </p>
              </div>

              <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs">
                <span className="text-zinc-500 dark:text-zinc-400 font-medium">
                  {cat.countLabel}
                </span>
                <span className="font-bold text-amber-600 dark:text-amber-400 group-hover:translate-x-1 transition-transform inline-flex items-center space-x-1">
                  <span>Explore</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {filteredCategories.length === 0 && (
        <div className="p-12 text-center rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-dashed border-zinc-300 dark:border-zinc-800 space-y-3">
          <Layers className="w-8 h-8 text-zinc-400 mx-auto" />
          <p className="text-sm font-semibold text-zinc-900 dark:text-white">
            No categories match your search criteria.
          </p>
          <p className="text-xs text-zinc-500">Try adjusting your keyword or jurisdiction filter.</p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setJurisdictionFilter('All');
            }}
            className="px-4 py-2 rounded-xl bg-amber-500 text-zinc-950 font-bold text-xs hover:bg-amber-400 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
