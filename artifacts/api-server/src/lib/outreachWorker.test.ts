import assert from "node:assert/strict";
import { afterEach, test } from "node:test";
import {
  claimOutreachMessageForSending,
  countPersistedOutreachSend,
  createGuardedAsyncRun,
  getOutreachAutomationStatus,
  isOutreachAutomationReady,
  isOutreachResearchAutomationReady,
} from "./outreachWorker";
import {
  campaignsTable,
  db,
  outreachMessagesTable,
  prospectsTable,
} from "@workspace/db";
import { eq } from "drizzle-orm";
import { randomUUID } from "node:crypto";

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

test("does not mistake an event relay for the outbound delivery transport", () => {
  configureProduction({
    SENDGRID_SUBUSER_USERNAME: "",
    SENDGRID_DEDICATED_API_KEY: "",
    SENDGRID_EVENT_FORWARD_URL: "https://api.example.com/events",
    SENDGRID_EVENT_RELAY_VERIFIED: "true",
  });

  assert.equal(getOutreachAutomationStatus().sendgridDeliveryPathReady, false);
});

test("counts only sends whose sent row was persisted", () => {
  assert.equal(countPersistedOutreachSend(4, undefined), 4);
  assert.equal(countPersistedOutreachSend(4, {} as never), 5);
});

test("a follow-up cannot be claimed until its immediately prior message is delivered", async () => {
  const suffix = randomUUID();
  const [campaign] = await db.insert(campaignsTable).values({
    name: `Delivery gate ${suffix}`,
    audience: "architect",
    states: ["AZ"],
    status: "active",
  }).returning();
  const [prospect] = await db.insert(prospectsTable).values({
    campaignId: campaign!.id,
    companyName: `Delivery gate ${suffix}`,
    city: "Phoenix",
    state: "AZ",
    audience: "architect",
    contactEmail: `delivery-gate-${suffix}@example.com`,
    contactName: "Gate Test",
    contactTitle: "Principal",
    contactConfidence: "high",
    contactSourceUrl: "https://example.com/gate",
    emailStatus: "verified",
    status: "approved",
    fitScore: 80,
    needScore: 80,
    needSignals: "Public project signal",
    dedupeKey: `delivery-gate:${suffix}`,
  }).returning();
  const [initial, followUp] = await db.insert(outreachMessagesTable).values([
    {
      prospectId: prospect!.id,
      campaignId: campaign!.id,
      sequenceNumber: 1,
      subject: "Initial",
      body: "Initial body",
      status: "sent",
    },
    {
      prospectId: prospect!.id,
      campaignId: campaign!.id,
      sequenceNumber: 2,
      subject: "Follow-up",
      body: "Follow-up body",
      status: "approved",
      scheduledAt: new Date(0),
    },
  ]).returning();

  try {
    assert.equal(await claimOutreachMessageForSending(followUp!.id), undefined);
    await db.update(outreachMessagesTable)
      .set({ status: "delivered" })
      .where(eq(outreachMessagesTable.id, initial!.id));
    assert.equal((await claimOutreachMessageForSending(followUp!.id))?.status, "sending");
  } finally {
    await db.delete(prospectsTable).where(eq(prospectsTable.id, prospect!.id));
    await db.delete(campaignsTable).where(eq(campaignsTable.id, campaign!.id));
  }
});

test("guarded automation runs immediately when invoked and never overlaps", async () => {
  let calls = 0;
  let release: (() => void) | undefined;
  const run = createGuardedAsyncRun(async () => {
    calls += 1;
    await new Promise<void>((resolve) => {
      release = resolve;
    });
  });

  run();
  run();
  await new Promise<void>((resolve) => setImmediate(resolve));
  assert.equal(calls, 1);
  release!();
  await new Promise<void>((resolve) => setImmediate(resolve));
  run();
  await new Promise<void>((resolve) => setImmediate(resolve));
  assert.equal(calls, 2);
  release!();
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