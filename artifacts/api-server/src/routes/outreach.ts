import { Router, type IRouter, type Request, type Response } from "express";
import { and, count, desc, eq, gte, inArray } from "drizzle-orm";
import {
  campaignsTable,
  db,
  leadsTable,
  outreachMessagesTable,
  outreachResearchRunsTable,
  outreachResearchScheduleRunsTable,
  outreachResearchSchedulesTable,
  outreachSuppressionsTable,
  prospectsTable,
  publicOpportunitiesTable,
  referralPartnersTable,
  type ResearchScheduleRun,
} from "@workspace/db";
import {
  ApproveOutreachMessageParams, ApproveOutreachMessageResponse, CreateCampaignBody, CreateCampaignResponse,
  ListClientMonthlySafeListResponse, SendClientMonthlyEmailBody, SendClientMonthlyEmailResponse,
  CreateOutreachMessageBody, CreateOutreachMessageResponse, CreateProspectBody, CreateProspectResponse,
  GenerateOutreachDraftBody, GenerateOutreachDraftParams, GenerateOutreachDraftResponse,
  GetOutreachDashboardResponse, ListCampaignsResponse, ListOutreachMessagesResponse, ListProspectsResponse,
  ListOutreachResearchRunsResponse, ListOutreachResearchSchedulesResponse, ListOutreachSuppressionsResponse,
  MarkOutreachProspectRepliedParams, MarkOutreachProspectRepliedResponse,
  RunOutreachResearchBody, RunOutreachResearchResponse,
  SendOutreachMessageParams, SendOutreachMessageResponse, SuppressOutreachAddressBody, SuppressOutreachAddressResponse,
  UnsubscribeOutreachAddressBody, UnsubscribeOutreachAddressResponse, UpdateCampaignBody, UpdateCampaignParams,
  UpdateCampaignResponse, UpdateOutreachMessageBody, UpdateOutreachMessageParams, UpdateOutreachMessageResponse,
  UpdateOutreachResearchScheduleBody, UpdateOutreachResearchScheduleParams, UpdateOutreachResearchScheduleResponse,
  UpdateProspectBody, UpdateProspectParams, UpdateProspectResponse,
} from "@workspace/api-zod";
import { requireAuth } from "../middlewares/requireAuth";
import {
  generateProspectDraft,
  isUnknownSendResultError,
  sendApprovedOutreach,
} from "../lib/outreach";
import { verifyUnsubscribeToken } from "../lib/unsubscribeToken";
import { suppressOutreachEmail } from "../lib/outreachSuppression";
import { discoverPublicProspects } from "../lib/publicResearch";
import { getOutreachAutomationStatus } from "../lib/outreachWorker";
import {
  OUTREACH_RESEARCH_LOCAL_HOUR,
  OUTREACH_RESEARCH_TIMEZONE,
} from "../lib/outreachResearchScheduler";
import {
  claimClientMonthlyDelivery,
  finishClientMonthlyDelivery,
  getClientMonthlySafeList,
  sendClientMonthlyMessage,
} from "../lib/clientMonthlyOutreach";
import { validateAttributionPair, type AttributionSourceType } from "../lib/growthAttribution";

const router: IRouter = Router();
const normalizeEmail = (email: string) => email.trim().toLowerCase();
const prospectJson = (p: typeof prospectsTable.$inferSelect) => ({ ...p, createdAt: p.createdAt.toISOString(), updatedAt: p.updatedAt.toISOString() });
const campaignJson = (c: typeof campaignsTable.$inferSelect) => ({ ...c, createdAt: c.createdAt.toISOString(), updatedAt: c.updatedAt.toISOString() });
const messageJson = (m: typeof outreachMessagesTable.$inferSelect) => ({ ...m, scheduledAt: m.scheduledAt?.toISOString() ?? null, sentAt: m.sentAt?.toISOString() ?? null, createdAt: m.createdAt.toISOString(), updatedAt: m.updatedAt.toISOString() });
async function validateAttribution(sourceType?: AttributionSourceType, sourceId?: number): Promise<string | null> {
  const pairError = validateAttributionPair(sourceType, sourceId);
  if (pairError) return pairError;
  if (!sourceType || !sourceId) return null;
  const table = sourceType === "lead" ? leadsTable : sourceType === "referral_partner" ? referralPartnersTable : publicOpportunitiesTable;
  const [source] = await db.select({ id: table.id }).from(table).where(eq(table.id, sourceId)).limit(1);
  return source ? null : `The selected ${sourceType} source does not exist`;
}
const researchRunJson = (run: typeof outreachResearchRunsTable.$inferSelect) => ({
  ...run,
  createdAt: run.createdAt.toISOString(),
  completedAt: run.completedAt?.toISOString() ?? null,
});
const researchScheduleJson = (
  schedule: typeof outreachResearchSchedulesTable.$inferSelect,
  latestRun?: ResearchScheduleRun,
) => ({
  ...schedule,
  createdAt: schedule.createdAt.toISOString(),
  updatedAt: schedule.updatedAt.toISOString(),
  lastRunDate: latestRun?.runDate ?? null,
  lastRunStatus: latestRun?.status ?? null,
  lastRunResultCount: latestRun?.resultCount ?? null,
  lastRunSkippedCount: latestRun?.skippedCount ?? null,
  lastRunError: latestRun?.error ?? null,
  lastRunCompletedAt: latestRun?.completedAt?.toISOString() ?? null,
});

router.get("/outreach/dashboard", requireAuth, async (_req, res): Promise<void> => {
  const automationStatus = getOutreachAutomationStatus();
  const start = new Date(); start.setHours(0, 0, 0, 0);
  const [[prospects], [campaigns], [messages], [sentToday], [replies]] = await Promise.all([
    db.select({ value: count() }).from(prospectsTable), db.select({ value: count() }).from(campaignsTable),
    db.select({ value: count() }).from(outreachMessagesTable),
    db.select({ value: count() }).from(outreachMessagesTable).where(gte(outreachMessagesTable.sentAt, start)),
    db.select({ value: count() }).from(outreachMessagesTable).where(eq(outreachMessagesTable.status, "replied")),
  ]);
  res.json(GetOutreachDashboardResponse.parse({
    prospects: prospects?.value ?? 0,
    campaigns: campaigns?.value ?? 0,
    messages: messages?.value ?? 0,
    sentToday: sentToday?.value ?? 0,
    replies: replies?.value ?? 0,
    ...automationStatus,
  }));
});
router.get("/outreach/client-safe-list", requireAuth, async (_req, res): Promise<void> => {
  const contacts = await getClientMonthlySafeList();
  res.json(ListClientMonthlySafeListResponse.parse(contacts));
});
router.post("/outreach/client-monthly-send", requireAuth, async (req, res): Promise<void> => {
  const parsed = SendClientMonthlyEmailBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const requested = [...new Set(parsed.data.recipientEmails.map(normalizeEmail))];
  const eligible = new Map((await getClientMonthlySafeList()).map((contact) => [contact.email, contact]));
  const results: Array<{ email: string; status: "sent" | "failed" | "ineligible"; error: string | null }> = [];
  for (const email of requested) {
    const contact = eligible.get(email);
    if (!contact) {
      results.push({ email, status: "ineligible", error: "Contact is no longer on the safe list" });
      continue;
    }
    const deliveryId = await claimClientMonthlyDelivery(
      contact,
      parsed.data.subject.trim(),
      parsed.data.body.trim(),
    );
    if (!deliveryId) {
      results.push({ email, status: "ineligible", error: "A monthly email was already claimed for this address this month" });
      continue;
    }
    try {
      const sent = await sendClientMonthlyMessage(contact, parsed.data.subject.trim(), parsed.data.body.trim());
      await finishClientMonthlyDelivery({
        deliveryId,
        status: "sent",
        providerMessageId: sent.providerMessageId,
      });
      results.push({ email, status: "sent", error: null });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to send";
      await finishClientMonthlyDelivery({
        deliveryId,
        status: "failed",
        error: message,
      });
      results.push({ email, status: "failed", error: message });
    }
  }
  const sent = results.filter((result) => result.status === "sent").length;
  res.json(SendClientMonthlyEmailResponse.parse({
    sent,
    failed: results.length - sent,
    results,
  }));
});
router.get("/outreach/prospects", requireAuth, async (_req, res): Promise<void> => { const rows = await db.select().from(prospectsTable).orderBy(desc(prospectsTable.createdAt)); res.json(ListProspectsResponse.parse(rows.map(prospectJson))); });
router.post("/outreach/prospects", requireAuth, async (req, res): Promise<void> => {
  const data = CreateProspectBody.safeParse(req.body); if (!data.success) { res.status(400).json({ error: data.error.message }); return; }
  const [row] = await db.insert(prospectsTable).values({
    ...data.data,
    contactEmail: data.data.contactEmail ? normalizeEmail(data.data.contactEmail) : null,
  }).returning();
  res.status(201).json(CreateProspectResponse.parse(prospectJson(row!)));
});
router.patch("/outreach/prospects/:id", requireAuth, async (req, res): Promise<void> => {
  const p = UpdateProspectParams.safeParse(req.params), data = UpdateProspectBody.safeParse(req.body); if (!p.success || !data.success) { res.status(400).json({ error: "Invalid request" }); return; }
  const [row] = await db.update(prospectsTable).set({
    ...data.data,
    contactEmail: data.data.contactEmail ? normalizeEmail(data.data.contactEmail) : null,
  }).where(eq(prospectsTable.id, p.data.id)).returning();
  if (!row) { res.status(404).json({ error: "Prospect not found" }); return; } res.json(UpdateProspectResponse.parse(prospectJson(row)));
});
router.get("/outreach/campaigns", requireAuth, async (_req, res): Promise<void> => { const rows = await db.select().from(campaignsTable).orderBy(desc(campaignsTable.createdAt)); res.json(ListCampaignsResponse.parse(rows.map(campaignJson))); });
router.post("/outreach/campaigns", requireAuth, async (req, res): Promise<void> => { const data = CreateCampaignBody.safeParse(req.body); if (!data.success) { res.status(400).json({ error: data.error.message }); return; } const [row] = await db.insert(campaignsTable).values(data.data).returning(); res.status(201).json(CreateCampaignResponse.parse(campaignJson(row!))); });
router.patch("/outreach/campaigns/:id", requireAuth, async (req, res): Promise<void> => { const p = UpdateCampaignParams.safeParse(req.params), data = UpdateCampaignBody.safeParse(req.body); if (!p.success || !data.success) { res.status(400).json({ error: "Invalid request" }); return; } const [row] = await db.update(campaignsTable).set(data.data).where(eq(campaignsTable.id, p.data.id)).returning(); if (!row) { res.status(404).json({ error: "Campaign not found" }); return; } res.json(UpdateCampaignResponse.parse(campaignJson(row))); });
router.get("/outreach/research-schedules", requireAuth, async (_req, res): Promise<void> => {
  const [schedules, runs] = await Promise.all([
    db.select().from(outreachResearchSchedulesTable).orderBy(desc(outreachResearchSchedulesTable.createdAt)),
    db.select().from(outreachResearchScheduleRunsTable).orderBy(desc(outreachResearchScheduleRunsTable.startedAt)),
  ]);
  const latestBySchedule = new Map<number, ResearchScheduleRun>();
  for (const run of runs) {
    if (!latestBySchedule.has(run.scheduleId)) latestBySchedule.set(run.scheduleId, run);
  }
  res.json(ListOutreachResearchSchedulesResponse.parse(
    schedules.map((schedule) => researchScheduleJson(schedule, latestBySchedule.get(schedule.id))),
  ));
});
router.put("/outreach/campaigns/:id/research-schedule", requireAuth, async (req, res): Promise<void> => {
  const params = UpdateOutreachResearchScheduleParams.safeParse(req.params);
  const input = UpdateOutreachResearchScheduleBody.safeParse(req.body);
  if (!params.success || !input.success) {
    res.status(400).json({ error: "Invalid research schedule" });
    return;
  }
  if (input.data.localHour !== undefined && input.data.localHour !== OUTREACH_RESEARCH_LOCAL_HOUR) {
    res.status(400).json({ error: "Morning research is fixed at 8:00 AM Phoenix time" });
    return;
  }
  const [campaign] = await db.select().from(campaignsTable).where(eq(campaignsTable.id, params.data.id));
  if (!campaign) {
    res.status(404).json({ error: "Campaign not found" });
    return;
  }
  const [schedule] = await db.transaction(async (tx) => {
    if (input.data.enabled) {
      await tx.update(outreachResearchSchedulesTable).set({
        enabled: false,
        updatedAt: new Date(),
      }).where(eq(outreachResearchSchedulesTable.enabled, true));
    }
    return tx.insert(outreachResearchSchedulesTable).values({
      campaignId: campaign.id,
      enabled: input.data.enabled,
      timezone: OUTREACH_RESEARCH_TIMEZONE,
      localHour: OUTREACH_RESEARCH_LOCAL_HOUR,
      targetCount: Math.min(10, input.data.targetCount ?? 10),
    }).onConflictDoUpdate({
      target: outreachResearchSchedulesTable.campaignId,
      set: {
        enabled: input.data.enabled,
        timezone: OUTREACH_RESEARCH_TIMEZONE,
        localHour: OUTREACH_RESEARCH_LOCAL_HOUR,
        targetCount: Math.min(10, input.data.targetCount ?? 10),
        updatedAt: new Date(),
      },
    }).returning();
  });
  const [latestRun] = await db.select().from(outreachResearchScheduleRunsTable)
    .where(eq(outreachResearchScheduleRunsTable.scheduleId, schedule!.id))
    .orderBy(desc(outreachResearchScheduleRunsTable.startedAt))
    .limit(1);
  res.json(UpdateOutreachResearchScheduleResponse.parse(researchScheduleJson(schedule!, latestRun)));
});
router.get("/outreach/messages", requireAuth, async (_req, res): Promise<void> => { const rows = await db.select().from(outreachMessagesTable).orderBy(desc(outreachMessagesTable.createdAt)); res.json(ListOutreachMessagesResponse.parse(rows.map(messageJson))); });
router.post("/outreach/messages", requireAuth, async (req, res): Promise<void> => { const data = CreateOutreachMessageBody.safeParse(req.body); if (!data.success) { res.status(400).json({ error: data.error.message }); return; } const attributionError = await validateAttribution(data.data.sourceType, data.data.sourceId); if (attributionError) { res.status(400).json({ error: attributionError }); return; } const [row] = await db.insert(outreachMessagesTable).values({ ...data.data, status: "draft", scheduledAt: data.data.scheduledAt ? new Date(data.data.scheduledAt) : undefined }).returning(); res.status(201).json(CreateOutreachMessageResponse.parse(messageJson(row!))); });
router.patch("/outreach/messages/:id", requireAuth, async (req, res): Promise<void> => { const p = UpdateOutreachMessageParams.safeParse(req.params), data = UpdateOutreachMessageBody.safeParse(req.body); if (!p.success || !data.success) { res.status(400).json({ error: "Invalid request" }); return; } const attributionError = await validateAttribution(data.data.sourceType, data.data.sourceId); if (attributionError) { res.status(400).json({ error: attributionError }); return; } const [row] = await db.update(outreachMessagesTable).set({ ...data.data, status: "draft", scheduledAt: data.data.scheduledAt ? new Date(data.data.scheduledAt) : undefined }).where(and(eq(outreachMessagesTable.id, p.data.id), eq(outreachMessagesTable.status, "draft"))).returning(); if (!row) { res.status(409).json({ error: "Only draft messages can be edited" }); return; } res.json(UpdateOutreachMessageResponse.parse(messageJson(row))); });
router.post("/outreach/prospects/:id/draft", requireAuth, async (req, res): Promise<void> => {
  const p = GenerateOutreachDraftParams.safeParse(req.params), input = GenerateOutreachDraftBody.safeParse(req.body ?? {});
  if (!p.success || !input.success) { res.status(400).json({ error: "Invalid request" }); return; }
  const attributionError = await validateAttribution(input.data.sourceType, input.data.sourceId);
  if (attributionError) { res.status(400).json({ error: attributionError }); return; }
  const [prospect] = await db.select().from(prospectsTable).where(eq(prospectsTable.id, p.data.id));
  if (!prospect) { res.status(404).json({ error: "Prospect not found" }); return; }
  if (input.data.campaignId) { const [campaign] = await db.select().from(campaignsTable).where(eq(campaignsTable.id, input.data.campaignId)); if (!campaign) { res.status(404).json({ error: "Campaign not found" }); return; } }
  try {
    const draft = await generateProspectDraft(prospect);
    const rows = await db.insert(outreachMessagesTable).values([
      {
        prospectId: prospect.id,
        campaignId: input.data.campaignId,
        sequenceNumber: 1,
        subject: draft.subject,
        body: draft.body,
        sourceType: input.data.sourceType,
        sourceId: input.data.sourceId,
      },
      ...draft.followUps.map((followUp, index) => ({
          prospectId: prospect.id,
          campaignId: input.data.campaignId,
          sequenceNumber: index + 2,
          subject: followUp.subject,
          body: followUp.body,
          scheduledAt: null,
          sourceType: input.data.sourceType,
          sourceId: input.data.sourceId,
      })),
    ]).returning();
    res.status(201).json(GenerateOutreachDraftResponse.parse(rows.map(messageJson)));
  } catch (err) { req.log.error({ err }, "Outreach draft generation failed"); res.status(502).json({ error: "Unable to generate outreach draft" }); }
});
router.post("/outreach/prospects/:id/replied", requireAuth, async (req, res): Promise<void> => {
  const p = MarkOutreachProspectRepliedParams.safeParse(req.params);
  if (!p.success) { res.status(400).json({ error: p.error.message }); return; }
  const [prospect] = await db.update(prospectsTable)
    .set({ status: "replied" })
    .where(eq(prospectsTable.id, p.data.id))
    .returning();
  if (!prospect) { res.status(404).json({ error: "Prospect not found" }); return; }
  await db.update(outreachMessagesTable)
    .set({ status: "replied", error: "Sequence stopped after reply" })
    .where(and(
      eq(outreachMessagesTable.prospectId, prospect.id),
      inArray(outreachMessagesTable.status, ["draft", "approved", "sending"]),
    ));
  res.json(MarkOutreachProspectRepliedResponse.parse(prospectJson(prospect)));
});
router.post("/outreach/messages/:id/approve", requireAuth, async (req, res): Promise<void> => {
  const p = ApproveOutreachMessageParams.safeParse(req.params); if (!p.success) { res.status(400).json({ error: p.error.message }); return; }
  const [row] = await db.update(outreachMessagesTable).set({ status: "approved" }).where(and(eq(outreachMessagesTable.id, p.data.id), eq(outreachMessagesTable.status, "draft"))).returning();
  if (!row) { res.status(409).json({ error: "Only draft messages can be approved" }); return; } res.json(ApproveOutreachMessageResponse.parse(messageJson(row)));
});
router.post("/outreach/messages/:id/send", requireAuth, async (req, res): Promise<void> => {
  const p = SendOutreachMessageParams.safeParse(req.params); if (!p.success) { res.status(400).json({ error: p.error.message }); return; }
  const [message] = await db.select().from(outreachMessagesTable).where(eq(outreachMessagesTable.id, p.data.id));
  if (!message) { res.status(404).json({ error: "Message not found" }); return; }
  const [prospect] = await db.select().from(prospectsTable).where(eq(prospectsTable.id, message.prospectId));
  if (!prospect) { res.status(404).json({ error: "Prospect not found" }); return; }
  const [campaign] = message.campaignId ? await db.select().from(campaignsTable).where(eq(campaignsTable.id, message.campaignId)) : [];
  if (message.campaignId && !campaign) { res.status(409).json({ error: "Campaign not found" }); return; }
  try {
    const [claimed] = await db.update(outreachMessagesTable)
      .set({ status: "sending", error: null })
      .where(and(
        eq(outreachMessagesTable.id, message.id),
        eq(outreachMessagesTable.status, "approved"),
      ))
      .returning();
    if (!claimed) { res.status(409).json({ error: "Message is no longer available to send" }); return; }
    const sent = await sendApprovedOutreach(message, prospect, campaign);
    const [row] = await db.update(outreachMessagesTable).set({
      status: "sent",
      sentAt: new Date(),
      providerMessageId: sent.providerMessageId,
      error: null,
    }).where(and(
      eq(outreachMessagesTable.id, message.id),
      eq(outreachMessagesTable.status, "sending"),
    )).returning();
    if (!row) { res.status(409).json({ error: "A terminal event stopped this message during dispatch" }); return; }
    if (message.sequenceNumber === 1) {
      await db.update(prospectsTable).set({ status: "contacted" }).where(eq(prospectsTable.id, prospect.id));
    }
    res.json(SendOutreachMessageResponse.parse(messageJson(row!)));
  } catch (err) {
    const error = err instanceof Error ? err.message : "Unable to send message";
    await db.update(outreachMessagesTable).set({
      status: isUnknownSendResultError(err) ? "sending" : "failed",
      error,
    }).where(and(
      eq(outreachMessagesTable.id, message.id),
      eq(outreachMessagesTable.status, "sending"),
    ));
    req.log.warn({ messageId: message.id, error }, "Outreach send rejected or failed");
    res.status(409).json({ error });
  }
});
router.post("/outreach/suppressions", requireAuth, async (req, res): Promise<void> => {
  const data = SuppressOutreachAddressBody.safeParse(req.body); if (!data.success) { res.status(400).json({ error: data.error.message }); return; }
  const email = normalizeEmail(data.data.email); const [row] = await db.insert(outreachSuppressionsTable).values({ email, reason: data.data.reason }).onConflictDoNothing().returning();
  const result = row ?? (await db.select().from(outreachSuppressionsTable).where(eq(outreachSuppressionsTable.email, email)))[0];
  const matches = await db.select({ id: prospectsTable.id }).from(prospectsTable).where(eq(prospectsTable.contactEmail, email));
  const prospectIds = matches.map((prospect) => prospect.id);
  if (prospectIds.length > 0) {
    await db.update(prospectsTable).set({ status: "suppressed" }).where(inArray(prospectsTable.id, prospectIds));
    await db.update(outreachMessagesTable)
      .set({ status: "unsubscribed", error: `Sequence stopped: ${data.data.reason}` })
      .where(and(
        inArray(outreachMessagesTable.prospectId, prospectIds),
        inArray(outreachMessagesTable.status, ["draft", "approved", "sending"]),
      ));
  }
  res.status(201).json(SuppressOutreachAddressResponse.parse({ ...result!, createdAt: result!.createdAt.toISOString() }));
});
router.get("/outreach/suppressions", requireAuth, async (_req, res): Promise<void> => {
  const rows = await db.select().from(outreachSuppressionsTable).orderBy(desc(outreachSuppressionsTable.createdAt));
  res.json(ListOutreachSuppressionsResponse.parse(rows.map((row) => ({ ...row, createdAt: row.createdAt.toISOString() }))));
});
router.get("/outreach/research-runs", requireAuth, async (_req, res): Promise<void> => {
  const rows = await db.select().from(outreachResearchRunsTable).orderBy(desc(outreachResearchRunsTable.createdAt));
  res.json(ListOutreachResearchRunsResponse.parse(rows.map(researchRunJson)));
});
router.post("/outreach/research-runs", requireAuth, async (req, res): Promise<void> => {
  const input = RunOutreachResearchBody.safeParse(req.body);
  if (!input.success) { res.status(400).json({ error: input.error.message }); return; }
  const [run] = await db.insert(outreachResearchRunsTable).values({
    state: input.data.state,
    audience: input.data.audience,
    query: input.data.query?.trim() || "High-intent public project and capacity signals",
    status: "running",
  }).returning();
  try {
    const discovery = await discoverPublicProspects(input.data);
    const existingKeys = discovery.prospects.length === 0
      ? []
      : await db.select({ dedupeKey: prospectsTable.dedupeKey })
        .from(prospectsTable)
        .where(inArray(prospectsTable.dedupeKey, discovery.prospects.map((candidate) => candidate.dedupeKey)));
    const existing = new Set(existingKeys.map((row) => row.dedupeKey));
    const newCandidates = discovery.prospects.filter((candidate) => !existing.has(candidate.dedupeKey));
    const inserted = newCandidates.length === 0
      ? []
      : await db.insert(prospectsTable).values(newCandidates.map((candidate) => ({
        ...candidate,
        researchRunId: run!.id,
        status: "review",
        emailStatus: "unverified",
        contactConfidence: "unknown",
      }))).returning();
    const [completed] = await db.update(outreachResearchRunsTable).set({
      query: discovery.query,
      status: "completed",
      resultCount: inserted.length,
      skippedCount: Math.max(0, discovery.prospects.length - inserted.length),
      completedAt: new Date(),
    }).where(eq(outreachResearchRunsTable.id, run!.id)).returning();
    res.status(201).json(RunOutreachResearchResponse.parse({
      run: researchRunJson(completed!),
      prospects: inserted.map(prospectJson),
    }));
  } catch (err) {
    const message = err instanceof Error ? err.message : "Research failed";
    await db.update(outreachResearchRunsTable).set({
      status: "failed",
      error: message,
      completedAt: new Date(),
    }).where(eq(outreachResearchRunsTable.id, run!.id));
    req.log.error({ err, researchRunId: run!.id }, "Outreach public research failed");
    res.status(502).json({ error: "Unable to complete public research" });
  }
});
async function unsubscribeOutreach(req: Request, res: Response): Promise<void> {
  const data = UnsubscribeOutreachAddressBody.safeParse({ email: req.body?.email ?? req.query.email, token: req.body?.token ?? req.query.token });
  if (!data.success || !verifyUnsubscribeToken(data.success ? data.data.email : "", data.success ? data.data.token : "")) { res.status(400).json({ error: "Invalid unsubscribe request" }); return; }
  const email = normalizeEmail(data.data.email);
  await suppressOutreachEmail(email);
  res.json(UnsubscribeOutreachAddressResponse.parse({ ok: true }));
}
router.get("/outreach/unsubscribe", unsubscribeOutreach);
router.post("/outreach/unsubscribe", unsubscribeOutreach);
export default router;