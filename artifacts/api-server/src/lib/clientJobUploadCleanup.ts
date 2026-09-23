import { and, asc, eq, isNull, lt } from "drizzle-orm";
import {
  clientJobUploadsTable,
  db,
  type ClientJobUpload,
} from "@workspace/db";
import { logger } from "./logger";
import { deleteUploadFile } from "./localUploadStorage";

/**
 * Uploads are retained for seven days after they are created. This gives a
 * visitor time to finish a project submission while putting a firm bound on
 * storage held by abandoned forms.
 */
export const CLIENT_JOB_UPLOAD_RETENTION_DAYS = 7;
export const CLIENT_JOB_UPLOAD_CLEANUP_INTERVAL_MS = 24 * 60 * 60 * 1000;


export function getClientJobUploadCleanupCutoff(now: Date = new Date()): Date {
  return new Date(
    now.getTime() - CLIENT_JOB_UPLOAD_RETENTION_DAYS * 24 * 60 * 60 * 1000,
  );
}

export function isAbandonedClientJobUpload(
  upload: Pick<ClientJobUpload, "createdAt" | "claimedAt" | "claimedJobId">,
  cutoff: Date,
): boolean {
  return (
    upload.createdAt < cutoff &&
    upload.claimedAt === null &&
    upload.claimedJobId === null
  );
}

/**
 * Remove all currently eligible old, unclaimed client-job uploads.
 *
 * The row lock is held while the object is deleted. A concurrent submission
 * therefore either claims the row first (and cleanup skips it), or waits until
 * cleanup commits. If storage deletion fails, the transaction rolls back and
 * the metadata remains available for a later retry.
 */
export async function cleanupAbandonedClientJobUploads(
  now: Date = new Date(),
): Promise<number> {
  const cutoff = getClientJobUploadCleanupCutoff(now);
  const candidates = await db
    .select({
      id: clientJobUploadsTable.id,
    })
    .from(clientJobUploadsTable)
    .where(
      and(
        isNull(clientJobUploadsTable.claimedAt),
        isNull(clientJobUploadsTable.claimedJobId),
        lt(clientJobUploadsTable.createdAt, cutoff),
      ),
    )
    .orderBy(asc(clientJobUploadsTable.createdAt));

  let deletedCount = 0;
  let failedCount = 0;

  for (const candidate of candidates) {
    try {
      const deleted = await db.transaction(async (tx) => {
        const [upload] = await tx
          .select({
            id: clientJobUploadsTable.id,
            objectPath: clientJobUploadsTable.objectPath,
          })
          .from(clientJobUploadsTable)
          .where(
            and(
              eq(clientJobUploadsTable.id, candidate.id),
              isNull(clientJobUploadsTable.claimedAt),
              isNull(clientJobUploadsTable.claimedJobId),
            ),
          )
          .for("update");

        if (!upload) {
          return false;
        }

        await deleteUploadFile(upload.objectPath);
        const [removed] = await tx
          .delete(clientJobUploadsTable)
          .where(
            and(
              eq(clientJobUploadsTable.id, upload.id),
              isNull(clientJobUploadsTable.claimedAt),
              isNull(clientJobUploadsTable.claimedJobId),
            ),
          )
          .returning({ id: clientJobUploadsTable.id });
        return Boolean(removed);
      });

      if (deleted) {
        deletedCount += 1;
      }
    } catch (error) {
      failedCount += 1;
      logger.error(
        { err: error, uploadId: candidate.id },
        "Abandoned client-job upload cleanup failed",
      );
    }
  }

  logger.info(
    {
      cutoff: cutoff.toISOString(),
      candidateCount: candidates.length,
      deletedCount,
      failedCount,
    },
    "Abandoned client-job upload cleanup completed",
  );
  return deletedCount;
}

export function startClientJobUploadCleanup(): void {
  let running = false;

  const run = async (): Promise<void> => {
    if (running) return;
    running = true;
    try {
      await cleanupAbandonedClientJobUploads();
    } catch (error) {
      logger.error({ err: error }, "Abandoned client-job upload cleanup unavailable");
    } finally {
      running = false;
    }
  };

  void run();
  const timer = setInterval(() => {
    void run();
  }, CLIENT_JOB_UPLOAD_CLEANUP_INTERVAL_MS);
  timer.unref();
  logger.info(
    { retentionDays: CLIENT_JOB_UPLOAD_RETENTION_DAYS },
    "Abandoned client-job upload cleanup enabled",
  );
}