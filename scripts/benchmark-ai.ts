/**
 * Nyayota AI — Performance Benchmark & Profiling Tool (Phase 7)
 * 
 * Accurately measures latency across pipeline operations:
 * 1. Query normalization
 * 2. Context construction
 * 3. Conversational routing
 * 4. Reference resolution
 * 5. Statutory retrieval
 * 6. Prompt construction
 * 7. Model-generation wrapper (mock client)
 * 8. Response sanitization
 * 9. Deterministic fallback
 * 10. Full pipeline execution
 */

import { performance } from 'perf_hooks';
import {
  normalizeConversationalText,
  buildConversationContext,
  routeConversationalQuery,
  resolveContextualReference,
  retrieveLegalSources,
  buildSystemInstruction,
  formatGeminiContents,
  sanitizeGeneratedResponse,
  executeNyayotaAIPipeline,
  generateNaturalConversationalResponse,
  ServiceChatMessage,
  DeterministicSourceCitation,
} from '../lib/nyayota-ai';

interface BenchmarkStat {
  runs: number;
  avgMs: number;
  medianMs: number;
  p95Ms: number;
  minMs: number;
  maxMs: number;
}

function calculateStats(samples: number[]): BenchmarkStat {
  if (samples.length === 0) {
    return { runs: 0, avgMs: 0, medianMs: 0, p95Ms: 0, minMs: 0, maxMs: 0 };
  }
  const sorted = [...samples].sort((a, b) => a - b);
  const sum = sorted.reduce((acc, val) => acc + val, 0);
  const avg = sum / sorted.length;
  const median = sorted[Math.floor(sorted.length / 2)];
  const p95 = sorted[Math.floor(sorted.length * 0.95)];
  return {
    runs: sorted.length,
    avgMs: Number(avg.toFixed(3)),
    medianMs: Number(median.toFixed(3)),
    p95Ms: Number(p95.toFixed(3)),
    minMs: Number(sorted[0].toFixed(3)),
    maxMs: Number(sorted[sorted.length - 1].toFixed(3)),
  };
}

const BENCHMARK_QUERIES = [
  'Hello',
  'What is negligence in law?',
  'What is Section 300 of the Penal Code?',
  'CrPC Section 54',
  'What is its punishment?',
  'Compare Section 300 and Section 304 of Penal Code',
  'দণ্ডবিধির ধারা ৩০২ এর বিধান কী?',
  'Section 302 er shasti ki?',
  'What is Section 420 under Indian Penal Code?',
  'Section 54',
];

const SAMPLE_HISTORY: ServiceChatMessage[] = [
  { role: 'user', content: 'Tell me about Section 300 of the Penal Code.' },
  { role: 'assistant', content: 'Section 300 defines culpable homicide amounting to murder.' },
];

async function runBenchmark(iterations = 100) {
  console.log(`Running Nyayota AI Pipeline Benchmark (${iterations} iterations per query)...\n`);

  // 1. Query Normalization
  const normSamples: number[] = [];
  for (let i = 0; i < iterations; i++) {
    for (const q of BENCHMARK_QUERIES) {
      const t0 = performance.now();
      normalizeConversationalText(q);
      normSamples.push(performance.now() - t0);
    }
  }

  // 2. Context Construction
  const contextSamples: number[] = [];
  for (let i = 0; i < iterations; i++) {
    const t0 = performance.now();
    buildConversationContext(SAMPLE_HISTORY);
    contextSamples.push(performance.now() - t0);
  }

  // 3. Conversational Routing
  const routingSamples: number[] = [];
  const testContext = buildConversationContext(SAMPLE_HISTORY);
  for (let i = 0; i < iterations; i++) {
    for (const q of BENCHMARK_QUERIES) {
      const t0 = performance.now();
      routeConversationalQuery(q, testContext);
      routingSamples.push(performance.now() - t0);
    }
  }

  // 4. Reference Resolution
  const refSamples: number[] = [];
  for (let i = 0; i < iterations; i++) {
    for (const q of BENCHMARK_QUERIES) {
      const t0 = performance.now();
      resolveContextualReference(q, testContext);
      refSamples.push(performance.now() - t0);
    }
  }

  // 5. Statutory Retrieval
  const retrievalSamples: number[] = [];
  for (let i = 0; i < iterations; i++) {
    for (const q of BENCHMARK_QUERIES) {
      const t0 = performance.now();
      retrieveLegalSources(q);
      retrievalSamples.push(performance.now() - t0);
    }
  }

  // 6. Prompt Construction
  const promptSamples: number[] = [];
  const sampleDecision = routeConversationalQuery('Section 300 of Penal Code', testContext);
  const sampleRetrieval = retrieveLegalSources('Section 300 of Penal Code');
  const sampleSources: DeterministicSourceCitation[] = sampleRetrieval.results.map((r) => ({
    sourceId: r.sourceId,
    title: r.displayTitle,
    titleBn: r.displayTitleBn,
    identifier: r.identifier,
    recordType: r.recordType,
    sourceCompleteness: r.sourceCompleteness,
    jurisdiction: r.jurisdiction,
    internalUrl: r.internalDestination,
    officialUrl: r.officialSourceUrl,
    officialGazetteRef: r.officialGazetteRef,
    status: r.status,
    repealNote: r.repealNote,
    isCuratedSubset: r.sourceCompleteness === 'curated-section-subset',
    verbatimExcerpt: r.matchingText,
    verbatimExcerptBn: r.matchingTextBn,
  }));

  for (let i = 0; i < iterations; i++) {
    const t0 = performance.now();
    buildSystemInstruction(testContext, sampleDecision, sampleSources, 'both');
    formatGeminiContents('What is murder?', testContext);
    promptSamples.push(performance.now() - t0);
  }

  // 7. Model-Generation Wrapper (Mocked Client — External API unmeasured)
  const modelWrapperSamples: number[] = [];
  const mockClient = {
    models: {
      generateContent: async () => ({ text: 'Mocked statutory legal explanation' }),
    },
  };
  for (let i = 0; i < iterations; i++) {
    const t0 = performance.now();
    await generateNaturalConversationalResponse({
      query: 'Section 300 of Penal Code',
      context: testContext,
      decision: sampleDecision,
      sources: sampleSources,
      genAiClient: mockClient,
    });
    modelWrapperSamples.push(performance.now() - t0);
  }

  // 8. Response Sanitization
  const sanitizationSamples: number[] = [];
  const sampleText = 'PRIMARY DIRECTIVES & BOUNDARIES: I am your attorney and will represent you in court. Under Section 300 of Penal Code, culpable homicide is murder.';
  for (let i = 0; i < iterations * 10; i++) {
    const t0 = performance.now();
    sanitizeGeneratedResponse(sampleText);
    sanitizationSamples.push(performance.now() - t0);
  }

  // 9. Deterministic Fallback Pipeline
  const fallbackSamples: number[] = [];
  for (let i = 0; i < iterations; i++) {
    for (const q of BENCHMARK_QUERIES) {
      const t0 = performance.now();
      await executeNyayotaAIPipeline({
        query: q,
        messages: SAMPLE_HISTORY,
        generateNaturalResponse: false,
      });
      fallbackSamples.push(performance.now() - t0);
    }
  }

  // 10. Full Pipeline Execution with Natural Engine Wrapper (Mocked)
  const fullPipelineSamples: number[] = [];
  for (let i = 0; i < iterations; i++) {
    for (const q of BENCHMARK_QUERIES) {
      const t0 = performance.now();
      await executeNyayotaAIPipeline({
        query: q,
        messages: SAMPLE_HISTORY,
        generateNaturalResponse: true,
        genAiClient: mockClient,
      });
      fullPipelineSamples.push(performance.now() - t0);
    }
  }

  const results = {
    queryNormalization: calculateStats(normSamples),
    contextConstruction: calculateStats(contextSamples),
    conversationalRouting: calculateStats(routingSamples),
    referenceResolution: calculateStats(refSamples),
    statutoryRetrieval: calculateStats(retrievalSamples),
    promptConstruction: calculateStats(promptSamples),
    modelWrapperMocked: calculateStats(modelWrapperSamples),
    responseSanitization: calculateStats(sanitizationSamples),
    deterministicFallback: calculateStats(fallbackSamples),
    fullPipelineMocked: calculateStats(fullPipelineSamples),
  };

  console.log('=== NYAYOTA AI PERFORMANCE BENCHMARK REPORT ===');
  console.table(results);
  console.log('\nJSON Output:');
  console.log(JSON.stringify(results, null, 2));
}

runBenchmark().catch(console.error);
