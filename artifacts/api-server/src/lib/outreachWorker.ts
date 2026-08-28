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

export function isOutreachAutomationReady(): boolean {
  return process.env.OUTREACH_AUTOMATION_ENABLED === "true"
    && Boolean(process.env.SENDGRID_EVENT_WEBHOOK_PUBLIC_KEY)
    && Boolean(process.env.OUTREACH_REPLY_WEBHOOK_TOKEN);
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
  if (!isOutreachAutomationReady()) {
    logger.info("Outreach scheduler disabled until delivery and reply webhooks are configured");
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