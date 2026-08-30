import { and, eq, notInArray, sql } from "drizzle-orm";
import {
  campaignsTable,
  db,
  outreachResearchSchedulesTable,
  outreachSuppressionsTable,
  prospectsTable,
} from "@workspace/db";
import { assertVerifiedOutreachBatch } from "./outreachContactValidation";
import { VERIFIED_OUTREACH_CONTACTS as LEGACY_VERIFIED_OUTREACH_CONTACTS } from "./verifiedOutreachContacts";
import { VERIFIED_OUTREACH_CONTACTS_AUG_29 } from "./verifiedOutreachContactsAug29";
import { VERIFIED_OUTREACH_CONTACTS_AUG_30 } from "./verifiedOutreachContactsAug30";

const CAMPAIGN_NAME = "Approved 8 AM Outreach - August 2026";
const SUBJECT = "Need stamped engineering without the usual wait or cost?";
export const VERIFIED_OUTREACH_CONTACTS = [
  ...LEGACY_VERIFIED_OUTREACH_CONTACTS,
  ...VERIFIED_OUTREACH_CONTACTS_AUG_29,
] as const;

const AUG_30_TARGET = 150;

export function approvedOutreachSubject(): string {
  return SUBJECT;
}

export function approvedOutreachBody(contactName: string): string {
  const firstName = contactName.trim().split(/\s+/)[0];
  return `Hi ${firstName},

If a focused engineering issue is taking too long or costing more than it should, Apex Grid can help. Our licensed Civil, Structural, and MEP PEs stamp our designs, and focused reviews or design responses typically turn around in 12–24 hours.

We right-size the scope, review what you already have, and provide clear pricing before work begins. As a veteran-owned engineering company, we keep the process direct and accountable.

Do you have any current projects in your pipeline that you would like us to review?`;
}

export async function seedVerifiedOutreachBatch(options: {
  enabled?: boolean;
  now?: Date;
} = {}): Promise<{ state: "skipped" | "ready"; queued: number }> {
  const enabled = options.enabled ?? process.env.OUTREACH_SEED_VERIFIED_BATCH === "true";
  if (!enabled) return { state: "skipped", queued: 0 };
  assertVerifiedOutreachBatch(VERIFIED_OUTREACH_CONTACTS, 313);
  assertVerifiedOutreachBatch(VERIFIED_OUTREACH_CONTACTS_AUG_30);

  let [campaign] = await db.select().from(campaignsTable)
    .where(eq(campaignsTable.name, CAMPAIGN_NAME))
    .limit(1);
  if (!campaign) {
    [campaign] = await db.insert(campaignsTable).values({
      name: CAMPAIGN_NAME,
      audience: "mixed",
      states: ["AZ", "CA"],
      dailyLimit: 150,
      status: "active",
      subjectTemplate: SUBJECT,
      bodyTemplate: "Approved personalized Apex Grid outreach copy",
    }).returning();
  }
  if (!campaign) throw new Error("Unable to create the verified outreach campaign");
  if (
    campaign.dailyLimit !== 150
    || campaign.audience !== "mixed"
    || !campaign.states.includes("AZ")
    || !campaign.states.includes("CA")
  ) {
    const [updatedCampaign] = await db.update(campaignsTable)
      .set({ dailyLimit: 150, audience: "mixed", states: ["AZ", "CA"] })
      .where(eq(campaignsTable.id, campaign.id))
      .returning();
    if (!updatedCampaign) throw new Error("Unable to set the outreach campaign daily limit");
    campaign = updatedCampaign;
  }
  await db.update(outreachResearchSchedulesTable)
    .set({ targetCount: 150 })
    .where(eq(outreachResearchSchedulesTable.campaignId, campaign.id));

  for (const contact of VERIFIED_OUTREACH_CONTACTS) {
    await db.transaction(async (tx) => {
      const normalizedEmail = contact.contactEmail.toLowerCase();
      await tx.execute(sql`select pg_advisory_xact_lock(hashtextextended(${normalizedEmail}, 0))`);
      const [existingSuppression] = await tx.select({ id: outreachSuppressionsTable.id })
        .from(outreachSuppressionsTable)
        .where(eq(outreachSuppressionsTable.email, normalizedEmail))
        .limit(1);
      if (existingSuppression) return;

      const [prospect] = await tx.insert(prospectsTable).values({
      campaignId: campaign.id,
      companyName: contact.companyName,
      website: contact.website,
      city: contact.city,
      state: contactState(contact),
      audience: contact.audience,
      sourceUrl: contact.sourceUrl,
      researchNotes: contact.needSignals,
      fitScore: 85,
      needScore: 80,
      needSignals: contact.needSignals,
      contactName: contact.contactName,
      contactTitle: contact.contactTitle,
      contactEmail: normalizedEmail,
      contactConfidence: "high",
      contactSourceUrl: contact.contactSourceUrl,
      dedupeKey: contact.dedupeKey,
      emailStatus: "verified",
      status: "approved",
    }).onConflictDoUpdate({
      target: prospectsTable.dedupeKey,
      set: {
        campaignId: campaign.id,
         state: contactState(contact),
        researchNotes: contact.needSignals,
        needSignals: contact.needSignals,
        contactName: contact.contactName,
        contactTitle: contact.contactTitle,
        contactEmail: normalizedEmail,
        contactConfidence: "high",
        contactSourceUrl: contact.contactSourceUrl,
        emailStatus: "verified",
        status: sql`case when ${prospectsTable.status} = 'contacted' then ${prospectsTable.status} else 'approved' end`,
        updatedAt: new Date(),
      },
      setWhere: and(
        eq(prospectsTable.contactStatus, "active"),
        notInArray(prospectsTable.status, ["review", "replied", "not_a_fit", "suppressed"]),
      ),
    }).returning();
      if (!prospect) return;

    });
  }
  const existingRows = await db.select().from(prospectsTable);
  const suppressions = await db.select({ email: outreachSuppressionsTable.email })
    .from(outreachSuppressionsTable);
  const suppressedEmails = new Set(suppressions.map((row) => row.email.trim().toLowerCase()));
  const usedEmails = new Set(existingRows.flatMap((row) =>
    row.contactEmail ? [row.contactEmail.trim().toLowerCase()] : []
  ));
  const usedDomains = new Set(existingRows.flatMap((row) => {
    if (!row.website) return [];
    try {
      return [new URL(row.website).hostname.replace(/^www\./, "").toLowerCase()];
    } catch {
      return [];
    }
  }));
  let stored = existingRows.filter((row) =>
    row.dedupeKey?.startsWith("verified-2026-08-30-")
    && row.status === "approved"
    && row.emailStatus === "verified"
    && row.contactStatus === "active"
  ).length;

  for (const contact of VERIFIED_OUTREACH_CONTACTS_AUG_30) {
    if (stored >= AUG_30_TARGET) break;
    const normalizedEmail = contact.contactEmail.toLowerCase();
    const domain = new URL(contact.website).hostname.replace(/^www\./, "").toLowerCase();
    if (
      suppressedEmails.has(normalizedEmail)
      || usedEmails.has(normalizedEmail)
      || usedDomains.has(domain)
    ) continue;

    const inserted = await db.transaction(async (tx) => {
      await tx.execute(sql`select pg_advisory_xact_lock(hashtextextended(${normalizedEmail}, 0))`);
      await tx.execute(sql`select pg_advisory_xact_lock(hashtextextended(${domain}, 0))`);
      const currentRows = await tx.select({
        contactEmail: prospectsTable.contactEmail,
        website: prospectsTable.website,
      }).from(prospectsTable);
      const conflict = currentRows.some((row) => {
        const email = row.contactEmail?.trim().toLowerCase();
        let currentDomain = "";
        try {
          currentDomain = row.website
            ? new URL(row.website).hostname.replace(/^www\./, "").toLowerCase()
            : "";
        } catch {
          currentDomain = "";
        }
        return email === normalizedEmail || currentDomain === domain;
      });
      const [suppression] = await tx.select({ id: outreachSuppressionsTable.id })
        .from(outreachSuppressionsTable)
        .where(eq(outreachSuppressionsTable.email, normalizedEmail))
        .limit(1);
      if (conflict || suppression) return false;

      const [prospect] = await tx.insert(prospectsTable).values({
        campaignId: campaign.id,
        companyName: contact.companyName,
        website: contact.website,
        city: contact.city,
        state: contact.state,
        audience: contact.audience,
        sourceUrl: contact.sourceUrl,
        researchNotes: `${contact.needSignals} Approval: ${contact.approvalStatus}.`,
        fitScore: 85,
        needScore: 80,
        needSignals: contact.needSignals,
        contactName: contact.contactName,
        contactTitle: contact.contactTitle,
        contactEmail: normalizedEmail,
        contactConfidence: "high",
        contactSourceUrl: contact.contactSourceUrl,
        dedupeKey: contact.dedupeKey,
        emailStatus: "verified",
        status: "approved",
        contactStatus: "active",
        contactEvidenceType: contact.emailLane === "personal"
          ? "findymail_verified"
          : "official_publication",
        contactEvidence: contact.emailEvidence,
        contactEvidenceAt: options.now ?? new Date(),
      }).onConflictDoNothing().returning({ id: prospectsTable.id });
      return Boolean(prospect);
    });
    if (!inserted) continue;
    usedEmails.add(normalizedEmail);
    usedDomains.add(domain);
    stored += 1;
  }
  if (stored !== AUG_30_TARGET) {
    throw new Error(`Verified August 30 outreach seed requires exactly 150 active prospects; found ${stored}`);
  }
  // The seed only supplies reviewed candidates. The preparation service owns all
  // message creation so the startup path cannot bypass the shared 150-slot ledger.
  return { state: "ready", queued: 0 };
}

function contactState(contact: unknown): string {
  if (
    typeof contact === "object"
    && contact !== null
    && "state" in contact
    && typeof contact.state === "string"
  ) return contact.state;
  return "AZ";
}
