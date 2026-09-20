import { Router, type IRouter } from "express";
import { getAuth } from "@clerk/express";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { createHash } from "node:crypto";
import { requireAuth } from "../middlewares/requireAuth";
import express from "express";
import { db, outreachImportBatchesTable } from "@workspace/db";
import { IMPORT_SSE_HEADERS, sendImportEvent } from "../lib/importSse";
import {
  confirmPublicInventory,
  ATTACHED_PUBLIC_SOURCE_CSV,
  ATTACHED_PUBLIC_SOURCE_FILENAME,
  createOneTimeOverride,
  getLaneConfig,
  importRecoveredFindyMailInventory,
  importVerifiedInventory,
  previewPublicInventory,
} from "../lib/outreachInventory";
import { enqueueSeptemberClickerFollowUps } from "../lib/outreachAdminActions";
import { currentOutreachCampaignKey } from "../lib/outreachLaneConfig";
import { getOutreachRuntimeConfig } from "../lib/outreachSystemConfig";

const router: IRouter = Router();
router.post("/outreach/inventory/import", requireAuth, async (req, res) => {
  const actor = getAuth(req)?.userId;
  if (!actor) { res.status(401).json({ error: "Unauthorized" }); return; }
  try { res.status(201).json(await importVerifiedInventory(actor)); }
  catch (error) { req.log.error({ err: error }, "Guarded inventory import failed"); res.status(400).json({ error: error instanceof Error ? error.message : "Import failed" }); }
});
router.post(
  "/outreach/inventory/import-upload",
  requireAuth,
  express.text({ type: ["text/csv", "text/plain"], limit: "2mb" }),
  async (req, res) => {
    const actor = getAuth(req)?.userId;
    if (!actor) { res.status(401).json({ error: "Unauthorized" }); return; }
    if (typeof req.body !== "string") { res.status(400).json({ error: "A CSV file is required" }); return; }
    const csv = req.body;
    // Deterministic batch id (same derivation as importRecoveredFindyMailInventory)
    // so the client can poll import status if the event stream drops.
    const batchId = createHash("sha256").update(csv).digest("hex");
    res.writeHead(201, IMPORT_SSE_HEADERS);
    sendImportEvent(res, "start", { batchId });
    sendImportEvent(res, "preparing", { batchId });
    try {
      const result = await importRecoveredFindyMailInventory(
        {
          actor,
          sourceFilename: typeof req.headers["x-source-filename"] === "string"
            ? req.headers["x-source-filename"]
            : "findymail-recovered.csv",
          csv,
        },
        (processed, total) => {
          sendImportEvent(res, "progress", { batchId, processed, total });
        },
      );
      sendImportEvent(res, "done", result);
    } catch (error) {
      req.log.error({ err: error }, "Recovered FindyMail inventory import failed");
      sendImportEvent(res, "error", { error: error instanceof Error ? error.message : "Import failed" });
    } finally {
      if (!res.writableEnded) res.end();
    }
  },
);
router.get(
  "/outreach/inventory/import-status/:batchId",
  requireAuth,
  async (req, res): Promise<void> => {
    const actor = getAuth(req)?.userId;
    if (!actor) { res.status(401).json({ error: "Unauthorized" }); return; }
    const batchId = req.params.batchId;
    if (!/^[0-9a-f]{64}$/.test(batchId)) { res.status(400).json({ error: "Invalid batch id" }); return; }
    const [batch] = await db.select({
      batchId: outreachImportBatchesTable.batchId,
      status: outreachImportBatchesTable.status,
      sourceFilename: outreachImportBatchesTable.sourceFilename,
      sourceRowCount: outreachImportBatchesTable.sourceRowCount,
      error: outreachImportBatchesTable.error,
      completedAt: outreachImportBatchesTable.completedAt,
      report: outreachImportBatchesTable.report,
    }).from(outreachImportBatchesTable).where(eq(outreachImportBatchesTable.batchId, batchId)).limit(1);
    if (!batch) { res.status(404).json({ error: "Import batch not found" }); return; }
    res.json(batch);
  },
);
router.post(
  "/outreach/inventory/public-preview",
  requireAuth,
  async (req, res): Promise<void> => {
    const actor = getAuth(req)?.userId;
    if (!actor) { res.status(401).json({ error: "Unauthorized" }); return; }
    try {
      res.json(await previewPublicInventory({
        actor,
        sourceFilename: ATTACHED_PUBLIC_SOURCE_FILENAME,
        csv: ATTACHED_PUBLIC_SOURCE_CSV,
      }));
    } catch (error) {
      req.log.warn({ err: error, actor }, "Public inventory preview rejected");
      res.status(400).json({ error: error instanceof Error ? error.message : "Preview failed" });
    }
  },
);
router.post(
  "/outreach/inventory/public-confirm",
  requireAuth,
  async (req, res): Promise<void> => {
    const actor = getAuth(req)?.userId;
    const previewBatchId = typeof req.headers["x-preview-batch-id"] === "string"
      ? req.headers["x-preview-batch-id"]
      : "";
    const acceptedDigest = typeof req.headers["x-preview-accepted-digest"] === "string"
      ? req.headers["x-preview-accepted-digest"]
      : "";
    const confirmationToken = typeof req.headers["x-preview-confirmation-token"] === "string"
      ? req.headers["x-preview-confirmation-token"]
      : "";
    const confirmed = req.headers["x-confirm-import"] === "yes";
    if (!actor) { res.status(401).json({ error: "Unauthorized" }); return; }
    if (!confirmed || !previewBatchId || !acceptedDigest || !confirmationToken) {
      res.status(400).json({ error: "Explicit confirmation and a matching preview are required" });
      return;
    }
    try {
      res.status(201).json(await confirmPublicInventory({
        actor,
        previewBatchId,
        acceptedDigest,
        confirmationToken,
        sourceFilename: ATTACHED_PUBLIC_SOURCE_FILENAME,
        csv: ATTACHED_PUBLIC_SOURCE_CSV,
      }));
    } catch (error) {
      req.log.error({ err: error, actor }, "Confirmed public inventory import failed");
      res.status(400).json({ error: error instanceof Error ? error.message : "Import failed" });
    }
  },
);
router.post("/outreach/hot-leads/september-clickers/enqueue", requireAuth, async (req, res): Promise<void> => {
  const actor = getAuth(req)?.userId;
  if (!actor) { res.status(401).json({ error: "Unauthorized" }); return; }
  try {
    const report = await enqueueSeptemberClickerFollowUps();
    req.log.info({ actor, created: report.created, skipped: report.skipped }, "September clicker follow-ups queued");
    res.status(201).json(report);
  } catch (error) {
    req.log.warn({ err: error, actor }, "September clicker follow-up queue action rejected");
    res.status(409).json({ error: error instanceof Error ? error.message : "Queue action failed" });
  }
});
router.get("/outreach/lane-config", requireAuth, async (req, res) => {
  const campaignKey = typeof req.query.campaignKey === "string" ? req.query.campaignKey : currentOutreachCampaignKey();
  res.json(await getLaneConfig(campaignKey));
});
router.get("/outreach/system-config", requireAuth, async (_req, res) => {
  const config = getOutreachRuntimeConfig();
  if (!config) { res.status(503).json({ error: "Authoritative outreach configuration unavailable" }); return; }
  res.json(config);
});
router.post("/outreach/one-time-override", requireAuth, async (req, res) => {
  const actor = getAuth(req)?.userId;
  const input = z.object({ campaignKey: z.string().min(1), requestedForDate: z.string().date(), requestedLimit: z.number().int().positive(), reason: z.string().max(500).optional() }).safeParse(req.body);
  if (!actor) { res.status(401).json({ error: "Unauthorized" }); return; }
  if (!input.success) { res.status(400).json({ error: input.error.message }); return; }
  try {
    const result = await createOneTimeOverride({ ...input.data, requestedBy: actor });
    res.status(201).json(result[0]);
  } catch (error) { res.status(400).json({ error: error instanceof Error ? error.message : "Override rejected" }); }
});
export default router;