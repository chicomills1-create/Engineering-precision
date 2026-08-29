CREATE TABLE "outreach_research_schedule_runs" (
	"id" serial PRIMARY KEY NOT NULL,
	"schedule_id" integer NOT NULL,
	"run_date" text NOT NULL,
	"status" text DEFAULT 'running' NOT NULL,
	"query" text DEFAULT '' NOT NULL,
	"result_count" integer DEFAULT 0 NOT NULL,
	"skipped_count" integer DEFAULT 0 NOT NULL,
	"error" text,
	"started_at" timestamp with time zone DEFAULT now() NOT NULL,
	"completed_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "outreach_research_schedules" (
	"id" serial PRIMARY KEY NOT NULL,
	"campaign_id" integer NOT NULL,
	"enabled" boolean DEFAULT false NOT NULL,
	"timezone" text DEFAULT 'America/Phoenix' NOT NULL,
	"local_hour" integer DEFAULT 8 NOT NULL,
	"target_count" integer DEFAULT 10 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
DROP INDEX "client_monthly_delivery_email_period_unique";--> statement-breakpoint
ALTER TABLE "outreach_research_runs" ADD COLUMN "skipped_count" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "outreach_research_schedule_runs" ADD CONSTRAINT "outreach_research_schedule_runs_schedule_id_outreach_research_schedules_id_fk" FOREIGN KEY ("schedule_id") REFERENCES "public"."outreach_research_schedules"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "outreach_research_schedules" ADD CONSTRAINT "outreach_research_schedules_campaign_id_outreach_campaigns_id_fk" FOREIGN KEY ("campaign_id") REFERENCES "public"."outreach_campaigns"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "outreach_research_schedule_runs_schedule_date_unique" ON "outreach_research_schedule_runs" USING btree ("schedule_id","run_date");--> statement-breakpoint
CREATE UNIQUE INDEX "outreach_research_schedules_campaign_unique" ON "outreach_research_schedules" USING btree ("campaign_id");--> statement-breakpoint
WITH ranked_prospects AS (
	SELECT
		"id",
		row_number() OVER (PARTITION BY "dedupe_key" ORDER BY "created_at", "id") AS duplicate_number
	FROM "outreach_prospects"
	WHERE "dedupe_key" IS NOT NULL
)
UPDATE "outreach_prospects"
SET "dedupe_key" = NULL
FROM ranked_prospects
WHERE "outreach_prospects"."id" = ranked_prospects."id"
	AND ranked_prospects.duplicate_number > 1;--> statement-breakpoint
CREATE UNIQUE INDEX "outreach_prospects_dedupe_key_unique" ON "outreach_prospects" USING btree ("dedupe_key");--> statement-breakpoint
CREATE UNIQUE INDEX "client_monthly_delivery_email_period_unique" ON "client_monthly_email_deliveries" USING btree (lower(trim("recipient_email")),"period_key");--> statement-breakpoint
INSERT INTO "outreach_campaigns" ("name", "audience", "states", "daily_limit", "status")
SELECT 'Daily Qualified Arizona Architects', 'architect', ARRAY['AZ']::text[], 10, 'active'
WHERE NOT EXISTS (
	SELECT 1 FROM "outreach_campaigns" WHERE "status" = 'active'
);--> statement-breakpoint
INSERT INTO "outreach_research_schedules" ("campaign_id", "enabled", "timezone", "local_hour", "target_count")
SELECT "id", true, 'America/Phoenix', 8, LEAST("daily_limit", 10)
FROM "outreach_campaigns"
WHERE "status" = 'active'
ORDER BY "created_at"
LIMIT 1
ON CONFLICT ("campaign_id") DO UPDATE SET
	"enabled" = true,
	"timezone" = 'America/Phoenix',
	"local_hour" = 8,
	"target_count" = LEAST(EXCLUDED."target_count", 10),
	"updated_at" = now();