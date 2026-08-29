import { pgTable, text, serial, timestamp, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const leadsTable = pgTable("leads", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email"),
  company: text("company"),
  phone: text("phone"),
  projectType: text("project_type"),
  services: text("services"),
  message: text("message").notNull(),
  source: text("source"),
  medium: text("medium"),
  campaign: text("campaign"),
  landingPath: text("landing_path"),
  referrer: text("referrer"),
  referralPartnerId: integer("referral_partner_id"),
  status: text("status").notNull().default("new"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertLeadSchema = createInsertSchema(leadsTable).omit({
  id: true,
  createdAt: true,
  status: true,
});
export type InsertLead = z.infer<typeof insertLeadSchema>;
export type Lead = typeof leadsTable.$inferSelect;
