import { and, eq, inArray, sql } from "drizzle-orm";
import {
  db,
  outreachMessagesTable,
  outreachSuppressionsTable,
  prospectsTable,
} from "@workspace/db";

export const CONTACT_EVIDENCE_TYPES = [
  "forwarded_reply",
  "temporary_unavailability",
  "departed",
] as const;

export type ContactEvidenceType = typeof CONTACT_EVIDENCE_TYPES[number];

export type RecordContactEvidenceInput = {
  prospectId: number;
  evidenceType: ContactEvidenceType;
  evidenceNote: string;
  reviewAt?: Date;
  replacementContactName?: string;
  replacementContactTitle?: string;
  replacementContactEmail?: string;
  replacementContactSourceUrl?: string;
  now?: Date;
  emailLockAlreadyHeld?: boolean;
};

export type RecordContactEvidenceResult = {
  prospect: typeof prospectsTable.$inferSelect;
  stoppedMessageCount: number;
  suppressedEmail: string | null;
  replacementPending: boolean;
};

const STOPPED_MESSAGE_STATUSES = ["draft", "approved", "sending"] as const;

export async function recordContactEvidence(
  input: RecordContactEvidenceInput,
): Promise<RecordContactEvidenceResult | undefined> {
  const now = input.now ?? new Date();
  const evidenceNote = input.evidenceNote.trim();
  if (!evidenceNote) throw new Error("Evidence details are required");
  if (
    input.evidenceType === "temporary_unavailability"
    && (!input.reviewAt || input.reviewAt.getTime() <= now.getTime())
  ) {
    throw new Error("Temporary unavailability requires a future review date");
  }
  const replacementValues = [
    input.replacementContactName,
    input.replacementContactTitle,
    input.replacementContactEmail,
    input.replacementContactSourceUrl,
  ].map((value) => value?.trim() ?? "");
  const replacementFieldCount = replacementValues.filter(Boolean).length;
  if (replacementFieldCount > 0 && input.evidenceType !== "departed") {
    throw new Error("Replacement contacts are only valid for a departed contact");
  }
  if (replacementFieldCount > 0 && replacementFieldCount !== replacementValues.length) {
    throw new Error("Replacement name, title, email, and public source are all required");
  }
  const hasReplacement = replacementFieldCount === replacementValues.length;
  const normalizedReplacementEmail = input.replacementContactEmail?.trim().toLowerCase();
  const [candidate] = await db.select({ contactEmail: prospectsTable.contactEmail })
    .from(prospectsTable)
    .where(eq(prospectsTable.id, input.prospectId))
    .limit(1);
  if (!candidate) return undefined;
  const candidateEmail = candidate.contactEmail?.trim().toLowerCase() || null;

  return db.transaction(async (tx) => {
    if (input.evidenceType === "departed" && candidateEmail && !input.emailLockAlreadyHeld) {
      await tx.execute(sql`select pg_advisory_xact_lock(hashtextextended(${candidateEmail}, 0))`);
    }
    const [current] = await tx.select().from(prospectsTable)
      .where(eq(prospectsTable.id, input.prospectId))
      .for("update")
      .limit(1);
    if (!current) return undefined;
    if (
      input.evidenceType === "departed"
      && (current.contactEmail?.trim().toLowerCase() || null) !== candidateEmail
    ) {
      throw new Error("Contact changed while evidence was being recorded; please retry");
    }

    const stopped = await tx.update(outreachMessagesTable)
      .set({
        status: input.evidenceType === "forwarded_reply" ? "replied"
          : input.evidenceType === "departed" ? "unsubscribed"
          : "needs_review",
        error: input.evidenceType === "forwarded_reply"
          ? "Sequence stopped after forwarded reply evidence"
          : input.evidenceType === "departed"
            ? "Sequence stopped after contact departure evidence"
            : `Sequence paused until contact review on ${input.reviewAt?.toISOString() ?? "a later date"}`,
      })
      .where(and(
        eq(outreachMessagesTable.prospectId, current.id),
        inArray(outreachMessagesTable.status, [...STOPPED_MESSAGE_STATUSES]),
      ))
      .returning({ id: outreachMessagesTable.id });

    const oldEmail = current.contactEmail?.trim().toLowerCase() || null;
    let suppressedEmail: string | null = null;
    if (input.evidenceType === "departed" && oldEmail) {
      await tx.insert(outreachSuppressionsTable)
        .values({
          email: oldEmail,
          reason: "Contact departed; forwarded evidence recorded",
        })
        .onConflictDoUpdate({
          target: outreachSuppressionsTable.email,
          set: { reason: "Contact departed; forwarded evidence recorded" },
        });
      suppressedEmail = oldEmail;
    }

    const replacementPending = input.evidenceType === "departed" && hasReplacement;
    const [prospect] = await tx.update(prospectsTable)
      .set({
        status: replacementPending
          ? "review"
          : input.evidenceType === "forwarded_reply"
            ? "replied"
            : input.evidenceType === "temporary_unavailability"
              ? "review"
              : "suppressed",
        contactStatus: replacementPending
          ? "replacement_pending"
          : input.evidenceType === "forwarded_reply"
            ? "replied"
            : input.evidenceType === "temporary_unavailability"
              ? "temporary_unavailable"
              : "departed",
        contactEvidenceType: input.evidenceType,
        contactEvidence: evidenceNote,
        contactEvidenceAt: now,
        contactReviewAt: input.evidenceType === "temporary_unavailability"
          ? input.reviewAt ?? null
          : null,
        ...(replacementPending
          ? {
              contactName: input.replacementContactName!.trim(),
              contactTitle: input.replacementContactTitle!.trim(),
              contactEmail: normalizedReplacementEmail!,
              contactSourceUrl: input.replacementContactSourceUrl!.trim(),
              contactConfidence: "unknown",
              emailStatus: "unverified",
            }
          : {}),
      })
      .where(eq(prospectsTable.id, current.id))
      .returning();

    return {
      prospect: prospect!,
      stoppedMessageCount: stopped.length,
      suppressedEmail,
      replacementPending,
    };
  });
}