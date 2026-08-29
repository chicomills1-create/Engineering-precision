import { and, eq, inArray, sql } from "drizzle-orm";
import {
  db,
  outreachMessagesTable,
  outreachSuppressionsTable,
  prospectsTable,
} from "@workspace/db";

export async function suppressOutreachEmail(
  email: string,
  reason = "unsubscribe",
  options: {
    pendingStatus?: "bounced" | "unsubscribed";
    pendingError?: string;
    emailStatus?: "invalid";
  } = {},
): Promise<void> {
  const normalizedEmail = email.trim().toLowerCase();
  await db.transaction(async (tx) => {
    await tx.execute(sql`select pg_advisory_xact_lock(hashtextextended(${normalizedEmail}, 0))`);
    await tx.insert(outreachSuppressionsTable)
      .values({ email: normalizedEmail, reason })
      .onConflictDoUpdate({
        target: outreachSuppressionsTable.email,
        set: { reason },
      });

    const matchingProspects = await tx.select({ id: prospectsTable.id })
      .from(prospectsTable)
      .where(eq(prospectsTable.contactEmail, normalizedEmail));
    const prospectIds = matchingProspects.map((prospect) => prospect.id);
    if (prospectIds.length === 0) return;

    await tx.update(prospectsTable)
      .set({
        status: "suppressed",
        emailStatus: options.emailStatus,
      })
      .where(inArray(prospectsTable.id, prospectIds));
    await tx.update(outreachMessagesTable)
      .set({
        status: options.pendingStatus ?? "unsubscribed",
        error: options.pendingError ?? "Sequence stopped after unsubscribe",
      })
      .where(and(
        inArray(outreachMessagesTable.prospectId, prospectIds),
        inArray(outreachMessagesTable.status, ["draft", "approved", "sending"]),
      ));
  });
}