import { Router, type IRouter, type Request, type Response } from "express";
import { randomBytes, randomUUID, createHash } from "node:crypto";
import { and, desc, eq, gt, isNull, sql } from "drizzle-orm";
import {
  assistantAccessRequestsTable,
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

export default router;