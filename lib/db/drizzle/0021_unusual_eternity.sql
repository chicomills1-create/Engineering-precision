CREATE TABLE "outreach_queue_alerts" (
	"id" serial PRIMARY KEY NOT NULL,
	"incident_key" text NOT NULL,
	"status" text DEFAULT 'claimed' NOT NULL,
	"overdue_count" integer NOT NULL,
	"scheduled_from" timestamp with time zone NOT NULL,
	"scheduled_through" timestamp with time zone NOT NULL,
	"provider_ambiguous_count" integer DEFAULT 0 NOT NULL,
	"delivery_failure_count" integer DEFAULT 0 NOT NULL,
	"error" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"sent_at" timestamp with time zone
);
--> statement-breakpoint
CREATE UNIQUE INDEX "outreach_queue_alerts_incident_key_unique" ON "outreach_queue_alerts" USING btree ("incident_key");