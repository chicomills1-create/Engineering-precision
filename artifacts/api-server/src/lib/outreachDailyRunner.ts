const OUTREACH_RESEARCH_TIMEZONE = "America/Phoenix";
const OUTREACH_RESEARCH_LOCAL_HOUR = 8;
const PHOENIX_DISPATCH_MINUTE = 10;
const PHOENIX_OFFSET = "-07:00";

const phoenixTimeFormatter = new Intl.DateTimeFormat("en-CA", {
  timeZone: OUTREACH_RESEARCH_TIMEZONE,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});

type PhoenixDateTime = {
  date: string;
  hour: number;
  minute: number;
};

function getPhoenixDateTime(now: Date): PhoenixDateTime {
  const parts = Object.fromEntries(
    phoenixTimeFormatter.formatToParts(now)
      .filter((part) => part.type !== "literal")
      .map((part) => [part.type, part.value]),
  );
  return {
    date: `${parts.year}-${parts.month}-${parts.day}`,
    hour: Number(parts.hour),
    minute: Number(parts.minute),
  };
}

/**
 * Scheduled Deployments start at 08:00 Phoenix. Only that invocation waits
 * for messages staged by research for 08:10; a later/manual invocation is a
 * catch-up run and must never be held open.
 */
export function getPhoenixStagedMessageWaitMs(invokedAt: Date, now: Date): number {
  const invoked = getPhoenixDateTime(invokedAt);
  if (
    invoked.hour !== OUTREACH_RESEARCH_LOCAL_HOUR
    || invoked.minute !== 0
  ) return 0;

  const dispatchAt = new Date(
    `${invoked.date}T${String(OUTREACH_RESEARCH_LOCAL_HOUR).padStart(2, "0")}:${String(PHOENIX_DISPATCH_MINUTE).padStart(2, "0")}:00${PHOENIX_OFFSET}`,
  );
  return Math.max(0, dispatchAt.getTime() - now.getTime());
}

export type DailyOutreachRunnerOperations = {
  processHotMarketResearch: () => Promise<unknown>;
  processScheduledResearch: () => Promise<number>;
  processDueMessages: () => Promise<number>;
  processProviderReconciliation: () => Promise<void>;
  now: () => Date;
  wait: (milliseconds: number) => Promise<void>;
};

export type DailyOutreachRunnerResult = {
  initialSent: number;
  stagedSent: number;
  waitMs: number;
};

/**
 * Performs one bounded outreach pass. Each operation delegates to the
 * production worker's database-claimed implementations, so concurrent
 * autoscale workers cannot double-send a message.
 */
export async function runDailyOutreachOnce(
  operations: DailyOutreachRunnerOperations,
  invokedAt = operations.now(),
): Promise<DailyOutreachRunnerResult> {
  await operations.processHotMarketResearch();
  await operations.processScheduledResearch();

  const initialSent = await operations.processDueMessages();
  const reconciliation = operations.processProviderReconciliation();
  const waitMs = getPhoenixStagedMessageWaitMs(invokedAt, operations.now());
  if (waitMs === 0) {
    await reconciliation;
    return { initialSent, stagedSent: 0, waitMs };
  }

  await operations.wait(waitMs);
  const stagedSent = await operations.processDueMessages();
  await reconciliation;
  return { initialSent, stagedSent, waitMs };
}