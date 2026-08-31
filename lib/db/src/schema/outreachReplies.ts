import {
  index,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { outreachMessagesTable, prospectsTable } from "./outreach";

export const outreachRepliesTable = pgTable("outreach_replies", {
  id: serial("id").primaryKey(),
  dedupeKey: text("dedupe_key").notNull(),
  providerMessageId: text("provider_message_id"),
  senderEmail: text("sender_email").notNull(),
  senderName: text("sender_name"),
  recipientEmail: text("recipient_email"),
  subject: text("subject").notNull().default(""),
  textBody: text("text_body").notNull().default(""),
  messageType: text("message_type").notNull().default("reply"),
  prospectId: integer("prospect_id").references(() => prospectsTable.id, { onDelete: "set null" }),
  outreachMessageId: integer("outreach_message_id").references(() => outreachMessagesTable.id, { onDelete: "set null" }),
  status: text("status").notNull().default("unread"),
  assignedTo: text("assigned_to"),
  internalNote: text("internal_note"),
  followUpAt: timestamp("follow_up_at", { withTimezone: true }),
  receivedAt: timestamp("received_at", { withTimezone: true }).notNull().defaultNow(),
  readAt: timestamp("read_at", { withTimezone: true }),
  resolvedAt: timestamp("resolved_at", { withTimezone: true }),
  forwardStatus: text("forward_status").notNull().default("pending"),
  forwardError: text("forward_error"),
  forwardedAt: timestamp("forwarded_at", { withTimezone: true }),
  stopProcessedAt: timestamp("stop_processed_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
}, (table) => [
  uniqueIndex("outreach_replies_dedupe_unique").on(table.dedupeKey),
  index("outreach_replies_status_idx").on(table.status, table.receivedAt),
  index("outreach_replies_prospect_idx").on(table.prospectId),
]);

export const insertOutreachReplySchema = createInsertSchema(outreachRepliesTable).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertOutreachReply = z.infer<typeof insertOutreachReplySchema>;
export type OutreachReply = typeof outreachRepliesTable.$inferSelect;