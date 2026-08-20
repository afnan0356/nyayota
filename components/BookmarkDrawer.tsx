'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Bookmark, X, Trash2, ExternalLink, BookOpen, AlertCircle } from 'lucide-react';
import { getLocalBookmarks, toggleLocalBookmark, LocalBookmark } from '@/lib/bookmarks';

interface BookmarkDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BookmarkDrawer({ isOpen, onClose }: BookmarkDrawerProps) {
  const [bookmarks, setBookmarks] = useState<LocalBookmark[]>(() => {
    if (typeof window === 'undefined') return [];
    return getLocalBookmarks();
  });

  useEffect(() => {
    const handleStorageChange = () => {
      setBookmarks(getLocalBookmarks());
    };
    // Sync on open or update
    if (isOpen) {
      handleStorageChange();
    }
    window.addEventListener('nyayota-bookmarks-updated', handleStorageChange);
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('nyayota-bookmarks-updated', handleStorageChange);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleRemove = (law: LocalBookmark) => {
    toggleLocalBookmark({
      lawId: law.lawId,
      lawTitle: law.lawTitle,
      lawTitleBn: law.lawTitleBn,
      jurisdiction: law.jurisdiction,
      category: law.category,
      sectionNumber: law.sectionNumber,
      sectionTitle: law.sectionTitle
    });
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="bookmark-drawer-title"
      className="fixed inset-0 z-50 overflow-hidden bg-zinc-950/70 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div className="absolute inset-0" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between bg-zinc-50/50 dark:bg-zinc-950/50">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30 flex items-center justify-center">
                <Bookmark className="w-5 h-5 fill-amber-500 text-amber-500" />
              </div>
              <div>
                <h3 id="bookmark-drawer-title" className="text-base font-bold text-zinc-900 dark:text-white">
                  Saved Laws & Provisions
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  {bookmarks.length} {bookmarks.length === 1 ? 'law saved locally' : 'laws saved locally'} (No login needed)
                </p>
              </div>
            </div>
            <button
              type="button"
              id="close-bookmark-drawer"
              onClick={onClose}
              aria-label="Close bookmarks drawer"
              className="p-2 rounded-xl text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {bookmarks.length === 0 ? (
              <div className="text-center py-16 px-4 space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-zinc-400 flex items-center justify-center mx-auto">
                  <Bookmark className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-bold text-zinc-800 dark:text-zinc-200">
                  No Saved Laws Yet
                </h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-xs mx-auto">
                  Click the bookmark icon on any statute or section to save it for offline and quick legal research.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {bookmarks.map((b) => (
                  <div
                    key={b.id}
                    className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 hover:border-amber-500/40 transition-all space-y-2 group"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-1">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-zinc-200/60 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 inline-block">
                          {b.category} • {b.jurisdiction}
                        </span>
                        <h4 className="text-sm font-bold text-zinc-900 dark:text-white leading-snug">
                          {b.lawTitle}
                        </h4>
                        {b.sectionNumber && (
                          <span className="text-xs font-bold text-amber-600 dark:text-amber-400 block">
                            {b.sectionNumber}: {b.sectionTitle}
                          </span>
                        )}
                        {b.lawTitleBn && (
                          <p className="text-xs font-bangla text-zinc-500">
                            {b.lawTitleBn}
                          </p>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => handleRemove(b)}
                        aria-label={`Remove ${b.lawTitle} from bookmarks`}
                        className="p-1.5 text-zinc-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="pt-2 flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800/80 text-xs">
                      <span className="text-[10px] text-zinc-400">
                        Saved: {new Date(b.savedAt).toLocaleDateString()}
                      </span>

                      <Link
                        href={`/law/${b.lawId}${b.sectionNumber ? `?section=${encodeURIComponent(b.sectionNumber)}` : ''}`}
                        onClick={onClose}
                        className="text-amber-600 dark:text-amber-400 font-bold hover:underline inline-flex items-center space-x-1"
                      >
                        <span>Open Law</span>
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/50 flex items-center justify-between text-xs text-zinc-500">
            <span className="inline-flex items-center space-x-1 text-[11px]">
              <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
              <span>Saved locally in browser</span>
            </span>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 font-bold transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
