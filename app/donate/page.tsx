'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Heart,
  Copy,
  Check,
  AlertTriangle,
  ShieldCheck,
  QrCode,
  Info,
  ArrowLeft,
  Lock,
  Building2,
  Smartphone,
  CreditCard,
  ExternalLink,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';
import QRCode from 'qrcode';
import {
  DONATION_CONFIG,
  CRYPTO_NETWORKS,
  CryptoNetworkConfig,
  CRYPTO_COMPACT_INSTRUCTIONS,
  PLANNED_BANK_COUNTRIES,
  OTHER_METHODS_INSTRUCTION,
  PAYMENT_CATEGORIES,
  PaymentCategoryInfo,
  BITCOIN_ADDRESS,
  EVM_ADDRESS
} from '@/lib/donation-config';

// View navigation types
type DonateView = 'categories' | 'crypto-list' | 'crypto-detail' | 'bank-roadmap' | 'other-methods';

// ============================================================================
// Brand SVG Icons (Exact geometry, brand colors, zero-dependency)
// ============================================================================

function BitcoinLogo({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="16" cy="16" r="16" fill="#F7931A" />
      <path
        d="M22.84 13.91c.32-2.14-1.31-3.29-3.54-4.06l.72-2.9-1.77-.44-.7 2.81c-.47-.12-.95-.23-1.42-.34l.71-2.83-1.77-.44-.72 2.9c-.38-.09-.76-.17-1.12-.26l.01-.03-2.44-.61-.47 1.89s1.31.3 1.28.32c.72.18.85.66.83 1.04l-.83 3.33c.05.01.11.03.18.06l-.18-.04-1.16 4.67c-.09.22-.31.55-.81.43.02.03-1.28-.32-1.28-.32l-.88 2.03 2.3.57c.43.11.85.22 1.27.32l-.73 2.94 1.77.44.72-2.9c.48.13.95.25 1.41.36l-.72 2.87 1.77.44.73-2.93c3.02.57 5.29.34 6.25-2.39.77-2.2-.04-3.47-1.63-4.3 1.16-.27 2.03-1.03 2.27-2.61zm-4.05 5.7c-.55 2.2-4.26 1.01-5.46.71l.97-3.91c1.2.3 5.06.89 4.49 3.2zm.55-5.74c-.5 2.01-3.6 1-4.6.74l.88-3.55c1 .25 4.23.72 3.72 2.81z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

function EthereumLogo({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="16" cy="16" r="16" fill="#627EEA" />
      <g fill="#FFFFFF">
        <polygon points="16,5 15.86,5.48 15.86,20.08 16,20.22 22.5,16.38" fillOpacity="0.8" />
        <polygon points="16,5 9.5,16.38 16,20.22 16,5" />
        <polygon points="16,21.57 15.91,21.68 15.91,26.79 16,27 22.5,17.74" fillOpacity="0.8" />
        <polygon points="16,27 16,21.57 9.5,17.74" />
        <polygon points="16,20.22 22.5,16.38 16,13.62" fillOpacity="0.5" />
        <polygon points="9.5,16.38 16,20.22 16,13.62" fillOpacity="0.65" />
      </g>
    </svg>
  );
}

function BnbLogo({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="16" cy="16" r="16" fill="#F0B90B" />
      <path
        d="M16 8l3.18 3.18-7.64 7.64-3.18-3.18L16 8zm4.77 4.77l3.18 3.18-3.18 3.18-3.18-3.18 3.18-3.18zm-9.54 0L14.41 16l-3.18 3.18-3.18-3.18 3.18-3.18zM16 24l-3.18-3.18 7.64-7.64L23.64 16.36 16 24zm0-6.36L14.41 16 16 14.41 17.59 16 16 17.64z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

function BinancePayLogo({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <div className={`rounded-xl bg-[#F0B90B]/10 border border-[#F0B90B]/30 flex items-center justify-center p-1.5 ${className}`}>
      <BnbLogo className="w-full h-full" />
    </div>
  );
}

function PaypalLogo({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="32" height="32" rx="8" fill="#003087" />
      <path
        d="M21.2 10.3c-.3 2.1-1.6 3.6-3.8 3.6h-2.1l-.8 5.2h-3.2l2.3-14.2h5c1.8 0 2.9.9 2.6 5.4zm-4.3 2.3c1 0 1.6-.6 1.8-1.5.1-.9-.4-1.4-1.3-1.4h-1.8l-.5 2.9h1.8z"
        fill="#0079C1"
      />
      <path
        d="M18.8 12.8c-.3 2.1-1.6 3.6-3.8 3.6h-2.1l-.8 5.2h-3.2l2.3-14.2h5c1.8 0 2.9.9 2.6 5.4zm-4.3 2.3c1 0 1.6-.6 1.8-1.5.1-.9-.4-1.4-1.3-1.4h-1.8l-.5 2.9h1.8z"
        fill="#00457C"
        opacity="0.6"
      />
    </svg>
  );
}

function StripeLogo({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="32" height="32" rx="8" fill="#635BFF" />
      <path
        d="M16.7 13.4c-.9-.4-1.5-.7-1.5-1.1 0-.4.4-.7 1.2-.7 1.3 0 2.6.4 3.7 1.1l.8-2.6c-1.3-.7-2.8-1-4.5-1-3.3 0-5.2 1.7-5.2 4.1 0 2.8 3.9 3.2 3.9 4.3 0 .5-.5.8-1.4.8-1.6 0-3.2-.6-4.4-1.6l-.9 2.7c1.4.9 3.2 1.4 5.3 1.4 3.5 0 5.4-1.6 5.4-4.2-.1-3-4-3.5-4-4.2z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

function CashAppLogo({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="32" height="32" rx="8" fill="#00D632" />
      <path
        d="M17.4 12.3c-.6-.4-1.4-.7-2.3-.7-1.1 0-1.8.5-1.8 1.3 0 .8.8 1.1 2.3 1.5 2.5.6 3.9 1.5 3.9 3.5 0 2.3-1.8 3.6-4.3 3.8v1.3h-1.8v-1.3c-1.3-.1-2.4-.6-3.2-1.3l.9-1.9c.7.6 1.7 1 2.5 1 1.2 0 1.9-.5 1.9-1.3 0-.8-.7-1.1-2.3-1.6-2.4-.6-3.8-1.5-3.8-3.4 0-2.1 1.7-3.5 4-3.7V8.5h1.8v1.3c1.1.1 2 .5 2.7 1l-.6 1.5z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

export default function DonatePage() {
  // Navigation view state
  const [currentView, setCurrentView] = useState<DonateView>('categories');
  const [selectedNetworkId, setSelectedNetworkId] = useState<CryptoNetworkConfig['id']>('bitcoin');

  // Copy feedback state
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);
  const [copyError, setCopyError] = useState<string | null>(null);
  const [qrSvg, setQrSvg] = useState<string>('');

  const activeNetwork =
    CRYPTO_NETWORKS.find((n) => n.id === selectedNetworkId) || CRYPTO_NETWORKS[0];

  // Generate offline local vector SVG QR code for the selected address
  useEffect(() => {
    let isCurrent = true;

    QRCode.toString(activeNetwork.address, {
      type: 'svg',
      margin: 2,
      width: 176,
      color: {
        dark: '#18181b', // zinc-900
        light: '#ffffff',
      },
      errorCorrectionLevel: 'M',
    })
      .then((svg) => {
        if (isCurrent) {
          setQrSvg(svg);
        }
      })
      .catch((err) => {
        console.error('Failed to generate local QR SVG:', err);
      });

    return () => {
      isCurrent = false;
    };
  }, [activeNetwork.address]);

  const handleCopy = async (address: string) => {
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(address);
        setCopiedAddress(address);
        setCopyError(null);
        setTimeout(() => setCopiedAddress(null), 2500);
      } else {
        throw new Error('Clipboard API not available');
      }
    } catch {
      setCopyError('Unable to copy automatically. Please select and copy the address manually.');
      setTimeout(() => setCopyError(null), 4000);
    }
  };

  // Helper to open specific crypto detail
  const handleSelectCryptoMethod = (id: CryptoNetworkConfig['id']) => {
    setSelectedNetworkId(id);
    setCurrentView('crypto-detail');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Top Navigation Bar & Breadcrumb */}
      <nav aria-label="Donation navigation breadcrumb" className="flex items-center space-x-2 text-xs">
        <Link
          href="/"
          className="inline-flex items-center space-x-1 font-semibold text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors rounded-lg px-1.5 py-0.5 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Home</span>
        </Link>

        {currentView !== 'categories' && (
          <>
            <span className="text-zinc-400">/</span>
            <button
              type="button"
              onClick={() => setCurrentView('categories')}
              className="font-semibold text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors rounded-lg px-1.5 py-0.5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-500/50"
            >
              Support Nyayota
            </button>
          </>
        )}

        {currentView === 'crypto-detail' && (
          <>
            <span className="text-zinc-400">/</span>
            <button
              type="button"
              onClick={() => setCurrentView('crypto-list')}
              className="font-semibold text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors rounded-lg px-1.5 py-0.5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-500/50"
            >
              Cryptocurrency
            </button>
            <span className="text-zinc-400">/</span>
            <span className="font-bold text-zinc-900 dark:text-zinc-100 px-1">
              {activeNetwork.name}
            </span>
          </>
        )}

        {currentView === 'crypto-list' && (
          <>
            <span className="text-zinc-400">/</span>
            <span className="font-bold text-zinc-900 dark:text-zinc-100 px-1">
              Cryptocurrency Methods
            </span>
          </>
        )}

        {currentView === 'bank-roadmap' && (
          <>
            <span className="text-zinc-400">/</span>
            <span className="font-bold text-zinc-900 dark:text-zinc-100 px-1">
              Bank Transfer Roadmap
            </span>
          </>
        )}

        {currentView === 'other-methods' && (
          <>
            <span className="text-zinc-400">/</span>
            <span className="font-bold text-zinc-900 dark:text-zinc-100 px-1">
              Other Methods Roadmap
            </span>
          </>
        )}
      </nav>

      {/* Main Header Banner */}
      <header className="space-y-4 border-b border-zinc-200 dark:border-zinc-800 pb-8">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 text-xs font-semibold">
          <Heart className="w-3.5 h-3.5 fill-rose-500/30" />
          <span>Voluntary Support & Payment Roadmap</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
          Support Nyayota
        </h1>
        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl">
          Nyayota is an independent civic and educational legal research initiative for Bangladesh. Direct cryptocurrency contributions fund ongoing server hosting, automated test pipelines, and continuous verification of codified legal records.
        </p>

        {/* Status Indicators Legend */}
        <div className="flex flex-wrap items-center gap-3 pt-2 text-xs">
          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Available now (Crypto)</span>
          </span>
          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-300 dark:border-zinc-700 font-semibold">
            <Lock className="w-3 h-3 text-zinc-400" />
            <span>Coming soon</span>
          </span>
          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-700 dark:text-purple-400 border border-purple-500/20 font-semibold">
            <Lock className="w-3 h-3 text-purple-400" />
            <span>Under consideration</span>
          </span>
        </div>
      </header>

      {/* =================================================================== */}
      {/* VIEW 1: CATEGORIES OVERVIEW (ROOT SCREEN)                           */}
      {/* Exactly 4 category cards in strict required order                  */}
      {/* =================================================================== */}
      {currentView === 'categories' && (
        <section aria-labelledby="payment-categories-heading" className="space-y-6">
          <div className="space-y-1">
            <h2 id="payment-categories-heading" className="text-xl font-bold text-zinc-900 dark:text-white">
              Payment Categories
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
              Select an available payment category to proceed, or review our planned payment-rail roadmaps below.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Category 1: Cryptocurrency (AVAILABLE NOW) */}
            <div
              id="category-card-cryptocurrency"
              onClick={() => setCurrentView('crypto-list')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setCurrentView('crypto-list');
                }
              }}
              className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border-2 border-emerald-500/40 hover:border-emerald-500 dark:hover:border-emerald-400 shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between space-y-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <BitcoinLogo className="w-7 h-7" />
                    <EthereumLogo className="w-7 h-7" />
                    <BnbLogo className="w-7 h-7" />
                  </div>
                  <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30 text-xs font-bold">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span>Available now</span>
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-zinc-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors flex items-center justify-between">
                    <span>Cryptocurrency</span>
                    <ChevronRight className="w-5 h-5 text-zinc-400 group-hover:text-emerald-500 group-hover:translate-x-0.5 transition-all" />
                  </h3>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    Direct peer-to-peer transfer of native crypto assets (Bitcoin, Ethereum, BNB). Operational now with verified maintainer wallet addresses.
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                <span>View supported networks (BTC, ETH, BNB)</span>
                <span>&rarr;</span>
              </div>
            </div>

            {/* Category 2: Binance Pay (COMING SOON / LOCKED / NON-INTERACTIVE) */}
            <div
              id="category-card-binance-pay"
              aria-disabled="true"
              className="p-6 rounded-3xl bg-zinc-50/70 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 opacity-80 cursor-not-allowed flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <BinancePayLogo className="w-8 h-8" />
                  <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-300 dark:border-zinc-700 text-xs font-semibold">
                    <Lock className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Coming soon</span>
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-zinc-700 dark:text-zinc-300 flex items-center space-x-2">
                    <span>Binance Pay</span>
                    <Lock className="w-4 h-4 text-zinc-400" />
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    Zero-gas merchant transfers within the Binance ecosystem. Integration planned for a future update. This payment method is not available yet.
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800/60 text-[11px] text-zinc-400 italic">
                Method locked • No merchant payments currently accepted
              </div>
            </div>

            {/* Category 3: Bank transfer (COMING SOON / ROADMAP) */}
            <div
              id="category-card-bank-transfer"
              onClick={() => setCurrentView('bank-roadmap')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setCurrentView('bank-roadmap');
                }
              }}
              className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between space-y-4 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
                    <Building2 className="w-5 h-5 text-amber-500" />
                  </div>
                  <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-300 dark:border-zinc-700 text-xs font-semibold">
                    <Lock className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Coming soon</span>
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-zinc-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors flex items-center justify-between">
                    <span>Bank transfer</span>
                    <ChevronRight className="w-5 h-5 text-zinc-400 group-hover:text-amber-500 group-hover:translate-x-0.5 transition-all" />
                  </h3>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    Direct wire and regional clearing networks. Bank transfers are not operational; click to view planned country coverage roadmap.
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs text-zinc-600 dark:text-zinc-400 font-semibold group-hover:text-amber-600 dark:group-hover:text-amber-400">
                <span>View planned country coverage roadmap</span>
                <span>&rarr;</span>
              </div>
            </div>

            {/* Category 4: Other methods (COMING SOON / ROADMAP) */}
            <div
              id="category-card-other-methods"
              onClick={() => setCurrentView('other-methods')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setCurrentView('other-methods');
                }
              }}
              className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between space-y-4 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1.5">
                    <div className="w-8 h-8 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
                      <Smartphone className="w-4 h-4 text-emerald-500" />
                    </div>
                    <PaypalLogo className="w-8 h-8" />
                    <StripeLogo className="w-8 h-8" />
                    <CashAppLogo className="w-8 h-8" />
                  </div>
                  <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-300 dark:border-zinc-700 text-xs font-semibold">
                    <Lock className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Coming soon</span>
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-zinc-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors flex items-center justify-between">
                    <span>Other methods</span>
                    <ChevronRight className="w-5 h-5 text-zinc-400 group-hover:text-amber-500 group-hover:translate-x-0.5 transition-all" />
                  </h3>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    Regional mobile financial services (MFS) and major checkout gateways (PayPal, Stripe, Cash App). Click to view roadmap.
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs text-zinc-600 dark:text-zinc-400 font-semibold group-hover:text-amber-600 dark:group-hover:text-amber-400">
                <span>View local & online payment roadmap</span>
                <span>&rarr;</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* =================================================================== */}
      {/* VIEW 2: CRYPTOCURRENCY METHOD LIST                                  */}
      {/* 3 options: Bitcoin, Ethereum, BNB with back button                  */}
      {/* =================================================================== */}
      {currentView === 'crypto-list' && (
        <section aria-labelledby="crypto-list-heading" className="space-y-6">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setCurrentView('categories')}
              className="inline-flex items-center space-x-2 text-xs font-bold text-zinc-600 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white transition-colors px-3 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Payment Categories</span>
            </button>
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30 text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>Available now</span>
            </span>
          </div>

          <div className="space-y-2">
            <h2 id="crypto-list-heading" className="text-2xl font-bold text-zinc-900 dark:text-white">
              Cryptocurrency Methods
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Select one of the three supported native cryptocurrencies below to view receiving address details, QR code, and step-by-step instructions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Option 1: Bitcoin (BTC) */}
            <button
              type="button"
              id="crypto-option-bitcoin"
              onClick={() => handleSelectCryptoMethod('bitcoin')}
              className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-amber-500 dark:hover:border-amber-400 hover:shadow-md transition-all text-left space-y-4 group cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <div className="flex items-center justify-between">
                <BitcoinLogo className="w-10 h-10" />
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
                  Available
                </span>
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-zinc-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    Bitcoin
                  </h3>
                  <span className="text-xs font-mono font-bold text-zinc-500">BTC</span>
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 font-mono">
                  Bitcoin Mainnet
                </p>
                <p className="text-[11px] text-zinc-400 dark:text-zinc-500">
                  Native SegWit (Bech32)
                </p>
              </div>
              <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs text-amber-600 dark:text-amber-400 font-semibold">
                <span>View address & instructions</span>
                <span>&rarr;</span>
              </div>
            </button>

            {/* Option 2: Ethereum (ETH) */}
            <button
              type="button"
              id="crypto-option-ethereum"
              onClick={() => handleSelectCryptoMethod('ethereum')}
              className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-amber-500 dark:hover:border-amber-400 hover:shadow-md transition-all text-left space-y-4 group cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <div className="flex items-center justify-between">
                <EthereumLogo className="w-10 h-10" />
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
                  Available
                </span>
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-zinc-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    Ethereum
                  </h3>
                  <span className="text-xs font-mono font-bold text-zinc-500">ETH</span>
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 font-mono">
                  Ethereum Mainnet
                </p>
                <p className="text-[11px] text-zinc-400 dark:text-zinc-500">
                  ERC-20 standard
                </p>
              </div>
              <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs text-amber-600 dark:text-amber-400 font-semibold">
                <span>View address & instructions</span>
                <span>&rarr;</span>
              </div>
            </button>

            {/* Option 3: BNB (BNB on BNB Smart Chain) */}
            <button
              type="button"
              id="crypto-option-bnb"
              onClick={() => handleSelectCryptoMethod('binance-smart-chain')}
              className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-amber-500 dark:hover:border-amber-400 hover:shadow-md transition-all text-left space-y-4 group cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <div className="flex items-center justify-between">
                <BnbLogo className="w-10 h-10" />
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
                  Available
                </span>
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-zinc-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    BNB
                  </h3>
                  <span className="text-xs font-mono font-bold text-zinc-500">BNB</span>
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 font-mono">
                  BNB Smart Chain (BSC)
                </p>
                <p className="text-[11px] text-zinc-400 dark:text-zinc-500">
                  BEP-20 standard
                </p>
              </div>
              <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs text-amber-600 dark:text-amber-400 font-semibold">
                <span>View address & instructions</span>
                <span>&rarr;</span>
              </div>
            </button>
          </div>
        </section>
      )}

      {/* =================================================================== */}
      {/* VIEW 3: CRYPTOCURRENCY DETAIL VIEW                                  */}
      {/* Logo, instructions, network name, address, QR, copy button, warning */}
      {/* =================================================================== */}
      {currentView === 'crypto-detail' && (
        <section aria-labelledby="crypto-detail-heading" className="space-y-6">
          {/* Back button to crypto list */}
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setCurrentView('crypto-list')}
              className="inline-flex items-center space-x-2 text-xs font-bold text-zinc-600 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white transition-colors px-3 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Cryptocurrency Methods</span>
            </button>
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30 text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>Available now</span>
            </span>
          </div>

          {/* Main Detail Container */}
          <div className="rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm p-6 sm:p-8 space-y-8">
            {/* Header: Selected Logo, Name, Ticker, and Network Standard */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-6">
              <div className="flex items-center space-x-4">
                {activeNetwork.id === 'bitcoin' && <BitcoinLogo className="w-12 h-12" />}
                {activeNetwork.id === 'ethereum' && <EthereumLogo className="w-12 h-12" />}
                {activeNetwork.id === 'binance-smart-chain' && <BnbLogo className="w-12 h-12" />}
                <div>
                  <h2 id="crypto-detail-heading" className="text-2xl font-extrabold text-zinc-900 dark:text-white">
                    {activeNetwork.name} ({activeNetwork.ticker})
                  </h2>
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                      Network: {activeNetwork.networkName}
                    </span>
                    <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
                      Standard: {activeNetwork.networkStandard}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Network Selector Pills */}
              <div className="flex items-center space-x-1.5 p-1 rounded-xl bg-zinc-100 dark:bg-zinc-800/80">
                {CRYPTO_NETWORKS.map((n) => (
                  <button
                    key={n.id}
                    type="button"
                    onClick={() => setSelectedNetworkId(n.id)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      n.id === selectedNetworkId
                        ? 'bg-white dark:bg-zinc-900 text-zinc-950 dark:text-white shadow-xs'
                        : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200'
                    }`}
                  >
                    {n.ticker}
                  </button>
                ))}
              </div>
            </div>

            {/* Step-by-Step Compact Instructions */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Payment Instructions (Step-by-Step)
              </h3>
              <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                {CRYPTO_COMPACT_INSTRUCTIONS.map((instruction, index) => (
                  <li
                    key={index}
                    className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-1.5"
                  >
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-amber-500 text-zinc-950 text-xs font-extrabold font-mono">
                      {index + 1}
                    </span>
                    <p className="text-[11px] text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
                      {instruction}
                    </p>
                  </li>
                ))}
              </ol>
            </div>

            {/* Address & Offline QR Code Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center pt-2">
              {/* QR Container (4 cols) */}
              <div className="md:col-span-4 flex flex-col items-center justify-center p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-2">
                <div className="p-2 bg-white rounded-xl shadow-xs border border-zinc-200">
                  {!qrSvg ? (
                    <div className="w-44 h-44 flex items-center justify-center text-xs text-zinc-400">
                      Generating QR...
                    </div>
                  ) : (
                    <div
                      className="w-44 h-44 flex items-center justify-center [&>svg]:w-full [&>svg]:h-full"
                      dangerouslySetInnerHTML={{ __html: qrSvg }}
                    />
                  )}
                </div>
                <div className="flex items-center space-x-1 text-[11px] text-zinc-500">
                  <QrCode className="w-3.5 h-3.5" />
                  <span>Raw Address QR Code</span>
                </div>
                <p className="text-[10px] text-zinc-400 dark:text-zinc-500 text-center leading-tight max-w-[200px]">
                  Encodes receiving address string only. Does not auto-configure network ID.
                </p>
              </div>

              {/* Address and Copy Action (8 cols) */}
              <div className="md:col-span-8 space-y-4">
                <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">
                      {activeNetwork.name} ({activeNetwork.networkStandard}) Address:
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 font-mono font-bold">
                      Recommended: {activeNetwork.recommendedAssets}
                    </span>
                  </div>

                  <div
                    id={`crypto-address-text-${activeNetwork.id}`}
                    className="font-mono text-xs sm:text-sm font-bold text-zinc-900 dark:text-zinc-100 break-all select-all p-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800"
                  >
                    {activeNetwork.address}
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                    <button
                      type="button"
                      id={`crypto-copy-btn-${activeNetwork.id}`}
                      onClick={() => handleCopy(activeNetwork.address)}
                      className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs inline-flex items-center space-x-2 transition-all shadow-xs focus:outline-none focus:ring-2 focus:ring-amber-500/50 cursor-pointer"
                      aria-label={`Copy ${activeNetwork.name} address to clipboard`}
                    >
                      {copiedAddress === activeNetwork.address ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-950" />
                          <span>Address Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>Copy Address</span>
                        </>
                      )}
                    </button>

                    {copiedAddress === activeNetwork.address && (
                      <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold animate-in fade-in">
                        Copied exact address to clipboard
                      </span>
                    )}
                    {copyError && (
                      <span className="text-xs text-rose-600 dark:text-rose-400 font-medium">
                        {copyError}
                      </span>
                    )}
                  </div>
                </div>

                {/* Specific Network Warning */}
                <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 text-xs text-amber-900 dark:text-amber-300 space-y-1">
                  <div className="flex items-center space-x-1.5 font-bold">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>Network & Asset Caution:</span>
                  </div>
                  <p className="text-[11px] leading-relaxed">
                    {activeNetwork.networkWarning}
                  </p>
                </div>

                {/* EVM Shared Format Notice */}
                <div className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed bg-zinc-50 dark:bg-zinc-950 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800">
                  <strong>EVM Address Notice:</strong> Ethereum and BNB Smart Chain share the same hexadecimal address format (<code className="font-mono text-zinc-700 dark:text-zinc-300">0xD14b...91E</code>). This shared format does not mean arbitrary Layer-2 tokens or cross-chain transfers are supported. Please transmit only native {activeNetwork.ticker} on {activeNetwork.networkName}.
                </div>
              </div>
            </div>

            {/* Non-Custodial Safety Reminders */}
            <div className="border-t border-zinc-200 dark:border-zinc-800 pt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-1.5">
                <div className="flex items-center space-x-2 font-bold text-zinc-900 dark:text-white">
                  <Lock className="w-4 h-4 text-emerald-500" />
                  <span>Non-Custodial Security</span>
                </div>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-[11px]">
                  Nyayota will never request seed phrases, private keys, or wallet connections. All transactions occur directly in your personal non-custodial wallet.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-1.5">
                <div className="flex items-center space-x-2 font-bold text-zinc-900 dark:text-white">
                  <ShieldCheck className="w-4 h-4 text-amber-500" />
                  <span>Irreversible Broadcasts</span>
                </div>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-[11px]">
                  Blockchain broadcasts cannot be refunded or cancelled once confirmed by network miners. Always check addresses before approving.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* =================================================================== */}
      {/* VIEW 4: BANK TRANSFER ROADMAP                                       */}
      {/* Read-only cards in strict 11-country order, NO checkboxes/surveys   */}
      {/* =================================================================== */}
      {currentView === 'bank-roadmap' && (
        <section aria-labelledby="bank-roadmap-heading" className="space-y-6">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setCurrentView('categories')}
              className="inline-flex items-center space-x-2 text-xs font-bold text-zinc-600 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white transition-colors px-3 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Payment Categories</span>
            </button>
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-300 dark:border-zinc-700 text-xs font-semibold">
              <Lock className="w-3.5 h-3.5 text-zinc-400" />
              <span>Coming soon</span>
            </span>
          </div>

          <div className="space-y-2">
            <h2 id="bank-roadmap-heading" className="text-2xl font-bold text-zinc-900 dark:text-white flex items-center space-x-2">
              <Building2 className="w-6 h-6 text-amber-500" />
              <span>Bank Transfer (Planned Roadmap)</span>
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Bank transfers are being considered for a future update. The countries below indicate planned coverage only; no bank-transfer payments are currently available.
            </p>
          </div>

          {/* Locked Notice Banner */}
          <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/30 text-xs text-amber-800 dark:text-amber-300 flex items-start space-x-3">
            <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <strong>Non-Operational Status:</strong>
              <p className="text-[11px] leading-relaxed">
                Nyayota does not provide bank account numbers, IBANs, SWIFT codes, or wire routing details. The cards below are read-only informational entries illustrating potential future regional coverage.
              </p>
            </div>
          </div>

          {/* Read-Only Informational Country Cards in Strict Order (1 to 11) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              <span>Planned Country Coverage (Read-Only Roadmap)</span>
              <span>11 Countries Evaluated</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {PLANNED_BANK_COUNTRIES.map((country, index) => {
                const isAustria = country.id === 'at';
                return (
                  <div
                    key={country.id}
                    id={`bank-country-card-${country.id}`}
                    className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 space-y-2 opacity-90"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-mono font-bold text-zinc-400">
                          {String(index + 1).padStart(2, '0')}.
                        </span>
                        <span className="text-sm font-bold text-zinc-800 dark:text-zinc-200">
                          {country.name}
                        </span>
                      </div>
                      <Lock className="w-3.5 h-3.5 text-zinc-400" />
                    </div>

                    <div className="flex items-center justify-between text-xs pt-1">
                      <span className="text-[11px] text-zinc-500 font-medium">
                        Region: {country.region}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          isAustria
                            ? 'bg-purple-500/10 text-purple-700 dark:text-purple-400 border border-purple-500/20'
                            : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-300 dark:border-zinc-700'
                        }`}
                      >
                        {country.statusLabel}
                      </span>
                    </div>

                    {country.notes && (
                      <p className="text-[10px] text-zinc-400 dark:text-zinc-500 leading-tight pt-1 border-t border-zinc-200 dark:border-zinc-800">
                        {country.notes}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* =================================================================== */}
      {/* VIEW 5: OTHER METHODS ROADMAP                                       */}
      {/* Local & Mobile Payments + Online Checkout Services                  */}
      {/* =================================================================== */}
      {currentView === 'other-methods' && (
        <section aria-labelledby="other-methods-heading" className="space-y-6">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setCurrentView('categories')}
              className="inline-flex items-center space-x-2 text-xs font-bold text-zinc-600 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white transition-colors px-3 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Payment Categories</span>
            </button>
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-300 dark:border-zinc-700 text-xs font-semibold">
              <Lock className="w-3.5 h-3.5 text-zinc-400" />
              <span>Coming soon</span>
            </span>
          </div>

          <div className="space-y-2">
            <h2 id="other-methods-heading" className="text-2xl font-bold text-zinc-900 dark:text-white">
              Other Payment Methods (Planned Roadmap)
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Overview of planned regional mobile financial services and online checkout gateways.
            </p>
          </div>

          {/* Compact Instructions Banner */}
          <div className="p-4 rounded-2xl bg-zinc-100 dark:bg-zinc-800/60 border border-zinc-300 dark:border-zinc-700 text-xs text-zinc-700 dark:text-zinc-300 flex items-start space-x-3">
            <Lock className="w-5 h-5 text-zinc-500 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <strong className="block text-zinc-900 dark:text-white">Non-Operational Notice</strong>
              <p className="text-xs leading-relaxed font-medium">
                {OTHER_METHODS_INSTRUCTION}
              </p>
            </div>
          </div>

          {/* Section A: Local and Mobile Payments */}
          <div className="rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 space-y-4 shadow-xs">
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
              <div className="flex items-center space-x-2">
                <Smartphone className="w-5 h-5 text-emerald-500" />
                <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                  Local and mobile payments
                </h3>
              </div>
              <span className="inline-flex items-center space-x-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-300 dark:border-zinc-700">
                <Lock className="w-3 h-3 text-zinc-400" />
                <span>Coming soon</span>
              </span>
            </div>

            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Support for regional mobile financial services (MFS) is planned for a future update. No personal phone numbers, agent numbers, or merchant accounts are currently configured.
            </p>

            <div className="space-y-2 pt-1">
              <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider block">
                Illustrative Future Exploration Examples:
              </span>
              <div className="flex flex-wrap gap-2">
                {DONATION_CONFIG.mobilePayments.examples.map((example) => (
                  <span
                    key={example}
                    className="text-xs px-3 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 font-medium inline-flex items-center space-x-1.5"
                  >
                    <Lock className="w-3 h-3 text-zinc-400" />
                    <span>{example}</span>
                  </span>
                ))}
              </div>
              <p className="text-[10px] text-zinc-400 dark:text-zinc-500 pt-1 leading-relaxed">
                {DONATION_CONFIG.mobilePayments.exampleDisclaimer}
              </p>
            </div>
          </div>

          {/* Section B: Online Payment Services (PayPal, Stripe, Cash App) */}
          <div className="rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 space-y-4 shadow-xs">
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
              <div className="flex items-center space-x-2">
                <CreditCard className="w-5 h-5 text-indigo-500" />
                <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                  Online Payment Services
                </h3>
              </div>
              <span className="inline-flex items-center space-x-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-300 dark:border-zinc-700">
                <Lock className="w-3 h-3 text-zinc-400" />
                <span>Coming soon</span>
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* PayPal */}
              <div
                id="other-method-card-paypal"
                className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-2 opacity-80"
              >
                <div className="flex items-center justify-between">
                  <PaypalLogo className="w-7 h-7" />
                  <Lock className="w-4 h-4 text-zinc-400" />
                </div>
                <div className="space-y-0.5">
                  <span className="text-sm font-bold text-zinc-800 dark:text-zinc-200 block">PayPal</span>
                  <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-500 inline-block">
                    Coming soon
                  </span>
                </div>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-tight">
                  No PayPal link, checkout button, or donation pool is currently active.
                </p>
              </div>

              {/* Stripe */}
              <div
                id="other-method-card-stripe"
                className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-2 opacity-80"
              >
                <div className="flex items-center justify-between">
                  <StripeLogo className="w-7 h-7" />
                  <Lock className="w-4 h-4 text-zinc-400" />
                </div>
                <div className="space-y-0.5">
                  <span className="text-sm font-bold text-zinc-800 dark:text-zinc-200 block">Stripe</span>
                  <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-500 inline-block">
                    Coming soon
                  </span>
                </div>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-tight">
                  No credit card processing forms or Stripe Elements checkout are integrated.
                </p>
              </div>

              {/* Cash App */}
              <div
                id="other-method-card-cashapp"
                className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-2 opacity-80"
              >
                <div className="flex items-center justify-between">
                  <CashAppLogo className="w-7 h-7" />
                  <Lock className="w-4 h-4 text-zinc-400" />
                </div>
                <div className="space-y-0.5">
                  <span className="text-sm font-bold text-zinc-800 dark:text-zinc-200 block">Cash App</span>
                  <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-500 inline-block">
                    Coming soon
                  </span>
                </div>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-tight">
                  No $cashtag or Cash App peer-to-peer receiving profile is configured.
                </p>
              </div>
            </div>

            <div className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed bg-zinc-50 dark:bg-zinc-950 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800">
              {DONATION_CONFIG.onlineServices.description}
            </div>
          </div>
        </section>
      )}

      {/* =================================================================== */}
      {/* FOOTER & TRANSPARENCY NOTICE                                        */}
      {/* Common across all views                                            */}
      {/* =================================================================== */}
      <footer className="p-6 rounded-3xl bg-zinc-100/70 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-600 dark:text-zinc-400 space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center space-x-2 font-bold text-zinc-900 dark:text-zinc-200">
            <Info className="w-4 h-4 text-zinc-500" />
            <span>Voluntary Contribution & Governance Notice</span>
          </div>
          <Link
            href="/contact"
            className="text-[11px] text-amber-600 dark:text-amber-400 hover:underline font-semibold"
          >
            Have a question? Contact editorial desk
          </Link>
        </div>

        <div className="space-y-2 text-[11px] leading-relaxed">
          <p>
            {DONATION_CONFIG.transparencyNotice}
          </p>
          <p>
            <strong>Tax Status:</strong> Nyayota is an independent civic knowledge initiative and is not a registered non-profit organization or charitable trust under any jurisdiction. Contributions are voluntary gifts and are not tax-deductible.
          </p>
          <p>
            <strong>Brand Marks & Logos:</strong> All third-party trademarks, logos, and service marks shown are the property of their respective owners. Display is solely for nominative identification and does not imply sponsorship, endorsement, or partnership. For comprehensive details, see our repository documentation on third-party assets.
          </p>
        </div>
      </footer>
    </div>
  );
}
