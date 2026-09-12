import { and, desc, eq } from "drizzle-orm";
import { z } from "zod/v4";
import { db, outreachSystemConfigsTable } from "@workspace/db";

const policySchema = z.object({
  monthlySchedules: z.array(z.object({
    month: z.string().regex(/^\d{4}-\d{2}$/),
    monthlyTarget: z.number().int().nonnegative(),
    dailyTarget: z.number().int().positive().optional(),
    laneAllocations: z.object({
      named: z.number().int().nonnegative(),
      public: z.number().int().nonnegative(),
      hotMarket: z.number().int().nonnegative(),
      hotLead: z.number().int().nonnegative(),
    }).optional(),
  })).min(1),
  forwardMonthlyCap: z.number().int().positive(),
  scoring: z.record(z.string(), z.number()),
  verification: z.record(z.string(), z.unknown()),
  suppression: z.record(z.string(), z.unknown()),
  sendingSafeguards: z.object({
    timezone: z.string(),
    requireQualifiedInventory: z.boolean(),
    requireDeliverabilityReady: z.boolean(),
    maxMonthly: z.number().int().positive(),
  }),
  lifecycleStatuses: z.array(z.string()).min(1),
});
export type OutreachPolicy = z.infer<typeof policySchema>;
export type OutreachRuntimeConfig = {
  version: number;
  policy: OutreachPolicy;
  month: string;
  schedule: OutreachPolicy["monthlySchedules"][number];
};

const AUTHORITATIVE_OUTREACH_POLICY_V1: OutreachPolicy = {
  monthlySchedules: [
    {
      month: "2026-09",
      monthlyTarget: 12_000,
      dailyTarget: 400,
      laneAllocations: { named: 100, public: 100, hotMarket: 100, hotLead: 100 },
    },
    { month: "2026-10", monthlyTarget: 20_000 },
    { month: "2026-11", monthlyTarget: 35_000 },
    { month: "2026-12", monthlyTarget: 50_000 },
    { month: "2027-01", monthlyTarget: 50_000 },
  ],
  forwardMonthlyCap: 50_000,
  scoring: {
    positiveReply: 100,
    reply: 90,
    multipleClicks: 70,
    click: 55,
    repeatedEngagement: 50,
    multipleOpens: 25,
    singleOpen: 10,
    negativeReply: -30,
  },
  verification: {
    requireEvidence: true,
    allowedMethods: [
      "official_website",
      "official_document",
      "credible_directory",
      "verification_provider",
    ],
  },
  suppression: {
    reasons: [
      "unsubscribe",
      "do_not_contact",
      "spam_complaint",
      "hard_bounce",
      "invalid",
      "permanent",
    ],
    precedence: "absolute",
  },
  sendingSafeguards: {
    timezone: "America/Phoenix",
    requireQualifiedInventory: true,
    requireDeliverabilityReady: true,
    maxMonthly: 50_000,
  },
  lifecycleStatuses: [
    "cold",
    "contacted",
    "engaged",
    "hot",
    "replied",
    "qualified",
    "opportunity",
    "proposal_requested",
    "proposal_sent",
    "client",
    "not_interested",
    "suppressed",
  ],
};

let runtime: OutreachRuntimeConfig | null = null;
let loadError: Error | null = null;

export async function ensureAuthoritativeOutreachConfig(): Promise<
  "disabled" | "present" | "inserted"
> {
  if (
    process.env.NODE_ENV !== "production"
    || process.env.OUTREACH_CONFIG_BOOTSTRAP_ENABLED !== "true"
  ) {
    return "disabled";
  }

  const [existing] = await db.select({ id: outreachSystemConfigsTable.id })
    .from(outreachSystemConfigsTable)
    .limit(1);
  if (existing) return "present";

  const [inserted] = await db.insert(outreachSystemConfigsTable).values({
    version: 1,
    status: "active",
    policy: AUTHORITATIVE_OUTREACH_POLICY_V1,
  }).onConflictDoNothing().returning({ id: outreachSystemConfigsTable.id });

  if (inserted) return "inserted";
  const [raced] = await db.select({ id: outreachSystemConfigsTable.id })
    .from(outreachSystemConfigsTable)
    .limit(1);
  if (raced) return "present";
  throw new Error("Authoritative outreach configuration bootstrap did not create a row");
}

export function phoenixMonthKey(now = new Date()): string {
  const parts = Object.fromEntries(new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Phoenix", year: "numeric", month: "2-digit",
  }).formatToParts(now).map((part) => [part.type, part.value]));
  return `${parts.year}-${parts.month}`;
}

function resolveSchedule(policy: OutreachPolicy, month: string) {
  const exact = policy.monthlySchedules.find((schedule) => schedule.month === month);
  if (exact) return exact;
  const forward = policy.monthlySchedules
    .filter((schedule) => schedule.month <= month)
    .sort((a, b) => b.month.localeCompare(a.month))[0];
  return forward?.month >= "2027-01" ? forward : undefined;
}

export async function loadOutreachSystemConfig(
  now = new Date(),
  executor: Pick<typeof db, "select"> = db,
): Promise<OutreachRuntimeConfig> {
  const [row] = await executor.select().from(outreachSystemConfigsTable)
    .where(eq(outreachSystemConfigsTable.status, "active"))
    .orderBy(desc(outreachSystemConfigsTable.version)).limit(1);
  if (!row) throw new Error("Authoritative outreach configuration is missing; outreach is fail-closed");
  const policy = policySchema.parse(row.policy);
  if (policy.sendingSafeguards.maxMonthly > policy.forwardMonthlyCap) {
    throw new Error("Invalid outreach policy: safeguard exceeds forward monthly cap");
  }
  const month = phoenixMonthKey(now);
  const schedule = resolveSchedule(policy, month);
  if (!schedule) throw new Error(`No authoritative outreach schedule for Phoenix month ${month}`);
  if (schedule.monthlyTarget > policy.forwardMonthlyCap) {
    throw new Error("Invalid outreach policy: monthly target exceeds cap");
  }
  runtime = { version: row.version, policy, month, schedule };
  loadError = null;
  return runtime;
}

export function getOutreachRuntimeConfig(): OutreachRuntimeConfig | null { return runtime; }
export function getOutreachConfigError(): Error | null { return loadError; }
export function outreachReady(): boolean { return runtime !== null && loadError === null; }

export function requiredDailyPace(target: number, sent: number, remainingSendingDays: number): number {
  if (remainingSendingDays <= 0) return Math.max(0, target - sent);
  return Math.max(0, Math.ceil((target - sent) / remainingSendingDays));
}

/** Calendar pacing used by preparation and reservation callers alike. */
export function configuredDailyAllowance(runtimeConfig: OutreachRuntimeConfig, now = new Date()): number {
  const target = Math.min(50_000, runtimeConfig.schedule.monthlyTarget);
  if (runtimeConfig.month === "2026-09") return 400;
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Phoenix", year: "numeric", month: "2-digit", day: "2-digit",
  }).formatToParts(now).reduce<Record<string, string>>((result, part) => {
    result[part.type] = part.value;
    return result;
  }, {});
  const year = Number(parts.year);
  const month = Number(parts.month);
  const day = Number(parts.day);
  const daysInMonth = new Date(Date.UTC(year, month, 0)).getUTCDate();
  let remainingDays = 0;
  for (let current = day; current <= daysInMonth; current += 1) {
    const weekday = new Date(Date.UTC(year, month - 1, current)).getUTCDay();
    if (weekday !== 0 && weekday !== 6) remainingDays += 1;
  }
  return Math.min(target, Math.ceil(target / Math.max(1, remainingDays)));
}

export function setOutreachConfigError(error: unknown): void {
  runtime = null;
  loadError = error instanceof Error ? error : new Error(String(error));
}

export function scheduleForMonth(policy: OutreachPolicy, month: string) {
  return resolveSchedule(policy, month);
}

/** Engagement is intentionally monotonic: the strongest verified signal wins. */
export function calculateLeadScore(policy: OutreachPolicy, signals: {
  positiveReply?: boolean; reply?: boolean; clickCount?: number; repeatedEngagement?: boolean; openCount?: number; negativeReply?: boolean;
}): number {
  const scoring = policy.scoring;
  if (signals.positiveReply) return scoring.positiveReply ?? scoring.reply ?? 0;
  if (signals.reply) return scoring.reply ?? 0;
  if ((signals.clickCount ?? 0) > 1) return scoring.multipleClicks ?? scoring.click ?? 0;
  if ((signals.clickCount ?? 0) === 1) return scoring.click ?? 0;
  if (signals.repeatedEngagement) return scoring.repeatedEngagement ?? 0;
  if ((signals.openCount ?? 0) > 1) return scoring.multipleOpens ?? 0;
  if ((signals.openCount ?? 0) === 1) return scoring.singleOpen ?? 0;
  return signals.negativeReply ? scoring.negativeReply ?? 0 : 0;
}

export function resolveLeadStatus(signals: {
  suppressed?: boolean; negativeReply?: boolean; positiveReply?: boolean; reply?: boolean; clickCount?: number; openCount?: number;
}): string {
  if (signals.suppressed) return "suppressed";
  if (signals.negativeReply) return "not_interested";
  if (signals.positiveReply) return "qualified";
  if (signals.reply) return "replied";
  if ((signals.clickCount ?? 0) > 0 || (signals.openCount ?? 0) > 0) return "engaged";
  return "cold";
}