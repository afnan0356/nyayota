'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import {
  Scale,
  Sun,
  Moon,
  Globe,
  BookOpen,
  Sparkles,
  Compass,
  Menu,
  X,
  FileText,
  Search,
  Bookmark,
  Layers,
  ArrowLeftRight
} from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import { GlobalSearch } from '@/components/GlobalSearch';
import { BookmarkDrawer } from '@/components/BookmarkDrawer';
import { getLocalBookmarks } from '@/lib/bookmarks';
import {
  TRANSITION_FAST,
  popoverVariants,
  navContainerVariants,
  navItemVariants,
  fastStaggerContainerVariants,
  staggerItemVariants,
} from '@/lib/motion';

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

  const primaryNavLinks = [
    { href: '/discover', label: 'Discover' },
    { href: '/search', label: 'Search' },
    { href: '/bangladesh-laws', label: 'Bangladesh Code' },
    { href: '/international-laws', label: 'International Treaties' },
    { href: '/categories', label: 'Categories' },
    { href: '/concepts', label: 'Concepts & Maxims' },
    { href: '/legal-outcome-guide', label: 'Outcome Guide' },
    { href: '/research', label: 'Research' },
    { href: '/ai-assistant', label: 'AI Explainer' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200/90 dark:border-zinc-800 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left Side: Brand Logo */}
        <div className="flex items-center space-x-3 shrink-0">
          <Link
            href="/"
            id="header-brand-logo"
            className="flex items-center space-x-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 rounded-lg py-1"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
              className="w-8 h-8 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 flex items-center justify-center font-bold shadow-xs"
            >
              <Scale className="w-4 h-4" />
            </motion.div>
            <div className="flex flex-col">
              <div className="flex items-center space-x-1.5">
                <span className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-100 font-serif">
                  Nyayota
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">
                  Legal
                </span>
              </div>
              <span className="text-[10px] tracking-wide text-zinc-500 dark:text-zinc-400 font-medium">
                Public Legal Knowledge
              </span>
            </div>
          </Link>
        </div>

        {/* Center: Global Search Bar (Desktop) */}
        <div className="hidden xl:flex flex-1 max-w-xs 2xl:max-w-sm mx-2">
          <GlobalSearch />
        </div>

        {/* Right Side: Main Navigation, Bookmarks & Theme Toggle (Desktop) */}
        <div className="hidden lg:flex items-center space-x-1 shrink-0">
          <motion.nav
            variants={navContainerVariants}
            initial="hidden"
            animate="visible"
            aria-label="Main statutory navigation"
            className="flex items-center space-x-1"
          >
            {primaryNavLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <motion.div
                  key={link.href}
                  variants={navItemVariants}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.12, ease: 'easeOut' }}
                >
                  <Link
                    href={link.href}
                    id={`header-nav-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                    className={`relative px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors block ${
                      isActive
                        ? 'text-zinc-950 dark:text-white bg-zinc-100 dark:bg-zinc-800/90 font-semibold shadow-xs'
                        : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-900/60'
                    }`}
                  >
                    <span>{link.label}</span>
                  </Link>
                </motion.div>
              );
            })}
          </motion.nav>

          <div className="h-4 w-px bg-zinc-200 dark:bg-zinc-800 mx-1.5" />

          {/* Bookmarks Toggle */}
          <motion.button
            whileTap={{ scale: 0.92 }}
            type="button"
            id="header-bookmarks-toggle-btn"
            onClick={() => setBookmarkDrawerOpen(true)}
            aria-label="Open saved bookmarks"
            className="relative p-2 rounded-lg text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800/80 transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-400"
          >
            <Bookmark className="w-4 h-4" />
            <AnimatePresence>
              {bookmarkCount > 0 && (
                <motion.span
                  key="bookmark-badge"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                  className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-600 dark:bg-amber-500 text-white dark:text-zinc-950 font-bold text-[10px] flex items-center justify-center shadow-xs"
                >
                  {bookmarkCount}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Theme Toggle */}
          <motion.button
            whileTap={{ scale: 0.9, rotate: 15 }}
            type="button"
            id="header-theme-toggle-btn"
            onClick={toggleTheme}
            aria-label="Toggle visual theme"
            className="p-2 rounded-lg text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800/80 transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-400"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-zinc-300 hover:text-white transition-transform" />
            ) : (
              <Moon className="w-4 h-4 text-zinc-700 hover:text-zinc-950 transition-transform" />
            )}
          </motion.button>
        </div>

        {/* Mobile Controls (Search + Bookmark + Theme + Hamburger) */}
        <div className="flex lg:hidden items-center space-x-1">
          <motion.button
            whileTap={{ scale: 0.9 }}
            type="button"
            id="mobile-search-toggle-btn"
            onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
            className="p-2 rounded-lg text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            aria-label="Open search bar"
          >
            <Search className="w-4 h-4" />
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.9 }}
            type="button"
            id="mobile-bookmarks-btn"
            onClick={() => setBookmarkDrawerOpen(true)}
            className="relative p-2 rounded-lg text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            aria-label="Open saved bookmarks"
          >
            <Bookmark className="w-4 h-4" />
            {bookmarkCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-600 dark:bg-amber-500 text-white dark:text-zinc-950 font-bold text-[9px] flex items-center justify-center">
                {bookmarkCount}
              </span>
            )}
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.9, rotate: 15 }}
            type="button"
            id="mobile-theme-toggle-btn"
            onClick={toggleTheme}
            className="p-2 rounded-lg text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.9 }}
            type="button"
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            aria-label="Open menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Search Expandable Area */}
      <AnimatePresence>
        {mobileSearchOpen && (
          <motion.div
            key="mobile-search-area"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={TRANSITION_FAST}
            className="lg:hidden px-4 pb-3 pt-1 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-hidden"
          >
            <GlobalSearch isModal onClose={() => setMobileSearchOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            key="mobile-nav-drawer"
            id="mobile-nav-drawer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={TRANSITION_FAST}
            className="lg:hidden border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-4 py-4 space-y-3 shadow-xl overflow-hidden"
          >
            <motion.div
              variants={fastStaggerContainerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-1"
            >
              <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 px-3 py-1">
                Legal Libraries & Research
              </p>
              {primaryNavLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div key={link.href} variants={staggerItemVariants}>
                    <Link
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-950 dark:text-white font-semibold'
                          : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900'
                      }`}
                    >
                      <span>{link.label}</span>
                    </Link>
                  </motion.div>
                );
              })}
              <motion.div variants={staggerItemVariants}>
                <Link
                  href="/knowledge-paths"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900"
                >
                  <span>Learning Paths</span>
                </Link>
              </motion.div>
            </motion.div>

            <div className="border-t border-zinc-200 dark:border-zinc-800 pt-3 space-y-1">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 px-3 py-1">
                Governance & Policies
              </p>
              <div className="grid grid-cols-2 gap-1 text-xs">
                <Link
                  href="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-lg text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900"
                >
                  About Mission
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
          </motion.div>
        )}
      </AnimatePresence>

      {/* Local Bookmarks Drawer */}
      <BookmarkDrawer isOpen={bookmarkDrawerOpen} onClose={() => setBookmarkDrawerOpen(false)} />
    </header>
  );
}

