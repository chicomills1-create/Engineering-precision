import { Router, type IRouter } from "express";
import { randomBytes } from "node:crypto";
import { desc, eq, inArray } from "drizzle-orm";
import {
  db,
  leadsTable,
  publicOpportunitiesTable,
  referralPartnersTable,
} from "@workspace/db";
import {
  CreatePublicOpportunityBody,
  CreatePublicOpportunityResponse,
  CreateReferralPartnerBody,
  CreateReferralPartnerResponse,
  GetGrowthDashboardResponse,
  ListPublicOpportunitiesResponse,
  ListReferralPartnersResponse,
  PreparePublicOpportunitiesBody,
  PreparePublicOpportunitiesResponse,
  UpdatePublicOpportunityBody,
  UpdatePublicOpportunityParams,
  UpdatePublicOpportunityResponse,
  UpdateReferralPartnerBody,
  UpdateReferralPartnerParams,
  UpdateReferralPartnerResponse,
} from "@workspace/api-zod";
import { requireAuth } from "../middlewares/requireAuth";
import { discoverPublicProspects } from "../lib/publicResearch";

const router: IRouter = Router();

const partnerJson = (row: typeof referralPartnersTable.$inferSelect) => ({
  ...row,
  nextFollowUpAt: row.nextFollowUpAt?.toISOString() ?? null,
  createdAt: row.createdAt.toISOString(),
  updatedAt: row.updatedAt.toISOString(),
});

const opportunityJson = (row: typeof publicOpportunitiesTable.$inferSelect) => ({
  ...row,
  nextActionAt: row.nextActionAt?.toISOString() ?? null,
  createdAt: row.createdAt.toISOString(),
  updatedAt: row.updatedAt.toISOString(),
});

const cleanOptional = (value: string | undefined): string | null =>
  value?.trim() ? value.trim() : null;

router.get("/growth/partners", requireAuth, async (_req, res): Promise<void> => {
  const rows = await db.select().from(referralPartnersTable).orderBy(desc(referralPartnersTable.updatedAt));
  res.json(ListReferralPartnersResponse.parse(rows.map(partnerJson)));
});

router.post("/growth/partners", requireAuth, async (req, res): Promise<void> => {
  const parsed = CreateReferralPartnerBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [row] = await db.insert(referralPartnersTable).values({
    ...parsed.data,
    referralCode: randomBytes(18).toString("base64url"),
    companyName: parsed.data.companyName.trim(),
    source: parsed.data.source.trim(),
    contactName: cleanOptional(parsed.data.contactName),
    contactEmail: cleanOptional(parsed.data.contactEmail)?.toLowerCase() ?? null,
    contactPhone: cleanOptional(parsed.data.contactPhone),
    website: cleanOptional(parsed.data.website),
    notes: cleanOptional(parsed.data.notes),
    nextFollowUpAt: parsed.data.nextFollowUpAt ? new Date(parsed.data.nextFollowUpAt) : null,
  }).returning();
  res.status(201).json(CreateReferralPartnerResponse.parse(partnerJson(row!)));
});

router.patch("/growth/partners/:id", requireAuth, async (req, res): Promise<void> => {
  const params = UpdateReferralPartnerParams.safeParse(req.params);
  const parsed = UpdateReferralPartnerBody.safeParse(req.body);
  if (!params.success || !parsed.success) {
    res.status(400).json({ error: "Invalid referral partner update" });
    return;
  }
  const [row] = await db.update(referralPartnersTable).set({
    ...parsed.data,
    companyName: parsed.data.companyName.trim(),
    source: parsed.data.source.trim(),
    contactName: cleanOptional(parsed.data.contactName),
    contactEmail: cleanOptional(parsed.data.contactEmail)?.toLowerCase() ?? null,
    contactPhone: cleanOptional(parsed.data.contactPhone),
    website: cleanOptional(parsed.data.website),
    notes: cleanOptional(parsed.data.notes),
    nextFollowUpAt: parsed.data.nextFollowUpAt ? new Date(parsed.data.nextFollowUpAt) : null,
    updatedAt: new Date(),
  }).where(eq(referralPartnersTable.id, params.data.id)).returning();
  if (!row) {
    res.status(404).json({ error: "Referral partner not found" });
    return;
  }
  res.json(UpdateReferralPartnerResponse.parse(partnerJson(row)));
});

router.get("/growth/opportunities", requireAuth, async (_req, res): Promise<void> => {
  const rows = await db.select().from(publicOpportunitiesTable).orderBy(desc(publicOpportunitiesTable.updatedAt));
  res.json(ListPublicOpportunitiesResponse.parse(rows.map(opportunityJson)));
});

router.post("/growth/opportunities", requireAuth, async (req, res): Promise<void> => {
  const parsed = CreatePublicOpportunityBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [row] = await db.insert(publicOpportunitiesTable).values({
    ...parsed.data,
    title: parsed.data.title.trim(),
    sourceUrl: parsed.data.sourceUrl.trim(),
    projectLocation: parsed.data.projectLocation.trim(),
    buyerOrFirm: parsed.data.buyerOrFirm.trim(),
    disciplineFit: parsed.data.disciplineFit.trim(),
    evidenceNotes: parsed.data.evidenceNotes.trim(),
    owner: cleanOptional(parsed.data.owner),
    nextAction: cleanOptional(parsed.data.nextAction),
    nextActionAt: parsed.data.nextActionAt ? new Date(parsed.data.nextActionAt) : null,
  }).returning();
  res.status(201).json(CreatePublicOpportunityResponse.parse(opportunityJson(row!)));
});

router.post("/growth/opportunities/research", requireAuth, async (req, res): Promise<void> => {
  const parsed = PreparePublicOpportunitiesBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  try {
    const discovery = await discoverPublicProspects(parsed.data);
    const urls = discovery.prospects.map((candidate) => candidate.sourceUrl);
    const existingRows = urls.length
      ? await db.select({ sourceUrl: publicOpportunitiesTable.sourceUrl })
        .from(publicOpportunitiesTable)
        .where(inArray(publicOpportunitiesTable.sourceUrl, urls))
      : [];
    const existing = new Set(existingRows.map((row) => row.sourceUrl));
    const newRows = discovery.prospects.filter((candidate) => !existing.has(candidate.sourceUrl));
    const inserted = newRows.length
      ? await db.insert(publicOpportunitiesTable).values(newRows.map((candidate) => ({
        title: `${candidate.companyName} public project / capacity signal`,
        sourceUrl: candidate.sourceUrl,
        projectLocation: `${candidate.city}, ${candidate.state}`,
        buyerOrFirm: candidate.companyName,
        disciplineFit: candidate.audience === "architect"
          ? "Architecture partner; review for Civil, Structural, and MEP support"
          : "Builder / GC; review for Civil, Structural, and MEP design support",
        urgency: candidate.needScore >= 85 ? "high" : "normal",
        evidenceNotes: [candidate.researchNotes, candidate.needSignals].filter(Boolean).join("\n"),
        pipelineStatus: "research",
        nextAction: "Review the public evidence and decide whether this opportunity is qualified.",
      }))).returning()
      : [];
    res.status(201).json(PreparePublicOpportunitiesResponse.parse(inserted.map(opportunityJson)));
  } catch (error) {
    req.log.error({ error }, "Public opportunity research failed");
    res.status(502).json({ error: "Unable to prepare public opportunity research" });
  }
});

router.patch("/growth/opportunities/:id", requireAuth, async (req, res): Promise<void> => {
  const params = UpdatePublicOpportunityParams.safeParse(req.params);
  const parsed = UpdatePublicOpportunityBody.safeParse(req.body);
  if (!params.success || !parsed.success) {
    res.status(400).json({ error: "Invalid opportunity update" });
    return;
  }
  const [row] = await db.update(publicOpportunitiesTable).set({
    ...parsed.data,
    owner: cleanOptional(parsed.data.owner),
    nextAction: cleanOptional(parsed.data.nextAction),
    nextActionAt: parsed.data.nextActionAt ? new Date(parsed.data.nextActionAt) : null,
    updatedAt: new Date(),
  }).where(eq(publicOpportunitiesTable.id, params.data.id)).returning();
  if (!row) {
    res.status(404).json({ error: "Opportunity not found" });
    return;
  }
  res.json(UpdatePublicOpportunityResponse.parse(opportunityJson(row)));
});

router.get("/growth/dashboard", requireAuth, async (_req, res): Promise<void> => {
  const [leads, partners, opportunities] = await Promise.all([
    db.select().from(leadsTable),
    db.select().from(referralPartnersTable),
    db.select().from(publicOpportunitiesTable),
  ]);
  const now = Date.now();
  const ageHours = (createdAt: Date) => Math.max(0, Math.floor((now - createdAt.getTime()) / 3_600_000));
  const pipeline = [
    ...leads.map((lead) => ({
      id: lead.id,
      entityType: "lead" as const,
      title: lead.name,
      subtitle: lead.company,
      stage: lead.status,
      source: lead.source || (lead.referralPartnerId ? "referral_partner" : "website"),
      nextAction: lead.status === "new" ? "Respond to inquiry" : null,
      nextActionAt: null,
      createdAt: lead.createdAt.toISOString(),
      responseAgeHours: ageHours(lead.createdAt),
    })),
    ...partners.map((partner) => ({
      id: partner.id,
      entityType: "referral_partner" as const,
      title: partner.companyName,
      subtitle: partner.contactName,
      stage: partner.relationshipStatus,
      source: partner.source,
      nextAction: partner.nextFollowUpAt ? "Partner follow-up" : null,
      nextActionAt: partner.nextFollowUpAt?.toISOString() ?? null,
      createdAt: partner.createdAt.toISOString(),
      responseAgeHours: ageHours(partner.createdAt),
    })),
    ...opportunities.map((opportunity) => ({
      id: opportunity.id,
      entityType: "public_opportunity" as const,
      title: opportunity.title,
      subtitle: opportunity.buyerOrFirm,
      stage: opportunity.pipelineStatus,
      source: "public_research",
      nextAction: opportunity.nextAction,
      nextActionAt: opportunity.nextActionAt?.toISOString() ?? null,
      createdAt: opportunity.createdAt.toISOString(),
      responseAgeHours: ageHours(opportunity.createdAt),
    })),
  ].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  const stageCounts: Record<string, number> = {};
  const sourceCounts: Record<string, number> = {};
  for (const item of pipeline) {
    stageCounts[item.stage] = (stageCounts[item.stage] ?? 0) + 1;
    sourceCounts[item.source] = (sourceCounts[item.source] ?? 0) + 1;
  }
  const dueNextActions = pipeline.filter((item) =>
    item.nextAction && (!item.nextActionAt || new Date(item.nextActionAt).getTime() <= now),
  );
  res.json(GetGrowthDashboardResponse.parse({
    pipeline,
    stageCounts,
    sourceCounts,
    dueNextActions,
    totals: {
      inquiries: leads.length,
      partners: partners.length,
      opportunities: opportunities.length,
      proposals: stageCounts.proposal ?? 0,
      wins: stageCounts.won ?? 0,
      lost: stageCounts.lost ?? 0,
    },
  }));
});

export default router;