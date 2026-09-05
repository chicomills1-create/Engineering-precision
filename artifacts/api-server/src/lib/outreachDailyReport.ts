import { ReplitConnectors } from "@replit/connectors-sdk";
import type { DailyOutreachRunnerResult } from "./outreachDailyRunner";

export function buildDailyOutreachReport(
  runDate: string,
  result: DailyOutreachRunnerResult,
): { subject: string; body: string } {
  return {
    subject: `Apex Grid outreach ${runDate}: ${result.providerAccepted} provider accepted`,
    body: [
      `Phoenix date: ${runDate}`,
      "",
      "Today's dispatch evidence",
      `Claimed: ${result.claimed}`,
      `Provider accepted: ${result.providerAccepted}`,
      `Delivered at reconciliation: ${result.delivered}`,
      `Bounced/rejected: ${result.bounced}`,
      `Stopped by safeguards: ${result.stopped}`,
      `Unresolved: ${result.unresolved}`,
      "",
      "Next Phoenix day's prepared queue",
      `Direct prepared: ${result.directPrepared}`,
      `Direct shortfall: ${result.directShortfall}`,
      `Public prepared: ${result.publicPrepared}`,
      `Public shortfall: ${result.publicShortfall}`,
      `Regular prepared total: ${result.regularPrepared}`,
      `Regular shortfall: ${result.regularShortfall}`,
      `Hot Market prepared this run: ${result.hotMarketPrepared}`,
      `Hot Market scheduled total: ${result.hotMarketScheduled}`,
      `Hot Market shortfall: ${result.hotMarketShortfall}`,
      "",
      result.unresolved === 0
        ? "No ambiguous provider handoffs remain from this run."
        : "Ambiguous provider handoffs remain blocked from automatic resend.",
    ].join("\n"),
  };
}

export async function sendDailyOutreachReport(
  runDate: string,
  result: DailyOutreachRunnerResult,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const to = process.env.LEAD_NOTIFY_EMAIL?.trim();
  const from = (
    process.env.LEAD_NOTIFY_FROM_EMAIL
    || process.env.OUTREACH_FROM_EMAIL
    || to
  )?.trim();
  if (!to || !from) {
    return { ok: false, error: "Daily outreach report email is not configured" };
  }

  const report = buildDailyOutreachReport(runDate, result);
  try {
    const response = await new ReplitConnectors().proxy("sendgrid", "/v3/mail/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        personalizations: [{ to: [{ email: to }] }],
        from: { email: from, name: "Apex Grid Outreach Automation" },
        subject: report.subject,
        content: [{ type: "text/plain", value: report.body }],
      }),
    });
    if (!response.ok) {
      const errorBody = await response.text().catch(() => "");
      return {
        ok: false,
        error: `SendGrid report response ${response.status}: ${errorBody}`,
      };
    }
    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Daily outreach report failed",
    };
  }
}