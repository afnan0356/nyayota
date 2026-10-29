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
  Wallet,
  Coins
} from 'lucide-react';
import QRCode from 'qrcode';
import {
  DONATION_CONFIG,
  CRYPTO_NETWORKS,
  CryptoNetworkConfig,
  BITCOIN_ADDRESS,
  EVM_ADDRESS
} from '@/lib/donation-config';

export default function DonatePage() {
  const [selectedNetworkId, setSelectedNetworkId] = useState<CryptoNetworkConfig['id']>('bitcoin');
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

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
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
          <span>Voluntary Support</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
          Support Nyayota
        </h1>
        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl">
          Nyayota is an independent civic and educational legal research initiative. Voluntary contributions directly fund cloud server infrastructure, automated test suites, and continuous verification of codified legal records.
        </p>
      </div>

      {/* Main Donation Card */}
      <div className="rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm p-6 sm:p-8 space-y-8">
        {/* Network Selector Tabs */}
        <div className="space-y-3">
          <label id="network-selector-label" className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            1. Select Cryptocurrency Network & Native Asset
          </label>
          <div
            role="radiogroup"
            aria-labelledby="network-selector-label"
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
              2. Transfer Address for {activeNetwork.name}
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
                    className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs inline-flex items-center space-x-2 transition-all shadow-xs focus:outline-none focus:ring-2 focus:ring-amber-500/50"
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
            </div>
          </div>
        </div>

        {/* Safety & Non-Custodial Reminders */}
        <div className="border-t border-zinc-200 dark:border-zinc-800 pt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-1.5">
            <div className="flex items-center space-x-2 font-bold text-zinc-900 dark:text-white">
              <Lock className="w-4 h-4 text-emerald-500" />
              <span>Security & Non-Custodial Safety</span>
            </div>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-[11px]">
              Nyayota will never ask for your seed phrase, private keys, or wallet passwords. Never connect your wallet to untrusted websites.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-1.5">
            <div className="flex items-center space-x-2 font-bold text-zinc-900 dark:text-white">
              <ShieldCheck className="w-4 h-4 text-amber-500" />
              <span>Irreversible Transactions</span>
            </div>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-[11px]">
              Blockchain transactions are irreversible. Always verify the receiving address and network standard in your wallet before confirming broadcast.
            </p>
          </div>
        </div>
      </div>

      {/* Transparency & Legal Disclaimers */}
      <div className="p-6 rounded-3xl bg-zinc-100/70 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-600 dark:text-zinc-400 space-y-3">
        <div className="flex items-center space-x-2 font-bold text-zinc-900 dark:text-zinc-200">
          <Info className="w-4 h-4 text-zinc-500" />
          <span>Voluntary Contribution & Transparency Notice</span>
        </div>
        <div className="space-y-2 text-[11px] leading-relaxed">
          <p>
            {DONATION_CONFIG.transparencyNotice}
          </p>
          <p>
            <strong>Tax Status:</strong> Nyayota is not a registered non-profit organization or charitable trust under any jurisdiction. Contributions are voluntary gifts and are not tax-deductible.
          </p>
          <p>
            <strong>Maintainer Verification:</strong> Wallet addresses listed on this page are maintainer-supplied configurations for direct peer-to-peer cryptocurrency transfers. Nyayota does not store personal financial data, track wallet identities, or use third-party payment processing intermediaries.
          </p>
        </div>
      </div>
    </div>
  );
}
