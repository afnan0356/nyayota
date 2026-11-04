import React from 'react';

export default function Loading() {
  return (
    <div
      role="status"
      aria-label="Loading legal records"
      className="flex-1 w-full min-h-[60vh] flex flex-col items-center justify-center p-6 space-y-4"
    >
      <div className="relative flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-2 border-zinc-200 dark:border-zinc-800 border-t-amber-500 animate-spin" />
        <div className="absolute w-6 h-6 rounded-full bg-amber-500/10" />
      </div>
      <div className="text-center space-y-1">
        <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          Loading Legal Intelligence...
        </p>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Retrieving statutory provisions and verified repositories
        </p>
      </div>
    </div>
  );
}
