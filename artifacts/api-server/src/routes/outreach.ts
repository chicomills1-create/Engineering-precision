import { Router, type IRouter, type Request, type Response } from "express";
import { and, count, countDistinct, desc, eq, gt, gte, inArray, isNotNull, lt, ne, or, sql } from "drizzle-orm";
import {
  campaignsTable,
  db,
  leadsTable,
  outreachDeliveryEventsTable,
  outreachMessagesTable,
  outreachRepliesTable,
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
  ListOutreachRepliesResponse,
  ListOutreachHotLeadsResponse,
  ListOutreachResearchRunsResponse, ListOutreachResearchSchedulesResponse, ListOutreachSuppressionsResponse,
  MarkOutreachProspectRepliedParams, MarkOutreachProspectRepliedResponse,
  ReconcileOutreachMessagesResponse,
  RecordOutreachContactEvidenceBody, RecordOutreachContactEvidenceParams, RecordOutreachContactEvidenceResponse,
  RunOutreachResearchBody, RunOutreachResearchResponse,
  SendOutreachMessageParams, SendOutreachMessageResponse, SuppressOutreachAddressBody, SuppressOutreachAddressResponse,
  UnsubscribeOutreachAddressBody, UnsubscribeOutreachAddressResponse, UpdateCampaignBody, UpdateCampaignParams,
  UpdateCampaignResponse, UpdateOutreachMessageBody, UpdateOutreachMessageParams, UpdateOutreachMessageResponse,
  UpdateOutreachResearchScheduleBody, UpdateOutreachResearchScheduleParams, UpdateOutreachResearchScheduleResponse,
  UpdateOutreachReplyBody, UpdateOutreachReplyParams, UpdateOutreachReplyResponse,
  UpdateProspectBody, UpdateProspectParams, UpdateProspectResponse,
} from "@workspace/api-zod";
import { requireAuth } from "../middlewares/requireAuth";
import {
  generateProspectDraft,
  isUnknownSendResultError,
} from "../lib/outreach";
import { verifyUnsubscribeToken } from "../lib/unsubscribeToken";
import { suppressOutreachEmail } from "../lib/outreachSuppression";
import { discoverPublicProspects } from "../lib/publicResearch";
import { claimOutreachMessageForSending, getOutreachAutomationStatus, sendClaimedOutreachMessage } from "../lib/outreachWorker";
import {
  OUTREACH_RESEARCH_LOCAL_HOUR,
  OUTREACH_RESEARCH_TIMEZONE,
} from "../lib/outreachResearchScheduler";
import { getOutreachDiscoveryDailyCap } from "../lib/outreachThroughputConfig";
import {
  claimClientMonthlyDelivery,
  finishClientMonthlyDelivery,
  getClientMonthlySafeList,
  sendClientMonthlyMessage,
} from "../lib/clientMonthlyOutreach";
import { validateAttributionPair, validateAttributionSourceStatus, type AttributionSourceType } from "../lib/growthAttribution";
import {
  assertOutreachEligibilityBase,
  getFollowUpScheduledAt,
  getPhoenixCalendarDayStart,
} from "../lib/outreachEligibility";
import {
  approveInitialMessageInPreparationWindow,
  getNextOutreachPreparationStatus,
} from "../lib/outreachPreparation";
import { recordContactEvidence } from "../lib/outreachContactEvidence";
import { reconcileUncertainOutreachMessages } from "../lib/outreachReconciliation";
import { getVerifiedInitialEngagementAt } from "../lib/outreachSequence";
import { approvedOutreachFollowUpMessages } from "../lib/verifiedOutreachBatch";
import { buildOutreachHotLeads } from "../lib/outreachHotLeads";
import { getOutreachRuntimeConfig, requiredDailyPace } from "../lib/outreachSystemConfig";
import { getOutreachDailyLane } from "../lib/outreach";
import { SEPTEMBER_OUTREACH_LANE_TARGETS, SEPTEMBER_OUTREACH_RELAUNCH_DAILY_TARGET } from "../lib/outreachLaneConfig";

const router: IRouter = Router();
const normalizeEmail = (email: string) => email.trim().toLowerCase();
const prospectJson = (p: typeof prospectsTable.$inferSelect) => ({
  ...p,
  contactEvidenceAt: p.contactEvidenceAt?.toISOString() ?? null,
  contactReviewAt: p.contactReviewAt?.toISOString() ?? null,
  createdAt: p.createdAt.toISOString(),
  updatedAt: p.updatedAt.toISOString(),
});
const campaignJson = (c: typeof campaignsTable.$inferSelect) => ({ ...c, createdAt: c.createdAt.toISOString(), updatedAt: c.updatedAt.toISOString() });
async function getAttributionLabel(sourceType: AttributionSourceType | null, sourceId: number | null): Promise<string | null> {
  if (!sourceType || !sourceId) return null;
  if (sourceType === "lead") {
    const [lead] = await db.select({ name: leadsTable.name, company: leadsTable.company }).from(leadsTable).where(eq(leadsTable.id, sourceId)).limit(1);
    return lead ? [lead.name, lead.company].filter(Boolean).join(" · ") : null;
  }
  if (sourceType === "referral_partner") {
    const [partner] = await db.select({ companyName: referralPartnersTable.companyName, contactName: referralPartnersTable.contactName }).from(referralPartnersTable).where(eq(referralPartnersTable.id, sourceId)).limit(1);
    return partner ? [partner.companyName, partner.contactName].filter(Boolean).join(" · ") : null;
  }
  if (sourceType !== "public_opportunity") return null;
  const [opportunity] = await db.select({ title: publicOpportunitiesTable.title, buyerOrFirm: publicOpportunitiesTable.buyerOrFirm }).from(publicOpportunitiesTable).where(eq(publicOpportunitiesTable.id, sourceId)).limit(1);
  return opportunity ? [opportunity.title, opportunity.buyerOrFirm].filter(Boolean).join(" · ") : null;
}
const messageJson = async (m: typeof outreachMessagesTable.$inferSelect) => ({
  ...m,
  sourceLabel: await getAttributionLabel(m.sourceType as AttributionSourceType | null, m.sourceId),
  scheduledAt: m.scheduledAt?.toISOString() ?? null,
  sentAt: m.sentAt?.toISOString() ?? null,
  createdAt: m.createdAt.toISOString(),
  updatedAt: m.updatedAt.toISOString(),
});
async function replyJson(reply: typeof outreachRepliesTable.$inferSelect) {
  const [prospect] = reply.prospectId
    ? await db.select().from(prospectsTable).where(eq(prospectsTable.id, reply.prospectId)).limit(1)
    : [];
  const [message] = reply.outreachMessageId
    ? await db.select().from(outreachMessagesTable).where(eq(outreachMessagesTable.id, reply.outreachMessageId)).limit(1)
    : [];
  return {
    id: reply.id,
    senderEmail: reply.senderEmail,
    senderName: reply.senderName,
    recipientEmail: reply.recipientEmail,
    subject: reply.subject,
    textBody: reply.textBody,
    messageType: reply.messageType,
    sentiment: reply.sentiment,
    prospectId: reply.prospectId,
    outreachMessageId: reply.outreachMessageId,
    companyName: prospect?.companyName ?? null,
    contactName: prospect?.contactName ?? null,
    campaignId: message?.campaignId ?? prospect?.campaignId ?? null,
    sequenceNumber: message?.sequenceNumber ?? null,
    status: reply.status,
    assignedTo: reply.assignedTo,
    internalNote: reply.internalNote,
    followUpAt: reply.followUpAt?.toISOString() ?? null,
    receivedAt: reply.receivedAt.toISOString(),
    readAt: reply.readAt?.toISOString() ?? null,
    resolvedAt: reply.resolvedAt?.toISOString() ?? null,
    forwardStatus: reply.forwardStatus,
    forwardError: reply.forwardError,
    forwardedAt: reply.forwardedAt?.toISOString() ?? null,
    createdAt: reply.createdAt.toISOString(),
    updatedAt: reply.updatedAt.toISOString(),
  };
}
async function validateAttribution(sourceType?: AttributionSourceType, sourceId?: number): Promise<string | null> {
  const pairError = validateAttributionPair(sourceType, sourceId);
  if (pairError) return pairError;
  if (!sourceType || !sourceId) return null;
  if (sourceType === "lead") {
    const [source] = await db.select({ status: leadsTable.status }).from(leadsTable).where(eq(leadsTable.id, sourceId)).limit(1);
    return source ? validateAttributionSourceStatus(sourceType, source.status) : `The selected ${sourceType} source does not exist`;
  }
  if (sourceType === "referral_partner") {
    const [source] = await db.select({ status: referralPartnersTable.relationshipStatus }).from(referralPartnersTable).where(eq(referralPartnersTable.id, sourceId)).limit(1);
    return source ? validateAttributionSourceStatus(sourceType, source.status) : `The selected ${sourceType} source does not exist`;
  }
  const [source] = await db.select({ status: publicOpportunitiesTable.pipelineStatus }).from(publicOpportunitiesTable).where(eq(publicOpportunitiesTable.id, sourceId)).limit(1);
  return source ? validateAttributionSourceStatus(sourceType, source.status) : `The selected ${sourceType} source does not exist`;
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
  const start = getPhoenixCalendarDayStart();
  const end = new Date(start.getTime() + 24 * 60 * 60 * 1000);
  const runtimeConfig = getOutreachRuntimeConfig();
  const monthStart = runtimeConfig
    ? new Date(`${runtimeConfig.month}-01T00:00:00-07:00`)
    : new Date(0);
  const monthlyEnd = new Date(Date.UTC(monthStart.getUTCFullYear(), monthStart.getUTCMonth() + 1, 1));
  const monthlyWindow = and(gte(outreachMessagesTable.sentAt, monthStart), lt(outreachMessagesTable.sentAt, monthlyEnd));
   const sentTodayWindow = and(
     gte(outreachMessagesTable.sentAt, start),
     lt(outreachMessagesTable.sentAt, end),
   );
   const eventTodayWindow = and(
     gte(outreachDeliveryEventsTable.occurredAt, start),
     lt(outreachDeliveryEventsTable.occurredAt, end),
   );
  const [
    [prospects],
    [campaigns],
    [messages],
    [upcomingFollowUps],
    [stoppedSequences],
    [initialOpeners],
    [followUpDelivered],
    [followUpBounced],
    [followUpReplies],
    [providerProcessedToday],
     [acceptedToday],
    [deliveredToday],
    [bouncedToday],
    [unresolvedToday],
    [replies],
    [unreadReplies],
    preparation,
    [monthlySent],
    [qualifiedInventory],
    [monthlyDelivered],
    [monthlyBounced],
    [monthlyOpened],
    [monthlyClicked],
    [monthlyReplied],
    [positiveReplies],
    [negativeReplies],
    [suppressed],
    [unsubscribed],
    [newResearched],
    [newVerified],
  ] = await Promise.all([
    db.select({ value: count() }).from(prospectsTable), db.select({ value: count() }).from(campaignsTable),
    db.select({ value: count() }).from(outreachMessagesTable),
    db.select({ value: count() }).from(outreachMessagesTable).where(and(
      gt(outreachMessagesTable.sequenceNumber, 1),
      eq(outreachMessagesTable.status, "approved"),
      isNotNull(outreachMessagesTable.scheduledAt),
    )),
    db.select({ value: countDistinct(prospectsTable.id) })
      .from(prospectsTable)
      .innerJoin(
        outreachMessagesTable,
        eq(outreachMessagesTable.prospectId, prospectsTable.id),
      )
      .where(and(
        eq(outreachMessagesTable.sequenceNumber, 1),
        or(
          ne(prospectsTable.contactStatus, "active"),
          inArray(prospectsTable.status, ["replied", "suppressed", "not_a_fit"]),
        ),
      )),
    db.select({ value: countDistinct(outreachMessagesTable.prospectId) })
      .from(outreachMessagesTable)
      .innerJoin(
        outreachDeliveryEventsTable,
        eq(outreachDeliveryEventsTable.outreachMessageId, outreachMessagesTable.id),
      )
      .where(and(
        eq(outreachMessagesTable.sequenceNumber, 1),
        eq(outreachDeliveryEventsTable.eventType, "open"),
      )),
    db.select({ value: count() }).from(outreachMessagesTable).where(and(
      eq(outreachMessagesTable.sequenceNumber, 2),
      eq(outreachMessagesTable.status, "delivered"),
    )),
    db.select({ value: count() }).from(outreachMessagesTable).where(and(
      eq(outreachMessagesTable.sequenceNumber, 2),
      eq(outreachMessagesTable.status, "bounced"),
    )),
    db.select({ value: countDistinct(outreachRepliesTable.prospectId) })
      .from(outreachRepliesTable)
      .innerJoin(
        outreachMessagesTable,
        eq(outreachRepliesTable.outreachMessageId, outreachMessagesTable.id),
      )
      .where(and(
        eq(outreachMessagesTable.sequenceNumber, 2),
        eq(outreachRepliesTable.messageType, "reply"),
      )),
    db.select({ value: count() })
      .from(outreachDeliveryEventsTable)
      .innerJoin(
        outreachMessagesTable,
        eq(outreachDeliveryEventsTable.outreachMessageId, outreachMessagesTable.id),
      )
      .where(and(
       eventTodayWindow,
        eq(outreachDeliveryEventsTable.eventType, "processed"),
      )),
     db.select({ value: count() }).from(outreachMessagesTable).where(and(
       sentTodayWindow,
       eq(outreachMessagesTable.sequenceNumber, 1),
       isNotNull(outreachMessagesTable.sentAt),
     )),
    db.select({ value: count() }).from(outreachMessagesTable).where(and(
       sentTodayWindow,
      eq(outreachMessagesTable.status, "delivered"),
    )),
    db.select({ value: count() }).from(outreachMessagesTable).where(and(
       sentTodayWindow,
      eq(outreachMessagesTable.status, "bounced"),
    )),
    db.select({ value: count() }).from(outreachMessagesTable).where(and(
       sentTodayWindow,
      inArray(outreachMessagesTable.status, ["approved", "sending", "failed", "needs_review"]),
    )),
    db.select({ value: count() }).from(outreachMessagesTable).where(eq(outreachMessagesTable.status, "replied")),
    db.select({ value: count() }).from(outreachRepliesTable).where(eq(outreachRepliesTable.status, "unread")),
    getNextOutreachPreparationStatus(),
    db.select({ value: count() }).from(outreachMessagesTable).where(and(monthlyWindow, isNotNull(outreachMessagesTable.sentAt))),
    db.select({ value: count() }).from(prospectsTable).where(and(eq(prospectsTable.contactStatus, "active"), eq(prospectsTable.emailStatus, "verified"), ne(prospectsTable.status, "suppressed"))),
     db.select({ value: count() }).from(outreachDeliveryEventsTable).where(and(gte(outreachDeliveryEventsTable.occurredAt, monthStart), lt(outreachDeliveryEventsTable.occurredAt, monthlyEnd), eq(outreachDeliveryEventsTable.eventType, "delivered"))),
     db.select({ value: count() }).from(outreachDeliveryEventsTable).where(and(gte(outreachDeliveryEventsTable.occurredAt, monthStart), lt(outreachDeliveryEventsTable.occurredAt, monthlyEnd), inArray(outreachDeliveryEventsTable.eventType, ["bounce", "bounced"]))),
     db.select({ value: count() }).from(outreachDeliveryEventsTable).where(and(gte(outreachDeliveryEventsTable.occurredAt, monthStart), lt(outreachDeliveryEventsTable.occurredAt, monthlyEnd), eq(outreachDeliveryEventsTable.eventType, "open"))),
     db.select({ value: count() }).from(outreachDeliveryEventsTable).where(and(gte(outreachDeliveryEventsTable.occurredAt, monthStart), lt(outreachDeliveryEventsTable.occurredAt, monthlyEnd), eq(outreachDeliveryEventsTable.eventType, "click"))),
     db.select({ value: count() }).from(outreachRepliesTable).where(and(gte(outreachRepliesTable.receivedAt, monthStart), lt(outreachRepliesTable.receivedAt, monthlyEnd))),
     db.select({ value: count() }).from(outreachRepliesTable).where(and(gte(outreachRepliesTable.receivedAt, monthStart), lt(outreachRepliesTable.receivedAt, monthlyEnd), eq(outreachRepliesTable.sentiment, "positive"))),
     db.select({ value: count() }).from(outreachRepliesTable).where(and(gte(outreachRepliesTable.receivedAt, monthStart), lt(outreachRepliesTable.receivedAt, monthlyEnd), eq(outreachRepliesTable.sentiment, "negative"))),
     db.select({ value: count() }).from(outreachSuppressionsTable).where(and(gte(outreachSuppressionsTable.createdAt, monthStart), lt(outreachSuppressionsTable.createdAt, monthlyEnd))),
     db.select({ value: count() }).from(outreachSuppressionsTable).where(and(gte(outreachSuppressionsTable.createdAt, monthStart), lt(outreachSuppressionsTable.createdAt, monthlyEnd), inArray(outreachSuppressionsTable.reason, ["unsubscribe", "group_unsubscribe"]))),
     db.select({ value: count() }).from(prospectsTable).where(and(gte(prospectsTable.createdAt, monthStart), lt(prospectsTable.createdAt, monthlyEnd))),
     db.select({ value: count() }).from(prospectsTable).where(and(gte(prospectsTable.createdAt, monthStart), lt(prospectsTable.createdAt, monthlyEnd), eq(prospectsTable.emailStatus, "verified"))),
  ]);
  const processedCount = providerProcessedToday?.value ?? 0;
  const acceptedCount = acceptedToday?.value ?? 0;
  const laneSent = { named: 0, public: 0, hotMarket: 0, hotLead: 0 };
  const laneQueued = { named: 0, public: 0, hotMarket: 0, hotLead: 0 };
  if (runtimeConfig?.month === "2026-09") {
    const currentMessages = await db.select({
      sourceType: outreachMessagesTable.sourceType,
      status: outreachMessagesTable.status,
      sentAt: outreachMessagesTable.sentAt,
      contactEmail: prospectsTable.contactEmail,
      contactName: prospectsTable.contactName,
      contactEvidenceType: prospectsTable.contactEvidenceType,
    }).from(outreachMessagesTable).innerJoin(prospectsTable, eq(outreachMessagesTable.prospectId, prospectsTable.id))
      .where(and(
        eq(outreachMessagesTable.sequenceNumber, 1),
        or(
          and(gte(outreachMessagesTable.sentAt, start), lt(outreachMessagesTable.sentAt, end)),
          and(
            gte(outreachMessagesTable.scheduledAt, start),
            lt(outreachMessagesTable.scheduledAt, end),
            inArray(outreachMessagesTable.status, ["approved", "sending"]),
            eq(prospectsTable.contactStatus, "active"),
            inArray(prospectsTable.status, ["approved", "contacted"]),
            sql`not exists (
              select 1 from outreach_suppressions as dashboard_suppression
              where dashboard_suppression.email = lower(trim(${prospectsTable.contactEmail}))
            )`,
            sql`${outreachMessagesTable.catchUpCohortId} is null or exists (
              select 1 from outreach_catch_up_reservations as dashboard_catch_up
              where dashboard_catch_up.message_id = ${outreachMessagesTable.id}
                and dashboard_catch_up.status = 'reserved'
            )`,
          ),
        ),
      ));
    for (const message of currentMessages) {
      const laneName = getOutreachDailyLane(message, message);
      const key = laneName === "hot_market" || laneName === "hot_market_extra"
        ? "hotMarket"
        : laneName === "hot_lead"
          ? "hotLead"
          : laneName === "direct"
            ? "named"
            : laneName;
      if (message.sentAt && message.sentAt >= start && message.sentAt < end) {
        laneSent[key] += 1;
      } else if (message.status === "approved" || message.status === "sending") {
        laneQueued[key] += 1;
      }
    }
  }
  const monthlyTarget = runtimeConfig?.schedule.monthlyTarget ?? 0;
  const sentMonth = monthlySent?.value ?? 0;
  const remainingMonth = Math.max(0, monthlyTarget - sentMonth);
  const lane = runtimeConfig?.schedule.laneAllocations;
  const remainingSendingDays = Math.max(1, 30 - Number(new Intl.DateTimeFormat("en-US", { timeZone: "America/Phoenix", day: "numeric" }).format(new Date())));
  const todayTarget = runtimeConfig?.schedule.dailyTarget
    ?? (runtimeConfig?.month === "2026-09" ? SEPTEMBER_OUTREACH_RELAUNCH_DAILY_TARGET : requiredDailyPace(monthlyTarget, sentMonth, remainingSendingDays));
  const laneProgress = (sent: number, eligible: number, target: number) => {
    const remainingQuota = Math.max(0, target - sent);
    const shortage = Math.max(0, remainingQuota - eligible);
    return {
      sent,
      target,
      eligible,
      remainingQuota,
      shortage,
      reason: shortage > 0 ? "No additional eligible contacts" : null,
    };
  };
  res.json(GetOutreachDashboardResponse.parse({
    prospects: prospects?.value ?? 0,
    campaigns: campaigns?.value ?? 0,
    messages: messages?.value ?? 0,
    upcomingFollowUps: upcomingFollowUps?.value ?? 0,
    stoppedSequences: stoppedSequences?.value ?? 0,
    initialOpeners: initialOpeners?.value ?? 0,
    followUpDelivered: followUpDelivered?.value ?? 0,
    followUpBounced: followUpBounced?.value ?? 0,
    followUpReplies: followUpReplies?.value ?? 0,
    sentToday: acceptedCount,
    providerProcessedToday: processedCount,
    deliveredToday: deliveredToday?.value ?? 0,
    bouncedToday: bouncedToday?.value ?? 0,
    unresolvedToday: unresolvedToday?.value ?? 0,
    replies: replies?.value ?? 0,
    unreadReplies: unreadReplies?.value ?? 0,
    nextPreparationDate: preparation.targetDate,
    nextPreparationTarget: preparation.targetCount,
    nextPreparationPrepared: preparation.preparedCount,
    nextPreparationShortfall: preparation.shortfallCount,
    nextPreparationStatus: preparation.status,
    nextPreparationCompletedAt: preparation.completedAt?.toISOString() ?? null,
    nextPreparationError: preparation.error,
    ...automationStatus,
    monthlyTarget, sentThisMonth: sentMonth, remainingThisMonth: remainingMonth,
    monthlyPercentComplete: monthlyTarget ? Math.min(100, (sentMonth / monthlyTarget) * 100) : 0,
    todayTarget, todayRemaining: Math.max(0, todayTarget - acceptedCount),
    currentSendingPace: acceptedCount,
    requiredDailyPace: requiredDailyPace(monthlyTarget, sentMonth, remainingSendingDays),
    qualifiedInventory: qualifiedInventory?.value ?? 0,
    delivered: monthlyDelivered?.value ?? 0, bounced: monthlyBounced?.value ?? 0,
    deliveryRate: monthlySent?.value ? ((monthlyDelivered?.value ?? 0) / monthlySent.value) * 100 : 0,
    opened: monthlyOpened?.value ?? 0, clicked: monthlyClicked?.value ?? 0,
    replied: monthlyReplied?.value ?? 0, positiveReplies: positiveReplies?.value ?? 0,
     negativeReplies: negativeReplies?.value ?? 0, unsubscribed: unsubscribed?.value ?? 0,
    suppressed: suppressed?.value ?? 0, newResearched: newResearched?.value ?? 0,
    newVerified: newVerified?.value ?? 0,
    septemberLanes: runtimeConfig?.month === "2026-09" && lane ? {
      named: laneProgress(laneSent.named, laneQueued.named, SEPTEMBER_OUTREACH_LANE_TARGETS.named),
      public: laneProgress(laneSent.public, laneQueued.public, SEPTEMBER_OUTREACH_LANE_TARGETS.public),
      hotMarket: laneProgress(laneSent.hotMarket, laneQueued.hotMarket, SEPTEMBER_OUTREACH_LANE_TARGETS.hot_market),
      hotLead: laneProgress(laneSent.hotLead, laneQueued.hotLead, SEPTEMBER_OUTREACH_LANE_TARGETS.hot_lead),
      totalSent: Object.values(laneSent).reduce((sum, value) => sum + value, 0), totalTarget: SEPTEMBER_OUTREACH_RELAUNCH_DAILY_TARGET,
    } : null,
  }));
});
router.get("/outreach/hot-leads", requireAuth, async (_req, res): Promise<void> => {
  const engagementRows = await db.select({
    prospectId: prospectsTable.id,
    companyName: prospectsTable.companyName,
    contactName: prospectsTable.contactName,
    contactEmail: prospectsTable.contactEmail,
    city: prospectsTable.city,
    state: prospectsTable.state,
    campaignName: campaignsTable.name,
    eventId: outreachDeliveryEventsTable.id,
    eventType: outreachDeliveryEventsTable.eventType,
    occurredAt: outreachDeliveryEventsTable.occurredAt,
  })
    .from(outreachMessagesTable)
    .innerJoin(prospectsTable, eq(outreachMessagesTable.prospectId, prospectsTable.id))
    .leftJoin(campaignsTable, eq(outreachMessagesTable.campaignId, campaignsTable.id))
    .innerJoin(
      outreachDeliveryEventsTable,
      eq(outreachDeliveryEventsTable.outreachMessageId, outreachMessagesTable.id),
    )
    .where(and(
      eq(outreachMessagesTable.sequenceNumber, 1),
      inArray(outreachDeliveryEventsTable.eventType, ["open", "click"]),
      or(
        eq(outreachMessagesTable.status, "delivered"),
        sql`exists (
          select 1
          from outreach_delivery_events as delivered_event
          where delivered_event.outreach_message_id = ${outreachMessagesTable.id}
            and delivered_event.event_type = 'delivered'
        )`,
      ),
    ));

  res.json(ListOutreachHotLeadsResponse.parse(buildOutreachHotLeads(engagementRows)));
});
router.get("/outreach/replies", requireAuth, async (_req, res): Promise<void> => {
  const rows = await db.select().from(outreachRepliesTable).orderBy(desc(outreachRepliesTable.receivedAt));
  res.json(ListOutreachRepliesResponse.parse(await Promise.all(rows.map(replyJson))));
});
router.patch("/outreach/replies/:id", requireAuth, async (req, res): Promise<void> => {
  const params = UpdateOutreachReplyParams.safeParse(req.params);
  const input = UpdateOutreachReplyBody.safeParse(req.body);
  if (!params.success || !input.success || Object.keys(input.data).length === 0) {
    res.status(400).json({ error: "Invalid reply update" });
    return;
  }
  const assignedTo = input.data.assignedTo?.trim().toLowerCase() || null;
  const allowedEmails = new Set(
    (process.env.ADMIN_EMAILS ?? "").split(",").map((email) => email.trim().toLowerCase()).filter(Boolean),
  );
  if (assignedTo && allowedEmails.size > 0 && !allowedEmails.has(assignedTo)) {
    res.status(400).json({ error: "Replies can only be assigned to an approved employee" });
    return;
  }
  const followUpAt = input.data.followUpAt === undefined
    ? undefined
    : input.data.followUpAt === null
      ? null
      : new Date(input.data.followUpAt);
  if (followUpAt instanceof Date && Number.isNaN(followUpAt.getTime())) {
    res.status(400).json({ error: "Invalid follow-up date" });
    return;
  }
  const [current] = await db.select().from(outreachRepliesTable)
    .where(eq(outreachRepliesTable.id, params.data.id))
    .limit(1);
  if (!current) {
    res.status(404).json({ error: "Reply not found" });
    return;
  }
  const now = new Date();
  const nextStatus = input.data.status ?? current.status;
  const [updated] = await db.update(outreachRepliesTable).set({
    ...(input.data.status !== undefined ? { status: input.data.status } : {}),
    ...(input.data.assignedTo !== undefined ? { assignedTo } : {}),
    ...(input.data.internalNote !== undefined
      ? { internalNote: input.data.internalNote?.trim() || null }
      : {}),
    ...(input.data.followUpAt !== undefined ? { followUpAt } : {}),
    ...(input.data.status !== undefined
      ? {
          readAt: nextStatus === "unread" ? null : current.readAt ?? now,
          resolvedAt: nextStatus === "resolved" ? current.resolvedAt ?? now : null,
        }
      : {}),
  }).where(eq(outreachRepliesTable.id, current.id)).returning();
  res.json(UpdateOutreachReplyResponse.parse(await replyJson(updated!)));
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
    res.status(400).json({ error: "Evening research is fixed at 8:00 PM Phoenix time" });
    return;
  }
  const [campaign] = await db.select().from(campaignsTable).where(eq(campaignsTable.id, params.data.id));
  if (!campaign) {
    res.status(404).json({ error: "Campaign not found" });
    return;
  }
  const targetCount = Math.min(
    getOutreachDiscoveryDailyCap(),
    Math.max(1, input.data.targetCount ?? campaign.dailyLimit),
  );
  const [schedule] = await db.insert(outreachResearchSchedulesTable).values({
      campaignId: campaign.id,
      enabled: input.data.enabled,
      timezone: OUTREACH_RESEARCH_TIMEZONE,
      localHour: OUTREACH_RESEARCH_LOCAL_HOUR,
      targetCount,
    }).onConflictDoUpdate({
      target: outreachResearchSchedulesTable.campaignId,
      set: {
        enabled: input.data.enabled,
        timezone: OUTREACH_RESEARCH_TIMEZONE,
        localHour: OUTREACH_RESEARCH_LOCAL_HOUR,
        targetCount,
        updatedAt: new Date(),
      },
    }).returning();
  const [latestRun] = await db.select().from(outreachResearchScheduleRunsTable)
    .where(eq(outreachResearchScheduleRunsTable.scheduleId, schedule!.id))
    .orderBy(desc(outreachResearchScheduleRunsTable.startedAt))
    .limit(1);
  res.json(UpdateOutreachResearchScheduleResponse.parse(researchScheduleJson(schedule!, latestRun)));
});
router.get("/outreach/messages/review", requireAuth, async (_req, res): Promise<void> => {
  const rows = await db.select().from(outreachMessagesTable)
    .where(inArray(outreachMessagesTable.status, ["sending", "needs_review"]))
    .orderBy(desc(outreachMessagesTable.updatedAt));
  res.json(ListOutreachMessagesResponse.parse(await Promise.all(rows.map(messageJson))));
});
router.post("/outreach/messages/reconcile", requireAuth, async (_req, res): Promise<void> => {
  const result = await reconcileUncertainOutreachMessages();
  res.json(ReconcileOutreachMessagesResponse.parse(result));
});
router.get("/outreach/messages", requireAuth, async (_req, res): Promise<void> => { const rows = await db.select().from(outreachMessagesTable).orderBy(desc(outreachMessagesTable.createdAt)); res.json(ListOutreachMessagesResponse.parse(await Promise.all(rows.map(messageJson)))); });
router.post("/outreach/messages", requireAuth, async (req, res): Promise<void> => { const data = CreateOutreachMessageBody.safeParse(req.body); if (!data.success) { res.status(400).json({ error: data.error.message }); return; } const attributionError = await validateAttribution(data.data.sourceType, data.data.sourceId); if (attributionError) { res.status(400).json({ error: attributionError }); return; } const [row] = await db.insert(outreachMessagesTable).values({ ...data.data, status: "draft", scheduledAt: data.data.scheduledAt ? new Date(data.data.scheduledAt) : undefined }).returning(); res.status(201).json(CreateOutreachMessageResponse.parse(await messageJson(row!))); });
router.patch("/outreach/messages/:id", requireAuth, async (req, res): Promise<void> => { const p = UpdateOutreachMessageParams.safeParse(req.params), data = UpdateOutreachMessageBody.safeParse(req.body); if (!p.success || !data.success) { res.status(400).json({ error: "Invalid request" }); return; } const attributionError = await validateAttribution(data.data.sourceType, data.data.sourceId); if (attributionError) { res.status(400).json({ error: attributionError }); return; } const [row] = await db.update(outreachMessagesTable).set({ ...data.data, status: "draft", scheduledAt: data.data.scheduledAt ? new Date(data.data.scheduledAt) : undefined }).where(and(eq(outreachMessagesTable.id, p.data.id), eq(outreachMessagesTable.status, "draft"))).returning(); if (!row) { res.status(409).json({ error: "Only draft messages can be edited" }); return; } res.json(UpdateOutreachMessageResponse.parse(await messageJson(row))); });
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
    ]).onConflictDoNothing().returning();
    res.status(201).json(GenerateOutreachDraftResponse.parse(await Promise.all(rows.map(messageJson))));
  } catch (err) { req.log.error({ err }, "Outreach draft generation failed"); res.status(502).json({ error: "Unable to generate outreach draft" }); }
});
router.post("/outreach/prospects/:id/contact-evidence", requireAuth, async (req, res): Promise<void> => {
  const params = RecordOutreachContactEvidenceParams.safeParse(req.params);
  const input = RecordOutreachContactEvidenceBody.safeParse(req.body);
  if (!params.success || !input.success) {
    res.status(400).json({ error: "Invalid contact evidence" });
    return;
  }
  const evidenceNote = input.data.evidenceNote.trim();
  if (!evidenceNote) {
    res.status(400).json({ error: "Evidence details are required" });
    return;
  }
  const reviewAt = input.data.reviewAt ? new Date(input.data.reviewAt) : undefined;
  if (input.data.evidenceType === "temporary_unavailability") {
    if (!reviewAt || Number.isNaN(reviewAt.getTime()) || reviewAt.getTime() <= Date.now()) {
      res.status(400).json({ error: "Temporary unavailability requires a future review date" });
      return;
    }
  } else if (reviewAt) {
    res.status(400).json({ error: "A review date is only valid for temporary unavailability" });
    return;
  }
  const replacementFields = [
    input.data.replacementContactName,
    input.data.replacementContactTitle,
    input.data.replacementContactEmail,
    input.data.replacementContactSourceUrl,
  ];
  const replacementFieldCount = replacementFields.filter((value) => value?.trim()).length;
  if (replacementFieldCount > 0 && input.data.evidenceType !== "departed") {
    res.status(400).json({ error: "Replacement contacts can only be recorded for a departed contact" });
    return;
  }
  if (replacementFieldCount > 0 && replacementFieldCount !== replacementFields.length) {
    res.status(400).json({ error: "Replacement name, title, email, and public source are all required" });
    return;
  }
  try {
    const result = await recordContactEvidence({
      prospectId: params.data.id,
      evidenceType: input.data.evidenceType,
      evidenceNote,
      reviewAt,
      replacementContactName: input.data.replacementContactName,
      replacementContactTitle: input.data.replacementContactTitle,
      replacementContactEmail: input.data.replacementContactEmail,
      replacementContactSourceUrl: input.data.replacementContactSourceUrl,
    });
    if (!result) {
      res.status(404).json({ error: "Prospect not found" });
      return;
    }
    res.json(RecordOutreachContactEvidenceResponse.parse({
      ...result,
      prospect: prospectJson(result.prospect),
    }));
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to record contact evidence";
    res.status(409).json({ error: message });
  }
});
router.post("/outreach/prospects/:id/replied", requireAuth, async (req, res): Promise<void> => {
  const p = MarkOutreachProspectRepliedParams.safeParse(req.params);
  if (!p.success) { res.status(400).json({ error: p.error.message }); return; }
  const result = await recordContactEvidence({
    prospectId: p.data.id,
    evidenceType: "forwarded_reply",
    evidenceNote: "Reply confirmed by an authenticated team member",
  });
  if (!result) { res.status(404).json({ error: "Prospect not found" }); return; }
  res.json(MarkOutreachProspectRepliedResponse.parse(prospectJson(result.prospect)));
});
router.post("/outreach/messages/:id/approve", requireAuth, async (req, res): Promise<void> => {
  const p = ApproveOutreachMessageParams.safeParse(req.params); if (!p.success) { res.status(400).json({ error: p.error.message }); return; }
  const [message] = await db.select().from(outreachMessagesTable).where(eq(outreachMessagesTable.id, p.data.id));
  if (!message) { res.status(404).json({ error: "Message not found" }); return; }
  if (message.status !== "draft") { res.status(409).json({ error: "Only draft messages can be approved" }); return; }
  const [prospect] = await db.select().from(prospectsTable).where(eq(prospectsTable.id, message.prospectId));
  if (!prospect) { res.status(409).json({ error: "Approval blocked: prospect not found" }); return; }
  const [campaign] = message.campaignId
    ? await db.select().from(campaignsTable).where(eq(campaignsTable.id, message.campaignId))
    : [];
  if (message.campaignId && !campaign) { res.status(409).json({ error: "Approval blocked: campaign not found" }); return; }
  try {
    const email = assertOutreachEligibilityBase(message, prospect, campaign, { requireApprovedMessage: false });
    const [suppression] = await db.select({ id: outreachSuppressionsTable.id })
      .from(outreachSuppressionsTable)
      .where(eq(outreachSuppressionsTable.email, email))
      .limit(1);
    if (suppression) throw new Error("Address is suppressed");
  } catch (error) {
    const blocker = error instanceof Error ? error.message : "Message is not eligible for outreach";
    res.status(409).json({ error: `Approval blocked: ${blocker}` });
    return;
  }
  let row: typeof outreachMessagesTable.$inferSelect | undefined;
  try {
    if (message.sequenceNumber === 1) {
      row = await approveInitialMessageInPreparationWindow(message.id);
    } else {
      const engagedAt = await getVerifiedInitialEngagementAt(message);
      const scheduledAt = engagedAt
        ? getFollowUpScheduledAt(message.sequenceNumber, engagedAt)
        : null;
      if (!scheduledAt) {
        throw new Error("The initial message must have a verified open or click before approving a follow-up");
      }
      [row] = await db.update(outreachMessagesTable)
        .set({
          status: "approved",
          scheduledAt,
          subject: approvedOutreachFollowUpMessages(prospect.contactName ?? "there")[0]!.subject,
          body: approvedOutreachFollowUpMessages(prospect.contactName ?? "there")[0]!.body,
        })
        .where(and(
          eq(outreachMessagesTable.id, p.data.id),
          eq(outreachMessagesTable.status, "draft"),
        ))
        .returning();
    }
  } catch (error) {
    const blocker = error instanceof Error ? error.message : "Unable to reserve the preparation window";
    res.status(409).json({ error: `Approval blocked: ${blocker}` });
    return;
  }
  if (!row) { res.status(409).json({ error: "Only draft messages can be approved" }); return; } res.json(ApproveOutreachMessageResponse.parse(await messageJson(row)));
});
router.post("/outreach/messages/:id/send", requireAuth, async (req, res): Promise<void> => {
  const p = SendOutreachMessageParams.safeParse(req.params); if (!p.success) { res.status(400).json({ error: p.error.message }); return; }
  const automationStatus = getOutreachAutomationStatus();
  if (!automationStatus.automationReady) {
    res.status(503).json({ error: "Production outreach is not ready; delivery, event, reply, and automation safeguards must all be verified" });
    return;
  }
  const [message] = await db.select().from(outreachMessagesTable).where(eq(outreachMessagesTable.id, p.data.id));
  if (!message) { res.status(404).json({ error: "Message not found" }); return; }
  const [prospect] = await db.select().from(prospectsTable).where(eq(prospectsTable.id, message.prospectId));
  if (!prospect) { res.status(404).json({ error: "Prospect not found" }); return; }
  const [campaign] = message.campaignId ? await db.select().from(campaignsTable).where(eq(campaignsTable.id, message.campaignId)) : [];
  if (message.campaignId && !campaign) { res.status(409).json({ error: "Campaign not found" }); return; }
  try {
    const claimed = await claimOutreachMessageForSending(message.id);
    if (!claimed) { res.status(409).json({ error: "Message is no longer available to send" }); return; }
    const row = await sendClaimedOutreachMessage(claimed);
    if (!row) { res.status(409).json({ error: "A terminal event stopped this message during dispatch" }); return; }
    if (message.sequenceNumber === 1) {
      await db.update(prospectsTable).set({ status: "contacted" }).where(and(
        eq(prospectsTable.id, prospect.id),
        eq(prospectsTable.contactStatus, "active"),
        inArray(prospectsTable.status, ["approved", "contacted"]),
      ));
    }
    res.json(SendOutreachMessageResponse.parse(await messageJson(row!)));
  } catch (err) {
    const error = err instanceof Error ? err.message : "Unable to send message";
    await db.update(outreachMessagesTable).set({
      status: isUnknownSendResultError(err) ? "needs_review" : "failed",
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
  const email = normalizeEmail(data.data.email);
  await suppressOutreachEmail(email, data.data.reason);
  const [result] = await db.select().from(outreachSuppressionsTable)
    .where(eq(outreachSuppressionsTable.email, email))
    .limit(1);
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