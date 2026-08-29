import { ReplitConnectors } from "@replit/connectors-sdk";
import { and, eq, lt } from "drizzle-orm";
import {
  clientJobsTable,
  clientMonthlyEmailDeliveriesTable,
  db,
  outreachSuppressionsTable,
} from "@workspace/db";
import {
  makeOneClickUnsubscribeUrl,
  makeUnsubscribeUrl,
} from "./unsubscribeToken";
import { renderBrandedEmail } from "./emailMarkup";

const EMAIL_PATTERN = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const DELIVERY_AUDIT_RETENTION_MONTHS = 24;

export type ClientSafeListContact = {
  jobId: number;
  name: string;
  email: string;
  companyName: string | null;
  archivedAt: string;
  optedAt: string;
};

type SafeListJob = Pick<
  typeof clientJobsTable.$inferSelect,
  "id" | "submitterName" | "submitterEmail" | "companyName" | "archivedAt" | "monthlyEmailOptIn" | "monthlyEmailOptedAt"
>;

export function deriveClientMonthlySafeList(
  jobs: SafeListJob[],
  suppressedEmails: string[],
): ClientSafeListContact[] {
  const suppressed = new Set(suppressedEmails.map((email) => email.trim().toLowerCase()));
  const contacts = new Map<string, ClientSafeListContact>();
  for (const job of jobs) {
    const email = job.submitterEmail.trim().toLowerCase();
    if (
      !job.archivedAt ||
      !job.monthlyEmailOptIn ||
      !job.monthlyEmailOptedAt ||
      !EMAIL_PATTERN.test(email) ||
      suppressed.has(email)
    ) continue;
    const existing = contacts.get(email);
    if (!existing || job.archivedAt > new Date(existing.archivedAt)) {
      contacts.set(email, {
        jobId: job.id,
        name: job.submitterName,
        email,
        companyName: job.companyName,
        archivedAt: job.archivedAt.toISOString(),
        optedAt: job.monthlyEmailOptedAt.toISOString(),
      });
    }
  }
  return [...contacts.values()].sort((a, b) => a.email.localeCompare(b.email));
}

export async function getClientMonthlySafeList(): Promise<ClientSafeListContact[]> {
  const retentionCutoff = new Date();
  retentionCutoff.setUTCMonth(retentionCutoff.getUTCMonth() - DELIVERY_AUDIT_RETENTION_MONTHS);
  await db.delete(clientMonthlyEmailDeliveriesTable)
    .where(lt(clientMonthlyEmailDeliveriesTable.createdAt, retentionCutoff));
  const [jobs, suppressions] = await Promise.all([
    db.select().from(clientJobsTable),
    db.select({ email: outreachSuppressionsTable.email }).from(outreachSuppressionsTable),
  ]);
  return deriveClientMonthlySafeList(jobs, suppressions.map((row) => row.email));
}

export function clientMonthlyPeriodKey(date = new Date()): string {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Phoenix",
    year: "numeric",
    month: "2-digit",
  }).formatToParts(date);
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${values.year}-${values.month}`;
}

export async function claimClientMonthlyDelivery(
  contact: ClientSafeListContact,
  subject: string,
  body: string,
): Promise<number | null> {
  const [claimed] = await db.insert(clientMonthlyEmailDeliveriesTable).values({
    clientJobId: contact.jobId,
    recipientName: contact.name,
    recipientEmail: contact.email,
    periodKey: clientMonthlyPeriodKey(),
    subject,
    body,
    status: "sending",
  }).onConflictDoNothing().returning({ id: clientMonthlyEmailDeliveriesTable.id });
  return claimed?.id ?? null;
}

export async function sendClientMonthlyMessage(
  contact: ClientSafeListContact,
  subject: string,
  messageBody: string,
): Promise<{ providerMessageId?: string }> {
  const current = (await getClientMonthlySafeList()).find((item) => item.email === contact.email);
  if (!current) throw new Error("Contact is no longer eligible");
  const unsubscribeUrl = makeUnsubscribeUrl(contact.email);
  const oneClickUrl = makeOneClickUnsubscribeUrl(contact.email);
  if (!unsubscribeUrl || !oneClickUrl) throw new Error("Unsubscribe signing is not configured");
  const emailContent = renderBrandedEmail(messageBody, unsubscribeUrl);
  const from = process.env.OUTREACH_FROM_EMAIL;
  if (!from) throw new Error("OUTREACH_FROM_EMAIL is not configured");
  const replyTo = process.env.OUTREACH_REPLY_TO_EMAIL?.trim() || from;
  const requestBody = JSON.stringify({
    personalizations: [{
      to: [{ email: contact.email, name: contact.name }],
      headers: {
        "List-Unsubscribe": `<${oneClickUrl}>`,
        "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
      },
      custom_args: { client_monthly_job_id: String(contact.jobId) },
    }],
    from: { email: from, name: "Apex Grid Engineering" },
    reply_to: { email: replyTo, name: "Apex Grid Engineering" },
    subject,
    content: [
      { type: "text/plain", value: emailContent.plainText },
      { type: "text/html", value: emailContent.html },
    ],
  });
  const dedicatedKey = process.env.SENDGRID_ISOLATION_VERIFIED === "true"
    ? process.env.SENDGRID_DEDICATED_API_KEY?.trim()
    : undefined;
  const response = dedicatedKey
    ? await fetch("https://api.sendgrid.com/v3/mail/send", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${dedicatedKey}` },
        body: requestBody,
      })
    : await new ReplitConnectors().proxy("sendgrid", "/v3/mail/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: requestBody,
      });
  if (!response.ok) throw new Error(`SendGrid rejected the message with status ${response.status}`);
  return { providerMessageId: response.headers.get("x-message-id") ?? undefined };
}

export async function finishClientMonthlyDelivery(input: {
  deliveryId: number;
  status: "sent" | "failed";
  providerMessageId?: string;
  error?: string;
}) {
  await db.update(clientMonthlyEmailDeliveriesTable).set({
    status: input.status,
    providerMessageId: input.providerMessageId,
    error: input.error,
    sentAt: input.status === "sent" ? new Date() : null,
  }).where(and(
    eq(clientMonthlyEmailDeliveriesTable.id, input.deliveryId),
    eq(clientMonthlyEmailDeliveriesTable.status, "sending"),
  ));
}