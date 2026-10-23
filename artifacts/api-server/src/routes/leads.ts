import { Router, type IRouter } from "express";
import { and, desc, eq, gt, sql } from "drizzle-orm";
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
import {
  normalizeForDedupe,
  scoreVendorMessage,
} from "../lib/vendorScoring";

const router: IRouter = Router();

// ==== anti-spam / vendor shield (2026-10-22) ====
// In-memory sliding-window rate limiter (mirrors botVerification's
// in-memory session map). Generous thresholds: a human never comes
// close; a script spraying the endpoint trips it fast.
const shieldHits = new Map<string, number[]>();
function shieldRateLimited(ip: string, email: string): boolean {
  const now = Date.now();
  const WIN = 3600 * 1000;
  const check = (key: string, max: number): boolean => {
    const arr = (shieldHits.get(key) ?? []).filter((t) => now - t < WIN);
    arr.push(now);
    shieldHits.set(key, arr);
    return arr.length > max;
  };
  let limited = false;
  if (ip) limited = check(`ip:${ip}`, 10) || limited;
  if (email) limited = check(`em:${email}`, 5) || limited;
  if (shieldHits.size > 5000) shieldHits.clear();
  return limited;
}


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
  // Shield: rate limit first — it counts raw attempts, valid or not.
  const shieldIp = String(req.headers["x-forwarded-for"] || req.ip || "")
    .split(",")[0]
    .trim();
  const rawBody = (req.body ?? {}) as Record<string, unknown>;
  const rawEmail =
    typeof rawBody.email === "string" ? rawBody.email.toLowerCase().trim() : "";
  if (shieldRateLimited(shieldIp, rawEmail)) {
    req.log.warn({ ip: shieldIp }, "Lead submission rate limited (shield)");
    res.status(429).json({ error: "rate_limited" });
    return;
  }
  // Shield fields (honeypot + form-load timestamp) ride the JSON body but
  // are not part of the lead shape: capture them, then remove them so the
  // schema parse below sees exactly the fields it expects, strict or not.
  const shieldWebsite =
    typeof rawBody.website === "string" ? rawBody.website : "";
  const shieldTsRaw = rawBody._ts;
  delete rawBody.website;
  delete rawBody._ts;

  const parsed = CreateLeadBody.safeParse(req.body);
  if (!parsed.success) {
    req.log.warn({ errors: parsed.error.message }, "Invalid lead submission");
    res.status(400).json({ error: parsed.error.message });
    return;
  }


  // Shield: honeypot — real visitors never fill the hidden 'website'
  // field. Dropped silently with a success-shaped response: no row,
  // no notification.
  if (shieldWebsite.trim()) {
    req.log.info({ ip: shieldIp }, "Lead dropped by shield (honeypot)");
    res.status(201).json({ ok: true });
    return;
  }
  // Shield: timing — a human cannot complete the form in under ~2.5s.
  // An absent _ts (API clients, tests) is allowed through.
  const shieldTs = Number(shieldTsRaw);
  if (Number.isFinite(shieldTs) && shieldTs > 0) {
    const elapsed = Date.now() - shieldTs;
    if (elapsed >= 0 && elapsed < 2500) {
      req.log.info({ ip: shieldIp }, "Lead dropped by shield (timing)");
      res.status(201).json({ ok: true });
      return;
    }
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


  // Shield: duplicate suppression — an identical email + message inside
  // 24h (or an identical long message from any address inside 1h)
  // collapses to the first stored lead and its single notification.
  const vendorScore = scoreVendorMessage(parsed.data.message);
  const msgNorm = normalizeForDedupe(parsed.data.message);
  const cutoff24 = new Date(Date.now() - 24 * 3600 * 1000);
  const sameEmail = await db
    .select()
    .from(leadsTable)
    .where(
      and(
        eq(leadsTable.email, parsed.data.email),
        gt(leadsTable.createdAt, cutoff24),
      ),
    )
    .limit(25);
  let duplicate = sameEmail.find(
    (row) => normalizeForDedupe(row.message) === msgNorm,
  );
  if (!duplicate && msgNorm.length >= 60) {
    const cutoff1 = new Date(Date.now() - 3600 * 1000);
    const recent = await db
      .select()
      .from(leadsTable)
      .where(gt(leadsTable.createdAt, cutoff1))
      .orderBy(desc(leadsTable.createdAt))
      .limit(50);
    duplicate = recent.find(
      (row) => normalizeForDedupe(row.message) === msgNorm,
    );
  }
  if (duplicate) {
    req.log.info(
      { duplicateOf: duplicate.id },
      "Lead suppressed by shield (duplicate)",
    );
    res.status(201).json(
      CreateLeadResponse.parse({
        ...duplicate,
        createdAt: duplicate.createdAt.toISOString(),
      }),
    );
    return;
  }

  const [lead] = await db.transaction(async (tx) => {
    const [createdLead] = await tx
      .insert(leadsTable)
      .values({
        ...leadData,
        referralPartnerId,
        ...(vendorScore.verdict === "vendor" ? { status: "vendor" } : {}),
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

  // Vendor-classified submissions are stored (status "vendor") but
  // never fire the client-style notification (anti-spam shield).
  if (vendorScore.verdict === "vendor") {
    req.log.info(
      {
        leadId: lead.id,
        score: vendorScore.score,
        strong: vendorScore.strong,
        weak: vendorScore.weak,
      },
      "Lead classified vendor by shield — notification suppressed",
    );
  } else {
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
  }

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
