CREATE TABLE "job_payroll_entries" (
	"id" serial PRIMARY KEY NOT NULL,
	"plan_id" integer NOT NULL,
	"role" text NOT NULL,
	"payee_name" text NOT NULL,
	"payee_email" text,
	"compensation_type" text NOT NULL,
	"agreed_total" numeric(12, 2),
	"percentage" numeric(5, 2),
	"notes" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "job_payroll_installments" (
	"id" serial PRIMARY KEY NOT NULL,
	"entry_id" integer NOT NULL,
	"installment_number" integer NOT NULL,
	"label" text NOT NULL,
	"percentage" numeric(5, 2) NOT NULL,
	"due_at" timestamp with time zone,
	"status" text DEFAULT 'planned' NOT NULL,
	"paid_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "job_payroll_plans" (
	"id" serial PRIMARY KEY NOT NULL,
	"job_id" integer NOT NULL,
	"contract_revenue" numeric(12, 2) NOT NULL,
	"status" text DEFAULT 'draft' NOT NULL,
	"notes" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "job_payroll_entries" ADD CONSTRAINT "job_payroll_entries_plan_id_job_payroll_plans_id_fk" FOREIGN KEY ("plan_id") REFERENCES "public"."job_payroll_plans"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "job_payroll_installments" ADD CONSTRAINT "job_payroll_installments_entry_id_job_payroll_entries_id_fk" FOREIGN KEY ("entry_id") REFERENCES "public"."job_payroll_entries"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "job_payroll_plans" ADD CONSTRAINT "job_payroll_plans_job_id_client_jobs_id_fk" FOREIGN KEY ("job_id") REFERENCES "public"."client_jobs"("id") ON DELETE cascade ON UPDATE no action;