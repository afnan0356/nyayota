/**
 * Nyayota Stream-Level Bounded Request Body Reader
 *
 * Implements defensive stream consumption for NextRequest:
 * - Enforces the 32 KB (32,768 bytes) limit while reading the stream chunks.
 * - Stops reading and aborts the stream immediately if total bytes exceed limit,
 *   returning HTTP 413 Payload Too Large before memory exhaustion occurs.
 * - Does not rely solely on Content-Length header, which can be omitted or spoofed.
 * - Safely handles malformed JSON, stream interruptions, and character decoding errors.
 */

import { NextRequest } from 'next/server';

export interface BoundedJsonResult<T = Record<string, unknown>> {
  success: boolean;
  data?: T;
  error?: string;
  statusCode: number;
  byteLength?: number;
}

export const MAX_REQUEST_BODY_BYTES = 32768; // 32 KB

/**
 * Reads a JSON request body from NextRequest with stream-level byte bounds.
 */
export async function readBoundedJson<T = Record<string, unknown>>(
  req: NextRequest,
  maxBytes: number = MAX_REQUEST_BODY_BYTES
): Promise<BoundedJsonResult<T>> {
  // 1. If stream reader is available on req.body
  if (req.body && typeof req.body.getReader === 'function') {
    const reader = req.body.getReader();
    const chunks: Uint8Array[] = [];
    let totalBytes = 0;

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        if (value) {
          totalBytes += value.byteLength;
          if (totalBytes > maxBytes) {
            // Cancel stream immediately to abort upstream transmission
            try {
              await reader.cancel('PAYLOAD_TOO_LARGE');
            } catch {
              // Reader cancellation best-effort
            }
            return {
              success: false,
              error: `Payload exceeds maximum permitted size of ${Math.round(maxBytes / 1024)}KB.`,
              statusCode: 413,
              byteLength: totalBytes,
            };
          }
          chunks.push(value);
        }
      }
    } catch (streamError: unknown) {
      const msg = streamError instanceof Error ? streamError.message : 'Stream read error';
      return {
        success: false,
        error: `Request stream reading failed: ${msg}`,
        statusCode: 400,
      };
    } finally {
      try {
        reader.releaseLock();
      } catch {
        // Lock release best-effort
      }
    }

    if (totalBytes === 0) {
      return {
        success: false,
        error: 'Request body cannot be empty.',
        statusCode: 400,
        byteLength: 0,
      };
    }

    // Combine chunks
    const merged = new Uint8Array(totalBytes);
    let offset = 0;
    for (const chunk of chunks) {
      merged.set(chunk, offset);
      offset += chunk.byteLength;
    }

    // Decode UTF-8 string
    let decodedText: string;
    try {
      const decoder = new TextDecoder('utf-8', { fatal: true });
      decodedText = decoder.decode(merged);
    } catch {
      return {
        success: false,
        error: 'Payload contains invalid or non-UTF-8 characters.',
        statusCode: 400,
        byteLength: totalBytes,
      };
    }

    // Parse JSON
    try {
      const parsed = JSON.parse(decodedText);
      return {
        success: true,
        data: parsed as T,
        statusCode: 200,
        byteLength: totalBytes,
      };
    } catch {
      return {
        success: false,
        error: 'Malformed JSON payload.',
        statusCode: 400,
        byteLength: totalBytes,
      };
    }
  }

  // 2. Fallback for test harnesses / synthetic requests where req.body stream is already read or synthesized
  try {
    const rawText = await req.text();
    const encoder = new TextEncoder();
    const byteLength = encoder.encode(rawText).length;

    if (byteLength > maxBytes) {
      return {
        success: false,
        error: `Payload exceeds maximum permitted size of ${Math.round(maxBytes / 1024)}KB.`,
        statusCode: 413,
        byteLength,
      };
    }

    if (byteLength === 0 || rawText.trim().length === 0) {
      return {
        success: false,
        error: 'Request body cannot be empty.',
        statusCode: 400,
        byteLength: 0,
      };
    }

    const parsed = JSON.parse(rawText);
    return {
      success: true,
      data: parsed as T,
      statusCode: 200,
      byteLength,
    };
  } catch (parseError: unknown) {
    return {
      success: false,
      error: 'Malformed JSON payload.',
      statusCode: 400,
    };
  }
}
