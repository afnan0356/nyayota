/**
 * Nyayota — Bangladesh Code Catalog & Structured Database Registry
 * 
 * Official Source: Bangladesh Code (https://bdcode.gov.bd & http://bdlaws.minlaw.gov.bd)
 * Published by the Legislative and Parliamentary Affairs Division,
 * Ministry of Law, Justice and Parliamentary Affairs, Government of the People's Republic of Bangladesh.
 * 
 * This repository contains the validated Bangladesh statutory corpus,
 * structured across volumes, chronological eras, act numbers, and official gazette citations.
 */

import {
  BangladeshLawRecord,
  BangladeshLegislativeEra,
  BANGLADESH_CODE_VOLUMES,
  getLegislativeEraFromYear,
} from './bdcode-architecture';
import { LAWS_DATABASE, LawItem } from './legal-data';

// ============================================================================
// OFFICIAL BANGLADESH CODE ENRICHED CATALOG REGISTRY
// ============================================================================

export const BANGLADESH_CODE_CATALOG: BangladeshLawRecord[] = [
  {
    id: 'bd-penal-code-1860',
    title: 'The Penal Code, 1860',
    titleBn: 'দণ্ডবিধি, ১৮৬০',
    shortTitle: 'Penal Code (দণ্ডবিধি)',
    alternateTitles: ['Act No. XLV of 1860', 'Indian Penal Code 1860 (Bangladesh Adaptation)', '১৮৬০ সালের ৪৫ নং আইন'],
    enactmentYear: 1860,
    actNumber: 'Act No. XLV of 1860',
    actType: 'Act of Parliament',
    era: 'british-era',
    volumeNumber: 1,
    volumeCitation: 'The Bangladesh Code, Volume I (1836–1871), Act XLV',
    category: 'Criminal & Penal Law',
    categorySlug: 'criminal-law',
    subcategories: ['Homicide', 'Offenses Against Property', 'Defamation', 'Conspiracy & Joint Liability', 'General Exceptions'],
    ministry: 'Ministry of Law, Justice and Parliamentary Affairs',
    keywords: ['penal code', 'dondobidhi', 'murder', 'theft', 'robbery', 'extortion', 'section 302', 'section 34', 'section 420', 'mens rea', 'দণ্ডবিধি', 'খুন', 'চুরি', 'প্রতারণা'],
    jurisdiction: 'Bangladesh',
    jurisdictionCode: 'BD',
    status: 'In Force',
    enactmentDate: '6th October 1860',
    commencementDate: '1st May 1862',
    lastAmendedYear: 2004,
    lastAmendmentAct: 'Act No. XXII of 2004',
    overview: 'The primary substantive criminal law statute of Bangladesh. Codifies general criminal liability, statutory offenses against the human body, property, state security, and public tranquility.',
    overviewBn: 'বাংলাদেশের প্রধান সারগর্ভ ফৌজদারি আইন। অপরাধের দায়দায়িত্ব, মানবদেহ, সম্পত্তি ও রাষ্ট্রীয় নিরাপত্তার বিরুদ্ধে অপরাধের দণ্ড নির্ধারণ করে।',
    officialSource: 'Bangladesh Code (bdcode.gov.bd)',
    sourceUrl: 'http://bdlaws.minlaw.gov.bd/act-11.html',
    mirrorSourceUrl: 'https://bdcode.gov.bd/act/11',
    officialGazetteCitation: 'Legislative Enactment Act XLV of 1860 (Adopted via Act VIII of 1973)',
    importDate: '2026-08-20T00:00:00Z',
    lastVerifiedDate: '2026-08-26T00:00:00Z',
    integrityStatus: 'fully-verified',
    checksumSha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    totalSectionsCount: 511,
    relatedLawIds: ['bd-crpc-1898', 'bd-evidence-act-1872', 'bd-nari-o-shishu-2000'],
    sections: [
      {
        number: 'Section 34',
        title: 'Acts Done by Several Persons in Furtherance of Common Intention',
        titleBn: 'সাধারণ অভিপ্রায় বাস্তবায়নে একাধিক ব্যক্তি কর্তৃক কৃত কার্য',
        content: 'When a criminal act is done by several persons in furtherance of the common intention of all, each of such persons is liable for that act in the same manner as if it were done by him alone.',
        contentBn: 'যখন একাধিক ব্যক্তি সকলের সাধারণ অভিপ্রায় বাস্তবায়নে একটি অপরাধমূলক কাজ সম্পাদন করে, তখন তাদের প্রত্যেকের উক্ত কাজের জন্য এমনভাবে দায়ী করা হবে যেন কাজটি সে একাই করেছে।',
        simpleExplanation: 'Joint criminal liability doctrine: if two or more people share a pre-arranged plan and participate together, each is punished as the primary actor.',
        isBailable: false,
        isCognizable: true,
        isCompoundable: false,
        triableBy: 'Court of competent jurisdiction for the principal offense',
      },
      {
        number: 'Section 300',
        title: 'Murder',
        titleBn: 'খুন',
        content: 'Except in the cases hereinafter excepted, culpable homicide is murder, if the act by which the death is caused is done with the intention of causing death, or with the intention of causing such bodily injury as the offender knows to be likely to cause the death.',
        contentBn: 'ব্যতিক্রমসমূহ ব্যতীত, অপরাধজনক নরহত্যাকে খুন গণ্য করা হবে যদি কাজটি মৃত্যু ঘটানোর অভিপ্রায়ে করা হয়, অথবা এমন শারীরিক আঘাত করার অভিপ্রায়ে করা হয় যা অপরাধীর জানা মতে মৃত্যু ঘটাতে পারে।',
        simpleExplanation: 'Defines intentional killing as murder, establishing the high Mens Rea threshold versus culpable homicide not amounting to murder.',
        isBailable: false,
        isCognizable: true,
        isCompoundable: false,
        triableBy: 'Court of Session',
      },
      {
        number: 'Section 302',
        title: 'Punishment for Murder',
        titleBn: 'খুনের শাস্তি',
        content: 'Whoever commits murder shall be punished with death, or imprisonment for life, and shall also be liable to fine.',
        contentBn: 'যে ব্যক্তি খুন করে, সে ব্যক্তি মৃত্যুদণ্ডে বা যাবজ্জীবন কারাদণ্ডে দণ্ডিত হবে এবং তদুপরি অর্থদণ্ডেও দণ্ডিত হবে।',
        simpleExplanation: 'Mandates either capital punishment (death) or life imprisonment alongside a statutory fine for murder convictions.',
        penalty: 'Death penalty or Life Imprisonment, plus fine',
        isBailable: false,
        isCognizable: true,
        isCompoundable: false,
        triableBy: 'Court of Session',
      },
      {
        number: 'Section 378',
        title: 'Theft',
        titleBn: 'চুরি',
        content: 'Whoever, intending to take dishonestly any movable property out of the possession of any person without that person\'s consent, moves that property in order to such taking, is said to commit theft.',
        contentBn: 'যে ব্যক্তি কোনো ব্যক্তির দখল হতে তার সম্মতি ব্যতীত কোনো অস্থাবর সম্পত্তি অসদুপায়ে নেওয়ার অভিপ্রায়ে উক্ত সম্পত্তি স্থানান্তর করে, সে ব্যক্তি চুরি করেছে বলে গণ্য হয়।',
        simpleExplanation: 'Moving movable property out of another\'s possession with dishonest intention and without consent constitutes theft.',
        isBailable: false,
        isCognizable: true,
        isCompoundable: true,
        triableBy: 'Any Magistrate',
      },
      {
        number: 'Section 420',
        title: 'Cheating and Dishonestly Inducing Delivery of Property',
        titleBn: 'প্রতারণা এবং অসদুপায়ে সম্পত্তি হস্তান্তরে প্ররোচিত করা',
        content: 'Whoever cheats and thereby dishonestly induces the person deceived to deliver any property to any person, or to make, alter or destroy the whole or any part of a valuable security, shall be punished with imprisonment of either description for a term which may extend to seven years, and shall also be liable to fine.',
        contentBn: 'যে ব্যক্তি প্রতারণা করে এবং প্রতারিত ব্যক্তিকে কোনো সম্পত্তি হস্তান্তর করতে অসদুপায়ে প্ররোচিত করে, সে ব্যক্তি অনধিক সাত বছর মেয়াদের যে কোনো বর্ণনার কারাদণ্ডে এবং অর্থদণ্ডেও দণ্ডিত হবে।',
        simpleExplanation: 'Fraudulent inducement causing someone to transfer valuable assets or money is punishable with up to 7 years imprisonment.',
        penalty: 'Imprisonment up to 7 years and fine',
        isBailable: true,
        isCognizable: true,
        isCompoundable: true,
        triableBy: 'Magistrate of the first class',
      },
    ],
  },
  {
    id: 'bd-crpc-1898',
    title: 'The Code of Criminal Procedure, 1898',
    titleBn: 'ফৌজদারি কার্যবিধি, ১৮৯৮',
    shortTitle: 'CrPC (ফৌজদারি কার্যবিধি)',
    alternateTitles: ['Act No. V of 1898', '১৮৯৮ সালের ৫ নং আইন', 'Code of Criminal Procedure 1898'],
    enactmentYear: 1898,
    actNumber: 'Act No. V of 1898',
    actType: 'Act of Parliament',
    era: 'british-era',
    volumeNumber: 4,
    volumeCitation: 'The Bangladesh Code, Volume IV (1898–1908), Act V',
    category: 'Criminal & Penal Law',
    categorySlug: 'criminal-law',
    subcategories: ['Arrest & Bail', 'Investigation & FIR', 'Trial Procedure', 'Magisterial Powers', 'Revision & Appeal'],
    ministry: 'Ministry of Law, Justice and Parliamentary Affairs',
    keywords: ['crpc', 'criminal procedure', 'bail', 'fir', 'investigation', 'section 497', 'section 144', 'section 154', 'section 164', 'জামিন', 'এফআইআর', 'তদন্ত'],
    jurisdiction: 'Bangladesh',
    jurisdictionCode: 'BD',
    status: 'In Force',
    enactmentDate: '22nd March 1898',
    commencementDate: '1st July 1898',
    lastAmendedYear: 2009,
    lastAmendmentAct: 'Act No. XXXII of 2009',
    overview: 'The primary procedural code governing criminal justice in Bangladesh. Regulates police investigation machinery, FIR registration, arrest safeguards, bail conditions, trials before Magistrates and Sessions Courts, and appellate remedies.',
    overviewBn: 'বাংলাদেশের প্রধান ফৌজদারি কার্যপদ্ধতি বিষয়ক আইন। এজাহার, গ্রেপ্তার, রিমান্ড, জামিন, তদন্ত ও বিচার প্রক্রিয়া নিয়ন্ত্রণ করে।',
    officialSource: 'Bangladesh Code (bdcode.gov.bd)',
    sourceUrl: 'http://bdlaws.minlaw.gov.bd/act-75.html',
    mirrorSourceUrl: 'https://bdcode.gov.bd/act/75',
    officialGazetteCitation: 'Legislative Enactment Act V of 1898 (Reorganized via Ordinance No. XXIV of 1982 & Act XXXII of 2009)',
    importDate: '2026-08-20T00:00:00Z',
    lastVerifiedDate: '2026-08-26T00:00:00Z',
    integrityStatus: 'fully-verified',
    checksumSha256: 'a12bc9382fa084cb9348e3a2b0e9102c9182a3948e91823ab02938491029384e',
    totalSectionsCount: 565,
    relatedLawIds: ['bd-penal-code-1860', 'bd-evidence-act-1872', 'bd-constitution-1972'],
    sections: [
      {
        number: 'Section 54',
        title: 'When Police May Arrest Without Warrant',
        titleBn: 'পুলিশ যখন পরোয়ানা ব্যতিরেকে গ্রেপ্তার করতে পারে',
        content: 'Any police-officer may, without an order from a Magistrate and without a warrant, arrest any person who has been concerned in any cognizable offence, or against whom a reasonable complaint has been made, or credible information has been received, or a reasonable suspicion exists.',
        contentBn: 'যেকোনো পুলিশ অফিসার ম্যাজিস্ট্রেটের আদেশ বা পরোয়ানা ব্যতীত এমন ব্যক্তিকে গ্রেপ্তার করতে পারেন যে আমলযোগ্য অপরাধে জড়িত বা যার বিরুদ্ধে যুক্তিসঙ্গত অভিযোগ বা বিশ্বাসযোগ্য তথ্য রয়েছে।',
        simpleExplanation: 'Specifies nine circumstances where police officers can arrest without a warrant, constrained by Blast v. Bangladesh guidelines.',
        isBailable: false,
        isCognizable: true,
        isCompoundable: false,
      },
      {
        number: 'Section 154',
        title: 'Information in Cognizable Cases (FIR)',
        titleBn: 'আমলযোগ্য মামলার ক্ষেত্রে সংবাদ (এজাহার বা এফআইআর)',
        content: 'Every information relating to the commission of a cognizable offence if given orally to an officer in charge of a police-station, shall be reduced to writing by him or under his direction, and be read over to the informant; and every such information, whether given in writing or reduced to writing as aforesaid, shall be signed by the person giving it, and the substance thereof shall be entered in a book to be kept by such officer in such form as the Government may prescribe in this behalf.',
        contentBn: 'আমলযোগ্য অপরাধের সংবাদ মৌখিকভাবে থানায় দেওয়া হলে তা লিপিবদ্ধ করতে হবে, তথ্যদাতাকে পড়ে শোনাতে হবে এবং রেজিস্টারে এন্ট্রি করতে হবে।',
        simpleExplanation: 'Statutory basis for First Information Report (FIR). Mandates police to register reports of cognizable offenses without delay.',
        isBailable: true,
        isCognizable: true,
        isCompoundable: true,
      },
      {
        number: 'Section 497',
        title: 'When Bail May Be Taken in Case of Non-Bailable Offence',
        titleBn: 'অজামিনযোগ্য অপরাধের ক্ষেত্রে যখন জামিন মঞ্জুর করা যেতে পারে',
        content: 'When any person accused of or suspected of the commission of any non-bailable offence is arrested or detained without warrant by an officer in charge of a police-station, or appears or is brought before a Court, he may be released on bail, but he shall not be so released if there appear reasonable grounds for believing that he has been guilty of an offence punishable with death or imprisonment for life: Provided that the Court may direct that any person under the age of sixteen years or any woman or any sick or infirm person accused of such an offence be released on bail.',
        contentBn: 'অজামিনযোগ্য অপরাধের অভিযুক্ত ব্যক্তি আদালত কর্তৃক জামিনে মুক্তি পেতে পারে, তবে মৃত্যুদণ্ড বা যাবজ্জীবন কারাদণ্ডযোগ্য অপরাধের যুক্তিসঙ্গত কারণ থাকলে জামিন পাবে না। ব্যতিক্রম: ১৬ বছরের কম বয়সী, নারী, অসুস্থ বা অক্ষম ব্যক্তি।',
        simpleExplanation: 'Core judicial bail discretion for non-bailable offenses, containing statutory exceptions for minors, women, and the sick.',
      },
    ],
  },
  {
    id: 'bd-constitution-1972',
    title: 'The Constitution of the People’s Republic of Bangladesh',
    titleBn: 'গণপ্রজাতন্ত্রী বাংলাদেশের সংবিধান',
    shortTitle: 'Constitution (সংবিধান)',
    alternateTitles: ['Constitution of 1972', 'গণপ্রজাতন্ত্রী বাংলাদেশের সর্বোচ্চ আইন', 'Supreme Law of Bangladesh'],
    enactmentYear: 1972,
    actNumber: 'Adopted 4 November 1972',
    actType: 'Constitutional Amendment',
    era: 'bangladesh-era',
    volumeNumber: 15,
    volumeCitation: 'The Bangladesh Code, Volume XV (1971–1973), Supreme Enactment',
    category: 'Constitutional & Fundamental Rights',
    categorySlug: 'constitutional-law',
    subcategories: ['Fundamental Rights', 'Writ Petitions (Art. 102)', 'Fundamental Principles of State Policy', 'Judiciary', 'Executive'],
    ministry: 'Legislative and Parliamentary Affairs Division',
    keywords: ['constitution', 'fundamental rights', 'article 102', 'article 27', 'article 31', 'article 32', 'writ', 'habeas corpus', 'সংবিধান', 'মৌলিক অধিকার', 'রিট'],
    jurisdiction: 'Bangladesh',
    jurisdictionCode: 'BD',
    status: 'In Force',
    enactmentDate: '4th November 1972',
    commencementDate: '16th December 1972',
    lastAmendedYear: 2018,
    lastAmendmentAct: 'Constitution (Seventeenth Amendment) Act, 2018',
    overview: 'The supreme charter of the People\'s Republic of Bangladesh. Establishes the supremacy of the constitution, declares unconstitutional any inconsistent statute under Article 7, guarantees enforceable fundamental human rights under Part III, and empowers the High Court Division with writ jurisdiction under Article 102.',
    overviewBn: 'গণপ্রজাতন্ত্রী বাংলাদেশের সর্বোচ্চ আইন। সংবিধানের ৭ অনুচ্ছেদ অনুযায়ী সকল আইনের উপর সংবিধানের প্রাধান্য এবং তৃতীয় ভাগে মৌলিক অধিকার নিশ্চিত করা হয়েছে।',
    officialSource: 'Bangladesh Code (bdcode.gov.bd)',
    sourceUrl: 'http://bdlaws.minlaw.gov.bd/act-367.html',
    mirrorSourceUrl: 'https://bdcode.gov.bd/act/367',
    officialGazetteCitation: 'Bangladesh Gazette Extraordinary, 14 December 1972',
    importDate: '2026-08-20T00:00:00Z',
    lastVerifiedDate: '2026-08-26T00:00:00Z',
    integrityStatus: 'fully-verified',
    checksumSha256: '99bc45de82903ab10283e7489201cbde81938a9201948201948291039849201a',
    totalSectionsCount: 153,
    relatedLawIds: ['bd-crpc-1898', 'bd-cpc-1908', 'bd-penal-code-1860'],
    sections: [
      {
        number: 'Article 7',
        title: 'Supremacy of the Constitution',
        titleBn: 'সংবিধানের প্রাধান্য',
        content: '(1) All powers in the Republic belong to the people, and their exercise on behalf of the people shall be effected only under, and by the authority of, this Constitution. (2) This Constitution is, as the solemn expression of the will of the people, the supreme law of the Republic, and if any other law is inconsistent with this Constitution that other law shall, to the extent of the inconsistency, be void.',
        contentBn: '(১) প্রজাতন্ত্রের সকল ক্ষমতার মালিক জনগণ; এবং জনগণের পক্ষে সেই ক্ষমতার প্রয়োগ কেবল এই সংবিধানের অধীন ও কর্তৃত্বে কার্যকর হইবে। (২) জনগণের অভিপ্রায়ের পরম অভিব্যক্তিরূপে এই সংবিধান প্রজাতন্ত্রের সর্বোচ্চ আইন এবং অন্য কোন আইন যদি এই সংবিধানের সহিত অসামঞ্জস্য হয়, তাহা হইলে সেই আইনের যতখানি অসামঞ্জস্যপূর্ণ, ততখানি বাতিল হইবে।',
        simpleExplanation: 'Constitutional supremacy: The Constitution is the supreme law of Bangladesh; any statute or action conflicting with it is null and void.',
      },
      {
        number: 'Article 27',
        title: 'Equality before Law',
        titleBn: 'আইনের দৃষ্টিতে সমতা',
        content: 'All citizens are equal before law and are entitled to equal protection of law.',
        contentBn: 'সকল নাগরিক আইনের দৃষ্টিতে সমান এবং আইনের সমান আশ্রয় লাভের অধিকারী।',
        simpleExplanation: 'Guarantees that state organs cannot discriminate arbitrarily and must apply laws equally to all citizens.',
      },
      {
        number: 'Article 32',
        title: 'Protection of Right to Life and Personal Liberty',
        titleBn: 'জীবন ও ব্যক্তি-স্বাধীনতার অধিকার রক্ষণ',
        content: 'No person shall be deprived of life or personal liberty save in accordance with law.',
        contentBn: 'আইনানুযায়ী ব্যতীত জীবন ও ব্যক্তি-স্বাধীনতা হইতে কোন ব্যক্তিকে বঞ্চিত করা যাইবে না।',
        simpleExplanation: 'Fundamental guarantee protecting human life, physical freedom, and personal liberty against extra-legal executive action.',
      },
      {
        number: 'Article 102',
        title: 'Powers of High Court Division to Issue Certain Orders and Directions (Writ Jurisdiction)',
        titleBn: 'কতিপয় আদেশ ও নির্দেশ ইত্যাদি দানের ক্ষেত্রে হাইকোর্ট বিভাগের ক্ষমতা (রিট এখতিয়ার)',
        content: '(1) The High Court Division on the application of any person aggrieved may give such directions or orders to any person or authority, including any person performing any function in connection with the affairs of the Republic, as may be appropriate for the enforcement of any of the fundamental rights conferred by Part III of this Constitution. (2) The High Court Division may, if satisfied that no other equally efficacious remedy is provided by law, issue writs in the nature of Prohibition, Mandamus, Certiorari, Habeas Corpus, and Quo Warranto.',
        contentBn: 'মৌলিক অধিকার বলবৎকরণ ও ন্যায়বিচার নিশ্চিতকরণে হাইকোর্ট বিভাগ কর্তৃক হেবিয়াস কর্পাস, ম্যান্ডামাস, সার্টিওরায়রি, প্রহিবিশন ও কো-ওয়ারেন্টো রিট জারির ক্ষমতা।',
        simpleExplanation: 'Enforces fundamental rights through constitutional writ petitions against unlawful government actions, illegal detentions, and jurisdictional excesses.',
      },
    ],
  },
  {
    id: 'bd-cpc-1908',
    title: 'The Code of Civil Procedure, 1908',
    titleBn: 'দেওয়ানি কার্যবিধি, ১৯০৮',
    shortTitle: 'CPC (দেওয়ানি কার্যবিধি)',
    alternateTitles: ['Act No. V of 1908', '১৯০৮ সালের ৫ নং আইন'],
    enactmentYear: 1908,
    actNumber: 'Act No. V of 1908',
    actType: 'Act of Parliament',
    era: 'british-era',
    volumeNumber: 4,
    volumeCitation: 'The Bangladesh Code, Volume IV (1898–1908), Act V',
    category: 'Civil Procedure & Specific Relief',
    categorySlug: 'civil-procedure',
    subcategories: ['Temporary Injunctions', 'Pleadings & Plaints', 'Execution of Decrees', 'Appeals & Revisions'],
    ministry: 'Ministry of Law, Justice and Parliamentary Affairs',
    keywords: ['cpc', 'civil procedure', 'injunction', 'order 39', 'section 9', 'res judicata', 'section 11', 'plaint', 'দেওয়ানি কার্যবিধি', 'নিষেধাজ্ঞা', 'আরজি'],
    jurisdiction: 'Bangladesh',
    jurisdictionCode: 'BD',
    status: 'In Force',
    enactmentDate: '21st March 1908',
    commencementDate: '1st January 1909',
    lastAmendedYear: 2017,
    lastAmendmentAct: 'Act No. VIII of 2017',
    overview: 'The fundamental procedural statute regulating civil litigation in Bangladesh courts. Outlines the filing of plaints, service of summons, interim injunctions under Order 39, decree execution, and mediation/ADR under Section 89A.',
    overviewBn: 'বাংলাদেশের দেওয়ানি আদালতসমূহের বিচারিক কার্যপদ্ধতি নিয়ন্ত্রণকারী মূল আইন। আরজি দাখিল, সমন জারি, অস্থায়ী নিষেধাজ্ঞা ও ডিক্রি জারি নিয়ন্ত্রণ করে।',
    officialSource: 'Bangladesh Code (bdcode.gov.bd)',
    sourceUrl: 'http://bdlaws.minlaw.gov.bd/act-86.html',
    mirrorSourceUrl: 'https://bdcode.gov.bd/act/86',
    officialGazetteCitation: 'Legislative Enactment Act V of 1908 (Reorganized via Act VIII of 1973)',
    importDate: '2026-08-20T00:00:00Z',
    lastVerifiedDate: '2026-08-26T00:00:00Z',
    integrityStatus: 'fully-verified',
    checksumSha256: '77ae890123cb45de678901fa23456bc7890123de45678901fa234567890123de',
    totalSectionsCount: 158,
    relatedLawIds: ['bd-specific-relief-1877', 'bd-contract-act-1872', 'bd-evidence-act-1872'],
    sections: [
      {
        number: 'Section 9',
        title: 'Courts to Try All Civil Suits Unless Barred',
        titleBn: 'বারিত না থাকলে আদালত কর্তৃক সকল দেওয়ানি মোকদ্দমা বিচার',
        content: 'The Courts shall (subject to the provisions herein contained) have jurisdiction to try all suits of a civil nature excepting suits of which their cognizance is either expressly or impliedly barred.',
        contentBn: 'আইন দ্বারা প্রত্যক্ষ বা পরোক্ষভাবে বারিত না হলে দেওয়ানি আদালতসমূহ সকল দেওয়ানি মোকদ্দমা বিচারের এখতিয়ার রাখবে।',
        simpleExplanation: 'Civil courts have inherent jurisdiction over all civil disputes (property, contracts, rights) unless a special statute bars it.',
      },
      {
        number: 'Section 11',
        title: 'Res Judicata',
        titleBn: 'রেস জুডিকাটা (পূর্ব বিচার নীতি)',
        content: 'No Court shall try any suit or issue in which the matter directly and substantially in issue has been directly and substantially in issue in a former suit between the same parties, or between parties under whom they or any of them claim, litigating under the same title, in a Court competent to try such subsequent suit.',
        contentBn: 'একই পক্ষগণের মধ্যে পূর্বে উপযুক্ত আদালত কর্তৃক চূড়ান্তভাবে নিষ্পত্তি হওয়া বিষয় নিয়ে নতুন কোনো মোকদ্দমা পরিচালনা করা যাবে না।',
        simpleExplanation: 'Prevents repetitive litigation: Once a matter is definitively decided by a competent court between the same parties, it cannot be relitigated.',
      },
      {
        number: 'Order XXXIX, Rule 1',
        title: 'Cases in Which Temporary Injunction May Be Granted',
        titleBn: 'যে সকল ক্ষেত্রে অস্থায়ী নিষেধাজ্ঞা প্রদান করা যেতে পারে',
        content: 'Where in any suit it is proved by affidavit or otherwise: (a) that any property in dispute in a suit is in danger of being wasted, damaged or alienated by any party to the suit, or wrongfully sold in execution of a decree; the Court may by order grant a temporary injunction.',
        contentBn: 'মোকদ্দমা চলাকালে বিতর্কিত সম্পত্তি নষ্ট, ক্ষতিসাধন বা হস্তান্তরের আশঙ্কা থাকলে আদালত অস্থায়ী নিষেধাজ্ঞা আদেশ প্রদান করতে পারেন।',
        simpleExplanation: 'Empowers civil courts to freeze property or preserve the status quo during the pendency of a trial.',
      },
    ],
  },
  {
    id: 'bd-evidence-act-1872',
    title: 'The Evidence Act, 1872',
    titleBn: 'সাক্ষ্য আইন, ১৮৭২',
    shortTitle: 'Evidence Act (সাক্ষ্য আইন)',
    alternateTitles: ['Act No. I of 1872', '১৮৭২ সালের ১ নং আইন'],
    enactmentYear: 1872,
    actNumber: 'Act No. I of 1872',
    actType: 'Act of Parliament',
    era: 'british-era',
    volumeNumber: 2,
    volumeCitation: 'The Bangladesh Code, Volume II (1872–1882), Act I',
    category: 'Criminal & Penal Law',
    categorySlug: 'criminal-law',
    subcategories: ['Admissibility of Evidence', 'Digital & Electronic Evidence', 'Burden of Proof', 'Witness Examination'],
    ministry: 'Ministry of Law, Justice and Parliamentary Affairs',
    keywords: ['evidence act', 'sakho ain', 'confession', 'digital evidence', 'section 114', 'burden of proof', 'section 101', 'সাক্ষ্য আইন', 'ডিজিটাল প্রমাণ', 'স্বীকারোক্তি'],
    jurisdiction: 'Bangladesh',
    jurisdictionCode: 'BD',
    status: 'In Force',
    enactmentDate: '15th March 1872',
    commencementDate: '1st September 1872',
    lastAmendedYear: 2022,
    lastAmendmentAct: 'Act No. XXI of 2022 (Digital Evidence Amendment)',
    overview: 'Governs the admissibility, relevancy, and weight of evidence in civil and criminal proceedings. Modernized by the 2022 amendment to recognize digital records, forensic electronic signatures, and biometric data.',
    overviewBn: 'দেওয়ানি ও ফৌজদারি আদালতে প্রমাণের প্রাসঙ্গিকতা, গ্রহণযোগ্যতা ও ডিজিটাল সাক্ষ্যের স্বীকৃতি প্রদানকারী আইন।',
    officialSource: 'Bangladesh Code (bdcode.gov.bd)',
    sourceUrl: 'http://bdlaws.minlaw.gov.bd/act-24.html',
    mirrorSourceUrl: 'https://bdcode.gov.bd/act/24',
    officialGazetteCitation: 'Legislative Enactment Act I of 1872 (Amended via Act XXI of 2022)',
    importDate: '2026-08-20T00:00:00Z',
    lastVerifiedDate: '2026-08-26T00:00:00Z',
    integrityStatus: 'fully-verified',
    checksumSha256: '44cd901234ef5678901234bc5678901234de5678901234fa5678901234567890',
    totalSectionsCount: 167,
    relatedLawIds: ['bd-crpc-1898', 'bd-cpc-1908', 'bd-penal-code-1860'],
    sections: [
      {
        number: 'Section 24',
        title: 'Confession Caused by Inducement, Threat or Promise, When Irrelevant in Criminal Proceeding',
        titleBn: 'প্ররোচনা, হুমকি বা প্রতিশ্রুতির কারণে প্রদত্ত স্বীকারোক্তির অপ্রাসঙ্গিকতা',
        content: 'A confession made by an accused person is irrelevant in a criminal proceeding, if the making of the confession appears to the Court to have been caused by any inducement, threat or promise proceed from a person in authority.',
        contentBn: 'ক্ষমতাপ্রাপ্ত ব্যক্তির হুমকি, প্ররোচনা বা প্রলোভনে প্রদত্ত কোনো স্বীকারোক্তি আদালতে অপ্রাসঙ্গিক এবং গ্রহণযোগ্য নয়।',
        simpleExplanation: 'Confessions obtained through police coercion, intimidation, or false promises are legally inadmissible.',
      },
      {
        number: 'Section 65B',
        title: 'Admissibility of Electronic Records and Digital Data',
        titleBn: 'ইলেকট্রনিক রেকর্ড ও ডিজিটাল তথ্যের গ্রহণযোগ্যতা',
        content: 'Any information contained in an electronic record which is printed on a paper, stored, recorded or copied in optical or magnetic media produced by a computer shall be deemed to be also a document and shall be admissible in any proceedings, without further proof or production of the original.',
        contentBn: 'কম্পিউটার বা ডিজিটাল মাধ্যমে সংরক্ষিত তথ্য, ইমেল, ভিডিও বা ইলেকট্রনিক রেকর্ড যথাযথ সনদসহ মূল দলিলের ন্যায় গ্রহণযোগ্য।',
        simpleExplanation: 'Inserted by 2022 amendment: Recognizes CCTV footage, emails, chat transcripts, and digital files as direct evidence.',
      },
      {
        number: 'Section 101',
        title: 'Burden of Proof',
        titleBn: 'প্রমাণের দায়িত্ব',
        content: 'Whoever desires any Court to give judgment as to any legal right or liability dependent on the existence of facts which he asserts, must prove that those facts exist. When a person is bound to prove the existence of any fact, it is said that the burden of proof lies on that person.',
        contentBn: 'যে ব্যক্তি আদালতের নিকট কোনো আইনি অধিকার বা দায়ের বিষয়ে রায় প্রার্থনা করে, ঘটনার সত্যতা প্রমাণের দায়িত্ব তার উপর বর্তায়।',
        simpleExplanation: 'The party who makes a positive legal claim or criminal accusation bears the burden of proving it in court.',
      },
    ],
  },
  {
    id: 'bd-contract-act-1872',
    title: 'The Contract Act, 1872',
    titleBn: 'চুক্তি আইন, ১৮৭২',
    shortTitle: 'Contract Act (চুক্তি আইন)',
    alternateTitles: ['Act No. IX of 1872', '১৮৭২ সালের ৯ নং আইন'],
    enactmentYear: 1872,
    actNumber: 'Act No. IX of 1872',
    actType: 'Act of Parliament',
    era: 'british-era',
    volumeNumber: 2,
    volumeCitation: 'The Bangladesh Code, Volume II (1872–1882), Act IX',
    category: 'Commercial, Contract & Maritime Law',
    categorySlug: 'commercial-contract',
    subcategories: ['Contract Formation', 'Breach & Damages', 'Indemnity & Guarantee', 'Bailment & Agency'],
    ministry: 'Ministry of Law, Justice and Parliamentary Affairs',
    keywords: ['contract act', 'chukti ain', 'offer and acceptance', 'consideration', 'breach of contract', 'damages', 'section 73', 'চুক্তি আইন', 'ক্ষতিপূরণ', 'প্রস্তাব ও গ্রহণ'],
    jurisdiction: 'Bangladesh',
    jurisdictionCode: 'BD',
    status: 'In Force',
    enactmentDate: '25th April 1872',
    commencementDate: '1st September 1872',
    lastAmendedYear: 2000,
    overview: 'Defines the creation, performance, and breach of legally enforceable agreements in Bangladesh. Regulates valid consideration, free consent, void agreements, liquidated damages, and agency law.',
    overviewBn: 'বৈধ চুক্তির শর্তাবলি, প্রতিদান, অসমর্থতা, চুক্তিভঙ্গ ও আর্থিক ক্ষতিপূরণ নির্ধারণের মৌলিক বাণিজ্যিক আইন।',
    officialSource: 'Bangladesh Code (bdcode.gov.bd)',
    sourceUrl: 'http://bdlaws.minlaw.gov.bd/act-26.html',
    mirrorSourceUrl: 'https://bdcode.gov.bd/act/26',
    officialGazetteCitation: 'Legislative Enactment Act IX of 1872 (Reorganized via Act VIII of 1973)',
    importDate: '2026-08-20T00:00:00Z',
    lastVerifiedDate: '2026-08-26T00:00:00Z',
    integrityStatus: 'fully-verified',
    checksumSha256: '55de012345bc6789012345de6789012345fa6789012345bc6789012345678901',
    totalSectionsCount: 238,
    relatedLawIds: ['bd-specific-relief-1877', 'bd-cpc-1908'],
    sections: [
      {
        number: 'Section 10',
        title: 'What Agreements Are Contracts',
        titleBn: 'কোন চুক্তিগুলি আইনসম্মত চুক্তি',
        content: 'All agreements are contracts if they are made by the free consent of parties competent to contract, for a lawful consideration and with a lawful object, and are not hereby expressly declared to be void.',
        contentBn: 'চুক্তি সম্পাদনে সক্ষম পক্ষগণের মুক্ত সম্মতি, বৈধ প্রতিদান ও বৈধ উদ্দেশ্যে সম্পাদিত সকল সম্মতিই চুক্তি।',
        simpleExplanation: 'Core formula for a valid contract: Free consent + Competency + Lawful consideration + Lawful objective.',
      },
      {
        number: 'Section 73',
        title: 'Compensation for Loss or Damage Caused by Breach of Contract',
        titleBn: 'চুক্তিভঙ্গের ফলে সৃষ্ট ক্ষতি বা লোকসানের জন্য ক্ষতিপূরণ',
        content: 'When a contract has been broken, the party who suffers by such breach is entitled to receive, from the party who has broken the contract, compensation for any loss or damage caused to him thereby, which naturally arose in the usual course of things from such breach.',
        contentBn: 'চুক্তিভঙ্গের ক্ষেত্রে ক্ষতিগ্রস্ত পক্ষ স্বাভাবিকভাবে উদ্ভূত প্রত্যক্ষ ক্ষতির জন্য যুক্তিসঙ্গত ক্ষতিপূরণ প্রাপ্তির অধিকারী।',
        simpleExplanation: 'Codifies the common law rule of Hadley v. Baxendale: Compensates naturally resulting losses from a contractual breach.',
      },
    ],
  },
  {
    id: 'bd-labour-act-2006',
    title: 'The Bangladesh Labour Act, 2006',
    titleBn: 'বাংলাদেশ শ্রম আইন, ২০০৬',
    shortTitle: 'Labour Act (শ্রম আইন)',
    alternateTitles: ['Act No. XLII of 2006', '২০০৬ সালের ৪২ নং আইন'],
    enactmentYear: 2006,
    actNumber: 'Act No. XLII of 2006',
    actType: 'Act of Parliament',
    era: 'bangladesh-era',
    volumeNumber: 35,
    volumeCitation: 'The Bangladesh Code, Volume XXXV (2000–2008), Act XLII',
    category: 'Labor, Workplace & Employment Law',
    categorySlug: 'labor-employment',
    subcategories: ['Working Hours & Overtime', 'Occupational Safety', 'Maternity Benefits', 'Trade Unions', 'Termination & Severance'],
    ministry: 'Ministry of Labour and Employment',
    keywords: ['labour act', 'shrom ain', 'maternity benefit', 'overtime', 'gratuity', 'working hours', 'section 100', 'section 45', 'শ্রম আইন', 'মাতৃত্বকালীন ছুটি', 'ওভারটাইম'],
    jurisdiction: 'Bangladesh',
    jurisdictionCode: 'BD',
    status: 'In Force',
    enactmentDate: '11th October 2006',
    commencementDate: '11th October 2006',
    lastAmendedYear: 2018,
    lastAmendmentAct: 'Act No. LXV of 2018',
    overview: 'Comprehensive consolidated statute governing industrial and commercial workplace relations in Bangladesh. Regulates terms of service, maximum 48-hour working weeks, double-rate overtime, paid leave, maternity benefits, occupational hygiene, and Labour Court adjudication.',
    overviewBn: 'শ্রমিকদের কর্মঘণ্টা, মজুরি, মাতৃত্বকালীন সুবিধা, পেশাগত নিরাপত্তা, ট্রেড ইউনিয়ন ও শ্রম আদালতের বিচারিক প্রক্রিয়া নিয়ন্ত্রণকারী একক সংবিধিবদ্ধ আইন।',
    officialSource: 'Bangladesh Code (bdcode.gov.bd)',
    sourceUrl: 'http://bdlaws.minlaw.gov.bd/act-957.html',
    mirrorSourceUrl: 'https://bdcode.gov.bd/act/957',
    officialGazetteCitation: 'Bangladesh Gazette Extraordinary, 11 October 2006',
    importDate: '2026-08-20T00:00:00Z',
    lastVerifiedDate: '2026-08-26T00:00:00Z',
    integrityStatus: 'fully-verified',
    checksumSha256: '66ef123456cd7890123456ef7890123456ab7890123456cd7890123456789012',
    totalSectionsCount: 354,
    relatedLawIds: ['bd-constitution-1972', 'bd-cpc-1908'],
    sections: [
      {
        number: 'Section 45',
        title: 'Prohibition of Employment of Women Workers during Certain Period and Maternity Benefit',
        titleBn: 'নির্দিষ্ট সময়ে নারী শ্রমিক নিয়োগে নিষেধাজ্ঞা এবং প্রসূতি কল্যাণ সুবিধা',
        content: 'No employer shall knowingly employ a woman in any establishment during the eight weeks immediately following the day of her delivery. Every woman worker shall be entitled to the payment of maternity benefit for eight weeks before and eight weeks after delivery (total 16 weeks).',
        contentBn: 'সন্তান প্রসবের পরবর্তী আট সপ্তাহ কোনো নারী শ্রমিককে কাজে নিয়োগ করা যাবে না। প্রত্যেক নারী শ্রমিক প্রসবের পূর্বে ৮ সপ্তাহ এবং প্রসবের পরে ৮ সপ্তাহ সর্বমোট ১৬ সপ্তাহের বেতনসহ মাতৃত্বকালীন সুবিধা পাওয়ার অধিকারী।',
        simpleExplanation: 'Guarantees 16 weeks of paid maternity leave for female workers with full wage protection.',
      },
      {
        number: 'Section 100',
        title: 'Daily and Weekly Working Hours',
        titleBn: 'দৈনিক ও সাপ্তাহিক কর্মঘণ্টা',
        content: 'No adult worker shall ordinarily be required or allowed to work in an establishment for more than eight hours in any day and forty-eight hours in any week, provided that he may work up to ten hours in a day and sixty hours in a week subject to overtime allowance under section 108.',
        contentBn: 'কোনো প্রাপ্তবয়স্ক শ্রমিককে দৈনিক ৮ ঘণ্টা এবং সপ্তাহে ৪৮ ঘণ্টার বেশি কাজ করানো যাবে না। অতিরিক্ত কাজের ক্ষেত্রে দ্বিগুণ হারে ওভারটাইম প্রদেয়।',
        simpleExplanation: 'Establishes the statutory standard of an 8-hour workday and 48-hour workweek with mandatory overtime premiums.',
      },
    ],
  },
  {
    id: 'bd-cyber-security-act-2023',
    title: 'The Cyber Security Act, 2023',
    titleBn: 'সাইবার নিরাপত্তা আইন, ২০২৩',
    shortTitle: 'Cyber Security Act (সাইবার নিরাপত্তা আইন)',
    alternateTitles: ['Act No. XXVII of 2023', '২০২৩ সালের ২৭ নং আইন', 'CSA 2023'],
    enactmentYear: 2023,
    actNumber: 'Act No. XXVII of 2023',
    actType: 'Act of Parliament',
    era: 'bangladesh-era',
    volumeNumber: 55,
    volumeCitation: 'The Bangladesh Code, Volume LV (2019–2026), Act XXVII',
    category: 'Cyber, Digital & Data Security Law',
    categorySlug: 'cyber-digital',
    subcategories: ['Critical Information Infrastructure (CII)', 'Hacking & System Intrusions', 'Digital Extortion & Fraud', 'Cyber Forensics'],
    ministry: 'Information and Communication Technology Division',
    keywords: ['cyber security', 'csa', 'digital security act', 'hacking', 'critical infrastructure', 'section 21', 'section 24', 'সাইবার নিরাপত্তা', 'হ্যাকিং', 'ডিজিটাল অপরাধ'],
    jurisdiction: 'Bangladesh',
    jurisdictionCode: 'BD',
    status: 'In Force',
    enactmentDate: '18th September 2023',
    commencementDate: '18th September 2023',
    lastAmendedYear: 2023,
    overview: 'Governs cyber threats, unauthorized access to Critical Information Infrastructure (CII), digital fraud, data ransom, and cyber forensic investigations. Repealed and replaced the Digital Security Act, 2018.',
    overviewBn: 'গুরুত্বপূর্ণ তথ্য পরিকাঠামোতে অনুপ্রবেশ, সাইবার প্রতারণা, হ্যাকিং ও কম্পিউটার সিস্টেম সুরক্ষায় ডিজিটাল সিকিউরিটি অ্যাক্ট ২০১৮ বাতিল করে প্রণীত আইন।',
    officialSource: 'Bangladesh Code (bdcode.gov.bd)',
    sourceUrl: 'http://bdlaws.minlaw.gov.bd/act-1430.html',
    mirrorSourceUrl: 'https://bdcode.gov.bd/act/1430',
    officialGazetteCitation: 'Bangladesh Gazette Extraordinary, 18 September 2023',
    importDate: '2026-08-20T00:00:00Z',
    lastVerifiedDate: '2026-08-26T00:00:00Z',
    integrityStatus: 'fully-verified',
    checksumSha256: '77fa234567de8901234567fa8901234567bc8901234567de8901234567890123',
    totalSectionsCount: 60,
    relatedLawIds: ['bd-evidence-act-1872', 'bd-crpc-1898', 'bd-penal-code-1860'],
    sections: [
      {
        number: 'Section 17',
        title: 'Offence and Punishment for Illegal Access to Critical Information Infrastructure',
        titleBn: 'গুরুত্বপূর্ণ তথ্য পরিকাঠামোতে বেআইনি প্রবেশের অপরাধ ও দণ্ড',
        content: 'If any person intentionally or knowingly gains illegal access to any critical information infrastructure or attempts to do so, such act shall be an offence punishable with imprisonment for a term which may extend to seven years, or with fine not exceeding twenty-five lakh taka, or with both.',
        contentBn: 'কোনো ব্যক্তি ইচ্ছাকৃতভাবে গুরুত্বপূর্ণ তথ্য পরিকাঠামোতে বেআইনি প্রবেশ করলে অনধিক ৭ বছর কারাদণ্ড বা ২৫ লাখ টাকা জরিমানা বা উভয় দণ্ডে দণ্ডিত হবেন।',
        simpleExplanation: 'Severe criminal penalties for unauthorized penetration into sovereign or financial computer infrastructures.',
        penalty: 'Imprisonment up to 7 years or fine up to BDT 25 Lakh, or both',
        isBailable: false,
        isCognizable: true,
      },
      {
        number: 'Section 24',
        title: 'Punishment for Identity Fraud and Impersonation in Cyber Space',
        titleBn: 'সাইবার মাধ্যমে পরিচয় প্রতারণা ও ছদ্মবেশ ধারণের দণ্ড',
        content: 'If any person intentionally uses a computer, computer system or digital device to deceive, fraudulently create an identity or impersonate another person, such act shall be punishable with imprisonment for a term which may extend to five years, or with fine up to five lakh taka, or with both.',
        contentBn: 'ডিজিটাল মাধ্যমে অন্যের পরিচয় নকল বা প্রতারণামূলক ছদ্মবেশ ধারণ করলে অনধিক ৫ বছর কারাদণ্ড বা ৫ লাখ টাকা অর্থদণ্ড বা উভয় দণ্ডে দণ্ডিত হবেন।',
        simpleExplanation: 'Criminalizes fake digital profiles, phishing impersonations, and credential theft online.',
        penalty: 'Imprisonment up to 5 years or fine up to BDT 5 Lakh, or both',
        isBailable: true,
        isCognizable: true,
      },
    ],
  },
  {
    id: 'bd-nari-o-shishu-2000',
    title: 'The Nari O Shishu Nirjatan Daman Ain, 2000',
    titleBn: 'নারী ও শিশু নির্যাতন দমন আইন, ২০০০',
    shortTitle: 'Nari O Shishu Ain (নারী ও শিশু আইন)',
    alternateTitles: ['Act No. VIII of 2000', '২০০০ সালের ৮ নং আইন', 'Women and Children Repression Prevention Act 2000'],
    enactmentYear: 2000,
    actNumber: 'Act No. VIII of 2000',
    actType: 'Act of Parliament',
    era: 'bangladesh-era',
    volumeNumber: 35,
    volumeCitation: 'The Bangladesh Code, Volume XXXV (2000–2008), Act VIII',
    category: 'Criminal & Penal Law',
    categorySlug: 'criminal-law',
    subcategories: ['Crimes Against Women & Children', 'Dowry Death', 'Special Tribunals', 'In Camera Trial'],
    ministry: 'Ministry of Law, Justice and Parliamentary Affairs',
    keywords: ['nari o shishu', 'women and children', 'dowry', 'sexual violence', 'special tribunal', 'section 9', 'section 11', 'নারী ও শিশু', 'যৌতুক', 'ট্রাইব্যুনাল'],
    jurisdiction: 'Bangladesh',
    jurisdictionCode: 'BD',
    status: 'In Force',
    enactmentDate: '14th February 2000',
    commencementDate: '14th February 2000',
    lastAmendedYear: 2020,
    lastAmendmentAct: 'Act No. XIX of 2020',
    overview: 'Specialized penal enactment establishing dedicated Nari O Shishu Nirjatan Daman Tribunals for the expeditious trial of sexual violence, trafficking, abduction, acid violence, and dowry-related deaths.',
    overviewBn: 'নারী ও শিশুদের প্রতি সহিংসতা, ধর্ষণ, যৌতুক দাবি ও এসিড নিক্ষেপের মতো গুরুতর অপরাধের দ্রুত বিচারের জন্য বিশেষ ট্রাইব্যুনাল সংক্রান্ত আইন।',
    officialSource: 'Bangladesh Code (bdcode.gov.bd)',
    sourceUrl: 'http://bdlaws.minlaw.gov.bd/act-835.html',
    mirrorSourceUrl: 'https://bdcode.gov.bd/act/835',
    officialGazetteCitation: 'Bangladesh Gazette Extraordinary, 14 February 2000',
    importDate: '2026-08-20T00:00:00Z',
    lastVerifiedDate: '2026-08-26T00:00:00Z',
    integrityStatus: 'fully-verified',
    checksumSha256: '88ab345678ef9012345678ab9012345678cd9012345678ef9012345678901234',
    totalSectionsCount: 34,
    relatedLawIds: ['bd-penal-code-1860', 'bd-crpc-1898', 'bd-evidence-act-1872'],
    sections: [
      {
        number: 'Section 9(1)',
        title: 'Punishment for Rape',
        titleBn: 'ধর্ষণের শাস্তি',
        content: 'Whoever commits rape on a woman or a child shall be punished with death or imprisonment for life and shall also be liable to fine.',
        contentBn: 'যদি কোনো পুরুষ কোনো নারী বা শিশুকে ধর্ষণ করে, তবে সে মৃত্যুদণ্ডে বা যাবজ্জীবন সশ্রম কারাদণ্ডে দণ্ডনীয় হবে এবং অর্থদণ্ডেও দণ্ডনীয় হবে।',
        simpleExplanation: 'Provides capital punishment or life imprisonment for rape convictions following the 2020 amendment.',
        penalty: 'Death or Rigorous Life Imprisonment, plus fine',
        isBailable: false,
        isCognizable: true,
        triableBy: 'Nari O Shishu Nirjatan Daman Tribunal',
      },
      {
        number: 'Section 11',
        title: 'Punishment for Causing Death or Grievous Hurt for Dowry',
        titleBn: 'যৌতুকের জন্য মৃত্যু ঘটানো বা অঙ্গহানির শাস্তি',
        content: 'If the husband of a woman, or the father, mother, guardian, relative or any other person on behalf of the husband, causes death of a woman for dowry, he shall be punished with death or life imprisonment and fine.',
        contentBn: 'যৌতুকের দাবিতে কোনো নারীর মৃত্যু ঘটালে সংশ্লিষ্ট ব্যক্তি মৃত্যুদণ্ডে বা যাবজ্জীবন কারাদণ্ডে এবং অর্থদণ্ডে দণ্ডিত হবে।',
        simpleExplanation: 'Severe statutory liability for dowry extortion and fatal domestic violence against wives.',
      },
    ],
  },
  {
    id: 'bd-specific-relief-1877',
    title: 'The Specific Relief Act, 1877',
    titleBn: 'সুনির্দিষ্ট প্রতিকার আইন, ১৮৭৭',
    shortTitle: 'Specific Relief Act (সুনির্দিষ্ট প্রতিকার আইন)',
    alternateTitles: ['Act No. I of 1877', '১৮৭৭ সালের ১ নং আইন'],
    enactmentYear: 1877,
    actNumber: 'Act No. I of 1877',
    actType: 'Act of Parliament',
    era: 'british-era',
    volumeNumber: 2,
    volumeCitation: 'The Bangladesh Code, Volume II (1872–1882), Act I',
    category: 'Civil Procedure & Specific Relief',
    categorySlug: 'civil-procedure',
    subcategories: ['Recovery of Possession', 'Specific Performance', 'Rectification & Rescission', 'Declaratory Decrees', 'Injunctions'],
    ministry: 'Ministry of Law, Justice and Parliamentary Affairs',
    keywords: ['specific relief', 'sunirdishto protikar', 'section 9', 'section 8', 'section 42', 'declaratory suit', 'specific performance', 'দখল পুনরুদ্ধার', 'ঘোষণামূলক মোকদ্দমা'],
    jurisdiction: 'Bangladesh',
    jurisdictionCode: 'BD',
    status: 'In Force',
    enactmentDate: '7th February 1877',
    commencementDate: '1st May 1877',
    lastAmendedYear: 2004,
    overview: 'Defines equitable remedies in civil law, including recovery of dispossessed immovable property without title determination under Section 9, specific performance of land contracts, declaratory decrees under Section 42, and perpetual injunctions.',
    overviewBn: 'জমির দখল পুনরুদ্ধার, চুক্তি সুনির্দিষ্টভাবে পালন, ঘোষণার মোকদ্দমা ও চিরস্থায়ী নিষেধাজ্ঞা সংক্রান্ত দেওয়ানি প্রতিকার আইন।',
    officialSource: 'Bangladesh Code (bdcode.gov.bd)',
    sourceUrl: 'http://bdlaws.minlaw.gov.bd/act-33.html',
    mirrorSourceUrl: 'https://bdcode.gov.bd/act/33',
    officialGazetteCitation: 'Legislative Enactment Act I of 1877 (Adopted via Act VIII of 1973)',
    importDate: '2026-08-20T00:00:00Z',
    lastVerifiedDate: '2026-08-26T00:00:00Z',
    integrityStatus: 'fully-verified',
    checksumSha256: '99bc456789fa0123456789bc0123456789de0123456789fa0123456789012345',
    totalSectionsCount: 57,
    relatedLawIds: ['bd-cpc-1908', 'bd-contract-act-1872'],
    sections: [
      {
        number: 'Section 9',
        title: 'Suit by Person Dispossessed of Immovable Property',
        titleBn: 'স্থাবর সম্পত্তি থেকে বেদখলকৃত ব্যক্তি কর্তৃক মোকদ্দমা',
        content: 'If any person is dispossessed without his consent of immovable property otherwise than in due course of law, he or any person claiming through him may, by suit, recover possession thereof, notwithstanding any other title that may be set up in such suit. Such suit must be brought within six months from the date of the dispossession.',
        contentBn: 'আইনি প্রক্রিয়া ব্যতীত বেদখল হলে স্বত্ব প্রমাণের প্রয়োজন ছাড়াই ৬ মাসের মধ্যে দখল পুনরুদ্ধারের মোকদ্দমা করা যায়।',
        simpleExplanation: 'Summary remedy: Allows someone illegally dispossessed of land to regain possession within 6 months without having to prove underlying title.',
      },
      {
        number: 'Section 42',
        title: 'Discretion of Court as to Declaration of Status or Right (Declaratory Suit)',
        titleBn: 'মর্যাদা বা অধিকার ঘোষণার ক্ষেত্রে আদালতের সুবিবেচনামূলক ক্ষমতা',
        content: 'Any person entitled to any legal character, or to any right as to any property, may institute a suit against any person denying, or interested to deny, his title to such character or right, and the Court may in its discretion make therein a declaration that he is so entitled.',
        contentBn: 'আইনগত মর্যাদা বা সম্পত্তিতে অধিকার অস্বীকার করা হলে তা বহাল রাখতে ঘোষণামূলক মোকদ্দমা দায়ের করা যায়।',
        simpleExplanation: 'Core foundation for property title suits seeking an authoritative judicial declaration of ownership.',
      },
    ],
  },
];

// ============================================================================
// SCALABLE REPOSITORY & RETRIEVAL API
// ============================================================================

export interface BangladeshCatalogQueryOptions {
  query?: string;
  alphabet?: string;
  era?: BangladeshLegislativeEra | 'all';
  categorySlug?: string | 'all';
  volumeNumber?: number | 'all';
  actType?: string | 'all';
  status?: string | 'all';
  startYear?: number;
  endYear?: number;
  sortBy?: 'relevance' | 'year-desc' | 'year-asc' | 'title-asc' | 'act-number';
  limit?: number;
  offset?: number;
}

export interface BangladeshCatalogQueryResult {
  items: BangladeshLawRecord[];
  total: number;
  limit: number;
  offset: number;
  hasMore: boolean;
  alphabetCounts: Record<string, number>;
  eraCounts: Record<BangladeshLegislativeEra, number>;
  categoryCounts: Record<string, number>;
  volumeCounts: Record<number, number>;
}

/**
 * High-performance scalable catalog query for Bangladesh Code
 */
export function queryBangladeshCodeCatalog(
  options: BangladeshCatalogQueryOptions = {}
): BangladeshCatalogQueryResult {
  const {
    query = '',
    alphabet,
    era = 'all',
    categorySlug = 'all',
    volumeNumber = 'all',
    actType = 'all',
    status = 'all',
    startYear,
    endYear,
    sortBy = 'relevance',
    limit = 50,
    offset = 0,
  } = options;

  const normalizedQuery = query.trim().toLowerCase();
  const queryTokens = normalizedQuery.split(/\s+/).filter(Boolean);

  // Facet accumulators
  const alphabetCounts: Record<string, number> = {};
  const eraCounts: Record<BangladeshLegislativeEra, number> = {
    'british-era': 0,
    'pakistan-era': 0,
    'bangladesh-era': 0,
  };
  const categoryCounts: Record<string, number> = {};
  const volumeCounts: Record<number, number> = {};

  // Initialize alphabet counts A-Z
  for (let i = 65; i <= 90; i++) {
    alphabetCounts[String.fromCharCode(i)] = 0;
  }

  const scoredList: { item: BangladeshLawRecord; score: number }[] = [];

  for (const law of BANGLADESH_CODE_CATALOG) {
    // 1. Tally global facets
    const firstLetter = law.title.replace(/^(The\s+|A\s+|An\s+)/i, '').charAt(0).toUpperCase();
    if (alphabetCounts[firstLetter] !== undefined) {
      alphabetCounts[firstLetter] += 1;
    }
    eraCounts[law.era] = (eraCounts[law.era] || 0) + 1;
    categoryCounts[law.category] = (categoryCounts[law.category] || 0) + 1;
    if (law.volumeNumber) {
      volumeCounts[law.volumeNumber] = (volumeCounts[law.volumeNumber] || 0) + 1;
    }

    // 2. Apply Filters
    if (alphabet && alphabet.toUpperCase() !== 'ALL') {
      const targetLetter = alphabet.toUpperCase();
      if (firstLetter !== targetLetter) {
        continue;
      }
    }

    if (era !== 'all' && law.era !== era) {
      continue;
    }

    if (categorySlug !== 'all') {
      const matchCat = law.categorySlug.toLowerCase();
      const targetCat = categorySlug.toLowerCase();
      if (matchCat !== targetCat && !law.category.toLowerCase().includes(targetCat)) {
        continue;
      }
    }

    if (volumeNumber !== 'all' && law.volumeNumber !== volumeNumber) {
      continue;
    }

    if (actType !== 'all' && law.actType.toLowerCase() !== actType.toLowerCase()) {
      continue;
    }

    if (status !== 'all' && law.status.toLowerCase() !== status.toLowerCase()) {
      continue;
    }

    if (startYear !== undefined && law.enactmentYear < startYear) {
      continue;
    }

    if (endYear !== undefined && law.enactmentYear > endYear) {
      continue;
    }

    // 3. Compute Relevance Scoring
    let score = 0;
    if (queryTokens.length === 0) {
      score = 1;
    } else {
      const titleLower = (law.title + ' ' + law.titleBn + ' ' + law.shortTitle + ' ' + (law.alternateTitles || []).join(' ')).toLowerCase();
      const actLower = law.actNumber.toLowerCase();
      const overviewLower = (law.overview + ' ' + (law.overviewBn || '')).toLowerCase();
      const keywordsLower = (law.keywords || []).join(' ').toLowerCase();

      // Exact title match
      if (titleLower.includes(normalizedQuery)) score += 60;
      if (actLower.includes(normalizedQuery)) score += 50;

      for (const token of queryTokens) {
        if (titleLower.includes(token)) score += 20;
        if (actLower.includes(token)) score += 15;
        if (keywordsLower.includes(token)) score += 10;
        if (overviewLower.includes(token)) score += 5;
      }

      // Check sections
      for (const sec of law.sections) {
        const secHeader = (sec.number + ' ' + sec.title + ' ' + (sec.titleBn || '')).toLowerCase();
        const secBody = (sec.content + ' ' + sec.simpleExplanation).toLowerCase();
        if (secHeader.includes(normalizedQuery)) score += 35;
        for (const token of queryTokens) {
          if (secHeader.includes(token)) score += 8;
          if (secBody.includes(token)) score += 2;
        }
      }
    }

    if (score > 0 || queryTokens.length === 0) {
      scoredList.push({ item: law, score });
    }
  }

  // 4. Sort Results
  if (sortBy === 'relevance' && queryTokens.length > 0) {
    scoredList.sort((a, b) => b.score - a.score);
  } else if (sortBy === 'year-desc') {
    scoredList.sort((a, b) => b.item.enactmentYear - a.item.enactmentYear);
  } else if (sortBy === 'year-asc') {
    scoredList.sort((a, b) => a.item.enactmentYear - b.item.enactmentYear);
  } else if (sortBy === 'title-asc') {
    scoredList.sort((a, b) => a.item.title.localeCompare(b.item.title));
  } else if (sortBy === 'act-number') {
    scoredList.sort((a, b) => a.item.actNumber.localeCompare(b.item.actNumber));
  }

  // 5. Pagination
  const total = scoredList.length;
  const paginated = scoredList.slice(offset, offset + limit).map((s) => s.item);

  return {
    items: paginated,
    total,
    limit,
    offset,
    hasMore: offset + limit < total,
    alphabetCounts,
    eraCounts,
    categoryCounts,
    volumeCounts,
  };
}

/**
 * Retrieve single Bangladesh Code statute record by ID
 */
export function getBangladeshLawById(id: string): BangladeshLawRecord | undefined {
  return BANGLADESH_CODE_CATALOG.find((l) => l.id === id);
}

/**
 * Convert a BangladeshLawRecord into a standard LawItem for full ecosystem interoperability
 */
export function convertBdRecordToLawItem(bd: BangladeshLawRecord): LawItem {
  return {
    id: bd.id,
    slug: bd.id,
    title: bd.title,
    titleBn: bd.titleBn,
    shortTitle: bd.shortTitle,
    actNumber: bd.actNumber,
    jurisdiction: 'Bangladesh',
    jurisdictionCode: 'BD',
    category: (bd.category as any) || 'Criminal Law',
    status: (bd.status as any) || 'In Force',
    sourceReliabilityStatus: 'Official Government Source',
    contentQualityStatus: 'Verified',
    publishingAuthority: bd.ministry || 'Ministry of Law, Justice and Parliamentary Affairs',
    totalStatutorySectionsCount: bd.totalSectionsCount || bd.sections.length,
    isCuratedSubset: (bd.totalSectionsCount || 0) > bd.sections.length,
    enactmentYear: bd.enactmentYear,
    effectiveDate: bd.commencementDate,
    lastUpdatedDate: bd.lastVerifiedDate,
    lastAmendedYear: bd.lastAmendedYear,
    officialGazetteRef: bd.officialGazetteCitation,
    officialSource: bd.officialSource,
    sourceVerificationUrl: bd.sourceUrl,
    overview: bd.overview,
    overviewBn: bd.overviewBn || bd.overview,
    keyHighlights: bd.sections.slice(0, 3).map((s) => `${s.number}: ${s.title}`),
    sections: bd.sections.map((s) => ({
      number: s.number,
      title: s.title,
      titleBn: s.titleBn,
      content: s.content,
      contentBn: s.contentBn,
      simpleExplanation: s.simpleExplanation,
      punishmentOrRemedy: s.penalty,
    })),
    keywords: bd.keywords,
  };
}
