import { Router, type IRouter } from "express";
import {
  forwardInboundReplyToApex,
  processInboundReply,
  processSendGridEvents,
  verifyReplyWebhookToken,
  verifySendGridEventSignature,
  type SendGridEvent,
} from "../lib/outreachEvents";

const router: IRouter = Router();

async function parseInboundReply(body: unknown, contentType: string): Promise<{
  from: string;
  subject: string;
  text: string;
}> {
  if (Buffer.isBuffer(body)) {
    const request = new Request("http://localhost/inbound-reply", {
      method: "POST",
      headers: { "Content-Type": contentType },
      body: new Uint8Array(body),
    });
    const form = await request.formData();
    return {
      from: String(form.get("from") ?? ""),
      subject: String(form.get("subject") ?? ""),
      text: String(form.get("text") ?? ""),
    };
  }
  const fields = body && typeof body === "object"
    ? body as Record<string, unknown>
    : {};
  return {
    from: typeof fields.from === "string" ? fields.from : "",
    subject: typeof fields.subject === "string" ? fields.subject : "",
    text: typeof fields.text === "string" ? fields.text : "",
  };
}

router.post("/outreach/webhooks/sendgrid-events", async (req, res): Promise<void> => {
  const rawBody = Buffer.isBuffer(req.body) ? req.body : Buffer.from(JSON.stringify(req.body ?? []));
  const signature = req.get("X-Twilio-Email-Event-Webhook-Signature") ?? undefined;
  const timestamp = req.get("X-Twilio-Email-Event-Webhook-Timestamp") ?? undefined;
  const valid = verifySendGridEventSignature(rawBody, {
    signature,
    timestamp,
  });
  if (!valid) {
    req.log.warn({
      bodyIsBuffer: Buffer.isBuffer(req.body),
      bodyBytes: rawBody.length,
      contentType: req.get("Content-Type") ?? null,
      signaturePresent: Boolean(signature),
      signatureBytes: signature ? Buffer.from(signature, "base64").length : 0,
      timestampPresent: Boolean(timestamp),
    }, "Rejected SendGrid event webhook signature");
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
  const forwardUrl = process.env.SENDGRID_EVENT_FORWARD_URL?.trim();
  if (forwardUrl) {
    try {
      const forwarded = await fetch(forwardUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Twilio-Email-Event-Webhook-Signature": req.get("X-Twilio-Email-Event-Webhook-Signature") ?? "",
          "X-Twilio-Email-Event-Webhook-Timestamp": req.get("X-Twilio-Email-Event-Webhook-Timestamp") ?? "",
        },
        body: rawBody,
      });
      if (!forwarded.ok) {
        req.log.error({ status: forwarded.status }, "Forwarded SendGrid event webhook was rejected");
      }
    } catch (err) {
      req.log.error({ err }, "Forwarded SendGrid event webhook failed");
    }
  }
  req.log.info({ processed }, "Processed SendGrid outreach events");
  res.json({ ok: true, processed });
});

router.post("/outreach/webhooks/inbound-reply", async (req, res): Promise<void> => {
  const token = req.get("X-Outreach-Webhook-Token") ?? String(req.query.token ?? "");
  if (!verifyReplyWebhookToken(token)) {
    res.status(401).json({ error: "Invalid webhook token" });
    return;
  }
  let inbound: Awaited<ReturnType<typeof parseInboundReply>>;
  try {
    inbound = await parseInboundReply(req.body, req.get("Content-Type") ?? "");
  } catch {
    res.status(400).json({ error: "Invalid inbound reply payload" });
    return;
  }
  const from = inbound.from;
  const match = from.match(/<([^>]+)>/)?.[1] ?? from;
  if (!match.includes("@")) {
    res.status(400).json({ error: "Reply sender is required" });
    return;
  }
  const matchedProspects = await processInboundReply(match);
  try {
    const forwarded = await forwardInboundReplyToApex({
      from: match,
      subject: inbound.subject,
      text: inbound.text,
    });
    if (!forwarded) {
      res.status(502).json({ error: "Reply forwarding failed" });
      return;
    }
  } catch (err) {
    req.log.error({ err }, "Inbound outreach reply forwarding failed");
    res.status(502).json({ error: "Reply forwarding failed" });
    return;
  }
  req.log.info({ matchedProspects }, "Processed inbound outreach reply");
  res.json({ ok: true, matchedProspects });
});

export default router;