CREATE TABLE "outreach_monthly_send_reservations" (
	"id" serial PRIMARY KEY NOT NULL,
	"message_id" integer NOT NULL,
	"normalized_email" text NOT NULL,
	"sequence_number" integer NOT NULL,
	"quota_key" text NOT NULL,
	"slot" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "outreach_monthly_send_reservations" ADD CONSTRAINT "outreach_monthly_send_reservations_message_id_outreach_messages_id_fk" FOREIGN KEY ("message_id") REFERENCES "public"."outreach_messages"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "outreach_monthly_send_reservation_message_unique" ON "outreach_monthly_send_reservations" USING btree ("message_id");--> statement-breakpoint
CREATE UNIQUE INDEX "outreach_monthly_send_reservation_quota_slot_unique" ON "outreach_monthly_send_reservations" USING btree ("quota_key","slot");--> statement-breakpoint
CREATE UNIQUE INDEX "outreach_monthly_send_reservation_email_sequence_unique" ON "outreach_monthly_send_reservations" USING btree ("normalized_email","sequence_number");