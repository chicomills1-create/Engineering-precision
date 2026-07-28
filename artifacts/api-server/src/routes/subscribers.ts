import { Router, type IRouter } from "express";
import { db, subscribersTable } from "@workspace/db";
import { CreateSubscriberBody, CreateSubscriberResponse } from "@workspace/api-zod";

const router: IRouter = Router();

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
