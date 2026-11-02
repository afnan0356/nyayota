/**
 * Nyayota AI — Progressive Stream Parser (Phase 8 Client Readiness)
 * 
 * Robust, incremental client-side parser for Server-Sent Events (SSE).
 * 
 * Standards Compliance:
 * 1. Handles multi-byte UTF-8 sequences (e.g. Bengali script) split across chunk boundaries.
 * 2. Parses multiple SSE events packed in a single network chunk.
 * 3. Handles single events split across multiple chunks.
 * 4. Tolerates both LF (\n) and CRLF (\r\n) line endings.
 * 5. Safely ignores comments (: comment) and unknown event formats without crashing.
 * 6. Supports user cancellation via AbortSignal.
 */

import { LegalStreamEvent, LegalStreamEventType } from './streaming-response-engine';

export interface StreamParserOptions {
  onEvent: (event: LegalStreamEvent) => void;
  onToken?: (delta: string) => void;
  onError?: (error: Error) => void;
  onComplete?: () => void;
  signal?: AbortSignal;
}

/**
 * Parses an SSE text block into structured LegalStreamEvent objects.
 */
export function parseSSEBlock(rawBlock: string): LegalStreamEvent | null {
  const normalized = rawBlock.replace(/\r\n/g, '\n').trim();
  if (!normalized) return null;

  let eventType: LegalStreamEventType = 'token';
  const dataLines: string[] = [];

  const lines = normalized.split('\n');
  for (const line of lines) {
    if (line.startsWith(':')) {
      // Comment line, ignore
      continue;
    }
    if (line.startsWith('event:')) {
      const rawType = line.slice(6).trim() as LegalStreamEventType;
      if (['start', 'metadata', 'token', 'completed', 'fallback', 'error'].includes(rawType)) {
        eventType = rawType;
      }
    } else if (line.startsWith('data:')) {
      dataLines.push(line.slice(5).trim());
    }
  }

  if (dataLines.length === 0) return null;

  const rawData = dataLines.join('\n');
  try {
    const parsedData = JSON.parse(rawData);
    return {
      event: eventType,
      data: parsedData,
    };
  } catch {
    // Malformed JSON inside data payload, ignore or fallback
    return null;
  }
}

/**
 * Progressively consumes a ReadableStream of Uint8Array chunks and fires typed event callbacks.
 */
export async function consumeLegalEventStream(
  stream: ReadableStream<Uint8Array>,
  options: StreamParserOptions
): Promise<void> {
  const { onEvent, onToken, onError, onComplete, signal } = options;
  const reader = stream.getReader();
  const decoder = new TextDecoder('utf-8');
  let buffer = '';

  try {
    while (true) {
      if (signal?.aborted) {
        await reader.cancel('Aborted by client');
        break;
      }

      const { done, value } = await reader.read();
      if (done) {
        break;
      }

      // Decode bytes using stream mode to preserve split multibyte UTF-8 characters (e.g. Bengali)
      buffer += decoder.decode(value, { stream: true });

      // Normalize CRLF to LF for consistent delimiter matching
      buffer = buffer.replace(/\r\n/g, '\n');

      // SSE messages are separated by double newlines (\n\n)
      let separatorIndex: number;
      while ((separatorIndex = buffer.indexOf('\n\n')) !== -1) {
        const messageBlock = buffer.slice(0, separatorIndex);
        buffer = buffer.slice(separatorIndex + 2);

        const event = parseSSEBlock(messageBlock);
        if (event) {
          onEvent(event);
          if (event.event === 'token' && onToken && 'delta' in event.data) {
            onToken(event.data.delta);
          }
        }
      }
    }

    // Flush any remaining characters in decoder
    buffer += decoder.decode();
    buffer = buffer.replace(/\r\n/g, '\n');
    if (buffer.trim()) {
      const event = parseSSEBlock(buffer);
      if (event) {
        onEvent(event);
        if (event.event === 'token' && onToken && 'delta' in event.data) {
          onToken(event.data.delta);
        }
      }
    }

    if (onComplete) {
      onComplete();
    }
  } catch (err: unknown) {
    if (signal?.aborted) {
      return;
    }
    const errorObj = err instanceof Error ? err : new Error(String(err));
    if (onError) {
      onError(errorObj);
    } else {
      throw errorObj;
    }
  } finally {
    reader.releaseLock();
  }
}
