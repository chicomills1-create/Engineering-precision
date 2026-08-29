import { ReplitConnectors } from "@replit/connectors-sdk";
import { openai } from "@workspace/integrations-openai-ai-server";
import { and, eq, isNotNull, isNull } from "drizzle-orm";
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
import {
  makeOneClickUnsubscribeUrl,
  makeUnsubscribeUrl,
} from "./unsubscribeToken";
import { renderBrandedEmail } from "./emailMarkup";
import {
  assertOutreachEligibilityBase,
  assertScheduledTimeReady,
  assertSequenceDeliveryReady,
} from "./outreachEligibility";

export type GeneratedDraft = { subject: string; body: string; followUps: { subject: string; body: string }[] };

export function isUnknownSendResultError(error: unknown): boolean {
  return error instanceof Error && error.message.includes("dispatch result is unknown");
}

const INITIAL_RAMP_DAILY_LIMIT = 10;
const RAMPED_DAILY_LIMIT = 20;
const INITIAL_RAMP_ACTIVE_DAYS = 3;

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

export function getOutreachDailyLimit(configuredLimit: number | undefined, activeSendDays: number): number {
  const limit = configuredLimit ?? INITIAL_RAMP_DAILY_LIMIT;
  return activeSendDays < INITIAL_RAMP_ACTIVE_DAYS
    ? Math.min(limit, INITIAL_RAMP_DAILY_LIMIT)
    : Math.max(limit, RAMPED_DAILY_LIMIT);
}

async function getCampaignActiveSendDays(campaignId: number): Promise<number> {
  const sentMessages = await db.select({ sentAt: outreachMessagesTable.sentAt })
    .from(outreachMessagesTable)
    .where(and(
      eq(outreachMessagesTable.campaignId, campaignId),
      isNotNull(outreachMessagesTable.sentAt),
    ));
  return new Set(sentMessages.map(({ sentAt }) => phoenixDateKey(sentAt!))).size;
}

async function reserveDailySend(message: OutreachMessage, campaign: Campaign | undefined): Promise<number> {
  const quotaKey = `${campaign ? `campaign:${campaign.id}` : "standalone"}:${phoenixDateKey()}`;
  const activeSendDays = campaign ? await getCampaignActiveSendDays(campaign.id) : INITIAL_RAMP_ACTIVE_DAYS;
  const limit = getOutreachDailyLimit(campaign?.dailyLimit, activeSendDays);
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
    messages: [{ role: "system", content: "Return strict JSON only: {\"subject\":\"...\",\"body\":\"...\",\"followUps\":[{\"subject\":\"...\",\"body\":\"...\"},{\"subject\":\"...\",\"body\":\"...\"},{\"subject\":\"...\",\"body\":\"...\"}]}. Write concise, specific professional B2B outreach for Apex Grid Engineering—not a generic introduction. Open with a natural greeting using the supplied contactName, not 'Hi there' or a generic salutation. Keep the initial email to roughly 80-120 words in three short paragraphs: lead with the prospect's one concrete pain point, state the one relevant Apex Grid solution, then end with one simple question. Make speed and price clear without overexplaining: engineering support can be too slow, oversized scopes can be extremely expensive, and Apex Grid right-sizes the work with clear pricing before it starts. Mention only the capability relevant to the supplied need, such as plan-review response, field investigation, permit-ready or PE-stamped Civil, Structural, or MEP documents, targeted code analysis, or coordination. Apex Grid's licensed Civil, Structural, and MEP PEs can stamp our designs. When the supplied need fits a focused review or design response, it is accurate to say we typically provide a 12-24 hour turnaround; do not present that timing as a guarantee for a complex or undefined scope. A brief veteran-owned mention is optional and should never replace the project-specific reason to respond. Avoid long capability lists, marketing language, competitor comparisons, unsupported savings claims, repeated points, and lists of hypothetical issues in the closing. Prefer the direct closing 'Do you have a current project we can help with?' or a similarly short one-question call to action. Use only supplied public research notes and the explicitly provided Apex Grid capabilities; never invent claims, projects, prices, turnaround times, ownership status, or facts. Keep follow-ups shorter than the initial email and focused on one next step." },
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

  const unsubscribeUrl = makeUnsubscribeUrl(email);
  const oneClickUrl = makeOneClickUnsubscribeUrl(email);
  if (!unsubscribeUrl || !oneClickUrl) throw new Error("Unsubscribe signing is not configured");
  const emailContent = renderBrandedEmail(message.body, unsubscribeUrl, currentProspect.contactName ?? undefined);
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
          "List-Unsubscribe": `<${oneClickUrl}>`,
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
      content: [
        { type: "text/plain", value: emailContent.plainText },
        { type: "text/html", value: emailContent.html },
      ],
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