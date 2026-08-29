import { and, eq, inArray, lte } from "drizzle-orm";
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
  discoverPublicProspects,
  type DiscoveredProspect,
  type ResearchAudience,
  type ResearchState,
} from "./publicResearch";

export const OUTREACH_RESEARCH_TIMEZONE = "America/Phoenix";
export const OUTREACH_RESEARCH_LOCAL_HOUR = 8;
export const MAX_DAILY_RESEARCH_PROSPECTS = 100;

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

export function getDailyResearchTarget(scheduleTarget: number, campaignLimit: number): number {
  return Math.min(
    MAX_DAILY_RESEARCH_PROSPECTS,
    Math.max(1, scheduleTarget, campaignLimit),
  );
}

function validStates(states: string[]): ResearchState[] {
  return states.filter((state): state is ResearchState => ["AZ", "CA", "TX"].includes(state));
}

function validAudience(audience: string): ResearchAudience {
  if (audience === "architect" || audience === "builder") return audience;
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

async function completeScheduledResearch(
  schedule: ResearchSchedule,
  campaign: Campaign,
  scheduleRunId: number,
): Promise<void> {
  const states = validStates(campaign.states);
  if (states.length === 0) throw new Error("Campaign has no supported target states");

  const audience = validAudience(campaign.audience);
  const [researchRun] = await db.insert(outreachResearchRunsTable).values({
    campaignId: campaign.id,
    state: states.join(","),
    audience,
    query: `Scheduled research for ${campaign.name}`,
    status: "running",
  }).returning();
  if (!researchRun) throw new Error("Unable to create research run");

  try {
    const discoveries = [];
    for (const state of states) {
      discoveries.push(await discoverPublicProspects({ state, audience }));
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