import { Router, type IRouter } from "express";
import { desc } from "drizzle-orm";
import { db, subscribersTable } from "@workspace/db";
import {
  CreateSubscriberBody,
  CreateSubscriberResponse,
  ListSubscribersResponse,
} from "@workspace/api-zod";
import { requireAuth } from "../middlewares/requireAuth";
import { sendWelcomeEmail } from "../lib/welcomeEmail";

const router: IRouter = Router();

router.get("/subscribers", requireAuth, async (_req, res): Promise<void> => {
  const subscribers = await db
    .select()
    .from(subscribersTable)
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
  const parsed = CreateSubscriberBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const email = parsed.data.email.trim().toLowerCase();
  const inserted = await db
    .insert(subscribersTable)
    .values({ email })
    .onConflictDoNothing({ target: subscribersTable.email })
    .returning();

  // Only new subscribers (not repeat signups) get a welcome email.
  // Fire-and-forget: email failures must never break signup.
  if (inserted.length > 0) {
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

export default router;
