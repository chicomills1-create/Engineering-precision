import { eq } from "drizzle-orm";
import {
  campaignsTable,
  db,
  outreachResearchSchedulesTable,
  type Campaign,
} from "@workspace/db";
import { HOT_MARKET_DAILY_TARGET } from "./hotMarketOutreachBatch";
import type { ResearchState } from "./publicResearch";

export const RECURRING_HOT_MARKET_CAMPAIGN_NAME = "Verified National Hot-Market Outreach";

export const LICENSED_OUTREACH_STATES: readonly ResearchState[] = [
  "AZ", "CA",
  "AL", "AR", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA",
  "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE",
  "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI",
  "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY",
] as const;

const ROTATING_STATES_PER_DAY = 4;
const OTHER_LICENSED_STATES = LICENSED_OUTREACH_STATES.slice(2);

export function isResearchState(value: string): value is ResearchState {
  return (LICENSED_OUTREACH_STATES as readonly string[]).includes(value);
}

export function isRecurringHotMarketCampaign(
  campaign: Pick<Campaign, "name">,
): boolean {
  return campaign.name === RECURRING_HOT_MARKET_CAMPAIGN_NAME;
}

export function getHotMarketResearchStates(runDate: string): ResearchState[] {
  const dayNumber = Math.floor(new Date(`${runDate}T00:00:00Z`).getTime() / 86_400_000);
  const offset = (dayNumber * ROTATING_STATES_PER_DAY) % OTHER_LICENSED_STATES.length;
  const rotating = Array.from({ length: ROTATING_STATES_PER_DAY }, (_, index) =>
    OTHER_LICENSED_STATES[(offset + index) % OTHER_LICENSED_STATES.length]!
  );
  return ["AZ", "CA", ...rotating];
}

export async function ensureRecurringHotMarketResearchSchedule(): Promise<void> {
  let [campaign] = await db.select().from(campaignsTable)
    .where(eq(campaignsTable.name, RECURRING_HOT_MARKET_CAMPAIGN_NAME))
    .limit(1);
  if (!campaign) {
    [campaign] = await db.insert(campaignsTable).values({
      name: RECURRING_HOT_MARKET_CAMPAIGN_NAME,
      audience: "mixed",
      states: [...LICENSED_OUTREACH_STATES],
      dailyLimit: HOT_MARKET_DAILY_TARGET,
      status: "active",
      subjectTemplate: "Fast engineering support for active projects",
      bodyTemplate: "Verified national hot-market relationship outreach",
    }).returning();
  }
  if (!campaign) throw new Error("Unable to create recurring hot-market campaign");

  const campaignNeedsUpdate = campaign.audience !== "mixed"
    || campaign.dailyLimit !== HOT_MARKET_DAILY_TARGET
    || campaign.status !== "active"
    || campaign.states.length !== LICENSED_OUTREACH_STATES.length
    || LICENSED_OUTREACH_STATES.some((state) => !campaign!.states.includes(state));
  if (campaignNeedsUpdate) {
    [campaign] = await db.update(campaignsTable).set({
      audience: "mixed",
      states: [...LICENSED_OUTREACH_STATES],
      dailyLimit: HOT_MARKET_DAILY_TARGET,
      status: "active",
    }).where(eq(campaignsTable.id, campaign.id)).returning();
  }
  if (!campaign) throw new Error("Unable to update recurring hot-market campaign");

  const [schedule] = await db.select().from(outreachResearchSchedulesTable)
    .where(eq(outreachResearchSchedulesTable.campaignId, campaign.id))
    .limit(1);
  if (!schedule) {
    await db.insert(outreachResearchSchedulesTable).values({
      campaignId: campaign.id,
      enabled: true,
      timezone: "America/Phoenix",
      localHour: 8,
      targetCount: HOT_MARKET_DAILY_TARGET,
    });
  } else if (!schedule.enabled || schedule.targetCount !== HOT_MARKET_DAILY_TARGET) {
    await db.update(outreachResearchSchedulesTable).set({
      enabled: true,
      timezone: "America/Phoenix",
      localHour: 8,
      targetCount: HOT_MARKET_DAILY_TARGET,
    }).where(eq(outreachResearchSchedulesTable.id, schedule.id));
  }
}