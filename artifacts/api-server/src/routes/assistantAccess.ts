import { Router, type IRouter, type Request, type Response } from "express";
import { randomBytes, randomUUID, createHash } from "node:crypto";
import { and, desc, eq, gt, isNull, sql } from "drizzle-orm";
import {
  assistantAccessRequestsTable,
  assistantApiTokensTable,
  assistantSessionsTable,
  db,
} from "@workspace/db";
import { getAuth } from "@clerk/express";
import { requireOwnerAuth } from "../middlewares/requireAuth";

const router: IRouter = Router();
const REQUEST_COOKIE = "apex_assistant_request";
const SESSION_COOKIE = "apex_assistant_session";
const REQUEST_TTL_MS = 10 * 60 * 1000;
const SESSION_TTL_MS = 30 * 24 * 60 * 60 * 1000;

function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

function cookieOptions(maxAge: number) {
  return {
    httpOnly: true,
    sameSite: "strict" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge,
  };
}

function clearCookie(res: Response, name: string): void {
  res.clearCookie(name, cookieOptions(0));
}

function sameOrigin(req: Request): boolean {
  const origin = req.get("origin");
  if (!origin) return true;
  try {
    return new URL(origin).host === req.get("host");
  } catch {
    return false;
  }
}

router.post("/assistant-access/requests", async (req, res): Promise<void> => {
  if (!sameOrigin(req)) {
    res.status(403).json({ error: "Invalid origin" });
    return;
  }

  const existingToken = req.cookies?.[REQUEST_COOKIE];
  if (typeof existingToken === "string") {
    const [existing] = await db.select({
      status: assistantAccessRequestsTable.status,
      expiresAt: assistantAccessRequestsTable.expiresAt,
    }).from(assistantAccessRequestsTable).where(and(
      eq(assistantAccessRequestsTable.requestTokenHash, hashToken(existingToken)),
      eq(assistantAccessRequestsTable.status, "pending"),
      gt(assistantAccessRequestsTable.expiresAt, new Date()),
    )).limit(1);
    if (existing) {
      res.json({ status: existing.status, expiresAt: existing.expiresAt.toISOString() });
      return;
    }
  }

  const token = randomBytes(32).toString("base64url");
  const expiresAt = new Date(Date.now() + REQUEST_TTL_MS);
  await db.insert(assistantAccessRequestsTable).values({
    id: randomUUID(),
    requestTokenHash: hashToken(token),
    status: "pending",
    expiresAt,
  });
  res.cookie(REQUEST_COOKIE, token, cookieOptions(REQUEST_TTL_MS));
  res.status(201).json({ status: "pending", expiresAt: expiresAt.toISOString() });
});

router.get("/assistant-access/status", async (req, res): Promise<void> => {
  const sessionToken = req.cookies?.[SESSION_COOKIE];
  if (typeof sessionToken === "string") {
    const [session] = await db.select({ id: assistantSessionsTable.id })
      .from(assistantSessionsTable)
      .where(and(
        eq(assistantSessionsTable.sessionTokenHash, hashToken(sessionToken)),
        isNull(assistantSessionsTable.revokedAt),
        gt(assistantSessionsTable.expiresAt, new Date()),
      )).limit(1);
    if (session) {
      res.json({ status: "authenticated" });
      return;
    }
    clearCookie(res, SESSION_COOKIE);
  }

  const requestToken = req.cookies?.[REQUEST_COOKIE];
  if (typeof requestToken !== "string") {
    res.json({ status: "none" });
    return;
  }

  const requestHash = hashToken(requestToken);
  const [request] = await db.select().from(assistantAccessRequestsTable)
    .where(eq(assistantAccessRequestsTable.requestTokenHash, requestHash)).limit(1);
  if (!request) {
    clearCookie(res, REQUEST_COOKIE);
    res.json({ status: "none" });
    return;
  }

  if (request.status === "pending" && request.expiresAt <= new Date()) {
    await db.update(assistantAccessRequestsTable)
      .set({ status: "expired", decidedAt: new Date() })
      .where(and(
        eq(assistantAccessRequestsTable.id, request.id),
        eq(assistantAccessRequestsTable.status, "pending"),
      ));
    clearCookie(res, REQUEST_COOKIE);
    res.json({ status: "expired" });
    return;
  }

  if (request.status === "approved") {
    const sessionTokenValue = randomBytes(32).toString("base64url");
    const sessionId = randomUUID();
    const expiresAt = new Date(Date.now() + SESSION_TTL_MS);
    const consumed = await db.transaction(async (tx) => {
      const [claimed] = await tx.update(assistantAccessRequestsTable)
        .set({ status: "consumed" })
        .where(and(
          eq(assistantAccessRequestsTable.id, request.id),
          eq(assistantAccessRequestsTable.status, "approved"),
        ))
        .returning({ id: assistantAccessRequestsTable.id });
      if (!claimed) return false;
      await tx.insert(assistantSessionsTable).values({
        id: sessionId,
        sessionTokenHash: hashToken(sessionTokenValue),
        requestId: request.id,
        expiresAt,
      });
      return true;
    });
    if (consumed) {
      res.cookie(SESSION_COOKIE, sessionTokenValue, cookieOptions(SESSION_TTL_MS));
      clearCookie(res, REQUEST_COOKIE);
      res.json({ status: "authenticated" });
      return;
    }
  }

  if (request.status === "denied" || request.status === "expired") {
    clearCookie(res, REQUEST_COOKIE);
  }
  res.json({ status: request.status, expiresAt: request.expiresAt.toISOString() });
});

router.get("/assistant-access/manage", requireOwnerAuth, async (_req, res): Promise<void> => {
  await db.update(assistantAccessRequestsTable)
    .set({ status: "expired", decidedAt: new Date() })
    .where(and(
      eq(assistantAccessRequestsTable.status, "pending"),
      sql`${assistantAccessRequestsTable.expiresAt} <= now()`,
    ));

  const [requests, sessions] = await Promise.all([
    db.select({
      id: assistantAccessRequestsTable.id,
      createdAt: assistantAccessRequestsTable.createdAt,
      expiresAt: assistantAccessRequestsTable.expiresAt,
    }).from(assistantAccessRequestsTable)
      .where(and(
        eq(assistantAccessRequestsTable.status, "pending"),
        gt(assistantAccessRequestsTable.expiresAt, new Date()),
      ))
      .orderBy(desc(assistantAccessRequestsTable.createdAt)),
    db.select({
      id: assistantSessionsTable.id,
      createdAt: assistantSessionsTable.createdAt,
      lastSeenAt: assistantSessionsTable.lastSeenAt,
      expiresAt: assistantSessionsTable.expiresAt,
    }).from(assistantSessionsTable)
      .where(and(
        isNull(assistantSessionsTable.revokedAt),
        gt(assistantSessionsTable.expiresAt, new Date()),
      ))
      .orderBy(desc(assistantSessionsTable.createdAt)),
  ]);

  res.json({
    requests: requests.map((request) => ({
      ...request,
      createdAt: request.createdAt.toISOString(),
      expiresAt: request.expiresAt.toISOString(),
    })),
    sessions: sessions.map((session) => ({
      ...session,
      createdAt: session.createdAt.toISOString(),
      lastSeenAt: session.lastSeenAt.toISOString(),
      expiresAt: session.expiresAt.toISOString(),
    })),
  });
});

router.post("/assistant-access/requests/:id/approve", requireOwnerAuth, async (req, res): Promise<void> => {
  if (!sameOrigin(req)) {
    res.status(403).json({ error: "Invalid origin" });
    return;
  }
  const auth = getAuth(req);
  const [approved] = await db.update(assistantAccessRequestsTable)
    .set({
      status: "approved",
      decidedAt: new Date(),
      decidedByClerkUserId: String(auth.userId),
    })
    .where(and(
      eq(assistantAccessRequestsTable.id, String(req.params.id)),
      eq(assistantAccessRequestsTable.status, "pending"),
      gt(assistantAccessRequestsTable.expiresAt, new Date()),
    ))
    .returning({ id: assistantAccessRequestsTable.id });
  if (!approved) {
    res.status(409).json({ error: "Request is no longer pending" });
    return;
  }
  res.json({ status: "approved" });
});

router.post("/assistant-access/requests/:id/deny", requireOwnerAuth, async (req, res): Promise<void> => {
  if (!sameOrigin(req)) {
    res.status(403).json({ error: "Invalid origin" });
    return;
  }
  const auth = getAuth(req);
  const [denied] = await db.update(assistantAccessRequestsTable)
    .set({
      status: "denied",
      decidedAt: new Date(),
      decidedByClerkUserId: String(auth.userId),
    })
    .where(and(
      eq(assistantAccessRequestsTable.id, String(req.params.id)),
      eq(assistantAccessRequestsTable.status, "pending"),
      gt(assistantAccessRequestsTable.expiresAt, new Date()),
    ))
    .returning({ id: assistantAccessRequestsTable.id });
  if (!denied) {
    res.status(409).json({ error: "Request is no longer pending" });
    return;
  }
  res.json({ status: "denied" });
});

router.post("/assistant-access/revoke", requireOwnerAuth, async (req, res): Promise<void> => {
  if (!sameOrigin(req)) {
    res.status(403).json({ error: "Invalid origin" });
    return;
  }
  const auth = getAuth(req);
  const revoked = await db.update(assistantSessionsTable)
    .set({ revokedAt: new Date(), revokedByClerkUserId: String(auth.userId) })
    .where(and(
      isNull(assistantSessionsTable.revokedAt),
      gt(assistantSessionsTable.expiresAt, new Date()),
    ))
    .returning({ id: assistantSessionsTable.id });
  res.json({ revoked: revoked.length });
});

router.post("/assistant-access/sign-out", async (req, res): Promise<void> => {
  if (!sameOrigin(req)) {
    res.status(403).json({ error: "Invalid origin" });
    return;
  }
  const token = req.cookies?.[SESSION_COOKIE];
  if (typeof token === "string") {
    await db.update(assistantSessionsTable)
      .set({ revokedAt: new Date() })
      .where(eq(assistantSessionsTable.sessionTokenHash, hashToken(token)));
  }
  clearCookie(res, SESSION_COOKIE);
  res.json({ signedOut: true });
});

const API_TOKEN_PREFIX = "agx_";
const API_TOKEN_DEFAULT_TTL_MS = 365 * 24 * 60 * 60 * 1000; // 1 year
const VALID_TOKEN_SCOPES = new Set(["seo", "admin-read"]);

function generateApiToken(): string {
  return API_TOKEN_PREFIX + randomBytes(32).toString("base64url");
}

function normalizeScopes(input: unknown): string {
  const list = Array.isArray(input) ? input : typeof input === "string" ? input.split(",") : [];
  const scopes = [...new Set(
    list.map((s) => String(s).trim().toLowerCase()).filter((s) => VALID_TOKEN_SCOPES.has(s)),
  )];
  return scopes.length > 0 ? scopes.join(",") : "seo";
}

router.post("/assistant-access/tokens", requireOwnerAuth, async (req, res): Promise<void> => {
  if (!sameOrigin(req)) {
    res.status(403).json({ error: "Invalid origin" });
    return;
  }
  const auth = getAuth(req);
  const token = generateApiToken();
  const rawName = typeof req.body?.name === "string" ? req.body.name.trim() : "";
  const name = rawName.length > 0 ? rawName.slice(0, 80) : "Assistant token";
  const scopes = normalizeScopes(req.body?.scopes);
  const expiresInDays = Number(req.body?.expiresInDays);
  const expiresAt = Number.isFinite(expiresInDays) && expiresInDays > 0
    ? new Date(Date.now() + expiresInDays * 24 * 60 * 60 * 1000)
    : new Date(Date.now() + API_TOKEN_DEFAULT_TTL_MS);
  const id = randomUUID();
  await db.insert(assistantApiTokensTable).values({
    id,
    name,
    tokenHash: hashToken(token),
    scopes,
    expiresAt,
    createdByClerkUserId: String(auth.userId),
  });
  // The plaintext token is returned ONCE and never stored anywhere server-side.
  res.status(201).json({ id, name, scopes, expiresAt: expiresAt.toISOString(), token });
});

router.get("/assistant-access/tokens", requireOwnerAuth, async (_req, res): Promise<void> => {
  const tokens = await db.select({
    id: assistantApiTokensTable.id,
    name: assistantApiTokensTable.name,
    scopes: assistantApiTokensTable.scopes,
    createdAt: assistantApiTokensTable.createdAt,
    lastUsedAt: assistantApiTokensTable.lastUsedAt,
    expiresAt: assistantApiTokensTable.expiresAt,
    revokedAt: assistantApiTokensTable.revokedAt,
  }).from(assistantApiTokensTable)
    .orderBy(desc(assistantApiTokensTable.createdAt));
  res.json({
    tokens: tokens.map((token) => ({
      ...token,
      createdAt: token.createdAt.toISOString(),
      lastUsedAt: token.lastUsedAt ? token.lastUsedAt.toISOString() : null,
      expiresAt: token.expiresAt ? token.expiresAt.toISOString() : null,
      revokedAt: token.revokedAt ? token.revokedAt.toISOString() : null,
    })),
  });
});

router.post("/assistant-access/tokens/:id/revoke", requireOwnerAuth, async (req, res): Promise<void> => {
  if (!sameOrigin(req)) {
    res.status(403).json({ error: "Invalid origin" });
    return;
  }
  const auth = getAuth(req);
  const [revoked] = await db.update(assistantApiTokensTable)
    .set({ revokedAt: new Date(), revokedByClerkUserId: String(auth.userId) })
    .where(and(
      eq(assistantApiTokensTable.id, String(req.params.id)),
      isNull(assistantApiTokensTable.revokedAt),
    ))
    .returning({ id: assistantApiTokensTable.id });
  if (!revoked) {
    res.status(404).json({ error: "Token not found or already revoked" });
    return;
  }
  res.json({ revoked: revoked.id });
});

export default router;