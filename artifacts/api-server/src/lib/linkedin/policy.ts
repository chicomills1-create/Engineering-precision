import { and, eq, inArray, or, sql } from "drizzle-orm";
import { db, linkedinActionsTable, linkedinCompaniesTable, linkedinPeopleTable, linkedinSignalsTable, linkedinSuppressionsTable } from "@workspace/db";
import { normalizeLinkedinUrl } from "./url";

export const PERSON_ACTION_QUOTA_LOCK = 4815162342n;
export const CONTENT_PUBLISH_QUOTA_LOCK = 4815162343n;
export const LINKEDIN_SUPPRESSION_LOCK = 4815162344n;
export const normalizeLinkedinName = (value: string) => value.trim().replace(/\s+/g, " ").toLocaleLowerCase();
export function isPostgresUniqueViolation(error: unknown): boolean {
  return typeof error === "object" && error !== null && "code" in error
    && (error as { code?: unknown }).code === "23505";
}

export type LinkedinAttributionIds = {
  personId?: number;
  companyId?: number;
  campaignId?: number;
  contentItemId?: number;
};

export function assertLinkedinAttributionConsistency(
  attribution: LinkedinAttributionIds,
  records: {
    person?: { companyId: number | null };
    content?: { campaignId: number | null };
  },
): void {
  if (
    attribution.personId
    && attribution.companyId
    && records.person?.companyId !== attribution.companyId
  ) {
    throw new Error("Outcome person and company attribution do not match");
  }
  if (
    attribution.contentItemId
    && attribution.campaignId
    && records.content?.campaignId !== attribution.campaignId
  ) {
    throw new Error("Outcome content and campaign attribution do not match");
  }
}
export function canonicalDomain(value?: string | null): string | null {
  if (!value?.trim()) return null;
  try { const url = new URL(value.includes("://") ? value : `https://${value}`); return url.hostname.toLowerCase().replace(/^www\./, "") || null; } catch { throw new Error("A valid website is required"); }
}
export function defaultRetentionUntil(now = new Date()): Date {
  const result = new Date(now); result.setFullYear(result.getFullYear() + 1); return result;
}
export function actorFromRequest(req: { auth?: { userId?: string | null }; user?: { id?: string | null } }): string {
  const actor = req.auth?.userId ?? req.user?.id;
  if (!actor) throw new Error("Authenticated actor is required");
  return actor;
}
export function linkedinSuppressionTargetKeys(input: {
  personId?: number | null;
  companyId?: number | null;
  profileUrls?: Array<string | null | undefined>;
}): string[] {
  return [...new Set([
    input.personId ? `person:${input.personId}` : null,
    input.companyId ? `company:${input.companyId}` : null,
    ...(input.profileUrls ?? []).filter(Boolean).map((url) => `profile:${normalizeLinkedinUrl(url!)}`),
  ].filter(Boolean) as string[])];
}

export async function assertNotSuppressed(input: { personId?: number | null; companyId?: number | null; signalId?: number | null; profileUrl?: string | null }): Promise<void> {
  let personId = input.personId ?? null;
  let companyId = input.companyId ?? null;
  const profileUrls: Array<string | null | undefined> = [input.profileUrl];
  if (input.signalId) {
    const [signal] = await db.select().from(linkedinSignalsTable)
      .where(eq(linkedinSignalsTable.id, input.signalId));
    personId ??= signal?.personId ?? null;
    companyId ??= signal?.companyId ?? null;
  }
  if (personId) {
    const [person] = await db.select({
      companyId: linkedinPeopleTable.companyId,
      linkedinUrl: linkedinPeopleTable.linkedinUrl,
    }).from(linkedinPeopleTable).where(eq(linkedinPeopleTable.id, personId));
    companyId ??= person?.companyId ?? null;
    profileUrls.push(person?.linkedinUrl);
  }
  if (companyId) {
    const [company] = await db.select({ linkedinUrl: linkedinCompaniesTable.linkedinUrl })
      .from(linkedinCompaniesTable).where(eq(linkedinCompaniesTable.id, companyId));
    profileUrls.push(company?.linkedinUrl);
  }
  const targets = linkedinSuppressionTargetKeys({ personId, companyId, profileUrls });
  if (!targets.length) return;
  const rows = await db.select({ id: linkedinSuppressionsTable.id }).from(linkedinSuppressionsTable).where(or(...targets.map((target) => eq(linkedinSuppressionsTable.normalizedTarget, target)))).limit(1);
  if (rows.length) throw new Error("Target is suppressed and cannot enter the active queue");
}
export async function suppressLinkedinTarget(input: { personId?: number | null; companyId?: number | null; profileUrl?: string | null; reason: string }) {
  let personId = input.personId ?? null; let companyId = input.companyId ?? null;
  const profileUrl = input.profileUrl ? normalizeLinkedinUrl(input.profileUrl) : null;
  if (profileUrl) {
    const [person] = await db.select().from(linkedinPeopleTable).where(eq(linkedinPeopleTable.linkedinUrl, profileUrl));
    const [company] = person ? [] : await db.select().from(linkedinCompaniesTable).where(eq(linkedinCompaniesTable.linkedinUrl, profileUrl));
    personId ??= person?.id ?? null; companyId ??= company?.id ?? null;
  }
  const target = personId ? `person:${personId}` : companyId ? `company:${companyId}` : `profile:${profileUrl}`;
  return db.transaction(async (tx) => {
    await tx.execute(sql`select pg_advisory_xact_lock(${LINKEDIN_SUPPRESSION_LOCK})`);
    const [row] = await tx.insert(linkedinSuppressionsTable).values({ personId, companyId, normalizedTarget: target, reason: input.reason }).onConflictDoUpdate({ target: linkedinSuppressionsTable.normalizedTarget, set: { reason: input.reason } }).returning();
    const linkedPeople = companyId
      ? await tx.select({ id: linkedinPeopleTable.id }).from(linkedinPeopleTable)
        .where(eq(linkedinPeopleTable.companyId, companyId))
      : personId ? [{ id: personId }] : [];
    const linkedPersonIds = linkedPeople.map((person) => person.id);
    const linkedSignals = await tx.select({ id: linkedinSignalsTable.id })
      .from(linkedinSignalsTable)
      .where(or(
        ...(linkedPersonIds.length ? [inArray(linkedinSignalsTable.personId, linkedPersonIds)] : []),
        ...(companyId ? [eq(linkedinSignalsTable.companyId, companyId)] : []),
        sql`false`,
      ));
    const linkedSignalIds = linkedSignals.map((signal) => signal.id);
    const condition = or(
      ...(personId ? [eq(linkedinActionsTable.personId, personId)] : []),
      ...(companyId ? [eq(linkedinActionsTable.companyId, companyId)] : []),
      ...(linkedPersonIds.length ? [inArray(linkedinActionsTable.personId, linkedPersonIds)] : []),
      ...(linkedSignalIds.length ? [inArray(linkedinActionsTable.signalId, linkedSignalIds)] : []),
      sql`false`,
    );
    await tx.update(linkedinActionsTable).set({ status: "stopped", updatedAt: new Date() }).where(and(condition, inArray(linkedinActionsTable.status, ["draft", "pending_review", "approved"])));
    return row!;
  });
}