import { getAuth, clerkClient } from "@clerk/express";
import type { Request, Response, NextFunction } from "express";

function getAllowedEmails(): Set<string> {
  return new Set(
    (process.env.ADMIN_EMAILS ?? "")
      .split(",")
      .map((email) => email.trim().toLowerCase())
      .filter((email) => email.length > 0),
  );
}

export async function requireAuth(
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

  const allowedEmails = getAllowedEmails();
  if (allowedEmails.size === 0) {
    req.log.warn(
      "ADMIN_EMAILS is not configured; denying access to admin endpoint",
    );
    res.status(403).json({ error: "Forbidden" });
    return;
  }

  try {
    const user = await clerkClient.users.getUser(String(userId));
    const isAllowed = user.emailAddresses.some((address) =>
      allowedEmails.has(address.emailAddress.toLowerCase()),
    );
    if (!isAllowed) {
      req.log.warn({ userId }, "User not on admin allowlist");
      res.status(403).json({ error: "Forbidden" });
      return;
    }
  } catch (err) {
    req.log.error({ err }, "Failed to verify admin allowlist");
    res.status(403).json({ error: "Forbidden" });
    return;
  }

  next();
}
