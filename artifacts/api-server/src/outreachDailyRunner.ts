import { pool } from "@workspace/db";
import { logger } from "./lib/logger";
import {
  getOutreachAutomationStatus,
  processDueOutreachMessages,
} from "./lib/outreachWorker";
import {
  processDueHotMarketResearch,
  processDueOutreachResearchSchedules,
} from "./lib/outreachResearchScheduler";
import { runDailyOutreachOnce } from "./lib/outreachDailyRunner";

function validateProductionAutomation(): void {
  const status = getOutreachAutomationStatus();
  if (process.env.NODE_ENV === "production" && status.automationReady && status.researchAutomationReady) {
    return;
  }

  logger.error({
    nodeEnv: process.env.NODE_ENV,
    adminAllowlistReady: status.adminAllowlistReady,
    productionConfigReady: status.productionConfigReady,
    sendgridDeliveryPathReady: status.sendgridDeliveryPathReady,
    deliveryEventsReady: status.deliveryEventsReady,
    replyWebhookReady: status.replyWebhookReady,
    automationEnabled: status.automationEnabled,
    researchAutomationEnabled: status.researchAutomationEnabled,
  }, "Daily outreach runner refused to start: production automation safeguards are not ready");
  throw new Error("Production outreach and research automation safeguards are required");
}

function wait(milliseconds: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

async function main(): Promise<void> {
  validateProductionAutomation();
  const result = await runDailyOutreachOnce({
    processHotMarketResearch: () => processDueHotMarketResearch(),
    processScheduledResearch: () => processDueOutreachResearchSchedules(),
    processDueMessages: () => processDueOutreachMessages(),
    now: () => new Date(),
    wait,
  });
  logger.info(result, "Daily outreach runner completed");
}

try {
  await main();
} catch (err) {
  logger.error({ err }, "Daily outreach runner failed");
  process.exitCode = 1;
} finally {
  await pool.end();
}