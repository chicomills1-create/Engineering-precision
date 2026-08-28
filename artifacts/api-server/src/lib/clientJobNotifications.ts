import { ReplitConnectors } from "@replit/connectors-sdk";
import type {
  ClientJob,
  ClientJobDocument,
} from "@workspace/db";
import { signDownloadPath } from "./downloadToken";

export const CLIENT_NOTIFICATION_STATUSES = ["needs_information", "quoted"] as const;
export type ClientNotificationStatus = (typeof CLIENT_NOTIFICATION_STATUSES)[number];

export function isClientNotificationStatus(
  status: string,
): status is ClientNotificationStatus {
  return CLIENT_NOTIFICATION_STATUSES.includes(status as ClientNotificationStatus);
}

const statusLabel: Record<ClientNotificationStatus, string> = {
  needs_information: "Needs information",
  quoted: "Quote ready",
};

function publicSiteUrl(): string {
  return (process.env.PUBLIC_SITE_URL || "https://apexgrideng.com").replace(/\/+$/, "");
}

export function clientPortalUrl(): string {
  return `${publicSiteUrl()}/client-portal`;
}

export function buildClientJobNotificationPreview(
  job: ClientJob,
  status: ClientNotificationStatus,
) {
  const label = statusLabel[status];
  const subject =
    status === "needs_information"
      ? `Apex Grid needs information about your ${job.projectType} project`
      : `Your Apex Grid ${job.projectType} project quote is ready`;
  const body = [
    `Hi ${job.submitterName},`,
    "",
    `Your ${job.projectType} project${job.companyName ? ` for ${job.companyName}` : ""} has been updated.`,
    `Current status: ${label}`,
    "",
    status === "needs_information"
      ? "Please sign in to your client portal to review the latest update and provide any information Apex Grid needs to continue."
      : "Please sign in to your client portal to review the latest update and next steps for your quote.",
    "",
    `View your project: ${clientPortalUrl()}`,
    "",
    "If you have questions, reply to this email and our team will help.",
    "",
    "Apex Grid Engineering",
  ].join("\n");

  return {
    status,
    recipient: job.submitterEmail,
    subject,
    body,
    portalUrl: clientPortalUrl(),
  };
}

export async function sendClientJobNotificationEmail(
  job: ClientJob,
  documents: ClientJobDocument[],
): Promise<{ ok: true } | { ok: false; error: string }> {
  const to = process.env.LEAD_NOTIFY_EMAIL;
  const from = process.env.LEAD_NOTIFY_FROM_EMAIL || to;
  if (!to || !from) {
    return {
      ok: false,
      error: "LEAD_NOTIFY_EMAIL is not configured; skipping client job notification",
    };
  }

  const baseUrl = process.env.PUBLIC_SITE_URL || "https://apexgrideng.com";
  const attachmentLines = documents.map((document) => {
    const wildcard = document.objectPath.replace(/^\/objects\//, "");
    const token = signDownloadPath(document.objectPath);
    return `  ${document.name}: ${baseUrl}/api/storage/objects/${wildcard}?token=${encodeURIComponent(token)}`;
  });
  const lines = [
    `Contact: ${job.submitterName}`,
    `Email: ${job.submitterEmail}`,
    job.submitterPhone ? `Phone: ${job.submitterPhone}` : null,
    job.companyName ? `Company: ${job.companyName}` : null,
    `Project type: ${job.projectType}`,
    `Location: ${job.projectLocation}`,
    `Services: ${job.services}`,
    job.timeline ? `Timeline: ${job.timeline}` : null,
    job.budgetContext ? `Budget context: ${job.budgetContext}` : null,
    "",
    "Scope:",
    job.scope,
    ...(attachmentLines.length > 0 ? ["", "Documents:", ...attachmentLines] : []),
    "",
    `Review: ${baseUrl}/admin`,
  ].filter((line): line is string => line !== null);

  const connectors = new ReplitConnectors();
  const response = await connectors.proxy("sendgrid", "/v3/mail/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      personalizations: [{ to: [{ email: to }] }],
      from: { email: from, name: "Apex Grid Engineering Client Portal" },
      reply_to: { email: job.submitterEmail, name: job.submitterName },
      subject: `New client project: ${job.projectType}${job.companyName ? ` — ${job.companyName}` : ""}`,
      content: [{ type: "text/plain", value: lines.join("\n") }],
    }),
  });
  if (!response.ok) {
    const errorBody = await response.text().catch(() => "");
    return {
      ok: false,
      error: `SendGrid responded ${response.status}: ${errorBody}`,
    };
  }
  return { ok: true };
}

export async function sendClientJobStatusNotificationEmail(
  job: ClientJob,
  status: ClientNotificationStatus,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const from =
    process.env.STATUS_NOTIFICATION_FROM_EMAIL ||
    process.env.LEAD_NOTIFY_FROM_EMAIL ||
    process.env.LEAD_NOTIFY_EMAIL;
  if (!from) {
    return {
      ok: false,
      error: "STATUS_NOTIFICATION_FROM_EMAIL is not configured; skipping client status notification",
    };
  }

  const preview = buildClientJobNotificationPreview(job, status);
  try {
    const response = await new ReplitConnectors().proxy("sendgrid", "/v3/mail/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        personalizations: [{ to: [{ email: preview.recipient }] }],
        from: { email: from, name: "Apex Grid Engineering Client Portal" },
        subject: preview.subject,
        content: [{ type: "text/plain", value: preview.body }],
      }),
    });
    if (!response.ok) {
      const errorBody = await response.text().catch(() => "");
      return {
        ok: false,
        error: `SendGrid responded ${response.status}: ${errorBody}`,
      };
    }
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Unable to send client status notification",
    };
  }

  return { ok: true };
}