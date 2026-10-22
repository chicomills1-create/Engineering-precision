/**
 * Microsoft Graph mail transport (client-credentials), the fleet standard.
 *
 * This replaces the direct SendGrid transport (lib/sendGridDirect.ts):
 * the SendGrid account's plan cancels 2026-11-01 and drops to End Of
 * Trial, where SendGrid suspends sending — every notification key the
 * operation owns lives on that account. The Microsoft Graph path is the
 * one already proven in production by the Seal Anvil intake backend and
 * the RB2B lane (same app, same tenant).
 *
 * Sender identity is a hard rule, not a preference:
 *  - Customer-facing mail (anything a client receives) sends ONLY as
 *    info@apexgrideng.com (GRAPH_CUSTOMER_SENDER). If Graph cannot send
 *    as that address the send fails loudly — it never falls back to
 *    another identity.
 *  - Internal notifications (lead / estimate alerts to the hub) send as
 *    info@apexgridmail.com (GRAPH_INTERNAL_SENDER), the fleet's verified
 *    Graph identity. They are invisible to customers.
 *
 * Configuration (Render env): GRAPH_TENANT_ID, GRAPH_CLIENT_ID,
 * GRAPH_CLIENT_SECRET, and optionally GRAPH_INTERNAL_SENDER /
 * GRAPH_CUSTOMER_SENDER overrides.
 */

export interface GraphMailMessage {
  /** Mailbox the message is sent as (users/{from}/sendMail). */
  from: string;
  fromName?: string;
  to: string;
  replyTo?: string;
  replyToName?: string;
  subject: string;
  /** Plain-text body. Used verbatim when no html is supplied. */
  text: string;
  /** Optional HTML body; when present it is the delivered body. */
  html?: string;
}

interface GraphConfig {
  tenantId: string;
  clientId: string;
  clientSecret: string;
}

function graphConfig(): GraphConfig {
  const tenantId = process.env.GRAPH_TENANT_ID?.trim();
  const clientId = process.env.GRAPH_CLIENT_ID?.trim();
  const clientSecret = process.env.GRAPH_CLIENT_SECRET?.trim();
  if (!tenantId || !clientId || !clientSecret) {
    throw new Error(
      "GRAPH_TENANT_ID / GRAPH_CLIENT_ID / GRAPH_CLIENT_SECRET are not all configured; cannot send email via Microsoft Graph",
    );
  }
  return { tenantId, clientId, clientSecret };
}

export function graphInternalSender(): string {
  return process.env.GRAPH_INTERNAL_SENDER?.trim() || "info@apexgridmail.com";
}

export function graphCustomerSender(): string {
  return process.env.GRAPH_CUSTOMER_SENDER?.trim() || "info@apexgrideng.com";
}

let cachedToken: { value: string; expiresAt: number } | null = null;

async function graphAccessToken(config: GraphConfig): Promise<string> {
  if (cachedToken && cachedToken.expiresAt > Date.now() + 60_000) {
    return cachedToken.value;
  }
  const body = new URLSearchParams({
    client_id: config.clientId,
    client_secret: config.clientSecret,
    scope: "https://graph.microsoft.com/.default",
    grant_type: "client_credentials",
  });
  const response = await fetch(
    `https://login.microsoftonline.com/${config.tenantId}/oauth2/v2.0/token`,
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
    },
  );
  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(
      `Microsoft Graph token request failed (${response.status}): ${detail.slice(0, 300)}`,
    );
  }
  const data = (await response.json()) as {
    access_token: string;
    expires_in?: number;
  };
  cachedToken = {
    value: data.access_token,
    expiresAt: Date.now() + (data.expires_in ?? 3600) * 1000,
  };
  return cachedToken.value;
}

/**
 * Sends one message via Graph sendMail. Never throws — callers log and
 * continue (a mail failure must not break a form submission).
 */
export async function sendGraphMail(
  message: GraphMailMessage,
): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    const config = graphConfig();
    const token = await graphAccessToken(config);
    const graphMessage: Record<string, unknown> = {
      subject: message.subject,
      body: message.html
        ? { contentType: "HTML", content: message.html }
        : { contentType: "Text", content: message.text },
      toRecipients: [{ emailAddress: { address: message.to } }],
    };
    if (message.replyTo) {
      graphMessage.replyTo = [
        {
          emailAddress: {
            address: message.replyTo,
            ...(message.replyToName ? { name: message.replyToName } : {}),
          },
        },
      ];
    }
    const payload = JSON.stringify({
      message: {
        ...graphMessage,
        from: {
          emailAddress: {
            address: message.from,
            ...(message.fromName ? { name: message.fromName } : {}),
          },
        },
      },
      saveToSentItems: true,
    });
    const response = await fetch(
      `https://graph.microsoft.com/v1.0/users/${encodeURIComponent(message.from)}/sendMail`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: payload,
      },
    );
    if (response.status !== 202) {
      const detail = await response.text().catch(() => "");
      return {
        ok: false,
        error: `Microsoft Graph sendMail responded ${response.status}: ${detail.slice(0, 300)}`,
      };
    }
    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      error:
        error instanceof Error
          ? error.message
          : "Unknown Microsoft Graph transport error",
    };
  }
}
