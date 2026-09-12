import { and, asc, eq, lte, or, sql } from "drizzle-orm";
import {
  campaignsTable,
  db,
  outreachMessagesTable,
  outreachProviderHandoffsTable,
  outreachCatchUpReservationsTable,
  prospectsTable,
  type OutreachMessage,
} from "@workspace/db";
import { logger } from "./logger";
import {
  DailySendLimitError,
  isUnknownSendResultError,
  MonthlySendLimitError,
  ProviderRateLimitError,
  sendApprovedOutreach,
  type OutreachSendOptions,
} from "./outreach";
import { getNextPhoenixEightAm } from "./outreachEligibility";
import {
  isReplyWebhookConfigured,
  syncSendGridInboundReplyWebhook,
} from "./outreachEvents";
import {
  processDueHotMarketResearch,
  processDueOutreachResearchSchedules,
} from "./outreachResearchScheduler";
import { ensureRecurringHotMarketResearchSchedule } from "./hotMarketResearch";
import { prepareNextPhoenixOutreach } from "./outreachPreparation";
import { prepareNextPhoenixHotLeadOutreach } from "./outreachHotLeads";
import {
  reconcileUncertainOutreachMessages,
  type OutreachReconciliationSummary,
} from "./outreachReconciliation";
import {
  backfillDeliveredFollowUpSequences,
  ensureApprovedFollowUpSequence,
  OPENER_FOLLOW_UP_MAX_AGE_DAYS,
  stopStaleOpenerFollowUps,
  stopLegacyAdditionalFollowUps,
} from "./outreachSequence";
import { monitorOverdueOutreachQueue } from "./outreachQueueMonitor";
import { enrollAcceptedCatchUpMessage } from "./outreachCatchUp";

const ADMIN_EMAIL_PATTERN = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
// The September contract has four independent 100-message lanes.
export const MAX_SCHEDULED_MESSAGES_PER_RUN = 400;

export type OutreachAutomationStatus = {
  adminAllowlistReady: boolean;
  productionConfigReady: boolean;
  sendgridDeliveryPathReady: boolean;
  deliveryEventsReady: boolean;
  replyWebhookReady: boolean;
  automationEnabled: boolean;
  automationReady: boolean;
  researchAutomationEnabled: boolean;
  researchAutomationReady: boolean;
};

let trafficTriggeredDispatch: (() => void) | undefined;

/**
 * Autoscale deployments may pause background timers between requests. Site
 * traffic uses this hook to wake the same overlap-guarded, database-claimed
 * dispatcher used by the one-minute worker interval.
 */
export function wakeOutreachDispatchFromTraffic(): void {
  trafficTriggeredDispatch?.();
}

function hasConfiguredAdminEmail(): boolean {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((email) => email.trim())
    .some((email) => ADMIN_EMAIL_PATTERN.test(email));
}

function hasPublishedProductionUrl(): boolean {
  const configuredUrl = process.env.PUBLIC_SITE_URL?.trim();
  if (!configuredUrl || process.env.NODE_ENV !== "production") return false;

  try {
    const url = new URL(configuredUrl);
    return url.protocol === "https:" && !url.username && !url.password;
  } catch {
    return false;
  }
}

export function getOutreachAutomationStatus(): OutreachAutomationStatus {
  const adminAllowlistReady = hasConfiguredAdminEmail();
  const productionConfigReady = hasPublishedProductionUrl();
  const dedicatedAccountReady = Boolean(process.env.SENDGRID_DEDICATED_API_KEY?.trim())
    && process.env.SENDGRID_ISOLATION_VERIFIED === "true";
  const sendgridDeliveryPathReady = Boolean(
    (process.env.SENDGRID_SUBUSER_USERNAME?.trim()
      && process.env.SENDGRID_SUBUSER_VERIFIED === "true")
    || dedicatedAccountReady,
  );
  const deliveryEventsReady = Boolean(process.env.SENDGRID_EVENT_WEBHOOK_PUBLIC_KEY)
    && process.env.SENDGRID_EVENT_PATH_VERIFIED === "true";
  const replyWebhookReady = isReplyWebhookConfigured()
    && Boolean(process.env.OUTREACH_REPLY_TO_EMAIL?.trim())
    && process.env.OUTREACH_REPLY_PATH_VERIFIED === "true";
  const automationEnabled = process.env.OUTREACH_AUTOMATION_ENABLED === "true";
  const researchAutomationEnabled = process.env.OUTREACH_RESEARCH_AUTOMATION_ENABLED === "true";

  return {
    adminAllowlistReady,
    productionConfigReady,
    sendgridDeliveryPathReady,
    deliveryEventsReady,
    replyWebhookReady,
    automationEnabled,
    researchAutomationEnabled,
    researchAutomationReady: adminAllowlistReady
      && productionConfigReady
      && researchAutomationEnabled,
    automationReady: adminAllowlistReady
      && productionConfigReady
      && sendgridDeliveryPathReady
      && deliveryEventsReady
      && replyWebhookReady
      && automationEnabled,
  };
}

export function isOutreachAutomationReady(): boolean {
  return getOutreachAutomationStatus().automationReady;
}

export function isOutreachResearchAutomationReady(): boolean {
  return getOutreachAutomationStatus().researchAutomationReady;
}

export async function claimOutreachMessageForSending(messageId: number): Promise<OutreachMessage | undefined> {
  const [claimed] = await db.update(outreachMessagesTable)
    .set({ status: "sending", error: null })
    .where(and(
      eq(outreachMessagesTable.id, messageId),
      eq(outreachMessagesTable.status, "approved"),
      sql`exists (
        select 1
        from ${prospectsTable} as current_prospect
        where current_prospect.id = ${outreachMessagesTable.prospectId}
          and current_prospect.contact_status = 'active'
          and current_prospect.status in ('approved', 'contacted')
          and not exists (
            select 1
            from outreach_suppressions as suppression
            where suppression.email = lower(trim(current_prospect.contact_email))
          )
      )`,
      or(
        eq(outreachMessagesTable.sequenceNumber, 1),
        sql`exists (
          select 1
          from ${outreachMessagesTable} as previous_message
          where previous_message.prospect_id = ${outreachMessagesTable.prospectId}
            and previous_message.sequence_number = ${outreachMessagesTable.sequenceNumber} - 1
            and previous_message.status = 'delivered'
            and (
              previous_message.campaign_id = ${outreachMessagesTable.campaignId}
              or (
                previous_message.campaign_id is null
                and ${outreachMessagesTable.campaignId} is null
              )
            )
        )`,
      ),
      sql`${outreachMessagesTable.catchUpCohortId} is null or exists (
        select 1 from outreach_catch_up_reservations as catch_up_reservation
        where catch_up_reservation.message_id = ${outreachMessagesTable.id}
          and catch_up_reservation.status = 'reserved'
      )`,
      or(
        eq(outreachMessagesTable.sequenceNumber, 1),
        sql`exists (
          select 1
          from ${outreachMessagesTable} as delivered_initial
          inner join outreach_delivery_events as delivery_evidence
            on delivery_evidence.outreach_message_id = delivered_initial.id
          where delivered_initial.prospect_id = ${outreachMessagesTable.prospectId}
            and delivered_initial.sequence_number = 1
            and delivered_initial.status = 'delivered'
            and delivery_evidence.event_type = 'delivered'
            and (
              delivered_initial.campaign_id = ${outreachMessagesTable.campaignId}
              or (
                delivered_initial.campaign_id is null
                and ${outreachMessagesTable.campaignId} is null
              )
            )
        )`,
      ),
      sql`${outreachMessagesTable.sequenceNumber} <= 2`,
      or(
        eq(outreachMessagesTable.sequenceNumber, 1),
        sql`exists (
          select 1
          from ${outreachMessagesTable} as initial_message
          inner join outreach_delivery_events as initial_engagement
            on initial_engagement.outreach_message_id = initial_message.id
          where initial_message.prospect_id = ${outreachMessagesTable.prospectId}
            and initial_message.sequence_number = 1
            and initial_engagement.event_type in ('open', 'click')
             and initial_engagement.occurred_at >= now() - (${OPENER_FOLLOW_UP_MAX_AGE_DAYS} * interval '1 day')
              and initial_engagement.occurred_at <= now()
            and exists (
              select 1
              from outreach_delivery_events as delivery_evidence
              where delivery_evidence.outreach_message_id = initial_message.id
                and delivery_evidence.event_type = 'delivered'
                and delivery_evidence.occurred_at <= initial_engagement.occurred_at
            )
            and (
              initial_message.campaign_id = ${outreachMessagesTable.campaignId}
              or (
                initial_message.campaign_id is null
                and ${outreachMessagesTable.campaignId} is null
              )
            )
        )`,
      ),
    ))
    .returning();
  if (!claimed) {
    // Only an opener still approved can have been rejected by eligibility
    // checks; a concurrent claimant is already sending and keeps its slot.
    await db.update(outreachCatchUpReservationsTable).set({
      status: "released",
      releasedAt: new Date(),
    }).where(and(
      eq(outreachCatchUpReservationsTable.messageId, messageId),
      eq(outreachCatchUpReservationsTable.status, "reserved"),
      sql`exists (
        select 1 from outreach_messages rejected
        where rejected.id = ${messageId} and rejected.status = 'approved'
      )`,
    ));
  }
  return claimed;
}

export async function releaseDefinitiveCatchUpReservation(messageId: number): Promise<void> {
  await db.update(outreachCatchUpReservationsTable).set({
    status: "released",
    releasedAt: new Date(),
  }).where(and(
    eq(outreachCatchUpReservationsTable.messageId, messageId),
    eq(outreachCatchUpReservationsTable.status, "reserved"),
  ));
}

export function getSendFailureStatus(error: unknown): "failed" | "needs_review" {
  return isUnknownSendResultError(error) ? "needs_review" : "failed";
}

export async function sendClaimedOutreachMessage(
  message: OutreachMessage,
  options: Omit<OutreachSendOptions, "expectedPersistedStatus" | "afterProviderDispatch"> = {},
): Promise<OutreachMessage | undefined> {
  const [prospect] = await db.select().from(prospectsTable)
    .where(eq(prospectsTable.id, message.prospectId));
  if (!prospect) throw new Error("Prospect not found");
  const [campaign] = message.campaignId
    ? await db.select().from(campaignsTable).where(eq(campaignsTable.id, message.campaignId))
    : [];
  let persisted: OutreachMessage | undefined;
  await sendApprovedOutreach(
    { ...message, status: "approved" },
    prospect,
    campaign,
    {
      ...options,
      deliverabilityReady: getOutreachAutomationStatus().sendgridDeliveryPathReady || Boolean(options.dispatch),
      expectedPersistedStatus: "sending",
      afterProviderDispatch: async (providerMessageId) => {
        try {
          if (message.catchUpCohortId) {
            await db.insert(outreachProviderHandoffsTable).values({
              messageId: message.id,
              providerMessageId,
              reconciliationKey: message.providerReconciliationKey ?? `message:${message.id}`,
              acceptedAt: new Date(),
            }).onConflictDoNothing();
            await enrollAcceptedCatchUpMessage(message.id);
          }
          if (message.sequenceNumber === 1) {
            await ensureApprovedFollowUpSequence(
              message,
              prospect,
              new Date(),
              { emailLockAlreadyHeld: true },
            );
          }
          [persisted] = await db.update(outreachMessagesTable).set({
            status: "sent",
            sentAt: new Date(),
            providerMessageId,
            error: null,
          }).where(and(
            eq(outreachMessagesTable.id, message.id),
            eq(outreachMessagesTable.status, "sending"),
          )).returning();
          if (!persisted) {
            throw new Error("Accepted provider handoff could not be persisted as sent");
          }
        } catch (error) {
          throw new Error(
            "Provider dispatch result is unknown: SendGrid accepted the handoff but local persistence failed",
            { cause: error },
          );
        }
      },
    },
  );
  return persisted;
}

export function countPersistedOutreachSend(
  sentCount: number,
  persisted: OutreachMessage | undefined,
): number {
  return persisted ? sentCount + 1 : sentCount;
}

export type OutreachDispatchSummary = {
  claimed: number;
  providerAccepted: number;
  stopped: number;
  unresolved: number;
};

export function createGuardedAsyncRun(task: () => Promise<void>): () => void {
  let running = false;
  return () => {
    if (running) return;
    running = true;
    void task().finally(() => {
      running = false;
    });
  };
}

export type OutreachWorkerRunOperations = {
  dispatch: () => Promise<void>;
  reconcile: () => Promise<void>;
  research: () => Promise<void>;
  monitor: () => Promise<void>;
};

export type OutreachWorkerRuns = {
  runDispatch: () => void;
  runReconciliation: () => void;
  runResearch: () => void;
  runMonitor: () => void;
};

/**
 * Each scheduler lane has its own guard. Slow provider work or research can
 * therefore remain in flight without consuming the dispatch lane's guard.
 */
export function createOutreachWorkerRuns(
  operations: OutreachWorkerRunOperations,
): OutreachWorkerRuns {
  return {
    runDispatch: createGuardedAsyncRun(operations.dispatch),
    runReconciliation: createGuardedAsyncRun(operations.reconcile),
    runResearch: createGuardedAsyncRun(operations.research),
    runMonitor: createGuardedAsyncRun(operations.monitor),
  };
}

export async function reconcileSendingOutreachMessages(
  now = new Date(),
  reviewAfterMs = 15 * 60 * 1000,
  candidateMessageIds?: number[],
): Promise<number> {
  const result = await reconcileUncertainOutreachMessages({
    now,
    reviewAfterMs,
    candidateMessageIds,
  });
  return result.accepted + result.retryReleased + result.failed + result.ambiguous;
}

export async function processDueOutreachMessagesWithSummary(): Promise<OutreachDispatchSummary> {
  const summary: OutreachDispatchSummary = {
    claimed: 0,
    providerAccepted: 0,
    stopped: 0,
    unresolved: 0,
  };
  if (!isOutreachAutomationReady()) return summary;
  await stopLegacyAdditionalFollowUps();
  await stopStaleOpenerFollowUps();
  await backfillDeliveredFollowUpSequences();
  const due = await db.select().from(outreachMessagesTable)
    .where(and(
      eq(outreachMessagesTable.status, "approved"),
      lte(outreachMessagesTable.scheduledAt, new Date()),
    ))
    .orderBy(asc(outreachMessagesTable.scheduledAt))
    .limit(MAX_SCHEDULED_MESSAGES_PER_RUN);
  for (const message of due) {
    const claimed = await claimOutreachMessageForSending(message.id);
    if (!claimed) {
      summary.stopped += 1;
      continue;
    }
    summary.claimed += 1;
    try {
      const persisted = await sendClaimedOutreachMessage(claimed);
      summary.providerAccepted = countPersistedOutreachSend(summary.providerAccepted, persisted);
    } catch (err) {
      const error = err instanceof Error ? err.message : "Scheduled send failed";
      if (err instanceof DailySendLimitError || err instanceof MonthlySendLimitError) {
        const scheduledAt = getNextPhoenixEightAm();
        await db.update(outreachMessagesTable)
          .set({
            status: "approved",
            scheduledAt,
            error: `${err.message}; deferred to ${scheduledAt.toISOString()}`,
          })
          .where(and(
            eq(outreachMessagesTable.id, claimed.id),
            eq(outreachMessagesTable.status, "sending"),
          ));
        continue;
      }
      if (err instanceof ProviderRateLimitError) {
        const retryAt = new Date(Date.now() + err.retryAfterMs);
        await db.update(outreachMessagesTable)
          .set({
            status: "approved",
            scheduledAt: retryAt,
            error: `${err.message}; deferred to ${retryAt.toISOString()}`,
          })
          .where(and(
            eq(outreachMessagesTable.id, claimed.id),
            eq(outreachMessagesTable.status, "sending"),
          ));
        logger.warn({ messageId: claimed.id, retryAt, error: err.message }, "Provider rate limit deferred outreach without consuming quota");
        continue;
      }
      await db.update(outreachMessagesTable)
        .set({ status: getSendFailureStatus(err), error })
        .where(and(
          eq(outreachMessagesTable.id, claimed.id),
          eq(outreachMessagesTable.status, "sending"),
        ));
      if (getSendFailureStatus(err) === "needs_review") summary.unresolved += 1;
      if (getSendFailureStatus(err) === "failed") {
        await releaseDefinitiveCatchUpReservation(claimed.id);
      }
      logger.warn({ messageId: claimed.id, error }, "Scheduled outreach send blocked or failed");
    }
  }
  return summary;
}

export async function processDueOutreachMessages(): Promise<number> {
  return (await processDueOutreachMessagesWithSummary()).providerAccepted;
}

export async function processOutreachReconciliation(): Promise<void> {
  const reconciliation = await reconcileUncertainOutreachMessages();
  logReconciliationSummary(reconciliation);
}

export async function processOutreachReconciliationWithSummary(): Promise<OutreachReconciliationSummary> {
  const reconciliation = await reconcileUncertainOutreachMessages();
  logReconciliationSummary(reconciliation);
  return reconciliation;
}

function logReconciliationSummary(summary: OutreachReconciliationSummary): void {
  if (summary.checked === 0 && summary.waiting === 0) return;
  const context = {
    checked: summary.checked,
    accepted: summary.accepted,
    retryReleased: summary.retryReleased,
    failed: summary.failed,
    ambiguous: summary.ambiguous,
    waiting: summary.waiting,
  };
  if (summary.ambiguous > 0 || summary.failed > 0) {
    logger.warn(context, "Outreach reconciliation left messages requiring review");
  } else {
    logger.info(context, "Outreach reconciliation completed");
  }
}

export function startOutreachWorker(): void {
  void syncSendGridInboundReplyWebhook()
    .then(({ state, hostname }) => {
      if (state !== "skipped") {
        logger.info({ state, hostname }, "SendGrid inbound reply webhook synchronized");
      }
    })
    .catch((err: unknown) => {
      logger.error({ err }, "SendGrid inbound reply webhook synchronization failed");
    });

  const status = getOutreachAutomationStatus();
  if (!status.automationReady && !status.researchAutomationReady) {
    logger.info({
      adminAllowlistReady: status.adminAllowlistReady,
      productionConfigReady: status.productionConfigReady,
      sendgridDeliveryPathReady: status.sendgridDeliveryPathReady,
      deliveryEventsReady: status.deliveryEventsReady,
      replyWebhookReady: status.replyWebhookReady,
      automationEnabled: status.automationEnabled,
      researchAutomationEnabled: status.researchAutomationEnabled,
    }, "Outreach schedulers disabled until production safety checks pass");
    return;
  }

  const runs = createOutreachWorkerRuns({
    dispatch: async () => {
      await processDueOutreachMessages()
        .then((sentCount) => {
          if (sentCount > 0) logger.info({ sentCount }, "Processed scheduled outreach messages");
        })
        .catch((err: unknown) => logger.error({ err }, "Outreach dispatch scheduler failed"));
      const monitorResult = await monitorOverdueOutreachQueue();
      if (monitorResult.state === "alerted") {
        logger.error(monitorResult.summary, "Approved outreach remained queued past its scheduled grace period");
      } else if (monitorResult.state === "failed") {
        logger.error(
          { ...monitorResult.summary, error: monitorResult.error },
          "Overdue outreach admin alert failed",
        );
      }
    },
    reconcile: async () => {
      await processOutreachReconciliation()
        .then(async () => {
          const preparation = await prepareNextPhoenixOutreach();
          const hotLeads = await prepareNextPhoenixHotLeadOutreach();
          if (preparation.state === "completed") {
            logger.info({ ...preparation, hotLeads }, "Prepared next Phoenix outreach window");
          } else if (preparation.state === "failed") {
            logger.error({ ...preparation, hotLeads }, "Next Phoenix outreach preparation failed");
          }
        })
        .catch((err: unknown) => logger.error({ err }, "Outreach reconciliation scheduler failed"));
    },
    research: async () => {
      await ensureRecurringHotMarketResearchSchedule()
        .then(() => Promise.all([
          processDueOutreachResearchSchedules(),
          processDueHotMarketResearch(),
        ]))
        .then(([completedCount, hotMarket]) => {
          if (completedCount > 0) {
            logger.info({ completedCount }, "Prepared scheduled outreach research lists");
          }
          if (hotMarket.state === "completed") {
            logger.info(hotMarket, "Replenished the next verified hot-market window");
          } else if (hotMarket.state === "failed") {
            logger.error(hotMarket, "Verified hot-market replenishment failed");
          }
        })
        .catch((err: unknown) => logger.error({ err }, "Outreach research scheduler failed"));
    },
    monitor: async () => {
      const result = await monitorOverdueOutreachQueue();
      if (result.state === "alerted") {
        logger.error(result.summary, "Approved outreach remained queued past its scheduled grace period");
      } else if (result.state === "failed") {
        logger.error({ ...result.summary, error: result.error }, "Overdue outreach admin alert failed");
      }
    },
  });
  trafficTriggeredDispatch = runs.runDispatch;

  if (status.automationReady) {
    runs.runDispatch();
    const sendTimer = setInterval(runs.runDispatch, 60_000);
    sendTimer.unref();
    logger.info("Outreach send scheduler enabled");

    const reconciliationTimer = setInterval(runs.runReconciliation, 30 * 60_000);
    reconciliationTimer.unref();
    logger.info("Outreach reconciliation scheduler enabled");

    const monitorTimer = setInterval(runs.runMonitor, 60_000);
    monitorTimer.unref();
    logger.info("Outreach queue monitor enabled");
  }

  if (status.researchAutomationReady) {
    runs.runResearch();
    const researchTimer = setInterval(runs.runResearch, 60_000);
    researchTimer.unref();
    logger.info("Outreach research scheduler enabled");
  }
}
