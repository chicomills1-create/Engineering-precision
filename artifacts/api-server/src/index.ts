import app from "./app";
import { logger } from "./lib/logger";
import { startOutreachWorker } from "./lib/outreachWorker";
import { startClientJobUploadCleanup } from "./lib/clientJobUploadCleanup";
import { seedVerifiedOutreachBatch } from "./lib/verifiedOutreachBatch";
import { ensureOutreachFollowUps, prepareNextPhoenixOutreach } from "./lib/outreachPreparation";
import { seedHotMarketOutreachBatch } from "./lib/hotMarketOutreachBatch";
import { startDailyOutreachProcessScheduler } from "./lib/outreachDailyProcessScheduler";
import { loadOutreachSystemConfig, setOutreachConfigError } from "./lib/outreachSystemConfig";
import { startCityEvidenceScheduler } from "./lib/cityEvidenceScheduler";

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
    await loadOutreachSystemConfig();
    outreachConfigured = true;
    logger.info("Authoritative outreach configuration loaded");
  } catch (configError) {
    setOutreachConfigError(configError);
    logger.error({ err: configError }, "Outreach is fail-closed: authoritative configuration unavailable");
  }
  if (!outreachConfigured) return;
  startOutreachWorker();
  stopDailyScheduler = startDailyOutreachProcessScheduler();
  startClientJobUploadCleanup();
  void seedVerifiedOutreachBatch()
    .then(async (result) => {
      const hotMarket = await seedHotMarketOutreachBatch();
      logger.info(hotMarket, "One-time Arizona hot-market outreach batch reconciled");
      if (result.state === "ready") {
        const preparation = await prepareNextPhoenixOutreach();
        logger.info(
          { prepared: preparation.prepared, shortfall: preparation.shortfall },
          "Verified outreach candidates routed through daily preparation",
        );
      }
      const followUps = await ensureOutreachFollowUps();
      logger.info(followUps, "Outreach follow-up sequences reconciled");
    })
    .catch((seedError: unknown) => {
      logger.error({ err: seedError }, "Verified outreach batch preparation failed");
    });
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
