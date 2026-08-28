CREATE TABLE IF NOT EXISTS "leads" (
  "id" serial PRIMARY KEY NOT NULL,
  "name" text NOT NULL,
  "email" text,
  "company" text,
  "phone" text,
  "project_type" text,
  "services" text,
  "message" text NOT NULL,
  "status" text DEFAULT 'new' NOT NULL,
  "attachments" text[],
  "created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "subscribers" (
  "id" serial PRIMARY KEY NOT NULL,
  "email" text NOT NULL,
  "created_at" timestamp DEFAULT now() NOT NULL,
  "unsubscribed_at" timestamp
);