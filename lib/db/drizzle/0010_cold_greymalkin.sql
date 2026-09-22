CREATE TABLE IF NOT EXISTS "growth_public_opportunities" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"source_url" text NOT NULL,
	"project_location" text NOT NULL,
	"buyer_or_firm" text NOT NULL,
	"discipline_fit" text NOT NULL,
	"urgency" text DEFAULT 'normal' NOT NULL,
	"evidence_notes" text NOT NULL,
	"owner" text,
	"pipeline_status" text DEFAULT 'research' NOT NULL,
	"next_action" text,
	"next_action_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "growth_referral_partners" (
	"id" serial PRIMARY KEY NOT NULL,
	"company_name" text NOT NULL,
	"contact_name" text,
	"contact_email" text,
	"contact_phone" text,
	"website" text,
	"source" text NOT NULL,
	"relationship_status" text DEFAULT 'prospect' NOT NULL,
	"notes" text,
	"next_follow_up_at" timestamp with time zone,
	"referral_count" integer DEFAULT 0 NOT NULL,
	"converted_count" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "leads" ADD COLUMN IF NOT EXISTS "source" text;--> statement-breakpoint
ALTER TABLE "leads" ADD COLUMN IF NOT EXISTS "medium" text;--> statement-breakpoint
ALTER TABLE "leads" ADD COLUMN IF NOT EXISTS "campaign" text;--> statement-breakpoint
ALTER TABLE "leads" ADD COLUMN IF NOT EXISTS "landing_path" text;--> statement-breakpoint
ALTER TABLE "leads" ADD COLUMN IF NOT EXISTS "referrer" text;--> statement-breakpoint
ALTER TABLE "leads" ADD COLUMN IF NOT EXISTS "referral_partner_id" integer;--> statement-breakpoint
ALTER TABLE "outreach_messages" ADD COLUMN IF NOT EXISTS "source_type" text;--> statement-breakpoint
ALTER TABLE "outreach_messages" ADD COLUMN IF NOT EXISTS "source_id" integer;
