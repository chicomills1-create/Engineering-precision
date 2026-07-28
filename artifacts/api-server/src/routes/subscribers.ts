import { Router, type IRouter } from "express";
import { desc } from "drizzle-orm";
import { db, subscribersTable } from "@workspace/db";
import {
  CreateSubscriberBody,
  CreateSubscriberResponse,
  ListSubscribersResponse,
} from "@workspace/api-zod";
import { requireAuth } from "../middlewares/requireAuth";

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
  await db
    .insert(subscribersTable)
    .values({ email })
    .onConflictDoNothing({ target: subscribersTable.email });

  res.status(201).json(CreateSubscriberResponse.parse({ ok: true }));
});

export default router;
