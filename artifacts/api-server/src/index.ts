import app from "./app";
import { logger } from "./lib/logger";
import { startOutreachWorker } from "./lib/outreachWorker";
import { startClientJobUploadCleanup } from "./lib/clientJobUploadCleanup";
import { seedVerifiedOutreachBatch } from "./lib/verifiedOutreachBatch";
import { prepareNextPhoenixOutreach } from "./lib/outreachPreparation";

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

app.listen(port, (err) => {
  if (err) {
    logger.error({ err }, "Error listening on port");
    process.exit(1);
  }

  logger.info({ port }, "Server listening");
  void seedVerifiedOutreachBatch()
    .then(async (result) => {
      if (result.state === "ready") {
        const preparation = await prepareNextPhoenixOutreach();
        logger.info(
          { prepared: preparation.prepared, shortfall: preparation.shortfall },
          "Verified outreach candidates routed through daily preparation",
        );
      }
      startOutreachWorker();
      startClientJobUploadCleanup();
    })
    .catch((seedError: unknown) => {
      logger.error({ err: seedError }, "Verified outreach batch preparation failed");
    });
});
