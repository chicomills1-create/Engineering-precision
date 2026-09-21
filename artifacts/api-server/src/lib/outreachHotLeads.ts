import { and, eq, gte, inArray, lt, or, sql } from "drizzle-orm";
import {
  campaignsTable,
  db,
  outreachMessagesTable,
  outreachSequenceSendClaimsTable,
  outreachSuppressionsTable,
  prospectsTable,
  type Prospect,
} from "@workspace/db";
import {
  approvedOutreachBody,
  approvedOutreachSubject,
  hotLeadFollowUpMessages,
} from "./verifiedOutreachBatch";
import {
  getAuthoritativeLaneConfig,
  isUncappedLaneLimit,
} from "./outreachLaneConfig";
import {
  type PhoenixPreparationTarget,
  getNextPhoenixPreparationTarget,
  isPhoenixPreparationWindowOpen,
} from "./outreachPreparation";
import { logger } from "./logger";

export type OutreachEngagementRow = {
  prospectId: number;
  companyName: string;
  contactName: string | null;
  contactEmail: string | null;
  city: string;
  state: string;
  campaignName: string | null;
  eventId: number;
  eventType: string;
  occurredAt: Date;
};

export type HotLeadCandidate = Pick<Prospect,
  "id" | "companyName" | "website" | "contactEmail" | "contactName" | "contactTitle"
  | "state" | "fitScore" | "needScore" | "leadScore" | "leadStatus" | "createdAt"
> & { latestEngagedAt?: Date | null };

/**
 * Hot-lead ordering intentionally gives recency precedence over score. This
 * keeps a newly qualified September lead from being displaced by an older,
 * marginally stronger record, while the score breaks same-day ties.
 */
export function prioritizeHotLeadCandidates<T extends HotLeadCandidate>(candidates: T[]): T[] {
  return [...candidates].sort((left, right) =>
    right.createdAt.getTime() - left.createdAt.getTime()
    || (right.latestEngagedAt?.getTime() ?? 0) - (left.latestEngagedAt?.getTime() ?? 0)
    || right.leadScore - left.leadScore
    || (right.fitScore + right.needScore) - (left.fitScore + left.needScore)
    || left.id - right.id,
  );
}

function phoenixDateKey(now: Date): string {
  const values = Object.fromEntries(new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Phoenix",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now).map((part) => [part.type, part.value]));
  return `${values.year}-${values.month}-${values.day}`;
}

function companyDomain(prospect: Pick<Prospect, "companyName" | "website">): string {
  if (prospect.website) {
    try {
      return new URL(prospect.website).hostname.replace(/^www\./, "").toLowerCase();
    } catch {
      // Use the same stable fallback as regular preparation.
    }
  }
  return prospect.companyName.trim().toLowerCase().replace(/[^a-z0-9]/g, "");
}

/**
 * Stages the independent September Hot Leads lane. Only records that have
 * already been explicitly promoted to a hot/qualified lead are considered;
 * engagement does not silently authorize a second opener to a prior
 * recipient. Existing opener/email/suppression checks are repeated inside the
 * transaction so this remains safe when regular and hot-market preparation
 * run concurrently.
 */
export async function prepareNextPhoenixHotLeadOutreach(
  now = new Date(),
  target?: PhoenixPreparationTarget,
): Promise<{
  state: "skipped" | "completed" | "failed";
  prepared: number;
  totalScheduled: number;
  windowQueued: number;
  skippedBecause?: string;
  error?: string;
  shortfall: number;
}> {
  if (!target && !isPhoenixPreparationWindowOpen(now)) {
    return {
      state: "skipped",
      prepared: 0,
      totalScheduled: 0,
      windowQueued: 0,
      skippedBecause: "Phoenix preparation window is not open",
      shortfall: 0,
    };
  }
  const { scheduledAt } = target ?? getNextPhoenixPreparationTarget(now);
  const targetEnd = new Date(scheduledAt.getTime() + 24 * 60 * 60_000);
  const laneConfig = await getAuthoritativeLaneConfig(undefined, undefined, scheduledAt);
  const hotLeadLimit = laneConfig.hotLeadLimit;

  try {
    const rows = await db.select({ prospect: prospectsTable, campaign: campaignsTable })
      .from(prospectsTable)
      .innerJoin(campaignsTable, eq(prospectsTable.campaignId, campaignsTable.id))
      .where(and(
        inArray(prospectsTable.status, ["approved", "review"]),
        eq(prospectsTable.contactStatus, "active"),
        eq(prospectsTable.emailStatus, "verified"),
        or(
          inArray(prospectsTable.leadStatus, ["hot", "qualified"]),
          // September 2026 relaunch: hot = any verified open (score 10) or click (55).
          gte(prospectsTable.leadScore, 10),
        ),
        eq(campaignsTable.status, "active"),
      ));
    const [suppressions, initialMessages, claims, targetMessages] = await Promise.all([
      db.select({ email: outreachSuppressionsTable.email }).from(outreachSuppressionsTable),
      db.select({
        prospectId: outreachMessagesTable.prospectId,
        contactEmail: prospectsTable.contactEmail,
        companyName: prospectsTable.companyName,
        website: prospectsTable.website,
      })
        .from(outreachMessagesTable)
        .innerJoin(prospectsTable, eq(outreachMessagesTable.prospectId, prospectsTable.id))
        .where(eq(outreachMessagesTable.sequenceNumber, 1)),
      db.select({
        prospectId: outreachSequenceSendClaimsTable.prospectId,
        contactEmail: prospectsTable.contactEmail,
        companyName: prospectsTable.companyName,
        website: prospectsTable.website,
      })
        .from(outreachSequenceSendClaimsTable)
        .innerJoin(prospectsTable, eq(outreachSequenceSendClaimsTable.prospectId, prospectsTable.id))
        .where(eq(outreachSequenceSendClaimsTable.sequenceNumber, 1)),
      db.select({
        prospectId: outreachMessagesTable.prospectId,
        sourceType: outreachMessagesTable.sourceType,
      })
        .from(outreachMessagesTable)
        .where(and(
          eq(outreachMessagesTable.sequenceNumber, 1),
          gte(outreachMessagesTable.scheduledAt, scheduledAt),
          lt(outreachMessagesTable.scheduledAt, targetEnd),
          inArray(outreachMessagesTable.status, ["approved", "sending", "sent", "delivered"]),
        )),
    ]);
    const suppressed = new Set(suppressions.map((row) => row.email.trim().toLowerCase()));
    const usedProspects = new Set([
      ...initialMessages.map((row) => row.prospectId),
      ...claims.map((row) => row.prospectId),
      ...targetMessages.map((row) => row.prospectId),
    ]);
    const usedEmails = new Set([
      ...initialMessages.flatMap((row) =>
        row.contactEmail ? [row.contactEmail.trim().toLowerCase()] : []
      ),
      ...claims.flatMap((row) =>
        row.contactEmail ? [row.contactEmail.trim().toLowerCase()] : []
      ),
    ]);
    const usedDomains = new Set([
      ...initialMessages.map(companyDomain),
      ...claims.map(companyDomain),
      ...rows
        .filter(({ prospect }) => usedProspects.has(prospect.id))
        .map(({ prospect }) => companyDomain(prospect)),
    ]);
    const existingHotLeads = targetMessages.filter((row) =>
      row.sourceType === "hot_lead" || row.sourceType === "hot_lead_verified"
    ).length;
    const remaining = isUncappedLaneLimit(hotLeadLimit)
      ? Infinity
      : Math.max(0, hotLeadLimit - existingHotLeads);
    const campaignsByProspect = new Map(rows.map(({ prospect, campaign }) => [prospect.id, campaign]));
    const candidates = prioritizeHotLeadCandidates(
      rows.map(({ prospect }) => prospect).filter((prospect) => {
        const email = prospect.contactEmail?.trim().toLowerCase();
        return Boolean(email)
          && !usedProspects.has(prospect.id)
          && !suppressed.has(email!)
          && !usedEmails.has(email!)
          && !usedDomains.has(companyDomain(prospect))
          && Boolean(prospect.contactName?.trim());
      }),
    );
    let prepared = 0;
    for (const candidate of candidates) {
      if (prepared >= remaining) break;
      const email = candidate.contactEmail!.trim().toLowerCase();
      const domain = companyDomain(candidate);
      const inserted = await db.transaction(async (tx) => {
        await tx.execute(sql`select pg_advisory_xact_lock(hashtextextended(${`hot-lead-window:${phoenixDateKey(scheduledAt)}`}, 0))`);
        await tx.execute(sql`select pg_advisory_xact_lock(hashtextextended(${email}, 0))`);
        await tx.execute(sql`select pg_advisory_xact_lock(hashtextextended(${domain}, 0))`);
        const [currentCount] = await tx.select({ value: sql<number>`count(*)::int` })
          .from(outreachMessagesTable)
          .where(and(
            eq(outreachMessagesTable.sequenceNumber, 1),
            eq(outreachMessagesTable.sourceType, "hot_lead_verified"),
            gte(outreachMessagesTable.scheduledAt, scheduledAt),
            lt(outreachMessagesTable.scheduledAt, targetEnd),
            inArray(outreachMessagesTable.status, ["approved", "sending", "sent", "delivered"]),
          ));
        if (
          !isUncappedLaneLimit(hotLeadLimit)
          && (currentCount?.value ?? 0) >= hotLeadLimit
        ) return false;
        const [blocked] = await tx.select({ id: outreachMessagesTable.id })
          .from(outreachMessagesTable)
          .innerJoin(prospectsTable, eq(outreachMessagesTable.prospectId, prospectsTable.id))
          .where(and(
            eq(outreachMessagesTable.sequenceNumber, 1),
            or(
              eq(outreachMessagesTable.prospectId, candidate.id),
              sql`lower(trim(${prospectsTable.contactEmail})) = ${email}`,
              sql`lower(${prospectsTable.website}) like ${`%${domain}%`}`,
            ),
          )).limit(1);
        const [suppression] = await tx.select({ id: outreachSuppressionsTable.id })
          .from(outreachSuppressionsTable)
          .where(eq(outreachSuppressionsTable.email, email))
          .limit(1);
        const [claimed] = await tx.select({ id: outreachSequenceSendClaimsTable.id })
          .from(outreachSequenceSendClaimsTable)
          .innerJoin(prospectsTable, eq(outreachSequenceSendClaimsTable.prospectId, prospectsTable.id))
          .where(and(
            eq(outreachSequenceSendClaimsTable.sequenceNumber, 1),
            or(
              eq(outreachSequenceSendClaimsTable.prospectId, candidate.id),
              sql`lower(trim(${prospectsTable.contactEmail})) = ${email}`,
              sql`lower(${prospectsTable.website}) like ${`%${domain}%`}`,
            ),
          ))
          .limit(1);
        const campaign = campaignsByProspect.get(candidate.id);
        if (blocked || claimed || suppression || !campaign) return false;
        await tx.insert(outreachMessagesTable).values([
          {
            prospectId: candidate.id,
            campaignId: campaign.id,
            sequenceNumber: 1,
            subject: approvedOutreachSubject(candidate.companyName),
            body: approvedOutreachBody(candidate.contactName!),
            status: "approved",
            scheduledAt,
            sourceType: "hot_lead_verified",
          },
          ...hotLeadFollowUpMessages(candidate.contactName!).map((followUp) => ({
            prospectId: candidate.id,
            campaignId: campaign.id,
            sequenceNumber: followUp.sequenceNumber,
            subject: followUp.subject,
            body: followUp.body,
            status: "approved",
            scheduledAt: null,
            sourceType: "hot_lead_verified",
          })),
        ]);
        return true;
      });
      if (inserted) {
        prepared += 1;
        usedEmails.add(email);
        usedDomains.add(domain);
        usedProspects.add(candidate.id);
      }
    }
    const totalScheduled = existingHotLeads + prepared;
    return {
      state: "completed",
      prepared,
      totalScheduled,
      windowQueued: totalScheduled,
      shortfall: isUncappedLaneLimit(hotLeadLimit)
        ? 0
        : Math.max(0, hotLeadLimit - totalScheduled),
    };
  } catch (error) {
    logger.error({ err: error }, "September hot-lead preparation failed");
    return {
      state: "failed",
      prepared: 0,
      totalScheduled: 0,
      windowQueued: 0,
      error: error instanceof Error ? error.message : "September hot-lead preparation failed",
      shortfall: isUncappedLaneLimit(hotLeadLimit) ? 0 : hotLeadLimit,
    };
  }
}

export function buildOutreachHotLeads(rows: OutreachEngagementRow[]) {
  const leads = new Map<number, {
    prospectId: number;
    companyName: string;
    contactName: string | null;
    contactEmail: string | null;
    location: string;
    campaignName: string | null;
    eventIds: Set<number>;
    openCount: number;
    clickCount: number;
    firstEngagedAt: Date;
    latestEngagedAt: Date;
  }>();
  for (const row of rows) {
    if (row.eventType !== "open" && row.eventType !== "click") continue;
    if (leads.get(row.prospectId)?.eventIds.has(row.eventId)) continue;
    const current = leads.get(row.prospectId);
    if (current) {
      current.eventIds.add(row.eventId);
        if (row.eventType === "click") current.clickCount += 1;
        if (row.eventType === "open") current.openCount += 1;
      if (row.occurredAt < current.firstEngagedAt) current.firstEngagedAt = row.occurredAt;
      if (row.occurredAt > current.latestEngagedAt) {
        current.latestEngagedAt = row.occurredAt;
        current.campaignName = row.campaignName;
      }
      continue;
    }
    leads.set(row.prospectId, {
      prospectId: row.prospectId,
      companyName: row.companyName,
      contactName: row.contactName,
      contactEmail: row.contactEmail,
      location: [row.city, row.state].filter(Boolean).join(", "),
      campaignName: row.campaignName,
      eventIds: new Set([row.eventId]),
      openCount: row.eventType === "open" ? 1 : 0,
      clickCount: row.eventType === "click" ? 1 : 0,
      firstEngagedAt: row.occurredAt,
      latestEngagedAt: row.occurredAt,
    });
  }
  return [...leads.values()]
    .sort((a, b) =>
      Number(b.clickCount > 0) - Number(a.clickCount > 0)
      || Number(b.openCount > 0) - Number(a.openCount > 0)
      || b.latestEngagedAt.getTime() - a.latestEngagedAt.getTime()
      || a.prospectId - b.prospectId,
    )
    .map(({ eventIds: _eventIds, firstEngagedAt, latestEngagedAt, clickCount, ...lead }) => ({
      ...lead,
      clickCount,
      firstEngagedAt: firstEngagedAt.toISOString(),
      latestEngagedAt: latestEngagedAt.toISOString(),
      qualification: clickCount > 0 ? "clicked" as const : "opened" as const,
    }));
}