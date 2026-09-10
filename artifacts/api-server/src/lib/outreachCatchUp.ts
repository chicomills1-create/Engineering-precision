import { and, asc, eq, inArray, sql } from "drizzle-orm";
import {
  db,
  outreachCatchUpCohortsTable,
  outreachCatchUpEnrollmentsTable,
  outreachCatchUpReservationsTable,
  outreachProviderHandoffsTable,
  outreachDeliveryEventsTable,
  outreachMessagesTable,
} from "@workspace/db";

export const APEX_GRID_CATCH_UP_TARGET = 2_207;
const ACCEPTANCE_EVENTS = ["processed", "deferred", "delivered"] as const;

export type CatchUpProgress = {
  target: number;
  enrolled: number;
  remaining: number;
  status: string;
};

/** Counts only idempotently enrolled sequence-one messages with provider evidence. */
export async function getCatchUpProgress(): Promise<CatchUpProgress> {
  const [cohort] = await db.select().from(outreachCatchUpCohortsTable)
    .where(eq(outreachCatchUpCohortsTable.name, "Apex Grid fresh verified catch-up")).limit(1);
  if (!cohort) return { target: APEX_GRID_CATCH_UP_TARGET, enrolled: 0, remaining: APEX_GRID_CATCH_UP_TARGET, status: "missing" };
  const [row] = await db.select({ count: sql<number>`count(*)::int` })
    .from(outreachCatchUpEnrollmentsTable)
    .where(eq(outreachCatchUpEnrollmentsTable.cohortId, cohort.id));
  const enrolled = Math.min(row?.count ?? 0, cohort.targetCount);
  return { target: cohort.targetCount, enrolled, remaining: Math.max(0, cohort.targetCount - enrolled), status: cohort.status };
}

/**
 * Attributes one provider-accepted opener. The cohort row is locked before
 * counting/inserting, so concurrent webhook/reconciliation workers cannot
 * cross the target. Duplicate provider events and retries are harmless.
 */
export async function enrollAcceptedCatchUpMessage(messageId: number): Promise<boolean> {
  return db.transaction(async (tx) => {
    const [cohort] = await tx.select().from(outreachCatchUpCohortsTable)
      .where(and(
        eq(outreachCatchUpCohortsTable.name, "Apex Grid fresh verified catch-up"),
        eq(outreachCatchUpCohortsTable.status, "active"),
      )).for("update");
    if (!cohort) return false;
    const [message] = await tx.select().from(outreachMessagesTable)
      .where(and(
        eq(outreachMessagesTable.id, messageId),
        eq(outreachMessagesTable.catchUpCohortId, cohort.id),
        eq(outreachMessagesTable.sequenceNumber, 1),
      )).limit(1);
    if (!message || message.createdAt < cohort.activatedAt) return false;
    const [existing] = await tx.select({ id: outreachCatchUpEnrollmentsTable.id })
      .from(outreachCatchUpEnrollmentsTable)
      .where(eq(outreachCatchUpEnrollmentsTable.messageId, messageId)).limit(1);
    if (existing) return false;
    const [countRow] = await tx.select({ count: sql<number>`count(*)::int` })
      .from(outreachCatchUpEnrollmentsTable).where(eq(outreachCatchUpEnrollmentsTable.cohortId, cohort.id));
    if ((countRow?.count ?? 0) >= cohort.targetCount) {
      await tx.update(outreachCatchUpCohortsTable).set({ status: "completed", completedAt: new Date() })
        .where(eq(outreachCatchUpCohortsTable.id, cohort.id));
      return false;
    }
    const evidenceRows = await tx.select().from(outreachDeliveryEventsTable)
      .where(and(
        eq(outreachDeliveryEventsTable.outreachMessageId, messageId),
        inArray(outreachDeliveryEventsTable.eventType, [...ACCEPTANCE_EVENTS]),
      )).orderBy(asc(outreachDeliveryEventsTable.occurredAt));
    const evidence = evidenceRows.find((event) =>
      event.eventType === "processed"
      || event.eventType === "delivered"
      || (
        event.eventType === "deferred"
        && evidenceRows.some((prior) => prior.eventType === "processed"
          && prior.occurredAt <= event.occurredAt)
      ));
    const [handoff] = await tx.select().from(outreachProviderHandoffsTable)
      .where(eq(outreachProviderHandoffsTable.messageId, messageId)).limit(1);
    const acceptedAt = evidence?.occurredAt ?? handoff?.acceptedAt;
    if (!acceptedAt) return false;
    const [inserted] = await tx.insert(outreachCatchUpEnrollmentsTable).values({
      cohortId: cohort.id,
      messageId,
      sequenceNumber: 1,
      providerAcceptedAt: acceptedAt,
      providerEvidenceEventId: evidence?.id ?? null,
    }).onConflictDoNothing().returning({ id: outreachCatchUpEnrollmentsTable.id });
    if (!inserted) return false;
    await tx.update(outreachCatchUpReservationsTable).set({ status: "accepted" })
      .where(eq(outreachCatchUpReservationsTable.messageId, messageId));
    if ((countRow?.count ?? 0) + 1 >= cohort.targetCount) {
      await tx.update(outreachCatchUpCohortsTable).set({ status: "completed", completedAt: new Date() })
        .where(eq(outreachCatchUpCohortsTable.id, cohort.id));
    }
    return true;
  });
}

export async function getCatchUpRemainingCapacity(): Promise<number> {
  const progress = await getCatchUpProgress();
  if (progress.status !== "active") return 0;
  const [capacityUsed] = await db.select({ count: sql<number>`count(*)::int` })
    .from(outreachCatchUpReservationsTable)
    .where(and(eq(outreachCatchUpReservationsTable.cohortId, (
      await db.select({ id: outreachCatchUpCohortsTable.id }).from(outreachCatchUpCohortsTable)
        .where(eq(outreachCatchUpCohortsTable.name, "Apex Grid fresh verified catch-up")).limit(1)
    )[0]?.id ?? -1), inArray(outreachCatchUpReservationsTable.status, ["reserved", "accepted"])));
  return Math.max(0, progress.target - (capacityUsed?.count ?? 0));
}