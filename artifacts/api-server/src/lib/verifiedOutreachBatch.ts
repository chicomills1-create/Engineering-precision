import { and, eq } from "drizzle-orm";
import {
  campaignsTable,
  db,
  outreachMessagesTable,
  outreachResearchSchedulesTable,
  prospectsTable,
} from "@workspace/db";
import { getNextPhoenixEightAm } from "./outreachEligibility";
import { assertVerifiedOutreachBatch } from "./outreachContactValidation";
import { VERIFIED_OUTREACH_CONTACTS } from "./verifiedOutreachContacts";

const CAMPAIGN_NAME = "Approved 8 AM Outreach - August 2026";
const SUBJECT = "Need stamped engineering without the usual wait or cost?";
export { VERIFIED_OUTREACH_CONTACTS } from "./verifiedOutreachContacts";

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
  assertVerifiedOutreachBatch(VERIFIED_OUTREACH_CONTACTS);

  let [campaign] = await db.select().from(campaignsTable)
    .where(eq(campaignsTable.name, CAMPAIGN_NAME))
    .limit(1);
  if (!campaign) {
    [campaign] = await db.insert(campaignsTable).values({
      name: CAMPAIGN_NAME,
      audience: "mixed",
      states: ["AZ"],
      dailyLimit: 150,
      status: "active",
      subjectTemplate: SUBJECT,
      bodyTemplate: "Approved personalized Apex Grid outreach copy",
    }).returning();
  }
  if (!campaign) throw new Error("Unable to create the verified outreach campaign");
  if (campaign.dailyLimit !== 150 || campaign.audience !== "mixed") {
    const [updatedCampaign] = await db.update(campaignsTable)
      .set({ dailyLimit: 150, audience: "mixed" })
      .where(eq(campaignsTable.id, campaign.id))
      .returning();
    if (!updatedCampaign) throw new Error("Unable to set the outreach campaign daily limit");
    campaign = updatedCampaign;
  }
  await db.update(outreachResearchSchedulesTable)
    .set({ targetCount: 150 })
    .where(eq(outreachResearchSchedulesTable.campaignId, campaign.id));

  const scheduledAt = getNextPhoenixEightAm(options.now);
  for (const contact of VERIFIED_OUTREACH_CONTACTS) {
    const [prospect] = await db.insert(prospectsTable).values({
      campaignId: campaign.id,
      companyName: contact.companyName,
      website: contact.website,
      city: contact.city,
      state: "AZ",
      audience: contact.audience,
      sourceUrl: contact.sourceUrl,
      researchNotes: contact.needSignals,
      fitScore: 85,
      needScore: 80,
      needSignals: contact.needSignals,
      contactName: contact.contactName,
      contactTitle: contact.contactTitle,
      contactEmail: contact.contactEmail.toLowerCase(),
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
        contactEmail: contact.contactEmail.toLowerCase(),
        contactConfidence: "high",
        contactSourceUrl: contact.contactSourceUrl,
        emailStatus: "verified",
        status: "approved",
        updatedAt: new Date(),
      },
    }).returning();
    if (!prospect) throw new Error(`Unable to prepare ${contact.companyName}`);

    const [existing] = await db.select({ id: outreachMessagesTable.id })
      .from(outreachMessagesTable)
      .where(and(
        eq(outreachMessagesTable.prospectId, prospect.id),
        eq(outreachMessagesTable.campaignId, campaign.id),
        eq(outreachMessagesTable.sequenceNumber, 1),
      ))
      .limit(1);
    if (!existing) {
      await db.insert(outreachMessagesTable).values({
        prospectId: prospect.id,
        campaignId: campaign.id,
        sequenceNumber: 1,
        subject: SUBJECT,
        body: approvedOutreachBody(contact.contactName),
        status: "approved",
        scheduledAt,
      });
    }
  }

  const queued = await db.select({ id: outreachMessagesTable.id })
    .from(outreachMessagesTable)
    .where(and(
      eq(outreachMessagesTable.campaignId, campaign.id),
      eq(outreachMessagesTable.status, "approved"),
    ));
  if (queued.length !== VERIFIED_OUTREACH_CONTACTS.length) {
    throw new Error(`Expected ${VERIFIED_OUTREACH_CONTACTS.length} approved messages, found ${queued.length}`);
  }
  return { state: "ready", queued: queued.length };
}
