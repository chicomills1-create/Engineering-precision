import { ReplitConnectors } from "@replit/connectors-sdk";
import { openai } from "@workspace/integrations-openai-ai-server";
import { and, eq, isNull } from "drizzle-orm";
import {
  campaignsTable,
  db,
  outreachMessagesTable,
  outreachSendReservationsTable,
  outreachSuppressionsTable,
  prospectsTable,
  type Campaign,
  type OutreachMessage,
  type Prospect,
} from "@workspace/db";
import { getPublicBaseUrl, makeUnsubscribeToken } from "./unsubscribeToken";
import {
  assertOutreachEligibilityBase,
  assertScheduledTimeReady,
  assertSequenceDeliveryReady,
} from "./outreachEligibility";

export type GeneratedDraft = { subject: string; body: string; followUps: { subject: string; body: string }[] };

function phoenixDateKey(date = new Date()): string {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Phoenix",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const value = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${value.year}-${value.month}-${value.day}`;
}

async function reserveDailySend(message: OutreachMessage, campaign: Campaign | undefined): Promise<number> {
  const quotaKey = `${campaign ? `campaign:${campaign.id}` : "standalone"}:${phoenixDateKey()}`;
  const limit = campaign?.dailyLimit ?? 10;
  for (let slot = 1; slot <= limit; slot += 1) {
    const inserted = await db.insert(outreachSendReservationsTable)
      .values({ messageId: message.id, quotaKey, slot })
      .onConflictDoNothing()
      .returning({ id: outreachSendReservationsTable.id });
    if (inserted[0]) return inserted[0].id;
  }
  throw new Error("Daily send limit reached");
}

export async function generateProspectDraft(prospect: Prospect): Promise<GeneratedDraft> {
  if (!prospect.contactName || !prospect.contactTitle) {
    throw new Error("A named decision-maker and role are required before drafting");
  }
  if (prospect.needScore < 60 || !prospect.needSignals) {
    throw new Error("A credible current need signal is required before drafting");
  }
  const completion = await openai.chat.completions.create({
    model: "gpt-5.6-luna",
    max_completion_tokens: 8192,
    response_format: { type: "json_object" },
    messages: [{ role: "system", content: "Return strict JSON only: {\"subject\":\"...\",\"body\":\"...\",\"followUps\":[{\"subject\":\"...\",\"body\":\"...\"},{\"subject\":\"...\",\"body\":\"...\"},{\"subject\":\"...\",\"body\":\"...\"}]}. Write concise professional B2B outreach for Apex Grid Engineering. Apex Grid has licensed Civil, Structural, and MEP PEs ready to stamp. The Structural Practice covers gravity and lateral systems in steel, concrete, masonry, and wood; load paths, foundations, seismic and wind analysis, and peer review. Tailor to the decision-maker's role and architect or builder audience. Mention only capabilities relevant to the supplied need signal. Use only supplied public research notes; never invent claims, projects, or facts." },
      { role: "user", content: JSON.stringify({
        companyName: prospect.companyName,
        audience: prospect.audience,
        contactName: prospect.contactName,
        contactTitle: prospect.contactTitle,
        researchNotes: prospect.researchNotes ?? "",
        needSignals: prospect.needSignals,
      }) }],
  });
  const parsed: unknown = JSON.parse(completion.choices[0]?.message.content ?? "");
  if (!isDraft(parsed)) throw new Error("AI returned an invalid outreach draft");
  return parsed;
}

function isDraft(value: unknown): value is GeneratedDraft {
  if (!value || typeof value !== "object") return false;
  const draft = value as Record<string, unknown>;
  return typeof draft.subject === "string" && typeof draft.body === "string" &&
    Array.isArray(draft.followUps) && draft.followUps.length === 3 &&
    draft.followUps.every((item) => item && typeof item.subject === "string" && typeof item.body === "string");
}

export async function sendApprovedOutreach(message: OutreachMessage, prospect: Prospect, campaign: Campaign | undefined): Promise<{ providerMessageId?: string }> {
  const [currentProspect] = await db.select().from(prospectsTable).where(eq(prospectsTable.id, prospect.id));
  if (!currentProspect) throw new Error("Prospect not found");
  const [currentCampaign] = campaign
    ? await db.select().from(campaignsTable).where(eq(campaignsTable.id, campaign.id))
    : [];
  if (campaign && !currentCampaign) throw new Error("Campaign not found");
  const email = assertOutreachEligibilityBase(message, currentProspect, currentCampaign);
  assertScheduledTimeReady(message.sequenceNumber, message.scheduledAt);
  if (message.sequenceNumber > 1) {
    const campaignScope = message.campaignId
      ? eq(outreachMessagesTable.campaignId, message.campaignId)
      : isNull(outreachMessagesTable.campaignId);
    const [previous] = await db.select({ status: outreachMessagesTable.status })
      .from(outreachMessagesTable)
      .where(and(
        eq(outreachMessagesTable.prospectId, message.prospectId),
        campaignScope,
        eq(outreachMessagesTable.sequenceNumber, message.sequenceNumber - 1),
      ))
      .limit(1);
    assertSequenceDeliveryReady(message.sequenceNumber, previous?.status);
  }
  const [suppression] = await db.select({ id: outreachSuppressionsTable.id }).from(outreachSuppressionsTable).where(eq(outreachSuppressionsTable.email, email)).limit(1);
  if (suppression) throw new Error("Address is suppressed");

  const token = makeUnsubscribeToken(email);
  const baseUrl = getPublicBaseUrl();
  if (!token || !baseUrl) throw new Error("Unsubscribe signing is not configured");
  const unsubscribe = `${baseUrl}/api/outreach/unsubscribe?${new URLSearchParams({ email, token })}`;
  const oneClick = unsubscribe;
  const body = `${message.body}\n\n— Apex Grid Engineering\n22475 E Quintero Rd, Queen Creek, AZ 85142\n\nUnsubscribe: ${unsubscribe}`;
  const from = process.env.OUTREACH_FROM_EMAIL;
  if (!from) throw new Error("OUTREACH_FROM_EMAIL is not configured");
  const replyTo = process.env.OUTREACH_REPLY_TO_EMAIL?.trim() || from;
  const dedicatedSendGridKey = process.env.SENDGRID_ISOLATION_VERIFIED === "true"
    ? process.env.SENDGRID_DEDICATED_API_KEY?.trim()
    : undefined;
  const sendgridSubuser = process.env.SENDGRID_SUBUSER_USERNAME?.trim();
  const reservationId = await reserveDailySend(message, currentCampaign);
  let response: Awaited<ReturnType<ReplitConnectors["proxy"]>>;
  try {
    const requestBody = JSON.stringify({
      personalizations: [{
        to: [{ email }],
        headers: {
          "List-Unsubscribe": `<${oneClick}>`,
          "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
        },
        custom_args: {
          outreach_message_id: String(message.id),
          outreach_prospect_id: String(prospect.id),
        },
      }],
      from: { email: from, name: "Apex Grid Engineering" },
      reply_to: { email: replyTo, name: "Apex Grid Engineering" },
      subject: message.subject,
      content: [{ type: "text/plain", value: body }],
    });
    response = dedicatedSendGridKey
      ? await fetch("https://api.sendgrid.com/v3/mail/send", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${dedicatedSendGridKey}`,
          },
          body: requestBody,
        })
      : await new ReplitConnectors().proxy("sendgrid", "/v3/mail/send", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(sendgridSubuser ? { "on-behalf-of": sendgridSubuser } : {}),
          },
          body: requestBody,
        });
  } catch {
    throw new Error("SendGrid dispatch result is unknown; message requires reconciliation before retry");
  }
  if (!response.ok) {
    await db.delete(outreachSendReservationsTable).where(eq(outreachSendReservationsTable.id, reservationId));
    throw new Error(`SendGrid rejected the message with status ${response.status}`);
  }
  return { providerMessageId: response.headers.get("x-message-id") ?? undefined };
}