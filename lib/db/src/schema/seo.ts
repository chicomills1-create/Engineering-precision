import {
  date,
  index,
  integer,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

/** Daily, dimensioned Search Console Search Analytics observations. */
export const seoPerformanceSnapshotsTable = pgTable(
  "seo_performance_snapshots",
  {
    id: serial("id").primaryKey(),
    periodStart: date("period_start", { mode: "string" }).notNull(),
    periodEnd: date("period_end", { mode: "string" }).notNull(),
    dimension: text("dimension").notNull(), // page | query
    dimensionValue: text("dimension_value").notNull(),
    clicks: integer("clicks").notNull().default(0),
    impressions: integer("impressions").notNull().default(0),
    ctr: text("ctr").notNull().default("0"),
    position: text("position").notNull().default("0"),
    syncedAt: timestamp("synced_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    uniqueIndex("seo_performance_snapshot_period_dimension_value_unique").on(
      table.periodStart,
      table.periodEnd,
      table.dimension,
      table.dimensionValue,
    ),
    index("seo_performance_snapshot_synced_at_idx").on(table.syncedAt),
  ],
);

export const seoAuditRunsTable = pgTable(
  "seo_audit_runs",
  {
    id: serial("id").primaryKey(),
    status: text("status").notNull(), // completed | partial | failed
    startedAt: timestamp("started_at", { withTimezone: true }).notNull().defaultNow(),
    completedAt: timestamp("completed_at", { withTimezone: true }),
    urlsScanned: integer("urls_scanned").notNull().default(0),
    issueCount: integer("issue_count").notNull().default(0),
    summary: jsonb("summary").notNull().default({}),
    error: text("error"),
  },
  (table) => [index("seo_audit_runs_latest_idx").on(table.completedAt)],
);

export const seoAuditIssuesTable = pgTable(
  "seo_audit_issues",
  {
    id: serial("id").primaryKey(),
    auditRunId: integer("audit_run_id").notNull().references(() => seoAuditRunsTable.id, { onDelete: "cascade" }),
    url: text("url").notNull(),
    category: text("category").notNull(),
    severity: text("severity").notNull(), // critical | warning | info
    status: text("status").notNull().default("open"), // open | resolved | ignored
    message: text("message").notNull(),
    details: jsonb("details").notNull().default({}),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index("seo_audit_issues_run_status_idx").on(table.auditRunId, table.status),
    index("seo_audit_issues_status_severity_idx").on(table.status, table.severity),
  ],
);

export const insertSeoPerformanceSnapshotSchema = createInsertSchema(seoPerformanceSnapshotsTable).omit({ id: true, syncedAt: true });
export const insertSeoAuditRunSchema = createInsertSchema(seoAuditRunsTable).omit({ id: true, startedAt: true });
export const insertSeoAuditIssueSchema = createInsertSchema(seoAuditIssuesTable).omit({ id: true, createdAt: true });
export type SeoPerformanceSnapshot = typeof seoPerformanceSnapshotsTable.$inferSelect;
export type SeoAuditRun = typeof seoAuditRunsTable.$inferSelect;
export type SeoAuditIssue = typeof seoAuditIssuesTable.$inferSelect;