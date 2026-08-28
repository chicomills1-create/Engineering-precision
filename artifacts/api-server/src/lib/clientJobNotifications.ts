import { ReplitConnectors } from "@replit/connectors-sdk";
import type {
  ClientJob,
  ClientJobDocument,
} from "@workspace/db";
import { signDownloadPath } from "./downloadToken";

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