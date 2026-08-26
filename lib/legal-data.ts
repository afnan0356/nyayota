export interface LawSection {
  number: string;
  title: string;
  titleBn?: string;
  content: string;
  contentBn?: string;
  simpleExplanation: string;
  explainLike15?: string;
  punishmentOrRemedy?: string;
  keyConcepts?: string[];
}

export interface LawTimelineEvent {
  year: string;
  date?: string;
  title: string;
  description: string;
  status: 'enacted' | 'amended' | 'repealed' | 'upheld' | 'substituted' | 'active';
  versionLabel?: string;
}

export type SourceReliabilityStatus =
  | 'Official Government Source'
  | 'Official International Organization'
  | 'Official Treaty Source'
  | 'Educational Reference'
  | 'Archived Material'
  | 'Draft Material';

export type ContentQualityStatus =
  | 'Verified'
  | 'Pending Review'
  | 'Updated Recently'
  | 'Archived';

export interface LawItem {
  id: string;
  slug: string;
  title: string;
  titleBn: string;
  shortTitle: string;
  actNumber?: string;
  jurisdiction: 'Bangladesh' | 'International';
  jurisdictionCode: 'BD' | 'INT';
  category: 'Criminal Law' | 'Constitutional Law' | 'Human Rights' | 'Cyber & Digital' | 'Commercial & Contract' | 'Civil Procedure' | 'Family Law' | 'Environmental Law' | 'International Humanitarian' | 'Labor & Employment';
  status: 'Active' | 'Amended' | 'Repealed' | 'Draft' | 'In Force' | 'Active Treaty' | 'Customary Law';
  sourceReliabilityStatus?: SourceReliabilityStatus;
  contentQualityStatus?: ContentQualityStatus;
  publishingAuthority?: string;
  totalStatutorySectionsCount?: number;
  isCuratedSubset?: boolean;
  topics?: string[];
  enactmentYear: number;
  effectiveDate?: string;
  publicationDate?: string;
  lastUpdatedDate?: string;
  lastAmendedYear?: number;
  signatoriesCount?: number;
  officialGazetteRef?: string;
  officialSource?: string;
  sourceOrganization?: string;
  sourceVerificationUrl?: string;
  overview: string;
  overviewBn: string;
  simpleSummary?: string;
  explainLike15?: string;
  aiSummary?: {
    overview: string;
    keyConcepts: string[];
    importantPoints: string[];
    practicalTakeaway: string;
  };
  fullOfficialTextExcerpt?: string;
  keyHighlights: string[];
  sections: LawSection[];
  timeline?: LawTimelineEvent[];
  relatedLawIds?: string[];
  citations?: {
    standard?: string;
    academic?: string;
    bluebook?: string;
    apa?: string;
    mla?: string;
    chicago?: string;
  };
  keywords: string[];
}

export interface GlossaryTerm {
  term: string;
  termBn?: string;
  pronunciation?: string;
  category: string;
  definition: string;
  simpleExplanation: string;
  jurisdiction?: string;
  exampleUsage?: string;
  relatedLawIds?: string[];
}

export interface LegalPathwayStage {
  stageNumber: number;
  title: string;
  description: string;
  keyActions: string[];
  importantRights: string[];
  commonPitfalls: string[];
}

export interface EmergencyContactInfo {
  name: string;
  number: string;
  description: string;
}

export interface LegalOutcomePathway {
  id: string;
  title: string;
  titleBn: string;
  category: string;
  jurisdiction: string;
  estimatedTimeline: string;
  primaryLegislation: string;
  summary: string;
  stages: LegalPathwayStage[];
  emergencyContacts?: EmergencyContactInfo[];
}

export interface LegalCategoryInfo {
  id: string;
  slug: string;
  title: string;
  titleBn: string;
  description: string;
  descriptionBn: string;
  primaryJurisdiction: 'Bangladesh' | 'International' | 'Both';
  countLabel: string;
  iconName: string;
  href: string;
}

export const LEGAL_CATEGORIES_DATA: LegalCategoryInfo[] = [
  {
    id: 'criminal-law',
    slug: 'criminal-law',
    title: 'Criminal Law',
    titleBn: 'ফৌজদারি আইন',
    description: 'Substantive offenses, penalties, culpable homicide, theft, fraud, and police arrest standards.',
    descriptionBn: 'দণ্ডবিধি, অপরাধের সংজ্ঞা, শাস্তি, পরোয়ানা এবং ফৌজদারি বিচার ব্যবস্থা।',
    primaryJurisdiction: 'Both',
    countLabel: 'Key provisions with plain explanations',
    iconName: 'Shield',
    href: '/bangladesh-laws?category=Criminal+Law'
  },
  {
    id: 'constitutional-law',
    slug: 'constitutional-law',
    title: 'Constitutional Law',
    titleBn: 'সাংবিধানিক আইন',
    description: 'Supreme law of the state, Fundamental Rights, Article 102 High Court Writs, and separation of powers.',
    descriptionBn: 'মৌলিক অধিকার, রিট আবেদন, আইনের দৃষ্টিতে সমতা ও রাষ্ট্রীয় মূলনীতি।',
    primaryJurisdiction: 'Bangladesh',
    countLabel: 'Key fundamental rights & writ remedies',
    iconName: 'Scale',
    href: '/bangladesh-laws?category=Constitutional+Law'
  },
  {
    id: 'human-rights',
    slug: 'human-rights',
    title: 'Human Rights',
    titleBn: 'মানবাধিকার আইন',
    description: 'Universal declarations, civil and political covenants, anti-torture baselines, and freedom of speech.',
    descriptionBn: 'সার্বজনীন মানবাধিকার ঘোষণাপত্র (UDHR) ও নাগরিক অধিকার বিষয়ক চুক্তি।',
    primaryJurisdiction: 'International',
    countLabel: 'Core UN declarations & covenants',
    iconName: 'Globe',
    href: '/international-laws?category=Human+Rights'
  },
  {
    id: 'cyber-digital',
    slug: 'cyber-digital',
    title: 'Cyber & Digital Law',
    titleBn: 'সাইবার ও ডিজিটাল আইন',
    description: 'Critical information infrastructure, digital impersonation, hacking, data security, and online fraud.',
    descriptionBn: 'অনলাইন প্রতারণা, হ্যাকিং, ডিজিটাল নিরাপত্তা এবং তথ্যপ্রযুক্তি অপরাধ প্রতিরোধ।',
    primaryJurisdiction: 'Bangladesh',
    countLabel: 'Key cyber offenses & reporting standards',
    iconName: 'Sparkles',
    href: '/bangladesh-laws?category=Cyber+%26+Digital'
  },
  {
    id: 'labor-employment',
    slug: 'labor-employment',
    title: 'Labor & Employment',
    titleBn: 'শ্রম আইন',
    description: 'Workplace safety, maximum work hours, overtime compensation, maternity benefits, and trade unions.',
    descriptionBn: 'শ্রমিক কল্যাণ, কর্মঘণ্টা, মাতৃত্বকালীন ছুটি, ট্রেড ইউনিয়ন ও কারখানা নিরাপত্তা।',
    primaryJurisdiction: 'Bangladesh',
    countLabel: 'Core worker rights & leave benefits',
    iconName: 'Layers',
    href: '/bangladesh-laws?category=Labor+%26+Employment'
  },
  {
    id: 'commercial-contract',
    slug: 'commercial-contract',
    title: 'Commercial & Contract',
    titleBn: 'বাণিজ্যিক ও চুক্তি আইন',
    description: 'International sale of goods (CISG), ocean commerce, maritime economic zones (UNCLOS), and mercantile rules.',
    descriptionBn: 'আন্তর্জাতিক বাণিজ্যিক চুক্তি, সমুদ্র বাণিজ্য ও এক্সক্লুসিভ ইকোনমিক জোন।',
    primaryJurisdiction: 'Both',
    countLabel: 'Key trade rules & maritime treaties',
    iconName: 'Compass',
    href: '/international-laws?category=Commercial+%26+Contract'
  },
  {
    id: 'civil-procedure',
    slug: 'civil-procedure',
    title: 'Civil Procedure',
    titleBn: 'দেওয়ানি কার্যবিধি',
    description: 'Filing civil suits, plaints, injunctions, execution of decrees, appeals, and property disputes.',
    descriptionBn: 'দেওয়ানি মামলার আরজি, অস্থায়ী নিষেধাজ্ঞা, ডিক্রি জারি ও আপিল কার্যপদ্ধতি।',
    primaryJurisdiction: 'Bangladesh',
    countLabel: 'Key procedural steps & injunction rules',
    iconName: 'FileText',
    href: '/bangladesh-laws?category=Civil+Procedure'
  },
  {
    id: 'family-law',
    slug: 'family-law',
    title: 'Family & Personal Law',
    titleBn: 'পারিবারিক আইন',
    description: 'Marriage registration, dower, maintenance, dissolution of marriage, child custody, and inheritance.',
    descriptionBn: 'বিবাহ নিবন্ধন, দেনমোহর, ভরণপোষণ, তালাক এবং পারিবারিক আদালতের বিচার।',
    primaryJurisdiction: 'Bangladesh',
    countLabel: 'Key family court & custody guides',
    iconName: 'Users',
    href: '/bangladesh-laws?category=Family+Law'
  },
  {
    id: 'environmental-law',
    slug: 'environmental-law',
    title: 'Environmental Law',
    titleBn: 'পরিবেশ আইন',
    description: 'Pollution control, environmental clearance certificates, ecological critical areas, and Paris Climate Agreement.',
    descriptionBn: 'পরিবেশ দূষণ নিয়ন্ত্রণ, পরিবেশগত ছাড়পত্র ও প্যারিস জলবায়ু চুক্তি।',
    primaryJurisdiction: 'Both',
    countLabel: 'Key conservation statutes & accords',
    iconName: 'Leaf',
    href: '/international-laws?category=Environmental+Law'
  },
  {
    id: 'international-humanitarian',
    slug: 'international-humanitarian',
    title: 'International Humanitarian Law',
    titleBn: 'আন্তর্জাতিক মানবিক আইন',
    description: 'Geneva Conventions, protection of civilians, rules of armed conflict, prisoners of war, and war crimes accountability.',
    descriptionBn: 'জেনেভা কনভেনশন, বেসামরিক নাগরিক সুরক্ষা ও সশস্ত্র সংঘাতের নিয়মাবলী।',
    primaryJurisdiction: 'International',
    countLabel: '4 Geneva Accords & Protocols',
    iconName: 'Shield',
    href: '/international-laws?category=International+Humanitarian'
  }
];

export const LAWS_DATABASE: LawItem[] = [
  {
    id: 'bd-penal-code-1860',
    slug: 'penal-code-1860',
    title: 'The Penal Code, 1860',
    titleBn: 'দণ্ডবিধি, ১৮৬০',
    shortTitle: 'Penal Code 1860 (Act XLV of 1860)',
    actNumber: 'Act No. XLV of 1860',
    jurisdiction: 'Bangladesh',
    jurisdictionCode: 'BD',
    category: 'Criminal Law',
    status: 'In Force',
    enactmentYear: 1860,
    lastAmendedYear: 2023,
    totalStatutorySectionsCount: 511,
    isCuratedSubset: true,
    officialGazetteRef: 'Govt. of Bangladesh Legislative Archives Act XLV/1860',
    officialSource: 'Laws of Bangladesh (bdlaws.minlaw.gov.bd)',
    sourceOrganization: 'Legislative and Parliamentary Affairs Division, Ministry of Law, Justice and Parliamentary Affairs',
    sourceVerificationUrl: 'http://bdlaws.minlaw.gov.bd/act-11.html',
    lastUpdatedDate: 'January 2025',
    overview: 'The foundational substantive criminal statute of Bangladesh, defining offenses from murder, theft, and fraud to criminal conspiracy and bodily harm, along with their statutory penalties and general exceptions.',
    overviewBn: '১৮৬০ সালের দণ্ডবিধি হলো বাংলাদেশের প্রধান ফৌজদারি আইন যা বিভিন্ন অপরাধের সংজ্ঞা এবং সেগুলোর শাস্তির বিধান নির্ধারণ করে।',
    simpleSummary: 'The primary criminal code in Bangladesh that defines specific unlawful acts (such as theft, assault, fraud, or murder), sets statutory defenses (such as private defense), and determines the penalties judges can impose.',
    fullOfficialTextExcerpt: 'WHEREAS it is expedient to provide a general Penal Code for Bangladesh; It is enacted as follows: This Act shall be called the Penal Code, and shall take effect throughout Bangladesh. Every person shall be liable to punishment under this Code and not otherwise for every act or omission contrary to the provisions thereof, of which he shall be guilty within Bangladesh.',
    keyHighlights: [
      'Contains 511 codified sections covering general exceptions, state security, public order, bodily offenses, and property crimes.',
      'Establishes the fundamental legal doctrine that criminal liability requires both a guilty intention (Mens Rea) and a prohibited act (Actus Reus).',
      'Provides general statutory exceptions including self-defense (Sec. 96-106), acts done by children, and acts under genuine accident or duress.'
    ],
    sections: [
      {
        number: 'Section 34',
        title: 'Acts done by several persons in furtherance of common intention',
        titleBn: 'সাধারণ অভিপ্রায় বাস্তবায়নে একাধিক ব্যক্তি কর্তৃক কৃত কার্য',
        content: 'When a criminal act is done by several persons, in furtherance of the common intention of all, each of such persons is liable for that act in the same manner as if it were done by him alone.',
        contentBn: 'যখন একটি অপরাধমূলক কাজ একাধিক ব্যক্তি তাদের সবার সাধারণ উদ্দেশ্য বাস্তবায়নে সম্পাদন করে, তখন তাদের প্রত্যেকে এমনভাবে দায়ী হবে যেন কাজটি সে একাই করেছে।',
        simpleExplanation: 'If two or more people plan or join together to commit a crime, everyone involved shares full legal responsibility for the resulting offense even if only one person pulled a trigger or stole the money.',
        punishmentOrRemedy: 'Joint criminal liability equal to the primary offender.',
        keyConcepts: ['Common intention', 'Joint liability', 'Pre-arranged plan']
      },
      {
        number: 'Section 96',
        title: 'Things done in private defence',
        titleBn: 'ব্যক্তিগত আত্মরক্ষার্থে কৃত কাজ',
        content: 'Nothing is an offence which is done in the exercise of the right of private defence.',
        contentBn: 'ব্যক্তিগত আত্মরক্ষার অধিকার প্রয়োগের ক্ষেত্রে কৃত কোনো কাজ অপরাধ বলে গণ্য হবে না।',
        simpleExplanation: 'You have a legally recognized right to defend your own body, other people, or property against unlawful attacks, provided the force you use is proportional to the immediate threat.',
        punishmentOrRemedy: 'Complete statutory defense against criminal charges.',
        keyConcepts: ['Self defense', 'Proportional force', 'Immediate threat']
      },
      {
        number: 'Section 299',
        title: 'Culpable Homicide',
        titleBn: 'অপরাধজনক নরহত্যা',
        content: 'Whoever causes death by doing an act with the intention of causing death, or with the intention of causing such bodily injury as is likely to cause death, or with the knowledge that he is likely by such act to cause death, commits the offence of culpable homicide.',
        contentBn: 'যে ব্যক্তি মৃত্যু ঘটানোর উদ্দেশ্যে বা মৃত্যু ঘটার সম্ভাবনাযুক্ত আঘাত করার উদ্দেশ্যে অথবা মৃত্যু ঘটতে পারে জেনে কোনো কাজ করে মৃত্যু ঘটায়, সে অপরাধজনক নরহত্যা করে।',
        simpleExplanation: 'Causing someone\'s death with the intent or clear knowledge that your action was likely to be fatal.',
        punishmentOrRemedy: 'Imprisonment for life or up to 10 years and fine (Section 304).',
        keyConcepts: ['Intention', 'Knowledge of risk', 'Bodily harm']
      },
      {
        number: 'Section 300',
        title: 'Murder',
        titleBn: 'খুন',
        content: 'Except in the cases hereinafter excepted, culpable homicide is murder, if the act by which the death is caused is done with the intention of causing death, or with the knowledge that it is so imminently dangerous that it must in all probability cause death.',
        contentBn: 'অপরাধজনক নরহত্যা খুন হিসেবে গণ্য হবে যদি কাজটি মৃত্যু ঘটানোর নিশ্চিত উদ্দেশ্যে বা মারাত্মক ঝুঁকিপূর্ণভাবে করা হয়।',
        simpleExplanation: 'Intentional killing without valid legal justification, subject to strict statutory exceptions like grave and sudden provocation.',
        punishmentOrRemedy: 'Death penalty or imprisonment for life, and mandatory fine (Section 302).',
        keyConcepts: ['Premeditation', 'Capital offense', 'Non-bailable']
      },
      {
        number: 'Section 378',
        title: 'Theft',
        titleBn: 'চুরি',
        content: 'Whoever, intending to take dishonestly any movable property out of the possession of any person without that person\'s consent, moves that property in order to such taking, is said to commit theft.',
        contentBn: 'যে ব্যক্তি কোনো ব্যক্তির অনুমতি ছাড়া অসৎ উদ্দেশ্যে কোনো অস্থাবর সম্পত্তি স্থানান্তরিত করে, সে চুরি করেছে বলে গণ্য হয়।',
        simpleExplanation: 'Dishonestly moving someone else\'s physical belongings without their consent with the intention of keeping or depriving them of it.',
        punishmentOrRemedy: 'Imprisonment up to 3 years, or fine, or both (Section 379).',
        keyConcepts: ['Dishonest intention', 'Movable property', 'Lack of consent']
      },
      {
        number: 'Section 420',
        title: 'Cheating and dishonestly inducing delivery of property',
        titleBn: 'প্রতারণা এবং সম্পত্তি হস্তান্তরে অসদুপায় গ্রহণ',
        content: 'Whoever cheats and thereby dishonestly induces the person deceived to deliver any property to any person, or to make, alter or destroy the whole or any part of a valuable security, shall be punished with imprisonment of either description for a term which may extend to seven years, and shall also be liable to fine.',
        contentBn: 'যে ব্যক্তি প্রতারণার মাধ্যমে অপর ব্যক্তিকে কোনো সম্পত্তি হস্তান্তর করতে প্ররোচিত করে, সে অনধিক ৭ বছর পর্যন্ত কারাদণ্ডে এবং অর্থদণ্ডে দণ্ডিত হবে।',
        simpleExplanation: 'Deceiving someone through deliberate false promises or misleading representations to make them hand over money, land, or valuable assets.',
        punishmentOrRemedy: 'Imprisonment for up to 7 years and mandatory fine.',
        keyConcepts: ['Fraudulent inducement', 'Deception', 'Property transfer']
      },
      {
        number: 'Section 499 & 500',
        title: 'Defamation and Punishment for Defamation',
        titleBn: 'মানহানি এবং মানহানির শাস্তি',
        content: 'Whoever, by words either spoken or intended to be read, or by signs or by visible representations, makes or publishes any imputation concerning any person intending to harm, or knowing or having reason to believe that such imputation will harm, the reputation of such person, is said to defame that person.',
        contentBn: 'যে ব্যক্তি কারো সুনাম ক্ষুণ্ণ করার উদ্দেশ্যে মৌখিক, লিখিত বা কোনো দৃশ্যমান চিহ্নের মাধ্যমে অসত্য বা ক্ষতিকর তথ্য প্রচার করে, সে মানহানি করে।',
        simpleExplanation: 'Publishing or publicly making false statements that harm another person\'s personal, professional, or social reputation.',
        punishmentOrRemedy: 'Simple imprisonment up to 2 years, or fine, or both (Section 500).',
        keyConcepts: ['Reputation damage', 'Publication', 'Exceptions for public truth']
      },
      {
        number: 'Section 506',
        title: 'Punishment for criminal intimidation',
        titleBn: 'অপরাধমূলক ভীতি প্রদর্শনের শাস্তি',
        content: 'Whoever commits the offence of criminal intimidation shall be punished with imprisonment of either description for a term which may extend to two years, or with fine, or with both; and if the threat be to cause death or grievous hurt, or destruction of property by fire, with imprisonment up to seven years.',
        contentBn: 'কাউকে হত্যা, গুরুতর আঘাত বা সম্পত্তির ক্ষতি করার হুমকি প্রদর্শন করলে অনধিক ৭ বছর পর্যন্ত কারাদণ্ড হতে পারে।',
        simpleExplanation: 'Threatening someone with physical injury, property destruction, or ruin to force them to do something they are not legally bound to do.',
        punishmentOrRemedy: 'Imprisonment up to 2 years, or up to 7 years for death/grievous hurt threats.',
        keyConcepts: ['Criminal threat', 'Coercion', 'Personal safety']
      }
    ],
    timeline: [
      { year: '1860', title: 'Original Enactment', description: 'Drafted by Lord Macaulay and enacted under British India as Act XLV of 1860.', status: 'enacted' },
      { year: '1972', title: 'Adoption in Independent Bangladesh', description: 'Adopted through the Laws Continuance Enforcement Order 1972 (Presidential Order No. 48 of 1972).', status: 'enacted' },
      { year: '2004', title: 'Speedy Trial Tribunal Alignments', description: 'Cross-referenced with special procedural jurisdictions for swift adjudication.', status: 'amended' },
      { year: '2023', title: 'Fines and Penalties Rationalization', description: 'Updated archaic colonial monetary fine rates across various economic sections.', status: 'amended' }
    ],
    relatedLawIds: ['bd-crpc-1898', 'bd-cyber-security-2023', 'bd-evidence-act-1872'],
    citations: {
      standard: 'The Penal Code, 1860 (Act No. XLV of 1860)',
      academic: 'Penal Code 1860, 1860 Act XLV, Legislative & Parliamentary Affairs Division, BD.',
      bluebook: 'Penal Code, Act No. XLV of 1860 (Bangl.).'
    },
    keywords: ['criminal law', 'murder', 'theft', 'fraud', 'punishment', 'penal code', 'dondobidhi', 'crimes', 'imprisonment', 'assault', 'self defense', 'section 420', 'section 302']
  },
  {
    id: 'bd-constitution-1972',
    slug: 'constitution-of-bangladesh-1972',
    title: 'The Constitution of the People\'s Republic of Bangladesh',
    titleBn: 'গণপ্রজাতন্ত্রী বাংলাদেশের সংবিধান',
    shortTitle: 'Constitution of Bangladesh (1972)',
    actNumber: 'Supreme Law of the Republic',
    jurisdiction: 'Bangladesh',
    jurisdictionCode: 'BD',
    category: 'Constitutional Law',
    status: 'In Force',
    enactmentYear: 1972,
    lastAmendedYear: 2018,
    totalStatutorySectionsCount: 153,
    isCuratedSubset: true,
    officialGazetteRef: 'Bangladesh Gazette Extraordinary, Dec 14, 1972',
    officialSource: 'Laws of Bangladesh (bdlaws.minlaw.gov.bd)',
    sourceOrganization: 'Parliament of Bangladesh / Ministry of Law, Justice and Parliamentary Affairs',
    sourceVerificationUrl: 'http://bdlaws.minlaw.gov.bd/act-367.html',
    lastUpdatedDate: 'January 2025',
    overview: 'The Supreme Law of Bangladesh establishing the democratic republic, fundamental principles of state policy, fundamental rights enforceable by the High Court Division under Article 102, and the balance of powers among legislature, executive, and judiciary.',
    overviewBn: 'বাংলাদেশের সর্বোচ্চ আইন যা প্রজাতন্ত্রের শাসনতন্ত্র, নাগরিকদের মৌলিক অধিকার এবং রাষ্ট্রের তিনটি অঙ্গের ক্ষমতা ও দায়িত্ব নির্ধারণ করে।',
    simpleSummary: 'The highest legal authority in Bangladesh. It guarantees basic fundamental human rights (like free speech, equality, and protection from unlawful arrest) and defines how the country\'s government, parliament, and courts operate.',
    fullOfficialTextExcerpt: 'We, the people of Bangladesh, having proclaimed our independence on the 26th day of March, 1971 and through a historic struggle for national liberation, established the independent, sovereign People\'s Republic of Bangladesh; Pledging that the high ideals of nationalism, socialism, democracy and secularism shall be the fundamental principles of the Constitution...',
    keyHighlights: [
      'Part III establishes judicially enforceable Fundamental Rights including equality before law (Art. 27), right to life and liberty (Art. 31/32), and freedom of expression (Art. 39).',
      'Article 7 establishes constitutional supremacy: any ordinary law that conflicts with this Constitution is void to the extent of inconsistency.',
      'Article 102 empowers the High Court Division to issue constitutional Writs (Habeas Corpus, Mandamus, Certiorari, Prohibition, Quo Warranto) to enforce rights.'
    ],
    sections: [
      {
        number: 'Article 27',
        title: 'Equality before Law',
        titleBn: 'আইনের দৃষ্টিতে সমতা',
        content: 'All citizens are equal before law and are entitled to equal protection of law.',
        contentBn: 'সকল নাগরিক আইনের দৃষ্টিতে সমান এবং আইনের সমান আশ্রয় লাভের অধিকারী।',
        simpleExplanation: 'No individual or official is above the law. Every person is entitled to the exact same fair legal treatment regardless of their background, financial standing, or social status.',
        punishmentOrRemedy: 'Judicial review and invalidation of discriminatory state actions under Article 102.',
        keyConcepts: ['Non-discrimination', 'Rule of Law', 'Equal protection']
      },
      {
        number: 'Article 31',
        title: 'Right to protection of law',
        titleBn: 'আইনের আশ্রয়লাভের অধিকার',
        content: 'To enjoy the protection of the law, and to be treated in accordance with law, and only in accordance with law, is the inalienable right of every citizen, wherever he may be, and of every other person for the time being within Bangladesh, and in particular no action detrimental to the life, liberty, body, reputation or property of any person shall be taken except in accordance with law.',
        contentBn: 'আইনের আশ্রয়লাভ এবং আইনানুযায়ী আচরণ লাভ যে কোনো নাগরিকের অবিচ্ছেদ্য অধিকার।',
        simpleExplanation: 'Government bodies, police, and public authorities cannot deprive you of your liberty, property, or reputation without following legitimate, enacted law.',
        punishmentOrRemedy: 'Direct constitutional writ petition in the Supreme Court.',
        keyConcepts: ['Due process', 'Inalienable rights', 'Protection from arbitrary power']
      },
      {
        number: 'Article 32',
        title: 'Protection of right to life and personal liberty',
        titleBn: 'জীবন ও ব্যক্তি-স্বাধীনতার অধিকার রক্ষণ',
        content: 'No person shall be deprived of life or personal liberty save in accordance with law.',
        contentBn: 'আইনানুযায়ী ব্যতীত কোনো ব্যক্তিকে জীবন বা ব্যক্তি-স্বাধীনতা হতে বঞ্চিত করা যাবে না।',
        simpleExplanation: 'Your life, bodily integrity, and personal freedom are protected. The state cannot detain or harm you unless permitted by lawful due process.',
        punishmentOrRemedy: 'Habeas Corpus writ under Article 102 to secure release of illegally detained persons.',
        keyConcepts: ['Right to life', 'Personal liberty', 'Freedom from unlawful detention']
      },
      {
        number: 'Article 33',
        title: 'Safeguards as to arrest and detention',
        titleBn: 'গ্রেপ্তার ও আটক সম্পর্কিত রক্ষাকবচ',
        content: 'No person who is arrested shall be detained in custody without being informed, as soon as may be, of the grounds for such arrest, nor shall he be denied the right to consult and be defended by a legal practitioner of his choice. Every person who is arrested and detained in custody shall be produced before the nearest magistrate within a period of twenty-four hours of such arrest.',
        contentBn: 'গ্রেপ্তারকৃত ব্যক্তিকে দ্রুত গ্রেপ্তারের কারণ জানাতে হবে, আইনজীবীর সাথে পরামর্শের সুযোগ দিতে হবে এবং ২৪ ঘণ্টার মধ্যে নিকটস্থ ম্যাজিস্ট্রেটের সামনে হাজির করতে হবে।',
        simpleExplanation: 'Police must immediately explain why you were arrested, allow you to consult a lawyer, and present you before a judge within 24 hours of custody.',
        punishmentOrRemedy: 'Unlawful detention after 24 hours without court order is illegal and punishable.',
        keyConcepts: ['24-hour magistrate rule', 'Right to legal counsel', 'Grounds of arrest']
      },
      {
        number: 'Article 39',
        title: 'Freedom of thought, conscience and of speech',
        titleBn: 'চিন্তা ও বিবেকের স্বাধীনতা এবং বাক-স্বাধীনতা',
        content: '(1) Freedom of thought and conscience is guaranteed. (2) Subject to any reasonable restrictions imposed by law in the interests of the security of the State, friendly relations with foreign states, public order, decency or morality, or in relation to contempt of court, defamation or incitement to an offence - (a) the right of every citizen to freedom of speech and expression; and (b) the freedom of the press, are guaranteed.',
        contentBn: 'চিন্তা ও বিবেকের স্বাধীনতা এবং আইনের যুক্তিসঙ্গত বাধানিষেধ সাপেক্ষে বাক-স্বাধীনতা ও সংবাদক্ষেত্রের স্বাধীনতা নিশ্চিত করা হলো।',
        simpleExplanation: 'Guarantees freedom of opinion, artistic expression, and independent press reporting, subject only to reasonable restrictions on incitement or national security.',
        punishmentOrRemedy: 'Constitutional invalidation of arbitrary censorship orders.',
        keyConcepts: ['Freedom of expression', 'Press freedom', 'Reasonable restrictions']
      },
      {
        number: 'Article 102',
        title: 'Powers of High Court Division to issue certain orders and directions (Writs)',
        titleBn: 'রিট জারির বিষয়ে হাইকোর্ট বিভাগের ক্ষমতা',
        content: 'The High Court Division may, if satisfied that no other equally efficacious remedy is provided by law, on the application of any person aggrieved, make an order directing a person performing any functions in connection with the affairs of the Republic to refrain from doing that which he is not permitted by law to do, or to do that which he is required by law to do, or declare that any act done has been done without lawful authority.',
        contentBn: 'মৌলিক অধিকার বলবৎকরণ ও আইনবহির্ভূত সরকারি কর্মকাণ্ডের বিরুদ্ধে রিট আদেশ প্রদানের মাধ্যমে প্রতিকার দেওয়ার ক্ষমতা।',
        simpleExplanation: 'Allows any citizen to petition the High Court to halt unlawful government actions, free illegally detained persons, or force public officials to perform their legal duty.',
        punishmentOrRemedy: 'Issuance of constitutional Writs: Mandamus, Certiorari, Habeas Corpus, Prohibition, Quo Warranto.',
        keyConcepts: ['Writ jurisdiction', 'Judicial review', 'Enforcement of fundamental rights']
      }
    ],
    timeline: [
      { year: '1972', title: 'Adoption and Commencement', description: 'Passed on 4 November 1972 and took effect on 16 December 1972.', status: 'enacted' },
      { year: '1979', title: '5th Amendment (Historical)', description: 'Later declared illegal and unconstitutional by the Supreme Court in 2010.', status: 'amended' },
      { year: '2011', title: '15th Amendment', description: 'Restored key original principles of democracy and rule of law.', status: 'amended' },
      { year: '2018', title: '17th Amendment', description: 'Extended women\'s reserved seats in Parliament for 25 years.', status: 'amended' }
    ],
    relatedLawIds: ['bd-crpc-1898', 'bd-penal-code-1860', 'int-udhr-1948', 'int-iccpr-1966'],
    citations: {
      standard: 'The Constitution of the People\'s Republic of Bangladesh (1972)',
      academic: 'Constitution of Bangladesh, Ministry of Law, Justice and Parliamentary Affairs (1972).',
      bluebook: 'Bangl. Const. art. 27.'
    },
    keywords: ['constitution', 'fundamental rights', 'article 102', 'writ', 'freedom of speech', 'equality', 'supreme court', 'shongbidhan', 'due process', 'article 32', 'article 33', 'habeas corpus']
  },
  {
    id: 'bd-crpc-1898',
    slug: 'code-of-criminal-procedure-1898',
    title: 'The Code of Criminal Procedure, 1898',
    titleBn: 'ফৌজদারি কার্যবিধি, ১৮৯৮',
    shortTitle: 'CrPC 1898 (Act V of 1898)',
    actNumber: 'Act No. V of 1898',
    jurisdiction: 'Bangladesh',
    jurisdictionCode: 'BD',
    category: 'Criminal Law',
    status: 'In Force',
    enactmentYear: 1898,
    lastAmendedYear: 2021,
    totalStatutorySectionsCount: 565,
    isCuratedSubset: true,
    officialGazetteRef: 'Legislative Division Archive Act V of 1898',
    officialSource: 'Laws of Bangladesh (bdlaws.minlaw.gov.bd)',
    sourceOrganization: 'Legislative and Parliamentary Affairs Division, Ministry of Law, Justice and Parliamentary Affairs',
    sourceVerificationUrl: 'http://bdlaws.minlaw.gov.bd/act-75.html',
    lastUpdatedDate: 'January 2025',
    overview: 'The definitive procedural statute regulating criminal investigations, arrest protocols, search warrants, bail hearings, trial court hierarchies, and judicial appeals across Bangladesh.',
    overviewBn: 'ফৌজদারি অপরাধের তদন্ত, গ্রেপ্তার, জামিন, আদালতের বিচার পদ্ধতি এবং আপিল সংক্রান্ত সামগ্রিক নিয়মাবলি।',
    simpleSummary: 'The procedural rulebook for police investigations and criminal court trials. It defines how arrests must be carried out, how bail applications are decided, and how suspect rights are safeguarded during interrogation.',
    fullOfficialTextExcerpt: 'An Act to consolidate and amend the law relating to the Criminal Procedure. Whereas it is expedient to consolidate and amend the law relating to Criminal Procedure; It is hereby enacted as follows: This Act may be called the Code of Criminal Procedure, 1898; and it shall come into force on the first day of July, 1898.',
    keyHighlights: [
      'Classifies offenses into Cognizable (police can arrest without a warrant) and Non-cognizable (warrant required).',
      'Governs Section 54 warrantless arrest powers, subject to mandatory protective guidelines established in BLAST v. Bangladesh.',
      'Regulates remand procedures under Section 167 and sets rules for regular, interim, and anticipatory bail under Sections 497 and 498.'
    ],
    sections: [
      {
        number: 'Section 54',
        title: 'When police may arrest without warrant',
        titleBn: 'পরোয়ানা ছাড়া পুলিশ কখন গ্রেপ্তার করতে পারে',
        content: 'Any police officer may, without an order from a Magistrate and without a warrant, arrest any person who has been concerned in any cognizable offence, or against whom a reasonable complaint has been made, or credible information has been received, or a reasonable suspicion exists.',
        contentBn: 'আমলযোগ্য অপরাধে জড়িত থাকার যুক্তিসঙ্গত সন্দেহ বা বিশ্বাসযোগ্য তথ্যের ভিত্তিতে পুলিশ ম্যাজিস্ট্রেট আদেশ ব্যতিরেকে গ্রেপ্তার করতে পারে।',
        simpleExplanation: 'Permits police to arrest suspects for serious crimes without an advance warrant, provided they have credible evidence or a formal complaint and follow statutory guidelines.',
        punishmentOrRemedy: 'Safeguards against arbitrary detention under Section 167 and BLAST v. Bangladesh judgment.',
        keyConcepts: ['Cognizable offense', 'Reasonable suspicion', 'Arrest guidelines']
      },
      {
        number: 'Section 61',
        title: 'Person arrested not to be detained more than twenty-four hours',
        titleBn: 'গ্রেপ্তারকৃত ব্যক্তিকে চব্বিশ ঘণ্টার বেশি আটক না রাখা',
        content: 'No police officer shall detain in custody a person arrested without warrant for a longer period than under all the circumstances of the case is reasonable, and such period shall not, in the absence of a special order of a Magistrate under section 167, exceed twenty-four hours exclusive of the time necessary for the journey from the place of arrest to the Magistrate\'s Court.',
        contentBn: 'ম্যাজিস্ট্রেটের বিশেষ আদেশ ছাড়া কোনো ব্যক্তিকে গ্রেপ্তার করার পর যাতায়াতের সময় বাদে সর্বোচ্চ ২৪ ঘণ্টার বেশি পুলিশ হেফাজতে রাখা যাবে না।',
        simpleExplanation: 'Police are strictly forbidden from holding anyone in custody for more than 24 hours without taking them to court and getting a magistrate\'s permission.',
        punishmentOrRemedy: 'Detention beyond 24 hours is illegal confinement actionable by law.',
        keyConcepts: ['24-hour limit', 'Magistrate oversight', 'Anti-arbitrary detention']
      },
      {
        number: 'Section 154',
        title: 'Information in cognizable cases (F.I.R.)',
        titleBn: 'আমলযোগ্য মামলার এজাহার বা এফআইআর (FIR)',
        content: 'Every information relating to the commission of a cognizable offence, if given orally to an officer in charge of a police station, shall be reduced to writing by him or under his direction, and be read over to the informant; and every such information, whether given in writing or reduced to writing as aforesaid, shall be signed by the person giving it.',
        contentBn: 'আমলযোগ্য অপরাধের তথ্য থানায় মৌখিক বা লিখিতভাবে প্রদান করা হলে পুলিশ তা নথিভুক্ত করে এজাহার হিসেবে গণ্য করবে এবং বাদীর স্বাক্ষর গ্রহণ করবে।',
        simpleExplanation: 'The legal procedure for filing a formal First Information Report (FIR) at a police station when a serious crime has occurred.',
        punishmentOrRemedy: 'Mandatory registration by the officer in charge of the police station.',
        keyConcepts: ['FIR', 'Cognizable offense', 'Investigation trigger']
      },
      {
        number: 'Section 155',
        title: 'Information in non-cognizable cases (General Diary / G.D.)',
        titleBn: 'অ-আমলযোগ্য ঘটনার তথ্য এবং সাধারণ ডায়েরি (GD)',
        content: 'When information is given to an officer in charge of a police station of the commission within the limits of such station of a non-cognizable offence, he shall enter in a book to be kept as the Government may prescribe the substance of such information and refer the informant to the Magistrate. No police officer shall investigate a non-cognizable case without the order of a Magistrate.',
        contentBn: 'অ-আমলযোগ্য অপরাধের ক্ষেত্রে পুলিশ তথ্যটি সাধারণ ডায়েরিতে (GD) লিপিবদ্ধ করবে এবং ম্যাজিস্ট্রেটের অনুমতি ছাড়া তদন্ত করতে পারবে না।',
        simpleExplanation: 'Used for logging lost documents, minor threats, or non-cognizable issues into the police station General Diary (GD).',
        punishmentOrRemedy: 'Formal official record logged in police GD register.',
        keyConcepts: ['General Diary', 'GD Entry', 'Non-cognizable offense']
      },
      {
        number: 'Section 167',
        title: 'Procedure when investigation cannot be completed in twenty-four hours (Remand)',
        titleBn: 'তদন্ত ২৪ ঘণ্টায় শেষ না হলে করণীয় ও রিমান্ড বিধান',
        content: 'Whenever any person is arrested and detained in custody, and it appears that the investigation cannot be completed within the period of twenty-four hours, the officer in charge shall forward the accused to the nearest Magistrate. The Magistrate may authorize the detention of the accused in such custody as such Magistrate thinks fit, for a term not exceeding fifteen days in the whole.',
        contentBn: 'তদন্ত শেষ না হলে আসামিকে ম্যাজিস্ট্রেটের নিকট হাজির করতে হবে এবং আদালত সর্বোচ্চ ১৫ দিন পর্যন্ত রিমান্ড বা হেফাজতে রাখার অনুমতি দিতে পারে।',
        simpleExplanation: 'Governs how a magistrate can authorize sending an accused person to police questioning (remand) or jail custody, strictly capped at a 15-day maximum.',
        punishmentOrRemedy: 'High Court guidelines require documented justification and presence of legal counsel.',
        keyConcepts: ['Police remand', 'Judicial custody', '15-day limit']
      },
      {
        number: 'Section 497',
        title: 'When bail may be taken in case of non-bailable offence',
        titleBn: 'অজামিনযোগ্য অপরাধে কখন জামিন দেওয়া যাবে',
        content: 'When any person accused of any non-bailable offence is arrested or detained without warrant, he may be released on bail, but he shall not be so released if there appear reasonable grounds for believing that he has been guilty of an offence punishable with death or imprisonment for life.',
        contentBn: 'অজামিনযোগ্য অপরাধের ক্ষেত্রে আদালতের বিবেচনাধীন শর্তে জামিন মঞ্জুর করার নিয়মাবলি।',
        simpleExplanation: 'Provides rules for when judges can release a suspect on bail before their trial concludes, considering factors like age, health, and evidence strength.',
        punishmentOrRemedy: 'Bail bond execution and conditional release.',
        keyConcepts: ['Discretionary bail', 'Bail bond', 'Presumption of innocence']
      },
      {
        number: 'Section 498',
        title: 'Power to direct admission to bail or reduction of bail (Anticipatory Bail)',
        titleBn: 'জামিন মঞ্জুর বা জামিনের শর্ত শিথিলের বিষয়ে হাইকোর্ট ও দায়রা আদালতের ক্ষমতা',
        content: 'The amount of every bond executed under this Chapter shall be fixed with due regard to the circumstances of the case, and shall not be excessive; and the High Court Division or Court of Session may, in any case, whether there be an appeal on conviction or not, direct that any person be admitted to bail.',
        contentBn: 'হাইকোর্ট বিভাগ বা দায়রা জজ আদালত যেকোনো পরিস্থিতিতে জামিন মঞ্জুর বা আগাম জামিন (Anticipatory Bail) প্রদান করতে পারে।',
        simpleExplanation: 'Empowers higher courts to grant anticipatory bail to individuals who have genuine reason to fear unlawful arrest on politically motivated or false charges.',
        punishmentOrRemedy: 'Protection from arrest prior to surrender in trial court.',
        keyConcepts: ['Anticipatory bail', 'High Court discretion', 'Protection from arrest']
      }
    ],
    timeline: [
      { year: '1898', title: 'Original Promulgation', description: 'Enacted to standardize criminal administration across South Asia.', status: 'enacted' },
      { year: '2007', title: 'Separation of Judiciary Ordinance', description: 'Formally separated Judicial Magistrates from Executive Magistrates in compliance with the historic Masdar Hossain judgment.', status: 'amended' },
      { year: '2016', title: 'BLAST v. Bangladesh Appellate Division Ruling', description: 'Supreme Court laid down 15 mandatory directives to prevent abuse of Section 54 and Section 167 remand powers.', status: 'upheld' }
    ],
    relatedLawIds: ['bd-penal-code-1860', 'bd-constitution-1972', 'bd-evidence-act-1872'],
    citations: {
      standard: 'Code of Criminal Procedure, 1898 (Act V of 1898)',
      academic: 'CrPC 1898, Act No. V of 1898, Bangladesh Government Press.',
      bluebook: 'Code Crim. Proc., Act No. V of 1898 (Bangl.).'
    },
    keywords: ['crpc', 'criminal procedure', 'bail', 'arrest', 'section 54', 'police powers', 'fir', 'general diary', 'magistrate', 'remand', 'anticipatory bail', 'section 167', 'section 497']
  },
  {
    id: 'bd-cyber-security-2023',
    slug: 'cyber-security-act-2023',
    title: 'Cyber Security Act, 2023',
    titleBn: 'সাইবার নিরাপত্তা আইন, ২০২৩',
    shortTitle: 'Cyber Security Act 2023 (Act XXVII of 2023)',
    actNumber: 'Act No. XXVII of 2023',
    jurisdiction: 'Bangladesh',
    jurisdictionCode: 'BD',
    category: 'Cyber & Digital',
    status: 'In Force',
    enactmentYear: 2023,
    totalStatutorySectionsCount: 60,
    isCuratedSubset: true,
    officialGazetteRef: 'Bangladesh Gazette Notification Sept 18, 2023',
    overview: 'Governs national cyber infrastructure protection, hacking, digital identity theft, digital fraud, cyber terrorism, and online safety standards replacing the previous Digital Security Act 2018.',
    overviewBn: 'সাইবার অবকাঠামো সুরক্ষা, হ্যাকিং, ডিজিটাল জালিয়াতি এবং অনলাইন অপরাধ প্রতিরোধের আইন।',
    simpleSummary: 'The modern digital law in Bangladesh addressing internet crimes, computer hacking, identity theft, unauthorized data access, and online financial scams.',
    fullOfficialTextExcerpt: 'An Act to provide for the security of cyberspace, ensure integrity of critical information infrastructure, and suppress offenses committed through digital devices and computer systems...',
    keyHighlights: [
      'Provides penalties for unauthorized intrusion into Critical Information Infrastructure (CII).',
      'Converted several previously non-bailable defamation offenses into bailable and fine-based sanctions.',
      'Defines procedural guidelines for digital forensics and cyber tribunal investigations.'
    ],
    sections: [
      {
        number: 'Section 17',
        title: 'Offense relating to Critical Information Infrastructure (CII)',
        titleBn: 'গুরুত্বপূর্ণ তথ্য পরিকাঠামো সম্পর্কিত অপরাধ',
        content: 'If any person intentionally or knowingly causes damage or accesses Critical Information Infrastructure without authorization, they commit an offense.',
        contentBn: 'অনুমোদনহীনভাবে জাতীয় গুরুত্বপূর্ণ তথ্য পরিকাঠামোয় প্রবেশ বা ক্ষতিসাধন শাস্তিযোগ্য অপরাধ।',
        simpleExplanation: 'Protecting vital state databases, power grids, and banking backends from cyber attacks.',
        punishmentOrRemedy: 'Imprisonment up to 7 years or fine up to BDT 25 Lakh.',
        keyConcepts: ['Critical infrastructure', 'Cyber defense', 'Unauthorized access']
      },
      {
        number: 'Section 24',
        title: 'Offense relating to Identity Fraud and Digital Impersonation',
        titleBn: 'পরিচয় প্রতারণা এবং ডিজিটাল ছদ্মবেশ ধারণ',
        content: 'Whoever intentionally uses another person\'s digital identity, electronic signature, or login credentials without authorization to defraud or harass shall be punished.',
        contentBn: 'কারো অনুমতি ছাড়া তার ডিজিটাল পরিচিতি বা পাসওয়ার্ড অপব্যবহার করে জালিয়াতি বা হয়রানি করা নিষিদ্ধ।',
        simpleExplanation: 'Phishing, impersonating someone online, or stealing their credentials to steal or cause harm.',
        punishmentOrRemedy: 'Imprisonment up to 5 years or fine up to BDT 5 Lakh, or both.',
        keyConcepts: ['Identity theft', 'Phishing', 'Credential theft']
      }
    ],
    timeline: [
      { year: '2006', title: 'ICT Act 2006', description: 'Initial digital legal framework in Bangladesh.', status: 'enacted' },
      { year: '2018', title: 'Digital Security Act 2018', description: 'Enacted to combat cyber crime, later criticized for broad application.', status: 'repealed' },
      { year: '2023', title: 'Cyber Security Act 2023 Enacted', description: 'Passed by Parliament revising fine structures and bailable provisions.', status: 'enacted' }
    ],
    relatedLawIds: ['bd-penal-code-1860', 'bd-constitution-1972'],
    citations: {
      standard: 'Cyber Security Act, 2023 (Act No. XXVII of 2023)',
      academic: 'Cyber Security Act 2023, Legislative Division, Ministry of Law (BD).',
      bluebook: 'Cyber Security Act, Act No. XXVII of 2023 (Bangl.).'
    },
    keywords: ['cyber law', 'digital security', 'hacking', 'identity theft', 'online fraud', 'csa 2023', 'dsa', 'data protection', 'phishing']
  },
  {
    id: 'bd-labor-act-2006',
    slug: 'bangladesh-labour-act-2006',
    title: 'The Bangladesh Labour Act, 2006',
    titleBn: 'বাংলাদেশ শ্রম আইন, ২০০৬',
    shortTitle: 'Labour Act 2006 (Act XLII of 2006)',
    actNumber: 'Act No. XLII of 2006',
    jurisdiction: 'Bangladesh',
    jurisdictionCode: 'BD',
    category: 'Labor & Employment',
    status: 'In Force',
    enactmentYear: 2006,
    lastAmendedYear: 2018,
    totalStatutorySectionsCount: 353,
    isCuratedSubset: true,
    officialGazetteRef: 'Bangladesh Gazette Extraordinary, Oct 11, 2006',
    overview: 'Comprehensive codification consolidating 25 disparate labor laws covering working conditions, maximum working hours, overtime compensation, maternity benefits, workplace safety, trade unions, and labor courts.',
    overviewBn: 'শ্রমিকদের কর্মঘণ্টা, মজুরি, মাতৃত্বকালীন সুবিধা, কর্মপরিবেশের নিরাপত্তা এবং ট্রেড ইউনিয়ন সংক্রান্ত সমন্বিত আইন।',
    simpleSummary: 'Protects workers and employees across industries in Bangladesh by setting limits on working hours, guaranteeing overtime pay, maternity leaves, and establishing safety standards.',
    fullOfficialTextExcerpt: 'An Act to consolidate and amend the laws relating to employment of workers, relations between workers and employers, determination of minimum rates of wages, payment of wages, compensation for injuries to workers in the course of their employment, formation of trade unions, raise and settlement of industrial disputes...',
    keyHighlights: [
      'Guarantees 16 weeks of paid maternity benefit for female workers.',
      'Caps standard working hours at 8 hours per day / 48 hours per week with double rate overtime pay.',
      'Mandates establishment of Safety Committees and workplace compensation for accidental injuries.'
    ],
    sections: [
      {
        number: 'Section 46',
        title: 'Payment of maternity benefit',
        titleBn: 'মাতৃত্বকালীন সুবিধার অর্থ প্রদান',
        content: 'Every woman employed in an establishment shall be entitled to, and her employer shall be liable for, the payment of maternity benefit at the rate of her average daily wages for a period of eight weeks preceding and eight weeks immediately following the date of her delivery.',
        contentBn: 'প্রত্যেক নারী শ্রমিক প্রসবের পূর্বে ৮ সপ্তাহ এবং প্রসবের পর ৮ সপ্তাহ মোট ১৬ সপ্তাহের জন্য গড় মজুরিতে বেতনসহ মাতৃত্বকালীন ছুটি পাবেন।',
        simpleExplanation: 'Guarantees 16 weeks of full paid leave for expecting mothers in formal workplaces.',
        punishmentOrRemedy: 'Labor Court order and employer fines for refusal.',
        keyConcepts: ['Maternity rights', 'Worker welfare', 'Equal opportunity']
      }
    ],
    timeline: [
      { year: '2006', title: 'Codification', description: 'Consolidated archaic colonial regulations into one modern statute.', status: 'enacted' },
      { year: '2013', title: 'Post-Rana Plaza Safety Amendments', description: 'Major workplace safety, inspection, and union formation updates.', status: 'amended' },
      { year: '2018', title: 'Labour (Amendment) Act 2018', description: 'Lowered worker threshold required for registering trade unions.', status: 'amended' }
    ],
    relatedLawIds: ['bd-constitution-1972', 'bd-penal-code-1860'],
    citations: {
      standard: 'The Bangladesh Labour Act, 2006 (Act No. XLII of 2006)',
      academic: 'Bangladesh Labour Act 2006, Ministry of Labour and Employment, Dhaka.',
      bluebook: 'Bangl. Labour Act, Act No. XLII of 2006.'
    },
    keywords: ['labor law', 'worker rights', 'maternity benefit', 'overtime', 'trade union', 'rmg', 'factory safety', 'shrom ain']
  },
  {
    id: 'int-udhr-1948',
    slug: 'universal-declaration-of-human-rights-1948',
    title: 'Universal Declaration of Human Rights (UDHR)',
    titleBn: 'মানবাধিকারের সার্বজনীন ঘোষণাপত্র (১৯৪৮)',
    shortTitle: 'UDHR (UNGA Res 217 A)',
    jurisdiction: 'International',
    jurisdictionCode: 'INT',
    category: 'Human Rights',
    status: 'Customary Law',
    enactmentYear: 1948,
    totalStatutorySectionsCount: 30,
    isCuratedSubset: true,
    signatoriesCount: 193,
    overview: 'Adopted by the United Nations General Assembly in Paris on 10 December 1948, the UDHR represents the foundational milestone document in the history of human rights, setting out 30 universal articles protecting every human being everywhere.',
    overviewBn: 'জাতিসংঘ সাধারণ পরিষদ কর্তৃক গৃহীত ঐতিহাসিক দলিল যা বিশ্বের সকল মানুষের জন্য ৩০টি মৌলিক ও অবিচ্ছেদ্য মানবাধিকার নিশ্চিত করে।',
    simpleSummary: 'A historic global agreement created after World War II stating that every person on Earth is born free and equal, with rights to life, education, fair trials, and freedom from torture.',
    fullOfficialTextExcerpt: 'Whereas recognition of the inherent dignity and of the equal and inalienable rights of all members of the human family is the foundation of freedom, justice and peace in the world... Now, therefore, the General Assembly proclaims this Universal Declaration of Human Rights as a common standard of achievement for all peoples and all nations...',
    keyHighlights: [
      'Contains 30 foundational articles declaring all human beings born free and equal in dignity and rights (Art. 1).',
      'Absolute prohibition against torture, cruel, inhuman or degrading treatment (Art. 5).',
      'Serves as the foundation for the binding ICCPR and ICESCR global human rights covenants.'
    ],
    sections: [
      {
        number: 'Article 1',
        title: 'Right to Equality and Dignity',
        titleBn: 'সাম্য ও মানবিক মর্যাদার অধিকার',
        content: 'All human beings are born free and equal in dignity and rights. They are endowed with reason and conscience and should act towards one another in a spirit of brotherhood.',
        contentBn: 'সমস্ত মানুষ স্বাধীনভাবে এবং সমান মর্যাদা ও অধিকার নিয়ে জন্মগ্রহণ করে।',
        simpleExplanation: 'Every single person has equal human value and rights simply by being born human.',
        punishmentOrRemedy: 'Universal moral and customary legal baseline for national constitutions.',
        keyConcepts: ['Inherent dignity', 'Equality', 'Universal rights']
      },
      {
        number: 'Article 5',
        title: 'Freedom from Torture and Inhuman Treatment',
        titleBn: 'নির্যাতন ও অমানবিক আচরণ থেকে মুক্তি',
        content: 'No one shall be subjected to torture or to cruel, inhuman or degrading treatment or punishment.',
        contentBn: 'কাউকে নির্যাতন কিংবা নিষ্ঠুর, অমানবিক বা অবমাননাকর আচরণ বা শাস্তি দেওয়া যাবে না।',
        simpleExplanation: 'Torture is strictly illegal worldwide with zero exceptions, even during war or national emergencies.',
        punishmentOrRemedy: 'Customary international law norm (Jus Cogens).',
        keyConcepts: ['Absolute prohibition', 'Anti-torture', 'Jus cogens']
      },
      {
        number: 'Article 19',
        title: 'Freedom of Opinion and Expression',
        titleBn: 'মতপ্রকাশের স্বাধীনতা',
        content: 'Everyone has the right to freedom of opinion and expression; this right includes freedom to hold opinions without interference and to seek, receive and impart information and ideas through any media and regardless of frontiers.',
        contentBn: 'প্রত্যেকেরই মতামত পোষণ এবং মতপ্রকাশের অধিকার রয়েছে।',
        simpleExplanation: 'You have the right to think what you want, say what you think, and share information without borders.',
        punishmentOrRemedy: 'International human rights treaty reporting and UN Human Rights Council review.',
        keyConcepts: ['Free expression', 'Access to information', 'Cross-border discourse']
      }
    ],
    timeline: [
      { year: '1948', title: 'UNGA Adoption in Paris', description: 'Proclaimed by UN General Assembly Resolution 217 A.', status: 'enacted' },
      { year: '1966', title: 'Adoption of Twin Binding Covenants', description: 'Codified into binding treaty law via ICCPR and ICESCR.', status: 'enacted' },
      { year: '1993', title: 'Vienna Declaration and Programme of Action', description: 'Reaffirmed human rights universality and indivisibility.', status: 'upheld' }
    ],
    relatedLawIds: ['int-iccpr-1966', 'int-geneva-1949', 'bd-constitution-1972'],
    citations: {
      standard: 'Universal Declaration of Human Rights, G.A. Res. 217A (III), U.N. Doc. A/810 (Dec. 10, 1948)',
      academic: 'UDHR (1948), UN General Assembly Resolution 217 A (III).',
      bluebook: 'G.A. Res. 217 (III) A, Universal Declaration of Human Rights (Dec. 10, 1948).'
    },
    keywords: ['human rights', 'udhr', 'united nations', 'equality', 'freedom from torture', 'free speech', 'international law', 'dignity']
  },
  {
    id: 'int-iccpr-1966',
    slug: 'international-covenant-on-civil-and-political-rights-1966',
    title: 'International Covenant on Civil and Political Rights (ICCPR)',
    titleBn: 'নাগরিক ও রাজনৈতিক অধিকার বিষয়ক আন্তর্জাতিক চুক্তি (১৯৬৬)',
    shortTitle: 'ICCPR (UN Treaty Series vol. 999)',
    jurisdiction: 'International',
    jurisdictionCode: 'INT',
    category: 'Human Rights',
    status: 'Active Treaty',
    enactmentYear: 1966,
    totalStatutorySectionsCount: 53,
    isCuratedSubset: true,
    signatoriesCount: 174,
    overview: 'A multilateral treaty adopted by the UN General Assembly that commits state parties to respect the civil and political rights of individuals, including right to life, freedom of religion, freedom of assembly, electoral rights, and due process.',
    overviewBn: 'জাতিসংঘের একটি বাধ্যতামূলক আন্তর্জাতিক চুক্তি যা স্বাক্ষরকারী রাষ্ট্রগুলোকে তাদের নাগরিকদের জীবন, ধর্মীয় স্বাধীনতা, সমাবেশের অধিকার ও সুষ্ঠু বিচারের নিশ্চয়তা দিতে বাধ্য করে।',
    simpleSummary: 'A legally binding international treaty requiring countries to protect their citizens\' rights to life, voting, fair court trials, peaceful protest, and religious freedom.',
    fullOfficialTextExcerpt: 'The States Parties to the present Covenant, Considering that, in accordance with the principles proclaimed in the Charter of the United Nations, recognition of the inherent dignity and of the equal and inalienable rights of all members of the human family is the foundation of freedom, justice and peace in the world, Agree upon the following articles...',
    keyHighlights: [
      'Monitored by the UN Human Rights Committee based in Geneva.',
      'Article 6 protects the right to life with strict restrictions on capital punishment.',
      'Article 14 establishes comprehensive fair trial standards including presumption of innocence.'
    ],
    sections: [
      {
        number: 'Article 9',
        title: 'Right to Liberty and Security of Person',
        titleBn: 'ব্যক্তিগত স্বাধীনতা ও নিরাপত্তার অধিকার',
        content: 'Everyone has the right to liberty and security of person. No one shall be subjected to arbitrary arrest or detention. No one shall be deprived of his liberty except on such grounds and in accordance with such procedure as are established by law.',
        contentBn: 'কোনো ব্যক্তিকে বেআইনি বা খেয়ালখুশিমতো গ্রেপ্তার বা আটক রাখা যাবে না।',
        simpleExplanation: 'Protects you from being arrested without lawful cause, with the right to be brought promptly before a judge.',
        punishmentOrRemedy: 'Enforceable right to compensation for unlawful arrest (Art 9(5)).',
        keyConcepts: ['Arbitrary arrest', 'Habeas corpus', 'Prompt judicial hearing']
      },
      {
        number: 'Article 14',
        title: 'Right to a Fair Trial',
        titleBn: 'সুষ্ঠু বিচারের অধিকার',
        content: 'All persons shall be equal before the courts and tribunals. In the determination of any criminal charge against him, or of his rights and obligations in a suit at law, everyone shall be entitled to a fair and public hearing by a competent, independent and impartial tribunal established by law.',
        contentBn: 'আদালতের সামনে প্রত্যেকে সমান এবং নিরপেক্ষ আদালতের মাধ্যমে প্রকাশ্য ও সুষ্ঠু বিচার লাভের অধিকারী।',
        simpleExplanation: 'Guarantees that trials must be heard by independent judges, with public hearings and legal defense assistance.',
        punishmentOrRemedy: 'State obligation under international human rights law.',
        keyConcepts: ['Impartial tribunal', 'Presumption of innocence', 'Legal counsel']
      }
    ],
    timeline: [
      { year: '1966', title: 'Adoption by UN General Assembly', description: 'Opened for signature on 16 December 1966.', status: 'enacted' },
      { year: '1976', title: 'Entry into Force', description: 'Entered into force on 23 March 1976 following 35 ratifications.', status: 'enacted' },
      { year: '2000', title: 'Bangladesh Accession', description: 'Bangladesh formally acceded to the Covenant.', status: 'upheld' }
    ],
    relatedLawIds: ['int-udhr-1948', 'bd-constitution-1972', 'bd-crpc-1898'],
    citations: {
      standard: 'International Covenant on Civil and Political Rights, Dec. 16, 1966, 999 U.N.T.S. 171',
      academic: 'ICCPR, 999 UNTS 171, entered into force March 23, 1976.',
      bluebook: 'International Covenant on Civil and Political Rights, art. 9, Dec. 16, 1966, 999 U.N.T.S. 171.'
    },
    keywords: ['iccpr', 'civil rights', 'political rights', 'fair trial', 'arbitrary detention', 'un human rights', 'treaty']
  },
  {
    id: 'int-geneva-1949',
    slug: 'geneva-conventions-1949',
    title: 'The Geneva Conventions of 1949',
    titleBn: 'জেনেভা কনভেনশন (১৯৪৯)',
    shortTitle: 'Geneva Conventions I-IV (1949)',
    jurisdiction: 'International',
    jurisdictionCode: 'INT',
    category: 'International Humanitarian',
    status: 'Active Treaty',
    enactmentYear: 1949,
    totalStatutorySectionsCount: 159,
    isCuratedSubset: true,
    signatoriesCount: 196,
    overview: 'The core body of international humanitarian law (IHL) establishing legal protections in times of armed conflict for wounded combatants, prisoners of war, medical personnel, and non-combatant civilians.',
    overviewBn: 'আন্তর্জাতিক মানবিক আইনের মূল স্তম্ভ যা যুদ্ধকালীন সময়ে আহত সৈনিক, যুদ্ধবন্দী এবং সাধারণ বেসামরিক নাগরিকদের সুরক্ষা নিশ্চিত করে।',
    simpleSummary: 'The international laws of war that mandate humane treatment for civilians, medical workers, and captured soldiers during armed conflicts.',
    fullOfficialTextExcerpt: 'The High Contracting Parties undertake to respect and to ensure respect for the present Convention in all circumstances... Persons taking no active part in the hostilities, including members of armed forces who have laid down their arms and those placed hors de combat by sickness, wounds, detention, or any other cause, shall in all circumstances be treated humanely...',
    keyHighlights: [
      'Common Article 3 applies to non-international armed conflicts prohibiting murder, torture, and hostage-taking.',
      'Fourth Geneva Convention provides comprehensive protections for civilian populations in occupied territories.',
      'Universal ratification across all 196 sovereign states worldwide.'
    ],
    sections: [
      {
        number: 'Common Article 3',
        title: 'Conflicts not of an international character',
        titleBn: 'অভ্যন্তরীণ ও অ-আন্তর্জাতিক সশস্ত্র সংঘাতের নীতিমালা',
        content: 'Persons taking no active part in the hostilities shall in all circumstances be treated humanely, without any adverse distinction. The following acts remain prohibited: (a) violence to life and person, in particular murder of all kinds, mutilation, cruel treatment and torture; (b) taking of hostages; (c) outrages upon personal dignity.',
        contentBn: 'যুদ্ধে প্রত্যক্ষভাবে অংশ না নেওয়া ব্যক্তিদের যেকোনো পরিস্থিতিতে মানবিক আচরণ করতে হবে।',
        simpleExplanation: 'Sets a baseline minimum standard of humanity that must be respected in every armed clash or civil conflict.',
        punishmentOrRemedy: 'War crime prosecution before the International Criminal Court (ICC).',
        keyConcepts: ['Civilian protection', 'Humane treatment', 'War crimes prohibition']
      }
    ],
    timeline: [
      { year: '1949', title: 'Adoption in Geneva', description: 'Concluded following the devastation of World War II.', status: 'enacted' },
      { year: '1977', title: 'Additional Protocols I and II', description: 'Expanded protections to modern guerrilla conflicts and civilian infrastructure.', status: 'amended' },
      { year: '2005', title: 'Additional Protocol III', description: 'Adopted the Red Crystal as an additional protective emblem.', status: 'amended' }
    ],
    relatedLawIds: ['int-udhr-1948', 'int-iccpr-1966'],
    citations: {
      standard: 'Geneva Conventions of 12 August 1949, 75 U.N.T.S. 287',
      academic: 'Geneva Conventions I-IV (1949), International Committee of the Red Cross (ICRC).',
      bluebook: 'Geneva Convention Relative to the Protection of Civilian Persons in Time of War, Aug. 12, 1949, 6 U.S.T. 3516, 75 U.N.T.S. 287.'
    },
    keywords: ['geneva conventions', 'ihl', 'laws of war', 'humanitarian law', 'war crimes', 'icrc', 'civilian protection']
  },
  {
    id: 'int-unclos-1982',
    slug: 'un-convention-on-the-law-of-the-sea-1982',
    title: 'United Nations Convention on the Law of the Sea (UNCLOS)',
    titleBn: 'জাতিসংঘ সমুদ্র আইন কনভেনশন (১৯৮২)',
    shortTitle: 'UNCLOS (1982)',
    jurisdiction: 'International',
    jurisdictionCode: 'INT',
    category: 'Commercial & Contract',
    status: 'Active Treaty',
    enactmentYear: 1982,
    totalStatutorySectionsCount: 320,
    isCuratedSubset: true,
    signatoriesCount: 169,
    overview: 'Known as the Constitution for the Oceans, UNCLOS establishes a comprehensive legal framework governing maritime zones, territorial seas (12 NM), Exclusive Economic Zones (EEZ up to 200 NM), continental shelves, and maritime dispute resolution tribunals (ITLOS).',
    overviewBn: 'সমুদ্রের সংবিধান হিসেবে পরিচিত আন্তর্জাতিক চুক্তি যা রাষ্ট্রগুলোর জলসীমা, অর্থনৈতিক অঞ্চল (EEZ) ও সমুদ্র সম্পদের অধিকার নির্ধারণ করে।',
    simpleSummary: 'Defines how countries can use the world\'s oceans, how far out into the sea their borders reach (including Bangladesh\'s historic maritime settlements in the Bay of Bengal), and how to prevent marine pollution.',
    fullOfficialTextExcerpt: 'Prompted by the desire to settle, in a spirit of mutual understanding and cooperation, all issues relating to the law of the sea and aware of the historic significance of this Convention as an important contribution to the maintenance of peace, justice and progress for all peoples of the world...',
    keyHighlights: [
      'Defines 12-nautical-mile Territorial Sea and 200-nautical-mile Exclusive Economic Zone (EEZ).',
      'Established the International Tribunal for the Law of the Sea (ITLOS) in Hamburg.',
      'Provided the legal framework for Bangladesh\'s historic maritime boundary delimitation judgments with Myanmar (2012) and India (2014).'
    ],
    sections: [
      {
        number: 'Article 56',
        title: 'Rights, jurisdiction and duties of the coastal State in the Exclusive Economic Zone',
        titleBn: 'অনন্য অর্থনৈতিক অঞ্চলে (EEZ) উপকূলীয় রাষ্ট্রের অধিকার ও দায়িত্ব',
        content: 'In the exclusive economic zone, the coastal State has sovereign rights for the purpose of exploring and exploiting, conserving and managing the natural resources, whether living or non-living, of the waters superjacent to the seabed and of the seabed and its subsoil.',
        contentBn: '২০০ নটিক্যাল মাইল পর্যন্ত বিস্তৃত অর্থনৈতিক অঞ্চলে উপকূলীয় রাষ্ট্রের সকল প্রাকৃতিক ও সামুদ্রিক সম্পদের ওপর সার্বভৌম অধিকার থাকবে।',
        simpleExplanation: 'Gives coastal countries sole rights to fish, drill for gas, and harvest marine energy up to 200 nautical miles from their coast.',
        punishmentOrRemedy: 'Compulsory dispute resolution before ITLOS or the Permanent Court of Arbitration (PCA).',
        keyConcepts: ['EEZ', 'Sovereign resource rights', 'Maritime boundary']
      }
    ],
    timeline: [
      { year: '1982', title: 'Conclusion at Montego Bay', description: 'Adopted after 9 years of global diplomatic negotiation.', status: 'enacted' },
      { year: '1994', title: 'Entry into Force', description: 'Entered into force establishing global ocean management.', status: 'enacted' },
      { year: '2012', title: 'Bangladesh v. Myanmar ITLOS Award', description: 'Historic tribunal ruling granting Bangladesh its rightful maritime zone in Bay of Bengal.', status: 'upheld' }
    ],
    relatedLawIds: ['int-udhr-1948', 'bd-constitution-1972'],
    citations: {
      standard: 'United Nations Convention on the Law of the Sea, Dec. 10, 1982, 1833 U.N.T.S. 397',
      academic: 'UNCLOS 1982, UN Treaty Series, vol. 1833, p. 397.',
      bluebook: 'United Nations Convention on the Law of the Sea, Dec. 10, 1982, 1833 U.N.T.S. 397.'
    },
    keywords: ['unclos', 'maritime law', 'bay of bengal', 'eez', 'territorial sea', 'itlos', 'marine resources', 'oceans']
  },
  {
    id: 'bd-cpc-1908',
    slug: 'code-of-civil-procedure-1908',
    title: 'The Code of Civil Procedure, 1908',
    titleBn: 'দেওয়ানি কার্যবিধি, ১৯০৮',
    shortTitle: 'CPC 1908 (Act V of 1908)',
    actNumber: 'Act No. V of 1908',
    jurisdiction: 'Bangladesh',
    jurisdictionCode: 'BD',
    category: 'Civil Procedure',
    status: 'In Force',
    enactmentYear: 1908,
    lastAmendedYear: 2017,
    totalStatutorySectionsCount: 158,
    isCuratedSubset: true,
    officialGazetteRef: 'Govt. of Bangladesh Legislative Archive Act V/1908',
    overview: 'The primary procedural legislation governing the adjudication of civil suits, property disputes, plaints, written statements, temporary injunctions under Order XXXIX, decree executions, and civil appeals in Bangladesh.',
    overviewBn: 'দেওয়ানি মামলার আরজি দাখিল, জবাব, অস্থায়ী নিষেধাজ্ঞা, ডিক্রি জারি ও আপিল নিষ্পত্তির প্রধান কার্যপ্রণালী সংক্রান্ত আইন।',
    simpleSummary: 'The comprehensive rulebook for civil disputes in court, explaining how land, contract, and monetary lawsuits are filed, heard, and enforced.',
    fullOfficialTextExcerpt: 'An Act to consolidate and amend the laws relating to the procedure of the Courts of Civil Judicature. Whereas it is expedient to consolidate and amend the laws relating to the procedure of the Courts of Civil Judicature; It is hereby enacted as follows...',
    keyHighlights: [
      'Establishes the procedural stages of civil litigation from Plaint filing (Order VII) to Execution of Decrees (Order XXI).',
      'Provides mechanisms for Temporary Injunctions and Interlocutory Orders under Order XXXIX Rules 1 & 2 to prevent property alienation.',
      'Governs Res Judicata (Section 11) preventing re-litigation of previously decided disputes between the same parties.'
    ],
    sections: [
      {
        number: 'Section 9',
        title: 'Courts to try all civil suits unless barred',
        titleBn: 'আইনগত বাধা না থাকলে সকল দেওয়ানি মামলার বিচার করার এখতিয়ার',
        content: 'The Courts shall have jurisdiction to try all suits of a civil nature excepting suits of which their cognizance is either expressly or impliedly barred.',
        contentBn: 'সুনির্দিষ্ট আইনগত বাধা না থাকলে দেওয়ানি আদালতসমূহ সকল দেওয়ানি বিরোধের বিচার করার এখতিয়ার রাখবে।',
        simpleExplanation: 'Civil courts have general authority to resolve any civil or property dispute unless another specific statute creates a specialized tribunal.',
        punishmentOrRemedy: 'Adjudication and decree issuance.',
        keyConcepts: ['Civil jurisdiction', 'Inherent power', 'Cognizance']
      },
      {
        number: 'Section 115',
        title: 'Revision powers of High Court Division and District Court',
        titleBn: 'হাইকোর্ট ও জেলা জজের রিভিশন ক্ষমতা',
        content: 'The High Court Division or District Judge may call for the record of any case which has been decided by any Court subordinate to such Court and in which no appeal lies thereto, if such subordinate Court appears to have exercised a jurisdiction not vested in it by law.',
        contentBn: 'অধস্তন আদালত এখতিয়ার বহির্ভূত আদেশ দিলে বা আইনগত ভুল করলে রিভিশন আবেদনের মাধ্যমে প্রতিকার লাভের বিধান।',
        simpleExplanation: 'Allows higher courts to correct jurisdictional errors and illegal orders made by lower civil judges when no regular appeal is available.',
        punishmentOrRemedy: 'Correction or setting aside of erroneous judicial orders.',
        keyConcepts: ['Civil revision', 'Jurisdictional error', 'Supervisory power']
      }
    ],
    timeline: [
      { year: '1908', title: 'Original Promulgation', description: 'Enacted to standardize civil court procedures.', status: 'enacted' },
      { year: '2003', title: 'Alternative Dispute Resolution (ADR) Introduction', description: 'Mandated mediation and ADR mechanisms in civil suits via Section 89A.', status: 'amended' },
      { year: '2017', title: 'Revision Limitation Updates', description: 'Rationalized civil revision forums and fee schedules.', status: 'amended' }
    ],
    relatedLawIds: ['bd-constitution-1972', 'bd-crpc-1898'],
    citations: {
      standard: 'The Code of Civil Procedure, 1908 (Act No. V of 1908)',
      academic: 'CPC 1908, Ministry of Law, Justice & Parliamentary Affairs, BD.',
      bluebook: 'Code Civ. Proc., Act No. V of 1908 (Bangl.).'
    },
    keywords: ['cpc', 'civil procedure', 'injunction', 'order 39', 'plaint', 'decree', 'civil suit', 'land dispute', 'res judicata']
  },
  {
    id: 'bd-muslim-family-laws-1961',
    slug: 'muslim-family-laws-ordinance-1961',
    title: 'The Muslim Family Laws Ordinance, 1961',
    titleBn: 'মুসলিম পারিবারিক আইন অধ্যাদেশ, ১৯৬১',
    shortTitle: 'MFLO 1961 (Ordinance VIII of 1961)',
    actNumber: 'Ordinance No. VIII of 1961',
    jurisdiction: 'Bangladesh',
    jurisdictionCode: 'BD',
    category: 'Family Law',
    status: 'In Force',
    enactmentYear: 1961,
    lastAmendedYear: 2019,
    totalStatutorySectionsCount: 13,
    isCuratedSubset: true,
    officialGazetteRef: 'Govt. of Bangladesh Legislative Archive Ord. VIII/1961',
    overview: 'Statutory codification regulating marriage registration, mandatory procedures for Talaq (notice to Arbitration Council), restrictions on polygamy, maintenance rights of wives, and succession rights of orphaned grandchildren.',
    overviewBn: 'বিবাহ নিবন্ধন, তালাকের নোটিশ ও সালিশি কাউন্সিল পদ্ধতি, বহুবিবাহ নিয়ন্ত্রণ, ভরণপোষণ এবং নাতি-নাতনিদের উত্তরাধিকার সংক্রান্ত আইন।',
    simpleSummary: 'The key statute protecting marital rights, making marriage registration mandatory, regulating divorce notice periods, and ensuring financial maintenance.',
    fullOfficialTextExcerpt: 'An Ordinance to give effect to certain recommendations of the Commission on Marriage and Family Laws. Whereas it is expedient to give effect to certain recommendations of the Commission on Marriage and Family Laws; It is hereby enacted as follows...',
    keyHighlights: [
      'Section 7 mandates that any man wishing to divorce his wife must give written notice to the Chairman of the local Union Parishad/City Corporation and send a copy to the wife, initiating a mandatory 90-day reconciliation period.',
      'Section 6 strictly prohibits contracting a subsequent marriage during the subsistence of an existing marriage without prior written permission of the Arbitration Council.',
      'Section 4 protects inheritance rights of orphaned grandchildren from their grandparent\'s estate.'
    ],
    sections: [
      {
        number: 'Section 7',
        title: 'Notice and Procedure for Talaq (Divorce)',
        titleBn: 'তালাকের নোটিশ ও সালিশি পদ্ধতি',
        content: 'Any man who wishes to divorce his wife shall, as soon as may be after the pronouncement of talaq in any form whatsoever, give the Chairman notice in writing of his having done so, and shall supply a copy thereof to the wife. A talaq, unless revoked earlier, shall not be effective until the expiration of ninety days from the day on which notice is delivered.',
        contentBn: 'তালাক কার্যকর হতে হলে চেয়ারম্যানের নিকট লিখিত নোটিশ দাখিল করতে হবে এবং নোটিশের দিন থেকে ৯০ দিন অতিবাহিত হতে হবে।',
        simpleExplanation: 'Divorce does not become legally effective upon verbal pronouncement; formal written notice must be submitted to the local authority, with a mandatory 90-day reconciliation window.',
        punishmentOrRemedy: 'Imprisonment up to 1 year or fine for failure to notify.',
        keyConcepts: ['Talaq notice', 'Arbitration Council', '90-day waiting period']
      },
      {
        number: 'Section 9',
        title: 'Maintenance of Wife',
        titleBn: 'স্ত্রীর ভরণপোষণ',
        content: 'If any husband fails to maintain his wife adequately, or where there are more wives than one, fails to maintain them equitably, the wife, or all or any of the wives, may in addition to seeking any other legal remedy available apply to the Chairman who shall constitute an Arbitration Council to issue a certificate specifying the amount of maintenance.',
        contentBn: 'স্বামী পর্যাপ্ত ভরণপোষণ দিতে ব্যর্থ হলে স্ত্রী সালিশি কাউন্সিল বা পারিবারিক আদালতের মাধ্যমে খোরপোশ আদায়ের অধিকারী।',
        simpleExplanation: 'A wife has the right to legally claim shelter, food, clothing, and monetary maintenance for herself and her children.',
        punishmentOrRemedy: 'Arrears of maintenance recoverable as public demand / Family Court decree.',
        keyConcepts: ['Dower & maintenance', 'Spousal support', 'Child maintenance']
      }
    ],
    timeline: [
      { year: '1961', title: 'Promulgation', description: 'Introduced historic reforms safeguarding women\'s rights in marriage.', status: 'enacted' },
      { year: '1985', title: 'Family Courts Ordinance Integration', description: 'Established specialized Family Courts for prompt dispute resolution.', status: 'amended' },
      { year: '2019', title: 'Fines Modernization', description: 'Enhanced criminal fine penalties for unregistered polygamy.', status: 'amended' }
    ],
    relatedLawIds: ['bd-constitution-1972', 'bd-penal-code-1860'],
    citations: {
      standard: 'The Muslim Family Laws Ordinance, 1961 (Ordinance No. VIII of 1961)',
      academic: 'MFLO 1961, Ministry of Law, Justice and Parliamentary Affairs.',
      bluebook: 'Muslim Family Laws Ordinance, No. VIII of 1961 (Bangl.).'
    },
    keywords: ['family law', 'talaq', 'marriage registration', 'dower', 'denmohor', 'maintenance', 'custody', 'polygamy', 'arbitration council']
  },
  {
    id: 'bd-environment-act-1995',
    slug: 'bangladesh-environment-conservation-act-1995',
    title: 'Bangladesh Environment Conservation Act, 1995',
    titleBn: 'বাংলাদেশ পরিবেশ সংরক্ষণ আইন, ১৯৯৫',
    shortTitle: 'ECA 1995 (Act I of 1995)',
    actNumber: 'Act No. I of 1995',
    jurisdiction: 'Bangladesh',
    jurisdictionCode: 'BD',
    category: 'Environmental Law',
    status: 'In Force',
    enactmentYear: 1995,
    lastAmendedYear: 2010,
    officialGazetteRef: 'Bangladesh Gazette Notification Feb 16, 1995',
    overview: 'The primary environmental legislation in Bangladesh providing for conservation of natural ecosystems, control of industrial pollution, declaration of Ecologically Critical Areas (ECAs), mandatory Environmental Clearance Certificates (ECC), and the establishment of Environment Courts.',
    overviewBn: 'পরিবেশ সংরক্ষণ, দূষণ নিয়ন্ত্রণ, পরিবেশগত সংকটাপন্ন এলাকা (ECA) ঘোষণা এবং পরিবেশ আদালত সংক্রান্ত জাতীয় আইন।',
    simpleSummary: 'Sets strict national environmental rules for factories, prohibits hazardous waste dumping, protects rivers, and requires environmental approvals for industrial projects.',
    fullOfficialTextExcerpt: 'An Act to provide for conservation of the environment, improvement of environmental standards and control and mitigation of environmental pollution...',
    keyHighlights: [
      'Empowers the Department of Environment (DoE) to issue binding closure orders and fines on polluting industrial units.',
      'Requires mandatory Environmental Clearance Certificates (ECC) before commencing any industrial establishment or development project.',
      'Prohibits hill cutting, illegal wetland filling, and production of non-biodegradable polythene shopping bags.'
    ],
    sections: [
      {
        number: 'Section 5',
        title: 'Declaration of Ecologically Critical Area (ECA)',
        titleBn: 'পরিবেশগত সংকটাপন্ন এলাকা (ECA) ঘোষণা',
        content: 'If the Government is satisfied that an area is in an environmentally degraded condition or is likely to reach such condition, the Government may by notification in the official Gazette declare such area as an Ecologically Critical Area and prohibit harmful activities therein.',
        contentBn: 'পরিবেশ বিপর্যয়ের ঝুঁকিতে থাকা বনাঞ্চল, জলাভূমি বা প্রাকৃতিক স্থানকে সরকার সংকটাপন্ন এলাকা হিসেবে ঘোষণা ও সংরক্ষণ করতে পারে।',
        simpleExplanation: 'Protects fragile nature reserves, mangrove forests (Sundarbans), and wetlands from industrial encroachers.',
        punishmentOrRemedy: 'Imprisonment up to 10 years or fine up to BDT 10 Lakh.',
        keyConcepts: ['Ecologically critical area', 'Biodiversity', 'Protected zone']
      },
      {
        number: 'Section 12',
        title: 'Environmental Clearance Certificate (ECC)',
        titleBn: 'পরিবেশগত ছাড়পত্র গ্রহণের বাধ্যবাধকতা',
        content: 'No industrial unit or project shall be established or undertaken without obtaining, in the manner prescribed by the rules, an Environmental Clearance Certificate from the Director General.',
        contentBn: 'পরিবেশ অধিদপ্তর থেকে বৈধ ছাড়পত্র গ্রহণ ব্যতিরেকে কোনো শিল্পকারখানা বা প্রকল্প স্থাপন করা যাবে না।',
        simpleExplanation: 'Every factory or construction project must get official green clearance proving it will not poison the air or waterways.',
        punishmentOrRemedy: 'Demolition of unauthorized structure and criminal prosecution in Environment Court.',
        keyConcepts: ['ECC', 'Pollution mitigation', 'Industrial compliance']
      }
    ],
    timeline: [
      { year: '1995', title: 'Enactment', description: 'Passed to establish comprehensive statutory framework for pollution control.', status: 'enacted' },
      { year: '2000', title: 'Environment Court Act 2000', description: 'Established specialized judicial tribunals for swift trial of green crimes.', status: 'enacted' },
      { year: '2010', title: 'Wetlands & Hill Cutting Amendments', description: 'Strengthened restrictions against hill cutting and river encroachment.', status: 'amended' }
    ],
    relatedLawIds: ['bd-constitution-1972', 'int-paris-agreement-2015'],
    totalStatutorySectionsCount: 22,
    isCuratedSubset: true,
    citations: {
      standard: 'Bangladesh Environment Conservation Act, 1995 (Act No. I of 1995)',
      academic: 'BECA 1995, Ministry of Environment, Forest and Climate Change (BD).',
      bluebook: 'Environment Conservation Act, Act No. I of 1995 (Bangl.).'
    },
    keywords: ['environmental law', 'pollution', 'ecc', 'eca', 'sundarbans', 'river protection', 'environment court', 'climate']
  },
  {
    id: 'bd-contract-act-1872',
    slug: 'contract-act-1872',
    title: 'The Contract Act, 1872',
    titleBn: 'চুক্তি আইন, ১৮৭২',
    shortTitle: 'Contract Act 1872 (Act IX of 1872)',
    actNumber: 'Act No. IX of 1872',
    jurisdiction: 'Bangladesh',
    jurisdictionCode: 'BD',
    category: 'Commercial & Contract',
    status: 'In Force',
    enactmentYear: 1872,
    lastAmendedYear: 2020,
    totalStatutorySectionsCount: 238,
    isCuratedSubset: true,
    officialGazetteRef: 'Govt. of Bangladesh Legislative Archives Act IX/1872',
    officialSource: 'Laws of Bangladesh (bdlaws.minlaw.gov.bd)',
    sourceOrganization: 'Legislative and Parliamentary Affairs Division, Ministry of Law, Justice and Parliamentary Affairs',
    sourceVerificationUrl: 'http://bdlaws.minlaw.gov.bd/act-24.html',
    lastUpdatedDate: 'January 2025',
    overview: 'The fundamental statute governing commercial and civil agreements in Bangladesh. It establishes rules for proposal, acceptance, lawful consideration, capacity to contract, void agreements, breach of contract, and compensation.',
    overviewBn: 'বাংলাদেশের ব্যবসায়িক ও দেওয়ানি চুক্তির মূল আইন, যা প্রস্তাব, সম্মতি, আইনানুগ প্রতিদান, চুক্তিভঙ্গের ক্ষতিপূরণ এবং দায়বদ্ধতা নির্ধারণ করে।',
    simpleSummary: 'Defines how legally binding agreements are formed, when promises can be enforced in court, and what financial damages are payable if a business or individual breaks a contract.',
    fullOfficialTextExcerpt: 'WHEREAS it is expedient to define and amend certain parts of the law relating to contracts; It is enacted as follows: This Act may be called the Contract Act, 1872. It extends to the whole of Bangladesh; and it shall come into force on the first day of September, 1872.',
    keyHighlights: [
      'Contains 238 codified sections defining general principles of contracts, quasi-contracts, indemnity, guarantee, bailment, agency, and remedies for breach.',
      'Establishes the foundational principle: all agreements are contracts if they are made by free consent of parties competent to contract, for a lawful consideration and with a lawful object.',
      'Sections 73 and 74 govern the measure of damages for breach of contract and enforcement of reasonable compensation.'
    ],
    sections: [
      {
        number: 'Section 2',
        title: 'Interpretation-clause (Proposal, Acceptance, Agreement & Contract)',
        titleBn: 'ব্যাখ্যামূলক ধারা (প্রস্তাব, গ্রহণ, সম্মতি ও চুক্তি)',
        content: 'When one person signifies to another his willingness to do or to abstain from doing anything, with a view to obtaining the assent of that other to such act or abstinence, he is said to make a proposal. An agreement enforceable by law is a contract.',
        contentBn: 'আইন দ্বারা বলবৎযোগ্য সম্মতিই হলো একটি চুক্তি।',
        simpleExplanation: 'Lays down the basic definitions: an offer accepted becomes a promise; promises forming mutual consideration become an agreement; and any agreement enforceable by law is a contract.',
        punishmentOrRemedy: 'Enforceability of legal promises in courts of civil judicature.',
        keyConcepts: ['Proposal', 'Acceptance', 'Consideration', 'Enforceability']
      },
      {
        number: 'Section 10',
        title: 'What agreements are contracts',
        titleBn: 'কোন চুক্তিগুলো বৈধ বলে গণ্য হবে',
        content: 'All agreements are contracts if they are made by the free consent of parties competent to contract, for a lawful consideration and with a lawful object, and are not hereby expressly declared to be void.',
        contentBn: 'চুক্তি সম্পাদনে যোগ্য পক্ষগণের স্বাধীন সম্মতি, আইনানুগ প্রতিদান ও উদ্দেশ্যের ভিত্তিতে সম্পাদিত সম্মতিই বৈধ চুক্তি।',
        simpleExplanation: 'A contract is valid only if all parties agree freely without coercion, fraud, or undue influence, have legal capacity, and the agreement is for a legal purpose.',
        punishmentOrRemedy: 'Civil recognition and binding judicial enforceability.',
        keyConcepts: ['Free consent', 'Lawful object', 'Competency']
      },
      {
        number: 'Section 11',
        title: 'Who are competent to contract',
        titleBn: 'চুক্তি সম্পাদনে কারা যোগ্য',
        content: 'Every person is competent to contract who is of the age of majority according to the law to which he is subject, and who is of sound mind, and is not disqualified from contracting by any law to which he is subject.',
        contentBn: 'প্রাপ্তবয়স্ক, সুস্থ মস্তিষ্কের অধিকারী এবং আইনত অযোগ্য নন এমন যেকোনো ব্যক্তি চুক্তি করতে পারেন।',
        simpleExplanation: 'Minors (under 18) and persons of unsound mind cannot enter into legally binding contracts; agreements with minors are void ab initio (void from the beginning).',
        punishmentOrRemedy: 'Agreements by incompetent persons are void and unenforceable.',
        keyConcepts: ['Age of majority', 'Sound mind', 'Void ab initio']
      },
      {
        number: 'Section 23',
        title: 'What considerations and objects are lawful, and what not',
        titleBn: 'আইনসঙ্গত ও বেআইনি প্রতিদান ও উদ্দেশ্য',
        content: 'The consideration or object of an agreement is lawful, unless it is forbidden by law, or is of such a nature that, if permitted, it would defeat the provisions of any law, or is fraudulent, or involves injury to the person or property of another, or the Court regards it as immoral, or opposed to public policy.',
        contentBn: 'আইনবিরুদ্ধ, প্রতারণামূলক বা জনস্বার্থবিরোধী যেকোনো চুক্তির উদ্দেশ্য বা প্রতিদান বেআইনি ও বাতিল।',
        simpleExplanation: 'You cannot enforce contracts for illegal deals, smuggling, bribery, or activities contrary to public morality.',
        punishmentOrRemedy: 'Contract is declared void and of no legal effect.',
        keyConcepts: ['Public policy', 'Unlawful consideration', 'Void agreement']
      },
      {
        number: 'Section 73',
        title: 'Compensation for loss or damage caused by breach of contract',
        titleBn: 'চুক্তিভঙ্গের কারণে ক্ষতি বা লোকসানের ক্ষতিপূরণ',
        content: 'When a contract has been broken, the party who suffers by such breach is entitled to receive, from the party who has broken the contract, compensation for any loss or damage caused to him thereby, which naturally arose in the usual course of things from such breach, or which the parties knew, when they made the contract, to be likely to result from the breach of it.',
        contentBn: 'চুক্তি ভঙ্গের কারণে ক্ষতিগ্রস্ত পক্ষ স্বাভাবিক প্রক্রিয়ায় সৃষ্ট ক্ষতির জন্য ক্ষতিপূরণ পাওয়ার অধিকারী।',
        simpleExplanation: 'If someone breaks a business deal, they must pay money to put the injured party in the financial position they would have been in if the contract had been performed.',
        punishmentOrRemedy: 'Civil court money decree awarding compensatory damages.',
        keyConcepts: ['Breach of contract', 'Direct damages', 'Foreseeable loss']
      },
      {
        number: 'Section 74',
        title: 'Compensation for breach of contract where penalty stipulated for',
        titleBn: 'চুক্তিতে নির্ধারিত জরিমানার ক্ষেত্রে ক্ষতিপূরণ',
        content: 'When a contract has been broken, if a sum is named in the contract as the amount to be paid in case of such breach, or if the contract contains any other stipulation by way of penalty, the party complaining of the breach is entitled, whether or not actual damage or loss is proved to have been caused thereby, to receive from the party who has broken the contract reasonable compensation not exceeding the amount so named.',
        contentBn: 'চুক্তিতে উল্লিখিত জরিমানার অঙ্ক অতিক্রম না করে আদালত যুক্তিসঙ্গত ক্ষতিপূরণ মঞ্জুর করতে পারে।',
        simpleExplanation: 'Even if a contract specifies a huge penalty for default, courts will only award reasonable compensation up to that stated cap.',
        punishmentOrRemedy: 'Reasonable judicial compensation up to the stipulated penalty cap.',
        keyConcepts: ['Liquidated damages', 'Penalty clause', 'Reasonable compensation']
      },
      {
        number: 'Section 124',
        title: '"Contract of indemnity" defined',
        titleBn: 'ক্ষতিপূরণের চুক্তির (ইন্ডেমনিটি) সংজ্ঞা',
        content: 'A contract by which one party promises to save the other from loss caused to him by the conduct of the promisor himself, or by the conduct of any other person, is called a contract of indemnity.',
        contentBn: 'এক পক্ষ অপর পক্ষকে কোনো ক্ষতির হাত থেকে রক্ষা করার যে প্রতিশ্রুতি দেয় তাকে ক্ষতিপূরণ বা ইন্ডেমনিটি চুক্তি বলে।',
        simpleExplanation: 'An indemnity clause promises to protect and reimburse someone against losses or liabilities caused by the promisor or third parties.',
        punishmentOrRemedy: 'Reimbursement of all damages, court costs, and compromise sums.',
        keyConcepts: ['Indemnity', 'Reimbursement', 'Protection from loss']
      }
    ],
    timeline: [
      { year: '1872', title: 'Enactment of Act IX of 1872', description: 'Codified general principles of English common law contracts adapted for the subcontinent.', status: 'enacted' },
      { year: '1930', title: 'Sale of Goods Segregation', description: 'Provisions relating to sale of goods were separated into the Sale of Goods Act 1930.', status: 'amended' },
      { year: '1932', title: 'Partnership Segregation', description: 'Partnership provisions were codified into the Partnership Act 1932.', status: 'amended' },
      { year: '2020', title: 'Modern Electronic Contracts Recognition', description: 'Judicial recognition of digital agreements and e-signatures in commercial contracts.', status: 'active' }
    ],
    relatedLawIds: ['bd-cpc-1908', 'int-cisg-1980'],
    citations: {
      standard: 'The Contract Act, 1872 (Act No. IX of 1872)',
      academic: 'The Contract Act 1872, Legislative & Parliamentary Affairs Division, Dhaka.',
      bluebook: 'Contract Act, Act No. IX of 1872 (Bangl.).',
      apa: 'Contract Act, 1872 (Act IX of 1872). Laws of Bangladesh.',
      mla: '"The Contract Act, 1872." Bangladesh Code, 1872. Ministry of Law.',
      chicago: 'The Contract Act, 1872 (Act IX of 1872). Dhaka: Government Press.'
    },
    keywords: ['contract', 'agreement', 'breach of contract', 'damages', 'consideration', 'indemnity', 'commercial law', 'free consent']
  },
  {
    id: 'int-paris-agreement-2015',
    slug: 'paris-agreement-climate-change-2015',
    title: 'The Paris Agreement on Climate Change (2015)',
    titleBn: 'প্যারিস জলবায়ু চুক্তি (২০১৫)',
    shortTitle: 'Paris Agreement (UNFCCC / COP21)',
    jurisdiction: 'International',
    jurisdictionCode: 'INT',
    category: 'Environmental Law',
    status: 'Active Treaty',
    enactmentYear: 2015,
    totalStatutorySectionsCount: 29,
    isCuratedSubset: true,
    signatoriesCount: 195,
    overview: 'A legally binding international treaty on climate change adopted by 196 Parties at COP21 in Paris, aiming to limit global temperature increase to well below 2°C above pre-industrial levels, with efforts to limit warming to 1.5°C through Nationally Determined Contributions (NDCs).',
    overviewBn: 'জলবায়ু পরিবর্তন মোকাবেলায় বৈশ্বিক তাপমাত্রা বৃদ্ধি ১.৫ থেকে ২ ডিগ্রি সেলসিয়াসের মধ্যে সীমাবদ্ধ রাখার ঐতিহাসিক আন্তর্জাতিক চুক্তি।',
    simpleSummary: 'The world\'s foremost climate pact where countries committed to cut greenhouse gas emissions and fund climate resilience for vulnerable nations like Bangladesh.',
    fullOfficialTextExcerpt: 'The Parties to this Agreement, Being Parties to the United Nations Framework Convention on Climate Change... In pursuit of the objective of the Convention, and being guided by its principles, including the principle of equity and common but differentiated responsibilities... Have agreed as follows...',
    keyHighlights: [
      'Sets the overarching target of holding global average temperature rise to well below 2°C and pursuing 1.5°C limit.',
      'Requires all parties to formulate, communicate, and update successive Nationally Determined Contributions (NDCs) every 5 years.',
      'Mandates climate finance mechanisms (minimum $100 billion annual baseline) to assist developing and climate-vulnerable countries.'
    ],
    sections: [
      {
        number: 'Article 2',
        title: 'Long-term Temperature and Climate Goal',
        titleBn: 'দীর্ঘমেয়াদী তাপমাত্রা নিয়ন্ত্রণ ও জলবায়ু সহনশীলতার লক্ষ্য',
        content: 'This Agreement aims to strengthen the global response to the threat of climate change by holding the increase in the global average temperature to well below 2°C above pre-industrial levels and pursuing efforts to limit the temperature increase to 1.5°C.',
        contentBn: 'বৈশ্বিক গড় তাপমাত্রা বৃদ্ধি প্রাক-শিল্পযুগের তুলনায় ২ ডিগ্রি সেলসিয়াসের নিচে রাখা এবং ১.৫ ডিগ্রির মধ্যে সীমাবদ্ধ রাখার লক্ষ্য নির্ধারণ।',
        simpleExplanation: 'The core legal benchmark preventing catastrophic global warming and sea-level rise.',
        punishmentOrRemedy: 'Multilateral transparency and compliance review under Article 15.',
        keyConcepts: ['1.5C target', 'Global warming', 'Climate mitigation']
      },
      {
        number: 'Article 9',
        title: 'Climate Finance for Developing Nations',
        titleBn: 'উন্নয়নশীল দেশগুলোর জন্য জলবায়ু অর্থায়ন',
        content: 'Developed country Parties shall provide financial resources to assist developing country Parties with respect to both mitigation and adaptation in continuation of their existing obligations under the Convention.',
        contentBn: 'জলবায়ু পরিবর্তনের ক্ষতি মোকাবেলা ও সবুজ রূপান্তরে উন্নত দেশগুলো উন্নয়নশীল রাষ্ট্রগুলোকে আর্থিক সহায়তা প্রদানে দায়বদ্ধ।',
        simpleExplanation: 'Wealthy industrialized countries are obligated to provide funds to climate-vulnerable nations like Bangladesh to build coastal embankments and renewable grids.',
        punishmentOrRemedy: 'Global Stocktake mechanism under Article 14.',
        keyConcepts: ['Climate finance', 'Loss and damage', 'Adaptation funding']
      }
    ],
    timeline: [
      { year: '2015', title: 'Adoption at COP21 in Paris', description: 'Adopted on 12 December 2015 by consensus of 196 nations.', status: 'enacted' },
      { year: '2016', title: 'Historic Entry into Force', description: 'Entered into force on 4 November 2016 after ratification by over 55 countries representing 55% of global emissions.', status: 'enacted' },
      { year: '2023', title: 'First Global Stocktake (COP28)', description: 'Concluded UAE Consensus evaluating progress toward 1.5°C transition.', status: 'upheld' }
    ],
    relatedLawIds: ['bd-environment-act-1995', 'int-unclos-1982', 'bd-constitution-1972'],
    citations: {
      standard: 'Paris Agreement to the United Nations Framework Convention on Climate Change, Dec. 12, 2015, T.I.A.S. No. 16-1104',
      academic: 'Paris Agreement (2015), UNFCCC, FCCC/CP/2015/L.9/Rev.1.',
      bluebook: 'Paris Agreement, Dec. 12, 2015, U.N. Doc. FCCC/CP/2015/L.9/Rev.1.'
    },
    keywords: ['paris agreement', 'climate change', 'unfccc', 'global warming', 'ndc', 'carbon emissions', 'climate finance', 'environment']
  },
  {
    id: 'int-cisg-1980',
    slug: 'un-convention-contracts-international-sale-goods-1980',
    title: 'United Nations Convention on Contracts for the International Sale of Goods (CISG)',
    titleBn: 'আন্তর্জাতিক পণ্য বিক্রয় চুক্তি সংক্রান্ত জাতিসংঘ কনভেনশন (১৯৮০)',
    shortTitle: 'CISG (Vienna Convention 1980)',
    jurisdiction: 'International',
    jurisdictionCode: 'INT',
    category: 'Commercial & Contract',
    status: 'Active Treaty',
    enactmentYear: 1980,
    totalStatutorySectionsCount: 101,
    isCuratedSubset: true,
    signatoriesCount: 95,
    overview: 'The uniform multilateral legal code prepared by UNCITRAL governing the formation of international commercial sales contracts, rights and obligations of buyers and sellers, remedies for breach of contract, and risk of loss in global trade.',
    overviewBn: 'আন্তর্জাতিক বাণিজ্যিক পণ্য ক্রয়-বিক্রয় চুক্তি, ক্রেতা-বিক্রেতার অধিকার ও দায়িত্ব এবং চুক্তিভঙ্গের ক্ষতিপূরণ সংক্রান্ত ইউনিফর্ম আইন।',
    simpleSummary: 'The universal international contract law book that governs cross-border import and export deals, defining when a commercial deal is legally binding and what damages can be claimed.',
    fullOfficialTextExcerpt: 'The States Parties to this Convention, Bearing in mind the broad objectives in the resolutions adopted by the sixth special session of the General Assembly on the establishment of a New International Economic Order... Have agreed as follows...',
    keyHighlights: [
      'Applies to contracts of sale of goods between parties whose places of business are in different Contracting States.',
      'Governs offer and acceptance standards, avoidance of contract, and buyer\'s right to demand specific performance.',
      'Establishes rules for Fundamental Breach of contract (Article 25) and damages calculation for international shipments.'
    ],
    sections: [
      {
        number: 'Article 25',
        title: 'Fundamental Breach of Contract',
        titleBn: 'চুক্তির মৌলিক বা গুরুতর লঙ্ঘন',
        content: 'A breach of contract committed by one of the parties is fundamental if it results in such detriment to the other party as substantially to deprive him of what he is entitled to expect under the contract, unless the party in breach did not foresee and a reasonable person would not have foreseen such a result.',
        contentBn: 'চুক্তিভঙ্গ তখনই মৌলিক লঙ্ঘন হিসেবে গণ্য হবে যখন এটি অপর পক্ষের প্রত্যাশিত অধিকারকে চরমভাবে ব্যাহত করে।',
        simpleExplanation: 'A breach so serious that the victim is deprived of the core benefit of the contract, giving them the right to immediately cancel the deal and claim full damages.',
        punishmentOrRemedy: 'Avoidance of contract and damages under Article 74.',
        keyConcepts: ['Fundamental breach', 'Contract cancellation', 'Commercial damages']
      }
    ],
    timeline: [
      { year: '1980', title: 'Adoption in Vienna', description: 'Concluded at the diplomatic conference in Vienna under UNCITRAL.', status: 'enacted' },
      { year: '1988', title: 'Entry into Force', description: 'Became the dominant international commercial sales framework.', status: 'enacted' }
    ],
    relatedLawIds: ['int-unclos-1982', 'bd-constitution-1972'],
    citations: {
      standard: 'United Nations Convention on Contracts for the International Sale of Goods, Apr. 11, 1980, 1489 U.N.T.S. 3',
      academic: 'CISG (1980), 1489 UNTS 3, UNCITRAL.',
      bluebook: 'United Nations Convention on Contracts for the International Sale of Goods, Apr. 11, 1980, S. Treaty Doc. No. 98-9 (1983), 1489 U.N.T.S. 3.'
    },
    keywords: ['cisg', 'commercial law', 'international sale of goods', 'contracts', 'uncitral', 'export', 'import', 'breach of contract']
  }
];

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    term: 'Tort',
    termBn: 'দেওয়ানি অন্যায় বা টর্ট',
    pronunciation: 'TORT',
    category: 'Civil & Common Law',
    definition: 'A civil wrong (other than a breach of contract) that causes a claimant to suffer loss or harm, resulting in legal liability for the person who commits the tortious act.',
    simpleExplanation: 'When someone unfairly harms you, your property, or your reputation without having a written contract with you (like causing a car crash or polluting your drinking water), allowing you to sue them for financial compensation.',
    jurisdiction: 'Universal',
    exampleUsage: 'The factory owners were sued in tort for economic damages caused by toxic effluent discharge.'
  },
  {
    term: 'Negligence',
    termBn: 'অবহেলা বা কর্তব্যে অযত্ন',
    pronunciation: 'NEG-li-juns',
    category: 'Civil & Tort Law',
    definition: 'A failure to behave with the level of care that a reasonably prudent person would have exercised under the same circumstances, resulting in foreseeable harm to another.',
    simpleExplanation: 'Being careless when you had a duty to be careful, leading to someone getting hurt or losing money (such as a doctor leaving surgical tools inside a patient or a speeding driver).',
    jurisdiction: 'Universal',
    exampleUsage: 'The hospital faced substantial liability for medical negligence due to improper post-operative monitoring.'
  },
  {
    term: 'Arbitration',
    termBn: 'সালিশ বা মধ্যস্থতানির্ভর বিচার',
    pronunciation: 'ar-bi-TRAY-shun',
    category: 'Commercial & ADR',
    definition: 'A private dispute resolution procedure in which a dispute is submitted, by agreement of the parties, to one or more independent arbitrators who make a binding award.',
    simpleExplanation: 'Settling a legal fight privately outside of a crowded public courtroom by hiring an agreed-upon neutral expert judge (arbitrator) whose decision is final and enforceable.',
    jurisdiction: 'Universal',
    exampleUsage: 'Under the UNCITRAL arbitration rules, the multinational joint venture resolved its supply breach in Singapore.'
  },
  {
    term: 'Liability',
    termBn: 'আইনি দায় বা দায়বদ্ধতা',
    pronunciation: 'ly-uh-BIL-i-tee',
    category: 'General Jurisprudence',
    definition: 'The state of being legally responsible for something, such as a debt, damages from a wrongful act, or criminal punishment.',
    simpleExplanation: 'Being held legally and financially responsible by the law to pay for damages, fix a mistake, or serve a penalty.',
    jurisdiction: 'Universal',
    exampleUsage: 'The employer bore vicarious liability for the unlawful actions committed by employees during working hours.'
  },
  {
    term: 'Contract',
    termBn: 'চুক্তি',
    pronunciation: 'KON-trakt',
    category: 'Commercial & Contract',
    definition: 'A legally binding agreement between two or more parties that creates mutual obligations enforceable by law upon offer, acceptance, and consideration.',
    simpleExplanation: 'A serious promise or deal between people or companies that the courts will enforce if one party breaks their word.',
    jurisdiction: 'Universal',
    exampleUsage: 'Under Section 10 of the Contract Act 1872, all agreements are contracts if made by free consent for lawful consideration.'
  },
  {
    term: 'Injunction',
    termBn: 'নিষেধাজ্ঞা বা স্থগিতাদেশ',
    pronunciation: 'in-JUNGK-shun',
    category: 'Civil Procedure & Equity',
    definition: 'An authoritative warning or order by a court requiring a party to do, or refrain from doing, a specific act.',
    simpleExplanation: 'A direct court order stopping someone from doing something harmful (like tearing down a disputed building) or ordering them to do something urgently.',
    jurisdiction: 'Universal',
    exampleUsage: 'The civil court granted a temporary injunction prohibiting the developer from encroaching on plaintiff\'s land.'
  },
  {
    term: 'Res Judicata',
    termBn: 'দোবারা দোষ / পূর্বে মীমাংসিত বিষয়',
    pronunciation: 'rez joo-di-KAH-tuh',
    category: 'Civil Procedure',
    definition: 'A matter that has been adjudicated by a competent court and therefore may not be pursued again by the same parties.',
    simpleExplanation: 'A rule meaning "the issue is already decided." You cannot re-sue the same person over the exact same finalized lawsuit once a court has given its final verdict.',
    jurisdiction: 'Universal',
    exampleUsage: 'Under Section 11 of the Code of Civil Procedure 1908, the second suit was dismissed on grounds of res judicata.'
  },
  {
    term: 'Bail',
    termBn: 'জামিন',
    pronunciation: 'BAYL',
    category: 'Criminal Procedure',
    definition: 'The temporary release of an accused person awaiting trial, sometimes on condition that a sum of money or surety bond is lodged to guarantee their appearance in court.',
    simpleExplanation: 'Allowing an accused person to leave jail while their case is being investigated or tried, usually by signing a bond promising to show up to court.',
    jurisdiction: 'Bangladesh',
    exampleUsage: 'The Magistrate granted ad-interim bail under Section 497 of the CrPC on submission of two solvent sureties.'
  },
  {
    term: 'Remand',
    termBn: 'রিমান্ড বা পুলিশি হেফাজত',
    pronunciation: 'ree-MAND',
    category: 'Criminal Procedure',
    definition: 'The committal of an accused person to custody (either police or judicial) during an adjournment of a trial or pending further investigation.',
    simpleExplanation: 'When a judge sends a suspect to custody (such as into police station custody for questioning or to central jail) while the case is being investigated.',
    jurisdiction: 'Bangladesh',
    exampleUsage: 'Under Section 167 of the CrPC and High Court guidelines, police custody remand cannot exceed 15 days in aggregate.'
  },
  {
    term: 'Estoppel',
    termBn: 'প্রতিবন্ধক নীতি / নিজের কথা অস্বীকারের বাধা',
    pronunciation: 'es-TOP-el',
    category: 'Evidence & Civil Law',
    definition: 'A legal rule that prevents a person from asserting something contrary to what is implied by a previous action or statement made by that person.',
    simpleExplanation: 'You cannot say one thing and take someone\'s money, and then later in court claim the opposite was true to escape your responsibility.',
    jurisdiction: 'Universal',
    exampleUsage: 'Under Section 115 of the Evidence Act 1872, the landlord was estopped from denying the tenant\'s lease rights.'
  },
  {
    term: 'Sub Judice',
    termBn: 'বিচারাধীন বিষয়',
    pronunciation: 'sub JOO-di-see',
    category: 'Judicial Process',
    definition: 'Under judicial consideration and therefore prohibited from public discussion or media comment elsewhere that could prejudice the outcome.',
    simpleExplanation: 'A case currently being judged in court, which the media and public should not make biased claims about so the jury/judge stays fair.',
    jurisdiction: 'Universal',
    exampleUsage: 'The minister declined to comment on the ongoing trial, noting the matter was sub judice.'
  },
  {
    term: 'Locus Standi',
    termBn: 'মামলা করার আইনি অধিকার',
    pronunciation: 'LOH-kus STAN-dye',
    category: 'Constitutional & Civil Law',
    definition: 'The right or capacity to bring an action or to appear in a court on a legal question.',
    simpleExplanation: 'Showing that you have a direct personal interest or recognized public stake in a dispute, giving you the legal right to sue in court.',
    jurisdiction: 'Universal',
    exampleUsage: 'The Supreme Court recognized the environmental group\'s locus standi in public interest litigation (PIL).'
  },
  {
    term: 'Adjudication',
    termBn: 'আইনি রায়দান বা বিচারিক মীমাংসা',
    pronunciation: 'uh-joo-di-KAY-shun',
    category: 'Judicial Power',
    definition: 'The legal process of resolving a dispute or deciding a case by hearing evidence and arguments from both sides before delivering a formal judgment.',
    simpleExplanation: 'The formal decision-making process where a judge or tribunal listens to all sides and issues a binding legal verdict.',
    jurisdiction: 'Universal',
    exampleUsage: 'The Labour Court completed the adjudication of the collective workplace compensation dispute.'
  },
  {
    term: 'Mens Rea',
    termBn: 'অপরাধমূলক মানসিকতা',
    pronunciation: 'menz RAY-uh',
    category: 'Criminal Law',
    definition: 'The mental element of a person\'s intention to commit a crime, or knowledge that one\'s action or lack of action will cause a crime to be committed.',
    simpleExplanation: 'A "guilty mind" — proving that the person intended to do something wrong or knew the danger of what they were doing.',
    jurisdiction: 'Universal',
    exampleUsage: 'To secure a conviction for murder under Section 300, the prosecution must prove both the physical act and the mens rea.'
  },
  {
    term: 'Actus Reus',
    termBn: 'অপরাধমূলক কর্মকাণ্ড',
    pronunciation: 'AK-tus RAY-us',
    category: 'Criminal Law',
    definition: 'The objective or external element of a crime; the wrongful act or omission that constitutes the physical component of an offense.',
    simpleExplanation: 'The physical action or conduct of committing the crime itself.',
    jurisdiction: 'Universal',
    exampleUsage: 'An intention alone is not punishable until accompanied by an actus reus.'
  },
  {
    term: 'Habeas Corpus',
    termBn: 'বন্দী প্রদর্শন পরোয়ানা',
    pronunciation: 'HAY-bee-us KOR-pus',
    category: 'Constitutional Law',
    definition: 'A judicial writ requiring a person under arrest to be brought before a judge or into court, especially to secure the person\'s release unless lawful grounds are shown for their detention.',
    simpleExplanation: 'A court order commanding the police or government to bring a detained person before the judge to verify if their arrest was legal.',
    jurisdiction: 'Bangladesh',
    exampleUsage: 'Under Article 102(2)(b)(i) of the Bangladesh Constitution, a writ of habeas corpus was filed to challenge the citizen\'s detention.'
  },
  {
    term: 'Mandamus',
    termBn: 'পরমাদেশ / বাধ্যতামূলক আদেশ',
    pronunciation: 'man-DAY-mus',
    category: 'Constitutional Law',
    definition: 'A judicial writ issued as a command to an inferior court or ordering a person to perform a public or statutory duty.',
    simpleExplanation: 'An order from the High Court commanding a government official or department to do the job they are legally required to do.',
    jurisdiction: 'Bangladesh',
    exampleUsage: 'The High Court issued a writ of mandamus directing the municipal authority to clean toxic industrial waste.'
  },
  {
    term: 'Cognizable Offense',
    termBn: 'আমলযোগ্য অপরাধ',
    pronunciation: 'KOG-ni-zuh-bul',
    category: 'Criminal Procedure',
    definition: 'An offense for which a police officer may arrest the accused without a warrant and start an investigation without court permission.',
    simpleExplanation: 'A serious crime (like robbery, murder, or kidnapping) where the police have the authority to arrest the suspect on the spot without waiting for a judge\'s warrant.',
    jurisdiction: 'Bangladesh',
    exampleUsage: 'Theft is a cognizable offense under the Penal Code, allowing immediate police intervention upon an FIR.'
  },
  {
    term: 'Prima Facie',
    termBn: 'প্রথম দর্শনে / আপাতদৃষ্টিতে',
    pronunciation: 'PRY-muh FAY-shee',
    category: 'Evidence & Procedure',
    definition: 'Based on the first impression; accepted as correct until proved otherwise.',
    simpleExplanation: 'Evidence that appears clear and sufficient at first glance to establish a fact or case unless rebutted.',
    jurisdiction: 'Universal',
    exampleUsage: 'The submitted CCTV recording established a prima facie case against the accused.'
  },
  {
    term: 'Jus Cogens',
    termBn: 'অনুলঙ্ঘনীয় আন্তর্জাতিক নীতি',
    pronunciation: 'yoos KOH-jenz',
    category: 'International Law',
    definition: 'A fundamental principle of international law that is accepted by the international community of states as a norm from which no derogation is permitted (e.g. prohibitions on torture, genocide, piracy).',
    simpleExplanation: 'Universal supreme rules of global law that no country is allowed to break, even with a treaty.',
    jurisdiction: 'Universal',
    exampleUsage: 'The prohibition against torture is a jus cogens norm in international customary law.'
  },
  {
    term: 'Suo Motu',
    termBn: 'স্বতঃপ্রণোদিত আদেশ',
    pronunciation: 'SOO-oh MO-too',
    category: 'Judicial Power',
    definition: 'An action taken by a court of its own accord, without a formal request by any of the parties involved.',
    simpleExplanation: 'When a court or judge takes action on their own after seeing a newspaper report or public injustice, without waiting for a lawsuit.',
    jurisdiction: 'Bangladesh',
    exampleUsage: 'The High Court issued a suo motu rule regarding illegal river pollution in Dhaka.'
  },
  {
    term: 'Ultra Vires',
    termBn: 'ক্ষমতাবহির্ভূত / ক্ষমতার অতিরিক্ত',
    pronunciation: 'UL-truh VY-reez',
    category: 'Administrative Law',
    definition: 'Beyond the legal powers or authority of a person, institution, or corporation.',
    simpleExplanation: 'An action taken by an official or agency that exceeds what the written law actually permits them to do.',
    jurisdiction: 'Universal',
    exampleUsage: 'The executive circular was struck down as ultra vires because it contradicted the parent Act of Parliament.'
  },
  {
    term: 'First Information Report (FIR)',
    termBn: 'প্রাথমিক তথ্য বিবরণী (এফআইআর)',
    pronunciation: 'F-I-R',
    category: 'Criminal Procedure',
    definition: 'A written document prepared by police in Bangladesh, India, and Pakistan when they receive information about the commission of a cognizable offense.',
    simpleExplanation: 'The official police report recorded at a police station (Thana) that legally initiates a criminal investigation.',
    jurisdiction: 'Bangladesh',
    exampleUsage: 'The victim visited the local police station to register an FIR under Section 154 of the CrPC.'
  }
];

export const LEGAL_OUTCOME_PATHWAYS: LegalOutcomePathway[] = [
  {
    id: 'fir-police-investigation',
    title: 'Criminal Reporting: Filing an FIR vs General Diary (GD)',
    titleBn: 'ফৌজদারি অভিযোগ: এজাহার (FIR) ও সাধারণ ডায়েরি (GD) দায়েরের পদ্ধতি',
    category: 'Criminal Procedure',
    jurisdiction: 'Bangladesh',
    estimatedTimeline: 'Immediate filing (1-2 hours) → Investigation within 15-60 days',
    primaryLegislation: 'Code of Criminal Procedure 1898 (Sections 154, 155) & Police Regulations of Bengal (PRB)',
    summary: 'An educational guide detailing the legal difference between an FIR (for serious cognizable crimes) and a GD (for non-cognizable incidents, lost documents, or threats), with rights during filing.',
    stages: [
      {
        stageNumber: 1,
        title: 'Determining Report Type (FIR vs GD)',
        description: 'Understand whether the incident is a serious crime (theft, physical assault, cyber extortion = FIR) or a preventive/non-cognizable matter (lost certificates, verbal dispute, security fear = GD).',
        keyActions: [
          'Visit the police station (Thana) under whose geographical jurisdiction the incident took place.',
          'Prepare a written statement with date, time, location, suspect description, and eyewitness details.',
          'For GD: Write a formal letter addressing the Officer-in-Charge (OC).'
        ],
        importantRights: [
          'Under CrPC Section 154, the police must read out the written report to you before signing.',
          'You are legally entitled to receive a free official copy of the registered FIR with case number and GD entry receipt stamped by the duty officer.'
        ],
        commonPitfalls: [
          'Leaving out the exact time or location of the occurrence.',
          'Signing a blank or incomplete paper without reading.'
        ]
      },
      {
        stageNumber: 2,
        title: 'Investigation & Evidence Preservation',
        description: 'Once an FIR is registered, an Investigation Officer (IO) is assigned to visit the crime scene, record statements, and collect forensic data.',
        keyActions: [
          'Preserve all relevant digital screenshots, medical certificates, or payment slips.',
          'Provide names and contact numbers of witnesses to the IO.'
        ],
        importantRights: [
          'Female witnesses or complainants must be interviewed in the presence of female officers or guardians.',
          'Complainants have the right to know the identity and designation of the assigned IO.'
        ],
        commonPitfalls: [
          'Tampering with physical evidence or deleting digital chat logs before forensics.'
        ]
      },
      {
        stageNumber: 3,
        title: 'Submission of Police Report (Charge Sheet vs Final Report)',
        description: 'The IO completes the probe and submits either a Charge Sheet (prima facie evidence found) or a Final Report (insufficient evidence/mistake of fact) to the Magistrate Court.',
        keyActions: [
          'Track the case in the Chief Judicial / Metropolitan Magistrate Court docket.',
          'If an unfair Final Report is submitted, the complainant can file a Naraji (protest petition) before the Magistrate.'
        ],
        importantRights: [
          'Right to challenge an adverse police report through a Naraji petition under CrPC Section 173.'
        ],
        commonPitfalls: [
          'Failing to attend the court hearing date when the police report is formally considered.'
        ]
      }
    ],
    emergencyContacts: [
      { name: 'National Emergency Service', number: '999', description: 'Toll-free 24/7 police, ambulance, and fire dispatch in Bangladesh.' },
      { name: 'Cyber Crime Investigation Division', number: '01320-010148', description: 'Dhaka Metropolitan Police Cyber Crime Unit helpdesk.' },
      { name: 'National Legal Aid Services Helpline', number: '16430', description: 'Free government legal aid for underprivileged citizens.' }
    ]
  },
  {
    id: 'arrest-and-bail-rights',
    title: 'Arrest Safeguards & Understanding the Bail Process',
    titleBn: 'গ্রেপ্তারকালীন অধিকার এবং জামিন প্রক্রিয়ার নিয়মাবলি',
    category: 'Criminal Procedure',
    jurisdiction: 'Bangladesh',
    estimatedTimeline: 'Production before Magistrate within 24 hours → Bail hearing',
    primaryLegislation: 'Constitution of Bangladesh (Art. 31, 33), CrPC 1898 (Sec. 54, 61, 497), Blast Guidelines',
    summary: 'A procedural walkthrough of constitutional protections during detention, the 24-hour court production mandate, and how bail applications are evaluated.',
    stages: [
      {
        stageNumber: 1,
        title: 'Rights at the Moment of Arrest',
        description: 'Under Article 33 of the Constitution and landmark High Court judgments (BLAST v. Bangladesh), strict rules apply to every arrest.',
        keyActions: [
          'Inquire about the reason for arrest and request to see the officer\'s official ID and badge.',
          'Request that a family member or nominated contact be immediately notified of your detention location.'
        ],
        importantRights: [
          'Right to be informed of the grounds of arrest without delay.',
          'Right to consult and be defended by a legal practitioner of choice.',
          'Mandatory protection: You MUST be produced before the nearest Judicial Magistrate within 24 hours of arrest (excluding travel time).'
        ],
        commonPitfalls: [
          'Giving forced confessions in police custody (Section 25 of Evidence Act states confessions to police are inadmissible in court).'
        ]
      },
      {
        stageNumber: 2,
        title: 'Production Before Magistrate Court',
        description: 'The detained individual is produced before the court. The police may request Remand (custodial interrogation) or judicial detention (jail custody), while the defense lawyer submits a Bail petition.',
        keyActions: [
          'Appoint an advocate or request court-appointed legal aid representation.',
          'Present grounds for bail: e.g. permanent residence, no flight risk, medical illness, absence of prior record.'
        ],
        importantRights: [
          'Protection against torture in remand; right to request immediate medical examination by a government physician.'
        ],
        commonPitfalls: [
          'Failing to produce national ID, proof of address, or supporting medical documentation.'
        ]
      },
      {
        stageNumber: 3,
        title: 'Bail Order & Execution of Bail Bond',
        description: 'If bail is granted under Section 497 of CrPC, bail bonds with local sureties must be submitted before release is issued.',
        keyActions: [
          'Arrange solvent local sureties (guarantors) with verified NID and tax/land documents.',
          'Submit the signed bail bond to the court bailiff to generate the release order (Dak).'
        ],
        importantRights: [
          'Immediate release from jail custody once the release order reaches the prison authority.'
        ],
        commonPitfalls: [
          'Violating bail conditions (such as missing subsequent trial dates or attempting to contact witnesses).'
        ]
      }
    ],
    emergencyContacts: [
      { name: 'Legal Aid Helpline (Govt. of Bangladesh)', number: '16430', description: 'Free legal advice and state-sponsored defense counsel.' }
    ]
  },
  {
    id: 'constitutional-writ-remedy',
    title: 'High Court Writ Petitions (Article 102 Framework)',
    titleBn: 'হাইকোর্ট বিভাগে রিট আবেদন (সংবিধানের ১০২ অনুচ্ছেদ)',
    category: 'Constitutional Remedies',
    jurisdiction: 'Bangladesh',
    estimatedTimeline: 'Motion hearing (1-7 days) → Rule Nisi (2-6 months) → Final Judgment',
    primaryLegislation: 'The Constitution of Bangladesh (Article 102)',
    summary: 'An educational breakdown of how citizens and public interest organizations challenge unconstitutional state actions, illegal eviction, and arbitrary detention through High Court Writs.',
    stages: [
      {
        stageNumber: 1,
        title: 'Evaluating "Locus Standi" & Grounds for Writ',
        description: 'Verify if you are an "aggrieved person" or filing Public Interest Litigation (PIL) where fundamental rights or public law principles have been breached.',
        keyActions: [
          'Identify the public authority or state agency that acted without legal authority or failed its duty.',
          'Serve a formal legal notice demanding justice to the concerned government ministry/authority.'
        ],
        importantRights: [
          'Right to petition the highest constitutional court against arbitrary executive decrees or human rights abuses.'
        ],
        commonPitfalls: [
          'Filing a writ when a specific equally effective statutory remedy (like a specialized appellate tribunal) is already available and unexhausted.'
        ]
      },
      {
        stageNumber: 2,
        title: 'Filing Petition & Motion Hearing (Rule Nisi)',
        description: 'The petition is drafted, verified by affidavit, and moved before a Division Bench of the High Court.',
        keyActions: [
          'Present arguments demonstrating clear illegality, ultra vires action, or fundamental rights violation.',
          'Pray for interim stay order or injunction if immediate harm is imminent.'
        ],
        importantRights: [
          'Court can issue an immediate stay order protecting life, property, or employment status pending final hearing.'
        ],
        commonPitfalls: [
          'Inaccurate affidavits or concealment of material facts which can lead to dismissal with punitive costs.'
        ]
      },
      {
        stageNumber: 3,
        title: 'Final Hearing & Judgment',
        description: 'The state respondent files an Affidavit-in-Opposition, followed by final oral arguments to make the Rule Absolute or discharge it.',
        keyActions: [
          'Submit certified copies of all previous orders and relevant precedent case law from Bangladesh Supreme Court Reports (BLD/DLR).'
        ],
        importantRights: [
          'A Rule Absolute is a binding judicial command enforceable across the Republic.'
        ],
        commonPitfalls: [
          'Failing to serve notices to added interested parties.'
        ]
      }
    ]
  }
];

export interface LawComparisonProfile {
  id: string;
  lawIdA: string;
  lawIdB: string;
  title: string;
  category: string;
  summary: string;
  keySimilarities: string[];
  keyDifferences: string[];
  provisionMatrix: {
    aspect: string;
    lawAProvision: string;
    lawBProvision: string;
  }[];
}

export const LAW_COMPARISON_PRESETS: LawComparisonProfile[] = [
  {
    id: 'penal-code-vs-crpc',
    lawIdA: 'bd-penal-code-1860',
    lawIdB: 'bd-crpc-1898',
    title: 'The Penal Code, 1860 vs. Code of Criminal Procedure, 1898',
    category: 'Criminal Law & Procedure',
    summary: 'A foundational comparative study between substantive criminal definitions (what is a crime and what penalty attaches) versus procedural enforcement (how police investigate, make arrests, grant bail, and conduct trials).',
    keySimilarities: [
      'Both statutes operate in tandem as the twin pillars of Bangladesh criminal jurisprudence.',
      'Both trace their statutory roots to British-Indian codification and were preserved via the Laws Continuance Enforcement Order 1972.',
      'Cross-referencing: Every charge framed in CrPC trial courts corresponds to specific punitive sections under the Penal Code.'
    ],
    keyDifferences: [
      'Substantive vs. Procedural: The Penal Code defines crimes and punishments; the CrPC establishes the investigative machinery, police powers, and court hierarchies.',
      'Statutory Scope: Penal Code contains 511 sections focused on mens rea and liability; CrPC contains 565 sections detailing warrants, bail, and judicial separation.'
    ],
    provisionMatrix: [
      {
        aspect: 'Primary Legal Function',
        lawAProvision: 'Defines substantive crimes (murder, theft, cheating, assault) and prescribes maximum penalties.',
        lawBProvision: 'Prescribes procedural steps: FIR registration, arrest without warrant, remand, bail, and trial dockets.'
      },
      {
        aspect: 'Role of Intention (Mens Rea)',
        lawAProvision: 'Core element: Crime requires proving guilty intention or knowledge under Sections 299/300/378.',
        lawBProvision: 'Procedural focus: Evaluates reasonable suspicion and prima facie evidence for arrest under Section 54.'
      },
      {
        aspect: 'Liberty & Custody Controls',
        lawAProvision: 'Prescribes final prison terms, rigorous labor, life terms, or capital punishment upon conviction.',
        lawBProvision: 'Regulates pre-trial custody: 24-hour magistrate production (Sec 61), Remand limits (Sec 167), and Bail (Sec 497).'
      }
    ]
  },
  {
    id: 'udhr-vs-iccpr',
    lawIdA: 'int-udhr-1948',
    lawIdB: 'int-iccpr-1966',
    title: 'Universal Declaration of Human Rights (1948) vs. ICCPR (1966)',
    category: 'Human Rights',
    summary: 'A comparative analysis of the moral declaration that birthed modern international human rights law versus the legally binding multilateral treaty establishing treaty body enforcement.',
    keySimilarities: [
      'Both guarantee inviolable rights to life, liberty, fair trial, freedom of thought, conscience, religion, and speech.',
      'Both prohibit arbitrary detention, torture, cruel/inhuman punishment, and retroactive criminal penalization.'
    ],
    keyDifferences: [
      'Legal Force: UDHR is a General Assembly Declaration (customary/soft law); ICCPR is a legally binding multilateral treaty subject to state ratification.',
      'Enforcement Body: UDHR has no independent judicial committee; ICCPR is monitored by the United Nations Human Rights Committee.'
    ],
    provisionMatrix: [
      {
        aspect: 'Legal Character',
        lawAProvision: 'Non-binding aspirational declaration adopted by UNGA Resolution 217A (1948).',
        lawBProvision: 'Binding international treaty requiring periodic state compliance reports and individual communications.'
      },
      {
        aspect: 'Emergency Derogations',
        lawAProvision: 'Does not formulate explicit wartime or state of emergency derogation clauses.',
        lawBProvision: 'Article 4 strictly regulates public emergency derogations, specifying non-derogable rights (torture, life).'
      },
      {
        aspect: 'Institutional Oversight',
        lawAProvision: 'Universal moral standard referenced by international tribunals and national courts.',
        lawBProvision: 'Monitored by the 18-member independent UN Human Rights Committee in Geneva.'
      }
    ]
  },
  {
    id: 'bd-constitution-vs-udhr',
    lawIdA: 'bd-constitution-1972',
    lawIdB: 'int-udhr-1948',
    title: 'Constitution of Bangladesh (1972) vs. Universal Declaration of Human Rights (1948)',
    category: 'Constitutional & Human Rights',
    summary: 'Comparative synthesis of how universal human rights norms were codified into justiciable, court-enforceable Fundamental Rights under Part III and Article 102 of the Bangladesh Constitution.',
    keySimilarities: [
      'Equality before law: Article 27 of Bangladesh Constitution mirrors Article 7 of UDHR.',
      'Protection of life and personal liberty: Articles 31 & 32 reflect UDHR Articles 3 & 9.',
      'Freedom of speech and expression: Article 39 reflects UDHR Article 19.'
    ],
    keyDifferences: [
      'Direct Judicial Enforceability: Fundamental Rights in the BD Constitution can be directly enforced via High Court Writs; UDHR requires domestic incorporation.',
      'Reasonable Restrictions: The BD Constitution explicitly qualifies free speech with constitutional public order and state security exceptions.'
    ],
    provisionMatrix: [
      {
        aspect: 'Constitutional Status',
        lawAProvision: 'Supreme Law of the Republic (Article 7); any inconsistent statute is null and void.',
        lawBProvision: 'Universal human rights declaration accepted as customary international law.'
      },
      {
        aspect: 'Remedy for Breach',
        lawAProvision: 'Direct petition to Supreme Court High Court Division under Article 102 (Habeas Corpus, Mandamus).',
        lawBProvision: 'International moral pressure, Universal Periodic Review (UPR), and diplomatic reporting.'
      }
    ]
  },
  {
    id: 'bd-environment-vs-paris-agreement',
    lawIdA: 'bd-environment-act-1995',
    lawIdB: 'int-paris-agreement-2015',
    title: 'Bangladesh Environment Conservation Act, 1995 vs. Paris Climate Agreement (2015)',
    category: 'Environmental Law',
    summary: 'Comparing national domestic pollution control and statutory clearance mandates with multilateral global greenhouse gas emission targets and climate finance obligations.',
    keySimilarities: [
      'Both aim to safeguard ecological integrity and prevent irreversible damage to vulnerable ecosystems.',
      'Both incorporate the precautionary principle and polluter-pays accountability doctrines.'
    ],
    keyDifferences: [
      'Local Compliance vs. Global Targets: BECA 1995 handles factory clearance (ECC) and local hill-cutting; Paris Agreement targets global temperature rise (1.5°C/2°C) and NDCs.',
      'Remedies: BECA 1995 imposes criminal penalties and fines in Environment Courts; Paris Agreement relies on the Global Stocktake transparency mechanism.'
    ],
    provisionMatrix: [
      {
        aspect: 'Regulatory Scope',
        lawAProvision: 'Regulates local industrial effluents, vehicle emissions, plastic bans, and Ecologically Critical Areas (ECAs).',
        lawBProvision: 'Governs global greenhouse gas emission reductions through Nationally Determined Contributions (NDCs).'
      },
      {
        aspect: 'Enforcement Mechanism',
        lawAProvision: 'Environment Courts with statutory powers to shut down factories and impose up to 10-year prison terms.',
        lawBProvision: 'Multilateral compliance committee (Article 15) and 5-year Global Stocktake review cycles.'
      }
    ]
  }
];

export const ROADMAP_DATA = {
  currentVersion: 'v1.0 (Launch Foundation)',
  currentFeatures: [
    { title: 'International Laws Library', description: 'Curated repository of foundational treaties, declarations, and customary international law frameworks.', status: 'live' },
    { title: 'Bangladesh Laws Library', description: 'Substantive & procedural statutes including Penal Code, Constitution, CrPC, Cyber Security, and Labour Act.', status: 'live' },
    { title: 'Intelligent Search & Autocomplete', description: 'Real-time multi-attribute search across laws, section numbers, Bangla titles, and keywords.', status: 'live' },
    { title: 'AI Legal Explanations & Summarizer', description: 'Server-side AI models converting complex legal jargon into understandable plain English and Bangla.', status: 'live' },
    { title: 'Legal Outcome Guide', description: 'Educational step-by-step procedural frameworks for criminal reporting, bail, and constitutional writs.', status: 'live' },
    { title: 'Legal Glossary & Pronunciation', description: 'Interactive directory of key legal terms, Latin maxims, and definitions with examples.', status: 'live' },
    { title: 'Citation Generator & Clean Reading View', description: 'Standard, Academic, and Bluebook legal citation exports with distraction-free reading mode.', status: 'live' },
    { title: 'Dual Light & Dark Theme System', description: 'Persisted high-contrast typography and accessibility optimized color palette.', status: 'live' }
  ],
  plannedFeatures: [
    { title: 'Clause-by-Clause Law Comparison Tool', description: 'Side-by-side comparative analysis between international treaty standards and national legal implementations.', releaseTarget: 'v1.2 (Next Update)' },
    { title: 'Interactive Legislative Timeline Engine', description: 'Visual interactive slider showing section-level amendments and historic substitution notes.', releaseTarget: 'v1.3' },
    { title: 'Official PDF Document Generator', description: 'One-click authenticated legal document rendering with watermark and citation metadata.', releaseTarget: 'v1.4' },
    { title: 'Audio Legal Narration', description: 'Text-to-speech legal section reading in both Bangla and English for visual accessibility.', releaseTarget: 'v1.5' }
  ],
  futureExpansions: [
    {
      title: 'Jurisdiction Expansion Phase 1',
      countries: ['United States (Federal & State Codes)', 'United Kingdom (Acts of Parliament & Common Law)', 'European Union (Directives & Regulations)', 'Germany (BGB & Basic Law)'],
      description: 'Comprehensive cross-border legal search and comparative jurisprudence across western legal systems.'
    },
    {
      title: 'Jurisdiction Expansion Phase 2',
      countries: ['France (Code Civil)', 'Italy', 'Japan (Six Codes)', 'South Korea', 'United Arab Emirates (Commercial & Civil Codes)'],
      description: 'Civil law and Asian economic hub legal systems integration.'
    },
    {
      title: 'World Law Navigator',
      description: 'Interactive global globe interface allowing visual exploration and cross-border treaty ratification maps.'
    },
    {
      title: 'User Portals, Folders & Research Bookmarks',
      description: 'Encrypted personal research workspaces, highlight annotations, custom case notebooks, and exportable bibliographies.'
    },
    {
      title: 'Advanced AI Research & Case Law Matcher',
      description: 'Automated legal precedent matching, comparative statutory gap analysis, and judicial interpretation summarizers.'
    }
  ]
};

export interface EnrichedLawItem extends LawItem {
  status: 'Active' | 'Amended' | 'Repealed' | 'Draft' | 'In Force' | 'Active Treaty';
  sourceReliabilityStatus: SourceReliabilityStatus;
  contentQualityStatus: ContentQualityStatus;
  publishingAuthority: string;
  effectiveDate: string;
  publicationDate: string;
  lastUpdatedDate: string;
  officialSource: string;
  sourceOrganization: string;
  sourceVerificationUrl: string;
  simpleSummary: string;
  explainLike15: string;
  totalStatutorySectionsCount: number;
  isCuratedSubset: boolean;
  aiSummary: {
    overview: string;
    keyConcepts: string[];
    importantPoints: string[];
    practicalTakeaway: string;
  };
  fullOfficialTextExcerpt: string;
  timeline: LawTimelineEvent[];
  relatedLawIds: string[];
  citations: {
    standard: string;
    academic: string;
    bluebook: string;
    apa: string;
    mla: string;
    chicago: string;
  };
}

export function getEnrichedLaw(id: string): EnrichedLawItem | null {
  if (!id) return null;
  const cleanId = id.trim().toLowerCase();
  const baseLaw = LAWS_DATABASE.find(
    (l) =>
      l.id.toLowerCase() === cleanId ||
      l.slug.toLowerCase() === cleanId ||
      l.id.replace(/^(bd-|int-|uk-|us-)/, '').toLowerCase() === cleanId ||
      l.slug.replace(/^(bd-|int-)/, '').toLowerCase() === cleanId
  );
  
  if (!baseLaw) return null;
  
  // Guarantee all fields are present
  return {
    ...baseLaw,
    totalStatutorySectionsCount: baseLaw.totalStatutorySectionsCount || baseLaw.sections.length,
    isCuratedSubset: baseLaw.isCuratedSubset ?? true,
    status: (baseLaw.status || 'Active') as any,
    sourceReliabilityStatus: baseLaw.sourceReliabilityStatus || (baseLaw.jurisdiction === 'Bangladesh' ? 'Official Government Source' : 'Official Treaty Source'),
    contentQualityStatus: baseLaw.contentQualityStatus || 'Verified',
    publishingAuthority: baseLaw.publishingAuthority || baseLaw.sourceOrganization || (baseLaw.jurisdiction === 'Bangladesh' ? 'Legislative and Parliamentary Affairs Division, Ministry of Law' : 'United Nations Secretariat / Treaty Section'),
    effectiveDate: baseLaw.effectiveDate || `${baseLaw.enactmentYear}`,
    publicationDate: baseLaw.publicationDate || `${baseLaw.enactmentYear}`,
    lastUpdatedDate: baseLaw.lastUpdatedDate || (baseLaw.lastAmendedYear ? `${baseLaw.lastAmendedYear}` : `${baseLaw.enactmentYear}`),
    officialSource: baseLaw.officialSource || (baseLaw.jurisdiction === 'Bangladesh' ? 'Bangladesh Code, Legislative & Parliamentary Affairs Division, Dhaka' : 'United Nations Treaty Series (UNTS) / International Legal Repository'),
    sourceOrganization: baseLaw.sourceOrganization || (baseLaw.jurisdiction === 'Bangladesh' ? 'Ministry of Law, Justice & Parliamentary Affairs, Government of Bangladesh' : 'United Nations Treaty Collection / International Depository'),
    sourceVerificationUrl: baseLaw.sourceVerificationUrl || (baseLaw.jurisdiction === 'Bangladesh' ? 'http://bdlaws.minlaw.gov.bd' : 'https://treaties.un.org'),
    simpleSummary: baseLaw.simpleSummary || baseLaw.overview,
    explainLike15: baseLaw.explainLike15 || baseLaw.simpleSummary || 'A high-school friendly summary explaining the purpose of this law in everyday terms without difficult legal words.',
    fullOfficialTextExcerpt: baseLaw.fullOfficialTextExcerpt || baseLaw.overview,
    timeline: baseLaw.timeline && baseLaw.timeline.length > 0 ? baseLaw.timeline : [
      {
        year: `${baseLaw.enactmentYear}`,
        title: 'Original Parliamentary Enactment',
        description: `Passed and codified into the official statutory law of ${baseLaw.jurisdiction}.`,
        status: 'enacted'
      },
      {
        year: `${baseLaw.lastAmendedYear || baseLaw.enactmentYear}`,
        title: 'Current Validated Text & Amendments',
        description: 'Current verified text incorporated into the Nyayota legal research library.',
        status: 'active'
      }
    ],
    relatedLawIds: baseLaw.relatedLawIds || [],
    aiSummary: baseLaw.aiSummary || {
      overview: baseLaw.simpleSummary || baseLaw.overview,
      keyConcepts: baseLaw.keyHighlights || ['Statutory legality', 'Rule of law', 'Public accountability'],
      importantPoints: [
        `Enacted in ${baseLaw.enactmentYear} as a key pillar of ${baseLaw.jurisdiction} jurisprudence.`,
        `Governs ${baseLaw.category} with binding statutory force across its legal domain.`,
        `Provides procedural safeguards and dispute resolution remedies for citizens and institutions.`
      ],
      practicalTakeaway: `Anyone navigating ${baseLaw.category.toLowerCase()} issues must comply with these statutory requirements to ensure legal protection and prevent sanctions.`
    },
    citations: {
      standard: baseLaw.citations?.standard || `${baseLaw.title}, ${baseLaw.enactmentYear}`,
      academic: baseLaw.citations?.academic || `${baseLaw.title} (${baseLaw.enactmentYear}), Nyayota Legal Library.`,
      bluebook: baseLaw.citations?.bluebook || `${baseLaw.title}, ${baseLaw.enactmentYear} (${baseLaw.jurisdictionCode || 'BD'}).`,
      apa: baseLaw.citations?.apa || `${baseLaw.title}. (${baseLaw.enactmentYear}). ${baseLaw.officialSource || 'Government Press'}.`,
      mla: baseLaw.citations?.mla || `"${baseLaw.title}." ${baseLaw.jurisdiction} Legal Code, ${baseLaw.enactmentYear}. Nyayota Platform.`,
      chicago: baseLaw.citations?.chicago || `${baseLaw.title} (${baseLaw.enactmentYear}). ${baseLaw.officialSource || 'Official Gazette'}.`
    }
  };
}

export function getAllEnrichedLaws(): EnrichedLawItem[] {
  return LAWS_DATABASE.map((l) => getEnrichedLaw(l.id)!).filter(Boolean);
}

// ----------------------------------------------------
// LAW RECOMMENDATIONS ENGINE (Prompt 04)
// ----------------------------------------------------

export function getLawRecommendations(currentLawId: string, limit: number = 3): LawItem[] {
  const currentLaw = LAWS_DATABASE.find((l) => l.id === currentLawId);
  if (!currentLaw) return LAWS_DATABASE.slice(0, limit);

  // Score candidate laws
  const scored = LAWS_DATABASE.filter((l) => l.id !== currentLawId).map((candidate) => {
    let score = 0;

    // Explicitly linked in relatedLawIds
    if (currentLaw.relatedLawIds?.includes(candidate.id)) {
      score += 10;
    }

    // Matching category
    if (candidate.category === currentLaw.category) {
      score += 5;
    }

    // Matching jurisdiction
    if (candidate.jurisdiction === currentLaw.jurisdiction) {
      score += 3;
    }

    // Overlapping keywords
    const commonKeywords = candidate.keywords.filter((kw) =>
      currentLaw.keywords.some((ckw) => ckw.toLowerCase() === kw.toLowerCase())
    );
    score += commonKeywords.length * 2;

    return { law: candidate, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((s) => s.law);
}

// ----------------------------------------------------
// POPULAR SEARCHES & TRENDING TOPICS (Prompt 04)
// ----------------------------------------------------

export interface PopularSearchItem {
  id: string;
  query: string;
  queryBn?: string;
  category: string;
  countLabel: string;
  type: 'statute' | 'section' | 'topic' | 'concept';
  targetHref: string;
}

export const POPULAR_SEARCHES_DATA: PopularSearchItem[] = [
  {
    id: 'ps-1',
    query: 'Penal Code Section 300',
    queryBn: 'দণ্ডবিধি ধারা ৩০০',
    category: 'Criminal Law',
    countLabel: '14.2k searches',
    type: 'section',
    targetHref: '/law/bd-penal-code-1860?section=Section+300'
  },
  {
    id: 'ps-2',
    query: 'Cyber Security Act Defamation',
    queryBn: 'সাইবার সুরক্ষা আইন ও মানহানি',
    category: 'Cyber & Digital',
    countLabel: '12.8k searches',
    type: 'topic',
    targetHref: '/law/bd-cyber-security-2023'
  },
  {
    id: 'ps-3',
    query: 'Article 102 Writ Jurisdiction',
    queryBn: 'অনুচ্ছেদ ১০২ রিট আবেদন',
    category: 'Constitutional Law',
    countLabel: '11.5k searches',
    type: 'section',
    targetHref: '/law/bd-constitution-1972?section=Article+102'
  },
  {
    id: 'ps-4',
    query: 'Arrest without warrant Section 54',
    queryBn: 'বিনা পরোয়ানায় গ্রেপ্তার ধারা ৫৪',
    category: 'Criminal Procedure',
    countLabel: '9.7k searches',
    type: 'section',
    targetHref: '/law/bd-crpc-1898?section=Section+54'
  },
  {
    id: 'ps-5',
    query: 'Breach of Commercial Contract',
    queryBn: 'চুক্তি ভঙ্গ ও ক্ষতিপূরণ',
    category: 'Commercial Law',
    countLabel: '8.4k searches',
    type: 'topic',
    targetHref: '/law/bd-contract-act-1872'
  },
  {
    id: 'ps-6',
    query: 'Universal Declaration of Human Rights',
    queryBn: 'মানবাধিকার সার্বজনীন ঘোষণাপত্র',
    category: 'Human Rights',
    countLabel: '7.9k searches',
    type: 'statute',
    targetHref: '/law/int-udhr-1948'
  },
  {
    id: 'ps-7',
    query: 'Labor Act Maternity & Gratuity',
    queryBn: 'শ্রম আইন মাতৃত্বকালীন সুবিধা',
    category: 'Labor Law',
    countLabel: '6.5k searches',
    type: 'topic',
    targetHref: '/law/bd-labor-act-2006'
  },
  {
    id: 'ps-8',
    query: 'Habeas Corpus & Unlawful Detention',
    queryBn: 'হেবিয়াস কর্পাস ও বেআইনি আটক',
    category: 'Constitutional Law',
    countLabel: '6.1k searches',
    type: 'concept',
    targetHref: '/concepts#concept-habeas-corpus'
  }
];

// ----------------------------------------------------
// LEGAL CONCEPTS ENCYCLOPEDIA (Prompt 04)
// ----------------------------------------------------

export interface LegalConcept {
  id: string;
  slug: string;
  name: string;
  nameBn: string;
  latinName?: string;
  category: 'Criminal Law' | 'Civil Law' | 'Constitutional Law' | 'Evidence & Procedure' | 'Commercial & Contract';
  definition: string;
  simpleExplanation: string;
  explainLike15: string;
  courtroomExample: string;
  relatedStatuteIds: string[];
  relatedConcepts: string[];
  keyElements: string[];
}

export const LEGAL_CONCEPTS_DATA: LegalConcept[] = [
  {
    id: 'concept-negligence',
    slug: 'negligence',
    name: 'Negligence & Duty of Care',
    nameBn: 'অবহেলা ও সতর্কতার দায়িত্ব',
    latinName: 'Culpa',
    category: 'Civil Law',
    definition: 'A failure to behave with the level of care that a person of ordinary prudence would have exercised under the same circumstances.',
    simpleExplanation: 'When someone acts carelessly, ignoring their basic responsibility to avoid harming others, resulting in foreseeable injury or financial loss.',
    explainLike15: 'Imagine driving while texting and crashing into a neighbor parked bicycle. You did not intend to crash, but because you were careless when you should have paid attention, you are legally responsible to pay for the damage.',
    courtroomExample: 'A building developer fails to install mandatory scaffolding safety nets, and falling debris injures a pedestrian. The court holds the developer liable for tortious negligence.',
    relatedStatuteIds: ['bd-penal-code-1860', 'bd-contract-act-1872'],
    relatedConcepts: ['Strict Liability', 'Vicarious Liability', 'Damages', 'Causation'],
    keyElements: ['Existence of a legal Duty of Care', 'Breach of that duty by defendant', 'Direct Causation of harm', 'Actual measurable damage or loss']
  },
  {
    id: 'concept-mens-rea',
    slug: 'mens-rea',
    name: 'Mens Rea (Guilty Mind)',
    nameBn: 'অপরাধমূলক মানসিকতা',
    latinName: 'Actus non facit reum nisi mens sit rea',
    category: 'Criminal Law',
    definition: 'The mental element of a person\'s intention to commit a crime; or knowledge that one\'s action or lack of action would cause a crime to be committed.',
    simpleExplanation: 'An act alone does not make a person guilty unless their mind was also guilty. Criminal law usually requires proving both the physical crime and wrongful intention.',
    explainLike15: 'If you take an identical black umbrella by accident from a restaurant rack thinking it is yours, you do not have Mens Rea (no crime). If you knew it was not yours and took it to keep it, you have Mens Rea (theft).',
    courtroomExample: 'In a homicide trial under Penal Code Section 300, the prosecution must prove beyond reasonable doubt that the accused intended to cause bodily injury likely to cause death.',
    relatedStatuteIds: ['bd-penal-code-1860', 'bd-crpc-1898'],
    relatedConcepts: ['Actus Reus', 'Intention', 'Recklessness', 'Criminal Negligence'],
    keyElements: ['Intentional conduct', 'Knowledge of consequences', 'Reckless disregard of danger', 'Absence of bona fide mistake']
  },
  {
    id: 'concept-habeas-corpus',
    slug: 'habeas-corpus',
    name: 'Habeas Corpus (Produce the Body)',
    nameBn: 'হেবিয়াস কর্পাস (বেআইনি আটকের বিরুদ্ধে রিট)',
    latinName: 'Habeas Corpus Ad Subjiciendum',
    category: 'Constitutional Law',
    definition: 'A fundamental prerogative writ issued by a superior court commanding an authority who has another person in custody to bring them before the court to determine the legality of detention.',
    simpleExplanation: 'The ultimate constitutional shield against unlawful arrest or secret police detention. The High Court forces the state to immediately bring the detainee to court or release them.',
    explainLike15: 'If police secretly lock someone in a room without presenting them to a magistrate within 24 hours, their family can file a Habeas Corpus petition. The High Court judges will order the police: "Bring this person to court immediately and prove your legal authority, or let them walk free today."',
    courtroomExample: 'Under Article 102(2)(b)(i) of the Bangladesh Constitution, a citizen unlawfully held without charge is ordered released immediately by the High Court Division.',
    relatedStatuteIds: ['bd-constitution-1972', 'bd-crpc-1898', 'int-iccpr-1966'],
    relatedConcepts: ['Due Process', 'Ultra Vires', 'Fundamental Rights', 'Judicial Review'],
    keyElements: ['Actual physical detention or custody', 'Lack of valid statutory authority or procedure', 'Urgent High Court jurisdiction', 'Immediate release order if detention is illegal']
  },
  {
    id: 'concept-breach-of-contract',
    slug: 'breach-of-contract',
    name: 'Breach of Contract & Liquidated Damages',
    nameBn: 'চুক্তি ভঙ্গ ও ক্ষতিপূরণ',
    latinName: 'Pacta Sunt Servanda',
    category: 'Commercial & Contract',
    definition: 'A violation of any binding agreement, promise, or covenant, by non-performance or interference with the other contracting party\'s performance.',
    simpleExplanation: 'When one party fails to perform their side of a legally binding promise without a valid legal excuse, entitling the innocent party to compensation or specific enforcement.',
    explainLike15: 'You pay a web designer $500 to build your website by Friday. Friday arrives, they refuse to deliver the code and keep your money. They have breached the contract, and you can demand your money back plus any business loss.',
    courtroomExample: 'Under Section 73 of the Contract Act 1872, an export company sues a logistics supplier for failing to ship perishable cargo on agreed dates, recovering compensation for lost market sales.',
    relatedStatuteIds: ['bd-contract-act-1872'],
    relatedConcepts: ['Specific Performance', 'Quantum Meruit', 'Injunction', 'Consideration'],
    keyElements: ['Valid enforceable contract with consideration', 'Performance obligations fulfilled by claimant', 'Failure or repudiation by defendant', 'Measurable commercial loss']
  },
  {
    id: 'concept-strict-liability',
    slug: 'strict-liability',
    name: 'Strict & Absolute Liability',
    nameBn: 'চরম দায়বদ্ধতা (কঠোর দায়)',
    latinName: 'Rylands v. Fletcher Doctrine',
    category: 'Civil Law',
    definition: 'Legal responsibility for damages or injury, even if the person or corporation was not negligent, fault-free, or acted without malicious intent.',
    simpleExplanation: 'Liability imposed on dangerous activities (like handling toxic chemicals or wild explosives). Even if you took every imaginable precaution, if it escapes and hurts someone, you must pay.',
    explainLike15: 'If a chemical factory owner stores dangerous explosive gas and an earthquake causes a tiny leak that damages nearby homes, the factory owner must pay for the damage even though they were careful. The danger was so high that they bear absolute responsibility.',
    courtroomExample: 'Industrial gas leak cases where the Supreme Court rules that enterprises engaged in inherently hazardous activities have an absolute and non-delegable duty to indemnify all victims.',
    relatedStatuteIds: ['bd-penal-code-1860', 'bd-contract-act-1872'],
    relatedConcepts: ['Tort Liability', 'Public Nuisance', 'Environmental Justice', 'Duty of Care'],
    keyElements: ['Bringing inherently hazardous substance onto land', 'Non-natural use of property', 'Escape of the hazardous element', 'Consequent damage to person or property']
  },
  {
    id: 'concept-ultra-vires',
    slug: 'ultra-vires',
    name: 'Ultra Vires (Beyond the Powers)',
    nameBn: 'ক্ষমতাবহির্ভূত কাজ (আল্ট্রা ভাইয়ার্স)',
    latinName: 'Ultra Vires',
    category: 'Constitutional Law',
    definition: 'An act done beyond the scope of legal power, authority, or statutory jurisdiction granted to an officer, administrative agency, or corporation.',
    simpleExplanation: 'When a government official, board, or minister makes a rule or decision they had no legal authority to make. The court strikes it down as completely void and null.',
    explainLike15: 'Imagine your school traffic guard tries to issue you a fine for not doing your math homework. They have no legal authority over homework, so their order is "Ultra Vires" (powerless) and you do not have to obey it.',
    courtroomExample: 'A municipal council passes a by-law banning imported books. The High Court strikes it down under Article 102 as Ultra Vires the Municipalities Act.',
    relatedStatuteIds: ['bd-constitution-1972'],
    relatedConcepts: ['Judicial Review', 'Natural Justice', 'Rule of Law', 'Subordinate Legislation'],
    keyElements: ['Statute establishing bounded authority', 'Exercise of decision beyond those bounds', 'Nullity of resulting decision', 'Judicial declaration of invalidity']
  },
  {
    id: 'concept-res-judicata',
    slug: 'res-judicata',
    name: 'Res Judicata (A Matter Already Judged)',
    nameBn: 'রেস জুডিকাটা (বিচারিত বিষয়)',
    latinName: 'Res Judicata Pro Veritate Accipitur',
    category: 'Evidence & Procedure',
    definition: 'A matter that has been adjudicated by a competent court and may not be pursued further by the same parties involving the same cause of action.',
    simpleExplanation: 'Prevents endless lawsuits over the same dispute. Once a final decision is delivered after hearing both sides, neither party can sue again on the exact same facts.',
    explainLike15: 'If your landlord sues you claiming you didn\'t pay rent for June, and the court looks at bank receipts and rules you paid in full, your landlord cannot sue you again next week for the same June rent. The case is finished forever.',
    courtroomExample: 'Under Section 11 of the Civil Procedure Code 1908, a second partition lawsuit between the same heirs over previously partitioned land is dismissed.',
    relatedStatuteIds: ['bd-crpc-1898', 'bd-cpc-1908', 'bd-constitution-1972'],
    relatedConcepts: ['Double Jeopardy', 'Estoppel', 'Finality of Judgments', 'Limitation'],
    keyElements: ['Former suit between same parties or representatives', 'Matter directly and substantially in issue', 'Court of competent jurisdiction', 'Final hearing and decision on merits']
  },
  {
    id: 'concept-arbitration',
    slug: 'arbitration',
    name: 'Arbitration & Alternate Dispute Resolution (ADR)',
    nameBn: 'সালিশি ও বিকল্প বিরোধ নিষ্পত্তি',
    latinName: 'Compromissum',
    category: 'Commercial & Contract',
    definition: 'A private procedure for the settlement of disputes by one or more impartial arbitral judges chosen by the parties whose binding award is enforceable by courts.',
    simpleExplanation: 'Resolving business or international contract fights outside lengthy court trials using an agreed neutral expert. Faster, confidential, and globally enforceable.',
    explainLike15: 'Instead of spending 6 years in court arguing about a software delivery milestone, two companies hire a neutral senior tech lawyer for a 3-day private hearing. Whatever the arbitrator decides is final and legally binding.',
    courtroomExample: 'Two multinational shipping companies arbitrate a breach under international maritime arbitration rules, and enforce the arbitral award in local high court.',
    relatedStatuteIds: ['bd-contract-act-1872', 'int-cisg-1980'],
    relatedConcepts: ['Mediation', 'Enforcement of Foreign Awards', 'Arbitral Tribunal', 'Jurisdiction'],
    keyElements: ['Written arbitration agreement', 'Appointment of neutral tribunal', 'Principles of natural justice', 'Final and binding arbitral award']
  },
  {
    id: 'concept-due-process',
    slug: 'due-process',
    name: 'Due Process of Law',
    nameBn: 'যথাযথ আইনি প্রক্রিয়া (ডিউ প্রসেস অব ল)',
    latinName: 'Per Legem Terrae',
    category: 'Constitutional Law',
    definition: 'A fundamental constitutional guarantee that all legal proceedings will be fair, that one will be given notice and an opportunity to be heard before government deprives life, liberty, or property.',
    simpleExplanation: 'The government cannot arbitrarily punish you, freeze your bank account, or seize your house without following clear, pre-established fair rules, proper notice, and an independent judge.',
    explainLike15: 'Before the school suspends a student based on a rumor, the principal must tell the student the exact accusation, show the evidence, and give the student a chance to explain their side. That fair process is Due Process.',
    courtroomExample: 'Under Article 31 & 32 of the Constitution of Bangladesh, executive action taken without affording the citizen statutory notice and a fair hearing is quashed for violating due process of law.',
    relatedStatuteIds: ['bd-constitution-1972', 'int-iccpr-1966', 'int-udhr-1948'],
    relatedConcepts: ['Natural Justice', 'Habeas Corpus', 'Rule of Law', 'Equal Protection'],
    keyElements: ['Advance notice of charges or intended action', 'Impartial adjudicator or tribunal', 'Opportunity to present defense and cross-examine', 'Reasoned judicial decision based on evidence']
  },
  {
    id: 'concept-jurisdiction',
    slug: 'jurisdiction',
    name: 'Jurisdiction & Judicial Competence',
    nameBn: 'আদালতের এখতিয়ার ও বিচারিক সক্ষমতা',
    latinName: 'Jurisdictio',
    category: 'Evidence & Procedure',
    definition: 'The official power, legal authority, and geographic or subject-matter scope of a court or tribunal to hear and determine a lawsuit or legal dispute.',
    simpleExplanation: 'The specific boundary of what a court is authorized to judge. If a family court tries to issue a murder conviction, or a local magistrate rules on foreign maritime borders, they lack jurisdiction and the ruling is invalid.',
    explainLike15: 'A referee for a basketball match cannot run onto a neighboring football pitch and blow their whistle to give a red card. Every referee has their specific court, just like every judge has their jurisdiction.',
    courtroomExample: 'Under Section 9 and 15-20 of the Code of Civil Procedure 1908, a civil plaint filed in a district where neither the defendant resides nor the disputed property is situated is returned for lack of territorial jurisdiction.',
    relatedStatuteIds: ['bd-crpc-1898', 'bd-constitution-1972', 'int-unclos-1982'],
    relatedConcepts: ['Locus Standi', 'Ultra Vires', 'Territorial Competence', 'Subject Matter Jurisdiction'],
    keyElements: ['Territorial jurisdiction over geographic limits', 'Pecuniary jurisdiction over financial claim limits', 'Subject-matter authority granted by parent statute', 'Personal jurisdiction over the parties']
  },
  {
    id: 'concept-liability',
    slug: 'liability',
    name: 'Legal Liability & Vicarious Responsibility',
    nameBn: 'আইনি দায় ও প্রতিনিধিত্বমূলক দায়',
    latinName: 'Qui Facit Per Alium Facit Per Se',
    category: 'Civil Law',
    definition: 'The state of being legally bound, responsible, or obligated to compensate for damages resulting from civil wrongs, breaches of contract, or statutory violations, including liability for acts of agents.',
    simpleExplanation: 'Legal accountability: when you or your company must legally pay for harm caused. Under vicarious liability, an employer is also responsible if their employee causes damage while doing their job.',
    explainLike15: 'If a delivery driver employed by a logistics company hits a pedestrian while rushing on a scheduled delivery route, the logistics company is vicariously liable to pay medical damages because the driver was acting on company business.',
    courtroomExample: 'In a workplace compensation suit, the High Court holds the corporate factory owner jointly and severally liable with the contractor for safety breaches under labor statutes.',
    relatedStatuteIds: ['bd-penal-code-1860', 'bd-labor-act-2006', 'bd-contract-act-1872'],
    relatedConcepts: ['Strict Liability', 'Negligence', 'Joint Liability', 'Damages & Indemnity'],
    keyElements: ['Existence of legal obligation or master-servant relationship', 'Act committed within the course of employment/agency', 'Direct causal nexus to claimant injury', 'Statutory or common-law indemnity obligations']
  },
  {
    id: 'concept-contract-consideration',
    slug: 'contract-consideration',
    name: 'Contract & Lawful Consideration',
    nameBn: 'চুক্তি ও বৈধ প্রতিদান',
    latinName: 'Quid Pro Quo (Pacta Sunt Servanda)',
    category: 'Commercial & Contract',
    definition: 'The essential element of an enforceable contract consisting of something of value given by both parties to induce them to enter into the agreement.',
    simpleExplanation: 'A valid contract is not just a one-sided promise. There must be an exchange of value ("something for something"), such as money paid in exchange for software, services, or goods.',
    explainLike15: 'If a friend casually says "I will gift you my bike tomorrow" but you give nothing in return, you cannot sue them if they change their mind. But if you agreed to pay $50 for the bike and gave them the deposit, it is an enforceable contract with valid consideration.',
    courtroomExample: 'Under Section 2(d) and Section 25 of the Contract Act 1872, an agreement made without consideration is void, unless registered as a gift between near relations.',
    relatedStatuteIds: ['bd-contract-act-1872', 'int-cisg-1980'],
    relatedConcepts: ['Breach of Contract', 'Specific Performance', 'Privity of Contract', 'Free Consent'],
    keyElements: ['Offer and unconditional acceptance', 'Lawful consideration moving between parties', 'Competency of contracting parties', 'Lawful object and absence of coercion']
  },
  {
    id: 'concept-presumption-innocence',
    slug: 'presumption-of-innocence',
    name: 'Presumption of Innocence & Burden of Proof',
    nameBn: 'নির্দোষতার আইনি অনুমান ও প্রমাণের দায়',
    latinName: 'Ei Incumbit Probatio Qui Dicit, Non Qui Negat',
    category: 'Criminal Law',
    definition: 'The universal principle that an accused person is presumed innocent until proven guilty beyond reasonable doubt according to law by the prosecution.',
    simpleExplanation: 'You do not have to prove you are innocent. The state and police must bring solid, convincing evidence proving your guilt beyond any reasonable doubt before a court can convict you.',
    explainLike15: 'If someone points at you and accuses you of taking their watch, the police cannot throw you in jail and demand you prove you were elsewhere. The accuser and police must bring timestamped video or forensic proof that you took it.',
    courtroomExample: 'Under Article 14(2) of ICCPR and Evidence Act 1872, where any reasonable doubt remains in the prosecution case, the benefit of doubt is awarded to the accused as a matter of fundamental right.',
    relatedStatuteIds: ['bd-penal-code-1860', 'bd-crpc-1898', 'int-iccpr-1966', 'int-udhr-1948'],
    relatedConcepts: ['Mens Rea', 'Due Process', 'Standard of Proof', 'Right to Silence'],
    keyElements: ['Presumption of innocence from initial arrest through verdict', 'Prosecution bears exclusive burden of proof', 'Standard of proof beyond reasonable doubt in criminal trials', 'Accused cannot be compelled to testify against themselves']
  },
  {
    id: 'concept-natural-justice',
    slug: 'natural-justice',
    name: 'Principles of Natural Justice (Audi Alteram Partem)',
    nameBn: 'প্রাকৃতিক ন্যায়বিচারের মূলনীতি (উভয় পক্ষের বক্তব্য শ্রবণ)',
    latinName: 'Audi Alteram Partem & Nemo Judex In Causa Sua',
    category: 'Constitutional Law',
    definition: 'Fundamental procedural rules of fair play: the right to be heard by an unbiased decision maker and that no person shall judge their own case.',
    simpleExplanation: 'Two supreme rules of justice: 1. Always hear both sides before deciding. 2. A judge or official with a personal financial or family stake in a dispute can never be the judge in that dispute.',
    explainLike15: 'A teacher whose own child is competing in an essay contest cannot be the sole judge grading the essays, and they cannot disqualify another student without letting them speak.',
    courtroomExample: 'Under Article 102, the High Court sets aside an administrative dismissal of a public servant because the inquiry committee never gave the employee a copy of the complaint or an opportunity to defend.',
    relatedStatuteIds: ['bd-constitution-1972', 'bd-crpc-1898'],
    relatedConcepts: ['Due Process', 'Ultra Vires', 'Judicial Review', 'Right to a Fair Trial'],
    keyElements: ['Audi Alteram Partem (Hear the other side with sufficient notice)', 'Nemo Judex In Causa Sua (Rule against personal or pecuniary bias)', 'Duty to give reasons for administrative decisions', 'Fair, transparent hearing procedures']
  }
];

// ----------------------------------------------------
// SCALABLE GLOBAL JURISDICTIONS ARCHITECTURE (Prompt 07)
// ----------------------------------------------------

export interface JurisdictionInfo {
  id: string;
  name: string;
  nativeName: string;
  code: string;
  flagEmoji: string;
  region: string;
  status: 'Active Repository' | 'Codification in Progress' | 'Upcoming';
  systemType:
    | 'Common Law'
    | 'Civil Law'
    | 'International Law'
    | 'Hybrid System'
    | 'Civil Law / Supranational'
    | 'Civil Law / Islamic Law / Financial Free Zone Common Law (DIFC/ADGM)'
    | 'Civil Law / Hybrid';
  totalStatutesCount: number;
  featuredStatutes: string[];
  officialGazetteName: string;
  apexCourt: string;
  description: string;
}

export const JURISDICTIONS_DATA: JurisdictionInfo[] = [
  {
    id: 'bangladesh',
    name: 'Bangladesh',
    nativeName: 'গণপ্রজাতন্ত্রী বাংলাদেশ',
    code: 'BD',
    flagEmoji: '🇧🇩',
    region: 'South Asia',
    status: 'Active Repository',
    systemType: 'Common Law',
    totalStatutesCount: 12,
    featuredStatutes: ['The Penal Code 1860', 'The Constitution of Bangladesh 1972', 'Code of Criminal Procedure 1898', 'Cyber Security Act 2023'],
    officialGazetteName: 'The Bangladesh Gazette (বাংলাদেশ গেজেট)',
    apexCourt: 'Supreme Court of Bangladesh (Appellate Division & High Court Division)',
    description: 'Fully indexed statutory repository with dual English-Bengali codified texts, Section-level plain language explainers, and High Court writ analysis.'
  },
  {
    id: 'international',
    name: 'International Law',
    nativeName: 'International Legal Frameworks',
    code: 'INT',
    flagEmoji: '🌐',
    region: 'Global / Multilateral',
    status: 'Active Repository',
    systemType: 'International Law',
    totalStatutesCount: 8,
    featuredStatutes: ['Universal Declaration of Human Rights (UDHR)', 'Geneva Conventions (I-IV)', 'Paris Climate Agreement 2015', 'UN Convention on Contracts (CISG 1980)'],
    officialGazetteName: 'United Nations Treaty Series (UNTS)',
    apexCourt: 'International Court of Justice (ICJ) & International Criminal Court (ICC)',
    description: 'Key multilateral conventions, human rights treaties, international humanitarian accords, and UNCITRAL commercial conventions.'
  },
  {
    id: 'united-states',
    name: 'United States',
    nativeName: 'United States of America',
    code: 'US',
    flagEmoji: '🇺🇸',
    region: 'North America',
    status: 'Codification in Progress',
    systemType: 'Common Law',
    totalStatutesCount: 0,
    featuredStatutes: ['U.S. Constitution (1787)', 'Title 18 U.S. Code (Crimes)', 'Federal Rules of Civil Procedure (FRCP)', 'Uniform Commercial Code (UCC)'],
    officialGazetteName: 'Federal Register / United States Code (U.S.C.)',
    apexCourt: 'Supreme Court of the United States (SCOTUS)',
    description: 'Federal statutory framework, constitutional amendments, and interstate uniform commercial acts.'
  },
  {
    id: 'united-kingdom',
    name: 'United Kingdom',
    nativeName: 'United Kingdom of Great Britain and Northern Ireland',
    code: 'UK',
    flagEmoji: '🇬🇧',
    region: 'Europe',
    status: 'Codification in Progress',
    systemType: 'Common Law',
    totalStatutesCount: 0,
    featuredStatutes: ['Human Rights Act 1998', 'Data Protection Act 2018 (UK GDPR)', 'Sale of Goods Act 1979', 'Constitutional Reform Act 2005'],
    officialGazetteName: 'The London Gazette / UK Legislation Database',
    apexCourt: 'Supreme Court of the United Kingdom',
    description: 'Acts of Parliament, UK unwritten constitutional conventions, and common law precedent structures.'
  },
  {
    id: 'european-union',
    name: 'European Union',
    nativeName: 'European Union',
    code: 'EU',
    flagEmoji: '🇪🇺',
    region: 'Europe',
    status: 'Codification in Progress',
    systemType: 'Civil Law / Supranational',
    totalStatutesCount: 0,
    featuredStatutes: ['General Data Protection Regulation (GDPR)', 'Treaty on European Union (TEU / Lisbon)', 'EU AI Act (2024)', 'Digital Services Act (DSA)'],
    officialGazetteName: 'Official Journal of the European Union (OJEU)',
    apexCourt: 'Court of Justice of the European Union (CJEU)',
    description: 'Directives, EU Regulations, and supranational digital rights frameworks.'
  },
  {
    id: 'germany',
    name: 'Germany',
    nativeName: 'Bundesrepublik Deutschland',
    code: 'DE',
    flagEmoji: '🇩🇪',
    region: 'Western Europe',
    status: 'Upcoming',
    systemType: 'Civil Law',
    totalStatutesCount: 0,
    featuredStatutes: ['Basic Law (Grundgesetz)', 'German Civil Code (BGB)', 'German Criminal Code (StGB)', 'German Commercial Code (HGB)'],
    officialGazetteName: 'Bundesgesetzblatt (BGBl.)',
    apexCourt: 'Federal Constitutional Court (Bundesverfassungsgericht)',
    description: 'Civil law codified statutes, constitutional rights jurisprudence, and European harmonization.'
  },
  {
    id: 'france',
    name: 'France',
    nativeName: 'République française',
    code: 'FR',
    flagEmoji: '🇫🇷',
    region: 'Western Europe',
    status: 'Upcoming',
    systemType: 'Civil Law',
    totalStatutesCount: 0,
    featuredStatutes: ['French Civil Code (Code civil / Napoleonic Code)', 'French Penal Code (Code pénal)', 'Declaration of the Rights of Man 1789'],
    officialGazetteName: 'Journal Officiel de la République Française (JORF / Légifrance)',
    apexCourt: 'Court of Cassation & Constitutional Council (Conseil constitutionnel)',
    description: 'Codified Napoleonic civil law heritage and administrative jurisprudence.'
  },
  {
    id: 'italy',
    name: 'Italy',
    nativeName: 'Repubblica Italiana',
    code: 'IT',
    flagEmoji: '🇮🇹',
    region: 'Southern Europe',
    status: 'Upcoming',
    systemType: 'Civil Law',
    totalStatutesCount: 0,
    featuredStatutes: ['Costituzione della Repubblica Italiana (1947)', 'Codice Civile (Civil Code 1942)', 'Codice Penale'],
    officialGazetteName: 'Gazzetta Ufficiale della Repubblica Italiana',
    apexCourt: 'Corte Suprema di Cassazione & Corte Costituzionale',
    description: 'Italian constitutional protections and statutory codifications.'
  },
  {
    id: 'japan',
    name: 'Japan',
    nativeName: '日本国 (Nihon-koku)',
    code: 'JP',
    flagEmoji: '🇯🇵',
    region: 'East Asia',
    status: 'Upcoming',
    systemType: 'Civil Law / Hybrid',
    totalStatutesCount: 0,
    featuredStatutes: ['Constitution of Japan (1947)', 'Six Codes of Japan (Roppō)', 'Civil Code (Minpō)', 'Personal Information Protection Act (APPI)'],
    officialGazetteName: 'Kanpō (Official Gazette of Japan)',
    apexCourt: 'Supreme Court of Japan (最高裁判所)',
    description: 'Six Codes framework and Asian privacy & corporate law principles.'
  },
  {
    id: 'south-korea',
    name: 'South Korea',
    nativeName: '대한민국 (Daehan Minguk)',
    code: 'KR',
    flagEmoji: '🇰🇷',
    region: 'East Asia',
    status: 'Upcoming',
    systemType: 'Civil Law',
    totalStatutesCount: 0,
    featuredStatutes: ['Constitution of the Republic of Korea', 'Personal Information Protection Act (PIPA)', 'Criminal Act of Korea'],
    officialGazetteName: 'Gwanbo (Official Gazette of the Republic of Korea)',
    apexCourt: 'Constitutional Court of Korea & Supreme Court of Korea',
    description: 'Constitutional jurisprudence and technology compliance statutes.'
  },
  {
    id: 'united-arab-emirates',
    name: 'United Arab Emirates',
    nativeName: 'الإمارات العربية المتحدة',
    code: 'AE',
    flagEmoji: '🇦🇪',
    region: 'Middle East',
    status: 'Upcoming',
    systemType: 'Civil Law / Islamic Law / Financial Free Zone Common Law (DIFC/ADGM)',
    totalStatutesCount: 0,
    featuredStatutes: ['Federal Decree-Law on Commercial Transactions', 'Federal Law on Personal Status', 'DIFC Court Laws & Arbitration Regulations'],
    officialGazetteName: 'UAE Federal Official Gazette',
    apexCourt: 'Federal Supreme Court of the United Arab Emirates',
    description: 'Dual civil and common-law free-zone arbitration jurisprudence.'
  }
];

// ----------------------------------------------------
// KNOWLEDGE PATHS LEARNING ENGINE (Prompt 04)
// ----------------------------------------------------

export interface KnowledgePathMilestone {
  id: string;
  stepNumber: number;
  title: string;
  titleBn: string;
  durationMinutes: number;
  summary: string;
  keyStatutes: { lawId: string; title: string; section?: string }[];
  takeaways: string[];
  selfCheckQuestion: string;
  selfCheckAnswer: string;
}

export interface KnowledgePath {
  id: string;
  slug: string;
  title: string;
  titleBn: string;
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  totalTimeEstimate: string;
  milestonesCount: number;
  iconName: string;
  colorTheme: string;
  milestones: KnowledgePathMilestone[];
}

export const KNOWLEDGE_PATHS_DATA: KnowledgePath[] = [
  {
    id: 'path-cyber-law',
    slug: 'cyber-law-fundamentals',
    title: 'Cyber Law & Digital Rights in Practice',
    titleBn: 'সাইবার আইন ও ডিজিটাল অধিকার রূপরেখা',
    description: 'Master digital evidence, online defamation safeguards, data privacy principles, and computer system offenses.',
    level: 'Beginner',
    category: 'Cyber & Digital',
    totalTimeEstimate: '45 mins',
    milestonesCount: 4,
    iconName: 'Shield',
    colorTheme: 'blue',
    milestones: [
      {
        id: 'cl-1',
        stepNumber: 1,
        title: 'Unauthorized Computer System Access & Hacking',
        titleBn: 'কম্পিউটার সিস্টেমে অননুমোদিত প্রবেশ ও হ্যাকিং',
        durationMinutes: 10,
        summary: 'Understanding legal definitions of critical information infrastructure, illegal intrusion, and denial-of-service attacks.',
        keyStatutes: [
          { lawId: 'cyber-security-act-2023', title: 'Cyber Security Act 2023', section: 'Section 17-19' }
        ],
        takeaways: [
          'Accessing a password-protected server without authorization is a statutory crime even without data theft.',
          'Critical Information Infrastructure (CII) attacks attract heightened mandatory sentences.'
        ],
        selfCheckQuestion: 'Can an employee log into a colleague\'s email using their saved password without permission?',
        selfCheckAnswer: 'No. Accessing an account without explicit authorization is illegal computer intrusion regardless of intent.'
      },
      {
        id: 'cl-2',
        stepNumber: 2,
        title: 'Online Defamation, False Information & Digital Identity',
        titleBn: 'অনলাইনে মানহানি, ভুয়া তথ্য ও পরিচয় জালিয়াতি',
        durationMinutes: 12,
        summary: 'How codified statutes distinguish fair comment from malicious electronic character assassination and identity spoofing.',
        keyStatutes: [
          { lawId: 'bd-cyber-security-2023', title: 'Cyber Security Act 2023', section: 'Section 24-25' },
          { lawId: 'bd-penal-code-1860', title: 'Penal Code 1860', section: 'Section 499-500' }
        ],
        takeaways: [
          'Digital defamation requires proving publication to third parties and reputational harm.',
          'Spoofing social media profiles to deceive the public constitutes electronic impersonation.'
        ],
        selfCheckQuestion: 'What is the key difference between civil defamation and criminal cyber defamation?',
        selfCheckAnswer: 'Civil defamation seeks financial damages; criminal cyber defamation involves state prosecution and statutory imprisonment.'
      },
      {
        id: 'cl-3',
        stepNumber: 3,
        title: 'Digital Forensic Evidence & Chain of Custody',
        titleBn: 'ডিজিটাল ফরেনসিক সাক্ষ্য ও প্রমাণ সংরক্ষণ',
        durationMinutes: 11,
        summary: 'Requirements for screenshots, server logs, hash values, and forensic mirrors to be admissible in a court of law.',
        keyStatutes: [
          { lawId: 'bd-crpc-1898', title: 'Code of Criminal Procedure 1898', section: 'Section 103' }
        ],
        takeaways: [
          'Raw screenshots can be contested as forged unless backed by server logs or forensic notary certification.',
          'The forensic chain of custody must document who seized, stored, and analyzed digital media.'
        ],
        selfCheckQuestion: 'Why is a bare screenshot rarely sufficient in high-stakes cyber trials?',
        selfCheckAnswer: 'Because image files can be manipulated; courts require metadata, server logs, or cryptographic hashes to verify integrity.'
      },
      {
        id: 'cl-4',
        stepNumber: 4,
        title: 'Remedies for Cyber Harassment & Extortion',
        titleBn: 'সাইবার হেনস্তা ও ব্ল্যাকমেইলের বিরুদ্ধে আইনি প্রতিকার',
        durationMinutes: 12,
        summary: 'Emergency reporting channels, cyber police complaints, search warrants, and High Court writ protections.',
        keyStatutes: [
          { lawId: 'bd-cyber-security-2023', title: 'Cyber Security Act 2023', section: 'Section 28' },
          { lawId: 'bd-constitution-1972', title: 'Constitution of Bangladesh', section: 'Article 102' }
        ],
        takeaways: [
          'Victims of electronic extortion can file direct police complaints or approach specialized cyber tribunals.',
          'High Court writs can mandate internet service providers to remove non-consensual imagery.'
        ],
        selfCheckQuestion: 'Where can a victim of cyber extortion file a first information report (FIR)?',
        selfCheckAnswer: 'At any local police station or specialized Cyber Crime Investigation Division.'
      }
    ]
  },
  {
    id: 'path-constitution',
    slug: 'constitution-and-fundamental-rights',
    title: 'Constitutional Law & Fundamental Rights Mastery',
    titleBn: 'সংবিধান ও মৌলিক অধিকার পাঠশালা',
    description: 'Learn the supreme law framework, Part III fundamental rights, equality before law, and Article 102 High Court writs.',
    level: 'Intermediate',
    category: 'Constitutional Law',
    totalTimeEstimate: '50 mins',
    milestonesCount: 4,
    iconName: 'Scale',
    colorTheme: 'amber',
    milestones: [
      {
        id: 'const-1',
        stepNumber: 1,
        title: 'Supremacy of the Constitution & Separation of Powers',
        titleBn: 'সংবিধানের সর্বোচ্চ প্রাধান্য ও ক্ষমতার পৃথকীকরণ',
        durationMinutes: 12,
        summary: 'Article 7 supremacy principle: any law inconsistent with the Constitution is void to the extent of inconsistency.',
        keyStatutes: [
          { lawId: 'bd-constitution-1972', title: 'Constitution of Bangladesh', section: 'Article 7' }
        ],
        takeaways: [
          'Parliament cannot pass statutes violating fundamental basic constitutional provisions.',
          'Judiciary acts as the ultimate guardian and interpreter of constitutional legitimacy.'
        ],
        selfCheckQuestion: 'What happens if a new parliament act contradicts Article 27 of the Constitution?',
        selfCheckAnswer: 'The judiciary declares the conflicting parts null, void, and of no legal effect.'
      },
      {
        id: 'const-2',
        stepNumber: 2,
        title: 'Equality Before Law & Non-Discrimination (Part III)',
        titleBn: 'আইনের দৃষ্টিতে সমতা ও বৈষম্যহীনতা (তৃতীয় ভাগ)',
        durationMinutes: 14,
        summary: 'Detailed study of Article 27 (Equality), Article 31 (Protection of Law), and Article 32 (Right to Life and Liberty).',
        keyStatutes: [
          { lawId: 'bd-constitution-1972', title: 'Constitution of Bangladesh', section: 'Articles 27, 31, 32' },
          { lawId: 'int-udhr-1948', title: 'Universal Declaration of Human Rights', section: 'Articles 1-3' }
        ],
        takeaways: [
          'Every citizen is entitled to equal protection of law without arbitrary state discrimination.',
          'No person can be deprived of life or personal liberty except in accordance with established fair law.'
        ],
        selfCheckQuestion: 'Can the government arbitrarily freeze an individual\'s passport without statutory process?',
        selfCheckAnswer: 'No; Article 31 and Article 36 protect freedom of movement and right to fair statutory procedure.'
      },
      {
        id: 'const-3',
        stepNumber: 3,
        title: 'Freedom of Speech, Assembly & Association',
        titleBn: 'বাক-স্বাধীনতা, সমাবেশ ও সংগঠনের অধিকার',
        durationMinutes: 12,
        summary: 'Balancing constitutional freedoms under Article 39 with reasonable restrictions imposed in interests of public order.',
        keyStatutes: [
          { lawId: 'bd-constitution-1972', title: 'Constitution of Bangladesh', section: 'Articles 37-39' },
          { lawId: 'int-iccpr-1966', title: 'International Covenant on Civil and Political Rights', section: 'Article 19' }
        ],
        takeaways: [
          'Freedom of speech includes freedom of the press and public critique of governance.',
          'Restrictions on speech must be reasonable, statutory, and strictly proportional to legitimate state interests.'
        ],
        selfCheckQuestion: 'Are constitutional rights to speech absolute and unrestricted in every scenario?',
        selfCheckAnswer: 'No, they are subject to reasonable restrictions by law for security, public decency, or contempt of court.'
      },
      {
        id: 'const-4',
        stepNumber: 4,
        title: 'Enforcing Rights via Article 102 Writs (High Court)',
        titleBn: 'অনুচ্ছেদ ১০২ অনুযায়ী রিট পিটিশন ও সাংবিধানিক প্রতিকার',
        durationMinutes: 12,
        summary: 'Mastering the five classical writs: Mandamus, Prohibition, Certiorari, Habeas Corpus, and Quo Warranto.',
        keyStatutes: [
          { lawId: 'bd-constitution-1972', title: 'Constitution of Bangladesh', section: 'Article 102' }
        ],
        takeaways: [
          'Writ of Mandamus compels a public official to perform a mandatory statutory duty.',
          'Writ of Certiorari quashes unlawful administrative or lower-court proceedings.',
          'Writ of Habeas Corpus orders production of unlawfully detained persons.'
        ],
        selfCheckQuestion: 'Which writ is used when a public officer refuses to issue a mandatory trade license required by statute?',
        selfCheckAnswer: 'A Writ of Mandamus to direct the public official to perform their statutory duty.'
      }
    ]
  },
  {
    id: 'path-criminal-justice',
    slug: 'criminal-justice-and-procedural-safeguards',
    title: 'Criminal Justice & Procedural Safeguards',
    titleBn: 'ফৌজদারি বিচার ও প্রক্রিয়াগত সুরক্ষা',
    description: 'Explore offenses, police arrest powers, bailable vs non-bailable standards, first information reports (FIR), and trials.',
    level: 'Beginner',
    category: 'Criminal Law',
    totalTimeEstimate: '40 mins',
    milestonesCount: 3,
    iconName: 'Shield',
    colorTheme: 'red',
    milestones: [
      {
        id: 'crim-1',
        stepNumber: 1,
        title: 'Understanding Offenses: Culpability & Penalties',
        titleBn: 'অপরাধের প্রকারভেদ: দায়বদ্ধতা ও দণ্ড',
        durationMinutes: 14,
        summary: 'How the Penal Code 1860 structures offenses against person (murder, assault) and property (theft, extortion, cheating).',
        keyStatutes: [
          { lawId: 'bd-penal-code-1860', title: 'Penal Code 1860', section: 'Sections 299, 300, 378, 415' }
        ],
        takeaways: [
          'Theft requires dishonest taking of movable property out of possession without consent.',
          'Cheating requires fraudulent inducement leading to property transfer or financial harm.'
        ],
        selfCheckQuestion: 'Is taking an item with honest belief of ownership considered criminal theft?',
        selfCheckAnswer: 'No, because dishonest intention (Mens Rea) is an essential missing ingredient.'
      },
      {
        id: 'crim-2',
        stepNumber: 2,
        title: 'Police Arrest Powers & Section 54 Safeguards',
        titleBn: 'পুলিশের গ্রেপ্তার ক্ষমতা ও ধারা ৫৪ সংক্রান্ত নির্দেশিকা',
        durationMinutes: 14,
        summary: 'Limits on warrantless arrest, mandatory 24-hour magistrate presentation, and Supreme Court arrest guidelines.',
        keyStatutes: [
          { lawId: 'bd-crpc-1898', title: 'Code of Criminal Procedure 1898', section: 'Section 54, 61' },
          { lawId: 'bd-constitution-1972', title: 'Constitution of Bangladesh', section: 'Article 33' }
        ],
        takeaways: [
          'Police must produce any arrested person before a judicial magistrate within 24 hours of arrest.',
          'Detainees have the immediate constitutional right to consult a legal counsel of their choice.'
        ],
        selfCheckQuestion: 'Can police keep an arrested suspect in station lockup for 48 hours without court permission?',
        selfCheckAnswer: 'No; Article 33 and Section 61 strictly limit warrantless detention to 24 hours maximum.'
      },
      {
        id: 'crim-3',
        stepNumber: 3,
        title: 'Bail Standards, FIR Filing & Fair Trial Rights',
        titleBn: 'জামিন নীতি, এজাহার দায়ের ও ন্যায়বিচারের অধিকার',
        durationMinutes: 12,
        summary: 'Bailable offenses (matter of right) vs Non-bailable offenses (judicial discretion), anticipatory bail, and presumption of innocence.',
        keyStatutes: [
          { lawId: 'bd-crpc-1898', title: 'Code of Criminal Procedure 1898', section: 'Section 496, 497' },
          { lawId: 'bd-constitution-1972', title: 'Constitution of Bangladesh', section: 'Article 35' }
        ],
        takeaways: [
          'In bailable offenses, release on bail is a statutory right upon furnishing surety.',
          'Accused is presumed innocent until guilt is established beyond reasonable doubt in court.'
        ],
        selfCheckQuestion: 'Is bail guaranteed in non-bailable offenses?',
        selfCheckAnswer: 'No; bail in non-bailable offenses is subject to judicial discretion based on evidence gravity.'
      }
    ]
  }
];

// ----------------------------------------------------
// LEGAL OUTCOME SCENARIOS MATRIX (Prompt 04)
// ----------------------------------------------------

export interface LegalOutcomeScenario {
  id: string;
  jurisdiction: 'Bangladesh' | 'International';
  legalArea: string;
  topicTitle: string;
  topicTitleBn: string;
  scenarioSummary: string;
  scenarioSummaryBn?: string;
  applicableStatutes: { lawId: string; title: string; section: string; explanation: string }[];
  proceduralClassification: {
    cognizableStatus: 'Cognizable (Arrest without warrant)' | 'Non-Cognizable (Warrant required)';
    bailStatus: 'Bailable as of right' | 'Non-Bailable (Court discretion)' | 'Compoundable with permission';
    trialCourt: string;
    filingMechanism: 'First Information Report (FIR) at Thana' | 'Complaint Case (CR) before Magistrate' | 'Civil Suit in District Court';
  };
  statutoryConsequences: {
    potentialPenalties: string[];
    civilRemedies: string[];
  };
  outcomeFactors: {
    aggravating: string[];
    mitigating: string[];
  };
  evidentiaryRequirements: string[];
  proceduralSteps: { step: number; title: string; description: string }[];
}

export const LEGAL_OUTCOME_SCENARIOS_DATA: LegalOutcomeScenario[] = [
  {
    id: 'scenario-cyber-extortion',
    jurisdiction: 'Bangladesh',
    legalArea: 'Cyber & Digital Law',
    topicTitle: 'Cyber Blackmail, Data Extortion & Non-Consensual Media',
    topicTitleBn: 'সাইবার ব্ল্যাকমেইল, তথ্য হাতিয়ে চাঁদা দাবি ও আপত্তিকর ছবি ছড়ানো',
    scenarioSummary: 'An individual threatens to leak confidential private photos, personal data, or server credentials unless a financial ransom is paid.',
    scenarioSummaryBn: 'কোনো ব্যক্তি গোপন ছবি বা পাসওয়ার্ড ইন্টারনেটে ছড়িয়ে দেওয়ার হুমকি দিয়ে অর্থ দাবি করলে প্রযোজ্য আইনি ফলাফল।',
    applicableStatutes: [
      {
        lawId: 'bd-cyber-security-2023',
        title: 'Cyber Security Act 2023',
        section: 'Section 24 & 28',
        explanation: 'Criminalizes electronic identity spoofing, hacking, and cyber extortion with strict non-bailable prison terms.'
      },
      {
        lawId: 'bd-penal-code-1860',
        title: 'Penal Code 1860',
        section: 'Section 383 & 384',
        explanation: 'Defines Extortion (putting any person in fear of injury and dishonestly inducing them to deliver property).'
      }
    ],
    proceduralClassification: {
      cognizableStatus: 'Cognizable (Arrest without warrant)',
      bailStatus: 'Non-Bailable (Court discretion)',
      trialCourt: 'Cyber Tribunal / Special Sessions Judge',
      filingMechanism: 'First Information Report (FIR) at Thana'
    },
    statutoryConsequences: {
      potentialPenalties: [
        'Imprisonment up to 5 to 7 years for electronic extortion and unauthorized digital transmission.',
        'Heavy statutory monetary fines payable to the state or victim.',
        'Confiscation of computers, hard drives, and mobile devices used in the offense.'
      ],
      civilRemedies: [
        'Mandatory injunctive order forcing internet service providers and platforms to permanently delete media.',
        'Civil damages suit for defamation and mental harassment.'
      ]
    },
    outcomeFactors: {
      aggravating: [
        'Targeting a minor or vulnerable individual.',
        'Demanding large financial sums or repeat harassment over extended duration.',
        'Distribution of compromised data to public social media groups.'
      ],
      mitigating: [
        'Immediate surrender of all digital files without public distribution.',
        'First-time juvenile offender acting under bad peer influence.',
        'Full cooperation with digital forensic investigators.'
      ]
    },
    evidentiaryRequirements: [
      'Preserved chat transcripts, email headers, or WhatsApp communication with timestamps.',
      'Server IP connection logs and digital transaction IDs if money was transferred.',
      'Forensic device mirror certified by government cyber forensic laboratory.'
    ],
    proceduralSteps: [
      { step: 1, title: 'Preserve Evidence Immediately', description: 'Do not delete chat logs; capture full screenshots with visible timestamps and URLs.' },
      { step: 2, title: 'Lodge FIR / Cyber Police Complaint', description: 'File a formal complaint with Cyber Crime Investigation Division or local Thana.' },
      { step: 3, title: 'Magistrate Seizure & Forensic Audit', description: 'Police obtain warrant to seize offender devices and extract raw memory images.' },
      { step: 4, title: 'Cyber Tribunal Trial', description: 'Formal charge sheet submission followed by fast-track trial and verdict.' }
    ]
  },
  {
    id: 'scenario-theft-fraud',
    jurisdiction: 'Bangladesh',
    legalArea: 'Criminal Law',
    topicTitle: 'Theft & Fraudulent Misappropriation of Property',
    topicTitleBn: 'চুরি ও প্রতারণামূলকভাবে সম্পত্তি আত্মসাৎ',
    scenarioSummary: 'An employee or stranger dishonestly takes physical inventory, funds, or assets without the owner\'s consent.',
    scenarioSummaryBn: 'অনুমতি ছাড়া অসদুপায়ে অন্যের মালামাল বা অর্থ হস্তগত করার আইনি ফলাফল।',
    applicableStatutes: [
      {
        lawId: 'bd-penal-code-1860',
        title: 'Penal Code 1860',
        section: 'Section 378, 379 & 408',
        explanation: 'Defines Theft (3 years imprisonment) and Criminal Breach of Trust by Clerk/Servant (up to 7 years imprisonment).'
      },
      {
        lawId: 'bd-crpc-1898',
        title: 'Code of Criminal Procedure 1898',
        section: 'Schedule II & Section 497',
        explanation: 'Sets Cognizability, non-bailable status for higher offenses, and compounding rules.'
      }
    ],
    proceduralClassification: {
      cognizableStatus: 'Cognizable (Arrest without warrant)',
      bailStatus: 'Non-Bailable (Court discretion)',
      trialCourt: 'Chief Judicial Magistrate / Metropolitan Magistrate',
      filingMechanism: 'First Information Report (FIR) at Thana'
    },
    statutoryConsequences: {
      potentialPenalties: [
        'Imprisonment for a term which may extend to 3 years (simple theft) or 7 years (breach of trust by clerk).',
        'Mandatory criminal fine alongside imprisonment.'
      ],
      civilRemedies: [
        'Restitution order for the immediate recovery and return of seized goods to rightful owner.'
      ]
    },
    outcomeFactors: {
      aggravating: [
        'Theft involving house-breaking during nighttime or use of deadly weapons.',
        'High monetary valuation or breach of fiduciary office trust.',
        'Prior criminal conviction record (recidivism).'
      ],
      mitigating: [
        'Voluntary restitution and returning stolen items before charge framing.',
        'Extreme poverty or duress without physical violence.',
        'Plea bargain / compounding with the victim with court permission.'
      ]
    },
    evidentiaryRequirements: [
      'CCTV video footage or eyewitness testimony establishing physical removal.',
      'Purchase receipts proving ownership and value of missing property.',
      'Recovery memo prepared by police during search and seizure.'
    ],
    proceduralSteps: [
      { step: 1, title: 'Lodge FIR at Local Thana', description: 'State exact description and serial numbers of missing property.' },
      { step: 2, title: 'Police Investigation & Seizure', description: 'Investigating Officer conducts raids and issues recovery seizure list.' },
      { step: 3, title: 'Bail Hearing at Magistrate Court', description: 'Court assesses severity of offense and flight risk before granting bail.' },
      { step: 4, title: 'Trial & Judgment', description: 'Witness examination, cross-examination, and judicial sentencing.' }
    ]
  },
  {
    id: 'scenario-commercial-contract-breach',
    jurisdiction: 'Bangladesh',
    legalArea: 'Commercial & Contract Law',
    topicTitle: 'Commercial Breach of Contract & Non-Payment',
    topicTitleBn: 'ব্যবসায়িক চুক্তি ভঙ্গ ও অর্থ অনাদায়',
    scenarioSummary: 'A supplier delivers raw materials or software services as agreed, but the buyer refuses to make payment citing unverified defects.',
    scenarioSummaryBn: 'চুক্তি অনুযায়ী পণ্য বা সেবা সরবরাহের পর অর্থ পরিশোধে অস্বীকৃতির আইনি প্রতিকার।',
    applicableStatutes: [
      {
        lawId: 'bd-contract-act-1872',
        title: 'Contract Act 1872',
        section: 'Section 73 & 74',
        explanation: 'Provides that the party who suffers by breach is entitled to receive compensation for any loss or damage caused to them.'
      }
    ],
    proceduralClassification: {
      cognizableStatus: 'Non-Cognizable (Warrant required)',
      bailStatus: 'Bailable as of right',
      trialCourt: 'Joint District Judge (Civil Jurisdiction) / Commercial Bench',
      filingMechanism: 'Civil Suit in District Court'
    },
    statutoryConsequences: {
      potentialPenalties: [
        'No direct criminal imprisonment (pure civil contract dispute unless deliberate fraud/cheating is proven).'
      ],
      civilRemedies: [
        'Money decree for full invoice principal amount plus statutory interest from due date.',
        'Liquidated damages for proven commercial opportunity loss.',
        'Attachment of defaulting company bank accounts to satisfy judgment.'
      ]
    },
    outcomeFactors: {
      aggravating: [
        'Intentional bad-faith repudiation after consuming the goods.',
        'Dishonored payment cheques (triggers additional criminal action under Negotiable Instruments Act Section 138).'
      ],
      mitigating: [
        'Genuine technical dispute regarding non-conforming product specifications.',
        'Willingness to submit to neutral arbitration or mediation.'
      ]
    },
    evidentiaryRequirements: [
      'Signed agreement, purchase orders, and accepted delivery challans.',
      'Invoices, tax returns, and email acknowledgment of receipt.',
      'Formal legal notice sent via registered post with acknowledgment due (AD).'
    ],
    proceduralSteps: [
      { step: 1, title: 'Serve Statutory Legal Notice', description: 'Give 15 to 30 days demand notice demanding outstanding dues.' },
      { step: 2, title: 'Arbitration / Mediation Attempt', description: 'Invoke contractual ADR clauses for rapid settlement.' },
      { step: 3, title: 'File Money Suit in Civil Court', description: 'Submit plaint with court fee and documentation in competent District Court.' },
      { step: 4, title: 'Execution Proceedings', description: 'Enforce civil money decree through attachment of defendant property.' }
    ]
  },
  {
    id: 'scenario-unlawful-arrest',
    jurisdiction: 'Bangladesh',
    legalArea: 'Constitutional Law',
    topicTitle: 'Unlawful Police Detention & Lack of 24-Hour Production',
    topicTitleBn: 'বেআইনি পুলিশি আটক ও ২৪ ঘণ্টার মধ্যে আদালতে হাজির না করা',
    scenarioSummary: 'A citizen is detained by law enforcement officers without formal warrant and held in secret custody past 24 hours without court presentation.',
    scenarioSummaryBn: 'পরোয়ানা ছাড়া আটক করে ২৪ ঘণ্টার মধ্যে ম্যাজিস্ট্রেটের সামনে হাজির না করার বিরুদ্ধে সাংবিধানিক প্রতিকার।',
    applicableStatutes: [
      {
        lawId: 'bd-constitution-1972',
        title: 'Constitution of Bangladesh',
        section: 'Article 32, 33 & 102',
        explanation: 'Mandates production before nearest magistrate within 24 hours and guarantees Habeas Corpus writ remedy.'
      },
      {
        lawId: 'bd-crpc-1898',
        title: 'Code of Criminal Procedure 1898',
        section: 'Section 61 & 167',
        explanation: 'Forbids police custody beyond 24 hours without explicit written judicial remand order.'
      }
    ],
    proceduralClassification: {
      cognizableStatus: 'Cognizable (Arrest without warrant)',
      bailStatus: 'Bailable as of right',
      trialCourt: 'High Court Division (Supreme Court of Bangladesh)',
      filingMechanism: 'Complaint Case (CR) before Magistrate'
    },
    statutoryConsequences: {
      potentialPenalties: [
        'Departmental proceedings and criminal prosecution against offending officers under Penal Code for wrongful confinement.'
      ],
      civilRemedies: [
        'Writ of Habeas Corpus ordering immediate release of detainee.',
        'High Court award of constitutional damages/compensation for violation of fundamental rights.'
      ]
    },
    outcomeFactors: {
      aggravating: [
        'Physical torture or denial of medical treatment in custody.',
        'Falsifying arrest logs or claiming arrest at a later date.'
      ],
      mitigating: [
        'Immediate rectification upon notice and lawful presentation before magistrate.'
      ]
    },
    evidentiaryRequirements: [
      'Affidavit from family members stating time and place of abduction/detention.',
      'CCTV recordings from detention location or eye-witness statements.',
      'GD (General Diary) copy lodged at local police station inquiring about missing relative.'
    ],
    proceduralSteps: [
      { step: 1, title: 'Lodge GD and Inquire at Thana', description: 'Document missing person status and identify detaining agency.' },
      { step: 2, title: 'Draft Emergency Writ of Habeas Corpus', description: 'Advocate on Record files urgent petition in High Court Division under Article 102.' },
      { step: 3, title: 'High Court Rule Nisi & Production Order', description: 'Bench orders police chief to produce detainee in courtroom within designated hours.' },
      { step: 4, title: 'Release & Inquiry', description: 'Detainee released if detention was unlawful; inquiry ordered into offending officers.' }
    ]
  }
];

// ============================================================================
// ARCHITECTURE RE-EXPORTS & SCALABLE REPOSITORY ENGINE
// ============================================================================

export * from './architecture';
import {
  LegalQueryOptions,
  ScalableQueryResult,
  STATUTORY_AMENDMENT_RECORDS,
  StatutoryAmendmentRecord,
  CONCEPT_RELATIONAL_GRAPH,
  ConceptRelationalNode,
} from './architecture';

/**
 * Scalable multi-field weighted search and faceted filter engine
 */
export function queryLawsScalable(options: LegalQueryOptions = {}): ScalableQueryResult<LawItem> {
  const {
    query = '',
    jurisdictionCode = 'All',
    categorySlug = 'All',
    status = 'All',
    sortBy = 'relevance',
    limit = 50,
    offset = 0,
  } = options;

  const normalizedQuery = query.trim().toLowerCase();
  const tokens = normalizedQuery.split(/\s+/).filter(Boolean);

  // 1. Facet trackers
  const byJurisdiction: Record<string, number> = {};
  const byCategory: Record<string, number> = {};
  const byStatus: Record<string, number> = {};

  // 2. Filter & Score
  const scoredItems: { item: LawItem; score: number }[] = [];

  for (const law of LAWS_DATABASE) {
    // Tally facets across whole collection
    byJurisdiction[law.jurisdictionCode] = (byJurisdiction[law.jurisdictionCode] || 0) + 1;
    byCategory[law.category] = (byCategory[law.category] || 0) + 1;
    byStatus[law.status] = (byStatus[law.status] || 0) + 1;

    // Apply Jurisdiction filter
    if (jurisdictionCode !== 'All' && law.jurisdictionCode !== jurisdictionCode) {
      continue;
    }

    // Apply Category filter
    if (categorySlug !== 'All') {
      const matchCat = law.category.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      const targetCat = categorySlug.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      if (!matchCat.includes(targetCat) && !targetCat.includes(matchCat)) {
        continue;
      }
    }

    // Apply Status filter
    if (status !== 'All' && law.status.toLowerCase() !== status.toLowerCase()) {
      continue;
    }

    // Compute Relevance Score
    let score = 0;
    if (tokens.length === 0) {
      score = 1;
    } else {
      const titleLower = (law.title + ' ' + law.shortTitle + ' ' + (law.titleBn || '')).toLowerCase();
      const overviewLower = (law.overview + ' ' + (law.overviewBn || '')).toLowerCase();
      const keywordsLower = (law.keywords || []).join(' ').toLowerCase();

      // Title exact or token match
      if (titleLower.includes(normalizedQuery)) score += 50;
      for (const token of tokens) {
        if (titleLower.includes(token)) score += 15;
        if (keywordsLower.includes(token)) score += 10;
        if (overviewLower.includes(token)) score += 5;
      }

      // Check sections
      for (const sec of law.sections) {
        const secHeader = (sec.number + ' ' + sec.title + ' ' + (sec.titleBn || '')).toLowerCase();
        const secBody = (sec.content + ' ' + sec.simpleExplanation).toLowerCase();
        if (secHeader.includes(normalizedQuery)) score += 30;
        for (const token of tokens) {
          if (secHeader.includes(token)) score += 8;
          if (secBody.includes(token)) score += 3;
        }
      }
    }

    if (score > 0 || tokens.length === 0) {
      scoredItems.push({ item: law, score });
    }
  }

  // 3. Sort Results
  if (sortBy === 'relevance' && tokens.length > 0) {
    scoredItems.sort((a, b) => b.score - a.score);
  } else if (sortBy === 'year-desc') {
    scoredItems.sort((a, b) => b.item.enactmentYear - a.item.enactmentYear);
  } else if (sortBy === 'year-asc') {
    scoredItems.sort((a, b) => a.item.enactmentYear - b.item.enactmentYear);
  } else if (sortBy === 'title-asc') {
    scoredItems.sort((a, b) => a.item.title.localeCompare(b.item.title));
  }

  // 4. Paginate
  const total = scoredItems.length;
  const paginated = scoredItems.slice(offset, offset + limit).map((s) => s.item);

  return {
    items: paginated,
    total,
    limit,
    offset,
    hasMore: offset + limit < total,
    facets: {
      byJurisdiction,
      byCategory,
      byStatus,
    },
  };
}

/**
 * Retrieve statutory amendments for a law ID
 */
export function getLawAmendments(lawId: string): StatutoryAmendmentRecord[] {
  return STATUTORY_AMENDMENT_RECORDS.filter((rec) => rec.lawId === lawId);
}

/**
 * Retrieve relational legal concept nodes
 */
export function getAllConceptRelationalNodes(): ConceptRelationalNode[] {
  return CONCEPT_RELATIONAL_GRAPH;
}

export function getConceptRelationalNode(slugOrId: string): ConceptRelationalNode | undefined {
  return CONCEPT_RELATIONAL_GRAPH.find(
    (c) => c.id === slugOrId || c.slug === slugOrId
  );
}


