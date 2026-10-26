/**
 * Nyayota AI — Query Routing Engine
 * 
 * Orchestrates intent classification, jurisdiction verification,
 * disambiguation handling, and deterministic legal retrieval.
 */

import {
  QueryRouteResult,
  IntentClassificationResult,
  RetrievalOptions,
} from './types';
import { classifyIntent } from './intent-classifier';
import { retrieveLegalSources } from './retrieval-engine';

export interface RoutingOptions extends RetrievalOptions {
  /** If false, skips calling the retrieval engine even if intent is retrieval-eligible */
  executeRetrieval?: boolean;
}

// ============================================================================
// Deterministic Message Generators
// ============================================================================

const GREETING_RESPONSE = {
  en: `Hello! I am Nyayota AI, your source-grounded legal information assistant. I can help you search and understand Bangladesh statutory laws, constitutional articles, legal glossary terms, procedural guides, and international human rights treaties. How can I assist your legal research today?`,
  bn: `নমস্কার! আমি ন্যায়তা এআই, আপনার তথ্যসূত্র-ভিত্তিক আইনি তথ্য সহকারী। আমি আপনাকে বাংলাদেশের সংবিধিবদ্ধ আইন, সংবিধানের অনুচ্ছেদ, আইনি পরিভাষা, প্রক্রিয়াগত নির্দেশিকা এবং আন্তর্জাতিক মানবাধিকার চুক্তি অনুসন্ধান ও বুঝতে সাহায্য করতে পারি। আজ আপনার গবেষণায় কিভাবে সাহায্য করতে পারি?`,
};

const NYAYOTA_HELP_RESPONSE = {
  en: `Nyayota is an open-access legal research platform designed to make Bangladesh legislation and international treaties transparent and understandable.

Key Features & Tools:
1. Bangladesh Laws Catalog (/bangladesh-laws): Searchable enactments from 1836 to present.
2. International Law (/international-laws): Core multilateral human rights treaties and UN conventions.
3. Bilingual Glossary (/glossary): Plain-language explanations of English, Bengali, and Latin legal doctrines.
4. Legal Outcome Guides (/legal-outcome-guide): Step-by-step citizen roadmaps for common legal scenarios (FIR, GD, Bail, Cheque Dishonor).
5. Citation Generator: Bluebook, OSCOLA, APA, and MLA standard legal citations on any statute page.

Language Support:
Nyayota fully supports queries in both English and Bengali (বাংলা), including Bengali numerals (০-৯).

Reporting Mistakes or Corrections:
We maintain strict statutory fidelity. If you spot an error, typographical mistake, or outdated amendment, please email our editorial team directly at nyayota.contact@gmail.com with the Act title and section number.`,
  bn: `ন্যায়তা একটি উন্মুক্ত আইনি গবেষণা প্ল্যাটফর্ম যা বাংলাদেশের আইন এবং আন্তর্জাতিক চুক্তিকে সহজবোধ্য এবং অনুসন্ধানযোগ্য করে তোলে।

প্রধান বৈশিষ্ট্য ও সুবিধাসমূহ:
১. বাংলাদেশ আইন ক্যাটালগ (/bangladesh-laws): ১৮৩৬ সাল থেকে বর্তমান পর্যন্ত সংবিধিবদ্ধ আইন।
২. আন্তর্জাতিক আইন (/international-laws): প্রধান বহুপাক্ষিক মানবাধিকার সনদ ও জাতিসংঘ চুক্তি।
৩. দ্বিভাষিক আইনি শব্দকোষ (/glossary): ইংরেজি, বাংলা এবং ল্যাটিন আইনি পরিভাষার সহজ ব্যাখ্যা।
৪. আইনি সমাধান নির্দেশিকা (/legal-outcome-guide): সাধারণ আইনি পরিস্থিতিতে নাগরিকের করণীয় (জিডি, এজাহার, জামিন, চেক ডিজঅনার)।
৫. সাইটেশন জেনারেটর: যেকোনো আইনের পাতায় ব্লুবুক, অসকোলা, এপিএ এবং এমএলএ ফরম্যাটে সাইটেশন।

ভাষা সমর্থন:
ন্যায়তা সম্পূর্ণভাবে ইংরেজি এবং বাংলা উভয় ভাষায় প্রশ্ন সমর্থন করে, যার মধ্যে বাংলা সংখ্যাও (০-৯) অন্তর্ভুক্ত।

ভুল বা তথ্যের অসঙ্গতি রিপোর্ট করা:
আমরা তথ্যের নির্ভুলতা বজায় রাখতে প্রতিশ্রুতিবদ্ধ। কোনো ভুল, টাইপো বা পুরনো সংশোধন লক্ষ্য করলে দয়া করে সরাসরি nyayota.contact@gmail.com ঠিকানায় আইনের নাম ও ধারা উল্লেখ করে ইমেইল করুন।`,
};

const OUT_OF_SCOPE_RESPONSE = {
  en: `Nyayota is strictly dedicated to Bangladesh statutory laws, constitutional jurisprudence, procedural codes, and international human rights conventions. We cannot answer non-legal questions such as general coding, weather forecasts, entertainment trivia, or culinary recipes. Please enter a legal topic, statute name, or section number.`,
  bn: `ন্যায়তা শুধুমাত্র বাংলাদেশের সংবিধিবদ্ধ আইন, সাংবিধানিক নীতিমালা, কার্যবিধি এবং আন্তর্জাতিক মানবাধিকার সনদের জন্য নিবেদিত। আমরা সাধারণ প্রোগ্রামিং, আবহাওয়া, বিনোদন বা রান্নার মতো আইনবহির্ভূত প্রশ্নের উত্তর দিতে পারি না। অনুগ্রহ করে কোনো আইনি বিষয়, আইনের নাম বা ধারা অনুসন্ধান করুন।`,
};

const UNKNOWN_QUERY_RESPONSE = {
  en: `We could not recognize a clear legal topic or question in your query. To get accurate statutory information, try searching for:
- An Act name (e.g., "The Penal Code, 1860" or "দণ্ডবিধি")
- A specific provision (e.g., "CrPC Section 54" or "ধারা ৩০২ দণ্ডবিধি")
- A legal concept (e.g., "Habeas Corpus" or "জামিন কি?")
- A procedural scenario (e.g., "How to file a GD" or "চেক ডিজঅনার")`,
  bn: `আপনার প্রশ্নে কোনো সুনির্দিষ্ট আইনি বিষয় বা জিজ্ঞাসা চিহ্নিত করা যায়নি। নির্ভুল সংবিধিবদ্ধ তথ্য পেতে অনুগ্রহ করে অনুসন্ধান করুন:
- আইনের নাম (যেমন: "The Penal Code, 1860" বা "দণ্ডবিধি")
- নির্দিষ্ট ধারা (যেমন: "CrPC Section 54" বা "দণ্ডবিধি ধারা ৩০২")
- আইনি পরিভাষা (যেমন: "হেবিয়াস করপাস" বা "জামিন কি?")
- প্রক্রিয়াগত প্রশ্ন (যেমন: "জিডি করার নিয়ম" বা "চেক ডিজঅনার")`,
};

// ============================================================================
// Query Router Function
// ============================================================================

/**
 * Routes a user query through the intent classifier and executes retrieval
 * or deterministic response handling based on the classified intent.
 */
export async function routeQuery(
  rawQuery: string,
  options: RoutingOptions = {}
): Promise<QueryRouteResult> {
  const startTime = Date.now();
  const executeRetrieval = options.executeRetrieval ?? true;

  // Step 1: Deterministic Intent Classification
  const intent: IntentClassificationResult = classifyIntent(rawQuery);
  const normalizedQuery = intent.normalizedQuery;

  // Step 2: Handle Non-Retrieval Paths
  switch (intent.suggestedProcessingPath) {
    case 'greeting_handler':
      return {
        query: rawQuery,
        normalizedQuery,
        intent,
        processingPath: 'greeting_handler',
        deterministicMessage: GREETING_RESPONSE.en,
        deterministicMessageBn: GREETING_RESPONSE.bn,
        routingReason: 'User initiated conversational greeting without substantive legal inquiry.',
        executionTimeMs: Date.now() - startTime,
        status: 'handled-deterministically',
      };

    case 'nyayota_help_handler':
      return {
        query: rawQuery,
        normalizedQuery,
        intent,
        processingPath: 'nyayota_help_handler',
        deterministicMessage: NYAYOTA_HELP_RESPONSE.en,
        deterministicMessageBn: NYAYOTA_HELP_RESPONSE.bn,
        routingReason: 'User requested information regarding Nyayota features, language support, or feedback.',
        executionTimeMs: Date.now() - startTime,
        status: 'handled-deterministically',
      };

    case 'out_of_scope_handler':
      return {
        query: rawQuery,
        normalizedQuery,
        intent,
        processingPath: 'out_of_scope_handler',
        deterministicMessage: OUT_OF_SCOPE_RESPONSE.en,
        deterministicMessageBn: OUT_OF_SCOPE_RESPONSE.bn,
        routingReason: 'Query matched non-legal topical patterns (programming, trivia, weather).',
        executionTimeMs: Date.now() - startTime,
        status: 'out-of-scope',
      };

    case 'unsupported_legal_handler': {
      const unsupportedMsgEn =
        `The requested legal query falls outside Nyayota's curated legal scope. ` +
        `Nyayota indexes the domestic statutory laws of Bangladesh and international multilateral human rights treaties. ` +
        `Foreign municipal legislation (such as foreign national laws or state codes) is not supported.`;
      const unsupportedMsgBn =
        `অনুরোধকৃত আইনি বিষয়টি ন্যায়তার সংগৃহীত আইনি পরিধির বাইরে। ` +
        `ন্যায়তা শুধুমাত্র বাংলাদেশের অভ্যন্তরীণ সংবিধিবদ্ধ আইন এবং আন্তর্জাতিক বহুপাক্ষিক মানবাধিকার চুক্তি সংরক্ষণ ও উপস্থাপন করে। ` +
        `বিদেশী আঞ্চলিক বা রাষ্ট্রীয় আইন এখানে অন্তর্ভুক্ত নয়।`;

      return {
        query: rawQuery,
        normalizedQuery,
        intent,
        processingPath: 'unsupported_legal_handler',
        deterministicMessage: unsupportedMsgEn,
        deterministicMessageBn: unsupportedMsgBn,
        routingReason: intent.jurisdictionReason || 'Query pertains to foreign or unindexed legal systems.',
        executionTimeMs: Date.now() - startTime,
        status: 'unsupported',
      };
    }

    case 'clarification_handler': {
      // If query is an ambiguous standalone section number, run retrieval to provide concrete candidates
      let candidateRetrieval;
      if (executeRetrieval && intent.detectedSectionNumber && intent.detectedJurisdiction !== 'India') {
        candidateRetrieval = await retrieveLegalSources(rawQuery, {
          limit: options.limit ?? 6,
          targetJurisdiction: 'Bangladesh',
        });
      }

      return {
        query: rawQuery,
        normalizedQuery,
        intent,
        processingPath: 'clarification_handler',
        clarificationPrompt: intent.clarificationPrompt,
        clarificationOptions: intent.clarificationOptions,
        retrievalResponse: candidateRetrieval,
        routingReason: intent.jurisdictionReason || 'Query lacks specific Act context or involves cross-jurisdiction terminology.',
        executionTimeMs: Date.now() - startTime,
        status: 'clarification-required',
      };
    }

    case 'unknown_handler':
      return {
        query: rawQuery,
        normalizedQuery,
        intent,
        processingPath: 'unknown_handler',
        deterministicMessage: UNKNOWN_QUERY_RESPONSE.en,
        deterministicMessageBn: UNKNOWN_QUERY_RESPONSE.bn,
        routingReason: 'Query text was empty, gibberish, or could not be mapped to any legal concept.',
        executionTimeMs: Date.now() - startTime,
        status: 'unknown',
      };

    case 'retrieval_engine':
    default: {
      if (!executeRetrieval) {
        return {
          query: rawQuery,
          normalizedQuery,
          intent,
          processingPath: 'retrieval_engine',
          routingReason: 'Intent classified as legal retrieval candidate (retrieval skipped via options).',
          executionTimeMs: Date.now() - startTime,
          status: 'routed-to-retrieval',
        };
      }

      // Execute deterministic source retrieval
      const retrievalResponse = await retrieveLegalSources(rawQuery, {
        limit: options.limit ?? 8,
        minScore: options.minScore ?? 20,
        targetJurisdiction: intent.detectedJurisdiction === 'International' ? 'International' : 'Bangladesh',
        includeCatalogRecords: options.includeCatalogRecords ?? true,
      });

      // Distinguish "not found in indexed Nyayota collection" from "does not exist in Bangladesh law"
      let deterministicMessage: string | undefined;
      let deterministicMessageBn: string | undefined;

      if (retrievalResponse.totalMatches === 0) {
        deterministicMessage =
          `No matching provisions or documents were found in Nyayota's indexed collection for this query. ` +
          `Please note that this does not mean the provision does not exist in Bangladesh law; rather, it may not yet be indexed in Nyayota's curated database. ` +
          `You can search the comprehensive Bangladesh Code Catalog (/bangladesh-laws) or consult the official Bangladesh Gazette.`;
        deterministicMessageBn =
          `এই অনুসন্ধানের জন্য ন্যায়তার সংগৃহীত ডাটাবেসে কোনো সংবিধিবদ্ধ ধারা বা নথি পাওয়া যায়নি। ` +
          `দয়া করে মনে রাখবেন যে এর অর্থ এই নয় যে বাংলাদেশের আইনে এই বিধানটি নেই; বরং এটি এখনো ন্যায়তার সংগৃহীত সংগ্রহশালায় সূচীবদ্ধ নাও হতে পারে। ` +
          `আপনি সম্পূর্ণ বাংলাদেশ কোড ক্যাটালগ (/bangladesh-laws) অনুসন্ধান করতে পারেন অথবা সরকারি বাংলাদেশ গেজেট দেখতে পারেন।`;
      }

      return {
        query: rawQuery,
        normalizedQuery,
        intent,
        processingPath: 'retrieval_engine',
        retrievalResponse,
        deterministicMessage,
        deterministicMessageBn,
        routingReason: `Successfully retrieved ${retrievalResponse.totalMatches} source records for intent '${intent.primaryIntent}'.`,
        executionTimeMs: Date.now() - startTime,
        status: 'routed-to-retrieval',
      };
    }
  }
}
