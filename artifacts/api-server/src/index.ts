import app from "./app";
import { logger } from "./lib/logger";
import { startOutreachWorker } from "./lib/outreachWorker";
import { startClientJobUploadCleanup } from "./lib/clientJobUploadCleanup";
import { seedVerifiedOutreachBatch } from "./lib/verifiedOutreachBatch";
import { ensureOutreachFollowUps, prepareNextPhoenixOutreach } from "./lib/outreachPreparation";
import { seedHotMarketOutreachBatch } from "./lib/hotMarketOutreachBatch";
import { startDailyOutreachProcessScheduler } from "./lib/outreachDailyProcessScheduler";
import { startOutreachStartupJobs } from "./lib/outreachStartup";
import {
  ensureAuthoritativeOutreachConfig,
  loadOutreachSystemConfig,
  setOutreachConfigError,
} from "./lib/outreachSystemConfig";
import { startCityEvidenceScheduler } from "./lib/cityEvidenceScheduler";
import { recoverCurrentPhoenixOutreach } from "./lib/outreachPhoenixRecovery";

const rawPort = process.env["PORT"];

if (!rawPort) {
  throw new Error(
    "PORT environment variable is required but was not provided.",
  );
}

const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

let stopDailyScheduler: () => Promise<void> = async () => {};
let stopCityEvidenceScheduler: () => Promise<void> = async () => {};
const server = app.listen(port, async (err) => {
  if (err) {
    logger.error({ err }, "Error listening on port");
    process.exit(1);
  }

  logger.info({ port }, "Server listening");
  stopCityEvidenceScheduler = startCityEvidenceScheduler();
  let outreachConfigured = false;
  try {
    const configBootstrap = await ensureAuthoritativeOutreachConfig();
    logger.info({ state: configBootstrap }, "Authoritative outreach configuration bootstrap checked");
    await loadOutreachSystemConfig();
    outreachConfigured = true;
    logger.info("Authoritative outreach configuration loaded");
  } catch (configError) {
    setOutreachConfigError(configError);
    logger.error({ err: configError }, "Outreach is fail-closed: authoritative configuration unavailable");
  }
  if (!outreachConfigured) return;
  const recovery = await recoverCurrentPhoenixOutreach({
    enabled: process.env.NODE_ENV === "production",
  });
  logger.info(
    {
      state: recovery.state,
      targetDate: recovery.targetDate,
      namedScheduled: recovery.regular?.directPrepared,
      namedShortfall: recovery.regular?.directShortfall,
      publicScheduled: recovery.regular?.publicPrepared,
      publicShortfall: recovery.regular?.publicShortfall,
      hotMarketScheduled: recovery.hotMarket?.totalScheduled,
      hotMarketShortfall: recovery.hotMarket?.shortfall,
      hotLeadScheduled: recovery.hotLead?.totalScheduled,
      hotLeadShortfall: recovery.hotLead?.shortfall,
      error: recovery.error,
    },
    "Staging Phoenix outreach recovery checked before worker startup",
  );
  startClientJobUploadCleanup();
  const startup = await startOutreachStartupJobs({
    ensureFollowUps: () => ensureOutreachFollowUps(),
    armSchedulers: () => {
      startOutreachWorker();
      stopDailyScheduler = startDailyOutreachProcessScheduler();
    },
    seedVerified: () => seedVerifiedOutreachBatch(),
    prepareVerified: async () => {
      const preparation = await prepareNextPhoenixOutreach();
      return { prepared: preparation.prepared, shortfall: preparation.shortfall };
    },
    seedHotMarket: () => seedHotMarketOutreachBatch(),
    logger,
  });
  void startup.background;
});

let shuttingDown = false;
async function shutdown(signal: NodeJS.Signals): Promise<void> {
  if (shuttingDown) return;
  shuttingDown = true;
  logger.info({ signal }, "Shutting down API server");
  const forceExit = setTimeout(() => process.exit(1), 5_000);
  forceExit.unref();
  await Promise.all([
    stopDailyScheduler(),
    stopCityEvidenceScheduler(),
    new Promise<void>((resolve) => server.close(() => resolve())),
  ]);
  clearTimeout(forceExit);
  process.exit(0);
}

process.once("SIGTERM", () => void shutdown("SIGTERM"));
process.once("SIGINT", () => void shutdown("SIGINT"));
