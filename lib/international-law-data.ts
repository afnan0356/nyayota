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
}

export const INTERNATIONAL_TREATIES_DATABASE: InternationalTreatyItem[] = [
  // 1. PUBLIC INTERNATIONAL LAW
  {
    id: 'int-vclt-1969',
    slug: 'vienna-convention-on-the-law-of-treaties-1969',
    title: 'Vienna Convention on the Law of Treaties (1969)',
    titleBn: 'ভিয়েনা চুক্তি আইন কনভেনশন (১৯৬৯)',
    shortTitle: 'VCLT 1969 ("Treaty on Treaties")',
    alternativeTitles: ['Vienna Convention', 'VCLT', 'Treaty on Treaties', '1155 UNTS 331'],
    jurisdiction: 'International',
    jurisdictionCode: 'INT',
    category: 'Public International Law' as any,
    status: 'Active Treaty',
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
    sourceReproductionNotice: 'Text reproduced from the official certified depository copies published in the United Nations Treaty Series (UNTS). Authentic texts in English, French, Spanish, Russian, Chinese, and Arabic.',
    overview: 'Known as the "Treaty on Treaties", the Vienna Convention on the Law of Treaties establishes the comprehensive legal framework governing the formation, interpretation, amendment, invalidity, and termination of written treaties between sovereign States.',
    overviewBn: 'আন্তর্জাতিক আইনের অন্যতম প্রধান ভিত্তি যা রাষ্ট্রসমূহের মধ্যকার চুক্তি সম্পাদন, ব্যাখ্যা, সংশোধন, অবসান ও অনুলঙ্ঘনীয় আন্তর্জাতিক নীতির (জাস কোজেন্স) নিয়মাবলি নির্ধারণ করে।',
    simpleSummary: 'The universal rulebook for how countries write, agree to, interpret, and cancel international treaties, establishing that promises between nations must be kept in good faith.',
    explainLike15: 'Imagine a global constitution for contracts between countries. If two nations sign an agreement, the Vienna Convention explains how to resolve disputes if they disagree on what a sentence meant, or if one country tries to back out.',
    fullOfficialTextExcerpt: 'The States Parties to the present Convention, Considering the fundamental role of treaties in the history of international relations, Recognizing the ever-increasing importance of treaties as a source of international law and as a means of developing peaceful cooperation among nations... Have agreed as follows...',
    keyHighlights: [
      'Pacta Sunt Servanda (Art. 26): Every treaty in force is binding upon the parties to it and must be performed by them in good faith.',
      'Internal Law Defense Bar (Art. 27): A party may not invoke the provisions of its internal law as justification for its failure to perform a treaty.',
      'Jus Cogens Norms (Art. 53): A treaty is void if, at the time of its conclusion, it conflicts with a peremptory norm of general international law.'
    ],
    sections: [
      {
        number: 'Article 26',
        title: 'Pacta sunt servanda (Treaties Binding in Good Faith)',
        titleBn: 'চুক্তি অবশ্যই সরল বিশ্বাসে পালনীয় (প্যাক্টা সুন্ট সারভান্ডা)',
        content: 'Every treaty in force is binding upon the parties to it and must be performed by them in good faith.',
        contentBn: 'বলবৎ থাকা যেকোনো আন্তর্জাতিক চুক্তি স্বাক্ষরকারী সকল রাষ্ট্রের জন্য বাধ্যতামূলক এবং তা অবশ্যই সরল বিশ্বাসে কার্যকর করতে হবে।',
        simpleExplanation: 'Once a sovereign country officially enters into a treaty, it is legally bound to obey its terms truthfully and cannot ignore them.',
        explainLike15: 'If you give your word and sign a deal, you cannot just pretend you did not agree to it when things get difficult.',
        punishmentOrRemedy: 'State responsibility under international law, dispute referral to ICJ under Article 66.',
        keyConcepts: ['Pacta sunt servanda', 'Good faith', 'Binding treaty obligations']
      },
      {
        number: 'Article 27',
        title: 'Internal law and observance of treaties',
        titleBn: 'অভ্যন্তরীণ আইন ও চুক্তি পালনের বাধ্যবাধকতা',
        content: 'A party may not invoke the provisions of its internal law as justification for its failure to perform a treaty. This rule is without prejudice to article 46.',
        contentBn: 'আন্তর্জাতিক চুক্তি ভঙ্গ করার অজুহাত হিসেবে কোনো রাষ্ট্র তার নিজস্ব অভ্যন্তরীণ বা জাতীয় আইনের দোহাই দিতে পারবে না।',
        simpleExplanation: 'A country cannot refuse to follow an international treaty by claiming its own local parliament passed a conflicting domestic rule.',
        explainLike15: 'You cannot tell the international community "we broke our global treaty because our city council made a rule saying we could." Global obligations take precedence.',
        punishmentOrRemedy: 'International breach declaration and damages under State Responsibility doctrines.',
        keyConcepts: ['Supremacy of treaty over domestic statute', 'State responsibility']
      },
      {
        number: 'Article 31',
        title: 'General rule of interpretation',
        titleBn: 'চুক্তির ব্যাখ্যার সাধারণ নিয়মাবলী',
        content: 'A treaty shall be interpreted in good faith in accordance with the ordinary meaning to be given to the terms of the treaty in their context and in the light of its object and purpose.',
        contentBn: 'আন্তর্জাতিক চুক্তি তার সাধারণ অর্থ, প্রেক্ষাপট এবং চুক্তির মূল উদ্দেশ্য ও লক্ষ্যের আলোকে সরল বিশ্বাসে ব্যাখ্যা করতে হবে।',
        simpleExplanation: 'Treaties are interpreted based on what the plain words say in context, while keeping the overall goal and purpose of the treaty in mind.',
        punishmentOrRemedy: 'Binding judicial interpretation before the International Court of Justice (ICJ).',
        keyConcepts: ['Ordinary meaning', 'Contextual interpretation', 'Teleological approach (Object and Purpose)']
      },
      {
        number: 'Article 53',
        title: 'Treaties conflicting with a peremptory norm of general international law (jus cogens)',
        titleBn: 'অনুলঙ্ঘনীয় আন্তর্জাতিক নীতির (জাস কোজেন্স) পরিপন্থী চুক্তি বাতিল',
        content: 'A treaty is void if, at the time of its conclusion, it conflicts with a peremptory norm of general international law. For the purposes of the present Convention, a peremptory norm of general international law is a norm accepted and recognized by the international community of States as a whole as a norm from which no derogation is permitted.',
        contentBn: 'যদি কোনো চুক্তি সম্পাদনের সময় তা অনুলঙ্ঘনীয় আন্তর্জাতিক আইনের (যেমন দাসপ্রথা, গণহত্যা বা নির্যাতনের নিষেধাজ্ঞা) পরিপন্থী হয়, তবে সেই চুক্তি সম্পূর্ণ বাতিল বলে গণ্য হবে।',
        simpleExplanation: 'Any treaty between countries is automatically null and void if it violates supreme universal rules of humanity (such as agreements to commit genocide, piracy, or torture).',
        explainLike15: 'No matter what two countries write down, they cannot legally agree to commit mass murder or torture. The supreme rules of humanity cancel out evil agreements.',
        punishmentOrRemedy: 'Treaty is void ab initio with zero legal effect worldwide.',
        keyConcepts: ['Jus Cogens', 'Peremptory norms', 'Absolute nullity']
      }
    ],
    timeline: [
      { year: '1969', title: 'Adoption in Vienna', description: 'Adopted on 22 May 1969 by the UN Conference on the Law of Treaties.', status: 'enacted' },
      { year: '1980', title: 'Entry into Force', description: 'Entered into force on 27 January 1980 after receiving 35 ratifications.', status: 'enacted' },
      { year: '2024', title: 'Universal Customary Recognition', description: 'ICJ recognizes key articles (26, 31, 53) as reflection of customary international law binding on all nations.', status: 'upheld' }
    ],
    relatedLawIds: ['int-un-charter-1945', 'int-icj-statute-1945', 'int-udhr-1948'],
    citations: {
      standard: 'Vienna Convention on the Law of Treaties, May 23, 1969, 1155 U.N.T.S. 331',
      academic: 'Vienna Convention on the Law of Treaties (1969), 1155 UNTS 331, 8 ILM 679.',
      bluebook: 'Vienna Convention on the Law of Treaties art. 26, May 23, 1969, 1155 U.N.T.S. 331.',
      oscola: 'Vienna Convention on the Law of Treaties (opened for signature 23 May 1969, entered into force 27 January 1980) 1155 UNTS 331',
      apa: 'Vienna Convention on the Law of Treaties, May 23, 1969, 1155 U.N.T.S. 331.',
      mla: '"Vienna Convention on the Law of Treaties." United Nations Treaty Series, vol. 1155, 1969, pp. 331-512.',
      chicago: 'Vienna Convention on the Law of Treaties. May 23, 1969. 1155 U.N.T.S. 331.'
    },
    keywords: ['vclt', 'vienna convention', 'treaty on treaties', 'pacta sunt servanda', 'jus cogens', 'treaty interpretation', 'public international law', 'united nations']
  },

  {
    id: 'int-un-charter-1945',
    slug: 'charter-of-the-united-nations-1945',
    title: 'Charter of the United Nations (1945)',
    titleBn: 'জাতিসংঘ সনদ (১৯৪৫)',
    shortTitle: 'UN Charter (1945)',
    alternativeTitles: ['Charter of the UN', 'San Francisco Charter', '1 UNTS XVI'],
    jurisdiction: 'International',
    jurisdictionCode: 'INT',
    category: 'Public International Law' as any,
    status: 'Active Treaty',
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
    overview: 'The supreme constitutive treaty of the international legal order establishing the United Nations, maintaining international peace and security, outlawing the unlawful threat or use of force (Article 2(4)), and establishing the supremacy of UN obligations over any other treaty (Article 103).',
    overviewBn: 'আন্তর্জাতিক ব্যবস্থার সর্বোচ্চ সাংবিধানিক দলিল যা বিশ্বশান্তি রক্ষা, সার্বভৌম সমতা, বলপ্রয়োগের নিষেধাজ্ঞা এবং জাতিসংঘ নিরাপত্তা পরিষদের ক্ষমতা প্রতিষ্ঠা করে।',
    simpleSummary: 'The foundational founding document of the United Nations that bans unprovoked wars and obligates countries to settle disagreements peacefully.',
    explainLike15: 'The world\'s ultimate peace treaty signed after World War II to prevent another global conflict. It tells nations: do not attack your neighbors, solve fights with words and international courts, and work together on human rights.',
    fullOfficialTextExcerpt: 'WE THE PEOPLES OF THE UNITED NATIONS DETERMINED to save succeeding generations from the scourge of war, which twice in our lifetime has brought untold sorrow to mankind, and to reaffirm faith in fundamental human rights... HAVE RESOLVED TO COMBINE OUR EFFORTS TO ACCOMPLISH THESE AIMS.',
    keyHighlights: [
      'Prohibition on the Threat or Use of Force (Art. 2(4)): All Members shall refrain in their international relations from the threat or use of force against territorial integrity.',
      'Right of Inherent Self-Defense (Art. 51): Preserves the inherent right of individual or collective self-defense if an armed attack occurs.',
      'Supremacy Clause (Art. 103): In the event of a conflict between the obligations of the Members of the United Nations under the Charter and their obligations under any other international agreement, Charter obligations prevail.'
    ],
    sections: [
      {
        number: 'Article 2(4)',
        title: 'Prohibition of the Threat or Use of Force',
        titleBn: 'আঞ্চলিক অখণ্ডতা বা স্বাধীনতার বিরুদ্ধে বলপ্রয়োগের নিষেধাজ্ঞা',
        content: 'All Members shall refrain in their international relations from the threat or use of force against the territorial integrity or political independence of any state, or in any other manner inconsistent with the Purposes of the United Nations.',
        contentBn: 'জাতিসংঘের সকল সদস্য রাষ্ট্র অন্য কোনো রাষ্ট্রের ভৌগোলিক অখণ্ডতা বা রাজনৈতিক স্বাধীনতার বিরুদ্ধে শক্তি প্রদর্শন বা বলপ্রয়োগ থেকে বিরত থাকবে।',
        simpleExplanation: 'No nation is allowed to invade, bomb, or threaten another sovereign country.',
        explainLike15: 'War and territorial conquest are outlawed. You cannot use military force to steal land or overthrow another country\'s government.',
        punishmentOrRemedy: 'UN Security Council Chapter VII enforcement, economic sanctions, and military intervention authorizations.',
        keyConcepts: ['Prohibition of force', 'Territorial integrity', 'Non-aggression']
      },
      {
        number: 'Article 51',
        title: 'Inherent Right of Individual or Collective Self-Defence',
        titleBn: 'ব্যক্তিগত বা যৌথ আত্মরক্ষার সহজাত অধিকার',
        content: 'Nothing in the present Charter shall impair the inherent right of individual or collective self-defence if an armed attack occurs against a Member of the United Nations, until the Security Council has taken measures necessary to maintain international peace and security.',
        contentBn: 'কোনো সদস্য রাষ্ট্র সশস্ত্র আক্রমণের শিকার হলে নিরাপত্তা পরিষদ ব্যবস্থা গ্রহণ না করা পর্যন্ত তার ব্যক্তিগত বা যৌথ আত্মরক্ষার অধিকার বলবৎ থাকবে।',
        simpleExplanation: 'If a country is militarily attacked, it has the legal right to fight back and defend itself, and friendly nations can help defend it.',
        explainLike15: 'While attacking someone is illegal, defending yourself when attacked is completely lawful under the UN Charter.',
        punishmentOrRemedy: 'Immediate mandatory notification of self-defense actions to the UN Security Council.',
        keyConcepts: ['Self-defense', 'Collective security', 'Armed attack threshold']
      },
      {
        number: 'Article 103',
        title: 'Supremacy of UN Charter Obligations',
        titleBn: 'অন্যান্য চুক্তির ওপর জাতিসংঘ সনদের প্রাধান্য',
        content: 'In the event of a conflict between the obligations of the Members of the United Nations under the present Charter and their obligations under any other international agreement, their obligations under the present Charter shall prevail.',
        contentBn: 'জাতিসংঘ সনদের বাধ্যবাধকতা এবং অন্য কোনো আন্তর্জাতিক চুক্তির মধ্যে বিরোধ দেখা দিলে জাতিসংঘ সনদের বাধ্যবাধকতাই সর্বোচ্চ প্রাধান্য পাবে।',
        simpleExplanation: 'The UN Charter acts as the highest treaty in the world. If another treaty conflicts with it, the UN Charter wins.',
        punishmentOrRemedy: 'Conflicting treaty provisions are overridden and unenforceable.',
        keyConcepts: ['Constitutional supremacy', 'Hierarchy of international norms']
      }
    ],
    timeline: [
      { year: '1945', title: 'Signing in San Francisco', description: 'Signed on 26 June 1945 at the conclusion of the United Nations Conference on International Organization.', status: 'enacted' },
      { year: '1945', title: 'Entry into Force', description: 'Came into force on 24 October 1945 (United Nations Day).', status: 'enacted' },
      { year: '1974', title: 'Bangladesh Membership', description: 'Bangladesh formally admitted as 136th Member State on 17 September 1974.', status: 'upheld' }
    ],
    relatedLawIds: ['int-icj-statute-1945', 'int-vclt-1969', 'int-udhr-1948'],
    citations: {
      standard: 'U.N. Charter, June 26, 1945, 1 U.N.T.S. XVI',
      academic: 'Charter of the United Nations (1945), 1 UNTS XVI, 59 Stat. 1031.',
      bluebook: 'U.N. Charter art. 2, para. 4.',
      oscola: 'Charter of the United Nations (adopted 26 June 1945, entered into force 24 October 1945) 1 UNTS XVI',
      apa: 'United Nations. (1945). Charter of the United Nations. 1 U.N.T.S. XVI.',
      mla: '"Charter of the United Nations." United Nations, 1945.',
      chicago: 'United Nations. Charter of the United Nations. June 26, 1945. 1 U.N.T.S. XVI.'
    },
    keywords: ['un charter', 'united nations', 'security council', 'article 51 self defense', 'article 2(4)', 'peace and security', 'public international law']
  },

  // 2. INTERNATIONAL CRIMINAL LAW
  {
    id: 'int-rome-statute-1998',
    slug: 'rome-statute-of-the-international-criminal-court-1998',
    title: 'Rome Statute of the International Criminal Court (1998)',
    titleBn: 'আন্তর্জাতিক ফৌজদারি আদালতের রোম সংবিধি (১৯৯৮)',
    shortTitle: 'Rome Statute (ICC 1998)',
    alternativeTitles: ['ICC Statute', 'Rome Statute', '2187 UNTS 3'],
    jurisdiction: 'International',
    jurisdictionCode: 'INT',
    category: 'International Criminal Law' as any,
    status: 'Active Treaty',
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
    overview: 'The landmark multilateral treaty establishing the permanent International Criminal Court (ICC) in The Hague, exercising jurisdiction over individuals for the most serious crimes of international concern: Genocide, Crimes Against Humanity, War Crimes, and the Crime of Aggression.',
    overviewBn: 'আন্তর্জাতিক ফৌজদারি আদালত (ICC) প্রতিষ্ঠার ঐতিহাসিক সনদ যা গণহত্যা, মানবতাবিরোধী অপরাধ, যুদ্ধাপরাধ ও আগ্রাসনের অপরাধের জন্য বিশ্বনেতা ও সামরিক কমান্ডারদের ব্যক্তিগত ফৌজদারি দায় নিশ্চিত করে।',
    simpleSummary: 'Creates a permanent world court to put dictators, warlords, and military commanders on trial when they commit mass murder, war crimes, or genocide.',
    explainLike15: 'Before this treaty, if a ruler committed terrible atrocities against their own people, there was no permanent world court to arrest them. The Rome Statute created a permanent court in The Hague so powerful leaders cannot hide behind sovereign immunity.',
    fullOfficialTextExcerpt: 'The States Parties to this Statute, Conscious that all peoples are united by common bonds, their cultures pieced together in a shared heritage... Mindful that during this century millions of children, women and men have been victims of unimaginable atrocities that deeply shock the conscience of humanity... Determined to put an end to impunity for the perpetrators of these crimes...',
    keyHighlights: [
      'Jurisdiction over Four Core Crimes (Art. 5): Genocide, Crimes against humanity, War crimes, and Crime of aggression.',
      'Principle of Complementarity (Art. 17): ICC acts only when national judicial systems are unwilling or genuinely unable to carry out investigations.',
      'Irrelevance of Official Capacity (Art. 27): Head of State or government status does not exempt any person from criminal responsibility.'
    ],
    sections: [
      {
        number: 'Article 5',
        title: 'Crimes within the jurisdiction of the Court',
        titleBn: 'আদালতের এখতিয়ারভুক্ত অপরাধসমূহ',
        content: 'The jurisdiction of the Court shall be limited to the most serious crimes of concern to the international community as a whole. The Court has jurisdiction in accordance with this Statute with respect to: (a) The crime of genocide; (b) Crimes against humanity; (c) War crimes; (d) The crime of aggression.',
        contentBn: 'আদালতের এখতিয়ার শুধুমাত্র আন্তর্জাতিক সম্প্রদায়ের জন্য মারাত্মক ৪টি অপরাধের মধ্যে সীমাবদ্ধ থাকবে: (ক) গণহত্যা; (খ) মানবতাবিরোধী অপরাধ; (গ) যুদ্ধাপরাধ; (ঘ) আগ্রাসনের অপরাধ।',
        simpleExplanation: 'The ICC focuses only on the four most horrific crimes against humanity.',
        explainLike15: 'The ICC does not handle ordinary burglaries or speeding tickets. It is reserved for the worst crimes against humanity.',
        punishmentOrRemedy: 'Imprisonment up to 30 years or life imprisonment, forfeiture of proceeds, and victim reparations.',
        keyConcepts: ['Genocide', 'Crimes against humanity', 'War crimes', 'Aggression']
      },
      {
        number: 'Article 27',
        title: 'Irrelevance of official capacity (No Head of State Immunity)',
        titleBn: 'রাষ্ট্রপ্রধান বা সরকারি পদের দায়মুক্তির অকার্যকারিতা',
        content: 'This Statute shall apply equally to all persons without any distinction based on official capacity. In particular, official capacity as a Head of State or Government, a member of a Government or parliament, an elected representative or a government official shall in no case exempt a person from criminal responsibility.',
        contentBn: 'রাষ্ট্রপ্রধান, সরকারপ্রধান, মন্ত্রী বা সংসদ সদস্য হওয়া সত্ত্বেও কেউ আন্তর্জাতিক অপরাধের ব্যক্তিগত দায় থেকে কোনো দায়মুক্তি (ইমিউনিটি) পাবে না।',
        simpleExplanation: 'Being a President, Prime Minister, or General does not protect you from arrest and trial for war crimes.',
        explainLike15: 'No one is above the law. Even a reigning president or supreme commander can be handcuffed and tried in The Hague.',
        punishmentOrRemedy: 'International arrest warrant issued via INTERPOL Red Notices.',
        keyConcepts: ['Universal accountability', 'Abolition of official immunity', 'Individual criminal responsibility']
      },
      {
        number: 'Article 28',
        title: 'Responsibility of commanders and other superiors',
        titleBn: 'সামরিক কমান্ডার ও ঊর্ধ্বতন কর্মকর্তাদের দায়বদ্ধতা',
        content: 'A military commander or person effectively acting as a military commander shall be criminally responsible for crimes committed by forces under his or her effective command and control, as a result of his or her failure to exercise control properly.',
        contentBn: 'অধীনস্থ সৈন্যরা অপরাধ সংঘটন করলে এবং কমান্ডার তা রোধে যথাযথ পদক্ষেপ না নিলে কমান্ডার ব্যক্তিগতভাবে ফৌজদারিভাবে দায়ী হবেন।',
        simpleExplanation: 'Generals and political superiors who know their soldiers are massacring civilians and fail to stop or punish them go to prison as well.',
        explainLike15: 'If a captain knows their squad is committing crimes and looks the other way, the captain is guilty along with the soldiers.',
        punishmentOrRemedy: 'Direct criminal conviction for superior responsibility.',
        keyConcepts: ['Command responsibility', 'Effective control', 'Failure to prevent/repress']
      }
    ],
    timeline: [
      { year: '1998', title: 'Adoption in Rome', description: 'Adopted at the diplomatic conference in Rome with 120 nations voting in favor.', status: 'enacted' },
      { year: '2002', title: 'Entry into Force', description: 'Entered into force on 1 July 2002 upon reaching 60 ratifications.', status: 'enacted' },
      { year: '2010', title: 'Bangladesh Ratification', description: 'Bangladesh deposited its instrument of ratification, becoming a State Party.', status: 'upheld' }
    ],
    relatedLawIds: ['int-geneva-1949', 'int-udhr-1948', 'int-un-charter-1945'],
    citations: {
      standard: 'Rome Statute of the International Criminal Court, July 17, 1998, 2187 U.N.T.S. 3',
      academic: 'Rome Statute of the International Criminal Court (1998), 2187 UNTS 3, UN Doc. A/CONF.183/9.',
      bluebook: 'Rome Statute of the International Criminal Court art. 5, July 17, 1998, 2187 U.N.T.S. 3.',
      oscola: 'Rome Statute of the International Criminal Court (adopted 17 July 1998, entered into force 1 July 2002) 2187 UNTS 3',
      apa: 'Rome Statute of the International Criminal Court, July 17, 1998, 2187 U.N.T.S. 3.',
      mla: '"Rome Statute of the International Criminal Court." UNTS, vol. 2187, 1998, pp. 3-385.',
      chicago: 'Rome Statute of the International Criminal Court. July 17, 1998. 2187 U.N.T.S. 3.'
    },
    keywords: ['rome statute', 'icc', 'international criminal court', 'war crimes', 'genocide', 'the hague', 'crimes against humanity', 'command responsibility']
  },

  // 3. INTELLECTUAL PROPERTY
  {
    id: 'int-wto-trips-1994',
    slug: 'agreement-on-trade-related-aspects-of-intellectual-property-rights-1994',
    title: 'Agreement on Trade-Related Aspects of Intellectual Property Rights (TRIPS)',
    titleBn: 'ট্রিপস চুক্তি (বুদ্ধিবৃত্তিক সম্পদের বাণিজ্য সংক্রান্ত অধিকার)',
    shortTitle: 'TRIPS Agreement (WTO 1994)',
    alternativeTitles: ['WTO TRIPS', 'TRIPS 1994', 'Marrakesh Annex 1C', '1869 UNTS 299'],
    jurisdiction: 'International',
    jurisdictionCode: 'INT',
    category: 'Intellectual Property' as any,
    status: 'Active Treaty',
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
    officialSource: 'World Trade Organization Legal Texts (wto.org/english/docs_e/legal_e/trips_e.htm)',
    sourceOrganization: 'World Trade Organization (WTO) / WIPO',
    sourceVerificationUrl: 'https://www.wto.org/english/docs_e/legal_e/27-trips_01_e.htm',
    lastUpdatedDate: 'January 2025',
    verificationStatus: 'Verified Multilateral Depositary',
    sourceReproductionNotice: 'Official certified text of Annex 1C of the Marrakesh Agreement Establishing the World Trade Organization, signed at Marrakesh on 15 April 1994.',
    overview: 'The most comprehensive multilateral agreement on intellectual property, setting binding minimum standards for copyright, trademarks, geographical indications, industrial designs, patents (including pharmaceutical patents for 20 years), and trade secret protection across all WTO member nations.',
    overviewBn: 'বিশ্ব বাণিজ্য সংস্থার (WTO) আওতায় বুদ্ধিবৃত্তিক সম্পদ সুরক্ষার সার্বজনীন চুক্তি যা কপিরাইট, পেটেন্ট (ঔষধসহ ২০ বছরের সুরক্ষা), ট্রেডমার্ক ও বাণিজ্য গোপনীয়তার বাধ্যতামূলক মানদণ্ড নির্ধারণ করে।',
    simpleSummary: 'A global trade agreement requiring all countries to enforce copyrights, trademarks, and 20-year patents, while granting flexibilities for public health and generic medicines.',
    explainLike15: 'If a company invents a new smartphone chip, writes a computer program, or designs a medicine, TRIPS ensures their patents and copyrights are respected worldwide so people cannot copy and sell them without a license.',
    fullOfficialTextExcerpt: 'Members, Desiring to reduce distortions and impediments to international trade, and taking into account the need to promote effective and adequate protection of intellectual property rights, and to ensure that measures and procedures to enforce intellectual property rights do not themselves become barriers to legitimate trade... Hereby agree as follows...',
    keyHighlights: [
      'National Treatment and MFN (Arts. 3 & 4): Foreign rightsholders receive equal IP protection to domestic inventors.',
      'Patent Duration (Art. 33): The term of patent protection available shall not end before the expiration of a period of 20 years from the filing date.',
      'Doha Declaration on Public Health (Art. 31): Permits compulsory licensing to produce generic medicines during public health emergencies.'
    ],
    sections: [
      {
        number: 'Article 27',
        title: 'Patentable Subject Matter',
        titleBn: 'পেটেন্টযোগ্য বিষয়ের মানদণ্ড',
        content: 'Patents shall be available for any inventions, whether products or processes, in all fields of technology, provided that they are new, involve an inventive step and are capable of industrial application. Patents shall be available and patent rights enjoyable without discrimination as to the place of invention.',
        contentBn: 'যেকোনো নতুন প্রযুক্তিগত উদ্ভাবন যা শিল্প উৎপাদনে ব্যবহারযোগ্য তা পেটেন্ট সুবিধার যোগ্য বলে বিবেচিত হবে।',
        simpleExplanation: 'Inventions in any field of technology get 20-year patent protection if they are genuinely new, not obvious, and useful.',
        explainLike15: 'If you build an innovative new battery that nobody has made before, you can get an exclusive patent so others cannot copy it for 20 years.',
        punishmentOrRemedy: 'Civil injunctions, damages, and border customs seizures against patent infringing goods.',
        keyConcepts: ['Patentability', 'Novelty', 'Inventive step', 'Industrial applicability']
      },
      {
        number: 'Article 31',
        title: 'Other Use Without Authorization of the Right Holder (Compulsory Licensing)',
        titleBn: 'বাধ্যতামূলক লাইসেন্সিং ও জনস্বার্থে ব্যবহার',
        content: 'Where the law of a Member allows for other use of the subject matter of a patent without the authorization of the right holder, including use by the government or third parties authorized by the government, the provisions of this Article shall be respected. In the case of a national emergency or other circumstances of extreme urgency, the requirement to seek prior authorization may be waived.',
        contentBn: 'জাতীয় জরুরি অবস্থা বা জনস্বাস্থ্যের সংকটে সরকার পেটেন্ট মালিকের পূর্ব অনুমতি ছাড়াই ঔষধ উৎপাদনের বাধ্যতামূলক লাইসেন্স জারি করতে পারে।',
        simpleExplanation: 'During health crises (like epidemics), governments can legally allow local companies to make affordable generic medicines without the patent owner\'s approval.',
        explainLike15: 'If an expensive lifesaving medicine is needed to stop an epidemic, the government can order local factories to make generic versions immediately.',
        punishmentOrRemedy: 'Payment of adequate remuneration to the patent holder under the circumstances.',
        keyConcepts: ['Compulsory licensing', 'Public health flexibilities', 'Doha declaration', 'Access to medicines']
      }
    ],
    timeline: [
      { year: '1994', title: 'Conclusion at Marrakesh', description: 'Signed as part of the WTO single undertaking on 15 April 1994.', status: 'enacted' },
      { year: '1995', title: 'Entry into Force', description: 'Entered into force on 1 January 1995 creating binding IP dispute settlement.', status: 'enacted' },
      { year: '2001', title: 'Doha Declaration on TRIPS and Public Health', description: 'Affirmed right of developing nations to protect public health and promote access to medicines.', status: 'upheld' }
    ],
    relatedLawIds: ['int-cisg-1980', 'bd-contract-act-1872'],
    citations: {
      standard: 'Agreement on Trade-Related Aspects of Intellectual Property Rights, Apr. 15, 1994, 1869 U.N.T.S. 299',
      academic: 'TRIPS Agreement (1994), 1869 UNTS 299, 33 ILM 1197.',
      bluebook: 'Agreement on Trade-Related Aspects of Intellectual Property Rights art. 27, Apr. 15, 1994, 1869 U.N.T.S. 299.',
      oscola: 'Agreement on Trade-Related Aspects of Intellectual Property Rights (15 April 1994, entered into force 1 January 1995) 1869 UNTS 299',
      apa: 'World Trade Organization. (1994). Agreement on Trade-Related Aspects of Intellectual Property Rights. 1869 U.N.T.S. 299.',
      mla: '"TRIPS Agreement." World Trade Organization Legal Instruments, 1994.',
      chicago: 'World Trade Organization. Agreement on Trade-Related Aspects of Intellectual Property Rights. Apr. 15, 1994. 1869 U.N.T.S. 299.'
    },
    keywords: ['trips', 'wto', 'intellectual property', 'patents', 'copyright', 'compulsory licensing', 'pharmaceutical patents', 'generic medicine']
  },

  // 4. LABOUR LAW
  {
    id: 'int-ilo-convention-87-1948',
    slug: 'ilo-freedom-of-association-convention-no-87-1948',
    title: 'ILO Freedom of Association and Protection of the Right to Organise Convention (No. 87)',
    titleBn: 'আইএলও কনভেনশন নং ৮৭ (সংগঠন করার স্বাধীনতা ও অধিকার সুরক্ষা)',
    shortTitle: 'ILO Convention No. 87 (1948)',
    alternativeTitles: ['ILO C087', 'Freedom of Association Convention', '68 UNTS 17'],
    jurisdiction: 'International',
    jurisdictionCode: 'INT',
    category: 'Labour Law' as any,
    status: 'Active Treaty',
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
    sourceReproductionNotice: 'Text reproduced from ILO NORMLEX. Convention No. 87 is one of the ten fundamental conventions of the International Labour Organization.',
    overview: 'One of the core fundamental labour standards of the International Labour Organization (ILO), guaranteeing workers and employers the right to establish and join organizations of their own choosing without prior authorization, and protecting trade unions from state dissolution.',
    overviewBn: 'শ্রমিক ও মালিকদের স্বাধীনভাবে ট্রেড ইউনিয়ন গঠন ও পরিচালনা করার অধিকার প্রদানকারী আন্তর্জাতিক শ্রম সংস্থার (ILO) অন্যতম মৌলিক কনভেনশন।',
    simpleSummary: 'Guarantees that workers have the legal right to form and join trade unions without government interference or harassment.',
    explainLike15: 'Workers in factories and offices have the right to team up into unions so they can negotiate fair wages, safety rules, and working hours with their bosses.',
    fullOfficialTextExcerpt: 'The General Conference of the International Labour Organisation, Having been convened at San Francisco by the Governing Body of the International Labour Office, and having met in its Thirty-first Session on 17 June 1948... Adopts this ninth day of July of the year one thousand nine hundred and forty-eight the following Convention...',
    keyHighlights: [
      'Right to Form Unions (Art. 2): Workers and employers, without distinction whatsoever, shall have the right to establish and join organizations of their own choosing.',
      'Protection from State Interference (Art. 3): Public authorities shall refrain from any interference which would restrict this right or impede lawful exercise.',
      'Prohibition of Administrative Dissolution (Art. 4): Workers\' and employers\' organizations shall not be liable to be dissolved or suspended by administrative authority.'
    ],
    sections: [
      {
        number: 'Article 2',
        title: 'Right to establish and join organizations',
        titleBn: 'সংগঠন প্রতিষ্ঠা ও অন্তর্ভুক্তির অধিকার',
        content: 'Workers and employers, without distinction whatsoever, shall have the right to establish and, subject only to the rules of the organisation concerned, to join organisations of their own choosing without previous authorisation.',
        contentBn: 'পূর্বানুমতি ব্যতিরেকে শ্রমিক ও মালিকদের নিজ পছন্দের সংগঠন বা ইউনিয়ন প্রতিষ্ঠা এবং সদস্য হওয়ার অবাধ অধিকার থাকবে।',
        simpleExplanation: 'Employees can form unions freely without needing police or government permission.',
        explainLike15: 'You do not need to ask the government for special permission before forming an association to represent your fellow workers.',
        punishmentOrRemedy: 'Review by ILO Committee on Freedom of Association (CFA).',
        keyConcepts: ['Trade union rights', 'Freedom of association', 'No prior authorization']
      },
      {
        number: 'Article 4',
        title: 'Protection against administrative dissolution',
        titleBn: 'প্রশাসনিক আদেশে ইউনিয়ন বাতিলের নিষেধাজ্ঞা',
        content: 'Workers\' and employers\' organisations shall not be liable to be dissolved or suspended by administrative authority.',
        contentBn: 'শ্রমিক বা মালিকদের কোনো বৈধ সংগঠনকে কোনো প্রশাসনিক কর্মকর্তা বা নির্বাহী আদেশে বাতিল বা স্থগিত করা যাবে না।',
        simpleExplanation: 'A government bureaucrat or minister cannot shut down a union by executive decree without fair court judicial proceedings.',
        explainLike15: 'The government cannot just say "we do not like this union, shut it down today." Only an independent court after a fair trial can rule on legal violations.',
        punishmentOrRemedy: 'ILO supervisory complaints and international labour sanctions.',
        keyConcepts: ['Judicial safeguard', 'Anti-union harassment protection']
      }
    ],
    timeline: [
      { year: '1948', title: 'Adoption in San Francisco', description: 'Adopted at the 31st session of the International Labour Conference.', status: 'enacted' },
      { year: '1950', title: 'Entry into Force', description: 'Came into force on 4 July 1950.', status: 'enacted' },
      { year: '1972', title: 'Bangladesh Ratification', description: 'Bangladesh formally ratified Convention No. 87 on 22 June 1972.', status: 'upheld' }
    ],
    relatedLawIds: ['bd-labor-act-2006', 'int-iccpr-1966', 'int-udhr-1948'],
    citations: {
      standard: 'ILO Convention No. 87 Concerning Freedom of Association and Protection of the Right to Organise, July 9, 1948, 68 U.N.T.S. 17',
      academic: 'Freedom of Association and Protection of the Right to Organise Convention, 1948 (No. 87), 68 UNTS 17.',
      bluebook: 'ILO Convention No. 87 art. 2, July 9, 1948, 68 U.N.T.S. 17.',
      oscola: 'Freedom of Association and Protection of the Right to Organise Convention (ILO Convention No 87) (adopted 9 July 1948, entered into force 4 July 1950) 68 UNTS 17',
      apa: 'International Labour Organization. (1948). Freedom of Association and Protection of the Right to Organise Convention, 1948 (No. 87). 68 U.N.T.S. 17.',
      mla: '"ILO Convention No. 87." International Labour Standards, 1948.',
      chicago: 'International Labour Organization. Freedom of Association Convention (No. 87). July 9, 1948. 68 U.N.T.S. 17.'
    },
    keywords: ['ilo convention 87', 'labour law', 'trade union', 'freedom of association', 'workers rights', 'collective bargaining', 'ilo normlex']
  },

  // 5. INTERNATIONAL COURTS & TRIBUNALS
  {
    id: 'int-icj-statute-1945',
    slug: 'statute-of-the-international-court-of-justice-1945',
    title: 'Statute of the International Court of Justice (ICJ)',
    titleBn: 'আন্তর্জাতিক বিচার আদালতের সংবিধি (১৯৪৫)',
    shortTitle: 'ICJ Statute (1945)',
    alternativeTitles: ['Statute of the ICJ', 'World Court Statute', '33 UNTS 993'],
    jurisdiction: 'International',
    jurisdictionCode: 'INT',
    category: 'International Courts & Tribunals' as any,
    status: 'Active Treaty',
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
    sourceReproductionNotice: 'Official certified text of the constituent Statute of the International Court of Justice (Peace Palace, The Hague), annexed to the Charter of the United Nations.',
    overview: 'The governing constitutional statute of the principal judicial organ of the United Nations (the "World Court" in The Hague), defining the sources of international law under Article 38(1), contentious jurisdiction between sovereign States, and advisory opinion procedures.',
    overviewBn: 'জাতিসংঘের প্রধান বিচারিক অঙ্গ আন্তর্জাতিক বিচার আদালতের (ICJ) সংবিধি যা আন্তর্জাতিক আইনের উৎস (অনুচ্ছেদ ৩৮(১)), রাষ্ট্রসমূহের বিরোধ নিষ্পত্তি ও পরামর্শমূলক মতামত প্রদানের বিধান নির্ধারণ করে।',
    simpleSummary: 'The legal rulebook for the World Court in The Hague, setting out how international judges decide disputes between countries and what counts as international law.',
    explainLike15: 'The rulebook for the highest court on the planet. When two nations have a dispute over maritime boundaries or international treaties, this statute explains how the 15 international judges will decide the case.',
    fullOfficialTextExcerpt: 'Article 1: The International Court of Justice established by the Charter of the United Nations as the principal judicial organ of the United Nations shall be constituted and shall function in accordance with the provisions of the present Statute...',
    keyHighlights: [
      'Sources of International Law (Art. 38(1)): (a) International conventions; (b) International custom; (c) General principles of law; (d) Judicial decisions and teachings of highly qualified publicists.',
      'State Access Only (Art. 34(1)): Only states may be parties in cases before the Court.',
      'Compulsory Jurisdiction (Art. 36(2)): Optional clause declarations recognizing compulsory jurisdiction of the Court.'
    ],
    sections: [
      {
        number: 'Article 38(1)',
        title: 'Sources of International Law',
        titleBn: 'আন্তর্জাতিক আইনের প্রামাণ্য উৎসসমূহ',
        content: 'The Court, whose function is to decide in accordance with international law such disputes as are submitted to it, shall apply: (a) international conventions, whether general or particular, establishing rules expressly recognized by the contesting states; (b) international custom, as evidence of a general practice accepted as law; (c) the general principles of law recognized by civilized nations; (d) subject to the provisions of Article 59, judicial decisions and the teachings of the most highly qualified publicists of the various nations, as subsidiary means for the determination of rules of law.',
        contentBn: 'আন্তর্জাতিক বিরোধ নিষ্পত্তিতে আদালত ৪টি উৎস প্রয়োগ করবে: (ক) আন্তর্জাতিক চুক্তি ও কনভেনশন; (খ) আন্তর্জাতিক প্রথাগত আইন; (গ) সার্বজনীন সাধারণ আইনি মূলনীতি; (ঘ) আদালতসমূহের পূর্ববর্তী রায় ও প্রখ্যাত আইনবিদদের রচনা।',
        simpleExplanation: 'The supreme definition of where international law comes from: treaties, customary practice, universal legal principles, and court judgments.',
        explainLike15: 'The master checklist of what international judges consult when making a ruling: signed treaties first, long-standing world customs second, basic rules of fairness third, and famous legal books/past cases fourth.',
        punishmentOrRemedy: 'Final and binding judicial judgment with no appeal under Article 60.',
        keyConcepts: ['Sources of law', 'Customary international law', 'Opinio juris', 'Treaties', 'General principles']
      },
      {
        number: 'Article 41',
        title: 'Provisional Measures of Protection',
        titleBn: 'অস্থায়ী বা অন্তর্বর্তীকালীন সুরক্ষামূলক আদেশ',
        content: 'The Court shall have the power to indicate, if it considers that circumstances so require, any provisional measures which ought to be taken to preserve the respective rights of either party.',
        contentBn: 'মামলা বিচারাধীন থাকা অবস্থায় কোনো পক্ষের অধিকার যেন অপূরণীয়ভাবে ক্ষতিগ্রস্ত না হয়, সেজন্য আদালত বাধ্যতামূলক অন্তর্বর্তীকালীন স্থগিতাদেশ দিতে পারে।',
        simpleExplanation: 'The World Court can order an emergency injunction forcing a country to stop an attack or human rights violation while the full trial is ongoing.',
        explainLike15: 'An emergency court freeze order. If a war or genocide is alleged, the judges can order an immediate ceasefire while they study the full evidence.',
        punishmentOrRemedy: 'Binding provisional order reported to the UN Security Council.',
        keyConcepts: ['Provisional measures', 'Injunction', 'Irreparable harm prevention']
      }
    ],
    timeline: [
      { year: '1945', title: 'Adoption with UN Charter', description: 'Annexed to the Charter of the United Nations at San Francisco on 26 June 1945.', status: 'enacted' },
      { year: '1946', title: 'Inauguration at The Hague', description: 'Inaugurated at the Peace Palace in The Hague replacing the PCIJ.', status: 'enacted' },
      { year: '2020', title: 'The Gambia v. Myanmar Provisional Measures', description: 'Historic binding order issued under Article 41 for protection of Rohingya populations.', status: 'upheld' }
    ],
    relatedLawIds: ['int-un-charter-1945', 'int-vclt-1969', 'int-rome-statute-1998'],
    citations: {
      standard: 'Statute of the International Court of Justice, June 26, 1945, 33 U.N.T.S. 993',
      academic: 'Statute of the International Court of Justice (1945), 33 UNTS 993, 59 Stat. 1055.',
      bluebook: 'Statute of the International Court of Justice art. 38, para. 1, June 26, 1945, 33 U.N.T.S. 993.',
      oscola: 'Statute of the International Court of Justice (26 June 1945, entered into force 24 October 1945) 33 UNTS 993',
      apa: 'International Court of Justice. (1945). Statute of the International Court of Justice. 33 U.N.T.S. 993.',
      mla: '"Statute of the International Court of Justice." ICJ, 1945.',
      chicago: 'International Court of Justice. Statute of the International Court of Justice. June 26, 1945. 33 U.N.T.S. 993.'
    },
    keywords: ['icj statute', 'article 38 sources of law', 'international court of justice', 'world court', 'peace palace', 'provisional measures', 'the hague']
  },

  // 6. REGIONAL LAW SYSTEMS
  {
    id: 'int-echr-1950',
    slug: 'european-convention-on-human-rights-1950',
    title: 'European Convention on Human Rights (1950)',
    titleBn: 'ইউরোপীয় মানবাধিকার কনভেনশন (১৯৫০)',
    shortTitle: 'ECHR (Rome 1950)',
    alternativeTitles: ['Convention for the Protection of Human Rights and Fundamental Freedoms', 'ECHR', 'ETS No. 005', '213 UNTS 221'],
    jurisdiction: 'Regional' as any,
    jurisdictionCode: 'INT',
    category: 'Regional Law Systems' as any,
    status: 'Active Treaty',
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
    officialSource: 'Council of Europe / European Court of Human Rights (hudoc.echr.coe.int)',
    sourceOrganization: 'Council of Europe / ECtHR',
    sourceVerificationUrl: 'https://www.echr.coe.int/documents/d/echr/convention_ENG',
    lastUpdatedDate: 'January 2025',
    verificationStatus: 'Verified Multilateral Depositary',
    sourceReproductionNotice: 'Text reproduced from the Council of Europe Treaty Series (ETS No. 005) and European Court of Human Rights (HUDOC database).',
    overview: 'The cornerstone regional human rights convention of Europe drafted by the Council of Europe in 1950, establishing the European Court of Human Rights (ECtHR) in Strasbourg with binding judicial oversight and direct individual petition rights for over 700 million individuals.',
    overviewBn: 'ইউরোপের প্রধান আঞ্চলিক মানবাধিকার চুক্তি যা স্ট্র্যাসবার্গে ইউরোপীয় মানবাধিকার আদালত (ECtHR) প্রতিষ্ঠা করে এবং সরাসরি নাগরিকদের আবেদন করার আইনি অধিকার প্রদান করে।',
    simpleSummary: 'A historic European treaty allowing ordinary citizens to sue their own governments in an independent international court if their human rights are violated.',
    explainLike15: 'The most effective regional human rights court in history. If a person in any of the 46 member countries has their rights violated and local courts fail them, they can appeal directly to the judges in Strasbourg.',
    fullOfficialTextExcerpt: 'The governments signatory hereto, being members of the Council of Europe, Considering the Universal Declaration of Human Rights proclaimed by the General Assembly of the United Nations on 10th December 1948... Have agreed as follows...',
    keyHighlights: [
      'Direct Individual Application (Art. 34): The Court may receive applications from any person, non-governmental organisation or group of individuals claiming to be the victim of a violation.',
      'Prohibition of Torture (Art. 3): Absolute non-derogable right prohibiting torture or inhuman treatment.',
      'Right to Fair Trial (Art. 6): Rigorous procedural guarantees in civil and criminal proceedings.'
    ],
    sections: [
      {
        number: 'Article 3',
        title: 'Prohibition of torture',
        titleBn: 'নির্যাতনের সার্বিক নিষেধাজ্ঞা',
        content: 'No one shall be subjected to torture or to inhuman or degrading treatment or punishment.',
        contentBn: 'কাউকে নির্যাতন কিংবা অমানবিক বা অবমাননাকর আচরণ বা শাস্তি দেওয়া যাবে না।',
        simpleExplanation: 'Zero tolerance absolute ban on torture, medical cruelty, or cruel prison conditions.',
        explainLike15: 'No country in the system can ever use torture or police brutality, even during war or emergencies.',
        punishmentOrRemedy: 'Binding Strasbourg court judgment ordering state damages (just satisfaction).',
        keyConcepts: ['Absolute human right', 'Non-derogable', 'Anti-torture standard']
      },
      {
        number: 'Article 8',
        title: 'Right to respect for private and family life',
        titleBn: 'ব্যক্তিগত ও পারিবারিক জীবনের গোপনীয়তার অধিকার',
        content: '1. Everyone has the right to respect for his private and family life, his home and his correspondence. 2. There shall be no interference by a public authority with the exercise of this right except such as is in accordance with the law and is necessary in a democratic society in the interests of national security, public safety or the economic well-being of the country.',
        contentBn: 'প্রত্যেকেরই ব্যক্তিগত ও পারিবারিক জীবন, বাসস্থান এবং চিঠিপত্র বা যোগাযোগের গোপনীয়তার অধিকার রয়েছে।',
        simpleExplanation: 'Protects personal privacy, data privacy, family life, and home against unauthorized state surveillance and wiretapping.',
        explainLike15: 'The police cannot tap your phone, search your emails, or raid your house unless they have a strict, legally justified court warrant.',
        punishmentOrRemedy: 'ECtHR violation decree and financial compensation under Article 41.',
        keyConcepts: ['Privacy rights', 'Proportionality test', 'Necessary in democratic society']
      }
    ],
    timeline: [
      { year: '1950', title: 'Adoption in Rome', description: 'Signed on 4 November 1950 by founding members of the Council of Europe.', status: 'enacted' },
      { year: '1953', title: 'Entry into Force', description: 'Entered into force on 3 September 1953.', status: 'enacted' },
      { year: '1998', title: 'Protocol 11 Full-time Court', description: 'Created permanent, full-time European Court of Human Rights in Strasbourg with direct individual petitions.', status: 'amended' }
    ],
    relatedLawIds: ['int-udhr-1948', 'int-iccpr-1966'],
    citations: {
      standard: 'Convention for the Protection of Human Rights and Fundamental Freedoms, Nov. 4, 1950, 213 U.N.T.S. 221',
      academic: 'European Convention on Human Rights (1950), 213 UNTS 221, ETS No. 005.',
      bluebook: 'European Convention on Human Rights art. 3, Nov. 4, 1950, 213 U.N.T.S. 221.',
      oscola: 'Convention for the Protection of Human Rights and Fundamental Freedoms (European Convention on Human Rights, as amended) (ECHR) (opened for signature 4 November 1950, entered into force 3 September 1953) 213 UNTS 221',
      apa: 'Council of Europe. (1950). European Convention on Human Rights. 213 U.N.T.S. 221.',
      mla: '"European Convention on Human Rights." Council of Europe Treaty Series, no. 005, 1950.',
      chicago: 'Council of Europe. European Convention on Human Rights. Nov. 4, 1950. 213 U.N.T.S. 221.'
    },
    keywords: ['echr', 'european court of human rights', 'strasbourg', 'council of europe', 'article 8 privacy', 'article 3 torture', 'regional human rights']
  },

  // 7. ENVIRONMENT & CLIMATE
  {
    id: 'int-paris-agreement-2015',
    slug: 'the-paris-agreement-on-climate-change-2015',
    title: 'The Paris Agreement on Climate Change (2015)',
    titleBn: 'প্যারিস জলবায়ু চুক্তি (২০১৫)',
    shortTitle: 'Paris Agreement (COP21 / 2015)',
    alternativeTitles: ['Paris Accord', 'COP21 Agreement', 'UNFCCC Paris Agreement', '3156 UNTS 1'],
    jurisdiction: 'International',
    jurisdictionCode: 'INT',
    category: 'Environment & Climate' as any,
    status: 'Active Treaty',
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
    officialSource: 'UNFCCC / UN Treaty Collection (unfccc.int/process-and-meetings/the-paris-agreement)',
    sourceOrganization: 'UNFCCC / ECOLEX / UNTS',
    sourceVerificationUrl: 'https://unfccc.int/sites/default/files/english_paris_agreement.pdf',
    lastUpdatedDate: 'January 2025',
    verificationStatus: 'Verified Multilateral Depositary',
    sourceReproductionNotice: 'Text reproduced from the official certified depository copies published in the United Nations Treaty Series (UNTS). Depositary: UN Secretary-General.',
    overview: 'The landmark legally binding international treaty on climate change adopted by 196 Parties at COP21 in Paris, aiming to hold the increase in global average temperature to well below 2°C above pre-industrial levels and pursuing efforts to limit it to 1.5°C through Nationally Determined Contributions (NDCs).',
    overviewBn: 'জলবায়ু পরিবর্তন মোকাবিলার ঐতিহাসিক বৈশ্বিক চুক্তি যা বৈশ্বিক তাপমাত্রা বৃদ্ধি প্রাক-শিল্প স্তরের তুলনায় ১.৫ ডিগ্রি সেলসিয়াসে সীমাবদ্ধ রাখা, জাতীয় নির্ধারিত অবদান (NDC) এবং জলবায়ু তহবিল নিশ্চিত করার নির্দেশনা দেয়।',
    simpleSummary: 'A global treaty signed by almost every country on Earth to cut greenhouse gas emissions and keep global warming under 1.5°C to prevent catastrophic climate disaster.',
    explainLike15: 'The world\'s emergency climate action plan. Every country agrees to make public pledges to cut fossil fuel pollution, report their progress every 5 years, and send money to vulnerable developing countries (like Bangladesh) to build seawalls and solar grids.',
    fullOfficialTextExcerpt: 'The Parties to this Agreement, Being Parties to the United Nations Framework Convention on Climate Change, hereinafter referred to as "the Convention", In pursuit of the objective of the Convention, and being guided by its principles, including the principle of equity and common but differentiated responsibilities... Have agreed as follows...',
    keyHighlights: [
      'Temperature Goal (Art. 2(1)(a)): Holding global average temperature increase to well below 2°C and pursuing efforts to limit the temperature increase to 1.5°C.',
      'Nationally Determined Contributions (Art. 4(2)): Each Party shall prepare, communicate and maintain successive nationally determined contributions (NDCs) that it intends to achieve.',
      'Loss and Damage (Art. 8): Recognizes the importance of averting, minimizing and addressing loss and damage associated with the adverse effects of climate change.'
    ],
    sections: [
      {
        number: 'Article 2',
        title: 'Long-term temperature goals and climate resilience',
        titleBn: 'তাপমাত্রা সীমাবদ্ধকরণ ও জলবায়ু সহনশীলতার লক্ষ্যমাত্রা',
        content: 'This Agreement aims to strengthen the global response to the threat of climate change by: (a) Holding the increase in the global average temperature to well below 2°C above pre-industrial levels and pursuing efforts to limit the temperature increase to 1.5°C; (b) Increasing the ability to adapt to adverse impacts of climate change and foster climate resilience; (c) Making finance flows consistent with a pathway towards low greenhouse gas emissions.',
        contentBn: 'বৈশ্বিক গড় তাপমাত্রা বৃদ্ধি ২ ডিগ্রি সেলসিয়াসের নিচে রাখা এবং ১.৫ ডিগ্রি সেলসিয়াসে সীমাবদ্ধ রাখার সর্বাত্মক প্রচেষ্টা গ্রহণ করা।',
        simpleExplanation: 'Sets the worldwide scientific limit on global warming to protect vulnerable coastal nations, islands, and river deltas.',
        explainLike15: 'The global speed limit on planetary heating: keeping temperature rise as close to 1.5 degrees as humanly possible.',
        punishmentOrRemedy: 'Global stocktake reviews under Article 14 and compliance committee oversight.',
        keyConcepts: ['1.5°C target', 'Climate resilience', 'Green finance flows']
      },
      {
        number: 'Article 8',
        title: 'Loss and Damage associated with climate change impacts',
        titleBn: 'জলবায়ু পরিবর্তনের ক্ষতি ও ক্ষয়ক্ষতি (Loss and Damage)',
        content: 'Parties recognize the importance of averting, minimizing and addressing loss and damage associated with the adverse effects of climate change, including extreme weather events and slow onset events, and the role of sustainable development in reducing the risk of loss and damage.',
        contentBn: 'প্রাকৃতিক দুর্যোগ ও সমুদ্রপৃষ্ঠের উচ্চতা বৃদ্ধির ফলে ক্ষতিগ্রস্ত দেশসমূহের ক্ষয় ও ক্ষতি পূরণের বৈশ্বিক স্বীকৃতি।',
        simpleExplanation: 'Formally acknowledges that climate change causes irreversible destruction in low-lying nations (like Bangladesh) and establishes global support frameworks.',
        explainLike15: 'If rising sea levels wash away coastal villages in vulnerable countries, the world agrees there must be dedicated funding and assistance to help those communities survive.',
        punishmentOrRemedy: 'Warsaw International Mechanism for Loss and Damage and the Loss and Damage Fund.',
        keyConcepts: ['Loss and damage', 'Vulnerable nations', 'Slow onset events', 'Climate justice']
      }
    ],
    timeline: [
      { year: '2015', title: 'Adoption at COP21', description: 'Adopted by consensus in Paris on 12 December 2015.', status: 'enacted' },
      { year: '2016', title: 'Record Rapid Entry into Force', description: 'Entered into force on 4 November 2016 after crossing the 55% emissions threshold.', status: 'enacted' },
      { year: '2023', title: 'First Global Stocktake (COP28)', description: 'Concluded first global stocktake calling for transition away from fossil fuels.', status: 'upheld' }
    ],
    relatedLawIds: ['int-unclos-1982', 'int-vclt-1969', 'bd-environment-act-1995'],
    citations: {
      standard: 'Paris Agreement to the United Nations Framework Convention on Climate Change, Dec. 12, 2015, 3156 U.N.T.S. 1',
      academic: 'Paris Agreement (2015), 3156 UNTS 1, UN Doc. FCCC/CP/2015/L.9/Rev.1.',
      bluebook: 'Paris Agreement to the United Nations Framework Convention on Climate Change art. 2, Dec. 12, 2015, 3156 U.N.T.S. 1.',
      oscola: 'Paris Agreement (adopted 12 December 2015, entered into force 4 November 2016) 3156 UNTS 1',
      apa: 'United Nations. (2015). Paris Agreement. 3156 U.N.T.S. 1.',
      mla: '"The Paris Agreement." United Nations Framework Convention on Climate Change, 2015.',
      chicago: 'United Nations. The Paris Agreement. Dec. 12, 2015. 3156 U.N.T.S. 1.'
    },
    keywords: ['paris agreement', 'climate change', 'unfccc', '1.5 degrees', 'loss and damage', 'nationally determined contributions', 'ecolex', 'environmental law']
  },

  // 8. TRADE & COMMERCE (CISG)
  {
    id: 'int-cisg-1980',
    slug: 'un-convention-on-contracts-for-the-international-sale-of-goods-1980',
    title: 'UN Convention on Contracts for the International Sale of Goods (CISG)',
    titleBn: 'আন্তর্জাতিক পণ্য বিক্রয় চুক্তি বিষয়ক জাতিসংঘ কনভেনশন (সিআইএসজি ১৯৮০)',
    shortTitle: 'CISG (Vienna 1980)',
    alternativeTitles: ['Vienna Sales Convention', 'CISG', 'UNCITRAL CISG', '1489 UNTS 3'],
    jurisdiction: 'International',
    jurisdictionCode: 'INT',
    category: 'Trade & Commerce' as any,
    status: 'Active Treaty',
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
    officialSource: 'UNCITRAL Legal Texts (uncitral.un.org/en/texts/salegoods)',
    sourceOrganization: 'UNCITRAL / UNTS',
    sourceVerificationUrl: 'https://uncitral.un.org/sites/uncitral.un.org/files/media-documents/uncitral/en/19-09951_e_ebook.pdf',
    lastUpdatedDate: 'January 2025',
    verificationStatus: 'Verified Multilateral Depositary',
    sourceReproductionNotice: 'Text reproduced from UNCITRAL official text. Prepared by the United Nations Commission on International Trade Law.',
    overview: 'The preeminent uniform commercial law treaty governing contracts for international sale of commercial goods between businesses located in different countries, resolving cross-border choice of law conflicts for over 80% of world merchandise trade.',
    overviewBn: 'আন্তর্জাতিক বাণিজ্যের প্রধান অভিন্ন বিক্রয় চুক্তি আইন যা বিভিন্ন দেশের ব্যবসায়ীদের মধ্যে পণ্য ক্রয়-বিক্রয়, সরবরাহ, চুক্তিভঙ্গ ও ক্ষতিপূরণের বৈশ্বিক বিধিমালা নির্ধারণ করে।',
    simpleSummary: 'A global uniform commercial law that sets standard rules for buying and selling goods across international borders when buyers and sellers are in different countries.',
    explainLike15: 'If a buyer in Europe buys 10,000 shirts from an exporter in Bangladesh, the CISG provides fair, neutral rules for what counts as on-time delivery, quality inspection, and refunds if goods are damaged.',
    fullOfficialTextExcerpt: 'The States Parties to this Convention, Bearing in mind the broad objectives in the resolutions adopted by the sixth special session of the General Assembly of the United Nations on the establishment of a New International Economic Order... Have agreed as follows...',
    keyHighlights: [
      'Scope of Application (Art. 1): Applies to contracts of sale of goods between parties whose places of business are in different States.',
      'Fundamental Breach (Art. 25): Defines when a contract breach is severe enough to allow the buyer or seller to cancel the entire transaction.',
      'Remedies for Breach (Arts. 45 & 61): Comprehensive system of specific performance, damages, and price reduction.'
    ],
    sections: [
      {
        number: 'Article 25',
        title: 'Definition of Fundamental Breach',
        titleBn: 'চুক্তির মৌলিক লঙ্ঘনের (Fundamental Breach) সংজ্ঞা',
        content: 'A breach of contract committed by one of the parties is fundamental if it results in such detriment to the other party as substantially to deprive him of what he is entitled to expect under the contract, unless the party in breach did not foresee and a reasonable person of the same kind in the same circumstances would not have foreseen such a result.',
        contentBn: 'চুক্তিভঙ্গ তখনই মৌলিক বলে গণ্য হবে যখন তার ফলে অপর পক্ষ চুক্তির প্রধান প্রত্যাশা ও সুবিধা থেকে চরমভাবে বঞ্চিত হয়।',
        simpleExplanation: 'A breach is "fundamental" only if it completely ruins the core purpose of the commercial deal for the innocent party.',
        explainLike15: 'If you ordered fresh mangoes and received rotten fruit a month late, the seller committed a fundamental breach, allowing you to cancel the contract immediately.',
        punishmentOrRemedy: 'Immediate contract termination (avoidance) and recovery of full compensatory damages.',
        keyConcepts: ['Fundamental breach', 'Substantial deprivation', 'Foreseeability test']
      },
      {
        number: 'Article 74',
        title: 'Measurement of Damages for Breach of Contract',
        titleBn: 'চুক্তিভঙ্গের ক্ষতিপূরণের পরিমাণ নির্ধারণ',
        content: 'Damages for breach of contract by one party consist of a sum equal to the loss, including loss of profit, suffered by the other party as a consequence of the breach. Such damages may not exceed the loss which the party in breach foresaw or ought to have foreseen at the time of the conclusion of the contract.',
        contentBn: 'চুক্তিভঙ্গের ক্ষতিপূরণের মধ্যে প্রত্যক্ষ ক্ষতি এবং ন্যায্য মুনাফা হারানোর পরিমাণও অন্তর্ভুক্ত থাকবে।',
        simpleExplanation: 'The injured party is entitled to recover all losses, including lost business profits that were reasonably foreseeable.',
        explainLike15: 'You get refunded not just for the damaged goods, but also for the fair profits you lost because you could not deliver to your customers.',
        punishmentOrRemedy: 'Full financial compensation awarded in international commercial arbitration or national court.',
        keyConcepts: ['Expectation damages', 'Lost profits', 'Foreseeability limitation']
      }
    ],
    timeline: [
      { year: '1980', title: 'Adoption in Vienna', description: 'Adopted unanimously at the diplomatic conference in Vienna on 11 April 1980.', status: 'enacted' },
      { year: '1988', title: 'Entry into Force', description: 'Entered into force on 1 January 1988.', status: 'enacted' },
      { year: '2024', title: 'Over 95 Member States', description: 'Governs majority of global cross-border trade transactions.', status: 'upheld' }
    ],
    relatedLawIds: ['bd-contract-act-1872', 'int-wto-trips-1994', 'int-vclt-1969'],
    citations: {
      standard: 'United Nations Convention on Contracts for the International Sale of Goods, Apr. 11, 1980, 1489 U.N.T.S. 3',
      academic: 'CISG (1980), 1489 UNTS 3, 19 ILM 668.',
      bluebook: 'United Nations Convention on Contracts for the International Sale of Goods art. 25, Apr. 11, 1980, 1489 U.N.T.S. 3.',
      oscola: 'United Nations Convention on Contracts for the International Sale of Goods (opened for signature 11 April 1980, entered into force 1 January 1988) 1489 UNTS 3',
      apa: 'United Nations Commission on International Trade Law. (1980). United Nations Convention on Contracts for the International Sale of Goods. 1489 U.N.T.S. 3.',
      mla: '"CISG." UNCITRAL Legal Texts, 1980.',
      chicago: 'United Nations. Convention on Contracts for the International Sale of Goods. Apr. 11, 1980. 1489 U.N.T.S. 3.'
    },
    keywords: ['cisg', 'sales of goods', 'uncitral', 'vienna sales convention', 'international trade', 'commercial contracts', 'damages', 'cross border sales']
  },

  // 9. INVESTMENT LAW (ICSID)
  {
    id: 'int-icsid-convention-1965',
    slug: 'icsid-convention-on-the-settlement-of-investment-disputes-1965',
    title: 'ICSID Convention on the Settlement of Investment Disputes (1965)',
    titleBn: 'আইসিএসআইডি বিনিয়োগ বিরোধ নিষ্পত্তি কনভেনশন (১৯৬৫)',
    shortTitle: 'ICSID Convention (Washington 1965)',
    alternativeTitles: ['Washington Convention', 'ICSID', 'World Bank Investment Convention', '575 UNTS 159'],
    jurisdiction: 'International',
    jurisdictionCode: 'INT',
    category: 'Investment Law' as any,
    status: 'Active Treaty',
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
    sourceReproductionNotice: 'Text reproduced from the International Centre for Settlement of Investment Disputes (World Bank Group). Authentic in English, French, and Spanish.',
    overview: 'The multilateral treaty sponsored by the World Bank creating the autonomous International Centre for Settlement of Investment Disputes (ICSID) in Washington D.C., facilitating the arbitration and conciliation of investor-state disputes (ISDS) with direct global enforcement of awards without local court review.',
    overviewBn: 'বিশ্বব্যাংক পরিচালিত আইসিএসআইডি কনভেনশন যা বিদেশি বিনিয়োগকারী এবং রাষ্ট্রের মধ্যকার বিরোধ (ISDS) আন্তর্জাতিক সালিশির মাধ্যমে চূড়ান্ত ও বাধ্যতামূলকভাবে নিষ্পত্তির কাঠামো তৈরি করে।',
    simpleSummary: 'A global treaty that allows foreign businesses that invest in other countries to settle disagreements in an independent international arbitration tribunal.',
    explainLike15: 'If an international company builds an airport or power plant in another country and the government wrongfully seizes the plant, the ICSID convention provides an independent international panel of arbitrators to award fair compensation.',
    fullOfficialTextExcerpt: 'The Contracting States Considering the need for international cooperation for economic development, and the role of private international investment therein; Bearing in mind the possibility that from time to time disputes may arise in connection with such investment... Have agreed as follows...',
    keyHighlights: [
      'Autonomous Dispute Mechanism (Art. 25): Extends jurisdiction to legal disputes arising directly out of an investment between a Contracting State and a national of another Contracting State.',
      'Enforceability of Awards (Art. 54): Each Contracting State shall recognize an award rendered pursuant to this Convention as binding and enforce the pecuniary obligations as if it were a final judgment of a court in that State.',
      'No Diplomatic Protection (Art. 27): Prevents investor home states from giving diplomatic protection or bringing international claims once arbitration is commenced.'
    ],
    sections: [
      {
        number: 'Article 25',
        title: 'Jurisdiction of the Centre over Investment Disputes',
        titleBn: 'বিনিয়োগ বিরোধে ট্রাইব্যুনালের এখতিয়ার',
        content: 'The jurisdiction of the Centre shall extend to any legal dispute arising directly out of an investment, between a Contracting State and a national of another Contracting State, which the parties to the dispute consent in writing to submit to the Centre.',
        contentBn: 'বিনিয়োগ থেকে সরাসরি উদ্ভূত বিরোধ এবং উভয় পক্ষের লিখিত সম্মতির ভিত্তিতে কেন্দ্র সালিশি এখতিয়ার প্রয়োগ করবে।',
        simpleExplanation: 'ICSID can arbitrate any investment dispute if both the host government and the foreign investor have agreed in writing (e.g. through a treaty or contract).',
        explainLike15: 'The tribunal gets jurisdiction when the host government signed an investment treaty promising neutral arbitration to foreign investors.',
        punishmentOrRemedy: 'Binding award ordering monetary restitution or compensation.',
        keyConcepts: ['ISDS', 'Investment definition', 'Consent in writing', 'State party']
      },
      {
        number: 'Article 54',
        title: 'Recognition and Enforcement of Arbitral Awards',
        titleBn: 'সালিশি রোয়েদাদ (অ্যাওয়ার্ড) স্বীকৃতি ও স্বয়ংক্রিয় বাস্তবায়ন',
        content: 'Each Contracting State shall recognize an award rendered pursuant to this Convention as binding and enforce the pecuniary obligations imposed by that award within its territories as if it were a final judgment of a court in that State.',
        contentBn: 'প্রতিটি স্বাক্ষরকারী রাষ্ট্র আইসিএসআইডি সালিশি রোয়েদাদকে তার দেশের সর্বোচ্চ আদালতের চূড়ান্ত রায়ের ন্যায় সরাসরি বাধ্যতামূলকভাবে কার্যকর করবে।',
        simpleExplanation: 'An ICSID arbitration award cannot be overturned by local courts; it has the same direct power as the country\'s own Supreme Court judgment.',
        explainLike15: 'Winning an ICSID case means the government must pay the awarded money, and local courts cannot cancel the decision.',
        punishmentOrRemedy: 'Direct execution of monetary award against state commercial assets globally.',
        keyConcepts: ['Direct enforceability', 'Self-contained regime', 'Finality of award']
      }
    ],
    timeline: [
      { year: '1965', title: 'Adoption in Washington', description: 'Formulated by the Executive Directors of the World Bank on 18 March 1965.', status: 'enacted' },
      { year: '1966', title: 'Entry into Force', description: 'Entered into force on 14 October 1966.', status: 'enacted' },
      { year: '1980', title: 'Bangladesh Ratification', description: 'Bangladesh ratified the ICSID Convention on 27 March 1980.', status: 'upheld' }
    ],
    relatedLawIds: ['int-vclt-1969', 'int-cisg-1980', 'bd-contract-act-1872'],
    citations: {
      standard: 'Convention on the Settlement of Investment Disputes Between States and Nationals of Other States, Mar. 18, 1965, 575 U.N.T.S. 159',
      academic: 'ICSID Convention (1965), 575 UNTS 159, 4 ILM 532.',
      bluebook: 'Convention on the Settlement of Investment Disputes Between States and Nationals of Other States art. 54, Mar. 18, 1965, 575 U.N.T.S. 159.',
      oscola: 'Convention on the Settlement of Investment Disputes between States and Nationals of Other States (opened for signature 18 March 1965, entered into force 14 October 1966) 575 UNTS 159',
      apa: 'International Centre for Settlement of Investment Disputes. (1965). ICSID Convention. 575 U.N.T.S. 159.',
      mla: '"ICSID Convention." World Bank Group, 1965.',
      chicago: 'International Centre for Settlement of Investment Disputes. ICSID Convention. Mar. 18, 1965. 575 U.N.T.S. 159.'
    },
    keywords: ['icsid', 'investment law', 'isds', 'investor state dispute settlement', 'world bank', 'foreign direct investment', 'commercial arbitration']
  }
];

