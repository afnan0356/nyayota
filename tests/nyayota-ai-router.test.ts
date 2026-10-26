/**
 * Nyayota AI — Intent Classification & Query Router Unit Tests
 * 
 * Tests the 10 intent categories, Bengali numeral normalization,
 * strict IPC jurisdiction safety rules, disambiguation handling,
 * and deterministic routing.
 */

import { describe, expect, it } from 'bun:test';
import {
  classifyIntent,
  normalizeQuery,
  routeQuery,
} from '../lib/nyayota-ai';

describe('Nyayota AI — Intent Classifier', () => {
  it('normalizes queries and converts Bengali numerals accurately', () => {
    expect(normalizeQuery('  Section  302  ')).toBe('section 302');
    // Bengali numeral conversion (৩০২ -> 302, ৫৪ -> 54)
    expect(normalizeQuery('ধারা ৩০২')).toBe('ধারা 302');
    expect(normalizeQuery('ফৌজদারি কার্যবিধি ধারা ৫৪')).toBe('ফৌজদারি কার্যবিধি ধারা 54');
    expect(normalizeQuery('ধারা ৯৭')).toBe('ধারা 97');
  });

  it('classifies simple greetings in English and Bengali', () => {
    const greetingEn = classifyIntent('Hello');
    expect(greetingEn.primaryIntent).toBe('greeting');
    expect(greetingEn.suggestedProcessingPath).toBe('greeting_handler');

    const greetingBn1 = classifyIntent('নমস্কার');
    expect(greetingBn1.primaryIntent).toBe('greeting');
    expect(greetingBn1.suggestedProcessingPath).toBe('greeting_handler');

    const greetingBn2 = classifyIntent('আসসালামু আলাইকুম');
    expect(greetingBn2.primaryIntent).toBe('greeting');
    expect(greetingBn2.suggestedProcessingPath).toBe('greeting_handler');

    // Greeting mixed with substantive legal question must NOT be classified as pure greeting
    const greetingWithLaw = classifyIntent('Hello, what is Section 302 of Penal Code?');
    expect(greetingWithLaw.primaryIntent).toBe('direct_legal_reference');
  });

  it('classifies platform help and error reporting queries with official contact', () => {
    const help1 = classifyIntent('How do I report a mistake in a law?');
    expect(help1.primaryIntent).toBe('nyayota_help');
    expect(help1.suggestedProcessingPath).toBe('nyayota_help_handler');

    const help2 = classifyIntent('What is Nyayota?');
    expect(help2.primaryIntent).toBe('nyayota_help');

    const help3 = classifyIntent('What languages are supported on this site?');
    expect(help3.primaryIntent).toBe('nyayota_help');

    const helpBn = classifyIntent('ন্যায়তা কিভাবে ব্যবহার করব?');
    expect(helpBn.primaryIntent).toBe('nyayota_help');
  });

  it('strictly enforces the IPC jurisdiction safety rule (Rule 4)', () => {
    // Queries referencing "IPC" must be flagged as Indian jurisdiction and require clarification
    const ipcQuery = classifyIntent('What is Section 302 of IPC?');
    expect(ipcQuery.detectedJurisdiction).toBe('India');
    expect(ipcQuery.primaryIntent).toBe('clarification_needed');
    expect(ipcQuery.suggestedProcessingPath).toBe('clarification_handler');
    expect(ipcQuery.requiresClarification).toBe(true);
    expect(ipcQuery.clarificationPrompt).toContain('Indian Penal Code');
    expect(ipcQuery.clarificationPrompt).toContain('The Penal Code, 1860');
    expect(ipcQuery.clarificationPrompt).toContain('Bangladesh');

    // Bengali IPC reference
    const ipcBn = classifyIntent('আইপিসি ধারা ৪২০ কি?');
    expect(ipcBn.detectedJurisdiction).toBe('India');
    expect(ipcBn.primaryIntent).toBe('clarification_needed');
  });

  it('identifies standalone section numbers without Act as clarification_needed', () => {
    // English standalone section
    const standaloneEn = classifyIntent('Section 54');
    expect(standaloneEn.primaryIntent).toBe('clarification_needed');
    expect(standaloneEn.suggestedProcessingPath).toBe('clarification_handler');
    expect(standaloneEn.requiresClarification).toBe(true);
    expect(standaloneEn.detectedSectionNumber).toBe('54');
    expect(standaloneEn.clarificationPrompt).toContain('Section 54');

    // Bengali standalone section with Bengali numerals (ধারা ৫৪)
    const standaloneBn = classifyIntent('ধারা ৫৪');
    expect(standaloneBn.primaryIntent).toBe('clarification_needed');
    expect(standaloneBn.suggestedProcessingPath).toBe('clarification_handler');
    expect(standaloneBn.requiresClarification).toBe(true);
    expect(standaloneBn.detectedSectionNumber).toBe('54');
  });

  it('classifies direct legal references when Act and Section are provided', () => {
    const direct1 = classifyIntent('Section 302 of Penal Code');
    expect(direct1.primaryIntent).toBe('direct_legal_reference');
    expect(direct1.suggestedProcessingPath).toBe('retrieval_engine');
    expect(direct1.detectedJurisdiction).toBe('Bangladesh');

    const direct2 = classifyIntent('CrPC Section 54');
    expect(direct2.primaryIntent).toBe('direct_legal_reference');
    expect(direct2.suggestedProcessingPath).toBe('retrieval_engine');

    const directBn = classifyIntent('দণ্ডবিধি ধারা ৩০২');
    expect(directBn.primaryIntent).toBe('direct_legal_reference');
    expect(directBn.detectedSectionNumber).toBe('302');
  });

  it('classifies statute overview inquiries', () => {
    const overview1 = classifyIntent('Tell me about the Penal Code 1860');
    expect(overview1.primaryIntent).toBe('statute_overview');
    expect(overview1.suggestedProcessingPath).toBe('retrieval_engine');

    const overviewBn = classifyIntent('চুক্তি আইন ১৮৭২ পরিচিতি');
    expect(overviewBn.primaryIntent).toBe('statute_overview');
  });

  it('classifies legal concept and glossary inquiries', () => {
    const concept1 = classifyIntent('What is Habeas Corpus?');
    expect(concept1.primaryIntent).toBe('legal_concept');
    expect(concept1.suggestedProcessingPath).toBe('retrieval_engine');

    const concept2 = classifyIntent('Define Mens Rea');
    expect(concept2.primaryIntent).toBe('legal_concept');

    const conceptBn = classifyIntent('জামিন কি?');
    expect(conceptBn.primaryIntent).toBe('legal_concept');
  });

  it('classifies citizen legal procedural scenarios', () => {
    const scenario1 = classifyIntent('How to file a GD in police station?');
    expect(scenario1.primaryIntent).toBe('legal_scenario');
    expect(scenario1.suggestedProcessingPath).toBe('retrieval_engine');

    const scenarioBn = classifyIntent('চেক ডিজঅনার হলে করণীয় কি?');
    expect(scenarioBn.primaryIntent).toBe('legal_scenario');
  });

  it('routes unsupported foreign legal queries accurately', () => {
    const foreign = classifyIntent('California labor law at will employment');
    expect(foreign.primaryIntent).toBe('unsupported_legal_query');
    expect(foreign.suggestedProcessingPath).toBe('unsupported_legal_handler');
  });

  it('routes completely out-of-scope queries (programming, weather, trivia)', () => {
    const coding = classifyIntent('Write a python function to sort an array');
    expect(coding.primaryIntent).toBe('out_of_scope');
    expect(coding.suggestedProcessingPath).toBe('out_of_scope_handler');

    const recipe = classifyIntent('Recipe for kacchi biryani');
    expect(recipe.primaryIntent).toBe('out_of_scope');

    const weather = classifyIntent('What is the weather today?');
    expect(weather.primaryIntent).toBe('out_of_scope');
  });

  it('identifies unknown/gibberish queries safely', () => {
    const empty = classifyIntent('');
    expect(empty.primaryIntent).toBe('unknown');
    expect(empty.suggestedProcessingPath).toBe('unknown_handler');

    const gibberish = classifyIntent('asdfasdfasdf');
    expect(gibberish.primaryIntent).toBe('unknown');
    expect(gibberish.suggestedProcessingPath).toBe('unknown_handler');
  });
});

describe('Nyayota AI — Query Router Execution', () => {
  it('handles greeting deterministically with bilingual responses', async () => {
    const res = await routeQuery('Hello');
    expect(res.status).toBe('handled-deterministically');
    expect(res.processingPath).toBe('greeting_handler');
    expect(res.deterministicMessage).toContain('Nyayota AI');
    expect(res.deterministicMessageBn).toContain('ন্যায়তা এআই');
    expect(res.retrievalResponse).toBeUndefined();
  });

  it('provides platform help with official contact email nyayota.contact@gmail.com', async () => {
    const res = await routeQuery('How to report an error?');
    expect(res.status).toBe('handled-deterministically');
    expect(res.processingPath).toBe('nyayota_help_handler');
    expect(res.deterministicMessage).toContain('nyayota.contact@gmail.com');
    expect(res.deterministicMessageBn).toContain('nyayota.contact@gmail.com');
  });

  it('handles IPC query via clarification without falsely returning Bangladesh Penal Code directly', async () => {
    const res = await routeQuery('What does IPC 302 say?');
    expect(res.status).toBe('clarification-required');
    expect(res.processingPath).toBe('clarification_handler');
    expect(res.clarificationPrompt).toBeDefined();
    expect(res.clarificationPrompt).toContain('Indian Penal Code');
    expect(res.clarificationPrompt).toContain('The Penal Code, 1860');
    expect(res.clarificationOptions?.length).toBeGreaterThan(0);
  });

  it('handles out-of-scope queries politely without external LLM calls', async () => {
    const res = await routeQuery('Write python script');
    expect(res.status).toBe('out-of-scope');
    expect(res.processingPath).toBe('out_of_scope_handler');
    expect(res.deterministicMessage).toContain('strictly dedicated to Bangladesh statutory laws');
  });

  it('routes valid legal reference query to the retrieval engine and returns verified records', async () => {
    const res = await routeQuery('Section 300 of Penal Code');
    expect(res.status).toBe('routed-to-retrieval');
    expect(res.processingPath).toBe('retrieval_engine');
    expect(res.retrievalResponse).toBeDefined();
    expect(res.retrievalResponse?.totalMatches).toBeGreaterThan(0);
    const provisionResult = res.retrievalResponse?.results.find(
      (r) => r.recordType === 'statutory-provision'
    );
    expect(provisionResult).toBeDefined();
    expect(provisionResult?.sourceId).toBe('bd-penal-code-1860');
    expect(provisionResult?.identifier).toContain('300');
  });

  it('distinguishes between not found in Nyayota index vs. does not exist in law', async () => {
    const res = await routeQuery('Admiralty Maritime Prize Salvage Act 1912 Section 999');
    expect(res.status).toBe('routed-to-retrieval');
    expect(res.retrievalResponse?.totalMatches).toBe(0);
    expect(res.deterministicMessage).toContain('not yet be indexed in Nyayota');
    expect(res.deterministicMessage).toContain('does not mean the provision does not exist in Bangladesh law');
  });
});
