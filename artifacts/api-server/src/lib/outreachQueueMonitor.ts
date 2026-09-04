import { ReplitConnectors } from "@replit/connectors-sdk";
import { and, count, eq, inArray, lte, min, max } from "drizzle-orm";
import {
  db,
  outreachMessagesTable,
  outreachQueueAlertsTable,
} from "@workspace/db";

export const OUTREACH_QUEUE_GRACE_MS = 5 * 60 * 1000;
const INCIDENT_KEY = "scheduled-outreach-overdue";

export type OutreachQueueAlertSummary = {
  overdueCount: number;
  scheduledFrom: Date;
  scheduledThrough: Date;
  providerAmbiguousCount: number;
  deliveryFailureCount: number;
};

export type OutreachQueueMonitorResult =
  | { state: "clear" }
  | { state: "deduplicated"; summary: OutreachQueueAlertSummary }
  | { state: "alerted"; summary: OutreachQueueAlertSummary }
  | { state: "failed"; summary: OutreachQueueAlertSummary; error: string };

type QueueSummaryLoader = (cutoff: Date) => Promise<OutreachQueueAlertSummary | null>;

function adminEmails(): string[] {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((email) => email.trim())
    .filter(Boolean);
}

function alertFromEmail(): string | undefined {
  return process.env.LEAD_NOTIFY_FROM_EMAIL?.trim()
    || process.env.OUTREACH_FROM_EMAIL?.trim()
    || adminEmails()[0];
}

export function buildOutreachQueueAlertBody(summary: OutreachQueueAlertSummary): string {
  return [
    "Scheduled outreach is still waiting in the approved queue after the 5-minute grace period.",
    "",
    `Approved and overdue: ${summary.overdueCount}`,
    `Scheduled window: ${summary.scheduledFrom.toISOString()} through ${summary.scheduledThrough.toISOString()}`,
    "",
    `Provider ambiguity (sending/needs review): ${summary.providerAmbiguousCount}`,
    `Known delivery failures (failed/bounced): ${summary.deliveryFailureCount}`,
    "",
    "This alert indicates scheduler inactivity for the approved queue. Provider ambiguity and known delivery failures are shown separately and are not automatically retried by this monitor.",
    "Normal recovery remains protected by database claims, suppression checks, quotas, and reconciliation locks.",
  ].join("\n");
}

async function sendAlert(summary: OutreachQueueAlertSummary): Promise<void> {
  const to = adminEmails();
  const from = alertFromEmail();
  if (to.length === 0 || !from) throw new Error("Admin alert email is not configured");

  const response = await new ReplitConnectors().proxy("sendgrid", "/v3/mail/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      personalizations: [{ to: to.map((email) => ({ email })) }],
      from: { email: from, name: "Apex Grid Outreach Monitor" },
      subject: `[Action required] ${summary.overdueCount} scheduled outreach email${summary.overdueCount === 1 ? "" : "s"} still queued`,
      content: [{ type: "text/plain", value: buildOutreachQueueAlertBody(summary) }],
    }),
  });
  if (!response.ok) {
    throw new Error(`SendGrid responded ${response.status}: ${await response.text().catch(() => "")}`);
  }
}

async function loadQueueSummary(cutoff: Date): Promise<OutreachQueueAlertSummary | null> {
  const [overdue] = await db.select({
    count: count(),
    scheduledFrom: min(outreachMessagesTable.scheduledAt),
    scheduledThrough: max(outreachMessagesTable.scheduledAt),
  }).from(outreachMessagesTable).where(and(
    eq(outreachMessagesTable.status, "approved"),
    lte(outreachMessagesTable.scheduledAt, cutoff),
  ));
  const overdueCount = Number(overdue?.count ?? 0);
  if (overdueCount === 0 || !overdue?.scheduledFrom || !overdue.scheduledThrough) return null;

  const [providerAmbiguous, deliveryFailures] = await Promise.all([
    db.select({ count: count() }).from(outreachMessagesTable)
      .where(inArray(outreachMessagesTable.status, ["sending", "needs_review"])),
    db.select({ count: count() }).from(outreachMessagesTable)
      .where(inArray(outreachMessagesTable.status, ["failed", "bounced"])),
  ]);
  return {
    overdueCount,
    scheduledFrom: overdue.scheduledFrom,
    scheduledThrough: overdue.scheduledThrough,
    providerAmbiguousCount: Number(providerAmbiguous[0]?.count ?? 0),
    deliveryFailureCount: Number(deliveryFailures[0]?.count ?? 0),
  };
}

export async function monitorOverdueOutreachQueue(options: {
  now?: Date;
  graceMs?: number;
  notify?: (summary: OutreachQueueAlertSummary) => Promise<void>;
  loadSummary?: QueueSummaryLoader;
} = {}): Promise<OutreachQueueMonitorResult> {
  const now = options.now ?? new Date();
  const cutoff = new Date(now.getTime() - (options.graceMs ?? OUTREACH_QUEUE_GRACE_MS));
  const summary = await (options.loadSummary ?? loadQueueSummary)(cutoff);
  if (!summary) {
    await db.delete(outreachQueueAlertsTable).where(eq(outreachQueueAlertsTable.incidentKey, INCIDENT_KEY));
    return { state: "clear" };
  }

  const [claimed] = await db.insert(outreachQueueAlertsTable).values({
    incidentKey: INCIDENT_KEY,
    overdueCount: summary.overdueCount,
    scheduledFrom: summary.scheduledFrom,
    scheduledThrough: summary.scheduledThrough,
    providerAmbiguousCount: summary.providerAmbiguousCount,
    deliveryFailureCount: summary.deliveryFailureCount,
  }).onConflictDoNothing({ target: outreachQueueAlertsTable.incidentKey }).returning();
  if (!claimed) return { state: "deduplicated", summary };

  try {
    await (options.notify ?? sendAlert)(summary);
    await db.update(outreachQueueAlertsTable).set({ status: "sent", sentAt: now })
      .where(eq(outreachQueueAlertsTable.id, claimed.id));
    return { state: "alerted", summary };
  } catch (error) {
    const detail = error instanceof Error ? error.message : "Admin alert failed";
    await db.delete(outreachQueueAlertsTable)
      .where(eq(outreachQueueAlertsTable.id, claimed.id));
    return { state: "failed", summary, error: detail };
  }
}