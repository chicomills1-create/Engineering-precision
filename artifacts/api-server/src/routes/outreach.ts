import { Router, type IRouter, type Request, type Response } from "express";
import { and, count, desc, eq, gte } from "drizzle-orm";
import { campaignsTable, db, outreachMessagesTable, outreachSuppressionsTable, prospectsTable } from "@workspace/db";
import {
  ApproveOutreachMessageParams, ApproveOutreachMessageResponse, CreateCampaignBody, CreateCampaignResponse,
  CreateOutreachMessageBody, CreateOutreachMessageResponse, CreateProspectBody, CreateProspectResponse,
  GenerateOutreachDraftBody, GenerateOutreachDraftParams, GenerateOutreachDraftResponse,
  GetOutreachDashboardResponse, ListCampaignsResponse, ListOutreachMessagesResponse, ListProspectsResponse,
  SendOutreachMessageParams, SendOutreachMessageResponse, SuppressOutreachAddressBody, SuppressOutreachAddressResponse,
  UnsubscribeOutreachAddressBody, UnsubscribeOutreachAddressResponse, UpdateCampaignBody, UpdateCampaignParams,
  UpdateCampaignResponse, UpdateOutreachMessageBody, UpdateOutreachMessageParams, UpdateOutreachMessageResponse,
  UpdateProspectBody, UpdateProspectParams, UpdateProspectResponse,
} from "@workspace/api-zod";
import { requireAuth } from "../middlewares/requireAuth";
import { generateProspectDraft, sendApprovedOutreach } from "../lib/outreach";
import { verifyUnsubscribeToken } from "../lib/unsubscribeToken";

const router: IRouter = Router();
const normalizeEmail = (email: string) => email.trim().toLowerCase();
const prospectJson = (p: typeof prospectsTable.$inferSelect) => ({ ...p, createdAt: p.createdAt.toISOString(), updatedAt: p.updatedAt.toISOString() });
const campaignJson = (c: typeof campaignsTable.$inferSelect) => ({ ...c, createdAt: c.createdAt.toISOString(), updatedAt: c.updatedAt.toISOString() });
const messageJson = (m: typeof outreachMessagesTable.$inferSelect) => ({ ...m, scheduledAt: m.scheduledAt?.toISOString() ?? null, sentAt: m.sentAt?.toISOString() ?? null, createdAt: m.createdAt.toISOString(), updatedAt: m.updatedAt.toISOString() });

router.get("/outreach/dashboard", requireAuth, async (_req, res): Promise<void> => {
  const start = new Date(); start.setHours(0, 0, 0, 0);
  const [[prospects], [campaigns], [messages], [sentToday], [replies]] = await Promise.all([
    db.select({ value: count() }).from(prospectsTable), db.select({ value: count() }).from(campaignsTable),
    db.select({ value: count() }).from(outreachMessagesTable),
    db.select({ value: count() }).from(outreachMessagesTable).where(gte(outreachMessagesTable.sentAt, start)),
    db.select({ value: count() }).from(outreachMessagesTable).where(eq(outreachMessagesTable.status, "replied")),
  ]);
  res.json(GetOutreachDashboardResponse.parse({ prospects: prospects?.value ?? 0, campaigns: campaigns?.value ?? 0, messages: messages?.value ?? 0, sentToday: sentToday?.value ?? 0, replies: replies?.value ?? 0 }));
});
router.get("/outreach/prospects", requireAuth, async (_req, res): Promise<void> => { const rows = await db.select().from(prospectsTable).orderBy(desc(prospectsTable.createdAt)); res.json(ListProspectsResponse.parse(rows.map(prospectJson))); });
router.post("/outreach/prospects", requireAuth, async (req, res): Promise<void> => {
  const data = CreateProspectBody.safeParse(req.body); if (!data.success) { res.status(400).json({ error: data.error.message }); return; }
  const [row] = await db.insert(prospectsTable).values({ ...data.data, contactEmail: normalizeEmail(data.data.contactEmail) }).returning();
  res.status(201).json(CreateProspectResponse.parse(prospectJson(row!)));
});
router.patch("/outreach/prospects/:id", requireAuth, async (req, res): Promise<void> => {
  const p = UpdateProspectParams.safeParse(req.params), data = UpdateProspectBody.safeParse(req.body); if (!p.success || !data.success) { res.status(400).json({ error: "Invalid request" }); return; }
  const [row] = await db.update(prospectsTable).set({ ...data.data, contactEmail: normalizeEmail(data.data.contactEmail) }).where(eq(prospectsTable.id, p.data.id)).returning();
  if (!row) { res.status(404).json({ error: "Prospect not found" }); return; } res.json(UpdateProspectResponse.parse(prospectJson(row)));
});
router.get("/outreach/campaigns", requireAuth, async (_req, res): Promise<void> => { const rows = await db.select().from(campaignsTable).orderBy(desc(campaignsTable.createdAt)); res.json(ListCampaignsResponse.parse(rows.map(campaignJson))); });
router.post("/outreach/campaigns", requireAuth, async (req, res): Promise<void> => { const data = CreateCampaignBody.safeParse(req.body); if (!data.success) { res.status(400).json({ error: data.error.message }); return; } const [row] = await db.insert(campaignsTable).values(data.data).returning(); res.status(201).json(CreateCampaignResponse.parse(campaignJson(row!))); });
router.patch("/outreach/campaigns/:id", requireAuth, async (req, res): Promise<void> => { const p = UpdateCampaignParams.safeParse(req.params), data = UpdateCampaignBody.safeParse(req.body); if (!p.success || !data.success) { res.status(400).json({ error: "Invalid request" }); return; } const [row] = await db.update(campaignsTable).set(data.data).where(eq(campaignsTable.id, p.data.id)).returning(); if (!row) { res.status(404).json({ error: "Campaign not found" }); return; } res.json(UpdateCampaignResponse.parse(campaignJson(row))); });
router.get("/outreach/messages", requireAuth, async (_req, res): Promise<void> => { const rows = await db.select().from(outreachMessagesTable).orderBy(desc(outreachMessagesTable.createdAt)); res.json(ListOutreachMessagesResponse.parse(rows.map(messageJson))); });
router.post("/outreach/messages", requireAuth, async (req, res): Promise<void> => { const data = CreateOutreachMessageBody.safeParse(req.body); if (!data.success) { res.status(400).json({ error: data.error.message }); return; } const [row] = await db.insert(outreachMessagesTable).values({ ...data.data, scheduledAt: data.data.scheduledAt ? new Date(data.data.scheduledAt) : undefined }).returning(); res.status(201).json(CreateOutreachMessageResponse.parse(messageJson(row!))); });
router.patch("/outreach/messages/:id", requireAuth, async (req, res): Promise<void> => { const p = UpdateOutreachMessageParams.safeParse(req.params), data = UpdateOutreachMessageBody.safeParse(req.body); if (!p.success || !data.success) { res.status(400).json({ error: "Invalid request" }); return; } const [row] = await db.update(outreachMessagesTable).set({ ...data.data, scheduledAt: data.data.scheduledAt ? new Date(data.data.scheduledAt) : undefined }).where(eq(outreachMessagesTable.id, p.data.id)).returning(); if (!row) { res.status(404).json({ error: "Message not found" }); return; } res.json(UpdateOutreachMessageResponse.parse(messageJson(row))); });
router.post("/outreach/prospects/:id/draft", requireAuth, async (req, res): Promise<void> => {
  const p = GenerateOutreachDraftParams.safeParse(req.params), input = GenerateOutreachDraftBody.safeParse(req.body ?? {});
  if (!p.success || !input.success) { res.status(400).json({ error: "Invalid request" }); return; }
  const [prospect] = await db.select().from(prospectsTable).where(eq(prospectsTable.id, p.data.id));
  if (!prospect) { res.status(404).json({ error: "Prospect not found" }); return; }
  if (input.data.campaignId) { const [campaign] = await db.select().from(campaignsTable).where(eq(campaignsTable.id, input.data.campaignId)); if (!campaign) { res.status(404).json({ error: "Campaign not found" }); return; } }
  try {
    const draft = await generateProspectDraft(prospect);
    const rows = await db.insert(outreachMessagesTable).values([{ prospectId: prospect.id, campaignId: input.data.campaignId, sequenceNumber: 1, subject: draft.subject, body: draft.body }, ...draft.followUps.map((f, i) => ({ prospectId: prospect.id, campaignId: input.data.campaignId, sequenceNumber: i + 2, subject: f.subject, body: f.body }))]).returning();
    res.status(201).json(GenerateOutreachDraftResponse.parse(rows.map(messageJson)));
  } catch (err) { req.log.error({ err }, "Outreach draft generation failed"); res.status(502).json({ error: "Unable to generate outreach draft" }); }
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
    const sent = await sendApprovedOutreach(message, prospect, campaign);
    const [row] = await db.update(outreachMessagesTable).set({
      status: "sent",
      sentAt: new Date(),
      providerMessageId: sent.providerMessageId,
      error: null,
    }).where(eq(outreachMessagesTable.id, message.id)).returning();
    if (message.sequenceNumber === 1) {
      await db.update(prospectsTable).set({ status: "contacted" }).where(eq(prospectsTable.id, prospect.id));
    }
    res.json(SendOutreachMessageResponse.parse(messageJson(row!)));
  } catch (err) {
    const error = err instanceof Error ? err.message : "Unable to send message";
    await db.update(outreachMessagesTable).set({ error }).where(eq(outreachMessagesTable.id, message.id));
    req.log.warn({ messageId: message.id, error }, "Outreach send rejected or failed");
    res.status(409).json({ error });
  }
});
router.post("/outreach/suppressions", requireAuth, async (req, res): Promise<void> => {
  const data = SuppressOutreachAddressBody.safeParse(req.body); if (!data.success) { res.status(400).json({ error: data.error.message }); return; }
  const email = normalizeEmail(data.data.email); const [row] = await db.insert(outreachSuppressionsTable).values({ email, reason: data.data.reason }).onConflictDoNothing().returning();
  const result = row ?? (await db.select().from(outreachSuppressionsTable).where(eq(outreachSuppressionsTable.email, email)))[0];
  res.status(201).json(SuppressOutreachAddressResponse.parse({ ...result!, createdAt: result!.createdAt.toISOString() }));
});
async function unsubscribeOutreach(req: Request, res: Response): Promise<void> {
  const data = UnsubscribeOutreachAddressBody.safeParse({ email: req.body?.email ?? req.query.email, token: req.body?.token ?? req.query.token });
  if (!data.success || !verifyUnsubscribeToken(data.success ? data.data.email : "", data.success ? data.data.token : "")) { res.status(400).json({ error: "Invalid unsubscribe request" }); return; }
  const email = normalizeEmail(data.data.email); await db.insert(outreachSuppressionsTable).values({ email, reason: "unsubscribe" }).onConflictDoNothing(); res.json(UnsubscribeOutreachAddressResponse.parse({ ok: true }));
}
router.get("/outreach/unsubscribe", unsubscribeOutreach);
router.post("/outreach/unsubscribe", unsubscribeOutreach);
export default router;