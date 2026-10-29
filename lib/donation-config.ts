/**
 * Nyayota — Centralized Cryptocurrency Donation Configuration
 * 
 * Provides verified maintainer-supplied cryptocurrency wallet addresses
 * and network specifications for voluntary open-source support.
 * 
 * SAFETY & POLICY RULES:
 * 1. Maintainer-supplied addresses only; no claim of independently verified legal entity ownership.
 * 2. Nyayota is NOT a registered charity or 501(c)(3); contributions are NOT tax-deductible.
 * 3. Never invent transaction histories, balances, or fake donation counters.
 * 4. Never ask users for private keys, seed phrases, or wallet connections.
 * 5. Recommend ONLY native assets (BTC, ETH, BNB) to eliminate token mismatch and contract loss.
 * 6. EVM addresses are shared between Ethereum and BSC; separate network selection is preserved
 *    so donors clearly select the intended network and standard.
 */

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
  },
];

export const DONATION_CONFIG = {
  isConfigured: true,
  donationUrl: '/donate',
  contactEmail: 'nyayota.contact@gmail.com',
  transparencyNotice:
    'Nyayota is an independent civic and educational legal research initiative. Donations directly support server hosting, automated test pipelines, and continuous verification of codified legal records. Voluntary contributions are non-refundable gifts and are not tax-deductible.',
  networks: CRYPTO_NETWORKS,
};
