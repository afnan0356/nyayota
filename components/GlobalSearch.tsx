'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search,
  X,
  BookOpen,
  Scale,
  ArrowRight,
  CornerDownLeft,
  Sparkles,
  History,
  Trash2,
  Clock,
  ShieldCheck,
  FolderTree,
  FileText
} from 'lucide-react';
import {
  LAWS_DATABASE,
  GLOSSARY_TERMS,
  LEGAL_CONCEPTS_DATA,
  LEGAL_CATEGORIES_DATA
} from '@/lib/legal-data';
import {
  getSearchHistory,
  saveSearchQuery,
  removeSearchHistoryItem,
  clearSearchHistory
} from '@/lib/search-history';

export interface SearchResultItem {
  type: 'statute' | 'section' | 'concept' | 'category' | 'term';
  id: string;
  title: string;
  titleBn?: string;
  subtitle?: string;
  tag: string;
  jurisdiction?: 'Bangladesh' | 'International';
  jurisdictionCode?: string;
  sourceStatus?: string;
  url: string;
  parentStatute?: string;
}

export interface GroupedResults {
  statutes: SearchResultItem[];
  sections: SearchResultItem[];
  concepts: SearchResultItem[];
  categories: SearchResultItem[];
}

export function GlobalSearch({ isModal = false, onClose }: { isModal?: boolean; onClose?: () => void }) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [history, setHistory] = useState<string[]>(() => getSearchHistory());
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Subscribe to search history updates
  useEffect(() => {
    const handleHistoryUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<string[]>;
      if (customEvent.detail) {
        setHistory(customEvent.detail);
      } else {
        setHistory(getSearchHistory());
      }
    };
    window.addEventListener('nyayota-search-history-updated', handleHistoryUpdate);
    window.addEventListener('storage', handleHistoryUpdate);
    return () => {
      window.removeEventListener('nyayota-search-history-updated', handleHistoryUpdate);
      window.removeEventListener('storage', handleHistoryUpdate);
    };
  }, []);

  // Keyboard shortcut Cmd+K / Ctrl+K & Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
        onClose?.();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Autocomplete grouped computation memo
  const groupedResults = useMemo<GroupedResults>(() => {
    const trimmed = query.trim().toLowerCase();

    if (!trimmed) {
      // Default suggested starting points
      return {
        statutes: [
          {
            type: 'statute',
            id: 'bd-penal-code-1860',
            title: 'The Penal Code, 1860',
            titleBn: 'দণ্ডবিধি, ১৮৬০',
            subtitle: 'Foundational criminal offenses, murder, theft, fraud and penalties',
            tag: 'Criminal Law',
            jurisdiction: 'Bangladesh',
            jurisdictionCode: 'BD',
            sourceStatus: 'Official Government Source',
            url: '/law/bd-penal-code-1860'
          },
          {
            type: 'statute',
            id: 'bd-constitution-1972',
            title: 'The Constitution of Bangladesh',
            titleBn: 'গণপ্রজাতন্ত্রী বাংলাদেশের সংবিধান',
            subtitle: 'Fundamental Rights, Article 102 High Court Writs & Rule of Law',
            tag: 'Constitutional Law',
            jurisdiction: 'Bangladesh',
            jurisdictionCode: 'BD',
            sourceStatus: 'Official Government Source',
            url: '/law/bd-constitution-1972'
          },
          {
            type: 'statute',
            id: 'int-udhr-1948',
            title: 'Universal Declaration of Human Rights (UDHR)',
            titleBn: 'মানবাধিকারের সার্বজনীন ঘোষণাপত্র',
            subtitle: 'Global milestone establishing 30 universal human rights',
            tag: 'Human Rights',
            jurisdiction: 'International',
            jurisdictionCode: 'INT',
            sourceStatus: 'Official Treaty Source',
            url: '/law/int-udhr-1948'
          }
        ],
        sections: [
          {
            type: 'section',
            id: 'bd-constitution-1972-art-102',
            title: 'Article 102: Powers of High Court Division to issue certain orders and directions, etc. (Writs)',
            subtitle: 'Constitutional remedies: Habeas Corpus, Mandamus, Certiorari, Prohibition, Quo Warranto',
            tag: 'BD Constitution',
            jurisdiction: 'Bangladesh',
            jurisdictionCode: 'BD',
            parentStatute: 'The Constitution of Bangladesh',
            url: '/law/bd-constitution-1972?section=Article%20102'
          },
          {
            type: 'section',
            id: 'bd-penal-code-1860-sec-300',
            title: 'Section 300: Murder (খুন)',
            subtitle: 'Legal definitions, mental intention, and 5 statutory exceptions reducing murder to culpable homicide',
            tag: 'BD Penal Code',
            jurisdiction: 'Bangladesh',
            jurisdictionCode: 'BD',
            parentStatute: 'The Penal Code, 1860',
            url: '/law/bd-penal-code-1860?section=Section%20300'
          }
        ],
        concepts: [
          {
            type: 'concept',
            id: 'concept-habeas-corpus',
            title: 'Habeas Corpus (Produce the Body)',
            titleBn: 'হেবিয়াস কর্পাস',
            subtitle: 'Constitutional prerogative writ ordering immediate release from unlawful detention',
            tag: 'Constitutional Doctrine',
            url: '/concepts#habeas-corpus'
          },
          {
            type: 'concept',
            id: 'concept-mens-rea',
            title: 'Mens Rea (Guilty Mind)',
            titleBn: 'অপরাধমূলক মানসিকতা',
            subtitle: 'The essential mental intent element required to establish criminal liability',
            tag: 'Criminal Principle',
            url: '/concepts#mens-rea'
          }
        ],
        categories: [
          {
            type: 'category',
            id: 'criminal-law',
            title: 'Criminal Law & Penal Codifications',
            subtitle: 'Offenses, investigations, bail, police procedure, trial and sentencing',
            tag: 'Jurisdiction: BD / INT',
            url: '/category/criminal-law'
          }
        ]
      };
    }

    const statutes: SearchResultItem[] = [];
    const sections: SearchResultItem[] = [];
    const concepts: SearchResultItem[] = [];
    const categories: SearchResultItem[] = [];

    // 1. Filter Statutes & Acts
    LAWS_DATABASE.forEach((law) => {
      const matchTitle =
        law.title.toLowerCase().includes(trimmed) ||
        law.shortTitle.toLowerCase().includes(trimmed) ||
        (law.titleBn && law.titleBn.toLowerCase().includes(trimmed));
      const matchKeywords = law.keywords?.some((k) => k.toLowerCase().includes(trimmed));
      const matchOverview = law.overview?.toLowerCase().includes(trimmed);

      if (matchTitle || matchKeywords || matchOverview) {
        statutes.push({
          type: 'statute',
          id: law.id,
          title: law.title,
          titleBn: law.titleBn,
          subtitle: law.simpleSummary || law.overview.slice(0, 100) + '...',
          tag: law.category,
          jurisdiction: law.jurisdiction,
          jurisdictionCode: law.jurisdictionCode || (law.jurisdiction === 'Bangladesh' ? 'BD' : 'INT'),
          sourceStatus: law.sourceReliabilityStatus || (law.jurisdiction === 'Bangladesh' ? 'Official Government Source' : 'Official Treaty Source'),
          url: `/law/${law.id}`
        });
      }

      // 2. Filter Sections within Law
      law.sections.forEach((sec) => {
        const secNumMatch = sec.number.toLowerCase().includes(trimmed);
        const secTitleMatch = sec.title.toLowerCase().includes(trimmed);
        const secTitleBnMatch = sec.titleBn && sec.titleBn.toLowerCase().includes(trimmed);
        const secContentMatch = sec.content?.toLowerCase().includes(trimmed);
        const secExpMatch = sec.simpleExplanation?.toLowerCase().includes(trimmed);

        if (secNumMatch || secTitleMatch || secTitleBnMatch || secContentMatch || secExpMatch) {
          sections.push({
            type: 'section',
            id: `${law.id}-${sec.number}`,
            title: `${sec.number}: ${sec.title}`,
            titleBn: sec.titleBn,
            subtitle: sec.simpleExplanation || sec.content.slice(0, 90) + '...',
            tag: `${law.jurisdictionCode || (law.jurisdiction === 'Bangladesh' ? 'BD' : 'INT')} • ${law.shortTitle || law.title.slice(0, 20)}`,
            jurisdiction: law.jurisdiction,
            jurisdictionCode: law.jurisdictionCode || (law.jurisdiction === 'Bangladesh' ? 'BD' : 'INT'),
            parentStatute: law.title,
            url: `/law/${law.id}?section=${encodeURIComponent(sec.number)}`
          });
        }
      });
    });

    // 3. Filter Legal Concepts & Doctrines
    LEGAL_CONCEPTS_DATA.forEach((concept) => {
      const matchName =
        concept.name.toLowerCase().includes(trimmed) ||
        (concept.nameBn && concept.nameBn.toLowerCase().includes(trimmed)) ||
        (concept.latinName && concept.latinName.toLowerCase().includes(trimmed));
      const matchDef =
        concept.definition.toLowerCase().includes(trimmed) ||
        concept.simpleExplanation.toLowerCase().includes(trimmed);

      if (matchName || matchDef) {
        concepts.push({
          type: 'concept',
          id: concept.id,
          title: concept.name,
          titleBn: concept.nameBn,
          subtitle: concept.simpleExplanation,
          tag: concept.category,
          url: `/concepts#${concept.slug}`
        });
      }
    });

    // Match Glossary Terms into concepts if not already matched
    GLOSSARY_TERMS.forEach((term) => {
      const matchTerm =
        term.term.toLowerCase().includes(trimmed) ||
        (term.termBn && term.termBn.toLowerCase().includes(trimmed));
      const matchDef = term.definition.toLowerCase().includes(trimmed);

      if ((matchTerm || matchDef) && !concepts.some((c) => c.title.toLowerCase().includes(term.term.toLowerCase()))) {
        concepts.push({
          type: 'concept',
          id: `term-${term.term.toLowerCase().replace(/\s+/g, '-')}`,
          title: `${term.term}${term.termBn ? ` (${term.termBn})` : ''}`,
          subtitle: term.simpleExplanation || term.definition,
          tag: term.category || 'Legal Term',
          url: `/glossary?search=${encodeURIComponent(term.term)}`
        });
      }
    });

    // 4. Filter Categories & Taxonomies
    LEGAL_CATEGORIES_DATA.forEach((cat) => {
      const matchTitle =
        cat.title.toLowerCase().includes(trimmed) ||
        (cat.titleBn && cat.titleBn.toLowerCase().includes(trimmed));
      const matchDesc = cat.description.toLowerCase().includes(trimmed);

      if (matchTitle || matchDesc) {
        categories.push({
          type: 'category',
          id: cat.id,
          title: cat.title,
          titleBn: cat.titleBn,
          subtitle: cat.description,
          tag: `${cat.primaryJurisdiction} Repository`,
          url: `/category/${cat.slug}`
        });
      }
    });

    return {
      statutes: statutes.slice(0, 4),
      sections: sections.slice(0, 6),
      concepts: concepts.slice(0, 3),
      categories: categories.slice(0, 2)
    };
  }, [query]);

  // Flattened array of all active results for unified arrow key navigation
  const flatResults = useMemo<SearchResultItem[]>(() => {
    return [
      ...groupedResults.statutes,
      ...groupedResults.sections,
      ...groupedResults.concepts,
      ...groupedResults.categories
    ];
  }, [groupedResults]);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (item: SearchResultItem) => {
    if (query.trim()) {
      saveSearchQuery(query.trim());
    } else {
      saveSearchQuery(item.title.split(':')[0].trim());
    }
    setIsOpen(false);
    onClose?.();
    router.push(item.url);
  };

  const handleExecuteSearch = (searchVal: string) => {
    const q = searchVal.trim();
    if (!q) return;
    saveSearchQuery(q);
    setIsOpen(false);
    onClose?.();
    router.push(`/search?q=${encodeURIComponent(q)}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1 < flatResults.length ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 >= 0 ? prev - 1 : flatResults.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (flatResults[selectedIndex] && query.trim()) {
        handleSelect(flatResults[selectedIndex]);
      } else if (query.trim()) {
        handleExecuteSearch(query);
      }
    }
  };

  // Helper to render an item row
  const renderItemRow = (item: SearchResultItem, flatIndex: number) => {
    const isSelected = flatIndex === selectedIndex;

    return (
      <button
        key={`${item.type}-${item.id}`}
        id={`search-result-item-${flatIndex}`}
        type="button"
        onClick={() => handleSelect(item)}
        onMouseEnter={() => setSelectedIndex(flatIndex)}
        className={`w-full text-left p-2.5 rounded-xl transition-all flex items-start justify-between group ${
          isSelected
            ? 'bg-amber-500/10 dark:bg-zinc-800 text-zinc-900 dark:text-white ring-1 ring-amber-500/30'
            : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900/60'
        }`}
      >
        <div className="flex items-start space-x-3 pr-2 min-w-0">
          <div
            className={`p-2 rounded-lg mt-0.5 shrink-0 ${
              item.type === 'statute'
                ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                : item.type === 'section'
                ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20'
                : item.type === 'concept'
                ? 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20'
                : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
            }`}
          >
            {item.type === 'statute' ? (
              <Scale className="w-4 h-4" />
            ) : item.type === 'section' ? (
              <BookOpen className="w-4 h-4" />
            ) : item.type === 'concept' ? (
              <Sparkles className="w-4 h-4" />
            ) : (
              <FolderTree className="w-4 h-4" />
            )}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center space-x-2 flex-wrap">
              <p className="text-sm font-semibold leading-snug truncate text-zinc-900 dark:text-zinc-100">
                {item.title}
              </p>
              {item.titleBn && (
                <span className="text-xs text-zinc-500 dark:text-zinc-400 font-normal">
                  ({item.titleBn})
                </span>
              )}
            </div>
            {item.subtitle && (
              <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-1 mt-0.5">
                {item.parentStatute && (
                  <span className="text-zinc-400 dark:text-zinc-500 font-medium mr-1">
                    [{item.parentStatute}]
                  </span>
                )}
                {item.subtitle}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-2 shrink-0 ml-2">
          {item.jurisdictionCode && (
            <span
              className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded border ${
                item.jurisdictionCode === 'BD'
                  ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/30'
                  : 'bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/30'
              }`}
            >
              {item.jurisdictionCode}
            </span>
          )}
          <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 hidden sm:inline-block">
            {item.tag}
          </span>
          {isSelected && <CornerDownLeft className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400 shrink-0" />}
        </div>
      </button>
    );
  };

  return (
    <div className={`relative ${isModal ? 'w-full' : 'w-full max-w-xl'}`} id="global-search-container">
      {/* Search Input Bar */}
      <div className="relative flex items-center">
        <div className="absolute left-3.5 text-zinc-400 dark:text-zinc-500 pointer-events-none">
          <Search className="w-4 h-4" />
        </div>
        <input
          ref={inputRef}
          id="global-search-input"
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
            setSelectedIndex(0);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search statutes, section headings, or legal doctrines (e.g. Section 300, UDHR, Mens Rea)..."
          className="w-full pl-10 pr-20 py-2.5 text-sm bg-zinc-100 dark:bg-zinc-900/80 text-zinc-900 dark:text-zinc-100 placeholder-zinc-500 dark:placeholder-zinc-400 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 transition-all shadow-inner"
        />
        <div className="absolute right-3 flex items-center space-x-1.5">
          {query ? (
            <button
              type="button"
              id="clear-search-input-btn"
              onClick={(e) => {
                e.stopPropagation();
                setQuery('');
                inputRef.current?.focus();
              }}
              className="text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 p-0.5 rounded transition-colors"
              aria-label="Clear search input"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          ) : (
            <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-300 dark:border-zinc-700">
              ⌘K
            </span>
          )}
        </div>
      </div>

      {/* Autocomplete & Search History Dropdown */}
      {isOpen && (
        <div
          ref={dropdownRef}
          id="global-search-dropdown"
          className="absolute left-0 right-0 top-full mt-2 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800/90 rounded-2xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150"
        >
          {/* Recent Searches Section (Last 5 Queries) */}
          {!query.trim() && history.length > 0 && (
            <div id="search-history-container" className="p-3 bg-zinc-50/80 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800/80">
              <div className="flex items-center justify-between text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-2 px-1">
                <div className="flex items-center space-x-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-500" />
                  <span>Recent Searches (History)</span>
                </div>
                <button
                  type="button"
                  id="clear-all-history-btn"
                  onClick={() => clearSearchHistory()}
                  className="text-[11px] text-zinc-400 hover:text-rose-500 dark:hover:text-rose-400 transition-colors flex items-center space-x-1"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>Clear All</span>
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {history.map((histQuery, hIdx) => (
                  <div
                    key={`hist-${hIdx}-${histQuery}`}
                    id={`search-history-item-${hIdx}`}
                    className="inline-flex items-center rounded-lg bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs text-zinc-800 dark:text-zinc-200 shadow-sm overflow-hidden group hover:border-amber-500/40"
                  >
                    <button
                      type="button"
                      onClick={() => {
                        setQuery(histQuery);
                        handleExecuteSearch(histQuery);
                      }}
                      className="px-2.5 py-1 hover:text-amber-600 dark:hover:text-amber-400 transition-colors flex items-center space-x-1"
                    >
                      <History className="w-3 h-3 text-zinc-400 group-hover:text-amber-500" />
                      <span className="font-medium">{histQuery}</span>
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeSearchHistoryItem(histQuery);
                      }}
                      aria-label={`Remove ${histQuery} from history`}
                      className="p-1 text-zinc-400 hover:text-rose-500 dark:hover:text-rose-400 hover:bg-zinc-100 dark:hover:bg-zinc-700 border-l border-zinc-200 dark:border-zinc-700 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Header metadata */}
          <div className="px-4 py-2 bg-zinc-50 dark:bg-zinc-900/40 border-b border-zinc-200 dark:border-zinc-800/80 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
            <span className="font-medium">
              {query ? `Suggestions grouped for "${query}"` : 'Recommended Statutory Starting Points'}
            </span>
            <span className="text-[11px] text-zinc-400">Use ↑↓ to navigate • ↵ to select</span>
          </div>

          {/* Grouped Autocomplete Suggestions List */}
          <div className="max-h-[380px] overflow-y-auto p-2 space-y-3">
            {flatResults.length > 0 ? (
              <>
                {/* 1. STATUTES & ACTS GROUP */}
                {groupedResults.statutes.length > 0 && (
                  <div className="space-y-1">
                    <div className="flex items-center space-x-1.5 px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                      <Scale className="w-3 h-3" />
                      <span>Statutes & Acts ({groupedResults.statutes.length})</span>
                    </div>
                    {groupedResults.statutes.map((item) => {
                      const flatIndex = flatResults.indexOf(item);
                      return renderItemRow(item, flatIndex);
                    })}
                  </div>
                )}

                {/* 2. SECTION HEADINGS GROUP */}
                {groupedResults.sections.length > 0 && (
                  <div className="space-y-1 pt-1">
                    <div className="flex items-center space-x-1.5 px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400">
                      <BookOpen className="w-3 h-3" />
                      <span>Section Headings & Articles ({groupedResults.sections.length})</span>
                    </div>
                    {groupedResults.sections.map((item) => {
                      const flatIndex = flatResults.indexOf(item);
                      return renderItemRow(item, flatIndex);
                    })}
                  </div>
                )}

                {/* 3. LEGAL CONCEPTS & DOCTRINES GROUP */}
                {groupedResults.concepts.length > 0 && (
                  <div className="space-y-1 pt-1">
                    <div className="flex items-center space-x-1.5 px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-purple-700 dark:text-purple-400">
                      <Sparkles className="w-3 h-3" />
                      <span>Legal Concepts & Maxims ({groupedResults.concepts.length})</span>
                    </div>
                    {groupedResults.concepts.map((item) => {
                      const flatIndex = flatResults.indexOf(item);
                      return renderItemRow(item, flatIndex);
                    })}
                  </div>
                )}

                {/* 4. LEGAL CATEGORIES & TAXONOMIES GROUP */}
                {groupedResults.categories.length > 0 && (
                  <div className="space-y-1 pt-1">
                    <div className="flex items-center space-x-1.5 px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                      <FolderTree className="w-3 h-3" />
                      <span>Legal Taxonomy ({groupedResults.categories.length})</span>
                    </div>
                    {groupedResults.categories.map((item) => {
                      const flatIndex = flatResults.indexOf(item);
                      return renderItemRow(item, flatIndex);
                    })}
                  </div>
                )}
              </>
            ) : (
              <div className="p-8 text-center text-zinc-500 dark:text-zinc-400">
                <p className="text-sm">No exact statute or section found for &quot;{query}&quot;.</p>
                <button
                  type="button"
                  id="search-deep-query-btn"
                  onClick={() => handleExecuteSearch(query)}
                  className="mt-3 inline-flex items-center space-x-1.5 text-xs text-amber-600 dark:text-amber-400 hover:underline font-medium px-3 py-1.5 bg-amber-500/10 rounded-lg border border-amber-500/20"
                >
                  <span>Search full statutory texts and commentaries</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>

          {/* Footer Quick Action */}
          {query && (
            <div className="p-2.5 bg-zinc-50 dark:bg-zinc-900/60 border-t border-zinc-200 dark:border-zinc-800/80 flex items-center justify-between text-xs">
              <span className="text-zinc-500 dark:text-zinc-400">Looking for full-text search?</span>
              <button
                type="button"
                id="search-view-all-btn"
                onClick={() => handleExecuteSearch(query)}
                className="text-amber-600 dark:text-amber-400 font-bold hover:underline inline-flex items-center space-x-1"
              >
                <span>View all results for &quot;{query}&quot;</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
