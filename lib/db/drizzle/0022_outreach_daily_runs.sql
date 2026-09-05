CREATE TABLE IF NOT EXISTS "outreach_daily_runs" (
  "id" serial PRIMARY KEY NOT NULL,
  "run_date" text NOT NULL,
  "status" text DEFAULT 'running' NOT NULL,
  "incident_type" text,
  "attempt_count" integer DEFAULT 1 NOT NULL,
  "claimed_count" integer DEFAULT 0 NOT NULL,
  "provider_accepted_count" integer DEFAULT 0 NOT NULL,
  "delivered_count" integer DEFAULT 0 NOT NULL,
  "bounced_count" integer DEFAULT 0 NOT NULL,
  "stopped_count" integer DEFAULT 0 NOT NULL,
  "unresolved_count" integer DEFAULT 0 NOT NULL,
  "error" text,
  "started_at" timestamp with time zone DEFAULT now() NOT NULL,
  "completed_at" timestamp with time zone
);
CREATE UNIQUE INDEX IF NOT EXISTS "outreach_daily_runs_run_date_unique"
  ON "outreach_daily_runs" USING btree ("run_date");