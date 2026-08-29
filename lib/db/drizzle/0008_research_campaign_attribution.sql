DROP INDEX "outreach_research_schedule_runs_schedule_date_unique";--> statement-breakpoint
ALTER TABLE "outreach_research_runs" ADD COLUMN "campaign_id" integer;--> statement-breakpoint
ALTER TABLE "outreach_prospects" ADD COLUMN "campaign_id" integer;--> statement-breakpoint
ALTER TABLE "outreach_research_runs" ADD CONSTRAINT "outreach_research_runs_campaign_id_outreach_campaigns_id_fk" FOREIGN KEY ("campaign_id") REFERENCES "public"."outreach_campaigns"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "outreach_prospects" ADD CONSTRAINT "outreach_prospects_campaign_id_outreach_campaigns_id_fk" FOREIGN KEY ("campaign_id") REFERENCES "public"."outreach_campaigns"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "outreach_research_schedule_runs_date_unique" ON "outreach_research_schedule_runs" USING btree ("run_date");