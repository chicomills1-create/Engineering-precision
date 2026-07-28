import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Signed, per-subscriber unsubscribe tokens.
 *
 * Token = hex(HMAC-SHA256(secret, "unsubscribe:" + lowercased email)).
 * Deterministic and non-expiring, so every email we ever send for a given
 * address carries the same valid link.
 */

function getSecret(): string | undefined {
  return process.env.UNSUBSCRIBE_SECRET || process.env.SESSION_SECRET;
}

export function makeUnsubscribeToken(email: string): string | undefined {
  const secret = getSecret();
  if (!secret) return undefined;
  return createHmac("sha256", secret)
    .update(`unsubscribe:${email.trim().toLowerCase()}`)
    .digest("hex");
}

export function verifyUnsubscribeToken(email: string, token: string): boolean {
  const expected = makeUnsubscribeToken(email);
  if (!expected) return false;
  const a = Buffer.from(token, "utf8");
  const b = Buffer.from(expected, "utf8");
  return a.length === b.length && timingSafeEqual(a, b);
}

/** Public site base URL for links embedded in outgoing emails. */
export function getPublicBaseUrl(): string {
  const explicit = process.env.PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/+$/, "");
  const domain =
    process.env.REPLIT_DOMAINS?.split(",")[0] ||
    process.env.REPLIT_DEV_DOMAIN;
  return domain ? `https://${domain}` : "";
}

/** Full one-click unsubscribe URL, or undefined when no signing secret is set. */
export function makeUnsubscribeUrl(email: string): string | undefined {
  const token = makeUnsubscribeToken(email);
  if (!token) return undefined;
  const base = getPublicBaseUrl();
  const params = new URLSearchParams({ email: email.trim().toLowerCase(), token });
  return `${base}/unsubscribe?${params.toString()}`;
}

/**
 * API endpoint URL for RFC 8058 one-click unsubscribe headers. Mail providers
 * POST to this URL in the background (no JSON body), so it must hit the API
 * server directly rather than the human-facing /unsubscribe page.
 */
export function makeOneClickUnsubscribeUrl(email: string): string | undefined {
  const token = makeUnsubscribeToken(email);
  if (!token) return undefined;
  const base = getPublicBaseUrl();
  const params = new URLSearchParams({ email: email.trim().toLowerCase(), token });
  return `${base}/api/subscribers/one-click-unsubscribe?${params.toString()}`;
}
