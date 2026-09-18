import { getAuth, clerkClient } from "@clerk/express";
import type { Request, Response, NextFunction } from "express";
import { and, eq, gt, isNull, or } from "drizzle-orm";
import { assistantApiTokensTable, assistantSessionsTable, db } from "@workspace/db";
import { createHash } from "node:crypto";

const ASSISTANT_SESSION_COOKIE = "apex_assistant_session";

function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

function getAllowedEmails(): Set<string> {
  return new Set(
    (process.env.ADMIN_EMAILS ?? "")
      .split(",")
      .map((email) => email.trim().toLowerCase())
      .filter((email) => email.length > 0),
  );
}

async function isAllowedClerkUser(req: Request): Promise<boolean> {
  const auth = getAuth(req);
  const userId = auth?.sessionClaims?.userId || auth?.userId;
  if (!userId) return false;

  const allowedEmails = getAllowedEmails();
  if (allowedEmails.size === 0) {
    if (process.env.NODE_ENV === "development") {
      req.log.warn({ userId }, "ADMIN_EMAILS is not configured; allowing authenticated development user");
      return true;
    }
    return false;
  }

  try {
    const user = await clerkClient.users.getUser(String(userId));
    return user.emailAddresses.some((address) =>
      allowedEmails.has(address.emailAddress.toLowerCase()),
    );
  } catch (err) {
    req.log.error({ err }, "Failed to verify admin allowlist");
    return false;
  }
}

export async function requireOwnerAuth(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const auth = getAuth(req);
  const userId = auth?.sessionClaims?.userId || auth?.userId;
  if (!userId) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  if (!(await isAllowedClerkUser(req))) {
    req.log.warn({ userId }, "User not on admin allowlist");
    res.status(403).json({ error: "Forbidden" });
    return;
  }

  next();
}

/**
 * Scopes a permanent Bearer API token may carry.
 *
 * Both scopes are bounded to /api/seo/* — the same boundary as the
 * pairing-session cookie — so a token can never reach unrelated portal
 * APIs (billing, outreach, user management). "seo" allows any method on
 * /api/seo/* (dashboards, sync, audits); "admin-read" is GET-only on
 * /api/seo/* for least-privilege readers. Token management endpoints
 * (/api/assistant-access*) are never reachable via Bearer — they require
 * Clerk owner auth.
 */
function tokenMayAccessRoute(scopes: string, method: string, originalUrl: string): boolean {
  if (originalUrl.startsWith("/api/assistant-access")) return false;
  const scopeSet = new Set(
    scopes.split(",").map((s) => s.trim().toLowerCase()).filter((s) => s.length > 0),
  );
  if (!originalUrl.startsWith("/api/seo")) return false;
  if (scopeSet.has("seo")) return true;
  if (scopeSet.has("admin-read") && method === "GET") return true;
  return false;
}

export async function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  if (await isAllowedClerkUser(req)) {
    next();
    return;
  }

  const sessionToken = req.cookies?.[ASSISTANT_SESSION_COOKIE];
  if (typeof sessionToken === "string" && sessionToken.length >= 32) {
    const [session] = await db
      .select({ id: assistantSessionsTable.id })
      .from(assistantSessionsTable)
      .where(and(
        eq(assistantSessionsTable.sessionTokenHash, hashToken(sessionToken)),
        isNull(assistantSessionsTable.revokedAt),
        gt(assistantSessionsTable.expiresAt, new Date()),
      ))
      .limit(1);

    const assistantMayAccessRoute = req.originalUrl.startsWith("/api/seo");
    if (session && assistantMayAccessRoute) {
      res.locals.assistantAccess = true;
      void db.update(assistantSessionsTable)
        .set({ lastSeenAt: new Date() })
        .where(eq(assistantSessionsTable.id, session.id));
      next();
      return;
    }
  }

  const authHeader = req.headers.authorization;
  if (typeof authHeader === "string" && authHeader.startsWith("Bearer ")) {
    const token = authHeader.slice("Bearer ".length).trim();
    if (token.length >= 32) {
      const [row] = await db
        .select({ id: assistantApiTokensTable.id, scopes: assistantApiTokensTable.scopes })
        .from(assistantApiTokensTable)
        .where(and(
          eq(assistantApiTokensTable.tokenHash, hashToken(token)),
          isNull(assistantApiTokensTable.revokedAt),
          or(
            isNull(assistantApiTokensTable.expiresAt),
            gt(assistantApiTokensTable.expiresAt, new Date()),
          ),
        ))
        .limit(1);
      if (row && tokenMayAccessRoute(row.scopes, req.method, req.originalUrl)) {
        res.locals.assistantAccess = true;
        res.locals.assistantTokenId = row.id;
        void db.update(assistantApiTokensTable)
          .set({ lastUsedAt: new Date() })
          .where(eq(assistantApiTokensTable.id, row.id));
        next();
        return;
      }
    }
  }

  res.status(401).json({ error: "Unauthorized" });
}
