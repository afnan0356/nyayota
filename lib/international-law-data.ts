import { LawItem } from './legal-data';

export interface InternationalTreatyItem extends LawItem {
  alternativeTitles?: string[];
  depositary?: string;
  officialLanguages?: string[];
  adoptionDate?: string;
  entryIntoForceDate?: string;
  sourceReproductionNotice?: string;
  verificationStatus?: 'Verified Authentic Text' | 'Official Institutional Reproduction' | 'Verified Multilateral Depositary';
  unCitationRef?: string;
  ratificationsCount?: number;
  instrumentType?: 'Multilateral Treaty' | 'Declaratory Instrument' | 'Model Law' | 'Constitutive Statute' | 'Treaty Protocol';
  bangladeshRatificationStatus?: string;
  bangladeshDomesticApplicationNote?: string;
}

export const INTERNATIONAL_TREATIES_DATABASE: InternationalTreatyItem[] = [
  // =========================================================================
  // A. INTERNATIONAL HUMAN RIGHTS
  // =========================================================================

  // 1. UDHR (1948) - Declaratory Instrument
  {
    id: 'int-udhr-1948',
    slug: 'universal-declaration-of-human-rights-1948',
    title: 'Universal Declaration of Human Rights (UDHR)',
    titleBn: 'মানবাধিকারের সার্বজনীন ঘোষণাপত্র (১৯৪৮)',
    shortTitle: 'UDHR (UNGA Res 217 A)',
    alternativeTitles: ['UDHR', 'Universal Declaration', 'UNGA Resolution 217 A (III)'],
    jurisdiction: 'International',
    jurisdictionCode: 'INT',
    category: 'Human Rights',
    status: 'Declaratory Instrument',
    instrumentType: 'Declaratory Instrument',
    enactmentYear: 1948,
    adoptionDate: '10 December 1948',
    totalStatutorySectionsCount: 30,
    isCuratedSubset: true,
    signatoriesCount: 193,
    officialLanguages: ['English', 'French', 'Spanish', 'Russian', 'Chinese', 'Arabic'],
    depositary: 'Secretary-General of the United Nations',
    officialGazetteRef: 'U.N. Doc. A/810 at 71 (1948)',
    unCitationRef: 'UNGA Res. 217 A (III), U.N. Doc A/810 at 71 (1948)',
    officialSource: 'United Nations / OHCHR (un.org/en/about-us/universal-declaration-of-human-rights)',
    sourceOrganization: 'United Nations General Assembly / OHCHR',
    sourceVerificationUrl: 'https://www.un.org/en/about-us/universal-declaration-of-human-rights',
    lastUpdatedDate: 'January 2025',
    verificationStatus: 'Verified Authentic Text',
    sourceReproductionNotice: 'Proclaimed by the United Nations General Assembly in Paris on 10 December 1948. Note: The UDHR was adopted as a declaratory resolution rather than a formal treaty; its core principles have achieved customary international law status binding globally.',
    bangladeshRatificationStatus: 'Supported by Bangladesh upon UN admission (17 Sept 1974). Formally reflected in Part III (Fundamental Rights, Articles 27-44) of the Constitution of Bangladesh.',
    bangladeshDomesticApplicationNote: 'Under Bangladesh constitutional jurisprudence, UDHR principles guide judicial interpretation of fundamental rights under Article 102 writ jurisdiction, though relief is sought pursuant to constitutional provisions rather than direct declaration enforcement.',
    overview: 'Adopted by the United Nations General Assembly in Paris on 10 December 1948, the UDHR represents the foundational milestone proclamation in the history of human rights, articulating 30 universal, inalienable articles protecting every human being.',
    overviewBn: 'জাতিসংঘ সাধারণ পরিষদ কর্তৃক গৃহীত ঐতিহাসিক ঘোষণাপত্র যা বিশ্বের সকল মানুষের জন্য ৩০টি মৌলিক ও অবিচ্ছেদ্য মানবাধিকারের বৈশ্বিক মানদণ্ড নির্ধারণ করে।',
    simpleSummary: 'A historic global declaration stating that all humans are born free and equal, with rights to life, fair trial, privacy, speech, and freedom from torture and slavery.',
    explainLike15: 'The world\'s master list of human rights written after World War II so that no government could ever claim "we have the power to treat people like animals." It is the foundation for all human rights laws that followed.',
    fullOfficialTextExcerpt: 'Whereas recognition of the inherent dignity and of the equal and inalienable rights of all members of the human family is the foundation of freedom, justice and peace in the world... The General Assembly Proclaims this Universal Declaration of Human Rights as a common standard of achievement for all peoples and all nations...',
    keyHighlights: [
      'Declaratory Nature: Adopted by UN General Assembly resolution; sets a common moral and customary legal standard rather than a direct treaty sanction.',
      'Article 1: All human beings are born free and equal in dignity and rights.',
      'Absolute Prohibitions: Outlaws torture (Art. 5), arbitrary detention (Art. 9), and slavery (Art. 4).'
    ],
    sections: [
      {
        number: 'Article 1',
        title: 'Right to Equality and Dignity in Freedom',
        titleBn: 'সাম্য, মানবিক মর্যাদা ও স্বাধীনতার অধিকার',
        content: 'All human beings are born free and equal in dignity and rights. They are endowed with reason and conscience and should act towards one another in a spirit of brotherhood.',
        contentBn: 'সকল মানুষ জন্মগতভাবে স্বাধীন এবং সমমর্যাদা ও সমঅধিকার সম্পন্ন। তারা বিবেক ও বুদ্ধির অধিকারী এবং ভ্রাতৃত্বসুলভ মনোভাব নিয়ে পরস্পরের প্রতি আচরণ করবে।',
        simpleExplanation: 'No person is legally superior or inferior to another at birth.',
        explainLike15: 'Every human has the same basic dignity, whether rich or poor, king or ordinary citizen.',
        punishmentOrRemedy: 'Universal human rights baseline for constitutional interpretation and international monitoring.',
        keyConcepts: ['Inherent dignity', 'Equality of rights', 'Brotherhood']
      },
      {
        number: 'Article 5',
        title: 'Prohibition of Torture and Cruel Treatment',
        titleBn: 'নির্যাতন ও নিষ্ঠুর আচরণের সার্বিক নিষেধাজ্ঞা',
        content: 'No one shall be subjected to torture or to cruel, inhuman or degrading treatment or punishment.',
        contentBn: 'কাউকে নির্যাতন কিংবা নিষ্ঠুর, অমানবিক বা অবমাননাকর আচরণ বা শাস্তি দেওয়া যাবে না।',
        simpleExplanation: 'Complete worldwide prohibition against physical abuse, torture, or degrading custodial punishments.',
        explainLike15: 'Police and soldiers are never allowed to torture anyone, no matter what crime the suspect is accused of.',
        punishmentOrRemedy: 'Absolute customary norm leading to universal jurisdiction and CAT enforcement.',
        keyConcepts: ['Absolute prohibition', 'Non-derogable right', 'Anti-torture baseline']
      },
      {
        number: 'Article 19',
        title: 'Freedom of Opinion and Expression',
        titleBn: 'মতপ্রকাশ ও তথ্যের স্বাধীনতা',
        content: 'Everyone has the right to freedom of opinion and expression; this right includes freedom to hold opinions without interference and to seek, receive and impart information and ideas through any media and regardless of frontiers.',
        contentBn: 'প্রত্যেকেরই মতামতের ও মতপ্রকাশের স্বাধীনতা রয়েছে; এই অধিকারের মধ্যে হস্তক্ষেপ ব্যতীত মতামত পোষণ এবং যেকোনো মাধ্যমে তথ্য ও চিন্তাধারা অনুসন্ধান, গ্রহণ ও প্রচারের স্বাধীনতা অন্তর্ভুক্ত।',
        simpleExplanation: 'The right to think, speak, write, and share information without censorship.',
        explainLike15: 'You have the right to voice your ideas, read news, and learn without state borders blocking you.',
        punishmentOrRemedy: 'Constitutional writ protection under national fundamental rights guarantees.',
        keyConcepts: ['Freedom of speech', 'Press freedom', 'Free flow of information']
      }
    ],
    timeline: [
      { year: '1948', title: 'Adoption in Paris', description: 'Adopted at the Palais de Chaillot by UN General Assembly Resolution 217 A.', status: 'enacted' },
      { year: '1974', title: 'Bangladesh Endorsement', description: 'Bangladesh formally embraced UDHR principles upon admission to the United Nations.', status: 'upheld' }
    ],
    relatedLawIds: ['bd-constitution-1972', 'int-iccpr-1966', 'int-icescr-1966'],
    citations: {
      standard: 'Universal Declaration of Human Rights, G.A. Res. 217 (III) A, U.N. Doc. A/RES/217(III) (Dec. 10, 1948)',
      academic: 'UDHR (1948), UNGA Res 217 A (III), UN Doc A/810 at 71.',
      bluebook: 'G.A. Res. 217 (III) A, Universal Declaration of Human Rights (Dec. 10, 1948).'
    },
    keywords: ['udhr', 'universal declaration of human rights', 'human rights', 'article 1', 'article 5', 'non binding declaration', 'customary law']
  },

  // 2. ICCPR (1966) - Binding Multilateral Treaty
  {
    id: 'int-iccpr-1966',
    slug: 'international-covenant-on-civil-and-political-rights-1966',
    title: 'International Covenant on Civil and Political Rights (ICCPR)',
    titleBn: 'নাগরিক ও রাজনৈতিক অধিকার বিষয়ক আন্তর্জাতিক চুক্তি (১৯৬৬)',
    shortTitle: 'ICCPR (1966)',
    alternativeTitles: ['ICCPR', 'Civil and Political Rights Covenant', '999 UNTS 171'],
    jurisdiction: 'International',
    jurisdictionCode: 'INT',
    category: 'Human Rights',
    status: 'Active Treaty',
    instrumentType: 'Multilateral Treaty',
    enactmentYear: 1966,
    adoptionDate: '16 December 1966',
    entryIntoForceDate: '23 March 1976',
    totalStatutorySectionsCount: 53,
    isCuratedSubset: true,
    signatoriesCount: 174,
    ratificationsCount: 174,
    officialLanguages: ['English', 'French', 'Spanish', 'Russian', 'Chinese', 'Arabic'],
    depositary: 'Secretary-General of the United Nations',
    officialGazetteRef: '999 U.N.T.S. 171',
    unCitationRef: '999 UNTS 171 / UN Doc. A/6316 (1966)',
    officialSource: 'United Nations Treaty Collection / OHCHR (ohchr.org/en/instruments-listings)',
    sourceOrganization: 'UN Human Rights Committee / UNTS',
    sourceVerificationUrl: 'https://treaties.un.org/pages/ViewDetails.aspx?src=TREATY&mtdsg_no=IV-4&chapter=4&clang=_en',
    lastUpdatedDate: 'January 2025',
    verificationStatus: 'Verified Multilateral Depositary',
    sourceReproductionNotice: 'Official certified text deposited with the UN Secretary-General and published in 999 UNTS 171. Monitored by the UN Human Rights Committee in Geneva.',
    bangladeshRatificationStatus: 'Bangladesh acceded on 6 September 2000 with interpretive declarations on Articles 10, 11, and 14.',
    bangladeshDomesticApplicationNote: 'Dualist system: Provisions are invoked in the High Court Division under Article 102 writ petitions to give expansive meaning to Articles 31, 32, and 35 of the Bangladesh Constitution (e.g., BLAST v. Bangladesh fair trial jurisprudence).',
    overview: 'A core legally binding multilateral treaty committing state parties to respect the civil and political rights of individuals, including the right to life, freedom of religion, freedom of speech, freedom of assembly, electoral rights, and fair trial due process.',
    overviewBn: 'আইনত বাধ্যতামূলক সার্বজনীন মানবাধিকার চুক্তি যা জীবনের অধিকার, নির্যাতনমুক্তি, নিরপেক্ষ বিচারব্যবস্থা, ধর্মীয় স্বাধীনতা ও নাগরিক অধিকারের আইনি সুরক্ষা নিশ্চিত করে।',
    simpleSummary: 'A legally binding world treaty that forces member countries to protect human life, ban torture, give fair trials in court, and stop arbitrary jailings.',
    explainLike15: 'The UDHR was a promise; the ICCPR is the binding contract. When a country signs the ICCPR, it makes a legally binding promise under international law to protect citizen freedoms.',
    fullOfficialTextExcerpt: 'The States Parties to the present Covenant, Considering that, in accordance with the principles proclaimed in the Charter of the United Nations, recognition of the inherent dignity and of the equal and inalienable rights of all members of the human family is the foundation of freedom, justice and peace in the world... Agree upon the following articles...',
    keyHighlights: [
      'Right to Life (Art. 6): Inherent right to life, non-derogable even in states of emergency.',
      'Fair Trial Guarantees (Art. 14): Presumption of innocence, competent independent tribunal, right to counsel.',
      'Non-Derogable Rights (Art. 4): Rights that can never be suspended (torture ban, slavery ban, retroactive criminal law ban).'
    ],
    sections: [
      {
        number: 'Article 6',
        title: 'Inherent Right to Life',
        titleBn: 'জীবনের সহজাত অধিকার',
        content: 'Every human being has the inherent right to life. This right shall be protected by law. No one shall be arbitrarily deprived of his life.',
        contentBn: 'প্রত্যেক মানুষের বেঁচে থাকার সহজাত অধিকার রয়েছে। এই অধিকার আইনের মাধ্যমে সুরক্ষিত থাকবে এবং কাউকে খেয়ালখুশিমতো জীবন থেকে বঞ্চিত করা যাবে না।',
        simpleExplanation: 'Governments cannot execute citizens or permit extrajudicial killings without rigorous statutory due process.',
        punishmentOrRemedy: 'Human Rights Committee individual communications and state accountability.',
        keyConcepts: ['Right to life', 'Non-arbitrary deprivation', 'Non-derogable']
      },
      {
        number: 'Article 9',
        title: 'Liberty and Security of Person (No Arbitrary Detention)',
        titleBn: 'ব্যক্তিগত স্বাধীনতা ও খেয়ালখুশিমতো গ্রেপ্তারের বিরুদ্ধে সুরক্ষা',
        content: 'Everyone has the right to liberty and security of person. No one shall be subjected to arbitrary arrest or detention. No one shall be deprived of his liberty except on such grounds and in accordance with such procedure as are established by law.',
        contentBn: 'প্রত্যেকেরই স্বাধীনতা ও ব্যক্তিগত নিরাপত্তার অধিকার রয়েছে। কাউকে খেয়ালখুশিমতো গ্রেপ্তার বা আটক রাখা যাবে না; আইনের নির্ধারিত প্রক্রিয়া ছাড়া কাউকে বন্দি করা বেআইনি।',
        simpleExplanation: 'Police must have clear statutory legal grounds before putting someone in handcuffs or prison.',
        punishmentOrRemedy: 'Immediate habeas corpus court challenge and compensation for unlawful detention.',
        keyConcepts: ['Arbitrary arrest', 'Procedural legality', 'Habeas corpus']
      },
      {
        number: 'Article 14',
        title: 'Right to a Fair and Public Hearing (Due Process)',
        titleBn: 'নিরপেক্ষ ও প্রকাশ্য বিচারের অধিকার',
        content: 'All persons shall be equal before the courts and tribunals. In the determination of any criminal charge against him, everyone shall be entitled to a fair and public hearing by a competent, independent and impartial tribunal established by law.',
        contentBn: 'আদালতের সামনে সকলেই সমান। যেকোনো ফৌজদারি অভিযোগে নিরপেক্ষ, স্বাধীন ও আইনসঙ্গত ট্রাইব্যুনালে প্রকাশ্য ও সুষ্ঠু বিচার পাওয়ার অধিকার প্রত্যেকের রয়েছে।',
        simpleExplanation: 'Accused persons are presumed innocent until proven guilty and get a fair trial before a neutral judge.',
        punishmentOrRemedy: 'Quashing of biased convictions and retrial order.',
        keyConcepts: ['Presumption of innocence', 'Independent judiciary', 'Right to counsel']
      }
    ],
    timeline: [
      { year: '1966', title: 'Adoption by UN General Assembly', description: 'Adopted alongside ICESCR on 16 December 1966.', status: 'enacted' },
      { year: '1976', title: 'Entry into Force', description: 'Came into force on 23 March 1976 upon 35th ratification.', status: 'enacted' },
      { year: '2000', title: 'Bangladesh Accession', description: 'Bangladesh formally deposited instrument of accession on 6 September 2000.', status: 'upheld' }
    ],
    relatedLawIds: ['bd-constitution-1972', 'int-udhr-1948', 'int-cat-1984'],
    citations: {
      standard: 'International Covenant on Civil and Political Rights, Dec. 16, 1966, 999 U.N.T.S. 171',
      academic: 'ICCPR (1966), 999 UNTS 171, 6 ILM 368.',
      bluebook: 'International Covenant on Civil and Political Rights art. 6, Dec. 16, 1966, 999 U.N.T.S. 171.'
    },
    keywords: ['iccpr', 'civil and political rights', 'fair trial', 'right to life', 'human rights committee', '999 unts 171']
  },

  // 3. ICESCR (1966) - Economic, Social and Cultural Rights
  {
    id: 'int-icescr-1966',
    slug: 'international-covenant-on-economic-social-and-cultural-rights-1966',
    title: 'International Covenant on Economic, Social and Cultural Rights (ICESCR)',
    titleBn: 'অর্থনৈতিক, সামাজিক ও সাংস্কৃতিক অধিকার বিষয়ক আন্তর্জাতিক চুক্তি (১৯৬৬)',
    shortTitle: 'ICESCR (1966)',
    alternativeTitles: ['ICESCR', 'Economic Social Rights Covenant', '993 UNTS 3'],
    jurisdiction: 'International',
    jurisdictionCode: 'INT',
    category: 'Human Rights',
    status: 'Active Treaty',
    instrumentType: 'Multilateral Treaty',
    enactmentYear: 1966,
    adoptionDate: '16 December 1966',
    entryIntoForceDate: '3 January 1976',
    totalStatutorySectionsCount: 31,
    isCuratedSubset: true,
    signatoriesCount: 172,
    ratificationsCount: 172,
    officialLanguages: ['English', 'French', 'Spanish', 'Russian', 'Chinese', 'Arabic'],
    depositary: 'Secretary-General of the United Nations',
    officialGazetteRef: '993 U.N.T.S. 3',
    unCitationRef: '993 UNTS 3 / UN Doc. A/6316 (1966)',
    officialSource: 'UN Treaty Collection / OHCHR (ohchr.org)',
    sourceOrganization: 'UN Committee on Economic, Social and Cultural Rights (CESCR)',
    sourceVerificationUrl: 'https://treaties.un.org/pages/ViewDetails.aspx?src=TREATY&mtdsg_no=IV-3&chapter=4&clang=_en',
    lastUpdatedDate: 'January 2025',
    verificationStatus: 'Verified Multilateral Depositary',
    sourceReproductionNotice: 'Official certified text published in 993 UNTS 3. Monitored by the Committee on Economic, Social and Cultural Rights in Geneva.',
    bangladeshRatificationStatus: 'Bangladesh acceded on 5 October 1998.',
    bangladeshDomesticApplicationNote: 'Under Bangladesh law, ICESCR rights correspond primarily to Part II Fundamental Principles of State Policy (Articles 14-19 of the Constitution). While not directly enforceable via Article 102 alone, courts read them progressively into Article 32 (Right to Life includes right to livelihood and shelter; e.g. Ain o Salish Kendra (ASK) v. Bangladesh).',
    overview: 'The multilateral treaty guaranteeing progressive realization of economic, social, and cultural rights, including rights to fair wages, safe working conditions, social security, adequate standard of living, shelter, healthcare, and free primary education.',
    overviewBn: 'কর্মসংস্থান, ন্যায্য পারিশ্রমিক, সামাজিক নিরাপত্তা, খাদ্য, বাসস্থান, চিকিৎসা ও শিক্ষার অধিকার নিশ্চিতকারী আন্তর্জাতিক চুক্তি।',
    simpleSummary: 'A global treaty requiring nations to work towards giving every citizen fair work, healthcare, food, housing, and education.',
    explainLike15: 'While the ICCPR protects you from government abuse (like unfair arrest), the ICESCR pushes governments to ensure positive basics: hospitals, schools, jobs, and clean water.',
    fullOfficialTextExcerpt: 'The States Parties to the present Covenant... Recognizing that, in accordance with the Universal Declaration of Human Rights, the ideal of free human beings enjoying freedom from fear and want can only be achieved if conditions are created whereby everyone may enjoy his economic, social and cultural rights... Agree upon the following articles...',
    keyHighlights: [
      'Progressive Realization (Art. 2(1)): States must take steps to the maximum of available resources to achieve full realization.',
      'Right to Work & Fair Wages (Arts. 6 & 7): Equal pay for equal work and safe conditions.',
      'Right to Health and Education (Arts. 12 & 13): Compulsory, free primary education and highest attainable healthcare.'
    ],
    sections: [
      {
        number: 'Article 11',
        title: 'Right to an Adequate Standard of Living and Food',
        titleBn: 'পর্যাপ্ত জীবনমান, খাদ্য ও বাসস্থানের অধিকার',
        content: 'The States Parties recognize the right of everyone to an adequate standard of living for himself and his family, including adequate food, clothing and housing, and to the continuous improvement of living conditions.',
        contentBn: 'সকল নাগরিক ও তার পরিবারের জন্য পর্যাপ্ত খাদ্য, বস্ত্র, বাসস্থান এবং জীবনমানের ধারাবাহিক উন্নতির অধিকার রাষ্ট্রসমূহ স্বীকৃতি দেয়।',
        simpleExplanation: 'Governments must develop agricultural and economic policies so citizens do not starve or lack shelter.',
        punishmentOrRemedy: 'Periodic reviews by the CESCR committee and domestic public interest litigation.',
        keyConcepts: ['Right to food', 'Adequate housing', 'Freedom from hunger']
      },
      {
        number: 'Article 12',
        title: 'Right to the Highest Attainable Standard of Health',
        titleBn: 'শারীরিক ও মানসিক স্বাস্থ্যের সর্বোচ্চ মানের অধিকার',
        content: 'The States Parties recognize the right of everyone to the enjoyment of the highest attainable standard of physical and mental health.',
        contentBn: 'শারীরিক ও মানসিক স্বাস্থ্যের সর্বোচ্চ উন্নয়ন ও স্বাস্থ্যসেবা পাওয়ার অধিকার রাষ্ট্রসমূহ নিশ্চিত করবে।',
        simpleExplanation: 'Every person is entitled to medical facilities, epidemic prevention, and maternal care.',
        punishmentOrRemedy: 'State duty of non-retrogression in public healthcare funding.',
        keyConcepts: ['Right to health', 'Essential medicines', 'Epidemic control']
      }
    ],
    timeline: [
      { year: '1966', title: 'Adoption in New York', description: 'Adopted alongside ICCPR on 16 December 1966.', status: 'enacted' },
      { year: '1976', title: 'Entry into Force', description: 'Entered into force on 3 January 1976.', status: 'enacted' },
      { year: '1998', title: 'Bangladesh Accession', description: 'Bangladesh deposited accession on 5 October 1998.', status: 'upheld' }
    ],
    relatedLawIds: ['bd-constitution-1972', 'int-udhr-1948', 'bd-labor-act-2006'],
    citations: {
      standard: 'International Covenant on Economic, Social and Cultural Rights, Dec. 16, 1966, 993 U.N.T.S. 3',
      academic: 'ICESCR (1966), 993 UNTS 3, 6 ILM 360.',
      bluebook: 'International Covenant on Economic, Social and Cultural Rights art. 11, Dec. 16, 1966, 993 U.N.T.S. 3.'
    },
    keywords: ['icescr', 'economic rights', 'social security', 'right to health', 'right to education', 'progressive realization']
  },

  // 4. CERD (1965) - Racial Discrimination Elimination
  {
    id: 'int-cerd-1965',
    slug: 'international-convention-elimination-all-forms-racial-discrimination-1965',
    title: 'Convention on the Elimination of All Forms of Racial Discrimination (CERD)',
    titleBn: 'সকল ধরনের বর্ণবৈষম্য দূরীকরণ বিষয়ক আন্তর্জাতিক কনভেনশন (১৯৬৫)',
    shortTitle: 'CERD (1965)',
    alternativeTitles: ['CERD', 'Racial Discrimination Convention', '660 UNTS 195'],
    jurisdiction: 'International',
    jurisdictionCode: 'INT',
    category: 'Human Rights',
    status: 'Active Treaty',
    instrumentType: 'Multilateral Treaty',
    enactmentYear: 1965,
    adoptionDate: '21 December 1965',
    entryIntoForceDate: '4 January 1969',
    totalStatutorySectionsCount: 25,
    isCuratedSubset: true,
    signatoriesCount: 182,
    ratificationsCount: 182,
    officialLanguages: ['English', 'French', 'Spanish', 'Russian', 'Chinese', 'Arabic'],
    depositary: 'Secretary-General of the United Nations',
    officialGazetteRef: '660 U.N.T.S. 195',
    unCitationRef: '660 UNTS 195 / 5 ILM 352 (1966)',
    officialSource: 'United Nations Treaty Collection / OHCHR',
    sourceOrganization: 'Committee on the Elimination of Racial Discrimination (CERD)',
    sourceVerificationUrl: 'https://treaties.un.org/pages/ViewDetails.aspx?src=TREATY&mtdsg_no=IV-2&chapter=4&clang=_en',
    lastUpdatedDate: 'January 2025',
    verificationStatus: 'Verified Multilateral Depositary',
    sourceReproductionNotice: 'Official certified text published in 660 UNTS 195. Monitored by the CERD committee in Geneva.',
    bangladeshRatificationStatus: 'Bangladesh acceded on 11 June 1979.',
    bangladeshDomesticApplicationNote: 'Constitutional basis: Articles 27 and 28 of the Bangladesh Constitution guarantee equality and prohibit discrimination based on religion, race, caste, sex, or place of birth.',
    overview: 'A foundational human rights convention committing states to eliminate racial discrimination, racial segregation, and racist hate speech in all its forms, guaranteeing equality before the law regardless of race, color, or ethnic origin.',
    overviewBn: 'বর্ণ, জাতি ও নৃতাত্ত্বিক পরিচয়ের ভিত্তিতে সকল ধরনের বৈষম্য ও বিদ্বেষমূলক বক্তব্য নিষিদ্ধকরণ সংক্রান্ত জাতিসংঘ সনদ।',
    simpleSummary: 'A global agreement banning racism, discrimination, and apartheid, requiring states to punish racist violence and promote racial equality.',
    explainLike15: 'The world\'s anti-racism treaty requiring governments to pass laws so that nobody is treated worse because of their skin color or ethnic heritage.',
    fullOfficialTextExcerpt: 'The States Parties to this Convention, Considering that the Charter of the United Nations is based on the principles of the dignity and equality inherent in all human beings... Convinced that any doctrine of superiority based on racial differentiation is scientifically false, morally condemnable, socially unjust and dangerous... Have agreed as follows...',
    keyHighlights: [
      'Definition of Racial Discrimination (Art. 1): Any distinction, exclusion, restriction, or preference based on race, colour, descent, or ethnic origin.',
      'Prohibition of Hate Speech (Art. 4): Outlaws dissemination of ideas based on racial superiority or incitement to racial discrimination.',
      'Equal Access (Art. 5): Guarantees equality in courts, elections, employment, housing, and public spaces.'
    ],
    sections: [
      {
        number: 'Article 1',
        title: 'Definition of Racial Discrimination',
        titleBn: 'বর্ণবৈষম্যের সার্বজনীন সংজ্ঞা',
        content: 'In this Convention, the term "racial discrimination" shall mean any distinction, exclusion, restriction or preference based on race, colour, descent, or national or ethnic origin which has the purpose or effect of nullifying or impairing the recognition, enjoyment or exercise, on an equal footing, of human rights and fundamental freedoms.',
        contentBn: 'বর্ণ, চামড়ার রঙ, বংশমর্যাদা বা জাতীয় পরিচয়ের ভিত্তিতে যেকোনো বৈষম্য বা অধিকার সংকোচনের কর্মকাণ্ড বর্ণবৈষম্য হিসেবে গণ্য হবে।',
        simpleExplanation: 'Treating someone unfairly or denying them rights due to their ethnicity or race is legally defined as racial discrimination.',
        punishmentOrRemedy: 'State obligation to amend discriminatory domestic laws.',
        keyConcepts: ['Racial discrimination', 'Ethnic origin', 'Equality in rights']
      }
    ],
    timeline: [
      { year: '1965', title: 'Adoption by UNGA', description: 'Adopted on 21 December 1965 in response to global apartheid concerns.', status: 'enacted' },
      { year: '1969', title: 'Entry into Force', description: 'Entered into force on 4 January 1969.', status: 'enacted' },
      { year: '1979', title: 'Bangladesh Accession', description: 'Bangladesh acceded on 11 June 1979.', status: 'upheld' }
    ],
    relatedLawIds: ['bd-constitution-1972', 'int-udhr-1948', 'int-iccpr-1966'],
    citations: {
      standard: 'International Convention on the Elimination of All Forms of Racial Discrimination, Dec. 21, 1965, 660 U.N.T.S. 195',
      academic: 'CERD (1965), 660 UNTS 195, 5 ILM 352.',
      bluebook: 'International Convention on the Elimination of All Forms of Racial Discrimination art. 1, Dec. 21, 1965, 660 U.N.T.S. 195.'
    },
    keywords: ['cerd', 'racial discrimination', 'anti racism', 'equality before law', '660 unts 195']
  },

  // 5. CEDAW (1979) - Elimination of Discrimination Against Women
  {
    id: 'int-cedaw-1979',
    slug: 'convention-on-the-elimination-of-all-forms-of-discrimination-against-women-1979',
    title: 'Convention on the Elimination of All Forms of Discrimination against Women (CEDAW)',
    titleBn: 'নারীর প্রতি সকল ধরনের বৈষম্য বিলোপ সনদ (সিডও ১৯৭৯)',
    shortTitle: 'CEDAW (1979)',
    alternativeTitles: ['CEDAW', 'Women\'s Rights Treaty', '1249 UNTS 13'],
    jurisdiction: 'International',
    jurisdictionCode: 'INT',
    category: 'Human Rights',
    status: 'Active Treaty',
    instrumentType: 'Multilateral Treaty',
    enactmentYear: 1979,
    adoptionDate: '18 December 1979',
    entryIntoForceDate: '3 September 1981',
    totalStatutorySectionsCount: 30,
    isCuratedSubset: true,
    signatoriesCount: 189,
    ratificationsCount: 189,
    officialLanguages: ['English', 'French', 'Spanish', 'Russian', 'Chinese', 'Arabic'],
    depositary: 'Secretary-General of the United Nations',
    officialGazetteRef: '1249 U.N.T.S. 13',
    unCitationRef: '1249 UNTS 13 / 19 ILM 33 (1980)',
    officialSource: 'United Nations Treaty Collection / OHCHR (ohchr.org)',
    sourceOrganization: 'Committee on the Elimination of Discrimination against Women (CEDAW)',
    sourceVerificationUrl: 'https://treaties.un.org/pages/ViewDetails.aspx?src=TREATY&mtdsg_no=IV-8&chapter=4&clang=_en',
    lastUpdatedDate: 'January 2025',
    verificationStatus: 'Verified Multilateral Depositary',
    sourceReproductionNotice: 'Official certified text published in 1249 UNTS 13. Known as the international bill of rights for women.',
    bangladeshRatificationStatus: 'Bangladesh acceded on 6 November 1984 with reservations to Articles 2 and 16(1)(c) relating to personal and inheritance laws.',
    bangladeshDomesticApplicationNote: 'Directly invoked by the Supreme Court of Bangladesh in BNWLA v. Bangladesh (2009) to formulate national judicial guidelines against sexual harassment in workplaces and educational institutions.',
    overview: 'Often described as the international bill of rights for women, CEDAW defines what constitutes discrimination against women and sets up an agenda for national action to end such discrimination in political, economic, social, and family life.',
    overviewBn: 'নারীদের আন্তর্জাতিক অধিকার সনদ যা শিক্ষা, কর্মসংস্থান, রাজনীতি ও পারিবারিক ক্ষেত্রে নারীর সমানাধিকার নিশ্চিত করে।',
    simpleSummary: 'An international treaty ensuring women have the exact same rights as men in education, jobs, voting, property ownership, and healthcare.',
    explainLike15: 'The world\'s contract for gender equality. It tells countries to eliminate rules that hold women back, prevent workplace sexual harassment, and ensure equal voting and property rights.',
    fullOfficialTextExcerpt: 'The States Parties to the present Convention, Noting that the Charter of the United Nations reaffirms faith in fundamental human rights... Recalling that discrimination against women violates the principles of equality of rights and respect for human dignity... Have agreed on the following...',
    keyHighlights: [
      'Discrimination Defined (Art. 1): Any distinction, exclusion or restriction made on the basis of sex.',
      'Special Measures / Affirmative Action (Art. 4): Temporary special measures to accelerate de facto equality are permissible.',
      'Harassment and Violence: Interpreted via General Recommendation No. 19/35 as prohibited discrimination.'
    ],
    sections: [
      {
        number: 'Article 1',
        title: 'Definition of Discrimination Against Women',
        titleBn: 'নারীর প্রতি বৈষম্যের আইনি সংজ্ঞা',
        content: 'For the purposes of the present Convention, the term "discrimination against women" shall mean any distinction, exclusion or restriction made on the basis of sex which has the effect or purpose of impairing or nullifying the recognition, enjoyment or exercise by women, irrespective of their marital status, on a basis of equality of men and women, of human rights and fundamental freedoms in the political, economic, social, cultural, civil or any other field.',
        contentBn: 'লিঙ্গের ভিত্তিতে যেকোনো বৈষম্য, বঞ্চনা বা বিধিনিষেধ যা নারীর মানবাধিকার ও মৌলিক স্বাধীনতা প্রয়োগকে ব্যাহত করে, তা নারীর প্রতি বৈষম্য হিসেবে গণ্য হবে।',
        simpleExplanation: 'Treating a woman unfairly in work, politics, or society simply because she is female is outlawed.',
        punishmentOrRemedy: 'Duty to repeal discriminatory laws and enact protection statutes.',
        keyConcepts: ['Gender equality', 'Direct and indirect discrimination', 'Substantive equality']
      },
      {
        number: 'Article 11',
        title: 'Equality in Employment and Working Rights',
        titleBn: 'কর্মসংস্থান ও কর্মক্ষেত্রে সমানাধিকার',
        content: 'States Parties shall take all appropriate measures to eliminate discrimination against women in the field of employment in order to ensure, on a basis of equality of men and women, the same rights, in particular: (a) The right to work; (b) The right to the same employment opportunities; (c) The right to equal remuneration and equal treatment.',
        contentBn: 'কর্মসংস্থানে নারীর প্রতি বৈষম্য দূর করতে সমকাজে সমমজুরি, পদোন্নতি ও মাতৃত্বকালীন সুরক্ষা নিশ্চিত করতে হবে।',
        simpleExplanation: 'Women have equal rights to jobs, equal pay for equal work, and paid maternity leave without being fired.',
        punishmentOrRemedy: 'Enforcement under Bangladesh Labor Act 2006 maternity and anti-discrimination provisions.',
        keyConcepts: ['Equal pay', 'Maternity protection', 'No employment discrimination']
      }
    ],
    timeline: [
      { year: '1979', title: 'Adoption in New York', description: 'Adopted by UN General Assembly on 18 December 1979.', status: 'enacted' },
      { year: '1981', title: 'Entry into Force', description: 'Entered into force on 3 September 1981.', status: 'enacted' },
      { year: '1984', title: 'Bangladesh Accession', description: 'Bangladesh acceded on 6 November 1984.', status: 'upheld' }
    ],
    relatedLawIds: ['bd-constitution-1972', 'bd-labor-act-2006', 'int-udhr-1948'],
    citations: {
      standard: 'Convention on the Elimination of All Forms of Discrimination against Women, Dec. 18, 1979, 1249 U.N.T.S. 13',
      academic: 'CEDAW (1979), 1249 UNTS 13, 19 ILM 33.',
      bluebook: 'Convention on the Elimination of All Forms of Discrimination against Women art. 1, Dec. 18, 1979, 1249 U.N.T.S. 13.'
    },
    keywords: ['cedaw', 'womens rights', 'gender equality', 'equal pay', 'maternity benefit', 'anti harassment', '1249 unts 13']
  },

  // 6. CAT (1984) - Convention Against Torture
  {
    id: 'int-cat-1984',
    slug: 'convention-against-torture-and-other-cruel-treatment-1984',
    title: 'Convention against Torture and Other Cruel, Inhuman or Degrading Treatment (CAT)',
    titleBn: 'নির্যাতনবিরোধী আন্তর্জাতিক কনভেনশন (সিএটি ১৯৮৪)',
    shortTitle: 'CAT (1984)',
    alternativeTitles: ['Convention against Torture', 'CAT', '1465 UNTS 85'],
    jurisdiction: 'International',
    jurisdictionCode: 'INT',
    category: 'Human Rights',
    status: 'Active Treaty',
    instrumentType: 'Multilateral Treaty',
    enactmentYear: 1984,
    adoptionDate: '10 December 1984',
    entryIntoForceDate: '26 June 1987',
    totalStatutorySectionsCount: 33,
    isCuratedSubset: true,
    signatoriesCount: 173,
    ratificationsCount: 173,
    officialLanguages: ['English', 'French', 'Spanish', 'Russian', 'Chinese', 'Arabic'],
    depositary: 'Secretary-General of the United Nations',
    officialGazetteRef: '1465 U.N.T.S. 85',
    unCitationRef: '1465 UNTS 85 / 23 ILM 1027 (1984)',
    officialSource: 'United Nations Treaty Collection / OHCHR',
    sourceOrganization: 'Committee against Torture (CAT)',
    sourceVerificationUrl: 'https://treaties.un.org/pages/ViewDetails.aspx?src=TREATY&mtdsg_no=IV-9&chapter=4&clang=_en',
    lastUpdatedDate: 'January 2025',
    verificationStatus: 'Verified Multilateral Depositary',
    sourceReproductionNotice: 'Official certified text published in 1465 UNTS 85. Monitored by the UN Committee against Torture in Geneva.',
    bangladeshRatificationStatus: 'Bangladesh acceded on 5 October 1998.',
    bangladeshDomesticApplicationNote: 'Enacted specific domestic enabling legislation: Torture and Custodial Death (Prevention) Act 2013 (Act No. 50 of 2013), making custodial torture a non-bailable, punishable penal offense.',
    overview: 'The international human rights treaty that aims to prevent torture and other cruel, inhuman, or degrading treatment or punishment around the world, requiring states to take effective measures in any territory under their jurisdiction and forbidding extradition to countries where torture is likely (non-refoulement).',
    overviewBn: 'পুলিশি বা রাষ্ট্রীয় হেফাজতে নির্যাতন নিষিদ্ধকরণ এবং অপরাধীদের বিচারের আওতায় আনার বাধ্যবাধকতা আরোপকারী আন্তর্জাতিক চুক্তি।',
    simpleSummary: 'An absolute global ban on police torture. No emergency, war, or superior order can ever justify torturing a human being.',
    explainLike15: 'Even if there is a war, a national emergency, or an order from the highest general, torture is 100% illegal everywhere, always.',
    fullOfficialTextExcerpt: 'The States Parties to this Convention, Considering that, in accordance with the principles proclaimed in the Charter of the United Nations, recognition of the equal and inalienable rights of all members of the human family is the foundation of freedom, justice and peace in the world... Desiring to make more effective the struggle against torture and other cruel, inhuman or degrading treatment or punishment... Have agreed as follows...',
    keyHighlights: [
      'No Exceptional Circumstances (Art. 2(2)): No state of war, threat of war, or public emergency may be invoked as a justification of torture.',
      'Superior Orders No Defense (Art. 2(3)): An order from a superior officer may not be invoked as a justification of torture.',
      'Non-Refoulement to Torture (Art. 3): No state shall expel or extradite a person to another state where they risk being tortured.'
    ],
    sections: [
      {
        number: 'Article 1',
        title: 'Definition of Torture',
        titleBn: 'নির্যাতনের প্রামাণ্য সংজ্ঞা',
        content: 'For the purposes of this Convention, the term "torture" means any act by which severe pain or suffering, whether physical or mental, is intentionally inflicted on a person for such purposes as obtaining from him or a third person information or a confession, punishing him for an act he or a third person has committed, or intimidating or coercing him, when such pain or suffering is inflicted by or at the instigation of or with the consent or acquiescence of a public official.',
        contentBn: 'তথ্য আদায়, স্বীকারোক্তি গ্রহণ বা শাস্তির উদ্দেশ্যে সরকারি কর্মকর্তার প্রত্যক্ষ বা পরোক্ষ মদদে তীব্র শারীরিক বা মানসিক যন্ত্রণা প্রদানই নির্যাতন।',
        simpleExplanation: 'Severe physical or psychological agony inflicted with government involvement to force a confession or punish someone.',
        punishmentOrRemedy: 'Universal jurisdiction prosecution and mandatory prison sentences.',
        keyConcepts: ['Definition of torture', 'Public official involvement', 'Severe physical/mental pain']
      },
      {
        number: 'Article 15',
        title: 'Inadmissibility of Evidence Obtained by Torture',
        titleBn: 'নির্যাতনের মাধ্যমে আদায়কৃত স্বীকারোক্তির অগ্রহণযোগ্যতা',
        content: 'Each State Party shall ensure that any statement which is established to have been made as a result of torture shall not be invoked as evidence in any proceedings, except against a person accused of torture as evidence that the statement was made.',
        contentBn: 'নির্যাতনের মাধ্যমে আদায় করা কোনো জবানবন্দি বা সাক্ষ্য আদালতে গ্রহণযোগ্য হবে না।',
        simpleExplanation: 'Judges cannot accept confessions beaten out of suspects by police.',
        punishmentOrRemedy: 'Total exclusion of coerced evidence from criminal trials.',
        keyConcepts: ['Exclusionary rule', 'Tainted confession', 'Custodial interrogation safeguards']
      }
    ],
    timeline: [
      { year: '1984', title: 'Adoption in New York', description: 'Adopted by UN General Assembly Resolution 39/46 on 10 December 1984.', status: 'enacted' },
      { year: '1987', title: 'Entry into Force', description: 'Entered into force on 26 June 1987 (observed globally as International Day in Support of Victims of Torture).', status: 'enacted' },
      { year: '2013', title: 'Bangladesh Enabling Act', description: 'Parliament of Bangladesh enacted the Torture and Custodial Death (Prevention) Act 2013.', status: 'upheld' }
    ],
    relatedLawIds: ['bd-constitution-1972', 'bd-crpc-1898', 'int-iccpr-1966'],
    citations: {
      standard: 'Convention against Torture and Other Cruel, Inhuman or Degrading Treatment or Punishment, Dec. 10, 1984, 1465 U.N.T.S. 85',
      academic: 'CAT (1984), 1465 UNTS 85, 23 ILM 1027.',
      bluebook: 'Convention against Torture art. 1, Dec. 10, 1984, 1465 U.N.T.S. 85.'
    },
    keywords: ['cat', 'convention against torture', 'police brutality', 'custodial death', 'non refoulement', '1465 unts 85']
  },

  // 7. CRC (1989) - Convention on the Rights of the Child
  {
    id: 'int-crc-1989',
    slug: 'convention-on-the-rights-of-the-child-1989',
    title: 'Convention on the Rights of the Child (CRC)',
    titleBn: 'জাতিসংঘ শিশু অধিকার সনদ (১৯৮৯)',
    shortTitle: 'CRC (1989)',
    alternativeTitles: ['UNCRC', 'Child Rights Convention', '1577 UNTS 3'],
    jurisdiction: 'International',
    jurisdictionCode: 'INT',
    category: 'Human Rights',
    status: 'Active Treaty',
    instrumentType: 'Multilateral Treaty',
    enactmentYear: 1989,
    adoptionDate: '20 November 1989',
    entryIntoForceDate: '2 September 1990',
    totalStatutorySectionsCount: 54,
    isCuratedSubset: true,
    signatoriesCount: 196,
    ratificationsCount: 196,
    officialLanguages: ['English', 'French', 'Spanish', 'Russian', 'Chinese', 'Arabic'],
    depositary: 'Secretary-General of the United Nations',
    officialGazetteRef: '1577 U.N.T.S. 3',
    unCitationRef: '1577 UNTS 3 / 28 ILM 1456 (1989)',
    officialSource: 'United Nations Treaty Collection / UNICEF / OHCHR',
    sourceOrganization: 'UN Committee on the Rights of the Child / UNICEF',
    sourceVerificationUrl: 'https://treaties.un.org/pages/ViewDetails.aspx?src=TREATY&mtdsg_no=IV-11&chapter=4&clang=_en',
    lastUpdatedDate: 'January 2025',
    verificationStatus: 'Verified Multilateral Depositary',
    sourceReproductionNotice: 'Official certified text published in 1577 UNTS 3. The most widely ratified human rights treaty in history (196 State Parties).',
    bangladeshRatificationStatus: 'Bangladesh signed on 26 January 1990 and ratified on 3 August 1990, becoming one of the earliest state parties.',
    bangladeshDomesticApplicationNote: 'Implemented through the Children Act 2013 (Act No. 24 of 2013), replacing the 1974 Act, creating specialized Children Courts, Child Affairs Desks at police stations, and establishing 18 years as the uniform threshold of childhood.',
    overview: 'The preeminent human rights treaty recognizing that children (under 18) are human beings with distinct developmental rights, establishing four core principles: non-discrimination, best interests of the child, the right to survival and development, and the child\'s right to be heard.',
    overviewBn: 'বিশ্বের সর্বাধিক স্বীকৃত মানবাধিকার চুক্তি যা ১৮ বছরের কম বয়সী সকল শিশুর জীবন, সুরক্ষা, শিক্ষা, স্বাস্থ্য ও পারিবারিক অধিকার নিশ্চিত করে।',
    simpleSummary: 'A world agreement protecting all children under 18 from child labor, abuse, and poverty, while guaranteeing their rights to school and safety.',
    explainLike15: 'The global promise to kids: you have the right to grow up safe from violence, go to school, see a doctor when sick, and not be forced into child labor or child marriage.',
    fullOfficialTextExcerpt: 'The States Parties to the present Convention, Considering that, in accordance with the principles proclaimed in the Charter of the United Nations, recognition of the inherent dignity and of the equal and inalienable rights of all members of the human family is the foundation of freedom, justice and peace in the world... Have agreed as follows...',
    keyHighlights: [
      'Best Interests of the Child (Art. 3): In all actions concerning children, the best interests of the child shall be a primary consideration.',
      'Protection from Child Labour (Art. 32): Protects children from economic exploitation and hazardous work.',
      'Right to be Heard (Art. 12): Child has the right to express views freely in all matters affecting them.'
    ],
    sections: [
      {
        number: 'Article 3',
        title: 'Best Interests of the Child as Primary Consideration',
        titleBn: 'শিশুর সর্বোত্তম স্বার্থকে অগ্রাধিকার প্রদান',
        content: 'In all actions concerning children, whether undertaken by public or private social welfare institutions, courts of law, administrative authorities or legislative bodies, the best interests of the child shall be a primary consideration.',
        contentBn: 'আদালত, প্রশাসন বা সমাজকল্যাণ বিষয়ক সকল সিদ্ধান্তে শিশুর সর্বোত্তম স্বার্থকে সর্বোচ্চ অগ্রাধিকার দিতে হবে।',
        simpleExplanation: 'Judges and social workers must always pick what is best for the child\'s well-being and safety.',
        punishmentOrRemedy: 'Mandatory standard applied in child custody, guardianship, and juvenile justice proceedings.',
        keyConcepts: ['Best interests standard', 'Child welfare', 'Judicial priority']
      },
      {
        number: 'Article 32',
        title: 'Protection from Hazardous Child Labour',
        titleBn: 'ঝুঁকিপূর্ণ শিশুশ্রম থেকে সুরক্ষা',
        content: 'States Parties recognize the right of the child to be protected from economic exploitation and from performing any work that is likely to be hazardous or to interfere with the child\'s education, or to be harmful to the child\'s health or physical, mental, spiritual, moral or social development.',
        contentBn: 'অর্থনৈতিক শোষণ এবং শিশুর শিক্ষা ও স্বাস্থ্যের জন্য ক্ষতিকর বা ঝুঁকিপূর্ণ যেকোনো কাজ থেকে শিশুকে সুরক্ষা দিতে হবে।',
        simpleExplanation: 'Kids cannot be forced to work in factories or dangerous jobs that stop them from going to school.',
        punishmentOrRemedy: 'Enforcement under Bangladesh Labor Act 2006 penalties for employing child labor.',
        keyConcepts: ['Abolition of child labor', 'Education priority', 'Hazardous employment ban']
      }
    ],
    timeline: [
      { year: '1989', title: 'Adoption in New York', description: 'Adopted unanimously by UN General Assembly on 20 November 1989.', status: 'enacted' },
      { year: '1990', title: 'Bangladesh Early Ratification', description: 'Bangladesh ratified on 3 August 1990.', status: 'upheld' },
      { year: '2013', title: 'Enactment of Children Act 2013', description: 'Bangladesh overhauled juvenile justice aligning completely with CRC standards.', status: 'upheld' }
    ],
    relatedLawIds: ['bd-labor-act-2006', 'int-udhr-1948', 'bd-constitution-1972'],
    citations: {
      standard: 'Convention on the Rights of the Child, Nov. 20, 1989, 1577 U.N.T.S. 3',
      academic: 'CRC (1989), 1577 UNTS 3, 28 ILM 1456.',
      bluebook: 'Convention on the Rights of the Child art. 3, Nov. 20, 1989, 1577 U.N.T.S. 3.'
    },
    keywords: ['crc', 'child rights', 'best interests of the child', 'child labor', 'juvenile justice', 'children act 2013']
  },

  // 8. CRPD (2006) - Rights of Persons with Disabilities
  {
    id: 'int-crpd-2006',
    slug: 'convention-on-the-rights-of-persons-with-disabilities-2006',
    title: 'Convention on the Rights of Persons with Disabilities (CRPD)',
    titleBn: 'প্রতিবন্ধী ব্যক্তিদের অধিকার বিষয়ক আন্তর্জাতিক সনদ (সিআরপিডি ২০০৬)',
    shortTitle: 'CRPD (2006)',
    alternativeTitles: ['CRPD', 'Disability Rights Convention', '2515 UNTS 3'],
    jurisdiction: 'International',
    jurisdictionCode: 'INT',
    category: 'Human Rights',
    status: 'Active Treaty',
    instrumentType: 'Multilateral Treaty',
    enactmentYear: 2006,
    adoptionDate: '13 December 2006',
    entryIntoForceDate: '3 May 2008',
    totalStatutorySectionsCount: 50,
    isCuratedSubset: true,
    signatoriesCount: 191,
    ratificationsCount: 191,
    officialLanguages: ['English', 'French', 'Spanish', 'Russian', 'Chinese', 'Arabic'],
    depositary: 'Secretary-General of the United Nations',
    officialGazetteRef: '2515 U.N.T.S. 3',
    unCitationRef: '2515 UNTS 3 / UN Doc. A/RES/61/106',
    officialSource: 'United Nations Treaty Collection / Enable Portal (un.org/development/desa/disabilities)',
    sourceOrganization: 'Committee on the Rights of Persons with Disabilities / UN DESA',
    sourceVerificationUrl: 'https://treaties.un.org/pages/ViewDetails.aspx?src=TREATY&mtdsg_no=IV-15&chapter=4&clang=_en',
    lastUpdatedDate: 'January 2025',
    verificationStatus: 'Verified Multilateral Depositary',
    sourceReproductionNotice: 'Official certified text published in 2515 UNTS 3. Paradigm shift from charity model to human rights model of disability.',
    bangladeshRatificationStatus: 'Bangladesh signed on 9 May 2007 and ratified on 30 November 2007.',
    bangladeshDomesticApplicationNote: 'Implemented through the Rights and Protection of Persons with Disabilities Act 2013 (Act No. 39 of 2013), guaranteeing accessibility in public infrastructure and penalizing discrimination.',
    overview: 'A milestone human rights treaty intended to protect the rights and dignity of persons with disabilities, shifting disability discourse from medical charity to an empowered civil rights framework ensuring accessibility, legal capacity, and non-discrimination.',
    overviewBn: 'প্রতিবন্ধী ব্যক্তিদের সমান মানবিক মর্যাদা, আইনি সক্ষমতা, ভবনে প্রবেশগম্যতা এবং বৈষম্যহীন কর্মসংস্থান নিশ্চিতকরণ বিষয়ক সনদ।',
    simpleSummary: 'A global agreement ensuring people with disabilities have equal rights to jobs, education, accessible public buildings, and voting.',
    explainLike15: 'Cities and websites must be built so everyone can use them—ramps for wheelchairs, braille for blind people, and equal opportunities for work without discrimination.',
    fullOfficialTextExcerpt: 'The States Parties to the present Convention, Recalling the principles proclaimed in the Charter of the United Nations which recognize the inherent dignity and worth and the equal and inalienable rights of all members of the human family... Convinced that a comprehensive and integral international convention to promote and protect the rights and dignity of persons with disabilities will make a significant contribution... Have agreed as follows...',
    keyHighlights: [
      'Accessibility (Art. 9): States must ensure access to physical environment, transport, and digital information systems.',
      'Equal Recognition Before the Law (Art. 12): Persons with disabilities enjoy legal capacity on an equal basis with others.',
      'Reasonable Accommodation: Failure to provide reasonable accommodation is recognized as prohibited discrimination.'
    ],
    sections: [
      {
        number: 'Article 9',
        title: 'Accessibility to Physical and Digital Environments',
        titleBn: 'ভৌত ও ডিজিটাল ক্ষেত্রে প্রবেশগম্যতার অধিকার',
        content: 'To enable persons with disabilities to live independently and participate fully in all aspects of life, States Parties shall take appropriate measures to ensure to persons with disabilities access, on an equal basis with others, to the physical environment, to transportation, to information and communications, including information and communications technologies and systems, and to other facilities and services open or provided to the public.',
        contentBn: 'প্রতিবন্ধী ব্যক্তিদের স্বাধীন জীবনযাপনে সরকারি ভবন, গণপরিবহন এবং ডিজিটাল যোগাযোগ মাধ্যমে সমান প্রবেশগম্যতা নিশ্চিত করতে হবে।',
        simpleExplanation: 'Public offices, transport, schools, and websites must be accessible to people with mobility, visual, or hearing disabilities.',
        punishmentOrRemedy: 'Enforcement under national building codes and accessibility directives.',
        keyConcepts: ['Accessibility', 'Universal design', 'Digital inclusion']
      }
    ],
    timeline: [
      { year: '2006', title: 'Adoption in New York', description: 'Adopted by UN General Assembly on 13 December 2006.', status: 'enacted' },
      { year: '2007', title: 'Bangladesh Ratification', description: 'Bangladesh ratified on 30 November 2007.', status: 'upheld' },
      { year: '2013', title: 'Bangladesh Enabling Act', description: 'Enacted Rights and Protection of Persons with Disabilities Act 2013.', status: 'upheld' }
    ],
    relatedLawIds: ['bd-constitution-1972', 'int-udhr-1948', 'int-icescr-1966'],
    citations: {
      standard: 'Convention on the Rights of Persons with Disabilities, Dec. 13, 2006, 2515 U.N.T.S. 3',
      academic: 'CRPD (2006), 2515 UNTS 3, 46 ILM 443.',
      bluebook: 'Convention on the Rights of Persons with Disabilities art. 9, Dec. 13, 2006, 2515 U.N.T.S. 3.'
    },
    keywords: ['crpd', 'disability rights', 'accessibility', 'reasonable accommodation', 'inclusion', '2515 unts 3']
  },

  // 9. ICPPED (2006) - Protection from Enforced Disappearance
  {
    id: 'int-icpped-2006',
    slug: 'international-convention-protection-all-persons-enforced-disappearance-2006',
    title: 'International Convention for the Protection of All Persons from Enforced Disappearance (ICPPED)',
    titleBn: 'বলপূর্বক গুমের বিরুদ্ধে সকল ব্যক্তির সুরক্ষার্থে আন্তর্জাতিক কনভেনশন (২০০৬)',
    shortTitle: 'ICPPED (2006)',
    alternativeTitles: ['Enforced Disappearance Convention', 'ICPPED', '2716 UNTS 3'],
    jurisdiction: 'International',
    jurisdictionCode: 'INT',
    category: 'Human Rights',
    status: 'Active Treaty',
    instrumentType: 'Multilateral Treaty',
    enactmentYear: 2006,
    adoptionDate: '20 December 2006',
    entryIntoForceDate: '23 December 2010',
    totalStatutorySectionsCount: 45,
    isCuratedSubset: true,
    signatoriesCount: 115,
    ratificationsCount: 76,
    officialLanguages: ['English', 'French', 'Spanish', 'Russian', 'Chinese', 'Arabic'],
    depositary: 'Secretary-General of the United Nations',
    officialGazetteRef: '2716 U.N.T.S. 3',
    unCitationRef: '2716 UNTS 3 / UN Doc. A/RES/61/177',
    officialSource: 'United Nations Treaty Collection / OHCHR',
    sourceOrganization: 'Committee on Enforced Disappearances (CED)',
    sourceVerificationUrl: 'https://treaties.un.org/pages/ViewDetails.aspx?src=TREATY&mtdsg_no=IV-16&chapter=4&clang=_en',
    lastUpdatedDate: 'January 2025',
    verificationStatus: 'Verified Multilateral Depositary',
    sourceReproductionNotice: 'Official certified text published in 2716 UNTS 3. Monitored by the Committee on Enforced Disappearances in Geneva.',
    bangladeshRatificationStatus: 'Bangladesh signed on 29 August 2024, committing to formal accession. Commission of Inquiry on Enforced Disappearances established by government gazette.',
    bangladeshDomesticApplicationNote: 'Under Article 32 and Article 33 of the Bangladesh Constitution, secret detentions are unconstitutional. Supreme Court guidelines in BLAST v. Bangladesh require mandatory registration and disclosure of all detained individuals within 24 hours.',
    overview: 'A key international human rights instrument that affirms that no exceptional circumstances whatsoever (whether a state of war, threat of war, or public emergency) may be invoked to justify enforced disappearance, requiring criminalization under domestic penal codes and the right to know the truth for victims\' families.',
    overviewBn: 'রাষ্ট্রীয় বাহিনী বা সরকারি কর্মকর্তাদের দ্বারা কাউকে গোপনে আটক, গুম বা গোপন বন্দিশালায় রাখার সার্বিক নিষেধাজ্ঞা প্রদানকারী আন্তর্জাতিক চুক্তি।',
    simpleSummary: 'A global treaty declaring that secret government abductions and secret detentions are strictly forbidden under all circumstances.',
    explainLike15: 'The police or military can never secretly kidnap someone and deny holding them. Families always have the legal right to know where their loved one is detained.',
    fullOfficialTextExcerpt: 'The States Parties to this Convention, Considering the obligation of States under the Charter of the United Nations to promote universal respect for, and observance of, human rights and fundamental freedoms... Determined to prevent enforced disappearances and to combat impunity for the crime of enforced disappearance... Have agreed upon the following articles...',
    keyHighlights: [
      'No Exceptional Circumstances (Art. 1(2)): No war, emergency, or state stability justification permitted.',
      'Crime Against Humanity (Art. 5): Widespread or systematic enforced disappearance constitutes a crime against humanity.',
      'Right to Know the Truth (Art. 24): Families of disappeared persons have the right to know the truth regarding circumstances and fate.'
    ],
    sections: [
      {
        number: 'Article 1',
        title: 'Absolute Prohibition of Enforced Disappearance',
        titleBn: 'বলপূর্বক গুমের সম্পূর্ণ ও অনুলঙ্ঘনীয় নিষেধাজ্ঞা',
        content: '1. No one shall be subjected to enforced disappearance. 2. No exceptional circumstances whatsoever, whether a state of war or a threat of war, internal political instability or any other public emergency, may be invoked as a justification for enforced disappearance.',
        contentBn: 'কাউকেই বলপূর্বক গুম করা যাবে না। যুদ্ধাবস্থা, অভ্যন্তরীণ রাজনৈতিক অস্থিরতা বা জরুরি অবস্থার অজুহাতেও গুমের ঘটনাকে বৈধতা দেওয়া যাবে না।',
        simpleExplanation: 'Secret state kidnapping is completely outlawed with zero exceptions.',
        punishmentOrRemedy: 'Individual criminal liability and international investigation.',
        keyConcepts: ['Absolute prohibition', 'Non-derogability', 'State accountability']
      },
      {
        number: 'Article 17',
        title: 'Prohibition of Secret Detention and Maintenance of Official Registers',
        titleBn: 'গোপন বন্দিশালার নিষেধাজ্ঞা ও বন্দি তালিকা প্রকাশের বাধ্যবাধকতা',
        content: 'No one shall be held in secret detention. Each State Party shall guarantee that any person deprived of liberty shall be held solely in officially recognized and supervised places of detention, and that accurate official registers of detained persons are maintained and accessible.',
        contentBn: 'কাউকে গোপন বন্দিশালায় রাখা যাবে না; সকল বন্দিকে শুধুমাত্র সরকার কর্তৃক স্বীকৃত ও নিবন্ধিত কারাগারে রাখতে হবে এবং বন্দির পরিবারকে অবহিত করতে হবে।',
        simpleExplanation: 'All detainees must be kept in registered official jails where lawyers and relatives can see them.',
        punishmentOrRemedy: 'Habeas corpus writ under Article 102 and prosecution of offending officers.',
        keyConcepts: ['No secret detention', 'Official jail registry', 'Right to information']
      }
    ],
    timeline: [
      { year: '2006', title: 'Adoption in New York', description: 'Adopted by UN General Assembly Resolution 61/177 on 20 December 2006.', status: 'enacted' },
      { year: '2010', title: 'Entry into Force', description: 'Entered into force on 23 December 2010.', status: 'enacted' },
      { year: '2024', title: 'Bangladesh Signature & Commission', description: 'Bangladesh signed the instrument on 29 August 2024 and established the National Inquiry Commission.', status: 'active' }
    ],
    relatedLawIds: ['bd-constitution-1972', 'bd-crpc-1898', 'int-cat-1984'],
    citations: {
      standard: 'International Convention for the Protection of All Persons from Enforced Disappearance, Dec. 20, 2006, 2716 U.N.T.S. 3',
      academic: 'ICPPED (2006), 2716 UNTS 3, UN Doc. A/RES/61/177.',
      bluebook: 'International Convention for the Protection of All Persons from Enforced Disappearance art. 1, Dec. 20, 2006, 2716 U.N.T.S. 3.'
    },
    keywords: ['icpped', 'enforced disappearance', 'secret detention', 'right to truth', 'habeas corpus', '2716 unts 3']
  },

  // =========================================================================
  // B. INTERNATIONAL CRIMINAL LAW & HUMANITARIAN LAW
  // =========================================================================

  // 10. Rome Statute of the ICC (1998) [Constitutive Statute]
  {
    id: 'int-rome-statute-1998',
    slug: 'rome-statute-of-the-international-criminal-court-1998',
    title: 'Rome Statute of the International Criminal Court (1998)',
    titleBn: 'আন্তর্জাতিক ফৌজদারি আদালতের রোম সংবিধি (১৯৯৮)',
    shortTitle: 'Rome Statute (ICC 1998)',
    alternativeTitles: ['ICC Statute', 'Rome Statute', '2187 UNTS 3'],
    jurisdiction: 'International',
    jurisdictionCode: 'INT',
    category: 'International Criminal Law',
    status: 'Active Treaty',
    instrumentType: 'Constitutive Statute',
    enactmentYear: 1998,
    adoptionDate: '17 July 1998',
    entryIntoForceDate: '1 July 2002',
    totalStatutorySectionsCount: 128,
    isCuratedSubset: true,
    signatoriesCount: 124,
    ratificationsCount: 124,
    officialLanguages: ['English', 'French', 'Spanish', 'Russian', 'Chinese', 'Arabic'],
    depositary: 'Secretary-General of the United Nations',
    officialGazetteRef: '2187 U.N.T.S. 3',
    unCitationRef: '2187 UNTS 3 / UN Doc. A/CONF.183/9',
    officialSource: 'International Criminal Court (icc-cpi.int) & UN Treaty Collection',
    sourceOrganization: 'International Criminal Court (ICC) / UNTS',
    sourceVerificationUrl: 'https://www.icc-cpi.int/sites/default/files/RS-Eng.pdf',
    lastUpdatedDate: 'January 2025',
    verificationStatus: 'Verified Multilateral Depositary',
    sourceReproductionNotice: 'Official certified text of the Rome Statute establishing the International Criminal Court in The Hague.',
    bangladeshRatificationStatus: 'Bangladesh signed on 16 September 1999 and ratified on 23 March 2010, becoming the first South Asian state party.',
    bangladeshDomesticApplicationNote: 'Bangladesh cooperates with the ICC under Article 86, notably regarding investigations into crimes against humanity committed against Rohingya populations deported across the border into Bangladesh territory.',
    overview: 'The landmark multilateral constitutive treaty establishing the permanent International Criminal Court (ICC) in The Hague, exercising jurisdiction over individuals for the most serious crimes of international concern: Genocide, Crimes Against Humanity, War Crimes, and the Crime of Aggression.',
    overviewBn: 'আন্তর্জাতিক ফৌজদারি আদালত (ICC) প্রতিষ্ঠার ঐতিহাসিক সনদ যা গণহত্যা, মানবতাবিরোধী অপরাধ, যুদ্ধাপরাধ ও আগ্রাসনের অপরাধের জন্য বিশ্বনেতা ও সামরিক কমান্ডারদের ব্যক্তিগত ফৌজদারি দায় নিশ্চিত করে।',
    simpleSummary: 'Creates a permanent world court to put dictators, warlords, and military commanders on trial when they commit mass murder, war crimes, or genocide.',
    explainLike15: 'Before this treaty, if a ruler committed terrible atrocities, there was no permanent world court to arrest them. The Rome Statute created an independent court in The Hague so leaders cannot hide behind presidential immunity.',
    fullOfficialTextExcerpt: 'The States Parties to this Statute, Conscious that all peoples are united by common bonds, their cultures pieced together in a shared heritage... Mindful that during this century millions of children, women and men have been victims of unimaginable atrocities that deeply shock the conscience of humanity... Determined to put an end to impunity for the perpetrators of these crimes...',
    keyHighlights: [
      'Four Core Crimes (Art. 5): Genocide, Crimes against humanity, War crimes, Crime of aggression.',
      'No Head of State Immunity (Art. 27): Official capacity as President, Prime Minister, or General does not exempt a person from trial.',
      'Complementarity (Art. 17): ICC acts only when national courts are unwilling or genuinely unable to investigate.'
    ],
    sections: [
      {
        number: 'Article 5',
        title: 'Crimes within the Jurisdiction of the Court',
        titleBn: 'আদালতের এখতিয়ারভুক্ত অপরাধসমূহ',
        content: 'The jurisdiction of the Court shall be limited to the most serious crimes of concern to the international community as a whole. The Court has jurisdiction in accordance with this Statute with respect to: (a) The crime of genocide; (b) Crimes against humanity; (c) War crimes; (d) The crime of aggression.',
        contentBn: 'আদালতের এখতিয়ার শুধুমাত্র আন্তর্জাতিক সম্প্রদায়ের জন্য মারাত্মক ৪টি অপরাধের মধ্যে সীমাবদ্ধ থাকবে: (ক) গণহত্যা; (খ) মানবতাবিরোধী অপরাধ; (গ) যুদ্ধাপরাধ; (ঘ) আগ্রাসনের অপরাধ।',
        simpleExplanation: 'The ICC focuses only on the four most horrific crimes against humanity.',
        punishmentOrRemedy: 'Imprisonment up to 30 years or life imprisonment, forfeiture of proceeds, and victim reparations.',
        keyConcepts: ['Genocide', 'Crimes against humanity', 'War crimes', 'Aggression']
      },
      {
        number: 'Article 27',
        title: 'Irrelevance of Official Capacity (No Immunity)',
        titleBn: 'রাষ্ট্রপ্রধান বা সরকারি পদের দায়মুক্তির অকার্যকারিতা',
        content: 'This Statute shall apply equally to all persons without any distinction based on official capacity. In particular, official capacity as a Head of State or Government, a member of a Government or parliament, an elected representative or a government official shall in no case exempt a person from criminal responsibility.',
        contentBn: 'রাষ্ট্রপ্রধান, সরকারপ্রধান, মন্ত্রী বা সংসদ সদস্য হওয়া সত্ত্বেও কেউ আন্তর্জাতিক অপরাধের ব্যক্তিগত দায় থেকে কোনো দায়মুক্তি পাবে না।',
        simpleExplanation: 'Being a President or Prime Minister does not protect you from arrest and trial for atrocities.',
        punishmentOrRemedy: 'International arrest warrant issued via INTERPOL Red Notices.',
        keyConcepts: ['Abolition of official immunity', 'Individual criminal responsibility']
      }
    ],
    timeline: [
      { year: '1998', title: 'Adoption in Rome', description: 'Adopted at the diplomatic conference in Rome with 120 nations voting in favor.', status: 'enacted' },
      { year: '2002', title: 'Entry into Force', description: 'Entered into force on 1 July 2002 upon reaching 60 ratifications.', status: 'enacted' },
      { year: '2010', title: 'Bangladesh Ratification', description: 'Bangladesh deposited its instrument of ratification, becoming a State Party.', status: 'upheld' }
    ],
    relatedLawIds: ['int-geneva-1949', 'int-genocide-convention-1948', 'bd-penal-code-1860'],
    citations: {
      standard: 'Rome Statute of the International Criminal Court, July 17, 1998, 2187 U.N.T.S. 3',
      academic: 'Rome Statute of the ICC (1998), 2187 UNTS 3, UN Doc. A/CONF.183/9.',
      bluebook: 'Rome Statute of the International Criminal Court art. 5, July 17, 1998, 2187 U.N.T.S. 3.'
    },
    keywords: ['rome statute', 'icc', 'international criminal court', 'war crimes', 'genocide', 'crimes against humanity', 'the hague']
  },

  // 11. Geneva Conventions of 1949 & Additional Protocols
  {
    id: 'int-geneva-1949',
    slug: 'geneva-conventions-of-1949-and-additional-protocols',
    title: 'The Geneva Conventions of 1949 (Conventions I-IV)',
    titleBn: '১৯৪৯ সালের জেনেভা কনভেনশনসমূহ (যুদ্ধকালীন আইন)',
    shortTitle: 'Geneva Conventions (1949)',
    alternativeTitles: ['Geneva Conventions', 'Laws of Armed Conflict', 'IHL Treaties', '75 UNTS 31'],
    jurisdiction: 'International',
    jurisdictionCode: 'INT',
    category: 'Humanitarian Law',
    status: 'Active Treaty',
    instrumentType: 'Multilateral Treaty',
    enactmentYear: 1949,
    adoptionDate: '12 August 1949',
    entryIntoForceDate: '21 October 1950',
    totalStatutorySectionsCount: 429,
    isCuratedSubset: true,
    signatoriesCount: 196,
    ratificationsCount: 196,
    officialLanguages: ['English', 'French'],
    depositary: 'Swiss Federal Council (Bern)',
    officialGazetteRef: '75 U.N.T.S. 31, 85, 135, 287',
    unCitationRef: '75 UNTS 31 (I), 75 UNTS 85 (II), 75 UNTS 135 (III), 75 UNTS 287 (IV)',
    officialSource: 'International Committee of the Red Cross (ICRC IHL Database / ihl-databases.icrc.org)',
    sourceOrganization: 'Swiss Federal Council / ICRC',
    sourceVerificationUrl: 'https://ihl-databases.icrc.org/en/ihl-treaties/geneva-conventions-1949',
    lastUpdatedDate: 'January 2025',
    verificationStatus: 'Verified Multilateral Depositary',
    sourceReproductionNotice: 'Authenticated texts deposited with the Swiss Federal Council. Universally ratified by all 196 recognized sovereign States.',
    bangladeshRatificationStatus: 'Bangladesh deposited its declaration of succession on 20 December 1972.',
    bangladeshDomesticApplicationNote: 'Implemented through the Geneva Conventions Act 2018 (Act No. 29 of 2018) providing statutory penal sanctions for grave breaches.',
    overview: 'The four Geneva Conventions of 1949 and their Additional Protocols form the bedrock of International Humanitarian Law (IHL), regulating the conduct of armed conflict, protecting wounded soldiers, shipwrecked sailors, prisoners of war (POWs), and civilians in occupied territories.',
    overviewBn: 'যুদ্ধকালীন মানবিক আচরণের বৈশ্বিক বিধিমালা যা যুদ্ধবন্দী (POW), আহত সৈনিক, চিকিৎসাকর্মী এবং বেসামরিক নাগরিকদের সুরক্ষার নিশ্চয়তা দেয়।',
    simpleSummary: 'The universal rules of war protecting hospital workers, prisoners of war, and innocent civilians from bombings, executions, and torture during armed conflict.',
    explainLike15: 'Even in war, there are strict limits. Soldiers cannot shoot surrendered prisoners, target schools or hospitals, or torture civilians. Breaking these rules is a war crime.',
    fullOfficialTextExcerpt: 'The High Contracting Parties undertake to respect and to ensure respect for the present Convention in all circumstances... In the case of armed conflict not of an international character occurring in the territory of one of the High Contracting Parties, each Party to the conflict shall be bound to apply, as a minimum, the following provisions...',
    keyHighlights: [
      'Universal Ratification: Binding on every sovereign nation on Earth.',
      'Common Article 3: Minimum humanitarian guarantees applying even in non-international civil wars and internal insurgencies.',
      'Grave Breaches: Wilful killing, torture, hostage-taking, and extensive destruction of property are universal war crimes.'
    ],
    sections: [
      {
        number: 'Common Article 3',
        title: 'Minimum Humanitarian Standards in Armed Conflicts',
        titleBn: 'সশস্ত্র সংঘাতের ন্যূনতম মানবিক নীতিমালা',
        content: 'Persons taking no active part in the hostilities, including members of armed forces who have laid down their arms and those placed hors de combat by sickness, wounds, detention, or any other cause, shall in all circumstances be treated humanely, without any adverse distinction. To this end, the following acts are and shall remain prohibited at any time and in any place: (a) violence to life and person, in particular murder of all kinds, mutilation, cruel treatment and torture; (b) taking of hostages; (c) outrages upon personal dignity, in particular humiliating and degrading treatment; (d) the passing of sentences and the carrying out of executions without previous judgment pronounced by a regularly constituted court.',
        contentBn: 'অস্ত্র সমর্পণকারী সৈনিক, যুদ্ধবন্দী ও বেসামরিক নাগরিকদের নির্যাতন, জিম্মি করা, অবমাননাকর আচরণ এবং আদালতের রায় ছাড়া মৃত্যুদণ্ড কার্যকর করা সম্পূর্ণ নিষিদ্ধ।',
        simpleExplanation: 'Anyone not actively fighting must be treated humanely. Summary executions, hostage-taking, and torture are forbidden anywhere.',
        punishmentOrRemedy: 'War crime prosecution before the ICC or national war crimes tribunals.',
        keyConcepts: ['Hors de combat', 'Non-combatant immunity', 'Prohibition of summary execution']
      },
      {
        number: 'Article 27 (Fourth Convention)',
        title: 'Protection of Civilian Persons and Women',
        titleBn: 'বেসামরিক নাগরিক ও নারীদের নিরাপত্তা ও সুরক্ষা',
        content: 'Protected persons are entitled, in all circumstances, to respect for their persons, their honour, their family rights, their religious convictions and practices, and their manners and customs. They shall at all times be humanely treated, and shall be protected especially against all acts of violence or threats thereof and against insults and public curiosity. Women shall be especially protected against any attack on their honour, in particular against rape, enforced prostitution, or any form of indecent assault.',
        contentBn: 'দখলীকৃত এলাকায় বেসামরিক নাগরিকদের ধর্মীয় ও পারিবারিক অধিকার অক্ষুণ্ণ থাকবে এবং নারীদের ধর্ষণ ও যৌন সহিংসতা থেকে কঠোরভাবে সুরক্ষা দিতে হবে।',
        simpleExplanation: 'Occupying armies must protect civilians and their families from violence, rape, and looting.',
        punishmentOrRemedy: 'Grave breach war crime classification carrying mandatory universal jurisdiction.',
        keyConcepts: ['Civilian protection', 'Prohibition of sexual violence in conflict', 'Occupied territory']
      }
    ],
    timeline: [
      { year: '1949', title: 'Adoption in Geneva', description: 'Formulated at the diplomatic conference in Geneva on 12 August 1949.', status: 'enacted' },
      { year: '1950', title: 'Entry into Force', description: 'Came into force on 21 October 1950.', status: 'enacted' },
      { year: '1972', title: 'Bangladesh Succession', description: 'Bangladesh formally succeeded to all 4 Geneva Conventions on 20 December 1972.', status: 'upheld' }
    ],
    relatedLawIds: ['int-rome-statute-1998', 'int-genocide-convention-1948', 'bd-penal-code-1860'],
    citations: {
      standard: 'Geneva Convention Relative to the Protection of Civilian Persons in Time of War, Aug. 12, 1949, 75 U.N.T.S. 287',
      academic: 'Geneva Conventions I-IV (1949), 75 UNTS 31, 85, 135, 287.',
      bluebook: 'Geneva Convention IV art. 27, Aug. 12, 1949, 6 U.S.T. 3516, 75 U.N.T.S. 287.'
    },
    keywords: ['geneva conventions', 'ihl', 'laws of war', 'common article 3', 'prisoners of war', 'civilian immunity', '75 unts 287']
  },

  // 12. Genocide Convention (1948)
  {
    id: 'int-genocide-convention-1948',
    slug: 'convention-on-prevention-and-punishment-of-crime-of-genocide-1948',
    title: 'Convention on the Prevention and Punishment of the Crime of Genocide (1948)',
    titleBn: 'গণহত্যা প্রতিরোধ ও শাস্তি সংক্রান্ত আন্তর্জাতিক কনভেনশন (১৯৪৮)',
    shortTitle: 'Genocide Convention (1948)',
    alternativeTitles: ['Genocide Convention', '78 UNTS 277'],
    jurisdiction: 'International',
    jurisdictionCode: 'INT',
    category: 'International Criminal Law',
    status: 'Active Treaty',
    instrumentType: 'Multilateral Treaty',
    enactmentYear: 1948,
    adoptionDate: '9 December 1948',
    entryIntoForceDate: '12 January 1951',
    totalStatutorySectionsCount: 19,
    isCuratedSubset: true,
    signatoriesCount: 153,
    ratificationsCount: 153,
    officialLanguages: ['English', 'French', 'Spanish', 'Russian', 'Chinese'],
    depositary: 'Secretary-General of the United Nations',
    officialGazetteRef: '78 U.N.T.S. 277',
    unCitationRef: '78 UNTS 277 / UNGA Res. 260 (III) A',
    officialSource: 'United Nations Treaty Collection / ICJ (treaties.un.org)',
    sourceOrganization: 'United Nations / International Court of Justice',
    sourceVerificationUrl: 'https://treaties.un.org/pages/ViewDetails.aspx?src=TREATY&mtdsg_no=IV-1&chapter=4&clang=_en',
    lastUpdatedDate: 'January 2025',
    verificationStatus: 'Verified Multilateral Depositary',
    sourceReproductionNotice: 'First human rights treaty adopted by the UN General Assembly (9 December 1948). The prohibition of genocide is universally recognized as a peremptory norm of general international law (jus cogens).',
    bangladeshRatificationStatus: 'Bangladesh acceded on 5 October 1998.',
    bangladeshDomesticApplicationNote: 'Enacted the landmark International Crimes (Tribunals) Act 1973 (Act No. XIX of 1973) incorporating Genocide Convention provisions directly into domestic law to prosecute perpetrators of the 1971 Bangladesh Genocide.',
    overview: 'The foundational multilateral treaty defining and outlawing genocide as an international crime, whether committed in time of peace or in time of war, requiring states to prevent and punish acts committed with intent to destroy, in whole or in part, a national, ethnical, racial or religious group.',
    overviewBn: 'গণহত্যাকে আন্তর্জাতিক অপরাধ হিসেবে ঘোষণা এবং জাতীয়, জাতিগত বা ধর্মীয় জনগোষ্ঠীকে ধ্বংসের উদ্দেশ্যমূলক অপরাধের বিচার নিশ্চিতকরণ সংক্রান্ত সনদ।',
    simpleSummary: 'A global treaty banning genocide—the deliberate attempt to destroy an ethnic, national, racial, or religious group of people.',
    explainLike15: 'The world\'s response to the Holocaust. It makes wiping out an ethnic or religious community a supreme international crime that can never be excused.',
    fullOfficialTextExcerpt: 'The Contracting Parties, Having considered the declaration made by the General Assembly of the United Nations in its resolution 96 (I) dated 11 December 1946 that genocide is a crime under international law, contrary to the spirit and aims of the United Nations and condemned by the civilized world... Hereby agree as hereinafter provided...',
    keyHighlights: [
      'Jus Cogens Norm: The prohibition against genocide binds all nations regardless of specific treaty ratification.',
      'Definition (Art. II): Acts committed with intent to destroy, in whole or in part, a national, ethnical, racial or religious group.',
      'No Official Immunity (Art. IV): Persons committing genocide shall be punished, whether constitutionally responsible rulers, public officials, or private individuals.'
    ],
    sections: [
      {
        number: 'Article II',
        title: 'Definition of Genocide',
        titleBn: 'গণহত্যার প্রামাণ্য সংজ্ঞা',
        content: 'In the present Convention, genocide means any of the following acts committed with intent to destroy, in whole or in part, a national, ethnical, racial or religious group, as such: (a) Killing members of the group; (b) Causing serious bodily or mental harm to members of the group; (c) Deliberately inflicting on the group conditions of life calculated to bring about its physical destruction in whole or in part; (d) Imposing measures intended to prevent births within the group; (e) Forcibly transferring children of the group to another group.',
        contentBn: 'কোনো জাতীয়, নৃতাত্ত্বিক, বর্ণগত বা ধর্মীয় গোষ্ঠীকে সম্পূর্ণ বা আংশিকভাবে ধ্বংস করার উদ্দেশ্যে হত্যা, মারাত্মক শারীরিক-মানসিক ক্ষতিসাধন বা জন্মদানে বাধা প্রদানই গণহত্যা।',
        simpleExplanation: 'Deliberately killing or inflicting deadly conditions on a protected community with the specific goal of wiping them out.',
        punishmentOrRemedy: 'Universal jurisdiction trial before the ICC or specialized international crimes tribunals.',
        keyConcepts: ['Genocide', 'Dolous specialis (specific intent)', 'Protected groups']
      }
    ],
    timeline: [
      { year: '1948', title: 'Adoption in Paris', description: 'Adopted by UN General Assembly Resolution 260 A (III) on 9 December 1948.', status: 'enacted' },
      { year: '1951', title: 'Entry into Force', description: 'Entered into force on 12 January 1951.', status: 'enacted' },
      { year: '1973', title: 'Bangladesh International Crimes Act', description: 'Parliament of Bangladesh codified the Genocide Convention into the International Crimes (Tribunals) Act 1973.', status: 'upheld' }
    ],
    relatedLawIds: ['int-rome-statute-1998', 'int-geneva-1949', 'bd-penal-code-1860'],
    citations: {
      standard: 'Convention on the Prevention and Punishment of the Crime of Genocide, Dec. 9, 1948, 78 U.N.T.S. 277',
      academic: 'Genocide Convention (1948), 78 UNTS 277, 45 AJIL Supp. 7.',
      bluebook: 'Convention on the Prevention and Punishment of the Crime of Genocide art. II, Dec. 9, 1948, 78 U.N.T.S. 277.'
    },
    keywords: ['genocide convention', 'crime of genocide', 'jus cogens', 'ict bd 1973', 'special intent', '78 unts 277']
  },

  // =========================================================================
  // C. INTERNATIONAL COURTS & DISPUTE RESOLUTION
  // =========================================================================

  // 13. UN Charter (1945) [Constitutive Statute]
  {
    id: 'int-un-charter-1945',
    slug: 'charter-of-the-united-nations-1945',
    title: 'Charter of the United Nations (1945)',
    titleBn: 'জাতিসংঘ সনদ (১৯৪৫)',
    shortTitle: 'UN Charter (1945)',
    alternativeTitles: ['Charter of the UN', 'San Francisco Charter', '1 UNTS XVI'],
    jurisdiction: 'International',
    jurisdictionCode: 'INT',
    category: 'Public International Law',
    status: 'Active Treaty',
    instrumentType: 'Constitutive Statute',
    enactmentYear: 1945,
    adoptionDate: '26 June 1945',
    entryIntoForceDate: '24 October 1945',
    totalStatutorySectionsCount: 111,
    isCuratedSubset: true,
    signatoriesCount: 193,
    ratificationsCount: 193,
    officialLanguages: ['English', 'French', 'Spanish', 'Russian', 'Chinese', 'Arabic'],
    depositary: 'Government of the United States of America (Archives)',
    officialGazetteRef: '1 U.N.T.S. XVI',
    unCitationRef: '1 UNTS XVI / 59 Stat. 1031',
    officialSource: 'United Nations Official Portal (un.org/en/about-us/un-charter)',
    sourceOrganization: 'United Nations (UN)',
    sourceVerificationUrl: 'https://www.un.org/en/about-us/un-charter/full-text',
    lastUpdatedDate: 'January 2025',
    verificationStatus: 'Verified Authentic Text',
    sourceReproductionNotice: 'Official certified text of the constituent treaty of the United Nations, signed in San Francisco on 26 June 1945.',
    bangladeshRatificationStatus: 'Bangladesh formally admitted as 136th Member State on 17 September 1974.',
    bangladeshDomesticApplicationNote: 'Article 25 of the Bangladesh Constitution explicitly incorporates the principles of the UN Charter into the fundamental foreign policy and constitutional duties of the state.',
    overview: 'The supreme constitutive treaty of the international legal order establishing the United Nations, maintaining international peace and security, outlawing the unlawful threat or use of force (Article 2(4)), and establishing the supremacy of UN obligations over any other treaty (Article 103).',
    overviewBn: 'আন্তর্জাতিক ব্যবস্থার সর্বোচ্চ সাংবিধানিক দলিল যা বিশ্বশান্তি রক্ষা, সার্বভৌম সমতা, বলপ্রয়োগের নিষেধাজ্ঞা এবং জাতিসংঘ নিরাপত্তা পরিষদের ক্ষমতা প্রতিষ্ঠা করে।',
    simpleSummary: 'The foundational founding document of the United Nations that bans unprovoked wars and obligates countries to settle disagreements peacefully.',
    explainLike15: 'The world\'s ultimate peace treaty signed after World War II to prevent another global conflict. It tells nations: do not attack your neighbors, solve fights with words and international courts, and work together on human rights.',
    fullOfficialTextExcerpt: 'WE THE PEOPLES OF THE UNITED NATIONS DETERMINED to save succeeding generations from the scourge of war, which twice in our lifetime has brought untold sorrow to mankind, and to reaffirm faith in fundamental human rights... HAVE RESOLVED TO COMBINE OUR EFFORTS TO ACCOMPLISH THESE AIMS.',
    keyHighlights: [
      'Prohibition on the Threat or Use of Force (Art. 2(4)): Refrain from threat or use of force against territorial integrity.',
      'Right of Inherent Self-Defense (Art. 51): Preserves the inherent right of individual or collective self-defense if an armed attack occurs.',
      'Supremacy Clause (Art. 103): In any conflict with other treaties, UN Charter obligations prevail.'
    ],
    sections: [
      {
        number: 'Article 2(4)',
        title: 'Prohibition of the Threat or Use of Force',
        titleBn: 'আঞ্চলিক অখণ্ডতা বা স্বাধীনতার বিরুদ্ধে বলপ্রয়োগের নিষেধাজ্ঞা',
        content: 'All Members shall refrain in their international relations from the threat or use of force against the territorial integrity or political independence of any state, or in any other manner inconsistent with the Purposes of the United Nations.',
        contentBn: 'জাতিসংঘের সকল সদস্য রাষ্ট্র অন্য কোনো রাষ্ট্রের ভৌগোলিক অখণ্ডতা বা রাজনৈতিক স্বাধীনতার বিরুদ্ধে শক্তি প্রদর্শন বা বলপ্রয়োগ থেকে বিরত থাকবে।',
        simpleExplanation: 'No nation is allowed to invade, bomb, or threaten another sovereign country.',
        punishmentOrRemedy: 'UN Security Council Chapter VII enforcement, economic sanctions, and military intervention authorizations.',
        keyConcepts: ['Prohibition of force', 'Territorial integrity', 'Non-aggression']
      },
      {
        number: 'Article 51',
        title: 'Inherent Right of Individual or Collective Self-Defence',
        titleBn: 'ব্যক্তিগত বা যৌথ আত্মরক্ষার সহজাত অধিকার',
        content: 'Nothing in the present Charter shall impair the inherent right of individual or collective self-defence if an armed attack occurs against a Member of the United Nations, until the Security Council has taken measures necessary to maintain international peace and security.',
        contentBn: 'কোনো সদস্য রাষ্ট্র সশস্ত্র আক্রমণের শিকার হলে নিরাপত্তা পরিষদ ব্যবস্থা গ্রহণ না করা পর্যন্ত তার ব্যক্তিগত বা যৌথ আত্মরক্ষার অধিকার বলবৎ থাকবে।',
        simpleExplanation: 'If a country is militarily attacked, it has the legal right to fight back and defend itself.',
        punishmentOrRemedy: 'Immediate mandatory notification of self-defense actions to the UN Security Council.',
        keyConcepts: ['Self-defense', 'Collective security', 'Armed attack threshold']
      }
    ],
    timeline: [
      { year: '1945', title: 'Signing in San Francisco', description: 'Signed on 26 June 1945 at the conclusion of the San Francisco Conference.', status: 'enacted' },
      { year: '1945', title: 'Entry into Force', description: 'Came into force on 24 October 1945 (United Nations Day).', status: 'enacted' },
      { year: '1974', title: 'Bangladesh Membership', description: 'Bangladesh formally admitted as 136th Member State on 17 September 1974.', status: 'upheld' }
    ],
    relatedLawIds: ['int-icj-statute-1945', 'int-vclt-1969', 'bd-constitution-1972'],
    citations: {
      standard: 'U.N. Charter, June 26, 1945, 1 U.N.T.S. XVI',
      academic: 'Charter of the United Nations (1945), 1 UNTS XVI, 59 Stat. 1031.',
      bluebook: 'U.N. Charter art. 2, para. 4.'
    },
    keywords: ['un charter', 'united nations', 'security council', 'article 51', 'article 2(4)', 'peace and security']
  },

  // 14. ICJ Statute (1945) [Constitutive Statute]
  {
    id: 'int-icj-statute-1945',
    slug: 'statute-of-the-international-court-of-justice-1945',
    title: 'Statute of the International Court of Justice (ICJ)',
    titleBn: 'আন্তর্জাতিক বিচার আদালতের সংবিধি (১৯৪৫)',
    shortTitle: 'ICJ Statute (1945)',
    alternativeTitles: ['Statute of the ICJ', 'World Court Statute', '33 UNTS 993'],
    jurisdiction: 'International',
    jurisdictionCode: 'INT',
    category: 'International Courts & Tribunals',
    status: 'Active Treaty',
    instrumentType: 'Constitutive Statute',
    enactmentYear: 1945,
    adoptionDate: '26 June 1945',
    entryIntoForceDate: '24 October 1945',
    totalStatutorySectionsCount: 70,
    isCuratedSubset: true,
    signatoriesCount: 193,
    ratificationsCount: 193,
    officialLanguages: ['English', 'French'],
    depositary: 'Secretary-General of the United Nations',
    officialGazetteRef: '33 U.N.T.S. 993',
    unCitationRef: '33 UNTS 993 / 59 Stat. 1055',
    officialSource: 'International Court of Justice (icj-cij.org)',
    sourceOrganization: 'International Court of Justice (ICJ / CIJ)',
    sourceVerificationUrl: 'https://www.icj-cij.org/statute',
    lastUpdatedDate: 'January 2025',
    verificationStatus: 'Verified Authentic Text',
    sourceReproductionNotice: 'Official certified text annexed to the UN Charter. The principal judicial organ of the United Nations based in the Peace Palace, The Hague.',
    bangladeshRatificationStatus: 'Party to the Statute as a member state of the United Nations since 17 September 1974.',
    bangladeshDomesticApplicationNote: 'Under international law, ICJ judgments are binding on state parties in contentious cases. Bangladesh has participated actively in multilateral advisory opinion proceedings (e.g. Legal Consequences of the Separation of the Chagos Archipelago from Mauritius in 1965).',
    overview: 'The governing constitutional statute of the principal judicial organ of the United Nations (the "World Court" in The Hague), defining the authoritative sources of international law under Article 38(1), contentious jurisdiction between sovereign States, and advisory opinion procedures.',
    overviewBn: 'জাতিসংঘের প্রধান বিচারিক অঙ্গ আন্তর্জাতিক বিচার আদালতের (ICJ) সংবিধি যা আন্তর্জাতিক আইনের উৎস (অনুচ্ছেদ ৩৮(১)), রাষ্ট্রসমূহের বিরোধ নিষ্পত্তি ও পরামর্শমূলক মতামত প্রদানের বিধান নির্ধারণ করে।',
    simpleSummary: 'The legal rulebook for the World Court in The Hague, setting out how international judges decide disputes between countries and what counts as international law.',
    explainLike15: 'The rulebook for the highest court on the planet. When two nations have a dispute over maritime boundaries or international treaties, this statute explains how the 15 international judges will decide the case.',
    fullOfficialTextExcerpt: 'Article 1: The International Court of Justice established by the Charter of the United Nations as the principal judicial organ of the United Nations shall be constituted and shall function in accordance with the provisions of the present Statute...',
    keyHighlights: [
      'Sources of International Law (Art. 38(1)): Treaties, customary practice, general principles, and judicial decisions.',
      'State Access Only (Art. 34(1)): Only sovereign States may be parties in cases before the Court.',
      'Provisional Measures (Art. 41): Binding interim injunctions to preserve rights during pending trials.'
    ],
    sections: [
      {
        number: 'Article 38(1)',
        title: 'Authoritative Sources of International Law',
        titleBn: 'আন্তর্জাতিক আইনের প্রামাণ্য উৎসসমূহ',
        content: 'The Court, whose function is to decide in accordance with international law such disputes as are submitted to it, shall apply: (a) international conventions, whether general or particular, establishing rules expressly recognized by the contesting states; (b) international custom, as evidence of a general practice accepted as law; (c) the general principles of law recognized by civilized nations; (d) subject to the provisions of Article 59, judicial decisions and the teachings of the most highly qualified publicists of the various nations, as subsidiary means for the determination of rules of law.',
        contentBn: 'আন্তর্জাতিক বিরোধ নিষ্পত্তিতে আদালত ৪টি উৎস প্রয়োগ করবে: (ক) আন্তর্জাতিক চুক্তি ও কনভেনশন; (খ) আন্তর্জাতিক প্রথাগত আইন; (গ) সার্বজনীন সাধারণ আইনি মূলনীতি; (ঘ) আদালতসমূহের পূর্ববর্তী রায় ও প্রখ্যাত আইনবিদদের রচনা।',
        simpleExplanation: 'The supreme definition of where international law comes from: treaties, customary practice, universal legal principles, and court judgments.',
        punishmentOrRemedy: 'Final and binding judicial judgment with no appeal under Article 60.',
        keyConcepts: ['Sources of international law', 'Customary law', 'Opinio juris', 'General principles']
      }
    ],
    timeline: [
      { year: '1945', title: 'Annexation to UN Charter', description: 'Adopted in San Francisco on 26 June 1945.', status: 'enacted' },
      { year: '1946', title: 'Inauguration at The Hague', description: 'Inaugurated at the Peace Palace in The Hague replacing the PCIJ.', status: 'enacted' }
    ],
    relatedLawIds: ['int-un-charter-1945', 'int-vclt-1969', 'int-rome-statute-1998'],
    citations: {
      standard: 'Statute of the International Court of Justice, June 26, 1945, 33 U.N.T.S. 993',
      academic: 'Statute of the ICJ (1945), 33 UNTS 993, 59 Stat. 1055.',
      bluebook: 'Statute of the International Court of Justice art. 38, para. 1, June 26, 1945, 33 U.N.T.S. 993.'
    },
    keywords: ['icj statute', 'article 38 sources of law', 'international court of justice', 'world court', 'peace palace']
  },

  // =========================================================================
  // D. TRADE, COMMERCE & ECONOMIC LAW
  // =========================================================================

  // 15. GATT 1994 & Marrakesh Agreement
  {
    id: 'int-gatt-wto-1994',
    slug: 'general-agreement-on-tariffs-and-trade-gatt-1994',
    title: 'General Agreement on Tariffs and Trade (GATT 1994 & Marrakesh Agreement)',
    titleBn: 'শুল্ক ও বাণিজ্য সংক্রান্ত সাধারণ চুক্তি (গ্যাট ১৯৯৪ ও ডব্লিউটিও)',
    shortTitle: 'GATT 1994 (WTO Agreement)',
    alternativeTitles: ['GATT 1994', 'Marrakesh Agreement', 'WTO Legal Texts', '1867 UNTS 154'],
    jurisdiction: 'International',
    jurisdictionCode: 'INT',
    category: 'Trade & Commerce',
    status: 'Active Treaty',
    instrumentType: 'Multilateral Treaty',
    enactmentYear: 1994,
    adoptionDate: '15 April 1994',
    entryIntoForceDate: '1 January 1995',
    totalStatutorySectionsCount: 38,
    isCuratedSubset: true,
    signatoriesCount: 164,
    ratificationsCount: 164,
    officialLanguages: ['English', 'French', 'Spanish'],
    depositary: 'Director-General of the World Trade Organization',
    officialGazetteRef: '1867 U.N.T.S. 154',
    unCitationRef: '1867 UNTS 154 / 33 ILM 1125 (1994)',
    officialSource: 'World Trade Organization (wto.org/english/docs_e/legal_e/legal_e.htm)',
    sourceOrganization: 'World Trade Organization (WTO)',
    sourceVerificationUrl: 'https://www.wto.org/english/docs_e/legal_e/gatt47_e.pdf',
    lastUpdatedDate: 'January 2025',
    verificationStatus: 'Verified Multilateral Depositary',
    sourceReproductionNotice: 'Official certified text of Annex 1A of the Marrakesh Agreement establishing the World Trade Organization.',
    bangladeshRatificationStatus: 'Bangladesh signed on 15 April 1994 and became an original WTO member on 1 January 1995.',
    bangladeshDomesticApplicationNote: 'Under Bangladesh law, WTO commitments are applied via the Customs Act 2023, the Import Policy Order, and Export Policy Order formulated by the Ministry of Commerce.',
    overview: 'The fundamental multilateral agreement governing international trade in merchandise, establishing the cornerstone principles of Most-Favoured-Nation (MFN) treatment, National Treatment, and the general prohibition of quantitative import quotas.',
    overviewBn: 'বিশ্ব বাণিজ্যের মূল ভিত্তি যা সদস্য রাষ্ট্রসমূহের মধ্যে শুল্ক হ্রাস, অশুল্ক বাধা দূরীকরণ এবং সম-বাণিজ্যিক সুবিধা প্রদান বাধ্যতামূলক করে।',
    simpleSummary: 'A global trade agreement stopping countries from unfairly favoring local goods over imports with unfair tariffs or surprise quotas.',
    explainLike15: 'The global trading rulebook: if you give a lower tax to one country\'s exports, you must give that same fair rate to other WTO members, and you cannot place secret bans on imports.',
    fullOfficialTextExcerpt: 'The Governments of the Contracting Parties, Recognizing that their relations in the field of trade and economic endeavour should be conducted with a view to raising standards of living, ensuring full employment and a large and steadily growing volume of real income... Have agreed as follows...',
    keyHighlights: [
      'Most-Favoured-Nation (MFN, Art. I): Any trade advantage granted to one nation must be immediately accorded to all other member states.',
      'National Treatment (Art. III): Imported products once inside the border must not receive less favourable internal tax treatment than domestic goods.',
      'Elimination of Quantitative Restrictions (Art. XI): Outlaws import quotas and embargoes except under strict exceptions.'
    ],
    sections: [
      {
        number: 'Article I',
        title: 'General Most-Favoured-Nation (MFN) Treatment',
        titleBn: 'সর্বাধিক সুবিধাপ্রাপ্ত রাষ্ট্র (এমএফএন) নীতি',
        content: 'With respect to customs duties and charges of any kind imposed on or in connection with importation or exportation, any advantage, favour, privilege or immunity granted by any contracting party to any product originating in or destined for any other country shall be accorded immediately and unconditionally to the like product originating in or destined for the territories of all other contracting parties.',
        contentBn: 'যেকোনো সদস্য রাষ্ট্র কর্তৃক অপর কোনো রাষ্ট্রকে শুল্ক বা বাণিজ্যে প্রদত্ত যেকোনো সুবিধা স্বয়ংক্রিয়ভাবে এবং বিনাশর্তে সকল সদস্য রাষ্ট্রের পণ্যের জন্য প্রযোজ্য হবে।',
        simpleExplanation: 'You cannot give special low-tariff sweetheart deals to some countries while punishing other WTO nations with unfair higher taxes.',
        punishmentOrRemedy: 'Dispute Settlement Body (DSB) panel ruling and authorized retaliatory tariff suspensions.',
        keyConcepts: ['MFN treatment', 'Non-discrimination', 'Like products']
      }
    ],
    timeline: [
      { year: '1947', title: 'Original GATT Concluded', description: 'Adopted in Geneva as provisional trade framework.', status: 'enacted' },
      { year: '1994', title: 'Marrakesh WTO Agreement', description: 'Updated into GATT 1994 creating the World Trade Organization.', status: 'enacted' },
      { year: '1995', title: 'Bangladesh Founding Membership', description: 'Bangladesh became a founding member of the WTO on 1 January 1995.', status: 'upheld' }
    ],
    relatedLawIds: ['int-wto-trips-1994', 'int-cisg-1980', 'bd-contract-act-1872'],
    citations: {
      standard: 'General Agreement on Tariffs and Trade 1994, Apr. 15, 1994, 1867 U.N.T.S. 154',
      academic: 'GATT 1994, 1867 UNTS 154, 33 ILM 1154.',
      bluebook: 'General Agreement on Tariffs and Trade 1994 art. I, Apr. 15, 1994, 1867 U.N.T.S. 154.'
    },
    keywords: ['gatt 1994', 'wto', 'most favoured nation', 'mfn', 'national treatment', 'tariffs', '1867 unts 154']
  },

  // 16. TRIPS (1994) [already refined above]
  {
    id: 'int-wto-trips-1994',
    slug: 'agreement-on-trade-related-aspects-of-intellectual-property-rights-1994',
    title: 'Agreement on Trade-Related Aspects of Intellectual Property Rights (TRIPS)',
    titleBn: 'ট্রিপস চুক্তি (বুদ্ধিবৃত্তিক সম্পদের বাণিজ্য সংক্রান্ত অধিকার)',
    shortTitle: 'TRIPS Agreement (WTO 1994)',
    alternativeTitles: ['WTO TRIPS', 'TRIPS 1994', 'Marrakesh Annex 1C', '1869 UNTS 299'],
    jurisdiction: 'International',
    jurisdictionCode: 'INT',
    category: 'Intellectual Property',
    status: 'Active Treaty',
    instrumentType: 'Multilateral Treaty',
    enactmentYear: 1994,
    adoptionDate: '15 April 1994',
    entryIntoForceDate: '1 January 1995',
    totalStatutorySectionsCount: 73,
    isCuratedSubset: true,
    signatoriesCount: 164,
    ratificationsCount: 164,
    officialLanguages: ['English', 'French', 'Spanish'],
    depositary: 'Director-General of the World Trade Organization',
    officialGazetteRef: '1869 U.N.T.S. 299',
    unCitationRef: '1869 UNTS 299 / 33 ILM 1197 (1994)',
    officialSource: 'World Trade Organization Legal Texts (wto.org)',
    sourceOrganization: 'World Trade Organization (WTO) / WIPO',
    sourceVerificationUrl: 'https://www.wto.org/english/docs_e/legal_e/27-trips_01_e.htm',
    lastUpdatedDate: 'January 2025',
    verificationStatus: 'Verified Multilateral Depositary',
    sourceReproductionNotice: 'Official certified text of Annex 1C of the Marrakesh Agreement establishing the World Trade Organization.',
    bangladeshRatificationStatus: 'Founding WTO member. Beneficiary of WTO TRIPS council pharmaceutical patent waivers for Least Developed Countries (LDCs).',
    bangladeshDomesticApplicationNote: 'Implemented through the Bangladesh Patent Act 2022 / 2023, Trademarks Act 2009, and Copyright Act 2023.',
    overview: 'The most comprehensive multilateral agreement on intellectual property, setting binding minimum standards for copyright, trademarks, geographical indications, industrial designs, patents, and trade secrets across all WTO member nations.',
    overviewBn: 'বিশ্ব বাণিজ্য সংস্থার আওতায় বুদ্ধিবৃত্তিক সম্পদ সুরক্ষার সার্বজনীন চুক্তি যা কপিরাইট, পেটেন্ট ও ট্রেডমার্কের মানদণ্ড নির্ধারণ করে।',
    simpleSummary: 'A global trade agreement requiring all countries to enforce copyrights, trademarks, and 20-year patents, while granting flexibilities for generic medicines.',
    explainLike15: 'If someone creates a software program or invents a medicine, TRIPS ensures their copyright and patent are protected in every WTO member nation.',
    fullOfficialTextExcerpt: 'Members, Desiring to reduce distortions and impediments to international trade, and taking into account the need to promote effective and adequate protection of intellectual property rights... Hereby agree as follows...',
    keyHighlights: [
      'Minimum Patent Term (Art. 33): 20 years from filing date.',
      'Compulsory Licensing (Art. 31): Governments can allow generic medicine production during health crises.',
      'Doha Declaration: Affirmed public health flexibilities for developing nations.'
    ],
    sections: [
      {
        number: 'Article 27',
        title: 'Patentable Subject Matter and Minimum Term',
        titleBn: 'পেটেন্টযোগ্য বিষয়ের মানদণ্ড',
        content: 'Patents shall be available for any inventions, whether products or processes, in all fields of technology, provided that they are new, involve an inventive step and are capable of industrial application.',
        contentBn: 'যেকোনো নতুন প্রযুক্তিগত উদ্ভাবন যা শিল্পে ব্যবহারযোগ্য তা ২০ বছরের জন্য পেটেন্ট সুরক্ষার যোগ্য হবে।',
        simpleExplanation: 'Novel, non-obvious, and industrially useful inventions get 20-year exclusive patent rights.',
        punishmentOrRemedy: 'Civil damages and customs border seizures.',
        keyConcepts: ['Patentability', 'Novelty', 'Inventive step']
      }
    ],
    timeline: [
      { year: '1994', title: 'Conclusion at Marrakesh', description: 'Adopted as part of the WTO single undertaking.', status: 'enacted' },
      { year: '1995', title: 'Entry into Force', description: 'Came into force on 1 January 1995.', status: 'enacted' }
    ],
    relatedLawIds: ['int-cisg-1980', 'bd-contract-act-1872'],
    citations: {
      standard: 'Agreement on Trade-Related Aspects of Intellectual Property Rights, Apr. 15, 1994, 1869 U.N.T.S. 299',
      academic: 'TRIPS Agreement (1994), 1869 UNTS 299, 33 ILM 1197.',
      bluebook: 'Agreement on Trade-Related Aspects of Intellectual Property Rights art. 27, Apr. 15, 1994, 1869 U.N.T.S. 299.'
    },
    keywords: ['trips', 'wto', 'intellectual property', 'patents', 'compulsory licensing', 'generic medicine']
  },

  // 17. CISG (1980) - Sale of Goods
  {
    id: 'int-cisg-1980',
    slug: 'un-convention-on-contracts-for-the-international-sale-of-goods-1980',
    title: 'UN Convention on Contracts for the International Sale of Goods (CISG)',
    titleBn: 'আন্তর্জাতিক পণ্য বিক্রয় চুক্তি বিষয়ক জাতিসংঘ কনভেনশন (সিআইএসজি ১৯৮০)',
    shortTitle: 'CISG (Vienna 1980)',
    alternativeTitles: ['Vienna Sales Convention', 'CISG', 'UNCITRAL CISG', '1489 UNTS 3'],
    jurisdiction: 'International',
    jurisdictionCode: 'INT',
    category: 'Trade & Commerce',
    status: 'Active Treaty',
    instrumentType: 'Multilateral Treaty',
    enactmentYear: 1980,
    adoptionDate: '11 April 1980',
    entryIntoForceDate: '1 January 1988',
    totalStatutorySectionsCount: 101,
    isCuratedSubset: true,
    signatoriesCount: 97,
    ratificationsCount: 97,
    officialLanguages: ['English', 'French', 'Spanish', 'Russian', 'Chinese', 'Arabic'],
    depositary: 'Secretary-General of the United Nations',
    officialGazetteRef: '1489 U.N.T.S. 3',
    unCitationRef: '1489 UNTS 3 / 19 ILM 668',
    officialSource: 'UNCITRAL Legal Texts (uncitral.un.org)',
    sourceOrganization: 'UNCITRAL / UNTS',
    sourceVerificationUrl: 'https://uncitral.un.org/en/texts/salegoods',
    lastUpdatedDate: 'January 2025',
    verificationStatus: 'Verified Multilateral Depositary',
    sourceReproductionNotice: 'Text reproduced from UNCITRAL official publication. Prepared by the United Nations Commission on International Trade Law.',
    bangladeshRatificationStatus: 'Bangladesh is not currently a formal contracting state, but CISG applies to international commercial sales contracts involving Bangladesh exporters whenever parties select CISG or the law of a contracting state.',
    bangladeshDomesticApplicationNote: 'Under Bangladesh private international law and Section 1 of the Contract Act 1872, contracting parties retain freedom of contract to incorporate CISG rules into international export/import agreements.',
    overview: 'The uniform multilateral commercial treaty governing cross-border sales of commercial goods between businesses located in different countries, resolving choice of law disputes for over 80% of world merchandise trade.',
    overviewBn: 'আন্তর্জাতিক বাণিজ্যের প্রধান অভিন্ন বিক্রয় চুক্তি আইন যা পণ্য ক্রয়-বিক্রয়, সরবরাহ, চুক্তিভঙ্গ ও ক্ষতিপূরণের বৈশ্বিক বিধিমালা নির্ধারণ করে।',
    simpleSummary: 'A global uniform commercial law that sets fair rules for buying and selling goods across international borders when buyers and sellers are in different countries.',
    explainLike15: 'If a buyer in Europe buys 10,000 shirts from an exporter in Bangladesh, the CISG provides fair, neutral rules for what counts as on-time delivery, quality inspection, and refunds if goods are damaged.',
    fullOfficialTextExcerpt: 'The States Parties to this Convention, Bearing in mind the broad objectives in the resolutions adopted by the sixth special session of the General Assembly of the United Nations on the establishment of a New International Economic Order... Have agreed as follows...',
    keyHighlights: [
      'Fundamental Breach (Art. 25): Severe breach depriving the innocent party of expected contract benefits.',
      'Damages Calculation (Art. 74): Foreseeable direct damages including loss of reasonable business profits.',
      'Freedom of Form (Art. 11): Contracts of sale need not be concluded in or evidenced by writing unless declared.'
    ],
    sections: [
      {
        number: 'Article 25',
        title: 'Definition of Fundamental Breach',
        titleBn: 'চুক্তির মৌলিক বা গুরুতর লঙ্ঘন',
        content: 'A breach of contract committed by one of the parties is fundamental if it results in such detriment to the other party as substantially to deprive him of what he is entitled to expect under the contract, unless the party in breach did not foresee and a reasonable person of the same kind in the same circumstances would not have foreseen such a result.',
        contentBn: 'চুক্তিভঙ্গ তখনই মৌলিক বলে গণ্য হবে যখন তার ফলে অপর পক্ষ চুক্তির প্রধান প্রত্যাশা ও সুবিধা থেকে চরমভাবে বঞ্চিত হয়।',
        simpleExplanation: 'A breach so severe that the buyer or seller can cancel the deal on the spot and seek full compensation.',
        punishmentOrRemedy: 'Immediate avoidance (cancellation) of contract and recovery of full damages.',
        keyConcepts: ['Fundamental breach', 'Substantial deprivation', 'Foreseeability test']
      }
    ],
    timeline: [
      { year: '1980', title: 'Adoption in Vienna', description: 'Concluded at diplomatic conference in Vienna on 11 April 1980.', status: 'enacted' },
      { year: '1988', title: 'Entry into Force', description: 'Entered into force on 1 January 1988.', status: 'enacted' }
    ],
    relatedLawIds: ['bd-contract-act-1872', 'int-wto-trips-1994'],
    citations: {
      standard: 'United Nations Convention on Contracts for the International Sale of Goods, Apr. 11, 1980, 1489 U.N.T.S. 3',
      academic: 'CISG (1980), 1489 UNTS 3, 19 ILM 668.',
      bluebook: 'United Nations Convention on Contracts for the International Sale of Goods art. 25, Apr. 11, 1980, 1489 U.N.T.S. 3.'
    },
    keywords: ['cisg', 'sales of goods', 'uncitral', 'vienna sales convention', 'fundamental breach', 'commercial contracts']
  },

  // 18. UNCITRAL Model Law on International Commercial Arbitration (1985 / 2006) [Model Law]
  {
    id: 'int-uncitral-model-arbitration',
    slug: 'uncitral-model-law-on-international-commercial-arbitration',
    title: 'UNCITRAL Model Law on International Commercial Arbitration (1985 / 2006)',
    titleBn: 'আন্তর্জাতিক বাণিজ্যিক সালিশি বিষয়ক ইউনসিট্রাল মডেল আইন (১৯৮৫/২০০৬)',
    shortTitle: 'UNCITRAL Model Law on Arbitration',
    alternativeTitles: ['UNCITRAL Model Law', 'Arbitration Model Law', 'UNGA Res 40/72'],
    jurisdiction: 'International',
    jurisdictionCode: 'INT',
    category: 'Trade & Commerce',
    status: 'Model Law',
    instrumentType: 'Model Law',
    enactmentYear: 1985,
    adoptionDate: '21 June 1985',
    totalStatutorySectionsCount: 36,
    isCuratedSubset: true,
    signatoriesCount: 85,
    officialLanguages: ['English', 'French', 'Spanish', 'Russian', 'Chinese', 'Arabic'],
    depositary: 'United Nations Commission on International Trade Law (Vienna)',
    officialGazetteRef: 'U.N. Doc. A/40/17, Annex I',
    unCitationRef: 'UNGA Res. 40/72 (1985), amended by Res. 61/33 (2006)',
    officialSource: 'UNCITRAL (uncitral.un.org/en/texts/arbitration)',
    sourceOrganization: 'United Nations Commission on International Trade Law (UNCITRAL)',
    sourceVerificationUrl: 'https://uncitral.un.org/en/texts/arbitration/modellaw/commercial_arbitration',
    lastUpdatedDate: 'January 2025',
    verificationStatus: 'Official Institutional Reproduction',
    sourceReproductionNotice: 'Formulated by UNCITRAL and recommended by the UN General Assembly. Note on Legal Character: A Model Law is not a treaty; it does not require signature or ratification. Its domestic legal effect depends entirely on individual national parliaments enacting it into statutory legislation.',
    bangladeshRatificationStatus: 'Not applicable for signature (Model Law). Substantively enacted into domestic law by the Parliament of Bangladesh.',
    bangladeshDomesticApplicationNote: 'Directly enacted into Bangladesh legislation as the Arbitration Act 2001 (Act No. 1 of 2001), repealing the 1940 Arbitration Act and harmonizing Bangladesh arbitration law with international UNCITRAL standards.',
    overview: 'The international legislative benchmark designed to assist states in reforming and modernizing their national arbitration laws, establishing the autonomy of arbitration agreements, the tribunal\'s power to rule on its own jurisdiction (Kompetenz-Kompetenz), and restricted court intervention.',
    overviewBn: 'আন্তর্জাতিক বাণিজ্যিক সালিশির জন্য জাতিসংঘ প্রণীত মডেল আইন, যার ওপর ভিত্তি করে বাংলাদেশ ২০০১ সালের সালিশ আইন প্রণয়ন করেছে। এটি কোনো বাধ্যতামূলক চুক্তি নয় বরং জাতীয় আইনের জন্য আদর্শ নমুনা।',
    simpleSummary: 'A model template created by the United Nations for countries to copy into their own laws so that business disputes can be settled by private arbitrators instead of slow public courts.',
    explainLike15: 'A model law is like a master template or recipe provided by the UN. Countries take the recipe and pass it into their own parliament, which is exactly what Bangladesh did with the Arbitration Act 2001.',
    fullOfficialTextExcerpt: 'Article 1. Scope of application: (1) This Law applies to international commercial arbitration, subject to any agreement in force between this State and any other State or States... Article 5. Extent of court intervention: In matters governed by this Law, no court shall intervene except where so provided in this Law...',
    keyHighlights: [
      'Model Law Distinction: Non-binding until enacted by a national parliament into domestic statute.',
      'Kompetenz-Kompetenz (Art. 16): The arbitral tribunal has the power to rule on its own jurisdiction.',
      'Limited Court Intervention (Art. 5): National courts can only intervene in narrow, explicitly defined instances.'
    ],
    sections: [
      {
        number: 'Article 16',
        title: 'Competence of Arbitral Tribunal to Rule on its Jurisdiction (Kompetenz-Kompetenz)',
        titleBn: 'সালিশি ট্রাইব্যুনালের নিজস্ব এখতিয়ার নির্ধারণের ক্ষমতা',
        content: 'The arbitral tribunal may rule on its own jurisdiction, including any objections with respect to the existence or validity of the arbitration agreement. For that purpose, an arbitration clause which forms part of a contract shall be treated as an agreement independent of the other terms of the contract.',
        contentBn: 'সালিশি চুক্তি বা ধারার বৈধতা এবং নিজস্ব এখতিয়ার রয়েছে কিনা তা নির্ধারণের পূর্ণ ক্ষমতা সালিশি ট্রাইব্যুনালের থাকবে (কম্পিটেন্স-কম্পিটেন্স নীতি)।',
        simpleExplanation: 'The arbitrators decide for themselves whether they have the authority to hear the case, and an arbitration clause survives even if the main contract is challenged.',
        punishmentOrRemedy: 'Enacted in Section 15 of Bangladesh Arbitration Act 2001.',
        keyConcepts: ['Kompetenz-Kompetenz', 'Separability of arbitration clause', 'Arbitral autonomy']
      }
    ],
    timeline: [
      { year: '1985', title: 'Adoption by UNCITRAL', description: 'Adopted at the 18th session of UNCITRAL on 21 June 1985.', status: 'enacted' },
      { year: '2001', title: 'Bangladesh Enactment', description: 'Bangladesh enacted the Arbitration Act 2001 modeled directly on UNCITRAL.', status: 'upheld' },
      { year: '2006', title: 'UNCITRAL Amendments', description: 'Updated provisions on interim measures and written form requirements.', status: 'amended' }
    ],
    relatedLawIds: ['bd-contract-act-1872', 'int-cisg-1980', 'int-icsid-convention-1965'],
    citations: {
      standard: 'UNCITRAL Model Law on International Commercial Arbitration, U.N. Doc. A/40/17, Annex I (1985), with amendments as adopted in 2006',
      academic: 'UNCITRAL Model Law on International Commercial Arbitration (1985/2006), UNGA Res 40/72.',
      bluebook: 'UNCITRAL Model Law on International Commercial Arbitration art. 16, U.N. Doc. A/40/17, Annex I (June 21, 1985).'
    },
    keywords: ['uncitral model law', 'commercial arbitration', 'model law', 'arbitration act 2001', 'kompetenz kompetenz', 'adr']
  },

  // 19. ICSID Convention (1965) [already in place, ensure accurate links]
  {
    id: 'int-icsid-convention-1965',
    slug: 'icsid-convention-on-the-settlement-of-investment-disputes-1965',
    title: 'ICSID Convention on the Settlement of Investment Disputes (1965)',
    titleBn: 'আইসিএসআইডি বিনিয়োগ বিরোধ নিষ্পত্তি কনভেনশন (১৯৬৫)',
    shortTitle: 'ICSID Convention (Washington 1965)',
    alternativeTitles: ['Washington Convention', 'ICSID', 'World Bank Investment Convention', '575 UNTS 159'],
    jurisdiction: 'International',
    jurisdictionCode: 'INT',
    category: 'Investment Law',
    status: 'Active Treaty',
    instrumentType: 'Multilateral Treaty',
    enactmentYear: 1965,
    adoptionDate: '18 March 1965',
    entryIntoForceDate: '14 October 1966',
    totalStatutorySectionsCount: 75,
    isCuratedSubset: true,
    signatoriesCount: 165,
    ratificationsCount: 165,
    officialLanguages: ['English', 'French', 'Spanish'],
    depositary: 'International Bank for Reconstruction and Development (World Bank)',
    officialGazetteRef: '575 U.N.T.S. 159',
    unCitationRef: '575 UNTS 159 / 4 ILM 532',
    officialSource: 'International Centre for Settlement of Investment Disputes (icsid.worldbank.org)',
    sourceOrganization: 'World Bank Group (ICSID)',
    sourceVerificationUrl: 'https://icsid.worldbank.org/resources/rules-and-regulations/convention/overview',
    lastUpdatedDate: 'January 2025',
    verificationStatus: 'Verified Multilateral Depositary',
    sourceReproductionNotice: 'Official certified text deposited with the World Bank in Washington, D.C.',
    bangladeshRatificationStatus: 'Bangladesh signed on 20 November 1979 and ratified on 27 March 1980.',
    bangladeshDomesticApplicationNote: 'Under Bangladesh law, foreign investment protection is backed by the Foreign Private Investment (Promotion and Protection) Act 1980 (Act No. XI of 1980), guaranteeing indemnification and international arbitration recourse.',
    overview: 'The multilateral treaty sponsored by the World Bank creating the autonomous International Centre for Settlement of Investment Disputes (ICSID), facilitating the arbitration and conciliation of investor-state disputes (ISDS) with direct global enforcement of awards as final judgments.',
    overviewBn: 'বিদেশি বিনিয়োগকারী এবং রাষ্ট্রের মধ্যকার বিরোধ (ISDS) আন্তর্জাতিক সালিশির মাধ্যমে বাধ্যতামূলকভাবে নিষ্পত্তির বিশ্বব্যাংক কনভেনশন।',
    simpleSummary: 'A global treaty that allows foreign businesses investing in member nations to settle disagreements through an independent world tribunal.',
    explainLike15: 'If a multinational company builds an energy plant in another country and the host government takes it over unfairly, ICSID provides neutral international arbitration to award fair compensation.',
    fullOfficialTextExcerpt: 'The Contracting States Considering the need for international cooperation for economic development, and the role of private international investment therein... Have agreed as follows...',
    keyHighlights: [
      'Self-Contained Regime (Art. 53): ICSID awards are binding and cannot be appealed to national courts.',
      'Enforcement as Domestic Judgment (Art. 54): Contracting states must enforce monetary awards as if they were final judgments of their own highest courts.'
    ],
    sections: [
      {
        number: 'Article 54',
        title: 'Recognition and Enforcement of Arbitral Awards',
        titleBn: 'সালিশি রোয়েদাদের স্বীকৃতি ও সরাসরি বাস্তবায়ন',
        content: 'Each Contracting State shall recognize an award rendered pursuant to this Convention as binding and enforce the pecuniary obligations imposed by that award within its territories as if it were a final judgment of a court in that State.',
        contentBn: 'স্বাক্ষরকারী প্রতিটি রাষ্ট্র আইসিএসআইডি সালিশি রোয়েদাদকে তার দেশের সর্বোচ্চ আদালতের চূড়ান্ত রায়ের মতো বাধ্যতামূলকভাবে কার্যকর করবে।',
        simpleExplanation: 'An ICSID award is enforced automatically across all member states without local court re-examination.',
        punishmentOrRemedy: 'Direct execution of monetary award against state commercial assets globally.',
        keyConcepts: ['Direct enforceability', 'Self-contained regime', 'Finality of award']
      }
    ],
    timeline: [
      { year: '1965', title: 'Adoption in Washington', description: 'Formulated by World Bank Executive Directors on 18 March 1965.', status: 'enacted' },
      { year: '1966', title: 'Entry into Force', description: 'Came into force on 14 October 1966.', status: 'enacted' },
      { year: '1980', title: 'Bangladesh Ratification', description: 'Bangladesh ratified on 27 March 1980.', status: 'upheld' }
    ],
    relatedLawIds: ['int-vclt-1969', 'int-cisg-1980', 'bd-contract-act-1872'],
    citations: {
      standard: 'Convention on the Settlement of Investment Disputes Between States and Nationals of Other States, Mar. 18, 1965, 575 U.N.T.S. 159',
      academic: 'ICSID Convention (1965), 575 UNTS 159, 4 ILM 532.',
      bluebook: 'Convention on the Settlement of Investment Disputes Between States and Nationals of Other States art. 54, Mar. 18, 1965, 575 U.N.T.S. 159.'
    },
    keywords: ['icsid', 'investment disputes', 'isds', 'world bank', 'foreign direct investment', '575 unts 159']
  },

  // =========================================================================
  // E. ENVIRONMENT & CLIMATE LAW
  // =========================================================================

  // 20. UNFCCC (1992)
  {
    id: 'int-unfccc-1992',
    slug: 'united-nations-framework-convention-on-climate-change-1992',
    title: 'United Nations Framework Convention on Climate Change (UNFCCC)',
    titleBn: 'জাতিসংঘ জলবায়ু পরিবর্তন ফ্রেমওয়ার্ক কনভেনশন (ইউএনএফসিসিসি ১৯৯২)',
    shortTitle: 'UNFCCC (Rio 1992)',
    alternativeTitles: ['UNFCCC', 'Climate Change Convention', '1771 UNTS 107'],
    jurisdiction: 'International',
    jurisdictionCode: 'INT',
    category: 'Environment & Climate',
    status: 'Active Treaty',
    instrumentType: 'Multilateral Treaty',
    enactmentYear: 1992,
    adoptionDate: '9 May 1992',
    entryIntoForceDate: '21 March 1994',
    totalStatutorySectionsCount: 26,
    isCuratedSubset: true,
    signatoriesCount: 198,
    ratificationsCount: 198,
    officialLanguages: ['English', 'French', 'Spanish', 'Russian', 'Chinese', 'Arabic'],
    depositary: 'Secretary-General of the United Nations',
    officialGazetteRef: '1771 U.N.T.S. 107',
    unCitationRef: '1771 UNTS 107 / 31 ILM 849 (1992)',
    officialSource: 'UNFCCC Secretariat (unfccc.int)',
    sourceOrganization: 'UNFCCC Secretariat / UNTS',
    sourceVerificationUrl: 'https://unfccc.int/process-and-meetings/the-convention/what-is-the-united-nations-framework-convention-on-climate-change',
    lastUpdatedDate: 'January 2025',
    verificationStatus: 'Verified Multilateral Depositary',
    sourceReproductionNotice: 'Official certified text signed at the Rio Earth Summit in 1992 and deposited with the UN Secretary-General.',
    bangladeshRatificationStatus: 'Bangladesh signed on 9 June 1992 and ratified on 15 April 1994.',
    bangladeshDomesticApplicationNote: 'Under Article 18A of the Bangladesh Constitution (added via 15th Amendment), the state is constitutionally mandated to protect and improve the environment and biodiversity for present and future generations.',
    overview: 'The foundational multilateral environmental treaty setting the global objective to stabilize greenhouse gas concentrations in the atmosphere at a level that would prevent dangerous anthropogenic interference with the climate system, establishing the principle of Common but Differentiated Responsibilities (CBDR).',
    overviewBn: 'জলবায়ু পরিবর্তনের ক্ষতিকর প্রভাব রোধে বায়ুমণ্ডলে গ্রিনহাউস গ্যাসের নির্গমন স্থিতিশীল রাখার লক্ষ্যে ১৯৯২ সালের রিও ধরিত্রী সম্মেলনে গৃহীত আন্তর্জাতিক ফ্রেমওয়ার্ক চুক্তি।',
    simpleSummary: 'The parent world treaty where nations first agreed that greenhouse gases are causing dangerous climate change and must be controlled.',
    explainLike15: 'The historic starting point for all global climate action. It established that rich countries that produced most pollution have a greater responsibility to cut emissions and help vulnerable countries.',
    fullOfficialTextExcerpt: 'The Parties to this Convention, Acknowledging that change in the Earth\'s climate and its adverse effects are a common concern of humankind... Determining to protect the climate system for present and future generations... Have agreed as follows...',
    keyHighlights: [
      'Ultimate Objective (Art. 2): Stabilization of greenhouse gas concentrations to prevent dangerous interference with the climate.',
      'CBDR-RC Principle (Art. 3(1)): Common but Differentiated Responsibilities and Respective Capabilities.',
      'Annual COP: Established the annual Conference of the Parties (COP) governing climate negotiations.'
    ],
    sections: [
      {
        number: 'Article 2',
        title: 'Ultimate Objective of the Convention',
        titleBn: 'কনভেনশনের মূল উদ্দেশ্য',
        content: 'The ultimate objective of this Convention and any related legal instruments that the Conference of the Parties may adopt is to achieve, in accordance with the relevant provisions of the Convention, stabilization of greenhouse gas concentrations in the atmosphere at a level that would prevent dangerous anthropogenic interference with the climate system.',
        contentBn: 'বায়ুমণ্ডলে গ্রিনহাউস গ্যাসের ঘনত্ব এমন একটি নিরাপদ মাত্রায় স্থিতিশীল করা যা জলবায়ুর ওপর বিপজ্জনক মানবসৃষ্ট হস্তক্ষেপ রোধ করতে সক্ষম।',
        simpleExplanation: 'Stopping pollution from warming the planet past the dangerous tipping point.',
        punishmentOrRemedy: 'Reporting of National Communications and compliance mechanisms under COP decisions.',
        keyConcepts: ['Greenhouse gas stabilization', 'Dangerous anthropogenic interference', 'Precautionary principle']
      }
    ],
    timeline: [
      { year: '1992', title: 'Adoption at Rio Earth Summit', description: 'Adopted on 9 May 1992 and opened for signature at Rio de Janeiro.', status: 'enacted' },
      { year: '1994', title: 'Entry into Force', description: 'Came into force on 21 March 1994.', status: 'enacted' },
      { year: '1994', title: 'Bangladesh Ratification', description: 'Bangladesh ratified on 15 April 1994.', status: 'upheld' }
    ],
    relatedLawIds: ['int-paris-agreement-2015', 'int-cbd-1992', 'bd-constitution-1972'],
    citations: {
      standard: 'United Nations Framework Convention on Climate Change, May 9, 1992, 1771 U.N.T.S. 107',
      academic: 'UNFCCC (1992), 1771 UNTS 107, 31 ILM 849.',
      bluebook: 'United Nations Framework Convention on Climate Change art. 2, May 9, 1992, 1771 U.N.T.S. 107.'
    },
    keywords: ['unfccc', 'climate change', 'rio summit', 'greenhouse gas', 'cbdr', 'cop', '1771 unts 107']
  },

  // 21. Paris Agreement (2015) [Refined and updated]
  {
    id: 'int-paris-agreement-2015',
    slug: 'the-paris-agreement-on-climate-change-2015',
    title: 'The Paris Agreement on Climate Change (2015)',
    titleBn: 'প্যারিস জলবায়ু চুক্তি (২০১৫)',
    shortTitle: 'Paris Agreement (COP21 / 2015)',
    alternativeTitles: ['Paris Accord', 'COP21 Agreement', 'UNFCCC Paris Agreement', '3156 UNTS 1'],
    jurisdiction: 'International',
    jurisdictionCode: 'INT',
    category: 'Environment & Climate',
    status: 'Active Treaty',
    instrumentType: 'Multilateral Treaty',
    enactmentYear: 2015,
    adoptionDate: '12 December 2015',
    entryIntoForceDate: '4 November 2016',
    totalStatutorySectionsCount: 29,
    isCuratedSubset: true,
    signatoriesCount: 195,
    ratificationsCount: 195,
    officialLanguages: ['English', 'French', 'Spanish', 'Russian', 'Chinese', 'Arabic'],
    depositary: 'Secretary-General of the United Nations',
    officialGazetteRef: '3156 U.N.T.S. 1',
    unCitationRef: '3156 UNTS 1 / FCCC/CP/2015/L.9/Rev.1',
    officialSource: 'UNFCCC / UN Treaty Collection (unfccc.int)',
    sourceOrganization: 'UNFCCC / ECOLEX / UNTS',
    sourceVerificationUrl: 'https://unfccc.int/sites/default/files/english_paris_agreement.pdf',
    lastUpdatedDate: 'January 2025',
    verificationStatus: 'Verified Multilateral Depositary',
    sourceReproductionNotice: 'Official certified text published in 3156 UNTS 1. Adopted under the UNFCCC framework in Paris.',
    bangladeshRatificationStatus: 'Bangladesh signed on 22 April 2016 and ratified on 21 September 2016.',
    bangladeshDomesticApplicationNote: 'Applied domestically through Bangladesh\'s Nationally Determined Contributions (NDCs), National Adaptation Plan (NAP 2023-2050), and Mujib Climate Prosperity Plan.',
    overview: 'The landmark legally binding international treaty on climate change adopted by 196 Parties at COP21 in Paris, aiming to hold the increase in global average temperature to well below 2°C above pre-industrial levels and pursuing efforts to limit it to 1.5°C through Nationally Determined Contributions (NDCs) and Loss and Damage mechanisms.',
    overviewBn: 'বৈশ্বিক তাপমাত্রা বৃদ্ধি প্রাক-শিল্প স্তরের তুলনায় ১.৫ ডিগ্রি সেলসিয়াসে সীমাবদ্ধ রাখা এবং জলবায়ুর ক্ষয়ক্ষতি (Loss and Damage) তহবিল বাস্তবায়নের ঐতিহাসিক বৈশ্বিক চুক্তি।',
    simpleSummary: 'A global treaty signed by almost every country on Earth to cut greenhouse gas emissions and keep global warming under 1.5°C to protect climate-vulnerable nations like Bangladesh.',
    explainLike15: 'The world\'s emergency climate action plan: countries submit pledges every 5 years to cut fossil fuel pollution, adapt to floods and storms, and fund vulnerable nations.',
    fullOfficialTextExcerpt: 'The Parties to this Agreement, Being Parties to the United Nations Framework Convention on Climate Change... In pursuit of the objective of the Convention, and being guided by its principles, including the principle of equity and common but differentiated responsibilities... Have agreed as follows...',
    keyHighlights: [
      '1.5°C Goal (Art. 2(1)(a)): Holding global temperature rise well below 2°C and pursuing 1.5°C.',
      'Loss and Damage (Art. 8): Explicit international recognition of averting, minimizing, and addressing climate destruction.',
      '5-Year Global Stocktake (Art. 14): Mandatory cycle assessing collective planetary progress.'
    ],
    sections: [
      {
        number: 'Article 2',
        title: 'Long-term Temperature and Climate Resilience Targets',
        titleBn: 'তাপমাত্রা সীমাবদ্ধকরণ ও জলবায়ু সহনশীলতার লক্ষ্যমাত্রা',
        content: 'This Agreement aims to strengthen the global response to the threat of climate change by: (a) Holding the increase in the global average temperature to well below 2°C above pre-industrial levels and pursuing efforts to limit the temperature increase to 1.5°C; (b) Increasing the ability to adapt to adverse impacts; (c) Making finance flows consistent with low emissions.',
        contentBn: 'বৈশ্বিক তাপমাত্রা বৃদ্ধি প্রাক-শিল্প স্তরের তুলনায় ২ ডিগ্রি সেলসিয়াসের নিচে রাখা এবং ১.৫ ডিগ্রিতে সীমাবদ্ধ রাখার সর্বাত্মক প্রচেষ্টা গ্রহণ করা।',
        simpleExplanation: 'The scientific benchmark preventing catastrophic sea-level rise and ecosystem collapse.',
        punishmentOrRemedy: 'Global Stocktake evaluations and compliance committee oversight.',
        keyConcepts: ['1.5C target', 'Climate adaptation', 'Green finance flows']
      },
      {
        number: 'Article 8',
        title: 'Loss and Damage Associated with Climate Impacts',
        titleBn: 'জলবায়ু পরিবর্তনের ক্ষতি ও ক্ষয়ক্ষতি (Loss and Damage)',
        content: 'Parties recognize the importance of averting, minimizing and addressing loss and damage associated with the adverse effects of climate change, including extreme weather events and slow onset events, and the role of sustainable development in reducing the risk of loss and damage.',
        contentBn: 'প্রাকৃতিক দুর্যোগ ও সমুদ্রপৃষ্ঠের উচ্চতা বৃদ্ধির ফলে ক্ষতিগ্রস্ত দেশসমূহের ক্ষতি পূরণের বৈশ্বিক স্বীকৃতি।',
        simpleExplanation: 'Formal legal recognition that climate change destroys homes and coasts, creating the mandate for global financial reparations.',
        punishmentOrRemedy: 'Loss and Damage Fund operationalized under COP decisions.',
        keyConcepts: ['Loss and damage', 'Climate justice', 'Slow-onset events']
      }
    ],
    timeline: [
      { year: '2015', title: 'Adoption at COP21', description: 'Adopted in Paris by consensus of 196 nations on 12 December 2015.', status: 'enacted' },
      { year: '2016', title: 'Record Rapid Entry into Force', description: 'Came into force on 4 November 2016.', status: 'enacted' },
      { year: '2016', title: 'Bangladesh Ratification', description: 'Bangladesh deposited ratification on 21 September 2016.', status: 'upheld' }
    ],
    relatedLawIds: ['int-unfccc-1992', 'int-cbd-1992', 'bd-constitution-1972'],
    citations: {
      standard: 'Paris Agreement to the United Nations Framework Convention on Climate Change, Dec. 12, 2015, 3156 U.N.T.S. 1',
      academic: 'Paris Agreement (2015), 3156 UNTS 1, UN Doc. FCCC/CP/2015/L.9/Rev.1.',
      bluebook: 'Paris Agreement art. 2, Dec. 12, 2015, 3156 U.N.T.S. 1.'
    },
    keywords: ['paris agreement', 'climate change', '1.5 degrees', 'loss and damage', 'ndc', 'ecolex', '3156 unts 1']
  },

  // 22. CBD (1992) - Convention on Biological Diversity
  {
    id: 'int-cbd-1992',
    slug: 'convention-on-biological-diversity-1992',
    title: 'Convention on Biological Diversity (CBD)',
    titleBn: 'জীববৈচিত্র্য কনভেনশন (১৯৯২)',
    shortTitle: 'CBD (Rio 1992)',
    alternativeTitles: ['CBD', 'Biodiversity Convention', '1760 UNTS 79'],
    jurisdiction: 'International',
    jurisdictionCode: 'INT',
    category: 'Environment & Climate',
    status: 'Active Treaty',
    instrumentType: 'Multilateral Treaty',
    enactmentYear: 1992,
    adoptionDate: '5 June 1992',
    entryIntoForceDate: '29 December 1993',
    totalStatutorySectionsCount: 42,
    isCuratedSubset: true,
    signatoriesCount: 196,
    ratificationsCount: 196,
    officialLanguages: ['English', 'French', 'Spanish', 'Russian', 'Chinese', 'Arabic'],
    depositary: 'Secretary-General of the United Nations',
    officialGazetteRef: '1760 U.N.T.S. 79',
    unCitationRef: '1760 UNTS 79 / 31 ILM 818 (1992)',
    officialSource: 'Secretariat of the Convention on Biological Diversity (cbd.int)',
    sourceOrganization: 'UNEP / CBD Secretariat',
    sourceVerificationUrl: 'https://www.cbd.int/convention/text',
    lastUpdatedDate: 'January 2025',
    verificationStatus: 'Verified Multilateral Depositary',
    sourceReproductionNotice: 'Official certified text signed at the Rio Earth Summit in 1992 and deposited with the UN Secretary-General.',
    bangladeshRatificationStatus: 'Bangladesh signed on 5 June 1992 and ratified on 3 May 1994.',
    bangladeshDomesticApplicationNote: 'Directly enacted into domestic statutory law through the Bangladesh Biodiversity Act 2017 (Act No. 2 of 2017), establishing the National Biodiversity Committee and protecting indigenous biological resources.',
    overview: 'The international legal instrument for the conservation of biological diversity, the sustainable use of its components, and the fair and equitable sharing of benefits arising out of the utilization of genetic resources.',
    overviewBn: 'জীববৈচিত্র্য সংরক্ষণ, প্রাকৃতিক সম্পদের টেকসই ব্যবহার এবং জিনগত সম্পদের সুষম অংশীদারিত্ব নিশ্চিতকরণ সংক্রান্ত বৈশ্বিক সনদ।',
    simpleSummary: 'A global agreement to protect forests, wetlands, coral reefs, and wild species from extinction while ensuring local communities benefit from nature.',
    explainLike15: 'The world\'s nature conservation treaty. It protects ecosystems like the Sundarbans mangrove forest in Bangladesh so that plants and endangered animals do not go extinct.',
    fullOfficialTextExcerpt: 'The Contracting Parties, Conscious of the intrinsic value of biological diversity and of the ecological, genetic, social, economic, scientific, educational, cultural, recreational and aesthetic values of biological diversity... Have agreed as follows...',
    keyHighlights: [
      'Three Core Objectives (Art. 1): Conservation, sustainable use, and fair/equitable sharing of genetic benefits.',
      'Sovereign Rights over Genetic Resources (Art. 15): States have sovereign authority to determine access to genetic resources.',
      'In-situ Conservation (Art. 8): Duty to establish protected areas, national parks, and wildlife reserves.'
    ],
    sections: [
      {
        number: 'Article 8',
        title: 'In-situ Conservation of Ecosystems and Habitats',
        titleBn: 'প্রাকৃতিক পরিবেশে জীববৈচিত্র্য সংরক্ষণ (In-situ)',
        content: 'Each Contracting Party shall, as far as possible and as appropriate: (a) Establish a system of protected areas or areas where special measures need to be taken to conserve biological diversity; (b) Develop guidelines for the selection, establishment and management of protected areas.',
        contentBn: 'জীববৈচিত্র্য সংরক্ষণে জাতীয় উদ্যান, অভয়ারণ্য এবং সুরক্ষিত এলাকা প্রতিষ্ঠা ও পরিচালনা করতে হবে।',
        simpleExplanation: 'Countries must create national parks and nature sanctuaries where wildlife cannot be hunted or destroyed.',
        punishmentOrRemedy: 'Enforcement under Bangladesh Biodiversity Act 2017 penalties.',
        keyConcepts: ['Protected areas', 'In-situ conservation', 'Ecosystem preservation']
      }
    ],
    timeline: [
      { year: '1992', title: 'Adoption in Rio', description: 'Opened for signature at the Rio Earth Summit on 5 June 1992.', status: 'enacted' },
      { year: '1993', title: 'Entry into Force', description: 'Came into force on 29 December 1993.', status: 'enacted' },
      { year: '2017', title: 'Bangladesh Biodiversity Act', description: 'Parliament enacted Bangladesh Biodiversity Act 2017 incorporating CBD.', status: 'upheld' }
    ],
    relatedLawIds: ['int-cites-1973', 'bd-constitution-1972', 'int-paris-agreement-2015'],
    citations: {
      standard: 'Convention on Biological Diversity, June 5, 1992, 1760 U.N.T.S. 79',
      academic: 'CBD (1992), 1760 UNTS 79, 31 ILM 818.',
      bluebook: 'Convention on Biological Diversity art. 8, June 5, 1992, 1760 U.N.T.S. 79.'
    },
    keywords: ['cbd', 'biological diversity', 'conservation', 'sundarbans', 'protected areas', '1760 unts 79']
  },

  // 23. CITES (1973) - Endangered Species Trade
  {
    id: 'int-cites-1973',
    slug: 'convention-on-international-trade-in-endangered-species-1973',
    title: 'Convention on International Trade in Endangered Species of Wild Fauna and Flora (CITES)',
    titleBn: 'বিলুপ্তপ্রায় বন্যপ্রাণী ও উদ্ভিদের আন্তর্জাতিক বাণিজ্য কনভেনশন (সাইটস ১৯৭৩)',
    shortTitle: 'CITES (Washington 1973)',
    alternativeTitles: ['CITES', 'Washington Convention on Endangered Species', '993 UNTS 243'],
    jurisdiction: 'International',
    jurisdictionCode: 'INT',
    category: 'Environment & Climate',
    status: 'Active Treaty',
    instrumentType: 'Multilateral Treaty',
    enactmentYear: 1973,
    adoptionDate: '3 March 1973',
    entryIntoForceDate: '1 July 1975',
    totalStatutorySectionsCount: 25,
    isCuratedSubset: true,
    signatoriesCount: 184,
    ratificationsCount: 184,
    officialLanguages: ['English', 'French', 'Spanish'],
    depositary: 'Swiss Federal Council (Bern)',
    officialGazetteRef: '993 U.N.T.S. 243',
    unCitationRef: '993 UNTS 243 / 12 ILM 1085 (1973)',
    officialSource: 'CITES Secretariat (cites.org)',
    sourceOrganization: 'UNEP / CITES Secretariat',
    sourceVerificationUrl: 'https://cites.org/eng/disc/text.php',
    lastUpdatedDate: 'January 2025',
    verificationStatus: 'Verified Multilateral Depositary',
    sourceReproductionNotice: 'Official certified text deposited with the Swiss Federal Council.',
    bangladeshRatificationStatus: 'Bangladesh acceded on 18 February 1982.',
    bangladeshDomesticApplicationNote: 'Implemented through the Wildlife (Conservation and Security) Act 2012 (Act No. 30 of 2012), imposing criminal jail terms for poaching, illegal tiger bone trade, or trafficking endangered wildlife.',
    overview: 'An international agreement between governments ensuring that international commercial trade in specimens of wild animals and plants does not threaten the survival of species, regulating over 38,000 species across three protective Appendices.',
    overviewBn: 'রয়েল বেঙ্গল টাইগারসহ বিলুপ্তপ্রায় বন্যপ্রাণী ও উদ্ভিদের বৈশ্বিক চোরাচালান ও বাণিজ্য নিষিদ্ধকরণ সংক্রান্ত সনদ।',
    simpleSummary: 'A global law preventing poachers and smugglers from trading endangered animals (like tigers, elephants, or turtles) across borders.',
    explainLike15: 'If an animal or plant is in danger of extinction, CITES makes it completely illegal to sell its fur, tusks, meat, or bones to international buyers.',
    fullOfficialTextExcerpt: 'The Contracting States, Recognizing that wild fauna and flora in their many beautiful and varied forms are an irreplaceable part of the natural systems of the earth... Conscious of the ever-growing value of wild fauna and flora from aesthetic, scientific, cultural, recreational and economic points of view... Have agreed as follows...',
    keyHighlights: [
      'Appendix I: Species threatened with extinction; commercial trade is strictly prohibited.',
      'Appendix II: Species that may become threatened unless trade is strictly controlled via export permits.',
      'Enforcement (Art. VIII): Mandatory domestic legislation to penalize trade and confiscate illegal specimens.'
    ],
    sections: [
      {
        number: 'Article II',
        title: 'Fundamental Principles and Appendices Classification',
        titleBn: 'মৌলিক নীতিমালা ও তফশিলভুক্তকরণ',
        content: '1. Appendix I shall include all species threatened with extinction which are or may be affected by trade. Trade in specimens of these species must be subject to particularly strict regulation in order not to endanger further their survival and must only be authorized in exceptional circumstances.',
        contentBn: 'বিলুপ্তির ঝুঁকিতে থাকা সকল প্রজাতি ১ম তফশিলে অন্তর্ভুক্ত থাকবে এবং এগুলোর বাণিজ্যিক কেনাবেচা সম্পূর্ণ নিষিদ্ধ।',
        simpleExplanation: 'Appendix I animals (like Royal Bengal Tigers) cannot be bought or sold internationally for commercial profit.',
        punishmentOrRemedy: 'Criminal seizure, confiscation, and imprisonment under national wildlife statutes.',
        keyConcepts: ['Appendix I species', 'Commercial trade prohibition', 'Wildlife protection']
      }
    ],
    timeline: [
      { year: '1973', title: 'Adoption in Washington', description: 'Concluded at Washington on 3 March 1973.', status: 'enacted' },
      { year: '1975', title: 'Entry into Force', description: 'Came into force on 1 July 1975.', status: 'enacted' },
      { year: '1982', title: 'Bangladesh Accession', description: 'Bangladesh acceded on 18 February 1982.', status: 'upheld' }
    ],
    relatedLawIds: ['int-cbd-1992', 'bd-constitution-1972'],
    citations: {
      standard: 'Convention on International Trade in Endangered Species of Wild Fauna and Flora, Mar. 3, 1973, 993 U.N.T.S. 243',
      academic: 'CITES (1973), 993 UNTS 243, 12 ILM 1085.',
      bluebook: 'Convention on International Trade in Endangered Species of Wild Fauna and Flora art. II, Mar. 3, 1973, 993 U.N.T.S. 243.'
    },
    keywords: ['cites', 'endangered species', 'wildlife poaching', 'royal bengal tiger', 'appendix 1', '993 unts 243']
  },

  // 24. Basel Convention (1989) - Hazardous Waste
  {
    id: 'int-basel-1989',
    slug: 'basel-convention-on-transboundary-movements-of-hazardous-wastes-1989',
    title: 'Basel Convention on the Control of Transboundary Movements of Hazardous Wastes (1989)',
    titleBn: 'বিপজ্জনক বর্জ্য স্থানান্তর নিয়ন্ত্রণ বিষয়ক বাসেল কনভেনশন (১৯৮৯)',
    shortTitle: 'Basel Convention (1989)',
    alternativeTitles: ['Basel Convention', 'Hazardous Waste Treaty', '1673 UNTS 57'],
    jurisdiction: 'International',
    jurisdictionCode: 'INT',
    category: 'Environment & Climate',
    status: 'Active Treaty',
    instrumentType: 'Multilateral Treaty',
    enactmentYear: 1989,
    adoptionDate: '22 March 1989',
    entryIntoForceDate: '5 May 1992',
    totalStatutorySectionsCount: 29,
    isCuratedSubset: true,
    signatoriesCount: 191,
    ratificationsCount: 191,
    officialLanguages: ['English', 'French', 'Spanish', 'Russian', 'Chinese', 'Arabic'],
    depositary: 'Secretary-General of the United Nations',
    officialGazetteRef: '1673 U.N.T.S. 57',
    unCitationRef: '1673 UNTS 57 / 28 ILM 657 (1989)',
    officialSource: 'Basel Convention Secretariat (basel.int)',
    sourceOrganization: 'UNEP / Basel Secretariat',
    sourceVerificationUrl: 'http://www.basel.int/TheConvention/Overview/TextoftheConvention/tabid/1275/Default.aspx',
    lastUpdatedDate: 'January 2025',
    verificationStatus: 'Verified Multilateral Depositary',
    sourceReproductionNotice: 'Official certified text published in 1673 UNTS 57. Depositary: UN Secretary-General.',
    bangladeshRatificationStatus: 'Bangladesh acceded on 1 April 1993.',
    bangladeshDomesticApplicationNote: 'Directly invoked in Supreme Court public interest litigation (BELA v. Bangladesh) regarding shipbreaking yards in Chattogram, requiring decontamination certificates and prohibiting import of toxic waste ships.',
    overview: 'The comprehensive multilateral treaty designed to reduce the movements of hazardous waste between nations, and specifically to prevent transfer of hazardous waste from developed to less developed countries without Prior Informed Consent (PIC).',
    overviewBn: 'উন্নত দেশগুলো থেকে উন্নয়নশীল দেশে ক্ষতিকর বর্জ্য ও বিষাক্ত রাসায়নিক স্থানান্তর রোধ এবং জাহাজ ভাঙা শিল্পে পরিবেশ সুরক্ষার বৈশ্বিক চুক্তি।',
    simpleSummary: 'A global law stopping rich nations from dumping toxic chemical waste or dangerous ships into developing countries without strict permission and cleaning.',
    explainLike15: 'Rich nations cannot load old toxic chemicals onto boats and dump them in developing countries. Everything requires strict advance permits and decontamination.',
    fullOfficialTextExcerpt: 'The Parties to this Convention, Aware of the risk of damage to human health and the environment caused by hazardous wastes and other wastes and the transboundary movement thereof... Convinced that States should take necessary measures for the proper exchange of information on and control over the transboundary movement of hazardous wastes... Have agreed as follows...',
    keyHighlights: [
      'Prior Informed Consent (PIC, Art. 6): No hazardous waste may be exported without written consent from the importing state.',
      'Prohibition of Toxic Dumping: Outlaws exports to countries lacking adequate disposal technology.',
      'Ship Recycling Application: Governs decontamination standards for ocean vessels sent for scrapping.'
    ],
    sections: [
      {
        number: 'Article 4',
        title: 'General Obligations to Ban Hazardous Waste Imports',
        titleBn: 'বিপজ্জনক বর্জ্য আমদানি নিষিদ্ধ করার সাধারণ বাধ্যবাধকতা',
        content: 'Parties exercising their right to prohibit the import of hazardous wastes or other wastes for disposal shall inform the other Parties of their decision... Parties shall prohibit or shall not permit the export of hazardous wastes and other wastes to the Parties which have prohibited the import of such wastes.',
        contentBn: 'যেকোনো রাষ্ট্র ক্ষতিকর বর্জ্য আমদানি নিষিদ্ধ করার পূর্ণ অধিকার রাখে এবং অপর রাষ্ট্রসমূহ তা লঙ্ঘন করে বর্জ্য রপ্তানি করতে পারবে না।',
        simpleExplanation: 'If a country says "do not send toxic waste here," other countries are legally forbidden from exporting waste to it.',
        punishmentOrRemedy: 'Illegal traffic treated as a criminal offense under national legislation.',
        keyConcepts: ['Prior informed consent', 'Illegal traffic', 'Hazardous waste ban']
      }
    ],
    timeline: [
      { year: '1989', title: 'Adoption in Basel', description: 'Adopted in Basel, Switzerland on 22 March 1989.', status: 'enacted' },
      { year: '1992', title: 'Entry into Force', description: 'Came into force on 5 May 1992.', status: 'enacted' },
      { year: '1993', title: 'Bangladesh Accession', description: 'Bangladesh acceded on 1 April 1993.', status: 'upheld' }
    ],
    relatedLawIds: ['int-paris-agreement-2015', 'bd-constitution-1972'],
    citations: {
      standard: 'Basel Convention on the Control of Transboundary Movements of Hazardous Wastes and Their Disposal, Mar. 22, 1989, 1673 U.N.T.S. 57',
      academic: 'Basel Convention (1989), 1673 UNTS 57, 28 ILM 657.',
      bluebook: 'Basel Convention art. 4, Mar. 22, 1989, 1673 U.N.T.S. 57.'
    },
    keywords: ['basel convention', 'hazardous waste', 'toxic dumping', 'shipbreaking', 'prior informed consent', '1673 unts 57']
  },

  // 25. Stockholm Convention on POPs (2001)
  {
    id: 'int-stockholm-pops-2001',
    slug: 'stockholm-convention-on-persistent-organic-pollutants-2001',
    title: 'Stockholm Convention on Persistent Organic Pollutants (POPs, 2001)',
    titleBn: 'স্থায়ী জৈব দূষণকারী পদার্থ সংক্রান্ত স্টকহোম কনভেনশন (২০০১)',
    shortTitle: 'Stockholm Convention on POPs',
    alternativeTitles: ['Stockholm Convention', 'POPs Treaty', '2256 UNTS 119'],
    jurisdiction: 'International',
    jurisdictionCode: 'INT',
    category: 'Environment & Climate',
    status: 'Active Treaty',
    instrumentType: 'Multilateral Treaty',
    enactmentYear: 2001,
    adoptionDate: '22 May 2001',
    entryIntoForceDate: '17 May 2004',
    totalStatutorySectionsCount: 30,
    isCuratedSubset: true,
    signatoriesCount: 186,
    ratificationsCount: 186,
    officialLanguages: ['English', 'French', 'Spanish', 'Russian', 'Chinese', 'Arabic'],
    depositary: 'Secretary-General of the United Nations',
    officialGazetteRef: '2256 U.N.T.S. 119',
    unCitationRef: '2256 UNTS 119 / 40 ILM 532 (2001)',
    officialSource: 'Stockholm Convention Secretariat (pops.int)',
    sourceOrganization: 'UNEP / Stockholm Secretariat',
    sourceVerificationUrl: 'http://chm.pops.int/TheConvention/Overview/TextoftheConvention/tabid/2232/Default.aspx',
    lastUpdatedDate: 'January 2025',
    verificationStatus: 'Verified Multilateral Depositary',
    sourceReproductionNotice: 'Official certified text published in 2256 UNTS 119.',
    bangladeshRatificationStatus: 'Bangladesh signed on 23 May 2001 and ratified on 12 March 2007.',
    bangladeshDomesticApplicationNote: 'Implemented through the Department of Environment\'s National Implementation Plan (NIP) banning dangerous agricultural pesticides (DDT, aldrin, dieldrin) and regulating industrial chemicals.',
    overview: 'A global treaty to protect human health and the environment from chemicals that remain intact in the environment for long periods, become widely distributed geographically, accumulate in the fatty tissue of humans and wildlife, and have harmful impacts.',
    overviewBn: 'ডিডিটিসহ মানবদেহ ও পরিবেশের জন্য মারাত্মক ক্ষতিকর স্থায়ী জৈব রাসায়নিক পদার্থ (POPs) উৎপাদন ও ব্যবহার নিষিদ্ধকরণ সংক্রান্ত আন্তর্জাতিক চুক্তি।',
    simpleSummary: 'A world agreement banning the most dangerous chemical poisons (like DDT and toxic pesticides) that stay in the soil and water forever and cause cancer.',
    explainLike15: 'Certain chemicals are so poisonous that once made, they never break down and travel through the food chain into human bodies. This treaty outlaws their manufacture.',
    fullOfficialTextExcerpt: 'The Parties to this Convention, Recognizing that persistent organic pollutants possess toxic properties, resist degradation, bioaccumulate and are transported, through air, water and migratory species, across international boundaries... Determined to protect human health and the environment... Have agreed as follows...',
    keyHighlights: [
      'Elimination of Dirty Dozen (Art. 3): Bans production and trade of legacy toxic chemicals (DDT, PCBs, dioxins).',
      'Stockpile Management (Art. 6): Safe destruction of existing toxic chemical stockpiles.',
      'Precautionary Approach: Applying precaution in adding newly discovered industrial toxins.'
    ],
    sections: [
      {
        number: 'Article 3',
        title: 'Measures to Reduce or Eliminate Releases from Intentional Production',
        titleBn: 'স্থায়ী জৈব রাসায়নিক পদার্থের উৎপাদন ও ব্যবহার নিষিদ্ধকরণ',
        content: 'Each Party shall: (a) Prohibit and/or take the legal and administrative measures necessary to eliminate: (i) Its production and use of the chemicals listed in Annex A... (ii) Its import and export of the chemicals listed in Annex A.',
        contentBn: 'তফশিলভুক্ত মারাত্মক রাসায়নিক কীটনাশক ও শিল্পবর্জ্যের উৎপাদন, ব্যবহার এবং আমদানি-রপ্তানি সম্পূর্ণ নিষিদ্ধ করতে হবে।',
        simpleExplanation: 'Governments must ban the manufacturing, sale, and importation of outlawed toxic chemical pollutants.',
        punishmentOrRemedy: 'Domestic pesticide regulatory bans and criminal seizures.',
        keyConcepts: ['POPs elimination', 'Annex A chemicals', 'Bioaccumulation prevention']
      }
    ],
    timeline: [
      { year: '2001', title: 'Adoption in Stockholm', description: 'Adopted in Stockholm on 22 May 2001.', status: 'enacted' },
      { year: '2004', title: 'Entry into Force', description: 'Came into force on 17 May 2004.', status: 'enacted' },
      { year: '2007', title: 'Bangladesh Ratification', description: 'Bangladesh ratified on 12 March 2007.', status: 'upheld' }
    ],
    relatedLawIds: ['int-basel-1989', 'bd-constitution-1972'],
    citations: {
      standard: 'Stockholm Convention on Persistent Organic Pollutants, May 22, 2001, 2256 U.N.T.S. 119',
      academic: 'Stockholm Convention (2001), 2256 UNTS 119, 40 ILM 532.',
      bluebook: 'Stockholm Convention art. 3, May 22, 2001, 2256 U.N.T.S. 119.'
    },
    keywords: ['stockholm convention', 'pops', 'persistent organic pollutants', 'ddt', 'toxic pesticides', '2256 unts 119']
  },

  // =========================================================================
  // F. REFUGEES, MIGRATION & TRANSNATIONAL CRIME
  // =========================================================================

  // 26. Refugee Convention (1951) & 1967 Protocol
  {
    id: 'int-refugee-convention-1951',
    slug: 'convention-relating-to-the-status-of-refugees-1951',
    title: 'Convention Relating to the Status of Refugees (1951) & 1967 Protocol',
    titleBn: 'শরণার্থীদের মর্যাদা বিষয়ক জাতিসংঘ কনভেনশন (১৯৫১) ও ১৯৬৭ প্রটোকল',
    shortTitle: '1951 Refugee Convention & Protocol',
    alternativeTitles: ['Geneva Refugee Convention', '1951 Refugee Treaty', '189 UNTS 137', '606 UNTS 267'],
    jurisdiction: 'International',
    jurisdictionCode: 'INT',
    category: 'Refugees & Migration',
    status: 'Active Treaty',
    instrumentType: 'Multilateral Treaty',
    enactmentYear: 1951,
    adoptionDate: '28 July 1951',
    entryIntoForceDate: '22 April 1954',
    totalStatutorySectionsCount: 46,
    isCuratedSubset: true,
    signatoriesCount: 149,
    ratificationsCount: 149,
    officialLanguages: ['English', 'French'],
    depositary: 'Secretary-General of the United Nations',
    officialGazetteRef: '189 U.N.T.S. 137 / 606 U.N.T.S. 267',
    unCitationRef: '189 UNTS 137 (Convention) / 606 UNTS 267 (Protocol)',
    officialSource: 'UNHCR / UN Treaty Collection (unhcr.org)',
    sourceOrganization: 'UN High Commissioner for Refugees (UNHCR)',
    sourceVerificationUrl: 'https://www.unhcr.org/about-unhcr/overview/1951-refugee-convention',
    lastUpdatedDate: 'January 2025',
    verificationStatus: 'Verified Multilateral Depositary',
    sourceReproductionNotice: 'Official certified text published in 189 UNTS 137. Monitored by the United Nations High Commissioner for Refugees (UNHCR).',
    bangladeshRatificationStatus: 'Bangladesh is not a formal contracting state party to the 1951 Convention or the 1967 Protocol.',
    bangladeshDomesticApplicationNote: 'Important Constitutional & Customary Distinction: Although not a formal party to the 1951 Convention, Bangladesh is bound by the customary international law principle of Non-Refoulement. Bangladesh cooperates with UNHCR under humanitarian MOUs, providing asylum and protection to over one million Rohingya refugees from Myanmar.',
    overview: 'The centerpiece of international refugee protection defining who is a refugee, the core principle of Non-Refoulement (prohibition of return to persecution), rights to identity documents, and minimum standards of humane treatment for displaced populations fleeing persecution.',
    overviewBn: 'শরণার্থীর সংজ্ঞা এবং নিপীড়নের মুখে পালিয়ে আসা মানুষদের জোরপূর্বক নিজ দেশে ফেরত না পাঠানোর (নন-রিফৌলমেন্ট) বৈশ্বিক মানবিক সনদ।',
    simpleSummary: 'A global law protecting people who flee their homeland because of war or persecution, guaranteeing they cannot be forced back into danger.',
    explainLike15: 'If someone is being hunted or persecuted in their country because of their race or religion, other nations cannot push them back into danger. That rule is called non-refoulement.',
    fullOfficialTextExcerpt: 'The High Contracting Parties, Considering that the Charter of the United Nations and the Universal Declaration of Human Rights have affirmed the principle that human beings shall enjoy fundamental rights and freedoms without discrimination... Have agreed as follows...',
    keyHighlights: [
      'Refugee Definition (Art. 1A(2)): Well-founded fear of being persecuted for reasons of race, religion, nationality, membership of a particular social group or political opinion.',
      'Non-Refoulement (Art. 33): No contracting state shall expel or return a refugee in any manner whatsoever to the frontiers of territories where their life or freedom would be threatened.',
      'No Penalty for Illegal Entry (Art. 31): Refugees fleeing persecution directly cannot be penalized merely for unlawful entry.'
    ],
    sections: [
      {
        number: 'Article 33',
        title: 'Prohibition of Expulsion or Return (Non-Refoulement)',
        titleBn: 'বলপূর্বক ফেরত পাঠানোর ওপর নিষেধাজ্ঞা (নন-রিফৌলমেন্ট)',
        content: '1. No Contracting State shall expel or return ("refouler") a refugee in any manner whatsoever to the frontiers of territories where his life or freedom would be threatened on account of his race, religion, nationality, membership of a particular social group or political opinion.',
        contentBn: 'কোনো শরণার্থীকে এমন কোনো দেশে জোরপূর্বক ফেরত পাঠানো যাবে না যেখানে তার জীবন বা স্বাধীনতা বর্ণ, ধর্ম বা রাজনৈতিক মতাদর্শের কারণে হুমকির মুখে পড়তে পারে।',
        simpleExplanation: 'Governments are strictly forbidden from forcing refugees back into countries where they face violence, torture, or execution.',
        punishmentOrRemedy: 'Universal customary law norm binding on all states regardless of convention ratification.',
        keyConcepts: ['Non-refoulement', 'Persecution risk', 'Customary human rights baseline']
      }
    ],
    timeline: [
      { year: '1951', title: 'Adoption in Geneva', description: 'Adopted on 28 July 1951 in Geneva.', status: 'enacted' },
      { year: '1967', title: '1967 Protocol', description: 'Removed geographic and time limits, making refugee protection universal.', status: 'amended' },
      { year: '2017', title: 'Rohingya Influx & Customary Protection', description: 'Bangladesh received over 750,000 fleeing Rohingya refugees in accordance with customary non-refoulement principles.', status: 'upheld' }
    ],
    relatedLawIds: ['int-udhr-1948', 'int-cat-1984', 'bd-constitution-1972'],
    citations: {
      standard: 'Convention Relating to the Status of Refugees, July 28, 1951, 189 U.N.T.S. 137',
      academic: '1951 Refugee Convention, 189 UNTS 137 / 1967 Protocol, 606 UNTS 267.',
      bluebook: 'Convention Relating to the Status of Refugees art. 33, July 28, 1951, 189 U.N.T.S. 137.'
    },
    keywords: ['refugee convention', 'non refoulement', 'unhcr', 'asylum', 'rohingya protection', 'customary international law', '189 unts 137']
  },

  // 27. UNTOC (2000) - Transnational Organized Crime
  {
    id: 'int-untoc-2000',
    slug: 'un-convention-against-transnational-organized-crime-2000',
    title: 'UN Convention against Transnational Organized Crime (UNTOC, 2000)',
    titleBn: 'আন্তর্জাতিক আন্তঃসীমান্ত সংগঠিত অপরাধ প্রতিরোধে জাতিসংঘ কনভেনশন (২০০০)',
    shortTitle: 'UNTOC (Palermo Convention 2000)',
    alternativeTitles: ['Palermo Convention', 'UNTOC', 'Organized Crime Convention', '2225 UNTS 209'],
    jurisdiction: 'International',
    jurisdictionCode: 'INT',
    category: 'Refugees & Migration',
    status: 'Active Treaty',
    instrumentType: 'Multilateral Treaty',
    enactmentYear: 2000,
    adoptionDate: '15 November 2000',
    entryIntoForceDate: '29 September 2003',
    totalStatutorySectionsCount: 41,
    isCuratedSubset: true,
    signatoriesCount: 192,
    ratificationsCount: 192,
    officialLanguages: ['English', 'French', 'Spanish', 'Russian', 'Chinese', 'Arabic'],
    depositary: 'Secretary-General of the United Nations',
    officialGazetteRef: '2225 U.N.T.S. 209',
    unCitationRef: '2225 UNTS 209 / UNGA Res. 55/25',
    officialSource: 'UNODC (unodc.org/unodc/en/organized-crime/intro.html)',
    sourceOrganization: 'UN Office on Drugs and Crime (UNODC)',
    sourceVerificationUrl: 'https://www.unodc.org/unodc/en/organized-crime/intro/UNTOC.html',
    lastUpdatedDate: 'January 2025',
    verificationStatus: 'Verified Multilateral Depositary',
    sourceReproductionNotice: 'Official certified text published in 2225 UNTS 209. Concluded at Palermo, Italy in December 2000.',
    bangladeshRatificationStatus: 'Bangladesh acceded on 13 July 2011.',
    bangladeshDomesticApplicationNote: 'Implemented through the Money Laundering Prevention Act 2012 (Act No. 5 of 2012) and the Mutual Legal Assistance in Criminal Matters Act 2012 (Act No. 4 of 2012).',
    overview: 'The main international treaty in the fight against transnational organized crime, providing frameworks for mutual legal assistance, extradition, cross-border asset confiscation, and criminalizing participation in an organized criminal syndicate and money laundering.',
    overviewBn: 'আন্তর্জাতিক মাফিয়া চক্র, সংঘবদ্ধ অপরাধী সিন্ডিকেট, অর্থপাচার ও আন্তঃসীমান্ত চোরাচালান প্রতিরোধে জাতিসংঘ চুক্তি।',
    simpleSummary: 'A world treaty that allows police and courts in different countries to work together to catch international crime syndicates and seize dirty money.',
    explainLike15: 'Criminal gangs do not stop at country borders. UNTOC allows police in one country to track down criminals and dirty money hidden in another country.',
    fullOfficialTextExcerpt: 'The States Parties to this Convention, Declaring that effective action to prevent and combat transnational organized crime requires the close cooperation of all States... Have agreed as follows...',
    keyHighlights: [
      'Organized Criminal Group Defined (Art. 2): Structured group of three or more persons acting to commit serious crime for financial benefit.',
      'Money Laundering Criminalization (Art. 6): Mandatory criminalization of laundering proceeds of crime.',
      'Mutual Legal Assistance (Art. 18): Expedited gathering of cross-border electronic and financial evidence.'
    ],
    sections: [
      {
        number: 'Article 5',
        title: 'Criminalization of Participation in an Organized Criminal Group',
        titleBn: 'সংঘবদ্ধ অপরাধী চক্রে অংশগ্রহণের অপরাধীকরণ',
        content: 'Each State Party shall adopt such legislative and other measures as may be necessary to establish as criminal offences, when committed intentionally: (a) Either or both of the following as criminal offences distinct from those involving the attempt or completion of the criminal activity: (i) Agreeing with one or more other persons to commit a serious crime... (ii) Conduct by a person who, with knowledge of either the aim and general criminal activity of an organized criminal group or its intention to commit the crimes in question, takes an active part in criminal activities of the organized criminal group.',
        contentBn: 'গুরুতর অপরাধ সংঘটনের লক্ষ্যে সংঘবদ্ধ অপরাধী দলের ষড়যন্ত্রে বা অপরাধমূলক কর্মকাণ্ডে সক্রিয়ভাবে অংশগ্রহণকে শাস্তিযোগ্য অপরাধ হিসেবে গণ্য করতে হবে।',
        simpleExplanation: 'Joining an organized crime syndicate or planning serious crimes with a gang is a major felony in itself.',
        punishmentOrRemedy: 'Rigorous imprisonment and asset freezing under money laundering and anti-gang statutes.',
        keyConcepts: ['Organized criminal group', 'Criminal conspiracy', 'Asset forfeiture']
      }
    ],
    timeline: [
      { year: '2000', title: 'Adoption in Palermo', description: 'Adopted in New York and opened for signature in Palermo in December 2000.', status: 'enacted' },
      { year: '2003', title: 'Entry into Force', description: 'Entered into force on 29 September 2003.', status: 'enacted' },
      { year: '2011', title: 'Bangladesh Accession', description: 'Bangladesh deposited instrument of accession on 13 July 2011.', status: 'upheld' }
    ],
    relatedLawIds: ['int-palermo-trafficking-2000', 'int-uncac-2003', 'bd-penal-code-1860'],
    citations: {
      standard: 'United Nations Convention against Transnational Organized Crime, Nov. 15, 2000, 2225 U.N.T.S. 209',
      academic: 'UNTOC (2000), 2225 UNTS 209, 40 ILM 334.',
      bluebook: 'United Nations Convention against Transnational Organized Crime art. 5, Nov. 15, 2000, 2225 U.N.T.S. 209.'
    },
    keywords: ['untoc', 'palermo convention', 'organized crime', 'money laundering', 'extradition', 'mutual legal assistance', '2225 unts 209']
  },

  // 28. Palermo Protocol on Trafficking in Persons (2000)
  {
    id: 'int-palermo-trafficking-2000',
    slug: 'protocol-to-prevent-suppress-and-punish-trafficking-in-persons-2000',
    title: 'Protocol to Prevent, Suppress and Punish Trafficking in Persons, Especially Women and Children (2000)',
    titleBn: 'মানবপাচার (বিশেষ করে নারী ও শিশু) দমন ও শাস্তি সংক্রান্ত পালের্মো প্রটোকল (২০০০)',
    shortTitle: 'Palermo Protocol on Human Trafficking',
    alternativeTitles: ['Palermo Trafficking Protocol', 'UN TIP Protocol', '2237 UNTS 319'],
    jurisdiction: 'International',
    jurisdictionCode: 'INT',
    category: 'Refugees & Migration',
    status: 'Active Treaty',
    instrumentType: 'Treaty Protocol',
    enactmentYear: 2000,
    adoptionDate: '15 November 2000',
    entryIntoForceDate: '25 December 2003',
    totalStatutorySectionsCount: 20,
    isCuratedSubset: true,
    signatoriesCount: 181,
    ratificationsCount: 181,
    officialLanguages: ['English', 'French', 'Spanish', 'Russian', 'Chinese', 'Arabic'],
    depositary: 'Secretary-General of the United Nations',
    officialGazetteRef: '2237 U.N.T.S. 319',
    unCitationRef: '2237 UNTS 319 / UN Doc. A/RES/55/25',
    officialSource: 'UNODC (unodc.org/unodc/en/human-trafficking)',
    sourceOrganization: 'UN Office on Drugs and Crime (UNODC)',
    sourceVerificationUrl: 'https://www.unodc.org/unodc/en/human-trafficking/protocol.html',
    lastUpdatedDate: 'January 2025',
    verificationStatus: 'Verified Multilateral Depositary',
    sourceReproductionNotice: 'Official certified text supplementing the UN Convention against Transnational Organized Crime.',
    bangladeshRatificationStatus: 'Bangladesh acceded on 6 January 2020.',
    bangladeshDomesticApplicationNote: 'Directly enacted into national legislation through the Prevention and Suppression of Human Trafficking Act 2012 (Act No. 3 of 2012), establishing dedicated Anti-Human Trafficking Offense Tribunals across districts.',
    overview: 'The landmark international treaty providing the globally agreed definition of trafficking in persons, establishing the "3P" framework: Prevention of trafficking, Protection of victims, and Prosecution of traffickers, with specific protections for women and children.',
    overviewBn: 'নারী ও শিশুসহ মানবপাচার প্রতিরোধ, পাচারকারীদের কঠোর শাস্তি এবং ভুক্তভোগীদের পুনর্বাসন বিষয়ক আন্তর্জাতিক প্রটোকল।',
    simpleSummary: 'A global law against modern-day slavery and human trafficking, requiring severe penalties for traffickers and medical/legal care for victims.',
    explainLike15: 'Tricking or forcing someone to leave their home to force them into labor or exploitation is human trafficking. This protocol makes it a severe international crime and protects the victims.',
    fullOfficialTextExcerpt: 'The States Parties to this Protocol, Declaring that effective action to prevent and combat trafficking in persons, especially women and children, requires a comprehensive international approach... Have agreed as follows...',
    keyHighlights: [
      'Universal Definition of Trafficking (Art. 3): The recruitment, transportation, transfer, harbouring or receipt of persons by threat, force, fraud, or coercion for exploitation.',
      'Irrelevance of Consent: The consent of a victim to exploitation is legally irrelevant where coercion, fraud, or abuse of power was used.',
      'Protection of Victims (Art. 6): Safe shelter, legal assistance, medical care, and repatriation safeguards.'
    ],
    sections: [
      {
        number: 'Article 3',
        title: 'Definition of Trafficking in Persons',
        titleBn: 'মানবপাচারের প্রামাণ্য আন্তর্জাতিক সংজ্ঞা',
        content: '"Trafficking in persons" shall mean the recruitment, transportation, transfer, harbouring or receipt of persons, by means of the threat or use of force or other forms of coercion, of abduction, of fraud, of deception, of the abuse of power or of a position of vulnerability or of the giving or receiving of payments or benefits to achieve the consent of a person having control over another person, for the purpose of exploitation.',
        contentBn: 'ভয়ভীতি, বলপ্রয়োগ, প্রতারণা বা অসহায়ত্বের সুযোগ নিয়ে কাউকে অন্য স্থানে পাচার, লুকিয়ে রাখা বা গ্রহণ করে যেকোনো ধরনের শোষণই মানবপাচার।',
        simpleExplanation: 'Recruiting or transporting people through lies, force, or threats to exploit them for forced labor or prostitution.',
        punishmentOrRemedy: 'Life imprisonment and death penalty under Bangladesh Human Trafficking Act 2012 for aggravated offenses.',
        keyConcepts: ['Trafficking in persons', 'Coercion and fraud', 'Exploitation']
      }
    ],
    timeline: [
      { year: '2000', title: 'Adoption in New York', description: 'Adopted alongside UNTOC on 15 November 2000.', status: 'enacted' },
      { year: '2003', title: 'Entry into Force', description: 'Came into force on 25 December 2003.', status: 'enacted' },
      { year: '2012', title: 'Bangladesh Anti-Trafficking Act', description: 'Parliament enacted Prevention and Suppression of Human Trafficking Act 2012.', status: 'upheld' },
      { year: '2020', title: 'Bangladesh Accession to Protocol', description: 'Bangladesh formally deposited accession on 6 January 2020.', status: 'upheld' }
    ],
    relatedLawIds: ['int-untoc-2000', 'bd-penal-code-1860', 'int-cedaw-1979'],
    citations: {
      standard: 'Protocol to Prevent, Suppress and Punish Trafficking in Persons Especially Women and Children, Nov. 15, 2000, 2237 U.N.T.S. 319',
      academic: 'Palermo Trafficking Protocol (2000), 2237 UNTS 319, 40 ILM 335.',
      bluebook: 'Protocol to Prevent, Suppress and Punish Trafficking in Persons art. 3, Nov. 15, 2000, 2237 U.N.T.S. 319.'
    },
    keywords: ['human trafficking', 'palermo protocol', 'prevention of human trafficking act 2012', 'victim protection', '2237 unts 319']
  },

  // 29. UNCAC (2003) - Anti-Corruption
  {
    id: 'int-uncac-2003',
    slug: 'united-nations-convention-against-corruption-2003',
    title: 'United Nations Convention against Corruption (UNCAC, 2003)',
    titleBn: 'জাতিসংঘ দুর্নীতিবিরোধী কনভেনশন (আনক্যাক ২০০৩)',
    shortTitle: 'UNCAC (Merida 2003)',
    alternativeTitles: ['UNCAC', 'UN Anti-Corruption Convention', '2349 UNTS 41'],
    jurisdiction: 'International',
    jurisdictionCode: 'INT',
    category: 'Refugees & Migration',
    status: 'Active Treaty',
    instrumentType: 'Multilateral Treaty',
    enactmentYear: 2003,
    adoptionDate: '31 October 2003',
    entryIntoForceDate: '14 December 2005',
    totalStatutorySectionsCount: 71,
    isCuratedSubset: true,
    signatoriesCount: 190,
    ratificationsCount: 190,
    officialLanguages: ['English', 'French', 'Spanish', 'Russian', 'Chinese', 'Arabic'],
    depositary: 'Secretary-General of the United Nations',
    officialGazetteRef: '2349 U.N.T.S. 41',
    unCitationRef: '2349 UNTS 41 / 43 ILM 37 (2004)',
    officialSource: 'UNODC (unodc.org/unodc/en/corruption/uncac.html)',
    sourceOrganization: 'UN Office on Drugs and Crime (UNODC)',
    sourceVerificationUrl: 'https://www.unodc.org/unodc/en/corruption/uncac.html',
    lastUpdatedDate: 'January 2025',
    verificationStatus: 'Verified Multilateral Depositary',
    sourceReproductionNotice: 'Official certified text published in 2349 UNTS 41. The only legally binding universal anti-corruption instrument.',
    bangladeshRatificationStatus: 'Bangladesh acceded on 27 February 2007.',
    bangladeshDomesticApplicationNote: 'Applied through the Anti-Corruption Commission Act 2004 (Act No. 5 of 2004) and Money Laundering Prevention Act 2012, utilizing Chapter V asset recovery mechanisms to repatriate siphoned laundered public funds.',
    overview: 'The only legally binding universal anti-corruption multilateral convention, requiring states to criminalize bribery, embezzlement of public funds, trading in influence, and obstruction of justice, with landmark cross-border Asset Recovery provisions (Chapter V).',
    overviewBn: 'ঘুষ, অর্থ আত্মসাৎ ও সরকারি অর্থ বিদেশে পাচার রোধ এবং পাচারকৃত সম্পদ পুনরুদ্ধারের (Asset Recovery) আইনত বাধ্যতামূলক জাতিসংঘ সনদ।',
    simpleSummary: 'A global anti-corruption law forcing nations to punish corrupt politicians, ban bribery, and return stolen state money hidden in offshore bank accounts.',
    explainLike15: 'If a corrupt minister steals tax money and buys luxury mansions in foreign countries, UNCAC provides international legal tools to freeze the bank accounts and return the money to the people.',
    fullOfficialTextExcerpt: 'The States Parties to this Convention, Concerned about the seriousness of problems and threats posed by corruption to the stability and security of societies... Convinced that corruption is no longer a local matter but a transnational phenomenon... Have agreed as follows...',
    keyHighlights: [
      'Criminalization of Bribery (Arts. 15 & 16): Prohibits active and passive bribery of public and foreign officials.',
      'Asset Recovery (Art. 51): Mandatory return of embezzled public assets to their prior legitimate owners.',
      'Illicit Enrichment (Art. 20): Criminalizing significant increase in assets of a public official that cannot be reasonably explained.'
    ],
    sections: [
      {
        number: 'Article 51',
        title: 'Return and Disposal of Stolen Public Assets (Asset Recovery)',
        titleBn: 'পাচারকৃত রাষ্ট্রীয় সম্পদ পুনরুদ্ধার ও ফেরত প্রদান',
        content: 'The return of assets pursuant to this chapter is a fundamental principle of this Convention, and States Parties shall afford one another the widest measure of cooperation and assistance in this regard.',
        contentBn: 'পাচারকৃত সম্পদ ফেরত দেওয়া এই কনভেনশনের একটি মৌলিক নীতি এবং রাষ্ট্রসমূহ এ বিষয়ে একে অপরকে সর্বাত্মক আইনি সহায়তা প্রদানে বাধ্য থাকবে।',
        simpleExplanation: 'Foreign countries must freeze and return stolen state funds hidden by corrupt rulers in their banks.',
        punishmentOrRemedy: 'Cross-border confiscation and asset restitution to victim states.',
        keyConcepts: ['Asset recovery', 'Mutual legal assistance', 'Anti-corruption restitution']
      }
    ],
    timeline: [
      { year: '2003', title: 'Adoption in Merida', description: 'Adopted in Merida, Mexico on 31 October 2003.', status: 'enacted' },
      { year: '2005', title: 'Entry into Force', description: 'Came into force on 14 December 2005.', status: 'enacted' },
      { year: '2007', title: 'Bangladesh Accession', description: 'Bangladesh acceded on 27 February 2007.', status: 'upheld' }
    ],
    relatedLawIds: ['int-untoc-2000', 'bd-penal-code-1860'],
    citations: {
      standard: 'United Nations Convention against Corruption, Oct. 31, 2003, 2349 U.N.T.S. 41',
      academic: 'UNCAC (2003), 2349 UNTS 41, 43 ILM 37.',
      bluebook: 'United Nations Convention against Corruption art. 51, Oct. 31, 2003, 2349 U.N.T.S. 41.'
    },
    keywords: ['uncac', 'anti corruption', 'bribery', 'asset recovery', 'stolen assets', 'acc bangladesh', '2349 unts 41']
  },

  // =========================================================================
  // G. INTELLECTUAL PROPERTY & TECHNOLOGY
  // =========================================================================

  // 30. Berne Convention (1886 / 1971) - Copyright
  {
    id: 'int-berne-convention-1886',
    slug: 'berne-convention-for-protection-of-literary-and-artistic-works-1886',
    title: 'Berne Convention for the Protection of Literary and Artistic Works (1886 / 1971)',
    titleBn: 'সাহিত্য ও শিল্পকর্ম সুরক্ষায় বার্ন কনভেনশন (১৮৮৬/১৯৭১)',
    shortTitle: 'Berne Convention (Paris Act 1971)',
    alternativeTitles: ['Berne Convention', 'International Copyright Convention', '1161 UNTS 3'],
    jurisdiction: 'International',
    jurisdictionCode: 'INT',
    category: 'Intellectual Property',
    status: 'Active Treaty',
    instrumentType: 'Multilateral Treaty',
    enactmentYear: 1886,
    adoptionDate: '9 September 1886',
    entryIntoForceDate: '5 December 1887',
    totalStatutorySectionsCount: 38,
    isCuratedSubset: true,
    signatoriesCount: 181,
    ratificationsCount: 181,
    officialLanguages: ['English', 'French'],
    depositary: 'Director General of WIPO (Geneva)',
    officialGazetteRef: '1161 U.N.T.S. 3',
    unCitationRef: '1161 UNTS 3 / 828 UNTS 221',
    officialSource: 'WIPO Lex (wipo.int/wipolex)',
    sourceOrganization: 'World Intellectual Property Organization (WIPO)',
    sourceVerificationUrl: 'https://www.wipo.int/treaties/en/ip/berne/',
    lastUpdatedDate: 'January 2025',
    verificationStatus: 'Verified Multilateral Depositary',
    sourceReproductionNotice: 'Official certified text administered by the World Intellectual Property Organization (WIPO) in Geneva.',
    bangladeshRatificationStatus: 'Bangladesh acceded on 4 February 1999 (Paris Act of 1971).',
    bangladeshDomesticApplicationNote: 'Directly codified into domestic statutory law through the Copyright Act 2023 (Act No. 48 of 2023), establishing automatic copyright protection without mandatory registration formalities.',
    overview: 'The preeminent international copyright agreement requiring member nations to recognize the copyright of works of authors from other member countries in the same way as its own nationals (National Treatment), guaranteeing automatic protection without registration formalities, and establishing minimum copyright terms (life of author + 50 years).',
    overviewBn: 'আন্তর্জাতিক কপিরাইট কনভেনশন যা লেখক, চিত্রশিল্পী ও সফটওয়্যার নির্মাতাদের স্বত্বাধিকার কোনো আনুষ্ঠানিক নিবন্ধন ছাড়াই স্বয়ংক্রিয়ভাবে সুরক্ষার নিশ্চয়তা দেয়।',
    simpleSummary: 'A global copyright treaty ensuring books, music, art, and computer software created in one country are automatically protected from piracy across 180+ countries.',
    explainLike15: 'The moment you write a book, code a website, or record a song, you own the copyright worldwide. You do not need to fill out government paperwork to be protected from unauthorized copying.',
    fullOfficialTextExcerpt: 'The countries of the Union, being equally animated by the desire to protect, in as effective and uniform a manner as possible, the rights of authors in their literary and artistic works... Have resolved to revise the Act adopted by the Conference of Berlin... Have agreed as follows...',
    keyHighlights: [
      'Automatic Protection (Art. 5(2)): Copyright enjoyment and exercise shall not be subject to any formality (e.g. registration).',
      'National Treatment (Art. 5(1)): Authors enjoy the same rights in other member countries as native authors.',
      'Minimum Term of Protection (Art. 7(1)): Life of the author plus 50 years after their death.'
    ],
    sections: [
      {
        number: 'Article 5(2)',
        title: 'Principle of Automatic Protection (No Formalities)',
        titleBn: 'স্বয়ংক্রিয় কপিরাইট সুরক্ষার নীতি (নিবন্ধনহীনতা)',
        content: 'The enjoyment and the exercise of these rights shall not be subject to any formality; such enjoyment and such exercise shall be independent of the existence of protection in the country of origin of the work.',
        contentBn: 'কপিরাইট অধিকার প্রয়োগের জন্য কোনো আনুষ্ঠানিক নিবন্ধন বা ফি প্রদানের প্রয়োজন নেই; সৃষ্টিশীল কর্ম সৃষ্টির মুহূর্ত থেকেই স্বয়ংক্রিয়ভাবে সুরক্ষা লাভ করবে।',
        simpleExplanation: 'Creators do not need to register with a government office to have their copyright protected worldwide.',
        punishmentOrRemedy: 'Civil injunctions and statutory damages under national copyright acts.',
        keyConcepts: ['Automatic protection', 'No formalities', 'National treatment']
      }
    ],
    timeline: [
      { year: '1886', title: 'Adoption in Berne', description: 'Initiated by Victor Hugo and adopted on 9 September 1886.', status: 'enacted' },
      { year: '1971', title: 'Paris Revision Act', description: 'Concluded Paris Act incorporating developing country flexibilities.', status: 'amended' },
      { year: '1999', title: 'Bangladesh Accession', description: 'Bangladesh acceded to the Paris Act on 4 February 1999.', status: 'upheld' }
    ],
    relatedLawIds: ['int-wto-trips-1994', 'int-wipo-wct-1996', 'bd-contract-act-1872'],
    citations: {
      standard: 'Berne Convention for the Protection of Literary and Artistic Works, Sept. 9, 1886, as revised at Paris on July 24, 1971, 1161 U.N.T.S. 3',
      academic: 'Berne Convention (1971 Paris Act), 1161 UNTS 3.',
      bluebook: 'Berne Convention for the Protection of Literary and Artistic Works art. 5, July 24, 1971, 1161 U.N.T.S. 3.'
    },
    keywords: ['berne convention', 'copyright', 'wipo', 'automatic protection', 'life plus 50', 'literary works', '1161 unts 3']
  },

  // 31. Paris Convention (1883 / 1967) - Industrial Property
  {
    id: 'int-paris-convention-1883',
    slug: 'paris-convention-for-protection-of-industrial-property-1883',
    title: 'Paris Convention for the Protection of Industrial Property (1883 / 1967)',
    titleBn: 'শিল্পসম্পদ সুরক্ষায় প্যারিস কনভেনশন (১৮৮৩/১৯৬৭)',
    shortTitle: 'Paris Convention (Stockholm 1967)',
    alternativeTitles: ['Paris Convention', 'Industrial Property Convention', '828 UNTS 305'],
    jurisdiction: 'International',
    jurisdictionCode: 'INT',
    category: 'Intellectual Property',
    status: 'Active Treaty',
    instrumentType: 'Multilateral Treaty',
    enactmentYear: 1883,
    adoptionDate: '20 March 1883',
    entryIntoForceDate: '7 July 1884',
    totalStatutorySectionsCount: 30,
    isCuratedSubset: true,
    signatoriesCount: 179,
    ratificationsCount: 179,
    officialLanguages: ['English', 'French'],
    depositary: 'Director General of WIPO (Geneva)',
    officialGazetteRef: '828 U.N.T.S. 305',
    unCitationRef: '828 UNTS 305 / 21 UST 1583',
    officialSource: 'WIPO Lex (wipo.int/treaties/en/ip/paris)',
    sourceOrganization: 'World Intellectual Property Organization (WIPO)',
    sourceVerificationUrl: 'https://www.wipo.int/treaties/en/ip/paris/',
    lastUpdatedDate: 'January 2025',
    verificationStatus: 'Verified Multilateral Depositary',
    sourceReproductionNotice: 'Official certified text of the Stockholm Act of 1967 administered by WIPO.',
    bangladeshRatificationStatus: 'Bangladesh acceded on 3 December 1991.',
    bangladeshDomesticApplicationNote: 'Incorporated into the Bangladesh Patent Act 2022 / 2023 and Trademarks Act 2009, enabling inventors to claim 12-month priority dates on foreign patent filings.',
    overview: 'One of the first intellectual property treaties, establishing international protection for patents, utility models, industrial designs, trademarks, trade names, and geographical indications, guaranteeing Right of Priority and National Treatment.',
    overviewBn: 'পেটেন্ট, ট্রেডমার্ক ও শিল্প নকশা সুরক্ষার আন্তর্জাতিক চুক্তি যা আবিষ্কারকদের ১২ মাসের মধ্যে বিদেশে অগ্রগণ্যতার অধিকার (Right of Priority) দেয়।',
    simpleSummary: 'A global treaty that lets inventors who file a patent or trademark in their home country keep their place in line when applying in other countries for 12 months.',
    explainLike15: 'If you invent something new in Bangladesh today and apply for a patent, this treaty gives you 12 months to file in America, Europe, or Japan while keeping your original filing date.',
    fullOfficialTextExcerpt: 'The countries to which this Convention applies constitute a Union for the protection of industrial property... Nationals of any country of the Union shall, as regards the protection of industrial property, enjoy in all the other countries of the Union the advantages that their respective laws now grant, or may hereafter grant, to nationals...',
    keyHighlights: [
      'Right of Priority (Art. 4): 12 months priority for patents; 6 months for trademarks and designs.',
      'National Treatment (Art. 2): Foreign inventors receive the exact same rights as domestic citizens.',
      'Protection Against Unfair Competition (Art. 10bis): Effective protection against misleading and dishonest commercial practices.'
    ],
    sections: [
      {
        number: 'Article 4',
        title: 'Right of Priority for Patents and Trademarks',
        titleBn: 'পেটেন্ট ও ট্রেডমার্কে অগ্রগণ্যতার অধিকার (রাইট অব প্রায়োরিটি)',
        content: 'Any person who has duly filed an application for a patent, or for the registration of a utility model, or of an industrial design, or of a trademark, in one of the countries of the Union... shall enjoy, for the purpose of filing in the other countries, a right of priority during the periods hereinafter fixed. The periods of priority referred to above shall be twelve months for patents and utility models, and six months for industrial designs and trademarks.',
        contentBn: 'যেকোনো সদস্য দেশে প্রথম পেটেন্ট বা ট্রেডমার্ক আবেদনের তারিখ থেকে ১২ মাসের মধ্যে অপর সদস্য দেশসমূহে আবেদন করলে প্রথম আবেদনের তারিখ থেকেই অগ্রগণ্যতা বহাল থাকবে।',
        simpleExplanation: 'You have a 12-month window after filing a patent at home to file abroad without losing novelty.',
        punishmentOrRemedy: 'Preservation of novelty and invalidation of conflicting junior applications.',
        keyConcepts: ['Right of priority', 'Patent priority period', 'Novelty preservation']
      }
    ],
    timeline: [
      { year: '1883', title: 'Adoption in Paris', description: 'Adopted on 20 March 1883.', status: 'enacted' },
      { year: '1967', title: 'Stockholm Act Revision', description: 'Modernized administration under WIPO.', status: 'amended' },
      { year: '1991', title: 'Bangladesh Accession', description: 'Bangladesh acceded on 3 December 1991.', status: 'upheld' }
    ],
    relatedLawIds: ['int-wto-trips-1994', 'int-berne-convention-1886'],
    citations: {
      standard: 'Paris Convention for the Protection of Industrial Property, Mar. 20, 1883, as revised at Stockholm on July 14, 1967, 828 U.N.T.S. 305',
      academic: 'Paris Convention (1967 Stockholm Act), 828 UNTS 305.',
      bluebook: 'Paris Convention for the Protection of Industrial Property art. 4, July 14, 1967, 828 U.N.T.S. 305.'
    },
    keywords: ['paris convention', 'patents', 'trademarks', 'right of priority', 'wipo', 'industrial property', '828 unts 305']
  },

  // 32. WCT (1996) - WIPO Copyright Treaty
  {
    id: 'int-wipo-wct-1996',
    slug: 'wipo-copyright-treaty-1996',
    title: 'WIPO Copyright Treaty (WCT, 1996)',
    titleBn: 'ওয়াইপো ডিজিটাল কপিরাইট চুক্তি (ডব্লিউসিটি ১৯৯৬)',
    shortTitle: 'WIPO Copyright Treaty (WCT 1996)',
    alternativeTitles: ['WCT', 'Internet Treaties', 'Digital Copyright Treaty', '2186 UNTS 121'],
    jurisdiction: 'International',
    jurisdictionCode: 'INT',
    category: 'Intellectual Property',
    status: 'Active Treaty',
    instrumentType: 'Multilateral Treaty',
    enactmentYear: 1996,
    adoptionDate: '20 December 1996',
    entryIntoForceDate: '6 March 2002',
    totalStatutorySectionsCount: 25,
    isCuratedSubset: true,
    signatoriesCount: 115,
    ratificationsCount: 115,
    officialLanguages: ['English', 'French', 'Spanish', 'Russian', 'Chinese', 'Arabic'],
    depositary: 'Director General of WIPO (Geneva)',
    officialGazetteRef: '2186 U.N.T.S. 121',
    unCitationRef: '2186 UNTS 121 / 36 ILM 65 (1997)',
    officialSource: 'WIPO Lex (wipo.int/treaties/en/ip/wct)',
    sourceOrganization: 'World Intellectual Property Organization (WIPO)',
    sourceVerificationUrl: 'https://www.wipo.int/treaties/en/ip/wct/',
    lastUpdatedDate: 'January 2025',
    verificationStatus: 'Verified Multilateral Depositary',
    sourceReproductionNotice: 'Official certified text of the special agreement under the Berne Convention for digital and internet copyright.',
    bangladeshRatificationStatus: 'Under active legislative consideration in Bangladesh for digital rights harmonization.',
    bangladeshDomesticApplicationNote: 'Provisions regarding computer programs as literary works and technological protection measures are incorporated into the Copyright Act 2023 (Act No. 48 of 2023).',
    overview: 'A special agreement under the Berne Convention that deals with the protection of works and the rights of their authors in the digital environment, explicitly recognizing computer programs as literary works and protecting against circumvention of Technological Protection Measures (TPMs / digital locks).',
    overviewBn: 'ইন্টারনেট ও ডিজিটাল যুগে কম্পিউটার সফটওয়্যার ও অনলাইন কন্টেন্টের কপিরাইট সুরক্ষা এবং ডিজিটাল লক ভাঙা প্রতিরোধের বৈশ্বিক চুক্তি।',
    simpleSummary: 'A digital copyright treaty updating rules for the internet, making it illegal to hack digital locks (DRM) or download pirated software and streaming media without permission.',
    explainLike15: 'The copyright rulebook for the internet era. It ensures computer code is protected just like a written book and makes hacking anti-piracy protections illegal.',
    fullOfficialTextExcerpt: 'The Contracting Parties, Desiring to develop and maintain the protection of the rights of authors in their literary and artistic works in a manner as effective and uniform as possible... Emphasizing the outstanding significance of copyright protection as an incentive for literary and artistic creation... Have agreed as follows...',
    keyHighlights: [
      'Software Protection (Art. 4): Computer programs are protected as literary works whatever may be the mode or form of expression.',
      'Technological Protection Measures (Art. 11): Prohibits circumventing effective technological measures (DRM) used by authors.',
      'Right of Communication to the Public (Art. 8): Exclusive right of authorizing making works available online on demand.'
    ],
    sections: [
      {
        number: 'Article 4',
        title: 'Computer Programs as Literary Works',
        titleBn: 'কম্পিউটার প্রোগ্রামের সাহিত্যকর্ম হিসেবে স্বীকৃতি',
        content: 'Computer programs are protected as literary works within the meaning of Article 2 of the Berne Convention. Such protection applies to computer programs, whatever may be the mode or form of their expression.',
        contentBn: 'কম্পিউটার প্রোগ্রাম বা সফটওয়্যার কোড বার্ন কনভেনশন অনুযায়ী সাহিত্যকর্ম হিসেবে পূর্ণ কপিরাইট সুরক্ষা লাভ করবে।',
        simpleExplanation: 'Computer source code and binary files are legally protected against unauthorized copying just like a published novel.',
        punishmentOrRemedy: 'Civil and criminal piracy penalties under national copyright acts.',
        keyConcepts: ['Computer programs', 'Software copyright', 'Source code protection']
      }
    ],
    timeline: [
      { year: '1996', title: 'Adoption in Geneva', description: 'Adopted at the WIPO Diplomatic Conference on 20 December 1996.', status: 'enacted' },
      { year: '2002', title: 'Entry into Force', description: 'Came into force on 6 March 2002.', status: 'enacted' }
    ],
    relatedLawIds: ['int-berne-convention-1886', 'int-wto-trips-1994'],
    citations: {
      standard: 'WIPO Copyright Treaty, Dec. 20, 1996, 2186 U.N.T.S. 121',
      academic: 'WCT (1996), 2186 UNTS 121, 36 ILM 65.',
      bluebook: 'WIPO Copyright Treaty art. 4, Dec. 20, 1996, 2186 U.N.T.S. 121.'
    },
    keywords: ['wct', 'wipo copyright treaty', 'digital copyright', 'software protection', 'drm', 'tpm', 'internet treaties', '2186 unts 121']
  },

  // =========================================================================
  // H. MARITIME LAW, DIPLOMACY & AVIATION
  // =========================================================================

  // 33. UNCLOS (1982) - Law of the Sea
  {
    id: 'int-unclos-1982',
    slug: 'un-convention-on-the-law-of-the-sea-1982',
    title: 'United Nations Convention on the Law of the Sea (UNCLOS)',
    titleBn: 'জাতিসংঘ সমুদ্র আইন কনভেনশন (ইউএনক্লজ ১৯৮২)',
    shortTitle: 'UNCLOS (Montego Bay 1982)',
    alternativeTitles: ['UNCLOS III', 'Constitution for the Oceans', 'Law of the Sea Convention', '1833 UNTS 3'],
    jurisdiction: 'International',
    jurisdictionCode: 'INT',
    category: 'Law of the Sea',
    status: 'Active Treaty',
    instrumentType: 'Multilateral Treaty',
    enactmentYear: 1982,
    adoptionDate: '10 December 1982',
    entryIntoForceDate: '16 November 1994',
    totalStatutorySectionsCount: 320,
    isCuratedSubset: true,
    signatoriesCount: 169,
    ratificationsCount: 169,
    officialLanguages: ['English', 'French', 'Spanish', 'Russian', 'Chinese', 'Arabic'],
    depositary: 'Secretary-General of the United Nations',
    officialGazetteRef: '1833 U.N.T.S. 397',
    unCitationRef: '1833 UNTS 3 / 21 ILM 1261 (1982)',
    officialSource: 'UN Division for Ocean Affairs and the Law of the Sea (un.org/depts/los)',
    sourceOrganization: 'United Nations (DOALOS) / ITLOS',
    sourceVerificationUrl: 'https://www.un.org/depts/los/convention_agreements/texts/unclos/unclos_e.pdf',
    lastUpdatedDate: 'January 2025',
    verificationStatus: 'Verified Multilateral Depositary',
    sourceReproductionNotice: 'Official certified text published in 1833 UNTS 3. Regarded as the "Constitution for the Oceans".',
    bangladeshRatificationStatus: 'Bangladesh signed on 10 December 1982 and ratified on 27 July 2001.',
    bangladeshDomesticApplicationNote: 'Directly transformed Bangladesh\'s maritime borders. Bangladesh utilized UNCLOS Part XV compulsory dispute settlement to secure landmark maritime boundary delimitations: against Myanmar before ITLOS (Case No. 16, Judgment 14 March 2012) and against India before a PCA Annex VII Arbitral Tribunal (Award 7 July 2014), securing over 118,813 sq km of waters in the Bay of Bengal, codified into the Territorial Waters and Maritime Zones (Amendment) Act 2021.',
    overview: 'The comprehensive global regime of law and order in the world\'s oceans, establishing rules governing all uses of the oceans and their resources, defining territorial seas (12 NM), contiguous zones (24 NM), exclusive economic zones (200 NM), continental shelves, and establishing the International Tribunal for the Law of the Sea (ITLOS).',
    overviewBn: 'সমুদ্রের সংবিধান হিসেবে পরিচিত আন্তর্জাতিক চুক্তি যার অধীনে বাংলাদেশ মায়ানমার ও ভারতের সাথে ঐতিহাসিক সমুদ্রসীমা বিরোধে জয়লাভ করে বঙ্গোপসাগরে সার্বভৌম অধিকার প্রতিষ্ঠা করেছে।',
    simpleSummary: 'The universal rulebook for the world\'s oceans, explaining how far a country\'s sea borders reach and who owns fish, oil, and gas under the water.',
    explainLike15: 'The master treaty that gave Bangladesh sovereign control over its massive waters in the Bay of Bengal: 12 miles of sovereign coast, and 200 miles of economic territory for fishing and gas exploration.',
    fullOfficialTextExcerpt: 'The States Parties to this Convention, Prompted by the desire to settle, in a spirit of mutual understanding and cooperation, all issues relating to the law of the sea and aware of the historic significance of this Convention as an important contribution to the maintenance of peace, justice and progress for all peoples of the world... Have agreed as follows...',
    keyHighlights: [
      'Territorial Sea (Art. 3): Sovereign maritime belt extending up to 12 nautical miles from baselines.',
      'Exclusive Economic Zone (Art. 57): Sovereign resource rights up to 200 nautical miles.',
      'Compulsory Dispute Settlement (Part XV): Binding resolution before ITLOS (Hamburg) or Annex VII Arbitral Tribunals.'
    ],
    sections: [
      {
        number: 'Article 3',
        title: 'Breadth of the Territorial Sea (12 Nautical Miles)',
        titleBn: 'আঞ্চলিক সমুদ্রসীমার বিস্তৃতি (১২ নটিক্যাল মাইল)',
        content: 'Every State has the right to establish the breadth of its territorial sea up to a limit not exceeding 12 nautical miles, measured from baselines determined in accordance with this Convention.',
        contentBn: 'ভিত্তিরেখা থেকে অনধিক ১২ নটিক্যাল মাইল পর্যন্ত যেকোনো উপকূলীয় রাষ্ট্র তার সার্বভৌম আঞ্চলিক সমুদ্রসীমা নির্ধারণের অধিকারী।',
        simpleExplanation: 'A coastal nation completely owns the water and airspace up to 12 nautical miles from its shore.',
        punishmentOrRemedy: 'Full sovereign police, customs, and criminal jurisdiction over territorial waters.',
        keyConcepts: ['Territorial sea', '12 nautical miles', 'Sovereign baseline']
      },
      {
        number: 'Article 56',
        title: 'Rights and Jurisdiction of Coastal State in Exclusive Economic Zone (EEZ)',
        titleBn: 'অনন্য অর্থনৈতিক অঞ্চলে (EEZ) উপকূলীয় রাষ্ট্রের অধিকার ও এখতিয়ার',
        content: 'In the exclusive economic zone, the coastal State has: (a) sovereign rights for the purpose of exploring and exploiting, conserving and managing the natural resources, whether living or non-living, of the waters superjacent to the seabed and of the seabed and its subsoil... (b) jurisdiction as provided for in the relevant provisions of this Convention with regard to: (i) the establishment and use of artificial islands, installations and structures; (ii) marine scientific research; (iii) the protection and preservation of the marine environment.',
        contentBn: '২০০ নটিক্যাল মাইল পর্যন্ত অর্থনৈতিক অঞ্চলে মাছ ধরা, গ্যাস ও খনিজ সম্পদ আহরণ এবং সামুদ্রিক পরিবেশ সুরক্ষায় উপকূলীয় রাষ্ট্রের একক সার্বভৌম অধিকার থাকবে।',
        simpleExplanation: 'Coastal states have the exclusive legal right to catch fish and drill for oil and natural gas up to 200 nautical miles from coast.',
        punishmentOrRemedy: 'Exclusive resource rights enforced via coast guard and naval patrols.',
        keyConcepts: ['EEZ', '200 nautical miles', 'Marine resource rights']
      }
    ],
    timeline: [
      { year: '1982', title: 'Adoption in Montego Bay', description: 'Adopted after decade-long diplomatic conference on 10 December 1982.', status: 'enacted' },
      { year: '1994', title: 'Entry into Force', description: 'Entered into force on 16 November 1994.', status: 'enacted' },
      { year: '2012', title: 'Bangladesh v. Myanmar (ITLOS)', description: 'Landmark judgment by ITLOS establishing Bangladesh\'s maritime boundary in Bay of Bengal.', status: 'upheld' },
      { year: '2014', title: 'Bangladesh v. India (PCA)', description: 'Annex VII arbitral award granting Bangladesh 19,467 sq km of disputed sea area.', status: 'upheld' }
    ],
    relatedLawIds: ['int-vclt-1969', 'bd-constitution-1972', 'int-paris-agreement-2015'],
    citations: {
      standard: 'United Nations Convention on the Law of the Sea, Dec. 10, 1982, 1833 U.N.T.S. 397',
      academic: 'UNCLOS (1982), 1833 UNTS 397, 21 ILM 1261.',
      bluebook: 'United Nations Convention on the Law of the Sea art. 3, Dec. 10, 1982, 1833 U.N.T.S. 397.'
    },
    keywords: ['unclos', 'law of the sea', 'bay of bengal', 'eez', 'territorial sea', 'itlos', 'maritime delimitation', '1833 unts 3']
  },

  // 34. VCDR (1961) - Diplomatic Relations
  {
    id: 'int-vcdr-1961',
    slug: 'vienna-convention-on-diplomatic-relations-1961',
    title: 'Vienna Convention on Diplomatic Relations (VCDR, 1961)',
    titleBn: 'কূটনৈতিক সম্পর্ক বিষয়ক ভিয়েনা কনভেনশন (১৯৬১)',
    shortTitle: 'VCDR (Vienna 1961)',
    alternativeTitles: ['VCDR', 'Diplomatic Relations Convention', '500 UNTS 95'],
    jurisdiction: 'International',
    jurisdictionCode: 'INT',
    category: 'Public International Law',
    status: 'Active Treaty',
    instrumentType: 'Multilateral Treaty',
    enactmentYear: 1961,
    adoptionDate: '18 April 1961',
    entryIntoForceDate: '24 April 1964',
    totalStatutorySectionsCount: 53,
    isCuratedSubset: true,
    signatoriesCount: 193,
    ratificationsCount: 193,
    officialLanguages: ['English', 'French', 'Spanish', 'Russian', 'Chinese'],
    depositary: 'Secretary-General of the United Nations',
    officialGazetteRef: '500 U.N.T.S. 95',
    unCitationRef: '500 UNTS 95 / 55 AJIL 1064 (1961)',
    officialSource: 'United Nations Treaty Collection / ILC (legal.un.org/ilc)',
    sourceOrganization: 'International Law Commission / UNTS',
    sourceVerificationUrl: 'https://treaties.un.org/pages/ViewDetails.aspx?src=TREATY&mtdsg_no=III-3&chapter=3&clang=_en',
    lastUpdatedDate: 'January 2025',
    verificationStatus: 'Verified Multilateral Depositary',
    sourceReproductionNotice: 'Official certified text published in 500 UNTS 95. Codifies ancient customary rules of diplomatic immunity.',
    bangladeshRatificationStatus: 'Bangladesh acceded on 13 January 1978.',
    bangladeshDomesticApplicationNote: 'Codified into domestic law through the Diplomatic and Consular Privileges Act 1967 (adopted in Bangladesh in 1972), providing full judicial and premises immunity to accredited diplomatic missions in Dhaka.',
    overview: 'The fundamental treaty defining the framework for diplomatic relations between sovereign nations, specifying the privileges and immunities of diplomatic missions, inviolability of embassy premises (Article 22), and diplomatic agents\' immunity from criminal and civil jurisdiction of receiving states.',
    overviewBn: 'সার্বভৌম রাষ্ট্রসমূহের মধ্যকার কূটনৈতিক সম্পর্কের প্রধান সনদ যা দূতাবাসের অলঙ্ঘনীয়তা এবং কূটনীতিকদের আইনি সুরক্ষা ও দায়মুক্তি নিশ্চিত করে।',
    simpleSummary: 'A global law ensuring foreign ambassadors and embassies are safe from police raids, searches, and arrests so nations can talk even during disagreements.',
    explainLike15: 'The police of a country cannot raid a foreign embassy or arrest an ambassador. This ensures countries can always communicate peacefully, even if they are angry at each other.',
    fullOfficialTextExcerpt: 'The States Parties to the present Convention, Recalling that peoples of all nations from ancient times have recognized the status of diplomatic agents... Having in mind the purposes and principles of the Charter of the United Nations... Believing that an international convention on diplomatic intercourse, privileges and immunities would contribute to the development of friendly relations among nations... Have agreed as follows...',
    keyHighlights: [
      'Inviolability of Embassy Premises (Art. 22): Agents of the receiving state may not enter embassy premises except with consent of head of mission.',
      'Personal Inviolability (Art. 29): The person of a diplomatic agent shall be inviolable; they shall not be liable to any form of arrest or detention.',
      'Immunity from Jurisdiction (Art. 31): Complete immunity from the criminal jurisdiction of the host receiving state.'
    ],
    sections: [
      {
        number: 'Article 22',
        title: 'Inviolability of Mission Premises',
        titleBn: 'দূতাবাস প্রাঙ্গণের অলঙ্ঘনীয়তা',
        content: '1. The premises of the mission shall be inviolable. The agents of the receiving State may not enter them, except with the consent of the head of the mission. 2. The receiving State is under a special duty to take all appropriate steps to protect the premises of the mission against any intrusion or damage and to prevent any disturbance of the peace of the mission or impairment of its dignity.',
        contentBn: 'দূতাবাসের ভবন বা প্রাঙ্গণ অলঙ্ঘনীয়; রাষ্ট্রদূত বা মিশনপ্রধানের অনুমতি ছাড়া স্থানীয় পুলিশ বা কোনো কর্মকর্তা সেখানে প্রবেশ করতে পারবে না এবং রাষ্ট্রদূতাবাসকে সুরক্ষা দেওয়া স্বাগতিক দেশের বিশেষ দায়িত্ব।',
        simpleExplanation: 'Local police cannot enter a foreign embassy without the ambassador\'s permission, and host police must protect the embassy from mobs.',
        punishmentOrRemedy: 'State responsibility, international diplomatic protest, and ICJ contentious jurisdiction.',
        keyConcepts: ['Inviolability of mission', 'Diplomatic protection', 'Consular safety']
      },
      {
        number: 'Article 29',
        title: 'Personal Inviolability of Diplomatic Agents',
        titleBn: 'কূটনীতিকদের ব্যক্তিগত অলঙ্ঘনীয়তা ও সুরক্ষার অধিকার',
        content: 'The person of a diplomatic agent shall be inviolable. He shall not be liable to any form of arrest or detention. The receiving State shall treat him with due respect and shall take all appropriate steps to prevent any attack on his person, freedom or dignity.',
        contentBn: 'কূটনীতিকের ব্যক্তি অলঙ্ঘনীয়; তাকে কোনোভাবেই গ্রেপ্তার বা আটক করা যাবে না এবং তার মর্যাদা রক্ষায় রাষ্ট্র যথাযথ ব্যবস্থা গ্রহণ করবে।',
        simpleExplanation: 'Foreign diplomats cannot be handcuffed, arrested, or put in jail by host country police.',
        punishmentOrRemedy: 'Persona Non Grata declaration under Article 9 (expulsion from country).',
        keyConcepts: ['Personal inviolability', 'No arrest of diplomats', 'Persona non grata']
      }
    ],
    timeline: [
      { year: '1961', title: 'Adoption in Vienna', description: 'Adopted at the diplomatic conference in Vienna on 18 April 1961.', status: 'enacted' },
      { year: '1964', title: 'Entry into Force', description: 'Came into force on 24 April 1964.', status: 'enacted' },
      { year: '1978', title: 'Bangladesh Accession', description: 'Bangladesh deposited instrument of accession on 13 January 1978.', status: 'upheld' }
    ],
    relatedLawIds: ['int-vccr-1963', 'int-vclt-1969', 'bd-constitution-1972'],
    citations: {
      standard: 'Vienna Convention on Diplomatic Relations, Apr. 18, 1961, 500 U.N.T.S. 95',
      academic: 'VCDR (1961), 500 UNTS 95, 55 AJIL 1064.',
      bluebook: 'Vienna Convention on Diplomatic Relations art. 22, Apr. 18, 1961, 500 U.N.T.S. 95.'
    },
    keywords: ['vcdr', 'vienna convention on diplomatic relations', 'diplomatic immunity', 'embassy inviolability', 'persona non grata', '500 unts 95']
  },

  // 35. VCCR (1963) - Consular Relations
  {
    id: 'int-vccr-1963',
    slug: 'vienna-convention-on-consular-relations-1963',
    title: 'Vienna Convention on Consular Relations (VCCR, 1963)',
    titleBn: 'কনস্যুলার সম্পর্ক বিষয়ক ভিয়েনা কনভেনশন (১৯৬৩)',
    shortTitle: 'VCCR (Vienna 1963)',
    alternativeTitles: ['VCCR', 'Consular Relations Convention', '596 UNTS 261'],
    jurisdiction: 'International',
    jurisdictionCode: 'INT',
    category: 'Public International Law',
    status: 'Active Treaty',
    instrumentType: 'Multilateral Treaty',
    enactmentYear: 1963,
    adoptionDate: '24 April 1963',
    entryIntoForceDate: '19 March 1967',
    totalStatutorySectionsCount: 79,
    isCuratedSubset: true,
    signatoriesCount: 182,
    ratificationsCount: 182,
    officialLanguages: ['English', 'French', 'Spanish', 'Russian', 'Chinese'],
    depositary: 'Secretary-General of the United Nations',
    officialGazetteRef: '596 U.N.T.S. 261',
    unCitationRef: '596 UNTS 261 / 57 AJIL 995 (1963)',
    officialSource: 'United Nations Treaty Collection / ILC',
    sourceOrganization: 'International Law Commission / UNTS',
    sourceVerificationUrl: 'https://treaties.un.org/pages/ViewDetails.aspx?src=TREATY&mtdsg_no=III-6&chapter=3&clang=_en',
    lastUpdatedDate: 'January 2025',
    verificationStatus: 'Verified Multilateral Depositary',
    sourceReproductionNotice: 'Official certified text published in 596 UNTS 261. Complement to the 1961 Diplomatic Convention.',
    bangladeshRatificationStatus: 'Bangladesh acceded on 13 January 1978.',
    bangladeshDomesticApplicationNote: 'Under Article 36 of VCCR, Bangladesh consular officers abroad have the statutory right to visit and communicate with detained Bangladesh nationals (migrant workers, travelers), and foreign consulates in Bangladesh enjoy reciprocal rights.',
    overview: 'The international treaty defining consular relations between independent nations, setting out functions such as protecting nationals abroad, issuing passports and visas, and establishing the fundamental right of detained foreign nationals to consular communication (Article 36).',
    overviewBn: 'বিদেশে অবস্থানরত নাগরিকদের সুরক্ষা, পাসপোর্ট-ভিসা প্রদান এবং গ্রেপ্তারকৃত প্রবাসীদের সাথে নিজ দেশের কনস্যুলার কর্মকর্তাদের সাক্ষাতের অধিকার সংক্রান্ত চুক্তি।',
    simpleSummary: 'A global agreement ensuring that if you are arrested while traveling or working in a foreign country, you have the right to contact your home country\'s embassy or consulate for help.',
    explainLike15: 'If a Bangladesh citizen is arrested in another country, the police there must notify the Bangladesh embassy and let a consul visit and help them get a lawyer.',
    fullOfficialTextExcerpt: 'The States Parties to the present Convention, Recalling that consular relations have been established between peoples since ancient times... Believing that an international convention on consular relations, privileges and immunities would also contribute to the development of friendly relations among nations... Have agreed as follows...',
    keyHighlights: [
      'Consular Access (Art. 36): Mandatory right of detained foreign nationals to communicate with their consulate without delay.',
      'Consular Assistance: Issuing emergency travel documents, verifying fair treatment, and arranging legal defense.',
      'Inviolability of Consular Archives: Consular records and official correspondence are inviolable at all times.'
    ],
    sections: [
      {
        number: 'Article 36',
        title: 'Communication and Contact with Nationals of the Sending State',
        titleBn: 'গ্রেপ্তারকৃত প্রবাসীদের সাথে কনস্যুলার যোগাযোগ ও সাক্ষাতের অধিকার',
        content: 'If he so requests, the competent authorities of the receiving State shall, without delay, inform the consular post of the sending State if, within its consular district, a national of that State is arrested or committed to prison or to custody pending trial or is detained in any other manner. Any communication addressed to the consular post by the person arrested... shall also be forwarded by the said authorities without delay.',
        contentBn: 'কোনো বিদেশি নাগরিক গ্রেপ্তার বা আটক হলে তার অনুরোধে সংশ্লিষ্ট দেশের কনস্যুলেটকে অনতিবিলম্বে অবহিত করতে হবে এবং কনস্যুলার কর্মকর্তাদের বন্দির সাথে যোগাযোগের সুযোগ দিতে হবে।',
        simpleExplanation: 'When a traveler or foreign worker is detained, the police must immediately inform their embassy if requested.',
        punishmentOrRemedy: 'ICJ contentious jurisdiction (e.g., Avena, LaGrand, and Jadhav cases enforcing Article 36 rights).',
        keyConcepts: ['Consular notification', 'Detainee rights', 'Article 36 VCCR']
      }
    ],
    timeline: [
      { year: '1963', title: 'Adoption in Vienna', description: 'Adopted in Vienna on 24 April 1963.', status: 'enacted' },
      { year: '1967', title: 'Entry into Force', description: 'Came into force on 19 March 1967.', status: 'enacted' },
      { year: '1978', title: 'Bangladesh Accession', description: 'Bangladesh acceded on 13 January 1978.', status: 'upheld' }
    ],
    relatedLawIds: ['int-vcdr-1961', 'int-vclt-1969', 'bd-constitution-1972'],
    citations: {
      standard: 'Vienna Convention on Consular Relations, Apr. 24, 1963, 596 U.N.T.S. 261',
      academic: 'VCCR (1963), 596 UNTS 261, 57 AJIL 995.',
      bluebook: 'Vienna Convention on Consular Relations art. 36, Apr. 24, 1963, 596 U.N.T.S. 261.'
    },
    keywords: ['vccr', 'consular relations', 'article 36', 'consular access', 'migrant worker protection', '596 unts 261']
  },

  // 36. VCLT (1969) - Law of Treaties [already defined at top]
  {
    id: 'int-vclt-1969',
    slug: 'vienna-convention-on-the-law-of-treaties-1969',
    title: 'Vienna Convention on the Law of Treaties (1969)',
    titleBn: 'ভিয়েনা চুক্তি আইন কনভেনশন (১৯৬৯)',
    shortTitle: 'VCLT 1969 ("Treaty on Treaties")',
    alternativeTitles: ['Vienna Convention', 'VCLT', 'Treaty on Treaties', '1155 UNTS 331'],
    jurisdiction: 'International',
    jurisdictionCode: 'INT',
    category: 'Public International Law',
    status: 'Active Treaty',
    instrumentType: 'Multilateral Treaty',
    enactmentYear: 1969,
    adoptionDate: '23 May 1969',
    entryIntoForceDate: '27 January 1980',
    totalStatutorySectionsCount: 85,
    isCuratedSubset: true,
    signatoriesCount: 116,
    ratificationsCount: 116,
    officialLanguages: ['English', 'French', 'Spanish', 'Russian', 'Chinese', 'Arabic'],
    depositary: 'Secretary-General of the United Nations',
    officialGazetteRef: '1155 U.N.T.S. 331',
    unCitationRef: '1155 UNTS 331, entered into force 27 Jan 1980',
    officialSource: 'United Nations Treaty Collection (treaties.un.org)',
    sourceOrganization: 'United Nations Treaty Collection (UNTS)',
    sourceVerificationUrl: 'https://treaties.un.org/pages/ViewDetailsIII.aspx?src=TREATY&mtdsg_no=XXIII-1&chapter=23&Temp=mtdsg3&clang=_en',
    lastUpdatedDate: 'January 2025',
    verificationStatus: 'Verified Multilateral Depositary',
    sourceReproductionNotice: 'Official certified text published in 1155 UNTS 331. Widely recognized as customary international law binding universally.',
    bangladeshRatificationStatus: 'Recognized by Bangladesh as authoritative codification of customary international law governing all international agreements.',
    bangladeshDomesticApplicationNote: 'Under Article 145A of the Constitution of Bangladesh, international treaties submitted to the President are interpreted in accordance with customary treaty law codified in the VCLT.',
    overview: 'Known as the "Treaty on Treaties", the Vienna Convention on the Law of Treaties establishes the comprehensive legal framework governing the formation, interpretation, amendment, invalidity, and termination of written treaties between sovereign States.',
    overviewBn: 'আন্তর্জাতিক আইনের অন্যতম প্রধান ভিত্তি যা রাষ্ট্রসমূহের মধ্যকার চুক্তি সম্পাদন, ব্যাখ্যা, সংশোধন, অবসান ও অনুলঙ্ঘনীয় আন্তর্জাতিক নীতির (জাস কোজেন্স) নিয়মাবলি নির্ধারণ করে।',
    simpleSummary: 'The universal rulebook for how countries write, agree to, interpret, and cancel international treaties, establishing that promises between nations must be kept in good faith.',
    explainLike15: 'Imagine a global constitution for contracts between countries. If two nations sign an agreement, the Vienna Convention explains how to resolve disputes if they disagree on what a sentence meant.',
    fullOfficialTextExcerpt: 'The States Parties to the present Convention, Considering the fundamental role of treaties in the history of international relations, Recognizing the ever-increasing importance of treaties as a source of international law... Have agreed as follows...',
    keyHighlights: [
      'Pacta Sunt Servanda (Art. 26): Every treaty in force is binding upon the parties to it and must be performed by them in good faith.',
      'Internal Law Defense Bar (Art. 27): A party may not invoke the provisions of its internal law as justification for its failure to perform a treaty.',
      'Jus Cogens Norms (Art. 53): A treaty is void if it conflicts with a peremptory norm of general international law.'
    ],
    sections: [
      {
        number: 'Article 26',
        title: 'Pacta Sunt Servanda (Good Faith Treaty Observance)',
        titleBn: 'চুক্তি অবশ্যই সরল বিশ্বাসে পালনীয় (প্যাক্টা সুন্ট সারভান্ডা)',
        content: 'Every treaty in force is binding upon the parties to it and must be performed by them in good faith.',
        contentBn: 'বলবৎ থাকা যেকোনো আন্তর্জাতিক চুক্তি স্বাক্ষরকারী সকল রাষ্ট্রের জন্য বাধ্যতামূলক এবং তা অবশ্যই সরল বিশ্বাসে কার্যকর করতে হবে।',
        simpleExplanation: 'Once a sovereign country officially enters into a treaty, it is legally bound to obey its terms truthfully.',
        punishmentOrRemedy: 'State responsibility under international law, dispute referral to ICJ.',
        keyConcepts: ['Pacta sunt servanda', 'Good faith', 'Binding treaty obligations']
      },
      {
        number: 'Article 27',
        title: 'Internal Law and Observance of Treaties',
        titleBn: 'অভ্যন্তরীণ আইন ও চুক্তি পালনের বাধ্যবাধকতা',
        content: 'A party may not invoke the provisions of its internal law as justification for its failure to perform a treaty. This rule is without prejudice to article 46.',
        contentBn: 'আন্তর্জাতিক চুক্তি ভঙ্গ করার অজুহাত হিসেবে কোনো রাষ্ট্র তার নিজস্ব অভ্যন্তরীণ বা জাতীয় আইনের দোহাই দিতে পারবে না।',
        simpleExplanation: 'A nation cannot excuse breaking a treaty by pointing to its own local laws.',
        punishmentOrRemedy: 'International breach declaration and damages under State Responsibility doctrines.',
        keyConcepts: ['Supremacy of treaty over domestic statute', 'State responsibility']
      }
    ],
    timeline: [
      { year: '1969', title: 'Adoption in Vienna', description: 'Adopted on 22 May 1969 by UN Conference on the Law of Treaties.', status: 'enacted' },
      { year: '1980', title: 'Entry into Force', description: 'Came into force on 27 January 1980.', status: 'enacted' }
    ],
    relatedLawIds: ['int-un-charter-1945', 'int-icj-statute-1945', 'bd-constitution-1972'],
    citations: {
      standard: 'Vienna Convention on the Law of Treaties, May 23, 1969, 1155 U.N.T.S. 331',
      academic: 'VCLT (1969), 1155 UNTS 331, 8 ILM 679.',
      bluebook: 'Vienna Convention on the Law of Treaties art. 26, May 23, 1969, 1155 U.N.T.S. 331.'
    },
    keywords: ['vclt', 'vienna convention', 'treaty on treaties', 'pacta sunt servanda', 'jus cogens', 'treaty interpretation', '1155 unts 331']
  },

  // 37. Chicago Convention (1944) - Civil Aviation
  {
    id: 'int-chicago-convention-1944',
    slug: 'convention-on-international-civil-aviation-chicago-1944',
    title: 'Convention on International Civil Aviation (Chicago Convention, 1944)',
    titleBn: 'আন্তর্জাতিক বেসামরিক বিমান চলাচল কনভেনশন (শিকাগো ১৯৪৪)',
    shortTitle: 'Chicago Convention (ICAO 1944)',
    alternativeTitles: ['Chicago Convention', 'ICAO Convention', '15 UNTS 295'],
    jurisdiction: 'International',
    jurisdictionCode: 'INT',
    category: 'Public International Law',
    status: 'Active Treaty',
    instrumentType: 'Multilateral Treaty',
    enactmentYear: 1944,
    adoptionDate: '7 December 1944',
    entryIntoForceDate: '4 April 1947',
    totalStatutorySectionsCount: 96,
    isCuratedSubset: true,
    signatoriesCount: 193,
    ratificationsCount: 193,
    officialLanguages: ['English', 'French', 'Spanish', 'Russian', 'Arabic', 'Chinese'],
    depositary: 'Government of the United States of America (Archives)',
    officialGazetteRef: '15 U.N.T.S. 295',
    unCitationRef: '15 UNTS 295 / 61 Stat. 1180',
    officialSource: 'International Civil Aviation Organization (icao.int)',
    sourceOrganization: 'ICAO (UN Specialized Agency)',
    sourceVerificationUrl: 'https://www.icao.int/publications/pages/doc7300.aspx',
    lastUpdatedDate: 'January 2025',
    verificationStatus: 'Verified Multilateral Depositary',
    sourceReproductionNotice: 'Official certified text establishing the International Civil Aviation Organization (ICAO) in Montreal.',
    bangladeshRatificationStatus: 'Bangladesh acceded on 22 December 1972.',
    bangladeshDomesticApplicationNote: 'Implemented through the Civil Aviation Act 2017 (Act No. 38 of 2017), governing the Civil Aviation Authority of Bangladesh (CAAB), airspace sovereignty, flight safety, and accident investigations.',
    overview: 'The fundamental multilateral convention establishing international civil aviation principles, affirming that every State has complete and exclusive sovereignty over the airspace above its territory (Article 1), outlawing the use of weapons against civil aircraft in flight (Article 3bis), and establishing ICAO.',
    overviewBn: 'সার্বভৌম আকাশসীমা নির্ধারণ, বেসামরিক বিমান চলাচল নিরাপত্তা এবং আইকাও (ICAO) প্রতিষ্ঠা সংক্রান্ত বৈশ্বিক বিমান চলাচল চুক্তি।',
    simpleSummary: 'A global law ensuring planes can safely fly between countries, stating that each country completely controls its own airspace.',
    explainLike15: 'The world rulebook for airplanes: every country owns the sky above its land, planes must follow strict safety standards, and militaries cannot shoot down commercial passenger planes.',
    fullOfficialTextExcerpt: 'WHEREAS the future development of international civil aviation can greatly help to create and preserve friendship and understanding among the nations and peoples of the world... THEREFORE, the undersigned governments have concluded this Convention to that end...',
    keyHighlights: [
      'Airspace Sovereignty (Art. 1): Complete and exclusive sovereignty over the airspace above territorial land and territorial sea.',
      'Non-Use of Weapons (Art. 3bis): Refrain from resorting to the use of weapons against civil aircraft in flight.',
      'ICAO Establishment: Created the International Civil Aviation Organization based in Montreal.'
    ],
    sections: [
      {
        number: 'Article 1',
        title: 'Sovereignty over Airspace',
        titleBn: 'আকাশসীমার ওপর রাষ্ট্রের একক সার্বভৌমত্ব',
        content: 'The contracting States recognize that every State has complete and exclusive sovereignty over the airspace above its territory.',
        contentBn: 'প্রতিটি রাষ্ট্রের তার ভূখণ্ড ও আঞ্চলিক সমুদ্রের ওপরস্থ আকাশসীমার ওপর সম্পূর্ণ ও একক সার্বভৌম অধিকার থাকবে।',
        simpleExplanation: 'Foreign planes cannot fly into a country\'s sky without official diplomatic or commercial flight clearance.',
        punishmentOrRemedy: 'Enforcement under national civil aviation and defense interception protocols.',
        keyConcepts: ['Airspace sovereignty', 'Territorial airspace', 'Flight clearance']
      },
      {
        number: 'Article 3bis',
        title: 'Prohibition of the Use of Weapons Against Civil Aircraft',
        titleBn: 'বেসামরিক যাত্রীবাহী বিমানের ওপর অস্ত্রপ্রয়োগের নিষেধাজ্ঞা',
        content: 'The contracting States recognize that every State must refrain from resorting to the use of weapons against civil aircraft in flight and that, in case of interception, the lives of persons on board and the safety of aircraft must not be endangered.',
        contentBn: 'উড্ডয়নরত বেসামরিক যাত্রীবাহী বিমানের ওপর অস্ত্রপ্রয়োগ বা মিসাইল নিক্ষেপ সম্পূর্ণ নিষিদ্ধ এবং যাত্রীদের নিরাপত্তা বিপন্ন করা যাবে না।',
        simpleExplanation: 'Military forces cannot shoot down or fire missiles at commercial passenger aircraft.',
        punishmentOrRemedy: 'State responsibility and mandatory ICAO incident investigation.',
        keyConcepts: ['Civil aviation safety', 'Interception rules', 'Protection of passenger aircraft']
      }
    ],
    timeline: [
      { year: '1944', title: 'Adoption in Chicago', description: 'Concluded at Chicago by 54 nations on 7 December 1944.', status: 'enacted' },
      { year: '1947', title: 'Entry into Force', description: 'Came into force on 4 April 1947.', status: 'enacted' },
      { year: '1972', title: 'Bangladesh Accession', description: 'Bangladesh acceded on 22 December 1972.', status: 'upheld' }
    ],
    relatedLawIds: ['int-vclt-1969', 'bd-constitution-1972'],
    citations: {
      standard: 'Convention on International Civil Aviation, Dec. 7, 1944, 15 U.N.T.S. 295',
      academic: 'Chicago Convention (1944), 15 UNTS 295, 61 Stat. 1180.',
      bluebook: 'Convention on International Civil Aviation art. 1, Dec. 7, 1944, 15 U.N.T.S. 295.'
    },
    keywords: ['chicago convention', 'icao', 'civil aviation', 'airspace sovereignty', 'article 3bis', 'flight safety', '15 unts 295']
  },

  // 38. ILO Convention No. 87 (1948)
  {
    id: 'int-ilo-convention-87-1948',
    slug: 'ilo-freedom-of-association-convention-no-87-1948',
    title: 'ILO Freedom of Association and Protection of the Right to Organise Convention (No. 87)',
    titleBn: 'আইএলও কনভেনশন নং ৮৭ (সংগঠন করার স্বাধীনতা ও অধিকার সুরক্ষা)',
    shortTitle: 'ILO Convention No. 87 (1948)',
    alternativeTitles: ['ILO C087', 'Freedom of Association Convention', '68 UNTS 17'],
    jurisdiction: 'International',
    jurisdictionCode: 'INT',
    category: 'Labour Law',
    status: 'Active Treaty',
    instrumentType: 'Multilateral Treaty',
    enactmentYear: 1948,
    adoptionDate: '9 July 1948',
    entryIntoForceDate: '4 July 1950',
    totalStatutorySectionsCount: 21,
    isCuratedSubset: true,
    signatoriesCount: 158,
    ratificationsCount: 158,
    officialLanguages: ['English', 'French', 'Spanish'],
    depositary: 'Director-General of the International Labour Office',
    officialGazetteRef: '68 U.N.T.S. 17',
    unCitationRef: '68 UNTS 17 / ILO Convention No. 87',
    officialSource: 'ILO NORMLEX (ilo.org/dyn/normlex)',
    sourceOrganization: 'International Labour Organization (ILO)',
    sourceVerificationUrl: 'https://www.ilo.org/dyn/normlex/en/f?p=NORMLEXPUB:12100:0::NO::P12100_ILO_CODE:C087',
    lastUpdatedDate: 'January 2025',
    verificationStatus: 'Verified Multilateral Depositary',
    sourceReproductionNotice: 'Official certified text of ILO fundamental convention published in 68 UNTS 17.',
    bangladeshRatificationStatus: 'Bangladesh formally ratified Convention No. 87 on 22 June 1972.',
    bangladeshDomesticApplicationNote: 'Under Bangladesh law, freedom of association is constitutionally enshrined in Article 38 of the Constitution and regulated for workers under the Bangladesh Labor Act 2006 (Act No. XLII of 2006).',
    overview: 'One of the core fundamental labour standards of the International Labour Organization (ILO), guaranteeing workers and employers the right to establish and join organizations of their own choosing without prior authorization, and protecting trade unions from state administrative dissolution.',
    overviewBn: 'শ্রমিক ও মালিকদের স্বাধীনভাবে ট্রেড ইউনিয়ন গঠন ও পরিচালনা করার অধিকার প্রদানকারী আন্তর্জাতিক শ্রম সংস্থার (ILO) অন্যতম মৌলিক কনভেনশন।',
    simpleSummary: 'Guarantees that workers have the legal right to form and join trade unions without government interference or harassment.',
    explainLike15: 'Workers have the right to team up into unions so they can negotiate fair wages, safety rules, and working hours with their employers.',
    fullOfficialTextExcerpt: 'The General Conference of the International Labour Organisation... Adopts this ninth day of July of the year one thousand nine hundred and forty-eight the following Convention...',
    keyHighlights: [
      'Right to Form Unions (Art. 2): Workers and employers have the right to establish and join organizations of their choosing.',
      'No Administrative Dissolution (Art. 4): Trade unions shall not be dissolved by executive decree.'
    ],
    sections: [
      {
        number: 'Article 2',
        title: 'Right to Establish and Join Organizations',
        titleBn: 'সংগঠন প্রতিষ্ঠা ও অন্তর্ভুক্তির অধিকার',
        content: 'Workers and employers, without distinction whatsoever, shall have the right to establish and, subject only to the rules of the organisation concerned, to join organisations of their own choosing without previous authorisation.',
        contentBn: 'পূর্বানুমতি ব্যতিরেকে শ্রমিক ও মালিকদের নিজ পছন্দের সংগঠন বা ইউনিয়ন প্রতিষ্ঠা এবং সদস্য হওয়ার অবাধ অধিকার থাকবে।',
        simpleExplanation: 'Employees can form unions freely without needing police or executive permission.',
        punishmentOrRemedy: 'ILO Committee on Freedom of Association complaint procedures.',
        keyConcepts: ['Trade union rights', 'Freedom of association', 'No prior authorization']
      }
    ],
    timeline: [
      { year: '1948', title: 'Adoption in San Francisco', description: 'Adopted at 31st session of International Labour Conference.', status: 'enacted' },
      { year: '1950', title: 'Entry into Force', description: 'Came into force on 4 July 1950.', status: 'enacted' },
      { year: '1972', title: 'Bangladesh Ratification', description: 'Bangladesh ratified on 22 June 1972.', status: 'upheld' }
    ],
    relatedLawIds: ['bd-labor-act-2006', 'int-iccpr-1966', 'int-udhr-1948'],
    citations: {
      standard: 'ILO Convention No. 87 Concerning Freedom of Association and Protection of the Right to Organise, July 9, 1948, 68 U.N.T.S. 17',
      academic: 'ILO Convention No. 87 (1948), 68 UNTS 17.',
      bluebook: 'ILO Convention No. 87 art. 2, July 9, 1948, 68 U.N.T.S. 17.'
    },
    keywords: ['ilo 87', 'labour law', 'trade union', 'freedom of association', 'workers rights', '68 unts 17']
  },

  // 39. ECHR (1950) - European Convention on Human Rights [Regional Law System]
  {
    id: 'int-echr-1950',
    slug: 'european-convention-on-human-rights-1950',
    title: 'European Convention on Human Rights (1950)',
    titleBn: 'ইউরোপীয় মানবাধিকার কনভেনশন (১৯৫০)',
    shortTitle: 'ECHR (Rome 1950)',
    alternativeTitles: ['Convention for the Protection of Human Rights and Fundamental Freedoms', 'ECHR', 'ETS No. 005', '213 UNTS 221'],
    jurisdiction: 'Regional',
    jurisdictionCode: 'INT',
    category: 'Regional Law Systems',
    status: 'Active Treaty',
    instrumentType: 'Multilateral Treaty',
    enactmentYear: 1950,
    adoptionDate: '4 November 1950',
    entryIntoForceDate: '3 September 1953',
    totalStatutorySectionsCount: 59,
    isCuratedSubset: true,
    signatoriesCount: 46,
    ratificationsCount: 46,
    officialLanguages: ['English', 'French'],
    depositary: 'Secretary General of the Council of Europe (Strasbourg)',
    officialGazetteRef: '213 U.N.T.S. 221',
    unCitationRef: '213 UNTS 221 / ETS No. 005',
    officialSource: 'Council of Europe / European Court of Human Rights (echr.coe.int)',
    sourceOrganization: 'Council of Europe / ECtHR',
    sourceVerificationUrl: 'https://www.echr.coe.int/documents/d/echr/convention_ENG',
    lastUpdatedDate: 'January 2025',
    verificationStatus: 'Verified Multilateral Depositary',
    sourceReproductionNotice: 'Official certified text published in 213 UNTS 221 and Council of Europe Treaty Series ETS No. 005.',
    bangladeshRatificationStatus: 'Regional treaty restricted to European states; serves as persuasive comparative jurisprudence in common-law jurisdictions.',
    bangladeshDomesticApplicationNote: 'Frequently cited by the Supreme Court of Bangladesh as persuasive judicial authority regarding fair trial due process, right to privacy, and proportionality standards under Article 102.',
    overview: 'The cornerstone regional human rights convention of Europe drafted by the Council of Europe in 1950, establishing the European Court of Human Rights (ECtHR) in Strasbourg with binding judicial oversight and direct individual petition rights.',
    overviewBn: 'ইউরোপের প্রধান আঞ্চলিক মানবাধিকার চুক্তি যা স্ট্র্যাসবার্গে ইউরোপীয় মানবাধিকার আদালত (ECtHR) প্রতিষ্ঠা করে এবং সরাসরি নাগরিকদের আবেদন করার আইনি অধিকার প্রদান করে।',
    simpleSummary: 'A historic European treaty allowing ordinary citizens to sue their own governments in an independent international court if their human rights are violated.',
    explainLike15: 'The most effective regional human rights court in history: citizens can take their complaints directly to international judges in Strasbourg if local courts fail them.',
    fullOfficialTextExcerpt: 'The governments signatory hereto, being members of the Council of Europe, Considering the Universal Declaration of Human Rights proclaimed by the General Assembly... Have agreed as follows...',
    keyHighlights: [
      'Direct Individual Petition (Art. 34): Citizens can appeal directly to Strasbourg judges.',
      'Right to Privacy (Art. 8): Protection of private and family life, home, and correspondence.',
      'Absolute Anti-Torture (Art. 3): Zero derogation even in war.'
    ],
    sections: [
      {
        number: 'Article 3',
        title: 'Prohibition of Torture and Inhuman Treatment',
        titleBn: 'নির্যাতনের সার্বিক নিষেধাজ্ঞা',
        content: 'No one shall be subjected to torture or to inhuman or degrading treatment or punishment.',
        contentBn: 'কাউকে নির্যাতন কিংবা অমানবিক বা অবমাননাকর আচরণ বা শাস্তি দেওয়া যাবে না।',
        simpleExplanation: 'Zero tolerance ban on physical abuse or cruel prison treatment.',
        punishmentOrRemedy: 'Binding ECtHR damage awards.',
        keyConcepts: ['Absolute right', 'Non-derogable', 'Anti-torture standard']
      }
    ],
    timeline: [
      { year: '1950', title: 'Adoption in Rome', description: 'Signed on 4 November 1950.', status: 'enacted' },
      { year: '1953', title: 'Entry into Force', description: 'Came into force on 3 September 1953.', status: 'enacted' },
      { year: '1998', title: 'Full-Time Court Established', description: 'Protocol 11 established permanent court with mandatory individual petitions.', status: 'amended' }
    ],
    relatedLawIds: ['int-udhr-1948', 'int-iccpr-1966'],
    citations: {
      standard: 'Convention for the Protection of Human Rights and Fundamental Freedoms, Nov. 4, 1950, 213 U.N.T.S. 221',
      academic: 'ECHR (1950), 213 UNTS 221, ETS No. 005.',
      bluebook: 'European Convention on Human Rights art. 3, Nov. 4, 1950, 213 U.N.T.S. 221.'
    },
    keywords: ['echr', 'european court of human rights', 'strasbourg', 'privacy', 'fair trial', '213 unts 221']
  }
];
