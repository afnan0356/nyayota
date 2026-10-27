/**
 * Nyayota AI — Source-Grounded Deterministic Response Generator Unit Tests
 * 
 * Verifies that the response generator converts retrieval records and routing
 * outcomes into clear, structured, source-grounded educational legal responses.
 */

import { describe, expect, it } from 'bun:test';
import {
  generateLegalResponse,
  generateResponseFromRoute,
} from '../lib/nyayota-ai';

describe('Nyayota AI — Source-Grounded Deterministic Response Generator', () => {
  // Test 1: Exact Legal Reference Retrieval
  it('generates fully grounded statutory response for exact section reference', async () => {
    const res = await generateLegalResponse('Section 300 of Penal Code');

    expect(['grounded-answer', 'partial-coverage']).toContain(res.status);
    expect(res.detectedIntent).toBe('direct_legal_reference');
    expect(res.headline).toContain('The Penal Code, 1860');
    expect(res.headline).toContain('Section 300');

    // Verbatim text must be preserved from database
    expect(res.structuredExplanation).toContain('culpable homicide is murder');

    // Plain-language summary must be present
    expect(res.summary.length).toBeGreaterThan(10);

    // Consequence / penalty must be identified
    expect(res.structuredExplanation).toContain('Section 302');

    // Sources must be attached and traceable
    expect(res.sources.length).toBeGreaterThan(0);
    const topSource = res.sources[0];
    expect(topSource.sourceId).toBe('bd-penal-code-1860');
    expect(topSource.identifier).toBe('Section 300');
    expect(topSource.internalUrl).toBe('/law/bd-penal-code-1860?section=Section%20300');
    expect(topSource.officialUrl).toBe('http://bdlaws.minlaw.gov.bd/act-11.html');

    // Must have proportionate educational disclaimer
    expect(res.disclaimer).toContain('educational and legal research purposes');
    expect(res.disclaimer).toContain('Bangladesh Bar Council');
  });

  // Test 2: Bilingual Bengali Legal Queries
  it('supports Bengali statute queries with preserved Bengali text', async () => {
    const res = await generateLegalResponse('দণ্ডবিধি ধারা ৩০০');

    expect(['grounded-answer', 'partial-coverage']).toContain(res.status);
    expect(res.detectedIntent).toBe('direct_legal_reference');
    expect(res.headlineBn).toBeDefined();
    expect(res.headlineBn).toContain('দণ্ডবিধি');

    // Bengali statutory text must be present from database
    expect(res.structuredExplanationBn).toContain('অপরাধজনক নরহত্যা খুন হিসেবে গণ্য হবে');
    expect(res.summaryBn).toBeDefined();
    expect(res.disclaimerBn).toContain('বাংলাদেশ বার কাউন্সিলে তালিকাভুক্ত আইনজীবীর পরামর্শ নিন');
  });

  // Test 3: Missing Provision in Recognized Act (Curated Subset Limitation)
  it('detects when Act is known but queried section is outside curated subset', async () => {
    const res = await generateLegalResponse('Section 999 of Penal Code');

    expect(res.status).toBe('partial-coverage');
    expect(res.detectedIntent).toBe('direct_legal_reference');
    expect(res.headline).toContain('Not in Curated Subset');
    expect(res.summary).toContain('curated high-frequency section subset');

    // Limitations must explicitly state this is not proof of statutory non-existence
    expect(res.limitations.some((lim) => lim.includes('Absence from Nyayota does not mean'))).toBe(true);

    // Must not invent fake provision text
    expect(res.structuredExplanation).not.toContain('Whoever commits section 999');
  });

  // Test 4: Glossary-Based Explanations
  it('generates grounded concept definition from legal glossary', async () => {
    const res = await generateLegalResponse('What is Habeas Corpus?');

    expect(res.status).toBe('grounded-answer');
    expect(res.detectedIntent).toBe('legal_concept');
    expect(res.headline).toBe('Legal Definition: Habeas Corpus');
    expect(res.structuredExplanation).toContain('judicial writ');
    expect(res.structuredExplanation).toContain('detention');

    // Must distinguish glossary doctrine from statutory text
    expect(res.structuredExplanation).toContain('interpretive standard across courts');
    expect(res.sources[0].internalUrl).toBe('/glossary?term=Habeas%20Corpus');
  });

  // Test 5: Statute Overview with Partial Coverage Note
  it('generates verified statute overview with legislative metadata', async () => {
    const res = await generateLegalResponse('Tell me about the Penal Code 1860');

    expect(['grounded-answer', 'partial-coverage']).toContain(res.status);
    expect(res.detectedIntent).toBe('statute_overview');
    expect(res.headline).toContain('Statute Overview: The Penal Code, 1860');
    expect(res.structuredExplanation).toContain('Act No. XLV of 1860');
    expect(res.sources[0].internalUrl).toBe('/law/bd-penal-code-1860');
  });

  // Test 6: Citizen Procedural Scenario without Definite Outcome Guarantees
  it('generates procedural guide with clear judicial outcome disclaimers', async () => {
    const res = await generateLegalResponse('How to file a GD in police station?');

    expect(res.status).toBe('grounded-answer');
    expect(res.detectedIntent).toBe('legal_scenario');
    expect(res.structuredExplanation).toContain('GD');
    expect(res.structuredExplanation).toContain('Procedural Steps');

    // Must explicitly refuse to guarantee court or police outcomes
    expect(res.structuredExplanation).toContain('do not guarantee any court decision or outcome');
    expect(res.sources[0].internalUrl).toContain('/legal-outcome-guide');
  });

  // Test 7: Ambiguous Standalone Section Clarification
  it('generates clarification prompt and candidate acts for standalone section', async () => {
    const res = await generateLegalResponse('Section 54');

    expect(res.status).toBe('clarification-required');
    expect(res.detectedIntent).toBe('clarification_needed');
    expect(res.headline).toContain('Section 54');
    expect(res.clarificationPrompt).toBeDefined();
    expect(res.clarificationOptions?.length).toBeGreaterThan(0);

    // Candidates should include relevant acts
    expect(res.structuredExplanation).toContain('The Code of Criminal Procedure, 1898');
  });

  // Test 8: Foreign Jurisdiction / IPC Strict Safety Rule
  it('enforces IPC safety rule by clarifying Indian jurisdiction without false BD mapping', async () => {
    const res = await generateLegalResponse('What does IPC 302 say?');

    expect(res.status).toBe('clarification-required');
    expect(res.detectedJurisdiction).toBe('India');
    expect(res.headline).toContain('IPC (India) vs. The Penal Code, 1860 (Bangladesh)');
    expect(res.summary).toContain('You queried about "IPC" (Indian Penal Code)');
    expect(res.structuredExplanation).toContain('The Penal Code, 1860 (Act XLV of 1860 / দণ্ডবিধি, ১৮৬০)');
    expect(res.clarificationPrompt).toContain('Indian Penal Code');
  });

  // Test 9: Foreign Unsupported Legal Queries
  it('handles foreign municipal law queries with accurate scope boundary explanation', async () => {
    const res = await generateLegalResponse('California labor law at will employment');

    expect(res.status).toBe('unsupported-scope');
    expect(res.detectedIntent).toBe('unsupported_legal_query');
    expect(res.summary).toContain('falls outside Nyayota’s curated legal collection');
    expect(res.structuredExplanation).toContain('foreign municipal jurisdictions');
    expect(res.sources).toHaveLength(0);
  });

  // Test 10: No-Match Results with Distinction from Non-Existence
  it('distinguishes between not found in Nyayota index vs. does not exist in law', async () => {
    const res = await generateLegalResponse('Admiralty Maritime Prize Salvage Act 1912 Section 999');

    expect(res.status).toBe('no-records-found');
    expect(res.headline).toContain('No Matching Provisions Found');
    expect(res.structuredExplanation).toContain('Indexed Absence vs. Legal Reality');
    expect(res.structuredExplanation).toContain('does **NOT** mean that this statute or provision does not exist in Bangladesh law');
  });

  // Test 11: Conversational Greetings
  it('handles greetings politely without performing unnecessary retrieval', async () => {
    const res = await generateLegalResponse('Hello');

    expect(res.status).toBe('conversational');
    expect(res.detectedIntent).toBe('greeting');
    expect(res.headline).toContain('Welcome to Nyayota');
    expect(res.headlineBn).toContain('স্বাগতম');
    expect(res.sources).toHaveLength(0);
  });

  // Test 12: Website Platform Help & Error Reporting
  it('provides platform help with official contact email nyayota.contact@gmail.com', async () => {
    const res = await generateLegalResponse('How do I report a mistake in a law?');

    expect(res.status).toBe('conversational');
    expect(res.detectedIntent).toBe('nyayota_help');
    expect(res.structuredExplanation).toContain('nyayota.contact@gmail.com');
    expect(res.structuredExplanationBn).toContain('nyayota.contact@gmail.com');
    expect(res.structuredExplanation).toContain('/bangladesh-laws');
  });

  // Test 13: Out of Scope Non-Legal Queries
  it('politely redirects non-legal queries to legal research topics', async () => {
    const res = await generateLegalResponse('Write a python function to sort an array');

    expect(res.status).toBe('out-of-scope');
    expect(res.detectedIntent).toBe('out_of_scope');
    expect(res.summary).toContain('does not answer non-legal questions');
    expect(res.structuredExplanation).toContain('Suggested Legal Inquiries');
    expect(res.sources).toHaveLength(0);
  });

  // Test 14: Unknown or Gibberish Input
  it('handles unintelligible input safely with search suggestions', async () => {
    const res = await generateLegalResponse('asdfasdfasdf');

    expect(res.status).toBe('unintelligible');
    expect(res.detectedIntent).toBe('unknown');
    expect(res.headline).toContain('Could Not Be Understood');
    expect(res.structuredExplanation).toContain('How to Structure Your Query');
    expect(res.sources).toHaveLength(0);
  });
});
