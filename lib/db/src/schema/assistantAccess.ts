import {
  index,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const assistantAccessRequestsTable = pgTable("assistant_access_requests", {
  id: text("id").primaryKey(),
  requestTokenHash: text("request_token_hash").notNull(),
  status: text("status").notNull().default("pending"),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  decidedAt: timestamp("decided_at", { withTimezone: true }),
  decidedByClerkUserId: text("decided_by_clerk_user_id"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
}, (table) => [
  uniqueIndex("assistant_access_requests_token_unique").on(table.requestTokenHash),
  index("assistant_access_requests_status_expiry_idx").on(table.status, table.expiresAt),
]);

export const assistantSessionsTable = pgTable("assistant_sessions", {
  id: text("id").primaryKey(),
  sessionTokenHash: text("session_token_hash").notNull(),
  requestId: text("request_id").notNull().references(() => assistantAccessRequestsTable.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  lastSeenAt: timestamp("last_seen_at", { withTimezone: true }).notNull().defaultNow(),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  revokedAt: timestamp("revoked_at", { withTimezone: true }),
  revokedByClerkUserId: text("revoked_by_clerk_user_id"),
}, (table) => [
  uniqueIndex("assistant_sessions_token_unique").on(table.sessionTokenHash),
  index("assistant_sessions_active_idx").on(table.revokedAt, table.expiresAt),
]);

export type AssistantAccessRequest = typeof assistantAccessRequestsTable.$inferSelect;
export type AssistantSession = typeof assistantSessionsTable.$inferSelect;