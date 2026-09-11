import { and, eq } from "drizzle-orm";
import { db, outreachLaneConfigsTable } from "@workspace/db";
import { getOutreachRuntimeConfig } from "./outreachSystemConfig";

export type OutreachLane = "named" | "public" | "hot_market" | "hot_lead";

export type OutreachLaneConfig = {
  campaignKey: string;
  effectiveMonth: string;
  namedLimit: number;
  publicLimit: number;
  hotMarketLimit: number;
  hotLeadLimit: number;
  persisted: boolean;
};

export function phoenixMonthKey(now = new Date()): string {
  const parts = Object.fromEntries(new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Phoenix",
    year: "numeric",
    month: "2-digit",
  }).formatToParts(now).map((part) => [part.type, part.value]));
  return `${parts.year}-${parts.month}`;
}

/** The operational campaign key is intentionally month-scoped, not a code date. */
export function currentOutreachCampaignKey(now = new Date()): string {
  return process.env.OUTREACH_CAMPAIGN_KEY?.trim() || phoenixMonthKey(now);
}

export async function getAuthoritativeLaneConfig(
  campaignKey = currentOutreachCampaignKey(),
  effectiveMonth = phoenixMonthKey(),
): Promise<OutreachLaneConfig> {
  const [row] = await db.select().from(outreachLaneConfigsTable).where(and(
    eq(outreachLaneConfigsTable.campaignKey, campaignKey),
    eq(outreachLaneConfigsTable.effectiveMonth, effectiveMonth),
  )).limit(1);
  if (row) return { ...row, persisted: true };
  const configured = getOutreachRuntimeConfig()?.schedule;
  if (configured?.laneAllocations) {
    return {
      campaignKey, effectiveMonth,
      namedLimit: configured.laneAllocations.named,
      publicLimit: configured.laneAllocations.public,
      hotMarketLimit: configured.laneAllocations.hotMarket,
      hotLeadLimit: configured.laneAllocations.hotLead,
      persisted: true,
    };
  }
  if (configured) {
    // Post-September is monthly pacing, not four fixed lanes. Keep a
    // reservation lane for every source while the global transaction cap
    // remains authoritative.
    // The transaction computes the exact remaining-day pace. This fallback is
    // only a per-lane shape for callers that need lane metadata.
    const daily = Math.max(1, configured.dailyTarget ?? configured.monthlyTarget);
    return { campaignKey, effectiveMonth, namedLimit: daily, publicLimit: daily, hotMarketLimit: daily, hotLeadLimit: daily, persisted: true };
  }
  throw new Error("Authoritative outreach lane configuration is unavailable; outreach is fail-closed");
}

export function laneLimit(config: OutreachLaneConfig, lane: OutreachLane): number {
  if (lane === "named") return config.namedLimit;
  if (lane === "public") return config.publicLimit;
  if (lane === "hot_market") return config.hotMarketLimit;
  return config.hotLeadLimit;
}

export function laneConfigTotal(config: OutreachLaneConfig): number {
  return config.namedLimit + config.publicLimit + config.hotMarketLimit + config.hotLeadLimit;
}