import { Router, type IRouter } from "express";
import {
  processInboundReply,
  processSendGridEvents,
  verifyReplyWebhookToken,
  verifySendGridEventSignature,
  type SendGridEvent,
} from "../lib/outreachEvents";

const router: IRouter = Router();

router.post("/outreach/webhooks/sendgrid-events", async (req, res): Promise<void> => {
  const rawBody = Buffer.isBuffer(req.body) ? req.body : Buffer.from(JSON.stringify(req.body ?? []));
  const valid = verifySendGridEventSignature(rawBody, {
    signature: req.get("X-Twilio-Email-Event-Webhook-Signature") ?? undefined,
    timestamp: req.get("X-Twilio-Email-Event-Webhook-Timestamp") ?? undefined,
  });
  if (!valid) {
    res.status(401).json({ error: "Invalid webhook signature" });
    return;
  }
  let events: unknown;
  try {
    events = JSON.parse(rawBody.toString("utf8"));
  } catch {
    res.status(400).json({ error: "Invalid webhook payload" });
    return;
  }
  if (!Array.isArray(events)) {
    res.status(400).json({ error: "Expected an event array" });
    return;
  }
  const processed = await processSendGridEvents(events as SendGridEvent[]);
  req.log.info({ processed }, "Processed SendGrid outreach events");
  res.json({ ok: true, processed });
});

router.post("/outreach/webhooks/inbound-reply", async (req, res): Promise<void> => {
  const token = req.get("X-Outreach-Webhook-Token") ?? String(req.query.token ?? "");
  if (!verifyReplyWebhookToken(token)) {
    res.status(401).json({ error: "Invalid webhook token" });
    return;
  }
  const from = typeof req.body?.from === "string" ? req.body.from : "";
  const match = from.match(/<([^>]+)>/)?.[1] ?? from;
  if (!match.includes("@")) {
    res.status(400).json({ error: "Reply sender is required" });
    return;
  }
  const matchedProspects = await processInboundReply(match);
  req.log.info({ matchedProspects }, "Processed inbound outreach reply");
  res.json({ ok: true, matchedProspects });
});

export default router;