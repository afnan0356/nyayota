'use client';

import React, { useState } from 'react';
import { ExternalLink, Copy, Check, Scale, Globe } from 'lucide-react';
import { DeterministicSourceCitation, SourceCompleteness } from '@/lib/nyayota-ai/types';

interface CitationCardProps {
  citation: DeterministicSourceCitation;
  className?: string;
}

function getCompletenessBadge(completeness: SourceCompleteness) {
  switch (completeness) {
    case 'curated-section-subset':
      return {
        label: 'Curated Provision',
        color: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20',
      };
    case 'full-statutory-text':
      return {
        label: 'Full Statutory Text',
        color: 'bg-teal-500/10 text-teal-700 dark:text-teal-400 border-teal-500/20',
      };
    case 'catalog-metadata-only':
      return {
        label: 'Catalog Metadata',
        color: 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20',
      };
    case 'conceptual-definition':
      return {
        label: 'Glossary Definition',
        color: 'bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/20',
      };
    case 'procedural-guide':
      return {
        label: 'Procedural Roadmap',
        color: 'bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-300 dark:border-zinc-700',
      };
    default:
      return {
        label: 'Verified Source',
        color: 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700',
      };
  }
}

/**
 * Validates that an official URL is genuine and safe to link
 */
export function isVerifiedOfficialUrl(url?: string): boolean {
  if (!url || typeof url !== 'string') return false;
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') return false;
    const host = parsed.hostname.toLowerCase();
    return (
      host.includes('minlaw.gov.bd') ||
      host.includes('bdlaws.minlaw.gov.bd') ||
      host.includes('treaties.un.org') ||
      host.includes('un.org') ||
      host.includes('supremecourt.gov.bd')
    );
  } catch {
    return false;
  }
}

export function CitationCard({ citation, className = '' }: CitationCardProps) {
  const [copied, setCopied] = useState(false);
  const badge = getCompletenessBadge(citation.sourceCompleteness);
  const isOfficialVerified = isVerifiedOfficialUrl(citation.officialUrl);

  const formatCopyableCitation = () => {
    const parts: string[] = [];
    parts.push(citation.title);
    if (citation.identifier) {
      parts.push(citation.identifier);
    }
    if (citation.officialGazetteRef) {
      parts.push(citation.officialGazetteRef);
    }
    parts.push(`Jurisdiction: ${citation.jurisdiction}`);
    if (citation.officialUrl && isOfficialVerified) {
      parts.push(`Official Source: ${citation.officialUrl}`);
    }
    return parts.join(', ');
  };

  const handleCopy = async () => {
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(formatCopyableCitation());
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (e) {
      console.error('Failed to copy citation:', e);
    }
  };

  return (
    <div
      className={`p-3.5 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs shadow-xs space-y-2.5 transition-all ${className}`}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center space-x-2">
          {citation.jurisdiction === 'International' ? (
            <Globe className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
          ) : (
            <Scale className="w-3.5 h-3.5 text-amber-500 shrink-0" />
          )}
          <span className="font-bold text-zinc-900 dark:text-zinc-100">
            {citation.title}
          </span>
          {citation.identifier && (
            <span className="px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-700 dark:text-amber-400 font-semibold font-mono text-[11px] border border-amber-500/20">
              {citation.identifier}
            </span>
          )}
        </div>

        <span
          className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border ${badge.color}`}
        >
          {badge.label}
        </span>
      </div>

      {citation.titleBn && (
        <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-bangla">
          {citation.titleBn}
        </p>
      )}

      {citation.verbatimExcerpt && (
        <div className="p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 text-[11px] text-zinc-700 dark:text-zinc-300 font-serif italic">
          &ldquo;{citation.verbatimExcerpt.slice(0, 240)}{citation.verbatimExcerpt.length > 240 ? '...' : ''}&rdquo;
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-zinc-100 dark:border-zinc-800/60 text-[11px]">
        <div className="text-zinc-500 dark:text-zinc-400">
          <span>Jurisdiction: <strong>{citation.jurisdiction}</strong></span>
          {citation.status && (
            <span className="ml-2 px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-[10px] text-zinc-500 font-medium">
              {citation.status}
            </span>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 font-medium transition-colors"
            title="Copy plain citation string"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-emerald-500" />
                <span className="text-emerald-600 dark:text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span>Copy Citation</span>
              </>
            )}
          </button>

          {isOfficialVerified && citation.officialUrl && (
            <a
              href={citation.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-400 font-medium border border-amber-500/20 transition-colors"
              title="Open verified government/treaty source in new tab"
            >
              <span>Official Source</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
