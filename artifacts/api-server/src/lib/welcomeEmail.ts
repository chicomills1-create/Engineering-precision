import { ReplitConnectors } from "@replit/connectors-sdk";
import {
  makeUnsubscribeUrl,
  makeOneClickUnsubscribeUrl,
} from "./unsubscribeToken";

/**
 * Sends a branded welcome/confirmation email to a new subscriber via the
 * SendGrid connector. Never throws — failures are logged by the caller and
 * must not break signup.
 */
export async function sendWelcomeEmail(
  subscriberEmail: string,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const from =
    process.env.LEAD_NOTIFY_FROM_EMAIL || process.env.LEAD_NOTIFY_EMAIL;

  if (!from) {
    return {
      ok: false,
      error:
        "LEAD_NOTIFY_FROM_EMAIL is not configured; skipping welcome email",
    };
  }

  // Signed unsubscribe links (undefined when no signing secret set).
  // unsubscribeUrl is the human-facing page for the email body;
  // oneClickUrl is the API endpoint mail providers POST to (RFC 8058).
  const unsubscribeUrl = makeUnsubscribeUrl(subscriberEmail);
  const oneClickUrl = makeOneClickUnsubscribeUrl(subscriberEmail);

  const text = [
    "Welcome to Apex Grid Engineering updates!",
    "",
    "Thanks for subscribing on our Resources page. You're confirmed, and",
    "you'll now receive occasional updates on electrical code changes,",
    "engineering resources, and industry news — no spam, just the",
    "information that matters for your projects.",
    "",
    "If you didn't sign up, you can safely ignore this email.",
    "",
    "— The Apex Grid Engineering Team",
    ...(unsubscribeUrl
      ? ["", `Unsubscribe any time with one click: ${unsubscribeUrl}`]
      : []),
  ].join("\n");

  const connectors = new ReplitConnectors();
  const response = await connectors.proxy("sendgrid", "/v3/mail/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      personalizations: [{ to: [{ email: subscriberEmail }] }],
      // RFC 8058 one-click unsubscribe headers for Gmail/Outlook compliance
      ...(oneClickUrl
        ? {
            headers: {
              "List-Unsubscribe": `<${oneClickUrl}>`,
              "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
            },
          }
        : {}),
      from: { email: from, name: "Apex Grid Engineering" },
      subject: "Welcome — you're subscribed to Apex Grid updates",
      content: [{ type: "text/plain", value: text }],
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
