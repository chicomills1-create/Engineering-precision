import { Router, type IRouter } from "express";
import { desc, eq, sql } from "drizzle-orm";
import { db, leadsTable, referralPartnersTable } from "@workspace/db";
import {
  CreateLeadBody,
  CreateLeadResponse,
  DeleteLeadParams,
  DeleteLeadResponse,
  ListLeadsResponse,
  UpdateLeadBody,
  UpdateLeadResponse,
} from "@workspace/api-zod";
import { requireAuth } from "../middlewares/requireAuth";
import { sendLeadNotificationEmail } from "../lib/leadNotifications";
import { getReferralConversionDelta } from "../lib/growthAttribution";

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

  let referralPartnerId: number | undefined;
  const { referralPartnerCode, ...leadData } = parsed.data;
  if (referralPartnerCode) {
    const [partner] = await db
      .select({ id: referralPartnersTable.id })
      .from(referralPartnersTable)
      .where(eq(referralPartnersTable.referralCode, referralPartnerCode))
      .limit(1);
    if (!partner) {
      res.status(400).json({ error: "Invalid referral partner code" });
      return;
    }
    referralPartnerId = partner.id;
  }

  const [lead] = await db.transaction(async (tx) => {
    const [createdLead] = await tx
      .insert(leadsTable)
      .values({
        ...leadData,
        referralPartnerId,
      })
      .returning();

    if (referralPartnerId) {
      await tx.update(referralPartnersTable)
        .set({
          referralCount: sql`${referralPartnersTable.referralCount} + 1`,
          updatedAt: new Date(),
        })
        .where(eq(referralPartnersTable.id, referralPartnerId));
    }

    return [createdLead];
  });

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

router.patch("/leads/:id", requireAuth, async (req, res): Promise<void> => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    res.status(400).json({ error: "Invalid lead id" });
    return;
  }

  const parsed = UpdateLeadBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [lead] = await db.transaction(async (tx) => {
    const [existingLead] = await tx
      .select()
      .from(leadsTable)
      .where(eq(leadsTable.id, id))
      .limit(1)
      .for("update");
    if (!existingLead) return [undefined];

    const [updatedLead] = await tx
      .update(leadsTable)
      .set({ status: parsed.data.status })
      .where(eq(leadsTable.id, id))
      .returning();

    const conversionDelta = getReferralConversionDelta(existingLead.status, parsed.data.status);
    if (existingLead.referralPartnerId && conversionDelta !== 0) {
      await tx.update(referralPartnersTable)
        .set({
          convertedCount: conversionDelta === 1
            ? sql`${referralPartnersTable.convertedCount} + 1`
            : sql`greatest(${referralPartnersTable.convertedCount} - 1, 0)`,
          updatedAt: new Date(),
        })
        .where(eq(referralPartnersTable.id, existingLead.referralPartnerId));
    }

    return [updatedLead];
  });

  if (!lead) {
    res.status(404).json({ error: "Lead not found" });
    return;
  }

  res.json(
    UpdateLeadResponse.parse({
      ...lead,
      createdAt: lead.createdAt.toISOString(),
    }),
  );
});

router.delete("/leads/:id", requireAuth, async (req, res): Promise<void> => {
  const parsedParams = DeleteLeadParams.safeParse(req.params);
  if (!parsedParams.success) {
    res.status(400).json({ error: "Invalid lead id" });
    return;
  }

  const id = parsedParams.data.id;
  if (!Number.isInteger(id) || id <= 0) {
    res.status(400).json({ error: "Invalid lead id" });
    return;
  }

  const deleted = await db
    .delete(leadsTable)
    .where(eq(leadsTable.id, id))
    .returning({ id: leadsTable.id });

  if (deleted.length === 0) {
    res.status(404).json({ error: "Lead not found" });
    return;
  }

  res.json(DeleteLeadResponse.parse({ ok: true }));
});

export default router;
