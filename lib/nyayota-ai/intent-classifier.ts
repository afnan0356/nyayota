/**
 * Nyayota AI — Deterministic Intent Classifier
 * 
 * Classifies user legal queries into 10 explicit intent categories,
 * detects jurisdiction (Bangladesh, International, India, unclear, unknown),
 * normalizes multilingual input (English & Bengali, including Bengali numerals),
 * and strictly prevents confusing Indian Penal Code (IPC) with Bangladesh Penal Code.
 */

import {
  IntentCategory,
  DetectedJurisdiction,
  ProcessingPath,
  IntentClassificationResult,
} from './types';

// ============================================================================
// Text Normalization & Linguistic Helpers
// ============================================================================

const BENGALI_NUMERAL_MAP: Record<string, string> = {
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

/**
 * Normalizes query string:
 * 1. Trims and collapses multiple whitespace characters
 * 2. Lowercases English characters
 * 3. Normalizes Bengali numerals (০-৯) to standard Arabic digits (0-9)
 * 4. Preserves Bengali legal vocabulary and diacritics
 */
export function normalizeQuery(query: string): string {
  if (!query) return '';

  let normalized = query.trim().toLowerCase();

  // Replace Bengali digits with Arabic digits for uniform section parsing
  normalized = normalized.replace(/[০-৯]/g, (char) => BENGALI_NUMERAL_MAP[char] || char);

  // Collapse multiple whitespace
  normalized = normalized.replace(/\s+/g, ' ');

  return normalized;
}

/**
 * Detects whether the query is in English, Bengali, or Mixed
 */
export function detectLanguage(text: string): 'en' | 'bn' | 'mixed' {
  const hasBengali = /[\u0980-\u09FF]/.test(text);
  const hasEnglish = /[a-zA-Z]/.test(text);

  if (hasBengali && hasEnglish) return 'mixed';
  if (hasBengali) return 'bn';
  return 'en';
}

// ============================================================================
// Patterns & Rules
// ============================================================================

// Indian Jurisdiction Indicators (Strict Rule 4 Safety Mandate)
const INDIAN_JURISDICTION_REGEX = /\b(ipc|indian penal code|indian evidence act|crpc 1973|bns|bharatiya nyaya sanhita|supreme court of india|high court of delhi|delhi high court|bombay high court|madras high court|indian constitution|section 498a ipc|section 302 ipc)\b|আইপিসি|ভারতীয় দণ্ডবিধি|ভারতের আইন|ভারতীয় সংবিধান/i;

// International Law Indicators
const INTERNATIONAL_JURISDICTION_REGEX = /\b(udhr|iccpr|icescr|cedaw|crc|cat|geneva convention|rome statute|un charter|international treaty|human rights declaration|universal declaration of human rights|international covenant)\b|আন্তর্জাতিক আইন|মানবাধিকার সনদ|জেনেভা কনভেনশন|আন্তর্জাতিক চুক্তি/i;

// Foreign Non-South-Asian Jurisdictions
const FOREIGN_OTHER_JURISDICTION_REGEX = /\b(california labor|us constitution|2nd amendment|uk companies act|irs tax|gdpr|european court of human rights|australian criminal code)\b/i;

// Bangladesh Domestic Indicators
const BANGLADESH_JURISDICTION_REGEX = /\b(bangladesh|bangladesh code|bd|penal code|penal|crpc|cpc|constitution|supreme court|appellate division|high court|police regulation|general diary|fir|digital security act|cyber security act|ict act|narcotics control act|labor act|labour act|contract act|evidence act|transfer of property|sale of goods|specific relief|limitation act|negotiable instruments|taka|bdt)\b|বাংলাদেশ|দণ্ডবিধি|দন্ডবিধি|ফৌজদারি কার্যবিধি|ফৌজদারী কার্যবিধি|দেওয়ানি কার্যবিধি|দেওয়ানী কার্যবিধি|সংবিধান|সাধারণ ডায়েরি|সাধারণ ডায়েরি|জিডি|এজাহার|আইন ও বিচার|বাংলাদেশ কোড|টাকা|চুক্তি আইন|সাক্ষ্য আইন|সম্পত্তি হস্তান্তর|তামাদি|নারী ও শিশু/i;

// Greeting Patterns
const GREETING_REGEX = /^(hello|hi|hey|greetings|good morning|good afternoon|good evening|assalamu alaikum|salam|namaskar|adab|how are you|howdy)[\s.!?]*$|^(হ্যালো|হাই|আসসালামু আলাইকুম|সালাম|নমস্কার|আদাব|কেমন আছেন|শুভ সকাল|শুভ অপরাহ্ন)[\s.!?]*$/i;

// Nyayota Platform Help & Support Patterns
const NYAYOTA_HELP_REGEX = /\b(nyayota|what is nyayota|how to use nyayota|how does this site work|report an? (error|bug|mistake)|contact email|support email|who built nyayota|how to cite|how to bookmark|what languages|supported languages|contact us|contact team)\b|ন্যায়তা কি|ন্যায়তা কিভাবে ব্যবহার করব|ভুল রিপোর্ট|যোগাযোগ|ইমেইল|ভাষা সমর্থন|সাইট কিভাবে কাজ করে/i;

// Out of Scope (Coding, Weather, General Trivia, Food)
const OUT_OF_SCOPE_REGEX = /\b(python|javascript|typescript|react|html|css|sql query|write code|write a function|weather|temperature|forecast|recipe|biryani|messi|ronaldo|world cup|capital of france|who is the president of|solve the equation|quantum physics|calculate|movie review)\b|আবহাওয়া|রান্নার রেসিপি|কোডিং|প্রোগ্রামিং|জাভাস্ক্রিপ্ট/i;

// Direct Legal Provision Reference (Section / Article / Order / Rule)
const SECTION_OR_ARTICLE_EXTRACT_REGEX = /(?:^|[\s,.:;?!])(?:section|sec\.?|s\.|article|art\.?|order|rule|ধারা|অনুচ্ছেদ|অর্ডার|বিধি)\s*(\d+[a-z]?)(?:$|[\s,.:;?!])/i;
const STANDALONE_NUMBER_REGEX = /^(\d+[a-z]?)$/i;

// Legal Concepts / Doctrines / Latin Maxims
const LEGAL_CONCEPT_REGEX = /\b(habeas corpus|mens rea|actus reus|bail|anticipatory bail|estoppel|res judicata|ex parte|ultra vires|prima facie|cognizable|non-bailable|bailable|suo moto|locus standi|tort|negligence|defamation|injunction|adverse possession|easement|alimony|dower|kabinnama|talak|divorce|probate|injunction)\b|জামিন|ওয়ারেন্ট|কগনিজেন্স|এজাহার|খালাস|আমলযোগ্য|অ-আমলযোগ্য|স্থগিতাদেশ|মোহরানা|তালাক|হস্তান্তর|উইল|হেবা/i;

// Procedural Scenario Questions
const LEGAL_SCENARIO_REGEX = /\b(how to file|procedure for|what to do if|cheque bounce|cheque dishonour|police arrest|landlord dispute|tenant dispute|domestic violence|breach of contract|stolen phone|lost document)\b|কিভাবে জিডি করব|চেক ডিজঅনার|গ্রেপ্তার হলে কি করব|বাড়িওয়ালার সাথে বিরোধ|চুক্তি ভঙ্গ|জিডি করার নিয়ম/i;

// Statute Overview Requests
const STATUTE_OVERVIEW_REGEX = /\b(overview of|tell me about|summary of|information about|history of)\s+(the\s+)?([a-z0-9\s]+act|[a-z0-9\s]+code|[a-z0-9\s]+ordinance|constitution)|আইন সম্পর্কে বলুন|আইন পরিচিতি|পরিচিতি|সংক্ষিপ্ত বিবরণ/i;

// ============================================================================
// Disambiguation Prompt Builders
// ============================================================================

function buildIpcClarification(sectionNum?: string): { prompt: string; options: string[] } {
  const sectionPart = sectionNum ? `regarding Section ${sectionNum}` : '';
  const prompt =
    `Jurisdiction Notice: You queried about "IPC" (Indian Penal Code)${sectionPart ? ` ${sectionPart}` : ''}. ` +
    `Nyayota indexes the domestic laws of Bangladesh and international treaties. ` +
    `In Bangladesh, the governing criminal statute is The Penal Code, 1860 (Act XLV of 1860 / দণ্ডবিধি, ১৮৬০). ` +
    `Did you intend to search for the Bangladesh Penal Code, or the Indian Penal Code?`;

  const options = [
    sectionNum
      ? `Search Section ${sectionNum} of The Penal Code, 1860 (Bangladesh)`
      : `Search The Penal Code, 1860 (Bangladesh)`,
    `Indian Penal Code (Outside Nyayota's Bangladesh coverage)`,
    `Search Bangladesh Code Catalog for related criminal statutes`,
  ];

  return { prompt, options };
}

function buildSectionAmbiguityClarification(sectionNum: string): { prompt: string; options: string[] } {
  const prompt =
    `Multiple Acts match Section ${sectionNum}. Please specify the relevant statute to view the precise provision:`;

  const options = [
    `Section ${sectionNum}, The Penal Code, 1860 (Criminal offenses and penalties)`,
    `Section ${sectionNum}, The Code of Criminal Procedure, 1898 (CrPC - Procedural law)`,
    `Section ${sectionNum}, The Code of Civil Procedure, 1908 (CPC - Civil litigation)`,
    `Search all Bangladesh Code enactments containing Section ${sectionNum}`,
  ];

  return { prompt, options };
}

// ============================================================================
// Main Classifier Implementation
// ============================================================================

/**
 * Deterministically classifies a user query into one of the 10 intent categories.
 */
export function classifyIntent(rawQuery: string): IntentClassificationResult {
  const normalized = normalizeQuery(rawQuery);
  const lang = detectLanguage(rawQuery);

  // Default baseline result
  const baseResult: IntentClassificationResult = {
    originalQuery: rawQuery,
    normalizedQuery: normalized,
    primaryIntent: 'unknown',
    confidence: 0.2,
    detectedJurisdiction: 'unknown',
    suggestedProcessingPath: 'unknown_handler',
    matchedPatterns: [],
    detectedActHints: [],
    detectedLegalTerms: [],
    detectedLanguage: lang,
    requiresClarification: false,
  };

  // 1. Empty or Unintelligible Check (unknown)
  if (!normalized || normalized.length === 0) {
    return {
      ...baseResult,
      primaryIntent: 'unknown',
      confidence: 1.0,
      suggestedProcessingPath: 'unknown_handler',
      matchedPatterns: ['empty-query'],
    };
  }

  // Keyboard smash / repetitive character check (e.g., "asdfasdf", "zzzzzz", "qwertyuiop")
  if (/^([a-z0-9])\1{4,}$/.test(normalized) || /^(asdf|qwerty|zxcv|ghjk)+$/i.test(normalized)) {
    return {
      ...baseResult,
      primaryIntent: 'unknown',
      confidence: 0.95,
      suggestedProcessingPath: 'unknown_handler',
      matchedPatterns: ['gibberish-string'],
    };
  }

  // 2. Out of Scope Check (Programming, Weather, General Trivia, Recipes)
  if (OUT_OF_SCOPE_REGEX.test(normalized)) {
    return {
      ...baseResult,
      primaryIntent: 'out_of_scope',
      confidence: 0.95,
      detectedJurisdiction: 'unknown',
      suggestedProcessingPath: 'out_of_scope_handler',
      matchedPatterns: ['out-of-scope-regex'],
    };
  }

  // 3. Platform Help & Feedback Check (nyayota_help)
  if (NYAYOTA_HELP_REGEX.test(normalized)) {
    return {
      ...baseResult,
      primaryIntent: 'nyayota_help',
      confidence: 0.95,
      detectedJurisdiction: 'Bangladesh',
      suggestedProcessingPath: 'nyayota_help_handler',
      matchedPatterns: ['nyayota-help-regex'],
    };
  }

  // 4. Greeting Check (greeting)
  // Must be a greeting and not include legal substantive inquiries
  const isGreetingMatch = GREETING_REGEX.test(normalized) ||
    normalized === 'hello' ||
    normalized === 'hi' ||
    normalized === 'hey' ||
    normalized === 'নমস্কার' ||
    normalized === 'সালাম' ||
    normalized === 'আসসালামু আলাইকুম';

  const hasSubstantiveKeywords = /\b(section|article|act|law|code|bail|gd|fir|ধারা|আইন|জামিন)\b/.test(normalized);

  if (isGreetingMatch && !hasSubstantiveKeywords) {
    return {
      ...baseResult,
      primaryIntent: 'greeting',
      confidence: 0.95,
      detectedJurisdiction: 'Bangladesh',
      suggestedProcessingPath: 'greeting_handler',
      matchedPatterns: ['greeting-regex'],
    };
  }

  // 5. Jurisdiction Detection: Indian Law / IPC Strict Safety Rule
  const isIndianQuery = INDIAN_JURISDICTION_REGEX.test(normalized);
  const sectionMatch = normalized.match(SECTION_OR_ARTICLE_EXTRACT_REGEX) || normalized.match(STANDALONE_NUMBER_REGEX);
  let detectedSectionNumber = sectionMatch ? sectionMatch[1] : undefined;
  if (!detectedSectionNumber) {
    const enactmentYears = new Set(['1860', '1898', '1908', '1972', '2006', '1872', '1961', '1995', '2023', '1948', '1966']);
    const numbersInQuery = normalized.match(/\b([0-9]+[a-z]?)\b/gi) || [];
    const nonYearNumbers = numbersInQuery.filter((n) => !enactmentYears.has(n));
    if (nonYearNumbers.length === 1) {
      detectedSectionNumber = nonYearNumbers[0];
    }
  }

  if (isIndianQuery) {
    const ipcDetails = buildIpcClarification(detectedSectionNumber);
    return {
      ...baseResult,
      primaryIntent: 'clarification_needed',
      confidence: 0.95,
      detectedJurisdiction: 'India',
      jurisdictionReason: 'Query explicitly references Indian statutes or IPC (Indian Penal Code).',
      suggestedProcessingPath: 'clarification_handler',
      matchedPatterns: ['indian-jurisdiction-ipc'],
      detectedSectionNumber,
      requiresClarification: true,
      clarificationPrompt: ipcDetails.prompt,
      clarificationOptions: ipcDetails.options,
    };
  }

  // 6. Foreign Other Jurisdictions
  if (FOREIGN_OTHER_JURISDICTION_REGEX.test(normalized)) {
    return {
      ...baseResult,
      primaryIntent: 'unsupported_legal_query',
      confidence: 0.9,
      detectedJurisdiction: 'unknown',
      jurisdictionReason: 'Query references foreign municipal legislation outside Bangladesh/International law.',
      suggestedProcessingPath: 'unsupported_legal_handler',
      matchedPatterns: ['foreign-other-jurisdiction'],
    };
  }

  // 7. International Law Detection
  const isInternational = INTERNATIONAL_JURISDICTION_REGEX.test(normalized);
  const detectedJurisdiction: DetectedJurisdiction = isInternational ? 'International' : 'Bangladesh';

  // 8. Direct Legal Provision vs. Standalone Section Ambiguity
  // Case A: Standalone Section number without Act specification (e.g. "Section 54", "ধারা ৩০২", "Section 420")
  const isStandaloneSection =
    /^section\s*\d+[a-z]?$/i.test(normalized) ||
    /^ধারা\s*\d+[a-z]?$/i.test(normalized) ||
    /^sec\.?\s*\d+[a-z]?$/i.test(normalized) ||
    /^article\s*\d+[a-z]?$/i.test(normalized) ||
    /^অনুচ্ছেদ\s*\d+[a-z]?$/i.test(normalized);

  if (isStandaloneSection && detectedSectionNumber) {
    const ambiguityDetails = buildSectionAmbiguityClarification(detectedSectionNumber);
    return {
      ...baseResult,
      primaryIntent: 'clarification_needed',
      confidence: 0.9,
      detectedJurisdiction,
      jurisdictionReason: 'Section number specified without designating parent Act.',
      suggestedProcessingPath: 'clarification_handler',
      matchedPatterns: ['standalone-section-no-act'],
      detectedSectionNumber,
      requiresClarification: true,
      clarificationPrompt: ambiguityDetails.prompt,
      clarificationOptions: ambiguityDetails.options,
    };
  }

  // Case B: Direct provision with Act mentioned (e.g., "Section 302 of Penal Code", "CrPC Section 54", "সংবিধানের ২৭ অনুচ্ছেদ", or specific Act name)
  const hasGenericActWord = /\b(act|ordinance|code|order|regulation|statute)\b|আইন|অধ্যাদেশ|বিধিমালা|অর্ডার/i.test(normalized);
  const hasActIndicator = BANGLADESH_JURISDICTION_REGEX.test(normalized) || isInternational || hasGenericActWord;
  if (detectedSectionNumber && hasActIndicator) {
    return {
      ...baseResult,
      primaryIntent: 'direct_legal_reference',
      confidence: 0.95,
      detectedJurisdiction,
      suggestedProcessingPath: 'retrieval_engine',
      matchedPatterns: ['direct-provision-with-act'],
      detectedSectionNumber,
    };
  }

  // 9. Statute Overview Check (e.g., "Tell me about the Penal Code", "চুক্তি আইন পরিচিতি", "overview of crpc")
  if (STATUTE_OVERVIEW_REGEX.test(normalized) || (hasActIndicator && /\b(overview|summary|about|history|পরিচতি|বিবরণ)\b/i.test(normalized))) {
    return {
      ...baseResult,
      primaryIntent: 'statute_overview',
      confidence: 0.9,
      detectedJurisdiction,
      suggestedProcessingPath: 'retrieval_engine',
      matchedPatterns: ['statute-overview-pattern'],
    };
  }

  // 10. Procedural Scenario Check (e.g., "How to file a GD", "Procedure for bail", "চেক ডিজঅনার হলে করণীয়")
  if (LEGAL_SCENARIO_REGEX.test(normalized)) {
    return {
      ...baseResult,
      primaryIntent: 'legal_scenario',
      confidence: 0.9,
      detectedJurisdiction,
      suggestedProcessingPath: 'retrieval_engine',
      matchedPatterns: ['legal-scenario-pattern'],
    };
  }

  // 11. Legal Concept / Glossary Check (e.g., "what is habeas corpus", "mens rea", "জামিন কি", "ওয়ারেন্ট")
  if (LEGAL_CONCEPT_REGEX.test(normalized)) {
    return {
      ...baseResult,
      primaryIntent: 'legal_concept',
      confidence: 0.9,
      detectedJurisdiction,
      suggestedProcessingPath: 'retrieval_engine',
      matchedPatterns: ['legal-concept-pattern'],
    };
  }

  // 12. Broad Legal Term or Act Name Fallback
  if (hasActIndicator) {
    return {
      ...baseResult,
      primaryIntent: 'statute_overview',
      confidence: 0.75,
      detectedJurisdiction,
      suggestedProcessingPath: 'retrieval_engine',
      matchedPatterns: ['broad-act-mention'],
    };
  }

  // 13. Substantive Legal Section Found without Recognized Act Context
  if (detectedSectionNumber) {
    const ambiguityDetails = buildSectionAmbiguityClarification(detectedSectionNumber);
    return {
      ...baseResult,
      primaryIntent: 'clarification_needed',
      confidence: 0.7,
      detectedJurisdiction,
      suggestedProcessingPath: 'clarification_handler',
      matchedPatterns: ['section-candidate-without-act'],
      detectedSectionNumber,
      requiresClarification: true,
      clarificationPrompt: ambiguityDetails.prompt,
      clarificationOptions: ambiguityDetails.options,
    };
  }

  // 14. Unknown Fallback
  return {
    ...baseResult,
    primaryIntent: 'unknown',
    confidence: 0.3,
    detectedJurisdiction: 'unknown',
    suggestedProcessingPath: 'unknown_handler',
    matchedPatterns: ['unmatched-query-fallback'],
  };
}
