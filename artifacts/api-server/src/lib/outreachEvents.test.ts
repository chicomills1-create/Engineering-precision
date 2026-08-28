import assert from "node:assert/strict";
import { generateKeyPairSync, sign } from "node:crypto";
import { afterEach, test } from "node:test";
import { verifySendGridEventSignature } from "./outreachEvents";

const originalKey = process.env.SENDGRID_EVENT_WEBHOOK_PUBLIC_KEY;
afterEach(() => {
  if (originalKey === undefined) delete process.env.SENDGRID_EVENT_WEBHOOK_PUBLIC_KEY;
  else process.env.SENDGRID_EVENT_WEBHOOK_PUBLIC_KEY = originalKey;
});

test("accepts a valid SendGrid-style ECDSA SHA-256 signature and rejects tampering", () => {
  const { publicKey, privateKey } = generateKeyPairSync("ec", { namedCurve: "prime256v1" });
  process.env.SENDGRID_EVENT_WEBHOOK_PUBLIC_KEY = publicKey.export({ type: "spki", format: "pem" }).toString();
  const timestamp = "1787970000";
  const body = Buffer.from('[{"event":"delivered","email":"test@example.com"}]');
  const signature = sign("sha256", Buffer.concat([Buffer.from(timestamp), body]), privateKey).toString("base64");
  assert.equal(verifySendGridEventSignature(body, { timestamp, signature }), true);
  assert.equal(verifySendGridEventSignature(Buffer.from(`${body.toString()}x`), { timestamp, signature }), false);
});