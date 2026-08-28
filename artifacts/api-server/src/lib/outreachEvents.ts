import { createHmac, timingSafeEqual, verify } from "node:crypto";
import { ReplitConnectors } from "@replit/connectors-sdk";
import { and, eq, inArray, isNull } from "drizzle-orm";
import {
  db,
  outreachDeliveryEventsTable,
  outreachMessagesTable,
  outreachSuppressionsTable,
  prospectsTable,
} from "@workspace/db";
import { getFollowUpScheduledAt } from "./outreachEligibility";

export type SendGridEvent = {
  email?: string;
  event?: string;
  reason?: string;
  response?: string;
  timestamp?: number;
  sg_message_id?: string;
  outreach_message_id?: string;
  outreach_prospect_id?: string;
};

function getReplyWebhookToken(): string | undefined {
  const explicit = process.env.OUTREACH_REPLY_WEBHOOK_TOKEN?.trim();
  if (explicit) return explicit;
  const sessionSecret = process.env.SESSION_SECRET?.trim();
  if (!sessionSecret) return undefined;
  return createHmac("sha256", sessionSecret)
    .update("apex-grid-outreach-inbound-reply-v1")
    .digest("hex");
}

export function isReplyWebhookConfigured(): boolean {
  return Boolean(getReplyWebhookToken());
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
    return verify(
      "sha256",
      Buffer.concat([Buffer.from(headers.timestamp), rawBody]),
      publicKey.replace(/\\n/g, "\n"),
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

async function stopPendingMessages(prospectId: number, status: "bounced" | "unsubscribed" | "replied", reason: string): Promise<void> {
  await db.update(outreachMessagesTable)
    .set({ status, error: reason })
    .where(and(
      eq(outreachMessagesTable.prospectId, prospectId),
      inArray(outreachMessagesTable.status, ["draft", "approved", "sending"]),
    ));
}

async function suppressEmail(email: string, reason: string): Promise<void> {
  await db.insert(outreachSuppressionsTable)
    .values({ email, reason })
    .onConflictDoUpdate({
      target: outreachSuppressionsTable.email,
      set: { reason },
    });
}

export async function processSendGridEvents(events: SendGridEvent[]): Promise<number> {
  let processed = 0;
  for (const event of events) {
    const email = event.email?.trim().toLowerCase();
    const eventType = event.event?.trim().toLowerCase();
    if (!email || !eventType || !event.timestamp) continue;
    const providerMessageId = normalizeProviderMessageId(event.sg_message_id);
    const occurredAt = new Date(event.timestamp * 1000);
    const reason = (event.reason || event.response || "").slice(0, 500) || null;
    const inserted = await db.insert(outreachDeliveryEventsTable).values({
      providerMessageId,
      email,
      eventType,
      reason,
      occurredAt,
    }).onConflictDoNothing().returning({ id: outreachDeliveryEventsTable.id });
    if (inserted.length === 0) continue;

    const messageId = Number(event.outreach_message_id);
    const prospectId = Number(event.outreach_prospect_id);
    const messageWhere = Number.isInteger(messageId)
      ? eq(outreachMessagesTable.id, messageId)
      : providerMessageId
        ? eq(outreachMessagesTable.providerMessageId, providerMessageId)
        : undefined;

    if (messageWhere && eventType === "delivered") {
      await db.update(outreachMessagesTable).set({ status: "delivered", error: null }).where(messageWhere);
      const deliveredMessage = Number.isInteger(messageId)
        ? (await db.select().from(outreachMessagesTable).where(eq(outreachMessagesTable.id, messageId)))[0]
        : providerMessageId
          ? (await db.select().from(outreachMessagesTable).where(eq(outreachMessagesTable.providerMessageId, providerMessageId)))[0]
          : undefined;
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
      const prospect = Number.isInteger(prospectId)
        ? (await db.select().from(prospectsTable).where(eq(prospectsTable.id, prospectId)))[0]
        : (await db.select().from(prospectsTable).where(eq(prospectsTable.contactEmail, email)))[0];
      if (prospect) {
        await db.update(prospectsTable).set({ status: "suppressed", emailStatus: "invalid" }).where(eq(prospectsTable.id, prospect.id));
        await stopPendingMessages(prospect.id, "bounced", reason ?? "Sequence stopped after delivery failure");
      }
      await suppressEmail(email, eventType);
    }

    if (["spamreport", "unsubscribe", "group_unsubscribe"].includes(eventType)) {
      if (messageWhere) await db.update(outreachMessagesTable).set({ status: "unsubscribed", error: reason }).where(messageWhere);
      const matches = await db.select({ id: prospectsTable.id }).from(prospectsTable).where(eq(prospectsTable.contactEmail, email));
      for (const prospect of matches) {
        await db.update(prospectsTable).set({ status: "suppressed" }).where(eq(prospectsTable.id, prospect.id));
        await stopPendingMessages(prospect.id, "unsubscribed", `Sequence stopped after ${eventType}`);
      }
      await suppressEmail(email, eventType);
    }
    processed += 1;
  }
  return processed;
}

export async function processInboundReply(email: string): Promise<number> {
  const normalized = email.trim().toLowerCase();
  const prospects = await db.select().from(prospectsTable).where(eq(prospectsTable.contactEmail, normalized));
  for (const prospect of prospects) {
    await db.update(prospectsTable).set({ status: "replied" }).where(eq(prospectsTable.id, prospect.id));
    await stopPendingMessages(prospect.id, "replied", "Sequence stopped after reply");
  }
  return prospects.length;
}