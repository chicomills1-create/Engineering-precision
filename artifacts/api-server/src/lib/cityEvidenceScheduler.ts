import { spawn, type ChildProcess } from "node:child_process";
import { and, eq, lt, or, sql } from "drizzle-orm";
import { cityEvidenceCheckRunsTable, db } from "@workspace/db";
import { logger } from "./logger";

const PHOENIX_OFFSET_MS = 7 * 60 * 60_000;
const RUN_HOUR = 9;
const POLL_MS = 60 * 60_000;
const STALE_RUN_MS = 60 * 60_000;
const MAX_ATTEMPTS = 2;

export function cityEvidenceSlot(now: Date): string | null {
  const phoenixNow = new Date(now.getTime() - PHOENIX_OFFSET_MS);
  const daysSinceMonday = (phoenixNow.getUTCDay() + 6) % 7;
  const monday = new Date(Date.UTC(
    phoenixNow.getUTCFullYear(),
    phoenixNow.getUTCMonth(),
    phoenixNow.getUTCDate() - daysSinceMonday,
    RUN_HOUR,
  ));
  if (phoenixNow.getTime() < monday.getTime()) return null;
  return monday.toISOString().slice(0, 10);
}

async function claimSlot(slot: string, now: Date): Promise<boolean> {
  const [created] = await db.insert(cityEvidenceCheckRunsTable).values({
    slot,
    status: "running",
    startedAt: now,
  }).onConflictDoNothing().returning({ slot: cityEvidenceCheckRunsTable.slot });
  if (created) return true;

  const staleBefore = new Date(now.getTime() - STALE_RUN_MS);
  const [reclaimed] = await db.update(cityEvidenceCheckRunsTable).set({
    status: "running",
    startedAt: now,
    completedAt: null,
    error: null,
    attemptCount: sql`${cityEvidenceCheckRunsTable.attemptCount} + 1`,
  }).where(and(
    eq(cityEvidenceCheckRunsTable.slot, slot),
    lt(cityEvidenceCheckRunsTable.attemptCount, MAX_ATTEMPTS),
    or(
      eq(cityEvidenceCheckRunsTable.status, "failed"),
      and(
        eq(cityEvidenceCheckRunsTable.status, "running"),
        lt(cityEvidenceCheckRunsTable.startedAt, staleBefore),
      ),
    ),
  )).returning({ slot: cityEvidenceCheckRunsTable.slot });
  return Boolean(reclaimed);
}

function spawnCheck(): ChildProcess {
  return spawn("pnpm", [
    "--filter",
    "@workspace/apex-grid",
    "run",
    "seo:check:city-evidence:scheduled",
  ], { cwd: process.cwd(), env: process.env, stdio: "inherit" });
}

export function startCityEvidenceScheduler(): () => Promise<void> {
  if (process.env.NODE_ENV !== "production") return async () => {};
  let timer: NodeJS.Timeout | undefined;
  let child: ChildProcess | undefined;
  let stopping = false;

  const runIfDue = async () => {
    if (stopping || child) return;
    const now = new Date();
    const slot = cityEvidenceSlot(now);
    if (!slot || !(await claimSlot(slot, now))) return;
    logger.info({ slot }, "Starting claimed weekly city evidence check");
    child = spawnCheck();
    child.once("error", (error) => {
      logger.error({ err: error, slot }, "Claimed city evidence check failed to start");
    });
    child.once("close", (code, signal) => {
      const succeeded = code === 0;
      void db.update(cityEvidenceCheckRunsTable).set({
        status: succeeded ? "completed" : "failed",
        completedAt: new Date(),
        error: succeeded ? null : `exit code ${code ?? "null"}; signal ${signal ?? "none"}`,
      }).where(eq(cityEvidenceCheckRunsTable.slot, slot)).then(() => {
        logger[succeeded ? "info" : "error"]({ slot, code, signal }, "Weekly city evidence check finished");
      }).catch((error: unknown) => {
        logger.error({ err: error, slot }, "Could not persist city evidence check result");
      });
      child = undefined;
    });
  };

  void runIfDue().catch((error: unknown) => logger.error({ err: error }, "City evidence startup check failed"));
  timer = setInterval(() => {
    void runIfDue().catch((error: unknown) => logger.error({ err: error }, "City evidence schedule check failed"));
  }, POLL_MS);
  timer.unref();
  logger.info("Durable weekly city evidence scheduler enabled");

  return async () => {
    stopping = true;
    if (timer) clearInterval(timer);
    if (child?.exitCode === null) child.kill("SIGTERM");
  };
}