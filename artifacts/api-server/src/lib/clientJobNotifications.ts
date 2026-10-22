import type {
  ClientJob,
  ClientJobDocument,
} from "@workspace/db";
import { signDownloadPath } from "./downloadToken";
import { escapeEmailHtml } from "./emailMarkup";
import {
  graphCustomerSender,
  graphInternalSender,
  sendGraphMail,
  type GraphMailMessage,
} from "./graphMail";
import { logger } from "./logger";

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

export function buildClientJobNotificationHtml(
  preview: ReturnType<typeof buildClientJobNotificationPreview>,
): string {
  const paragraphs = preview.body.split("\n\n").map((paragraph) => {
    const safeParagraph = escapeEmailHtml(paragraph).replaceAll("\n", "<br>");
    return `<p style="margin:0 0 18px;color:#273449;font-size:16px;line-height:1.6;word-break:break-word;overflow-wrap:anywhere;">${safeParagraph}</p>`;
  }).join("");
  const safePortalUrl = escapeEmailHtml(preview.portalUrl);
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<style>@media only screen and (max-width:600px){.email-shell{padding:20px 14px !important;}.email-content{width:100% !important;}}</style>
</head><body style="margin:0;padding:0;background:#ffffff;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td class="email-shell" style="padding:28px 18px;"><table class="email-content" role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:640px;"><tr><td style="font-family:Arial,Helvetica,sans-serif;">
${paragraphs}
<p style="margin:0;"><a href="${safePortalUrl}" style="color:#245b8f;font-size:16px;font-weight:700;">View your project</a></p>
</td></tr></table></td></tr></table></body></html>`;
}

/**
 * Canonical plain-words rendering of a services string.
 *
 * Legacy estimate rows store machine slugs ("permit-set",
 * "calculations-stamped-drawings — Disciplines: mechanical, ...").
 * Notifications are read by people, so known slugs become plain words
 * and discipline lists are capitalized; free-text values pass through.
 */
const SERVICE_SLUG_LABELS: Record<string, string> = {
  "permit-set": "Permit set",
  "calculations-stamped-drawings": "Calculations + stamped drawings",
  "stamped-drawings": "Stamped drawings",
  "calculations": "Calculations",
  "design": "Design",
  "pe-stamp": "PE stamp",
  "pe-review-sealing": "PE review + sealing",
  "engineering-calculations": "Engineering calculations",
  "partner-routing": "Partner routing",
};

export function humanizeServices(raw: string | null | undefined): string {
  const value = (raw ?? "").trim();
  if (!value) return "";
  return value
    .split(" — ")
    .map((part) => {
      const trimmed = part.trim();
      const disciplineMatch = /^Disciplines:\s*(.+)$/i.exec(trimmed);
      if (disciplineMatch) {
        const list = disciplineMatch[1]
          .split(",")
          .map((d) => {
            const word = d.trim();
            return word ? word.charAt(0).toUpperCase() + word.slice(1) : word;
          })
          .filter(Boolean)
          .join(", ");
        return list;
      }
      const slug = trimmed.toLowerCase();
      if (SERVICE_SLUG_LABELS[slug]) return SERVICE_SLUG_LABELS[slug];
      if (/^[a-z0-9]+(-[a-z0-9]+)+$/.test(trimmed)) {
        const words = trimmed.replace(/-/g, " ");
        return words.charAt(0).toUpperCase() + words.slice(1);
      }
      return trimmed;
    })
    .filter(Boolean)
    .join(" — ");
}

function formatReceivedPhoenix(value: Date | string | null | undefined): string {
  const date = value ? new Date(value) : new Date();
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Phoenix",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(date);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  return `${get("year")}-${get("month")}-${get("day")} ${get("hour")}:${get("minute")} MST`;
}

function estimateSnapshotOf(job: ClientJob): Record<string, unknown> | null {
  return job.estimateSnapshot && typeof job.estimateSnapshot === "object"
    ? (job.estimateSnapshot as Record<string, unknown>)
    : null;
}

function jobLocation(job: ClientJob): string {
  const base = (job.projectLocation ?? "").trim();
  const snapshot = estimateSnapshotOf(job);
  const intake =
    snapshot?.intake && typeof snapshot.intake === "object"
      ? (snapshot.intake as Record<string, unknown>)
      : null;
  const state = typeof intake?.state === "string" ? intake.state.trim() : "";
  if (base && state && !base.includes(",")) {
    return `${base}, ${state}`;
  }
  return base || state || "—";
}

function jobNeedLines(job: ClientJob): string[] {
  const snapshot = estimateSnapshotOf(job);
  const partnerRoute =
    job.servicePath === "partner-routing" ||
    job.routingMode === "partner" ||
    Boolean(snapshot?.partnerProfile || snapshot?.partnerQualification);
  if (partnerRoute) {
    const profile =
      snapshot?.partnerProfile && typeof snapshot.partnerProfile === "object"
        ? (snapshot.partnerProfile as Record<string, unknown>)
        : null;
    const lines = ["Partner program intake."];
    if (profile) {
      const states = Array.isArray(profile.states) ? profile.states.map(String).join(", ") : "";
      const disciplines = Array.isArray(profile.disciplines) ? profile.disciplines.map(String).join(", ") : "";
      if (states) lines.push(`States: ${states}`);
      if (disciplines) lines.push(`Disciplines: ${disciplines}`);
      if (profile.volume) lines.push(`Volume: ${String(profile.volume)}`);
      if (profile.workflow) lines.push(`Workflow: ${String(profile.workflow)}`);
    }
    return lines;
  }
  const lines: string[] = [];
  const services = humanizeServices(job.services);
  if (services) lines.push(services);
  if (job.projectType) lines.push(job.projectType);
  const scope = (job.scope ?? "").trim();
  if (scope && scope !== "Estimate proposal intake" && scope !== job.projectType) {
    lines.push(scope);
  }
  return lines.length > 0 ? lines : ["Engineering services to be confirmed"];
}

/**
 * The canonical internal notification (contact-simplification design §4):
 * who sent it, how to reach them, where the project is, what they need
 * done in plain words, when they need it, and their files. No estimate
 * IDs, no routing/schedule/coverage codes, no prices, no factor data.
 */
export function buildEstimateProposalNotificationContent(
  job: ClientJob,
  documents: ClientJobDocument[],
): { subject: string; body: string } {
  const baseUrl = publicSiteUrl();
  const location = jobLocation(job);
  const needLines = jobNeedLines(job);
  const needSummary = needLines[0] ?? "Project inquiry";
  const fileLines =
    documents.length > 0
      ? documents.map((document) => {
          const wildcard = document.objectPath.replace(/^\/objects\//, "");
          const token = signDownloadPath(document.objectPath);
          return `  - ${document.name}: ${baseUrl}/api/storage/objects/${wildcard}?token=${encodeURIComponent(token)}`;
        })
      : ["  none uploaded"];
  const lines = [
    "New Apex project inquiry",
    `Received: ${formatReceivedPhoenix(job.createdAt)}`,
    `Source: ${job.estimateId ? "/estimate" : "/client-portal"}`,
    "",
    `Name:    ${job.submitterName}`,
    `Email:   ${job.submitterEmail}`,
    `Phone:   ${job.submitterPhone || "—"}`,
    `Company: ${job.companyName || "—"}`,
    "",
    `Project location: ${location}`,
    "What they need done:",
    ...needLines,
    "",
    `When they need it: ${job.requiredByDate || "Not specified"}`,
    "",
    "Files:",
    ...fileLines,
  ];
  const subject = `Apex intake — ${needSummary} — ${location} — ${job.submitterName}`;
  return { subject, body: lines.join("\n") };
}

type MailTransport = (
  message: GraphMailMessage,
) => Promise<{ ok: true } | { ok: false; error: string }>;

export async function sendClientJobNotificationEmail(
  job: ClientJob,
  documents: ClientJobDocument[],
  options: { transport?: MailTransport } = {},
): Promise<{ ok: true } | { ok: false; error: string }> {
  const to = process.env.LEAD_NOTIFY_EMAIL;
  if (!to) {
    return {
      ok: false,
      error: "LEAD_NOTIFY_EMAIL is not configured; skipping client job notification",
    };
  }

  const { subject, body } = buildEstimateProposalNotificationContent(job, documents);
  const send = options.transport ?? sendGraphMail;
  // Internal notification to the hub — the fleet Graph identity is the
  // sanctioned sender for internal mail (invisible to customers).
  const result = await send({
    from: graphInternalSender(),
    fromName: "Apex Grid Engineering Client Portal",
    to,
    replyTo: job.submitterEmail,
    replyToName: job.submitterName,
    subject,
    text: body,
  });
  if (!result.ok) {
    logger.error(
      { error: result.error, to, subject },
      "Client job notification email failed",
    );
    return result;
  }
  return { ok: true };
}

export async function sendClientJobStatusNotificationEmail(
  job: ClientJob,
  status: ClientNotificationStatus,
  options: { transport?: MailTransport } = {},
): Promise<{ ok: true } | { ok: false; error: string }> {
  // Customer-facing mail sends ONLY as info@apexgrideng.com via Graph —
  // the brand face. There is deliberately no other sender fallback: if
  // Graph cannot send as that address, the send fails and is logged.
  const from = graphCustomerSender();
  const preview = buildClientJobNotificationPreview(job, status);
  const replyTo =
    process.env.STATUS_NOTIFICATION_REPLY_TO_EMAIL?.trim() ||
    process.env.OUTREACH_REPLY_TO_EMAIL?.trim() ||
    from;
  const send = options.transport ?? sendGraphMail;
  const result = await send({
    from,
    fromName: "Apex Grid Engineering Client Portal",
    to: preview.recipient,
    replyTo,
    replyToName: "Apex Grid Engineering",
    subject: preview.subject,
    text: preview.body,
    html: buildClientJobNotificationHtml(preview),
  });
  if (!result.ok) {
    logger.error(
      { error: result.error, to: preview.recipient, subject: preview.subject },
      "Client status notification email failed",
    );
    return result;
  }
  return { ok: true };
}
