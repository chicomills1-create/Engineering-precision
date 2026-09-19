import { and, eq } from "drizzle-orm";
import { db, outreachLaneConfigsTable } from "@workspace/db";
import {
  effectiveLaneAllocations,
  getOutreachRuntimeConfig,
  OUTREACH_UNCAPPED,
} from "./outreachSystemConfig";

export type OutreachLane = "named" | "public" | "hot_market" | "hot_lead";
export type OutreachLaneLimit = number | typeof OUTREACH_UNCAPPED;

/** September 2026 relaunch lanes: 500 verified named + 100 public + uncapped hot leads. */
export const SEPTEMBER_OUTREACH_LANE_TARGETS = {
  named: 500,
  public: 100,
  hot_market: 0,
  hot_lead: 100,
} as const;
export const SEPTEMBER_OUTREACH_TOTAL_TARGET = 400;
/** September 19 relaunch daily target: 500 verified + 100 public. Hot leads are uncapped. */
export const SEPTEMBER_OUTREACH_RELAUNCH_DAILY_TARGET = 600;

export type OutreachLaneConfig = {
  campaignKey: string;
  effectiveMonth: string;
  namedLimit: number;
  publicLimit: number;
  hotMarketLimit: number;
  hotLeadLimit: OutreachLaneLimit;
  namedHotMarketSharedLimit?: number;
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
  now = new Date(),
): Promise<OutreachLaneConfig> {
  const [row] = await db.select().from(outreachLaneConfigsTable).where(and(
    eq(outreachLaneConfigsTable.campaignKey, campaignKey),
    eq(outreachLaneConfigsTable.effectiveMonth, effectiveMonth),
  )).limit(1);
  const runtime = getOutreachRuntimeConfig();
  const configured = runtime?.schedule;
  // Version 2 is the authoritative cutover and must not be shadowed by a
  // legacy persisted four-lane row. Before v2, preserve that row behavior.
  if (row && runtime?.version !== 2) return { ...row, persisted: true };
  if (configured?.laneAllocations) {
    const allocations = effectiveLaneAllocations(configured, now) ?? configured.laneAllocations;
    return {
      campaignKey, effectiveMonth,
      namedLimit: allocations.named,
      publicLimit: allocations.public,
      hotMarketLimit: allocations.hotMarket,
      hotLeadLimit: allocations.hotLead,
      namedHotMarketSharedLimit: allocations.namedHotMarketShared,
      persisted: true,
    };
  }
  if (row) return { ...row, persisted: true };
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

export function laneLimit(config: OutreachLaneConfig, lane: OutreachLane): OutreachLaneLimit {
  if (lane === "named") return config.namedLimit;
  if (lane === "public") return config.publicLimit;
  if (lane === "hot_market") return config.hotMarketLimit;
  return config.hotLeadLimit;
}

export function laneConfigTotal(config: OutreachLaneConfig): number {
  const namedAndHotMarket = config.namedHotMarketSharedLimit
    ?? config.namedLimit + config.hotMarketLimit;
  if (config.hotLeadLimit === OUTREACH_UNCAPPED) return namedAndHotMarket + config.publicLimit;
  return namedAndHotMarket + config.publicLimit + config.hotLeadLimit;
}

export function isUncappedLaneLimit(limit: OutreachLaneLimit): limit is typeof OUTREACH_UNCAPPED {
  return limit === OUTREACH_UNCAPPED;
}

export function getNamedHotMarketSharedLimit(config: OutreachLaneConfig): number {
  return config.namedHotMarketSharedLimit ?? config.hotMarketLimit;
}