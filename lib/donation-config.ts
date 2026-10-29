/**
 * Nyayota — Centralized Donation Configuration & Payment Roadmap
 * 
 * Provides verified maintainer-supplied cryptocurrency wallet addresses
 * and defines the planned non-operational payment-method roadmap.
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
 */

export type PaymentMethodStatus = 'available' | 'planned' | 'under-consideration';

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
  },
  {
    id: 'binance-smart-chain',
    name: 'BNB Smart Chain',
    ticker: 'BNB',
    nativeAsset: 'BNB',
    networkName: 'BNB Smart Chain (BSC)',
    networkStandard: 'BEP-20',
    address: EVM_ADDRESS,
    networkWarning:
      'Send only native BNB using the BNB Smart Chain (BSC). Do not send Ethereum Mainnet assets, unverified BEP-20 tokens, or cross-chain tokens directly without an authentic bridge, as cross-chain transfers will result in permanent loss.',
    recommendedAssets: 'BNB (Native)',
    status: 'available',
  },
];

export interface PlannedCountry {
  id: string;
  name: string;
  region: 'South Asia' | 'North America' | 'Europe' | 'Asia-Pacific' | 'Middle East';
  status: PaymentMethodStatus;
  statusLabel: string;
  notes?: string;
}

/**
 * Bank transfer country selection list in exact required order:
 * 1. Bangladesh
 * 2. United States
 * 3. United Kingdom
 * 4. France
 * 5. Spain
 * 6. Germany
 * 7. Italy
 * 8. Japan
 * 9. South Korea
 * 10. United Arab Emirates
 * 11. Austria
 */
export const PLANNED_BANK_COUNTRIES: PlannedCountry[] = [
  {
    id: 'bd',
    name: 'Bangladesh',
    region: 'South Asia',
    status: 'planned',
    statusLabel: 'Planned — not yet available',
  },
  {
    id: 'us',
    name: 'United States',
    region: 'North America',
    status: 'planned',
    statusLabel: 'Planned — not yet available',
  },
  {
    id: 'gb',
    name: 'United Kingdom',
    region: 'Europe',
    status: 'planned',
    statusLabel: 'Planned — not yet available',
  },
  {
    id: 'fr',
    name: 'France',
    region: 'Europe',
    status: 'planned',
    statusLabel: 'Planned — not yet available',
  },
  {
    id: 'es',
    name: 'Spain',
    region: 'Europe',
    status: 'planned',
    statusLabel: 'Planned — not yet available',
  },
  {
    id: 'de',
    name: 'Germany',
    region: 'Europe',
    status: 'planned',
    statusLabel: 'Planned — not yet available',
  },
  {
    id: 'it',
    name: 'Italy',
    region: 'Europe',
    status: 'planned',
    statusLabel: 'Planned — not yet available',
  },
  {
    id: 'jp',
    name: 'Japan',
    region: 'Asia-Pacific',
    status: 'planned',
    statusLabel: 'Planned — not yet available',
  },
  {
    id: 'kr',
    name: 'South Korea',
    region: 'Asia-Pacific',
    status: 'planned',
    statusLabel: 'Planned — not yet available',
  },
  {
    id: 'ae',
    name: 'United Arab Emirates',
    region: 'Middle East',
    status: 'planned',
    statusLabel: 'Planned — not yet available',
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

export const DONATION_CONFIG = {
  isConfigured: true,
  donationUrl: '/donate',
  contactEmail: 'nyayota.contact@gmail.com',
  transparencyNotice:
    'Nyayota is an independent civic and educational legal research initiative. Donations directly support server hosting, automated test pipelines, and continuous verification of codified legal records. Voluntary contributions are non-refundable gifts and are not tax-deductible.',
  networks: CRYPTO_NETWORKS,
  binancePay: {
    status: 'planned' as const,
    statusLabel: 'Planned — not yet available',
    description: 'Binance Pay is planned for a future update. This payment method is not available yet.',
  },
  bankTransfer: {
    status: 'planned' as const,
    statusLabel: 'Planned — not yet available',
    description:
      'Choose the countries you would like Nyayota to consider for future bank-transfer support. These options are not currently available for payments.',
    countries: PLANNED_BANK_COUNTRIES,
  },
  mobilePayments: {
    status: 'planned' as const,
    statusLabel: 'Planned — not yet available',
    description: 'Support for regional mobile financial services is planned for a future update.',
    examples: ['bKash', 'Nagad', 'Rocket'],
    exampleDisclaimer: 'Names listed are potential future integration examples only, not active payment channels.',
  },
  onlineServices: {
    status: 'planned' as const,
    statusLabel: 'Planned — not yet available',
    services: [
      { id: 'paypal', name: 'PayPal', status: 'planned' as const },
      { id: 'stripe', name: 'Stripe', status: 'planned' as const },
      { id: 'cashapp', name: 'Cash App', status: 'planned' as const },
    ],
    description:
      'Integration of online payment gateways depends on non-profit eligibility criteria, geographical availability, verified account setup, and international compliance requirements.',
  },
  futureExpansionNotice:
    'Additional payment methods may be introduced over time subject to regulatory compliance, verified non-profit banking rails, and community request volume.',
};
