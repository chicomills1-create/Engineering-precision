ALTER TABLE "linkedin_actions" ADD COLUMN IF NOT EXISTS "provider_name" text;
--> statement-breakpoint
ALTER TABLE "linkedin_actions" ADD COLUMN IF NOT EXISTS "provider_operation" text;
--> statement-breakpoint
ALTER TABLE "linkedin_actions" ADD COLUMN IF NOT EXISTS "provider_state" text DEFAULT 'not_attempted' NOT NULL;
--> statement-breakpoint
ALTER TABLE "linkedin_actions" ADD COLUMN IF NOT EXISTS "provider_reconciliation_key" text;
--> statement-breakpoint
ALTER TABLE "linkedin_actions" ADD COLUMN IF NOT EXISTS "provider_action_id" text;
--> statement-breakpoint
ALTER TABLE "linkedin_actions" ADD COLUMN IF NOT EXISTS "provider_error" text;
--> statement-breakpoint
ALTER TABLE "linkedin_actions" ADD COLUMN IF NOT EXISTS "provider_attempted_at" timestamp with time zone;
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "linkedin_actions_provider_reconciliation_unique" ON "linkedin_actions" USING btree ("provider_reconciliation_key");
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "linkedin_actions_provider_action_unique" ON "linkedin_actions" USING btree ("provider_action_id");
