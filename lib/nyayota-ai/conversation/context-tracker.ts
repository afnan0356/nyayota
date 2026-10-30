/**
 * Nyayota AI — Request-Scoped Conversation Context Tracker
 * 
 * Binds and validates conversation history from incoming request payloads:
 * - Bounds history to the 10 most recent turns to eliminate memory drift and DOS risks.
 * - Extracts active statute, section, article, topic, and jurisdiction from prior messages.
 * - Parses optional active statute context passed from UI statute views.
 * - Does not use any persistent database or cross-session user storage.
 */

import { ConversationContext, ConversationMessage } from './types';
import { normalizeConversationalText } from './language-detector';

// Known major statutes in Nyayota's repository for entity resolution
const KNOWN_STATUTES = [
  { id: 'bd-penal-code-1860', title: 'The Penal Code, 1860', aliases: ['penal code', 'penal', 'দণ্ডবিধি', 'দন্ডবিধি', 'দণ্ডবিধি ১৮৬০'] },
  { id: 'bd-crpc-1898', title: 'The Code of Criminal Procedure, 1898', aliases: ['crpc', 'code of criminal procedure', 'ফৌজদারি কার্যবিধি', 'ফৌজদারী কার্যবিধি'] },
  { id: 'bd-cpc-1908', title: 'The Code of Civil Procedure, 1908', aliases: ['cpc', 'code of civil procedure', 'দেওয়ানি কার্যবিধি', 'দেওয়ানী কার্যবিধি'] },
  { id: 'bd-constitution-1972', title: 'The Constitution of the People’s Republic of Bangladesh', aliases: ['constitution', 'গণপ্রজাতন্ত্রী বাংলাদেশের সংবিধান', 'সংবিধান'] },
  { id: 'bd-evidence-act-1872', title: 'The Evidence Act, 1872', aliases: ['evidence act', 'সাক্ষ্য আইন'] },
  { id: 'bd-contract-act-1872', title: 'The Contract Act, 1872', aliases: ['contract act', 'চুক্তি আইন'] },
  { id: 'bd-labor-act-2006', title: 'The Bangladesh Labour Act, 2006', aliases: ['labor act', 'labour act', 'বাংলাদেশ শ্রম আইন', 'শ্রম আইন'] },
  { id: 'bd-dsa-2018', title: 'Digital Security Act, 2018', aliases: ['digital security act', 'cyber security act', 'ডিজিটাল নিরাপত্তা আইন'] },
  { id: 'bd-nita-1881', title: 'The Negotiable Instruments Act, 1881', aliases: ['negotiable instruments act', 'ni act', 'চেক ডিজঅনার আইন'] },
];

const SECTION_REGEX = /(?:section|sec\.?|s\.|ধারা)\s*(\d+[a-z]?)/i;
const ARTICLE_REGEX = /(?:article|art\.?|অনুচ্ছেদ)\s*(\d+[a-z]?)/i;

/**
 * Extracts active statutory reference (Act title and section number) from text.
 */
export function extractLegalEntities(text: string): {
  act?: { id: string; title: string };
  section?: string;
  topic?: string;
} {
  const norm = normalizeConversationalText(text);

  let matchedAct: { id: string; title: string } | undefined;
  for (const statute of KNOWN_STATUTES) {
    for (const alias of statute.aliases) {
      if (norm.includes(alias.toLowerCase())) {
        matchedAct = { id: statute.id, title: statute.title };
        break;
      }
    }
    if (matchedAct) break;
  }

  // Section or Article extraction
  let section: string | undefined;
  const secMatch = norm.match(SECTION_REGEX);
  if (secMatch) {
    section = `Section ${secMatch[1]}`;
  } else {
    const artMatch = norm.match(ARTICLE_REGEX);
    if (artMatch) {
      section = `Article ${artMatch[1]}`;
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

  return { act: matchedAct, section, topic };
}

/**
 * Builds a bounded, validated ConversationContext from request messages and optional law context.
 */
export function buildConversationContext(
  messages: Array<{ role: string; content: string }> = [],
  lawContext?: {
    title?: string;
    sectionNumber?: string;
    jurisdiction?: string;
    category?: string;
  }
): ConversationContext {
  // Bound to the last 10 messages and sanitize
  const boundedMessages: ConversationMessage[] = [];
  const safeSlice = Array.isArray(messages) ? messages.slice(-10) : [];

  for (const msg of safeSlice) {
    if (msg && typeof msg.content === 'string' && msg.content.trim()) {
      const role = msg.role === 'user' ? 'user' : msg.role === 'system' ? 'system' : 'assistant';
      const cleanContent = msg.content.trim().slice(0, 3000);
      const entities = extractLegalEntities(cleanContent);

      boundedMessages.push({
        role,
        content: cleanContent,
        identifiedAct: entities.act?.title,
        identifiedSection: entities.section,
        identifiedTopic: entities.topic,
      });
    }
  }

  // Reconstruct active state by reading backwards from recent messages
  let activeAct: { id?: string; title: string; shortTitle?: string } | undefined;
  let activeSection: string | undefined;
  let currentTopic: string | undefined;
  let activeJurisdiction: 'Bangladesh' | 'International' | 'India' | 'unknown' = 'Bangladesh';
  let lastResponseSummary: string | undefined;

  // If UI passed active statute context from currently viewed statute page
  if (lawContext?.title) {
    activeAct = { title: lawContext.title };
    if (lawContext.sectionNumber) {
      activeSection = String(lawContext.sectionNumber).startsWith('Section') || String(lawContext.sectionNumber).startsWith('Article')
        ? String(lawContext.sectionNumber)
        : `Section ${lawContext.sectionNumber}`;
    }
  }

  // Scan recent history backwards to find most recently established Act, Section, and Topic
  for (let i = boundedMessages.length - 1; i >= 0; i--) {
    const msg = boundedMessages[i];

    if (!activeAct && msg.identifiedAct) {
      activeAct = { title: msg.identifiedAct };
    }
    if (!activeSection && msg.identifiedSection) {
      activeSection = msg.identifiedSection;
    }
    if (!currentTopic && msg.identifiedTopic) {
      currentTopic = msg.identifiedTopic;
    }

    if (msg.role === 'assistant' && !lastResponseSummary) {
      lastResponseSummary = msg.content.slice(0, 300);
    }

    // Stop searching if all key entities are resolved
    if (activeAct && activeSection && currentTopic) {
      break;
    }
  }

  // Calculate follow up count based on contiguous trailing user follow-up questions
  let followUpCount = 0;
  for (let i = boundedMessages.length - 1; i >= 0; i--) {
    if (boundedMessages[i].role === 'user') {
      followUpCount++;
    } else {
      break;
    }
  }

  return {
    messages: boundedMessages,
    currentTopic,
    activeAct,
    activeSection,
    activeJurisdiction,
    lastResponseSummary,
    followUpCount,
  };
}
