ALTER TABLE "client_jobs" ADD COLUMN "status_notification_status" text;--> statement-breakpoint
ALTER TABLE "client_jobs" ADD COLUMN "status_notification_error" text;--> statement-breakpoint
ALTER TABLE "client_jobs" ADD COLUMN "status_notification_sent_at" timestamp with time zone;