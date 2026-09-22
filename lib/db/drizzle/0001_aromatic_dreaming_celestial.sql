CREATE TABLE IF NOT EXISTS "outreach_research_runs" (
  "id" serial PRIMARY KEY NOT NULL,
  "state" text NOT NULL,
  "audience" text NOT NULL,
  "query" text NOT NULL,
  "status" text DEFAULT 'completed' NOT NULL,
  "result_count" integer DEFAULT 0 NOT NULL,
  "error" text,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "completed_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "outreach_campaigns" (
  "id" serial PRIMARY KEY NOT NULL,
  "name" text NOT NULL,
  "audience" text NOT NULL,
  "states" text[] NOT NULL,
  "daily_limit" integer DEFAULT 10 NOT NULL,
  "status" text DEFAULT 'draft' NOT NULL,
  "subject_template" text,
  "body_template" text,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "outreach_prospects" (
  "id" serial PRIMARY KEY NOT NULL,
  "company_name" text NOT NULL,
  "website" text,
  "city" text NOT NULL,
  "state" text NOT NULL,
  "audience" text NOT NULL,
  "source_url" text,
  "research_notes" text,
  "fit_score" integer DEFAULT 0 NOT NULL,
  "need_score" integer DEFAULT 0 NOT NULL,
  "need_signals" text,
  "contact_name" text,
  "contact_title" text,
  "contact_email" text,
  "contact_confidence" text DEFAULT 'unknown' NOT NULL,
  "contact_source_url" text,
  "dedupe_key" text,
  "research_run_id" integer,
  "email_status" text DEFAULT 'unverified' NOT NULL,
  "status" text DEFAULT 'new' NOT NULL,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "outreach_prospects" ADD COLUMN IF NOT EXISTS "need_score" integer DEFAULT 0 NOT NULL;
ALTER TABLE "outreach_prospects" ADD COLUMN IF NOT EXISTS "need_signals" text;
ALTER TABLE "outreach_prospects" ADD COLUMN IF NOT EXISTS "contact_confidence" text DEFAULT 'unknown' NOT NULL;
ALTER TABLE "outreach_prospects" ADD COLUMN IF NOT EXISTS "contact_source_url" text;
ALTER TABLE "outreach_prospects" ADD COLUMN IF NOT EXISTS "dedupe_key" text;
ALTER TABLE "outreach_prospects" ADD COLUMN IF NOT EXISTS "research_run_id" integer;
ALTER TABLE "outreach_prospects" ALTER COLUMN "contact_name" DROP NOT NULL;
ALTER TABLE "outreach_prospects" ALTER COLUMN "contact_email" DROP NOT NULL;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "outreach_messages" (
  "id" serial PRIMARY KEY NOT NULL,
  "prospect_id" integer NOT NULL REFERENCES "outreach_prospects"("id") ON DELETE cascade,
  "campaign_id" integer REFERENCES "outreach_campaigns"("id") ON DELETE set null,
  "sequence_number" integer DEFAULT 1 NOT NULL,
  "subject" text NOT NULL,
  "body" text NOT NULL,
  "status" text DEFAULT 'draft' NOT NULL,
  "scheduled_at" timestamp with time zone,
  "sent_at" timestamp with time zone,
  "provider_message_id" text,
  "error" text,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "outreach_suppressions" (
  "id" serial PRIMARY KEY NOT NULL,
  "email" text NOT NULL,
  "reason" text NOT NULL,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "outreach_delivery_events" (
  "id" serial PRIMARY KEY NOT NULL,
  "provider_message_id" text,
  "email" text NOT NULL,
  "event_type" text NOT NULL,
  "reason" text,
  "occurred_at" timestamp with time zone NOT NULL,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "outreach_send_reservations" (
  "id" serial PRIMARY KEY NOT NULL,
  "message_id" integer NOT NULL REFERENCES "outreach_messages"("id"),
  "quota_key" text NOT NULL,
  "slot" integer NOT NULL,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "outreach_suppressions_email_unique" ON "outreach_suppressions" ("email");
CREATE UNIQUE INDEX IF NOT EXISTS "outreach_delivery_events_dedupe" ON "outreach_delivery_events" ("provider_message_id", "event_type", "occurred_at");
CREATE UNIQUE INDEX IF NOT EXISTS "outreach_send_reservation_message_unique" ON "outreach_send_reservations" ("message_id");
CREATE UNIQUE INDEX IF NOT EXISTS "outreach_send_reservation_quota_slot_unique" ON "outreach_send_reservations" ("quota_key", "slot");
--> statement-breakpoint
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'outreach_prospects_research_run_id_outreach_research_runs_id_fk') THEN
    ALTER TABLE "outreach_prospects"
      ADD CONSTRAINT "outreach_prospects_research_run_id_outreach_research_runs_id_fk"
      FOREIGN KEY ("research_run_id") REFERENCES "outreach_research_runs"("id") ON DELETE set null;
  END IF;
END $$;
