import { Router, type IRouter } from "express";
import { db, subscribersTable } from "@workspace/db";
import {
  CreateSubscriberBody,
  CreateSubscriberResponse,
  ListSubscribersResponse,
  UnsubscribeSubscriberBody,
  UnsubscribeSubscriberResponse,
  DeleteSubscriberResponse,
} from "@workspace/api-zod";
import { requireAuth } from "../middlewares/requireAuth";
import { sendWelcomeEmail } from "../lib/welcomeEmail";
import { verifyUnsubscribeToken } from "../lib/unsubscribeToken";
import { desc, eq, isNull, sql } from "drizzle-orm";

const router: IRouter = Router();

router.get("/subscribers", requireAuth, async (_req, res): Promise<void> => {
  const subscribers = await db
    .select()
    .from(subscribersTable)
    .where(isNull(subscribersTable.unsubscribedAt))
    .orderBy(desc(subscribersTable.createdAt));

  res.json(
    ListSubscribersResponse.parse(
      subscribers.map((s) => ({
        ...s,
        createdAt: s.createdAt.toISOString(),
      })),
    ),
  );
});

router.post("/subscribers", async (req, res): Promise<void> => {
    const parsed = UnsubscribeSubscriberBody.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.message });
      return;
    }

    const email = parsed.data.email.trim().toLowerCase();

    const parsedParams = DeleteSubscriberParams.safeParse(req.params);

  // New signups insert; re-subscribing after an unsubscribe clears the flag.
  const inserted = await db
    .insert(subscribersTable)
    .values({ email })
    .onConflictDoUpdate({
      target: subscribersTable.email,
      set: { unsubscribedAt: null },
      setWhere: sql`${subscribersTable.unsubscribedAt} is not null`,
    })
    .returning();

  // Only first-time signups get a welcome email.
  // Fire-and-forget: email failures must never break signup.
  const isNew =
    inserted.length > 0 &&
    inserted[0].unsubscribedAt === null &&
    Math.abs(inserted[0].createdAt.getTime() - Date.now()) < 5000;
  if (isNew) {
    sendWelcomeEmail(email)
      .then((result) => {
        if (!result.ok) {
          req.log.error({ error: result.error }, "Welcome email failed");
        } else {
          req.log.info("Welcome email sent");
        }
      })
      .catch((err) => {
        req.log.error({ err }, "Welcome email failed");
      });
  }

  res.status(201).json(CreateSubscriberResponse.parse({ ok: true }));
});

router.post("/subscribers/unsubscribe", async (req, res): Promise<void> => {
    const parsed = UnsubscribeSubscriberBody.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.message });
      return;
    }

    const email = parsed.data.email.trim().toLowerCase();

    const parsedParams = DeleteSubscriberParams.safeParse(req.params);
  const token = parsed.data.token;

  // Tokenized links must verify; a bad token is rejected outright so
  // links can't be tampered with. The manual form sends no token and
  // remains an idempotent fallback.
  if (token !== undefined && !verifyUnsubscribeToken(email, token)) {
    res.status(400).json({ error: "Invalid unsubscribe link" });
    return;
  }

  await db
    .update(subscribersTable)
    .set({ unsubscribedAt: new Date() })
    .where(eq(subscribersTable.email, email));

  res.json(UnsubscribeSubscriberResponse.parse({ ok: true }));
});

router.delete(
  "/subscribers/:id",
  requireAuth,
  async (req, res): Promise<void> => {
    if (!Number.isInteger(id) || id <= 0) {
      res.status(400).json({ error: "Invalid subscriber id" });
      return;
    }

    const deleted = await db
      .delete(subscribersTable)
      .where(eq(subscribersTable.id, parsedParams.data.id))
      .returning({ id: subscribersTable.id });

    if (deleted.length === 0) {
      res.status(404).json({ error: "Subscriber not found" });
      return;
    }

    res.json(DeleteSubscriberResponse.parse({ ok: true }));
  },
);

export default router;
