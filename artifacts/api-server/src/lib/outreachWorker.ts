import { and, asc, eq, lte } from "drizzle-orm";
import {
  campaignsTable,
  db,
  outreachMessagesTable,
  prospectsTable,
  type OutreachMessage,
} from "@workspace/db";
import { logger } from "./logger";
import { sendApprovedOutreach } from "./outreach";
import { isReplyWebhookConfigured } from "./outreachEvents";

const ADMIN_EMAIL_PATTERN = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export type OutreachAutomationStatus = {
  adminAllowlistReady: boolean;
  productionConfigReady: boolean;
  sendgridDeliveryPathReady: boolean;
  deliveryEventsReady: boolean;
  replyWebhookReady: boolean;
  automationEnabled: boolean;
  automationReady: boolean;
};

function hasConfiguredAdminEmail(): boolean {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((email) => email.trim())
    .some((email) => ADMIN_EMAIL_PATTERN.test(email));
}

function hasPublishedProductionUrl(): boolean {
  const configuredUrl = process.env.PUBLIC_SITE_URL?.trim();
  if (!configuredUrl || process.env.NODE_ENV !== "production") return false;

  try {
    const url = new URL(configuredUrl);
    return url.protocol === "https:" && !url.username && !url.password;
  } catch {
    return false;
  }
}

export function getOutreachAutomationStatus(): OutreachAutomationStatus {
  const adminAllowlistReady = hasConfiguredAdminEmail();
  const productionConfigReady = hasPublishedProductionUrl();
  const dedicatedAccountReady = Boolean(process.env.SENDGRID_DEDICATED_API_KEY?.trim())
    && process.env.SENDGRID_ISOLATION_VERIFIED === "true";
  const eventRelayReady = Boolean(process.env.SENDGRID_EVENT_FORWARD_URL?.trim())
    && process.env.SENDGRID_EVENT_RELAY_VERIFIED === "true";
  const sendgridDeliveryPathReady = Boolean(
    (process.env.SENDGRID_SUBUSER_USERNAME?.trim()
      && process.env.SENDGRID_SUBUSER_VERIFIED === "true")
    || dedicatedAccountReady
    || eventRelayReady,
  );
  const deliveryEventsReady = Boolean(process.env.SENDGRID_EVENT_WEBHOOK_PUBLIC_KEY)
    && process.env.SENDGRID_EVENT_PATH_VERIFIED === "true";
  const replyWebhookReady = isReplyWebhookConfigured()
    && Boolean(process.env.OUTREACH_REPLY_TO_EMAIL?.trim())
    && process.env.OUTREACH_REPLY_PATH_VERIFIED === "true";
  const automationEnabled = process.env.OUTREACH_AUTOMATION_ENABLED === "true";

  return {
    adminAllowlistReady,
    productionConfigReady,
    sendgridDeliveryPathReady,
    deliveryEventsReady,
    replyWebhookReady,
    automationEnabled,
    automationReady: adminAllowlistReady
      && productionConfigReady
      && sendgridDeliveryPathReady
      && deliveryEventsReady
      && replyWebhookReady
      && automationEnabled,
  };
}

export function isOutreachAutomationReady(): boolean {
  return getOutreachAutomationStatus().automationReady;
}

async function sendClaimedMessage(message: OutreachMessage): Promise<void> {
  const [prospect] = await db.select().from(prospectsTable).where(eq(prospectsTable.id, message.prospectId));
  if (!prospect) throw new Error("Prospect not found");
  const [campaign] = message.campaignId
    ? await db.select().from(campaignsTable).where(eq(campaignsTable.id, message.campaignId))
    : [];
  const sent = await sendApprovedOutreach({ ...message, status: "approved" }, prospect, campaign);
  await db.update(outreachMessagesTable).set({
    status: "sent",
    sentAt: new Date(),
    providerMessageId: sent.providerMessageId,
    error: null,
  }).where(and(
    eq(outreachMessagesTable.id, message.id),
    eq(outreachMessagesTable.status, "sending"),
  ));
}

export async function processDueOutreachMessages(): Promise<number> {
  if (!isOutreachAutomationReady()) return 0;
  const due = await db.select().from(outreachMessagesTable)
    .where(and(
      eq(outreachMessagesTable.status, "approved"),
      lte(outreachMessagesTable.scheduledAt, new Date()),
    ))
    .orderBy(asc(outreachMessagesTable.scheduledAt))
    .limit(10);
  let sentCount = 0;
  for (const message of due) {
    const [claimed] = await db.update(outreachMessagesTable)
      .set({ status: "sending", error: null })
      .where(and(
        eq(outreachMessagesTable.id, message.id),
        eq(outreachMessagesTable.status, "approved"),
      ))
      .returning();
    if (!claimed) continue;
    try {
      await sendClaimedMessage(claimed);
      sentCount += 1;
    } catch (err) {
      const error = err instanceof Error ? err.message : "Scheduled send failed";
      await db.update(outreachMessagesTable)
        .set({ status: "failed", error })
        .where(and(
          eq(outreachMessagesTable.id, claimed.id),
          eq(outreachMessagesTable.status, "sending"),
        ));
      logger.warn({ messageId: claimed.id, error }, "Scheduled outreach send blocked or failed");
    }
  }
  return sentCount;
}

export function startOutreachWorker(): void {
  const status = getOutreachAutomationStatus();
  if (!status.automationReady) {
    logger.info({
      adminAllowlistReady: status.adminAllowlistReady,
      productionConfigReady: status.productionConfigReady,
      sendgridDeliveryPathReady: status.sendgridDeliveryPathReady,
      deliveryEventsReady: status.deliveryEventsReady,
      replyWebhookReady: status.replyWebhookReady,
      automationEnabled: status.automationEnabled,
    }, "Outreach scheduler disabled until production safety checks pass");
    return;
  }
  const timer = setInterval(() => {
    void processDueOutreachMessages()
      .then((sentCount) => {
        if (sentCount > 0) logger.info({ sentCount }, "Processed scheduled outreach messages");
      })
      .catch((err: unknown) => logger.error({ err }, "Outreach scheduler failed"));
  }, 60_000);
  timer.unref();
  logger.info("Outreach scheduler enabled");
}