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
  REGULAR_OUTREACH_DAILY_TARGET,
} from "./verifiedOutreachBatch";

export type GeneratedDraft = { subject: string; body: string; followUps: { subject: string; body: string }[] };

export type OutreachSendOptions = {
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

const INITIAL_RAMP_DAILY_LIMIT =
  REGULAR_OUTREACH_DAILY_TARGET + HOT_MARKET_DAILY_TARGET;
const INITIAL_RAMP_ACTIVE_DAYS = 3;
export const OUTREACH_MONTHLY_LIMIT = 6000;
const DUPLICATE_EMAIL_SEQUENCE_STATUSES = [
  "sending",
  "needs_review",
  "sent",
  "delivered",
  "bounced",
  "replied",
  "unsubscribed",
] as const;
const PUBLIC_INBOX_LOCAL_PARTS = new Set([
  "admin", "contact", "hello", "help", "info", "inquiries", "office", "sales", "support",
  "team",
]);
const DIRECT_DAILY_TARGET = 100;
const PUBLIC_DAILY_TARGET = 50;

export type OutreachDailyLane = "direct" | "public" | "hot_market" | "hot_market_extra";

/**
 * Source metadata is authoritative for Hot Market.  Older regular records did
 * not persist a source, so their lane is inferred from the prospect evidence
 * at dispatch rather than treating them as personal by default.
 */
export function getOutreachDailyLane(
  message: Pick<OutreachMessage, "sourceType">,
  prospect: Pick<Prospect, "contactEmail" | "contactName" | "contactEvidenceType">,
): OutreachDailyLane {
  if (message.sourceType === HOT_MARKET_RECURRING_SOURCE_TYPE) return "hot_market";
  if (isHotMarketSourceType(message.sourceType)) return "hot_market_extra";
  if (prospect.contactEvidenceType === "official_publication") return "public";
  const localPart = prospect.contactEmail?.trim().toLowerCase().split("@")[0] ?? "";
  const normalizedName = prospect.contactName?.trim().toLowerCase().replace(/[^a-z]/g, "") ?? "";
  return PUBLIC_INBOX_LOCAL_PARTS.has(localPart) || PUBLIC_INBOX_LOCAL_PARTS.has(normalizedName)
    ? "public"
    : "direct";
}

export function getOutreachDailyLaneLimit(lane: OutreachDailyLane): number | undefined {
  if (lane === "direct") return DIRECT_DAILY_TARGET;
  if (lane === "public") return PUBLIC_DAILY_TARGET;
  if (lane === "hot_market") return HOT_MARKET_DAILY_TARGET;
  // One-time verified Hot Market evidence is an intentional extra lane.  It
  // never takes a recurring slot or a regular Direct/Public slot.
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
  if (monthKey === "2026-10") return 10_000;
  if (monthKey === "2026-11") return 20_000;
  if (monthKey === "2026-12") return 35_000;
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
  return REGULAR_OUTREACH_DAILY_TARGET
    + Math.max(HOT_MARKET_DAILY_TARGET, Math.max(0, hotMarketMessageCount));
}

export function isDuplicateEmailSequenceStatus(status: string): boolean {
  return (DUPLICATE_EMAIL_SEQUENCE_STATUSES as readonly string[]).includes(status);
}

export function getOutreachDailyLimit(
  configuredLimit: number | undefined,
  activeSendDays: number,
  allowVerifiedHotMarketExtras = false,
): number {
  const limit = configuredLimit ?? INITIAL_RAMP_DAILY_LIMIT;
  if (allowVerifiedHotMarketExtras) return limit;
  const rampLimit = activeSendDays < INITIAL_RAMP_ACTIVE_DAYS
    ? Math.min(limit, INITIAL_RAMP_DAILY_LIMIT)
    : limit;
  return Math.min(rampLimit, INITIAL_RAMP_DAILY_LIMIT);
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
): Promise<OutreachReservationIds> {
  const now = new Date();
  const dateKey = phoenixDateKey(now);
  const monthKey = getPhoenixOutreachMonthKey(now);
  const legacyDailyQuotaKey = `outreach-global:${dateKey}`;
  const legacyRegularMonthlyQuotaKey = `outreach-global:${monthKey}`;
  const regularMonthlyQuotaKey = `outreach-regular:${monthKey}`;
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
    await tx.execute(sql`select pg_advisory_xact_lock(hashtext(${dailyQuotaKey}))`);
    await tx.execute(sql`select pg_advisory_xact_lock(hashtext(${regularMonthlyQuotaKey}))`);

    if ((lockedProspect?.contactEmail?.trim().toLowerCase() || null) !== normalizedEmail) {
      throw new Error("Contact changed while dispatch was starting; please retry");
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

    if (campaign && message.sequenceNumber === 1) {
      const sentMessages = await tx.select({ sentAt: outreachMessagesTable.sentAt })
        .from(outreachMessagesTable)
        .where(and(
          eq(outreachMessagesTable.campaignId, campaign.id),
          isNotNull(outreachMessagesTable.sentAt),
        ));
      const activeSendDays = new Set(sentMessages.map(({ sentAt }) => phoenixDateKey(sentAt!))).size;
      const campaignLimit = getOutreachDailyLimit(
        campaign.dailyLimit,
        activeSendDays,
        isHotMarketSourceType(message.sourceType),
      );
      const [campaignReservations] = await tx.select({ value: count() })
        .from(outreachSendReservationsTable)
        .innerJoin(
          outreachMessagesTable,
          eq(outreachSendReservationsTable.messageId, outreachMessagesTable.id),
        )
        .where(and(
          eq(outreachSendReservationsTable.quotaKey, dailyQuotaKey),
          eq(outreachMessagesTable.campaignId, campaign.id),
        ));
      if ((campaignReservations?.value ?? 0) >= campaignLimit) {
        throw new DailySendLimitError();
      }
    }
    let dailyReservationId: number | undefined;
    const laneLimit = getOutreachDailyLaneLimit(lane);
    if (message.sequenceNumber === 1 && laneLimit === undefined) {
      // Extras are deliberately uncapped, but still receive a durable,
      // per-message reservation so provider retries and reconciliation retain
      // the same transactional ownership guarantees as every other opener.
      const [inserted] = await tx.insert(outreachSendReservationsTable)
        .values({ messageId: message.id, quotaKey: dailyQuotaKey, slot: message.id })
        .onConflictDoNothing()
        .returning({ id: outreachSendReservationsTable.id });
      if (!inserted) throw new DailySendLimitError();
      dailyReservationId = inserted.id;
    }
    if (message.sequenceNumber === 1 && laneLimit !== undefined) {
      const laneQuotaKeys = [
        legacyDailyQuotaKey,
        `outreach-direct:${dateKey}`,
        `outreach-public:${dateKey}`,
        `outreach-hot_market:${dateKey}`,
        `outreach-hot_market_extra:${dateKey}`,
      ];
      const [sentInitials, dailyReservations] = await Promise.all([
        tx.select({
          id: outreachMessagesTable.id,
          sourceType: outreachMessagesTable.sourceType,
          contactEmail: prospectsTable.contactEmail,
          contactName: prospectsTable.contactName,
          contactEvidenceType: prospectsTable.contactEvidenceType,
        }).from(outreachMessagesTable)
          .innerJoin(prospectsTable, eq(outreachMessagesTable.prospectId, prospectsTable.id))
          .where(and(eq(outreachMessagesTable.sequenceNumber, 1), gte(outreachMessagesTable.sentAt, dayStart))),
        tx.select({
          messageId: outreachSendReservationsTable.messageId,
          sourceType: outreachMessagesTable.sourceType,
          contactEmail: prospectsTable.contactEmail,
          contactName: prospectsTable.contactName,
          contactEvidenceType: prospectsTable.contactEvidenceType,
        }).from(outreachSendReservationsTable)
          .innerJoin(outreachMessagesTable, eq(outreachSendReservationsTable.messageId, outreachMessagesTable.id))
          .innerJoin(prospectsTable, eq(outreachMessagesTable.prospectId, prospectsTable.id))
          .where(inArray(outreachSendReservationsTable.quotaKey, laneQuotaKeys)),
      ]);
      const reservedIds = new Set(dailyReservations.map((reservation) => reservation.messageId));
      const laneUsage = new Set<number>();
      for (const reservation of dailyReservations) {
        if (getOutreachDailyLane(reservation, reservation) === lane) laneUsage.add(reservation.messageId);
      }
      // A sent legacy message has no reservation row. Count it once, in its
      // inferred lane, so migration to lane keys cannot oversend that lane.
      for (const sent of sentInitials) {
        if (!reservedIds.has(sent.id) && getOutreachDailyLane(sent, sent) === lane) laneUsage.add(sent.id);
      }
      if (laneUsage.size >= laneLimit) throw new DailySendLimitError();
      for (let slot = 1; slot <= laneLimit; slot += 1) {
        const [inserted] = await tx.insert(outreachSendReservationsTable)
          .values({ messageId: message.id, quotaKey: dailyQuotaKey, slot })
          .onConflictDoNothing()
          .returning({ id: outreachSendReservationsTable.id });
        if (inserted) {
          dailyReservationId = inserted.id;
          break;
        }
      }
      if (!dailyReservationId) throw new DailySendLimitError();
    }

    let regularMonthlyReservationId: number | undefined;
    if (message.sequenceNumber === 1 && !isHotMarketSourceType(message.sourceType)) {
      const regularQuotaKeys = [legacyRegularMonthlyQuotaKey, regularMonthlyQuotaKey];
      const regularSource = or(
        isNull(outreachMessagesTable.sourceType),
        sql`${outreachMessagesTable.sourceType} not in (${sql.join(
          HOT_MARKET_SOURCE_TYPES.map((sourceType) => sql`${sourceType}`),
          sql`, `,
        )})`,
      );
      const [[regularSent], [regularReservedSent], [regularReservations]] = await Promise.all([
        tx.select({ value: count() }).from(outreachMessagesTable)
          .where(and(
            eq(outreachMessagesTable.sequenceNumber, 1),
            regularSource,
            gte(outreachMessagesTable.sentAt, monthStart),
          )),
        tx.select({ value: count() })
          .from(outreachMonthlySendReservationsTable)
          .innerJoin(
            outreachMessagesTable,
            eq(outreachMonthlySendReservationsTable.messageId, outreachMessagesTable.id),
          )
          .where(and(
            inArray(outreachMonthlySendReservationsTable.quotaKey, regularQuotaKeys),
            eq(outreachMessagesTable.sequenceNumber, 1),
            regularSource,
            gte(outreachMessagesTable.sentAt, monthStart),
          )),
        tx.select({ value: count() }).from(outreachMonthlySendReservationsTable)
          .innerJoin(
            outreachMessagesTable,
            eq(outreachMonthlySendReservationsTable.messageId, outreachMessagesTable.id),
          )
          .where(and(
            inArray(outreachMonthlySendReservationsTable.quotaKey, regularQuotaKeys),
            eq(outreachMessagesTable.sequenceNumber, 1),
            regularSource,
          )),
      ]);
      const regularMonthlyUsage = getLegacyOutreachMonthlySentCount(
        regularSent?.value ?? 0,
        regularReservedSent?.value ?? 0,
      ) + (regularReservations?.value ?? 0);
      if (isRegularMonthlyOutreachLimitReached(regularMonthlyUsage, now)) {
        throw new MonthlySendLimitError();
      }
      for (let slot = regularMonthlyUsage + 1; slot <= getOutreachMonthlyLimit(now); slot += 1) {
        const [inserted] = await tx.insert(outreachMonthlySendReservationsTable)
          .values({
            messageId: message.id,
            normalizedEmail,
            sequenceNumber: message.sequenceNumber,
            quotaKey: regularMonthlyQuotaKey,
            slot,
          })
          .onConflictDoNothing()
          .returning({ id: outreachMonthlySendReservationsTable.id });
        if (inserted) {
          regularMonthlyReservationId = inserted.id;
          break;
        }
      }
      if (!regularMonthlyReservationId) throw new MonthlySendLimitError();
    }

    return {
      dailyReservationId,
      regularMonthlyReservationId,
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
  const reservations = await reserveOutreachSend(message, currentCampaign, email);
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