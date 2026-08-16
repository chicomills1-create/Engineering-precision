import { ReplitConnectors } from "@replit/connectors-sdk";
import type { LeadInput } from "@workspace/api-zod";
import { signDownloadPath } from "./downloadToken";

/**
 * Sends a notification email about a new lead via the SendGrid connector.
 * Never throws — failures are logged by the caller and must not break
 * lead submission.
 */
export async function sendLeadNotificationEmail(
  lead: LeadInput,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const to = process.env.LEAD_NOTIFY_EMAIL;
  const from = process.env.LEAD_NOTIFY_FROM_EMAIL || to;

  if (!to || !from) {
    return {
      ok: false,
      error:
        "LEAD_NOTIFY_EMAIL is not configured; skipping lead notification email",
    };
  }

  const baseUrl = process.env.PUBLIC_SITE_URL || "https://apexgrideng.com";

  const attachmentLines: string[] = [];
  if (lead.attachments && lead.attachments.length > 0) {
    attachmentLines.push("", "Attachments:");
    for (const objectPath of lead.attachments) {
      try {
        const token = signDownloadPath(objectPath);
        // objectPath is like /objects/contact-uploads/filename.pdf
        const wildcard = objectPath.replace(/^\/objects\//, "");
        const url = `${baseUrl}/api/storage/objects/${wildcard}?token=${token}`;
        const filename = objectPath.split("/").pop() ?? objectPath;
        attachmentLines.push(`  ${filename}: ${url}`);
      } catch {
        attachmentLines.push(`  ${objectPath} (download link unavailable — SESSION_SECRET not configured)`);
      }
    }
  }

  const lines = [
    `Name: ${lead.name}`,
    `Email: ${lead.email}`,
    lead.company ? `Company: ${lead.company}` : null,
    lead.phone ? `Phone: ${lead.phone}` : null,
    lead.projectType ? `Project type: ${lead.projectType}` : null,
    lead.services ? `Services: ${lead.services}` : null,
    "",
    "Message:",
    lead.message,
    ...attachmentLines,
  ].filter((line): line is string => line !== null);

  const connectors = new ReplitConnectors();
  const response = await connectors.proxy("sendgrid", "/v3/mail/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      personalizations: [{ to: [{ email: to }] }],
      from: { email: from, name: "Apex Grid Engineering Website" },
      reply_to: { email: lead.email, name: lead.name },
      subject: `New inquiry from ${lead.name}${lead.company ? ` (${lead.company})` : ""}`,
      content: [{ type: "text/plain", value: lines.join("\n") }],
    }),
  });

  // POST /v3/mail/send returns 202 with an empty body on success —
  // do not call .json() on it.
  if (!response.ok) {
    const errorBody = await response.text().catch(() => "");
    return {
      ok: false,
      error: `SendGrid responded ${response.status}: ${errorBody}`,
    };
  }

  return { ok: true };
}
