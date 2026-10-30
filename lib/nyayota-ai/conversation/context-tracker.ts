/**
 * Nyayota AI — Request-Scoped Conversation Context Tracker (Phase 6B)
 * 
 * Binds and validates conversation history from incoming request payloads:
 * - Bounds history to the 10 most recent turns to eliminate memory drift and DOS risks.
 * - Enforces role policy: user and assistant messages establish active dialogue state;
 *   system messages are validated for role correctness but excluded from statutory entity injection.
 * - Extracts active statute, section, article, topic, and jurisdiction.
 * - Sequential provision replacement: a newly discussed section under an active act replaces older active sections.
 * - Multi-statute & comparative tracking: tracks multiple legal references and marks active comparisons.
 * - Strict source validation: assistant-cited sources are validated for genuine title and sourceId.
 * - Does not use any persistent database or cross-session user storage.
 */

import {
  ConversationContext,
  ConversationMessage,
  LegalJurisdiction,
  TrackedLegalReference,
} from './types';
import { normalizeConversationalText } from './language-detector';
import { DeterministicSourceCitation } from '../types';

// Known major statutes & international treaties indexed or referenced
interface KnownStatuteEntry {
  id: string;
  title: string;
  jurisdiction: LegalJurisdiction;
  aliases: string[];
}

const KNOWN_STATUTES: KnownStatuteEntry[] = [
  // Bangladesh Statutes
  { id: 'bd-penal-code-1860', title: 'The Penal Code, 1860', jurisdiction: 'Bangladesh', aliases: ['penal code', 'penal', 'দণ্ডবিধি', 'দন্ডবিধি', 'দণ্ডবিধি ১৮৬০'] },
  { id: 'bd-crpc-1898', title: 'The Code of Criminal Procedure, 1898', jurisdiction: 'Bangladesh', aliases: ['crpc', 'code of criminal procedure', 'criminal procedure', 'ফৌজদারি কার্যবিধি', 'ফৌজদারী কার্যবিধি'] },
  { id: 'bd-cpc-1908', title: 'The Code of Civil Procedure, 1908', jurisdiction: 'Bangladesh', aliases: ['cpc', 'code of civil procedure', 'civil procedure', 'দেওয়ানি কার্যবিধি', 'দেওয়ানী কার্যবিধি'] },
  { id: 'bd-constitution-1972', title: 'The Constitution of the People’s Republic of Bangladesh', jurisdiction: 'Bangladesh', aliases: ['constitution of bangladesh', 'bangladesh constitution', 'গণপ্রজাতন্ত্রী বাংলাদেশের সংবিধান', 'সংবিধান'] },
  { id: 'bd-evidence-act-1872', title: 'The Evidence Act, 1872', jurisdiction: 'Bangladesh', aliases: ['evidence act', 'সাক্ষ্য আইন'] },
  { id: 'bd-contract-act-1872', title: 'The Contract Act, 1872', jurisdiction: 'Bangladesh', aliases: ['contract act', 'চুক্তি আইন'] },
  { id: 'bd-labor-act-2006', title: 'The Bangladesh Labour Act, 2006', jurisdiction: 'Bangladesh', aliases: ['labor act', 'labour act', 'বাংলাদেশ শ্রম আইন', 'শ্রম আইন'] },
  { id: 'bd-dsa-2018', title: 'Digital Security Act, 2018', jurisdiction: 'Bangladesh', aliases: ['digital security act', 'cyber security act', 'ডিজিটাল নিরাপত্তা আইন'] },
  { id: 'bd-nita-1881', title: 'The Negotiable Instruments Act, 1881', jurisdiction: 'Bangladesh', aliases: ['negotiable instruments act', 'ni act', 'চেক ডিজঅনার আইন'] },

  // International Instruments & Treaties
  { id: 'intl-udhr-1948', title: 'Universal Declaration of Human Rights', jurisdiction: 'International', aliases: ['udhr', 'universal declaration of human rights', 'মানবাধিকারের সার্বজনীন ঘোষণাপত্র'] },
  { id: 'intl-iccpr-1966', title: 'International Covenant on Civil and Political Rights', jurisdiction: 'International', aliases: ['iccpr', 'covenant on civil and political rights', 'নাগরিক ও রাজনৈতিক অধিকারের আন্তর্জাতিক চুক্তি'] },
  { id: 'intl-icescr-1966', title: 'International Covenant on Economic, Social and Cultural Rights', jurisdiction: 'International', aliases: ['icescr', 'economic social and cultural rights'] },
  { id: 'intl-cedaw-1979', title: 'Convention on the Elimination of All Forms of Discrimination Against Women', jurisdiction: 'International', aliases: ['cedaw'] },
  { id: 'intl-crc-1989', title: 'Convention on the Rights of the Child', jurisdiction: 'International', aliases: ['crc', 'convention on the rights of the child'] },

  // Comparative Non-Indexed Statutes (Explicit Foreign Systems)
  { id: 'in-ipc-1860', title: 'Indian Penal Code', jurisdiction: 'India', aliases: ['indian penal code', 'ipc'] },
  { id: 'in-constitution-1950', title: 'Constitution of India', jurisdiction: 'India', aliases: ['indian constitution', 'constitution of india'] },
  { id: 'uk-hra-1998', title: 'Human Rights Act 1998 (UK)', jurisdiction: 'United Kingdom', aliases: ['uk human rights act', 'english common law', 'uk law', 'british law'] },
  { id: 'us-constitution-1787', title: 'Constitution of the United States', jurisdiction: 'United States', aliases: ['us constitution', 'united states constitution', 'american constitution'] },
];

const SECTION_REGEX = /(?:section|sec\.?|s\.|ধারা)\s*(\d+[a-z]?)/i;
const ARTICLE_REGEX = /(?:article|art\.?|অনুচ্ছেদ)\s*(\d+[a-z]?)/i;

/**
 * Extracts active statutory reference (Act title, section number, jurisdiction, topic) from text.
 */
export function extractLegalEntities(text: string): {
  act?: { id: string; title: string; jurisdiction: LegalJurisdiction };
  section?: string;
  topic?: string;
  jurisdiction?: LegalJurisdiction;
  secondarySection?: string;
  isComparisonRequested?: boolean;
} {
  const norm = normalizeConversationalText(text);

  let matchedAct: { id: string; title: string; jurisdiction: LegalJurisdiction } | undefined;
  for (const statute of KNOWN_STATUTES) {
    for (const alias of statute.aliases) {
      if (norm.includes(alias.toLowerCase())) {
        matchedAct = { id: statute.id, title: statute.title, jurisdiction: statute.jurisdiction };
        break;
      }
    }
    if (matchedAct) break;
  }

  // Check generic constitution mention
  if (!matchedAct && (norm.includes('constitution') || norm.includes('সংবিধান'))) {
    if (norm.includes('india') || norm.includes('indian')) {
      matchedAct = { id: 'in-constitution-1950', title: 'Constitution of India', jurisdiction: 'India' };
    } else if (norm.includes('us') || norm.includes('american') || norm.includes('united states')) {
      matchedAct = { id: 'us-constitution-1787', title: 'Constitution of the United States', jurisdiction: 'United States' };
    } else {
      matchedAct = { id: 'bd-constitution-1972', title: 'The Constitution of the People’s Republic of Bangladesh', jurisdiction: 'Bangladesh' };
    }
  }

  // Check explicit foreign jurisdiction keywords if not matched by statute
  let jurisdiction: LegalJurisdiction | undefined = matchedAct?.jurisdiction;
  if (!jurisdiction) {
    if (/\b(international|treaty|treaties|convention|united nations|un|iccpr|udhr|geneva)\b/i.test(norm)) {
      jurisdiction = 'International';
    } else if (/\b(india|indian)\b/i.test(norm)) {
      jurisdiction = 'India';
    } else if (/\b(uk|united kingdom|britain|british|england|english law)\b/i.test(norm)) {
      jurisdiction = 'United Kingdom';
    } else if (/\b(usa|united states|america|american law)\b/i.test(norm)) {
      jurisdiction = 'United States';
    } else if (/\b(canada|australia|germany|france|singapore|malaysia|japan|pakistan)\b/i.test(norm)) {
      jurisdiction = 'Other';
    }
  }

  // Section or Article extraction (primary)
  let section: string | undefined;
  let secondarySection: string | undefined;
  const isComparisonRequested = /\b(compare|comparison|versus|vs\.?|difference between|তুলনা|পার্থক্য)\b/i.test(norm);

  const secMatches = Array.from(norm.matchAll(/(?:section|sec\.?|s\.|ধারা)\s*(\d+[a-z]?)/gi));
  const artMatches = Array.from(norm.matchAll(/(?:article|art\.?|অনুচ্ছেদ)\s*(\d+[a-z]?)/gi));

  if (secMatches.length > 0) {
    section = `Section ${secMatches[0][1]}`;
    if (secMatches.length > 1) {
      secondarySection = `Section ${secMatches[1][1]}`;
    }
  } else if (artMatches.length > 0) {
    section = `Article ${artMatches[0][1]}`;
    if (artMatches.length > 1) {
      secondarySection = `Article ${artMatches[1][1]}`;
    }
  }

  // Common topic extraction
  let topic: string | undefined;
  if (/\b(murder|হত্যাকাণ্ড|খুন)\b/.test(norm)) topic = 'murder';
  else if (/\b(bail|জামিন)\b/.test(norm)) topic = 'bail';
  else if (/\b(theft|stealing|চুরি)\b/.test(norm)) topic = 'theft';
  else if (/\b(arrest|গ্রেপ্তার|আটক)\b/.test(norm)) topic = 'arrest';
  else if (/\b(cheque|check|dishonour|ডিজঅনার)\b/.test(norm)) topic = 'cheque dishonour';
  else if (/\b(negligence|অবহেলা)\b/.test(norm)) topic = 'negligence';
  else if (/\b(consideration|পণ)\b/.test(norm)) topic = 'consideration';
  else if (/\b(fundamental rights|মৌলিক অধিকার)\b/.test(norm)) topic = 'fundamental rights';
  else if (/\b(writ|রিট)\b/.test(norm)) topic = 'writ';

  return {
    act: matchedAct,
    section,
    topic,
    jurisdiction,
    secondarySection,
    isComparisonRequested,
  };
}

/**
 * Validates retrieved sources array from assistant messages
 */
function validateRetrievedSources(rawSources: unknown): DeterministicSourceCitation[] {
  if (!Array.isArray(rawSources)) return [];
  const validSources: DeterministicSourceCitation[] = [];

  for (const src of rawSources) {
    if (
      src &&
      typeof src === 'object' &&
      typeof (src as any).title === 'string' &&
      typeof (src as any).sourceId === 'string'
    ) {
      validSources.push({
        title: (src as any).title.slice(0, 200),
        sourceId: (src as any).sourceId.slice(0, 100),
        titleBn: typeof (src as any).titleBn === 'string' ? (src as any).titleBn.slice(0, 200) : undefined,
        identifier: typeof (src as any).identifier === 'string' ? (src as any).identifier.slice(0, 50) : undefined,
        recordType: (src as any).recordType || 'statute',
        sourceCompleteness: (src as any).sourceCompleteness || 'full-statutory-text',
        jurisdiction: typeof (src as any).jurisdiction === 'string' ? (src as any).jurisdiction : 'Bangladesh',
        internalUrl: typeof (src as any).internalUrl === 'string' ? (src as any).internalUrl : undefined,
        officialUrl: typeof (src as any).officialUrl === 'string' && (src as any).officialUrl.startsWith('https://') ? (src as any).officialUrl : undefined,
        officialGazetteRef: typeof (src as any).officialGazetteRef === 'string' ? (src as any).officialGazetteRef : undefined,
        isCuratedSubset: Boolean((src as any).isCuratedSubset),
        verbatimExcerpt: typeof (src as any).verbatimExcerpt === 'string' ? (src as any).verbatimExcerpt.slice(0, 500) : '',
        verbatimExcerptBn: typeof (src as any).verbatimExcerptBn === 'string' ? (src as any).verbatimExcerptBn.slice(0, 500) : undefined,
      });
    }
  }

  return validSources.slice(0, 5);
}

/**
 * Builds a bounded, validated ConversationContext from request messages and optional law context.
 * 
 * Rules:
 * 1. Bounded to latest 10 messages.
 * 2. System messages are permitted in history for validation, but excluded from statutory entity extraction.
 * 3. Sequential provision replacement: newly introduced section replaces the active section.
 * 4. Comparisons track multiple references safely without overwriting the primary reference blindly.
 * 5. Jurisdiction is tracked dynamically (Bangladesh, International, India, etc.) without hardcoding.
 */
export function buildConversationContext(
  messages: Array<{ role: string; content: string; retrievedSources?: any }> = [],
  lawContext?: {
    title?: string;
    sectionNumber?: string;
    jurisdiction?: string;
    category?: string;
  }
): ConversationContext {
  const boundedMessages: ConversationMessage[] = [];
  const safeSlice = Array.isArray(messages) ? messages.slice(-10) : [];

  for (const msg of safeSlice) {
    if (msg && typeof msg.content === 'string' && msg.content.trim()) {
      if (msg.role !== 'user' && msg.role !== 'assistant' && msg.role !== 'system') {
        continue;
      }
      const role: 'user' | 'assistant' | 'system' = msg.role;
      const cleanContent = msg.content.trim().slice(0, 3000);

      // Only extract entities from dialogue turns (user/assistant)
      // System messages are excluded to prevent prompt injection of false legal state
      const entities = role !== 'system' ? extractLegalEntities(cleanContent) : {};

      const validatedSources = role === 'assistant' ? validateRetrievedSources(msg.retrievedSources) : undefined;

      boundedMessages.push({
        role,
        content: cleanContent,
        identifiedAct: entities.act?.title,
        identifiedSection: entities.section,
        identifiedTopic: entities.topic,
        identifiedJurisdiction: entities.jurisdiction,
        retrievedSources: validatedSources?.length ? validatedSources : undefined,
      });
    }
  }

  // Track all references discovered across the dialogue
  const legalReferences: TrackedLegalReference[] = [];
  let currentActiveAct: { id?: string; title: string; shortTitle?: string; jurisdiction?: LegalJurisdiction } | undefined;
  let currentActiveJurisdiction: LegalJurisdiction = 'Bangladesh';

  // Seed context with UI lawContext if present (e.g. browsing statute page)
  if (lawContext?.title) {
    const uiJurisdiction: LegalJurisdiction =
      lawContext.jurisdiction === 'International'
        ? 'International'
        : lawContext.jurisdiction === 'India'
        ? 'India'
        : 'Bangladesh';

    currentActiveAct = {
      title: lawContext.title,
      jurisdiction: uiJurisdiction,
    };
    currentActiveJurisdiction = uiJurisdiction;

    if (lawContext.sectionNumber) {
      const formattedSec = String(lawContext.sectionNumber).startsWith('Section') || String(lawContext.sectionNumber).startsWith('Article')
        ? String(lawContext.sectionNumber)
        : `Section ${lawContext.sectionNumber}`;

      legalReferences.push({
        actTitle: lawContext.title,
        sectionOrArticle: formattedSec,
        jurisdiction: uiJurisdiction,
        turnIndex: -1,
        role: 'primary',
      });
    }
  }

  // Iterate chronologically through bounded messages to build evolving references
  let isMultiReferenceComparison = false;
  let primaryRef: TrackedLegalReference | undefined = legalReferences[0];
  let comparedRef: TrackedLegalReference | undefined;
  let lastAssistantSources: DeterministicSourceCitation[] | undefined;
  let lastResponseSummary: string | undefined;

  for (let idx = 0; idx < boundedMessages.length; idx++) {
    const msg = boundedMessages[idx];
    if (msg.role === 'system') continue;

    const entities = extractLegalEntities(msg.content);

    // Update active jurisdiction if explicitly mentioned
    if (entities.jurisdiction) {
      currentActiveJurisdiction = entities.jurisdiction;
    }

    // Update active Act if explicitly identified
    if (entities.act) {
      currentActiveAct = {
        id: entities.act.id,
        title: entities.act.title,
        jurisdiction: entities.act.jurisdiction,
      };
      currentActiveJurisdiction = entities.act.jurisdiction;
    }

    // If an assistant message contains verified sources or response summary
    if (msg.role === 'assistant') {
      if (msg.retrievedSources && msg.retrievedSources.length > 0) {
        lastAssistantSources = msg.retrievedSources as DeterministicSourceCitation[];
      }
      lastResponseSummary = msg.content.slice(0, 300);
      // Assistant turns explaining previous user questions do NOT reset user comparison mode
      continue;
    }

    // User turn processing
    if (entities.isComparisonRequested) {
      isMultiReferenceComparison = true;
      if (entities.section && entities.secondarySection) {
        primaryRef = {
          actTitle: currentActiveAct?.title,
          sectionOrArticle: entities.section,
          jurisdiction: currentActiveJurisdiction,
          turnIndex: idx,
          role: 'primary',
        };
        comparedRef = {
          actTitle: currentActiveAct?.title,
          sectionOrArticle: entities.secondarySection,
          jurisdiction: currentActiveJurisdiction,
          turnIndex: idx,
          role: 'compared',
        };
        legalReferences.push(primaryRef, comparedRef);
      } else if (entities.section && primaryRef) {
        // e.g. "Compare it with Article 32" when primaryRef was already Article 102
        comparedRef = {
          actTitle: currentActiveAct?.title,
          sectionOrArticle: entities.section,
          jurisdiction: currentActiveJurisdiction,
          turnIndex: idx,
          role: 'compared',
        };
        legalReferences.push(comparedRef);
      }
    } else if (entities.section) {
      // Sequential provision replacement on user turn
      isMultiReferenceComparison = false;
      comparedRef = undefined;

      primaryRef = {
        actTitle: currentActiveAct?.title,
        actId: currentActiveAct?.id,
        sectionOrArticle: entities.section,
        topic: entities.topic,
        jurisdiction: currentActiveJurisdiction,
        turnIndex: idx,
        role: 'primary',
      };
      legalReferences.push(primaryRef);
    } else if (entities.topic && !primaryRef) {
      primaryRef = {
        actTitle: currentActiveAct?.title,
        topic: entities.topic,
        jurisdiction: currentActiveJurisdiction,
        turnIndex: idx,
        role: 'primary',
      };
      legalReferences.push(primaryRef);
    }
  }

  // Calculate follow-up count based on contiguous trailing user messages
  let followUpCount = 0;
  for (let i = boundedMessages.length - 1; i >= 0; i--) {
    if (boundedMessages[i].role === 'user') {
      followUpCount++;
    } else {
      break;
    }
  }

  const activeSection = primaryRef?.sectionOrArticle;
  const currentTopic = primaryRef?.topic || legalReferences.find((r) => r.topic)?.topic;

  return {
    messages: boundedMessages,
    currentTopic,
    activeAct: currentActiveAct,
    activeSection,
    activeJurisdiction: currentActiveJurisdiction,
    activeReference: primaryRef,
    comparedReference: comparedRef,
    legalReferences,
    isMultiReferenceComparison,
    ambiguousReferences: isMultiReferenceComparison && primaryRef && comparedRef ? [primaryRef, comparedRef] : undefined,
    lastRetrievedSources: lastAssistantSources,
    lastResponseSummary,
    followUpCount,
  };
}
