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
  Layers,
  Sparkles,
  ExternalLink,
  CheckSquare,
  Square
} from 'lucide-react';
import QRCode from 'qrcode';
import {
  DONATION_CONFIG,
  CRYPTO_NETWORKS,
  CryptoNetworkConfig,
  PLANNED_BANK_COUNTRIES,
  REGIONAL_BANK_GROUPS,
  PlannedCountry
} from '@/lib/donation-config';

export default function DonatePage() {
  // Cryptocurrency state (the ONLY enabled category)
  const [selectedNetworkId, setSelectedNetworkId] = useState<CryptoNetworkConfig['id']>('bitcoin');
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);
  const [copyError, setCopyError] = useState<string | null>(null);
  const [qrSvg, setQrSvg] = useState<string>('');

  // Bank transfer planning preferences (multi-select country preferences)
  const [selectedCountryIds, setSelectedCountryIds] = useState<string[]>([]);

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

  const toggleCountrySelection = (id: string) => {
    setSelectedCountryIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Navigation Breadcrumb */}
      <div>
        <Link
          href="/"
          className="inline-flex items-center space-x-1.5 text-xs font-semibold text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500/50 rounded-lg px-1.5 py-0.5"
          aria-label="Back to home page"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </Link>
      </div>

      {/* Header Banner */}
      <div className="space-y-4 border-b border-zinc-200 dark:border-zinc-800 pb-8">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 text-xs font-semibold">
          <Heart className="w-3.5 h-3.5 fill-rose-500/30" />
          <span>Voluntary Support & Roadmap</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
          Support Nyayota
        </h1>
        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl">
          Nyayota is an independent civic and educational legal research initiative. Direct cryptocurrency contributions fund server infrastructure, continuous verification of codified legal records, and public legal literacy.
        </p>

        {/* Honest Status Legend */}
        <div className="flex flex-wrap items-center gap-3 pt-2 text-xs">
          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Available now (Crypto)</span>
          </span>
          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-300 dark:border-zinc-700 font-semibold">
            <Lock className="w-3 h-3 text-zinc-400" />
            <span>Planned — not yet available</span>
          </span>
          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-700 dark:text-purple-400 border border-purple-500/20 font-semibold">
            <Lock className="w-3 h-3 text-purple-400" />
            <span>Under consideration</span>
          </span>
        </div>
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* 1. CRYPTOCURRENCY — AVAILABLE NOW                                 */}
      {/* ----------------------------------------------------------------- */}
      <section aria-labelledby="section-crypto-title" className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-3">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400">01</span>
              <h2 id="section-crypto-title" className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-white">
                Cryptocurrency
              </h2>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Direct peer-to-peer transfer of native assets. This is the only currently operational donation method.
            </p>
          </div>
          <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30 text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Available now</span>
          </span>
        </div>

        {/* Main Crypto Card */}
        <div className="rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm p-6 sm:p-8 space-y-8">
          {/* Network Selector Tabs */}
          <div className="space-y-3">
            <label id="crypto-network-label" className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Select Native Asset & Network
            </label>
            <div
              role="radiogroup"
              aria-labelledby="crypto-network-label"
              className="grid grid-cols-1 sm:grid-cols-3 gap-3"
            >
              {CRYPTO_NETWORKS.map((network) => {
                const isSelected = network.id === selectedNetworkId;
                return (
                  <button
                    key={network.id}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    id={`crypto-network-tab-${network.id}`}
                    onClick={() => setSelectedNetworkId(network.id)}
                    className={`p-4 rounded-2xl border text-left transition-all focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                      isSelected
                        ? 'bg-amber-500/10 border-amber-500 text-zinc-900 dark:text-white shadow-xs ring-1 ring-amber-500'
                        : 'bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-zinc-300 dark:hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-sm">{network.name}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-semibold">
                        {network.nativeAsset}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      {network.networkStandard}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selected Network Address & QR Code */}
          <div className="space-y-4 pt-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Transfer Address for {activeNetwork.name}
              </label>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20 font-mono">
                Network: {activeNetwork.networkName} • Recommended: {activeNetwork.recommendedAssets}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* QR Code Container (4 cols) */}
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

              {/* Address & Copy Action (8 cols) */}
              <div className="md:col-span-8 space-y-4">
                <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">
                      {activeNetwork.name} ({activeNetwork.networkStandard}) Address:
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 font-mono font-bold">
                      {activeNetwork.recommendedAssets}
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

                <div className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed bg-zinc-50 dark:bg-zinc-950 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800">
                  <strong>EVM Address Notice:</strong> Ethereum and BNB Smart Chain share the same hexadecimal address format (<code className="font-mono text-zinc-700 dark:text-zinc-300">0xD14b...91E</code>). This shared format does not mean arbitrary Layer-2 tokens or contract transfers are supported. Please transmit only the native asset of the selected network standard.
                </div>
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

      {/* ----------------------------------------------------------------- */}
      {/* 2. BINANCE PAY — PLANNED                                          */}
      {/* ----------------------------------------------------------------- */}
      <section aria-labelledby="section-binance-title" className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-3">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-mono font-bold text-zinc-400">02</span>
              <h2 id="section-binance-title" className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-white">
                Binance Pay
              </h2>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Future crypto ecosystem integration for zero-gas merchant transfers.
            </p>
          </div>
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-400 border border-zinc-300 dark:border-zinc-700 text-xs font-semibold">
            <Lock className="w-3.5 h-3.5 text-zinc-400" />
            <span>Planned — not yet available</span>
          </span>
        </div>

        <div className="rounded-3xl bg-zinc-50/60 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 p-6 space-y-3">
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center shrink-0 text-zinc-500">
              <Lock className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-bold text-zinc-800 dark:text-zinc-200">Binance Pay Merchant Integration</span>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-500">
                  Coming soon
                </span>
              </div>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {DONATION_CONFIG.binancePay.description}
              </p>
              <p className="text-[11px] text-zinc-400 dark:text-zinc-500">
                Status: Not yet available. Merchant accounts, Binance Pay IDs, and instant QR codes will be enabled only after verification.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* 3. BANK TRANSFER — PLANNED COUNTRY SELECTION                      */}
      {/* ----------------------------------------------------------------- */}
      <section aria-labelledby="section-bank-title" className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-3">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-mono font-bold text-zinc-400">03</span>
              <h2 id="section-bank-title" className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-white">
                Bank Transfer (Planned)
              </h2>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Future direct international wire and local clearing support. Currently non-operational.
            </p>
          </div>
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-400 border border-zinc-300 dark:border-zinc-700 text-xs font-semibold">
            <Lock className="w-3.5 h-3.5 text-zinc-400" />
            <span>Planned — not yet available</span>
          </span>
        </div>

        <div className="rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm font-bold text-zinc-900 dark:text-white">
              <Building2 className="w-4 h-4 text-amber-500" />
              <span>Country Selection for Future Bank-Transfer Support</span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {DONATION_CONFIG.bankTransfer.description}
            </p>
            <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/30 text-xs text-amber-800 dark:text-amber-300">
              <strong>Planning Preference Notice:</strong> Checking a country allows you to signal interest to help Nyayota prioritize banking partner applications. Selecting a country does <em>not</em> activate any payment method, reveal fictitious account credentials, or store any personal data.
            </div>
          </div>

          {/* Regional Grouping with Accessible Checkboxes */}
          <div className="space-y-6">
            {REGIONAL_BANK_GROUPS.map((group) => {
              const groupCountries = PLANNED_BANK_COUNTRIES.filter((c) =>
                (group.countries as readonly string[]).includes(c.id)
              );

              return (
                <div key={group.region} className="space-y-2.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 block border-b border-zinc-100 dark:border-zinc-800/60 pb-1">
                    {group.region}
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                    {groupCountries.map((country) => {
                      const isSelected = selectedCountryIds.includes(country.id);
                      const isAustria = country.id === 'at';

                      return (
                        <button
                          key={country.id}
                          type="button"
                          role="checkbox"
                          aria-checked={isSelected}
                          id={`bank-country-checkbox-${country.id}`}
                          onClick={() => toggleCountrySelection(country.id)}
                          className={`p-3 rounded-xl border text-left transition-all flex items-start space-x-2.5 focus:outline-none focus:ring-2 focus:ring-amber-500/50 cursor-pointer ${
                            isSelected
                              ? 'bg-amber-500/10 border-amber-500/50 text-zinc-900 dark:text-white ring-1 ring-amber-500/40'
                              : 'bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-zinc-300 dark:hover:border-zinc-700'
                          }`}
                        >
                          <div className="pt-0.5 text-zinc-500 shrink-0">
                            {isSelected ? (
                              <CheckSquare className="w-4 h-4 text-amber-500" />
                            ) : (
                              <Square className="w-4 h-4 text-zinc-400" />
                            )}
                          </div>
                          <div className="space-y-1 flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold truncate">{country.name}</span>
                              <Lock className="w-3 h-3 text-zinc-400 shrink-0 ml-1" />
                            </div>
                            <div className="flex items-center">
                              <span
                                className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                                  isAustria
                                    ? 'bg-purple-500/10 text-purple-700 dark:text-purple-400 border border-purple-500/20'
                                    : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
                                }`}
                              >
                                {country.statusLabel}
                              </span>
                            </div>
                            {country.notes && (
                              <p className="text-[10px] text-zinc-400 dark:text-zinc-500 leading-tight pt-0.5">
                                {country.notes}
                              </p>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Selected Countries Planning Summary */}
          {selectedCountryIds.length > 0 && (
            <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-2 animate-in fade-in">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-zinc-900 dark:text-white">
                  Your Selected Planning Preferences ({selectedCountryIds.length}):
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedCountryIds([])}
                  className="text-[11px] font-semibold text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 underline cursor-pointer"
                >
                  Clear Selection
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {selectedCountryIds.map((id) => {
                  const country = PLANNED_BANK_COUNTRIES.find((c) => c.id === id);
                  return (
                    <span
                      key={id}
                      className="text-xs px-2.5 py-1 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 font-medium inline-flex items-center space-x-1"
                    >
                      <span>{country?.name || id}</span>
                      <span className="text-[10px] text-zinc-400">({country?.statusLabel})</span>
                    </span>
                  );
                })}
              </div>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                Preference indicator only. Bank transfer rails remain unavailable in production.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* 4. LOCAL MOBILE PAYMENTS — PLANNED                                */}
      {/* ----------------------------------------------------------------- */}
      <section aria-labelledby="section-mobile-title" className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-3">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-mono font-bold text-zinc-400">04</span>
              <h2 id="section-mobile-title" className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-white">
                Local Mobile Payments
              </h2>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Future support for regional mobile financial services (MFS).
            </p>
          </div>
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-400 border border-zinc-300 dark:border-zinc-700 text-xs font-semibold">
            <Lock className="w-3.5 h-3.5 text-zinc-400" />
            <span>Planned — not yet available</span>
          </span>
        </div>

        <div className="rounded-3xl bg-zinc-50/60 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 p-6 space-y-3">
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center shrink-0 text-zinc-500">
              <Smartphone className="w-5 h-5" />
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-bold text-zinc-800 dark:text-zinc-200">Regional Mobile Financial Services</span>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-500">
                  Planned
                </span>
              </div>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {DONATION_CONFIG.mobilePayments.description}
              </p>
              <div className="pt-1 space-y-1">
                <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider block">
                  Potential Future Examples:
                </span>
                <div className="flex flex-wrap gap-2">
                  {DONATION_CONFIG.mobilePayments.examples.map((example) => (
                    <span
                      key={example}
                      className="text-xs px-2.5 py-1 rounded-lg bg-zinc-200/80 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 font-semibold inline-flex items-center space-x-1"
                    >
                      <Lock className="w-3 h-3 text-zinc-400" />
                      <span>{example}</span>
                    </span>
                  ))}
                </div>
                <p className="text-[10px] text-zinc-400 dark:text-zinc-500 pt-1">
                  {DONATION_CONFIG.mobilePayments.exampleDisclaimer} No phone numbers, merchant credentials, or live payment buttons are active.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* 5. ONLINE PAYMENT SERVICES — PLANNED                             */}
      {/* ----------------------------------------------------------------- */}
      <section aria-labelledby="section-online-title" className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-3">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-mono font-bold text-zinc-400">05</span>
              <h2 id="section-online-title" className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-white">
                Online Payment Services
              </h2>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Major online card and checkout gateways planned for subsequent phases.
            </p>
          </div>
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-400 border border-zinc-300 dark:border-zinc-700 text-xs font-semibold">
            <Lock className="w-3.5 h-3.5 text-zinc-400" />
            <span>Planned — not yet available</span>
          </span>
        </div>

        <div className="rounded-3xl bg-zinc-50/60 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {DONATION_CONFIG.onlineServices.services.map((svc) => (
              <div
                key={svc.id}
                className="p-4 rounded-2xl bg-zinc-100/80 dark:bg-zinc-950/80 border border-zinc-200 dark:border-zinc-800 space-y-2 opacity-80"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-zinc-800 dark:text-zinc-200">{svc.name}</span>
                  <Lock className="w-4 h-4 text-zinc-400" />
                </div>
                <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-500 inline-block">
                  Planned — not available
                </span>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-tight">
                  Gateway integration pending eligibility verification and merchant account approval.
                </p>
              </div>
            ))}
          </div>

          <div className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed bg-white/60 dark:bg-zinc-900/60 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800">
            {DONATION_CONFIG.onlineServices.description} Nyayota does not store credit card credentials or integrate unverified payment SDKs.
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* 6. OPTIONAL NOTE ABOUT ADDITIONAL PAYMENT METHODS                 */}
      {/* ----------------------------------------------------------------- */}
      <section className="p-6 rounded-3xl bg-zinc-100/70 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-600 dark:text-zinc-400 space-y-3">
        <div className="flex items-center space-x-2 font-bold text-zinc-900 dark:text-zinc-200">
          <Info className="w-4 h-4 text-zinc-500" />
          <span>Voluntary Contribution & Transparency Notice</span>
        </div>
        <div className="space-y-2 text-[11px] leading-relaxed">
          <p>
            {DONATION_CONFIG.transparencyNotice}
          </p>
          <p>
            <strong>Tax Status:</strong> Nyayota is an independent civic knowledge initiative and is not a registered non-profit organization or charitable trust under any jurisdiction. Contributions are voluntary gifts and are not tax-deductible.
          </p>
          <p>
            <strong>Payment Method Expansion:</strong> {DONATION_CONFIG.futureExpansionNotice} If you have suggestions or inquiries regarding institutional sponsorship, please contact{' '}
            <a href={`mailto:${DONATION_CONFIG.contactEmail}`} className="text-amber-600 dark:text-amber-400 font-semibold underline">
              {DONATION_CONFIG.contactEmail}
            </a>.
          </p>
        </div>
      </section>
    </div>
  );
}
