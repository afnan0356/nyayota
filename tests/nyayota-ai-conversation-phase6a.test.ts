/**
 * Nyayota AI — Phase 6A Conversational Understanding & Intelligent Routing Test Suite
 * 
 * Verifies:
 * 1. Casual conversation (greetings, pleasantries, thanks, goodbye) -> No legal retrieval.
 * 2. Platform questions (features, capabilities, bug reports) -> Platform-help response without legal retrieval.
 * 3. Legal research requests (explicit statute, section, doctrine) -> Routes to retrieval engine.
 * 4. Contextual legal follow-ups (punishment, exceptions, simplification, under-18, comparison) -> Context-aware resolution.
 * 5. Ambiguous requests lacking prior context (Is it legal? What is the punishment?) -> Asks clarification without hallucinating.
 * 6. General explanatory questions (constitution, civil vs criminal, jurisdiction) -> General explanation without statutory database lookup.
 * 7. Multilingual language handling: English ('en'), Bengali ('bn'), and Banglish ('banglish') with numeral normalization.
 * 8. Adversarial inputs: greetings containing legal queries, casual text containing isolated legal words, and client mode-override attempts.
 * 9. Strict preservation of public assistant suspension (HTTP 503).
 */

import { describe, expect, it } from 'bun:test';
import { NextRequest } from 'next/server';
import { POST } from '@/app/api/ai-assistant/route';
import { AI_CONFIG } from '@/lib/ai-config';
import {
  buildConversationContext,
  detectConversationalLanguage,
  detectConversationalIntent,
  normalizeConversationalText,
  resolveContextualReference,
  routeConversationalQuery,
  handleConversationalTurn,
  executeNyayotaAIPipeline,
} from '@/lib/nyayota-ai';

describe('Nyayota AI Phase 6A: Conversational Understanding & Intelligent Routing', () => {

  // ==========================================================================
  // 1. Casual Conversation Intent & Retrieval Gating
  // ==========================================================================
  describe('1. Casual Conversation (Zero Legal Retrieval)', () => {
    const casualQueries = [
      'Hi',
      'Hello',
      'Hey',
      'How are you?',
      'Good morning',
      'Thanks',
      'Thank you so much',
      'Goodbye',
      'কেমন আছেন',
      'ধন্যবাদ',
    ];

    casualQueries.forEach((q) => {
      it(`classifies "${q}" as casual_conversation with shouldRetrieve: false`, () => {
        const emptyContext = buildConversationContext([]);
        const decision = routeConversationalQuery(q, emptyContext);

        expect(decision.intent).toBe('casual_conversation');
        expect(decision.responseMode).toBe('conversation');
        expect(decision.shouldRetrieve).toBe(false);
        expect(decision.requiresClarification).toBe(false);

        const response = handleConversationalTurn(decision, emptyContext);
        expect(response.text.length).toBeGreaterThan(15);
        expect(response.disclaimer).toBeDefined();
      });
    });

    it('confirms pipeline executes casual conversation without touching legal retrieval engine', async () => {
      const result = await executeNyayotaAIPipeline({ query: 'Hello, how are you?' });
      expect(result.status).toBe('conversational');
      expect(result.sources).toHaveLength(0);
      expect(result.conversationalRouting?.shouldRetrieve).toBe(false);
      expect(result.conversationalRouting?.intent).toBe('casual_conversation');
    });
  });

  // ==========================================================================
  // 2. Platform Questions (Features & Verified Capabilities)
  // ==========================================================================
  describe('2. Platform Questions (Zero Legal Retrieval)', () => {
    const platformQueries = [
      'What is Nyayota?',
      'What can you do?',
      'What does this website do?',
      'What laws can I search?',
      'Can I use it in Bengali?',
      'How do I report an error?',
      'ন্যায়তা কি করতে পারে?',
    ];

    platformQueries.forEach((q) => {
      it(`classifies "${q}" as platform_question with shouldRetrieve: false`, () => {
        const context = buildConversationContext([]);
        const decision = routeConversationalQuery(q, context);

        expect(decision.intent).toBe('platform_question');
        expect(decision.responseMode).toBe('platform_help');
        expect(decision.shouldRetrieve).toBe(false);

        const response = handleConversationalTurn(decision, context);
        expect(response.text).toContain('nyayota.contact@gmail.com');
        expect(response.text).toContain('/bangladesh-laws');
      });
    });
  });

  // ==========================================================================
  // 3. Legal Research Requests (Statutes, Provisions, Concepts)
  // ==========================================================================
  describe('3. Substantive Legal Research (Retrieval Enabled)', () => {
    const legalQueries = [
      'Explain Section 302 of the Penal Code',
      'What does Article 102 of the Constitution say?',
      'Find the relevant Bangladesh law about bail',
      'What is the legal meaning of consideration?',
      'CrPC Section 54',
      'দণ্ডবিধি ধারা ৩০০',
    ];

    legalQueries.forEach((q) => {
      it(`classifies "${q}" as legal_research with shouldRetrieve: true`, () => {
        const context = buildConversationContext([]);
        const decision = routeConversationalQuery(q, context);

        expect(decision.intent).toBe('legal_research');
        expect(decision.responseMode).toBe('legal_retrieval');
        expect(decision.shouldRetrieve).toBe(true);
      });
    });
  });

  // ==========================================================================
  // 4. Contextual Follow-up Questions
  // ==========================================================================
  describe('4. Context-Aware Legal Follow-ups', () => {
    it('resolves "What is the punishment?" when following a Section 302 discussion', () => {
      const context = buildConversationContext([
        { role: 'user', content: 'Explain Section 302 of the Penal Code' },
        { role: 'assistant', content: 'Section 302 of The Penal Code, 1860 prescribes the penalty for murder.' },
      ]);

      expect(context.activeAct?.title).toContain('Penal Code');
      expect(context.activeSection).toBe('Section 302');

      const decision = routeConversationalQuery('What is the punishment?', context);
      expect(decision.intent).toBe('legal_follow_up');
      expect(decision.responseMode).toBe('legal_follow_up');
      expect(decision.shouldRetrieve).toBe(true);
      expect(decision.resolvedContext?.isResolved).toBe(true);
      expect(decision.resolvedContext?.referenceType).toBe('punishment');
      expect(decision.effectiveRetrievalQuery).toContain('Section 302');
      expect(decision.effectiveRetrievalQuery).toContain('punishment');
    });

    it('simplifies prior explanation without fresh retrieval when user asks "Can you explain that more simply?"', () => {
      const context = buildConversationContext([
        { role: 'user', content: 'Explain Article 102 of the Constitution' },
        { role: 'assistant', content: 'Article 102 establishes the High Court Division writ jurisdiction under habeas corpus and certiorari.' },
      ]);

      const decision = routeConversationalQuery('Can you explain that more simply?', context);
      expect(decision.intent).toBe('legal_follow_up');
      expect(decision.responseMode).toBe('legal_follow_up');
      expect(decision.shouldRetrieve).toBe(false); // Simplification uses context, avoids redundant search
      expect(decision.resolvedContext?.referenceType).toBe('simplification');

      const response = handleConversationalTurn(decision, context);
      expect(response.headline).toContain('Simplified');
      expect(response.text).toContain('Article 102');
    });

    it('resolves "Is there an exception?" from prior section context', () => {
      const context = buildConversationContext([
        { role: 'user', content: 'The Penal Code Section 300' },
        { role: 'assistant', content: 'Section 300 defines culpable homicide and murder.' },
      ]);

      const decision = routeConversationalQuery('Is there an exception?', context);
      expect(decision.intent).toBe('legal_follow_up');
      expect(decision.shouldRetrieve).toBe(true);
      expect(decision.resolvedContext?.referenceType).toBe('exception');
      expect(decision.effectiveRetrievalQuery).toContain('Section 300');
    });

    it('resolves "What happens if the person is under 18?" from prior context', () => {
      const context = buildConversationContext([
        { role: 'user', content: 'Section 302 of The Penal Code' },
        { role: 'assistant', content: 'Section 302 covers murder punishment.' },
      ]);

      const decision = routeConversationalQuery('What happens if the person is under 18?', context);
      expect(decision.intent).toBe('legal_follow_up');
      expect(decision.shouldRetrieve).toBe(true);
      expect(decision.resolvedContext?.referenceType).toBe('age_condition');
      expect(decision.effectiveRetrievalQuery).toContain('minor under 18');
    });

    it('resolves "Compare it with the previous section" from prior context', () => {
      const context = buildConversationContext([
        { role: 'user', content: 'The Penal Code, 1860 Section 302' },
        { role: 'assistant', content: 'Section 302 penalty provision.' },
      ]);

      const decision = routeConversationalQuery('Can you compare it with Section 300?', context);
      expect(decision.intent).toBe('legal_follow_up');
      expect(decision.shouldRetrieve).toBe(true);
      expect(decision.resolvedContext?.referenceType).toBe('comparison');
    });
  });

  // ==========================================================================
  // 5. Ambiguous Requests Lacking Context (Disambiguation without Hallucination)
  // ==========================================================================
  describe('5. Ambiguous Inquiries without Context (Mandatory Clarification)', () => {
    it('demands clarification when "What is the punishment?" is queried in a fresh session', () => {
      const emptyContext = buildConversationContext([]);
      const decision = routeConversationalQuery('What is the punishment?', emptyContext);

      expect(decision.intent).toBe('ambiguous_request');
      expect(decision.responseMode).toBe('clarification');
      expect(decision.shouldRetrieve).toBe(false);
      expect(decision.requiresClarification).toBe(true);
      expect(decision.clarificationPrompt).toContain('Which legal offense or statute');

      const response = handleConversationalTurn(decision, emptyContext);
      expect(response.headline).toBe('Clarification Needed');
      expect(response.clarificationOptions).toBeDefined();
    });

    it('demands clarification for "Is it legal?" without guessing arbitrary statutes', () => {
      const emptyContext = buildConversationContext([]);
      const decision = routeConversationalQuery('Is it legal?', emptyContext);

      expect(decision.intent).toBe('ambiguous_request');
      expect(decision.responseMode).toBe('clarification');
      expect(decision.shouldRetrieve).toBe(false);
      expect(decision.requiresClarification).toBe(true);
      expect(decision.clarificationPrompt).toContain('Which specific action');
    });

    it('demands clarification for "Can I do that?" in a fresh session', () => {
      const emptyContext = buildConversationContext([]);
      const decision = routeConversationalQuery('Can I do that?', emptyContext);

      expect(decision.intent).toBe('ambiguous_request');
      expect(decision.responseMode).toBe('clarification');
      expect(decision.shouldRetrieve).toBe(false);
    });

    it('demands clarification for "What happens next?" in a fresh session', () => {
      const emptyContext = buildConversationContext([]);
      const decision = routeConversationalQuery('What happens next?', emptyContext);

      expect(decision.intent).toBe('ambiguous_request');
      expect(decision.responseMode).toBe('clarification');
      expect(decision.shouldRetrieve).toBe(false);
    });
  });

  // ==========================================================================
  // 6. General Explanatory Questions (Jurisprudence without Statute Lookup)
  // ==========================================================================
  describe('6. General Explanatory Jurisprudence (Zero Database Search)', () => {
    const generalQuestions = [
      'What is a constitution?',
      'What is the difference between civil and criminal law?',
      'Explain the meaning of jurisdiction',
      'দেওয়ানি ও ফৌজদারি আইনের পার্থক্য কি?',
      'সংবিধান কি?',
    ];

    generalQuestions.forEach((q) => {
      it(`handles "${q}" as general_explanation without statutory retrieval`, () => {
        const context = buildConversationContext([]);
        const decision = routeConversationalQuery(q, context);

        expect(decision.intent).toBe('general_explanation');
        expect(decision.responseMode).toBe('general_explanation');
        expect(decision.shouldRetrieve).toBe(false);

        const response = handleConversationalTurn(decision, context);
        expect(response.text.length).toBeGreaterThan(50);
        expect(response.disclaimer).toBeDefined();
      });
    });
  });

  // ==========================================================================
  // 7. Multilingual Handling: English, Bengali, and Banglish
  // ==========================================================================
  describe('7. Language Detection & Normalization (EN, BN, Banglish)', () => {
    it('detects English script accurately', () => {
      expect(detectConversationalLanguage('What is bail?')).toBe('en');
      expect(detectConversationalLanguage('Explain Section 302')).toBe('en');
    });

    it('detects Bengali Unicode script accurately', () => {
      expect(detectConversationalLanguage('জামিন কী?')).toBe('bn');
      expect(detectConversationalLanguage('দণ্ডবিধি ধারা ৩০২')).toBe('bn');
      expect(detectConversationalLanguage('নমস্কার')).toBe('bn');
    });

    it('detects Banglish (Romanized Bengali) accurately and routes appropriately', () => {
      expect(detectConversationalLanguage('Bail ki?')).toBe('banglish');
      expect(detectConversationalLanguage('Section 302 er shasti ki?')).toBe('banglish');
      expect(detectConversationalLanguage('Eita ki legal?')).toBe('banglish');
      expect(detectConversationalLanguage('Kono shasti ache?')).toBe('banglish');

      const banglishDecision = routeConversationalQuery('Section 302 er shasti ki?', buildConversationContext([]));
      expect(banglishDecision.language).toBe('banglish');
      expect(banglishDecision.intent).toBe('legal_research');
      expect(banglishDecision.shouldRetrieve).toBe(true);
    });

    it('converts Bengali numerals in section queries accurately', () => {
      expect(normalizeConversationalText('ধারা ৩০২')).toBe('ধারা 302');
      expect(normalizeConversationalText('অনুচ্ছেদ ১০২')).toBe('অনুচ্ছেদ 102');
      expect(normalizeConversationalText('ধারা ৫৪')).toBe('ধারা 54');
    });
  });

  // ==========================================================================
  // 8. Adversarial & Misleading Input Hardening
  // ==========================================================================
  describe('8. Adversarial & Misleading Input Hardening', () => {
    it('does NOT treat greeting with legal question as a simple greeting', () => {
      const query = 'Hello, what is Section 302 of Penal Code?';
      const decision = routeConversationalQuery(query, buildConversationContext([]));

      // Must be classified as legal research, NOT casual greeting
      expect(decision.intent).toBe('legal_research');
      expect(decision.shouldRetrieve).toBe(true);
    });

    it('does NOT trigger legal retrieval for casual use of words like "law", "rule", or "code"', () => {
      const casualSentences = [
        'I am meeting my mother-in-law for lunch',
        'Can you help me write python code?',
        'What are the rules of chess?',
      ];

      casualSentences.forEach((q) => {
        const decision = routeConversationalQuery(q, buildConversationContext([]));
        expect(decision.shouldRetrieve).toBe(false);
      });
    });

    it('ignores client attempts to force an arbitrary response mode', () => {
      const clientAttempt = { clientSuggestedMode: 'legal_retrieval' };
      const decision = routeConversationalQuery('Hello there!', buildConversationContext([]), clientAttempt);

      // Server routing must stay conversation, ignoring client attempt to force retrieval
      expect(decision.intent).toBe('casual_conversation');
      expect(decision.responseMode).toBe('conversation');
      expect(decision.shouldRetrieve).toBe(false);
    });

    it('handles follow-up referencing an obsolete session safely with clarification', () => {
      // Empty context simulates a session that timed out or was reset
      const emptyContext = buildConversationContext([]);
      const decision = routeConversationalQuery('What about that provision?', emptyContext);

      expect(decision.intent).toBe('ambiguous_request');
      expect(decision.responseMode).toBe('clarification');
      expect(decision.shouldRetrieve).toBe(false);
      expect(decision.requiresClarification).toBe(true);
    });
  });

  // ==========================================================================
  // 9. Mandatory Public Assistant Suspension Check
  // ==========================================================================
  describe('9. Public Assistant Suspension Verification', () => {
    it('confirms server-controlled flag defaults to false', () => {
      delete process.env.ENABLE_PUBLIC_AI_ASSISTANT;
      expect(AI_CONFIG.isPublicAssistantAvailable).toBe(false);
    });

    it('confirms /api/ai-assistant returns HTTP 503 while public assistant is suspended', async () => {
      delete process.env.ENABLE_PUBLIC_AI_ASSISTANT;

      const req = new NextRequest('http://localhost:3000/api/ai-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: 'Hello' }),
      });

      const res = await POST(req);
      expect(res.status).toBe(503);

      const json = await res.json();
      expect(json.error).toBe('assistant_temporarily_unavailable');
      expect(json.message).toContain('under development');
    });
  });
});
