import assert from "node:assert/strict";
import test from "node:test";
import { createHash, createHmac } from "node:crypto";
import {
  discoverLinkedinProviderStatus,
  linkedinProvider,
  linkedinWebhookChallenge,
  verifyLinkedinProviderWebhook,
} from "./provider";

const providerKeys = [
  "LINKEDIN_OFFICIAL_PROVIDER_ENABLED",
  "LINKEDIN_OFFICIAL_PROVIDER_APPROVED",
  "LINKEDIN_OFFICIAL_ACCESS_TOKEN",
  "LINKEDIN_OFFICIAL_ORGANIZATION_ID",
  "LINKEDIN_OFFICIAL_SCOPES",
  "LINKEDIN_OFFICIAL_CLIENT_SECRET",
] as const;

function withProviderEnvironment(
  values: Partial<Record<typeof providerKeys[number], string>>,
  run: () => void | Promise<void>,
) {
  const previous = Object.fromEntries(providerKeys.map((key) => [key, process.env[key]]));
  for (const key of providerKeys) delete process.env[key];
  Object.assign(process.env, values);
  return Promise.resolve(run()).finally(() => {
    for (const key of providerKeys) {
      const value = previous[key];
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  });
}

test("provider discovery allowlists only official organization publishing", async () => {
  await withProviderEnvironment({
    LINKEDIN_OFFICIAL_PROVIDER_ENABLED: "true",
    LINKEDIN_OFFICIAL_PROVIDER_APPROVED: "true",
    LINKEDIN_OFFICIAL_ACCESS_TOKEN: "test-token",
    LINKEDIN_OFFICIAL_ORGANIZATION_ID: "123",
    LINKEDIN_OFFICIAL_SCOPES: "w_organization_social messaging connection_requests",
  }, () => {
    const status = discoverLinkedinProviderStatus();
    assert.equal(status.configured, true);
    assert.deepEqual(status.allowedOperations, ["publish_organization_post"]);
    assert.equal(status.capabilities.publishOrganizationPost, true);
    assert.equal(status.capabilities.sendConnectionRequest, false);
    assert.equal(status.capabilities.sendDirectMessage, false);
    assert.equal(status.capabilities.publishComment, false);
  });
});

test("provider fails closed when approval or required scope is missing", async () => {
  await withProviderEnvironment({
    LINKEDIN_OFFICIAL_PROVIDER_ENABLED: "true",
    LINKEDIN_OFFICIAL_ACCESS_TOKEN: "test-token",
    LINKEDIN_OFFICIAL_ORGANIZATION_ID: "123",
  }, async () => {
    assert.equal(discoverLinkedinProviderStatus().configured, false);
    await assert.rejects(() => linkedinProvider.execute({
      operation: "publish_organization_post",
      reconciliationKey: "test",
      approvedCopy: "Approved",
    }), /not configured/);
  });
});

test("provider webhooks require the configured signature and challenge algorithm", async () => {
  await withProviderEnvironment({ LINKEDIN_OFFICIAL_CLIENT_SECRET: "webhook-secret" }, () => {
    const body = Buffer.from('{"status":"succeeded"}');
    const signature = createHmac("sha256", "webhook-secret").update(body).digest("hex");
    assert.equal(verifyLinkedinProviderWebhook(body, signature), true);
    assert.equal(verifyLinkedinProviderWebhook(body, "0".repeat(64)), false);
    assert.equal(
      linkedinWebhookChallenge("challenge"),
      createHash("sha256").update("challengewebhook-secret").digest("hex"),
    );
  });
});