import { integer, jsonb, pgTable, serial, text, timestamp, uniqueIndex, foreignKey } from "drizzle-orm/pg-core";
import { prospectsTable } from "./outreach";

export const outreachImportBatchesTable = pgTable("outreach_import_batches", {
  id: serial("id").primaryKey(),
  batchId: text("batch_id").notNull(),
  sourceFilename: text("source_filename").notNull(),
  sourceRowCount: integer("source_row_count").notNull(),
  createdBy: text("created_by"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  status: text("status").notNull().default("running"),
  error: text("error"),
  completedAt: timestamp("completed_at", { withTimezone: true }),
  report: jsonb("report"),
}, (table) => [uniqueIndex("outreach_import_batches_batch_unique").on(table.batchId)]);

export const outreachImportRowsTable = pgTable("outreach_import_rows", {
  id: serial("id").primaryKey(),
  batchId: text("batch_id").notNull(),
  sourceRow: integer("source_row").notNull(),
  sourceFilename: text("source_filename").notNull(),
  company: text("company").notNull(),
  contactName: text("contact_name"),
  title: text("title"),
  email: text("email").notNull(),
  emailType: text("email_type").notNull(),
  sourceUrl: text("source_url"),
  verificationStatus: text("verification_status"),
  verificationMethod: text("verification_method"),
  eligibilityResult: text("eligibility_result").notNull(),
  exclusionReason: text("exclusion_reason"),
  prospectId: integer("prospect_id"),
  importedAt: timestamp("imported_at", { withTimezone: true }).notNull().defaultNow(),
}, (table) => [
  uniqueIndex("outreach_import_rows_batch_row_unique").on(table.batchId, table.sourceRow),
  foreignKey({ columns: [table.prospectId], foreignColumns: [prospectsTable.id] }),
]);

export const outreachLaneConfigsTable = pgTable("outreach_lane_configs", {
  id: serial("id").primaryKey(),
  campaignKey: text("campaign_key").notNull(),
  effectiveMonth: text("effective_month").notNull(),
  namedLimit: integer("named_limit").notNull(),
  publicLimit: integer("public_limit").notNull(),
  hotMarketLimit: integer("hot_market_limit").notNull(),
  hotLeadLimit: integer("hot_lead_limit").notNull(),
  updatedBy: text("updated_by"),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
}, (table) => [uniqueIndex("outreach_lane_configs_campaign_month_unique").on(table.campaignKey, table.effectiveMonth)]);

export const outreachOneTimeOverridesTable = pgTable("outreach_one_time_overrides", {
  id: serial("id").primaryKey(),
  campaignKey: text("campaign_key").notNull(),
  requestedLimit: integer("requested_limit").notNull(),
  status: text("status").notNull().default("requested"),
  requestedEvidence: text("requested_evidence"),
  decisionEvidence: text("decision_evidence"),
  requestedBy: text("requested_by").notNull(),
  reason: text("reason"),
  requestedForDate: text("requested_for_date").notNull(),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
}, (table) => [uniqueIndex("outreach_one_time_overrides_campaign_date_unique").on(table.campaignKey, table.requestedForDate)]);

/** Versioned, database-owned policy. Outreach code must not invent defaults. */
export const outreachSystemConfigsTable = pgTable("outreach_system_configs", {
  id: serial("id").primaryKey(),
  version: integer("version").notNull(),
  status: text("status").notNull().default("active"),
  policy: jsonb("policy").notNull(),
  effectiveFrom: timestamp("effective_from", { withTimezone: true }).notNull().defaultNow(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
}, (table) => [uniqueIndex("outreach_system_configs_version_unique").on(table.version)]);