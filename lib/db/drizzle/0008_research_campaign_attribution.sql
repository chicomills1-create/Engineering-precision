DROP INDEX "outreach_research_schedule_runs_schedule_date_unique";--> statement-breakpoint
ALTER TABLE "outreach_research_runs" ADD COLUMN IF NOT EXISTS "campaign_id" integer;--> statement-breakpoint
ALTER TABLE "outreach_prospects" ADD COLUMN IF NOT EXISTS "campaign_id" integer;--> statement-breakpoint
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'outreach_research_runs_campaign_id_outreach_campaigns_id_fk') THEN
    ALTER TABLE "outreach_research_runs" ADD CONSTRAINT "outreach_research_runs_campaign_id_outreach_campaigns_id_fk" FOREIGN KEY ("campaign_id") REFERENCES "public"."outreach_campaigns"("id") ON DELETE set null ON UPDATE no action;
  END IF;
END $$;
--> statement-breakpoint
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'outreach_prospects_campaign_id_outreach_campaigns_id_fk') THEN
    ALTER TABLE "outreach_prospects" ADD CONSTRAINT "outreach_prospects_campaign_id_outreach_campaigns_id_fk" FOREIGN KEY ("campaign_id") REFERENCES "public"."outreach_campaigns"("id") ON DELETE set null ON UPDATE no action;
  END IF;
END $$;
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "outreach_research_schedule_runs_date_unique" ON "outreach_research_schedule_runs" USING btree ("run_date");
