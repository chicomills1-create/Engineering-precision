CREATE TABLE IF NOT EXISTS "outreach_sequence_send_claims" (
	"id" serial PRIMARY KEY NOT NULL,
	"message_id" integer NOT NULL,
	"prospect_id" integer NOT NULL,
	"campaign_scope" text NOT NULL,
	"sequence_number" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "outreach_delivery_events" ADD COLUMN IF NOT EXISTS "outreach_message_id" integer;--> statement-breakpoint
ALTER TABLE "outreach_delivery_events" ADD COLUMN IF NOT EXISTS "reconciliation_key" text;--> statement-breakpoint
ALTER TABLE "outreach_messages" ADD COLUMN IF NOT EXISTS "provider_reconciliation_key" text;--> statement-breakpoint
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'outreach_sequence_send_claims_message_id_outreach_messages_id_fk') THEN
    ALTER TABLE "outreach_sequence_send_claims" ADD CONSTRAINT "outreach_sequence_send_claims_message_id_outreach_messages_id_fk" FOREIGN KEY ("message_id") REFERENCES "public"."outreach_messages"("id") ON DELETE cascade ON UPDATE no action;
  END IF;
END $$;
--> statement-breakpoint
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'outreach_sequence_send_claims_prospect_id_outreach_prospects_id_fk') THEN
    ALTER TABLE "outreach_sequence_send_claims" ADD CONSTRAINT "outreach_sequence_send_claims_prospect_id_outreach_prospects_id_fk" FOREIGN KEY ("prospect_id") REFERENCES "public"."outreach_prospects"("id") ON DELETE cascade ON UPDATE no action;
  END IF;
END $$;
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "outreach_sequence_send_claim_message_unique" ON "outreach_sequence_send_claims" USING btree ("message_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "outreach_sequence_send_claim_scope_unique" ON "outreach_sequence_send_claims" USING btree ("prospect_id","campaign_scope","sequence_number");--> statement-breakpoint
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'outreach_delivery_events_outreach_message_id_outreach_messages_id_fk') THEN
    ALTER TABLE "outreach_delivery_events" ADD CONSTRAINT "outreach_delivery_events_outreach_message_id_outreach_messages_id_fk" FOREIGN KEY ("outreach_message_id") REFERENCES "public"."outreach_messages"("id") ON DELETE set null ON UPDATE no action;
  END IF;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "outreach_delivery_events_message_idx" ON "outreach_delivery_events" USING btree ("outreach_message_id");
