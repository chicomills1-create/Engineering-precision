import {
  integer,
  numeric,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

import { clientJobsTable } from "./clientJobs";

export const jobPayrollPlansTable = pgTable("job_payroll_plans", {
  id: serial("id").primaryKey(),
  jobId: integer("job_id").notNull().references(() => clientJobsTable.id, { onDelete: "cascade" }),
  contractRevenue: numeric("contract_revenue", { precision: 12, scale: 2 }).notNull(),
  status: text("status").notNull().default("draft"),
  notes: text("notes"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export const jobPayrollEntriesTable = pgTable("job_payroll_entries", {
  id: serial("id").primaryKey(),
  planId: integer("plan_id").notNull().references(() => jobPayrollPlansTable.id, { onDelete: "cascade" }),
  role: text("role").notNull(),
  payeeName: text("payee_name").notNull(),
  payeeEmail: text("payee_email"),
  compensationType: text("compensation_type").notNull(),
  agreedTotal: numeric("agreed_total", { precision: 12, scale: 2 }),
  percentage: numeric("percentage", { precision: 5, scale: 2 }),
  notes: text("notes"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export const jobPayrollInstallmentsTable = pgTable("job_payroll_installments", {
  id: serial("id").primaryKey(),
  entryId: integer("entry_id").notNull().references(() => jobPayrollEntriesTable.id, { onDelete: "cascade" }),
  installmentNumber: integer("installment_number").notNull(),
  label: text("label").notNull(),
  percentage: numeric("percentage", { precision: 5, scale: 2 }).notNull(),
  dueAt: timestamp("due_at", { withTimezone: true }),
  status: text("status").notNull().default("planned"),
  paidAt: timestamp("paid_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertJobPayrollPlanSchema = createInsertSchema(jobPayrollPlansTable).omit({ id: true, createdAt: true, updatedAt: true });
export const insertJobPayrollEntrySchema = createInsertSchema(jobPayrollEntriesTable).omit({ id: true, createdAt: true, updatedAt: true });
export const insertJobPayrollInstallmentSchema = createInsertSchema(jobPayrollInstallmentsTable).omit({ id: true, createdAt: true });

export type JobPayrollPlan = typeof jobPayrollPlansTable.$inferSelect;
export type JobPayrollEntry = typeof jobPayrollEntriesTable.$inferSelect;
export type JobPayrollInstallment = typeof jobPayrollInstallmentsTable.$inferSelect;