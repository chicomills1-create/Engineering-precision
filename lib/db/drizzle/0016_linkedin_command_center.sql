CREATE TABLE IF NOT EXISTS "linkedin_companies" (
	"id" serial PRIMARY KEY NOT NULL, "name" text NOT NULL, "normalized_name" text NOT NULL,
	"website" text, "domain" text, "linkedin_url" text, "geography" text, "discipline_fit" text,
	"evidence" text, "source_url" text, "confidence" integer DEFAULT 0 NOT NULL,
	"status" text DEFAULT 'active' NOT NULL, "created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "linkedin_people" (
	"id" serial PRIMARY KEY NOT NULL, "company_id" integer, "name" text NOT NULL, "normalized_name" text NOT NULL,
	"role" text, "linkedin_url" text, "geography" text, "discipline_fit" text, "evidence" text, "source_url" text,
	"confidence" integer DEFAULT 0 NOT NULL, "status" text DEFAULT 'active' NOT NULL,
	"retention_until" timestamp with time zone, "legal_basis_note" text, "consent_note" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL, "updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "linkedin_signals" (
	"id" serial PRIMARY KEY NOT NULL, "person_id" integer, "company_id" integer, "kind" text NOT NULL,
	"title" text NOT NULL, "source_url" text NOT NULL, "evidence" text NOT NULL,
	"observed_at" timestamp with time zone NOT NULL, "confidence" integer DEFAULT 0 NOT NULL,
	"status" text DEFAULT 'active' NOT NULL, "created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "linkedin_campaigns" (
	"id" serial PRIMARY KEY NOT NULL, "name" text NOT NULL, "objective" text NOT NULL,
	"status" text DEFAULT 'draft' NOT NULL, "owner" text, "daily_action_limit" integer DEFAULT 25 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL, "updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "linkedin_content_items" (
	"id" serial PRIMARY KEY NOT NULL, "campaign_id" integer, "title" text NOT NULL, "pillar" text NOT NULL, "source_url" text,
	"evidence" text, "draft_copy" text, "approved_copy" text, "scheduled_for" timestamp with time zone,
	"owner" text, "status" text DEFAULT 'draft' NOT NULL, "published_url" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL, "updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "linkedin_actions" (
	"id" serial PRIMARY KEY NOT NULL, "person_id" integer, "company_id" integer, "signal_id" integer,
	"campaign_id" integer, "content_item_id" integer, "action_type" text NOT NULL, "draft_copy" text,
	"approved_copy" text, "direct_action_url" text, "owner" text, "due_at" timestamp with time zone,
	"status" text DEFAULT 'draft' NOT NULL, "legal_basis_note" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL, "updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"completed_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "linkedin_approval_events" (
	"id" serial PRIMARY KEY NOT NULL, "action_id" integer NOT NULL, "actor" text, "previous_status" text NOT NULL,
	"new_status" text NOT NULL, "approved_copy_snapshot" text, "note" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "linkedin_suppressions" (
	"id" serial PRIMARY KEY NOT NULL, "person_id" integer, "company_id" integer, "normalized_target" text NOT NULL,
	"reason" text NOT NULL, "created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "linkedin_outcomes" (
	"id" serial PRIMARY KEY NOT NULL, "action_id" integer, "campaign_id" integer, "person_id" integer,
	"company_id" integer, "content_item_id" integer, "outcome_type" text NOT NULL, "value" integer,
	"count" integer DEFAULT 1 NOT NULL, "notes" text, "source_url" text,
	"occurred_at" timestamp with time zone NOT NULL, "created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'linkedin_people_company_id_linkedin_companies_id_fk') THEN
    ALTER TABLE "linkedin_people" ADD CONSTRAINT "linkedin_people_company_id_linkedin_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."linkedin_companies"("id") ON DELETE set null ON UPDATE no action;
  END IF;
END $$;
--> statement-breakpoint
--> statement-breakpoint
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'linkedin_signals_person_id_linkedin_people_id_fk') THEN
    ALTER TABLE "linkedin_signals" ADD CONSTRAINT "linkedin_signals_person_id_linkedin_people_id_fk" FOREIGN KEY ("person_id") REFERENCES "public"."linkedin_people"("id") ON DELETE set null ON UPDATE no action;
  END IF;
END $$;
--> statement-breakpoint
--> statement-breakpoint
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'linkedin_signals_company_id_linkedin_companies_id_fk') THEN
    ALTER TABLE "linkedin_signals" ADD CONSTRAINT "linkedin_signals_company_id_linkedin_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."linkedin_companies"("id") ON DELETE set null ON UPDATE no action;
  END IF;
END $$;
--> statement-breakpoint
--> statement-breakpoint
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'linkedin_content_items_campaign_id_linkedin_campaigns_id_fk') THEN
    ALTER TABLE "linkedin_content_items" ADD CONSTRAINT "linkedin_content_items_campaign_id_linkedin_campaigns_id_fk" FOREIGN KEY ("campaign_id") REFERENCES "public"."linkedin_campaigns"("id") ON DELETE set null ON UPDATE no action;
  END IF;
END $$;
--> statement-breakpoint
--> statement-breakpoint
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'linkedin_actions_person_id_linkedin_people_id_fk') THEN
    ALTER TABLE "linkedin_actions" ADD CONSTRAINT "linkedin_actions_person_id_linkedin_people_id_fk" FOREIGN KEY ("person_id") REFERENCES "public"."linkedin_people"("id") ON DELETE set null ON UPDATE no action;
  END IF;
END $$;
--> statement-breakpoint
--> statement-breakpoint
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'linkedin_actions_company_id_linkedin_companies_id_fk') THEN
    ALTER TABLE "linkedin_actions" ADD CONSTRAINT "linkedin_actions_company_id_linkedin_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."linkedin_companies"("id") ON DELETE set null ON UPDATE no action;
  END IF;
END $$;
--> statement-breakpoint
--> statement-breakpoint
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'linkedin_actions_signal_id_linkedin_signals_id_fk') THEN
    ALTER TABLE "linkedin_actions" ADD CONSTRAINT "linkedin_actions_signal_id_linkedin_signals_id_fk" FOREIGN KEY ("signal_id") REFERENCES "public"."linkedin_signals"("id") ON DELETE set null ON UPDATE no action;
  END IF;
END $$;
--> statement-breakpoint
--> statement-breakpoint
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'linkedin_actions_campaign_id_linkedin_campaigns_id_fk') THEN
    ALTER TABLE "linkedin_actions" ADD CONSTRAINT "linkedin_actions_campaign_id_linkedin_campaigns_id_fk" FOREIGN KEY ("campaign_id") REFERENCES "public"."linkedin_campaigns"("id") ON DELETE set null ON UPDATE no action;
  END IF;
END $$;
--> statement-breakpoint
--> statement-breakpoint
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'linkedin_actions_content_item_id_linkedin_content_items_id_fk') THEN
    ALTER TABLE "linkedin_actions" ADD CONSTRAINT "linkedin_actions_content_item_id_linkedin_content_items_id_fk" FOREIGN KEY ("content_item_id") REFERENCES "public"."linkedin_content_items"("id") ON DELETE set null ON UPDATE no action;
  END IF;
END $$;
--> statement-breakpoint
--> statement-breakpoint
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'linkedin_approval_events_action_id_linkedin_actions_id_fk') THEN
    ALTER TABLE "linkedin_approval_events" ADD CONSTRAINT "linkedin_approval_events_action_id_linkedin_actions_id_fk" FOREIGN KEY ("action_id") REFERENCES "public"."linkedin_actions"("id") ON DELETE cascade ON UPDATE no action;
  END IF;
END $$;
--> statement-breakpoint
--> statement-breakpoint
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'linkedin_suppressions_person_id_linkedin_people_id_fk') THEN
    ALTER TABLE "linkedin_suppressions" ADD CONSTRAINT "linkedin_suppressions_person_id_linkedin_people_id_fk" FOREIGN KEY ("person_id") REFERENCES "public"."linkedin_people"("id") ON DELETE set null ON UPDATE no action;
  END IF;
END $$;
--> statement-breakpoint
--> statement-breakpoint
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'linkedin_suppressions_company_id_linkedin_companies_id_fk') THEN
    ALTER TABLE "linkedin_suppressions" ADD CONSTRAINT "linkedin_suppressions_company_id_linkedin_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."linkedin_companies"("id") ON DELETE set null ON UPDATE no action;
  END IF;
END $$;
--> statement-breakpoint
--> statement-breakpoint
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'linkedin_outcomes_action_id_linkedin_actions_id_fk') THEN
    ALTER TABLE "linkedin_outcomes" ADD CONSTRAINT "linkedin_outcomes_action_id_linkedin_actions_id_fk" FOREIGN KEY ("action_id") REFERENCES "public"."linkedin_actions"("id") ON DELETE set null ON UPDATE no action;
  END IF;
END $$;
--> statement-breakpoint
--> statement-breakpoint
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'linkedin_outcomes_campaign_id_linkedin_campaigns_id_fk') THEN
    ALTER TABLE "linkedin_outcomes" ADD CONSTRAINT "linkedin_outcomes_campaign_id_linkedin_campaigns_id_fk" FOREIGN KEY ("campaign_id") REFERENCES "public"."linkedin_campaigns"("id") ON DELETE set null ON UPDATE no action;
  END IF;
END $$;
--> statement-breakpoint
--> statement-breakpoint
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'linkedin_outcomes_person_id_linkedin_people_id_fk') THEN
    ALTER TABLE "linkedin_outcomes" ADD CONSTRAINT "linkedin_outcomes_person_id_linkedin_people_id_fk" FOREIGN KEY ("person_id") REFERENCES "public"."linkedin_people"("id") ON DELETE set null ON UPDATE no action;
  END IF;
END $$;
--> statement-breakpoint
--> statement-breakpoint
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'linkedin_outcomes_company_id_linkedin_companies_id_fk') THEN
    ALTER TABLE "linkedin_outcomes" ADD CONSTRAINT "linkedin_outcomes_company_id_linkedin_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."linkedin_companies"("id") ON DELETE set null ON UPDATE no action;
  END IF;
END $$;
--> statement-breakpoint
--> statement-breakpoint
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'linkedin_outcomes_content_item_id_linkedin_content_items_id_fk') THEN
    ALTER TABLE "linkedin_outcomes" ADD CONSTRAINT "linkedin_outcomes_content_item_id_linkedin_content_items_id_fk" FOREIGN KEY ("content_item_id") REFERENCES "public"."linkedin_content_items"("id") ON DELETE set null ON UPDATE no action;
  END IF;
END $$;
--> statement-breakpoint
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "linkedin_companies_normalized_name_unique" ON "linkedin_companies" USING btree ("normalized_name");
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "linkedin_companies_domain_unique" ON "linkedin_companies" USING btree ("domain");
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "linkedin_companies_url_unique" ON "linkedin_companies" USING btree ("linkedin_url");
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "linkedin_people_url_unique" ON "linkedin_people" USING btree ("linkedin_url");
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "linkedin_people_company_name_unique" ON "linkedin_people" USING btree ("company_id","normalized_name");
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "linkedin_signals_source_unique" ON "linkedin_signals" USING btree ("source_url");
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "linkedin_suppressions_target_unique" ON "linkedin_suppressions" USING btree ("normalized_target");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "linkedin_actions_queue_idx" ON "linkedin_actions" USING btree ("status","due_at");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "linkedin_actions_completed_idx" ON "linkedin_actions" USING btree ("completed_at");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "linkedin_actions_person_idx" ON "linkedin_actions" USING btree ("person_id","status");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "linkedin_actions_campaign_idx" ON "linkedin_actions" USING btree ("campaign_id","status");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "linkedin_people_retention_idx" ON "linkedin_people" USING btree ("retention_until");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "linkedin_people_status_idx" ON "linkedin_people" USING btree ("status");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "linkedin_signals_queue_idx" ON "linkedin_signals" USING btree ("status","observed_at");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "linkedin_signals_person_idx" ON "linkedin_signals" USING btree ("person_id");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "linkedin_signals_company_idx" ON "linkedin_signals" USING btree ("company_id");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "linkedin_campaigns_status_idx" ON "linkedin_campaigns" USING btree ("status");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "linkedin_content_queue_idx" ON "linkedin_content_items" USING btree ("status","scheduled_for");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "linkedin_approval_events_action_idx" ON "linkedin_approval_events" USING btree ("action_id","created_at");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "linkedin_outcomes_attribution_idx" ON "linkedin_outcomes" USING btree ("campaign_id","outcome_type","occurred_at");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "linkedin_outcomes_action_idx" ON "linkedin_outcomes" USING btree ("action_id","occurred_at");
