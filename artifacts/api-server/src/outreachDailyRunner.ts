import { and, eq, gte, inArray, lt, sql } from "drizzle-orm";
import { advisoryLockPool, db, outreachMessagesTable, pool } from "@workspace/db";
import { outreachDailyRunsTable } from "@workspace/db/schema";
import { logger } from "./lib/logger";
import {
  getOutreachAutomationStatus,
  processDueOutreachMessagesWithSummary,
  processOutreachReconciliationWithSummary,
} from "./lib/outreachWorker";
import {
  processDueHotMarketResearch,
  processDueOutreachResearchSchedules,
} from "./lib/outreachResearchScheduler";
import { verifyNewOutreachProspects } from "./lib/outreachVerification";
import {
  prepareNextPhoenixOutreach,
  topUpVerifiedPreparation,
} from "./lib/outreachPreparation";
import { prepareNextPhoenixHotMarketOutreach } from "./lib/hotMarketPreparation";
import { prepareNextPhoenixHotLeadOutreach } from "./lib/outreachHotLeads";
import { getCatchUpProgress } from "./lib/outreachCatchUp";
import { sendDailyOutreachReport } from "./lib/outreachDailyReport";
import { loadOutreachSystemConfig, configuredDailyAllowance } from "./lib/outreachSystemConfig";
import { getOutreachVerificationBatchCap } from "./lib/outreachThroughputConfig";
import {
  isPrimaryPhoenixInvocation,
  runDailyOutreachOnce,
  withExclusiveDailyOutreachRun,
} from "./lib/outreachDailyRunner";

const DAILY_RUNNER_ADVISORY_LOCK_KEY = 1_728_000_001;

const phoenixDateFormatter = new Intl.DateTimeFormat("en-CA", {
  timeZone: "America/Phoenix",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

function phoenixRunDate(now: Date): string {
  return phoenixDateFormatter.format(now);
}

function validateProductionAutomation(): void {
  const status = getOutreachAutomationStatus();
  if (process.env.NODE_ENV === "production" && status.automationReady && status.researchAutomationReady) {
    return;
  }

  logger.error({
    nodeEnv: process.env.NODE_ENV,
    adminAllowlistReady: status.adminAllowlistReady,
    productionConfigReady: status.productionConfigReady,
    sendgridDeliveryPathReady: status.sendgridDeliveryPathReady,
    deliveryEventsReady: status.deliveryEventsReady,
    replyWebhookReady: status.replyWebhookReady,
    automationEnabled: status.automationEnabled,
    researchAutomationEnabled: status.researchAutomationEnabled,
  }, "Daily outreach runner refused to start: production automation safeguards are not ready");
  throw new Error("Production outreach and research automation safeguards are required");
}

function wait(milliseconds: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

async function main(): Promise<void> {
  await loadOutreachSystemConfig();
  validateProductionAutomation();
  const lockClient = await advisoryLockPool.connect();
  const exclusive = await withExclusiveDailyOutreachRun({
    tryAcquire: async () => {
      try {
        const result = await lockClient.query<{ acquired: boolean }>(
          "select pg_try_advisory_lock($1) as acquired",
          [DAILY_RUNNER_ADVISORY_LOCK_KEY],
        );
        return result.rows[0]?.acquired === true;
      } catch (error) {
        lockClient.release();
        throw error;
      }
    },
    release: async () => {
      try {
        await lockClient.query("select pg_advisory_unlock($1)", [DAILY_RUNNER_ADVISORY_LOCK_KEY]);
      } finally {
        lockClient.release();
      }
    },
    }, async () => {
  const invokedAt = new Date();
  const runDate = phoenixRunDate(invokedAt);
  const [run] = await db.insert(outreachDailyRunsTable).values({
    runDate,
    incidentType: isPrimaryPhoenixInvocation(invokedAt) ? null : "missed_primary",
    startedAt: invokedAt,
  }).onConflictDoUpdate({
    target: outreachDailyRunsTable.runDate,
    set: {
      status: "running",
      attemptCount: sql`${outreachDailyRunsTable.attemptCount} + 1`,
      error: null,
      startedAt: invokedAt,
      completedAt: null,
    },
    setWhere: sql`${outreachDailyRunsTable.status} <> 'completed'`,
  }).returning();
  if (!run) {
    logger.info({ runDate }, "Daily outreach runner skipped: date already completed");
    return;
  }

  const result = await runDailyOutreachOnce({
    processHotMarketResearch: () => processDueHotMarketResearch(),
    processScheduledResearch: () => processDueOutreachResearchSchedules(),
    verifyProspects: async () => {
      // Credit discipline: cap the daily finder/verification batch to what
      // the day's send target actually needs (the configured daily
      // allowance), never an open-ended research backlog.
      const runtimeConfig = await loadOutreachSystemConfig().catch(() => null);
      const need = runtimeConfig
        ? configuredDailyAllowance(runtimeConfig, new Date())
        : getOutreachVerificationBatchCap();
      const report = await verifyNewOutreachProspects(need);
      if (report.creditBlocked) {
        // Fail loudly: the runner records this in acquisitionErrors so it
        // lands in the daily report and the run record instead of silently
        // continuing with shrinking inventory.
        const error = new Error(
          `FindyMail credits exhausted after ${report.finderCalls} finder calls; verification stopped with ${report.promoted} promoted.`,
        ) as Error & { verificationSummary?: unknown };
        error.verificationSummary = report;
        throw error;
      }
      return report;
    },
    onResearchError: (stage, error) => {
      logger.error({ err: error, stage, runDate }, "Outreach acquisition stage failed; recorded for the daily report");
    },
    prepareRegularOutreach: () => prepareNextPhoenixOutreach(),
    prepareHotMarketOutreach: () => prepareNextPhoenixHotMarketOutreach(),
    prepareHotLeadOutreach: () => prepareNextPhoenixHotLeadOutreach(),
    countInitialMessagesInWindow: async (scheduledAt) => {
      const [row] = await db.select({ count: sql<number>`count(*)::int` })
        .from(outreachMessagesTable)
        .where(and(
          eq(outreachMessagesTable.sequenceNumber, 1),
          gte(outreachMessagesTable.scheduledAt, scheduledAt),
          lt(outreachMessagesTable.scheduledAt, new Date(scheduledAt.getTime() + 24 * 60 * 60 * 1000)),
          inArray(outreachMessagesTable.status, ["approved", "sending", "sent", "delivered"]),
        ));
      return row?.count ?? 0;
    },
    topUpVerifiedPreparation: (scheduledAt, needed) => topUpVerifiedPreparation(scheduledAt, needed),
    processDueMessages: () => processDueOutreachMessagesWithSummary(),
    processProviderReconciliation: () => processOutreachReconciliationWithSummary(),
    now: () => new Date(),
    wait,
  }, invokedAt);
  const catchUp = await getCatchUpProgress();
  result.catchUpTarget = catchUp.target;
  result.catchUpEnrolled = catchUp.enrolled;
  result.catchUpRemaining = catchUp.remaining;
  const hasPreparationShortfall =
    result.directShortfall > 0
    || result.publicShortfall > 0
    || result.hotMarketShortfall > 0
    || (result.hotLeadShortfall ?? 100) > 0;
  const hasAcquisitionFailure = result.acquisitionErrors.length > 0;
  const status = result.unresolved > 0 || hasPreparationShortfall || hasAcquisitionFailure
    ? "partial"
    : "completed";
  const incidentType = result.unresolved > 0
    ? "partial_run"
    : hasAcquisitionFailure
      ? "acquisition_failed"
      : hasPreparationShortfall
        ? "preparation_shortfall"
        : run.incidentType;
  const acquisitionIncident = result.acquisitionErrors.length > 0
    ? `Acquisition failures: ${result.acquisitionErrors.map((failure) => `${failure.stage}: ${failure.message}`).join(" | ")}`
    : null;
  const incidentError = [hasPreparationShortfall
    ? `Next-day queue shortfall: ${result.directShortfall} Named, ${result.publicShortfall} Public, ${result.hotMarketShortfall} Hot Market, ${result.hotLeadShortfall ?? 100} Hot Lead`
    : null, acquisitionIncident].filter(Boolean).join("; ") || null;
  await db.update(outreachDailyRunsTable).set({
    status,
    incidentType,
    error: incidentError,
    claimedCount: result.claimed,
    providerAcceptedCount: result.providerAccepted,
    deliveredCount: result.delivered,
    bouncedCount: result.bounced,
    stoppedCount: result.stopped,
    unresolvedCount: result.unresolved,
    completedAt: new Date(),
  }).where(eq(outreachDailyRunsTable.id, run.id));
  const report = await sendDailyOutreachReport(runDate, result);
  if (!report.ok) {
    await db.update(outreachDailyRunsTable).set({
      status: "partial",
      incidentType: incidentType ?? "report_failed",
      error: [incidentError, `Daily proof report failed: ${report.error}`]
        .filter(Boolean)
        .join("; "),
    }).where(eq(outreachDailyRunsTable.id, run.id));
    logger.error({ error: report.error, runDate }, "Daily outreach proof report failed");
    return;
  }
  logger.info(result, "Daily outreach runner completed");
  });
  if (exclusive.state === "busy") {
    lockClient.release();
    logger.info("Daily outreach runner skipped: another invocation holds the exclusive lease");
  }
}

try {
  await main();
} catch (err) {
  const runDate = phoenixRunDate(new Date());
  const error = err instanceof Error ? err.message : "Daily outreach runner failed";
  await db.insert(outreachDailyRunsTable).values({
    runDate,
    status: "failed",
    incidentType: "run_failed",
    error,
    completedAt: new Date(),
  }).onConflictDoUpdate({
    target: outreachDailyRunsTable.runDate,
    set: {
      status: "failed",
      incidentType: "run_failed",
      error,
      completedAt: new Date(),
    },
    setWhere: sql`${outreachDailyRunsTable.status} <> 'completed'`,
  }).catch((incidentError) => logger.error({ incidentError }, "Failed to persist daily outreach incident"));
  logger.error({ err }, "Daily outreach runner failed");
  process.exitCode = 1;
} finally {
  await Promise.all([pool.end(), advisoryLockPool.end()]);
}