import { and, eq } from "drizzle-orm";
import {
  campaignsTable,
  db,
  outreachMessagesTable,
  outreachResearchSchedulesTable,
  prospectsTable,
} from "@workspace/db";
import { getNextPhoenixEightAm } from "./outreachEligibility";

const CAMPAIGN_NAME = "Approved 8 AM Outreach - August 2026";
const SUBJECT = "Need stamped engineering without the usual wait or cost?";

export const VERIFIED_OUTREACH_CONTACTS = [
  {
    dedupeKey: "verified-2026-08-28-krause",
    companyName: "Krause Architecture + Interiors",
    website: "https://krauseaz.com/",
    city: "Phoenix",
    contactName: "Brad Krause",
    contactTitle: "Founder and President",
    contactEmail: "info@krauseaz.com",
    contactSourceUrl: "https://krauseaz.com/contact/",
    sourceUrl: "https://krauseaz.com/team/brad-krause/",
    needSignals: "Public portfolio and leadership pages show active architecture and interiors work, including commercial and public-sector projects.",
  },
  {
    dedupeKey: "verified-2026-08-28-shade",
    companyName: "Shade Architects",
    website: "https://www.shadearch.com/",
    city: "Mesa",
    contactName: "Justin Trexler",
    contactTitle: "Founding Principal",
    contactEmail: "info@shadearch.com",
    contactSourceUrl: "https://www.shadearch.com/contact",
    sourceUrl: "https://www.shadearch.com/about",
    needSignals: "Official site lists tenant improvements, ground-up construction, adaptive reuse, civic work, and coordination with structural, MEP, and civil consultants.",
  },
  {
    dedupeKey: "verified-2026-08-28-dfdg",
    companyName: "DFDG Architecture",
    website: "https://www.dfdg.com/",
    city: "Phoenix",
    contactName: "Jana Brickey",
    contactTitle: "Principal, Business Development and Marketing",
    contactEmail: "dfdg@dfdg.com",
    contactSourceUrl: "https://www.dfdg.com/contact",
    sourceUrl: "https://www.dfdg.com/our-work/project/asu-health-headquarters",
    needSignals: "Official project page shows the active 175,000-square-foot ASU Health Headquarters with estimated Fall 2028 completion.",
  },
  {
    dedupeKey: "verified-2026-08-28-orcutt-winslow",
    companyName: "Orcutt | Winslow",
    website: "https://www.owp.com/",
    city: "Phoenix",
    contactName: "Mike Kolejka",
    contactTitle: "Principal Contact",
    contactEmail: "kolejka.m@owp.com",
    contactSourceUrl: "https://www.arizonaleadingage.org/Orcutt-Winslow",
    sourceUrl: "https://www.arizonaleadingage.org/Orcutt-Winslow",
    needSignals: "Arizona LeadingAge identifies the named contact and the firm's continuing senior-living architecture practice and project portfolio.",
  },
  {
    dedupeKey: "verified-2026-08-28-esb",
    companyName: "ESB Design+Build",
    website: "https://esbdesignbuild.com/",
    city: "Marana",
    contactName: "Lois Morey",
    contactTitle: "CEO and Co-owner",
    contactEmail: "info@esbdesignbuild.com",
    contactSourceUrl: "https://esbdesignbuild.com/contact/",
    sourceUrl: "https://esbdesignbuild.com/",
    needSignals: "Official site describes current expedited turnkey commercial, steel-frame modular, prefab, site, utility, and full construction services.",
  },
  {
    dedupeKey: "verified-2026-08-28-proconstructor",
    companyName: "ProConstructor",
    website: "https://proconstructor.com/",
    city: "Phoenix",
    contactName: "Steve Shinn",
    contactTitle: "Founder and Owner",
    contactEmail: "steve@proconstructor.com",
    contactSourceUrl: "https://proconstructor.com/services/",
    sourceUrl: "https://proconstructor.com/services/",
    needSignals: "Official site publicly lists the founder address and current commercial design-build, tenant-improvement, workplace, hospitality, and faith-facility services.",
  },
  {
    dedupeKey: "verified-2026-08-28-deutsch",
    companyName: "Deutsch Architecture Group",
    website: "https://www.2929.com/",
    city: "Phoenix",
    contactName: "Bernie Deutsch",
    contactTitle: "Founder and President",
    contactEmail: "info@2929.com",
    contactSourceUrl: "https://www.2929.com/contact-1",
    sourceUrl: "https://www.2929.com/company-leaders/bernie-deutsch",
    needSignals: "Official leadership and portfolio pages show active commercial and industrial architecture work, including the NIRVC sales and storage project.",
  },
  {
    dedupeKey: "verified-2026-08-28-nelsen",
    companyName: "Nelsen Partners",
    website: "https://nelsenpartners.com/",
    city: "Scottsdale",
    contactName: "Gerald Melara",
    contactTitle: "Vice President and Arizona Managing Director",
    contactEmail: "gmelara@nelsenpartners.com",
    contactSourceUrl: "https://nelsenpartners.com/contact/",
    sourceUrl: "https://nelsenpartners.com/contact/",
    needSignals: "Official contact and portfolio pages identify the Arizona managing director and invite project-specific inquiries for active architecture and planning work.",
  },
  {
    dedupeKey: "verified-2026-08-28-jones-studio",
    companyName: "Jones Studio",
    website: "https://jonesstudioinc.com/",
    city: "Tempe",
    contactName: "Jacob Benyi",
    contactTitle: "Co-owner and President",
    contactEmail: "jacob@jonesstudioinc.com",
    contactSourceUrl: "https://jonesstudioinc.com/jacob-benyi/",
    sourceUrl: "https://jonesstudioinc.com/jacob-benyi/",
    needSignals: "Official bio lists current leadership of complex projects and active federal, educational, and public project experience.",
  },
  {
    dedupeKey: "verified-2026-08-28-cosan",
    companyName: "Cosan Studio",
    website: "https://www.cosanstudio.com/",
    city: "Scottsdale",
    contactName: "Scott Carson",
    contactTitle: "Principal and Founder",
    contactEmail: "scott@cosanstudio.com",
    contactSourceUrl: "https://www.cosanstudio.com/about",
    sourceUrl: "https://www.cosanstudio.com/about",
    needSignals: "Official team page identifies the principal and direct email and describes an active portfolio spanning commercial, residential, and educational work.",
  },
] as const;

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

  let [campaign] = await db.select().from(campaignsTable)
    .where(eq(campaignsTable.name, CAMPAIGN_NAME))
    .limit(1);
  if (!campaign) {
    [campaign] = await db.insert(campaignsTable).values({
      name: CAMPAIGN_NAME,
      audience: "architect",
      states: ["AZ"],
      dailyLimit: 167,
      status: "active",
      subjectTemplate: SUBJECT,
      bodyTemplate: "Approved personalized Apex Grid outreach copy",
    }).returning();
  }
  if (!campaign) throw new Error("Unable to create the verified outreach campaign");
  if (campaign.dailyLimit !== 167) {
    const [updatedCampaign] = await db.update(campaignsTable)
      .set({ dailyLimit: 167 })
      .where(eq(campaignsTable.id, campaign.id))
      .returning();
    if (!updatedCampaign) throw new Error("Unable to set the outreach campaign daily limit");
    campaign = updatedCampaign;
  }
  await db.update(outreachResearchSchedulesTable)
    .set({ targetCount: 167 })
    .where(eq(outreachResearchSchedulesTable.campaignId, campaign.id));

  const scheduledAt = getNextPhoenixEightAm(options.now);
  for (const contact of VERIFIED_OUTREACH_CONTACTS) {
    const [prospect] = await db.insert(prospectsTable).values({
      campaignId: campaign.id,
      companyName: contact.companyName,
      website: contact.website,
      city: contact.city,
      state: "AZ",
      audience: "architect",
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