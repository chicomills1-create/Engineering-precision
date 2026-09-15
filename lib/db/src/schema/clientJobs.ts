import {
  boolean,
  integer,
  index,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const clientCompaniesTable = pgTable("client_companies", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export const clientMembershipsTable = pgTable("client_memberships", {
  id: serial("id").primaryKey(),
  companyId: integer("company_id").notNull().references(() => clientCompaniesTable.id, { onDelete: "cascade" }),
  clerkUserId: text("clerk_user_id").notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
}, (table) => [
  uniqueIndex("client_memberships_clerk_user_unique").on(table.clerkUserId),
]);

export const clientJobsTable = pgTable("client_jobs", {
  id: serial("id").primaryKey(),
  companyId: integer("company_id").references(() => clientCompaniesTable.id, { onDelete: "set null" }),
  membershipId: integer("membership_id").references(() => clientMembershipsTable.id, { onDelete: "set null" }),
  submitterName: text("submitter_name").notNull(),
  submitterEmail: text("submitter_email").notNull(),
  submitterPhone: text("submitter_phone"),
  companyName: text("company_name"),
  projectType: text("project_type").notNull(),
  projectLocation: text("project_location").notNull(),
  scope: text("scope").notNull(),
  timeline: text("timeline"),
  budgetContext: text("budget_context"),
  services: text("services").notNull(),
  status: text("status").notNull().default("submitted"),
  internalNotes: text("internal_notes"),
  statusNotificationStatus: text("status_notification_status"),
  statusNotificationError: text("status_notification_error"),
  statusNotificationSentAt: timestamp("status_notification_sent_at", { withTimezone: true }),
  archivedAt: timestamp("archived_at", { withTimezone: true }),
  monthlyEmailOptIn: boolean("monthly_email_opt_in").notNull().default(false),
  monthlyEmailOptedAt: timestamp("monthly_email_opted_at", { withTimezone: true }),
  estimateId: text("estimate_id"),
  estimateSnapshot: jsonb("estimate_snapshot"),
  pricingRuleVersion: text("pricing_rule_version"),
  routingMode: text("routing_mode"),
  requiredByDate: text("required_by_date"),
  servicePath: text("service_path"),
  schedule: text("schedule"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
}, (table) => [
  uniqueIndex("client_jobs_estimate_id_unique").on(table.estimateId),
  index("client_jobs_service_path_idx").on(table.servicePath),
  index("client_jobs_schedule_idx").on(table.schedule),
]);

export const clientJobUploadsTable = pgTable("client_job_uploads", {
  id: serial("id").primaryKey(),
  objectPath: text("object_path").notNull(),
  originalName: text("original_name").notNull(),
  claimTokenHash: text("claim_token_hash").notNull(),
  uploaderClerkUserId: text("uploader_clerk_user_id"),
  claimedJobId: integer("claimed_job_id").references(() => clientJobsTable.id, { onDelete: "set null" }),
  claimedAt: timestamp("claimed_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
}, (table) => [
  uniqueIndex("client_job_uploads_object_path_unique").on(table.objectPath),
]);

export const clientJobDocumentsTable = pgTable("client_job_documents", {
  id: serial("id").primaryKey(),
  jobId: integer("job_id").notNull().references(() => clientJobsTable.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  objectPath: text("object_path").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertClientCompanySchema = createInsertSchema(clientCompaniesTable).omit({ id: true, createdAt: true, updatedAt: true });
export const insertClientMembershipSchema = createInsertSchema(clientMembershipsTable).omit({ id: true, createdAt: true, updatedAt: true });
export const insertClientJobSchema = createInsertSchema(clientJobsTable).omit({ id: true, createdAt: true, updatedAt: true });
export const insertClientJobDocumentSchema = createInsertSchema(clientJobDocumentsTable).omit({ id: true, createdAt: true });

export type ClientCompany = typeof clientCompaniesTable.$inferSelect;
export type ClientMembership = typeof clientMembershipsTable.$inferSelect;
type ClientJobEstimateFields = "estimateId" | "estimateSnapshot" | "pricingRuleVersion" | "routingMode" | "requiredByDate" | "servicePath" | "schedule";
export type ClientJob = Omit<typeof clientJobsTable.$inferSelect, ClientJobEstimateFields>
  & Partial<Pick<typeof clientJobsTable.$inferSelect, ClientJobEstimateFields>>;
export type ClientJobUpload = typeof clientJobUploadsTable.$inferSelect;
export type ClientJobDocument = typeof clientJobDocumentsTable.$inferSelect;
export type InsertClientJob = z.infer<typeof insertClientJobSchema>;
export type InsertClientJobDocument = z.infer<typeof insertClientJobDocumentSchema>;