/**
 * Time-limited HMAC download tokens for private object storage.
 *
 * Token format (URL-safe base64): `<expiry_ms_hex>.<hmac_hex>`
 *   expiry — Unix timestamp in milliseconds when the token expires
 *   hmac   — HMAC-SHA256(SESSION_SECRET, `${objectPath}:${expiry}`)
 *
 * Tokens are stateless — any server that knows SESSION_SECRET can verify them.
 * Rotating SESSION_SECRET invalidates all outstanding tokens.
 */
import { createHmac, timingSafeEqual } from "crypto";

const DEFAULT_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

function getSecret(): string {
  const secret = process.env.SESSION_SECRET;
  if (!secret) throw new Error("SESSION_SECRET is not configured");
  return secret;
}

function computeHmac(secret: string, objectPath: string, expiry: number): string {
  return createHmac("sha256", secret)
    .update(`${objectPath}:${expiry}`)
    .digest("hex");
}

/** Generate a signed, time-limited download token for the given object path. */
export function signDownloadPath(objectPath: string, ttlMs = DEFAULT_TTL_MS): string {
  const expiry = Date.now() + ttlMs;
  const hmac = computeHmac(getSecret(), objectPath, expiry);
  return `${expiry.toString(16)}.${hmac}`;
}

/** Verify a download token. Returns true if valid and not expired. */
export function verifyDownloadToken(objectPath: string, token: string): boolean {
  try {
    const dotIndex = token.indexOf(".");
    if (dotIndex === -1) return false;

    const expiryHex = token.slice(0, dotIndex);
    const suppliedHmac = token.slice(dotIndex + 1);
    const expiry = parseInt(expiryHex, 16);

    if (isNaN(expiry) || Date.now() > expiry) return false;

    const expectedHmac = computeHmac(getSecret(), objectPath, expiry);
    // Constant-time comparison to prevent timing attacks
    const a = Buffer.from(suppliedHmac, "hex");
    const b = Buffer.from(expectedHmac, "hex");
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}
