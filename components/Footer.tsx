'use client';

import React from 'react';
import Link from 'next/link';
import { Scale, Heart, ArrowRight } from 'lucide-react';
import { DONATION_CONFIG } from '@/lib/donation-config';

/**
 * DONATION & SUPPORT CONFIGURATION
 * 
 * Backed by centralized /lib/donation-config.ts with verified crypto addresses.
 */
export const SUPPORT_DONATION_CONFIG = {
  isConfigured: DONATION_CONFIG.isConfigured,
  donationUrl: DONATION_CONFIG.donationUrl,
  contactEmail: DONATION_CONFIG.contactEmail,
};

export function Footer() {
  return (
    <footer className="w-full border-t border-zinc-200 dark:border-zinc-800 bg-zinc-100/60 dark:bg-zinc-950 text-zinc-600 dark:text-zinc-400 transition-colors">
      {/* Educational Notice Banner */}
      <div className="border-b border-zinc-200/80 dark:border-zinc-800 bg-amber-50/70 dark:bg-amber-950/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-2 text-zinc-800 dark:text-zinc-300 font-medium">
            <span className="font-bold text-amber-800 dark:text-amber-400 uppercase tracking-wide text-[10px] px-1.5 py-0.5 rounded bg-amber-200/60 dark:bg-amber-900/40 border border-amber-300 dark:border-amber-800">
              Notice
            </span>
            <span>
              Nyayota is an educational project providing law texts and plain-language summaries. It does not provide legal advice or representation.
            </span>
          </div>
          <Link
            href="/disclaimer"
            id="footer-read-disclaimer-btn"
            className="text-amber-800 dark:text-amber-400 hover:underline shrink-0 font-semibold text-xs"
          >
            Read Disclaimer →
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 lg:gap-12">
          {/* Col 1: Brand & Purpose */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center space-x-2.5">
              <div className="w-7 h-7 rounded-md bg-zinc-900 dark:bg-zinc-100 flex items-center justify-center text-white dark:text-zinc-900 font-bold">
                <Scale className="w-3.5 h-3.5" />
              </div>
              <span className="text-lg font-bold text-zinc-900 dark:text-zinc-100 font-serif">Nyayota</span>
            </Link>
            <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400 max-w-sm">
              An open legal information project making statutes, court procedures, and international treaties easier to search, read, and understand.
            </p>
            <div className="pt-1 flex items-center space-x-2 text-xs text-zinc-500">
              <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded bg-zinc-200/60 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 font-medium text-[11px] border border-zinc-300/60 dark:border-zinc-800">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400" />
                <span>Open Access Legal Project</span>
              </span>
            </div>
          </div>

          {/* Col 2: Legal Resources */}
          <div className="space-y-3">
            <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-200 font-mono">
              Legal Resources
            </p>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href="/bangladesh-laws"
                  id="footer-nav-bangladesh-laws"
                  className="hover:text-zinc-950 dark:hover:text-white transition-colors"
                >
                  Bangladesh Laws
                </Link>
              </li>
              <li>
                <Link
                  href="/international-laws"
                  id="footer-nav-international-laws"
                  className="hover:text-zinc-950 dark:hover:text-white transition-colors"
                >
                  International Treaties
                </Link>
              </li>
              <li>
                <Link
                  href="/legal-outcome-guide"
                  id="footer-nav-outcome-guide"
                  className="hover:text-zinc-950 dark:hover:text-white transition-colors"
                >
                  Procedural Guides
                </Link>
              </li>
              <li>
                <Link
                  href="/ai-assistant"
                  id="footer-nav-ai-assistant"
                  className="hover:text-zinc-950 dark:hover:text-white transition-colors"
                >
                  AI Legal Assistant
                </Link>
              </li>
              <li>
                <Link
                  href="/concepts"
                  id="footer-nav-concepts"
                  className="hover:text-zinc-950 dark:hover:text-white transition-colors"
                >
                  Legal Concepts & Maxims
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: About & Project */}
          <div className="space-y-3">
            <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-200 font-mono">
              About
            </p>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href="/about"
                  id="footer-nav-about-us"
                  className="hover:text-zinc-950 dark:hover:text-white transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/research"
                  id="footer-nav-research"
                  className="hover:text-zinc-950 dark:hover:text-white transition-colors"
                >
                  Methodology
                </Link>
              </li>
              <li>
                <Link
                  href="/roadmap"
                  id="footer-nav-roadmap"
                  className="hover:text-zinc-950 dark:hover:text-white transition-colors"
                >
                  Roadmap
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  id="footer-nav-contact-us"
                  className="hover:text-zinc-950 dark:hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/accessibility"
                  id="footer-nav-accessibility"
                  className="hover:text-zinc-950 dark:hover:text-white transition-colors"
                >
                  Accessibility
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Legal & Policies */}
          <div className="space-y-3">
            <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-200 font-mono">
              Legal
            </p>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href="/disclaimer"
                  id="footer-nav-disclaimer"
                  className="hover:text-zinc-950 dark:hover:text-white transition-colors"
                >
                  Disclaimer
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  id="footer-nav-terms"
                  className="hover:text-zinc-950 dark:hover:text-white transition-colors"
                >
                  Terms
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  id="footer-nav-privacy"
                  className="hover:text-zinc-950 dark:hover:text-white transition-colors"
                >
                  Privacy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Phase 2: Understated "Support Nyayota" Section */}
        <div className="mt-10 pt-8 border-t border-zinc-200 dark:border-zinc-800/80">
          <div className="rounded-2xl p-5 sm:p-6 bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/90 dark:border-zinc-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-1.5 max-w-2xl">
              <div className="flex items-center space-x-2">
                <Heart className="w-4 h-4 text-rose-500 fill-rose-500/20" />
                <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                  Support Nyayota
                </h4>
                <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-zinc-200/70 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                  Voluntary Contribution
                </span>
              </div>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Help keep Nyayota accessible and support the continued development of legal information, verified statutory indexes, and public research resources.
              </p>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-500">
                Nyayota is an independent educational and civic project. Voluntary support assists with infrastructure maintenance and data verification.
              </p>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row items-start sm:items-center gap-3">
              {SUPPORT_DONATION_CONFIG.isConfigured && SUPPORT_DONATION_CONFIG.donationUrl ? (
                <Link
                  href={SUPPORT_DONATION_CONFIG.donationUrl}
                  id="footer-donate-btn"
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs inline-flex items-center space-x-2 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                >
                  <span>Support Nyayota</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              ) : (
                <div className="flex flex-col sm:flex-row sm:items-center gap-2.5">
                  <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-zinc-200/60 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-400 text-xs border border-zinc-300/50 dark:border-zinc-700/50">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    <span className="text-[11px] font-medium">Donation gateway: Setup in progress</span>
                  </div>
                  <a
                    href={`mailto:${SUPPORT_DONATION_CONFIG.contactEmail}?subject=Support%20Nyayota%20Inquiry`}
                    id="footer-support-inquiry-link"
                    className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:text-amber-600 dark:hover:text-amber-400 underline underline-offset-4 transition-colors focus:outline-none focus:ring-1 focus:ring-amber-500"
                  >
                    Inquire via Email
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Subfooter */}
        <div className="mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} Nyayota. Open legal information project.</p>
          <div className="flex items-center space-x-4">
            <span className="text-[11px]">Primary sources: Official Gazette of Bangladesh and UN Treaty Series.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
