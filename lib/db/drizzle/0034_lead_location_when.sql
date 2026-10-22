ALTER TABLE "leads" ADD COLUMN IF NOT EXISTS "project_location" text;--> statement-breakpoint
ALTER TABLE "leads" ADD COLUMN IF NOT EXISTS "when_needed" text;
