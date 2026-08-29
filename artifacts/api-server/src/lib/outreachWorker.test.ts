import assert from "node:assert/strict";
import { afterEach, test } from "node:test";
import {
  getOutreachAutomationStatus,
  isOutreachAutomationReady,
  isOutreachResearchAutomationReady,
} from "./outreachWorker";

const CONFIG_KEYS = [
  "ADMIN_EMAILS",
  "NODE_ENV",
  "PUBLIC_SITE_URL",
  "SENDGRID_SUBUSER_USERNAME",
  "SENDGRID_SUBUSER_VERIFIED",
  "SENDGRID_DEDICATED_API_KEY",
  "SENDGRID_ISOLATION_VERIFIED",
  "SENDGRID_EVENT_FORWARD_URL",
  "SENDGRID_EVENT_RELAY_VERIFIED",
  "SENDGRID_EVENT_WEBHOOK_PUBLIC_KEY",
  "SENDGRID_EVENT_PATH_VERIFIED",
  "OUTREACH_REPLY_WEBHOOK_TOKEN",
  "OUTREACH_REPLY_TO_EMAIL",
  "OUTREACH_REPLY_PATH_VERIFIED",
  "SESSION_SECRET",
  "OUTREACH_AUTOMATION_ENABLED",
  "OUTREACH_RESEARCH_AUTOMATION_ENABLED",
] as const;
const originalConfig = Object.fromEntries(
  CONFIG_KEYS.map((key) => [key, process.env[key]]),
) as Record<string, string | undefined>;

afterEach(() => {
  for (const key of CONFIG_KEYS) {
    const value = originalConfig[key];
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
});

function configureProduction(overrides: Record<string, string> = {}): void {
  process.env.NODE_ENV = "production";
  process.env.PUBLIC_SITE_URL = "https://apexgrideng.com";
  process.env.ADMIN_EMAILS = "admin@example.com";
  process.env.SENDGRID_SUBUSER_USERNAME = "apexgrid";
  process.env.SENDGRID_SUBUSER_VERIFIED = "true";
  process.env.SENDGRID_EVENT_WEBHOOK_PUBLIC_KEY = "configured";
  process.env.SENDGRID_EVENT_PATH_VERIFIED = "true";
  process.env.OUTREACH_REPLY_WEBHOOK_TOKEN = "configured";
  process.env.OUTREACH_REPLY_TO_EMAIL = "replies@reply.apexgrideng.com";
  process.env.OUTREACH_REPLY_PATH_VERIFIED = "true";
  process.env.OUTREACH_AUTOMATION_ENABLED = "true";
  process.env.OUTREACH_RESEARCH_AUTOMATION_ENABLED = "true";
  Object.assign(process.env, overrides);
}

test("does not arm automation outside production", () => {
  configureProduction({ NODE_ENV: "development" });

  assert.equal(isOutreachAutomationReady(), false);
  assert.equal(getOutreachAutomationStatus().productionConfigReady, false);
});

test("requires the production admin allowlist", () => {
  configureProduction({ ADMIN_EMAILS: "" });

  const status = getOutreachAutomationStatus();
  assert.equal(status.adminAllowlistReady, false);
  assert.equal(status.automationReady, false);
});

test("requires both signed delivery events and inbound reply protection", () => {
  configureProduction({ SENDGRID_EVENT_WEBHOOK_PUBLIC_KEY: "" });
  assert.equal(getOutreachAutomationStatus().automationReady, false);

  configureProduction({ OUTREACH_REPLY_WEBHOOK_TOKEN: "", SESSION_SECRET: "" });
  assert.equal(getOutreachAutomationStatus().automationReady, false);
});

test("does not trust a configured signing key without event-path verification", () => {
  configureProduction({ SENDGRID_EVENT_PATH_VERIFIED: "" });

  assert.equal(getOutreachAutomationStatus().deliveryEventsReady, false);
  assert.equal(getOutreachAutomationStatus().automationReady, false);
});

test("can derive the reply webhook token from the production session secret", () => {
  configureProduction({ OUTREACH_REPLY_WEBHOOK_TOKEN: "", SESSION_SECRET: "configured" });

  assert.equal(getOutreachAutomationStatus().replyWebhookReady, true);
});

test("does not trust an unverified inbound reply path", () => {
  configureProduction({ OUTREACH_REPLY_PATH_VERIFIED: "" });

  assert.equal(getOutreachAutomationStatus().replyWebhookReady, false);
  assert.equal(getOutreachAutomationStatus().automationReady, false);
});

test("requires a verified SendGrid delivery path", () => {
  configureProduction({ SENDGRID_SUBUSER_USERNAME: "", SENDGRID_SUBUSER_VERIFIED: "" });
  delete process.env.SENDGRID_DEDICATED_API_KEY;

  const status = getOutreachAutomationStatus();
  assert.equal(status.sendgridDeliveryPathReady, false);
  assert.equal(status.automationReady, false);
});

test("does not trust an unverified SendGrid subuser name", () => {
  configureProduction({ SENDGRID_SUBUSER_VERIFIED: "" });

  assert.equal(getOutreachAutomationStatus().sendgridDeliveryPathReady, false);
  assert.equal(getOutreachAutomationStatus().automationReady, false);
});

test("accepts a dedicated SendGrid account key as the verified sender", () => {
  configureProduction({
    SENDGRID_SUBUSER_USERNAME: "",
    SENDGRID_DEDICATED_API_KEY: "configured",
    SENDGRID_ISOLATION_VERIFIED: "true",
  });

  assert.equal(getOutreachAutomationStatus().sendgridDeliveryPathReady, true);
});

test("does not trust an unverified dedicated SendGrid key", () => {
  configureProduction({
    SENDGRID_SUBUSER_USERNAME: "",
    SENDGRID_DEDICATED_API_KEY: "configured",
    SENDGRID_ISOLATION_VERIFIED: "false",
  });

  assert.equal(getOutreachAutomationStatus().sendgridDeliveryPathReady, false);
  assert.equal(getOutreachAutomationStatus().automationReady, false);
});

test("accepts a verified event relay on the existing SendGrid account", () => {
  configureProduction({
    SENDGRID_SUBUSER_USERNAME: "",
    SENDGRID_DEDICATED_API_KEY: "",
    SENDGRID_EVENT_FORWARD_URL: "https://api.example.com/events",
    SENDGRID_EVENT_RELAY_VERIFIED: "true",
  });

  assert.equal(getOutreachAutomationStatus().sendgridDeliveryPathReady, true);
});

test("arms only when the explicit automation flag is enabled", () => {
  configureProduction({ OUTREACH_AUTOMATION_ENABLED: "false" });
  assert.equal(getOutreachAutomationStatus().automationReady, false);

  configureProduction();
  assert.equal(isOutreachAutomationReady(), true);
});

test("research automation requires production, an admin, and its own explicit flag", () => {
  configureProduction();
  assert.equal(isOutreachResearchAutomationReady(), true);

  configureProduction({ OUTREACH_RESEARCH_AUTOMATION_ENABLED: "false" });
  assert.equal(isOutreachResearchAutomationReady(), false);

  configureProduction({
    OUTREACH_RESEARCH_AUTOMATION_ENABLED: "true",
    SENDGRID_EVENT_WEBHOOK_PUBLIC_KEY: "",
    OUTREACH_REPLY_WEBHOOK_TOKEN: "",
    SESSION_SECRET: "",
  });
  assert.equal(isOutreachResearchAutomationReady(), true);
  assert.equal(isOutreachAutomationReady(), false);
});

test("rejects a non-HTTPS or credential-bearing production URL", () => {
  configureProduction({ PUBLIC_SITE_URL: "http://apexgrideng.com" });
  assert.equal(getOutreachAutomationStatus().productionConfigReady, false);

  configureProduction({ PUBLIC_SITE_URL: "https://user:pass@apexgrideng.com" });
  assert.equal(getOutreachAutomationStatus().productionConfigReady, false);
});