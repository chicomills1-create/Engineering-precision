type StartupLogger = {
  info: (details: unknown, message: string) => void;
  error: (details: unknown, message: string) => void;
};

type StartupDependencies = {
  ensureFollowUps: () => Promise<{ created: number; scheduled: number }>;
  armSchedulers: () => void;
  seedVerified: () => Promise<{ state: string }>;
  prepareVerified: () => Promise<{ prepared: number; shortfall: number }>;
  seedHotMarket: () => Promise<unknown>;
  logger: StartupLogger;
};

async function runLoggedStartupJob<T>(
  job: () => Promise<T>,
  logger: StartupLogger,
  successMessage: string,
  failureMessage: string,
): Promise<T | undefined> {
  try {
    const result = await job();
    logger.info(result, successMessage);
    return result;
  } catch (error) {
    logger.error({ err: error }, failureMessage);
    return undefined;
  }
}

/**
 * Follow-up reconciliation is the only awaited startup data job. Scheduler
 * arming happens after it settles, while unrelated seed jobs continue behind
 * independent error boundaries.
 */
export async function startOutreachStartupJobs(
  dependencies: StartupDependencies,
): Promise<{ background: Promise<void> }> {
  await runLoggedStartupJob(
    dependencies.ensureFollowUps,
    dependencies.logger,
    "Outreach follow-up sequences reconciled",
    "Outreach follow-up sequence reconciliation failed",
  );

  dependencies.armSchedulers();

  const verified = runLoggedStartupJob(
    dependencies.seedVerified,
    dependencies.logger,
    "Verified outreach batch reconciled",
    "Verified outreach batch preparation failed",
  ).then(async (result) => {
    if (result?.state !== "ready") return;
    await runLoggedStartupJob(
      dependencies.prepareVerified,
      dependencies.logger,
      "Verified outreach candidates routed through daily preparation",
      "Verified outreach candidate preparation failed",
    );
  });
  const hotMarket = runLoggedStartupJob(
    dependencies.seedHotMarket,
    dependencies.logger,
    "One-time Arizona hot-market outreach batch reconciled",
    "Arizona hot-market outreach batch reconciliation failed",
  );

  return {
    background: Promise.all([verified, hotMarket]).then(() => undefined),
  };
}