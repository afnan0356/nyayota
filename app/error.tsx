'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RotateCcw, Home, BookOpen } from 'lucide-react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorBoundary({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log error cleanly for diagnosis without exposing internals to the user
    console.error('Nyayota caught an application boundary error:', error.message);
  }, [error]);

  return (
    <div
      role="alert"
      className="flex-1 w-full min-h-[65vh] flex flex-col items-center justify-center p-6 text-center max-w-xl mx-auto space-y-6"
    >
      <div className="w-16 h-16 rounded-3xl bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30 flex items-center justify-center shadow-lg shadow-amber-500/5">
        <AlertTriangle className="w-8 h-8" />
      </div>

      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">
          Temporary System Interruption
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-md">
          An unexpected error occurred while preparing this legal view. The statutory database and search services remain fully accessible.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        <button
          type="button"
          onClick={() => reset()}
          className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs shadow-md shadow-amber-500/20 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Try Again</span>
        </button>

        <Link
          href="/"
          className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 font-semibold text-xs border border-zinc-200 dark:border-zinc-700 transition-colors"
        >
          <Home className="w-4 h-4" />
          <span>Home</span>
        </Link>

        <Link
          href="/bangladesh-laws"
          className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 font-semibold text-xs border border-zinc-200 dark:border-zinc-700 transition-colors"
        >
          <BookOpen className="w-4 h-4" />
          <span>Browse Laws</span>
        </Link>
      </div>

      <p className="text-[11px] text-zinc-500 dark:text-zinc-500 pt-4 border-t border-zinc-200 dark:border-zinc-800 w-full">
        If this issue persists, please report it to{' '}
        <a href="mailto:nyayota.contact@gmail.com" className="underline hover:text-amber-500">
          nyayota.contact@gmail.com
        </a>
      </p>
    </div>
  );
}
