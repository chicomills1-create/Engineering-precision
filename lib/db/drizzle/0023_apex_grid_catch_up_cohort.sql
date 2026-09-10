CREATE TABLE IF NOT EXISTS "outreach_catch_up_cohorts" (
  "id" serial PRIMARY KEY NOT NULL,
  "name" text NOT NULL,
  "target_count" integer NOT NULL,
  "status" text DEFAULT 'active' NOT NULL,
  "activated_at" timestamp with time zone DEFAULT now() NOT NULL,
  "completed_at" timestamp with time zone,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL
);
CREATE UNIQUE INDEX IF NOT EXISTS "outreach_catch_up_cohorts_name_unique"
  ON "outreach_catch_up_cohorts" USING btree ("name");

CREATE TABLE IF NOT EXISTS "outreach_catch_up_enrollments" (
  "id" serial PRIMARY KEY NOT NULL,
  "cohort_id" integer NOT NULL REFERENCES "outreach_catch_up_cohorts"("id") ON DELETE CASCADE,
  "message_id" integer NOT NULL REFERENCES "outreach_messages"("id") ON DELETE CASCADE,
  "sequence_number" integer NOT NULL,
  "provider_accepted_at" timestamp with time zone NOT NULL,
  "provider_evidence_event_id" integer REFERENCES "outreach_delivery_events"("id") ON DELETE SET NULL,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL
);
CREATE UNIQUE INDEX IF NOT EXISTS "outreach_catch_up_enrollments_message_unique"
  ON "outreach_catch_up_enrollments" USING btree ("message_id");
CREATE UNIQUE INDEX IF NOT EXISTS "outreach_catch_up_enrollments_cohort_message_unique"
  ON "outreach_catch_up_enrollments" USING btree ("cohort_id", "message_id");

INSERT INTO "outreach_catch_up_cohorts" ("name", "target_count", "status")
VALUES ('Apex Grid fresh verified catch-up', 2207, 'active')
ON CONFLICT ("name") DO NOTHING;

ALTER TABLE "outreach_messages"
  ADD COLUMN IF NOT EXISTS "catch_up_cohort_id" integer
  REFERENCES "outreach_catch_up_cohorts"("id") ON DELETE SET NULL;

CREATE TABLE IF NOT EXISTS "outreach_catch_up_reservations" (
  "id" serial PRIMARY KEY NOT NULL,
  "cohort_id" integer NOT NULL REFERENCES "outreach_catch_up_cohorts"("id") ON DELETE CASCADE,
  "message_id" integer NOT NULL REFERENCES "outreach_messages"("id") ON DELETE CASCADE,
  "status" text DEFAULT 'reserved' NOT NULL,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "released_at" timestamp with time zone
);
CREATE UNIQUE INDEX IF NOT EXISTS "outreach_catch_up_reservations_message_unique"
  ON "outreach_catch_up_reservations" USING btree ("message_id");

CREATE TABLE IF NOT EXISTS "outreach_provider_handoffs" (
  "id" serial PRIMARY KEY NOT NULL,
  "message_id" integer NOT NULL REFERENCES "outreach_messages"("id") ON DELETE CASCADE,
  "reconciliation_key" text NOT NULL,
  "provider_message_id" text,
  "accepted_at" timestamp with time zone NOT NULL,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL
);
CREATE UNIQUE INDEX IF NOT EXISTS "outreach_provider_handoffs_message_unique"
  ON "outreach_provider_handoffs" USING btree ("message_id");
CREATE UNIQUE INDEX IF NOT EXISTS "outreach_provider_handoffs_reconciliation_unique"
  ON "outreach_provider_handoffs" USING btree ("reconciliation_key");