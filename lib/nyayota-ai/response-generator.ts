/**
 * Nyayota AI — Source-Grounded Deterministic Response Generator
 * 
 * Converts verified legal retrieval records and query routing outcomes into
 * clear, structured, educational legal explanations using deterministic templates.
 * 
 * Strict Source-Grounding & Safety Rules:
 * 1. Never fabricates statutory provisions, section numbers, citations, or URLs.
 * 2. Grounds all legal explanations strictly in retrieved database records.
 * 3. Clearly distinguishes statutory text, editorial explanations, glossary doctrines, and procedural guides.
 * 4. Strictly separates Bangladesh law from Indian law (IPC notice).
 * 5. Distinguishes "not found in indexed Nyayota database" from "does not exist in Bangladesh law".
 * 6. Generates authentic internal and external source links only when verified in data.
 * 7. Provides bilingual responses (English & Bengali) preserving original Bengali legal terminology.
 */

import {
  QueryRouteResult,
  LegalRetrievalResult,
  DeterministicLegalResponse,
  DeterministicSourceCitation,
  ResponseStatus,
  RetrievalOptions,
} from './types';
import { routeQuery } from './query-router';
import { normalizeSectionIdentifier } from './retrieval-engine';

export interface ResponseGenerationOptions extends RetrievalOptions {
  /** Target language preference ('en' | 'bn' | 'both', defaults to 'both') */
  preferredLanguage?: 'en' | 'bn' | 'both';
}

// ============================================================================
// Standard Disclaimers
// ============================================================================

const STANDARD_DISCLAIMER_EN =
  'Notice: This information is provided strictly for educational and legal research purposes. ' +
  'It does not constitute formal legal advice, legal opinion, or an advocate-client relationship. ' +
  'For active legal disputes, criminal charges, or court filings, consult a licensed advocate enrolled with the Bangladesh Bar Council.';

const STANDARD_DISCLAIMER_BN =
  'সতর্কবার্তা: এই তথ্যটি সম্পূর্ণভাবে শিক্ষামূলক ও আইনি গবেষণার উদ্দেশ্যে সরবরাহ করা হয়েছে। ' +
  'এটি আনুষ্ঠানিক আইনি পরামর্শ, আইনি মতামত বা আইনজীবী-মক্কেল সম্পর্ক তৈরি করে না। ' +
  'সক্রিয় আইনি বিরোধ, ফৌজদারি অভিযোগ বা আদালতে মামলা পরিচালনার জন্য বাংলাদেশ বার কাউন্সিলে তালিকাভুক্ত আইনজীবীর পরামর্শ নিন।';

// ============================================================================
// Citation Converter Helper
// ============================================================================

/**
 * Maps a verified LegalRetrievalResult into a traceable DeterministicSourceCitation
 */
export function mapResultToCitation(result: LegalRetrievalResult): DeterministicSourceCitation {
  return {
    sourceId: result.sourceId,
    title: result.displayTitle,
    titleBn: result.displayTitleBn,
    identifier: result.identifier,
    recordType: result.recordType,
    sourceCompleteness: result.sourceCompleteness,
    jurisdiction: result.jurisdiction,
    internalUrl: result.internalDestination,
    officialUrl: result.officialSourceUrl,
    officialGazetteRef: result.officialGazetteRef,
    status: result.status,
    repealNote: result.repealNote,
    isCuratedSubset: result.sourceCompleteness === 'curated-section-subset',
    verbatimExcerpt: result.matchingText,
    verbatimExcerptBn: result.matchingTextBn,
  };
}

// ============================================================================
// Response Builders for Each Supported Intent
// ============================================================================

/**
 * 1. Greeting Response Builder
 */
function buildGreetingResponse(route: QueryRouteResult, startTime: number): DeterministicLegalResponse {
  return {
    query: route.query,
    normalizedQuery: route.normalizedQuery,
    detectedIntent: 'greeting',
    detectedJurisdiction: route.intent.detectedJurisdiction,
    status: 'conversational',
    headline: 'Welcome to Nyayota Legal Information Assistant',
    headlineBn: 'ন্যায়তা আইনি তথ্য সহকারীতে স্বাগতম',
    summary:
      'Nyayota AI provides source-grounded legal information focused on the codified statutes, ' +
      'constitutional articles, procedural codes, and international human rights treaties of Bangladesh.',
    summaryBn:
      'ন্যায়তা এআই বাংলাদেশের সংবিধিবদ্ধ আইন, সাংবিধানিক অনুচ্ছেদ, কার্যবিধি এবং ' +
      'আন্তর্জাতিক মানবাধিকার চুক্তির উপর ভিত্তি করে তথ্যসূত্র-নির্ভর আইনি তথ্য প্রদান করে।',
    structuredExplanation:
      `### Welcome to Nyayota AI\n\n` +
      `Nyayota AI is an educational legal research assistant that answers questions using verified, ` +
      `curated legal records digitized in Nyayota's legal database.\n\n` +
      `#### How to search:\n` +
      `- **Specific Section:** "Section 300 of Penal Code", "CrPC Section 54", "Article 27 Constitution"\n` +
      `- **Legal Doctrine or Term:** "What is Habeas Corpus?", "Define Mens Rea", "জামিন কি?"\n` +
      `- **Statute Overview:** "Tell me about The Contract Act, 1872", "দণ্ডবিধি ১৮৬০ পরিচিতি"\n` +
      `- **Citizen Procedural Guide:** "How to file a General Diary (GD)", "চেক ডিজঅনার হলে করণীয়"`,
    structuredExplanationBn:
      `### ন্যায়তা এআই-এ স্বাগতম\n\n` +
      `ন্যায়তা এআই একটি শিক্ষামূলক আইনি গবেষণা সহকারী যা ন্যায়তার ডাটাবেসে সংগৃহীত ` +
      `যাচাইকৃত সংবিধিবদ্ধ তথ্যের ভিত্তিতে প্রশ্নের উত্তর প্রদান করে।\n\n` +
      `#### অনুসন্ধানের নমুনা:\n` +
      `- **নির্দিষ্ট ধারা:** "দণ্ডবিধি ধারা ৩০০", "ফৌজদারি কার্যবিধি ধারা ৫৪", "সংবিধানের অনুচ্ছেদ ২৭"\n` +
      `- **আইনি পরিভাষা:** "হেবিয়াস করপাস কি?", "মেনস রিয়া এর সংজ্ঞা", "জামিন কি?"\n` +
      `- **আইন পরিচিতি:** "চুক্তি আইন ১৮৭২ সম্পর্কে বলুন", "দণ্ডবিধি ১৮৬০ পরিচিতি"\n` +
      `- **নাগরিক প্রক্রিয়াগত নির্দেশিকা:** "সাধারণ ডায়েরি (জিডি) করার নিয়ম", "চেক ডিজঅনার হলে করণীয়"`,
    sources: [],
    limitations: [],
    limitationsBn: [],
    disclaimer: STANDARD_DISCLAIMER_EN,
    disclaimerBn: STANDARD_DISCLAIMER_BN,
    generatedAt: new Date().toISOString(),
    executionTimeMs: Date.now() - startTime,
  };
}

/**
 * 2. Website Help Response Builder
 */
function buildWebsiteHelpResponse(route: QueryRouteResult, startTime: number): DeterministicLegalResponse {
  return {
    query: route.query,
    normalizedQuery: route.normalizedQuery,
    detectedIntent: 'nyayota_help',
    detectedJurisdiction: 'Bangladesh',
    status: 'conversational',
    headline: 'Nyayota Platform Capabilities & User Guide',
    headlineBn: 'ন্যায়তা প্ল্যাটফর্ম পরিচিতি ও ব্যবহার নির্দেশিকা',
    summary:
      'Nyayota is an open-access legal research platform designed to make Bangladesh legislation, ' +
      'constitutional jurisprudence, and international treaties searchable, transparent, and understandable.',
    summaryBn:
      'ন্যায়তা একটি উন্মুক্ত আইনি গবেষণা প্ল্যাটফর্ম যা বাংলাদেশের আইন, ' +
      'সাংবিধানিক নীতিমালা এবং আন্তর্জাতিক চুক্তিকে সহজলভ্য, স্বচ্ছ ও বোধগম্য করে তোলে।',
    structuredExplanation:
      `### Verified Platform Features\n\n` +
      `1. **Bangladesh Laws Catalog (\`/bangladesh-laws\`):** Chronological and categorical repository of primary legislation from 1836 to the present.\n` +
      `2. **International Treaties (\`/international-laws\`):** Multilateral UN conventions, human rights treaties, and covenants with official UNTS citations.\n` +
      `3. **Bilingual Legal Glossary (\`/glossary\`):** Clear plain-language definitions of English, Latin, and Bengali legal doctrines.\n` +
      `4. **Legal Outcome Guide (\`/legal-outcome-guide\`):** Citizen roadmaps for common legal scenarios (Bail, Arrest Rights, FIR vs. GD, Cheque Dishonor).\n` +
      `5. **Comparative Law Matrix (\`/compare\`):** Side-by-side statutory diffing and comparison.\n` +
      `6. **Standard Legal Citations:** Generates formatted Bluebook, OSCOLA, APA, and MLA citations on every statute page.\n` +
      `7. **Private In-Browser Bookmarks:** Bookmarks and personal notes are stored strictly in client \`localStorage\` with zero tracking.\n\n` +
      `#### Language Support\n` +
      `Nyayota supports queries and statutory reading in both **English** and **Bengali (বাংলা)**, including native Bengali numerals (০-৯).\n\n` +
      `#### Reporting Corrections\n` +
      `We maintain strict statutory fidelity. If you find a typo, outdated amendment, or missing section, please email our editorial team at **nyayota.contact@gmail.com** with the Act name and section number.`,
    structuredExplanationBn:
      `### প্ল্যাটফর্মের যাচাইকৃত সুবিধাসমূহ\n\n` +
      `১. **বাংলাদেশ আইন ক্যাটালগ (\`/bangladesh-laws\`):** ১৮৩৬ সাল থেকে বর্তমান পর্যন্ত মূল সংবিধিবদ্ধ আইনের সংগ্রহশালা।\n` +
      `২. **আন্তর্জাতিক আইন (\`/international-laws\`):** জাতিসংঘের প্রধান বহুপাক্ষিক মানবাধিকার চুক্তি ও কনভেনশন।\n` +
      `৩. **দ্বিভাষিক আইনি শব্দকোষ (\`/glossary\`):** ইংরেজি, ল্যাটিন এবং বাংলা আইনি পরিভাষার সহজবোধ্য ব্যাখ্যা।\n` +
      `৪. **আইনি সমাধান নির্দেশিকা (\`/legal-outcome-guide\`):** সাধারণ আইনি পরিস্থিতিতে নাগরিকের করণীয় (জামিন, গ্রেপ্তার অধিকার, এজাহার বনাম জিডি, চেক ডিজঅনার)।\n` +
      `৫. **তুলনামূলক আইন ম্যাট্রিক্স (\`/compare\`):** দুটি আইন বা সনদের পাশাপাশি তুলনামূলক বিশ্লেষণ।\n` +
      `৬. **স্ট্যান্ডার্ড সাইটেশন জেনারেটর:** ব্লুবুক, অসকোলা, এপিএ এবং এমএলএ ফরম্যাটে স্বয়ংক্রিয় সাইটেশন।\n` +
      `৭. **ব্যক্তিগত বুকমার্ক:** কোনো ট্র্যাকিং বা অ্যাকাউন্ট ছাড়াই ব্রাউজারের নিজস্ব \`localStorage\`-এ সংরক্ষিত থাকে।\n\n` +
      `#### ভাষা সমর্থন\n` +
      `ন্যায়তা **ইংরেজি** এবং **বাংলা** উভয় ভাষায় প্রশ্ন ও আইন পাঠ সমর্থন করে, যার মধ্যে বাংলা সংখ্যাও (০-৯) অন্তর্ভুক্ত।\n\n` +
      `#### তথ্যের ভুল সংশোধন ও যোগাযোগ\n` +
      `কোনো ভুল, টাইপো বা পুরনো তথ্য পরিলক্ষিত হলে আইনের নাম ও ধারা উল্লেখ করে সরাসরি **nyayota.contact@gmail.com** ঠিকানায় ইমেইল করুন।`,
    sources: [],
    limitations: [
      'Nyayota does not provide court filing services, active advocate representation, or direct judicial dispute resolution.',
      'Subordinate legislation (SROs) and judicial precedents (DLR/BLC case law) are roadmap features currently in development.',
    ],
    limitationsBn: [
      'ন্যায়তা আদালতে মামলা দায়ের বা সরাসরি আইনজীবীর প্রতিনিধিত্ব প্রদান করে না।',
      'অধীনস্থ প্রবিধান (এসআরও) এবং উচ্চ আদালতের রায় (ডিএলআর/বিএলসি) বর্তমানে উন্নয়ন প্রক্রিয়ায় রয়েছে।',
    ],
    disclaimer: STANDARD_DISCLAIMER_EN,
    disclaimerBn: STANDARD_DISCLAIMER_BN,
    generatedAt: new Date().toISOString(),
    executionTimeMs: Date.now() - startTime,
  };
}

/**
 * 3. Direct Legal Reference Response Builder
 */
function buildDirectReferenceResponse(
  route: QueryRouteResult,
  startTime: number
): DeterministicLegalResponse {
  const retrieval = route.retrievalResponse;

  // Case A: No matching records returned by retrieval engine
  if (!retrieval || retrieval.totalMatches === 0) {
    return buildNoRecordsFoundResponse(route, startTime);
  }

  // Case B1: Section number exceeds the total codified sections of the statute
  if (retrieval.status === 'section-exceeds-statute-range' || retrieval.sectionExceedsStatuteRange) {
    const actRecord =
      retrieval.results.find((r) => r.recordType === 'statute-metadata') ||
      retrieval.results[0];
    const info = retrieval.sectionExceedsStatuteRange;
    const actTitle = info?.statuteTitle || actRecord?.displayTitle || 'The Requested Statute';
    const actTitleBn = actRecord?.displayTitleBn;
    const secNum = info?.sectionNumber || retrieval.detectedSectionNumber || 'the requested section';
    const totalCount = info?.totalStatutorySections || 'known';

    return {
      query: route.query,
      normalizedQuery: route.normalizedQuery,
      detectedIntent: 'direct_legal_reference',
      detectedJurisdiction: 'Bangladesh',
      status: 'partial-coverage',
      headline: `${actTitle} — ${secNum} (Not in Curated Subset)`,
      headlineBn: actTitleBn ? `${actTitleBn} — ${secNum} (সংগৃহীত সেটে অনুপস্থিত)` : undefined,
      summary:
        `The statute "${actTitle}" is indexed in Nyayota, but ${secNum} is not present in our curated high-frequency section subset (${actTitle} contains ${totalCount} codified sections in total; ${secNum} exceeds the enacted statutory structure).`,
      summaryBn:
        `"${actTitleBn || actTitle}" আইনটি ন্যায়তায় অন্তর্ভুক্ত রয়েছে, তবে ${secNum} আমাদের সংগৃহীত সেটে অনুপস্থিত (${actTitleBn || actTitle} সর্বমোট ${totalCount}টি সংবিধিবদ্ধ ধারা ধারণ করে; ${secNum} এই আইনের মোট ধারার সংখ্যা অতিক্রম করে)।`,
      structuredExplanation:
        `### Statutory Boundary: Section Not Extant in Act\n\n` +
        `You searched for **${secNum}** under **${actTitle}**.\n\n` +
        `**Non-Existence in Law:**\n` +
        `According to the official codified text published under the Bangladesh Code, **${actTitle}** contains a total of **${totalCount} sections**.\n\n` +
        `Because **${secNum}** exceeds the maximum number of sections enacted for this statute, this provision does not exist in Bangladesh law under this Act.\n\n` +
        `#### Next steps:\n` +
        `1. Review the statute overview: \`${actRecord?.internalDestination || `/law/${actRecord?.sourceId}`}\`\n` +
        `2. Check whether you meant a section from another procedural statute (e.g. CrPC or CPC).\n` +
        `3. Consult the official legislative gazette at: [Laws of Bangladesh Portal](${actRecord?.officialSourceUrl || 'http://bdlaws.minlaw.gov.bd'})`,
      structuredExplanationBn:
        `### সংবিধিবদ্ধ সীমা: আইনে ধারার অনুপস্থিতি\n\n` +
        `আপনি **${actTitleBn || actTitle}**-এর অধীন **${secNum}** অনুসন্ধান করেছেন।\n\n` +
        `**আইনে অস্তিত্বহীনতা:**\n` +
        `বাংলাদেশ কোডের সরকারি সংবিধিবদ্ধ পাঠ্য অনুযায়ী, **${actTitleBn || actTitle}**-এ সর্বমোট **${totalCount}টি ধারা** রয়েছে।\n\n` +
        `যেহেতু **${secNum}** এই আইনের মোট ধারার সংখ্যা অতিক্রম করে, তাই এই আইনের অধীনে এই ধারাটির কোনো আইনি অস্তিত্ব নেই।`,
      sources: actRecord ? [mapResultToCitation(actRecord)] : [],
      limitations: [
        `Nyayota currently curates a high-frequency subset of provisions for ${actTitle}. ${secNum} is not yet digitized in our curated database (${actTitle} contains ${totalCount} codified sections in total; ${secNum} exceeds the enacted statutory structure).`,
        'Absence from Nyayota does not mean this section does not exist in Bangladesh law.',
      ],
      limitationsBn: [
        `ন্যায়তা বর্তমানে ${actTitleBn || actTitle}-এর সর্বাধিক ব্যবহৃত প্রধান ধারাগুলো সংরক্ষণ করেছে (${actTitleBn || actTitle} সর্বমোট ${totalCount}টি ধারা ধারণ করে; ${secNum} এই আইনের মোট সংখ্যা অতিক্রম করে)।`,
        'ন্যায়তার সংগ্রহে অনুপস্থিতির অর্থ এই নয় যে বাংলাদেশের আইনে এই ধারাটি নেই।',
      ],
      disclaimer: STANDARD_DISCLAIMER_EN,
      disclaimerBn: STANDARD_DISCLAIMER_BN,
      generatedAt: new Date().toISOString(),
      executionTimeMs: Date.now() - startTime,
    };
  }

  // Case B2: Act was recognized, but specific requested section is missing from curated subset
  if (retrieval.status === 'act-found-section-missing' || retrieval.ambiguityStatus === 'act-found-section-missing') {
    const actRecord =
      retrieval.results.find((r) => r.recordType === 'statute-metadata') ||
      retrieval.results[0];
    const actTitle = actRecord ? actRecord.displayTitle : 'The Requested Statute';
    const actTitleBn = actRecord?.displayTitleBn;
    const secNum = retrieval.detectedSectionNumber || 'the requested section';

    const limitations = [
      `Nyayota currently curates a high-frequency subset of provisions for ${actTitle}. ${secNum} is not yet digitized in our curated database.`,
      'Absence from Nyayota does not mean this section does not exist in Bangladesh law.',
    ];

    const limitationsBn = [
      `ন্যায়তা বর্তমানে ${actTitleBn || actTitle}-এর সর্বাধিক ব্যবহৃত প্রধান ধারাগুলো সংরক্ষণ করেছে। ${secNum} এখনো আমাদের ডাটাবেসে অন্তর্ভুক্ত হয়নি।`,
      'ন্যায়তার সংগ্রহে অনুপস্থিতির অর্থ এই নয় যে বাংলাদেশের আইনে এই ধারাটি নেই।',
    ];

    let crossRefMarkdown = '';
    let crossRefMarkdownBn = '';

    if (retrieval.crossReferenceMentions && retrieval.crossReferenceMentions.length > 0) {
      crossRefMarkdown =
        `\n\n#### Related In-Repo Cross-Reference Notice:\n` +
        retrieval.crossReferenceMentions
          .map(
            (m) =>
              `- **${m.referencingSection} (${m.referencingSectionTitle}):** "${m.context}"\n  *Note: ${m.note}*`
          )
          .join('\n') +
        `\n\n*Important: The above mention is a cross-reference in ${retrieval.crossReferenceMentions[0].referencingSection}'s penalty or procedural text. The verbatim statutory text of ${secNum} itself is not yet digitized in Nyayota's curated subset.*`;

      crossRefMarkdownBn =
        `\n\n#### ডাটাবেসে সম্পর্কিত রেফারেন্স বিজ্ঞপ্তি:\n` +
        retrieval.crossReferenceMentions
          .map(
            (m) =>
              `- **${m.referencingSection} (${m.referencingSectionTitle}):** "${m.context}"\n  *(দ্রষ্টব্য: এটি ${m.referencingSection}-এর দণ্ড বা কার্যবিধি সংক্রান্ত ধারায় উল্লিখিত ক্রস-রেফারেন্স। ${secNum}-এর মূল সংবিধিবদ্ধ পাঠ্য এখনো ন্যায়তায় ডিজিটাইজ হয়নি।)*`
          )
          .join('\n');
    }

    return {
      query: route.query,
      normalizedQuery: route.normalizedQuery,
      detectedIntent: 'direct_legal_reference',
      detectedJurisdiction: 'Bangladesh',
      status: 'partial-coverage',
      headline: `${actTitle} — ${secNum} (Not in Curated Subset)`,
      headlineBn: actTitleBn ? `${actTitleBn} — ${secNum} (সংগৃহীত সেটে অনুপস্থিত)` : undefined,
      summary:
        `The statute "${actTitle}" is indexed in Nyayota, but ${secNum} is not present in our curated high-frequency section subset.`,
      summaryBn:
        `"${actTitleBn || actTitle}" আইনটি ন্যায়তায় অন্তর্ভুক্ত রয়েছে, তবে ${secNum} আমাদের সংগৃহীত সর্বাধিক ব্যবহৃত ধারাগুলোর সেটে এখনও ডিজিটাইজ করা হয়নি।`,
      structuredExplanation:
        `### Statute Recognized: ${actTitle}\n\n` +
        `You searched for **${secNum}** under **${actTitle}**.\n\n` +
        `**Curated Coverage Limitation:**\n` +
        `Nyayota's repository currently indexes selected high-frequency provisions of this Act. ` +
        `The specific section you queried (**${secNum}**) is not present in the current curated dataset.\n\n` +
        `**Statutory Existence vs. Database Curation:**\n` +
        `This section exists in enacted Bangladesh law under **${actTitle}**, but its full text has not yet been digitized in Nyayota's curated open-access collection.\n\n` +
        `#### How to consult this provision:\n` +
        `1. Browse the general overview of this statute in Nyayota at: \`${actRecord?.internalDestination || `/law/${actRecord?.sourceId}`}\`\n` +
        (actRecord?.officialSourceUrl ? `2. Consult the official government legislative gazette at: [Laws of Bangladesh Portal](${actRecord.officialSourceUrl})\n` : '') +
        `3. Refer to the printed Bangladesh Code volume published by the Ministry of Law, Justice and Parliamentary Affairs.` +
        crossRefMarkdown,
      structuredExplanationBn:
        `### সনাক্তকৃত আইন: ${actTitleBn || actTitle}\n\n` +
        `আপনি **${actTitleBn || actTitle}**-এর অধীন **${secNum}** অনুসন্ধান করেছেন।\n\n` +
        `**সংগ্রহের সীমাবদ্ধতা:**\n` +
        `ন্যায়তার ডাটাবেসে বর্তমানে এই আইনের নির্বাচিত গুরুত্বপূর্ণ ধারাগুলো অন্তর্ভুক্ত রয়েছে। ` +
        `আপনার অনুসন্ধানকৃত নির্দিষ্ট ধারাটি (**${secNum}**) বর্তমান ডিজিটাল সেটে অন্তর্ভুক্ত নয়।\n\n` +
        `**আইনে উপস্থিতি বনাম ডাটাবেসে সংগ্রহ:**\n` +
        `এই ধারাটি বাংলাদেশের সংবিধিবদ্ধ আইনে **${actTitleBn || actTitle}**-এর অধীন বিদ্যমান, তবে ন্যায়তার উন্মুক্ত ডাটাবেসে এটি এখনো ডিজিটাইজ করা হয়নি।\n\n` +
        `#### পরামর্শ:\n` +
        `১. ন্যায়তায় এই আইনের সাধারণ বিবরণ দেখুন: \`${actRecord?.internalDestination || `/law/${actRecord?.sourceId}`}\`\n` +
        (actRecord?.officialSourceUrl ? `২. সরকারি সরকারি আইন পোর্টাল দেখুন: [বাংলাদেশ সরকারের লেজিসলেটিভ পোর্টাল](${actRecord.officialSourceUrl})\n` : '') +
        `৩. আইন, বিচার ও সংসদ বিষয়ক মন্ত্রণালয় কর্তৃক প্রকাশিত বাংলাদেশ কোড দেখুন।` +
        crossRefMarkdownBn,
      sources: actRecord ? [mapResultToCitation(actRecord)] : [],
      limitations,
      limitationsBn,
      disclaimer: STANDARD_DISCLAIMER_EN,
      disclaimerBn: STANDARD_DISCLAIMER_BN,
      generatedAt: new Date().toISOString(),
      executionTimeMs: Date.now() - startTime,
    };
  }

  // Case C: Exact provision found (statutory-provision or treaty-provision)
  const targetSecNorm = retrieval.detectedSectionNumber
    ? normalizeSectionIdentifier(retrieval.detectedSectionNumber)
    : undefined;

  const provisionResult = targetSecNorm
    ? retrieval.results.find(
        (r) =>
          (r.recordType === 'statutory-provision' || r.recordType === 'treaty-provision') &&
          r.identifier &&
          normalizeSectionIdentifier(r.identifier) === targetSecNorm
      )
    : retrieval.results.find(
        (r) => r.recordType === 'statutory-provision' || r.recordType === 'treaty-provision'
      ) || retrieval.results[0];

  // SECTION FIDELITY ENFORCEMENT:
  // If a specific section was queried, but no retrieved provision matches that section,
  // we must NOT present an unrelated provision! Instead, fallback to act-found-section-missing.
  if (targetSecNorm && (!provisionResult || !provisionResult.identifier || normalizeSectionIdentifier(provisionResult.identifier) !== targetSecNorm)) {
    retrieval.status = 'act-found-section-missing';
    return buildDirectReferenceResponse(route, startTime);
  }

  if (!provisionResult) {
    return buildNoRecordsFoundResponse(route, startTime);
  }

  const citations = retrieval.results.slice(0, 3).map(mapResultToCitation);
  const isCuratedSubset = provisionResult.sourceCompleteness === 'curated-section-subset';

  const limitations: string[] = [];
  const limitationsBn: string[] = [];

  if (isCuratedSubset) {
    limitations.push(
      `This section is displayed from Nyayota's curated subset of high-frequency sections for ${provisionResult.displayTitle}.`
    );
    limitationsBn.push(
      `এই ধারাটি ${provisionResult.displayTitleBn || provisionResult.displayTitle}-এর সংগৃহীত নির্বাচিত ধারার অংশ হিসেবে প্রদর্শিত।`
    );
  }

  if (provisionResult.repealNote) {
    limitations.push(`Statutory Amendment/Repeal Notice: ${provisionResult.repealNote}`);
    limitationsBn.push(`আইন সংশোধন/বাতিল সংক্রান্ত বিজ্ঞপ্তি: ${provisionResult.repealNote}`);
  }

  // Check whether official Bengali statutory text exists
  const hasBengaliText = Boolean(provisionResult.matchingTextBn && provisionResult.matchingTextBn.trim().length > 0);
  if (!hasBengaliText) {
    limitations.push('Official Bengali statutory text for this provision is not present in the indexed database record.');
    limitationsBn.push('এই ধারার জন্য সরকারি বাংলা সংবিধিবদ্ধ পাঠ্য ডাটাবেস রেকর্ডে উপস্থিত নেই (মূল ইংরেজি পাঠ সংরক্ষিত)।');
  }

  const headline = `${provisionResult.displayTitle} — ${provisionResult.identifier || 'Provision'}`;
  const headlineBn = provisionResult.displayTitleBn
    ? `${provisionResult.displayTitleBn} — ${provisionResult.identifierBn || provisionResult.identifier || 'বিধান'}`
    : headline;

  const summary = provisionResult.explanation || provisionResult.matchingText.slice(0, 250);
  const summaryBn = provisionResult.matchingTextBn
    ? provisionResult.matchingTextBn.slice(0, 250)
    : (provisionResult.explanation ? `সংক্ষিপ্ত ব্যাখ্যা: ${provisionResult.explanation}` : summary);

  let explanationMarkdown =
    `### Statutory Provision: ${provisionResult.identifier || ''}\n\n` +
    `**Statute:** ${provisionResult.displayTitle}${provisionResult.status ? ` (${provisionResult.status})` : ''}\n\n` +
    `#### Verbatim Statutory Text:\n` +
    `> "${provisionResult.matchingText}"\n\n`;

  if (hasBengaliText) {
    explanationMarkdown +=
      `#### সংবিধিবদ্ধ বাংলা পাঠ:\n` +
      `> "${provisionResult.matchingTextBn}"\n\n`;
  }

  if (provisionResult.explanation) {
    explanationMarkdown +=
      `#### Plain-Language Explanation:\n` +
      `${provisionResult.explanation}\n\n`;
  }

  if (provisionResult.penaltyOrRemedy) {
    explanationMarkdown +=
      `#### Statutory Consequence / Penalty / Remedy:\n` +
      `**${provisionResult.penaltyOrRemedy}**\n\n`;
  }

  if (provisionResult.officialGazetteRef) {
    explanationMarkdown += `*Gazette Reference:* \`${provisionResult.officialGazetteRef}\`\n`;
  }

  // Structured Bengali explanation
  let explanationBnMarkdown =
    `### সংবিধিবদ্ধ বিধান: ${provisionResult.identifierBn || provisionResult.identifier || ''}\n\n` +
    `**আইন:** ${provisionResult.displayTitleBn || provisionResult.displayTitle}${provisionResult.status ? ` (${provisionResult.status})` : ''}\n\n`;

  if (hasBengaliText) {
    explanationBnMarkdown +=
      `#### মূল সংবিধিবদ্ধ বাংলা পাঠ:\n` +
      `> "${provisionResult.matchingTextBn}"\n\n`;
  } else {
    explanationBnMarkdown +=
      `#### মূল সংবিধিবদ্ধ পাঠ (ইংরেজি):\n` +
      `> "${provisionResult.matchingText}"\n\n` +
      `*(দ্রষ্টব্য: এই ধারার সরকারি বাংলা অনুবাদ সংরক্ষিত ডাটাবেসে অন্তর্ভুক্ত নয়।)*\n\n`;
  }

  if (provisionResult.explanation) {
    explanationBnMarkdown +=
      `#### সহজ ব্যাখ্যা:\n` +
      `${provisionResult.explanation}\n\n`;
  }

  if (provisionResult.penaltyOrRemedy) {
    explanationBnMarkdown +=
      `#### সংবিধিবদ্ধ দণ্ড বা প্রতিকার:\n` +
      `**${provisionResult.penaltyOrRemedy}**\n\n`;
  }

  return {
    query: route.query,
    normalizedQuery: route.normalizedQuery,
    detectedIntent: 'direct_legal_reference',
    detectedJurisdiction: provisionResult.jurisdiction === 'International' ? 'International' : 'Bangladesh',
    status: isCuratedSubset ? 'partial-coverage' : 'grounded-answer',
    headline,
    headlineBn,
    summary,
    summaryBn,
    structuredExplanation: explanationMarkdown.trim(),
    structuredExplanationBn: explanationBnMarkdown.trim(),
    sources: citations,
    limitations,
    limitationsBn,
    disclaimer: STANDARD_DISCLAIMER_EN,
    disclaimerBn: STANDARD_DISCLAIMER_BN,
    generatedAt: new Date().toISOString(),
    executionTimeMs: Date.now() - startTime,
  };
}

/**
 * 4. Legal Concept / Glossary Response Builder
 */
function buildLegalConceptResponse(
  route: QueryRouteResult,
  startTime: number
): DeterministicLegalResponse {
  const retrieval = route.retrievalResponse;

  if (!retrieval || retrieval.totalMatches === 0) {
    return buildNoRecordsFoundResponse(route, startTime);
  }

  const glossaryResult =
    retrieval.results.find((r) => r.recordType === 'glossary-term') || retrieval.results[0];

  const citations = [mapResultToCitation(glossaryResult)];
  const termName = glossaryResult.displayTitle;
  const termNameBn = glossaryResult.displayTitleBn;

  const headline = `Legal Definition: ${termName}`;
  const headlineBn = termNameBn ? `আইনি সংজ্ঞা: ${termNameBn} (${termName})` : headline;

  const summary = glossaryResult.explanation || glossaryResult.matchingText;
  const summaryBn = glossaryResult.explanation ? `সহজ ব্যাখ্যা: ${glossaryResult.explanation}` : summary;

  const structuredExplanation =
    `### Legal Term: ${termName}\n\n` +
    `**Category:** ${glossaryResult.identifier || 'General Jurisprudence'}\n\n` +
    `#### Jurisprudential Definition:\n` +
    `> "${glossaryResult.matchingText}"\n\n` +
    `#### Plain-Language Explanation:\n` +
    `${glossaryResult.explanation || 'Refer to the formal jurisprudential definition above.'}\n\n` +
    `#### Conceptual Distinction:\n` +
    `This definition represents an established jurisprudential doctrine or legal maxim. ` +
    `It functions as an interpretive standard across courts and should be applied in conjunction with specific statutory legislation.`;

  const structuredExplanationBn =
    `### আইনি পরিভাষা: ${termNameBn || termName}\n\n` +
    `**শাখা:** ${glossaryResult.identifier || 'সাধারণ আইনতত্ত্ব'}\n\n` +
    `#### প্রামাণ্য সংজ্ঞা:\n` +
    `> "${glossaryResult.matchingText}"\n\n` +
    (glossaryResult.explanation
      ? `#### সহজ ব্যাখ্যা:\n${glossaryResult.explanation}\n\n`
      : '') +
    `#### নীতিগত বৈশিষ্ট্য:\n` +
    `এই সংজ্ঞাটি ন্যায়তার দ্বিভাষিক শব্দকোষ থেকে সংকলিত একটি প্রতিষ্ঠিত আইনি নীতি বা ল্যাটিন ম্যাক্সিম। ` +
    `এটি আদালতের ব্যাখ্যায় একটি সহায়ক নীতি হিসেবে কাজ করে এবং প্রাসঙ্গিক সংবিধিবদ্ধ আইনের সাথে মিলিয়ে প্রয়োগ করতে হয়।`;

  return {
    query: route.query,
    normalizedQuery: route.normalizedQuery,
    detectedIntent: 'legal_concept',
    detectedJurisdiction: glossaryResult.jurisdiction === 'International' ? 'International' : 'Bangladesh',
    status: 'grounded-answer',
    headline,
    headlineBn,
    summary,
    summaryBn,
    structuredExplanation,
    structuredExplanationBn,
    sources: citations,
    limitations: [
      'Glossary definitions represent standard legal doctrines and do not supersede statutory definitions enacted in specific parent Acts.',
    ],
    limitationsBn: [
      'শব্দকোষের সংজ্ঞাগুলি সাধারণ আইনি নীতিমালা উপস্থাপন করে এবং কোনো নির্দিষ্ট সংবিধিবদ্ধ আইনে প্রদত্ত সংজ্ঞার বিকল্প নয়।',
    ],
    disclaimer: STANDARD_DISCLAIMER_EN,
    disclaimerBn: STANDARD_DISCLAIMER_BN,
    generatedAt: new Date().toISOString(),
    executionTimeMs: Date.now() - startTime,
  };
}

/**
 * 5. Statute Overview Response Builder
 */
function buildStatuteOverviewResponse(
  route: QueryRouteResult,
  startTime: number
): DeterministicLegalResponse {
  const retrieval = route.retrievalResponse;

  if (!retrieval || retrieval.totalMatches === 0) {
    return buildNoRecordsFoundResponse(route, startTime);
  }

  const actRecord =
    retrieval.results.find((r) => r.recordType === 'statute-metadata') || retrieval.results[0];

  const citations = retrieval.results.slice(0, 3).map(mapResultToCitation);
  const headline = `Statute Overview: ${actRecord.displayTitle}`;
  const headlineBn = actRecord.displayTitleBn ? `আইন পরিচিতি: ${actRecord.displayTitleBn}` : headline;

  const summary = actRecord.explanation || actRecord.matchingText.slice(0, 250);
  const summaryBn = actRecord.matchingTextBn
    ? actRecord.matchingTextBn.slice(0, 250)
    : (actRecord.displayTitleBn ? `${actRecord.displayTitleBn} সংক্রান্ত সংবিধিবদ্ধ তথ্য।` : summary);

  const isCurated = actRecord.sourceCompleteness === 'curated-section-subset';

  const limitations = [
    isCurated
      ? 'Nyayota curates high-frequency provisions of this Act. Unindexed sections can be consulted in the official Gazette.'
      : 'This overview reflects metadata cataloged in Nyayota. Subordinate rules and ministerial notifications (SROs) may apply.',
  ];

  const limitationsBn = [
    isCurated
      ? 'ন্যায়তা এই আইনের সর্বাধিক ব্যবহৃত ধারাগুলি সংকলন করেছে। অবশিষ্ট ধারাগুলি সরকারি গেজেট থেকে দেখতে পারেন।'
      : 'এই সংক্ষিপ্ত বিবরণটি ন্যায়তায় সংরক্ষিত তথ্যের উপর ভিত্তি করে তৈরি। অধীনস্থ প্রবিধান (এসআরও) প্রযোজ্য হতে পারে।',
  ];

  const structuredExplanation =
    `### Legislative Overview: ${actRecord.displayTitle}\n\n` +
    (actRecord.identifier ? `**Act Identification:** ${actRecord.identifier}\n\n` : '') +
    (actRecord.status ? `**Status:** ${actRecord.status}\n\n` : '') +
    `#### Summary of Legislative Scope:\n` +
    `${actRecord.matchingText}\n\n` +
    `#### Accessing Provisions in Nyayota:\n` +
    `- Browse detailed provisions: \`${actRecord.internalDestination || `/law/${actRecord.sourceId}`}\`\n` +
    (actRecord.officialSourceUrl ? `- Official Ministry Source: [Laws of Bangladesh Portal](${actRecord.officialSourceUrl})\n` : '') +
    (actRecord.officialGazetteRef ? `- Official Gazette Reference: \`${actRecord.officialGazetteRef}\`\n` : '');

  const structuredExplanationBn =
    `### আইন পরিচিতি: ${actRecord.displayTitleBn || actRecord.displayTitle}\n\n` +
    (actRecord.identifier ? `**আইন নম্বর:** ${actRecord.identifier}\n\n` : '') +
    (actRecord.status ? `**অবস্থা:** ${actRecord.status}\n\n` : '') +
    `#### আইনের মূল বিষয়বস্তু:\n` +
    `${actRecord.matchingTextBn || actRecord.matchingText}\n\n` +
    `#### ন্যায়তায় এই আইনের পাতা:\n` +
    `- বিস্তারিত পড়ুন: \`${actRecord.internalDestination || `/law/${actRecord.sourceId}`}\`\n` +
    (actRecord.officialSourceUrl ? `- সরকারি সোর্স লিঙ্ক: [Laws of Bangladesh Portal](${actRecord.officialSourceUrl})\n` : '');

  return {
    query: route.query,
    normalizedQuery: route.normalizedQuery,
    detectedIntent: 'statute_overview',
    detectedJurisdiction: actRecord.jurisdiction === 'International' ? 'International' : 'Bangladesh',
    status: isCurated ? 'partial-coverage' : 'grounded-answer',
    headline,
    headlineBn,
    summary,
    summaryBn,
    structuredExplanation,
    structuredExplanationBn,
    sources: citations,
    limitations,
    limitationsBn,
    disclaimer: STANDARD_DISCLAIMER_EN,
    disclaimerBn: STANDARD_DISCLAIMER_BN,
    generatedAt: new Date().toISOString(),
    executionTimeMs: Date.now() - startTime,
  };
}

/**
 * 6. Legal Scenario Response Builder
 */
function buildLegalScenarioResponse(
  route: QueryRouteResult,
  startTime: number
): DeterministicLegalResponse {
  const retrieval = route.retrievalResponse;

  if (!retrieval || retrieval.totalMatches === 0) {
    return buildNoRecordsFoundResponse(route, startTime);
  }

  const scenarioResult =
    retrieval.results.find((r) => r.recordType === 'outcome-scenario') || retrieval.results[0];

  const citations = [mapResultToCitation(scenarioResult)];
  const headline = `Procedural Roadmap: ${scenarioResult.displayTitle}`;
  const headlineBn = scenarioResult.displayTitleBn
    ? `প্রক্রিয়াগত নির্দেশিকা: ${scenarioResult.displayTitleBn}`
    : headline;

  const summary = scenarioResult.explanation || scenarioResult.matchingText;
  const summaryBn = scenarioResult.displayTitleBn
    ? `${scenarioResult.displayTitleBn} সম্পর্কিত প্রক্রিয়াগত নির্দেশিকা ও নাগরিক অধিকার।`
    : summary;

  const structuredExplanation =
    `### Citizen Legal Roadmap: ${scenarioResult.displayTitle}\n\n` +
    `#### Educational Procedural Steps:\n` +
    `${scenarioResult.matchingText}\n\n` +
    `#### Citizen Rights & Key Precautions:\n` +
    `${scenarioResult.explanation || 'Ensure all written communications, police receipts (GD entry copy), or court plaints are properly verified and archived.'}\n\n` +
    `#### Judicial Outcome Notice:\n` +
    `Every criminal prosecution, bail hearing, or civil remedy depends strictly on individual facts, ` +
    `formal police documentation, forensic evidence, and judicial discretion. ` +
    `Procedural roadmaps are educational guides and do not guarantee any court decision or outcome.`;

  const structuredExplanationBn =
    `### নাগরিক প্রক্রিয়াগত নির্দেশিকা: ${scenarioResult.displayTitleBn || scenarioResult.displayTitle}\n\n` +
    `#### প্রক্রিয়াগত ধাপসমূহ:\n` +
    `${scenarioResult.matchingTextBn || scenarioResult.matchingText}\n\n` +
    `#### নাগরিক অধিকার ও সতর্কতা:\n` +
    `${scenarioResult.explanation || 'থানায় জিডি বা মামলার অনুলিপি সংগ্রহ করুন এবং সকল প্রমাণাদি সংরক্ষণ করুন।'}\n\n` +
    `#### বিচারিক ফলাফল সংক্রান্ত সতর্কতা:\n` +
    `যেকোনো ফৌজদারি বা দেওয়ানি পদক্ষেপ মামলার নির্দিষ্ট তথ্য, পুলিশ রিপোর্ট ও আদালতের বিবেচনার উপর নির্ভর করে। ` +
    `এই নির্দেশিকাটি শুধুমাত্র সচেতনতার উদ্দেশ্যে প্রস্তুতকৃত এবং কোনো নিশ্চিত ফলাফলের নিশ্চয়তা দেয় না।`;

  return {
    query: route.query,
    normalizedQuery: route.normalizedQuery,
    detectedIntent: 'legal_scenario',
    detectedJurisdiction: 'Bangladesh',
    status: 'grounded-answer',
    headline,
    headlineBn,
    summary,
    summaryBn,
    structuredExplanation,
    structuredExplanationBn,
    sources: citations,
    limitations: [
      'Procedural roadmaps provide general citizen orientation and cannot anticipate judicial discretion or local police variations.',
      'Statutory limitation periods and formal court filing deadlines must be independently cross-checked.',
    ],
    limitationsBn: [
      'এই প্রক্রিয়াগত ধাপগুলি সাধারণ নাগরিক সচেতনতার জন্য এবং আদালতের স্বাধীন বিচারিক বিবেচনার বিকল্প নয়।',
      'মামলা দায়েরের তামাদি বা সময়সীমা সংশ্লিষ্ট আইনের সাথে মিলিয়ে দেখতে হবে।',
    ],
    disclaimer: STANDARD_DISCLAIMER_EN,
    disclaimerBn: STANDARD_DISCLAIMER_BN,
    generatedAt: new Date().toISOString(),
    executionTimeMs: Date.now() - startTime,
  };
}

/**
 * 7. Clarification Needed Response Builder (IPC or Standalone Section)
 */
function buildClarificationResponse(
  route: QueryRouteResult,
  startTime: number
): DeterministicLegalResponse {
  const isIndianQuery = route.intent.detectedJurisdiction === 'India';

  // Subcase A: IPC (Indian Penal Code) Jurisdiction Disambiguation
  if (isIndianQuery) {
    const secNum = route.intent.detectedSectionNumber;
    const headline = 'Jurisdiction Notice: IPC (India) vs. The Penal Code, 1860 (Bangladesh)';
    const headlineBn = 'অধিক্ষেত্র সতর্কতা: আইপিসি (ভারত) বনাম বাংলাদেশ দণ্ডবিধি, ১৮৬০';

    const summary =
      'You queried about "IPC" (Indian Penal Code). Nyayota indexes the domestic laws of Bangladesh. ' +
      'In Bangladesh, the governing criminal statute is The Penal Code, 1860 (Act XLV of 1860 / দণ্ডবিধি, ১৮৬০).';

    const summaryBn =
      'আপনি "আইপিসি" (ভারতীয় দণ্ডবিধি) সম্পর্কিত প্রশ্ন করেছেন। ন্যায়তা শুধুমাত্র বাংলাদেশের আইন উপস্থাপন করে। ' +
      'বাংলাদেশে প্রযোজ্য মূল ফৌজদারি আইন হলো The Penal Code, 1860 (১৮৬০ সালের ৪৫ নং আইন / দণ্ডবিধি, ১৮৬০)।';

    const structuredExplanation =
      `### Sovereign Jurisdiction Notice: Indian Penal Code\n\n` +
      `You queried about **"IPC"**${secNum ? ` (Section ${secNum})` : ''}.\n\n` +
      `**Important Legal Boundary:**\n` +
      `- **IPC (Indian Penal Code):** Pertains exclusively to the sovereign jurisdiction of the Republic of India.\n` +
      `- **The Penal Code, 1860 (Act XLV of 1860 / দণ্ডবিধি, ১৮৬০):** Pertains to Bangladesh. While both statutes share British-era drafting origins, they are governed by separate national Parliaments, distinct subsequent amendments, and independent judicial case law.\n\n` +
      `#### Disambiguation Options:\n` +
      `If you are researching the domestic law of Bangladesh, please specify **"The Penal Code, 1860"** or **"দণ্ডবিধি"**${secNum ? ` Section ${secNum}` : ''}.`;

    const structuredExplanationBn =
      `### সার্বভৌম অধিক্ষেত্র সংক্রান্ত সতর্কতা: ভারতীয় দণ্ডবিধি\n\n` +
      `আপনি **আইপিসি (IPC)**${secNum ? ` (ধারা ${secNum})` : ''} অনুসন্ধান করেছেন।\n\n` +
      `**আইনি পার্থক্য:**\n` +
      `- **আইপিসি (ভারতীয় দণ্ডবিধি):** শুধুমাত্র ভারত প্রজাতন্ত্রের অধিক্ষেত্রে প্রযোজ্য।\n` +
      `- **দণ্ডবিধি, ১৮৬০ (The Penal Code, 1860):** বাংলাদেশে প্রযোজ্য মূল ফৌজদারি আইন। দুটি আইনের ঐতিহাসিক উৎস ১৮৬০ সালের হলেও পরবর্তী সংশোধন ও বিচারিক প্রয়োগ সম্পূর্ণ পৃথক।\n\n` +
      `#### করণীয়:\n` +
      `আপনি যদি বাংলাদেশের আইন জানতে চান, তবে অনুগ্রহ করে **"The Penal Code, 1860"** বা **"দণ্ডবিধি"**${secNum ? ` ধারা ${secNum}` : ''} লিখে পুনরায় অনুসন্ধান করুন।`;

    return {
      query: route.query,
      normalizedQuery: route.normalizedQuery,
      detectedIntent: 'clarification_needed',
      detectedJurisdiction: 'India',
      status: 'clarification-required',
      headline,
      headlineBn,
      summary,
      summaryBn,
      structuredExplanation,
      structuredExplanationBn,
      sources: [],
      limitations: [
        'Nyayota strictly curates Bangladesh domestic legislation and international treaties. Indian laws (IPC, CrPC 1973, BNS) are not indexed.',
      ],
      limitationsBn: [
        'ন্যায়তা শুধুমাত্র বাংলাদেশের আইন ও আন্তর্জাতিক চুক্তি সংরক্ষণ করে। ভারতের কোনো আইন এখানে অন্তর্ভুক্ত নেই।',
      ],
      clarificationPrompt: route.clarificationPrompt,
      clarificationOptions: route.clarificationOptions,
      disclaimer: STANDARD_DISCLAIMER_EN,
      disclaimerBn: STANDARD_DISCLAIMER_BN,
      generatedAt: new Date().toISOString(),
      executionTimeMs: Date.now() - startTime,
    };
  }

  // Subcase B: Standalone Section Number without specified Act
  const secNum = route.intent.detectedSectionNumber || 'this section';
  const candidateCitations = (route.retrievalResponse?.results || []).slice(0, 4).map(mapResultToCitation);

  const headline = `Clarification Needed: Multiple Statutes Contain Section ${secNum}`;
  const headlineBn = `স্পষ্টীকরণ প্রয়োজন: একাধিক আইনে ধারা ${secNum} বিদ্যমান`;

  const summary =
    `Section ${secNum} was queried without naming an Act. Several major Bangladesh statutes contain Section ${secNum}. Please select the relevant Act.`;

  const summaryBn =
    `কোনো আইনের নাম উল্লেখ না করে ধারা ${secNum} অনুসন্ধান করা হয়েছে। বাংলাদেশের একাধিক সংবিধিবদ্ধ আইনে ধারা ${secNum} রয়েছে। অনুগ্রহ করে নির্দিষ্ট আইন নির্বাচন করুন।`;

  const candidateActsList = candidateCitations.length > 0
    ? candidateCitations.map((c) => `- **${c.title}**${c.identifier ? ` (${c.identifier})` : ''}`).join('\n')
    : `- The Penal Code, 1860 (Criminal offenses)\n- The Code of Criminal Procedure, 1898 (CrPC - Police & Magistrate procedure)\n- The Code of Civil Procedure, 1908 (CPC - Civil suits)\n- The Transfer of Property Act, 1882`;

  const structuredExplanation =
    `### Disambiguation Required: Section ${secNum}\n\n` +
    `You searched for **Section ${secNum}**, but did not specify the parent Act. ` +
    `In statutory interpretation, section numbers are specific to their parent enactment.\n\n` +
    `#### Candidate Enactments in Bangladesh:\n` +
    `${candidateActsList}\n\n` +
    `#### How to resolve:\n` +
    `Please rephrase your query specifying the Act (e.g., *"CrPC Section ${secNum}"* or *"The Penal Code Section ${secNum}"*).`;

  const structuredExplanationBn =
    `### আইন নির্বাচন প্রয়োজন: ধারা ${secNum}\n\n` +
    `আপনি নির্দিষ্ট কোনো আইনের নাম না লিখে কেবল **ধারা ${secNum}** অনুসন্ধান করেছেন।\n\n` +
    `#### সম্ভাব্য আইনসমূহ:\n` +
    `- **দণ্ডবিধি, ১৮৬০** (ফৌজদারি অপরাধ ও শাস্তি)\n` +
    `- **ফৌজদারি কার্যবিধি, ১৮৯৮** (গ্রেপ্তার, জামিন ও আদালত পদ্ধতি)\n` +
    `- **দেওয়ানি কার্যবিধি, ১৯০৮** (দেওয়ানি মোকদ্দমা ও আরজি)\n` +
    `- **সম্পত্তি হস্তান্তর আইন, ১৮৮২**\n\n` +
    `অনুগ্রহ করে আইনের নাম উল্লেখ করে অনুসন্ধান করুন (যেমন: *"দণ্ডবিধি ধারা ${secNum}"* বা *"কার্যবিধি ধারা ${secNum}"*)।`;

  return {
    query: route.query,
    normalizedQuery: route.normalizedQuery,
    detectedIntent: 'clarification_needed',
    detectedJurisdiction: 'Bangladesh',
    status: 'clarification-required',
    headline,
    headlineBn,
    summary,
    summaryBn,
    structuredExplanation,
    structuredExplanationBn,
    sources: candidateCitations,
    limitations: [
      `Section ${secNum} exists in multiple distinct Acts. Verbatim provision text cannot be retrieved until the Act is identified.`,
    ],
    limitationsBn: [
      `ধারা ${secNum} একাধিক ভিন্ন আইনে বিদ্যমান। সংশ্লিষ্ট আইনের নাম নির্দিষ্ট না করা পর্যন্ত সঠিক পাঠ্য নির্ধারণ করা সম্ভব নয়।`,
    ],
    clarificationPrompt: route.clarificationPrompt,
    clarificationOptions: route.clarificationOptions,
    disclaimer: STANDARD_DISCLAIMER_EN,
    disclaimerBn: STANDARD_DISCLAIMER_BN,
    generatedAt: new Date().toISOString(),
    executionTimeMs: Date.now() - startTime,
  };
}

/**
 * 8. Unsupported Legal Query Response Builder
 */
function buildUnsupportedLegalResponse(
  route: QueryRouteResult,
  startTime: number
): DeterministicLegalResponse {
  return {
    query: route.query,
    normalizedQuery: route.normalizedQuery,
    detectedIntent: 'unsupported_legal_query',
    detectedJurisdiction: route.intent.detectedJurisdiction,
    status: 'unsupported-scope',
    headline: 'Query Falls Outside Nyayota’s Indexed Legal Scope',
    headlineBn: 'অনুসন্ধানটি ন্যায়তার সংগৃহীত আইনি পরিধির বাইরে',
    summary:
      'The requested legal subject falls outside Nyayota’s curated legal collection of Bangladesh domestic statutes and international human rights treaties.',
    summaryBn:
      'অনুরোধকৃত আইনি বিষয়টি ন্যায়তার সংগৃহীত বাংলাদেশ সংবিধিবদ্ধ আইন এবং আন্তর্জাতিক মানবাধিকার চুক্তির পরিধির বাইরে।',
    structuredExplanation:
      `### Scope Boundary: Unindexed or Foreign Legal Systems\n\n` +
      `Nyayota is dedicated to the domestic statutory laws of the People's Republic of Bangladesh ` +
      `and core international multilateral human rights conventions.\n\n` +
      `**Crucial Statutory Distinction:**\n` +
      `- Absence from Nyayota does **not** imply that a law does not exist in legal reality.\n` +
      `- It means the topic is outside Nyayota's curated digital collection, or pertains to foreign municipal jurisdictions (such as foreign state or national legislation).\n\n` +
      `#### Supported Scope:\n` +
      `- Bangladesh Acts of Parliament, Ordinances, and President's Orders in the Bangladesh Code\n` +
      `- The Constitution of the People's Republic of Bangladesh\n` +
      `- Multilateral treaties deposited with the United Nations (UDHR, ICCPR, ICESCR, CRC, CEDAW)\n` +
      `- Bilingual Bangladeshi legal doctrines and citizen outcome scenarios`,
    structuredExplanationBn:
      `### আইনি পরিধির সীমাবদ্ধতা\n\n` +
      `ন্যায়তা প্ল্যাটফর্মটি গণপ্রজাতন্ত্রী বাংলাদেশের অভ্যন্তরীণ সংবিধিবদ্ধ আইন এবং জাতিসংঘের মূল মানবাধিকার সনদের জন্য নিবেদিত।\n\n` +
      `**জরুরি সতর্কতা:**\n` +
      `- ন্যায়তার ডাটাবেসে না থাকার অর্থ এই নয় যে আইনটি বাস্তব জগতে নেই।\n` +
      `- এর অর্থ হলো বিষয়টি ন্যায়তার বর্তমান ডিজিটাল সংগ্রহে নেই অথবা এটি অন্য কোনো দেশের অভ্যন্তরীণ আইন।\n\n` +
      `#### সমর্থিত পরিধি:\n` +
      `- বাংলাদেশ কোডের অন্তর্ভুক্ত জাতীয় সংসদের আইন, অধ্যাদেশ ও রাষ্ট্রপতির আদেশ\n` +
      `- গণপ্রজাতন্ত্রী বাংলাদেশের সংবিধান\n` +
      `- জাতিসংঘের প্রধান মানবাধিকার সনদসমূহ (ইউডিএইচআর, আইসিসিপিআর ইত্যাদি)\n` +
      `- বাংলাদেশি দ্বিভাষিক আইনি শব্দকোষ ও নাগরিক সমাধান নির্দেশিকা`,
    sources: [],
    limitations: [
      'Nyayota does not index foreign national or provincial legislation (e.g., United States, United Kingdom, India).',
    ],
    limitationsBn: [
      'ন্যায়তা কোনো বিদেশি আঞ্চলিক বা জাতীয় আইন সূচীবদ্ধ করে না।',
    ],
    disclaimer: STANDARD_DISCLAIMER_EN,
    disclaimerBn: STANDARD_DISCLAIMER_BN,
    generatedAt: new Date().toISOString(),
    executionTimeMs: Date.now() - startTime,
  };
}

/**
 * 9. Out of Scope Response Builder
 */
function buildOutOfScopeResponse(
  route: QueryRouteResult,
  startTime: number
): DeterministicLegalResponse {
  return {
    query: route.query,
    normalizedQuery: route.normalizedQuery,
    detectedIntent: 'out_of_scope',
    detectedJurisdiction: 'unknown',
    status: 'out-of-scope',
    headline: 'Non-Legal Topic',
    headlineBn: 'আইনবহির্ভূত অনুসন্ধান',
    summary:
      'Nyayota is an educational legal information engine and does not answer non-legal questions.',
    summaryBn:
      'ন্যায়তা একটি শিক্ষামূলক আইনি তথ্য প্ল্যাটফর্ম এবং আইনবহির্ভূত সাধারণ প্রশ্নের উত্তর প্রদান করে না।',
    structuredExplanation:
      `### Dedicated Legal Scope\n\n` +
      `Nyayota focuses exclusively on statutory laws, constitutional jurisprudence, procedural codes, and international treaties. ` +
      `We cannot assist with general programming, weather forecasts, entertainment trivia, sports, or culinary recipes.\n\n` +
      `#### Suggested Legal Inquiries:\n` +
      `- *"What is Section 300 of the Penal Code?"*\n` +
      `- *"CrPC Section 54 arrest without warrant rules"*\n` +
      `- *"What is Habeas Corpus?"*\n` +
      `- *"How to file a General Diary (GD) in a police station"*`,
    structuredExplanationBn:
      `### নির্দিষ্ট আইনি পরিধি\n\n` +
      `ন্যায়তা শুধুমাত্র সংবিধিবদ্ধ আইন, সাংবিধানিক অধিকার, কার্যবিধি এবং আন্তর্জাতিক সনদের তথ্য অনুসন্ধান করতে পারে। ` +
      `আমরা সাধারণ কোডিং, আবহাওয়া, খেলাধুলা বা রান্নার মতো আইনবহির্ভূত বিষয়ে উত্তর দিতে পারি না।\n\n` +
      `#### কিছু পরামর্শমূলক প্রশ্ন:\n` +
      `- *"দণ্ডবিধি ধারা ৩০০ কি?"*\n` +
      `- *"ফৌজদারি কার্যবিধি ধারা ৫৪ অনুসারে গ্রেপ্তারের নিয়ম"*\n` +
      `- *"হেবিয়াস করপাস কি?"*\n` +
      `- *"থানায় জিডি করার সঠিক নিয়ম কি?"*`,
    sources: [],
    limitations: [],
    limitationsBn: [],
    disclaimer: STANDARD_DISCLAIMER_EN,
    disclaimerBn: STANDARD_DISCLAIMER_BN,
    generatedAt: new Date().toISOString(),
    executionTimeMs: Date.now() - startTime,
  };
}

/**
 * 10. Unknown / Unintelligible Input Response Builder
 */
function buildUnknownInputResponse(
  route: QueryRouteResult,
  startTime: number
): DeterministicLegalResponse {
  return {
    query: route.query,
    normalizedQuery: route.normalizedQuery,
    detectedIntent: 'unknown',
    detectedJurisdiction: 'unknown',
    status: 'unintelligible',
    headline: 'Query Could Not Be Understood',
    headlineBn: 'অনুসন্ধানটি বোঝা সম্ভব হয়নি',
    summary:
      'We could not identify a clear legal topic, statute name, or provision in your query. Please rephrase with recognized legal keywords.',
    summaryBn:
      'আপনার অনুসন্ধানে কোনো সুনির্দিষ্ট আইনি বিষয়, আইনের নাম বা ধারা সনাক্ত করা যায়নি। অনুগ্রহ করে আইনি শব্দ ব্যবহার করে পুনরায় লিখুন।',
    structuredExplanation:
      `### How to Structure Your Query\n\n` +
      `To receive source-grounded statutory answers, try structuring your inquiry using:\n` +
      `1. **Statute and Section:** e.g., *"Penal Code Section 300"* or *"CrPC Section 54"*\n` +
      `2. **Legal Doctrine:** e.g., *"What is Bail?"* or *"Habeas Corpus"*\n` +
      `3. **Statute Title:** e.g., *"The Contract Act, 1872"* or *"নারী ও শিশু নির্যাতন দমন আইন"*\n` +
      `4. **Procedural Scenario:** e.g., *"Cheque dishonor notice procedure"*`,
    structuredExplanationBn:
      `### অনুসন্ধানের সঠিক পদ্ধতি\n\n` +
      `নির্ভুল সংবিধিবদ্ধ ফলাফল পেতে নিম্নোক্তভাবে প্রশ্ন করার চেষ্টা করুন:\n` +
      `১. **আইন ও ধারা:** যেমন- *"দণ্ডবিধি ধারা ৩০০"* বা *"ফৌজদারি কার্যবিধি ধারা ৫৪"*\n` +
      `২. **আইনি পরিভাষা:** যেমন- *"জামিন কি?"* বা *"হেবিয়াস করপাস"*\n` +
      `৩. **আইনের নাম:** যেমন- *"চুক্তি আইন ১৮৭২"* বা *"ডিজিটাল নিরাপত্তা আইন"*\n` +
      `৪. **প্রক্রিয়াগত পরিস্থিতি:** যেমন- *"চেক ডিজঅনার হলে নোটিশ পাঠানোর নিয়ম"*`,
    sources: [],
    limitations: [],
    limitationsBn: [],
    disclaimer: STANDARD_DISCLAIMER_EN,
    disclaimerBn: STANDARD_DISCLAIMER_BN,
    generatedAt: new Date().toISOString(),
    executionTimeMs: Date.now() - startTime,
  };
}

/**
 * 11. No Records Found Response Builder
 */
function buildNoRecordsFoundResponse(
  route: QueryRouteResult,
  startTime: number
): DeterministicLegalResponse {
  return {
    query: route.query,
    normalizedQuery: route.normalizedQuery,
    detectedIntent: route.intent.primaryIntent,
    detectedJurisdiction: route.intent.detectedJurisdiction,
    status: 'no-records-found',
    headline: 'No Matching Provisions Found in Indexed Collection',
    headlineBn: 'সংগৃহীত ডাটাবেসে কোনো মেলানো বিধান পাওয়া যায়নি',
    summary:
      'No matching provisions or documents were found in Nyayota’s currently indexed collection for this query.',
    summaryBn:
      'এই অনুসন্ধানের জন্য ন্যায়তার সংগৃহীত সংগ্রহশালায় কোনো রেকর্ড পাওয়া যায়নি।',
    structuredExplanation:
      `### Crucial Statutory Distinction: Indexed Absence vs. Legal Reality\n\n` +
      `No matching statutory provisions, glossary doctrines, or scenario records were found for: ` +
      `**"${route.query}"**.\n\n` +
      `**Important Safeguard:**\n` +
      `Absence from Nyayota's digital repository does **NOT** mean that this statute or provision does not exist in Bangladesh law. ` +
      `The Bangladesh Code comprises hundreds of enactments across 38 volumes, and Nyayota's curation is ongoing.\n\n` +
      `#### Recommended Next Steps:\n` +
      `1. Check the spelling of the Act or legal term.\n` +
      `2. Search the comprehensive Bangladesh Code Catalog in Nyayota at: \`/bangladesh-laws\`\n` +
      `3. Consult the official Ministry of Law legislative portal: [Laws of Bangladesh](http://bdlaws.minlaw.gov.bd)\n` +
      `4. Verify against official publications in the *Bangladesh Gazette*.`,
    structuredExplanationBn:
      `### জরুরি আইনি পার্থক্য: ডাটাবেসে অনুপস্থিতি বনাম বাস্তব আইন\n\n` +
      `**"${route.query}"** অনুসন্ধানের জন্য কোনো রেকর্ড পাওয়া যায়নি।\n\n` +
      `**সতর্কতা:**\n` +
      `ন্যায়তার ডিজিটাল সংগ্রহে কোনো আইন বা ধারা না থাকার অর্থ এই নয় যে বাংলাদেশের আইনে এটি নেই। ` +
      `বাংলাদেশ কোডে ৩৮টি ভলিউমে শত শত আইন রয়েছে এবং ন্যায়তার ডিজিটাইজেশন একটি চলমান প্রক্রিয়া।\n\n` +
      `#### করণীয়:\n` +
      `১. আইনের নামের বানান সঠিক আছে কিনা যাচাই করুন।\n` +
      `২. ন্যায়তার সম্পূর্ণ বাংলাদেশ আইন ক্যাটালগ দেখুন: \`/bangladesh-laws\`\n` +
      `৩. সরকারি আইন পোর্টাল দেখুন: [Laws of Bangladesh](http://bdlaws.minlaw.gov.bd)\n` +
      `৪. সরকারি বাংলাদেশ গেজেট অনুসন্ধান করুন।`,
    sources: [],
    limitations: [
      'The requested subject is not present in Nyayota’s currently digitized records.',
      'Absence from this database must never be cited as proof of statutory non-existence in court proceedings.',
    ],
    limitationsBn: [
      'অনুরোধকৃত বিষয়টি ন্যায়তার বর্তমান ডিজিটাইজড রেকর্ডে অন্তর্ভুক্ত নেই।',
      'আদালতে বা আইনি কার্যক্রমে এই অনুপস্থিতিকে আইনের অস্তিত্বহীনতা হিসেবে উপস্থাপন করা যাবে না।',
    ],
    disclaimer: STANDARD_DISCLAIMER_EN,
    disclaimerBn: STANDARD_DISCLAIMER_BN,
    generatedAt: new Date().toISOString(),
    executionTimeMs: Date.now() - startTime,
  };
}

// ============================================================================
// Main Public API
// ============================================================================

/**
 * Converts a QueryRouteResult into a structured DeterministicLegalResponse.
 */
export function generateResponseFromRoute(
  route: QueryRouteResult,
  startTime: number = Date.now()
): DeterministicLegalResponse {
  switch (route.intent.primaryIntent) {
    case 'greeting':
      return buildGreetingResponse(route, startTime);

    case 'nyayota_help':
      return buildWebsiteHelpResponse(route, startTime);

    case 'clarification_needed':
      return buildClarificationResponse(route, startTime);

    case 'out_of_scope':
      return buildOutOfScopeResponse(route, startTime);

    case 'unsupported_legal_query':
      return buildUnsupportedLegalResponse(route, startTime);

    case 'unknown':
      return buildUnknownInputResponse(route, startTime);

    case 'legal_concept':
      return buildLegalConceptResponse(route, startTime);

    case 'statute_overview':
      return buildStatuteOverviewResponse(route, startTime);

    case 'legal_scenario':
      return buildLegalScenarioResponse(route, startTime);

    case 'direct_legal_reference':
    default:
      return buildDirectReferenceResponse(route, startTime);
  }
}

/**
 * End-to-end generator: Takes a raw user query, routes it deterministically,
 * retrieves grounded source records, and synthesizes a structured legal response.
 */
export async function generateLegalResponse(
  rawQuery: string,
  options: ResponseGenerationOptions = {}
): Promise<DeterministicLegalResponse> {
  const startTime = Date.now();
  const routeResult = await routeQuery(rawQuery, options);
  return generateResponseFromRoute(routeResult, startTime);
}
