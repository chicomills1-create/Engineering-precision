import app from "./app";
import { logger } from "./lib/logger";
import { startOutreachWorker } from "./lib/outreachWorker";
import { startClientJobUploadCleanup } from "./lib/clientJobUploadCleanup";
import { seedVerifiedOutreachBatch } from "./lib/verifiedOutreachBatch";

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
    .then((result) => {
      if (result.state === "ready") {
        logger.info({ queued: result.queued }, "Verified outreach batch prepared");
      }
      startOutreachWorker();
      startClientJobUploadCleanup();
    })
    .catch((seedError: unknown) => {
      logger.error({ err: seedError }, "Verified outreach batch preparation failed");
    });
});
