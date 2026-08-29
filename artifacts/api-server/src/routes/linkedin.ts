import { Router, type IRouter } from "express";
import { and, count, desc, eq, gte, inArray, or, sql } from "drizzle-orm";
import { z } from "zod";
import { getAuth } from "@clerk/express";
import {
  db, leadsTable, prospectsTable, publicOpportunitiesTable, referralPartnersTable,
  linkedinActionsTable, linkedinApprovalEventsTable, linkedinCampaignsTable, linkedinCompaniesTable,
  linkedinContentItemsTable, linkedinOutcomesTable, linkedinPeopleTable, linkedinSignalsTable, linkedinSuppressionsTable,
} from "@workspace/db";
import { requireAuth } from "../middlewares/requireAuth";
import { assertApprovalFields, assertLinkedinAttributionConsistency, assertLinkedinTransition, actorFromRequest, assertNotSuppressed, canonicalDomain, CONTENT_PUBLISH_QUOTA_LOCK, defaultRetentionUntil, isPostgresUniqueViolation, LINKEDIN_SUPPRESSION_LOCK, linkedinProvider, normalizeEvidenceUrl, normalizeLinkedinName, normalizeLinkedinUrl, PERSON_ACTION_QUOTA_LOCK, scoreLinkedinFit, suppressLinkedinTarget } from "../lib/linkedin";

const router: IRouter = Router();
const id = z.coerce.number().int().positive();
const actionType = z.enum(["connection_note", "direct_message", "follow_up", "comment_idea", "talking_points"]);
const actionStatus = z.enum(["draft", "pending_review", "approved", "completed", "replied", "meeting_booked", "opportunity_created", "suppressed", "stopped"]);
const iso = z.string().datetime();
const optional = (v?: string | null) => v?.trim() || null;
const dates = <T extends Record<string, unknown>>(row: T) => Object.fromEntries(Object.entries(row).map(([key, value]) => [key, value instanceof Date ? value.toISOString() : value]));
const phoenixStart = () => {
  const text = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Phoenix", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
  return new Date(`${text}T00:00:00-07:00`);
};
async function duplicates(name: string, company?: string | null) {
  const normalized = name.trim().toLowerCase();
  const [people, companies, prospects, leads, partners, opportunities] = await Promise.all([
    db.select({ id: linkedinPeopleTable.id, name: linkedinPeopleTable.name }).from(linkedinPeopleTable).where(eq(linkedinPeopleTable.normalizedName, normalized)),
    db.select({ id: linkedinCompaniesTable.id, name: linkedinCompaniesTable.name }).from(linkedinCompaniesTable).where(eq(linkedinCompaniesTable.normalizedName, normalized)),
    db.select({ id: prospectsTable.id, name: prospectsTable.companyName }).from(prospectsTable).where(sql`lower(${prospectsTable.companyName}) = ${normalized}`),
    db.select({ id: leadsTable.id, name: leadsTable.name }).from(leadsTable).where(sql`lower(${leadsTable.name}) = ${normalized}`),
    db.select({ id: referralPartnersTable.id, name: referralPartnersTable.companyName }).from(referralPartnersTable).where(sql`lower(${referralPartnersTable.companyName}) = ${normalized}`),
    db.select({ id: publicOpportunitiesTable.id, name: publicOpportunitiesTable.buyerOrFirm }).from(publicOpportunitiesTable).where(sql`lower(${publicOpportunitiesTable.buyerOrFirm}) = ${normalized}`),
  ]);
  return { possibleMatches: [
    ...people.map((x) => ({ type: "linkedin_person", ...x })), ...companies.map((x) => ({ type: "linkedin_company", ...x })),
    ...prospects.map((x) => ({ type: "outreach_prospect", ...x })), ...leads.map((x) => ({ type: "lead", ...x })),
    ...partners.map((x) => ({ type: "referral_partner", ...x })), ...opportunities.map((x) => ({ type: "public_opportunity", ...x })),
  ], company: company ?? null };
}

router.get("/linkedin/provider", requireAuth, (_req, res) => res.json({ name: linkedinProvider.name, capabilities: linkedinProvider.capabilities }));
router.get("/linkedin/dashboard", requireAuth, async (_req, res) => {
  const start = phoenixStart();
  const [[people], [companies], [actions], [completed], [content], [published], outcomes] = await Promise.all([
    db.select({ value: count() }).from(linkedinPeopleTable), db.select({ value: count() }).from(linkedinCompaniesTable),
    db.select({ value: count() }).from(linkedinActionsTable), db.select({ value: count() }).from(linkedinActionsTable).where(gte(linkedinActionsTable.completedAt, start)),
    db.select({ value: count() }).from(linkedinContentItemsTable), db.select({ value: count() }).from(linkedinContentItemsTable).where(and(eq(linkedinContentItemsTable.status, "published"), gte(linkedinContentItemsTable.updatedAt, start))),
    db.select().from(linkedinOutcomesTable),
  ]);
  const outcomeRollups: Record<string, number> = {};
  outcomes.forEach((o) => { outcomeRollups[o.outcomeType] = (outcomeRollups[o.outcomeType] ?? 0) + o.count; });
  res.json({ people: people?.value ?? 0, companies: companies?.value ?? 0, actions: actions?.value ?? 0, completedToday: completed?.value ?? 0, contentItems: content?.value ?? 0, publishedToday: published?.value ?? 0, outcomeRollups, provider: { name: linkedinProvider.name, capabilities: linkedinProvider.capabilities } });
});

router.get("/linkedin/companies", requireAuth, async (_req, res) => res.json((await db.select().from(linkedinCompaniesTable).orderBy(desc(linkedinCompaniesTable.updatedAt))).map(dates)));
router.post("/linkedin/companies", requireAuth, async (req, res) => {
  const parsed = z.object({ name: z.string().min(1), website: z.string().url().optional(), linkedinUrl: z.string().optional(), geography: z.string().optional(), disciplineFit: z.string().optional(), evidence: z.string().optional(), sourceUrl: z.string().url().optional(), confidence: z.number().int().min(0).max(100).optional() }).safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: parsed.error.message }); return; }
  const d = parsed.data; const matches = await duplicates(d.name); const linkedinUrl = d.linkedinUrl ? normalizeLinkedinUrl(d.linkedinUrl, "company") : null; const domain = canonicalDomain(d.website);
  const localMatches = await db.select({ id: linkedinCompaniesTable.id, name: linkedinCompaniesTable.name })
    .from(linkedinCompaniesTable)
    .where(or(
      eq(linkedinCompaniesTable.normalizedName, normalizeLinkedinName(d.name)),
      ...(domain ? [eq(linkedinCompaniesTable.domain, domain)] : []),
      ...(linkedinUrl ? [eq(linkedinCompaniesTable.linkedinUrl, linkedinUrl)] : []),
    ));
  const possibleMatches = [
    ...matches.possibleMatches,
    ...localMatches.map((match) => ({ type: "linkedin_company", ...match })),
  ].filter((match, index, all) =>
    all.findIndex((candidate) => candidate.type === match.type && candidate.id === match.id) === index
  );
  if (possibleMatches.length) { res.status(409).json({ possibleMatches }); return; }
  try {
    await assertNotSuppressed({ profileUrl: linkedinUrl });
    const [row] = await db.insert(linkedinCompaniesTable).values({ ...d, name: d.name.trim(), normalizedName: normalizeLinkedinName(d.name), domain, linkedinUrl, sourceUrl: d.sourceUrl ? normalizeEvidenceUrl(d.sourceUrl) : null, website: optional(d.website), geography: optional(d.geography), disciplineFit: optional(d.disciplineFit), evidence: optional(d.evidence) }).returning();
    res.status(201).json({ ...dates(row!), possibleMatches: [] });
  } catch (error) {
    if (isPostgresUniqueViolation(error)) { res.status(409).json({ error: "Company already exists", possibleMatches: [] }); return; }
    throw error;
  }
});
router.get("/linkedin/people", requireAuth, async (_req, res) => res.json((await db.select().from(linkedinPeopleTable).orderBy(desc(linkedinPeopleTable.updatedAt))).map(dates)));
router.post("/linkedin/people", requireAuth, async (req, res) => {
  const parsed = z.object({ name: z.string().min(1), companyId: id.optional(), role: z.string().optional(), linkedinUrl: z.string().optional(), geography: z.string().optional(), disciplineFit: z.string().optional(), evidence: z.string().optional(), sourceUrl: z.string().url().optional(), confidence: z.number().int().min(0).max(100).optional(), retentionUntil: iso.optional(), legalBasisNote: z.string().min(1), consentNote: z.string().optional() }).safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: parsed.error.message }); return; }
  const d = parsed.data; const matches = await duplicates(d.name); const linkedinUrl = d.linkedinUrl ? normalizeLinkedinUrl(d.linkedinUrl, "person") : null;
  const localMatches = await db.select({ id: linkedinPeopleTable.id, name: linkedinPeopleTable.name })
    .from(linkedinPeopleTable)
    .where(or(
      ...(linkedinUrl ? [eq(linkedinPeopleTable.linkedinUrl, linkedinUrl)] : []),
      and(
        d.companyId
          ? eq(linkedinPeopleTable.companyId, d.companyId)
          : sql`${linkedinPeopleTable.companyId} is null`,
        eq(linkedinPeopleTable.normalizedName, normalizeLinkedinName(d.name)),
      ),
    ));
  const possibleMatches = [
    ...matches.possibleMatches,
    ...localMatches.map((match) => ({ type: "linkedin_person", ...match })),
  ].filter((match, index, all) =>
    all.findIndex((candidate) => candidate.type === match.type && candidate.id === match.id) === index
  );
  if (possibleMatches.length) { res.status(409).json({ possibleMatches }); return; }
  try {
    await assertNotSuppressed({ companyId: d.companyId, profileUrl: linkedinUrl });
    const [row] = await db.insert(linkedinPeopleTable).values({ ...d, name: d.name.trim(), normalizedName: normalizeLinkedinName(d.name), linkedinUrl, sourceUrl: d.sourceUrl ? normalizeEvidenceUrl(d.sourceUrl) : null, retentionUntil: d.retentionUntil ? new Date(d.retentionUntil) : defaultRetentionUntil() }).returning();
    res.status(201).json({ ...dates(row!), possibleMatches: [], score: scoreLinkedinFit(d) });
  } catch (error) {
    if (isPostgresUniqueViolation(error)) { res.status(409).json({ error: "Person already exists", possibleMatches: [] }); return; }
    throw error;
  }
});

router.get("/linkedin/signals", requireAuth, async (_req, res) => res.json((await db.select().from(linkedinSignalsTable).orderBy(desc(linkedinSignalsTable.observedAt))).map(dates)));
router.post("/linkedin/signals", requireAuth, async (req, res) => {
  const parsed = z.object({ personId: id.optional(), companyId: id.optional(), kind: z.string().min(1), title: z.string().min(1), sourceUrl: z.string(), evidence: z.string().min(1), observedAt: iso, confidence: z.number().int().min(0).max(100).optional() }).safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: parsed.error.message }); return; }
  try {
    const row = await db.transaction(async (tx) => {
      await tx.execute(sql`select pg_advisory_xact_lock(${LINKEDIN_SUPPRESSION_LOCK})`);
      await assertNotSuppressed({ personId: parsed.data.personId, companyId: parsed.data.companyId });
      const [created] = await tx.insert(linkedinSignalsTable).values({ ...parsed.data, sourceUrl: normalizeLinkedinUrl(parsed.data.sourceUrl, "post"), observedAt: new Date(parsed.data.observedAt) }).returning();
      return created!;
    });
    res.status(201).json(dates(row!));
  } catch (error) {
    res.status(409).json({ error: error instanceof Error ? error.message : "Signal target is suppressed" });
  }
});

router.get("/linkedin/actions", requireAuth, async (_req, res) => res.json((await db.select().from(linkedinActionsTable).orderBy(desc(linkedinActionsTable.updatedAt))).map(dates)));
router.post("/linkedin/actions", requireAuth, async (req, res) => {
  const p = z.object({ personId: id.optional(), companyId: id.optional(), signalId: id.optional(), campaignId: id.optional(), contentItemId: id.optional(), actionType, draftCopy: z.string().optional(), directActionUrl: z.string().optional(), legalBasisNote: z.string().optional() }).safeParse(req.body);
  if (!p.success) { res.status(400).json({ error: p.error.message }); return; }
  if (p.data.directActionUrl) { res.status(400).json({ error: "Direct LinkedIn action links are not allowed" }); return; }
  try {
    let personId = p.data.personId;
    let companyId = p.data.companyId;
    if (p.data.signalId) {
      const [signal] = await db.select().from(linkedinSignalsTable)
        .where(eq(linkedinSignalsTable.id, p.data.signalId));
      if (!signal) { res.status(404).json({ error: "Signal not found" }); return; }
      if (personId && signal.personId && personId !== signal.personId) {
        res.status(409).json({ error: "Action person conflicts with signal attribution" }); return;
      }
      if (companyId && signal.companyId && companyId !== signal.companyId) {
        res.status(409).json({ error: "Action company conflicts with signal attribution" }); return;
      }
      personId ??= signal.personId ?? undefined;
      companyId ??= signal.companyId ?? undefined;
    }
    const row = await db.transaction(async (tx) => {
      await tx.execute(sql`select pg_advisory_xact_lock(${LINKEDIN_SUPPRESSION_LOCK})`);
      await assertNotSuppressed({ personId, companyId, signalId: p.data.signalId });
      const [created] = await tx.insert(linkedinActionsTable).values({ ...p.data, personId, companyId, status: "draft" }).returning();
      return created!;
    });
    res.status(201).json(dates(row!));
  } catch (error) {
    res.status(409).json({ error: error instanceof Error ? error.message : "Target is suppressed" });
  }
});
router.post("/linkedin/actions/prepare", requireAuth, async (req, res) => {
  const p = z.object({ personId: id, actionType, campaignId: id.optional() }).safeParse(req.body);
  if (!p.success) { res.status(400).json({ error: "Invalid preparation request" }); return; }
  const [person] = await db.select().from(linkedinPeopleTable).where(eq(linkedinPeopleTable.id, p.data.personId));
  if (!person || person.status !== "active" || !person.name.trim() || !person.sourceUrl || !person.evidence) { res.status(409).json({ error: "Preparation requires an active named person with public source URL and evidence" }); return; }
  try {
    const row = await db.transaction(async (tx) => {
      await tx.execute(sql`select pg_advisory_xact_lock(${LINKEDIN_SUPPRESSION_LOCK})`);
      await assertNotSuppressed({ personId: person.id, companyId: person.companyId, profileUrl: person.linkedinUrl });
      const [created] = await tx.insert(linkedinActionsTable).values({ personId: person.id, companyId: person.companyId, campaignId: p.data.campaignId, actionType: p.data.actionType, draftCopy: `Review public evidence for ${person.name}: ${person.evidence}`, status: "pending_review" }).returning();
      return created!;
    });
    res.status(201).json(dates(row));
  } catch (error) { res.status(409).json({ error: error instanceof Error ? error.message : "Target is suppressed" }); }
});
router.patch("/linkedin/actions/:id", requireAuth, async (req, res) => {
  const params = id.safeParse(req.params.id); const p = z.object({ draftCopy: z.string().optional(), approvedCopy: z.string().optional(), owner: z.string().optional(), dueAt: iso.optional(), legalBasisNote: z.string().optional() }).safeParse(req.body);
  if (!params.success || !p.success) { res.status(400).json({ error: "Invalid action update" }); return; }
  const [row] = await db.update(linkedinActionsTable).set({ ...p.data, dueAt: p.data.dueAt ? new Date(p.data.dueAt) : undefined }).where(and(eq(linkedinActionsTable.id, params.data), inArray(linkedinActionsTable.status, ["draft", "pending_review"]))).returning();
  if (!row) { res.status(409).json({ error: "Only draft or pending review actions can be edited" }); return; } res.json(dates(row));
});
router.post("/linkedin/actions/:id/transition", requireAuth, async (req, res) => {
  const params = id.safeParse(req.params.id); const p = z.object({ status: actionStatus, note: z.string().optional() }).safeParse(req.body);
  if (!params.success || !p.success) { res.status(400).json({ error: "Invalid action transition" }); return; }
  try {
    const row = await db.transaction(async (tx) => {
      await tx.execute(sql`select pg_advisory_xact_lock(${LINKEDIN_SUPPRESSION_LOCK})`);
      if (p.data.status === "completed") await tx.execute(sql`select pg_advisory_xact_lock(${PERSON_ACTION_QUOTA_LOCK})`);
      const [action] = await tx.select().from(linkedinActionsTable).where(eq(linkedinActionsTable.id, params.data));
      if (!action) throw new Error("Action not found");
      await assertNotSuppressed({
        personId: action.personId,
        companyId: action.companyId,
        signalId: action.signalId,
      });
      assertLinkedinTransition(action.status as z.infer<typeof actionStatus>, p.data.status);
      if (p.data.status === "approved") assertApprovalFields({ ...action, sourceUrl: action.personId ? (await tx.select({ sourceUrl: linkedinPeopleTable.sourceUrl }).from(linkedinPeopleTable).where(eq(linkedinPeopleTable.id, action.personId)))[0]?.sourceUrl : null });
      if (p.data.status === "completed") {
        const start = phoenixStart();
        const [{ value: used }] = await tx.select({ value: count() }).from(linkedinActionsTable).where(gte(linkedinActionsTable.completedAt, start));
        let limit = 25;
        if (action.campaignId) { const [campaign] = await tx.select().from(linkedinCampaignsTable).where(eq(linkedinCampaignsTable.id, action.campaignId)); if (campaign) limit = Math.min(limit, campaign.dailyActionLimit); }
        if ((used ?? 0) >= limit) throw new Error("Phoenix daily completed person-action limit reached");
      }
      const [updated] = await tx.update(linkedinActionsTable).set({ status: p.data.status, completedAt: p.data.status === "completed" ? new Date() : action.completedAt, updatedAt: new Date() }).where(and(eq(linkedinActionsTable.id, action.id), eq(linkedinActionsTable.status, action.status))).returning();
      if (!updated) throw new Error("Action changed concurrently");
      await tx.insert(linkedinApprovalEventsTable).values({ actionId: action.id, actor: actorFromRequest({ auth: getAuth(req) }), previousStatus: action.status, newStatus: p.data.status, approvedCopySnapshot: updated.approvedCopy, note: p.data.note ?? null });
      return updated;
    }); res.json(dates(row));
  } catch (error) { res.status(String(error).includes("not found") ? 404 : 409).json({ error: error instanceof Error ? error.message : "Transition rejected" }); }
});
router.get("/linkedin/suppressions", requireAuth, async (_req, res) => res.json((await db.select().from(linkedinSuppressionsTable).orderBy(desc(linkedinSuppressionsTable.createdAt))).map(dates)));
router.post("/linkedin/suppressions", requireAuth, async (req, res) => {
  const p = z.object({ personId: id.optional(), companyId: id.optional(), profileUrl: z.string().optional(), reason: z.string().min(1) }).refine((x) => Boolean(x.personId || x.companyId || x.profileUrl), "target required").safeParse(req.body);
  if (!p.success) { res.status(400).json({ error: p.error.message }); return; }
  const row = await suppressLinkedinTarget({ ...p.data, reason: p.data.reason.trim() }); res.status(201).json(dates(row));
});

router.get("/linkedin/campaigns", requireAuth, async (_req, res) => res.json((await db.select().from(linkedinCampaignsTable).orderBy(desc(linkedinCampaignsTable.updatedAt))).map(dates)));
router.post("/linkedin/campaigns", requireAuth, async (req, res) => { const p = z.object({ name: z.string().min(1), objective: z.string().min(1), owner: z.string().optional(), dailyActionLimit: z.number().int().min(1).max(25).optional() }).safeParse(req.body); if (!p.success) { res.status(400).json({ error: p.error.message }); return; } const [row] = await db.insert(linkedinCampaignsTable).values(p.data).returning(); res.status(201).json(dates(row!)); });
router.get("/linkedin/content", requireAuth, async (_req, res) => res.json((await db.select().from(linkedinContentItemsTable).orderBy(desc(linkedinContentItemsTable.updatedAt))).map(dates)));
router.post("/linkedin/content", requireAuth, async (req, res) => { const p = z.object({ campaignId: id.optional(), title: z.string().min(1), pillar: z.string().min(1), sourceUrl: z.string(), evidence: z.string().min(1), draftCopy: z.string().optional(), owner: z.string().optional(), scheduledFor: iso.optional() }).safeParse(req.body); if (!p.success) { res.status(400).json({ error: p.error.message }); return; } const [row] = await db.insert(linkedinContentItemsTable).values({ ...p.data, sourceUrl: normalizeEvidenceUrl(p.data.sourceUrl), scheduledFor: p.data.scheduledFor ? new Date(p.data.scheduledFor) : null }).returning(); res.status(201).json(dates(row!)); });
router.patch("/linkedin/content/:id", requireAuth, async (req, res) => { const params = id.safeParse(req.params.id); const p = z.object({ campaignId: id.optional(), title: z.string().min(1).optional(), pillar: z.string().min(1).optional(), draftCopy: z.string().optional(), approvedCopy: z.string().optional(), owner: z.string().optional(), sourceUrl: z.string().optional(), evidence: z.string().optional(), scheduledFor: iso.optional() }).safeParse(req.body); if (!params.success || !p.success) { res.status(400).json({ error: "Invalid content update" }); return; } const [row] = await db.update(linkedinContentItemsTable).set({ ...p.data, sourceUrl: p.data.sourceUrl ? normalizeEvidenceUrl(p.data.sourceUrl) : undefined, scheduledFor: p.data.scheduledFor ? new Date(p.data.scheduledFor) : undefined }).where(and(eq(linkedinContentItemsTable.id, params.data), inArray(linkedinContentItemsTable.status, ["draft", "pending_review"]))).returning(); if (!row) { res.status(409).json({ error: "Only draft or pending review content can be edited" }); return; } res.json(dates(row)); });
router.post("/linkedin/content/:id/transition", requireAuth, async (req, res) => {
  const params = id.safeParse(req.params.id); const p = z.object({ status: z.enum(["pending_review", "approved", "published", "stopped"]) }).safeParse(req.body);
  if (!params.success || !p.success) { res.status(400).json({ error: "Invalid content transition" }); return; }
  try {
    const row = await db.transaction(async (tx) => {
      if (p.data.status === "published") await tx.execute(sql`select pg_advisory_xact_lock(${CONTENT_PUBLISH_QUOTA_LOCK})`);
      const [item] = await tx.select().from(linkedinContentItemsTable).where(eq(linkedinContentItemsTable.id, params.data));
      if (!item) throw new Error("Content not found");
      const next = p.data.status;
      const valid = (item.status === "draft" && ["pending_review", "stopped"].includes(next)) || (item.status === "pending_review" && ["approved", "stopped"].includes(next)) || (item.status === "approved" && ["published", "stopped"].includes(next));
      if (!valid) throw new Error("Content transition is not allowed");
      if (next === "approved" || next === "published") assertApprovalFields({ approvedCopy: item.approvedCopy, owner: item.owner, dueAt: item.scheduledFor, legalBasisNote: "Content reviewed by owner", sourceUrl: item.sourceUrl && item.evidence ? item.sourceUrl : null });
      if (next === "published") { const [{ value }] = await tx.select({ value: count() }).from(linkedinContentItemsTable).where(and(eq(linkedinContentItemsTable.status, "published"), gte(linkedinContentItemsTable.updatedAt, phoenixStart()))); if ((value ?? 0) >= 3) throw new Error("Phoenix daily published-content limit reached"); }
      const [updated] = await tx.update(linkedinContentItemsTable).set({ status: next, updatedAt: new Date() }).where(and(eq(linkedinContentItemsTable.id, item.id), eq(linkedinContentItemsTable.status, item.status))).returning();
      if (!updated) throw new Error("Content changed concurrently"); return updated;
    }); res.json(dates(row));
  } catch (error) { res.status(409).json({ error: error instanceof Error ? error.message : "Transition rejected" }); }
});
router.get("/linkedin/outcomes", requireAuth, async (_req, res) => res.json((await db.select().from(linkedinOutcomesTable).orderBy(desc(linkedinOutcomesTable.occurredAt))).map(dates)));
router.post("/linkedin/outcomes", requireAuth, async (req, res) => {
  const p = z.object({ actionId: id.optional(), campaignId: id.optional(), personId: id.optional(), companyId: id.optional(), contentItemId: id.optional(), outcomeType: z.enum(["visit", "reply", "meeting", "proposal", "win"]), value: z.number().int().optional(), count: z.number().int().positive().optional(), notes: z.string().optional(), sourceUrl: z.string().optional(), occurredAt: iso }).refine((x) => Boolean(x.actionId || x.campaignId || x.personId || x.companyId || x.contentItemId), "At least one attribution source is required").safeParse(req.body);
  if (!p.success) { res.status(400).json({ error: p.error.message }); return; }
  try {
    let attribution = { ...p.data };
    if (attribution.actionId) {
      const [action] = await db.select().from(linkedinActionsTable).where(eq(linkedinActionsTable.id, attribution.actionId));
      if (!action) throw new Error("Action not found");
      for (const key of ["personId", "companyId", "campaignId", "contentItemId"] as const) if (attribution[key] && action[key] !== attribution[key]) throw new Error(`Outcome ${key} conflicts with action attribution`);
      attribution = { ...attribution, personId: action.personId ?? undefined, companyId: action.companyId ?? undefined, campaignId: action.campaignId ?? undefined, contentItemId: action.contentItemId ?? undefined };
    }
    const checks = await Promise.all([
      attribution.personId ? db.select({ id: linkedinPeopleTable.id, companyId: linkedinPeopleTable.companyId }).from(linkedinPeopleTable).where(eq(linkedinPeopleTable.id, attribution.personId)) : Promise.resolve([{}]),
      attribution.companyId ? db.select({ id: linkedinCompaniesTable.id }).from(linkedinCompaniesTable).where(eq(linkedinCompaniesTable.id, attribution.companyId)) : Promise.resolve([{}]),
      attribution.campaignId ? db.select({ id: linkedinCampaignsTable.id }).from(linkedinCampaignsTable).where(eq(linkedinCampaignsTable.id, attribution.campaignId)) : Promise.resolve([{}]),
      attribution.contentItemId ? db.select({ id: linkedinContentItemsTable.id, campaignId: linkedinContentItemsTable.campaignId }).from(linkedinContentItemsTable).where(eq(linkedinContentItemsTable.id, attribution.contentItemId)) : Promise.resolve([{}]),
    ]);
    if (checks.some((rows) => !rows.length)) throw new Error("Outcome attribution source not found");
    assertLinkedinAttributionConsistency(attribution, {
      person: attribution.personId ? checks[0][0] as { companyId: number | null } : undefined,
      content: attribution.contentItemId ? checks[3][0] as { campaignId: number | null } : undefined,
    });
    const [row] = await db.insert(linkedinOutcomesTable).values({ ...attribution, sourceUrl: attribution.sourceUrl ? normalizeEvidenceUrl(attribution.sourceUrl) : null, occurredAt: new Date(attribution.occurredAt) }).returning(); res.status(201).json(dates(row!));
  } catch (error) { res.status(409).json({ error: error instanceof Error ? error.message : "Invalid outcome attribution" }); }
});
router.post("/linkedin/retention/run", requireAuth, async (_req, res) => {
  const now = new Date(); const expired = await db.transaction(async (tx) => {
    const rows = await tx.select({ id: linkedinPeopleTable.id }).from(linkedinPeopleTable).where(and(eq(linkedinPeopleTable.status, "active"), sql`${linkedinPeopleTable.retentionUntil} is not null and ${linkedinPeopleTable.retentionUntil} <= ${now}`));
    const ids = rows.map((x) => x.id); if (ids.length) { await tx.update(linkedinPeopleTable).set({ status: "expired", updatedAt: now }).where(inArray(linkedinPeopleTable.id, ids)); await tx.update(linkedinActionsTable).set({ status: "stopped", updatedAt: now }).where(and(inArray(linkedinActionsTable.personId, ids), inArray(linkedinActionsTable.status, ["draft", "pending_review", "approved"]))); } return ids.length;
  }); res.json({ expiredPeople: expired });
});
export default router;