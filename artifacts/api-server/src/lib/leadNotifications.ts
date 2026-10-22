import type { LeadInput } from "@workspace/api-zod";
import { signDownloadPath } from "./downloadToken";
import {
  graphInternalSender,
  sendGraphMail,
  type GraphMailMessage,
} from "./graphMail";
import { humanizeServices } from "./clientJobNotifications";
import { logger } from "./logger";

const ESTIMATE_NOTIFICATION_EMAIL = "info@apexgrideng.com";

type MailTransport = (
  message: GraphMailMessage,
) => Promise<{ ok: true } | { ok: false; error: string }>;

function formatReceivedPhoenix(value: Date): string {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Phoenix",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(value);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  return `${get("year")}-${get("month")}-${get("day")} ${get("hour")}:${get("minute")} MST`;
}

/**
 * The canonical internal notification (contact-simplification design §4):
 * who sent it, how to reach them, where the project is, what they need
 * done in their own words, when they need it, and their files. Transport
 * is Microsoft Graph (the fleet standard — the SendGrid plan cancels
 * 2026-11-01); internal mail sends as the fleet Graph identity.
 * Never throws — failures are logged by the caller and must not break
 * lead submission.
 */
export async function sendLeadNotificationEmail(
  lead: LeadInput,
  options: { transport?: MailTransport } = {},
): Promise<{ ok: true } | { ok: false; error: string }> {
  const isEstimateLead = lead.source === "estimate";
  const to = isEstimateLead
    ? ESTIMATE_NOTIFICATION_EMAIL
    : process.env.LEAD_NOTIFY_EMAIL;

  if (!to) {
    return {
      ok: false,
      error:
        "LEAD_NOTIFY_EMAIL is not configured; skipping lead notification email",
    };
  }

  const baseUrl = process.env.PUBLIC_SITE_URL || "https://apexgrideng.com";

  const fileLines: string[] = [];
  if (lead.attachments && lead.attachments.length > 0) {
    for (const objectPath of lead.attachments) {
      try {
        const token = signDownloadPath(objectPath);
        // objectPath is like /objects/contact-uploads/filename.pdf
        const wildcard = objectPath.replace(/^\/objects\//, "");
        const url = `${baseUrl}/api/storage/objects/${wildcard}?token=${token}`;
        const filename = objectPath.split("/").pop() ?? objectPath;
        fileLines.push(`  - ${filename}: ${url}`);
      } catch {
        fileLines.push(`  - ${objectPath} (download link unavailable — SESSION_SECRET not configured)`);
      }
    }
  } else {
    fileLines.push("  none uploaded");
  }

  const need = humanizeServices(lead.services) || lead.projectType || "";
  const needBlock: string[] = [];
  if (need) needBlock.push(need);
  if (lead.projectType && lead.projectType !== need) {
    needBlock.push(lead.projectType);
  }
  needBlock.push(lead.message);

  const location = lead.projectLocation?.trim() || "—";
  const lines = [
    "New Apex project inquiry",
    `Received: ${formatReceivedPhoenix(new Date())}`,
    `Source: ${lead.landingPath || (isEstimateLead ? "/estimate" : "/contact")}`,
    "",
    `Name:    ${lead.name}`,
    `Email:   ${lead.email}`,
    `Phone:   ${lead.phone || "—"}`,
    `Company: ${lead.company || "—"}`,
    "",
    `Project location: ${location}`,
    "What they need done:",
    ...needBlock,
    "",
    `When they need it: ${lead.whenNeeded?.trim() || "Not specified"}`,
    "",
    "Files:",
    ...fileLines,
  ];

  const subject = [
    "Apex intake",
    need || "Project inquiry",
    location !== "—" ? location : null,
    lead.name,
  ]
    .filter((part): part is string => Boolean(part))
    .join(" — ");

  const send = options.transport ?? sendGraphMail;
  const result = await send({
    from: graphInternalSender(),
    fromName: "Apex Grid Engineering Website",
    to,
    replyTo: lead.email,
    replyToName: lead.name,
    subject,
    text: lines.join("\n"),
  });
  if (!result.ok) {
    logger.error(
      { error: result.error, to, subject },
      "Lead notification email failed",
    );
    return result;
  }
  return { ok: true };
}
