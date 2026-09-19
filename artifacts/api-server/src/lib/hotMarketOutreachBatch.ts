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
import texasExpansionData from "../../../../.agents/outputs/hot-market-texas-verified.json";
import southeastExpansionData from "../../../../.agents/outputs/hot-market-southeast-verified.json";
import carolinasExpansionData from "../../../../.agents/outputs/hot-market-carolinas-verified.json";
import mountainExpansionData from "../../../../.agents/outputs/hot-market-mountain-verified.json";
import nationalExpansionData from "../../../../.agents/outputs/hot-market-national-verified.json";
import septemberFiveData from "../../../../.agents/outputs/hot-market-sep05-final-verified.json";
import { HOT_MARKET_CONTACTS_SEP_05 } from "./hotMarketContactsSep05";
import {
  assertVerifiedHotMarketContact,
  assertVerifiedOutreachBatch,
} from "./outreachContactValidation";
import {
  approvedOutreachBody,
  approvedOutreachFollowUpMessages,
} from "./verifiedOutreachBatch";
import {
  RESEARCH_STATE_ORDER,
  type DiscoveredHotMarketProspect,
} from "./publicResearch";
import { getNextPhoenixEightPm } from "./outreachEligibility";

export const HOT_MARKET_SOURCE_TYPE = "hot_market_one_time";

export const HOT_MARKET_RECURRING_SOURCE_TYPE = "hot_market_verified_national";
export const HOT_MARKET_DAILY_TARGET = 100;
/** Reviewed one-time inventory size. Change only when approving an inventory update. */
export const APPROVED_HOT_MARKET_INVENTORY_SIZE = 129;
const CAMPAIGN_NAME = "Verified National Hot-Market Expansion - September 4, 2026";
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
  emailLane?: "personal" | "public";
};

type ExpansionContact = SourceContact & {
  lane: "direct_client" | "referral_partner";
  projectEvidenceUrl: string;
  personalization: string;
};

const PREVIOUSLY_CONTACTED_EXPANSION_DOMAINS = new Set([
  "econtractors.com",
  "fieldpaoli.com",
  "formgrey.com",
  "jhlconstructors.com",
  "mithun.com",
  "mortenson.com",
  "pepperconstruction.com",
  "webcor.com",
]);

function companyDomain(website: string): string {
  return new URL(website).hostname.replace(/^www\./, "").toLowerCase();
}

const expansionContacts = [
  ...((texasExpansionData as { records: ExpansionContact[] }).records),
  ...((southeastExpansionData as { records: ExpansionContact[] }).records),
  ...((carolinasExpansionData as { records: ExpansionContact[] }).records),
  ...((mountainExpansionData as { records: ExpansionContact[] }).records),
  ...((nationalExpansionData as { records: ExpansionContact[] }).records),
]
  .filter((contact) => !PREVIOUSLY_CONTACTED_EXPANSION_DOMAINS.has(companyDomain(contact.website)))
  .slice(0, HOT_MARKET_DAILY_TARGET)
  .map((contact): SourceContact => ({
    ...contact,
    audience: contact.lane === "referral_partner" ? "architect_design_partner" : "builder",
    projectSourceUrl: contact.projectEvidenceUrl,
    personalizationSentence: contact.personalization,
  }));

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
  ...expansionContacts,
  ...(septemberFiveData as SourceContact[]),
  // Additive September 5 top-up with independently recorded FindyMail evidence.
  ...HOT_MARKET_CONTACTS_SEP_05.map(([companyName, website, city, state, audience, contactName, contactTitle, contactEmail, contactSourceUrl, emailSourceUrl, companySourceUrl, projectSourceUrl]): SourceContact => ({
    companyName, website, city, state, audience, contactName, contactTitle, contactEmail,
    contactSourceUrl, emailSourceUrl, companySourceUrl, projectSourceUrl,
    needSignals: `FindyMail verified name/domain lookup; official service and current-market trigger: ${projectSourceUrl}`,
    personalizationSentence: `${companyName} has official published services and current market activity relevant to active projects.`,
  })),
];

const uniqueCompanyDomains = new Set<string>();

export const HOT_MARKET_OUTREACH_CONTACTS = sourceContacts
  .filter((contact) => !PRIOR_OUTREACH_EMAILS.has(contact.contactEmail.trim().toLowerCase()))
  .filter((contact) => {
    const domain = companyDomain(contact.website);
    if (uniqueCompanyDomains.has(domain)) return false;
    uniqueCompanyDomains.add(domain);
    return true;
  })
  .map((contact) => ({
    dedupeKey: `hot-market-one-time-${slug(contact.companyName)}`,
    companyName: contact.companyName.trim(),
    website: contact.website,
    city: contact.city.trim(),
    state: contact.state.trim().toUpperCase(),
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
    emailLane: contact.emailLane ?? "public",
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
    : "Fast engineering support for active projects";
}

export function isHotMarketSourceType(sourceType: string | null): boolean {
  return HOT_MARKET_SOURCE_TYPES.includes(
    sourceType as typeof HOT_MARKET_SOURCE_TYPES[number],
  );
}

/** Schedules hot-market outreach ten minutes after the next regular Phoenix window. */
export function getOneTimeHotMarketScheduledAt(now = new Date()): Date {
  return getHotMarketScheduledAt(getNextPhoenixEightPm(now));
}

export function hotMarketOutreachBody(contact: {
  contactName: string;
  personalization: string;
  audience: string;
}): string {
  const firstName = contact.contactName.trim().split(/\s+/)[0] || "there";
  if (contact.audience === "architect") {
    return `Hi ${firstName},

${contact.personalization.trim()}

Apex Grid is a veteran-owned, PE-led team providing Civil, Structural, MEP, drainage, utility, permit-response, and drafting support. We work alongside architects and design teams when a project needs additional technical capacity, a builder-friendly response, or a trusted engineering referral—without taking over the client relationship.

We’re Arizona-based, but licensed to support projects across 49 states, so we can stay useful when your team or partners work outside Arizona.

We keep scopes right-sized, provide clear competitive pricing before work starts, and typically turn around focused reviews or defined design responses in 12–24 hours.

Do you have any current projects in your pipeline that you would like us to review?`;
  }
  return `Hi ${firstName},

${contact.personalization.trim()}

When a structural change, site issue, MEP coordination item, or permit response comes up, waiting on engineering can slow the job down.

Apex Grid is a veteran-owned, PE-led team providing focused Civil, Structural, MEP, permit-response, and drafting support. We deliver consistent work, keep scopes right-sized, provide clear competitive pricing before work starts, and typically turn around focused reviews or defined design responses in 12–24 hours.

We’re Arizona-based, but licensed to support projects across 49 states, so we can stay useful when your team or partners work outside Arizona.

Do you have any current projects in your pipeline that you would like us to review?`;
}

export function hotMarketOutreachFollowUps(
  contactName: string,
  audience = "builder",
  _state = "AZ",
): Array<{
  sequenceNumber: number;
  subject: string;
  body: string;
}> {
  const firstName = contactName.trim().split(/\s+/)[0] || "there";
  if (audience === "architect") {
    return [{
      sequenceNumber: 2,
      subject: "A reliable engineering partner for active projects",
      body: `Hi ${firstName},

I wanted to follow up in case your team could use additional Civil, Structural, or MEP capacity on an active project while keeping the architectural relationship and design direction fully in your hands.

Do you have any current projects in your pipeline that you would like us to review?`,
    }];
  }
  return approvedOutreachFollowUpMessages(contactName);
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
} = {}): Promise<{ state: "skipped" | "ready"; queued: number }> {
  const enabled = options.enabled ?? process.env.OUTREACH_SEED_VERIFIED_BATCH === "true";
  if (!enabled) return { state: "skipped", queued: 0 };
  const now = options.now ?? new Date();
  const scheduledAt = getOneTimeHotMarketScheduledAt(now);

  assertVerifiedOutreachBatch(
    HOT_MARKET_OUTREACH_CONTACTS,
    APPROVED_HOT_MARKET_INVENTORY_SIZE,
  );
  const hotMarketDailyLimit = Math.max(
    HOT_MARKET_DAILY_TARGET,
    HOT_MARKET_OUTREACH_CONTACTS.length,
  );
  const campaignStates = [...new Set(HOT_MARKET_OUTREACH_CONTACTS.map((contact) => contact.state))];

  let [campaign] = await db.select().from(campaignsTable)
    .where(eq(campaignsTable.name, CAMPAIGN_NAME))
    .limit(1);
  if (!campaign) {
    [campaign] = await db.insert(campaignsTable).values({
      name: CAMPAIGN_NAME,
      audience: "mixed",
      states: campaignStates,
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
    || campaign.states.join(",") !== campaignStates.join(",")
  ) {
    const [updatedCampaign] = await db.update(campaignsTable)
      .set({
        dailyLimit: hotMarketDailyLimit,
        audience: "mixed",
        states: campaignStates,
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
        contactEvidenceType: contact.emailLane === "personal"
          ? "findymail_verified"
          : "official_publication",
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
          subject: hotMarketOutreachSubject(contact.audience, contact.state),
          body: hotMarketOutreachBody(contact),
          status: "approved",
          scheduledAt,
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
          eq(outreachMessagesTable.sourceType, HOT_MARKET_RECURRING_SOURCE_TYPE),
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
