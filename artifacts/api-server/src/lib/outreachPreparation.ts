import { and, asc, eq, gt, gte, inArray, lt, lte, or, sql } from "drizzle-orm";
import {
  campaignsTable,
  db,
  outreachDeliveryEventsTable,
  outreachMessagesTable,
  outreachPreparationRunsTable,
  outreachPreparationSlotsTable,
  outreachSequenceSendClaimsTable,
  outreachSuppressionsTable,
  prospectsTable,
  type Campaign,
  type Prospect,
} from "@workspace/db";
import { assertOutreachEligibilityBase, getFollowUpScheduledAt } from "./outreachEligibility";
import {
  approvedOutreachBody,
  approvedOutreachFollowUpMessages,
  approvedOutreachSubject,
  REGULAR_OUTREACH_DAILY_TARGET,
} from "./verifiedOutreachBatch";
import { ensureApprovedFollowUpSequence } from "./outreachSequence";
import { isHotMarketSourceType } from "./hotMarketOutreachBatch";
export const OUTREACH_PERSONAL_PREPARATION_TARGET = 100;
export const OUTREACH_PUBLIC_PREPARATION_TARGET = 50;
export const OUTREACH_PREPARATION_TARGET = REGULAR_OUTREACH_DAILY_TARGET;
const STALE_RUN_MS = 30 * 60_000;
const PUBLIC_INBOX_LOCAL_PARTS = new Set([
  "admin", "contact", "hello", "help", "info", "inquiries", "office", "sales", "support",
  "team",
]);

export type PreparationCandidate = Pick<Prospect,
  "id" | "companyName" | "website" | "contactEmail" | "contactName" | "state" | "fitScore" | "needScore"
> & { contactEvidenceType?: Prospect["contactEvidenceType"] };

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
  const todayAtEight = new Date(`${phoenixDateKey(now)}T08:00:00-07:00`);
  const scheduledAt = new Date(todayAtEight.getTime() + 24 * 60 * 60 * 1000);
  return { targetDate: phoenixDateKey(scheduledAt), scheduledAt };
}

export function isPhoenixPreparationWindowOpen(now = new Date()): boolean {
  const todayAtEight = new Date(`${phoenixDateKey(now)}T08:00:00-07:00`);
  return now.getTime() >= todayAtEight.getTime();
}

export function isPublicInbox(
  email: string | null,
  contactName: string | null,
  evidenceType?: string | null,
): boolean {
  if (evidenceType === "official_publication") return true;
  const localPart = email?.trim().toLowerCase().split("@")[0] ?? "";
  const normalizedName = contactName?.trim().toLowerCase().replace(/[^a-z]/g, "") ?? "";
  return PUBLIC_INBOX_LOCAL_PARTS.has(localPart)
    || PUBLIC_INBOX_LOCAL_PARTS.has(normalizedName);
}

export function companyDomain(candidate: PreparationCandidate): string {
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
    usedEmails?: Iterable<string>;
    usedDomains?: Iterable<string>;
  } = {},
): T[] {
  const personalCap = Math.min(
    Math.max(0, options.personalCap ?? OUTREACH_PERSONAL_PREPARATION_TARGET),
    OUTREACH_PERSONAL_PREPARATION_TARGET,
  );
  const publicCap = Math.min(
    Math.max(0, options.publicCap ?? OUTREACH_PUBLIC_PREPARATION_TARGET),
    OUTREACH_PUBLIC_PREPARATION_TARGET,
  );
  const emails = new Set(Array.from(options.usedEmails ?? [], (email) => email.trim().toLowerCase()));
  const domains = new Set(Array.from(options.usedDomains ?? [], (domain) => domain.trim().toLowerCase()));
  let personalCount = 0;
  let publicCount = 0;
  return prioritizePreparationCandidates(candidates).filter((candidate) => {
    const email = candidate.contactEmail?.trim().toLowerCase() ?? "";
    const domain = companyDomain(candidate);
    if (!email || !domain || emails.has(email) || domains.has(domain)) return false;
    const publicLane = isPublicInbox(
      candidate.contactEmail,
      candidate.contactName,
      candidate.contactEvidenceType,
    );
    if (publicLane ? publicCount >= publicCap : personalCount >= personalCap) return false;
    emails.add(email);
    domains.add(domain);
    if (publicLane) publicCount += 1;
    else personalCount += 1;
    return true;
  });
}

export function getPreparationShortfall(prepared: number): number {
  return Math.max(0, OUTREACH_PREPARATION_TARGET - prepared);
}

export function getPreparationRemainingCapacity(slotted: number, untracked: number): number {
  const total = slotted + untracked;
  if (total > OUTREACH_PREPARATION_TARGET) {
    throw new Error(`Target window already exceeds the ${OUTREACH_PREPARATION_TARGET}-message ceiling`);
  }
  return OUTREACH_PREPARATION_TARGET - total;
}

export function isPreparationRunStale(startedAt: Date, now: Date): boolean {
  return startedAt.getTime() <= now.getTime() - STALE_RUN_MS;
}

async function claimPreparationRun(targetDate: string, now: Date): Promise<number | undefined> {
  const staleCutoff = new Date(now.getTime() - STALE_RUN_MS);
  const [recovered] = await db.update(outreachPreparationRunsTable).set({
    status: "running",
    startedAt: now,
    completedAt: null,
    error: null,
    targetCount: OUTREACH_PREPARATION_TARGET,
    shortfallCount: sql`greatest(
      0,
      ${OUTREACH_PREPARATION_TARGET} - ${outreachPreparationRunsTable.preparedCount}
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
        lt(outreachPreparationRunsTable.targetCount, OUTREACH_PREPARATION_TARGET),
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
    targetCount: OUTREACH_PREPARATION_TARGET,
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
    const targetDate = phoenixDateKey(scheduledAt);
    await tx.insert(outreachPreparationRunsTable).values({
      targetDate,
      status: "pending",
      targetCount: OUTREACH_PREPARATION_TARGET,
      shortfallCount: OUTREACH_PREPARATION_TARGET,
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
    const publicCount = targetInitials.filter((candidate) => isPublicInbox(
      candidate.contactEmail,
      candidate.contactName,
      candidate.contactEvidenceType,
    )).length;
    const personalCount = targetInitials.length - publicCount;
    const publicLane = isPublicInbox(
      prospect.contactEmail,
      prospect.contactName,
      prospect.contactEvidenceType,
    );
    if (
      publicLane
        ? publicCount >= OUTREACH_PUBLIC_PREPARATION_TARGET
        : personalCount >= OUTREACH_PERSONAL_PREPARATION_TARGET
    ) {
      throw new Error(`The target outreach ${publicLane ? "Public" : "Personal"} lane is full`);
    }
    const remainingCapacity = getPreparationRemainingCapacity(slots.length, untrackedCount);
    if (remainingCapacity === 0) throw new Error("The target outreach window is full");
    const usedSlots = new Set(slots.map((slot) => slot.slot));
    const slot = Array.from(
      { length: OUTREACH_PREPARATION_TARGET },
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
      shortfallCount: getPreparationShortfall(preparedCount),
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
    }, prospect, campaign, {
      requireApprovedMessage: false,
      requireApprovedProspect: false,
    });
    return true;
  } catch {
    return false;
  }
}

export async function prepareNextPhoenixOutreach(now = new Date()): Promise<{
  state: "skipped" | "completed" | "failed";
  prepared: number;
  skipped: number;
  shortfall: number;
}> {
  if (!isPhoenixPreparationWindowOpen(now)) {
    return { state: "skipped", prepared: 0, skipped: 0, shortfall: 0 };
  }
  const { targetDate, scheduledAt } = getNextPhoenixPreparationTarget(now);
  const runId = await claimPreparationRun(targetDate, now);
  if (!runId) return { state: "skipped", prepared: 0, skipped: 0, shortfall: 0 };

  try {
    const rows = await db.select({ prospect: prospectsTable, campaign: campaignsTable })
      .from(prospectsTable)
      .innerJoin(campaignsTable, eq(prospectsTable.campaignId, campaignsTable.id))
      .where(and(
        inArray(prospectsTable.status, ["approved", "review"]),
        eq(prospectsTable.emailStatus, "verified"),
        eq(prospectsTable.contactConfidence, "high"),
        eq(campaignsTable.status, "active"),
      ));
    const [suppressions, initialMessages, claims] = await Promise.all([
      db.select({ email: outreachSuppressionsTable.email }).from(outreachSuppressionsTable),
      db.select({
        prospectId: outreachMessagesTable.prospectId,
        campaignId: outreachMessagesTable.campaignId,
        status: outreachMessagesTable.status,
        scheduledAt: outreachMessagesTable.scheduledAt,
      })
        .from(outreachMessagesTable).where(eq(outreachMessagesTable.sequenceNumber, 1)),
      db.select({
        prospectId: outreachSequenceSendClaimsTable.prospectId,
        campaignScope: outreachSequenceSendClaimsTable.campaignScope,
        sequenceNumber: outreachSequenceSendClaimsTable.sequenceNumber,
      }).from(outreachSequenceSendClaimsTable).where(eq(outreachSequenceSendClaimsTable.sequenceNumber, 1)),
    ]);
    const suppressedEmails = new Set(suppressions.map((row) => row.email.trim().toLowerCase()));
    const initialProspects = new Set(initialMessages.map((row) => row.prospectId));
    const claimedProspects = new Set(claims.map((row) => row.prospectId));
    const eligible = rows.filter(({ prospect, campaign }) =>
      canPrepare(prospect, campaign, suppressedEmails)
      && !initialProspects.has(prospect.id)
      && !claimedProspects.has(prospect.id));
    const campaignsByProspect = new Map(rows.map((row) => [row.prospect.id, row.campaign.id]));
    const campaignByProspect = new Map(rows.map((row) => [row.prospect.id, row.campaign]));
    const prepared = await db.transaction(async (tx) => {
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
        (message) => !isHotMarketSourceType(message.sourceType),
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
      );
      const existingPublicCount = regularTargetInitials.filter((candidate) => isPublicInbox(
        candidate.contactEmail,
        candidate.contactName,
        candidate.contactEvidenceType,
      )).length;
      const existingPersonalCount = regularTargetInitials.length - existingPublicCount;
      const selected = selectUniquePreparationCandidates(
        eligible.map((row) => row.prospect),
        {
          personalCap: OUTREACH_PERSONAL_PREPARATION_TARGET - existingPersonalCount,
          publicCap: OUTREACH_PUBLIC_PREPARATION_TARGET - existingPublicCount,
          usedEmails: regularTargetInitials.flatMap((candidate) =>
            candidate.contactEmail ? [candidate.contactEmail] : []
          ),
          usedDomains: regularTargetInitials.map(companyDomain),
        },
      );
      const availableSlots = Array.from(
        { length: OUTREACH_PREPARATION_TARGET },
        (_, index) => index + 1,
      ).filter((slot) => !usedSlots.has(slot)).slice(0, remainingCapacity);

      for (const prospect of selected) {
        if (usedProspects.has(prospect.id)) continue;
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
        const [message] = await tx.insert(outreachMessagesTable).values({
          prospectId: prospect.id,
          campaignId: campaignsByProspect.get(prospect.id)!,
          sequenceNumber: 1,
          subject: approvedOutreachSubject(),
          body: approvedOutreachBody(prospect.contactName!),
          status: "approved",
          scheduledAt,
        }).returning({ id: outreachMessagesTable.id });
        await tx.insert(outreachMessagesTable).values(
          approvedOutreachFollowUpMessages(prospect.contactName!).map((followUp) => ({
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
      return Math.min(
        slots.length + untrackedTargetInitials.length,
        OUTREACH_PREPARATION_TARGET,
      );
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
    const skipped = rows.length - prepared;
    const shortfall = getPreparationShortfall(prepared);
    await db.update(outreachPreparationRunsTable).set({
      status: "completed", preparedCount: prepared, skippedCount: skipped,
      shortfallCount: shortfall, completedAt: new Date(), error: null,
    }).where(eq(outreachPreparationRunsTable.id, runId));
    return { state: "completed", prepared, skipped, shortfall };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Outreach preparation failed";
    await db.update(outreachPreparationRunsTable).set({
      status: "failed", error: message, shortfallCount: OUTREACH_PREPARATION_TARGET, completedAt: new Date(),
    }).where(eq(outreachPreparationRunsTable.id, runId));
    return { state: "failed", prepared: 0, skipped: 0, shortfall: OUTREACH_PREPARATION_TARGET };
  }
}

/**
 * Adds the approved follow-up rows for initial messages created before the
 * drip sequence was enabled. Delivered messages are scheduled from their
 * recorded delivery event; unsent initial messages remain unscheduled until
 * delivery processing runs.
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
    const result = await db.transaction(async (tx) => {
      if (initial.status !== "delivered") return { created: createdCount, scheduled: 0 };
      const [delivery] = await tx.select({ occurredAt: outreachDeliveryEventsTable.occurredAt })
        .from(outreachDeliveryEventsTable)
        .where(and(
          eq(outreachDeliveryEventsTable.outreachMessageId, initial.id),
          eq(outreachDeliveryEventsTable.eventType, "delivered"),
        ))
        .orderBy(asc(outreachDeliveryEventsTable.occurredAt))
        .limit(1);
      const baseDate = delivery?.occurredAt;
      if (!baseDate) return { created: createdCount, scheduled: 0 };
      const followUps = await tx.select().from(outreachMessagesTable).where(and(
        eq(outreachMessagesTable.prospectId, initial.prospectId),
        eq(outreachMessagesTable.campaignId, initial.campaignId!),
        inArray(outreachMessagesTable.sequenceNumber, [2, 3, 4]),
      ));
      let scheduledCount = 0;
      for (const followUp of followUps) {
        const scheduledAt = getFollowUpScheduledAt(followUp.sequenceNumber, baseDate);
        if (!scheduledAt || followUp.scheduledAt || !["draft", "approved"].includes(followUp.status)) continue;
        const updated = await tx.update(outreachMessagesTable).set({ scheduledAt }).where(and(
          eq(outreachMessagesTable.id, followUp.id),
          inArray(outreachMessagesTable.status, ["draft", "approved"]),
        )).returning({ id: outreachMessagesTable.id });
        if (updated.length > 0) scheduledCount += 1;
      }
      return { created: createdCount, scheduled: scheduledCount };
    });
    created += result.created;
    scheduled += result.scheduled;
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
    targetCount: run?.targetCount ?? OUTREACH_PREPARATION_TARGET,
    preparedCount: run?.preparedCount ?? 0,
    shortfallCount: run?.shortfallCount ?? OUTREACH_PREPARATION_TARGET,
    status: run?.status ?? "not_started",
    completedAt: run?.completedAt ?? null,
    error: run?.error ?? null,
  };
}
