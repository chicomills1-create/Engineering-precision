import { ReplitConnectors } from "@replit/connectors-sdk";
import { openai } from "@workspace/integrations-openai-ai-server";
import { and, count, eq, gte, inArray, isNotNull, isNull, lt, ne, or, sql } from "drizzle-orm";
import {
  campaignsTable,
  db,
  outreachMessagesTable,
  outreachMonthlySendReservationsTable,
  outreachSendReservationsTable,
  outreachSequenceSendClaimsTable,
  outreachSuppressionsTable,
  prospectsTable,
  type Campaign,
  type OutreachMessage,
  type Prospect,
} from "@workspace/db";
import {
  makeOneClickUnsubscribeUrl,
  makeUnsubscribeUrl,
} from "./unsubscribeToken";
import { renderBrandedEmail } from "./emailMarkup";
import {
  assertOutreachEligibilityBase,
  assertFollowUpCadenceReady,
  assertScheduledTimeReady,
  assertSequenceDeliveryReady,
  getPhoenixCalendarDayStart,
} from "./outreachEligibility";
import { withOutreachEmailLock } from "./outreachEmailLock";
import {
  getVerifiedInitialDeliveryAt,
  getVerifiedInitialEngagementAt,
} from "./outreachSequence";
import {
  HOT_MARKET_DAILY_TARGET,
  HOT_MARKET_RECURRING_SOURCE_TYPE,
  HOT_MARKET_SOURCE_TYPES,
  hotMarketOutreachSubject,
  isHotMarketSourceType,
} from "./hotMarketOutreachBatch";
import {
  approvedOutreachBody,
  approvedOutreachFollowUpMessages,
  approvedOutreachSubject,
} from "./verifiedOutreachBatch";
import { getAuthoritativeLaneConfig, laneConfigTotal } from "./outreachLaneConfig";
import { loadOutreachSystemConfig } from "./outreachSystemConfig";

export type GeneratedDraft = { subject: string; body: string; followUps: { subject: string; body: string }[] };
const PUBLIC_GREETING_PARTS = new Set(["info", "estimating", "bids", "proposals", "preconstruction", "development", "construction", "projects", "office", "contact"]);
function isPublicBusinessInbox(prospect: Pick<Prospect, "contactEmail" | "contactName" | "contactEvidenceType">): boolean {
  const local = prospect.contactEmail?.toLowerCase().split("@")[0] ?? "";
  const normalizedName = prospect.contactName?.trim().toLowerCase().replace(/[^a-z]/g, "") ?? "";
  return prospect.contactEvidenceType === "official_publication"
    && (!normalizedName || normalizedName === local.replace(/[^a-z]/g, "") || /(?:office|team|desk|inquiries)$/i.test(prospect.contactName?.trim() ?? ""))
    && PUBLIC_GREETING_PARTS.has(local);
}

export type OutreachSendOptions = {
  /** Set only by the worker after its authoritative readiness check. */
  deliverabilityReady?: boolean;
  expectedPersistedStatus?: "approved" | "sending";
  fromEmail?: string;
  replyToEmail?: string;
  unsubscribeUrls?: {
    unsubscribeUrl: string;
    oneClickUnsubscribeUrl: string;
  };
  beforeEmailLock?: () => Promise<void>;
  beforeProviderDispatch?: () => Promise<void>;
  dispatch?: (request: {
    body: string;
    email: string;
    fromEmail: string;
    replyToEmail: string;
  }) => Promise<Response>;
  afterProviderDispatch?: (providerMessageId: string | undefined) => Promise<void>;
};

export function isUnknownSendResultError(error: unknown): boolean {
  return error instanceof Error && error.message.includes("dispatch result is unknown");
}

export function isDefinitiveSendGridRejection(status: number): boolean {
  return status >= 400
    && status < 500
    && ![408, 409, 425, 429].includes(status);
}

export const OUTREACH_MONTHLY_LIMIT = 12_000;
const DUPLICATE_EMAIL_SEQUENCE_STATUSES = [
  "sending",
  "needs_review",
  "sent",
  "delivered",
  "bounced",
  "replied",
  "unsubscribed",
] as const;
export const PUBLIC_INBOX_LOCAL_PARTS = new Set([
  "info", "estimating", "bids", "proposals", "procurement", "preconstruction",
  "businessdevelopment", "development", "construction", "projects", "contact", "office", "admin",
]);

export type OutreachDailyLane = "named" | "public" | "hot_market" | "hot_lead" | "direct" | "hot_market_extra";

/**
 * Source metadata is authoritative for Hot Market.  Older regular records did
 * not persist a source, so their lane is inferred from the prospect evidence
 * at dispatch rather than treating them as personal by default.
 */
export function getOutreachDailyLane(
  message: Pick<OutreachMessage, "sourceType">,
  prospect: Pick<Prospect, "contactEmail" | "contactName" | "contactEvidenceType">,
): OutreachDailyLane {
  // Hot-lead attribution is fail-closed: only the persisted sourceType values
  // below are accepted. Engagement rows in outreachHotLeads.ts have no
  // sourceType/campaign field, so they must not be guessed into this lane.
  if (message.sourceType === "hot_lead" || message.sourceType === "hot_lead_verified") return "hot_lead";
  if (isHotMarketSourceType(message.sourceType)) return "hot_market";
  const localPart = prospect.contactEmail?.trim().toLowerCase().split("@")[0] ?? "";
  const normalizedName = prospect.contactName?.trim().toLowerCase().replace(/[^a-z]/g, "") ?? "";
  const genericContactName = !normalizedName
    || normalizedName === localPart.replace(/[^a-z]/g, "")
    || /(?:office|team|desk|inquiries)$/i.test(prospect.contactName?.trim() ?? "");
  return prospect.contactEvidenceType === "official_publication"
    && PUBLIC_INBOX_LOCAL_PARTS.has(localPart)
    && genericContactName
    ? "public"
    : "named";
}

export function getOutreachDailyLaneLimit(
  lane: OutreachDailyLane,
  config: { namedLimit: number; publicLimit: number; hotMarketLimit: number; hotLeadLimit: number },
): number | undefined {
  if (lane === "named" || lane === "direct") return config.namedLimit;
  if (lane === "public") return config.publicLimit;
  if (lane === "hot_market") return config.hotMarketLimit;
  if (lane === "hot_lead") return config.hotLeadLimit;
  return undefined;
}

export class DailySendLimitError extends Error {
  constructor() {
    super("Daily send limit reached");
    this.name = "DailySendLimitError";
  }
}

export class MonthlySendLimitError extends Error {
  constructor() {
    super("Monthly send limit reached");
    this.name = "MonthlySendLimitError";
  }
}

export async function ensureProviderReconciliationKey(messageId: number): Promise<string> {
  const fallbackKey = `outreach-message-${messageId}`;
  const [row] = await db.update(outreachMessagesTable)
    .set({
      providerReconciliationKey: sql`coalesce(${outreachMessagesTable.providerReconciliationKey}, ${fallbackKey})`,
    })
    .where(eq(outreachMessagesTable.id, messageId))
    .returning({ providerReconciliationKey: outreachMessagesTable.providerReconciliationKey });
  if (!row?.providerReconciliationKey) {
    throw new Error("Unable to establish an outreach provider reconciliation key");
  }
  return row.providerReconciliationKey;
}

function phoenixDateKey(date = new Date()): string {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Phoenix",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const value = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${value.year}-${value.month}-${value.day}`;
}

export function getPhoenixOutreachMonthKey(date = new Date()): string {
  return phoenixDateKey(date).slice(0, 7);
}

export function getOutreachMonthlyLimit(date = new Date()): number {
  const monthKey = getPhoenixOutreachMonthKey(date);
  if (monthKey <= "2026-09") return OUTREACH_MONTHLY_LIMIT;
  if (monthKey === "2026-10") return 20_000;
  if (monthKey === "2026-11") return 35_000;
  if (monthKey === "2026-12") return 50_000;
  return 50_000;
}

export function isRegularMonthlyOutreachLimitReached(
  reservedOrSentCount: number,
  date = new Date(),
): boolean {
  return reservedOrSentCount >= getOutreachMonthlyLimit(date);
}

export function getGlobalOutreachDailyLimit(
  date = new Date(),
  hotMarketMessageCount = 0,
): number {
  phoenixDateKey(date);
  return getPhoenixOutreachMonthKey(date) === "2026-09"
    ? 400
    : Math.max(0, hotMarketMessageCount);
}

export function isDuplicateEmailSequenceStatus(status: string): boolean {
  return (DUPLICATE_EMAIL_SEQUENCE_STATUSES as readonly string[]).includes(status);
}

export function getOutreachDailyLimit(
  configuredLimit: number,
  activeSendDays: number,
  allowVerifiedHotMarketExtras = false,
): number {
  const limit = configuredLimit;
  if (allowVerifiedHotMarketExtras) return limit;
  void activeSendDays;
  return limit;
}

export function getLegacyOutreachSentCount(totalSent: number, globallyReservedSent: number): number {
  return Math.max(0, totalSent - globallyReservedSent);
}

export function getLegacyOutreachMonthlySentCount(
  totalSent: number,
  monthlyReservedSent: number,
): number {
  return getLegacyOutreachSentCount(totalSent, monthlyReservedSent);
}

type OutreachReservationIds = {
  dailyReservationId?: number;
  regularMonthlyReservationId?: number;
  sequenceClaimId: number;
};

async function releaseOutreachReservations(reservations: OutreachReservationIds): Promise<void> {
  await db.transaction(async (tx) => {
    if (reservations.dailyReservationId !== undefined) {
      await tx.delete(outreachSendReservationsTable)
        .where(eq(outreachSendReservationsTable.id, reservations.dailyReservationId));
    }
    if (reservations.regularMonthlyReservationId !== undefined) {
      await tx.delete(outreachMonthlySendReservationsTable)
        .where(eq(outreachMonthlySendReservationsTable.id, reservations.regularMonthlyReservationId));
    }
    await tx.delete(outreachSequenceSendClaimsTable)
      .where(eq(outreachSequenceSendClaimsTable.id, reservations.sequenceClaimId));
  });
}

async function reserveOutreachSend(
  message: OutreachMessage,
  campaign: Campaign | undefined,
  normalizedEmail: string,
  deliverabilityReady?: boolean,
): Promise<OutreachReservationIds> {
  const now = new Date();
  const dateKey = phoenixDateKey(now);
  const monthKey = getPhoenixOutreachMonthKey(now);
  const monthlyQuotaKey = `outreach-authoritative:${monthKey}`;
  const dayStart = getPhoenixCalendarDayStart(now);
  const monthStart = new Date(`${monthKey}-01T07:00:00.000Z`);
  return db.transaction(async (tx) => {
    const [lockedProspect] = await tx.select({
      contactEmail: prospectsTable.contactEmail,
      contactName: prospectsTable.contactName,
      contactEvidenceType: prospectsTable.contactEvidenceType,
    })
      .from(prospectsTable)
      .where(eq(prospectsTable.id, message.prospectId))
      .for("update");
    const lane = getOutreachDailyLane(message, lockedProspect ?? {
      contactEmail: null, contactName: null, contactEvidenceType: null,
    });
    const dailyQuotaKey = `outreach-${lane}:${dateKey}`;
    await tx.execute(sql`select pg_advisory_xact_lock(hashtextextended(${normalizedEmail}, 0))`);
    // One global Phoenix-day lock serializes every lane and campaign. Lane
    // locks remain useful for observability, but can never create extra quota.
    await tx.execute(sql`select pg_advisory_xact_lock(hashtext(${`outreach-authoritative:${dateKey}`}))`);
    await tx.execute(sql`select pg_advisory_xact_lock(hashtext(${dailyQuotaKey}))`);
    await tx.execute(sql`select pg_advisory_xact_lock(hashtext(${monthlyQuotaKey}))`);

    if ((lockedProspect?.contactEmail?.trim().toLowerCase() || null) !== normalizedEmail) {
      throw new Error("Contact changed while dispatch was starting; please retry");
    }
    const runtime = await loadOutreachSystemConfig(now, tx);
    const safeguards = runtime.policy.sendingSafeguards;
    if (safeguards.requireDeliverabilityReady) {
      const dedicatedReady = Boolean(process.env.SENDGRID_DEDICATED_API_KEY?.trim())
        && process.env.SENDGRID_ISOLATION_VERIFIED === "true";
      const subuserReady = Boolean(process.env.SENDGRID_SUBUSER_USERNAME?.trim())
        && process.env.SENDGRID_SUBUSER_VERIFIED === "true";
      if (deliverabilityReady !== true && !dedicatedReady && !subuserReady) {
        throw new Error("Outreach deliverability readiness is unavailable; reservation refused");
      }
    }
    if (safeguards.requireQualifiedInventory) {
      if (!lockedProspect
        || !["approved", "review"].includes((await tx.select({ status: prospectsTable.status }).from(prospectsTable)
          .where(eq(prospectsTable.id, message.prospectId)).limit(1))[0]?.status ?? "")
        || lockedProspect.contactEmail === null) {
        throw new Error("No qualified unsuppressed prospect inventory remains");
      }
      const [suppressed] = await tx.select({ id: outreachSuppressionsTable.id })
        .from(outreachSuppressionsTable).where(eq(outreachSuppressionsTable.email, normalizedEmail)).limit(1);
      if (suppressed) throw new Error("No qualified unsuppressed prospect inventory remains");
    }

    const duplicateStatuses = DUPLICATE_EMAIL_SEQUENCE_STATUSES.filter(isDuplicateEmailSequenceStatus);
    const [historicalDuplicate] = await tx.select({ id: outreachMessagesTable.id })
      .from(outreachMessagesTable)
      .innerJoin(prospectsTable, eq(outreachMessagesTable.prospectId, prospectsTable.id))
      .where(and(
        sql`lower(trim(${prospectsTable.contactEmail})) = ${normalizedEmail}`,
        eq(outreachMessagesTable.sequenceNumber, message.sequenceNumber),
        ne(outreachMessagesTable.id, message.id),
        inArray(outreachMessagesTable.status, duplicateStatuses),
      ))
      .limit(1);
    if (historicalDuplicate) {
      throw new Error("This sequence is already active or was sent to this email address");
    }
    const [existingEmailReservation] = await tx.select({
      id: outreachMonthlySendReservationsTable.id,
    })
      .from(outreachMonthlySendReservationsTable)
      .where(and(
        eq(outreachMonthlySendReservationsTable.normalizedEmail, normalizedEmail),
        eq(outreachMonthlySendReservationsTable.sequenceNumber, message.sequenceNumber),
      ))
      .limit(1);
    if (existingEmailReservation) {
      throw new Error("This sequence is already reserved or was sent to this email address");
    }

    const [sequenceClaim] = await tx.insert(outreachSequenceSendClaimsTable)
      .values({
        messageId: message.id,
        prospectId: message.prospectId,
        campaignScope: message.campaignId ? `campaign:${message.campaignId}` : "standalone",
        sequenceNumber: message.sequenceNumber,
      })
      .onConflictDoNothing()
      .returning({ id: outreachSequenceSendClaimsTable.id });
    if (!sequenceClaim) {
      throw new Error("This campaign sequence is already reserved or was sent to this prospect");
    }

    let dailyReservationId: number | undefined;
    if (message.sequenceNumber === 1) {
      const monthEnd = new Date(`${monthKey}-01T07:00:00.000Z`);
      monthEnd.setUTCMonth(monthEnd.getUTCMonth() + 1);
      const [sent] = await tx.select({ value: count() }).from(outreachMessagesTable)
        .where(and(eq(outreachMessagesTable.sequenceNumber, 1), gte(outreachMessagesTable.sentAt, monthStart), lt(outreachMessagesTable.sentAt, monthEnd)));
      const [reserved] = await tx.select({ value: count() }).from(outreachMonthlySendReservationsTable)
        .innerJoin(outreachMessagesTable, eq(outreachMonthlySendReservationsTable.messageId, outreachMessagesTable.id))
        .where(and(eq(outreachMonthlySendReservationsTable.quotaKey, monthlyQuotaKey), eq(outreachMessagesTable.sequenceNumber, 1), inArray(outreachMessagesTable.status, ["approved", "sending"])));
      const monthlyTarget = Math.min(50_000, runtime.schedule.monthlyTarget);
      const used = (sent?.value ?? 0) + (reserved?.value ?? 0);
      const remainingMonth = Math.max(0, monthlyTarget - used);
      const daysInMonth = new Date(Date.UTC(Number(monthKey.slice(0, 4)), Number(monthKey.slice(5)), 0)).getUTCDate();
      let remainingDays = 0;
      for (let day = Number(dateKey.slice(8)); day <= daysInMonth; day += 1) {
        const weekday = new Date(Date.UTC(Number(monthKey.slice(0, 4)), Number(monthKey.slice(5, 7)) - 1, day)).getUTCDay();
        if (weekday !== 0 && weekday !== 6) remainingDays += 1;
      }
      const dailyAllowance = monthKey === "2026-09" ? 400 : Math.min(remainingMonth, Math.ceil(remainingMonth / Math.max(1, remainingDays)));
      const campaignCap = campaign?.dailyLimit;
      const [todayReserved] = await tx.select({ value: count() }).from(outreachMonthlySendReservationsTable)
        .innerJoin(outreachMessagesTable, eq(outreachMonthlySendReservationsTable.messageId, outreachMessagesTable.id))
        .where(and(eq(outreachMonthlySendReservationsTable.quotaKey, monthlyQuotaKey), gte(outreachMonthlySendReservationsTable.createdAt, dayStart), inArray(outreachMessagesTable.status, ["approved", "sending"])));
      const allowed = Math.min(dailyAllowance, campaignCap && campaignCap > 0 ? campaignCap : dailyAllowance);
      if (remainingMonth <= 0 || (todayReserved?.value ?? 0) >= allowed) throw new DailySendLimitError();
      if (monthKey === "2026-09") {
        const [laneRows, laneReservations] = await Promise.all([
          tx.select({
            sourceType: outreachMessagesTable.sourceType,
            contactEmail: prospectsTable.contactEmail,
            contactName: prospectsTable.contactName,
            contactEvidenceType: prospectsTable.contactEvidenceType,
          }).from(outreachMessagesTable)
            .innerJoin(prospectsTable, eq(outreachMessagesTable.prospectId, prospectsTable.id))
            .where(and(eq(outreachMessagesTable.sequenceNumber, 1), gte(outreachMessagesTable.sentAt, dayStart))),
          tx.select({
            sourceType: outreachMessagesTable.sourceType,
            contactEmail: prospectsTable.contactEmail,
            contactName: prospectsTable.contactName,
            contactEvidenceType: prospectsTable.contactEvidenceType,
          }).from(outreachMonthlySendReservationsTable)
            .innerJoin(outreachMessagesTable, eq(outreachMonthlySendReservationsTable.messageId, outreachMessagesTable.id))
            .innerJoin(prospectsTable, eq(outreachMessagesTable.prospectId, prospectsTable.id))
            .where(and(eq(outreachMonthlySendReservationsTable.quotaKey, monthlyQuotaKey), gte(outreachMonthlySendReservationsTable.createdAt, dayStart), inArray(outreachMessagesTable.status, ["approved", "sending"]))),
        ]);
        const laneCount = [...laneRows, ...laneReservations]
          .filter((row) => getOutreachDailyLane(row, row) === lane).length;
        if (laneCount >= 100) throw new DailySendLimitError();
      }
      for (let slot = used + 1; slot <= monthlyTarget; slot += 1) {
        const [inserted] = await tx.insert(outreachMonthlySendReservationsTable)
          .values({
            messageId: message.id,
            normalizedEmail,
            sequenceNumber: message.sequenceNumber,
            quotaKey: monthlyQuotaKey,
            slot,
          })
          .onConflictDoNothing()
          .returning({ id: outreachMonthlySendReservationsTable.id });
        if (inserted) {
          dailyReservationId = inserted.id;
          break;
        }
      }
      if (!dailyReservationId) throw new MonthlySendLimitError();
    }

    return {
      dailyReservationId,
      regularMonthlyReservationId: dailyReservationId,
      sequenceClaimId: sequenceClaim.id,
    };
  });
}

export async function reserveSequenceSend(message: OutreachMessage): Promise<number> {
  const [inserted] = await db.insert(outreachSequenceSendClaimsTable)
    .values({
      messageId: message.id,
      prospectId: message.prospectId,
      campaignScope: message.campaignId ? `campaign:${message.campaignId}` : "standalone",
      sequenceNumber: message.sequenceNumber,
    })
    .onConflictDoNothing()
    .returning({ id: outreachSequenceSendClaimsTable.id });
  if (!inserted) {
    throw new Error("This campaign sequence is already reserved or was sent to this prospect");
  }
  return inserted.id;
}

export async function generateProspectDraft(prospect: Prospect): Promise<GeneratedDraft> {
  if (isPublicBusinessInbox(prospect)) {
    const body = `Hello ${prospect.companyName} team,

If a focused engineering issue is taking too long or costing more than it should, Apex Grid can help. Our licensed Civil, Structural, and MEP PEs provide focused reviews and design responses with clear pricing before work begins.

Do you have any current projects in your pipeline that you would like us to review?`;
    return { subject: approvedOutreachSubject(), body, followUps: approvedOutreachFollowUpMessages("") };
  }
  if (!prospect.contactName || !prospect.contactTitle) {
    throw new Error("A named decision-maker and role are required before drafting");
  }
  if (prospect.needScore < 60 || !prospect.needSignals) {
    throw new Error("A credible current need signal is required before drafting");
  }
  const completion = await openai.chat.completions.create({
    model: "gpt-5.6-luna",
    max_completion_tokens: 8192,
    response_format: { type: "json_object" },
    messages: [{
      role: "system",
      content: [
        "Return strict JSON only: {\"subject\":\"...\",\"body\":\"...\"}.",
        "Write concise, specific professional B2B outreach for Apex Grid Engineering—not a generic introduction.",
        "Open with a natural greeting using the supplied contactName, not 'Hi there' or a generic salutation.",
        "Keep the initial email to roughly 80-120 words in three short paragraphs: lead with the prospect's one concrete pain point, state the one relevant Apex Grid solution, then end with one simple question.",
        "Make speed and price clear without overexplaining: engineering support can be too slow, oversized scopes can be extremely expensive, and Apex Grid right-sizes the work with clear pricing before it starts.",
        "Mention only the capability relevant to the supplied need, such as plan-review response, field investigation, permit-ready or PE-stamped Civil, Structural, or MEP documents, targeted code analysis, or coordination.",
        "Apex Grid's licensed Civil, Structural, and MEP PEs can stamp our designs.",
        "When the supplied need fits a focused review or design response, it is accurate to say we typically provide a 12-24 hour turnaround; do not present that timing as a guarantee for a complex or undefined scope.",
        "A brief veteran-owned mention is optional and should never replace the project-specific reason to respond.",
        "Include this exact positioning sentence once in the initial email: 'We’re Arizona-based, but licensed to support projects across 49 states, so we can stay useful when your team or partners work outside Arizona.'",
        "Do not include a website link or ask recipients to click through; keep the call to action as a reply.",
        "Do not offer, mention, schedule, or book a 15-minute call or any similar call CTA.",
        "Avoid long capability lists, marketing language, competitor comparisons, unsupported savings claims, repeated points, and lists of hypothetical issues in the closing.",
        "Use this exact preferred closing question when it fits: 'Do you have any current projects in your pipeline that you would like us to review?'",
        "Do not use the old closing about a plan-review comment, field condition, or a project waiting on engineering answers.",
        "Use only supplied public research notes and the explicitly provided Apex Grid capabilities; never invent claims, projects, prices, turnaround times, ownership status, or facts.",
      ].join(" "),
    },
      { role: "user", content: JSON.stringify({
        companyName: prospect.companyName,
        audience: prospect.audience,
        contactName: prospect.contactName,
        contactTitle: prospect.contactTitle,
        researchNotes: prospect.researchNotes ?? "",
        needSignals: prospect.needSignals,
      }) }],
  });
  const parsed: unknown = JSON.parse(completion.choices[0]?.message.content ?? "");
  if (!isDraft(parsed)) throw new Error("AI returned an invalid outreach draft");
  return {
    ...parsed,
    followUps: approvedOutreachFollowUpMessages(prospect.contactName),
  };
}

function isDraft(value: unknown): value is Pick<GeneratedDraft, "subject" | "body"> {
  if (!value || typeof value !== "object") return false;
  const draft = value as Record<string, unknown>;
  return typeof draft.subject === "string" && typeof draft.body === "string" &&
    !("followUps" in draft);
}

export async function sendApprovedOutreach(
  message: OutreachMessage,
  prospect: Prospect,
  campaign: Campaign | undefined,
  options: OutreachSendOptions = {},
): Promise<{ providerMessageId?: string }> {
  const [currentProspect] = await db.select().from(prospectsTable).where(eq(prospectsTable.id, prospect.id));
  if (!currentProspect) throw new Error("Prospect not found");
  const [currentCampaign] = campaign
    ? await db.select().from(campaignsTable).where(eq(campaignsTable.id, campaign.id))
    : [];
  if (campaign && !currentCampaign) throw new Error("Campaign not found");
  const email = assertOutreachEligibilityBase(message, currentProspect, currentCampaign);
  assertScheduledTimeReady(message.sequenceNumber, message.scheduledAt);
  if (message.sequenceNumber > 1) {
    const initialDeliveredAt = await getVerifiedInitialDeliveryAt(message);
    const initialEngagedAt = await getVerifiedInitialEngagementAt(message);
    if (!initialDeliveredAt) {
      throw new Error("Initial sequence message must have verified delivery evidence before this follow-up can send");
    }
    assertFollowUpCadenceReady(
      message.sequenceNumber,
      message.scheduledAt,
      initialEngagedAt,
    );
    const campaignScope = message.campaignId
      ? eq(outreachMessagesTable.campaignId, message.campaignId)
      : isNull(outreachMessagesTable.campaignId);
    const [previous] = await db.select({ status: outreachMessagesTable.status })
      .from(outreachMessagesTable)
      .where(and(
        eq(outreachMessagesTable.prospectId, message.prospectId),
        campaignScope,
        eq(outreachMessagesTable.sequenceNumber, message.sequenceNumber - 1),
      ))
      .limit(1);
    assertSequenceDeliveryReady(message.sequenceNumber, previous?.status);
  }
  const [suppression] = await db.select({ id: outreachSuppressionsTable.id }).from(outreachSuppressionsTable).where(eq(outreachSuppressionsTable.email, email)).limit(1);
  if (suppression) throw new Error("Address is suppressed");

  const unsubscribeUrl = options.unsubscribeUrls?.unsubscribeUrl ?? makeUnsubscribeUrl(email);
  const oneClickUrl = options.unsubscribeUrls?.oneClickUnsubscribeUrl ?? makeOneClickUnsubscribeUrl(email);
  if (!unsubscribeUrl || !oneClickUrl) throw new Error("Unsubscribe signing is not configured");
  const isHotMarketMessage = isHotMarketSourceType(message.sourceType);
  const usesCurrentSharedCopy = !isHotMarketMessage
    && currentCampaign?.bodyTemplate === "Approved personalized Apex Grid outreach copy";
  const currentRegularFollowUp = !isHotMarketMessage && message.sequenceNumber === 2
    ? approvedOutreachFollowUpMessages(currentProspect.contactName ?? "")
      .find((followUp) => followUp.sequenceNumber === message.sequenceNumber)
    : undefined;
  const currentSubject = currentRegularFollowUp?.subject ?? (usesCurrentSharedCopy
      ? approvedOutreachSubject()
    : message.subject);
  const currentBody = currentRegularFollowUp?.body ?? (usesCurrentSharedCopy
      ? message.sequenceNumber === 1
        ? approvedOutreachBody(currentProspect.contactName ?? "")
        : message.body
    : message.body);
  const emailContent = renderBrandedEmail(currentBody, unsubscribeUrl, currentProspect.contactName ?? undefined);
  const from = options.fromEmail?.trim() || process.env.OUTREACH_FROM_EMAIL;
  if (!from) throw new Error("OUTREACH_FROM_EMAIL is not configured");
  const replyTo = options.replyToEmail?.trim() || process.env.OUTREACH_REPLY_TO_EMAIL?.trim() || from;
  const dedicatedSendGridKey = process.env.SENDGRID_ISOLATION_VERIFIED === "true"
    ? process.env.SENDGRID_DEDICATED_API_KEY?.trim()
    : undefined;
  const sendgridSubuser = process.env.SENDGRID_SUBUSER_USERNAME?.trim();
  const providerReconciliationKey = await ensureProviderReconciliationKey(message.id);
  // A supplied dispatch is the test/injected provider boundary; production
  // dispatches always come through the worker's explicit readiness result.
  const readiness = options.deliverabilityReady ?? (options.dispatch ? true : undefined);
  const reservations = await reserveOutreachSend(message, currentCampaign, email, readiness);
  await options.beforeEmailLock?.();
  return withOutreachEmailLock(email, async () => {
    if (message.sequenceNumber === 2) {
      const [lockedDelivery, lockedEngagement] = await Promise.all([
        getVerifiedInitialDeliveryAt(message),
        getVerifiedInitialEngagementAt(message),
      ]);
      if (!lockedDelivery || !lockedEngagement) {
        throw new Error("Follow-up lost its verified delivery or engagement evidence before provider dispatch");
      }
      assertFollowUpCadenceReady(message.sequenceNumber, message.scheduledAt, lockedEngagement);
    }
    const [[lockedMessage], [lockedProspect], [lockedSuppression]] = await Promise.all([
      db.select({ status: outreachMessagesTable.status })
        .from(outreachMessagesTable)
        .where(eq(outreachMessagesTable.id, message.id))
        .limit(1),
      db.select({
        status: prospectsTable.status,
        contactStatus: prospectsTable.contactStatus,
        contactEmail: prospectsTable.contactEmail,
      })
        .from(prospectsTable)
        .where(eq(prospectsTable.id, message.prospectId))
        .limit(1),
      db.select({ id: outreachSuppressionsTable.id })
        .from(outreachSuppressionsTable)
        .where(eq(outreachSuppressionsTable.email, email))
        .limit(1),
    ]);
    const persistedStatusIsEligible = options.expectedPersistedStatus
      ? lockedMessage?.status === options.expectedPersistedStatus
      : lockedMessage?.status === "approved" || lockedMessage?.status === "sending";
    const prospectIsEligible = lockedProspect?.contactStatus === "active"
      && (lockedProspect.status === "approved" || lockedProspect.status === "contacted")
      && lockedProspect.contactEmail?.trim().toLowerCase() === email;
    if (!persistedStatusIsEligible || !prospectIsEligible || lockedSuppression) {
      await releaseOutreachReservations(reservations);
      throw new Error("Outreach stopped before provider dispatch");
    }

    let response: Awaited<ReturnType<ReplitConnectors["proxy"]>>;
    try {
    const requestBody = JSON.stringify({
      personalizations: [{
        to: [{ email }],
        headers: {
          "List-Unsubscribe": `<${oneClickUrl}>`,
          "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
        },
        custom_args: {
          outreach_message_id: String(message.id),
          outreach_prospect_id: String(prospect.id),
          outreach_reconciliation_key: providerReconciliationKey,
        },
      }],
      from: { email: from, name: "Apex Grid Engineering" },
      reply_to: { email: replyTo, name: "Apex Grid Engineering" },
      subject: currentSubject,
      content: [
        { type: "text/plain", value: emailContent.plainText },
        { type: "text/html", value: emailContent.html },
      ],
    });
      await options.beforeProviderDispatch?.();
      response = options.dispatch
        ? await options.dispatch({
            body: requestBody,
            email,
            fromEmail: from,
            replyToEmail: replyTo,
          })
        : dedicatedSendGridKey
        ? await fetch("https://api.sendgrid.com/v3/mail/send", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${dedicatedSendGridKey}`,
          },
          body: requestBody,
        })
      : await new ReplitConnectors().proxy("sendgrid", "/v3/mail/send", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(sendgridSubuser ? { "on-behalf-of": sendgridSubuser } : {}),
          },
          body: requestBody,
        });
    } catch {
      throw new Error("SendGrid dispatch result is unknown; message requires reconciliation before retry");
    }
    if (!response.ok) {
    if (isDefinitiveSendGridRejection(response.status)) {
      await releaseOutreachReservations(reservations);
      throw new Error(`SendGrid rejected the message with status ${response.status}`);
    }
    throw new Error(`SendGrid dispatch result is unknown after status ${response.status}; message requires reconciliation before retry`);
    }
    const providerMessageId = response.headers.get("x-message-id") ?? undefined;
    await options.afterProviderDispatch?.(providerMessageId);
    return { providerMessageId };
  });
}