ALTER TABLE "outreach_replies"
  ADD COLUMN IF NOT EXISTS "sentiment" text NOT NULL DEFAULT 'neutral';