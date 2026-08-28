'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Layers,
  ChevronRight,
  ChevronDown,
  BookOpen,
  Scale,
  Globe,
  FileText,
  Search,
  Hash,
  Sparkles,
  Tag,
  CheckCircle2
} from 'lucide-react';
import { LawItem, LawSection, LawPart, LawChapter } from '@/lib/legal-data';

interface StatutoryHierarchyNavProps {
  law: LawItem;
  activeSectionNumber: string;
  onSelectSection: (sectionNumber: string) => void;
}

export function StatutoryHierarchyNav({
  law,
  activeSectionNumber,
  onSelectSection
}: StatutoryHierarchyNavProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPart, setSelectedPart] = useState<string>('all');
  const [selectedChapter, setSelectedChapter] = useState<string>('all');

  // Group sections by part and chapter
  const partsList = useMemo(() => {
    const partsMap = new Map<string, { partNumber: string; partTitle: string; sections: LawSection[] }>();

    law.sections.forEach((sec) => {
      const partKey = sec.partNumber || 'General Provisions';
      const partTitle = sec.partTitle || (sec.partNumber ? `Part ${sec.partNumber}` : 'General Provisions');

      if (!partsMap.has(partKey)) {
        partsMap.set(partKey, {
          partNumber: sec.partNumber || '',
          partTitle,
          sections: []
        });
      }
      partsMap.get(partKey)!.sections.push(sec);
    });

    return Array.from(partsMap.values());
  }, [law.sections]);

  // Filtered sections based on hierarchy selection and search query
  const filteredSections = useMemo(() => {
    return law.sections.filter((sec) => {
      const matchesPart =
        selectedPart === 'all' ||
        (sec.partNumber && sec.partNumber === selectedPart) ||
        (!sec.partNumber && selectedPart === 'General Provisions');

      const matchesChapter =
        selectedChapter === 'all' ||
        (sec.chapterNumber && sec.chapterNumber === selectedChapter);

      const matchesSearch =
        !searchQuery.trim() ||
        sec.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sec.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (sec.titleBn && sec.titleBn.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (sec.keyConcepts && sec.keyConcepts.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase())));

      return matchesPart && matchesChapter && matchesSearch;
    });
  }, [law.sections, selectedPart, selectedChapter, searchQuery]);

  return (
    <div className="p-4 sm:p-5 rounded-3xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-4">
      {/* Hierarchy Breadcrumb Trail */}
      <div className="flex flex-wrap items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
        <span className="inline-flex items-center space-x-1 font-semibold text-zinc-700 dark:text-zinc-300">
          <Globe className="w-3.5 h-3.5 text-blue-500" />
          <span>{law.jurisdiction}</span>
        </span>
        <ChevronRight className="w-3 h-3 text-zinc-400" />
        <span className="font-semibold text-zinc-700 dark:text-zinc-300">
          {law.category}
        </span>
        <ChevronRight className="w-3 h-3 text-zinc-400" />
        <span className="font-bold text-blue-600 dark:text-blue-400">
          {law.shortTitle || law.title}
        </span>
      </div>

      {/* Search Input for Quick Index Navigation */}
      <div className="relative">
        <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          id="statutory-hierarchy-search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={`Search ${law.sections.length} indexed provisions or section numbers...`}
          className="w-full pl-8 pr-3 py-2 text-xs bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 shadow-sm"
        />
      </div>

      {/* Part Filter Pills if parts exist */}
      {partsList.length > 1 && (
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs scrollbar-none">
          <button
            type="button"
            onClick={() => setSelectedPart('all')}
            className={`px-2.5 py-1 rounded-lg font-semibold text-[11px] whitespace-nowrap transition-all ${
              selectedPart === 'all'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800 hover:text-zinc-900 dark:hover:text-white'
            }`}
          >
            All Parts ({law.sections.length})
          </button>
          {partsList.map((part) => (
            <button
              key={part.partTitle}
              type="button"
              onClick={() => setSelectedPart(part.partNumber || part.partTitle)}
              className={`px-2.5 py-1 rounded-lg font-semibold text-[11px] whitespace-nowrap transition-all ${
                selectedPart === (part.partNumber || part.partTitle)
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              {part.partTitle} ({part.sections.length})
            </button>
          ))}
        </div>
      )}

      {/* Sections List Navigation */}
      <div className="space-y-1.5 max-h-[380px] overflow-y-auto pr-1">
        {filteredSections.length > 0 ? (
          filteredSections.map((sec) => {
            const isSelected = sec.number === activeSectionNumber;
            const provisionType = sec.provisionType || (sec.number.startsWith('Article') ? 'Article' : 'Section');

            return (
              <button
                key={sec.number}
                type="button"
                id={`hierarchy-sec-${sec.number.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                onClick={() => onSelectSection(sec.number)}
                className={`w-full text-left p-3 rounded-2xl border transition-all flex items-start justify-between gap-2 ${
                  isSelected
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-600/20'
                    : 'bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 border-zinc-200/80 dark:border-zinc-800 hover:border-blue-500/40 hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50'
                }`}
              >
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                        isSelected
                          ? 'bg-white/20 text-white'
                          : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
                      }`}
                    >
                      {sec.number}
                    </span>
                    {sec.chapterTitle && (
                      <span
                        className={`text-[10px] truncate max-w-[140px] ${
                          isSelected ? 'text-blue-100' : 'text-zinc-400'
                        }`}
                      >
                        {sec.chapterTitle}
                      </span>
                    )}
                  </div>
                  <p
                    className={`text-xs font-bold truncate ${
                      isSelected ? 'text-white' : 'text-zinc-900 dark:text-zinc-100'
                    }`}
                  >
                    {sec.title}
                  </p>
                  {sec.titleBn && (
                    <p
                      className={`text-[11px] font-bangla truncate ${
                        isSelected ? 'text-blue-100' : 'text-zinc-500 dark:text-zinc-400'
                      }`}
                    >
                      {sec.titleBn}
                    </p>
                  )}
                </div>

                {isSelected && (
                  <CheckCircle2 className="w-4 h-4 text-white shrink-0 mt-1" />
                )}
              </button>
            );
          })
        ) : (
          <div className="p-6 text-center text-xs text-zinc-500 dark:text-zinc-400 space-y-2">
            <p>No provisions matching &ldquo;{searchQuery}&rdquo;</p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedPart('all');
                setSelectedChapter('all');
              }}
              className="text-blue-600 dark:text-blue-400 font-semibold underline"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
