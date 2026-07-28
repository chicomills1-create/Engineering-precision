/**
 * Quarterly state-data review email.
 *
 * Runs the same staleness check as review-report.ts and emails the result via
 * the SendGrid connector, so the quarterly review happens without anyone
 * remembering to run it. Intended to run as a Replit Scheduled Deployment
 * (e.g. 9am on the 1st of Jan/Apr/Jul/Oct: `0 9 1 1,4,7,10 *`).
 *
 * Usage:
 *   pnpm --filter @workspace/apex-grid run seo:review:email
 *   pnpm --filter @workspace/apex-grid run seo:review:email -- --dry-run
 *
 * Configuration (env vars):
 *   REVIEW_NOTIFY_EMAIL       recipient (falls back to LEAD_NOTIFY_EMAIL)
 *   REVIEW_NOTIFY_FROM_EMAIL  SendGrid-verified sender
 *                             (falls back to LEAD_NOTIFY_FROM_EMAIL, then recipient)
 *
 * Exits non-zero when the email cannot be sent, so a failed run is visible in
 * the scheduled deployment's logs/status.
 */
import { ReplitConnectors } from "@replit/connectors-sdk";
import { buildReviewReport, STALE_MONTHS, type ReviewRow } from "./review-core";

const dryRun = process.argv.includes("--dry-run");

const to = process.env.REVIEW_NOTIFY_EMAIL || process.env.LEAD_NOTIFY_EMAIL;
const from = process.env.REVIEW_NOTIFY_FROM_EMAIL || process.env.LEAD_NOTIFY_FROM_EMAIL || to;

if (!to || !from) {
  console.error(
    "REVIEW_NOTIFY_EMAIL (or LEAD_NOTIFY_EMAIL) is not set; cannot send the review email.",
  );
  process.exit(1);
}

const report = await buildReviewReport();
const date = report.generatedAt.toISOString().slice(0, 10);

const pad = (v: string, w: number) => (v.length > w ? v.slice(0, w - 1) + "…" : v.padEnd(w));
const rowLine = (r: ReviewRow) =>
  (r.stale ? "! " : "  ") +
  pad(r.state, 16) +
  pad(r.lastVerified, 12) +
  pad(`${r.ageDays}d`, 8) +
  pad(r.buildingCode, 44) +
  r.energyCode;

const subject =
  report.stale.length > 0
    ? `State code review: ${report.stale.length} state(s) need verification (${date})`
    : `State code review: all states current (${date})`;

const bodyLines: string[] = [
  `Quarterly state code data review — ${date}`,
  `${report.rows.length} states checked; entries not verified in the last ${STALE_MONTHS} months are flagged.`,
  "",
];

if (report.stale.length > 0) {
  bodyLines.push(
    `NEEDS REVIEW (${report.stale.length}): ${report.stale.map((r) => r.state).join(", ")}`,
    "",
    "For each flagged state: verify against the current ICC adoption map / state code",
    "board, update the state file in artifacts/apex-grid/seo/states/ (including",
    "lastVerified), then regenerate the pages with:",
    "  pnpm --filter @workspace/apex-grid run seo:generate",
    "",
  );
} else {
  bodyLines.push("All states have been verified within the last 9 months. Nothing to do.", "");
}

bodyLines.push(
  "Full listing (oldest first, ! = needs review):",
  "",
  pad("  STATE", 18) + pad("VERIFIED", 12) + pad("AGE", 8) + pad("BUILDING CODE", 44) + "ENERGY CODE",
  ...report.rows.map(rowLine),
);

const body = bodyLines.join("\n");

if (dryRun) {
  console.log(`[dry-run] Would send to ${to} (from ${from})`);
  console.log(`[dry-run] Subject: ${subject}\n`);
  console.log(body);
  process.exit(0);
}

const connectors = new ReplitConnectors();
const response = await connectors.proxy("sendgrid", "/v3/mail/send", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    personalizations: [{ to: [{ email: to }] }],
    from: { email: from, name: "Apex Grid Engineering — Quarterly Code Review" },
    subject,
    content: [{ type: "text/plain", value: body }],
  }),
});

// POST /v3/mail/send returns 202 with an empty body on success — don't .json() it.
if (!response.ok) {
  const errorBody = await response.text().catch(() => "");
  console.error(`SendGrid responded ${response.status}: ${errorBody}`);
  process.exit(1);
}

console.log(`Review email sent to ${to} — ${subject}`);
