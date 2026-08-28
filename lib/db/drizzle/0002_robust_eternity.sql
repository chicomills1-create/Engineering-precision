CREATE TABLE "client_companies" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "client_job_documents" (
	"id" serial PRIMARY KEY NOT NULL,
	"job_id" integer NOT NULL,
	"name" text NOT NULL,
	"object_path" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "client_jobs" (
	"id" serial PRIMARY KEY NOT NULL,
	"company_id" integer,
	"membership_id" integer,
	"submitter_name" text NOT NULL,
	"submitter_email" text NOT NULL,
	"submitter_phone" text,
	"company_name" text,
	"project_type" text NOT NULL,
	"project_location" text NOT NULL,
	"scope" text NOT NULL,
	"timeline" text,
	"budget_context" text,
	"services" text NOT NULL,
	"status" text DEFAULT 'submitted' NOT NULL,
	"internal_notes" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "client_memberships" (
	"id" serial PRIMARY KEY NOT NULL,
	"company_id" integer NOT NULL,
	"clerk_user_id" text NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "client_job_documents" ADD CONSTRAINT "client_job_documents_job_id_client_jobs_id_fk" FOREIGN KEY ("job_id") REFERENCES "public"."client_jobs"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "client_jobs" ADD CONSTRAINT "client_jobs_company_id_client_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."client_companies"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "client_jobs" ADD CONSTRAINT "client_jobs_membership_id_client_memberships_id_fk" FOREIGN KEY ("membership_id") REFERENCES "public"."client_memberships"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "client_memberships" ADD CONSTRAINT "client_memberships_company_id_client_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."client_companies"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "client_memberships_clerk_user_unique" ON "client_memberships" USING btree ("clerk_user_id");