import { Readable } from "stream";
import { createHash, randomBytes } from "crypto";
import { clerkClient, getAuth } from "@clerk/express";
import express, { Router, type IRouter, type Request, type Response } from "express";
import { and, desc, eq, inArray, isNull } from "drizzle-orm";
import {
  clientCompaniesTable,
  clientJobDocumentsTable,
  clientJobsTable,
  clientJobUploadsTable,
  clientMembershipsTable,
  db,
} from "@workspace/db";
import {
  CreateClientJobBody,
  CreateClientJobResponse,
  ListClientJobsForReviewResponse,
  ListClientJobsResponse,
  PreviewClientJobStatusNotificationBody,
  PreviewClientJobStatusNotificationResponse,
  SendClientJobStatusNotificationBody,
  SendClientJobStatusNotificationResponse,
  UpdateClientJobBody,
  UpdateClientJobParams,
  UpdateClientJobResponse,
  UploadClientJobDocumentResponse,
} from "@workspace/api-zod";
import { requireAuth } from "../middlewares/requireAuth";
import { ObjectNotFoundError, ObjectStorageService } from "../lib/objectStorage";
import { signDownloadPath } from "../lib/downloadToken";
import {
  buildClientJobNotificationPreview,
  isClientNotificationStatus,
  sendClientJobNotificationEmail,
  sendClientJobStatusNotificationEmail,
} from "../lib/clientJobNotifications";

const router: IRouter = Router();
const objectStorageService = new ObjectStorageService();
const MAX_UPLOAD_BYTES = 20 * 1024 * 1024;
const ALLOWED_EXTENSIONS = new Set([
  "pdf", "dwg", "dxf", "rvt", "doc", "docx", "xls", "xlsx", "ppt",
  "pptx", "zip", "jpg", "jpeg", "png", "tif", "tiff",
]);
const UPLOAD_RATE_LIMIT = 10;
const UPLOAD_RATE_WINDOW_MS = 60 * 60 * 1000;
const uploadRateBuckets = new Map<string, { count: number; resetAt: number }>();

class AttachmentClaimError extends Error {}

function hashClaimToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

function uploadRateLimited(ip: string): boolean {
  const now = Date.now();
  const bucket = uploadRateBuckets.get(ip);
  if (!bucket || bucket.resetAt <= now) {
    uploadRateBuckets.set(ip, {
      count: 1,
      resetAt: now + UPLOAD_RATE_WINDOW_MS,
    });
    return false;
  }
  bucket.count += 1;
  return bucket.count > UPLOAD_RATE_LIMIT;
}

type JobRow = typeof clientJobsTable.$inferSelect;
type DocumentRow = typeof clientJobDocumentsTable.$inferSelect;

function authUserId(req: Request): string | null {
  const auth = getAuth(req);
  return String(auth?.sessionClaims?.userId || auth?.userId || "") || null;
}

async function getClerkIdentity(userId: string) {
  const user = await clerkClient.users.getUser(userId);
  const email =
    user.primaryEmailAddress?.emailAddress ??
    user.emailAddresses[0]?.emailAddress;
  if (!email) {
    throw new Error("Your account does not have a verified email address.");
  }
  const name =
    user.fullName?.trim() ||
    [user.firstName, user.lastName].filter(Boolean).join(" ").trim() ||
    email;
  return { userId, name, email: email.trim().toLowerCase() };
}

function clientDownloadUrl(jobId: number, documentId: number): string {
  return `/api/client/jobs/${jobId}/documents/${documentId}/download`;
}

function adminDownloadUrl(objectPath: string): string {
  const wildcard = objectPath.replace(/^\/objects\//, "");
  return `/api/storage/objects/${encodeURI(wildcard)}?token=${encodeURIComponent(signDownloadPath(objectPath))}`;
}

function jobJson(
  job: JobRow,
  documents: DocumentRow[],
  audience: "client" | "admin",
) {
  return {
    ...job,
    internalNotes: audience === "admin" ? job.internalNotes : null,
    statusNotificationStatus:
      audience === "admin" ? job.statusNotificationStatus : null,
    statusNotificationError:
      audience === "admin" ? job.statusNotificationError : null,
    statusNotificationSentAt:
      audience === "admin" && job.statusNotificationSentAt
        ? job.statusNotificationSentAt.toISOString()
        : null,
    documents: documents
      .filter((document) => document.jobId === job.id)
      .map((document) => ({
        id: document.id,
        name: document.name,
        objectPath: document.objectPath,
        downloadUrl:
          audience === "admin"
            ? adminDownloadUrl(document.objectPath)
            : clientDownloadUrl(job.id, document.id),
        createdAt: document.createdAt.toISOString(),
      })),
    createdAt: job.createdAt.toISOString(),
    updatedAt: job.updatedAt.toISOString(),
  };
}

async function documentsForJobs(jobIds: number[]): Promise<DocumentRow[]> {
  if (jobIds.length === 0) return [];
  return db
    .select()
    .from(clientJobDocumentsTable)
    .where(inArray(clientJobDocumentsTable.jobId, jobIds));
}

router.get("/client/jobs", async (req, res): Promise<void> => {
  const userId = authUserId(req);
  if (!userId) {
    res.status(401).json({ error: "Sign in to view your projects." });
    return;
  }

  const [membership] = await db
    .select()
    .from(clientMembershipsTable)
    .where(eq(clientMembershipsTable.clerkUserId, userId));
  if (!membership) {
    res.json(ListClientJobsResponse.parse([]));
    return;
  }

  const jobs = await db
    .select()
    .from(clientJobsTable)
    .where(eq(clientJobsTable.companyId, membership.companyId))
    .orderBy(desc(clientJobsTable.createdAt));
  const documents = await documentsForJobs(jobs.map((job) => job.id));
  res.json(
    ListClientJobsResponse.parse(
      jobs.map((job) => jobJson(job, documents, "client")),
    ),
  );
});

router.post(
  "/client/uploads",
  express.raw({ type: () => true, limit: MAX_UPLOAD_BYTES }),
  async (req: Request, res: Response): Promise<void> => {
    if (uploadRateLimited(req.ip ?? "unknown")) {
      res.status(429).json({ error: "Too many upload requests. Try again later." });
      return;
    }
    let name = "";
    try {
      name = decodeURIComponent(String(req.headers["x-file-name"] ?? ""));
    } catch {
      // Validation below returns a safe error.
    }
    const extension = name.includes(".")
      ? name.split(".").pop()!.toLowerCase()
      : "";
    if (!name || !ALLOWED_EXTENSIONS.has(extension)) {
      res.status(400).json({
        error: "File type not accepted. Upload PDFs, images, CAD files, or office documents.",
      });
      return;
    }
    const body = req.body as unknown;
    if (!Buffer.isBuffer(body) || body.length === 0) {
      res.status(400).json({ error: "No file content received." });
      return;
    }
    if (body.length > MAX_UPLOAD_BYTES) {
      res.status(413).json({ error: "File exceeds the 20 MB upload limit." });
      return;
    }

    try {
      const { uploadURL, objectPath } =
        await objectStorageService.getObjectEntityUploadURL();
      const putResponse = await fetch(uploadURL, {
        method: "PUT",
        headers: { "Content-Type": "application/octet-stream" },
        body,
        signal: AbortSignal.timeout(60_000),
      });
      if (!putResponse.ok) {
        res.status(502).json({ error: "Failed to store file." });
        return;
      }

      const uploadToken = randomBytes(32).toString("hex");
      await db.insert(clientJobUploadsTable).values({
        objectPath,
        originalName: name,
        claimTokenHash: hashClaimToken(uploadToken),
        uploaderClerkUserId: authUserId(req),
      });
      res.json(
        UploadClientJobDocumentResponse.parse({
          objectPath,
          name,
          uploadToken,
        }),
      );
    } catch (error) {
      req.log.error({ err: error }, "Client document upload failed");
      res.status(500).json({ error: "Failed to store file." });
    }
  },
);

router.post("/client/jobs", async (req, res): Promise<void> => {
  const parsed = CreateClientJobBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const data = parsed.data;

  try {
    const userId = authUserId(req);
    let companyId: number | null = null;
    let membershipId: number | null = null;
    let submitterName = data.submitterName.trim();
    let submitterEmail = data.submitterEmail.trim().toLowerCase();
    let companyName = data.companyName?.trim() || null;

    if (userId) {
      const identity = await getClerkIdentity(userId);
      submitterName = identity.name;
      submitterEmail = identity.email;

      const [existingMembership] = await db
        .select()
        .from(clientMembershipsTable)
        .where(eq(clientMembershipsTable.clerkUserId, userId));

      if (existingMembership) {
        membershipId = existingMembership.id;
        companyId = existingMembership.companyId;
        const [company] = await db
          .select()
          .from(clientCompaniesTable)
          .where(eq(clientCompaniesTable.id, companyId));
        companyName = company?.name ?? companyName;
        await db
          .update(clientMembershipsTable)
          .set({ name: submitterName, email: submitterEmail })
          .where(eq(clientMembershipsTable.id, membershipId));
      } else {
        if (!companyName) {
          res.status(400).json({ error: "Company name is required for a new client account." });
          return;
        }
        const membership = await db.transaction(async (tx) => {
          const [company] = await tx
            .insert(clientCompaniesTable)
            .values({ name: companyName! })
            .returning();
          const [createdMembership] = await tx
            .insert(clientMembershipsTable)
            .values({
              companyId: company!.id,
              clerkUserId: userId,
              name: submitterName,
              email: submitterEmail,
            })
            .returning();
          return { company: company!, membership: createdMembership! };
        });
        companyId = membership.company.id;
        membershipId = membership.membership.id;
      }
    }

    const created = await db.transaction(async (tx) => {
      const [job] = await tx
        .insert(clientJobsTable)
        .values({
          companyId,
          membershipId,
          submitterName,
          submitterEmail,
          submitterPhone: data.submitterPhone?.trim() || null,
          companyName,
          projectType: data.projectType.trim(),
          projectLocation: data.projectLocation.trim(),
          scope: data.scope.trim(),
          timeline: data.timeline?.trim() || null,
          budgetContext: data.budgetContext?.trim() || null,
          services: data.services.trim(),
          status: "submitted",
        })
        .returning();
      const documents =
        data.documents && data.documents.length > 0
          ? await (async () => {
              for (const document of data.documents!) {
                const [claimed] = await tx
                  .update(clientJobUploadsTable)
                  .set({ claimedAt: new Date(), claimedJobId: job!.id })
                  .where(
                    and(
                      eq(clientJobUploadsTable.objectPath, document.objectPath),
                      eq(
                        clientJobUploadsTable.claimTokenHash,
                        hashClaimToken(document.uploadToken),
                      ),
                      isNull(clientJobUploadsTable.claimedAt),
                      userId
                        ? eq(clientJobUploadsTable.uploaderClerkUserId, userId)
                        : isNull(clientJobUploadsTable.uploaderClerkUserId),
                    ),
                  )
                  .returning({ id: clientJobUploadsTable.id });
                if (!claimed) {
                  throw new AttachmentClaimError(
                    `Attachment "${document.name}" is invalid or has already been used.`,
                  );
                }
              }
              return tx
                .insert(clientJobDocumentsTable)
                .values(
                  data.documents!.map((document) => ({
                    jobId: job!.id,
                    name: document.name.trim(),
                    objectPath: document.objectPath,
                  })),
                )
                .returning();
            })()
          : [];
      return { job: job!, documents };
    });

    void sendClientJobNotificationEmail(created.job, created.documents)
      .then((result) => {
        if (!result.ok) req.log.warn({ error: result.error }, "Client job notification not sent");
      })
      .catch((error) => req.log.error({ err: error }, "Client job notification failed"));

    res
      .status(201)
      .json(
        CreateClientJobResponse.parse(
          jobJson(created.job, created.documents, userId ? "client" : "admin"),
        ),
      );
  } catch (error) {
    if (error instanceof AttachmentClaimError) {
      res.status(400).json({ error: error.message });
      return;
    }
    req.log.error({ err: error }, "Failed to create client job");
    res.status(500).json({ error: "Unable to submit the project right now." });
  }
});

router.get("/client/jobs/review", requireAuth, async (_req, res): Promise<void> => {
  const jobs = await db
    .select()
    .from(clientJobsTable)
    .orderBy(desc(clientJobsTable.createdAt));
  const documents = await documentsForJobs(jobs.map((job) => job.id));
  res.json(
    ListClientJobsForReviewResponse.parse(
      jobs.map((job) => jobJson(job, documents, "admin")),
    ),
  );
});

router.post(
  "/client/jobs/:id/notification-preview",
  requireAuth,
  async (req, res): Promise<void> => {
    const params = UpdateClientJobParams.safeParse(req.params);
    const body = PreviewClientJobStatusNotificationBody.safeParse(req.body);
    if (
      !params.success ||
      !body.success ||
      !isClientNotificationStatus(body.data.status)
    ) {
      res.status(400).json({ error: "Choose Needs information or Quoted." });
      return;
    }
    const status = body.data.status;

    const [job] = await db
      .select()
      .from(clientJobsTable)
      .where(eq(clientJobsTable.id, params.data.id));
    if (!job) {
      res.status(404).json({ error: "Project not found." });
      return;
    }

    res.json(
      PreviewClientJobStatusNotificationResponse.parse(
        buildClientJobNotificationPreview(job, status),
      ),
    );
  },
);

router.patch("/client/jobs/:id", requireAuth, async (req, res): Promise<void> => {
  const params = UpdateClientJobParams.safeParse(req.params);
  const body = UpdateClientJobBody.safeParse(req.body);
  if (!params.success || !body.success || Object.keys(body.data).length === 0) {
    res.status(400).json({ error: "A valid status or internal note is required." });
    return;
  }

  const [job] = await db
    .update(clientJobsTable)
    .set(body.data)
    .where(eq(clientJobsTable.id, params.data.id))
    .returning();
  if (!job) {
    res.status(404).json({ error: "Project not found." });
    return;
  }
  const documents = await documentsForJobs([job.id]);
  res.json(UpdateClientJobResponse.parse(jobJson(job, documents, "admin")));
});

router.post(
  "/client/jobs/:id/notification",
  requireAuth,
  async (req, res): Promise<void> => {
    const params = UpdateClientJobParams.safeParse(req.params);
    const body = SendClientJobStatusNotificationBody.safeParse(req.body);
    if (
      !params.success ||
      !body.success ||
      !isClientNotificationStatus(body.data.status)
    ) {
      res.status(400).json({ error: "Choose Needs information or Quoted." });
      return;
    }
    const status = body.data.status;

    const [jobToNotify] = await db
      .update(clientJobsTable)
      .set({
        status,
        statusNotificationStatus: null,
        statusNotificationError: null,
        statusNotificationSentAt: null,
      })
      .where(eq(clientJobsTable.id, params.data.id))
      .returning();
    if (!jobToNotify) {
      res.status(404).json({ error: "Project not found." });
      return;
    }

    let notificationStatus: "sent" | "failed" = "failed";
    let notificationError: string | null = null;
    let notificationSentAt: Date | null = null;
    try {
      const result = await sendClientJobStatusNotificationEmail(jobToNotify, status);
      if (result.ok) {
        notificationStatus = "sent";
        notificationSentAt = new Date();
      } else {
        notificationError = result.error;
      }
    } catch (error) {
      notificationError =
        error instanceof Error ? error.message : "Unable to send client status notification";
    }

    const [job] = await db
      .update(clientJobsTable)
      .set({
        statusNotificationStatus: notificationStatus,
        statusNotificationError: notificationError,
        statusNotificationSentAt: notificationSentAt,
      })
      .where(eq(clientJobsTable.id, jobToNotify.id))
      .returning();
    const updatedJob = job ?? {
      ...jobToNotify,
      statusNotificationStatus: notificationStatus,
      statusNotificationError: notificationError,
      statusNotificationSentAt: notificationSentAt,
    };
    if (notificationError) {
      req.log.warn(
        { jobId: updatedJob.id, error: notificationError },
        "Client status notification failed after status update",
      );
    }

    const documents = await documentsForJobs([updatedJob.id]);
    res.json(
      SendClientJobStatusNotificationResponse.parse(
        jobJson(updatedJob, documents, "admin"),
      ),
    );
  },
);

router.get(
  "/client/jobs/:jobId/documents/:documentId/download",
  async (req: Request, res: Response): Promise<void> => {
    const userId = authUserId(req);
    if (!userId) {
      res.status(401).json({ error: "Sign in to download this document." });
      return;
    }

    const jobId = Number(req.params.jobId);
    const documentId = Number(req.params.documentId);
    if (!Number.isInteger(jobId) || !Number.isInteger(documentId)) {
      res.status(400).json({ error: "Invalid document." });
      return;
    }

    const [membership] = await db
      .select()
      .from(clientMembershipsTable)
      .where(eq(clientMembershipsTable.clerkUserId, userId));
    if (!membership) {
      res.status(404).json({ error: "Document not found." });
      return;
    }

    const [result] = await db
      .select({
        document: clientJobDocumentsTable,
        job: clientJobsTable,
      })
      .from(clientJobDocumentsTable)
      .innerJoin(
        clientJobsTable,
        eq(clientJobDocumentsTable.jobId, clientJobsTable.id),
      )
      .where(
        and(
          eq(clientJobDocumentsTable.id, documentId),
          eq(clientJobDocumentsTable.jobId, jobId),
          eq(clientJobsTable.companyId, membership.companyId),
        ),
      );
    if (!result) {
      res.status(404).json({ error: "Document not found." });
      return;
    }

    try {
      const file = await objectStorageService.getObjectEntityFile(
        result.document.objectPath,
      );
      const response = await objectStorageService.downloadObject(file, 300);
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${result.document.name.replace(/["\r\n]/g, "_")}"`,
      );
      for (const [key, value] of response.headers.entries()) {
        res.setHeader(key, value);
      }
      if (!response.body) {
        res.status(500).json({ error: "Document unavailable." });
        return;
      }
      Readable.fromWeb(response.body as never).pipe(res);
    } catch (error) {
      if (error instanceof ObjectNotFoundError) {
        res.status(404).json({ error: "Document not found." });
        return;
      }
      req.log.error({ err: error }, "Failed to download client document");
      res.status(500).json({ error: "Unable to download document." });
    }
  },
);

export default router;