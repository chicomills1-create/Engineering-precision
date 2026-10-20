/**
 * Direct SendGrid transport for server-side notification email.
 *
 * The Apex app runs on Render. The Replit Connectors proxy can only work
 * inside a Repl — it resolves a Replit identity token (REPL_IDENTITY /
 * WEB_REPL_RENEWAL) before any network call, so on Render it throws on
 * every send. Notification modules must post straight to the SendGrid API
 * with the dedicated key instead — the same pattern already proven in
 * lib/outreach.ts and lib/clientMonthlyOutreach.ts.
 *
 * There is deliberately no Replit fallback here: a fallback that can only
 * throw is what made the lead-notification failure silent (Oct 2026 — two
 * real form leads persisted with no notification ever delivered).
 */

export interface SendGridSendResponse {
  ok: boolean;
  status: number;
  text(): Promise<string>;
}

export async function postSendGridMail(
  body: string,
): Promise<SendGridSendResponse> {
  const apiKey = process.env.SENDGRID_DEDICATED_API_KEY?.trim();
  if (!apiKey) {
    throw new Error(
      "SENDGRID_DEDICATED_API_KEY is not configured; cannot send email via the direct SendGrid API",
    );
  }
  return fetch("https://api.sendgrid.com/v3/mail/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body,
  });
}
