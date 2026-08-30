import { and, eq, notInArray, sql } from "drizzle-orm";
import {
  campaignsTable,
  db,
  outreachResearchSchedulesTable,
  outreachSuppressionsTable,
  prospectsTable,
} from "@workspace/db";
import { assertVerifiedOutreachBatch } from "./outreachContactValidation";
import { ObjectStorageService } from "./objectStorage";
import { VERIFIED_OUTREACH_CONTACTS as LEGACY_VERIFIED_OUTREACH_CONTACTS } from "./verifiedOutreachContacts";
import { VERIFIED_OUTREACH_CONTACTS_AUG_29 } from "./verifiedOutreachContactsAug29";

const CAMPAIGN_NAME = "Approved 8 AM Outreach - August 2026";
const SUBJECT = "Need stamped engineering without the usual wait or cost?";
export const VERIFIED_OUTREACH_CONTACTS = [
  ...LEGACY_VERIFIED_OUTREACH_CONTACTS,
  ...VERIFIED_OUTREACH_CONTACTS_AUG_29,
] as const;

type VerifiedOutreachContact = {
  dedupeKey: string;
  companyName: string;
  website: string;
  city: string;
  state?: string;
  audience: string;
  contactName: string;
  contactTitle: string;
  contactEmail: string;
  contactSourceUrl: string;
  sourceUrl: string;
  needSignals: string;
};

const STAGED_BATCH_OBJECT = "/objects/outreach/verified-2026-08-31.json";

async function loadStagedVerifiedContacts(): Promise<VerifiedOutreachContact[]> {
  const storage = new ObjectStorageService();
  const file = await storage.getObjectEntityFile(STAGED_BATCH_OBJECT);
  const [contents] = await file.download();
  const parsed: unknown = JSON.parse(contents.toString("utf8"));
  if (!Array.isArray(parsed)) {
    throw new Error("The staged verified outreach batch is not an array");
  }
  return parsed as VerifiedOutreachContact[];
}

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
  const stagedContacts = await loadStagedVerifiedContacts();
  assertVerifiedOutreachBatch(stagedContacts, 150);
  const contacts: VerifiedOutreachContact[] = [
    ...VERIFIED_OUTREACH_CONTACTS,
    ...stagedContacts,
  ];
  assertVerifiedOutreachBatch(contacts, 463);

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
    || campaign.states.length !== 2
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

  for (const contact of contacts) {
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
       state: contact.state ?? "AZ",
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
  // The seed only supplies reviewed candidates. The preparation service owns all
  // message creation so the startup path cannot bypass the shared 150-slot ledger.
  return { state: "ready", queued: 0 };
}
