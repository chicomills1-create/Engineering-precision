CREATE TABLE "client_job_uploads" (
	"id" serial PRIMARY KEY NOT NULL,
	"object_path" text NOT NULL,
	"original_name" text NOT NULL,
	"claim_token_hash" text NOT NULL,
	"uploader_clerk_user_id" text,
	"claimed_job_id" integer,
	"claimed_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "client_job_uploads" ADD CONSTRAINT "client_job_uploads_claimed_job_id_client_jobs_id_fk" FOREIGN KEY ("claimed_job_id") REFERENCES "public"."client_jobs"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "client_job_uploads_object_path_unique" ON "client_job_uploads" USING btree ("object_path");