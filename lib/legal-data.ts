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
    countLabel: '511+ Sections • 2 Acts',
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
    countLabel: '153 Articles • Supreme Law',
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
    countLabel: '30 Articles • 193 Signatories',
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
    countLabel: 'Act XXVII/2023 • 60+ Sections',
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
    countLabel: '350+ Sections • Act XLII/2006',
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
    countLabel: '320+ Articles • Multi-Treaty',
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
    countLabel: '158 Sections • 51 Orders',
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
    countLabel: 'Ordinance VIII/1961',
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
    countLabel: 'Act I/1995 & Paris Treaty',
    iconName: 'Leaf',
    href: '/international-laws?category=Environmental+Law'
  },
  {
    id: 'international-humanitarian',
    slug: 'international-humanitarian',
    title: 'International Humanitarian Law',
    titleBn: 'আন্তর্জাতিক মানবিক আইন',
    description: 'Geneva Conventions I-IV, civilian protection during armed conflict, treatment of POWs, and war crime rules.',
    descriptionBn: 'যুদ্ধকালীন সময়ে সাধারণ নাগরিক ও যুদ্ধবন্দীদের মানবিক সুরক্ষার নিয়মাবলি।',
    primaryJurisdiction: 'International',
    countLabel: '4 Conventions • 196 States',
    iconName: 'ShieldAlert',
    href: '/international-laws?category=International+Humanitarian'
  }
];

export interface GlossaryTerm {
  term: string;
  termBn: string;
  pronunciation?: string;
  category: string;
  definition: string;
  simpleExplanation: string;
  jurisdiction: 'Universal' | 'Bangladesh' | 'Common Law' | 'Civil Law';
  exampleUsage: string;
}

export interface LegalOutcomePathway {
  id: string;
  title: string;
  titleBn: string;
  category: 'Criminal Procedure' | 'Civil Disputes' | 'Constitutional Remedies' | 'Consumer Grievance' | 'Family Matters' | 'Digital Harassment';
  jurisdiction: 'Bangladesh' | 'Universal Principles';
  estimatedTimeline: string;
  primaryLegislation: string;
  summary: string;
  stages: {
    stageNumber: number;
    title: string;
    description: string;
    keyActions: string[];
    importantRights: string[];
    commonPitfalls: string[];
  }[];
  emergencyContacts?: {
    name: string;
    number: string;
    description: string;
  }[];
}

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
    officialGazetteRef: 'Govt. of Bangladesh Legislative Archives Act XLV/1860',
    overview: 'The Penal Code of 1860 is the foundational substantive criminal code of Bangladesh, defining offenses from murder, theft, and fraud to criminal conspiracy and state security, along with their respective punishments.',
    overviewBn: '১৮৬০ সালের দণ্ডবিধি হলো বাংলাদেশের প্রধান ফৌজদারি আইন যা বিভিন্ন অপরাধের সংজ্ঞা এবং সেগুলোর শাস্তির বিধান নির্ধারণ করে।',
    simpleSummary: 'This is the main criminal law book in Bangladesh that defines what actions are crimes (like theft, assault, fraud, or murder) and specifies how they are punished.',
    fullOfficialTextExcerpt: 'WHEREAS it is expedient to provide a general Penal Code for Bangladesh; It is enacted as follows: This Act shall be called the Penal Code, and shall take effect throughout Bangladesh. Every person shall be liable to punishment under this Code and not otherwise for every act or omission contrary to the provisions thereof, of which he shall be guilty within Bangladesh.',
    keyHighlights: [
      'Covers 511 sections defining general exceptions, offenses against the state, public tranquility, and bodily harm.',
      'Defines Mens Rea (guilty mind) and Actus Reus (guilty act) as prerequisites for criminal liability.',
      'Specifies punishments ranging from fines and simple imprisonment to rigorous imprisonment and capital punishment.'
    ],
    sections: [
      {
        number: 'Section 299',
        title: 'Culpable Homicide',
        titleBn: 'অপরাধজনক নরহত্যা',
        content: 'Whoever causes death by doing an act with the intention of causing death, or with the intention of causing such bodily injury as is likely to cause death, or with the knowledge that he is likely by such act to cause death, commits the offense of culpable homicide.',
        contentBn: 'যে ব্যক্তি মৃত্যু ঘটানোর উদ্দেশ্যে বা মৃত্যু ঘটার সম্ভাবনাযুক্ত আঘাত করার উদ্দেশ্যে অথবা মৃত্যু ঘটতে পারে জেনে কোনো কাজ করে মৃত্যু ঘটায়, সে অপরাধজনক নরহত্যা করে।',
        simpleExplanation: 'Causing someone\'s death with the intent or clear knowledge that your action would cause fatal harm.',
        punishmentOrRemedy: 'Imprisonment up to life or 10 years depending on intent (Section 304).',
        keyConcepts: ['Intention', 'Knowledge of risk', 'Bodily harm']
      },
      {
        number: 'Section 300',
        title: 'Murder',
        titleBn: 'খুন',
        content: 'Except in the cases hereinafter excepted, culpable homicide is murder, if the act by which the death is caused is done with the intention of causing death, or with the knowledge that it is so imminently dangerous that it must in all probability cause death.',
        contentBn: 'অপরাধজনক নরহত্যা খুন হিসেবে গণ্য হবে যদি কাজটি মৃত্যু ঘটানোর নিশ্চিত উদ্দেশ্যে বা মারাত্মক ঝুঁকিপূর্ণভাবে করা হয়।',
        simpleExplanation: 'Intentional killing without valid legal justification or sudden provocation exceptions.',
        punishmentOrRemedy: 'Death penalty or imprisonment for life, and shall also be liable to fine (Section 302).',
        keyConcepts: ['Premeditation', 'Capital offense', 'Non-bailable']
      },
      {
        number: 'Section 378',
        title: 'Theft',
        titleBn: 'চুরি',
        content: 'Whoever, intending to take dishonestly any movable property out of the possession of any person without that person\'s consent, moves that property in order to such taking, is said to commit theft.',
        contentBn: 'যে ব্যক্তি কোনো ব্যক্তির অনুমতি ছাড়া অসৎ উদ্দেশ্যে কোনো অস্থাবর সম্পত্তি স্থানান্তরিত করে, সে চুরি করেছে বলে গণ্য হয়।',
        simpleExplanation: 'Dishonestly moving someone else\'s movable belongings without their consent.',
        punishmentOrRemedy: 'Imprisonment up to 3 years, or fine, or both (Section 379).',
        keyConcepts: ['Dishonest intention', 'Movable property', 'Lack of consent']
      },
      {
        number: 'Section 420',
        title: 'Cheating and dishonestly inducing delivery of property',
        titleBn: 'প্রতারণা এবং সম্পত্তি হস্তান্তরে অসদুপায় গ্রহণ',
        content: 'Whoever cheats and thereby dishonestly induces the person deceived to deliver any property to any person, or to make, alter or destroy the whole or any part of a valuable security, shall be punished with imprisonment of either description for a term which may extend to seven years, and shall also be liable to fine.',
        contentBn: 'যে ব্যক্তি প্রতারণার মাধ্যমে অপর ব্যক্তিকে কোনো সম্পত্তি হস্তান্তর করতে প্ররোচিত করে, সে অনধিক ৭ বছর পর্যন্ত কারাদণ্ডে এবং অর্থদণ্ডে দণ্ডিত হবে।',
        simpleExplanation: 'Tricking someone into giving away money or property through false promises or deceit.',
        punishmentOrRemedy: 'Imprisonment for up to 7 years and mandatory fine.',
        keyConcepts: ['Fraudulent inducement', 'Deception', 'Property transfer']
      }
    ],
    timeline: [
      { year: '1860', title: 'Original Enactment', description: 'Drafted by Lord Macaulay and enacted under British India.', status: 'enacted' },
      { year: '1972', title: 'Adoption in Independent Bangladesh', description: 'Adopted through the Laws Continuance Enforcement Order 1972.', status: 'enacted' },
      { year: '2004', title: 'Speedy Trial Tribunal Amendments', description: 'Cross-referenced with special criminal jurisdiction statutes.', status: 'amended' },
      { year: '2023', title: 'Fines and Penalties Rationalization', description: 'Updated archaic monetary fine rates across various economic sections.', status: 'amended' }
    ],
    relatedLawIds: ['bd-crpc-1898', 'bd-cyber-security-2023', 'bd-evidence-act-1872'],
    citations: {
      standard: 'The Penal Code, 1860 (Act No. XLV of 1860)',
      academic: 'Penal Code 1860, 1860 Act XLV, Legislative & Parliamentary Affairs Division, BD.',
      bluebook: 'Penal Code, Act No. XLV of 1860 (Bangl.).'
    },
    keywords: ['criminal law', 'murder', 'theft', 'fraud', 'punishment', 'penal code', 'dondobidhi', 'crimes', 'imprisonment', 'assault']
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
    officialGazetteRef: 'Bangladesh Gazette Extraordinary, Dec 14, 1972',
    overview: 'The Supreme Law of Bangladesh establishing the democratic republic, fundamental principles of state policy, fundamental rights enforceable by the High Court Division under Article 102, and the separation of powers among legislature, executive, and judiciary.',
    overviewBn: 'বাংলাদেশের সর্বোচ্চ আইন যা প্রজাতন্ত্রের শাসনতন্ত্র, নাগরিকদের মৌলিক অধিকার এবং রাষ্ট্রের তিনটি অঙ্গের ক্ষমতা ও দায়িত্ব নির্ধারণ করে।',
    simpleSummary: 'The highest legal authority in Bangladesh. It guarantees basic human rights (like free speech, equality, and protection from unlawful arrest) and defines how the country\'s government and courts operate.',
    fullOfficialTextExcerpt: 'We, the people of Bangladesh, having proclaimed our independence on the 26th day of March, 1971 and through a historic struggle for national liberation, established the independent, sovereign People\'s Republic of Bangladesh; Pledging that the high ideals of nationalism, socialism, democracy and secularism shall be the fundamental principles of the Constitution...',
    keyHighlights: [
      'Part III guarantees Fundamental Rights including equality before law (Art. 27), right to life and liberty (Art. 31/32), and freedom of speech (Art. 39).',
      'Article 7 establishes the supremacy of the Constitution: any law inconsistent with this Constitution is void to the extent of inconsistency.',
      'Article 102 empowers the High Court Division to issue Writs (Habeas Corpus, Mandamus, Certiorari, Prohibition, Quo Warranto) to enforce rights.'
    ],
    sections: [
      {
        number: 'Article 27',
        title: 'Equality before Law',
        titleBn: 'আইনের দৃষ্টিতে সমতা',
        content: 'All citizens are equal before law and are entitled to equal protection of law.',
        contentBn: 'সকল নাগরিক আইনের দৃষ্টিতে সমান এবং আইনের সমান আশ্রয় লাভের অধিকারী।',
        simpleExplanation: 'No person is above the law, and everyone is entitled to the same fair legal treatment regardless of status, wealth, or background.',
        punishmentOrRemedy: 'Judicial review and invalidation of discriminatory state actions under Article 102.',
        keyConcepts: ['Non-discrimination', 'Rule of Law', 'Equal protection']
      },
      {
        number: 'Article 31',
        title: 'Right to protection of law',
        titleBn: 'আইনের আশ্রয়লাভের অধিকার',
        content: 'To enjoy the protection of the law, and to be treated in accordance with law, and only in accordance with law, is the inalienable right of every citizen, wherever he may be, and of every other person for the time being within Bangladesh, and in particular no action detrimental to the life, liberty, body, reputation or property of any person shall be taken except in accordance with law.',
        contentBn: 'আইনের আশ্রয়লাভ এবং আইনানুযায়ী আচরণ লাভ যে কোনো নাগরিকের অবিচ্ছেদ্য অধিকার।',
        simpleExplanation: 'Government authorities cannot harm your life, freedom, property, or reputation without following legitimate, enacted law.',
        punishmentOrRemedy: 'Direct constitutional writ remedy in the Supreme Court.',
        keyConcepts: ['Due process', 'Inalienable rights', 'Protection from arbitrary power']
      },
      {
        number: 'Article 39',
        title: 'Freedom of thought, conscience and of speech',
        titleBn: 'চিন্তা ও বিবেকের স্বাধীনতা এবং বাক-স্বাধীনতা',
        content: '(1) Freedom of thought and conscience is guaranteed. (2) Subject to any reasonable restrictions imposed by law in the interests of the security of the State, friendly relations with foreign states, public order, decency or morality, or in relation to contempt of court, defamation or incitement to an offense - (a) the right of every citizen to freedom of speech and expression; and (b) the freedom of the press, are guaranteed.',
        contentBn: 'চিন্তা ও বিবেকের স্বাধীনতা এবং আইনের যুক্তিসঙ্গত বাধানিষেধ সাপেক্ষে বাক-স্বাধীনতা ও সংবাদক্ষেত্রের স্বাধীনতা নিশ্চিত করা হলো।',
        simpleExplanation: 'Guarantees freedom of opinion, expression, and independent press, subject only to reasonable national security and anti-defamation restrictions.',
        punishmentOrRemedy: 'Constitutional protection against unlawful censorship.',
        keyConcepts: ['Freedom of expression', 'Press freedom', 'Reasonable restrictions']
      },
      {
        number: 'Article 102',
        title: 'Powers of High Court Division to issue certain orders and directions (Writs)',
        titleBn: 'রিট জারির বিষয়ে হাইকোর্ট বিভাগের ক্ষমতা',
        content: 'The High Court Division may, if satisfied that no other equally efficacious remedy is provided by law, on the application of any person aggrieved, make an order directing a person performing any functions in connection with the affairs of the Republic to refrain from doing that which he is not permitted by law to do, or to do that which he is required by law to do, or declare that any act done has been done without lawful authority.',
        contentBn: 'মৌলিক অধিকার বলবৎকরণ ও আইনবহির্ভূত সরকারি কর্মকাণ্ডের বিরুদ্ধে রিট আদেশ প্রদানের মাধ্যমে প্রতিকার দেওয়ার ক্ষমতা।',
        simpleExplanation: 'Allows any citizen to petition the High Court to halt illegal government actions or free unlawfully detained persons.',
        punishmentOrRemedy: 'Issuance of constitutional Writs: Mandamus, Certiorari, Habeas Corpus, Prohibition.',
        keyConcepts: ['Writ jurisdiction', 'Judicial review', 'Enforcement of fundamental rights']
      }
    ],
    timeline: [
      { year: '1972', title: 'Adoption and Commencement', description: 'Passed on 4 November 1972 and took effect on 16 December 1972.', status: 'enacted' },
      { year: '1979', title: '5th Amendment (Historical)', description: 'Later declared illegal and unconstitutional by the Supreme Court in 2010.', status: 'amended' },
      { year: '2011', title: '15th Amendment', description: 'Restored key original principles of secularism and democracy.', status: 'amended' },
      { year: '2018', title: '17th Amendment', description: 'Extended women\'s reserved seats in Parliament for 25 years.', status: 'amended' }
    ],
    relatedLawIds: ['bd-crpc-1898', 'bd-penal-code-1860', 'int-udhr-1948', 'int-iccpr-1966'],
    citations: {
      standard: 'The Constitution of the People\'s Republic of Bangladesh (1972)',
      academic: 'Constitution of Bangladesh, Ministry of Law, Justice and Parliamentary Affairs (1972).',
      bluebook: 'Bangl. Const. art. 27.'
    },
    keywords: ['constitution', 'fundamental rights', 'article 102', 'writ', 'freedom of speech', 'equality', 'supreme court', 'shongbidhan', 'due process']
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
    officialGazetteRef: 'Legislative Division Archive Act V of 1898',
    overview: 'The definitive procedural law regulating criminal investigations, arrest procedures, search warrants, bail provisions, trial court hierarchies, and appeals in Bangladesh.',
    overviewBn: 'ফৌজদারি অপরাধের তদন্ত, গ্রেপ্তার, জামিন, আদালতের বিচার পদ্ধতি এবং আপিল সংক্রান্ত সামগ্রিক নিয়মাবলি।',
    simpleSummary: 'The step-by-step rulebook for the police and courts. It outlines how arrests must be made, how bail is granted, and how criminal trials are carried out fairly.',
    fullOfficialTextExcerpt: 'An Act to consolidate and amend the law relating to the Criminal Procedure. Whereas it is expedient to consolidate and amend the law relating to Criminal Procedure; It is hereby enacted as follows: This Act may be called the Code of Criminal Procedure, 1898; and it shall come into force on the first day of July, 1898.',
    keyHighlights: [
      'Distinguishes between Cognizable offenses (police can arrest without warrant) and Non-cognizable offenses.',
      'Governs Section 54 (power of arrest without warrant) subject to High Court protective guidelines in the landmark Blast v. Bangladesh case.',
      'Details Section 497/498 regarding anticipatory and regular bail conditions.'
    ],
    sections: [
      {
        number: 'Section 54',
        title: 'When police may arrest without warrant',
        titleBn: 'পরোয়ানা ছাড়া পুলিশ কখন গ্রেপ্তার করতে পারে',
        content: 'Any police officer may, without an order from a Magistrate and without a warrant, arrest any person who has been concerned in any cognizable offense, or against whom a reasonable complaint has been made, or credible information has been received, or a reasonable suspicion exists.',
        contentBn: 'আমলযোগ্য অপরাধে জড়িত থাকার যুক্তিসঙ্গত সন্দেহ বা বিশ্বাসযোগ্য তথ্যের ভিত্তিতে পুলিশ ম্যাজিস্ট্রেট আদেশ ব্যতিরেকে গ্রেপ্তার করতে পারে।',
        simpleExplanation: 'Authorizes police to arrest suspects for serious crimes without an advance court warrant, but under strict accountability guidelines.',
        punishmentOrRemedy: 'Safeguards against arbitrary detention under Section 167 and Constitutional guidelines.',
        keyConcepts: ['Cognizable offense', 'Reasonable suspicion', 'Arrest guidelines']
      },
      {
        number: 'Section 497',
        title: 'When bail may be taken in case of non-bailable offense',
        titleBn: 'অজামিনযোগ্য অপরাধে কখন জামিন দেওয়া যাবে',
        content: 'When any person accused of any non-bailable offense is arrested or detained without warrant, he may be released on bail, but he shall not be so released if there appear reasonable grounds for believing that he has been guilty of an offense punishable with death or imprisonment for life.',
        contentBn: 'অজামিনযোগ্য অপরাধের ক্ষেত্রে আদালতের বিবেচনাধীন শর্তে জামিন মঞ্জুর করার নিয়মাবলি।',
        simpleExplanation: 'Provides rules for when judges can release a suspect on bail before their trial ends.',
        punishmentOrRemedy: 'Bail bond execution and conditional release.',
        keyConcepts: ['Discretionary bail', 'Bail bond', 'Presumption of innocence']
      }
    ],
    timeline: [
      { year: '1898', title: 'Original Promulgation', description: 'Enacted to standardize criminal administration across South Asia.', status: 'enacted' },
      { year: '2007', title: 'Separation of Judiciary Ordinance', description: 'Formally separated Judicial Magistrates from Executive Magistrates in compliance with the historic Masdar Hossain judgment.', status: 'amended' }
    ],
    relatedLawIds: ['bd-penal-code-1860', 'bd-constitution-1972', 'bd-evidence-act-1872'],
    citations: {
      standard: 'Code of Criminal Procedure, 1898 (Act V of 1898)',
      academic: 'CrPC 1898, Act No. V of 1898, Bangladesh Government Press.',
      bluebook: 'Code Crim. Proc., Act No. V of 1898 (Bangl.).'
    },
    keywords: ['crpc', 'criminal procedure', 'bail', 'arrest', 'section 54', 'police powers', 'fir', 'general diary', 'magistrate']
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
    citations: {
      standard: 'Bangladesh Environment Conservation Act, 1995 (Act No. I of 1995)',
      academic: 'BECA 1995, Ministry of Environment, Forest and Climate Change (BD).',
      bluebook: 'Environment Conservation Act, Act No. I of 1995 (Bangl.).'
    },
    keywords: ['environmental law', 'pollution', 'ecc', 'eca', 'sundarbans', 'river protection', 'environment court', 'climate']
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
  effectiveDate: string;
  publicationDate: string;
  lastUpdatedDate: string;
  officialSource: string;
  sourceOrganization: string;
  sourceVerificationUrl: string;
  simpleSummary: string;
  explainLike15: string;
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

export function getEnrichedLaw(id: string): EnrichedLawItem {
  const baseLaw = LAWS_DATABASE.find((l) => l.id === id || l.slug === id) || LAWS_DATABASE[0];
  
  // Guarantee all fields are present
  return {
    ...baseLaw,
    status: (baseLaw.status || 'Active') as any,
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
  return LAWS_DATABASE.map((l) => getEnrichedLaw(l.id));
}

