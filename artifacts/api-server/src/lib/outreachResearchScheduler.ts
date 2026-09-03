import { and, eq, inArray, lte, sql } from "drizzle-orm";
import {
  campaignsTable,
  db,
  outreachResearchRunsTable,
  outreachResearchScheduleRunsTable,
  outreachResearchSchedulesTable,
  prospectsTable,
  type Campaign,
  type ResearchSchedule,
} from "@workspace/db";
import { logger } from "./logger";
import {
  discoverPublicHotMarketProspects,
  discoverPublicProspects,
  RESEARCH_STATE_ORDER,
  type DiscoveredHotMarketProspect,
  type DiscoveredProspect,
  type ResearchAudience,
  type ResearchState,
} from "./publicResearch";
import {
  getHotMarketScheduledAt,
  HOT_MARKET_DAILY_TARGET,
  stageVerifiedHotMarketProspects,
} from "./hotMarketOutreachBatch";
import { isRecurringHotMarketCampaign } from "./hotMarketResearch";
import { getNextPhoenixPreparationTarget } from "./outreachPreparation";

export const OUTREACH_RESEARCH_TIMEZONE = "America/Phoenix";
export const OUTREACH_RESEARCH_LOCAL_HOUR = 8;
export const MAX_DAILY_RESEARCH_PROSPECTS = 150;
export const HOT_MARKET_RESEARCH_STATES_PER_RUN = 8;
const HOT_MARKET_RESEARCH_QUERY_PREFIX = "hot-market-replenishment:";
const HOT_MARKET_RESEARCH_AUDIENCES: ResearchAudience[] = ["builder", "architect"];

const DATE_FORMATTER = new Intl.DateTimeFormat("en-CA", {
  timeZone: OUTREACH_RESEARCH_TIMEZONE,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  hourCycle: "h23",
});

export function getPhoenixResearchWindow(now: Date): { runDate: string; localHour: number } {
  const parts = Object.fromEntries(
    DATE_FORMATTER.formatToParts(now)
      .filter((part) => part.type !== "literal")
      .map((part) => [part.type, part.value]),
  );
  return {
    runDate: `${parts.year}-${parts.month}-${parts.day}`,
    localHour: Number(parts.hour),
  };
}

export function isResearchScheduleDue(
  schedule: Pick<ResearchSchedule, "enabled" | "localHour">,
  campaign: Pick<Campaign, "status">,
  now: Date,
): boolean {
  if (!schedule.enabled || campaign.status !== "active") return false;
  return getPhoenixResearchWindow(now).localHour >= OUTREACH_RESEARCH_LOCAL_HOUR;
}

export function usesGenericResearchPipeline(campaign: Pick<Campaign, "name">): boolean {
  return !isRecurringHotMarketCampaign(campaign);
}

export function getDailyResearchTarget(scheduleTarget: number, campaignLimit: number): number {
  return Math.min(
    MAX_DAILY_RESEARCH_PROSPECTS,
    Math.max(1, scheduleTarget, campaignLimit),
  );
}

function validStates(states: string[]): ResearchState[] {
  return states.filter((state): state is ResearchState =>
    (RESEARCH_STATE_ORDER as readonly string[]).includes(state)
  );
}

function validAudiences(audience: string): ResearchAudience[] {
  if (audience === "mixed") return ["architect", "builder"];
  if (audience === "architect" || audience === "builder") return [audience];
  throw new Error(`Unsupported campaign audience: ${audience}`);
}

function uniqueCandidates(candidates: DiscoveredProspect[]): DiscoveredProspect[] {
  const seen = new Set<string>();
  return candidates.filter((candidate) => {
    if (seen.has(candidate.dedupeKey)) return false;
    seen.add(candidate.dedupeKey);
    return true;
  });
}

export function getHotMarketResearchStates(
  runDate: string,
  limit = HOT_MARKET_RESEARCH_STATES_PER_RUN,
): ResearchState[] {
  const secondaryStates = RESEARCH_STATE_ORDER.slice(2);
  const dayNumber = Math.floor(new Date(`${runDate}T12:00:00Z`).getTime() / 86_400_000);
  const secondaryCount = Math.max(0, Math.min(secondaryStates.length, limit - 2));
  const offset = secondaryStates.length === 0 ? 0 : dayNumber % secondaryStates.length;
  const rotatingStates = Array.from({ length: secondaryCount }, (_, index) =>
    secondaryStates[(offset + index) % secondaryStates.length]
  ).filter((state): state is ResearchState => Boolean(state));
  return [...RESEARCH_STATE_ORDER.slice(0, Math.min(2, limit)), ...rotatingStates];
}

function uniqueHotMarketCandidates(
  candidates: DiscoveredHotMarketProspect[],
): DiscoveredHotMarketProspect[] {
  const dedupeKeys = new Set<string>();
  const emails = new Set<string>();
  const domains = new Set<string>();
  return candidates.filter((candidate) => {
    const email = candidate.contactEmail.trim().toLowerCase();
    let domain = "";
    try {
      domain = new URL(candidate.website).hostname.replace(/^www\./, "").toLowerCase();
    } catch {
      return false;
    }
    if (
      dedupeKeys.has(candidate.dedupeKey)
      || emails.has(email)
      || domains.has(domain)
    ) return false;
    dedupeKeys.add(candidate.dedupeKey);
    emails.add(email);
    domains.add(domain);
    return true;
  });
}

async function claimHotMarketResearchRun(
  runDate: string,
  states: ResearchState[],
  now: Date,
): Promise<number | undefined> {
  const query = `${HOT_MARKET_RESEARCH_QUERY_PREFIX}${runDate}`;
  return db.transaction(async (tx) => {
    await tx.execute(sql`select pg_advisory_xact_lock(hashtextextended(${query}, 0))`);
    const [existing] = await tx.select().from(outreachResearchRunsTable)
      .where(eq(outreachResearchRunsTable.query, query))
      .limit(1);
    if (existing) {
      const stale = existing.status === "running"
        && existing.createdAt.getTime() <= now.getTime() - 30 * 60_000;
      if (existing.status !== "failed" && !stale) return undefined;
      const [recovered] = await tx.update(outreachResearchRunsTable).set({
        state: states.join(","),
        status: "running",
        resultCount: 0,
        skippedCount: 0,
        error: null,
        completedAt: null,
      }).where(eq(outreachResearchRunsTable.id, existing.id)).returning({
        id: outreachResearchRunsTable.id,
      });
      return recovered?.id;
    }
    const [created] = await tx.insert(outreachResearchRunsTable).values({
      state: states.join(","),
      audience: "mixed",
      query,
      status: "running",
    }).returning({ id: outreachResearchRunsTable.id });
    return created?.id;
  });
}

export async function processDueHotMarketResearch(
  now = new Date(),
): Promise<{ state: "skipped" | "completed" | "failed"; staged: number; shortfall: number }> {
  const { runDate, localHour } = getPhoenixResearchWindow(now);
  if (localHour < OUTREACH_RESEARCH_LOCAL_HOUR) {
    return { state: "skipped", staged: 0, shortfall: HOT_MARKET_DAILY_TARGET };
  }
  const states = getHotMarketResearchStates(runDate);
  const runId = await claimHotMarketResearchRun(runDate, states, now);
  if (!runId) return { state: "skipped", staged: 0, shortfall: 0 };

  try {
    const discoveries: DiscoveredHotMarketProspect[] = [];
    for (const state of states) {
      for (const audience of HOT_MARKET_RESEARCH_AUDIENCES) {
        const result = await discoverPublicHotMarketProspects({ state, audience });
        discoveries.push(...result.prospects);
      }
    }
    const candidates = uniqueHotMarketCandidates(discoveries);
    const target = getNextPhoenixPreparationTarget(now);
    const result = await stageVerifiedHotMarketProspects(candidates, {
      targetDate: target.targetDate,
      scheduledAt: getHotMarketScheduledAt(target.scheduledAt),
      targetCount: HOT_MARKET_DAILY_TARGET,
      now,
    });
    await db.update(outreachResearchRunsTable).set({
      status: "completed",
      resultCount: result.staged,
      skippedCount: result.skipped,
      completedAt: new Date(),
      error: result.shortfall > 0
        ? `Verified hot-market shortfall: ${result.shortfall}`
        : null,
    }).where(eq(outreachResearchRunsTable.id, runId));
    return { state: "completed", staged: result.staged, shortfall: result.shortfall };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Hot-market research failed";
    await db.update(outreachResearchRunsTable).set({
      status: "failed",
      error: message,
      completedAt: new Date(),
    }).where(eq(outreachResearchRunsTable.id, runId));
    logger.error({ err: error, runDate }, "Scheduled hot-market research run failed");
    return { state: "failed", staged: 0, shortfall: HOT_MARKET_DAILY_TARGET };
  }
}

async function completeScheduledResearch(
  schedule: ResearchSchedule,
  campaign: Campaign,
  scheduleRunId: number,
): Promise<void> {
  const states = validStates(campaign.states);
  if (states.length === 0) throw new Error("Campaign has no supported target states");

  const audiences = validAudiences(campaign.audience);
  const [researchRun] = await db.insert(outreachResearchRunsTable).values({
    campaignId: campaign.id,
    state: states.join(","),
    audience: campaign.audience,
    query: `Scheduled research for ${campaign.name}`,
    status: "running",
  }).returning();
  if (!researchRun) throw new Error("Unable to create research run");

  try {
    const discoveries = [];
    for (const state of states) {
      for (const audience of audiences) {
        discoveries.push(await discoverPublicProspects({ state, audience }));
      }
    }

    const queries = discoveries.map((discovery) => discovery.query);
    const candidates = uniqueCandidates(discoveries.flatMap((discovery) => discovery.prospects));
    const existingRows = candidates.length === 0
      ? []
      : await db.select({ dedupeKey: prospectsTable.dedupeKey })
        .from(prospectsTable)
        .where(inArray(prospectsTable.dedupeKey, candidates.map((candidate) => candidate.dedupeKey)));
    const existing = new Set(existingRows.map((row) => row.dedupeKey));
    const targetCount = getDailyResearchTarget(schedule.targetCount, campaign.dailyLimit);
    const newCandidates = candidates
      .filter((candidate) => !existing.has(candidate.dedupeKey))
      .slice(0, targetCount);
    const inserted = newCandidates.length === 0
      ? []
      : await db.insert(prospectsTable).values(newCandidates.map((candidate) => ({
        ...candidate,
        campaignId: campaign.id,
        researchRunId: researchRun.id,
        status: "review",
        emailStatus: "unverified",
        contactConfidence: "unknown",
      }))).onConflictDoNothing().returning();
    const skippedCount = Math.max(0, candidates.length - inserted.length);
    const completedAt = new Date();
    const query = queries.join(" | ");

    await Promise.all([
      db.update(outreachResearchRunsTable).set({
        query,
        status: "completed",
        resultCount: inserted.length,
        skippedCount,
        completedAt,
      }).where(eq(outreachResearchRunsTable.id, researchRun.id)),
      db.update(outreachResearchScheduleRunsTable).set({
        query,
        status: "completed",
        resultCount: inserted.length,
        skippedCount,
        completedAt,
      }).where(eq(outreachResearchScheduleRunsTable.id, scheduleRunId)),
    ]);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Scheduled research failed";
    const completedAt = new Date();
    await Promise.all([
      db.update(outreachResearchRunsTable).set({
        status: "failed",
        error: message,
        completedAt,
      }).where(eq(outreachResearchRunsTable.id, researchRun.id)),
      db.update(outreachResearchScheduleRunsTable).set({
        status: "failed",
        error: message,
        completedAt,
      }).where(eq(outreachResearchScheduleRunsTable.id, scheduleRunId)),
    ]);
    throw error;
  }
}

export async function processDueOutreachResearchSchedules(now = new Date()): Promise<number> {
  const rows = await db.select({
    schedule: outreachResearchSchedulesTable,
    campaign: campaignsTable,
  })
    .from(outreachResearchSchedulesTable)
    .innerJoin(campaignsTable, eq(outreachResearchSchedulesTable.campaignId, campaignsTable.id))
    .where(and(
      eq(outreachResearchSchedulesTable.enabled, true),
      eq(campaignsTable.status, "active"),
    ));
  const { runDate } = getPhoenixResearchWindow(now);
  let completed = 0;

  for (const { schedule, campaign } of rows) {
    if (!usesGenericResearchPipeline(campaign)) continue;
    if (!isResearchScheduleDue(schedule, campaign, now)) continue;
    const staleCutoff = new Date(now.getTime() - 30 * 60_000);
    const [recovered] = await db.update(outreachResearchScheduleRunsTable).set({
      status: "running",
      startedAt: now,
      error: null,
      completedAt: null,
    }).where(and(
      eq(outreachResearchScheduleRunsTable.scheduleId, schedule.id),
      eq(outreachResearchScheduleRunsTable.runDate, runDate),
      eq(outreachResearchScheduleRunsTable.status, "running"),
      lte(outreachResearchScheduleRunsTable.startedAt, staleCutoff),
    )).returning();
    const [claimed] = recovered
      ? [recovered]
      : await db.insert(outreachResearchScheduleRunsTable).values({
          scheduleId: schedule.id,
          runDate,
          status: "running",
        }).onConflictDoNothing().returning();
    if (!claimed) continue;

    try {
      await completeScheduledResearch(schedule, campaign, claimed.id);
      completed += 1;
    } catch (error) {
      logger.error({ err: error, scheduleId: schedule.id }, "Scheduled outreach research run failed");
    }
  }
  return completed;
}