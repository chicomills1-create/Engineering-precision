import {
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

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
  contactName: text("contact_name").notNull(),
  contactTitle: text("contact_title"),
  contactEmail: text("contact_email").notNull(),
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

export const insertProspectSchema = createInsertSchema(prospectsTable).omit({ id: true, createdAt: true, updatedAt: true });
export const insertCampaignSchema = createInsertSchema(campaignsTable).omit({ id: true, createdAt: true, updatedAt: true });
export const insertOutreachMessageSchema = createInsertSchema(outreachMessagesTable).omit({ id: true, createdAt: true, updatedAt: true });
export const insertOutreachSuppressionSchema = createInsertSchema(outreachSuppressionsTable).omit({ id: true, createdAt: true });
export type InsertProspect = z.infer<typeof insertProspectSchema>;
export type Prospect = typeof prospectsTable.$inferSelect;
export type InsertCampaign = z.infer<typeof insertCampaignSchema>;
export type Campaign = typeof campaignsTable.$inferSelect;
export type InsertOutreachMessage = z.infer<typeof insertOutreachMessageSchema>;
export type OutreachMessage = typeof outreachMessagesTable.$inferSelect;
export type InsertOutreachSuppression = z.infer<typeof insertOutreachSuppressionSchema>;
export type OutreachSuppression = typeof outreachSuppressionsTable.$inferSelect;