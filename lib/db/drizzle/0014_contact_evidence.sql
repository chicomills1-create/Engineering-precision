ALTER TABLE "outreach_prospects" ADD COLUMN "contact_status" text DEFAULT 'active' NOT NULL;--> statement-breakpoint
ALTER TABLE "outreach_prospects" ADD COLUMN "contact_evidence_type" text;--> statement-breakpoint
ALTER TABLE "outreach_prospects" ADD COLUMN "contact_evidence" text;--> statement-breakpoint
ALTER TABLE "outreach_prospects" ADD COLUMN "contact_evidence_at" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "outreach_prospects" ADD COLUMN "contact_review_at" timestamp with time zone;