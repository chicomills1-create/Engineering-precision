import { index, integer, pgTable, serial, text, timestamp, uniqueIndex } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

/**
 * LinkedIn is a research and employee-operated channel.  These tables deliberately
 * contain no provider credential, delivery, or automated-send fields.
 */
export const linkedinCompaniesTable = pgTable("linkedin_companies", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  normalizedName: text("normalized_name").notNull(),
  website: text("website"),
  domain: text("domain"),
  linkedinUrl: text("linkedin_url"),
  geography: text("geography"),
  disciplineFit: text("discipline_fit"),
  evidence: text("evidence"),
  sourceUrl: text("source_url"),
  confidence: integer("confidence").notNull().default(0),
  status: text("status").notNull().default("active"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
}, (table) => [
  uniqueIndex("linkedin_companies_normalized_name_unique").on(table.normalizedName),
  uniqueIndex("linkedin_companies_domain_unique").on(table.domain),
  uniqueIndex("linkedin_companies_url_unique").on(table.linkedinUrl),
  index("linkedin_companies_status_idx").on(table.status),
]);

export const linkedinPeopleTable = pgTable("linkedin_people", {
  id: serial("id").primaryKey(),
  companyId: integer("company_id").references(() => linkedinCompaniesTable.id, { onDelete: "set null" }),
  name: text("name").notNull(),
  normalizedName: text("normalized_name").notNull(),
  role: text("role"),
  linkedinUrl: text("linkedin_url"),
  geography: text("geography"),
  disciplineFit: text("discipline_fit"),
  evidence: text("evidence"),
  sourceUrl: text("source_url"),
  confidence: integer("confidence").notNull().default(0),
  status: text("status").notNull().default("active"),
  retentionUntil: timestamp("retention_until", { withTimezone: true }),
  legalBasisNote: text("legal_basis_note"),
  consentNote: text("consent_note"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
}, (table) => [
  uniqueIndex("linkedin_people_url_unique").on(table.linkedinUrl),
  uniqueIndex("linkedin_people_company_name_unique").on(table.companyId, table.normalizedName),
  index("linkedin_people_retention_idx").on(table.retentionUntil),
  index("linkedin_people_status_idx").on(table.status),
]);

export const linkedinSignalsTable = pgTable("linkedin_signals", {
  id: serial("id").primaryKey(),
  personId: integer("person_id").references(() => linkedinPeopleTable.id, { onDelete: "set null" }),
  companyId: integer("company_id").references(() => linkedinCompaniesTable.id, { onDelete: "set null" }),
  kind: text("kind").notNull(),
  title: text("title").notNull(),
  sourceUrl: text("source_url").notNull(),
  evidence: text("evidence").notNull(),
  observedAt: timestamp("observed_at", { withTimezone: true }).notNull(),
  confidence: integer("confidence").notNull().default(0),
  status: text("status").notNull().default("active"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
}, (table) => [
  uniqueIndex("linkedin_signals_source_unique").on(table.sourceUrl),
  index("linkedin_signals_queue_idx").on(table.status, table.observedAt),
  index("linkedin_signals_person_idx").on(table.personId),
  index("linkedin_signals_company_idx").on(table.companyId),
]);

export const linkedinCampaignsTable = pgTable("linkedin_campaigns", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  objective: text("objective").notNull(),
  status: text("status").notNull().default("draft"),
  owner: text("owner"),
  dailyActionLimit: integer("daily_action_limit").notNull().default(25),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
}, (table) => [index("linkedin_campaigns_status_idx").on(table.status)]);

export const linkedinContentItemsTable = pgTable("linkedin_content_items", {
  id: serial("id").primaryKey(),
  campaignId: integer("campaign_id").references(() => linkedinCampaignsTable.id, { onDelete: "set null" }),
  title: text("title").notNull(),
  pillar: text("pillar").notNull(),
  sourceUrl: text("source_url"),
  evidence: text("evidence"),
  draftCopy: text("draft_copy"),
  approvedCopy: text("approved_copy"),
  scheduledFor: timestamp("scheduled_for", { withTimezone: true }),
  owner: text("owner"),
  status: text("status").notNull().default("draft"),
  publishedUrl: text("published_url"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
}, (table) => [index("linkedin_content_queue_idx").on(table.status, table.scheduledFor)]);

export const linkedinActionsTable = pgTable("linkedin_actions", {
  id: serial("id").primaryKey(),
  personId: integer("person_id").references(() => linkedinPeopleTable.id, { onDelete: "set null" }),
  companyId: integer("company_id").references(() => linkedinCompaniesTable.id, { onDelete: "set null" }),
  signalId: integer("signal_id").references(() => linkedinSignalsTable.id, { onDelete: "set null" }),
  campaignId: integer("campaign_id").references(() => linkedinCampaignsTable.id, { onDelete: "set null" }),
  contentItemId: integer("content_item_id").references(() => linkedinContentItemsTable.id, { onDelete: "set null" }),
  actionType: text("action_type").notNull(),
  draftCopy: text("draft_copy"),
  approvedCopy: text("approved_copy"),
  directActionUrl: text("direct_action_url"),
  owner: text("owner"),
  dueAt: timestamp("due_at", { withTimezone: true }),
  status: text("status").notNull().default("draft"),
  legalBasisNote: text("legal_basis_note"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
  completedAt: timestamp("completed_at", { withTimezone: true }),
  providerName: text("provider_name"),
  providerOperation: text("provider_operation"),
  providerState: text("provider_state").notNull().default("not_attempted"),
  providerReconciliationKey: text("provider_reconciliation_key"),
  providerActionId: text("provider_action_id"),
  providerError: text("provider_error"),
  providerAttemptedAt: timestamp("provider_attempted_at", { withTimezone: true }),
}, (table) => [
  index("linkedin_actions_queue_idx").on(table.status, table.dueAt),
  index("linkedin_actions_completed_idx").on(table.completedAt),
  index("linkedin_actions_person_idx").on(table.personId, table.status),
  index("linkedin_actions_campaign_idx").on(table.campaignId, table.status),
  uniqueIndex("linkedin_actions_provider_reconciliation_unique").on(table.providerReconciliationKey),
  uniqueIndex("linkedin_actions_provider_action_unique").on(table.providerActionId),
]);

export const linkedinApprovalEventsTable = pgTable("linkedin_approval_events", {
  id: serial("id").primaryKey(),
  actionId: integer("action_id").notNull().references(() => linkedinActionsTable.id, { onDelete: "cascade" }),
  actor: text("actor"),
  previousStatus: text("previous_status").notNull(),
  newStatus: text("new_status").notNull(),
  approvedCopySnapshot: text("approved_copy_snapshot"),
  note: text("note"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
}, (table) => [index("linkedin_approval_events_action_idx").on(table.actionId, table.createdAt)]);

export const linkedinSuppressionsTable = pgTable("linkedin_suppressions", {
  id: serial("id").primaryKey(),
  personId: integer("person_id").references(() => linkedinPeopleTable.id, { onDelete: "set null" }),
  companyId: integer("company_id").references(() => linkedinCompaniesTable.id, { onDelete: "set null" }),
  normalizedTarget: text("normalized_target").notNull(),
  reason: text("reason").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
}, (table) => [uniqueIndex("linkedin_suppressions_target_unique").on(table.normalizedTarget)]);

export const linkedinOutcomesTable = pgTable("linkedin_outcomes", {
  id: serial("id").primaryKey(),
  actionId: integer("action_id").references(() => linkedinActionsTable.id, { onDelete: "set null" }),
  campaignId: integer("campaign_id").references(() => linkedinCampaignsTable.id, { onDelete: "set null" }),
  personId: integer("person_id").references(() => linkedinPeopleTable.id, { onDelete: "set null" }),
  companyId: integer("company_id").references(() => linkedinCompaniesTable.id, { onDelete: "set null" }),
  contentItemId: integer("content_item_id").references(() => linkedinContentItemsTable.id, { onDelete: "set null" }),
  outcomeType: text("outcome_type").notNull(),
  value: integer("value"),
  count: integer("count").notNull().default(1),
  notes: text("notes"),
  sourceUrl: text("source_url"),
  occurredAt: timestamp("occurred_at", { withTimezone: true }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
}, (table) => [
  index("linkedin_outcomes_attribution_idx").on(table.campaignId, table.outcomeType, table.occurredAt),
  index("linkedin_outcomes_action_idx").on(table.actionId, table.occurredAt),
]);

export const insertLinkedinCompanySchema = createInsertSchema(linkedinCompaniesTable).omit({ id: true, createdAt: true, updatedAt: true });
export const insertLinkedinPersonSchema = createInsertSchema(linkedinPeopleTable).omit({ id: true, createdAt: true, updatedAt: true });
export const insertLinkedinSignalSchema = createInsertSchema(linkedinSignalsTable).omit({ id: true, createdAt: true });
export const insertLinkedinCampaignSchema = createInsertSchema(linkedinCampaignsTable).omit({ id: true, createdAt: true, updatedAt: true });
export const insertLinkedinContentItemSchema = createInsertSchema(linkedinContentItemsTable).omit({ id: true, createdAt: true, updatedAt: true });
export const insertLinkedinActionSchema = createInsertSchema(linkedinActionsTable).omit({ id: true, createdAt: true, updatedAt: true, completedAt: true });
export const insertLinkedinApprovalEventSchema = createInsertSchema(linkedinApprovalEventsTable).omit({ id: true, createdAt: true });
export const insertLinkedinSuppressionSchema = createInsertSchema(linkedinSuppressionsTable).omit({ id: true, createdAt: true });
export const insertLinkedinOutcomeSchema = createInsertSchema(linkedinOutcomesTable).omit({ id: true, createdAt: true });

export type LinkedinCompany = typeof linkedinCompaniesTable.$inferSelect;
export type LinkedinPerson = typeof linkedinPeopleTable.$inferSelect;
export type LinkedinSignal = typeof linkedinSignalsTable.$inferSelect;
export type LinkedinCampaign = typeof linkedinCampaignsTable.$inferSelect;
export type LinkedinContentItem = typeof linkedinContentItemsTable.$inferSelect;
export type LinkedinAction = typeof linkedinActionsTable.$inferSelect;
export type LinkedinApprovalEvent = typeof linkedinApprovalEventsTable.$inferSelect;
export type LinkedinSuppression = typeof linkedinSuppressionsTable.$inferSelect;
export type LinkedinOutcome = typeof linkedinOutcomesTable.$inferSelect;
export type InsertLinkedinCompany = z.infer<typeof insertLinkedinCompanySchema>;
export type InsertLinkedinPerson = z.infer<typeof insertLinkedinPersonSchema>;
export type InsertLinkedinSignal = z.infer<typeof insertLinkedinSignalSchema>;
export type InsertLinkedinCampaign = z.infer<typeof insertLinkedinCampaignSchema>;
export type InsertLinkedinContentItem = z.infer<typeof insertLinkedinContentItemSchema>;
export type InsertLinkedinAction = z.infer<typeof insertLinkedinActionSchema>;
export type InsertLinkedinApprovalEvent = z.infer<typeof insertLinkedinApprovalEventSchema>;
export type InsertLinkedinSuppression = z.infer<typeof insertLinkedinSuppressionSchema>;
export type InsertLinkedinOutcome = z.infer<typeof insertLinkedinOutcomeSchema>;