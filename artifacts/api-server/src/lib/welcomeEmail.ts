import { ReplitConnectors } from "@replit/connectors-sdk";
import {
  makeUnsubscribeUrl,
  makeOneClickUnsubscribeUrl,
} from "./unsubscribeToken";
import { renderBrandedEmail, validateMarketingUnsubscribeUrl } from "./emailMarkup";

export function buildWelcomeEmailPayload(
  subscriberEmail: string,
  from: string,
  unsubscribeUrl: string | undefined,
  oneClickUrl: string | undefined,
) {
  if (!unsubscribeUrl || !oneClickUrl) {
    return { ok: false as const, error: "Unsubscribe signing is not configured; welcome email was not sent" };
  }
  let unsubscribe: URL;
  let oneClick: URL;
  try {
    unsubscribe = validateMarketingUnsubscribeUrl(unsubscribeUrl);
    oneClick = new URL(oneClickUrl);
    if (
      oneClick.protocol !== "https:"
      || oneClick.hostname !== unsubscribe.hostname
      || oneClick.pathname !== "/api/subscribers/one-click-unsubscribe"
    ) {
      throw new Error("Invalid one-click unsubscribe URL");
    }
  } catch {
    return { ok: false as const, error: "Secure unsubscribe links are unavailable; welcome email was not sent" };
  }
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
  ].join("\n");
  const emailContent = renderBrandedEmail(text, unsubscribe.toString());
  return {
    ok: true as const,
    payload: {
      personalizations: [{ to: [{ email: subscriberEmail }] }],
      headers: {
        "List-Unsubscribe": `<${oneClick.toString()}>`,
        "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
      },
      from: { email: from, name: "Apex Grid Engineering" },
      subject: "Welcome — you're subscribed to Apex Grid updates",
      content: [
        { type: "text/plain", value: emailContent.plainText },
        { type: "text/html" as const, value: emailContent.html },
      ],
    },
  };
}

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

  const built = buildWelcomeEmailPayload(subscriberEmail, from, unsubscribeUrl, oneClickUrl);
  if (!built.ok) return built;

  const connectors = new ReplitConnectors();
  const response = await connectors.proxy("sendgrid", "/v3/mail/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(built.payload),
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
