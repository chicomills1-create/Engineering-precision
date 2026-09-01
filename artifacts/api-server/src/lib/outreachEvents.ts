import { createHash, createHmac, createPublicKey, timingSafeEqual, verify } from "node:crypto";
import { ReplitConnectors } from "@replit/connectors-sdk";
import { and, desc, eq, inArray, isNull, sql } from "drizzle-orm";
import {
  db,
  outreachDeliveryEventsTable,
  outreachMessagesTable,
  outreachRepliesTable,
  prospectsTable,
} from "@workspace/db";
import { getFollowUpScheduledAt } from "./outreachEligibility";
import { recordContactEvidence } from "./outreachContactEvidence";
import { withOutreachEmailLock } from "./outreachEmailLock";
import { suppressOutreachEmail } from "./outreachSuppression";

export type SendGridEvent = {
  email?: string;
  event?: string;
  reason?: string;
  response?: string;
  timestamp?: number;
  sg_message_id?: string;
  outreach_message_id?: string;
  outreach_prospect_id?: string;
  outreach_reconciliation_key?: string;
};

function getReplyWebhookToken(): string | undefined {
  const explicit = process.env.OUTREACH_REPLY_WEBHOOK_TOKEN?.trim();
  if (explicit) return explicit;
  const sessionSecret = process.env.SESSION_SECRET?.trim();
  if (!sessionSecret) return undefined;
  return createHmac("sha256", sessionSecret)
    .update("apex-grid-outreach-inbound-reply-v2")
    .digest("hex");
}

export function isReplyWebhookConfigured(): boolean {
  return Boolean(getReplyWebhookToken());
}

export async function syncSendGridInboundReplyWebhook(): Promise<{
  state: "skipped" | "unchanged" | "updated";
  hostname?: string;
}> {
  if (process.env.NODE_ENV !== "production") return { state: "skipped" };

  const token = getReplyWebhookToken();
  const publicSiteUrl = process.env.PUBLIC_SITE_URL?.trim();
  if (!token || !publicSiteUrl) return { state: "skipped" };

  const targetUrl = new URL("/api/outreach/webhooks/inbound-reply", publicSiteUrl);
  targetUrl.searchParams.set("token", token);

  const connectors = new ReplitConnectors();
  const listResponse = await connectors.proxy(
    "sendgrid",
    "/v3/user/webhooks/parse/settings",
    { method: "GET" },
  );
  if (!listResponse.ok) {
    throw new Error(`Unable to inspect SendGrid inbound parse settings (${listResponse.status})`);
  }

  const payload = await listResponse.json() as {
    result?: Array<{
      hostname?: string;
      url?: string;
      spam_check?: boolean;
      send_raw?: boolean;
    }>;
  };
  const matches = (payload.result ?? []).filter((setting) => {
    if (!setting.hostname || !setting.url) return false;
    try {
      return new URL(setting.url).pathname === targetUrl.pathname;
    } catch {
      return false;
    }
  });
  if (matches.length !== 1) {
    throw new Error(`Expected one Apex inbound parse setting, found ${matches.length}`);
  }

  const setting = matches[0]!;
  if (setting.url === targetUrl.toString()) {
    return { state: "unchanged", hostname: setting.hostname };
  }

  const updateResponse = await connectors.proxy(
    "sendgrid",
    `/v3/user/webhooks/parse/settings/${encodeURIComponent(setting.hostname!)}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        url: targetUrl.toString(),
        spam_check: setting.spam_check ?? true,
        send_raw: setting.send_raw ?? false,
      }),
    },
  );
  if (!updateResponse.ok) {
    throw new Error(`Unable to update SendGrid inbound parse setting (${updateResponse.status})`);
  }

  return { state: "updated", hostname: setting.hostname };
}

function normalizeProviderMessageId(value: string | undefined): string | null {
  if (!value) return null;
  return value.split(".")[0] ?? value;
}

export function verifySendGridEventSignature(rawBody: Buffer, headers: {
  signature?: string;
  timestamp?: string;
}): boolean {
  const publicKey = process.env.SENDGRID_EVENT_WEBHOOK_PUBLIC_KEY;
  if (!publicKey || !headers.signature || !headers.timestamp) return false;
  try {
    const normalizedKey = publicKey.replace(/\\n/g, "\n").trim();
    const verificationKey = normalizedKey.includes("BEGIN PUBLIC KEY")
      ? normalizedKey
      : createPublicKey({
          key: Buffer.from(normalizedKey, "base64"),
          format: "der",
          type: "spki",
        });
    return verify(
      "sha256",
      Buffer.concat([Buffer.from(headers.timestamp), rawBody]),
      verificationKey,
      Buffer.from(headers.signature, "base64"),
    );
  } catch {
    return false;
  }
}

export function verifyReplyWebhookToken(candidate: string | undefined): boolean {
  const expected = getReplyWebhookToken();
  if (!candidate || !expected) return false;
  const left = Buffer.from(candidate);
  const right = Buffer.from(expected);
  return left.length === right.length && timingSafeEqual(left, right);
}

export async function forwardInboundReplyToApex(input: {
  from: string;
  subject: string;
  text: string;
}): Promise<boolean> {
  const to = process.env.OUTREACH_FROM_EMAIL?.trim();
  if (!to) return false;
  const response = await new ReplitConnectors().proxy("sendgrid", "/v3/mail/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      personalizations: [{ to: [{ email: to }] }],
      from: { email: to, name: "Apex Grid Outreach Replies" },
      reply_to: { email: input.from },
      subject: input.subject ? `Re: ${input.subject}` : `Outreach reply from ${input.from}`,
      content: [{
        type: "text/plain",
        value: [
          `Reply received from: ${input.from}`,
          "",
          input.text || "(No plain-text reply body was provided.)",
        ].join("\n"),
      }],
    }),
  });
  return response.ok;
}

export type InboundReplyInput = {
  from: string;
  senderName?: string;
  to?: string;
  subject: string;
  text: string;
  headers?: string;
  receivedAt?: Date;
};

function inboundMessageId(headers = ""): string | null {
  const match = headers.match(/^message-id:\s*(.+)$/im);
  return match?.[1]?.trim().slice(0, 500) || null;
}

export function classifyInboundReply(input: Pick<InboundReplyInput, "subject" | "text" | "headers">): "reply" | "auto_reply" | "permanent_closure" {
  const headers = input.headers?.toLowerCase() ?? "";
  const subject = input.subject.trim().toLowerCase();
  const textStart = input.text.trim().slice(0, 500).toLowerCase();
  if (
    /\bpermanently closed\b|\bceased operations\b|\bno longer in business\b/.test(`${subject}\n${textStart}`)
  ) {
    return "permanent_closure";
  }
  if (
    /^auto-submitted:\s*(?:auto-|yes\b)/im.test(headers)
    || /^x-autoreply:/im.test(headers)
    || /^x-auto-response-suppress:/im.test(headers)
    || /^(automatic reply|auto(?:matic)? reply|out of office|ooo\b|away from)/i.test(subject)
    || /\b(out of (?:the )?office|automatic reply)\b/i.test(textStart)
  ) {
    return "auto_reply";
  }
  return "reply";
}

function inboundDedupeKey(input: InboundReplyInput): { key: string; providerMessageId: string | null } {
  const providerMessageId = inboundMessageId(input.headers);
  const normalized = providerMessageId
    ? `message-id:${providerMessageId.toLowerCase()}`
    : [
        input.from.trim().toLowerCase(),
        input.to?.trim().toLowerCase() ?? "",
        input.subject.trim(),
        input.text.trim(),
      ].join("\n");
  return {
    key: createHash("sha256").update(normalized).digest("hex"),
    providerMessageId,
  };
}

export async function captureInboundReply(input: InboundReplyInput): Promise<{
  reply: typeof outreachRepliesTable.$inferSelect;
  inserted: boolean;
  matchedProspects: number;
}> {
  const senderEmail = input.from.trim().toLowerCase();
  const receivedAt = input.receivedAt ?? new Date();
  const messageType = classifyInboundReply(input);
  const { key, providerMessageId } = inboundDedupeKey(input);
  const prospects = await db.select().from(prospectsTable)
    .where(eq(prospectsTable.contactEmail, senderEmail))
    .orderBy(desc(prospectsTable.updatedAt));
  const primaryProspect = prospects[0];
  const [inserted] = await db.insert(outreachRepliesTable).values({
    dedupeKey: key,
    providerMessageId,
    senderEmail,
    senderName: input.senderName?.trim().slice(0, 320) || null,
    recipientEmail: input.to?.trim().slice(0, 320) || null,
    subject: input.subject.trim().slice(0, 1000),
    textBody: input.text.trim().slice(0, 100_000),
    messageType,
    prospectId: primaryProspect?.id ?? null,
    // Do not infer a thread from recency. Link a message only when a future
    // verified In-Reply-To/References correlation is available.
    outreachMessageId: null,
    receivedAt,
  }).onConflictDoNothing().returning();

  let reply = inserted;
  if (!reply) {
    [reply] = await db.select().from(outreachRepliesTable)
      .where(eq(outreachRepliesTable.dedupeKey, key))
      .limit(1);
  }
  if (!reply) throw new Error("Unable to retain inbound reply");

  let matchedProspects = 0;
  reply = await withOutreachEmailLock(senderEmail, async () => {
    const [current] = await db.select().from(outreachRepliesTable)
      .where(eq(outreachRepliesTable.id, reply!.id))
      .limit(1);
    if (!current) throw new Error("Retained inbound reply disappeared");
    if (current.stopProcessedAt) return current;

    const reviewAt = new Date(receivedAt.getTime() + 14 * 24 * 60 * 60 * 1000);
    const evidenceType = messageType === "permanent_closure"
      ? "departed"
      : messageType === "auto_reply"
        ? "temporary_unavailability"
        : "forwarded_reply";
    for (const prospect of prospects) {
      await recordContactEvidence({
        prospectId: prospect.id,
        evidenceType,
        evidenceNote: messageType === "permanent_closure"
          ? "Permanent business closure reported by the protected reply webhook"
          : messageType === "auto_reply"
            ? "Automatic reply received by the protected reply webhook; review before resuming outreach"
            : "Inbound reply received and retained by the protected reply webhook",
        reviewAt: messageType === "auto_reply" ? reviewAt : undefined,
        now: receivedAt,
        emailLockAlreadyHeld: true,
      });
      matchedProspects += 1;
    }
    const [processed] = await db.update(outreachRepliesTable)
      .set({
        stopProcessedAt: new Date(),
        followUpAt: messageType === "auto_reply" ? reviewAt : current.followUpAt,
      })
      .where(eq(outreachRepliesTable.id, current.id))
      .returning();
    return processed;
  });

  return { reply: reply!, inserted: Boolean(inserted), matchedProspects };
}

export async function recordInboundReplyForwarding(
  id: number,
  result: { status: "forwarded" | "failed" | "skipped"; error?: string },
): Promise<void> {
  await db.update(outreachRepliesTable).set({
    forwardStatus: result.status,
    forwardError: result.error?.slice(0, 1000) ?? null,
    forwardedAt: result.status === "forwarded" ? new Date() : null,
  }).where(eq(outreachRepliesTable.id, id));
}

async function stopPendingMessages(prospectId: number, status: "bounced" | "unsubscribed" | "replied", reason: string): Promise<void> {
  await db.update(outreachMessagesTable)
    .set({ status, error: reason })
    .where(and(
      eq(outreachMessagesTable.prospectId, prospectId),
      inArray(outreachMessagesTable.status, ["draft", "approved", "sending"]),
    ));
}

export async function processSendGridEvents(events: SendGridEvent[]): Promise<number> {
  let processed = 0;
  for (const event of events) {
    const email = event.email?.trim().toLowerCase();
    const eventType = event.event?.trim().toLowerCase();
    if (!email || !eventType || !event.timestamp) continue;
    const providerMessageId = normalizeProviderMessageId(event.sg_message_id);
    const reconciliationKey = event.outreach_reconciliation_key?.trim() || null;
    const occurredAt = new Date(event.timestamp * 1000);
    const reason = (event.reason || event.response || "").slice(0, 500) || null;
    const requestedMessageId = Number(event.outreach_message_id);
    let matchedMessage = Number.isInteger(requestedMessageId)
      ? (await db.select().from(outreachMessagesTable).where(eq(outreachMessagesTable.id, requestedMessageId)).limit(1))[0]
      : undefined;
    if (!matchedMessage && reconciliationKey) {
      [matchedMessage] = await db.select().from(outreachMessagesTable)
        .where(eq(outreachMessagesTable.providerReconciliationKey, reconciliationKey))
        .limit(1);
    }
    if (!matchedMessage && providerMessageId) {
      [matchedMessage] = await db.select().from(outreachMessagesTable)
        .where(eq(outreachMessagesTable.providerMessageId, providerMessageId))
        .limit(1);
    }
    const inserted = await db.insert(outreachDeliveryEventsTable).values({
      providerMessageId,
      email,
      eventType,
      reason,
      occurredAt,
      outreachMessageId: matchedMessage?.id ?? null,
      reconciliationKey: reconciliationKey ?? matchedMessage?.providerReconciliationKey ?? null,
    }).onConflictDoNothing().returning({ id: outreachDeliveryEventsTable.id });
    if (inserted.length === 0) continue;

    const prospectId = Number(event.outreach_prospect_id);
    const messageWhere = matchedMessage
      ? eq(outreachMessagesTable.id, matchedMessage.id)
      : undefined;

    if (messageWhere && ["processed", "deferred"].includes(eventType)) {
      await db.update(outreachMessagesTable)
        .set({
          status: "sent",
          sentAt: sql`coalesce(${outreachMessagesTable.sentAt}, ${occurredAt})`,
          providerMessageId: providerMessageId ?? undefined,
          error: null,
        })
        .where(and(
          messageWhere,
          inArray(outreachMessagesTable.status, ["sending", "needs_review"]),
        ));
    }

    if (messageWhere && eventType === "delivered") {
      const [deliveredMessage] = await db.update(outreachMessagesTable)
        .set({
          status: "delivered",
          sentAt: sql`coalesce(${outreachMessagesTable.sentAt}, ${occurredAt})`,
          providerMessageId: providerMessageId ?? undefined,
          error: null,
        })
        .where(and(
          messageWhere,
          inArray(outreachMessagesTable.status, ["sent", "sending", "needs_review"]),
        ))
        .returning();
      if (deliveredMessage?.sequenceNumber === 1) {
        const followUps = await db.select().from(outreachMessagesTable).where(and(
          eq(outreachMessagesTable.prospectId, deliveredMessage.prospectId),
          deliveredMessage.campaignId
            ? eq(outreachMessagesTable.campaignId, deliveredMessage.campaignId)
            : isNull(outreachMessagesTable.campaignId),
          inArray(outreachMessagesTable.status, ["draft", "approved"]),
        ));
        for (const followUp of followUps) {
          const scheduledAt = getFollowUpScheduledAt(followUp.sequenceNumber, occurredAt);
          if (!scheduledAt) continue;
          await db.update(outreachMessagesTable)
            .set({ scheduledAt })
            .where(and(
              eq(outreachMessagesTable.id, followUp.id),
              inArray(outreachMessagesTable.status, ["draft", "approved"]),
            ));
        }
      }
    }

    if (["bounce", "blocked", "dropped"].includes(eventType)) {
      if (messageWhere) await db.update(outreachMessagesTable).set({ status: "bounced", error: reason ?? "Delivery failed" }).where(messageWhere);
      await suppressOutreachEmail(email, eventType, {
        pendingStatus: "bounced",
        pendingError: reason ?? "Sequence stopped after delivery failure",
        emailStatus: "invalid",
      });
    }

    if (["spamreport", "unsubscribe", "group_unsubscribe"].includes(eventType)) {
      if (messageWhere) await db.update(outreachMessagesTable).set({ status: "unsubscribed", error: reason }).where(messageWhere);
      await suppressOutreachEmail(email, eventType, {
        pendingError: `Sequence stopped after ${eventType}`,
      });
    }
    processed += 1;
  }
  return processed;
}

export async function processInboundReply(email: string): Promise<number> {
  const normalized = email.trim().toLowerCase();
  const prospects = await db.select().from(prospectsTable).where(eq(prospectsTable.contactEmail, normalized));
  for (const prospect of prospects) {
    await recordContactEvidence({
      prospectId: prospect.id,
      evidenceType: "forwarded_reply",
      evidenceNote: "Inbound reply received by the protected reply webhook",
    });
  }
  return prospects.length;
}