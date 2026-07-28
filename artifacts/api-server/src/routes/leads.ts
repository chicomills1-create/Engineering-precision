import { Router, type IRouter } from "express";
import { desc } from "drizzle-orm";
import { db, leadsTable } from "@workspace/db";
import {
  CreateLeadBody,
  CreateLeadResponse,
  ListLeadsResponse,
} from "@workspace/api-zod";
import { requireAuth } from "../middlewares/requireAuth";
import { sendLeadNotificationEmail } from "../lib/leadNotifications";

const router: IRouter = Router();

router.get("/leads", requireAuth, async (_req, res): Promise<void> => {
  const leads = await db
    .select()
    .from(leadsTable)
    .orderBy(desc(leadsTable.createdAt));

  res.json(
    ListLeadsResponse.parse(
      leads.map((lead) => ({
        ...lead,
        createdAt: lead.createdAt.toISOString(),
      })),
    ),
  );
});

router.post("/leads", async (req, res): Promise<void> => {
  const parsed = CreateLeadBody.safeParse(req.body);
  if (!parsed.success) {
    req.log.warn({ errors: parsed.error.message }, "Invalid lead submission");
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [lead] = await db.insert(leadsTable).values(parsed.data).returning();

  // Fire-and-forget: email failures must never break lead submission.
  sendLeadNotificationEmail(parsed.data)
    .then((result) => {
      if (!result.ok) {
        req.log.error({ error: result.error }, "Lead notification email failed");
      } else {
        req.log.info("Lead notification email sent");
      }
    })
    .catch((err) => {
      req.log.error({ err }, "Lead notification email failed");
    });

  res.status(201).json(
    CreateLeadResponse.parse({
      ...lead,
      createdAt: lead!.createdAt.toISOString(),
    }),
  );
});

export default router;
