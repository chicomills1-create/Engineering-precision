import { ReplitConnectors } from "@replit/connectors-sdk";
import { openai } from "@workspace/integrations-openai-ai-server";
import { and, count, eq, gte, isNull } from "drizzle-orm";
import {
  campaignsTable,
  db,
  outreachMessagesTable,
  outreachSuppressionsTable,
  prospectsTable,
  type Campaign,
  type OutreachMessage,
  type Prospect,
} from "@workspace/db";
import { getPublicBaseUrl, makeUnsubscribeToken } from "./unsubscribeToken";

export type GeneratedDraft = { subject: string; body: string; followUps: { subject: string; body: string }[] };

export async function generateProspectDraft(prospect: Prospect): Promise<GeneratedDraft> {
  const completion = await openai.chat.completions.create({
    model: "gpt-5.6-luna",
    max_completion_tokens: 8192,
    response_format: { type: "json_object" },
    messages: [{ role: "system", content: "Return strict JSON only: {\"subject\":\"...\",\"body\":\"...\",\"followUps\":[{\"subject\":\"...\",\"body\":\"...\"},{\"subject\":\"...\",\"body\":\"...\"},{\"subject\":\"...\",\"body\":\"...\"}]}. Write concise professional B2B outreach for Apex Grid Engineering. Tailor to the decision-maker's role and architect or builder audience. Use only supplied public research notes; never invent claims, projects, or facts." },
      { role: "user", content: JSON.stringify({ companyName: prospect.companyName, audience: prospect.audience, contactName: prospect.contactName, contactTitle: prospect.contactTitle, researchNotes: prospect.researchNotes ?? "" }) }],
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
  const email = prospect.contactEmail.trim().toLowerCase();
  if (message.status !== "approved") throw new Error("Message must be approved before sending");
  if (prospect.emailStatus !== "verified") throw new Error("Prospect email must be verified before sending");
  if (campaign && campaign.status !== "active") throw new Error("Campaign must be active before sending");
  const [suppression] = await db.select({ id: outreachSuppressionsTable.id }).from(outreachSuppressionsTable).where(eq(outreachSuppressionsTable.email, email)).limit(1);
  if (suppression) throw new Error("Address is suppressed");

  const dayStart = new Date();
  dayStart.setHours(0, 0, 0, 0);
  const limit = campaign?.dailyLimit ?? 10;
  const scope = campaign ? eq(outreachMessagesTable.campaignId, campaign.id) : isNull(outreachMessagesTable.campaignId);
  const [sent] = await db.select({ value: count() }).from(outreachMessagesTable).where(and(scope, gte(outreachMessagesTable.sentAt, dayStart)));
  if ((sent?.value ?? 0) >= limit) throw new Error("Daily send limit reached");

  const token = makeUnsubscribeToken(email);
  const baseUrl = getPublicBaseUrl();
  if (!token || !baseUrl) throw new Error("Unsubscribe signing is not configured");
  const unsubscribe = `${baseUrl}/api/outreach/unsubscribe?${new URLSearchParams({ email, token })}`;
  const oneClick = unsubscribe;
  const body = `${message.body}\n\n— Apex Grid Engineering\n22475 E Quintero Rd, Queen Creek, AZ 85142\n\nUnsubscribe: ${unsubscribe}`;
  const from = process.env.OUTREACH_FROM_EMAIL;
  if (!from) throw new Error("OUTREACH_FROM_EMAIL is not configured");
  const response = await new ReplitConnectors().proxy("sendgrid", "/v3/mail/send", {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ personalizations: [{ to: [{ email }], headers: { "List-Unsubscribe": `<${oneClick}>`, "List-Unsubscribe-Post": "List-Unsubscribe=One-Click" } }], from: { email: from, name: "Apex Grid Engineering" }, subject: message.subject, content: [{ type: "text/plain", value: body }] }),
  });
  if (!response.ok) throw new Error(`SendGrid responded ${response.status}`);
  return { providerMessageId: response.headers.get("x-message-id") ?? undefined };
}