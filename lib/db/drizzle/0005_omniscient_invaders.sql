CREATE TABLE "client_monthly_email_deliveries" (
	"id" serial PRIMARY KEY NOT NULL,
	"client_job_id" integer,
	"recipient_name" text NOT NULL,
	"recipient_email" text NOT NULL,
	"subject" text NOT NULL,
	"body" text NOT NULL,
	"status" text DEFAULT 'sent' NOT NULL,
	"provider_message_id" text,
	"error" text,
	"sent_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "client_jobs" ADD COLUMN "archived_at" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "client_jobs" ADD COLUMN "monthly_email_opt_in" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "client_jobs" ADD COLUMN "monthly_email_opted_at" timestamp with time zone;