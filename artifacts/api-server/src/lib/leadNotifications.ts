import type { LeadInput } from "@workspace/api-zod";
import { signDownloadPath } from "./downloadToken";
import { logger } from "./logger";
import { postSendGridMail } from "./sendGridDirect";

const ESTIMATE_NOTIFICATION_EMAIL = "info@apexgrideng.com";

interface SendGridResponse {
  ok: boolean;
  status: number;
  text(): Promise<string>;
}

interface SendGridProxy {
  proxy(
    connector: string,
    path: string,
    options: {
      method: string;
      headers: Record<string, string>;
      body: string;
    },
  ): Promise<SendGridResponse>;
}

/**
 * Production transport: direct SendGrid API (see lib/sendGridDirect.ts).
 * The Replit Connectors proxy previously used here throws on Render —
 * it needs a Replit identity token that only exists inside a Repl — which
 * silently killed every lead notification after the Render migration.
 */
const directSendGridProxy: SendGridProxy = {
  proxy: (_connector, _path, options) => postSendGridMail(options.body),
};

/**
 * Sends a notification email about a new lead via the SendGrid connector.
 * Never throws — failures are logged by the caller and must not break
 * lead submission.
 */
export async function sendLeadNotificationEmail(
  lead: LeadInput,
  options: { connectors?: SendGridProxy } = {},
): Promise<{ ok: true } | { ok: false; error: string }> {
  const isEstimateLead = lead.source === "estimate";
  const to = isEstimateLead
    ? ESTIMATE_NOTIFICATION_EMAIL
    : process.env.LEAD_NOTIFY_EMAIL;
  const from =
    process.env.LEAD_NOTIFY_FROM_EMAIL || process.env.LEAD_NOTIFY_EMAIL;

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

  const subject = isEstimateLead
    ? "New RFQ lead — /estimate"
    : `New inquiry from ${lead.name}${lead.company ? ` (${lead.company})` : ""}`;

  const connectors = options.connectors ?? directSendGridProxy;
  let response: SendGridResponse;
  try {
    response = await connectors.proxy("sendgrid", "/v3/mail/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        personalizations: [{ to: [{ email: to }] }],
        from: { email: from, name: "Apex Grid Engineering Website" },
        reply_to: { email: lead.email, name: lead.name },
        subject,
        content: [{ type: "text/plain", value: lines.join("\n") }],
      }),
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown SendGrid transport error";
    logger.error(
      { err: error, to, subject },
      "Lead notification email failed",
    );
    return { ok: false, error: message };
  }

  // POST /v3/mail/send returns 202 with an empty body on success —
  // do not call .json() on it.
  if (!response.ok) {
    const errorBody = await response.text().catch(() => "");
    const error = `SendGrid responded ${response.status}: ${errorBody}`;
    logger.error({ error, to, subject }, "Lead notification email failed");
    return { ok: false, error };
  }

  return { ok: true };
}
