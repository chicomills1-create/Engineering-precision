import { and, eq, or, sql } from "drizzle-orm";
import {
  campaignsTable,
  db,
  outreachMessagesTable,
  outreachSuppressionsTable,
  prospectsTable,
} from "@workspace/db";
import customBuilderData from "../../../../.agents/outputs/hot-market-custom-builders-verified.json";
import localContractorData from "../../../../.agents/outputs/hot-market-local-contractors-verified.json";
import majorContractorData from "../../../../.agents/outputs/hot-market-major-contractors-verified.json";
import { assertVerifiedOutreachBatch } from "./outreachContactValidation";

export const HOT_MARKET_SOURCE_TYPE = "hot_market_one_time";
export const HOT_MARKET_TARGET_DATE = "2026-09-03";
export const HOT_MARKET_SEND_AT = new Date("2026-09-03T15:10:00.000Z");
const CAMPAIGN_NAME = "Arizona Hot-Market Builders - September 3, 2026";
const SUBJECT = "Fast engineering support for active projects";
const PRIOR_OUTREACH_EMAILS = new Set([
  "alston@alstonco.com",
  "frank.dascanio@weitz.com",
]);

type SourceContact = {
  companyName: string;
  website: string;
  city: string;
  state: string;
  contactName: string;
  contactTitle: string;
  contactEmail: string;
  contactSourceUrl: string;
  emailSourceUrl: string;
  companySourceUrl?: string;
  needSignalSourceUrl?: string;
  projectSourceUrl?: string;
  projectSourceUrls?: string[];
  needSignals?: string;
  activeProjectSignal?: string;
  projectEvidence?: string;
  personalization?: string;
  personalizationSentence?: string;
};

function slug(value: string): string {
  return value.toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 54);
}

const sourceContacts: SourceContact[] = [
  ...(customBuilderData as SourceContact[]),
  ...((localContractorData as { records: SourceContact[] }).records),
  ...((majorContractorData as { records: SourceContact[] }).records),
];

export const HOT_MARKET_OUTREACH_CONTACTS = sourceContacts
  .filter((contact) => !PRIOR_OUTREACH_EMAILS.has(contact.contactEmail.trim().toLowerCase()))
  .map((contact) => ({
    dedupeKey: `hot-market-2026-09-03-${slug(contact.companyName)}`,
    companyName: contact.companyName.trim(),
    website: contact.website,
    city: contact.city.trim(),
    state: "AZ",
    audience: "builder",
    contactName: contact.contactName.trim(),
    contactTitle: contact.contactTitle.trim(),
    contactEmail: contact.contactEmail.trim().toLowerCase(),
    contactSourceUrl: contact.contactSourceUrl,
    sourceUrl: contact.projectSourceUrl
      ?? contact.projectSourceUrls?.[0]
      ?? contact.needSignalSourceUrl
      ?? contact.companySourceUrl
      ?? contact.website,
    needSignals: contact.needSignals
      ?? contact.activeProjectSignal
      ?? contact.projectEvidence
      ?? "Current Arizona construction activity verified from public evidence.",
    emailLane: "public",
    emailEvidence: contact.emailSourceUrl,
    approvalStatus: "approved",
    personalization: (
      contact.personalizationSentence
      ?? contact.personalization
      ?? `${contact.companyName} has current construction activity in Arizona.`
    ).trim(),
  }));

export function hotMarketOutreachSubject(): string {
  return SUBJECT;
}

export function hotMarketOutreachBody(contact: {
  contactName: string;
  personalization: string;
}): string {
  const firstName = contact.contactName.trim().split(/\s+/)[0] || "there";
  return `Hi ${firstName},

${contact.personalization}

When a structural change, site issue, MEP coordination item, or permit response comes up, waiting on engineering can slow the job down.

Apex Grid is a veteran-owned, PE-led team providing focused Civil, Structural, MEP, permit-response, and drafting support. We deliver consistent work, keep scopes right-sized, provide clear competitive pricing before work starts, and typically turn around focused reviews or defined design responses in 12–24 hours.

Click the URL to visit our page: https://apexgrideng.com.

Do you have any current projects in your pipeline that you would like us to review?`;
}

export function hotMarketOutreachFollowUps(contactName: string): Array<{
  sequenceNumber: number;
  subject: string;
  body: string;
}> {
  const firstName = contactName.trim().split(/\s+/)[0] || "there";
  return [
    {
      sequenceNumber: 2,
      subject: `Re: ${SUBJECT}`,
      body: `Hi ${firstName},

Following up in case a structural, civil/site, MEP, or permit-response item is slowing an active project. Apex Grid can review the existing information, right-size the scope, and provide clear pricing before work begins.

Do you have any current projects in your pipeline that you would like us to review?`,
    },
    {
      sequenceNumber: 3,
      subject: `Re: ${SUBJECT}`,
      body: `Hi ${firstName},

Checking back once more. If your team needs consistent, PE-led engineering capacity without an oversized scope, Apex Grid can help with focused Civil, Structural, MEP, permit-response, and drafting work.

Would it be useful for us to review a current project and outline the fastest practical next step?`,
    },
    {
      sequenceNumber: 4,
      subject: `Re: ${SUBJECT}`,
      body: `Hi ${firstName},

I’ll close the loop after this note. Apex Grid is available when you need veteran-owned, PE-led engineering support with a right-sized scope and clear competitive pricing.

If a project comes up that you would like us to review, reply with the basic details and we will take a look.`,
    },
  ];
}

export async function seedHotMarketOutreachBatch(options: {
  enabled?: boolean;
  now?: Date;
} = {}): Promise<{ state: "skipped" | "expired" | "ready"; queued: number }> {
  const enabled = options.enabled ?? process.env.OUTREACH_SEED_VERIFIED_BATCH === "true";
  if (!enabled) return { state: "skipped", queued: 0 };
  const now = options.now ?? new Date();
  if (now.getTime() >= HOT_MARKET_SEND_AT.getTime()) {
    return { state: "expired", queued: 0 };
  }

  assertVerifiedOutreachBatch(HOT_MARKET_OUTREACH_CONTACTS, 14);

  let [campaign] = await db.select().from(campaignsTable)
    .where(eq(campaignsTable.name, CAMPAIGN_NAME))
    .limit(1);
  if (!campaign) {
    [campaign] = await db.insert(campaignsTable).values({
      name: CAMPAIGN_NAME,
      audience: "builder",
      states: ["AZ"],
      dailyLimit: HOT_MARKET_OUTREACH_CONTACTS.length,
      status: "active",
      subjectTemplate: SUBJECT,
      bodyTemplate: "Approved personalized Arizona hot-market builder copy",
    }).returning();
  }
  if (!campaign) throw new Error("Unable to create the hot-market outreach campaign");

  let queued = 0;
  for (const contact of HOT_MARKET_OUTREACH_CONTACTS) {
    const normalizedEmail = contact.contactEmail.toLowerCase();
    const domain = new URL(contact.website).hostname.replace(/^www\./, "").toLowerCase();
    const inserted = await db.transaction(async (tx) => {
      await tx.execute(sql`select pg_advisory_xact_lock(hashtextextended(${normalizedEmail}, 0))`);
      await tx.execute(sql`select pg_advisory_xact_lock(hashtextextended(${domain}, 0))`);

      const [suppression] = await tx.select({ id: outreachSuppressionsTable.id })
        .from(outreachSuppressionsTable)
        .where(eq(outreachSuppressionsTable.email, normalizedEmail))
        .limit(1);
      const [existing] = await tx.select({ id: prospectsTable.id })
        .from(prospectsTable)
        .where(or(
          eq(prospectsTable.dedupeKey, contact.dedupeKey),
          sql`lower(trim(${prospectsTable.contactEmail})) = ${normalizedEmail}`,
          sql`lower(${prospectsTable.website}) like ${`%${domain}%`}`,
        ))
        .limit(1);
      if (suppression || existing) return false;

      const [prospect] = await tx.insert(prospectsTable).values({
        campaignId: campaign.id,
        companyName: contact.companyName,
        website: contact.website,
        city: contact.city,
        state: contact.state,
        audience: contact.audience,
        sourceUrl: contact.sourceUrl,
        researchNotes: `${contact.needSignals} Approval: ${contact.approvalStatus}.`,
        fitScore: 90,
        needScore: 90,
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
        contactEvidenceType: "official_publication",
        contactEvidence: contact.emailEvidence,
        contactEvidenceAt: now,
        contactReviewAt: now,
      }).returning();
      if (!prospect) return false;

      await tx.insert(outreachMessagesTable).values([
        {
          prospectId: prospect.id,
          campaignId: campaign.id,
          sequenceNumber: 1,
          subject: hotMarketOutreachSubject(),
          body: hotMarketOutreachBody(contact),
          status: "approved",
          scheduledAt: HOT_MARKET_SEND_AT,
          sourceType: HOT_MARKET_SOURCE_TYPE,
        },
        ...hotMarketOutreachFollowUps(contact.contactName).map((followUp) => ({
          prospectId: prospect.id,
          campaignId: campaign.id,
          sequenceNumber: followUp.sequenceNumber,
          subject: followUp.subject,
          body: followUp.body,
          status: "approved",
          scheduledAt: null,
          sourceType: HOT_MARKET_SOURCE_TYPE,
        })),
      ]);
      return true;
    });
    if (inserted) queued += 1;
  }

  return { state: "ready", queued };
}