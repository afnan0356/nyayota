'use client';

import React from 'react';
import Link from 'next/link';
import { Scale, Globe, Shield, BookOpen, AlertTriangle, HeartHandshake, Compass } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full border-t border-zinc-200 dark:border-zinc-800/80 bg-zinc-50 dark:bg-zinc-950/95 text-zinc-600 dark:text-zinc-400 transition-colors">
      {/* Educational Notice Banner */}
      <div className="border-b border-zinc-200 dark:border-zinc-800/60 bg-amber-500/5 dark:bg-amber-500/[0.03]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-2 text-amber-700 dark:text-amber-400 font-medium">
            <AlertTriangle className="w-4 h-4 shrink-0 text-amber-500" />
            <span>
              <strong>Educational Legal Resource:</strong> Nyayota provides public legal texts, research tools, and educational summaries. We are not a law firm and do not provide legal advice.
            </span>
          </div>
          <Link
            href="/disclaimer"
            id="footer-read-disclaimer-btn"
            className="text-amber-700 dark:text-amber-400 hover:underline shrink-0 font-semibold"
          >
            Read Full Disclaimer →
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 lg:gap-12">
          {/* Col 1: Brand & Purpose */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-600 flex items-center justify-center text-white">
                <Scale className="w-4 h-4" />
              </div>
              <span className="text-xl font-bold text-zinc-900 dark:text-white">Nyayota</span>
            </Link>
            <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 max-w-sm">
              An open, public legal knowledge and research platform making laws searchable, comparable, and understandable for citizens, students, researchers, journalists, and legal professionals globally.
            </p>
            <div className="flex items-center space-x-2 text-xs text-zinc-500 dark:text-zinc-500">
              <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-zinc-200 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 font-medium border border-zinc-300 dark:border-zinc-800">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Launch Version 1.0 (BD & International)</span>
              </span>
            </div>
          </div>

          {/* Col 2: Legal Repositories */}
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-200">
              Legal Libraries
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/international-laws"
                  id="footer-nav-international-laws"
                  className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                >
                  International Treaties
                </Link>
              </li>
              <li>
                <Link
                  href="/bangladesh-laws"
                  id="footer-nav-bangladesh-laws"
                  className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                >
                  Bangladesh Code & Acts
                </Link>
              </li>
              <li>
                <Link
                  href="/legal-outcome-guide"
                  id="footer-nav-outcome-guide"
                  className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                >
                  Legal Outcome Guide
                </Link>
              </li>
              <li>
                <Link
                  href="/ai-assistant"
                  id="footer-nav-ai-assistant"
                  className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                >
                  AI Explainer & Glossary
                </Link>
              </li>
              <li>
                <Link
                  href="/roadmap"
                  id="footer-nav-roadmap"
                  className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                >
                  Jurisdiction Roadmap
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Organization & Mission */}
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-200">
              About Nyayota
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/about"
                  id="footer-nav-about-us"
                  className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                >
                  About Us & Mission
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  id="footer-nav-contact-us"
                  className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                >
                  Contact & Support
                </Link>
              </li>
              <li>
                <Link
                  href="/roadmap"
                  id="footer-nav-roadmap-secondary"
                  className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                >
                  Project Roadmap
                </Link>
              </li>
              <li>
                <Link
                  href="/accessibility"
                  id="footer-nav-accessibility"
                  className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                >
                  Accessibility Standards
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Trust & Legal Documents */}
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-200">
              Governance & Policies
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/disclaimer"
                  id="footer-nav-disclaimer"
                  className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                >
                  Disclaimer
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  id="footer-nav-terms"
                  className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  id="footer-nav-privacy"
                  className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/accessibility"
                  id="footer-nav-accessibility-sec"
                  className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                >
                  WCAG Accessibility
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Subfooter */}
        <div className="mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 dark:text-zinc-400">
          <p>© {new Date().getFullYear()} Nyayota Legal Knowledge Platform. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <span className="flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Public Knowledge Project</span>
            </span>
            <span>No authentication required at launch</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
