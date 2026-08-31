CREATE TABLE "outreach_replies" (
	"id" serial PRIMARY KEY NOT NULL,
	"dedupe_key" text NOT NULL,
	"provider_message_id" text,
	"sender_email" text NOT NULL,
	"sender_name" text,
	"recipient_email" text,
	"subject" text DEFAULT '' NOT NULL,
	"text_body" text DEFAULT '' NOT NULL,
	"message_type" text DEFAULT 'reply' NOT NULL,
	"prospect_id" integer,
	"outreach_message_id" integer,
	"status" text DEFAULT 'unread' NOT NULL,
	"assigned_to" text,
	"internal_note" text,
	"follow_up_at" timestamp with time zone,
	"received_at" timestamp with time zone DEFAULT now() NOT NULL,
	"read_at" timestamp with time zone,
	"resolved_at" timestamp with time zone,
	"forward_status" text DEFAULT 'pending' NOT NULL,
	"forward_error" text,
	"forwarded_at" timestamp with time zone,
	"stop_processed_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "outreach_replies" ADD CONSTRAINT "outreach_replies_prospect_id_outreach_prospects_id_fk" FOREIGN KEY ("prospect_id") REFERENCES "public"."outreach_prospects"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "outreach_replies" ADD CONSTRAINT "outreach_replies_outreach_message_id_outreach_messages_id_fk" FOREIGN KEY ("outreach_message_id") REFERENCES "public"."outreach_messages"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "outreach_replies_dedupe_unique" ON "outreach_replies" USING btree ("dedupe_key");--> statement-breakpoint
CREATE INDEX "outreach_replies_status_idx" ON "outreach_replies" USING btree ("status","received_at");--> statement-breakpoint
CREATE INDEX "outreach_replies_prospect_idx" ON "outreach_replies" USING btree ("prospect_id");