import {
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { sql } from "drizzle-orm";
import { z } from "zod/v4";

export const outreachResearchRunsTable = pgTable("outreach_research_runs", {
  id: serial("id").primaryKey(),
  state: text("state").notNull(),
  audience: text("audience").notNull(),
  query: text("query").notNull(),
  status: text("status").notNull().default("completed"),
  resultCount: integer("result_count").notNull().default(0),
  error: text("error"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  completedAt: timestamp("completed_at", { withTimezone: true }),
});

export const prospectsTable = pgTable("outreach_prospects", {
  id: serial("id").primaryKey(),
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
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export const campaignsTable = pgTable("outreach_campaigns", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  audience: text("audience").notNull(),
  states: text("states").array().notNull(),
  dailyLimit: integer("daily_limit").notNull().default(10),
  status: text("status").notNull().default("draft"),
  subjectTemplate: text("subject_template"),
  bodyTemplate: text("body_template"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

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
  error: text("error"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

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
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
}, (table) => [
  uniqueIndex("outreach_delivery_events_dedupe").on(table.providerMessageId, table.eventType, table.occurredAt),
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
export const insertOutreachMessageSchema = createInsertSchema(outreachMessagesTable).omit({ id: true, createdAt: true, updatedAt: true });
export const insertOutreachSuppressionSchema = createInsertSchema(outreachSuppressionsTable).omit({ id: true, createdAt: true });
export const insertOutreachDeliveryEventSchema = createInsertSchema(outreachDeliveryEventsTable).omit({ id: true, createdAt: true });
export const insertOutreachSendReservationSchema = createInsertSchema(outreachSendReservationsTable).omit({ id: true, createdAt: true });
export const insertClientMonthlyEmailDeliverySchema = createInsertSchema(clientMonthlyEmailDeliveriesTable).omit({ id: true, createdAt: true });
export type ResearchRun = typeof outreachResearchRunsTable.$inferSelect;
export type InsertResearchRun = z.infer<typeof insertResearchRunSchema>;
export type InsertProspect = z.infer<typeof insertProspectSchema>;
export type Prospect = typeof prospectsTable.$inferSelect;
export type InsertCampaign = z.infer<typeof insertCampaignSchema>;
export type Campaign = typeof campaignsTable.$inferSelect;
export type InsertOutreachMessage = z.infer<typeof insertOutreachMessageSchema>;
export type OutreachMessage = typeof outreachMessagesTable.$inferSelect;
export type InsertOutreachSuppression = z.infer<typeof insertOutreachSuppressionSchema>;
export type OutreachSuppression = typeof outreachSuppressionsTable.$inferSelect;
export type InsertOutreachDeliveryEvent = z.infer<typeof insertOutreachDeliveryEventSchema>;
export type OutreachDeliveryEvent = typeof outreachDeliveryEventsTable.$inferSelect;
export type ClientMonthlyEmailDelivery = typeof clientMonthlyEmailDeliveriesTable.$inferSelect;