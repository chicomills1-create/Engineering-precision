import { and, eq, gte, inArray, lt, or, sql } from "drizzle-orm";
import {
  campaignsTable,
  db,
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
  hotMarketOutreachBody,
  hotMarketOutreachFollowUps,
  hotMarketOutreachSubject,
} from "./hotMarketOutreachBatch";
import {
  getNextPhoenixPreparationTarget,
  isPhoenixPreparationWindowOpen,
  prioritizePreparationCandidates,
  companyDomain,
} from "./outreachPreparation";
import { isRecurringHotMarketCampaign } from "./hotMarketResearch";
import { logger } from "./logger";

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

export async function prepareNextPhoenixHotMarketOutreach(now = new Date()): Promise<{
  state: "skipped" | "completed" | "failed";
  prepared: number;
  totalScheduled: number;
  shortfall: number;
}> {
  if (!isPhoenixPreparationWindowOpen(now)) {
    return { state: "skipped", prepared: 0, totalScheduled: 0, shortfall: 0 };
  }
  const { scheduledAt } = getNextPhoenixPreparationTarget(now);
  const targetEnd = new Date(scheduledAt.getTime() + 24 * 60 * 60 * 1000);

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
      db.select({ prospectId: outreachMessagesTable.prospectId })
        .from(outreachMessagesTable)
        .where(eq(outreachMessagesTable.sequenceNumber, 1)),
      db.select({ prospectId: outreachSequenceSendClaimsTable.prospectId })
        .from(outreachSequenceSendClaimsTable)
        .where(eq(outreachSequenceSendClaimsTable.sequenceNumber, 1)),
      db.select({
        id: prospectsTable.id,
        contactEmail: prospectsTable.contactEmail,
        companyName: prospectsTable.companyName,
        website: prospectsTable.website,
        state: prospectsTable.state,
        contactName: prospectsTable.contactName,
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
    const usedProspects = new Set([
      ...initialMessages.map((row) => row.prospectId),
      ...claims.map((row) => row.prospectId),
    ]);
    const usedEmails = new Set(targetInitials.flatMap((row) =>
      row.contactEmail ? [row.contactEmail.trim().toLowerCase()] : []
    ));
    const usedDomains = new Set(targetInitials.map(companyDomain));
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
      const email = prospect.contactEmail!.trim().toLowerCase();
      const domain = companyDomain(prospect);
      if (usedEmails.has(email) || usedDomains.has(domain)) continue;
      const inserted = await db.transaction(async (tx) => {
        await tx.execute(sql`select pg_advisory_xact_lock(hashtextextended(${email}, 0))`);
        await tx.execute(sql`select pg_advisory_xact_lock(hashtextextended(${domain}, 0))`);
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
        const personalization = currentProspect.needSignals!.trim();
        await tx.insert(outreachMessagesTable).values([
          {
            prospectId: currentProspect.id,
            campaignId: campaign.id,
            sequenceNumber: 1,
            subject: hotMarketOutreachSubject(currentProspect.audience),
            body: hotMarketOutreachBody({
              contactName: currentProspect.contactName!,
              personalization,
              audience: currentProspect.audience,
            }),
            status: "approved",
            scheduledAt,
            sourceType: HOT_MARKET_SOURCE_TYPE,
          },
          ...hotMarketOutreachFollowUps(
            currentProspect.contactName!,
            currentProspect.audience,
          ).map((followUp) => ({
            prospectId: currentProspect.id,
            campaignId: campaign.id,
            sequenceNumber: followUp.sequenceNumber,
            subject: followUp.subject,
            body: followUp.body,
            status: "approved",
            scheduledAt: null,
            sourceType: HOT_MARKET_SOURCE_TYPE,
          })),
        ]);
        return true;
      });
      if (inserted) {
        prepared += 1;
        usedEmails.add(email);
        usedDomains.add(domain);
      }
    }

    const currentHotMarketCount = targetInitials.filter(
      (row) => row.sourceType === HOT_MARKET_SOURCE_TYPE,
    ).length;
    const totalScheduled = currentHotMarketCount + prepared;
    return {
      state: "completed",
      prepared,
      totalScheduled,
      shortfall: Math.max(0, HOT_MARKET_DAILY_TARGET - totalScheduled),
    };
  } catch (error) {
    logger.error({ err: error }, "Recurring hot-market preparation failed");
    return {
      state: "failed",
      prepared: 0,
      totalScheduled: 0,
      shortfall: HOT_MARKET_DAILY_TARGET,
    };
  }
}