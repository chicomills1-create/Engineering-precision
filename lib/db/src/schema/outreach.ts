import {
  boolean,
  integer,
  index,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { sql } from "drizzle-orm";
import { z } from "zod/v4";

export const campaignsTable = pgTable("outreach_campaigns", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  audience: text("audience").notNull(),
  states: text("states").array().notNull(),
  dailyLimit: integer("daily_limit").notNull().default(100),
  status: text("status").notNull().default("draft"),
  subjectTemplate: text("subject_template"),
  bodyTemplate: text("body_template"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export const outreachResearchRunsTable = pgTable("outreach_research_runs", {
  id: serial("id").primaryKey(),
  campaignId: integer("campaign_id").references(() => campaignsTable.id, { onDelete: "set null" }),
  state: text("state").notNull(),
  audience: text("audience").notNull(),
  query: text("query").notNull(),
  status: text("status").notNull().default("completed"),
  resultCount: integer("result_count").notNull().default(0),
  skippedCount: integer("skipped_count").notNull().default(0),
  error: text("error"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  completedAt: timestamp("completed_at", { withTimezone: true }),
});

export const prospectsTable = pgTable("outreach_prospects", {
  id: serial("id").primaryKey(),
  campaignId: integer("campaign_id").references(() => campaignsTable.id, { onDelete: "set null" }),
  companyName: text("company_name").notNull(),
  website: text("website"),
  city: text("city").notNull(),
  state: text("state").notNull(),
  audience: text("audience").notNull(),
  sourceUrl: text("source_url"),
  researchNotes: text("research_notes"),
  fitScore: integer("fit_score").notNull().default(0),
  needScore: integer("need_score").notNull().default(0),
  needSignals: text("need_signals"),
  contactName: text("contact_name"),
  contactTitle: text("contact_title"),
  contactEmail: text("contact_email"),
  contactConfidence: text("contact_confidence").notNull().default("unknown"),
  contactSourceUrl: text("contact_source_url"),
  dedupeKey: text("dedupe_key"),
  researchRunId: integer("research_run_id").references(() => outreachResearchRunsTable.id, { onDelete: "set null" }),
  emailStatus: text("email_status").notNull().default("unverified"),
  status: text("status").notNull().default("new"),
  contactStatus: text("contact_status").notNull().default("active"),
  contactEvidenceType: text("contact_evidence_type"),
  contactEvidence: text("contact_evidence"),
  contactEvidenceAt: timestamp("contact_evidence_at", { withTimezone: true }),
  contactReviewAt: timestamp("contact_review_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
}, (table) => [
  uniqueIndex("outreach_prospects_dedupe_key_unique").on(table.dedupeKey),
]);

export const outreachResearchSchedulesTable = pgTable("outreach_research_schedules", {
  id: serial("id").primaryKey(),
  campaignId: integer("campaign_id").notNull().references(() => campaignsTable.id, { onDelete: "cascade" }),
  enabled: boolean("enabled").notNull().default(false),
  timezone: text("timezone").notNull().default("America/Phoenix"),
  localHour: integer("local_hour").notNull().default(8),
  targetCount: integer("target_count").notNull().default(100),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
}, (table) => [
  uniqueIndex("outreach_research_schedules_campaign_unique").on(table.campaignId),
]);

export const outreachResearchScheduleRunsTable = pgTable("outreach_research_schedule_runs", {
  id: serial("id").primaryKey(),
  scheduleId: integer("schedule_id").notNull().references(() => outreachResearchSchedulesTable.id, { onDelete: "cascade" }),
  runDate: text("run_date").notNull(),
  status: text("status").notNull().default("running"),
  query: text("query").notNull().default(""),
  resultCount: integer("result_count").notNull().default(0),
  skippedCount: integer("skipped_count").notNull().default(0),
  error: text("error"),
  startedAt: timestamp("started_at", { withTimezone: true }).notNull().defaultNow(),
  completedAt: timestamp("completed_at", { withTimezone: true }),
}, (table) => [
  uniqueIndex("outreach_research_schedule_runs_schedule_date_unique")
    .on(table.scheduleId, table.runDate),
]);

export const outreachPreparationRunsTable = pgTable("outreach_preparation_runs", {
  id: serial("id").primaryKey(),
  targetDate: text("target_date").notNull(),
  status: text("status").notNull().default("running"),
  targetCount: integer("target_count").notNull().default(150),
  preparedCount: integer("prepared_count").notNull().default(0),
  skippedCount: integer("skipped_count").notNull().default(0),
  shortfallCount: integer("shortfall_count").notNull().default(0),
  error: text("error"),
  startedAt: timestamp("started_at", { withTimezone: true }).notNull().defaultNow(),
  completedAt: timestamp("completed_at", { withTimezone: true }),
}, (table) => [
  uniqueIndex("outreach_preparation_runs_target_date_unique").on(table.targetDate),
]);

export const outreachMessagesTable = pgTable("outreach_messages", {
  id: serial("id").primaryKey(),
  prospectId: integer("prospect_id").notNull().references(() => prospectsTable.id, { onDelete: "cascade" }),
  campaignId: integer("campaign_id").references(() => campaignsTable.id, { onDelete: "set null" }),
  sequenceNumber: integer("sequence_number").notNull().default(1),
  subject: text("subject").notNull(),
  body: text("body").notNull(),
  status: text("status").notNull().default("draft"),
  scheduledAt: timestamp("scheduled_at", { withTimezone: true }),
  sentAt: timestamp("sent_at", { withTimezone: true }),
  providerMessageId: text("provider_message_id"),
  providerReconciliationKey: text("provider_reconciliation_key"),
  error: text("error"),
  sourceType: text("source_type"),
  sourceId: integer("source_id"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
}, (table) => [
  uniqueIndex("outreach_messages_follow_up_sequence_unique")
    .on(
      table.prospectId,
      sql`coalesce(${table.campaignId}, 0)`,
      table.sequenceNumber,
    )
    .where(sql`${table.sequenceNumber} > 1`),
]);

export const outreachQueueAlertsTable = pgTable("outreach_queue_alerts", {
  id: serial("id").primaryKey(),
  incidentKey: text("incident_key").notNull(),
  status: text("status").notNull().default("claimed"),
  overdueCount: integer("overdue_count").notNull(),
  scheduledFrom: timestamp("scheduled_from", { withTimezone: true }).notNull(),
  scheduledThrough: timestamp("scheduled_through", { withTimezone: true }).notNull(),
  providerAmbiguousCount: integer("provider_ambiguous_count").notNull().default(0),
  deliveryFailureCount: integer("delivery_failure_count").notNull().default(0),
  error: text("error"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  sentAt: timestamp("sent_at", { withTimezone: true }),
}, (table) => [
  uniqueIndex("outreach_queue_alerts_incident_key_unique").on(table.incidentKey),
]);

export const outreachPreparationSlotsTable = pgTable("outreach_preparation_slots", {
  id: serial("id").primaryKey(),
  runId: integer("run_id").notNull().references(() => outreachPreparationRunsTable.id, { onDelete: "cascade" }),
  targetDate: text("target_date").notNull(),
  slot: integer("slot").notNull(),
  prospectId: integer("prospect_id").notNull().references(() => prospectsTable.id, { onDelete: "restrict" }),
  messageId: integer("message_id").references(() => outreachMessagesTable.id, { onDelete: "set null" }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
}, (table) => [
  uniqueIndex("outreach_preparation_slots_target_slot_unique").on(table.targetDate, table.slot),
  uniqueIndex("outreach_preparation_slots_target_prospect_unique").on(table.targetDate, table.prospectId),
  uniqueIndex("outreach_preparation_slots_message_unique").on(table.messageId),
]);

export const outreachSequenceSendClaimsTable = pgTable("outreach_sequence_send_claims", {
  id: serial("id").primaryKey(),
  messageId: integer("message_id").notNull().references(() => outreachMessagesTable.id, { onDelete: "cascade" }),
  prospectId: integer("prospect_id").notNull().references(() => prospectsTable.id, { onDelete: "cascade" }),
  campaignScope: text("campaign_scope").notNull(),
  sequenceNumber: integer("sequence_number").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
}, (table) => [
  uniqueIndex("outreach_sequence_send_claim_message_unique").on(table.messageId),
  uniqueIndex("outreach_sequence_send_claim_scope_unique").on(
    table.prospectId,
    table.campaignScope,
    table.sequenceNumber,
  ),
]);

export const outreachSuppressionsTable = pgTable("outreach_suppressions", {
  id: serial("id").primaryKey(),
  email: text("email").notNull(),
  reason: text("reason").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
}, (table) => [uniqueIndex("outreach_suppressions_email_unique").on(table.email)]);

export const outreachDeliveryEventsTable = pgTable("outreach_delivery_events", {
  id: serial("id").primaryKey(),
  providerMessageId: text("provider_message_id"),
  email: text("email").notNull(),
  eventType: text("event_type").notNull(),
  reason: text("reason"),
  occurredAt: timestamp("occurred_at", { withTimezone: true }).notNull(),
  outreachMessageId: integer("outreach_message_id").references(() => outreachMessagesTable.id, { onDelete: "set null" }),
  reconciliationKey: text("reconciliation_key"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
}, (table) => [
  uniqueIndex("outreach_delivery_events_dedupe").on(table.providerMessageId, table.eventType, table.occurredAt),
  index("outreach_delivery_events_message_idx").on(table.outreachMessageId),
]);

export const outreachSendReservationsTable = pgTable("outreach_send_reservations", {
  id: serial("id").primaryKey(),
  messageId: integer("message_id").notNull().references(() => outreachMessagesTable.id),
  quotaKey: text("quota_key").notNull(),
  slot: integer("slot").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
}, (table) => [
  uniqueIndex("outreach_send_reservation_message_unique").on(table.messageId),
  uniqueIndex("outreach_send_reservation_quota_slot_unique").on(table.quotaKey, table.slot),
]);

export const outreachMonthlySendReservationsTable = pgTable("outreach_monthly_send_reservations", {
  id: serial("id").primaryKey(),
  messageId: integer("message_id").notNull().references(() => outreachMessagesTable.id),
  normalizedEmail: text("normalized_email").notNull(),
  sequenceNumber: integer("sequence_number").notNull(),
  quotaKey: text("quota_key").notNull(),
  slot: integer("slot").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
}, (table) => [
  uniqueIndex("outreach_monthly_send_reservation_message_unique").on(table.messageId),
  uniqueIndex("outreach_monthly_send_reservation_quota_slot_unique").on(table.quotaKey, table.slot),
  uniqueIndex("outreach_monthly_send_reservation_email_sequence_unique").on(
    table.normalizedEmail,
    table.sequenceNumber,
  ),
]);

export const clientMonthlyEmailDeliveriesTable = pgTable("client_monthly_email_deliveries", {
  id: serial("id").primaryKey(),
  clientJobId: integer("client_job_id"),
  recipientName: text("recipient_name").notNull(),
  recipientEmail: text("recipient_email").notNull(),
  periodKey: text("period_key").notNull(),
  subject: text("subject").notNull(),
  body: text("body").notNull(),
  status: text("status").notNull().default("sent"),
  providerMessageId: text("provider_message_id"),
  error: text("error"),
  sentAt: timestamp("sent_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
}, (table) => [
  uniqueIndex("client_monthly_delivery_email_period_unique").on(
    sql`lower(trim(${table.recipientEmail}))`,
    table.periodKey,
  ),
]);

export const insertResearchRunSchema = createInsertSchema(outreachResearchRunsTable).omit({ id: true, createdAt: true, completedAt: true });
export const insertProspectSchema = createInsertSchema(prospectsTable).omit({ id: true, createdAt: true, updatedAt: true });
export const insertCampaignSchema = createInsertSchema(campaignsTable).omit({ id: true, createdAt: true, updatedAt: true });
export const insertResearchScheduleSchema = createInsertSchema(outreachResearchSchedulesTable).omit({ id: true, createdAt: true, updatedAt: true });
export const insertResearchScheduleRunSchema = createInsertSchema(outreachResearchScheduleRunsTable).omit({ id: true, startedAt: true, completedAt: true });
export const insertPreparationRunSchema = createInsertSchema(outreachPreparationRunsTable).omit({ id: true, startedAt: true, completedAt: true });
export const insertPreparationSlotSchema = createInsertSchema(outreachPreparationSlotsTable).omit({ id: true, createdAt: true });
export const insertOutreachMessageSchema = createInsertSchema(outreachMessagesTable).omit({ id: true, createdAt: true, updatedAt: true });
export const insertOutreachQueueAlertSchema = createInsertSchema(outreachQueueAlertsTable).omit({ id: true, createdAt: true });
export const insertOutreachSequenceSendClaimSchema = createInsertSchema(outreachSequenceSendClaimsTable).omit({ id: true, createdAt: true });
export const insertOutreachSuppressionSchema = createInsertSchema(outreachSuppressionsTable).omit({ id: true, createdAt: true });
export const insertOutreachDeliveryEventSchema = createInsertSchema(outreachDeliveryEventsTable).omit({ id: true, createdAt: true });
export const insertOutreachSendReservationSchema = createInsertSchema(outreachSendReservationsTable).omit({ id: true, createdAt: true });
export const insertOutreachMonthlySendReservationSchema = createInsertSchema(outreachMonthlySendReservationsTable).omit({ id: true, createdAt: true });
export const insertClientMonthlyEmailDeliverySchema = createInsertSchema(clientMonthlyEmailDeliveriesTable).omit({ id: true, createdAt: true });
export type ResearchRun = typeof outreachResearchRunsTable.$inferSelect;
export type InsertResearchRun = z.infer<typeof insertResearchRunSchema>;
export type InsertProspect = z.infer<typeof insertProspectSchema>;
export type Prospect = typeof prospectsTable.$inferSelect;
export type InsertCampaign = z.infer<typeof insertCampaignSchema>;
export type Campaign = typeof campaignsTable.$inferSelect;
export type ResearchSchedule = typeof outreachResearchSchedulesTable.$inferSelect;
export type ResearchScheduleRun = typeof outreachResearchScheduleRunsTable.$inferSelect;
export type InsertResearchSchedule = z.infer<typeof insertResearchScheduleSchema>;
export type InsertResearchScheduleRun = z.infer<typeof insertResearchScheduleRunSchema>;
export type PreparationRun = typeof outreachPreparationRunsTable.$inferSelect;
export type InsertPreparationRun = z.infer<typeof insertPreparationRunSchema>;
export type PreparationSlot = typeof outreachPreparationSlotsTable.$inferSelect;
export type InsertPreparationSlot = z.infer<typeof insertPreparationSlotSchema>;
export type InsertOutreachMessage = z.infer<typeof insertOutreachMessageSchema>;
export type OutreachMessage = typeof outreachMessagesTable.$inferSelect;
export type OutreachQueueAlert = typeof outreachQueueAlertsTable.$inferSelect;
export type InsertOutreachSuppression = z.infer<typeof insertOutreachSuppressionSchema>;
export type OutreachSuppression = typeof outreachSuppressionsTable.$inferSelect;
export type InsertOutreachDeliveryEvent = z.infer<typeof insertOutreachDeliveryEventSchema>;
export type OutreachDeliveryEvent = typeof outreachDeliveryEventsTable.$inferSelect;
export type InsertOutreachMonthlySendReservation = z.infer<typeof insertOutreachMonthlySendReservationSchema>;
export type OutreachMonthlySendReservation = typeof outreachMonthlySendReservationsTable.$inferSelect;
export type ClientMonthlyEmailDelivery = typeof clientMonthlyEmailDeliveriesTable.$inferSelect;
