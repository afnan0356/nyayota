/**
 * Nyayota AI — Conversational Response Generator (Phase 6A)
 * 
 * Generates natural, helpful, grounded responses for conversational modes:
 * - Casual conversation (greetings, pleasantries, thanks, farewells)
 * - Platform questions (grounded in actual verified Nyayota features)
 * - General educational legal explanations (jurisprudence, civil vs criminal)
 * - Contextual follow-up simplifications
 * - Clarification prompts
 * - Out-of-scope redirections
 * 
 * Strict Grounding & Safety:
 * - Never fabricates statutes, court judgments, or legal advice.
 * - Always includes proportionate educational notices.
 * - Bilingual English and Bengali output.
 */

import { RoutingDecision, ConversationContext } from './types';

export interface ConversationalResponse {
  headline: string;
  headlineBn?: string;
  summary: string;
  summaryBn?: string;
  text: string;
  textBn?: string;
  clarificationPrompt?: string;
  clarificationOptions?: string[];
  disclaimer: string;
}

const EDUCATIONAL_DISCLAIMER_EN =
  'Notice: Nyayota provides educational legal research only and does not constitute formal legal representation or legal advice.';
const EDUCATIONAL_DISCLAIMER_BN =
  'সতর্কবার্তা: ন্যায়তা শুধুমাত্র শিক্ষামূলক আইনি গবেষণার তথ্য প্রদান করে এবং এটি আনুষ্ঠানিক আইনি প্রতিনিধিত্ব বা পরামর্শ নয়।';

/**
 * Handles conversational routing decisions and produces structured response content.
 */
export function handleConversationalTurn(
  decision: RoutingDecision,
  context: ConversationContext
): ConversationalResponse {
  const isBangla = decision.language === 'bn';

  switch (decision.responseMode) {
    case 'conversation': {
      if (decision.matchedPatterns.includes('casual_pleasantry')) {
        return {
          headline: 'How Are You',
          headlineBn: 'কেমন আছেন',
          summary: 'Friendly response to conversational check-in.',
          summaryBn: 'কথোপকথনমূলক কুশল বিনিময়ের উত্তর।',
          text: `I am doing well, thank you! I am ready to help you explore Bangladesh statutory laws, constitutional articles, legal glossary doctrines, and procedural guides. What legal topic would you like to research today?`,
          textBn: `আমি ভালো আছি, ধন্যবাদ! আমি আপনাকে বাংলাদেশের সংবিধিবদ্ধ আইন, সংবিধানের অনুচ্ছেদ, আইনি শব্দকোষ এবং নাগরিক প্রক্রিয়া নির্দেশিকা জানতে সাহায্য করতে প্রস্তুত। আজ আপনি কোন আইনি বিষয়ে জানতে চান?`,
          disclaimer: EDUCATIONAL_DISCLAIMER_EN,
        };
      }

      if (decision.matchedPatterns.includes('casual_thanks')) {
        return {
          headline: 'You Are Welcome',
          headlineBn: 'আপনাকে স্বাগতম',
          summary: 'Courteous response to user gratitude.',
          summaryBn: 'ধন্যবাদের উত্তর।',
          text: `You are very welcome! If you have further questions about Bangladesh legislation, section penalties, or court procedures, feel free to ask anytime.`,
          textBn: `আপনাকে অনেক স্বাগতম! বাংলাদেশ আইন, বিভিন্ন ধারার শাস্তি বা বিচারিক প্রক্রিয়া নিয়ে আর কোনো জিজ্ঞাসা থাকলে নির্দ্বিধায় প্রশ্ন করতে পারেন।`,
          disclaimer: EDUCATIONAL_DISCLAIMER_EN,
        };
      }

      if (decision.matchedPatterns.includes('casual_goodbye')) {
        return {
          headline: 'Goodbye',
          headlineBn: 'বিদায়',
          summary: 'Farewell response.',
          summaryBn: 'বিদায় সম্ভাষণ।',
          text: `Goodbye! Best wishes with your legal studies and civic research. You can return to Nyayota whenever you need statutory references or procedural guidance.`,
          textBn: `বিদায়! আপনার আইনি গবেষণা ও পড়াশোনার সাফল্য কামনা করছি। সংবিধিবদ্ধ রেফারেন্স বা প্রক্রিয়াগত তথ্যের প্রয়োজনে যেকোনো সময় ন্যায়তায় ফিরে আসতে পারেন।`,
          disclaimer: EDUCATIONAL_DISCLAIMER_EN,
        };
      }

      // Default Greeting
      return {
        headline: 'Welcome to Nyayota Legal Assistant',
        headlineBn: 'ন্যায়তা আইনি তথ্য সহকারীতে স্বাগতম',
        summary: 'Source-grounded legal knowledge assistant greeting.',
        summaryBn: 'তথ্যসূত্র-ভিত্তিক আইনি তথ্য সহকারীর সম্ভাষণ।',
        text: `Hello! I am Nyayota AI, your source-grounded legal information assistant. I help citizens, law students, and researchers explore Bangladesh codified laws, constitutional articles, procedural roadmaps, and international human rights conventions.\n\nHow can I assist your legal inquiry today?`,
        textBn: `নমস্কার! আমি ন্যায়তা এআই, আপনার তথ্যসূত্র-ভিত্তিক আইনি তথ্য সহকারী। আমি নাগরিক, আইনের শিক্ষার্থী এবং গবেষকদের বাংলাদেশের সংবিধিবদ্ধ আইন, সংবিধানের অনুচ্ছেদ, নাগরিক সমাধান নির্দেশিকা এবং আন্তর্জাতিক মানবাধিকার চুক্তি বুঝতে সহায়তা করি।\n\nআজ আপনার আইনি অনুসন্ধানে কিভাবে সাহায্য করতে পারি?`,
        disclaimer: EDUCATIONAL_DISCLAIMER_EN,
      };
    }

    case 'platform_help': {
      return {
        headline: 'Nyayota Platform Capabilities & Resources',
        headlineBn: 'ন্যায়তা প্ল্যাটফর্মের সুবিধাসমূহ ও সম্পদ',
        summary: 'Overview of verified tools and features available on Nyayota.',
        summaryBn: 'ন্যায়তায় উপলব্ধ যাচাইকৃত টুলস ও সুবিধাসমূহের সারসংক্ষেপ।',
        text: `### About Nyayota (ন্যায়তা)

Nyayota is an independent civic and educational legal research platform dedicated to making the codified statutes, constitutional jurisprudence, and procedural rights of Bangladesh accessible and transparent.

#### Key Features & Research Modules:
1. **Bangladesh Laws Catalog (\`/bangladesh-laws\`):** Searchable index of Bangladesh parliamentary statutes, presidential orders, and ordinances from 1836 to the present day.
2. **International Treaties (\`/international-laws\`):** Core multilateral human rights treaties, including UDHR, ICCPR, ICESCR, and CEDAW.
3. **Bilingual Legal Glossary (\`/glossary\`):** Plain-language educational definitions of Latin maxims (*mens rea*, *habeas corpus*, *res judicata*) and Bengali legal terms.
4. **Legal Outcome Guides (\`/legal-outcome-guide\`):** Practical citizen guides for common situations such as General Diary (GD), First Information Report (FIR), Bail procedures, and Cheque Dishonor under the NI Act.
5. **Standard Legal Citation Generator:** Instant Bluebook, OSCOLA, APA, and MLA statutory citations on law pages.
6. **Bilingual Language Support:** Full support for English, Bengali (বাংলা), Bengali numerals (০-৯), and Romanized Bengali (Banglish).

#### Editorial Desk & Reporting Errors:
We maintain strict fidelity to official gazetted texts. If you detect an amendment to update or a typographical error, contact our editorial team at **\`nyayota.contact@gmail.com\`**.`,
        textBn: `### ন্যায়তা (Nyayota) সম্পর্কে

ন্যায়তা একটি স্বাধীন নাগরিক ও শিক্ষামূলক আইনি গবেষণা প্ল্যাটফর্ম, যা বাংলাদেশের সংবিধিবদ্ধ আইন, সাংবিধানিক অধিকার এবং আইনি প্রক্রিয়াকে স্বচ্ছ ও সহজবোধ্য করার জন্য নিবেদিত।

#### প্রধান ফিচার ও সুবিধাসমূহ:
১. **বাংলাদেশ আইন ক্যাটালগ (\`/bangladesh-laws\`):** ১৮৩৬ সাল থেকে বর্তমান পর্যন্ত প্রণীত আইনের অনুসন্ধানযোগ্য সংগ্রহশালা।
২. **আন্তর্জাতিক আইন (\`/international-laws\`):** প্রধান বহুপাক্ষিক মানবাধিকার সনদসমূহ (যেমন: UDHR, ICCPR, ICESCR, CEDAW)।
৩. **দ্বিভাষিক আইনি শব্দকোষ (\`/glossary\`):** ল্যাটিন ম্যাক্সিম এবং বাংলা আইনি পরিভাষার সহজবোধ্য ব্যাখ্যা।
৪. **আইনি সমাধান নির্দেশিকা (\`/legal-outcome-guide\`):** জিডি (GD), এজাহার (FIR), জামিন প্রক্রিয়া ও চেক ডিজঅনারের মতো সাধারণ পরিস্থিতিতে নাগরিকের পদক্ষেপ।
৫. **সাইটেশন জেনারেটর:** ব্লুবুক, অসকোলা, এপিএ এবং এমএলএ ফরম্যাটে তাৎক্ষণিক সাইটেশন।
৬. **ভাষা সমর্থন:** ইংরেজি, বাংলা (বাংলা সংখ্যা ০-৯ সহ) এবং বাংলিশে প্রশ্ন করার সুবিধা।

#### ভুল বা সংশোধন রিপোর্ট:
আমাদের তথ্যের যেকোনো অসঙ্গতি লক্ষ্য করলে অনুগ্রহ করে আমাদের সম্পাদকীয় ডেস্কে **\`nyayota.contact@gmail.com\`** ঠিকানায় ইমেইল করুন।`,
        disclaimer: EDUCATIONAL_DISCLAIMER_EN,
      };
    }

    case 'general_explanation': {
      const q = decision.normalizedQuery;

      if (q.includes('negligence') || q.includes('অবহেলা') || q.includes('duty of care')) {
        return {
          headline: 'Legal Explanation: Negligence & The Duty of Care',
          headlineBn: 'অবহেলা এবং আইনি সতর্কতা (Negligence & Duty of Care)',
          summary: 'Fundamental tort and legal standard of care.',
          summaryBn: 'টর্ট আইন ও সতর্কতামূলক দায়িত্বের ধারণা।',
          text: `### Legal Explanation: Negligence & The Duty of Care

**Core Definition:**
*Negligence* is the failure to exercise the standard of care that a reasonably prudent person would have exercised in a similar situation, resulting in unintended injury or loss to another party.

#### The 4 Essential Legal Pillars of Negligence:
1. **Duty of Care:** The defendant owed a legal obligation to protect the plaintiff from foreseeable harm.
2. **Breach of Duty:** The defendant failed to meet the required standard of care.
3. **Causation:** The breach directly caused the claimant's injury (*causa causans*).
4. **Damages:** Measurable physical, financial, or property harm was suffered.`,
          textBn: `### অবহেলা এবং আইনি সতর্কতা (Negligence & Duty of Care)

**আইনি সংজ্ঞা:**
*অবহেলা (Negligence)* হলো সাধারণ বিচক্ষণ ব্যক্তির ন্যায় যুক্তিসঙ্গত সতর্কতা অবলম্বনে ব্যর্থ হওয়া, যার ফলে অপর কোনো ব্যক্তির ক্ষতি বা হানি ঘটে।

#### অবহেলার ৪টি মূল উপাদান:
১. **সতর্কতামূলক দায়িত্ব (Duty of Care):** বাদীর প্রতি বিবাদীর সতর্কতা অবলম্বনের আইনি দায় থাকা।
২. **দায়িত্ব লঙ্ঘন (Breach of Duty):** নির্ধারিত সতর্কতার মান বজায় রাখতে ব্যর্থ হওয়া।
৩. **কার্যকারণ (Causation):** দায়িত্ব লঙ্ঘনের সরাসরি ফলস্বরূপ ক্ষতি ঘটা।
৪. **প্রকৃত ক্ষতি (Damages):** শারীরিক, আর্থিক বা সম্পত্তির পরিমাপযোগ্য ক্ষতি হওয়া।`,
          disclaimer: EDUCATIONAL_DISCLAIMER_EN,
        };
      }

      if (q.includes('civil and criminal') || q.includes('দেওয়ানি ও ফৌজদারি')) {
        return {
          headline: 'Difference Between Civil Law and Criminal Law',
          headlineBn: 'দেওয়ানি ও ফৌজদারি আইনের পার্থক্য',
          summary: 'Educational comparison of civil rights versus criminal wrongs.',
          summaryBn: 'নাগরিক অধিকার ও ফৌজদারি অপরাধের আইনি পার্থক্য।',
          text: `### Difference Between Civil Law and Criminal Law

In legal jurisprudence, the legal system is broadly categorized into **Civil Law** and **Criminal Law**, based on the nature of the wrong and the remedy sought:

#### 1. Civil Law (দেওয়ানি আইন)
- **Nature of Dispute:** Disputes between private individuals, businesses, or institutions concerning private rights, obligations, and contracts.
- **Examples:** Breach of contract, property disputes, family matters (divorce, inheritance), torts, and debt recovery.
- **Governing Procedure:** In Bangladesh, codified primarily under *The Code of Civil Procedure, 1908 (CPC)*.
- **Remedy Sought:** Compensation, damages, restitution, or specific performance/injunctions.
- **Burden of Proof:** Balance of probabilities (preponderance of evidence).

#### 2. Criminal Law (ফৌজদারি আইন)
- **Nature of Dispute:** Offenses committed against society or the state that violate public peace and safety.
- **Examples:** Murder, assault, theft, extortion, forgery, and cybercrimes.
- **Governing Law:** Codified primarily under *The Penal Code, 1860* (substantive) and *The Code of Criminal Procedure, 1898 (CrPC)* (procedural).
- **Remedy Sought:** Punishment of the offender (imprisonment, fine, or state sanction).
- **Burden of Proof:** Beyond reasonable doubt (a much higher evidential standard).`,
          textBn: `### দেওয়ানি ও ফৌজদারি আইনের পার্থক্য

আইনি ব্যবস্থায় বিরোধের প্রকৃতি ও প্রতিকারের ওপর ভিত্তি করে আইনকে প্রধানত দুটি ভাগে ভাগ করা হয়:

#### ১. দেওয়ানি আইন (Civil Law)
- **বিরোধের প্রকৃতি:** ব্যক্তিগত নাগরিক, ব্যবসায়িক প্রতিষ্ঠান বা সংস্থার মধ্যকার অধিকার, চুক্তি ও সম্পত্তি সংক্রান্ত বিরোধ।
- **উদাহরণ:** চুক্তি ভঙ্গ, জমিজমা সংক্রান্ত বিরোধ, পারিবারিক ও উত্তরাধিকার সংক্রান্ত মামলা, ক্ষতিপূরণ দাবি।
- **কার্যপদ্ধতি:** বাংলাদেশে এটি মূলত *দেওয়ানি কার্যবিধি, ১৯০৮ (CPC)* দ্বারা পরিচালিত হয়।
- **উদ্দেশ্য:** ক্ষতিপূরণ আদায় বা অধিকার পুনঃপ্রতিষ্ঠা।

#### ২. ফৌজদারি আইন (Criminal Law)
- **বিরোধের প্রকৃতি:** সমাজ ও রাষ্ট্রের বিরুদ্ধে সংঘটিত অপরাধ যা জনশান্তি ও নিরাপত্তা বিঘ্নিত করে।
- **উদাহরণ:** খুন, মারামারি, চুরি, ছিনতাই, জালিয়াতি ইত্যাদি।
- **আইনি ভিত্তি:** বাংলাদেশে এটি মূলত *দণ্ডবিধি, ১৮৬০* (মূল অপরাধ) এবং *ফৌজদারি কার্যবিধি, ১৮৯৮* (প্রক্রিয়া) দ্বারা পরিচালিত হয়।
- **উদ্দেশ্য:** অপরাধীর শাস্তি প্রদান (কারাদণ্ড বা জরিমানা)।`,
          disclaimer: EDUCATIONAL_DISCLAIMER_EN,
        };
      }

      if (q.includes('constitution') || q.includes('সংবিধান')) {
        return {
          headline: 'What is a Constitution?',
          headlineBn: 'সংবিধান কি?',
          summary: 'Fundamental supreme law of a sovereign state.',
          summaryBn: 'সার্বভৌম রাষ্ট্রের সর্বোচ্চ মৌলিক আইন।',
          text: `### What is a Constitution?

A **Constitution** is the supreme legal charter of a sovereign nation that establishes the structure of government, distributes powers among state organs, and guarantees the fundamental rights of its citizens.

#### Core Principles of Constitutional Law:
1. **Supreme Law (*Lex Suprema*):** Any ordinary enactment or statutory rule inconsistent with the Constitution is void to the extent of the inconsistency (e.g., Article 7 of the Bangladesh Constitution).
2. **Separation of Powers:** Establishes and balances the three organs of state:
   - **Legislature (Parliament):** Enacts statutory laws.
   - **Executive (Government):** Implements and enforces laws.
   - **Judiciary (Courts):** Interprets laws and reviews the legality of executive actions.
3. **Fundamental Rights:** Constitutional guarantees protecting human dignity, liberty, equality before law, and freedom of speech.`,
          textBn: `### সংবিধান কি?

**সংবিধান** হলো একটি সার্বভৌম রাষ্ট্রের সর্বোচ্চ মৌলিক আইন, যা সরকারের কাঠামো নির্ধারণ করে, রাষ্ট্রের বিভিন্ন অঙ্গের ক্ষমতা বণ্টন করে এবং নাগরিকদের মৌলিক অধিকারের নিশ্চয়তা প্রদান করে।

#### সংবিধানের মূল বৈশিষ্ট্যসমূহ:
১. **সর্বোচ্চ আইন:** সংবিধানের সাথে সাংঘর্ষিক যেকোনো সাধারণ আইন অবৈধ বলে গণ্য হয় (যেমন: বাংলাদেশ সংবিধানের ৭ম অনুচ্ছেদ)।
২. **ক্ষমতার বণ্টন:** রাষ্ট্রের তিনটি প্রধান অঙ্গের (আইনসভা, নির্বাহী বিভাগ ও বিচার বিভাগ) ক্ষমতা ও দায়িত্ব সুনির্দিষ্ট করে।
৩. **মৌলিক অধিকার:** নাগরিকের ব্যক্তি স্বাধীনতা, সাম্য এবং মৌলিক অধিকারসমূহের সুরক্ষা নিশ্চিত করে।`,
          disclaimer: EDUCATIONAL_DISCLAIMER_EN,
        };
      }

      if (q.includes('jurisdiction') || q.includes('এখতিয়ার')) {
        return {
          headline: 'Understanding Jurisdiction in Law',
          headlineBn: 'আইনে এখতিয়ার (Jurisdiction) এর ধারণা',
          summary: 'The official authority of a court or tribunal to hear and decide a case.',
          summaryBn: 'কোনো আদালত বা ট্রাইব্যুনালের মামলা গ্রহণ ও বিচার করার বৈধ ক্ষমতা।',
          text: `### Understanding Legal Jurisdiction (এখতিয়ার)

**Jurisdiction** refers to the lawful authority conferred upon a court, tribunal, or public officer to adjudicate legal disputes and render legally binding decisions.

#### Major Dimensions of Jurisdiction:
1. **Territorial Jurisdiction:** The geographical boundary within which a court has legal authority.
2. **Pecuniary Jurisdiction:** The financial valuation of a civil suit that a specific court is empowered to hear.
3. **Subject-Matter Jurisdiction:** The specific category of law assigned to a court (e.g., Family Courts, Labour Tribunals, Cyber Tribunals).
4. **Appellate vs. Original Jurisdiction:** The power to hear a case for the first time (*Original*) versus reviewing a lower court's judgment on appeal (*Appellate*).`,
          textBn: `### আইনে এখতিয়ার (Jurisdiction) এর ধারণা

**এখতিয়ার** হলো আইন কর্তৃক কোনো আদালত, ট্রাইব্যুনাল বা বিচারককে প্রদত্ত সেই বৈধ ক্ষমতা, যার মাধ্যমে তারা কোনো আইনি বিরোধ গ্রহণ, বিচার এবং কার্যকর সিদ্ধান্ত প্রদান করতে পারে।

#### এখতিয়ারের প্রধান প্রকারভেদ:
১. **আঞ্চলিক এখতিয়ার (Territorial):** আদালতের ভৌগোলিক এলাকা।
২. **আর্থিক এখতিয়ার (Pecuniary):** মামলার আর্থিক পরিমাণের ওপর ভিত্তি করে আদালতের ক্ষমতা।
৩. **বিষয়গত এখতিয়ার (Subject-Matter):** সুনির্দিষ্ট বিষয়ের মামলা পরিচালনার ক্ষমতা (যেমন: পারিবারিক আদালত, শ্রম আদালত)।
৪. **আদি ও আপিল এখতিয়ার (Original vs Appellate):** নতুন মামলা সরাসরি গ্রহণ করার ক্ষমতা বনাম নিম্ন আদালতের সিদ্ধান্তের বিরুদ্ধে আপিল শোনার ক্ষমতা।`,
          disclaimer: EDUCATIONAL_DISCLAIMER_EN,
        };
      }

      // General fallback
      return {
        headline: 'General Legal Concept',
        headlineBn: 'সাধারণ আইনি ধারণা',
        summary: 'General educational jurisprudence explanation.',
        summaryBn: 'সাধারণ শিক্ষামূলক আইনি তত্ত্বীয় ব্যাখ্যা।',
        text: `### Educational Legal Concept Analysis

In legal theory, statutory frameworks balance substantive rights (what the law promises) with procedural avenues (how rights are enforced). 

To explore specific codified provisions in Bangladesh, you can query enactments like *The Penal Code, 1860*, *The Code of Criminal Procedure, 1898*, or *The Constitution of Bangladesh*.`,
        disclaimer: EDUCATIONAL_DISCLAIMER_EN,
      };
    }

    case 'legal_follow_up': {
      if (decision.resolvedContext?.referenceType === 'jurisdiction_scope') {
        return {
          headline: 'Jurisdictional Scope & International Application',
          headlineBn: 'আইনের ভৌগোলিক এখতিয়ার ও আন্তর্জাতিক প্রয়োগ',
          summary: 'Territorial jurisdiction of Bangladesh law and international treaty mechanisms.',
          summaryBn: 'বাংলাদেশ আইনের ভৌগোলিক এখতিয়ার ও আন্তর্জাতিক চুক্তির প্রয়োগসীমা।',
          text: `### Territorial Jurisdiction & International Application

1. **Territorial Jurisdiction (সীমানাভিত্তিক এখতিয়ার):**
   Statutes codified by the Parliament of Bangladesh (such as *The Penal Code, 1860* and *The Code of Criminal Procedure, 1898*) generally apply within the sovereign territory, territorial waters, and airspace of Bangladesh.

2. **Extraterritorial Jurisdiction (বিদেশে অবস্থানরত নাগরিক):**
   Under Sections 3 and 4 of the Penal Code, Bangladeshi citizens committing offenses outside Bangladesh may still be tried under Bangladesh law upon their return or through extradition treaties.

3. **International Treaties & Conventions:**
   Multilateral instruments (such as the *UDHR*, *ICCPR*, and *CEDAW*) establish universal human rights norms. In Bangladesh jurisprudence, international treaties require domestic enabling legislation passed by Parliament to become directly enforceable in municipal courts.

4. **Foreign Domestic Laws:**
   Nyayota currently indexes Bangladesh statutory law and selected international human rights treaties. For foreign domestic statutes (e.g. UK, US, Indian, or Canadian local laws), Nyayota does not maintain official statutory gazettes.`,
          textBn: `### আইনের ভৌগোলিক এখতিয়ার ও আন্তর্জাতিক প্রয়োগ

১. **আঞ্চলিক বা অভ্যন্তরীণ এখতিয়ার:**
   বাংলাদেশ জাতীয় সংসদ কর্তৃক প্রণীত আইনসমূহ (যেমন: *দণ্ডবিধি, ১৮৬০* এবং *ফৌজদারি কার্যবিধি, ১৮৯৮*) মূলত বাংলাদেশের ভৌগোলিক সীমানা, জলসীমা ও আকাশসীমার মধ্যে কার্যকর।

২. **বিদেশে অপরাধের বিচার (অতিরিক্ত এখতিয়ার):**
   দণ্ডবিধির ৩ ও ৪ ধারা অনুযায়ী, কোনো বাংলাদেশি নাগরিক বিদেশে অবস্থানকালে কোনো অপরাধ সংঘটন করলে দেশে ফেরত আসার পর বা প্রত্যর্পণ চুক্তির আওতায় বাংলাদেশে তার বিচার করা যেতে পারে।

৩. **আন্তর্জাতিক চুক্তি ও সনদ:**
   আন্তর্জাতিক মানবাধিকার সনদসমূহ (যেমন: UDHR, ICCPR) বৈশ্বিক মানদণ্ড নির্ধারণ করে। তবে বাংলাদেশের প্রচলিত আদালতে তা কার্যকর করতে জাতীয় সংসদ কর্তৃক স্থানীয় আইন প্রণয়ন করা আবশ্যক।

৪. **বিদেশি স্থানীয় আইন:**
   ন্যায়তা বর্তমানে বাংলাদেশের সংবিধিবদ্ধ আইন এবং প্রধান আন্তর্জাতিক সনদসমূহ সূচিত করে। অন্যান্য দেশের অভ্যন্তরীণ স্থানীয় আইনের জন্য ন্যায়তায় আনুষ্ঠানিক সরকারি গেজেট সংরক্ষিত নেই।`,
          disclaimer: EDUCATIONAL_DISCLAIMER_EN,
        };
      }

      // Simplification of prior turn
      const prevSummary = context.lastResponseSummary || 'the previous statutory explanation';
      return {
        headline: 'Simplified Legal Explanation',
        headlineBn: 'সহজ ভাষায় ব্যাখ্যা',
        summary: 'Plain-language breakdown of the preceding legal analysis.',
        summaryBn: 'পূর্ববর্তী আইনি আলোচনার সহজবোধ্য বিবরণ।',
        text: `### In Everyday Plain Words (সহজ ভাষায়)

To put ${context.activeSection ? `**${context.activeSection}**` : 'the previous topic'} as simply as possible:

1. **The Core Rule:** This law sets a clear standard that everyone must follow.
2. **Why It Matters:** It protects citizens from unlawful harm and ensures fair legal procedures.
3. **Consequences:** Violating this statutory rule can result in formal legal liability, invalidation of an action, or penal consequences as defined by the court.

---
*If you need specific details like exact penalties or court procedures, let me know!*`,
        textBn: `### সহজ বাংলায় সারসংক্ষেপ

${context.activeSection ? `**${context.activeSection}**` : 'পূর্ববর্তী বিষয়টি'} সহজ কথায় বুঝতে:

১. **মূল বিধান:** এই আইনটি একটি সুনির্দিষ্ট নিয়ম নির্ধারণ করে যা সবাইকে মেনে চলতে হবে।
২. **নাগরিক অধিকার:** এটি নাগরিকদের নিরাপত্তা ও সুরক্ষার নিশ্চয়তা প্রদান করে।
৩. **আইনি ফলাফল:** এই নিয়ম অমান্য করলে আইনানুগ শাস্তি বা দায়দায়িত্ব বহন করতে হয়।`,
        disclaimer: EDUCATIONAL_DISCLAIMER_EN,
      };
    }

    case 'clarification': {
      return {
        headline: 'Clarification Needed',
        headlineBn: 'স্পষ্টীকরণ প্রয়োজন',
        summary: 'Query requires additional context to avoid inaccurate assumptions.',
        summaryBn: 'ভুল ধারণা এড়াতে তথ্যের স্পষ্টীকরণ প্রয়োজন।',
        text: `${decision.clarificationPrompt || 'To give you the most accurate statutory answer, please specify which law, section, or action you are inquiring about.'}`,
        textBn: `${decision.clarificationPrompt || 'সঠিক সংবিধিবদ্ধ তথ্য পেতে অনুগ্রহ করে সংশ্লিষ্ট আইন, ধারা বা অপরাধের নামটি উল্লেখ করুন।'}`,
        clarificationPrompt: decision.clarificationPrompt,
        clarificationOptions: decision.clarificationOptions,
        disclaimer: EDUCATIONAL_DISCLAIMER_EN,
      };
    }

    case 'out_of_scope':
    default: {
      return {
        headline: 'Non-Legal Topic (Out of Scope)',
        headlineBn: 'আইনবহির্ভূত বিষয় (আওতার বাইরে)',
        summary: 'Polite redirection to Nyayota’s civic legal research scope.',
        summaryBn: 'ন্যায়তার আইনি গবেষণা পরিধিতে পুনরায় দৃষ্টি আকর্ষণ।',
        text: `### Dedicated Legal Scope & Educational Mission

Nyayota is strictly dedicated to Bangladesh statutory laws, constitutional jurisprudence, procedural codes, and international human rights conventions.

We cannot assist with general non-legal inquiries such as software programming, weather forecasts, entertainment trivia, or recipes.

#### Suggested Legal Queries to Try:
- *"Explain Section 302 of the Penal Code"*
- *"What is Article 102 of the Constitution?"*
- *"Procedure for filing a General Diary (GD)"*
- *"What is the difference between bailable and non-bailable offenses?"*`,
        textBn: `ন্যায়তা শুধুমাত্র বাংলাদেশের সংবিধিবদ্ধ আইন, সাংবিধানিক নীতিমালা, কার্যবিধি এবং আন্তর্জাতিক মানবাধিকার সনদের জন্য নিবেদিত।

আমরা সাধারণ প্রোগ্রামিং, আবহাওয়া, বিনোদন বা রান্নার মতো আইনবহির্ভূত প্রশ্নের উত্তর দিতে পারি না।

#### অনুসন্ধান করতে পারেন এমন কিছু আইনি প্রশ্ন:
- *"দণ্ডবিধি ধারা ৩০২ এর ব্যাখ্যা"*
- *"সংবিধানের ১০২ অনুচ্ছেদে কি বলা আছে?"*
- *"জিডি করার নিয়ম কি?"*
- *"জামিনযোগ্য ও অ-জামিনযোগ্য অপরাধের পার্থক্য"*`,
        disclaimer: EDUCATIONAL_DISCLAIMER_EN,
      };
    }
  }
}
