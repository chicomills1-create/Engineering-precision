CREATE TABLE IF NOT EXISTS "city_evidence_check_runs" (
	"slot" text PRIMARY KEY NOT NULL,
	"status" text NOT NULL,
	"attempt_count" integer DEFAULT 1 NOT NULL,
	"started_at" timestamp with time zone DEFAULT now() NOT NULL,
	"completed_at" timestamp with time zone,
	"error" text
);
