CREATE TABLE IF NOT EXISTS "assistant_access_requests" (
  "id" text PRIMARY KEY NOT NULL,
  "request_token_hash" text NOT NULL,
  "status" text DEFAULT 'pending' NOT NULL,
  "expires_at" timestamp with time zone NOT NULL,
  "decided_at" timestamp with time zone,
  "decided_by_clerk_user_id" text,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "assistant_access_requests_token_unique" ON "assistant_access_requests" ("request_token_hash");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "assistant_access_requests_status_expiry_idx" ON "assistant_access_requests" ("status", "expires_at");
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "assistant_sessions" (
  "id" text PRIMARY KEY NOT NULL,
  "session_token_hash" text NOT NULL,
  "request_id" text NOT NULL REFERENCES "assistant_access_requests"("id") ON DELETE cascade,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "last_seen_at" timestamp with time zone DEFAULT now() NOT NULL,
  "expires_at" timestamp with time zone NOT NULL,
  "revoked_at" timestamp with time zone,
  "revoked_by_clerk_user_id" text
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "assistant_sessions_token_unique" ON "assistant_sessions" ("session_token_hash");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "assistant_sessions_active_idx" ON "assistant_sessions" ("revoked_at", "expires_at");
