CREATE TABLE "outreach_preparation_runs" (
	"id" serial PRIMARY KEY NOT NULL,
	"target_date" text NOT NULL,
	"status" text DEFAULT 'running' NOT NULL,
	"target_count" integer DEFAULT 150 NOT NULL,
	"prepared_count" integer DEFAULT 0 NOT NULL,
	"skipped_count" integer DEFAULT 0 NOT NULL,
	"shortfall_count" integer DEFAULT 0 NOT NULL,
	"error" text,
	"started_at" timestamp with time zone DEFAULT now() NOT NULL,
	"completed_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "outreach_preparation_slots" (
	"id" serial PRIMARY KEY NOT NULL,
	"run_id" integer NOT NULL,
	"target_date" text NOT NULL,
	"slot" integer NOT NULL,
	"prospect_id" integer NOT NULL,
	"message_id" integer,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "seo_audit_issues" (
	"id" serial PRIMARY KEY NOT NULL,
	"audit_run_id" integer NOT NULL,
	"url" text NOT NULL,
	"category" text NOT NULL,
	"severity" text NOT NULL,
	"status" text DEFAULT 'open' NOT NULL,
	"message" text NOT NULL,
	"details" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "seo_audit_runs" (
	"id" serial PRIMARY KEY NOT NULL,
	"status" text NOT NULL,
	"started_at" timestamp with time zone DEFAULT now() NOT NULL,
	"completed_at" timestamp with time zone,
	"urls_scanned" integer DEFAULT 0 NOT NULL,
	"issue_count" integer DEFAULT 0 NOT NULL,
	"summary" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"error" text
);
--> statement-breakpoint
CREATE TABLE "seo_performance_snapshots" (
	"id" serial PRIMARY KEY NOT NULL,
	"period_start" date NOT NULL,
	"period_end" date NOT NULL,
	"dimension" text NOT NULL,
	"dimension_value" text NOT NULL,
	"clicks" integer DEFAULT 0 NOT NULL,
	"impressions" integer DEFAULT 0 NOT NULL,
	"ctr" text DEFAULT '0' NOT NULL,
	"position" text DEFAULT '0' NOT NULL,
	"synced_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "outreach_campaigns" ALTER COLUMN "daily_limit" SET DEFAULT 100;--> statement-breakpoint
ALTER TABLE "outreach_research_schedules" ALTER COLUMN "target_count" SET DEFAULT 100;--> statement-breakpoint
ALTER TABLE "outreach_preparation_slots" ADD CONSTRAINT "outreach_preparation_slots_run_id_outreach_preparation_runs_id_fk" FOREIGN KEY ("run_id") REFERENCES "public"."outreach_preparation_runs"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "outreach_preparation_slots" ADD CONSTRAINT "outreach_preparation_slots_prospect_id_outreach_prospects_id_fk" FOREIGN KEY ("prospect_id") REFERENCES "public"."outreach_prospects"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "outreach_preparation_slots" ADD CONSTRAINT "outreach_preparation_slots_message_id_outreach_messages_id_fk" FOREIGN KEY ("message_id") REFERENCES "public"."outreach_messages"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "seo_audit_issues" ADD CONSTRAINT "seo_audit_issues_audit_run_id_seo_audit_runs_id_fk" FOREIGN KEY ("audit_run_id") REFERENCES "public"."seo_audit_runs"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "outreach_preparation_runs_target_date_unique" ON "outreach_preparation_runs" USING btree ("target_date");--> statement-breakpoint
CREATE UNIQUE INDEX "outreach_preparation_slots_target_slot_unique" ON "outreach_preparation_slots" USING btree ("target_date","slot");--> statement-breakpoint
CREATE UNIQUE INDEX "outreach_preparation_slots_target_prospect_unique" ON "outreach_preparation_slots" USING btree ("target_date","prospect_id");--> statement-breakpoint
CREATE UNIQUE INDEX "outreach_preparation_slots_message_unique" ON "outreach_preparation_slots" USING btree ("message_id");--> statement-breakpoint
CREATE INDEX "seo_audit_issues_run_status_idx" ON "seo_audit_issues" USING btree ("audit_run_id","status");--> statement-breakpoint
CREATE INDEX "seo_audit_issues_status_severity_idx" ON "seo_audit_issues" USING btree ("status","severity");--> statement-breakpoint
CREATE INDEX "seo_audit_runs_latest_idx" ON "seo_audit_runs" USING btree ("completed_at");--> statement-breakpoint
CREATE UNIQUE INDEX "seo_performance_snapshot_period_dimension_value_unique" ON "seo_performance_snapshots" USING btree ("period_start","period_end","dimension","dimension_value");--> statement-breakpoint
CREATE INDEX "seo_performance_snapshot_synced_at_idx" ON "seo_performance_snapshots" USING btree ("synced_at");