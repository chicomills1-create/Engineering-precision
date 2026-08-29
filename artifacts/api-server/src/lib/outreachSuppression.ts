import { and, eq, inArray } from "drizzle-orm";
import {
  db,
  outreachMessagesTable,
  outreachSuppressionsTable,
  prospectsTable,
} from "@workspace/db";

export async function suppressOutreachEmail(
  email: string,
  reason = "unsubscribe",
): Promise<void> {
  await db.insert(outreachSuppressionsTable)
    .values({ email, reason })
    .onConflictDoNothing();

  const matchingProspects = await db.select({ id: prospectsTable.id })
    .from(prospectsTable)
    .where(eq(prospectsTable.contactEmail, email));
  const prospectIds = matchingProspects.map((prospect) => prospect.id);
  if (prospectIds.length === 0) return;

  await db.update(prospectsTable)
    .set({ status: "suppressed" })
    .where(inArray(prospectsTable.id, prospectIds));
  await db.update(outreachMessagesTable)
    .set({ status: "unsubscribed", error: "Sequence stopped after unsubscribe" })
    .where(and(
      inArray(outreachMessagesTable.prospectId, prospectIds),
      inArray(outreachMessagesTable.status, ["draft", "approved", "sending"]),
    ));
}