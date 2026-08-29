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

export const referralPartnersTable = pgTable("growth_referral_partners", {
  id: serial("id").primaryKey(),
  referralCode: text("referral_code").notNull(),
  companyName: text("company_name").notNull(),
  contactName: text("contact_name"),
  contactEmail: text("contact_email"),
  contactPhone: text("contact_phone"),
  website: text("website"),
  source: text("source").notNull(),
  relationshipStatus: text("relationship_status").notNull().default("prospect"),
  notes: text("notes"),
  nextFollowUpAt: timestamp("next_follow_up_at", { withTimezone: true }),
  referralCount: integer("referral_count").notNull().default(0),
  convertedCount: integer("converted_count").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
}, (table) => [uniqueIndex("growth_referral_partners_referral_code_unique").on(table.referralCode)]);

export const publicOpportunitiesTable = pgTable("growth_public_opportunities", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  sourceUrl: text("source_url").notNull(),
  projectLocation: text("project_location").notNull(),
  buyerOrFirm: text("buyer_or_firm").notNull(),
  disciplineFit: text("discipline_fit").notNull(),
  urgency: text("urgency").notNull().default("normal"),
  evidenceNotes: text("evidence_notes").notNull(),
  owner: text("owner"),
  pipelineStatus: text("pipeline_status").notNull().default("research"),
  nextAction: text("next_action"),
  nextActionAt: timestamp("next_action_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export const insertReferralPartnerSchema = createInsertSchema(referralPartnersTable).omit({
  id: true, createdAt: true, updatedAt: true,
});
export const insertPublicOpportunitySchema = createInsertSchema(publicOpportunitiesTable).omit({
  id: true, createdAt: true, updatedAt: true,
});

export type ReferralPartner = typeof referralPartnersTable.$inferSelect;
export type PublicOpportunity = typeof publicOpportunitiesTable.$inferSelect;
export type InsertReferralPartner = z.infer<typeof insertReferralPartnerSchema>;
export type InsertPublicOpportunity = z.infer<typeof insertPublicOpportunitySchema>;