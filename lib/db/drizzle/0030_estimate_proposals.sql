ALTER TABLE "client_jobs" ADD COLUMN IF NOT EXISTS "estimate_id" text;
--> statement-breakpoint
ALTER TABLE "client_jobs" ADD COLUMN IF NOT EXISTS "estimate_snapshot" jsonb;
--> statement-breakpoint
ALTER TABLE "client_jobs" ADD COLUMN IF NOT EXISTS "pricing_rule_version" text;
--> statement-breakpoint
ALTER TABLE "client_jobs" ADD COLUMN IF NOT EXISTS "routing_mode" text;
--> statement-breakpoint
ALTER TABLE "client_jobs" ADD COLUMN IF NOT EXISTS "required_by_date" text;
--> statement-breakpoint
ALTER TABLE "client_jobs" ADD COLUMN IF NOT EXISTS "service_path" text;
--> statement-breakpoint
ALTER TABLE "client_jobs" ADD COLUMN IF NOT EXISTS "schedule" text;
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "client_jobs_estimate_id_unique" ON "client_jobs" ("estimate_id");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "client_jobs_service_path_idx" ON "client_jobs" ("service_path");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "client_jobs_schedule_idx" ON "client_jobs" ("schedule");