import { and, eq, inArray, notInArray, sql } from "drizzle-orm";
import {
  campaignsTable,
  db,
  outreachResearchSchedulesTable,
  outreachSuppressionsTable,
  prospectsTable,
} from "@workspace/db";
import {
  assertVerifiedOutreachBatch,
  evaluateVerifiedOutreachPreflight,
  type OutreachPreflightReport,
  type VerifiedBatchContactValidationInput,
} from "./outreachContactValidation";
import { VERIFIED_OUTREACH_CONTACTS as LEGACY_VERIFIED_OUTREACH_CONTACTS } from "./verifiedOutreachContacts";
import { VERIFIED_OUTREACH_CONTACTS_AUG_29 } from "./verifiedOutreachContactsAug29";
import { VERIFIED_OUTREACH_CONTACTS_AUG_30 } from "./verifiedOutreachContactsAug30";
import { VERIFIED_OUTREACH_CONTACTS_AUG_31 } from "./verifiedOutreachContactsAug31";
import { VERIFIED_OUTREACH_CONTACTS_SEP_02 } from "./verifiedOutreachContactsSep02";
import { VERIFIED_OUTREACH_CONTACTS_SEP_02_PUBLIC } from "./verifiedOutreachContactsSep02Public";
import { VERIFIED_OUTREACH_CONTACTS_SEP_05 } from "./verifiedOutreachContactsSep05";
import { VERIFIED_OUTREACH_CONTACTS_SEP_05_DIRECT } from "./verifiedOutreachContactsSep05Direct";
import { LICENSED_OUTREACH_STATES } from "./hotMarketResearch";

const CAMPAIGN_NAME = "Approved 8 PM Outreach - September 2026";
export const REGULAR_OUTREACH_DAILY_TARGET = 150;
export const VERIFIED_OUTREACH_CONTACTS = [
  ...LEGACY_VERIFIED_OUTREACH_CONTACTS,
  ...VERIFIED_OUTREACH_CONTACTS_AUG_29,
] as const;

const AUG_30_TARGET = 150;
const AUG_31_TARGET = 150;
const SEP_02_TARGET = 145;
const SEP_02_PUBLIC_TARGET = 41;
const SEP_05_DIRECT_LIBRARY_TARGET = 117;
const SEP_05_DIRECT_REQUIRED_TARGET = 110;
const SEP_05_PUBLIC_TARGET = 50;

/**
 * September 2026 relaunch subject. The firm name is resolved at message
 * creation/send time; when no company name is available the subject falls
 * back to a generic but still honest variant.
 */
export function approvedOutreachSubject(companyName?: string | null): string {
  const firm = companyName?.trim();
  return `Engineering bandwidth for ${firm || "your team"}`;
}

export function approvedOutreachBody(contactName: string): string {
  const firstName = contactName.trim().split(/\s+/)[0];
  return `Hi ${firstName},

If your team is overloaded with MEP, structural, or civil projects and racing against deadlines, we can take some of that off your plate.

At Apex Grid Engineering, we provide on-demand engineering support to help firms clear backlogs and meet delivery timelines — without the hassle of hiring. We’re a veteran-owned firm, licensed in 49 states.

If you have a project that needs extra bandwidth, just reply with the details or drawings. We’ll review it and send you a tailored proposal.

Need a PE stamp? We got you — we can review and stamp your finished design: https://apexgrideng.com/pe-stamp/`;
}

export function approvedOutreachFollowUpMessages(contactName: string): Array<{
  sequenceNumber: number;
  subject: string;
  body: string;
}> {
  const firstName = contactName.trim().split(/\s+/)[0] || "team";
  return [
    {
      sequenceNumber: 2,
      subject: "Ready for us to review an active project?",
      body: `Hi ${firstName},

Thanks for taking a look at my earlier note. If you have an active project that could use focused Civil, Structural, or MEP support, the next step is simple.

Reply with the project location and the drawings or scope you have available. We’ll review them and let you know where Apex Grid can help, along with a right-sized path forward and clear pricing before work begins.`,
    },
  ];
}

export function hotLeadFollowUpMessages(contactName: string): Array<{
  sequenceNumber: number;
  subject: string;
  body: string;
}> {
  const firstName = contactName.trim().split(/\s+/)[0] || "there";
  return [{
    sequenceNumber: 2,
    subject: `Following up, ${firstName}`,
      body: `Hi ${firstName}, Saw you stopped by our site — figured I'd follow up personally. We're a veteran-owned engineering firm (MEP, structural, civil) licensed in 49 states. Most of our developer and builder clients call us when plan-check is threatening their timeline. We clear corrections fast and stamp what needs stamping. If you've got an active project, reply with the address — I'll have a quote back to you within 24 hours. Jeremy Mills / CEO · USAF Veteran / Apex Grid Engineering PLLC / 22475 E Quintero Rd, Queen Creek, AZ 85142`,
  }];
}

export async function preflightVerifiedOutreachBatch(options: {
  label: string;
  target: number;
  contacts: readonly VerifiedBatchContactValidationInput[];
  enforceTarget?: boolean;
  snapshot?: {
    activeProspects: Array<{
      companyName: string;
      contactEmail: string | null;
      website: string | null;
      dedupeKey?: string | null;
      contactStatus?: string | null;
    }>;
    suppressedEmails: string[];
  };
}): Promise<OutreachPreflightReport> {
  assertVerifiedOutreachBatch(options.contacts);
  const snapshot = options.snapshot ?? {
    activeProspects: await db.select({
      companyName: prospectsTable.companyName,
      contactEmail: prospectsTable.contactEmail,
      website: prospectsTable.website,
      dedupeKey: prospectsTable.dedupeKey,
      contactStatus: prospectsTable.contactStatus,
    }).from(prospectsTable),
    suppressedEmails: (await db.select({ email: outreachSuppressionsTable.email })
      .from(outreachSuppressionsTable)).map((row) => row.email),
  };
  const report = evaluateVerifiedOutreachPreflight({
    label: options.label,
    target: options.target,
    contacts: options.contacts,
    activeProspects: snapshot.activeProspects,
    suppressedEmails: snapshot.suppressedEmails,
  });
  if (options.enforceTarget && report.replacementsNeeded > 0) {
    const blocked = report.conflicts
      .map((conflict) => `${conflict.companyName} (${conflict.conflicts.join(", ")})`)
      .join("; ");
    throw new Error(
      `${report.label} preflight requires ${report.target} usable contacts; `
      + `found ${report.usableCount}, replacements needed ${report.replacementsNeeded}. `
      + `Blocked companies: ${blocked}`,
    );
  }
  return report;
}

export async function seedVerifiedOutreachBatch(options: {
  enabled?: boolean;
  now?: Date;
} = {}): Promise<{ state: "skipped" | "ready"; queued: number }> {
  const enabled = options.enabled ?? process.env.OUTREACH_SEED_VERIFIED_BATCH === "true";
  if (!enabled) return { state: "skipped", queued: 0 };
  assertVerifiedOutreachBatch(VERIFIED_OUTREACH_CONTACTS, 313);
  assertVerifiedOutreachBatch(VERIFIED_OUTREACH_CONTACTS_AUG_30);
  assertVerifiedOutreachBatch(VERIFIED_OUTREACH_CONTACTS_AUG_31, AUG_31_TARGET);
  assertVerifiedOutreachBatch(VERIFIED_OUTREACH_CONTACTS_SEP_02, SEP_02_TARGET);
  assertVerifiedOutreachBatch(
    VERIFIED_OUTREACH_CONTACTS_SEP_02_PUBLIC,
    SEP_02_PUBLIC_TARGET,
  );
  assertVerifiedOutreachBatch(
    VERIFIED_OUTREACH_CONTACTS_SEP_05_DIRECT,
    SEP_05_DIRECT_LIBRARY_TARGET,
  );
  assertVerifiedOutreachBatch(
    VERIFIED_OUTREACH_CONTACTS_SEP_05,
    SEP_05_PUBLIC_TARGET,
  );

  await preflightVerifiedOutreachBatch({
    contacts: VERIFIED_OUTREACH_CONTACTS_SEP_05_DIRECT,
    target: SEP_05_DIRECT_REQUIRED_TARGET,
    label: "September 5",
    enforceTarget: true,
  });
  await preflightVerifiedOutreachBatch({
    contacts: VERIFIED_OUTREACH_CONTACTS_SEP_05,
    target: SEP_05_PUBLIC_TARGET,
    label: "September 5 Public",
    enforceTarget: true,
  });

  let [campaign] = await db.select().from(campaignsTable)
    .where(eq(campaignsTable.name, CAMPAIGN_NAME))
    .limit(1);
  if (!campaign) {
    [campaign] = await db.insert(campaignsTable).values({
      name: CAMPAIGN_NAME,
      audience: "mixed",
      states: [...LICENSED_OUTREACH_STATES],
      dailyLimit: REGULAR_OUTREACH_DAILY_TARGET,
      status: "active",
      subjectTemplate: approvedOutreachSubject(),
      bodyTemplate: "Approved personalized Apex Grid outreach copy",
    }).returning();
  }
  if (!campaign) throw new Error("Unable to create the verified outreach campaign");
  if (
    campaign.dailyLimit !== REGULAR_OUTREACH_DAILY_TARGET
    || campaign.audience !== "mixed"
    || campaign.states.length !== LICENSED_OUTREACH_STATES.length
    || LICENSED_OUTREACH_STATES.some((state) => !campaign.states.includes(state))
  ) {
    const [updatedCampaign] = await db.update(campaignsTable)
      .set({
        dailyLimit: REGULAR_OUTREACH_DAILY_TARGET,
        audience: "mixed",
        states: [...LICENSED_OUTREACH_STATES],
      })
      .where(eq(campaignsTable.id, campaign.id))
      .returning();
    if (!updatedCampaign) throw new Error("Unable to set the outreach campaign daily limit");
    campaign = updatedCampaign;
  }
  await db.update(outreachResearchSchedulesTable)
    .set({ targetCount: 150 })
    .where(eq(outreachResearchSchedulesTable.campaignId, campaign.id));

  const existingLegacyRows = await db.select({ dedupeKey: prospectsTable.dedupeKey })
    .from(prospectsTable)
    .where(inArray(
      prospectsTable.dedupeKey,
      VERIFIED_OUTREACH_CONTACTS.map((contact) => contact.dedupeKey),
    ));
  const existingLegacyKeys = new Set(
    existingLegacyRows.flatMap((row) => row.dedupeKey ? [row.dedupeKey] : []),
  );

  for (const contact of VERIFIED_OUTREACH_CONTACTS) {
    if (existingLegacyKeys.has(contact.dedupeKey)) continue;
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
  const datedBatches = [
    {
      contacts: VERIFIED_OUTREACH_CONTACTS_AUG_30,
      prefix: "verified-2026-08-30-",
      target: AUG_30_TARGET,
      label: "August 30",
      enforceTarget: false,
    },
    {
      contacts: VERIFIED_OUTREACH_CONTACTS_AUG_31,
      prefix: "verified-2026-08-31-",
      target: AUG_31_TARGET,
      label: "August 31",
      enforceTarget: false,
    },
    {
      contacts: VERIFIED_OUTREACH_CONTACTS_SEP_02,
      prefix: "verified-2026-09-02-",
      target: SEP_02_TARGET,
      label: "September 2",
      enforceTarget: false,
    },
    {
      contacts: VERIFIED_OUTREACH_CONTACTS_SEP_02_PUBLIC,
      prefix: "public-verified-2026-09-02-",
      target: SEP_02_PUBLIC_TARGET,
      label: "September 2 Public",
      enforceTarget: false,
    },
    {
      contacts: VERIFIED_OUTREACH_CONTACTS_SEP_05_DIRECT,
      prefix: "verified-2026-09-05-",
      target: SEP_05_DIRECT_REQUIRED_TARGET,
      label: "September 5",
      enforceTarget: true,
    },
    {
      contacts: VERIFIED_OUTREACH_CONTACTS_SEP_05,
      prefix: "public-verified-2026-09-05-",
      target: SEP_05_PUBLIC_TARGET,
      label: "September 5 Public",
      enforceTarget: true,
    },
  ] as const;

  for (const batch of datedBatches) {
    let stored = existingRows.filter((row) =>
      row.dedupeKey?.startsWith(batch.prefix)
      && row.status === "approved"
      && row.emailStatus === "verified"
      && row.contactStatus === "active"
    ).length;

    for (const contact of batch.contacts) {
      if (stored >= batch.target) break;
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
    if (batch.enforceTarget && stored < batch.target) {
      throw new Error(
        `Verified ${batch.label} outreach seed requires at least ${batch.target} active prospects; found ${stored}`,
      );
    }
  }
  // The seed only supplies reviewed candidates. The preparation service owns all
  // message creation so the startup path cannot bypass the shared 200-slot ledger.
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
