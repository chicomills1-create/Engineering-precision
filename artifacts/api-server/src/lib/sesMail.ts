/**
 * Amazon SES fallback transport for internal notifications.
 *
 * The fleet standard is Microsoft Graph (lib/graphMail.ts) — Graph
 * primary, SES behind a flag, the same end state proven in production
 * by the Torch and Engides intake backends on 2026-11-06: when the
 * Graph path fails, internal notifications send via SES from the
 * fleet's verified SES identity (info@apexgridarc.com, SES account in
 * us-east-2), which the M365 hub accepts and files (the sister brands'
 * proof sends landed in the hub the same day they were fired).
 *
 * This module is deliberately dependency-free: it signs the SES Query
 * API (SendEmail) with SigV4 via node:crypto, mirroring the house SES
 * platform's signing (SignedHeaders=host, X-Amz-Date carried as a
 * header), so no AWS SDK is added to the bundle.
 *
 * Configuration (Render env): AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY,
 * AWS_REGION (default us-east-2), NOTIFY_SES_FROM (default
 * info@apexgridarc.com), and NOTIFY_SES_FALLBACK=1 to arm the fallback.
 */

import { createHash, createHmac } from "node:crypto";
import type { GraphMailMessage } from "./graphMail";

const SES_SERVICE = "ses";

export function sesFallbackConfigured(): boolean {
  return (
    process.env.NOTIFY_SES_FALLBACK?.trim() === "1" &&
    Boolean(process.env.AWS_ACCESS_KEY_ID?.trim()) &&
    Boolean(process.env.AWS_SECRET_ACCESS_KEY?.trim())
  );
}

export function sesFromAddress(): string {
  return process.env.NOTIFY_SES_FROM?.trim() || "info@apexgridarc.com";
}

function sha256Hex(value: string): string {
  return createHash("sha256").update(value, "utf8").digest("hex");
}

function hmac(key: Buffer | string, value: string): Buffer {
  return createHmac("sha256", key).update(value, "utf8").digest();
}

function sesAuthorization(
  accessKeyId: string,
  secretAccessKey: string,
  region: string,
  host: string,
  body: string,
  amzDate: string,
  dateStamp: string,
): string {
  const canonicalRequest = [
    "POST",
    "/",
    "",
    `host:${host}\n`,
    "host",
    sha256Hex(body),
  ].join("\n");
  const scope = `${dateStamp}/${region}/${SES_SERVICE}/aws4_request`;
  const stringToSign = [
    "AWS4-HMAC-SHA256",
    amzDate,
    scope,
    sha256Hex(canonicalRequest),
  ].join("\n");
  const kDate = hmac(`AWS4${secretAccessKey}`, dateStamp);
  const kRegion = hmac(kDate, region);
  const kService = hmac(kRegion, SES_SERVICE);
  const kSigning = hmac(kService, "aws4_request");
  const signature = createHmac("sha256", kSigning)
    .update(stringToSign, "utf8")
    .digest("hex");
  return (
    `AWS4-HMAC-SHA256 Credential=${accessKeyId}/${scope}, ` +
    `SignedHeaders=host, Signature=${signature}`
  );
}

function sesErrorDetail(xml: string): string {
  const code = /<Code>([^<]+)<\/Code>/.exec(xml)?.[1];
  const message = /<Message>([^<]+)<\/Message>/.exec(xml)?.[1];
  if (code || message) {
    return `${code ?? "SES error"}: ${message ?? xml.slice(0, 200)}`;
  }
  return xml.slice(0, 300);
}

/**
 * Sends one message via SES SendEmail. The SES From is always the
 * verified SES identity (sesFromAddress), never the Graph sender —
 * the message's own `from` is a Graph mailbox and is ignored here.
 * Reply-To and subject/body are carried over from the Graph message.
 * Never throws.
 */
export async function sendSesMail(
  message: GraphMailMessage,
): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    const accessKeyId = process.env.AWS_ACCESS_KEY_ID?.trim();
    const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY?.trim();
    if (!accessKeyId || !secretAccessKey) {
      return {
        ok: false,
        error:
          "AWS_ACCESS_KEY_ID / AWS_SECRET_ACCESS_KEY are not configured; cannot send via SES fallback",
      };
    }
    const region = process.env.AWS_REGION?.trim() || "us-east-2";
    const host = `email.${region}.amazonaws.com`;
    const from = sesFromAddress();

    const params = new URLSearchParams({
      Action: "SendEmail",
      Version: "2010-12-01",
      Source: from,
      "Destination.ToAddresses.member.1": message.to,
      "Message.Subject.Data": message.subject,
      "Message.Subject.Charset": "UTF-8",
      "Message.Body.Text.Data": message.text,
      "Message.Body.Text.Charset": "UTF-8",
    });
    if (message.html) {
      params.set("Message.Body.Html.Data", message.html);
      params.set("Message.Body.Html.Charset", "UTF-8");
    }
    if (message.replyTo) {
      params.set("ReplyToAddresses.member.1", message.replyTo);
    }
    const body = params.toString();

    const now = new Date();
    const amzDate = now
      .toISOString()
      .replace(/[-:]/g, "")
      .replace(/\.\d{3}/, "");
    const dateStamp = amzDate.slice(0, 8);
    const authorization = sesAuthorization(
      accessKeyId,
      secretAccessKey,
      region,
      host,
      body,
      amzDate,
      dateStamp,
    );

    const response = await fetch(`https://${host}/`, {
      method: "POST",
      headers: {
        Authorization: authorization,
        "X-Amz-Date": amzDate,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body,
    });
    const responseText = await response.text().catch(() => "");
    if (response.status !== 200) {
      return {
        ok: false,
        error: `SES SendEmail responded ${response.status}: ${sesErrorDetail(responseText)}`,
      };
    }
    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      error:
        error instanceof Error
          ? error.message
          : "Unknown SES transport error",
    };
  }
}
