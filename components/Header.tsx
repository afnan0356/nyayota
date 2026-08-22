'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Scale,
  Sun,
  Moon,
  Globe,
  BookOpen,
  Sparkles,
  MapPin,
  Compass,
  Menu,
  X,
  FileText,
  HelpCircle,
  ShieldCheck,
  Search,
  Bookmark,
  Layers,
  ArrowLeftRight
} from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import { GlobalSearch } from '@/components/GlobalSearch';
import { BookmarkDrawer } from '@/components/BookmarkDrawer';
import { getLocalBookmarks } from '@/lib/bookmarks';

export function Header() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [bookmarkDrawerOpen, setBookmarkDrawerOpen] = useState(false);
  const [bookmarkCount, setBookmarkCount] = useState(0);

  useEffect(() => {
    const updateCount = () => {
      setBookmarkCount(getLocalBookmarks().length);
    };
    updateCount();
    window.addEventListener('nyayota-bookmarks-updated', updateCount);
    window.addEventListener('storage', updateCount);
    return () => {
      window.removeEventListener('nyayota-bookmarks-updated', updateCount);
      window.removeEventListener('storage', updateCount);
    };
  }, []);

  const navLinks = [
    { href: '/discover', label: 'Discover', icon: Compass },
    { href: '/search', label: 'Search', icon: Search },
    { href: '/bangladesh-laws', label: 'BD Laws', icon: Scale },
    { href: '/international-laws', label: 'International', icon: Globe },
    { href: '/categories', label: 'Categories', icon: Layers },
    { href: '/knowledge-paths', label: 'Paths', icon: Layers },
    { href: '/concepts', label: 'Concepts', icon: BookOpen },
    { href: '/legal-outcome-guide', label: 'Outcome Guide', icon: Compass },
    { href: '/research', label: 'Research', icon: FileText },
    { href: '/ai-assistant', label: 'AI Assistant', icon: Sparkles },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200/80 dark:border-zinc-800/80 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
        {/* Left Side: Brand Logo */}
        <div className="flex items-center space-x-3 shrink-0">
          <Link
            href="/"
            id="header-brand-logo"
            className="flex items-center space-x-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-lg p-1"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center shadow-md shadow-amber-500/20 text-white group-hover:scale-105 transition-transform">
              <Scale className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                Nyayota
              </span>
              <span className="text-[10px] tracking-wider uppercase font-semibold text-zinc-500 dark:text-zinc-400">
                Legal Research Platform
              </span>
            </div>
          </Link>
        </div>

        {/* Center: Global Search Bar (Desktop) */}
        <div className="hidden xl:flex flex-1 max-w-sm mx-2">
          <GlobalSearch />
        </div>

        {/* Right Side: Main Navigation, Bookmarks & Theme Toggle (Desktop) */}
        <div className="hidden lg:flex items-center space-x-1 shrink-0">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                id={`header-nav-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center space-x-1.5 ${
                  isActive
                    ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 shadow-sm font-semibold'
                    : 'text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{link.label}</span>
              </Link>
            );
          })}

          <div className="h-4 w-px bg-zinc-300 dark:bg-zinc-800 mx-1.5" />

          {/* Bookmarks Toggle */}
          <button
            type="button"
            id="header-bookmarks-toggle-btn"
            onClick={() => setBookmarkDrawerOpen(true)}
            aria-label="Open saved bookmarks"
            className="relative p-2 rounded-lg text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            <Bookmark className="w-4 h-4" />
            {bookmarkCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-500 text-zinc-950 font-bold text-[10px] flex items-center justify-center shadow-sm">
                {bookmarkCount}
              </span>
            )}
          </button>

          {/* Theme Toggle */}
          <button
            type="button"
            id="header-theme-toggle-btn"
            onClick={toggleTheme}
            aria-label="Toggle visual theme"
            className="p-2 rounded-lg text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-zinc-700" />
            )}
          </button>
        </div>

        {/* Mobile Controls (Search + Bookmark + Theme + Hamburger) */}
        <div className="flex lg:hidden items-center space-x-1.5">
          <button
            type="button"
            id="mobile-search-toggle-btn"
            onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
            className="p-2 rounded-lg text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900"
            aria-label="Open search bar"
          >
            <Search className="w-4 h-4" />
          </button>

          <button
            type="button"
            id="mobile-bookmarks-btn"
            onClick={() => setBookmarkDrawerOpen(true)}
            className="relative p-2 rounded-lg text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900"
            aria-label="Open saved bookmarks"
          >
            <Bookmark className="w-4 h-4" />
            {bookmarkCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-500 text-zinc-950 font-bold text-[9px] flex items-center justify-center">
                {bookmarkCount}
              </span>
            )}
          </button>

          <button
            type="button"
            id="mobile-theme-toggle-btn"
            onClick={toggleTheme}
            className="p-2 rounded-lg text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            type="button"
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900"
            aria-label="Open menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Search Expandable Area */}
      {mobileSearchOpen && (
        <div className="lg:hidden px-4 pb-3 pt-1 border-t border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-950/95">
          <GlobalSearch isModal onClose={() => setMobileSearchOpen(false)} />
        </div>
      )}

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="lg:hidden border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-4 py-4 space-y-3 shadow-xl animate-in slide-in-from-top-2"
        >
          <div className="space-y-1">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 px-3 py-1">
              Legal Libraries & Systems
            </p>
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 font-semibold'
                      : 'text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-900'
                  }`}
                >
                  <Icon className="w-4 h-4 text-amber-500" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="border-t border-zinc-200 dark:border-zinc-800 pt-3 space-y-1">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 px-3 py-1">
              Information & Governance
            </p>
            <div className="grid grid-cols-2 gap-1 text-xs">
              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900"
              >
                About Us
              </Link>
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900"
              >
                Contact
              </Link>
              <Link
                href="/disclaimer"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900"
              >
                Legal Disclaimer
              </Link>
              <Link
                href="/accessibility"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900"
              >
                Accessibility
              </Link>
              <Link
                href="/terms"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900"
              >
                Terms of Service
              </Link>
              <Link
                href="/privacy"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Local Bookmarks Drawer */}
      <BookmarkDrawer isOpen={bookmarkDrawerOpen} onClose={() => setBookmarkDrawerOpen(false)} />
    </header>
  );
}

