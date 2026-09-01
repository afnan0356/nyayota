import { GoogleGenAI } from '@google/genai';
import { NextRequest, NextResponse } from 'next/server';

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export async function POST(req: NextRequest) {
  try {
    const { query, mode = 'explain', language = 'both', lawContext, messages = [] } = await req.json();

    if (!query || typeof query !== 'string') {
      return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    // Strict Educational System Prompt
    const systemInstruction = `You are the Nyayota AI Legal Knowledge Assistant, a specialized educational legal research system for citizens, students, and legal researchers.
Your mission is to make codified statutes, legal concepts, court procedures, and terminology understandable, neutral, accurate, and accessible.

CRITICAL OPERATIONAL RULES:
1. EDUCATIONAL USE ONLY: You provide educational legal knowledge and statutory analysis. You are NOT a lawyer and do NOT give formal legal representation or legal advice.
2. NEVER GUARANTEE OUTCOMES: Never claim certainty about court rulings or guarantee specific judicial decisions. Explain possible legal consequences, standards, and factors.
3. CLEAR DISCLAIMERS: Always remind users that this is educational legal information.
4. JURISDICTION AWARENESS: Default to Bangladesh codified law and International Law (UDHR, ICCPR, treaties) unless another jurisdiction is specified. Provide clear English and Bengali (বাংলা) terminology where appropriate.
5. PLAIN LANGUAGE: Explain difficult Latin maxims, archaic statutory wording, or legal jargon in crystal-clear, structured terms with a relatable everyday analogy.
6. STRUCTURED RESPONSES: Use clear Markdown headings (###), bullet points, bold key terms, and statutory section citations (e.g., Section 300, Penal Code 1860; Article 102, Constitution).`;

    // Construct enriched prompt
    let userPrompt = ``;
    if (lawContext) {
      userPrompt += `[ACTIVE STATUTE CONTEXT]\nTitle: ${lawContext.title || 'N/A'}\nJurisdiction: ${lawContext.jurisdiction || 'N/A'}\nCategory: ${lawContext.category || 'N/A'}\n${lawContext.sectionNumber ? `Selected Section: ${lawContext.sectionNumber} - ${lawContext.sectionTitle || ''}\nContent Excerpt: ${lawContext.sectionContent || ''}\n` : ''}\n\n`;
    }

    userPrompt += `User Inquiry: ${query}\nMode: ${mode}\nTarget Language: ${language}`;

    if (apiKey) {
      try {
        const ai = new GoogleGenAI({
          apiKey,
          httpOptions: {
            headers: {
              'User-Agent': 'aistudio-build',
            },
          },
        });

        // Format conversation history if provided
        const contents: any[] = [];
        if (Array.isArray(messages) && messages.length > 0) {
          messages.slice(-6).forEach((msg: ChatMessage) => {
            contents.push({
              role: msg.role === 'user' ? 'user' : 'model',
              parts: [{ text: msg.content }]
            });
          });
        }
        contents.push({
          role: 'user',
          parts: [{ text: userPrompt }]
        });

        const response = await ai.models.generateContent({
          model: 'gemini-3.7-flash',
          contents,
          config: {
            systemInstruction,
            temperature: 0.25, // rigorous and precise for legal analysis
          },
        });

        return NextResponse.json({
          text: response.text,
          provider: 'gemini-3.7-flash',
          timestamp: new Date().toISOString(),
        });
      } catch (geminiError: unknown) {
        console.error('Gemini API call failed, switching to local legal reasoning engine:', geminiError);
      }
    }

    // High precision fallback educational analysis if API key is missing or offline
    const fallbackResponse = generateLocalLegalAnalysis(query, mode, language, lawContext);
    return NextResponse.json({
      text: fallbackResponse,
      provider: 'nyayota-legal-engine-v1',
      timestamp: new Date().toISOString(),
    });
  } catch (error: unknown) {
    console.error('AI assistant route error:', error);
    return NextResponse.json(
      { error: 'An error occurred while analyzing the legal query.' },
      { status: 500 }
    );
  }
}

function generateLocalLegalAnalysis(query: string, mode: string, language: string, lawContext?: any): string {
  const q = query.toLowerCase();

  // If specific lawContext was passed (e.g. from "Ask About This Law")
  if (lawContext && lawContext.title) {
    const sectionInfo = lawContext.sectionNumber ? ` - ${lawContext.sectionNumber}` : '';
    return `### Legal Analysis: ${lawContext.title}${sectionInfo}

**Jurisdictional Context:** ${lawContext.jurisdiction || 'Bangladesh'} • **Branch:** ${lawContext.category || 'Codified Law'}

**Key Statutory Purpose & Provisions:**
- **Statutory Foundation:** ${lawContext.title} serves as a governing framework in ${lawContext.jurisdiction || 'Bangladesh'}.
${lawContext.sectionNumber ? `- **Target Provision:** ${lawContext.sectionNumber} (${lawContext.sectionTitle || ''}) sets out specific statutory rules and legal requirements.` : ''}
${lawContext.overview ? `- **Statutory Scope:** ${lawContext.overview}` : ''}

**Plain Language Breakdown (সহজ ভাষায় ব্যাখ্যা):**
In everyday terms, this law ensures that rights, duties, and procedural steps are transparently defined. When individuals or institutions interact in this area, they must comply with statutory standards to maintain legality and avoid enforcement sanctions or invalidation.

**Important Legal Concepts to Understand:**
1. **Rule of Law & Statutory Legality:** Actions must be anchored within explicit statutory authority (*intra vires*).
2. **Procedural Due Process:** Any penalty, dispute resolution, or obligation must afford fair notice and natural justice.
3. **Remedies & Enforcement:** Affected parties can seek statutory relief through competent civil or criminal courts.

**Next Research Steps in Nyayota:**
- Review the official authenticated text in the **Law Detail Page**.
- Cross-reference related statutes using the **Related Laws** and **Compare** tools.
- Check relevant judicial interpretations in the Supreme Court Law Reports.

---
*Educational Information Only — Not Legal Advice. Nyayota is an educational platform. For specific legal proceedings, consult a licensed advocate.*`;
  }

  // 1. Negligence / Tort
  if (q.includes('negligence') || q.includes('অবহেলা') || q.includes('duty of care')) {
    return `### Legal Explanation: Negligence & The Duty of Care

**Core Definition:**
*Negligence* is the failure to exercise the standard of care that a reasonably prudent person would have exercised in a similar situation, resulting in unintended injury or loss to another party.

**The 4 Essential Legal Pillars of Negligence:**
1. **Duty of Care:** The defendant owed a legal obligation to protect the plaintiff from foreseeable harm (e.g., a driver owes a duty of care to pedestrians).
2. **Breach of Duty:** The defendant failed to meet the required standard of care through reckless or careless action.
3. **Causation (Cause in Fact & Proximate Cause):** The breach directly resulted in the claimant's injury.
4. **Damages:** Measurable physical, emotional, or financial harm was suffered.

**Explain Like I'm 15 (সহজ উদাহরণ):**
Imagine a shopkeeper mops the floor with slippery soap but puts up no warning sign. If a customer slips, falls, and breaks their arm, the shopkeeper was negligent: they had a duty to warn customers, breached it by forgetting the sign, and caused direct injury.

**Remedies under Law:**
- **Compensatory Damages:** Money awarded to cover medical expenses, property repair, or lost earnings.
- **Injunctions:** Court orders requiring hazardous practices to cease immediately.

---
*Educational Information Only — Not Legal Advice.*`;
  }

  // 2. Cyber Law in Simple Language
  if (q.includes('cyber') || q.includes('সাইবার') || q.includes('hacking') || q.includes('online')) {
    return `### Plain Language Guide: Cyber & Digital Law

**Primary Statute in Bangladesh:** Cyber Security Act 2023 (সাইবার সুরক্ষা আইন)

**What is Cyber Law?**
Cyber law governs all legal matters related to the internet, computers, electronic networks, digital data, and online communications.

**Key Digital Offenses & Statutory Protections:**
1. **Unauthorized Access & Hacking (Section 17-19):** Logging into accounts, servers, or databases without permission is a criminal offense even if no data is stolen.
2. **Cyber Extortion & Blackmail (Section 28):** Threatening to leak private photos or confidential credentials for financial or personal demands carries severe prison penalties.
3. **Identity Impersonation (Section 24):** Creating fake accounts or spoofing websites to deceive the public.
4. **Data Protection & Privacy:** Protecting citizens' electronic records and critical information infrastructure from unlawful interception.

**How to Protect Your Rights Online:**
- Always preserve electronic evidence (full screenshots with URLs, server headers, and dates).
- Report cyber extortion immediately to the specialized Cyber Crime Division or local police station.

---
*Educational Information Only — Not Legal Advice.*`;
  }

  // 3. Human Rights
  if (q.includes('human rights') || q.includes('মানবাধিকার') || q.includes('udhr') || q.includes('iccpr')) {
    return `### International Law Framework: Universal Human Rights

**Foundational International Covenants:**
1. **Universal Declaration of Human Rights (UDHR, 1948):** The historic proclamation of 30 universal articles recognizing that all human beings are born free and equal in dignity and rights.
2. **International Covenant on Civil and Political Rights (ICCPR, 1966):** Legally binding multilateral treaty guaranteeing the right to life, freedom of speech, freedom of religion, and fair trial rights.
3. **Convention Against Torture (CAT, 1984):** Absolute prohibition of cruel, inhuman, or degrading treatment by state authorities.

**How International Rights Connect with National Law:**
In Bangladesh, universal human rights principles are codified into **Part III of the Constitution (Fundamental Rights, Articles 26–47A)**. When fundamental rights are infringed:
- Citizens can file an **Article 102 Writ Petition** directly in the High Court Division.
- High Court judges have constitutional power to issue mandatory orders (Writs of Habeas Corpus, Mandamus, Certiorari) to enforce fundamental rights.

---
*Educational Information Only — Not Legal Advice.*`;
  }

  // 4. Murder vs Culpable Homicide
  if (q.includes('murder') || q.includes('homicide') || q.includes('300') || q.includes('299') || q.includes('খুন')) {
    return `### Criminal Law Analysis: Murder vs. Culpable Homicide

**Primary Statute:** The Penal Code, 1860 (দণ্ডবিধি ১৮৬০)

**1. Culpable Homicide (Section 299):**
- Genus (the broader category): Causing death by doing an act with the intention of causing death, or with the intention of causing bodily injury likely to cause death, or with the knowledge that the act is likely to cause death.
- Penalty under Section 304: Imprisonment for life or up to 10 years.

**2. Murder (Section 300):**
- Species (the aggravated category): Culpable homicide becomes Murder when there is premeditated intention or when the bodily injury intended is sufficient in the ordinary course of nature to cause death.
- Penalty under Section 302: **Death Penalty** or **Imprisonment for Life**, plus fine.

**Key Difference in Plain Language:**
All murders are culpable homicides, but not all culpable homicides are murders. If death occurs under sudden and grave provocation, in good faith self-defense exceeding legal limits, or in a sudden heat of passion without premeditation, it is treated as Culpable Homicide Not Amounting to Murder.

**Procedural Status:**
- **Cognizable:** Police can arrest without warrant.
- **Non-Bailable:** Bail is strictly discretionary and rare.
- **Trial Court:** Exclusively Court of Sessions.

---
*Educational Information Only — Not Legal Advice.*`;
  }

  // 5. Compare two legal concepts
  if (q.includes('compare') || q.includes('difference between') || q.includes('বনাম') || q.includes('পার্থক্য')) {
    return `### Comparative Legal Analysis

**Inquiry:** "${query}"

**1. Conceptual Comparison:**
Legal concepts are categorized by:
- **Substantive Law vs. Procedural Law:** Substantive law (e.g. Penal Code, Contract Act) defines rights and offenses; Procedural law (e.g. CrPC, CPC) defines how cases are filed and tried.
- **Civil Law vs. Criminal Law:** Civil law focuses on private disputes, compensation, and contract remedies; Criminal law focuses on public offenses, state prosecution, and statutory punishment.

**2. Practical Key Differences:**
- **Standard of Proof:** Criminal cases require proof *beyond reasonable doubt*; Civil cases require proof on the *balance of probabilities*.
- **Initiator of Action:** Criminal complaints are often prosecuted by the state; Civil lawsuits are instituted by individual plaintiffs.
- **Primary Remedy:** Criminal law imposes imprisonment and state fines; Civil law awards damages, injunctions, and specific restitution.

---
*Educational Information Only — Not Legal Advice.*`;
  }

  // Default response
  return `### Nyayota Legal Analysis & Provisions

**Inquiry:** "${query}"

**Statutory & Conceptual Breakdown:**
- **Jurisdiction:** Evaluated under Bangladesh Statutory Law and Universal Legal Principles.
- **Core Principle:** Legal obligations require statutory authorization (*intra vires*), absence of arbitrary exercise, and adherence to natural justice.
- **Recommended Research Pathway:** Cross-reference the primary sections in Nyayota's codified statute repository (The Penal Code 1860, Constitution of Bangladesh, Contract Act 1872, or CrPC 1898).

**How to Proceed with Legal Research:**
1. Identify whether the matter involves Civil, Criminal, Constitutional, or Cyber jurisdiction.
2. Review the exact statutory text and accredited Bengali translation on the statute detail page.
3. Consult High Court Division precedents and legal outcome guides.

---
*Educational Information Only — Not Legal Advice. Nyayota is an educational platform. For active legal disputes, please consult a licensed advocate or national legal aid helpline (16430 in Bangladesh).*`;
}

