import { eq, sql } from "drizzle-orm";
import { advisoryLockPool, db, pool } from "@workspace/db";
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
    processDueMessages: () => processDueOutreachMessagesWithSummary(),
    processProviderReconciliation: () => processOutreachReconciliationWithSummary(),
    now: () => new Date(),
    wait,
  }, invokedAt);
  const status = result.unresolved > 0 ? "partial" : "completed";
  await db.update(outreachDailyRunsTable).set({
    status,
    incidentType: result.unresolved > 0
      ? "partial_run"
      : run.incidentType,
    claimedCount: result.claimed,
    providerAcceptedCount: result.providerAccepted,
    deliveredCount: result.delivered,
    bouncedCount: result.bounced,
    stoppedCount: result.stopped,
    unresolvedCount: result.unresolved,
    completedAt: new Date(),
  }).where(eq(outreachDailyRunsTable.id, run.id));
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