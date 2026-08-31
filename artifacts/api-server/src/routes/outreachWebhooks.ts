import { Router, type IRouter } from "express";
import {
  forwardInboundReplyToApex,
  captureInboundReply,
  processSendGridEvents,
  recordInboundReplyForwarding,
  verifyReplyWebhookToken,
  verifySendGridEventSignature,
  type SendGridEvent,
} from "../lib/outreachEvents";

const router: IRouter = Router();

async function parseInboundReply(body: unknown, contentType: string): Promise<{
  from: string;
  to: string;
  subject: string;
  text: string;
  headers: string;
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
      to: String(form.get("to") ?? ""),
      subject: String(form.get("subject") ?? ""),
      text: String(form.get("text") ?? ""),
      headers: String(form.get("headers") ?? ""),
    };
  }
  const fields = body && typeof body === "object"
    ? body as Record<string, unknown>
    : {};
  return {
    from: typeof fields.from === "string" ? fields.from : "",
    to: typeof fields.to === "string" ? fields.to : "",
    subject: typeof fields.subject === "string" ? fields.subject : "",
    text: typeof fields.text === "string" ? fields.text : "",
    headers: typeof fields.headers === "string" ? fields.headers : "",
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
  const senderName = from.includes("<") ? from.slice(0, from.indexOf("<")).trim().replace(/^"|"$/g, "") : "";
  if (!match.includes("@")) {
    res.status(400).json({ error: "Reply sender is required" });
    return;
  }
  const captured = await captureInboundReply({
    from: match,
    senderName,
    to: inbound.to,
    subject: inbound.subject,
    text: inbound.text,
    headers: inbound.headers,
  });
  if (captured.inserted && captured.reply.forwardStatus === "pending") {
    if (!process.env.OUTREACH_FROM_EMAIL?.trim()) {
      await recordInboundReplyForwarding(captured.reply.id, {
        status: "skipped",
        error: "Outlook forwarding is not configured; the reply remains available internally",
      });
    } else {
      try {
        const forwarded = await forwardInboundReplyToApex({
          from: match,
          subject: inbound.subject,
          text: inbound.text,
        });
        await recordInboundReplyForwarding(captured.reply.id, {
          status: forwarded ? "forwarded" : "failed",
          error: forwarded ? undefined : "SendGrid rejected the forwarding copy",
        });
      } catch (err) {
        req.log.error({ err, replyId: captured.reply.id }, "Inbound outreach reply forwarding failed");
        await recordInboundReplyForwarding(captured.reply.id, {
          status: "failed",
          error: err instanceof Error ? err.message : "Reply forwarding failed",
        });
      }
    }
  }
  req.log.info({
    replyId: captured.reply.id,
    duplicate: !captured.inserted,
    matchedProspects: captured.matchedProspects,
  }, "Retained inbound outreach reply");
  res.json({
    ok: true,
    replyId: captured.reply.id,
    duplicate: !captured.inserted,
    matchedProspects: captured.matchedProspects,
  });
});

export default router;