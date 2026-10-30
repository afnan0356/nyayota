/**
 * Nyayota AI — Conversational Language Detector & Linguistic Normalizer
 * 
 * Accurately detects:
 * - English ('en')
 * - Bengali in Bengali script ('bn')
 * - Banglish / Romanized Bengali ('banglish')
 * 
 * Provides:
 * - Bengali numeral mapping (০-৯ -> 0-9)
 * - Safe canonical text normalization
 * - Legal title and provision token preservation
 */

import { LanguageDetected } from './types';

export const BENGALI_DIGITS: Record<string, string> = {
  '০': '0',
  '১': '1',
  '২': '2',
  '৩': '3',
  '৪': '4',
  '৫': '5',
  '৬': '6',
  '৭': '7',
  '৮': '8',
  '৯': '9',
};

// Common Romanized Bengali (Banglish) marker words
const BANGLISH_WORDS = new Set([
  'ki', 'kee', 'kono', 'shasti', 'sasti', 'shasthi', 'shaja', 'shaza',
  'er', 'te', 'e', 'ye', 're', 'theke', 'hobe', 'hbe', 'holey', 'hole',
  'pari', 'parbo', 'korbo', 'korte', 'kora', 'korle', 'ache', 'ase', 'achi',
  'nai', 'nei', 'na', 'kothay', 'kivabe', 'keno', 'kemne', 'shob', 'sob',
  'dhora', 'dhara', 'dharar', 'bichar', 'adalot', 'mamla', 'police',
  'thana', 'jail', 'baper', 'bhai', 'jami', 'jomi', 'taka', 'poisa',
  'eita', 'oita', 'ota', 'eta', 'amader', 'amar', 'apnar', 'tomar',
  'keno', 'kokhon', 'kar', 'kake', 'dekhte', 'chai', 'jani', 'janbo',
  'bujhte', 'bujhlam', 'bolen', 'bolo', 'bolun', 'kichu', 'akta', 'ekta',
  'shunte', 'shunlam', 'dite', 'dibo', 'deya', 'paoya', 'pabo'
]);

/**
 * Normalizes query text:
 * 1. Trims and collapses multiple whitespace characters.
 * 2. Lowercases ASCII characters.
 * 3. Replaces Bengali digits (০-৯) with standard Arabic digits (0-9) for uniform lookup.
 * 4. Preserves Bengali unicode diacritics and legal vocabulary.
 */
export function normalizeConversationalText(text: string): string {
  if (!text) return '';

  let normalized = text.trim().toLowerCase();

  // Map Bengali digits to Arabic digits
  normalized = normalized.replace(/[০-৯]/g, (digit) => BENGALI_DIGITS[digit] || digit);

  // Collapse multiple whitespaces
  normalized = normalized.replace(/\s+/g, ' ');

  return normalized;
}

/**
 * Detects whether the input is in English ('en'), Bengali script ('bn'), or Banglish ('banglish').
 */
export function detectConversationalLanguage(text: string): LanguageDetected {
  if (!text) return 'en';

  const hasBengaliScript = /[\u0980-\u09FF]/.test(text);

  // If Bengali Unicode characters dominate or are present alongside few ASCII characters
  if (hasBengaliScript) {
    const bengaliChars = (text.match(/[\u0980-\u09FF]/g) || []).length;
    const englishLetters = (text.match(/[a-zA-Z]/g) || []).length;

    if (bengaliChars >= englishLetters) {
      return 'bn';
    }
    // Mixed Bengali script + English words
    return 'banglish';
  }

  // Pure Latin / ASCII script — check for Banglish markers
  const cleanAscii = text.toLowerCase().replace(/[^a-z\s]/g, ' ');
  const words = cleanAscii.split(/\s+/).filter(Boolean);

  if (words.length === 0) return 'en';

  let banglishMatchCount = 0;
  for (const word of words) {
    if (BANGLISH_WORDS.has(word)) {
      banglishMatchCount++;
    }
  }

  // If at least 1 strong Banglish word in short phrase (e.g. "Bail ki?")
  // or at least 20% of words in longer phrase
  if (words.length <= 4 && banglishMatchCount >= 1) {
    return 'banglish';
  }
  if (words.length > 4 && banglishMatchCount / words.length >= 0.2) {
    return 'banglish';
  }

  return 'en';
}

/**
 * Checks if a string contains Bengali numerals
 */
export function hasBengaliDigits(text: string): boolean {
  return /[০-৯]/.test(text);
}

/**
 * Formats standard number string back to Bengali digits if target language is Bengali
 */
export function formatToBengaliDigits(numStr: string): string {
  const arabicToBn: Record<string, string> = {
    '0': '০',
    '1': '১',
    '2': '২',
    '3': '৩',
    '4': '৪',
    '5': '৫',
    '6': '৬',
    '7': '৭',
    '8': '৮',
    '9': '৯',
  };
  return numStr.replace(/[0-9]/g, (d) => arabicToBn[d] || d);
}
