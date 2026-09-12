import { and, eq, gte, inArray, lt, or, sql } from "drizzle-orm";
import {
  campaignsTable,
  db,
  outreachCatchUpCohortsTable,
  outreachCatchUpReservationsTable,
  outreachMessagesTable,
  outreachSequenceSendClaimsTable,
  outreachSuppressionsTable,
  prospectsTable,
  type Campaign,
  type Prospect,
} from "@workspace/db";
import { assertOutreachEligibilityBase } from "./outreachEligibility";
import {
  HOT_MARKET_DAILY_TARGET,
  HOT_MARKET_SOURCE_TYPE,
  HOT_MARKET_RECURRING_SOURCE_TYPE,
  hotMarketOutreachBody,
  hotMarketOutreachFollowUps,
  hotMarketOutreachSubject,
  isHotMarketSourceType,
} from "./hotMarketOutreachBatch";
import {
  type PhoenixPreparationTarget,
  getNextPhoenixPreparationTarget,
  isPhoenixPreparationWindowOpen,
  prioritizePreparationCandidates,
  companyDomain,
} from "./outreachPreparation";
import { isRecurringHotMarketCampaign } from "./hotMarketResearch";
import { logger } from "./logger";
import {
  getAuthoritativeLaneConfig,
  getNamedHotMarketSharedLimit,
} from "./outreachLaneConfig";
import { getOutreachDailyLane } from "./outreach";

export function getHotMarketRemainingCapacity(existing: number): number {
  return Math.max(0, HOT_MARKET_DAILY_TARGET - existing);
}

export function countHotMarketMessages(
  sourceTypes: Array<string | null>,
): number {
  return sourceTypes.filter(isHotMarketSourceType).length;
}

function canPrepareHotMarket(
  prospect: Prospect,
  campaign: Campaign,
  suppressedEmails: Set<string>,
): boolean {
  const email = prospect.contactEmail?.trim().toLowerCase();
  if (!email || suppressedEmails.has(email)) return false;
  try {
    assertOutreachEligibilityBase({
      id: 0,
      prospectId: prospect.id,
      campaignId: campaign.id,
      sequenceNumber: 1,
      subject: "",
      body: "",
      status: "draft",
      scheduledAt: null,
      sentAt: null,
      providerMessageId: null,
      providerReconciliationKey: null,
      error: null,
      sourceType: HOT_MARKET_SOURCE_TYPE,
      sourceId: null,
      catchUpCohortId: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, prospect, campaign, {
      requireApprovedMessage: false,
      requireApprovedProspect: false,
    });
    return true;
  } catch {
    return false;
  }
}

export async function prepareNextPhoenixHotMarketOutreach(
  now = new Date(),
  target?: PhoenixPreparationTarget,
): Promise<{
  state: "skipped" | "completed" | "failed";
  prepared: number;
  totalScheduled: number;
  shortfall: number;
}> {
  if (!target && !isPhoenixPreparationWindowOpen(now)) {
    return { state: "skipped", prepared: 0, totalScheduled: 0, shortfall: 0 };
  }
  const { scheduledAt } = target ?? getNextPhoenixPreparationTarget(now);
  const laneConfig = await getAuthoritativeLaneConfig(undefined, undefined, scheduledAt);
  const targetEnd = new Date(scheduledAt.getTime() + 24 * 60 * 60 * 1000);
  const sharedLimit = getNamedHotMarketSharedLimit(laneConfig);

  try {
    const rows = await db.select({ prospect: prospectsTable, campaign: campaignsTable })
      .from(prospectsTable)
      .innerJoin(campaignsTable, eq(prospectsTable.campaignId, campaignsTable.id))
      .where(and(
        inArray(prospectsTable.status, ["approved", "review"]),
        eq(prospectsTable.emailStatus, "verified"),
        eq(prospectsTable.contactConfidence, "high"),
        eq(campaignsTable.status, "active"),
        eq(campaignsTable.name, "Verified National Hot-Market Outreach"),
      ));
    const [suppressions, initialMessages, claims, targetInitials] = await Promise.all([
      db.select({ email: outreachSuppressionsTable.email }).from(outreachSuppressionsTable),
      db.select({
        prospectId: outreachMessagesTable.prospectId,
        companyName: prospectsTable.companyName,
        website: prospectsTable.website,
        contactEmail: prospectsTable.contactEmail,
      })
        .from(outreachMessagesTable)
        .innerJoin(prospectsTable, eq(outreachMessagesTable.prospectId, prospectsTable.id))
        .where(eq(outreachMessagesTable.sequenceNumber, 1)),
      db.select({
        prospectId: outreachSequenceSendClaimsTable.prospectId,
        companyName: prospectsTable.companyName,
        website: prospectsTable.website,
        contactEmail: prospectsTable.contactEmail,
      })
        .from(outreachSequenceSendClaimsTable)
        .innerJoin(prospectsTable, eq(outreachSequenceSendClaimsTable.prospectId, prospectsTable.id))
        .where(eq(outreachSequenceSendClaimsTable.sequenceNumber, 1)),
      db.select({
        id: prospectsTable.id,
        contactEmail: prospectsTable.contactEmail,
        companyName: prospectsTable.companyName,
        website: prospectsTable.website,
        state: prospectsTable.state,
        contactName: prospectsTable.contactName,
        contactEvidenceType: prospectsTable.contactEvidenceType,
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
        )),
    ]);
    const suppressedEmails = new Set(suppressions.map((row) => row.email.trim().toLowerCase()));
    const [catchUpCohort] = await db.select().from(outreachCatchUpCohortsTable)
      .where(and(
        eq(outreachCatchUpCohortsTable.name, "Apex Grid fresh verified catch-up"),
        eq(outreachCatchUpCohortsTable.status, "active"),
      )).limit(1);
    const usedProspects = new Set([
      ...initialMessages.map((row) => row.prospectId),
      ...claims.map((row) => row.prospectId),
    ]);
    const usedEmails = new Set([
      ...initialMessages.flatMap((row) =>
        row.contactEmail ? [row.contactEmail.trim().toLowerCase()] : []
      ),
      ...claims.flatMap((row) =>
        row.contactEmail ? [row.contactEmail.trim().toLowerCase()] : []
      ),
      ...targetInitials.flatMap((row) =>
      row.contactEmail ? [row.contactEmail.trim().toLowerCase()] : []
      ),
    ]);
    const usedDomains = new Set([
      ...initialMessages.map(companyDomain),
      ...claims.map(companyDomain),
      ...targetInitials.map(companyDomain),
    ]);
    const currentHotMarketCount = countHotMarketMessages(
      targetInitials.map((row) => row.sourceType),
    );
    const sharedNamedHotMarket = laneConfig.namedHotMarketSharedLimit !== undefined;
    const currentNamedCount = sharedNamedHotMarket
      ? targetInitials.filter((row) => getOutreachDailyLane(row, row) === "named").length
      : 0;
    const remainingCapacity = Math.max(0, sharedLimit - currentHotMarketCount - currentNamedCount);
    const eligible = prioritizePreparationCandidates(
      rows
        .filter(({ prospect, campaign }) =>
          isRecurringHotMarketCampaign(campaign)
          && canPrepareHotMarket(prospect, campaign, suppressedEmails)
          && !usedProspects.has(prospect.id))
        .map(({ prospect }) => prospect),
    );
    const campaignByProspect = new Map(rows.map(({ prospect, campaign }) => [prospect.id, campaign]));
    let prepared = 0;

    for (const prospect of eligible) {
      if (prepared >= remainingCapacity) break;
      const email = prospect.contactEmail!.trim().toLowerCase();
      const domain = companyDomain(prospect);
      if (usedEmails.has(email) || usedDomains.has(domain)) continue;
      const inserted = await db.transaction(async (tx) => {
        await tx.execute(sql`select pg_advisory_xact_lock(hashtextextended(${`hot-market-window:${scheduledAt.toISOString()}`}, 0))`);
        await tx.execute(sql`select pg_advisory_xact_lock(hashtextextended(${email}, 0))`);
        await tx.execute(sql`select pg_advisory_xact_lock(hashtextextended(${domain}, 0))`);
        const currentWindowRows = await tx.select({
          sourceType: outreachMessagesTable.sourceType,
          contactEmail: prospectsTable.contactEmail,
          contactName: prospectsTable.contactName,
          contactEvidenceType: prospectsTable.contactEvidenceType,
        })
          .from(outreachMessagesTable)
          .innerJoin(prospectsTable, eq(outreachMessagesTable.prospectId, prospectsTable.id))
          .where(and(
            eq(outreachMessagesTable.sequenceNumber, 1),
            gte(outreachMessagesTable.scheduledAt, scheduledAt),
            lt(outreachMessagesTable.scheduledAt, targetEnd),
            inArray(outreachMessagesTable.status, ["approved", "sending", "sent", "delivered"]),
          ));
        const currentSharedCount = currentWindowRows.filter((row) => {
          const lane = getOutreachDailyLane(row, row);
          return lane === "hot_market" || (sharedNamedHotMarket && lane === "named");
        }).length;
        if (currentSharedCount >= sharedLimit) return false;
        const [currentProspect] = await tx.select().from(prospectsTable)
          .where(eq(prospectsTable.id, prospect.id))
          .limit(1);
        const campaign = campaignByProspect.get(prospect.id);
        if (!currentProspect || !campaign || !canPrepareHotMarket(
          currentProspect,
          campaign,
          suppressedEmails,
        )) return false;
        const [blocked] = await tx.select({ id: outreachMessagesTable.id })
          .from(outreachMessagesTable)
          .innerJoin(prospectsTable, eq(outreachMessagesTable.prospectId, prospectsTable.id))
          .where(and(
            eq(outreachMessagesTable.sequenceNumber, 1),
            or(
              eq(outreachMessagesTable.prospectId, currentProspect.id),
              sql`lower(trim(${prospectsTable.contactEmail})) = ${email}`,
              sql`lower(${prospectsTable.website}) like ${`%${domain}%`}`,
            ),
          ))
          .limit(1);
        if (blocked) return false;
        const [claimed] = await tx.select({ id: outreachSequenceSendClaimsTable.id })
          .from(outreachSequenceSendClaimsTable)
          .innerJoin(prospectsTable, eq(outreachSequenceSendClaimsTable.prospectId, prospectsTable.id))
          .where(and(
            eq(outreachSequenceSendClaimsTable.sequenceNumber, 1),
            or(
              eq(outreachSequenceSendClaimsTable.prospectId, currentProspect.id),
              sql`lower(trim(${prospectsTable.contactEmail})) = ${email}`,
              sql`lower(${prospectsTable.website}) like ${`%${domain}%`}`,
            ),
          ))
          .limit(1);
        if (claimed) return false;
        const [suppression] = await tx.select({ id: outreachSuppressionsTable.id })
          .from(outreachSuppressionsTable)
          .where(eq(outreachSuppressionsTable.email, email))
          .limit(1);
        if (suppression) return false;

        if (currentProspect.status === "review") {
          const [promoted] = await tx.update(prospectsTable).set({ status: "approved" })
            .where(and(
              eq(prospectsTable.id, currentProspect.id),
              eq(prospectsTable.status, "review"),
            )).returning({ id: prospectsTable.id });
          if (!promoted) return false;
        }
        let catchUpCohortId: number | null = null;
        if (catchUpCohort) {
          await tx.execute(sql`select ${outreachCatchUpCohortsTable.id}
            from ${outreachCatchUpCohortsTable}
            where ${outreachCatchUpCohortsTable.id} = ${catchUpCohort.id}
            for update`);
          const [reserved] = await tx.select({ count: sql<number>`count(*)::int` })
            .from(outreachCatchUpReservationsTable)
            .where(and(
              eq(outreachCatchUpReservationsTable.cohortId, catchUpCohort.id),
              inArray(outreachCatchUpReservationsTable.status, ["reserved", "accepted"]),
            ));
          if ((reserved?.count ?? 0) < catchUpCohort.targetCount) {
            catchUpCohortId = catchUpCohort.id;
          } else {
            // Active catch-up work is a hard gate: never create an opener
            // outside the cohort once its bounded capacity is exhausted.
            return false;
          }
        }
        const personalization = currentProspect.needSignals!.trim();
        await tx.insert(outreachMessagesTable).values([
          {
            prospectId: currentProspect.id,
            campaignId: campaign.id,
            sequenceNumber: 1,
            subject: hotMarketOutreachSubject(currentProspect.audience, currentProspect.state),
            body: hotMarketOutreachBody({
              contactName: currentProspect.contactName!,
              personalization,
              audience: currentProspect.audience,
            }),
            status: "approved",
            scheduledAt,
            sourceType: HOT_MARKET_RECURRING_SOURCE_TYPE,
            catchUpCohortId,
          },
          ...hotMarketOutreachFollowUps(
            currentProspect.contactName!,
            currentProspect.audience,
            currentProspect.state,
          ).map((followUp) => ({
            prospectId: currentProspect.id,
            campaignId: campaign.id,
            sequenceNumber: followUp.sequenceNumber,
            subject: followUp.subject,
            body: followUp.body,
            status: "approved",
            scheduledAt: null,
            sourceType: HOT_MARKET_RECURRING_SOURCE_TYPE,
          })),
        ]);
        if (catchUpCohortId) {
          const [created] = await tx.select({ id: outreachMessagesTable.id })
            .from(outreachMessagesTable)
            .where(and(
              eq(outreachMessagesTable.prospectId, currentProspect.id),
              eq(outreachMessagesTable.sequenceNumber, 1),
              eq(outreachMessagesTable.catchUpCohortId, catchUpCohortId),
            )).limit(1);
          if (created) await tx.insert(outreachCatchUpReservationsTable).values({
            cohortId: catchUpCohortId,
            messageId: created.id,
          }).onConflictDoNothing();
        }
        return true;
      });
      if (inserted) {
        prepared += 1;
        usedEmails.add(email);
        usedDomains.add(domain);
      }
    }

    const totalScheduled = currentHotMarketCount + prepared;
    return {
      state: "completed",
      prepared,
      totalScheduled,
      shortfall: Math.max(0, sharedLimit - totalScheduled - currentNamedCount),
    };
  } catch (error) {
    logger.error({ err: error }, "Recurring hot-market preparation failed");
    return {
      state: "failed",
      prepared: 0,
      totalScheduled: 0,
      shortfall: sharedLimit,
    };
  }
}