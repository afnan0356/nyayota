'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search,
  X,
  BookOpen,
  Globe,
  Scale,
  ArrowRight,
  CornerDownLeft,
  Sparkles,
  History,
  Trash2,
  Clock
} from 'lucide-react';
import { LAWS_DATABASE, GLOSSARY_TERMS } from '@/lib/legal-data';
import {
  getSearchHistory,
  saveSearchQuery,
  removeSearchHistoryItem,
  clearSearchHistory
} from '@/lib/search-history';

interface SearchResultItem {
  type: 'law' | 'section' | 'term' | 'category';
  id: string;
  title: string;
  subtitle?: string;
  tag: string;
  jurisdiction?: 'Bangladesh' | 'International';
  url: string;
}

export function GlobalSearch({ isModal = false, onClose }: { isModal?: boolean; onClose?: () => void }) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [history, setHistory] = useState<string[]>(() => getSearchHistory());
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Subscribe to search history changes
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

  // Keyboard shortcut Cmd+K / Ctrl+K
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

  // Autocomplete matching computed memo
  const results = useMemo<SearchResultItem[]>(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) {
      // Show default recommended starting points
      return [
        {
          type: 'law',
          id: 'bd-penal-code-1860',
          title: 'The Penal Code, 1860 (দণ্ডবিধি)',
          subtitle: 'Foundational criminal offenses, murder, theft, fraud and penalties',
          tag: 'Criminal Law',
          jurisdiction: 'Bangladesh',
          url: '/law/bd-penal-code-1860'
        },
        {
          type: 'law',
          id: 'bd-constitution-1972',
          title: 'The Constitution of Bangladesh (সংবিধান)',
          subtitle: 'Fundamental Rights, Article 102 High Court Writs & Rule of Law',
          tag: 'Constitutional',
          jurisdiction: 'Bangladesh',
          url: '/law/bd-constitution-1972'
        },
        {
          type: 'law',
          id: 'int-udhr-1948',
          title: 'Universal Declaration of Human Rights (UDHR)',
          subtitle: 'Global milestone establishing 30 universal human rights',
          tag: 'Human Rights',
          jurisdiction: 'International',
          url: '/law/int-udhr-1948'
        },
        {
          type: 'term',
          id: 'mens-rea',
          title: 'Mens Rea (অপরাধমূলক মানসিকতা)',
          subtitle: 'The fundamental mental intention required for criminal guilt',
          tag: 'Legal Maxim',
          url: '/ai-assistant?term=Mens+Rea'
        }
      ];
    }

    const matches: SearchResultItem[] = [];

    // 1. Match Laws
    LAWS_DATABASE.forEach((law) => {
      const matchTitle = law.title.toLowerCase().includes(trimmed) || law.titleBn.toLowerCase().includes(trimmed);
      const matchKeywords = law.keywords.some((k) => k.toLowerCase().includes(trimmed));
      const matchOverview = law.overview.toLowerCase().includes(trimmed);

      if (matchTitle || matchKeywords || matchOverview) {
        matches.push({
          type: 'law',
          id: law.id,
          title: `${law.title} (${law.titleBn})`,
          subtitle: law.simpleSummary,
          tag: law.category,
          jurisdiction: law.jurisdiction,
          url: `/law/${law.id}`
        });
      }

      // Check sections within law
      law.sections.forEach((sec) => {
        const matchSec =
          sec.number.toLowerCase().includes(trimmed) ||
          sec.title.toLowerCase().includes(trimmed) ||
          (sec.titleBn && sec.titleBn.toLowerCase().includes(trimmed)) ||
          sec.content.toLowerCase().includes(trimmed);
        if (matchSec) {
          matches.push({
            type: 'section',
            id: `${law.id}-${sec.number}`,
            title: `${sec.number}: ${sec.title}`,
            subtitle: `In ${law.title} • ${sec.simpleExplanation}`,
            tag: `${law.jurisdiction} Section`,
            jurisdiction: law.jurisdiction,
            url: `/law/${law.id}?section=${encodeURIComponent(sec.number)}`
          });
        }
      });
    });

    // 2. Match Glossary Terms
    GLOSSARY_TERMS.forEach((term) => {
      if (
        term.term.toLowerCase().includes(trimmed) ||
        (term.termBn && term.termBn.toLowerCase().includes(trimmed)) ||
        term.definition.toLowerCase().includes(trimmed)
      ) {
        matches.push({
          type: 'term',
          id: term.term,
          title: term.termBn ? `${term.term} (${term.termBn})` : term.term,
          subtitle: term.simpleExplanation,
          tag: 'Glossary Term',
          url: `/ai-assistant?term=${encodeURIComponent(term.term)}`
        });
      }
    });

    return matches.slice(0, 8);
  }, [query]);

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
      saveSearchQuery(item.title.split('(')[0].trim());
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
      setSelectedIndex((prev) => (prev + 1 < results.length ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 >= 0 ? prev - 1 : results.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (results[selectedIndex] && query.trim()) {
        handleSelect(results[selectedIndex]);
      } else if (query.trim()) {
        handleExecuteSearch(query);
      }
    }
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
          placeholder="Search laws, sections, topics, or terms (e.g. Murder, Section 300, UDHR)..."
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
            <span>{query ? `Suggestions for "${query}"` : 'Recommended Legal Gateways'}</span>
            <span className="text-[11px]">Use ↑↓ to navigate • ↵ to select</span>
          </div>

          {/* Results List */}
          <div className="max-h-[360px] overflow-y-auto divide-y divide-zinc-100 dark:divide-zinc-900 p-1.5">
            {results.length > 0 ? (
              results.map((item, idx) => {
                const isSelected = idx === selectedIndex;
                return (
                  <button
                    key={`${item.type}-${item.id}`}
                    id={`search-result-item-${idx}`}
                    type="button"
                    onClick={() => handleSelect(item)}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`w-full text-left p-2.5 rounded-xl transition-all flex items-start justify-between group ${
                      isSelected
                        ? 'bg-amber-50 dark:bg-zinc-800/90 text-zinc-900 dark:text-white shadow-sm'
                        : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900/60'
                    }`}
                  >
                    <div className="flex items-start space-x-3 pr-2">
                      <div
                        className={`p-2 rounded-lg mt-0.5 shrink-0 ${
                          item.type === 'law'
                            ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                            : item.type === 'section'
                            ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20'
                            : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                        }`}
                      >
                        {item.type === 'law' ? (
                          <Scale className="w-4 h-4" />
                        ) : item.type === 'section' ? (
                          <BookOpen className="w-4 h-4" />
                        ) : (
                          <Sparkles className="w-4 h-4" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <p className="text-sm font-semibold leading-snug">{item.title}</p>
                        </div>
                        {item.subtitle && (
                          <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-1 mt-0.5">{item.subtitle}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 shrink-0 ml-2">
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
                        {item.tag}
                      </span>
                      {isSelected && <CornerDownLeft className="w-3.5 h-3.5 text-zinc-400" />}
                    </div>
                  </button>
                );
              })
            ) : (
              <div className="p-8 text-center text-zinc-500 dark:text-zinc-400">
                <p className="text-sm">No exact match found for &quot;{query}&quot; in the core database.</p>
                <button
                  type="button"
                  id="search-deep-query-btn"
                  onClick={() => handleExecuteSearch(query)}
                  className="mt-3 inline-flex items-center space-x-1.5 text-xs text-amber-600 dark:text-amber-400 hover:underline font-medium px-3 py-1.5 bg-amber-500/10 rounded-lg border border-amber-500/20"
                >
                  <span>Search across full texts and commentaries</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>

          {/* Footer Quick Action */}
          {query && (
            <div className="p-2.5 bg-zinc-50 dark:bg-zinc-900/60 border-t border-zinc-200 dark:border-zinc-800/80 flex items-center justify-between text-xs">
              <span className="text-zinc-500 dark:text-zinc-400">Looking for advanced cross-statutory filters?</span>
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
