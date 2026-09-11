import { and, eq, inArray, isNotNull, sql } from "drizzle-orm";
import { createHash } from "node:crypto";
import {
  db, campaignsTable, outreachDeliveryEventsTable, outreachImportBatchesTable, outreachImportRowsTable,
  outreachLaneConfigsTable, outreachMessagesTable, outreachOneTimeOverridesTable, outreachRepliesTable,
  outreachSequenceSendClaimsTable, outreachSendReservationsTable, outreachSuppressionsTable, prospectsTable,
} from "@workspace/db";
import { getOutreachAutomationStatus } from "./outreachWorker";
import {
  currentOutreachCampaignKey,
  getAuthoritativeLaneConfig,
  phoenixMonthKey,
} from "./outreachLaneConfig";
import sourceCsv from "../data/verified-business-email-contacts.csv";

export const SOURCE_FILENAME = "verified-business-email-contacts.csv";
const HEADERS = ["company_name", "website", "company_type", "city", "state", "contact_first_name", "contact_last_name", "job_title", "email", "email_type", "verification_status", "verification_method", "source_url", "date_verified"];
import { APPROVED_PUBLIC_INBOX_LOCAL_PARTS } from "./publicInboxClassifier";
const clean = (value: string | undefined) => (value ?? "").trim();
const normalizeEmail = (value: string) => value.trim().toLowerCase();
function csvRows(input: string): string[][] {
  const rows: string[][] = []; let row: string[] = []; let cell = ""; let quoted = false;
  for (let i = 0; i < input.length; i += 1) {
    const c = input[i];
    if (c === '"' && quoted && input[i + 1] === '"') { cell += '"'; i += 1; continue; }
    if (c === '"') { quoted = !quoted; continue; }
    if (c === "," && !quoted) { row.push(cell); cell = ""; continue; }
    if ((c === "\n" || c === "\r") && !quoted) { if (c === "\r" && input[i + 1] === "\n") i += 1; row.push(cell); if (row.some(Boolean)) rows.push(row); row = []; cell = ""; continue; }
    cell += c;
  }
  if (cell || row.length) { row.push(cell); rows.push(row); }
  return rows;
}
function websiteDomain(url: string) { try { return new URL(url).hostname.replace(/^www\./, "").toLowerCase(); } catch { return ""; } }
function identity(value: string) { return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim(); }
export type InventoryReport = {
  sourceRows: number; importedPendingQualification: number; excluded: number;
  namedImported: number; publicImported: number; namedEligible: number; publicEligible: number;
  exclusions: Record<string, number>;
};
function reportFromRows(rows: Array<{ eligibilityResult: string; emailType: string; exclusionReason: string | null }>, sourceRows: number): InventoryReport {
  const exclusions: Record<string, number> = {};
  for (const row of rows) if (row.exclusionReason) exclusions[row.exclusionReason] = (exclusions[row.exclusionReason] ?? 0) + 1;
  return {
    sourceRows, importedPendingQualification: rows.filter((r) => r.eligibilityResult === "inventory_imported_pending_qualification").length,
    excluded: rows.filter((r) => Boolean(r.exclusionReason)).length,
    namedImported: rows.filter((r) => r.emailType === "named_verified" && !r.exclusionReason).length,
    publicImported: rows.filter((r) => r.emailType === "public_business" && !r.exclusionReason).length,
    namedEligible: rows.filter((r) => r.eligibilityResult === "send_eligible" && r.emailType === "named_verified").length,
    publicEligible: rows.filter((r) => r.eligibilityResult === "send_eligible" && r.emailType === "public_business").length,
    exclusions,
  };
}

export async function importVerifiedInventory(actor: string): Promise<Record<string, unknown>> {
  const parsed = csvRows(sourceCsv); const header = parsed.shift()?.map(clean);
  if (header?.join(",") !== HEADERS.join(",")) throw new Error("Bundled inventory header does not match source contract");
  if (parsed.length !== 2027) throw new Error(`Expected exactly 2027 source rows, found ${parsed.length}`);
  const batchId = createHash("sha256").update(sourceCsv).digest("hex");
  let [batch] = await db.select().from(outreachImportBatchesTable).where(eq(outreachImportBatchesTable.batchId, batchId)).limit(1);
  if (!batch) [batch] = await db.insert(outreachImportBatchesTable).values({ batchId, sourceFilename: SOURCE_FILENAME, sourceRowCount: parsed.length, createdBy: actor }).onConflictDoNothing().returning();
  if (!batch) [batch] = await db.select().from(outreachImportBatchesTable).where(eq(outreachImportBatchesTable.batchId, batchId)).limit(1);
  if (!batch) throw new Error("Unable to create import batch");
  if (batch.status === "completed") {
    const rows = await db.select({ eligibilityResult: outreachImportRowsTable.eligibilityResult, emailType: outreachImportRowsTable.emailType, exclusionReason: outreachImportRowsTable.exclusionReason }).from(outreachImportRowsTable).where(eq(outreachImportRowsTable.batchId, batchId));
    return { batchId, ...(batch.report ?? reportFromRows(rows, parsed.length)), idempotent: true };
  }
  try {
   return await db.transaction(async (tx) => {
    await tx.execute(sql`select id from outreach_import_batches where id = ${batch!.id} for update`);
    const [locked] = await tx.select().from(outreachImportBatchesTable).where(eq(outreachImportBatchesTable.id, batch!.id)).limit(1);
    if (locked?.status === "completed") {
      const rows = await tx.select({ eligibilityResult: outreachImportRowsTable.eligibilityResult, emailType: outreachImportRowsTable.emailType, exclusionReason: outreachImportRowsTable.exclusionReason }).from(outreachImportRowsTable).where(eq(outreachImportRowsTable.batchId, batchId));
      return { batchId, ...(locked.report ?? reportFromRows(rows, parsed.length)), idempotent: true };
    }
    batch = locked ?? batch;
    if (!batch) throw new Error("Unable to create import batch");
    if (batch.status === "completed") return { batchId, sourceRows: parsed.length, imported: 0, idempotent: true, exclusions: {} };
      const [existingRows, prospects, suppressions, events, messages, claims, replies, campaigns] = await Promise.all([
        tx.select({ sourceRow: outreachImportRowsTable.sourceRow }).from(outreachImportRowsTable).where(eq(outreachImportRowsTable.batchId, batchId)),
        tx.select().from(prospectsTable),
        tx.select({ email: outreachSuppressionsTable.email }).from(outreachSuppressionsTable),
        tx.select({ email: outreachDeliveryEventsTable.email, eventType: outreachDeliveryEventsTable.eventType }).from(outreachDeliveryEventsTable).where(inArray(outreachDeliveryEventsTable.eventType, ["bounce", "complaint", "unsubscribe", "invalid"])),
        tx.select({ email: prospectsTable.contactEmail }).from(outreachMessagesTable).innerJoin(prospectsTable, eq(outreachMessagesTable.prospectId, prospectsTable.id)),
        tx.select({ prospectId: outreachSequenceSendClaimsTable.prospectId }).from(outreachSequenceSendClaimsTable),
        tx.select({ prospectId: outreachRepliesTable.prospectId }).from(outreachRepliesTable).where(isNotNull(outreachRepliesTable.prospectId)),
        tx.select().from(campaignsTable).where(eq(campaignsTable.status, "active")),
      ]);
      const done = new Set(existingRows.map((r) => r.sourceRow)); const seenEmails = new Set(prospects.flatMap((p) => p.contactEmail ? [normalizeEmail(p.contactEmail)] : []));
      const seenDomains = new Set(prospects.flatMap((p) => p.website ? [websiteDomain(p.website)] : []).filter(Boolean));
      const suppressed = new Set(suppressions.map((r) => normalizeEmail(r.email))); const bad = new Set(events.map((r) => normalizeEmail(r.email)));
      const prior = new Set(messages.flatMap((r) => r.email ? [normalizeEmail(r.email)] : []));
      const blockedProspects = new Set([...claims.map((r) => r.prospectId), ...replies.flatMap((r) => r.prospectId ? [r.prospectId] : [])]);
      for (const prospect of prospects) {
        if (blockedProspects.has(prospect.id) || prospect.contactStatus !== "active" || ["replied", "suppressed", "not_a_fit"].includes(prospect.status)) {
          if (prospect.contactEmail) prior.add(normalizeEmail(prospect.contactEmail));
        }
      }
      for (let index = 0; index < parsed.length; index += 1) {
        const sourceRow = index + 2; if (done.has(sourceRow)) continue;
        const values = parsed[index]!.map(clean); const row = Object.fromEntries(HEADERS.map((key, i) => [key, values[i] ?? ""]));
        const email = normalizeEmail(row.email); const domain = email.split("@")[1] ?? ""; const local = email.split("@")[0] ?? "";
        const isPublic = row.email_type.toLowerCase().includes("role") && APPROVED_PUBLIC_INBOX_LOCAL_PARTS.has(local);
        let exclusion: string | null = null;
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) exclusion = "invalid_email";
        else if (websiteDomain(row.website) !== domain) exclusion = "email_domain_mismatch";
        else if (suppressed.has(email)) exclusion = "suppressed_or_unsubscribed";
        else if (bad.has(email)) exclusion = "bounce_complaint_or_invalid";
        else if (prior.has(email)) exclusion = "prior_recipient";
        else if (seenEmails.has(email)) exclusion = "duplicate_email";
        else if (seenDomains.has(domain)) exclusion = "duplicate_domain";
        else if (!row.source_url || !row.verification_status || !row.verification_method) exclusion = "missing_verification_evidence";
        else if (identity(row.company_name).includes("atmosphere architects") && ["tim boyle", "mike hudson"].includes(identity(`${row.contact_first_name} ${row.contact_last_name}`))) exclusion = "client_relationship_exclusion";
        else if (!isPublic && (!row.contact_first_name || !row.contact_last_name || !row.job_title)) exclusion = "missing_named_identity_or_title";
        let prospectId: number | null = null;
        const audience = row.company_type.toLowerCase().includes("architect") ? "architect" : row.company_type.toLowerCase().includes("builder") ? "builder" : "mixed";
        const campaign = campaigns.find((c) => c.audience === "mixed" || c.audience === audience);
        if (!exclusion && !campaign) exclusion = "no_active_target_campaign";
        const eligibility = exclusion ? "import_valid_pending_review" : "inventory_imported_pending_qualification";
        if (!exclusion) {
          const [prospect] = await tx.insert(prospectsTable).values({
            campaignId: campaign!.id, companyName: row.company_name, website: row.website || null, city: row.city || "Unknown", state: row.state || "Unknown",
            audience, sourceUrl: row.source_url || null, fitScore: 0, needScore: 0, needSignals: null,
            contactName: [row.contact_first_name, row.contact_last_name].filter(Boolean).join(" ") || null, contactTitle: row.job_title || null,
            contactEmail: email, contactConfidence: isPublic ? "medium" : "high", contactSourceUrl: row.source_url || null,
            dedupeKey: `verified-inventory:${email}`, emailStatus: "verified", status: "review", contactStatus: "active",
            contactEvidenceType: isPublic ? "official_publication" : "named_verified", contactEvidence: `${row.verification_status}; ${row.verification_method}`,
          }).onConflictDoNothing().returning({ id: prospectsTable.id });
          prospectId = prospect?.id ?? null; if (prospectId) { seenEmails.add(email); seenDomains.add(domain); }
      }
      await tx.insert(outreachImportRowsTable).values({ batchId, sourceRow, sourceFilename: SOURCE_FILENAME, company: row.company_name, contactName: [row.contact_first_name, row.contact_last_name].filter(Boolean).join(" ") || null, title: row.job_title || null, email, emailType: isPublic ? "public_business" : "named_verified", sourceUrl: row.source_url || null, verificationStatus: row.verification_status || null, verificationMethod: row.verification_method || null, eligibilityResult: eligibility, exclusionReason: exclusion, prospectId });
      }
      const allRows = await tx.select({ eligibilityResult: outreachImportRowsTable.eligibilityResult, emailType: outreachImportRowsTable.emailType, exclusionReason: outreachImportRowsTable.exclusionReason }).from(outreachImportRowsTable).where(eq(outreachImportRowsTable.batchId, batchId));
      const report = reportFromRows(allRows, parsed.length);
      await tx.update(outreachImportBatchesTable).set({ status: "completed", completedAt: new Date(), error: null, report }).where(eq(outreachImportBatchesTable.id, batch.id));
      return { batchId, ...report, idempotent: false };
   });
  } catch (error) {
    await db.update(outreachImportBatchesTable).set({ status: "failed", error: error instanceof Error ? error.message : "Import failed" }).where(eq(outreachImportBatchesTable.batchId, batchId));
    throw error;
  }
}

export async function getLaneConfig(campaignKey = currentOutreachCampaignKey(), effectiveMonth = phoenixMonthKey()) {
  return getAuthoritativeLaneConfig(campaignKey, effectiveMonth);
}

export async function createOneTimeOverride(input: { campaignKey: string; requestedForDate: string; requestedLimit: number; requestedBy: string; reason?: string }) {
  if (input.requestedLimit < 1 || !/^\d{4}-\d{2}-\d{2}$/.test(input.requestedForDate)) throw new Error("Invalid campaign date or requested limit");
  const expiresAt = new Date(`${input.requestedForDate}T23:59:59.000Z`);
  const automation = getOutreachAutomationStatus();
  const reservations = await db.select({ id: outreachSendReservationsTable.id }).from(outreachSendReservationsTable);
  return db.insert(outreachOneTimeOverridesTable).values({
    ...input, status: "blocked",
    requestedEvidence: "Administrator requested; provider health and quota are server-evaluated",
    decisionEvidence: JSON.stringify({ reason: "safe reservation path is not available in this development guard", providerAutomation: automation, existingReservationCount: reservations.length }),
    expiresAt,
  }).returning();
}