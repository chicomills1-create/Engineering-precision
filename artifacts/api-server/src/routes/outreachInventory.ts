import { Router, type IRouter } from "express";
import { getAuth } from "@clerk/express";
import { z } from "zod";
import { requireAuth } from "../middlewares/requireAuth";
import express from "express";
import { createOneTimeOverride, getLaneConfig, importRecoveredFindyMailInventory, importVerifiedInventory } from "../lib/outreachInventory";
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
    try {
      res.status(201).json(await importRecoveredFindyMailInventory({
        actor,
        sourceFilename: typeof req.headers["x-source-filename"] === "string"
          ? req.headers["x-source-filename"]
          : "findymail-recovered.csv",
        csv: req.body,
      }));
    } catch (error) {
      req.log.error({ err: error }, "Recovered FindyMail inventory import failed");
      res.status(400).json({ error: error instanceof Error ? error.message : "Import failed" });
    }
  },
);
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