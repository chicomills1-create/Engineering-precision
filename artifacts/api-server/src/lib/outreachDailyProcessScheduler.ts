import { spawn, type ChildProcess } from "node:child_process";
import { logger } from "./logger";

const PHOENIX_OFFSET_MS = 7 * 60 * 60_000;
const RECOVERY_GRACE_MINUTES = 30;

export type DailyRunnerDeadline = {
  slot: string;
  deadline: Date;
};

export function getNextPhoenixDailyRunnerDeadline(
  now: Date,
  lastStartedSlot?: string,
): DailyRunnerDeadline {
  const phoenixNow = new Date(now.getTime() - PHOENIX_OFFSET_MS);
  const year = phoenixNow.getUTCFullYear();
  const month = phoenixNow.getUTCMonth();
  const day = phoenixNow.getUTCDate();
  const minutes = phoenixNow.getUTCHours() * 60 + phoenixNow.getUTCMinutes();
  const primary = 20 * 60;
  const recovery = primary + 30;
  const recoveryGraceEnd = recovery + RECOVERY_GRACE_MINUTES;

  let targetDay = day;
  let targetMinutes: number;
  if (minutes < primary) {
    targetMinutes = primary;
  } else if (minutes < recovery) {
    targetMinutes = primary;
  } else if (minutes < recoveryGraceEnd) {
    targetMinutes = recovery;
  } else {
    targetDay += 1;
    targetMinutes = primary;
  }

  const targetPhoenix = Date.UTC(
    year,
    month,
    targetDay,
    Math.floor(targetMinutes / 60),
    targetMinutes % 60,
  );
  const deadline = new Date(targetPhoenix + PHOENIX_OFFSET_MS);
  const labelDate = new Date(targetPhoenix);
  const date = labelDate.toISOString().slice(0, 10);
  const time = targetMinutes === primary ? "20:00" : "20:30";
  const candidate = {
    slot: `${date}T${time}`,
    deadline: deadline.getTime() <= now.getTime() ? now : deadline,
  };
  if (candidate.slot !== lastStartedSlot) return candidate;

  if (candidate.slot.endsWith("T20:00")) {
    return {
      slot: `${date}T20:30`,
      deadline: new Date(Date.UTC(year, month, targetDay, 20, 30) + PHOENIX_OFFSET_MS),
    };
  }
  const nextDayPhoenix = Date.UTC(year, month, targetDay + 1, 20, 0);
  const nextDate = new Date(nextDayPhoenix).toISOString().slice(0, 10);
  return {
    slot: `${nextDate}T20:00`,
    deadline: new Date(nextDayPhoenix + PHOENIX_OFFSET_MS),
  };
}

function spawnDailyOutreachProcess(): ChildProcess {
  return spawn(
    process.execPath,
    ["--enable-source-maps", "artifacts/api-server/dist/outreachDailyRunner.mjs"],
    {
      cwd: process.cwd(),
      env: process.env,
      stdio: "inherit",
    },
  );
}

export function startDailyOutreachProcessScheduler(): () => Promise<void> {
  if (process.env.NODE_ENV !== "production") return async () => {};
  let timer: NodeJS.Timeout | undefined;
  let child: ChildProcess | undefined;
  let stopping = false;
  let lastStartedSlot: string | undefined;

  const scheduleNext = () => {
    if (stopping || child) return;
    const next = getNextPhoenixDailyRunnerDeadline(new Date(), lastStartedSlot);
    const delay = Math.max(0, next.deadline.getTime() - Date.now());
    timer = setTimeout(() => {
      timer = undefined;
      if (stopping) return;
      logger.info({ slot: next.slot }, "Starting durable daily outreach process");
      child = spawnDailyOutreachProcess();
      let failedToSpawn = false;
      child.once("spawn", () => {
        lastStartedSlot = next.slot;
      });
      child.once("error", (error) => {
        failedToSpawn = true;
        logger.error({ err: error, slot: next.slot }, "Durable daily outreach process failed to start");
      });
      child.once("close", (code, signal) => {
        if (code === 0) {
          logger.info({ slot: next.slot }, "Durable daily outreach process completed");
        } else {
          logger.error(
            { code, signal, slot: next.slot },
            "Durable daily outreach process failed",
          );
        }
        child = undefined;
        if (failedToSpawn && !stopping) {
          timer = setTimeout(scheduleNext, 60_000);
          timer.unref();
        } else {
          scheduleNext();
        }
      });
    }, delay);
    timer.unref();
  };

  const stop = async () => {
    stopping = true;
    if (timer) clearTimeout(timer);
    if (child && child.exitCode === null) {
      const activeChild = child;
      activeChild.kill("SIGTERM");
      await Promise.race([
        new Promise<void>((resolve) => activeChild.once("close", () => resolve())),
        new Promise<void>((resolve) => setTimeout(resolve, 4_000)),
      ]);
    }
  };

  scheduleNext();
  logger.info("Daily outreach process scheduler enabled for 20:00 and 20:30 Phoenix");
  return stop;
}