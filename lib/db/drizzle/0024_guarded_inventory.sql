CREATE TABLE IF NOT EXISTS "outreach_import_batches" (
  "id" serial PRIMARY KEY NOT NULL, "batch_id" text NOT NULL, "source_filename" text NOT NULL,
  "source_row_count" integer NOT NULL, "created_by" text, "created_at" timestamptz DEFAULT now() NOT NULL,
  "status" text DEFAULT 'running' NOT NULL, "error" text, "completed_at" timestamptz
);
CREATE UNIQUE INDEX IF NOT EXISTS "outreach_import_batches_batch_unique" ON "outreach_import_batches" ("batch_id");
CREATE TABLE IF NOT EXISTS "outreach_import_rows" (
  "id" serial PRIMARY KEY NOT NULL, "batch_id" text NOT NULL, "source_row" integer NOT NULL,
  "source_filename" text NOT NULL, "company" text NOT NULL, "contact_name" text, "title" text,
  "email" text NOT NULL, "email_type" text NOT NULL, "source_url" text, "verification_status" text,
  "verification_method" text, "eligibility_result" text NOT NULL, "exclusion_reason" text,
  "prospect_id" integer REFERENCES "outreach_prospects"("id") ON DELETE SET NULL, "imported_at" timestamptz DEFAULT now() NOT NULL
);
CREATE UNIQUE INDEX IF NOT EXISTS "outreach_import_rows_batch_row_unique" ON "outreach_import_rows" ("batch_id", "source_row");
CREATE TABLE IF NOT EXISTS "outreach_lane_configs" (
  "id" serial PRIMARY KEY NOT NULL, "campaign_key" text NOT NULL, "effective_month" text NOT NULL,
  "named_limit" integer NOT NULL, "public_limit" integer NOT NULL, "hot_market_limit" integer NOT NULL,
  "hot_lead_limit" integer NOT NULL, "updated_by" text, "updated_at" timestamptz DEFAULT now() NOT NULL
);
CREATE UNIQUE INDEX IF NOT EXISTS "outreach_lane_configs_campaign_month_unique" ON "outreach_lane_configs" ("campaign_key", "effective_month");
INSERT INTO "outreach_lane_configs" ("campaign_key", "effective_month", "named_limit", "public_limit", "hot_market_limit", "hot_lead_limit")
VALUES ('2026-09', '2026-09', 100, 100, 100, 100)
ON CONFLICT ("campaign_key", "effective_month") DO NOTHING;
CREATE TABLE IF NOT EXISTS "outreach_one_time_overrides" (
  "id" serial PRIMARY KEY NOT NULL, "campaign_key" text NOT NULL, "requested_limit" integer NOT NULL,
  "status" text DEFAULT 'requested' NOT NULL, "requested_evidence" text, "decision_evidence" text,
  "requested_by" text NOT NULL, "reason" text, "requested_for_date" text NOT NULL,
  "expires_at" timestamptz NOT NULL, "created_at" timestamptz DEFAULT now() NOT NULL
);
CREATE UNIQUE INDEX IF NOT EXISTS "outreach_one_time_overrides_campaign_date_unique" ON "outreach_one_time_overrides" ("campaign_key", "requested_for_date");