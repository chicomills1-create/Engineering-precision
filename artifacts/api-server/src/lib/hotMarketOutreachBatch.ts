import { and, count, eq, gte, inArray, lt, or, sql } from "drizzle-orm";
import {
  campaignsTable,
  db,
  outreachMessagesTable,
  outreachSuppressionsTable,
  prospectsTable,
} from "@workspace/db";
import customBuilderData from "../../../../.agents/outputs/hot-market-custom-builders-verified.json";
import customBuilderRecheckData from "../../../../.agents/outputs/hot-market-custom-builders-recheck-verified.json";
import localContractorData from "../../../../.agents/outputs/hot-market-local-contractors-verified.json";
import majorContractorData from "../../../../.agents/outputs/hot-market-major-contractors-verified.json";
import commercialRecheckData from "../../../../.agents/outputs/hot-market-commercial-recheck-verified.json";
import referralPartnerData from "../../../../.agents/outputs/hot-market-referral-partners-verified.json";
import {
  assertVerifiedHotMarketContact,
  assertVerifiedOutreachBatch,
} from "./outreachContactValidation";
import { approvedOutreachBody } from "./verifiedOutreachBatch";
import {
  RESEARCH_STATE_ORDER,
  type DiscoveredHotMarketProspect,
} from "./publicResearch";

export const HOT_MARKET_SOURCE_TYPE = "hot_market_one_time";

export const HOT_MARKET_RECURRING_SOURCE_TYPE = "hot_market_verified_national";
export const HOT_MARKET_DAILY_TARGET = 50;
export const HOT_MARKET_TARGET_DATE = "2026-09-03";
export const HOT_MARKET_SEND_AT = new Date("2026-09-03T15:10:00.000Z");
const CAMPAIGN_NAME = "Arizona Hot-Market Builders - September 3, 2026";
const SUBJECT = "Fast engineering support for active projects";

const NATIONAL_CAMPAIGN_NAME = "Verified National Hot-Market Outreach";
const PRIOR_OUTREACH_EMAILS = new Set([
  "alston@alstonco.com",
  "frank.dascanio@weitz.com",
]);
const BROADER_PERSONALIZATIONS: Record<string, string> = {
  "Armstrong Construction Group":
    "Armstrong’s official project portfolio highlights high-end custom homes and major remodels in Arizona’s luxury-home market.",
  "Moss Custom Homes":
    "Moss Custom Homes’ portfolio spans luxury residences across several high-end Arizona communities.",
  SWABACK:
    "SWABACK’s In the Works collection—especially its Arizona infill and hillside-residence work—stood out as a strong example of projects where early site, drainage, utility, and permitting coordination can protect the design intent.",
};

type SourceContact = {
  companyName: string;
  website: string;
  city: string;
  state: string;
  audience: string;
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
  ...(customBuilderRecheckData as SourceContact[]),
  ...((localContractorData as { records: SourceContact[] }).records),
  ...((majorContractorData as { records: SourceContact[] }).records),
  ...((commercialRecheckData as { records: SourceContact[] }).records),
  ...((referralPartnerData as { records: SourceContact[] }).records),
];

export const HOT_MARKET_OUTREACH_CONTACTS = sourceContacts
  .filter((contact) => !PRIOR_OUTREACH_EMAILS.has(contact.contactEmail.trim().toLowerCase()))
  .map((contact) => ({
    dedupeKey: `hot-market-2026-09-03-${slug(contact.companyName)}`,
    companyName: contact.companyName.trim(),
    website: contact.website,
    city: contact.city.trim(),
    state: "AZ",
    audience: contact.audience === "architect_design_partner" ? "architect" : "builder",
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
      BROADER_PERSONALIZATIONS[contact.companyName]
      ?? contact.personalizationSentence
      ?? contact.personalization
      ?? `${contact.companyName} has current construction activity in Arizona.`
    ).trim(),
  }));

export function hotMarketOutreachSubject(audience = "builder", _state = "AZ"): string {
  return audience === "architect"
    ? "A reliable engineering partner for active projects"
    : SUBJECT;
}

export function isHotMarketSourceType(sourceType: string | null): boolean {
  return HOT_MARKET_SOURCE_TYPES.includes(
    sourceType as typeof HOT_MARKET_SOURCE_TYPES[number],
  );
}
export function hotMarketOutreachBody(contact: {
  contactName: string;
  personalization: string;
  audience: string;
}): string {
  return approvedOutreachBody(contact.contactName);
}

export function hotMarketOutreachFollowUps(
  contactName: string,
  audience = "builder",
  state = "AZ",
): Array<{
  sequenceNumber: number;
  subject: string;
  body: string;
}> {
  const firstName = contactName.trim().split(/\s+/)[0] || "there";
  const subject = hotMarketOutreachSubject(audience, state);
  const marketLabel = "active";
  if (audience === "architect") {
    return [
      {
        sequenceNumber: 2,
        subject: `Re: ${subject}`,
        body: `Hi ${firstName},

Following up in case one of your ${marketLabel} projects needs added civil/site, drainage, utility, structural, MEP, or permit-response capacity. Apex Grid can support the technical scope while your team retains the client and design relationship.

Do you have any current projects in your pipeline that you would like us to review?`,
      },
      {
        sequenceNumber: 3,
        subject: `Re: ${subject}`,
        body: `Hi ${firstName},

Checking back once more. If your team or builder needs a responsive engineering partner for a focused issue, overflow production, or coordinated permit package, Apex Grid is available with a right-sized scope and clear pricing.

Would it be useful for us to review a current project and outline the fastest practical next step?`,
      },
      {
        sequenceNumber: 4,
        subject: `Re: ${subject}`,
        body: `Hi ${firstName},

I’ll close the loop after this note. Apex Grid is available as a veteran-owned, PE-led engineering partner when an ${marketLabel} project needs additional technical capacity without disrupting your client relationship.

If a project comes up that you would like us to review, reply with the basic details and we will take a look.`,
      },
    ];
  }
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

async function ensureNationalHotMarketCampaign() {
  let [campaign] = await db.select().from(campaignsTable)
    .where(eq(campaignsTable.name, NATIONAL_CAMPAIGN_NAME))
    .limit(1);
  if (!campaign) {
    [campaign] = await db.insert(campaignsTable).values({
      name: NATIONAL_CAMPAIGN_NAME,
      audience: "mixed",
      states: [...RESEARCH_STATE_ORDER],
      dailyLimit: NATIONAL_HOT_MARKET_CAMPAIGN_LIMIT,
      status: "active",
      subjectTemplate: SUBJECT,
      bodyTemplate: "Verified project-specific hot-market outreach copy",
    }).returning();
  }
  if (!campaign) throw new Error("Unable to create the national hot-market campaign");
  if (
    campaign.audience !== "mixed"
    || campaign.dailyLimit !== NATIONAL_HOT_MARKET_CAMPAIGN_LIMIT
    || campaign.status !== "active"
    || campaign.states.length !== RESEARCH_STATE_ORDER.length
  ) {
    const [updated] = await db.update(campaignsTable).set({
      audience: "mixed",
      states: [...RESEARCH_STATE_ORDER],
      dailyLimit: NATIONAL_HOT_MARKET_CAMPAIGN_LIMIT,
      status: "active",
    }).where(eq(campaignsTable.id, campaign.id)).returning();
    if (!updated) throw new Error("Unable to update the national hot-market campaign");
    campaign = updated;
  }
  return campaign;
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

  assertVerifiedOutreachBatch(
    HOT_MARKET_OUTREACH_CONTACTS,
    HOT_MARKET_OUTREACH_CONTACTS.length,
  );
  const hotMarketDailyLimit = Math.max(
    HOT_MARKET_DAILY_TARGET,
    HOT_MARKET_OUTREACH_CONTACTS.length,
  );

  let [campaign] = await db.select().from(campaignsTable)
    .where(eq(campaignsTable.name, CAMPAIGN_NAME))
    .limit(1);
  if (!campaign) {
    [campaign] = await db.insert(campaignsTable).values({
      name: CAMPAIGN_NAME,
      audience: "mixed",
      states: ["AZ"],
      dailyLimit: hotMarketDailyLimit,
      status: "active",
      subjectTemplate: SUBJECT,
      bodyTemplate: "Approved personalized Arizona hot-market builder copy",
    }).returning();
  }
  if (!campaign) throw new Error("Unable to create the hot-market outreach campaign");
  if (
    campaign.dailyLimit !== hotMarketDailyLimit
    || campaign.audience !== "mixed"
  ) {
    const [updatedCampaign] = await db.update(campaignsTable)
      .set({
        dailyLimit: hotMarketDailyLimit,
        audience: "mixed",
      })
      .where(eq(campaignsTable.id, campaign.id))
      .returning();
    if (!updatedCampaign) throw new Error("Unable to update the hot-market campaign limit");
    campaign = updatedCampaign;
  }

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
          subject: hotMarketOutreachSubject(contact.audience),
          body: hotMarketOutreachBody(contact),
          status: "approved",
          scheduledAt: HOT_MARKET_SEND_AT,
          sourceType: HOT_MARKET_SOURCE_TYPE,
        },
        ...hotMarketOutreachFollowUps(
          contact.contactName,
          contact.audience,
        ).map((followUp) => ({
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

const HOT_MARKET_SEND_OFFSET_MS = 10 * 60_000;

export const HOT_MARKET_SOURCE_TYPES = [
  HOT_MARKET_SOURCE_TYPE,
  HOT_MARKET_RECURRING_SOURCE_TYPE,
] as const;

export function getHotMarketScheduledAt(regularWindowAt: Date): Date {
  return new Date(regularWindowAt.getTime() + HOT_MARKET_SEND_OFFSET_MS);
}

const NATIONAL_HOT_MARKET_CAMPAIGN_LIMIT = 6000;

export async function stageVerifiedHotMarketProspects(
  candidates: readonly DiscoveredHotMarketProspect[],
  options: {
    targetDate: string;
    scheduledAt: Date;
    targetCount?: number;
    now?: Date;
  },
): Promise<{ staged: number; skipped: number; shortfall: number }> {
  const targetCount = Math.max(
    0,
    Math.round(options.targetCount ?? HOT_MARKET_DAILY_TARGET),
  );
  const campaign = await ensureNationalHotMarketCampaign();
  const now = options.now ?? new Date();
  const targetEnd = new Date(options.scheduledAt.getTime() + 24 * 60 * 60_000);
  let staged = 0;
  let skipped = 0;

  for (const candidate of candidates) {
    try {
      assertVerifiedHotMarketContact({
        ...candidate,
        projectEvidenceUrl: candidate.projectEvidenceUrl,
      });
    } catch {
      skipped += 1;
      continue;
    }
    const normalizedEmail = candidate.contactEmail.trim().toLowerCase();
    const domain = new URL(candidate.website).hostname.replace(/^www\./, "").toLowerCase();
    const inserted = await db.transaction(async (tx) => {
      await tx.execute(sql`select pg_advisory_xact_lock(
        hashtextextended(${`hot-market-window:${options.targetDate}`}, 0)
      )`);
      const [existingTarget] = await tx.select({ value: count() })
        .from(outreachMessagesTable)
        .where(and(
          eq(outreachMessagesTable.sequenceNumber, 1),
          inArray(outreachMessagesTable.sourceType, [...HOT_MARKET_SOURCE_TYPES]),
          gte(outreachMessagesTable.scheduledAt, options.scheduledAt),
          lt(outreachMessagesTable.scheduledAt, targetEnd),
          inArray(outreachMessagesTable.status, ["approved", "sending", "sent", "delivered"]),
        ));
      if ((existingTarget?.value ?? 0) >= targetCount) return "full" as const;

      await tx.execute(sql`select pg_advisory_xact_lock(hashtextextended(${normalizedEmail}, 0))`);
      await tx.execute(sql`select pg_advisory_xact_lock(hashtextextended(${domain}, 0))`);
      const [suppression] = await tx.select({ id: outreachSuppressionsTable.id })
        .from(outreachSuppressionsTable)
        .where(eq(outreachSuppressionsTable.email, normalizedEmail))
        .limit(1);
      const [existing] = await tx.select({ id: prospectsTable.id })
        .from(prospectsTable)
        .where(or(
          eq(prospectsTable.dedupeKey, candidate.dedupeKey),
          sql`lower(trim(${prospectsTable.contactEmail})) = ${normalizedEmail}`,
          sql`lower(${prospectsTable.website}) like ${`%${domain}%`}`,
        ))
        .limit(1);
      if (suppression || existing) return "duplicate" as const;

      const [prospect] = await tx.insert(prospectsTable).values({
        campaignId: campaign.id,
        companyName: candidate.companyName.trim(),
        website: candidate.website,
        city: candidate.city.trim(),
        state: candidate.state,
        audience: candidate.audience,
        sourceUrl: candidate.projectEvidenceUrl,
        researchNotes: [
          candidate.researchNotes.trim(),
          `Project evidence: ${candidate.projectEvidenceUrl}.`,
          `Named-role evidence: ${candidate.contactSourceUrl}.`,
          `Company-domain email evidence: ${candidate.emailSourceUrl}.`,
          "Approval: automated_verified_public_evidence.",
        ].join(" "),
        fitScore: candidate.fitScore,
        needScore: candidate.needScore,
        needSignals: candidate.needSignals.trim(),
        contactName: candidate.contactName.trim(),
        contactTitle: candidate.contactTitle.trim(),
        contactEmail: normalizedEmail,
        contactConfidence: "high",
        contactSourceUrl: candidate.contactSourceUrl,
        dedupeKey: candidate.dedupeKey,
        emailStatus: "verified",
        status: "approved",
        contactStatus: "active",
        contactEvidenceType: "official_publication",
        contactEvidence:
          `Published company-domain email ${normalizedEmail}: ${candidate.emailSourceUrl}`,
        contactEvidenceAt: now,
        contactReviewAt: now,
      }).onConflictDoNothing().returning();
      if (!prospect) return "duplicate" as const;

      const personalization = candidate.researchNotes.trim();
      await tx.insert(outreachMessagesTable).values([
        {
          prospectId: prospect.id,
          campaignId: campaign.id,
          sequenceNumber: 1,
          subject: hotMarketOutreachSubject(candidate.audience, candidate.state),
          body: hotMarketOutreachBody({
            contactName: candidate.contactName,
            personalization,
            audience: candidate.audience,
          }),
          status: "approved",
          scheduledAt: options.scheduledAt,
          sourceType: HOT_MARKET_RECURRING_SOURCE_TYPE,
        },
        ...hotMarketOutreachFollowUps(
          candidate.contactName,
          candidate.audience,
          candidate.state,
        ).map((followUp) => ({
          prospectId: prospect.id,
          campaignId: campaign.id,
          sequenceNumber: followUp.sequenceNumber,
          subject: followUp.subject,
          body: followUp.body,
          status: "approved",
          scheduledAt: null,
          sourceType: HOT_MARKET_RECURRING_SOURCE_TYPE,
        })),
      ]);
      return "inserted" as const;
    });
    if (inserted === "full") break;
    if (inserted === "inserted") staged += 1;
    else skipped += 1;
  }

  const [current] = await db.select({ value: count() })
    .from(outreachMessagesTable)
    .where(and(
      eq(outreachMessagesTable.sequenceNumber, 1),
      inArray(outreachMessagesTable.sourceType, [...HOT_MARKET_SOURCE_TYPES]),
      gte(outreachMessagesTable.scheduledAt, options.scheduledAt),
      lt(outreachMessagesTable.scheduledAt, targetEnd),
      inArray(outreachMessagesTable.status, ["approved", "sending", "sent", "delivered"]),
    ));
  return {
    staged,
    skipped,
    shortfall: Math.max(0, targetCount - (current?.value ?? 0)),
  };
}
