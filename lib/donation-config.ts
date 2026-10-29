/**
 * Nyayota — Centralized Donation Configuration & Payment Roadmap (Phase 5F)
 * 
 * Provides verified maintainer-supplied cryptocurrency wallet addresses
 * and defines the hierarchical payment navigation categories and roadmap.
 * 
 * SAFETY & COMPLIANCE RULES:
 * 1. Cryptocurrency is the ONLY operational donation method.
 * 2. Maintainer-supplied addresses only; no claim of independently verified legal entity ownership.
 * 3. Nyayota is NOT a registered charity or 501(c)(3); contributions are NOT tax-deductible.
 * 4. Never invent transaction histories, balances, fake donation counters, or fake checkout flows.
 * 5. Never ask users for private keys, seed phrases, bank credentials, or phone numbers.
 * 6. Recommend ONLY native assets (BTC, ETH, BNB) to eliminate token mismatch and contract loss.
 * 7. All non-crypto methods (Binance Pay, Bank Transfers, Mobile Payments, Online Services)
 *    are strictly PLANNED or UNDER CONSIDERATION and are 100% non-operational.
 * 8. All bank transfer countries are presented as read-only informational cards. No checkboxes,
 *    surveys, or selection state.
 */

export type PaymentMethodStatus = 'available' | 'coming-soon' | 'under-consideration';

export interface CryptoNetworkConfig {
  id: 'bitcoin' | 'ethereum' | 'binance-smart-chain';
  name: string;
  ticker: string;
  nativeAsset: string;
  networkName: string;
  networkStandard: string;
  address: string;
  networkWarning: string;
  recommendedAssets: string;
  status: 'available';
  statusLabel: string;
}

export const BITCOIN_ADDRESS = 'bc1qczt3r9yhwezgdnvdcl39d093u8ehtt37l44mj5';
export const EVM_ADDRESS = '0xD14b56A067Bd9B016415d32Ecc49dd846A06F91E';

export const CRYPTO_NETWORKS: CryptoNetworkConfig[] = [
  {
    id: 'bitcoin',
    name: 'Bitcoin',
    ticker: 'BTC',
    nativeAsset: 'BTC',
    networkName: 'Bitcoin Mainnet',
    networkStandard: 'Native SegWit (Bech32)',
    address: BITCOIN_ADDRESS,
    networkWarning:
      'Send only native Bitcoin (BTC) using the Bitcoin native network. Sending assets from other networks (e.g. Lightning, Wrapped BTC, or other UTXO chains) or sending non-BTC tokens to this address will result in permanent loss.',
    recommendedAssets: 'BTC (Native)',
    status: 'available',
    statusLabel: 'Available',
  },
  {
    id: 'ethereum',
    name: 'Ethereum',
    ticker: 'ETH',
    nativeAsset: 'ETH',
    networkName: 'Ethereum Mainnet',
    networkStandard: 'ERC-20',
    address: EVM_ADDRESS,
    networkWarning:
      'Send only native Ether (ETH) using Ethereum Mainnet. Do not send unverified ERC-20 tokens or broadcast across Layer-2 chains (e.g. Arbitrum, Optimism, Base, Polygon) without an official bridge, as funds will be permanently lost.',
    recommendedAssets: 'ETH (Native)',
    status: 'available',
    statusLabel: 'Available',
  },
  {
    id: 'binance-smart-chain',
    name: 'BNB',
    ticker: 'BNB',
    nativeAsset: 'BNB',
    networkName: 'BNB Smart Chain (BSC)',
    networkStandard: 'BEP-20',
    address: EVM_ADDRESS,
    networkWarning:
      'Send only native BNB using the BNB Smart Chain (BSC). Do not send Ethereum Mainnet assets, unverified BEP-20 tokens, or cross-chain tokens directly without an authentic bridge, as cross-chain transfers will result in permanent loss.',
    recommendedAssets: 'BNB (Native)',
    status: 'available',
    statusLabel: 'Available',
  },
];

export const CRYPTO_COMPACT_INSTRUCTIONS = [
  'Choose your preferred cryptocurrency and verify network compatibility.',
  'Copy the receiving address or scan the displayed QR code with your mobile camera or wallet app.',
  'Open your non-custodial wallet application and select the exact matching network.',
  'Send only the native asset (BTC on Bitcoin Mainnet, ETH on Ethereum Mainnet, or BNB on BNB Smart Chain).',
  'Carefully verify the recipient address and estimated network transaction fee before confirming broadcast.',
] as const;

export interface PlannedCountry {
  id: string;
  name: string;
  region: 'South Asia' | 'North America' | 'Europe' | 'Asia-Pacific' | 'Middle East';
  status: 'coming-soon' | 'under-consideration';
  statusLabel: string;
  notes?: string;
}

/**
 * Bank transfer country roadmap list in exact required order:
 * 1. Bangladesh (Coming soon)
 * 2. United States (Coming soon)
 * 3. United Kingdom (Coming soon)
 * 4. France (Coming soon)
 * 5. Spain (Coming soon)
 * 6. Germany (Coming soon)
 * 7. Italy (Coming soon)
 * 8. Japan (Coming soon)
 * 9. South Korea (Coming soon)
 * 10. United Arab Emirates (Coming soon)
 * 11. Austria (Under consideration)
 */
export const PLANNED_BANK_COUNTRIES: PlannedCountry[] = [
  {
    id: 'bd',
    name: 'Bangladesh',
    region: 'South Asia',
    status: 'coming-soon',
    statusLabel: 'Coming soon',
  },
  {
    id: 'us',
    name: 'United States',
    region: 'North America',
    status: 'coming-soon',
    statusLabel: 'Coming soon',
  },
  {
    id: 'gb',
    name: 'United Kingdom',
    region: 'Europe',
    status: 'coming-soon',
    statusLabel: 'Coming soon',
  },
  {
    id: 'fr',
    name: 'France',
    region: 'Europe',
    status: 'coming-soon',
    statusLabel: 'Coming soon',
  },
  {
    id: 'es',
    name: 'Spain',
    region: 'Europe',
    status: 'coming-soon',
    statusLabel: 'Coming soon',
  },
  {
    id: 'de',
    name: 'Germany',
    region: 'Europe',
    status: 'coming-soon',
    statusLabel: 'Coming soon',
  },
  {
    id: 'it',
    name: 'Italy',
    region: 'Europe',
    status: 'coming-soon',
    statusLabel: 'Coming soon',
  },
  {
    id: 'jp',
    name: 'Japan',
    region: 'Asia-Pacific',
    status: 'coming-soon',
    statusLabel: 'Coming soon',
  },
  {
    id: 'kr',
    name: 'South Korea',
    region: 'Asia-Pacific',
    status: 'coming-soon',
    statusLabel: 'Coming soon',
  },
  {
    id: 'ae',
    name: 'United Arab Emirates',
    region: 'Middle East',
    status: 'coming-soon',
    statusLabel: 'Coming soon',
  },
  {
    id: 'at',
    name: 'Austria',
    region: 'Europe',
    status: 'under-consideration',
    statusLabel: 'Under consideration',
    notes: 'Support for Austria is still being evaluated by the project maintainers.',
  },
];

export const REGIONAL_BANK_GROUPS = [
  { region: 'South Asia', countries: ['bd'] },
  { region: 'North America', countries: ['us'] },
  { region: 'Europe', countries: ['gb', 'fr', 'es', 'de', 'it', 'at'] },
  { region: 'Asia-Pacific', countries: ['jp', 'kr'] },
  { region: 'Middle East', countries: ['ae'] },
] as const;

export const OTHER_METHODS_INSTRUCTION =
  'This payment option is not available yet. No payment can be made through this method at present.';

export interface PaymentCategoryInfo {
  id: 'cryptocurrency' | 'binance-pay' | 'bank-transfer' | 'other-methods';
  title: string;
  badge: string;
  isAvailable: boolean;
  description: string;
}

export const PAYMENT_CATEGORIES: PaymentCategoryInfo[] = [
  {
    id: 'cryptocurrency',
    title: 'Cryptocurrency',
    badge: 'Available now',
    isAvailable: true,
    description: 'Direct peer-to-peer transfer of native crypto assets (Bitcoin, Ethereum, BNB). Operational now.',
  },
  {
    id: 'binance-pay',
    title: 'Binance Pay',
    badge: 'Coming soon',
    isAvailable: false,
    description: 'Zero-gas merchant transfers within the Binance ecosystem. Integration planned for a future update.',
  },
  {
    id: 'bank-transfer',
    title: 'Bank transfer',
    badge: 'Coming soon',
    isAvailable: false,
    description: 'International wire and national clearing network transfers. View the planned country coverage roadmap.',
  },
  {
    id: 'other-methods',
    title: 'Other methods',
    badge: 'Coming soon',
    isAvailable: false,
    description: 'Local mobile financial services (MFS) and major online checkout gateways. View planned roadmap.',
  },
];

export const DONATION_CONFIG = {
  isConfigured: true,
  donationUrl: '/donate',
  contactEmail: 'nyayota.contact@gmail.com',
  transparencyNotice:
    'Nyayota is an independent civic and educational legal research initiative. Donations directly support server hosting, automated test pipelines, and continuous verification of codified legal records. Voluntary contributions are non-refundable gifts and are not tax-deductible.',
  networks: CRYPTO_NETWORKS,
  categories: PAYMENT_CATEGORIES,
  binancePay: {
    status: 'coming-soon' as const,
    statusLabel: 'Coming soon',
    description: 'Binance Pay is planned for a future update. This payment method is not available yet.',
  },
  bankTransfer: {
    status: 'coming-soon' as const,
    statusLabel: 'Coming soon',
    description:
      'Bank transfers are being considered for a future update. The countries below indicate planned coverage only; no bank-transfer payments are currently available.',
    countries: PLANNED_BANK_COUNTRIES,
  },
  mobilePayments: {
    status: 'coming-soon' as const,
    statusLabel: 'Coming soon',
    title: 'Local and mobile payments',
    description:
      'Support for regional mobile financial services is planned for a future update. No mobile financial accounts or payment numbers are currently active.',
    examples: ['bKash', 'Nagad', 'Rocket'],
    exampleDisclaimer:
      'Provider names are cited purely as illustrative examples of potential future integration channels, not active payment accounts or corporate endorsements.',
  },
  onlineServices: {
    status: 'coming-soon' as const,
    statusLabel: 'Coming soon',
    services: [
      { id: 'paypal', name: 'PayPal', status: 'coming-soon' as const, brand: 'PayPal Holdings, Inc.' },
      { id: 'stripe', name: 'Stripe', status: 'coming-soon' as const, brand: 'Stripe, Inc.' },
      { id: 'cashapp', name: 'Cash App', status: 'coming-soon' as const, brand: 'Block, Inc.' },
    ],
    description:
      'Integration of online payment gateways depends on non-profit eligibility criteria, geographical availability, verified account setup, and international compliance requirements.',
  },
  futureExpansionNotice:
    'Additional payment methods may be introduced over time subject to regulatory compliance, verified non-profit banking rails, and community request volume.',
};
