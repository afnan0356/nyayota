/**
 * NYAYOTA - INTERNATIONAL LAW ARCHITECTURE & SOURCES REGISTRY
 * 
 * Scalable foundational architecture for global treaties, conventions, declarations,
 * protocols, statutes, and supranational legal instruments.
 * 
 * Prepared for future mass ingestion from UNTS, OHCHR, ICRC, ILO, WTO, UNCITRAL,
 * WIPO, ECOLEX, EUR-Lex, and International Courts.
 */

export interface InternationalCategoryMeta {
  id: string;
  slug: string;
  name: string;
  nameBn: string;
  description: string;
  descriptionBn: string;
  iconName: string;
  primaryDepositaries: string[];
  keyInstrumentsCount: number;
  featuredThemes: string[];
  color: {
    bgLight: string;
    textLight: string;
    borderLight: string;
    bgDark: string;
    textDark: string;
    borderDark: string;
    badgeBg: string;
    badgeText: string;
  };
}

export const INTERNATIONAL_LAW_CATEGORIES: InternationalCategoryMeta[] = [
  {
    id: 'human-rights',
    slug: 'human-rights',
    name: 'Human Rights',
    nameBn: 'মানবাধিকার আইন',
    description: 'Foundational declarations, civil-political covenants, economic-social rights, and specialized conventions against discrimination, torture, and child exploitation.',
    descriptionBn: 'সার্বজনীন মানবাধিকার ঘোষণা, নাগরিক ও রাজনৈতিক অধিকার, অর্থনৈতিক-সামাজিক অধিকার এবং বৈষম্যবিরোধী আন্তর্জাতিক চুক্তি।',
    iconName: 'HeartHandshake',
    primaryDepositaries: ['UN Secretary-General', 'OHCHR', 'UNESCO'],
    keyInstrumentsCount: 9,
    featuredThemes: ['Right to Life', 'Fair Trial', 'Freedom from Torture', 'Gender Equality', 'Child Rights'],
    color: {
      bgLight: 'bg-rose-50',
      textLight: 'text-rose-700',
      borderLight: 'border-rose-200',
      bgDark: 'dark:bg-rose-950/40',
      textDark: 'dark:text-rose-300',
      borderDark: 'dark:border-rose-800/40',
      badgeBg: 'bg-rose-500/10',
      badgeText: 'text-rose-600 dark:text-rose-400'
    }
  },
  {
    id: 'humanitarian-law',
    slug: 'humanitarian-law',
    name: 'Humanitarian Law',
    nameBn: 'আন্তর্জাতিক মানবিক আইন (যুদ্ধকালীন আইন)',
    description: 'The laws of armed conflict (IHL), Geneva Conventions (I-IV), Additional Protocols, Hague regulations, and rules governing the protection of non-combatants and cultural property.',
    descriptionBn: 'জেনেভা কনভেনশন, যুদ্ধবন্দী সুরক্ষা, বেসামরিক নাগরিক নিরাপত্তা এবং সংঘাতপূর্ণ এলাকায় মানবিক আচরণের বৈশ্বিক বিধিমালা।',
    iconName: 'ShieldAlert',
    primaryDepositaries: ['Swiss Federal Council', 'ICRC'],
    keyInstrumentsCount: 6,
    featuredThemes: ['Common Article 3', 'Civilian Immunity', 'Prisoners of War', 'Proportionality in Warfare', 'Medical Neutrality'],
    color: {
      bgLight: 'bg-red-50',
      textLight: 'text-red-700',
      borderLight: 'border-red-200',
      bgDark: 'dark:bg-red-950/40',
      textDark: 'dark:text-red-300',
      borderDark: 'dark:border-red-800/40',
      badgeBg: 'bg-red-500/10',
      badgeText: 'text-red-600 dark:text-red-400'
    }
  },
  {
    id: 'international-criminal-law',
    slug: 'international-criminal-law',
    name: 'International Criminal Law',
    nameBn: 'আন্তর্জাতিক ফৌজদারি আইন',
    description: 'Individual criminal responsibility for genocide, crimes against humanity, war crimes, and the crime of aggression under the Rome Statute and Nuremberg principles.',
    descriptionBn: 'গণহত্যা, মানবতাবিরোধী অপরাধ, যুদ্ধাপরাধ ও আগ্রাসনের শাস্তি সংক্রান্ত রোম সংবিধি ও বৈশ্বিক ফৌজদারি বিচারব্যবস্থা।',
    iconName: 'Gavel',
    primaryDepositaries: ['UN Secretary-General', 'International Criminal Court (ICC)'],
    keyInstrumentsCount: 4,
    featuredThemes: ['Genocide Convention', 'Rome Statute', 'Universal Jurisdiction', 'Command Responsibility', 'Non-applicability of Statutory Limitations'],
    color: {
      bgLight: 'bg-amber-50',
      textLight: 'text-amber-700',
      borderLight: 'border-amber-200',
      bgDark: 'dark:bg-amber-950/40',
      textDark: 'dark:text-amber-300',
      borderDark: 'dark:border-amber-800/40',
      badgeBg: 'bg-amber-500/10',
      badgeText: 'text-amber-600 dark:text-amber-400'
    }
  },
  {
    id: 'law-of-the-sea',
    slug: 'law-of-the-sea',
    name: 'Law of the Sea',
    nameBn: 'সমুদ্র আইন',
    description: 'UNCLOS ("Constitution for the Oceans"), maritime boundaries, territorial seas (12 NM), Exclusive Economic Zones (EEZ 200 NM), continental shelves, and ITLOS dispute resolution.',
    descriptionBn: 'জাতিসংঘ সমুদ্র আইন কনভেনশন (UNCLOS), সমুদ্রসীমা নির্ধারণ, ২০০ নটিক্যাল মাইল অর্থনৈতিক অঞ্চল ও সামুদ্রিক পরিবেশ সুরক্ষা।',
    iconName: 'Compass',
    primaryDepositaries: ['UN Secretary-General', 'UN Division for Ocean Affairs and Law of the Sea (DOALOS)', 'IMO'],
    keyInstrumentsCount: 5,
    featuredThemes: ['Territorial Sea', 'Exclusive Economic Zone (EEZ)', 'Continental Shelf', 'High Seas Freedom', 'ITLOS Tribunal'],
    color: {
      bgLight: 'bg-cyan-50',
      textLight: 'text-cyan-700',
      borderLight: 'border-cyan-200',
      bgDark: 'dark:bg-cyan-950/40',
      textDark: 'dark:text-cyan-300',
      borderDark: 'dark:border-cyan-800/40',
      badgeBg: 'bg-cyan-500/10',
      badgeText: 'text-cyan-600 dark:text-cyan-400'
    }
  },
  {
    id: 'trade-commerce',
    slug: 'trade-commerce',
    name: 'Trade & Commerce',
    nameBn: 'বাণিজ্য ও বাণিজ্যিক আইন',
    description: 'Multilateral trade agreements, WTO (GATT, GATS), UN Convention on Contracts for the International Sale of Goods (CISG), and UNCITRAL model commercial laws.',
    descriptionBn: 'বিশ্ব বাণিজ্য সংস্থা (WTO), আন্তর্জাতিক পণ্য বিক্রয় চুক্তি (CISG), শুল্ক ও মুক্ত বাণিজ্য এবং আন্তর্জাতিক বাণিজ্যিক সালিশি বিধি।',
    iconName: 'ArrowLeftRight',
    primaryDepositaries: ['WTO Director-General', 'UNCITRAL / UN Secretary-General'],
    keyInstrumentsCount: 8,
    featuredThemes: ['GATT / GATS', 'CISG Sales of Goods', 'Most Favoured Nation (MFN)', 'Tariffs & Trade Remedies', 'International Commercial Arbitration'],
    color: {
      bgLight: 'bg-blue-50',
      textLight: 'text-blue-700',
      borderLight: 'border-blue-200',
      bgDark: 'dark:bg-blue-950/40',
      textDark: 'dark:text-blue-300',
      borderDark: 'dark:border-blue-800/40',
      badgeBg: 'bg-blue-500/10',
      badgeText: 'text-blue-600 dark:text-blue-400'
    }
  },
  {
    id: 'labour-law',
    slug: 'labour-law',
    name: 'Labour Law',
    nameBn: 'আন্তর্জাতিক শ্রম আইন',
    description: 'International Labour Organization (ILO) fundamental conventions on freedom of association, elimination of child labour, forced labour abolition, and occupational safety standards.',
    descriptionBn: 'আন্তর্জাতিক শ্রম সংস্থা (ILO) কনভেনশন, শ্রমিক অধিকার, সংগঠন করার স্বাধীনতা, শিশুশ্রম নির্মূল ও নিরাপদ কর্মপরিবেশ।',
    iconName: 'Briefcase',
    primaryDepositaries: ['ILO Director-General'],
    keyInstrumentsCount: 10,
    featuredThemes: ['Freedom of Association (C87)', 'Collective Bargaining (C98)', 'Worst Forms of Child Labour (C182)', 'Equal Remuneration (C100)', 'Occupational Safety'],
    color: {
      bgLight: 'bg-orange-50',
      textLight: 'text-orange-700',
      borderLight: 'border-orange-200',
      bgDark: 'dark:bg-orange-950/40',
      textDark: 'dark:text-orange-300',
      borderDark: 'dark:border-orange-800/40',
      badgeBg: 'bg-orange-500/10',
      badgeText: 'text-orange-600 dark:text-orange-400'
    }
  },
  {
    id: 'intellectual-property',
    slug: 'intellectual-property',
    name: 'Intellectual Property',
    nameBn: 'বুদ্ধিবৃত্তিক সম্পদ আইন (আইপি)',
    description: 'Global IP protection treaties under WIPO and WTO: Berne Convention (Copyright), Paris Convention (Patents/Trademarks), TRIPS Agreement, and Madrid Protocol.',
    descriptionBn: 'কপিরাইট, পেটেন্ট, ট্রেডমার্ক, ট্রিপস চুক্তি (TRIPS) এবং বার্ন ও প্যারিস আন্তর্জাতিক কনভেনশন।',
    iconName: 'Lightbulb',
    primaryDepositaries: ['WIPO Director-General', 'WTO'],
    keyInstrumentsCount: 6,
    featuredThemes: ['TRIPS Agreement', 'Berne Convention Copyright', 'Paris Convention Patents', 'Compulsory Licensing', 'Geographical Indications'],
    color: {
      bgLight: 'bg-purple-50',
      textLight: 'text-purple-700',
      borderLight: 'border-purple-200',
      bgDark: 'dark:bg-purple-950/40',
      textDark: 'dark:text-purple-300',
      borderDark: 'dark:border-purple-800/40',
      badgeBg: 'bg-purple-500/10',
      badgeText: 'text-purple-600 dark:text-purple-400'
    }
  },
  {
    id: 'environment-climate',
    slug: 'environment-climate',
    name: 'Environment & Climate',
    nameBn: 'পরিবেশ ও জলবায়ু আইন',
    description: 'Multilateral environmental accords: Paris Climate Agreement (2015), UNFCCC (1992), Convention on Biological Diversity (CBD), Basel Convention on hazardous waste, and ECOLEX treaties.',
    descriptionBn: 'প্যারিস জলবায়ু চুক্তি, জাতিসংঘ জলবায়ু পরিবর্তন ফ্রেমওয়ার্ক (UNFCCC), জীববৈচিত্র্য সংরক্ষণ ও ক্ষতিকর বর্জ্য নিয়ন্ত্রণ।',
    iconName: 'Leaf',
    primaryDepositaries: ['UN Secretary-General', 'UNEP', 'FAO/IUCN'],
    keyInstrumentsCount: 7,
    featuredThemes: ['1.5°C Paris Goal', 'Nationally Determined Contributions (NDCs)', 'Common but Differentiated Responsibilities', 'Climate Finance', 'Loss & Damage'],
    color: {
      bgLight: 'bg-emerald-50',
      textLight: 'text-emerald-700',
      borderLight: 'border-emerald-200',
      bgDark: 'dark:bg-emerald-950/40',
      textDark: 'dark:text-emerald-300',
      borderDark: 'dark:border-emerald-800/40',
      badgeBg: 'bg-emerald-500/10',
      badgeText: 'text-emerald-600 dark:text-emerald-400'
    }
  },
  {
    id: 'investment-law',
    slug: 'investment-law',
    name: 'Investment Law',
    nameBn: 'আন্তর্জাতিক বিনিয়োগ আইন',
    description: 'Bilateral Investment Treaties (BITs), ICSID Convention on Investor-State Dispute Settlement (ISDS), Energy Charter Treaty, and UNCTAD investment policy frameworks.',
    descriptionBn: 'দ্বিপাক্ষিক বিনিয়োগ চুক্তি (BITs), আইসিএসআইডি সালিশি কনভেনশন (ICSID), বিদেশি বিনিয়োগ সুরক্ষা ও রাষ্ট্র-বিনিয়োগকারী বিরোধ নিষ্পত্তি।',
    iconName: 'TrendingUp',
    primaryDepositaries: ['World Bank (ICSID)', 'UNCTAD'],
    keyInstrumentsCount: 5,
    featuredThemes: ['Fair and Equitable Treatment (FET)', 'Expropriation & Compensation', 'Investor-State Dispute Settlement (ISDS)', 'ICSID Arbitration', 'Bilateral Investment Treaties'],
    color: {
      bgLight: 'bg-indigo-50',
      textLight: 'text-indigo-700',
      borderLight: 'border-indigo-200',
      bgDark: 'dark:bg-indigo-950/40',
      textDark: 'dark:text-indigo-300',
      borderDark: 'dark:border-indigo-800/40',
      badgeBg: 'bg-indigo-500/10',
      badgeText: 'text-indigo-600 dark:text-indigo-400'
    }
  },
  {
    id: 'public-international-law',
    slug: 'public-international-law',
    name: 'Public International Law',
    nameBn: 'পাবলিক আন্তর্জাতিক আইন',
    description: 'Foundational constitutional treaties of the international legal order: Charter of the United Nations (1945), Vienna Convention on the Law of Treaties (VCLT 1969), and diplomatic relations conventions.',
    descriptionBn: 'জাতিসংঘ সনদ, ভিয়েনা চুক্তি আইন কনভেনশন (VCLT), কূটনৈতিক সম্পর্ক ও রাষ্ট্রীয় সার্বভৌমত্বের সার্বজনীন নীতিমালা।',
    iconName: 'Globe',
    primaryDepositaries: ['UN Secretary-General'],
    keyInstrumentsCount: 6,
    featuredThemes: ['Pacta Sunt Servanda', 'Jus Cogens Norms', 'UN Charter Article 2(4)', 'State Sovereignty', 'Diplomatic Immunity'],
    color: {
      bgLight: 'bg-sky-50',
      textLight: 'text-sky-700',
      borderLight: 'border-sky-200',
      bgDark: 'dark:bg-sky-950/40',
      textDark: 'dark:text-sky-300',
      borderDark: 'dark:border-sky-800/40',
      badgeBg: 'bg-sky-500/10',
      badgeText: 'text-sky-600 dark:text-sky-400'
    }
  },
  {
    id: 'international-courts',
    slug: 'international-courts-tribunals',
    name: 'International Courts & Tribunals',
    nameBn: 'আন্তর্জাতিক আদালত ও ট্রাইব্যুনাল',
    description: 'Constituent statutes, rules of procedure, and foundational jurisprudence of apex international judicial organs: ICJ Statute, ITLOS, ICC, PCA, and WTO Appellate Body.',
    descriptionBn: 'আন্তর্জাতিক বিচার আদালত (ICJ), আন্তর্জাতিক ট্রাইব্যুনাল (ITLOS, ICC) এবং আন্তর্জাতিক সালিশি আদালতের সংবিধি ও এখতিয়ার।',
    iconName: 'Scale',
    primaryDepositaries: ['International Court of Justice (ICJ)', 'UN Secretary-General', 'ITLOS'],
    keyInstrumentsCount: 5,
    featuredThemes: ['ICJ Statute Article 38(1)', 'Advisory Opinions', 'Compulsory Jurisdiction Declarations', 'Provisional Measures', 'Judicial Precedent'],
    color: {
      bgLight: 'bg-violet-50',
      textLight: 'text-violet-700',
      borderLight: 'border-violet-200',
      bgDark: 'dark:bg-violet-950/40',
      textDark: 'dark:text-violet-300',
      borderDark: 'dark:border-violet-800/40',
      badgeBg: 'bg-violet-500/10',
      badgeText: 'text-violet-600 dark:text-violet-400'
    }
  },
  {
    id: 'regional-law-systems',
    slug: 'regional-law-systems',
    name: 'Regional Law Systems',
    nameBn: 'আঞ্চলিক ও সুপারন্যাশনালি আইন কাঠামো',
    description: 'Supranational and regional conventions: European Convention on Human Rights (ECHR), EU Treaties & Charter (EUR-Lex), Inter-American Human Rights System, and African Charter (Banjul).',
    descriptionBn: 'ইউরোপীয় মানবাধিকার কনভেনশন (ECHR), ইউরোপীয় ইউনিয়ন আইন (EUR-Lex) ও আন্তঃআমেরিকান আঞ্চলিক মানবাধিকার ব্যবস্থা।',
    iconName: 'Landmark',
    primaryDepositaries: ['Council of Europe', 'European Union Publications Office', 'OAS'],
    keyInstrumentsCount: 5,
    featuredThemes: ['European Convention on Human Rights', 'EU Charter of Fundamental Rights', 'ECHR Judicial Review', 'Regional Supranational Integration', 'Subsidiarity'],
    color: {
      bgLight: 'bg-teal-50',
      textLight: 'text-teal-700',
      borderLight: 'border-teal-200',
      bgDark: 'dark:bg-teal-950/40',
      textDark: 'dark:text-teal-300',
      borderDark: 'dark:border-teal-800/40',
      badgeBg: 'bg-teal-500/10',
      badgeText: 'text-teal-600 dark:text-teal-400'
    }
  }
];

// ----------------------------------------------------
// OFFICIAL INTERNATIONAL REPOSITORIES & SOURCES REGISTRY
// ----------------------------------------------------

export interface OfficialSourceRegistryItem {
  id: string;
  name: string;
  acronym: string;
  scope: string;
  officialUrl: string;
  depositaryType: 'UN Specialized Agency' | 'UN Treaty Depositary' | 'International Organization' | 'International Judicial Organ' | 'Regional Supranational Body';
  ingestionProtocol: 'Direct Document URL' | 'REST API / Data Portal' | 'Cellar SPARQL / Bulk Export' | 'Structured XML / JSON Feeds';
  reproductionNotice: string;
  bulkCapabilityDescription: string;
  verifiedInstrumentsCount: string;
  status: 'Ready for Scaled Ingestion' | 'Verified Active Source' | 'API Pipeline Configured';
}

export const INTERNATIONAL_SOURCES_REGISTRY: OfficialSourceRegistryItem[] = [
  {
    id: 'src-unts',
    name: 'UN Treaty Collection (UNTS)',
    acronym: 'UNTS',
    scope: 'Secretary-General\'s official treaty depositary, UN Treaty Series (Vols 1-3000+), League of Nations Treaties, multilateral treaties.',
    officialUrl: 'https://treaties.un.org/',
    depositaryType: 'UN Treaty Depositary',
    ingestionProtocol: 'Direct Document URL',
    reproductionNotice: 'Text reproduced from the official certified depository copies published in the United Nations Treaty Series (UNTS). Authentic multilateral texts in English, French, Spanish, Russian, Chinese, and Arabic.',
    bulkCapabilityDescription: 'Supports document-level extraction mapped against UNTS treaty registration volume and publication coordinates.',
    verifiedInstrumentsCount: '250,000+ registered treaties worldwide',
    status: 'Verified Active Source'
  },
  {
    id: 'src-ohchr',
    name: 'Office of the UN High Commissioner for Human Rights',
    acronym: 'OHCHR',
    scope: 'Full text of the nine core international human rights instruments (ICCPR, ICESCR, CEDAW, CRC, CAT, CRPD), Universal Human Rights Index, and treaty body jurisprudence.',
    officialUrl: 'https://www.ohchr.org/en/instruments-listing',
    depositaryType: 'UN Specialized Agency',
    ingestionProtocol: 'Direct Document URL',
    reproductionNotice: 'Text reproduced from the Office of the High Commissioner for Human Rights (OHCHR). Curated for academic and open legal knowledge.',
    bulkCapabilityDescription: 'Universal Human Rights Index (UHRI) provides standardized recommendations taxonomy across UN treaty bodies.',
    verifiedInstrumentsCount: '9 Core Treaties + 9 Protocols + 15,000+ jurisprudence decisions',
    status: 'Ready for Scaled Ingestion'
  },
  {
    id: 'src-icrc',
    name: 'International Committee of the Red Cross (IHL Databases)',
    acronym: 'ICRC',
    scope: '100+ treaties from 1856 to present, including the 1949 Geneva Conventions (I-IV), Additional Protocols, and Customary IHL Rules.',
    officialUrl: 'https://ihl-databases.icrc.org/en/ihl-treaties',
    depositaryType: 'International Organization',
    ingestionProtocol: 'Direct Document URL',
    reproductionNotice: 'Notice: Text is reproduced from the ICRC International Humanitarian Law Database. The ICRC explicitly notes its online database provides digital reference copies, while the original authenticated texts are deposited with the Swiss Federal Council.',
    bulkCapabilityDescription: 'Complete IHL database with state practice annotations and authoritative commentaries for each provision.',
    verifiedInstrumentsCount: '110+ Multilateral IHL Treaties',
    status: 'Verified Active Source'
  },
  {
    id: 'src-ilo',
    name: 'ILO NORMLEX & NATLEX',
    acronym: 'ILO',
    scope: '190+ International Labour Conventions, Recommendations, Protocols, and national labor transpositions across member states.',
    officialUrl: 'https://www.ilo.org/dyn/normlex/en/',
    depositaryType: 'UN Specialized Agency',
    ingestionProtocol: 'Direct Document URL',
    reproductionNotice: 'Text reproduced from the International Labour Organization (ILO) NORMLEX information system on international labour standards.',
    bulkCapabilityDescription: 'Standardized convention numbers (C001 to C190) with ratification statuses and committee supervisory comments.',
    verifiedInstrumentsCount: '190 Conventions + 206 Recommendations',
    status: 'Ready for Scaled Ingestion'
  },
  {
    id: 'src-wto',
    name: 'World Trade Organization Legal Texts',
    acronym: 'WTO',
    scope: 'The Marrakesh Agreement establishing the WTO, GATT 1994, GATS, TRIPS, Dispute Settlement Understanding (DSU), and Trade Remedies.',
    officialUrl: 'https://www.wto.org/english/docs_e/legal_e/legal_e.htm',
    depositaryType: 'International Organization',
    ingestionProtocol: 'Direct Document URL',
    reproductionNotice: 'Text reproduced from the official WTO Legal Texts collection deposited at Geneva.',
    bulkCapabilityDescription: 'Structured tariff schedules, dispute settlement panel reports, and multilateral trade agreements.',
    verifiedInstrumentsCount: '60+ Agreements, Annexes and Understandings',
    status: 'Ready for Scaled Ingestion'
  },
  {
    id: 'src-uncitral',
    name: 'UNCITRAL Legal Texts & Model Laws',
    acronym: 'UNCITRAL',
    scope: 'Uniform commercial laws, CISG (1980), Model Law on International Commercial Arbitration, E-Commerce Model Law, and Insolvency frameworks.',
    officialUrl: 'https://uncitral.un.org/en/texts',
    depositaryType: 'UN Specialized Agency',
    ingestionProtocol: 'Direct Document URL',
    reproductionNotice: 'Text reproduced from the United Nations Commission on International Trade Law (UNCITRAL) official repository.',
    bulkCapabilityDescription: 'CLOUT (Case Law on UNCITRAL Texts) provides standardized cross-border judicial interpretation indices.',
    verifiedInstrumentsCount: '40+ Conventions, Model Laws & Legislative Guides',
    status: 'Verified Active Source'
  },
  {
    id: 'src-wipo',
    name: 'WIPO Lex (World Intellectual Property Organization)',
    acronym: 'WIPO',
    scope: '26 WIPO-administered IP treaties (Berne, Paris, Patent Cooperation Treaty, Madrid, WCT) and global national IP legislations.',
    officialUrl: 'https://www.wipolex.wipo.int/en/',
    depositaryType: 'UN Specialized Agency',
    ingestionProtocol: 'Direct Document URL',
    reproductionNotice: 'Text reproduced from WIPO Lex, the global repository of intellectual property treaties and national laws.',
    bulkCapabilityDescription: 'Comprehensive treaty taxonomy with official translation pairs and national implementation cross-references.',
    verifiedInstrumentsCount: '26 Multilateral IP Treaties + 16,000+ National Laws',
    status: 'Ready for Scaled Ingestion'
  },
  {
    id: 'src-ecolex',
    name: 'ECOLEX — The Gateway to Environmental Law',
    acronym: 'ECOLEX',
    scope: 'Joint environmental database operated by FAO, IUCN, and UNEP covering multilateral environmental agreements, COP decisions, and treaties.',
    officialUrl: 'https://www.ecolex.org/',
    depositaryType: 'International Organization',
    ingestionProtocol: 'Direct Document URL',
    reproductionNotice: 'Text reproduced from the ECOLEX Environmental Law Information System (FAO / IUCN / UNEP).',
    bulkCapabilityDescription: 'Global coverage of climate, biodiversity, marine environment, and wildlife protection treaties.',
    verifiedInstrumentsCount: '2,400+ Multilateral & Bilateral Environmental Treaties',
    status: 'Ready for Scaled Ingestion'
  },
  {
    id: 'src-eurlex',
    name: 'EUR-Lex (Publications Office of the European Union)',
    acronym: 'EUR-Lex',
    scope: 'Primary EU Treaties (TEU, TFEU, Lisbon), EU Regulations (GDPR, AI Act, DSA), Directives, and CJEU case law.',
    officialUrl: 'https://eur-lex.europa.eu/',
    depositaryType: 'Regional Supranational Body',
    ingestionProtocol: 'REST API / Data Portal',
    reproductionNotice: 'Text reproduced from the Official Journal of the European Union (OJEU) via EUR-Lex Open Data. Only European Union legislation published in the Official Journal is deemed authentic.',
    bulkCapabilityDescription: 'Full REST API (Cellar Data Portal) and pre-structured MultiEURLEX datasets (~65,000 legal acts in 23 languages).',
    verifiedInstrumentsCount: '150,000+ EU Legal Acts & Regulations',
    status: 'API Pipeline Configured'
  },
  {
    id: 'src-icj',
    name: 'International Court of Justice (ICJ / CIJ)',
    acronym: 'ICJ',
    scope: 'Statute of the ICJ, Rules of Court, Judgments, Advisory Opinions, and contentious case orders from 1946 to present.',
    officialUrl: 'https://www.icj-cij.org/',
    depositaryType: 'International Judicial Organ',
    ingestionProtocol: 'Direct Document URL',
    reproductionNotice: 'Text reproduced from the official publications of the International Court of Justice (Peace Palace, The Hague).',
    bulkCapabilityDescription: 'Complete case law index with authentic bilingual English/French judgment corpora.',
    verifiedInstrumentsCount: '180+ Contentious Cases & Advisory Proceedings',
    status: 'Verified Active Source'
  }
];

// ----------------------------------------------------
// INGESTION MANIFEST SCHEMA (For future automated batch imports)
// ----------------------------------------------------

export interface TreatyIngestionManifest {
  manifestVersion: string;
  sourceRepositoryId: string;
  documentExternalId: string;
  targetCategory: string;
  officialTitle: string;
  alternativeTitles: string[];
  adoptionDateString: string;
  adoptionYear: number;
  entryIntoForceDateString?: string;
  jurisdiction: 'International' | 'Regional' | 'Supranational';
  status: 'In Force' | 'Active Treaty' | 'Customary Law' | 'Declaratory Instrument' | 'Model Law' | 'Statute / Constitutional Charter';
  officialLanguages: string[];
  depositary: string;
  officialPublicationRef: string;
  officialSourceUrl: string;
  articlesCount: number;
  extractedArticles: {
    articleNumber: string;
    articleTitle: string;
    verbatimText: string;
    isSummary: boolean;
    curationNotes?: string;
  }[];
}
