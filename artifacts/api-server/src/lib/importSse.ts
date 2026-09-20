import type { Response } from "express";

/** Headers that keep an event stream unbuffered through proxies. */
export const IMPORT_SSE_HEADERS = {
  "Content-Type": "text/event-stream",
  "Cache-Control": "no-cache, no-transform",
  Connection: "keep-alive",
  "X-Accel-Buffering": "no",
} as const;

/**
 * Write one Server-Sent Events frame (`event: <name>` + JSON `data:`).
 * Never throws: when the client has disconnected (or the socket errors) the
 * write is skipped and `false` is returned, so a long-running import can
 * continue to completion unattended instead of dying on a dead socket.
 */
export function sendImportEvent(res: Response, event: string, data: unknown): boolean {
  if (res.writableEnded || res.destroyed) return false;
  try {
    res.write(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`);
    return true;
  } catch {
    return false;
  }
}
