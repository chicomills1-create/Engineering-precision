import { createHmac, createHash, randomBytes, timingSafeEqual } from "node:crypto";

/**
 * Bot verification for the public callback assistant.
 *
 * Flow:
 * 1. The widget solves an invisible Cloudflare Turnstile challenge and sends
 *    the token (`botToken`) with the first message.
 * 2. We verify the token server-side against Cloudflare's siteverify API.
 * 3. On success we mint a short-lived, HMAC-signed conversation stamp bound
 *    to a random conversation ID and the caller's IP. The client echoes it
 *    back on subsequent turns, so each conversation needs exactly one
 *    challenge — but the stamp cannot be reused for new conversations at
 *    scale: it is IP-bound and capped at a per-conversation turn budget.
 *
 * In production (NODE_ENV=production), TURNSTILE_SECRET_KEY and
 * SESSION_SECRET are required — startup fails loudly if either is missing.
 * In development, Cloudflare's official "always passes" test secret is used
 * so local work needs zero setup.
 */

// Cloudflare's documented always-pass test secret (dev fallback only)
const TURNSTILE_TEST_SECRET = "1x0000000000000000000000000000000AA";
const IS_PROD = process.env.NODE_ENV === "production";

if (IS_PROD && (!process.env.TURNSTILE_SECRET_KEY || !process.env.SESSION_SECRET)) {
  throw new Error(
    "Bot verification misconfigured: TURNSTILE_SECRET_KEY and SESSION_SECRET are required in production.",
  );
}

const TURNSTILE_SECRET = process.env.TURNSTILE_SECRET_KEY || TURNSTILE_TEST_SECRET;
const SIGNING_SECRET =
  process.env.SESSION_SECRET || randomBytes(32).toString("hex"); // dev-only ephemeral fallback

const SESSION_TTL_MS = 30 * 60 * 1000; // one conversation's worth
const MAX_TURNS_PER_SESSION = 25; // a legit conversation is far shorter

export async function verifyTurnstileToken(token: string, ip: string): Promise<boolean> {
  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      secret: TURNSTILE_SECRET,
      response: token,
      ...(ip && ip !== "unknown" ? { remoteip: ip } : {}),
    }),
  });
  if (!res.ok) return false;
  const data = (await res.json()) as { success?: boolean };
  return data.success === true;
}

function sign(payload: string): string {
  return createHmac("sha256", SIGNING_SECRET).update(payload).digest("base64url");
}

function ipHash(ip: string): string {
  return createHash("sha256").update(`${SIGNING_SECRET}:${ip}`).digest("base64url").slice(0, 16);
}

// Per-conversation turn counter (in-memory, mirrors the in-memory rate limiter)
const sessionUse = new Map<string, { count: number; exp: number }>();

function bumpSessionUse(convId: string, exp: number): boolean {
  const now = Date.now();
  const entry = sessionUse.get(convId) ?? { count: 0, exp };
  entry.count += 1;
  sessionUse.set(convId, entry);
  if (sessionUse.size > 10_000) {
    for (const [k, v] of sessionUse) if (v.exp < now) sessionUse.delete(k);
  }
  return entry.count <= MAX_TURNS_PER_SESSION;
}

/** Mint a signed conversation stamp bound to the caller's IP. */
export function mintChatSession(ip: string): string {
  const convId = randomBytes(12).toString("base64url");
  const exp = String(Date.now() + SESSION_TTL_MS);
  const payload = `${convId}.${exp}.${ipHash(ip)}`;
  return `${payload}.${sign(payload)}`;
}

/**
 * Validate a stamp: signature, expiry, IP binding, and per-conversation
 * turn budget must all hold.
 */
export function isValidChatSession(session: string, ip: string): boolean {
  const parts = session.split(".");
  if (parts.length !== 4) return false;
  const [convId, exp, hash, sig] = parts;
  if (!/^\d+$/.test(exp) || Number(exp) < Date.now()) return false;
  const payload = `${convId}.${exp}.${hash}`;
  const expected = sign(payload);
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return false;
  if (hash !== ipHash(ip)) return false;
  return bumpSessionUse(convId, Number(exp));
}
