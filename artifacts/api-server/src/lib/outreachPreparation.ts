import { and, asc, eq, gt, gte, inArray, lt, lte, or, sql } from "drizzle-orm";
import {
  campaignsTable,
  db,
  outreachCatchUpCohortsTable,
  outreachCatchUpReservationsTable,
  outreachMessagesTable,
  outreachPreparationRunsTable,
  outreachPreparationSlotsTable,
  outreachSequenceSendClaimsTable,
  outreachSuppressionsTable,
  prospectsTable,
  type Campaign,
  type Prospect,
} from "@workspace/db";
import { assertOutreachEligibilityBase } from "./outreachEligibility";
import {
  approvedOutreachBody,
  approvedOutreachFollowUpMessages,
  approvedOutreachSubject,
  REGULAR_OUTREACH_DAILY_TARGET,
} from "./verifiedOutreachBatch";
import { ensureApprovedFollowUpSequence } from "./outreachSequence";
import { isHotMarketSourceType } from "./hotMarketOutreachBatch";
import { getCatchUpRemainingCapacity } from "./outreachCatchUp";
import {
  getAuthoritativeLaneConfig,
  getNamedHotMarketSharedLimit,
  isUncappedLaneLimit,
} from "./outreachLaneConfig";
import { isEvidenceBackedPublicInbox } from "./publicInboxClassifier";
import {
  configuredDailyAllowance,
  loadOutreachSystemConfig,
  NIGHTLY_TOTAL_INITIAL_TARGET,
} from "./outreachSystemConfig";
import { getOutreachDailyLane } from "./outreach";
// These are compatibility defaults only; authoritative lane config supplies
// all production targets and no caller may clamp to these values.
export const OUTREACH_PERSONAL_PREPARATION_TARGET = 100;
export const OUTREACH_PUBLIC_PREPARATION_TARGET = 100;
const STALE_RUN_MS = 20 * 60_000;

export type PreparationCandidate = Pick<Prospect,
  "id" | "companyName" | "website" | "contactEmail" | "contactName" | "state" | "fitScore" | "needScore"
> & { contactEvidenceType?: Prospect["contactEvidenceType"] };

/**
 * The normal preparation API always resolves the following Phoenix day.  The
 * emergency staging recovery is the only caller that supplies an explicit
 * window, allowing it to fill an interrupted current-day window without
 * changing the normal scheduler's target.
 */
export type PhoenixPreparationTarget = {
  targetDate: string;
  scheduledAt: Date;
};

function phoenixDateKey(now: Date): string {
  const parts = Object.fromEntries(new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Phoenix",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now).map((part) => [part.type, part.value]));
  return `${parts.year}-${parts.month}-${parts.day}`;
}

/** Always returns the next Phoenix calendar day, never today's send window. */
export function getNextPhoenixPreparationTarget(now = new Date()): {
  targetDate: string;
  scheduledAt: Date;
} {
  const todayAtEightPm = new Date(`${phoenixDateKey(now)}T20:00:00-07:00`);
  const scheduledAt = new Date(todayAtEightPm.getTime() + 24 * 60 * 60 * 1000);
  return { targetDate: phoenixDateKey(scheduledAt), scheduledAt };
}

export function getCurrentPhoenixPreparationTarget(now = new Date()): PhoenixPreparationTarget {
  const targetDate = phoenixDateKey(now);
  const scheduledAt = new Date(`${targetDate}T20:00:00-07:00`);
  return { targetDate, scheduledAt };
}

export function isPhoenixPreparationWindowOpen(now = new Date()): boolean {
  const todayAtEightPm = new Date(`${phoenixDateKey(now)}T20:00:00-07:00`);
  return now.getTime() >= todayAtEightPm.getTime();
}

export function isPublicInbox(
  email: string | null,
  contactName: string | null,
  evidenceType?: string | null,
): boolean {
  return isEvidenceBackedPublicInbox(email, contactName, evidenceType);
}

export function getPreparationPersonalizationName(
  prospect: Pick<Prospect, "companyName" | "contactEmail" | "contactName" | "contactEvidenceType">,
): string {
  if (isPublicInbox(prospect.contactEmail, prospect.contactName, prospect.contactEvidenceType)) {
    return prospect.contactName?.trim() || prospect.companyName;
  }
  return prospect.contactName ?? "";
}

export function companyDomain(candidate: Pick<PreparationCandidate, "companyName" | "website">): string {
  if (candidate.website?.trim()) {
    try {
      return new URL(candidate.website).hostname.replace(/^www\./, "").toLowerCase();
    } catch {
      // Eligibility does not require a website; use a stable company fallback below.
    }
  }
  return candidate.companyName.trim().toLowerCase().replace(/[^a-z0-9]/g, "");
}

export function prioritizePreparationCandidates<T extends PreparationCandidate>(candidates: T[]): T[] {
  const statePriority = (state: string) => state === "AZ" ? 0 : state === "CA" ? 1 : 2;
  return [...candidates].sort((left, right) => {
    const stateDifference = statePriority(left.state) - statePriority(right.state);
    if (stateDifference !== 0) return stateDifference;
    const laneDifference = Number(isPublicInbox(
      left.contactEmail,
      left.contactName,
      left.contactEvidenceType,
    )) - Number(isPublicInbox(
      right.contactEmail,
      right.contactName,
      right.contactEvidenceType,
    ));
    if (laneDifference !== 0) return laneDifference;
    const qualityDifference = (right.fitScore + right.needScore) - (left.fitScore + left.needScore);
    return qualityDifference || left.id - right.id;
  });
}

export function selectUniquePreparationCandidates<T extends PreparationCandidate>(
  candidates: T[],
  options: {
    personalCap?: number;
    publicCap?: number;
    totalCap?: number;
    usedEmails?: Iterable<string>;
    usedDomains?: Iterable<string>;
  } = {},
): T[] {
  const personalCap = Math.max(0, options.personalCap ?? OUTREACH_PERSONAL_PREPARATION_TARGET);
  const publicCap = Math.max(0, options.publicCap ?? OUTREACH_PUBLIC_PREPARATION_TARGET);
  const emails = new Set(Array.from(options.usedEmails ?? [], (email) => email.trim().toLowerCase()));
  const domains = new Set(Array.from(options.usedDomains ?? [], (domain) => domain.trim().toLowerCase()));
  let personalCount = 0;
  let publicCount = 0;
  let totalCount = 0;
  return prioritizePreparationCandidates(candidates).filter((candidate) => {
    const email = candidate.contactEmail?.trim().toLowerCase() ?? "";
    const domain = companyDomain(candidate);
    if (!email || !domain || emails.has(email) || domains.has(domain)) return false;
    const publicLane = isPublicInbox(
      candidate.contactEmail,
      candidate.contactName,
      candidate.contactEvidenceType,
    );
    if (totalCount >= (options.totalCap ?? Number.POSITIVE_INFINITY)) return false;
    if (publicLane ? publicCount >= publicCap : personalCount >= personalCap) return false;
    emails.add(email);
    domains.add(domain);
    if (publicLane) publicCount += 1;
    else personalCount += 1;
    totalCount += 1;
    return true;
  });
}

export function getPreparationShortfall(prepared: number, target: number): number {
  return Math.max(0, target - prepared);
}

export function getLaneShortfalls(counts: {
  named: number;
  public: number;
  hotMarket: number;
  hotLead: number;
}, targets: {
  named: number;
  public: number;
  hotMarket: number;
  hotLead: number;
}): {
  named: number;
  public: number;
  hotMarket: number;
  hotLead: number;
  total: number;
} {
  const named = Math.max(0, targets.named - counts.named);
  const publicShortfall = Math.max(0, targets.public - counts.public);
  const hotMarket = Math.max(0, targets.hotMarket - counts.hotMarket);
  const hotLead = Math.max(0, targets.hotLead - counts.hotLead);
  return {
    named,
    public: publicShortfall,
    hotMarket,
    hotLead,
    total: named + publicShortfall + hotMarket + hotLead,
  };
}

export function getPreparationRemainingCapacity(slotted: number, untracked: number, target: number): number {
  const total = slotted + untracked;
  if (total > target) {
    throw new Error(`Target window already exceeds the ${target}-message ceiling`);
  }
  return target - total;
}

export function isPreparationRunStale(startedAt: Date, now: Date): boolean {
  return startedAt.getTime() <= now.getTime() - STALE_RUN_MS;
}

async function claimPreparationRun(targetDate: string, now: Date, targetCount: number): Promise<number | undefined> {
  const staleCutoff = new Date(now.getTime() - STALE_RUN_MS);
  const [recovered] = await db.update(outreachPreparationRunsTable).set({
    status: "running",
    startedAt: now,
    completedAt: null,
    error: null,
    targetCount,
    shortfallCount: sql`greatest(
      0,
      ${targetCount} - ${outreachPreparationRunsTable.preparedCount}
    )`,
  }).where(and(
    eq(outreachPreparationRunsTable.targetDate, targetDate),
    or(
      inArray(outreachPreparationRunsTable.status, ["failed", "pending"]),
      and(
        eq(outreachPreparationRunsTable.status, "completed"),
        gt(outreachPreparationRunsTable.shortfallCount, 0),
      ),
      and(
        eq(outreachPreparationRunsTable.status, "completed"),
        lt(outreachPreparationRunsTable.targetCount, targetCount),
      ),
      and(
        eq(outreachPreparationRunsTable.status, "running"),
        lte(outreachPreparationRunsTable.startedAt, staleCutoff),
      ),
    ),
  )).returning({ id: outreachPreparationRunsTable.id });
  if (recovered) return recovered.id;
  const [created] = await db.insert(outreachPreparationRunsTable).values({
    targetDate,
    targetCount,
  }).onConflictDoNothing().returning({ id: outreachPreparationRunsTable.id });
  return created?.id;
}

export async function approveInitialMessageInPreparationWindow(
  messageId: number,
  now = new Date(),
): Promise<typeof outreachMessagesTable.$inferSelect> {
  return db.transaction(async (tx) => {
    const [message] = await tx.select().from(outreachMessagesTable)
      .where(eq(outreachMessagesTable.id, messageId))
      .limit(1);
    if (!message || message.status !== "draft" || message.sequenceNumber !== 1) {
      throw new Error("Only draft initial messages can use the preparation window");
    }
    const [prospect] = await tx.select().from(prospectsTable)
      .where(eq(prospectsTable.id, message.prospectId))
      .limit(1);
    if (!prospect) throw new Error("Prospect not found");
    const [campaign] = message.campaignId
      ? await tx.select().from(campaignsTable).where(eq(campaignsTable.id, message.campaignId)).limit(1)
      : [];
    if (message.campaignId && !campaign) throw new Error("Campaign not found");
    const email = assertOutreachEligibilityBase(message, prospect, campaign, {
      requireApprovedMessage: false,
    });
    const [suppression] = await tx.select({ id: outreachSuppressionsTable.id })
      .from(outreachSuppressionsTable)
      .where(eq(outreachSuppressionsTable.email, email))
      .limit(1);
    if (suppression) throw new Error("Address is suppressed");

    const { scheduledAt } = getNextPhoenixPreparationTarget(now);
  const [laneConfig, runtimeConfig] = await Promise.all([
    getAuthoritativeLaneConfig(undefined, undefined, scheduledAt),
    loadOutreachSystemConfig(now),
  ]);
  const targetCount = getNamedHotMarketSharedLimit(laneConfig);
    const targetDate = phoenixDateKey(scheduledAt);
    await tx.insert(outreachPreparationRunsTable).values({
      targetDate,
      status: "pending",
      targetCount,
      shortfallCount: targetCount,
    }).onConflictDoNothing();
    const [run] = await tx.select().from(outreachPreparationRunsTable)
      .where(eq(outreachPreparationRunsTable.targetDate, targetDate))
      .limit(1);
    if (!run) throw new Error("Unable to allocate the preparation window");
    await tx.execute(sql`select ${outreachPreparationRunsTable.id}
      from ${outreachPreparationRunsTable}
      where ${outreachPreparationRunsTable.id} = ${run.id}
      for update`);

    const targetEnd = new Date(scheduledAt.getTime() + 24 * 60 * 60 * 1000);
    const [slots, targetInitials] = await Promise.all([
      tx.select({
        slot: outreachPreparationSlotsTable.slot,
        messageId: outreachPreparationSlotsTable.messageId,
      }).from(outreachPreparationSlotsTable)
        .where(eq(outreachPreparationSlotsTable.targetDate, targetDate)),
      tx.select({
        id: outreachMessagesTable.id,
        contactEmail: prospectsTable.contactEmail,
        contactName: prospectsTable.contactName,
        contactEvidenceType: prospectsTable.contactEvidenceType,
        sourceType: outreachMessagesTable.sourceType,
      }).from(outreachMessagesTable)
        .innerJoin(prospectsTable, eq(outreachMessagesTable.prospectId, prospectsTable.id))
        .where(and(
          eq(outreachMessagesTable.sequenceNumber, 1),
          gte(outreachMessagesTable.scheduledAt, scheduledAt),
          lt(outreachMessagesTable.scheduledAt, targetEnd),
          inArray(outreachMessagesTable.status, ["approved", "sending"]),
        )),
    ]);
    const slottedMessageIds = new Set(slots.flatMap((slot) => slot.messageId ? [slot.messageId] : []));
    const untrackedCount = targetInitials.filter((candidate) => !slottedMessageIds.has(candidate.id)).length;
     const laneCounts = { named: 0, public: 0, hot_market: 0, hot_lead: 0 };
     for (const candidate of targetInitials) {
       const candidateLane = getOutreachDailyLane(candidate, candidate);
       if (candidateLane in laneCounts) {
         laneCounts[candidateLane as keyof typeof laneCounts] += 1;
       }
     }
     const messageLane = getOutreachDailyLane(message, prospect);
      const verifiedPoolLane = messageLane === "public"
        || messageLane === "named"
        || messageLane === "direct"
        || messageLane === "hot_market";
      const laneLimit = verifiedPoolLane
        ? getNamedHotMarketSharedLimit(laneConfig)
        : laneConfig.hotLeadLimit;
     const quotaLane = messageLane === "direct"
       ? "named"
       : messageLane === "hot_market_extra"
         ? "hot_market"
         : messageLane;
      const laneCount = verifiedPoolLane
        ? laneCounts.named + laneCounts.public + laneCounts.hot_market
        : laneCounts[quotaLane];
      if (!isUncappedLaneLimit(laneLimit) && laneCount >= laneLimit) {
       throw new Error(`The target outreach ${messageLane} lane is full`);
     }
    const remainingCapacity = Math.max(0, targetCount - slots.length - untrackedCount);
    if (remainingCapacity === 0) throw new Error("The target outreach window is full");
    const usedSlots = new Set(slots.map((slot) => slot.slot));
    const slot = Array.from(
      { length: targetCount },
      (_, index) => index + 1,
    ).find((candidate) => !usedSlots.has(candidate));
    if (!slot) throw new Error("The target outreach window is full");

    const [approved] = await tx.update(outreachMessagesTable)
      .set({ status: "approved", scheduledAt })
      .where(and(
        eq(outreachMessagesTable.id, message.id),
        eq(outreachMessagesTable.status, "draft"),
      ))
      .returning();
    if (!approved) throw new Error("Message is no longer available for approval");
    await tx.insert(outreachPreparationSlotsTable).values({
      runId: run.id,
      targetDate,
      slot,
      prospectId: prospect.id,
      messageId: approved.id,
    });
    const preparedCount = slots.length + untrackedCount + 1;
    await tx.update(outreachPreparationRunsTable).set({
      preparedCount,
      shortfallCount: getPreparationShortfall(preparedCount, targetCount),
    }).where(eq(outreachPreparationRunsTable.id, run.id));
    return approved;
  });
}

function canPrepare(prospect: Prospect, campaign: Campaign, suppressedEmails: Set<string>): boolean {
  const email = prospect.contactEmail?.trim().toLowerCase();
  if (!email || suppressedEmails.has(email)) return false;
  try {
    assertOutreachEligibilityBase({
      id: 0, prospectId: prospect.id, campaignId: campaign.id, sequenceNumber: 1,
      subject: "", body: "", status: "draft", scheduledAt: null, sentAt: null,
      providerMessageId: null, providerReconciliationKey: null, error: null,
      sourceType: null, sourceId: null, createdAt: new Date(), updatedAt: new Date(),
      catchUpCohortId: null,
    }, prospect, campaign, {
      requireApprovedMessage: false,
      requireApprovedProspect: false,
    });
    return true;
  } catch {
    return false;
  }
}

async function getRegularLaneCountsForWindow(
  scheduledAt: Date,
): Promise<{ direct: number; public: number; hotMarket: number }> {
  const rows = await db.select({
    contactEmail: prospectsTable.contactEmail,
    contactName: prospectsTable.contactName,
    contactEvidenceType: prospectsTable.contactEvidenceType,
    sourceType: outreachMessagesTable.sourceType,
  })
    .from(outreachMessagesTable)
    .innerJoin(prospectsTable, eq(outreachMessagesTable.prospectId, prospectsTable.id))
    .where(and(
      eq(outreachMessagesTable.sequenceNumber, 1),
      gte(outreachMessagesTable.scheduledAt, scheduledAt),
      lt(
        outreachMessagesTable.scheduledAt,
        new Date(scheduledAt.getTime() + 24 * 60 * 60 * 1000),
      ),
      inArray(outreachMessagesTable.status, ["approved", "sending"]),
    ));
   const hotMarket = rows.filter((row) => isHotMarketSourceType(row.sourceType)).length;
   const regular = rows.filter((row) =>
     !isHotMarketSourceType(row.sourceType)
     && row.sourceType !== "hot_lead"
     && row.sourceType !== "hot_lead_verified"
   );
  const publicCount = regular.filter((row) => isPublicInbox(
    row.contactEmail,
    row.contactName,
    row.contactEvidenceType,
  )).length;
  return { direct: regular.length - publicCount, public: publicCount, hotMarket };
}

export type PreparationInvocationAccounting = {
  state: "skipped" | "completed" | "failed";
  prepared: number;
  windowQueued: number;
  skippedBecause?: string;
  error?: string;
};

export function getPreparationInvocationAccounting(input:
  | { state: "completed"; insertedThisRun: number; windowQueued: number }
  | { state: "skipped"; windowQueued: number; runId: number; startedAt: Date }
  | { state: "failed"; error: unknown }
): PreparationInvocationAccounting {
  if (input.state === "completed") {
    return {
      state: "completed",
      prepared: input.insertedThisRun,
      windowQueued: input.windowQueued,
    };
  }
  if (input.state === "skipped") {
    return {
      state: "skipped",
      prepared: 0,
      windowQueued: input.windowQueued,
      skippedBecause: `run ${input.runId} already claimed at ${input.startedAt.toISOString()}`,
    };
  }
  return {
    state: "failed",
    prepared: 0,
    windowQueued: 0,
    error: input.error instanceof Error ? input.error.message : String(input.error),
  };
}

export async function prepareNextPhoenixOutreach(
  now = new Date(),
  target?: PhoenixPreparationTarget,
): Promise<{
  state: "skipped" | "completed" | "failed";
  prepared: number;
  windowQueued: number;
  skippedBecause?: string;
  error?: string;
  directPrepared: number;
  publicPrepared: number;
  directShortfall: number;
  publicShortfall: number;
  skipped: number;
  shortfall: number;
}> {
  if (!target && !isPhoenixPreparationWindowOpen(now)) {
    return {
      state: "skipped", prepared: 0, windowQueued: 0,
      skippedBecause: "Phoenix preparation window is not open",
      directPrepared: 0,
      publicPrepared: 0, directShortfall: 0, publicShortfall: 0,
      skipped: 0, shortfall: 0,
    };
  }
  const resolvedTarget = target ?? getNextPhoenixPreparationTarget(now);
  const { targetDate, scheduledAt } = resolvedTarget;
  const [laneConfig, runtimeConfig] = await Promise.all([
    getAuthoritativeLaneConfig(undefined, undefined, scheduledAt),
    loadOutreachSystemConfig(now),
  ]);
  const targetCount = getNamedHotMarketSharedLimit(laneConfig);
  const runId = await claimPreparationRun(targetDate, now, targetCount);
  if (!runId) {
    const [existing] = await db.select({
      id: outreachPreparationRunsTable.id,
      startedAt: outreachPreparationRunsTable.startedAt,
      skipped: outreachPreparationRunsTable.skippedCount,
      shortfall: outreachPreparationRunsTable.shortfallCount,
    }).from(outreachPreparationRunsTable)
      .where(eq(outreachPreparationRunsTable.targetDate, targetDate))
      .limit(1);
    const laneCounts = await getRegularLaneCountsForWindow(scheduledAt);
    const verifiedPrepared = laneCounts.direct + laneCounts.public + laneCounts.hotMarket;
    const verifiedShortfall = Math.max(0, targetCount - verifiedPrepared);
    const accounting = existing
      ? getPreparationInvocationAccounting({
        state: "skipped",
        windowQueued: verifiedPrepared,
        runId: existing.id,
        startedAt: existing.startedAt,
      })
      : {
        state: "skipped" as const,
        prepared: 0,
        windowQueued: verifiedPrepared,
        skippedBecause: `run for ${targetDate} already claimed`,
      };
    return {
      ...accounting,
      directPrepared: laneCounts.direct,
      publicPrepared: laneCounts.public,
      directShortfall: Math.max(
        0,
        verifiedShortfall,
      ),
      publicShortfall: Math.max(
        0,
        0,
      ),
      skipped: existing?.skipped ?? 0,
      shortfall: existing?.shortfall ?? targetCount,
    };
  }

  try {
    const rows = await db.select({ prospect: prospectsTable, campaign: campaignsTable })
      .from(prospectsTable)
      .innerJoin(campaignsTable, eq(prospectsTable.campaignId, campaignsTable.id))
      .where(and(
        inArray(prospectsTable.status, ["approved", "review"]),
        eq(prospectsTable.emailStatus, "verified"),
        eq(campaignsTable.status, "active"),
      ));
    const [suppressions, initialMessages, claims] = await Promise.all([
      db.select({ email: outreachSuppressionsTable.email }).from(outreachSuppressionsTable),
      db.select({
        prospectId: outreachMessagesTable.prospectId,
        campaignId: outreachMessagesTable.campaignId,
        status: outreachMessagesTable.status,
        scheduledAt: outreachMessagesTable.scheduledAt,
        contactEmail: prospectsTable.contactEmail,
        companyName: prospectsTable.companyName,
        website: prospectsTable.website,
      })
        .from(outreachMessagesTable)
        .innerJoin(prospectsTable, eq(outreachMessagesTable.prospectId, prospectsTable.id))
        .where(eq(outreachMessagesTable.sequenceNumber, 1)),
      db.select({
        prospectId: outreachSequenceSendClaimsTable.prospectId,
        campaignScope: outreachSequenceSendClaimsTable.campaignScope,
        sequenceNumber: outreachSequenceSendClaimsTable.sequenceNumber,
        contactEmail: prospectsTable.contactEmail,
        companyName: prospectsTable.companyName,
        website: prospectsTable.website,
      }).from(outreachSequenceSendClaimsTable)
        .innerJoin(prospectsTable, eq(outreachSequenceSendClaimsTable.prospectId, prospectsTable.id))
        .where(eq(outreachSequenceSendClaimsTable.sequenceNumber, 1)),
    ]);
    const [catchUpCohort] = await db.select().from(outreachCatchUpCohortsTable)
      .where(eq(outreachCatchUpCohortsTable.name, "Apex Grid fresh verified catch-up")).limit(1);
    const catchUpRemaining = catchUpCohort?.status === "active"
      ? await getCatchUpRemainingCapacity()
      : 0;
    const suppressedEmails = new Set(suppressions.map((row) => row.email.trim().toLowerCase()));
    const initialProspects = new Set(initialMessages.map((row) => row.prospectId));
    const claimedProspects = new Set(claims.map((row) => row.prospectId));
    const eligible = rows.filter(({ prospect, campaign }) =>
      canPrepare(prospect, campaign, suppressedEmails)
      && !initialProspects.has(prospect.id)
      && !claimedProspects.has(prospect.id));
    const campaignsByProspect = new Map(rows.map((row) => [row.prospect.id, row.campaign.id]));
    const campaignByProspect = new Map(rows.map((row) => [row.prospect.id, row.campaign]));
    const preparation = await db.transaction(async (tx) => {
      await tx.execute(sql`select ${outreachPreparationRunsTable.id}
        from ${outreachPreparationRunsTable}
        where ${outreachPreparationRunsTable.id} = ${runId}
        for update`);
      const existingSlots = await tx.select({
        slot: outreachPreparationSlotsTable.slot,
        prospectId: outreachPreparationSlotsTable.prospectId,
        messageId: outreachPreparationSlotsTable.messageId,
      }).from(outreachPreparationSlotsTable)
        .where(eq(outreachPreparationSlotsTable.targetDate, targetDate));
      const targetEnd = new Date(scheduledAt.getTime() + 24 * 60 * 60 * 1000);
      const currentTargetInitials = await tx.select({
        id: outreachMessagesTable.id,
        prospectId: outreachMessagesTable.prospectId,
        companyName: prospectsTable.companyName,
        website: prospectsTable.website,
        contactEmail: prospectsTable.contactEmail,
        contactName: prospectsTable.contactName,
        contactEvidenceType: prospectsTable.contactEvidenceType,
        state: prospectsTable.state,
        fitScore: prospectsTable.fitScore,
        needScore: prospectsTable.needScore,
        sourceType: outreachMessagesTable.sourceType,
      })
        .from(outreachMessagesTable)
        .innerJoin(prospectsTable, eq(outreachMessagesTable.prospectId, prospectsTable.id))
        .where(and(
          eq(outreachMessagesTable.sequenceNumber, 1),
          gte(outreachMessagesTable.scheduledAt, scheduledAt),
          lt(outreachMessagesTable.scheduledAt, targetEnd),
          inArray(outreachMessagesTable.status, ["approved", "sending"]),
        ));
       const regularTargetInitials = currentTargetInitials.filter(
         (message) => message.sourceType !== "hot_lead"
          && message.sourceType !== "hot_lead_verified",
      );
      const slottedMessageIds = new Set(existingSlots.flatMap((row) => row.messageId ? [row.messageId] : []));
      const untrackedTargetInitials = regularTargetInitials.filter((message) => !slottedMessageIds.has(message.id));
      const usedSlots = new Set(existingSlots.map((row) => row.slot));
      const usedProspects = new Set([
        ...existingSlots.map((row) => row.prospectId),
        ...regularTargetInitials.map((row) => row.prospectId),
      ]);
      const remainingCapacity = getPreparationRemainingCapacity(
        existingSlots.length,
        untrackedTargetInitials.length,
        targetCount,
      );
      const selected = selectUniquePreparationCandidates(
        eligible.map((row) => row.prospect),
        {
            personalCap: remainingCapacity,
            publicCap: remainingCapacity,
            totalCap: remainingCapacity,
           usedEmails: [
             ...initialMessages.flatMap((candidate) => candidate.contactEmail ? [candidate.contactEmail] : []),
              ...claims.flatMap((candidate) => candidate.contactEmail ? [candidate.contactEmail] : []),
             ...currentTargetInitials.flatMap((candidate) => candidate.contactEmail ? [candidate.contactEmail] : []),
           ],
            usedDomains: [
              ...initialMessages.map(companyDomain),
              ...claims.map(companyDomain),
              ...currentTargetInitials.map(companyDomain),
            ],
        },
      );
      const availableSlots = Array.from(
         { length: targetCount },
        (_, index) => index + 1,
      ).filter((slot) => !usedSlots.has(slot)).slice(0, remainingCapacity);

      // The one-time catch-up cohort must never starve normal daily
      // preparation: it gates the run only while it is still active AND
      // still has reserved capacity left. An exhausted or finished cohort
      // falls through to normal daily inventory.
      const catchUpEnrolling = catchUpCohort?.status === "active" && catchUpRemaining > 0;
      const selectedForRun = catchUpEnrolling
        ? selected.slice(0, catchUpRemaining)
        : selected;
      let insertedThisRun = 0;
      for (const prospect of selectedForRun) {
        if (usedProspects.has(prospect.id)) continue;
        const candidateEmail = prospect.contactEmail?.trim().toLowerCase();
        if (!candidateEmail) continue;
        const [currentProspect] = await tx.select().from(prospectsTable)
          .where(eq(prospectsTable.id, prospect.id))
          .limit(1);
        const campaign = campaignByProspect.get(prospect.id);
        if (
          !currentProspect
          || !campaign
          || !["approved", "review"].includes(currentProspect.status)
          || !canPrepare(currentProspect, campaign, suppressedEmails)
        ) continue;
        await tx.execute(sql`select pg_advisory_xact_lock(hashtextextended(${candidateEmail}, 0))`);
        const candidateDomain = companyDomain(currentProspect);
        await tx.execute(sql`select pg_advisory_xact_lock(hashtextextended(${candidateDomain}, 0))`);
        const [emailAlreadyUsed] = await tx.select({ id: outreachMessagesTable.id })
          .from(outreachMessagesTable)
          .innerJoin(prospectsTable, eq(outreachMessagesTable.prospectId, prospectsTable.id))
          .where(and(
            eq(outreachMessagesTable.sequenceNumber, 1),
            or(
              sql`lower(trim(${prospectsTable.contactEmail})) = ${candidateEmail}`,
              sql`lower(${prospectsTable.website}) like ${`%${candidateDomain}%`}`,
            ),
          ))
          .limit(1);
        if (emailAlreadyUsed) continue;
        const [claimAlreadyUsed] = await tx.select({ id: outreachSequenceSendClaimsTable.id })
          .from(outreachSequenceSendClaimsTable)
          .innerJoin(prospectsTable, eq(outreachSequenceSendClaimsTable.prospectId, prospectsTable.id))
          .where(and(
            eq(outreachSequenceSendClaimsTable.sequenceNumber, 1),
            or(
              eq(outreachSequenceSendClaimsTable.prospectId, currentProspect.id),
              sql`lower(trim(${prospectsTable.contactEmail})) = ${candidateEmail}`,
              sql`lower(${prospectsTable.website}) like ${`%${candidateDomain}%`}`,
            ),
          ))
          .limit(1);
        if (claimAlreadyUsed) continue;
        const slot = availableSlots.shift();
        if (slot === undefined) break;
        const [slotClaim] = await tx.insert(outreachPreparationSlotsTable).values({
          runId,
          targetDate,
          slot,
          prospectId: prospect.id,
        }).onConflictDoNothing().returning({ id: outreachPreparationSlotsTable.id });
        if (!slotClaim) continue;
        if (currentProspect.status === "review") {
          const [promoted] = await tx.update(prospectsTable)
            .set({ status: "approved" })
            .where(and(
              eq(prospectsTable.id, currentProspect.id),
              eq(prospectsTable.status, "review"),
            ))
            .returning({ id: prospectsTable.id });
          if (!promoted) {
            await tx.delete(outreachPreparationSlotsTable)
              .where(eq(outreachPreparationSlotsTable.id, slotClaim.id));
            continue;
          }
        }
        let catchUpCohortId: number | null = null;
        if (catchUpEnrolling) {
          await tx.execute(sql`select ${outreachCatchUpCohortsTable.id}
            from ${outreachCatchUpCohortsTable}
            where ${outreachCatchUpCohortsTable.id} = ${catchUpCohort.id}
            for update`);
          const [capacityUsed] = await tx.select({ count: sql<number>`count(*)::int` })
            .from(outreachCatchUpReservationsTable)
            .where(and(
              eq(outreachCatchUpReservationsTable.cohortId, catchUpCohort.id),
              inArray(outreachCatchUpReservationsTable.status, ["reserved", "accepted"]),
            ));
          if ((capacityUsed?.count ?? 0) >= catchUpCohort.targetCount) {
            await tx.delete(outreachPreparationSlotsTable)
              .where(eq(outreachPreparationSlotsTable.id, slotClaim.id));
            break;
          }
          catchUpCohortId = catchUpCohort.id;
        }
        const personalizationName = getPreparationPersonalizationName(currentProspect);
        const [message] = await tx.insert(outreachMessagesTable).values({
          prospectId: prospect.id,
          campaignId: campaignsByProspect.get(prospect.id)!,
          sequenceNumber: 1,
          subject: approvedOutreachSubject(currentProspect.companyName),
          body: approvedOutreachBody(personalizationName),
          status: "approved",
          scheduledAt,
          catchUpCohortId,
        }).returning({ id: outreachMessagesTable.id });
        insertedThisRun += 1;
        if (message && catchUpCohortId) {
          await tx.insert(outreachCatchUpReservationsTable).values({
            cohortId: catchUpCohortId,
            messageId: message.id,
          }).onConflictDoNothing();
        }
        await tx.insert(outreachMessagesTable).values(
          approvedOutreachFollowUpMessages(personalizationName).map((followUp) => ({
            prospectId: prospect.id,
            campaignId: campaignsByProspect.get(prospect.id)!,
            sequenceNumber: followUp.sequenceNumber,
            subject: followUp.subject,
            body: followUp.body,
            status: "approved",
            scheduledAt: null,
          })),
        ).onConflictDoNothing();
        await tx.update(outreachPreparationSlotsTable)
          .set({ messageId: message!.id })
          .where(eq(outreachPreparationSlotsTable.id, slotClaim.id));
        usedProspects.add(prospect.id);
      }
      const slots = await tx.select({ id: outreachPreparationSlotsTable.id })
        .from(outreachPreparationSlotsTable)
        .where(eq(outreachPreparationSlotsTable.targetDate, targetDate));
      return {
        insertedThisRun,
        windowQueued: Math.min(
          slots.length + untrackedTargetInitials.length,
          targetCount,
        ),
      };
    });
    const preparedInitials = await db.select({
      message: outreachMessagesTable,
      contactName: prospectsTable.contactName,
    })
      .from(outreachMessagesTable)
      .innerJoin(prospectsTable, eq(outreachMessagesTable.prospectId, prospectsTable.id))
      .where(and(
        eq(outreachMessagesTable.sequenceNumber, 1),
        eq(outreachMessagesTable.status, "approved"),
        gte(outreachMessagesTable.scheduledAt, scheduledAt),
        lt(outreachMessagesTable.scheduledAt, new Date(scheduledAt.getTime() + 24 * 60 * 60 * 1000)),
      ));
    for (const row of preparedInitials) {
      await ensureApprovedFollowUpSequence(row.message, { contactName: row.contactName });
    }
    const skipped = rows.length - preparation.insertedThisRun;
    const laneCounts = await getRegularLaneCountsForWindow(scheduledAt);
    // This service owns only the Named and Public lanes. Hot Market and Hot
    // Lead are prepared independently and must not inflate this shortfall.
    const namedAvailable = Math.max(0, getNamedHotMarketSharedLimit(laneConfig) - laneCounts.hotMarket);
    const regularShortfall = Math.max(0, namedAvailable - laneCounts.direct)
      + Math.max(0, laneConfig.publicLimit - laneCounts.public);
    await db.update(outreachPreparationRunsTable).set({
      status: "completed", preparedCount: preparation.insertedThisRun, skippedCount: skipped,
      shortfallCount: regularShortfall, completedAt: new Date(), error: null,
    }).where(eq(outreachPreparationRunsTable.id, runId));
    const accounting = getPreparationInvocationAccounting({
      state: "completed",
      insertedThisRun: preparation.insertedThisRun,
      windowQueued: preparation.windowQueued,
    });
    return {
      ...accounting,
      directPrepared: laneCounts.direct,
      publicPrepared: laneCounts.public,
      directShortfall: Math.max(
        0,
         namedAvailable - laneCounts.direct,
      ),
      publicShortfall: Math.max(
        0,
         laneConfig.publicLimit - laneCounts.public,
      ),
      skipped,
      shortfall: regularShortfall,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Outreach preparation failed";
    await db.update(outreachPreparationRunsTable).set({
      status: "failed", error: message,
      shortfallCount: getNamedHotMarketSharedLimit(laneConfig) + laneConfig.publicLimit,
      completedAt: new Date(),
    }).where(eq(outreachPreparationRunsTable.id, runId));
    const accounting = getPreparationInvocationAccounting({ state: "failed", error: message });
    return {
      ...accounting,
      directPrepared: 0, publicPrepared: 0,
      directShortfall: getNamedHotMarketSharedLimit(laneConfig),
      publicShortfall: laneConfig.publicLimit,
       skipped: 0, shortfall: getNamedHotMarketSharedLimit(laneConfig) + laneConfig.publicLimit,
    };
  }
}

/**
 * Fills the nightly initial-message ceiling after the lane-owned preparations
 * have run. This deliberately uses the same verified inventory and
 * transaction-level duplicate protections as regular preparation, but does
 * not apply the regular lane caps: those caps are precisely what this
 * recovery path is intended to fill.
 */
export async function topUpVerifiedPreparation(
  scheduledAt: Date,
  needed: number,
): Promise<{ prepared: number; shortfall: number }> {
  const target = Math.max(0, Math.floor(needed));
  if (target === 0) return { prepared: 0, shortfall: 0 };
  const now = new Date();
  const targetDate = phoenixDateKey(scheduledAt);
  const runId = await claimPreparationRun(targetDate, now, NIGHTLY_TOTAL_INITIAL_TARGET);
  const run = runId
    ? runId
    : (await db.select({ id: outreachPreparationRunsTable.id })
      .from(outreachPreparationRunsTable)
      .where(eq(outreachPreparationRunsTable.targetDate, targetDate))
      .limit(1))[0]?.id;
  if (!run) return { prepared: 0, shortfall: target };

  const rows = await db.select({ prospect: prospectsTable, campaign: campaignsTable })
    .from(prospectsTable)
    .innerJoin(campaignsTable, eq(prospectsTable.campaignId, campaignsTable.id))
    .where(and(
      inArray(prospectsTable.status, ["approved", "review"]),
      eq(prospectsTable.emailStatus, "verified"),
      eq(campaignsTable.status, "active"),
    ));
  const [suppressions, initialMessages, claims] = await Promise.all([
    db.select({ email: outreachSuppressionsTable.email }).from(outreachSuppressionsTable),
    db.select({
      prospectId: outreachMessagesTable.prospectId,
      contactEmail: prospectsTable.contactEmail,
      companyName: prospectsTable.companyName,
      website: prospectsTable.website,
    }).from(outreachMessagesTable)
      .innerJoin(prospectsTable, eq(outreachMessagesTable.prospectId, prospectsTable.id))
      .where(eq(outreachMessagesTable.sequenceNumber, 1)),
    db.select({
      prospectId: outreachSequenceSendClaimsTable.prospectId,
      contactEmail: prospectsTable.contactEmail,
      companyName: prospectsTable.companyName,
      website: prospectsTable.website,
    }).from(outreachSequenceSendClaimsTable)
      .innerJoin(prospectsTable, eq(outreachSequenceSendClaimsTable.prospectId, prospectsTable.id))
      .where(eq(outreachSequenceSendClaimsTable.sequenceNumber, 1)),
  ]);
  const suppressedEmails = new Set(suppressions.map((row) => row.email.trim().toLowerCase()));
  const usedProspects = new Set([
    ...initialMessages.map((row) => row.prospectId),
    ...claims.map((row) => row.prospectId),
  ]);
  const usedEmails = new Set([
    ...initialMessages.flatMap((row) => row.contactEmail ? [row.contactEmail] : []),
    ...claims.flatMap((row) => row.contactEmail ? [row.contactEmail] : []),
  ].map((email) => email.trim().toLowerCase()));
  const usedDomains = new Set([
    ...initialMessages.map(companyDomain),
    ...claims.map(companyDomain),
  ]);
  const eligible = rows
    .filter(({ prospect, campaign }) =>
      canPrepare(prospect, campaign, suppressedEmails)
      && !usedProspects.has(prospect.id))
    .map(({ prospect }) => prospect);
  const selected = selectUniquePreparationCandidates(eligible, {
    personalCap: target,
    publicCap: target,
    usedEmails,
    usedDomains,
  }).slice(0, target);
  let prepared = 0;
  await db.transaction(async (tx) => {
    await tx.execute(sql`select ${outreachPreparationRunsTable.id}
      from ${outreachPreparationRunsTable}
      where ${outreachPreparationRunsTable.id} = ${run}
      for update`);
    const existingSlots = await tx.select({
      slot: outreachPreparationSlotsTable.slot,
    }).from(outreachPreparationSlotsTable)
      .where(eq(outreachPreparationSlotsTable.targetDate, targetDate));
    const usedSlots = new Set(existingSlots.map((row) => row.slot));
    const availableSlots = Array.from({ length: NIGHTLY_TOTAL_INITIAL_TARGET }, (_, i) => i + 1)
      .filter((slot) => !usedSlots.has(slot));
    for (const prospect of selected) {
      if (prepared >= target) break;
      const email = prospect.contactEmail?.trim().toLowerCase();
      if (!email) continue;
      await tx.execute(sql`select pg_advisory_xact_lock(hashtextextended(${email}, 0))`);
      const domain = companyDomain(prospect);
      await tx.execute(sql`select pg_advisory_xact_lock(hashtextextended(${domain}, 0))`);
      const [currentProspect] = await tx.select().from(prospectsTable)
        .where(eq(prospectsTable.id, prospect.id)).limit(1);
      const [campaign] = currentProspect?.campaignId
        ? await tx.select().from(campaignsTable)
          .where(eq(campaignsTable.id, currentProspect.campaignId)).limit(1)
        : [];
      const currentEmail = currentProspect?.contactEmail?.trim().toLowerCase();
      const [currentSuppression] = currentEmail
        ? await tx.select({ id: outreachSuppressionsTable.id })
          .from(outreachSuppressionsTable)
          .where(eq(outreachSuppressionsTable.email, currentEmail)).limit(1)
        : [];
      if (
        !currentProspect || !campaign
        || !["approved", "review"].includes(currentProspect.status)
        || currentProspect.emailStatus !== "verified"
        || campaign.status !== "active"
        || currentSuppression
        || !canPrepare(currentProspect, campaign, suppressedEmails)
      ) continue;
      const currentDomain = companyDomain(currentProspect);
      const [existing] = await tx.select({ id: outreachMessagesTable.id })
        .from(outreachMessagesTable)
        .innerJoin(prospectsTable, eq(outreachMessagesTable.prospectId, prospectsTable.id))
        .where(and(
          eq(outreachMessagesTable.sequenceNumber, 1),
          or(eq(outreachMessagesTable.prospectId, prospect.id),
            sql`lower(trim(${prospectsTable.contactEmail})) = ${email}`,
            sql`lower(${prospectsTable.website}) like ${`%${currentDomain}%`}`),
        )).limit(1);
      if (existing) continue;
      const [existingClaim] = await tx.select({ id: outreachSequenceSendClaimsTable.id })
        .from(outreachSequenceSendClaimsTable)
        .innerJoin(prospectsTable, eq(outreachSequenceSendClaimsTable.prospectId, prospectsTable.id))
        .where(and(
          eq(outreachSequenceSendClaimsTable.sequenceNumber, 1),
          or(eq(outreachSequenceSendClaimsTable.prospectId, currentProspect.id),
            sql`lower(trim(${prospectsTable.contactEmail})) = ${currentEmail}`,
            sql`lower(${prospectsTable.website}) like ${`%${currentDomain}%`}`),
        )).limit(1);
      if (existingClaim) continue;
      const slot = availableSlots.shift();
      if (slot === undefined) break;
      const [slotRow] = await tx.insert(outreachPreparationSlotsTable).values({
        runId: run, targetDate, slot, prospectId: prospect.id,
      }).onConflictDoNothing().returning({ id: outreachPreparationSlotsTable.id });
      if (!slotRow) continue;
      try {
       if (currentProspect.status === "review") {
        const [promoted] = await tx.update(prospectsTable)
          .set({ status: "approved" })
          .where(and(eq(prospectsTable.id, prospect.id), eq(prospectsTable.status, "review")))
          .returning({ id: prospectsTable.id });
        if (!promoted) {
          await tx.delete(outreachPreparationSlotsTable)
            .where(eq(outreachPreparationSlotsTable.id, slotRow.id));
          continue;
        }
      }
      const name = getPreparationPersonalizationName(currentProspect);
      const [message] = await tx.insert(outreachMessagesTable).values({
        prospectId: currentProspect.id, campaignId: campaign.id, sequenceNumber: 1,
        subject: approvedOutreachSubject(), body: approvedOutreachBody(name),
        status: "approved", scheduledAt,
      }).returning({ id: outreachMessagesTable.id });
      if (!message) {
        await tx.delete(outreachPreparationSlotsTable)
          .where(eq(outreachPreparationSlotsTable.id, slotRow.id));
        continue;
      }
      await tx.insert(outreachMessagesTable).values(
        approvedOutreachFollowUpMessages(name).map((followUp) => ({
          prospectId: currentProspect.id, campaignId: campaign.id,
          sequenceNumber: followUp.sequenceNumber, subject: followUp.subject,
          body: followUp.body, status: "approved" as const, scheduledAt: null,
        })),
      ).onConflictDoNothing();
      await tx.update(outreachPreparationSlotsTable).set({ messageId: message.id })
        .where(eq(outreachPreparationSlotsTable.id, slotRow.id));
      prepared += 1;
      } catch (error) {
        await tx.delete(outreachPreparationSlotsTable)
          .where(eq(outreachPreparationSlotsTable.id, slotRow.id));
        throw error;
      }
    }
    await tx.update(outreachPreparationRunsTable).set({
      preparedCount: sql`${outreachPreparationRunsTable.preparedCount} + ${prepared}`,
      shortfallCount: sql`greatest(
        0,
        ${NIGHTLY_TOTAL_INITIAL_TARGET} - (
          ${outreachPreparationRunsTable.preparedCount} + ${prepared}
        )
      )`,
      status: "completed", completedAt: new Date(), error: null,
    }).where(eq(outreachPreparationRunsTable.id, run));
  });
  return { prepared, shortfall: Math.max(0, target - prepared) };
}

/**
 * Reconciles the single opener-qualified follow-up for legacy initial messages.
 * The sequence helper schedules only when a recorded open exists.
 */
export async function ensureOutreachFollowUps(): Promise<{ created: number; scheduled: number }> {
  const rows = await db.select({
    initial: outreachMessagesTable,
    prospect: prospectsTable,
  }).from(outreachMessagesTable)
    .innerJoin(prospectsTable, eq(outreachMessagesTable.prospectId, prospectsTable.id))
    .where(eq(outreachMessagesTable.sequenceNumber, 1));
  let created = 0;
  let scheduled = 0;

  for (const { initial, prospect } of rows) {
    if (
      !initial.campaignId
      || !["approved", "sending", "sent", "delivered"].includes(initial.status)
      || prospect.contactStatus !== "active"
      || !prospect.contactName?.trim()
    ) continue;

    const createdCount = await ensureApprovedFollowUpSequence(initial, {
      contactName: prospect.contactName,
    });
    created += createdCount;
    scheduled += createdCount;
  }
  return { created, scheduled };
}

export async function getNextOutreachPreparationStatus(now = new Date()): Promise<{
  targetDate: string;
  targetCount: number;
  preparedCount: number;
  shortfallCount: number;
  status: string;
  completedAt: Date | null;
  error: string | null;
}> {
  const { targetDate } = getNextPhoenixPreparationTarget(now);
  const [run] = await db.select().from(outreachPreparationRunsTable)
    .where(eq(outreachPreparationRunsTable.targetDate, targetDate))
    .limit(1);
  return {
    targetDate,
    targetCount: run?.targetCount ?? 0,
    preparedCount: run?.preparedCount ?? 0,
    shortfallCount: run?.shortfallCount ?? 0,
    status: run?.status ?? "not_started",
    completedAt: run?.completedAt ?? null,
    error: run?.error ?? null,
  };
}
