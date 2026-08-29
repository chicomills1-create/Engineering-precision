import { and, asc, desc, eq, lte, or, sql } from "drizzle-orm";
import {
  campaignsTable,
  db,
  outreachDeliveryEventsTable,
  outreachMessagesTable,
  prospectsTable,
  type OutreachMessage,
} from "@workspace/db";
import { logger } from "./logger";
import { DailySendLimitError, isUnknownSendResultError, sendApprovedOutreach } from "./outreach";
import { getNextPhoenixEightAm } from "./outreachEligibility";
import {
  isReplyWebhookConfigured,
  syncSendGridInboundReplyWebhook,
} from "./outreachEvents";
import { processDueOutreachResearchSchedules } from "./outreachResearchScheduler";

const ADMIN_EMAIL_PATTERN = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const SEND_REVIEW_AFTER_MS = 15 * 60 * 1000;
const MAX_SCHEDULED_MESSAGES_PER_RUN = 167;

export type OutreachAutomationStatus = {
  adminAllowlistReady: boolean;
  productionConfigReady: boolean;
  sendgridDeliveryPathReady: boolean;
  deliveryEventsReady: boolean;
  replyWebhookReady: boolean;
  automationEnabled: boolean;
  automationReady: boolean;
  researchAutomationEnabled: boolean;
  researchAutomationReady: boolean;
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
  const researchAutomationEnabled = process.env.OUTREACH_RESEARCH_AUTOMATION_ENABLED === "true";

  return {
    adminAllowlistReady,
    productionConfigReady,
    sendgridDeliveryPathReady,
    deliveryEventsReady,
    replyWebhookReady,
    automationEnabled,
    researchAutomationEnabled,
    researchAutomationReady: adminAllowlistReady
      && productionConfigReady
      && researchAutomationEnabled,
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

export function isOutreachResearchAutomationReady(): boolean {
  return getOutreachAutomationStatus().researchAutomationReady;
}

export async function claimOutreachMessageForSending(messageId: number): Promise<OutreachMessage | undefined> {
  const [claimed] = await db.update(outreachMessagesTable)
    .set({ status: "sending", error: null })
    .where(and(
      eq(outreachMessagesTable.id, messageId),
      eq(outreachMessagesTable.status, "approved"),
    ))
    .returning();
  return claimed;
}

export function getSendFailureStatus(error: unknown): "failed" | "needs_review" {
  return isUnknownSendResultError(error) ? "needs_review" : "failed";
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

export async function reconcileSendingOutreachMessages(
  now = new Date(),
  reviewAfterMs = SEND_REVIEW_AFTER_MS,
): Promise<number> {
  const messages = await db.select().from(outreachMessagesTable)
    .where(eq(outreachMessagesTable.status, "sending"));
  let reconciledCount = 0;
  for (const message of messages) {
    const evidence = await db.select().from(outreachDeliveryEventsTable)
      .where(or(
        eq(outreachDeliveryEventsTable.outreachMessageId, message.id),
        ...(message.providerReconciliationKey
          ? [eq(outreachDeliveryEventsTable.reconciliationKey, message.providerReconciliationKey)]
          : []),
      ))
      .orderBy(desc(outreachDeliveryEventsTable.occurredAt));
    const terminalFailure = evidence.find((event) =>
      ["bounce", "blocked", "dropped"].includes(event.eventType)
    );
    const delivered = evidence.find((event) => event.eventType === "delivered");
    const accepted = evidence[0];
    const decisiveEvent = terminalFailure ?? delivered ?? accepted;
    if (decisiveEvent) {
      const status = terminalFailure ? "bounced" : delivered ? "delivered" : "sent";
      const [updated] = await db.update(outreachMessagesTable)
        .set({
          status,
          sentAt: status === "sent" || status === "delivered"
            ? sql`coalesce(${outreachMessagesTable.sentAt}, ${decisiveEvent.occurredAt})`
            : undefined,
          providerMessageId: decisiveEvent.providerMessageId ?? undefined,
          error: terminalFailure
            ? terminalFailure.reason ?? "Delivery failed"
            : null,
        })
        .where(and(
          eq(outreachMessagesTable.id, message.id),
          eq(outreachMessagesTable.status, "sending"),
        ))
        .returning({ id: outreachMessagesTable.id });
      if (updated) reconciledCount += 1;
      continue;
    }

    if (now.getTime() - message.updatedAt.getTime() < reviewAfterMs) continue;
    const [updated] = await db.update(outreachMessagesTable)
      .set({
        status: "needs_review",
        error: "SendGrid dispatch result is unresolved; review provider activity before taking any action",
      })
      .where(and(
        eq(outreachMessagesTable.id, message.id),
        eq(outreachMessagesTable.status, "sending"),
      ))
      .returning({ id: outreachMessagesTable.id });
    if (updated) reconciledCount += 1;
  }
  return reconciledCount;
}

export async function processDueOutreachMessages(): Promise<number> {
  if (!isOutreachAutomationReady()) return 0;
  await reconcileSendingOutreachMessages();
  const due = await db.select().from(outreachMessagesTable)
    .where(and(
      eq(outreachMessagesTable.status, "approved"),
      lte(outreachMessagesTable.scheduledAt, new Date()),
    ))
    .orderBy(asc(outreachMessagesTable.scheduledAt))
    .limit(MAX_SCHEDULED_MESSAGES_PER_RUN);
  let sentCount = 0;
  for (const message of due) {
    const claimed = await claimOutreachMessageForSending(message.id);
    if (!claimed) continue;
    try {
      await sendClaimedMessage(claimed);
      sentCount += 1;
    } catch (err) {
      const error = err instanceof Error ? err.message : "Scheduled send failed";
      if (err instanceof DailySendLimitError) {
        const scheduledAt = getNextPhoenixEightAm();
        await db.update(outreachMessagesTable)
          .set({
            status: "approved",
            scheduledAt,
            error: `Daily limit reached; deferred to ${scheduledAt.toISOString()}`,
          })
          .where(and(
            eq(outreachMessagesTable.id, claimed.id),
            eq(outreachMessagesTable.status, "sending"),
          ));
        continue;
      }
      await db.update(outreachMessagesTable)
        .set({ status: getSendFailureStatus(err), error })
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
  void syncSendGridInboundReplyWebhook()
    .then(({ state, hostname }) => {
      if (state !== "skipped") {
        logger.info({ state, hostname }, "SendGrid inbound reply webhook synchronized");
      }
    })
    .catch((err: unknown) => {
      logger.error({ err }, "SendGrid inbound reply webhook synchronization failed");
    });

  const status = getOutreachAutomationStatus();
  if (!status.automationReady && !status.researchAutomationReady) {
    logger.info({
      adminAllowlistReady: status.adminAllowlistReady,
      productionConfigReady: status.productionConfigReady,
      sendgridDeliveryPathReady: status.sendgridDeliveryPathReady,
      deliveryEventsReady: status.deliveryEventsReady,
      replyWebhookReady: status.replyWebhookReady,
      automationEnabled: status.automationEnabled,
      researchAutomationEnabled: status.researchAutomationEnabled,
    }, "Outreach schedulers disabled until production safety checks pass");
    return;
  }

  if (status.automationReady) {
    const sendTimer = setInterval(() => {
      void processDueOutreachMessages()
        .then((sentCount) => {
          if (sentCount > 0) logger.info({ sentCount }, "Processed scheduled outreach messages");
        })
        .catch((err: unknown) => logger.error({ err }, "Outreach send scheduler failed"));
    }, 60_000);
    sendTimer.unref();
    logger.info("Outreach send scheduler enabled");
  }

  if (status.researchAutomationReady) {
    const runResearch = () => {
      void processDueOutreachResearchSchedules()
        .then((completedCount) => {
          if (completedCount > 0) {
            logger.info({ completedCount }, "Prepared scheduled outreach research lists");
          }
        })
        .catch((err: unknown) => logger.error({ err }, "Outreach research scheduler failed"));
    };
    runResearch();
    const researchTimer = setInterval(runResearch, 60_000);
    researchTimer.unref();
    logger.info("Outreach research scheduler enabled");
  }
}