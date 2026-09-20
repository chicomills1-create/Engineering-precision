import { NIGHTLY_TOTAL_INITIAL_TARGET } from "./outreachSystemConfig";
import { getNextPhoenixPreparationTarget } from "./outreachPreparation";
const OUTREACH_RESEARCH_TIMEZONE = "America/Phoenix";
const OUTREACH_RESEARCH_LOCAL_HOUR = 20;
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

export function isPrimaryPhoenixInvocation(now: Date): boolean {
  const local = getPhoenixDateTime(now);
  return local.hour === OUTREACH_RESEARCH_LOCAL_HOUR && local.minute === 0;
}

/**
 * Scheduled Deployments start at 20:00 Phoenix. Only that invocation waits
 * for messages staged by research for 20:10; a later/manual invocation is a
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
  verifyProspects?: () => Promise<unknown>;
  onResearchError?: (
    stage: "hot-market-research" | "scheduled-research" | "verification",
    error: unknown,
  ) => void;
  prepareRegularOutreach: () => Promise<DailyOutreachPreparationResult>;
  prepareHotMarketOutreach: () => Promise<DailyHotMarketPreparationResult>;
  prepareHotLeadOutreach?: () => Promise<DailyHotLeadPreparationResult>;
  countInitialMessagesInWindow?: (scheduledAt: Date) => Promise<number>;
  topUpVerifiedPreparation?: (scheduledAt: Date, needed: number) => Promise<{
    prepared: number;
    shortfall: number;
  }>;
  processDueMessages: () => Promise<DailyOutreachDispatchResult>;
  processProviderReconciliation: () => Promise<DailyOutreachReconciliationResult>;
  now: () => Date;
  wait: (milliseconds: number) => Promise<void>;
};

export type DailyOutreachPreparationResult = {
  state: "skipped" | "completed" | "failed";
  prepared: number;
  directPrepared: number;
  publicPrepared: number;
  directShortfall: number;
  publicShortfall: number;
  shortfall: number;
};

export type DailyHotMarketPreparationResult = {
  state: "skipped" | "completed" | "failed";
  prepared: number;
  totalScheduled: number;
  shortfall: number;
};

export type DailyHotLeadPreparationResult = {
  state: "skipped" | "completed" | "failed";
  prepared: number;
  totalScheduled: number;
  shortfall: number;
};

export type DailyOutreachDispatchResult = {
  claimed: number;
  providerAccepted: number;
  stopped: number;
  unresolved: number;
};

export type DailyOutreachReconciliationResult = {
  accepted: number;
  failed: number;
  ambiguous: number;
};

export type DailyOutreachRunnerResult = {
  claimed: number;
  providerAccepted: number;
  delivered: number;
  bounced: number;
  stopped: number;
  unresolved: number;
  regularPrepared: number;
  directPrepared: number;
  publicPrepared: number;
  directShortfall: number;
  publicShortfall: number;
  regularShortfall: number;
  hotMarketPrepared: number;
  hotMarketScheduled: number;
  hotMarketShortfall: number;
  waitMs: number;
  catchUpTarget?: number;
  catchUpEnrolled?: number;
  catchUpRemaining?: number;
  namedTarget?: number;
  publicTarget?: number;
  hotMarketTarget?: number;
  hotLeadTarget?: number;
  hotLeadPrepared?: number;
  hotLeadShortfall?: number;
  topUpPrepared?: number;
  topUpShortfall?: number;
  /** Stages of the acquisition pass (research/verification) that failed instead of silently continuing. */
  acquisitionErrors: Array<{ stage: string; message: string }>;
  /** Verification pass rollup when the injected verifyProspects reports it. */
  verificationPromoted?: number;
  verificationFinderCalls?: number;
  verificationCreditBlocked?: boolean;
};

export function calculateVerifiedTopUpNeeded(windowCount: number): number {
  return Math.max(0, NIGHTLY_TOTAL_INITIAL_TARGET - Math.max(0, windowCount));
}

export type DailyOutreachLease = {
  tryAcquire: () => Promise<boolean>;
  release: () => Promise<void>;
};

export type ExclusiveDailyOutreachResult<T> =
  | { state: "busy" }
  | { state: "completed"; result: T };

export async function withExclusiveDailyOutreachRun<T>(
  lease: DailyOutreachLease,
  task: () => Promise<T>,
): Promise<ExclusiveDailyOutreachResult<T>> {
  if (!await lease.tryAcquire()) return { state: "busy" };
  try {
    return { state: "completed", result: await task() };
  } finally {
    await lease.release();
  }
}

/**
 * Performs one bounded outreach pass. Each operation delegates to the
 * production worker's database-claimed implementations, so concurrent
 * autoscale workers cannot double-send a message.
 */
export async function runDailyOutreachOnce(
  operations: DailyOutreachRunnerOperations,
  invokedAt = operations.now(),
): Promise<DailyOutreachRunnerResult> {
  const researchOperations = [
    ["hot-market-research", operations.processHotMarketResearch],
    ["scheduled-research", operations.processScheduledResearch],
    ["verification", operations.verifyProspects],
  ] as const;
  const acquisitionErrors: Array<{ stage: string; message: string }> = [];
  const readSummary = (value: unknown): typeof verificationSummary => {
    if (!value || typeof value !== "object") return {};
    const summary = value as { promoted?: unknown; finderCalls?: unknown; creditBlocked?: unknown };
    return {
      promoted: typeof summary.promoted === "number" ? summary.promoted : undefined,
      finderCalls: typeof summary.finderCalls === "number" ? summary.finderCalls : undefined,
      creditBlocked: typeof summary.creditBlocked === "boolean" ? summary.creditBlocked : undefined,
    };
  };
  let verificationSummary: ReturnType<typeof readSummary> = {};
  for (const [stage, operation] of researchOperations) {
    if (!operation) continue;
    try {
      const outcome = await operation();
      if (stage === "verification") verificationSummary = readSummary(outcome);
    } catch (error) {
      if (stage === "verification") {
        // A credit-blocked verification still reports what it accomplished
        // before stopping (the wire attaches the summary to the error).
        verificationSummary = readSummary((error as { verificationSummary?: unknown } | null)?.verificationSummary);
      }
      // Acquisition failures are recorded on the result instead of being
      // silently swallowed: a failed research/verification stage must show up
      // in the daily report, not just in the logs.
      acquisitionErrors.push({
        stage,
        message: error instanceof Error ? error.message : String(error),
      });
      operations.onResearchError?.(stage, error);
    }
  }
  const regularPreparation = await operations.prepareRegularOutreach();
  // Hot-market contacts are selected by regular preparation as part of the
  // unified verified pool. The former dedicated lane must not stage extras.
  const hotMarketPreparation = {
    state: "skipped" as const,
    prepared: 0,
    totalScheduled: 0,
    shortfall: 0,
  };
  const hotLeadPreparation = operations.prepareHotLeadOutreach
    ? await operations.prepareHotLeadOutreach()
    : { state: "skipped" as const, prepared: 0, totalScheduled: 0, shortfall: 100 };
  const scheduledAt = getNextPhoenixPreparationTarget(invokedAt).scheduledAt;
  const windowCount = operations.countInitialMessagesInWindow
    ? await operations.countInitialMessagesInWindow(scheduledAt)
    : regularPreparation.prepared + hotMarketPreparation.totalScheduled
      + hotLeadPreparation.totalScheduled;
  const topUpNeeded = calculateVerifiedTopUpNeeded(windowCount);
  const topUp = operations.topUpVerifiedPreparation && topUpNeeded > 0
    ? await operations.topUpVerifiedPreparation(scheduledAt, topUpNeeded)
    : operations.topUpVerifiedPreparation
      ? { prepared: 0, shortfall: 0 }
      : undefined;

  const initial = await operations.processDueMessages();
  const reconciliation = operations.processProviderReconciliation();
  const waitMs = getPhoenixStagedMessageWaitMs(invokedAt, operations.now());
  if (waitMs === 0) {
    const reconciled = await reconciliation;
    return {
      claimed: initial.claimed,
      providerAccepted: initial.providerAccepted + reconciled.accepted,
      delivered: 0,
      bounced: reconciled.failed,
      stopped: initial.stopped,
      unresolved: initial.unresolved + reconciled.ambiguous,
      regularPrepared: regularPreparation.prepared,
      directPrepared: regularPreparation.directPrepared,
      publicPrepared: regularPreparation.publicPrepared,
      directShortfall: regularPreparation.directShortfall,
      publicShortfall: regularPreparation.publicShortfall,
      regularShortfall: regularPreparation.shortfall,
      hotMarketPrepared: hotMarketPreparation.prepared,
      hotMarketScheduled: hotMarketPreparation.totalScheduled,
      hotMarketShortfall: hotMarketPreparation.shortfall,
       hotLeadTarget: hotLeadPreparation.totalScheduled + hotLeadPreparation.shortfall,
       hotLeadPrepared: hotLeadPreparation.totalScheduled,
       hotLeadShortfall: hotLeadPreparation.shortfall,
       ...(topUp ? { topUpPrepared: topUp.prepared, topUpShortfall: topUp.shortfall } : {}),
       acquisitionErrors,
       verificationPromoted: verificationSummary.promoted,
       verificationFinderCalls: verificationSummary.finderCalls,
       verificationCreditBlocked: verificationSummary.creditBlocked,
      waitMs,
    };
  }

  await operations.wait(waitMs);
  const staged = await operations.processDueMessages();
  const reconciled = await reconciliation;
  return {
    claimed: initial.claimed + staged.claimed,
    providerAccepted: initial.providerAccepted + staged.providerAccepted + reconciled.accepted,
    delivered: 0,
    bounced: reconciled.failed,
    stopped: initial.stopped + staged.stopped,
    unresolved: initial.unresolved + staged.unresolved + reconciled.ambiguous,
    regularPrepared: regularPreparation.prepared,
    directPrepared: regularPreparation.directPrepared,
    publicPrepared: regularPreparation.publicPrepared,
    directShortfall: regularPreparation.directShortfall,
    publicShortfall: regularPreparation.publicShortfall,
    regularShortfall: regularPreparation.shortfall,
    hotMarketPrepared: hotMarketPreparation.prepared,
    hotMarketScheduled: hotMarketPreparation.totalScheduled,
    hotMarketShortfall: hotMarketPreparation.shortfall,
    hotLeadTarget: hotLeadPreparation.totalScheduled + hotLeadPreparation.shortfall,
    hotLeadPrepared: hotLeadPreparation.totalScheduled,
    hotLeadShortfall: hotLeadPreparation.shortfall,
    ...(topUp ? { topUpPrepared: topUp.prepared, topUpShortfall: topUp.shortfall } : {}),
    acquisitionErrors,
    verificationPromoted: verificationSummary.promoted,
    verificationFinderCalls: verificationSummary.finderCalls,
    verificationCreditBlocked: verificationSummary.creditBlocked,
    waitMs,
  };
}