CREATE TABLE IF NOT EXISTS "assistant_api_tokens" (
  "id" text PRIMARY KEY NOT NULL,
  "name" text NOT NULL,
  "token_hash" text NOT NULL,
  "scopes" text DEFAULT 'seo' NOT NULL,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "last_used_at" timestamp with time zone,
  "expires_at" timestamp with time zone,
  "revoked_at" timestamp with time zone,
  "created_by_clerk_user_id" text,
  "revoked_by_clerk_user_id" text
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "assistant_api_tokens_hash_unique" ON "assistant_api_tokens" ("token_hash");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "assistant_api_tokens_active_idx" ON "assistant_api_tokens" ("revoked_at", "expires_at");

