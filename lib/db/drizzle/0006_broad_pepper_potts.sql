ALTER TABLE "client_monthly_email_deliveries" ADD COLUMN IF NOT EXISTS "period_key" text;--> statement-breakpoint
UPDATE "client_monthly_email_deliveries"
SET "period_key" = to_char("created_at" AT TIME ZONE 'America/Phoenix', 'YYYY-MM')
WHERE "period_key" IS NULL;--> statement-breakpoint
WITH ranked AS (
  SELECT "id", row_number() OVER (
    PARTITION BY lower(btrim("recipient_email")), "period_key"
    ORDER BY "id"
  ) AS duplicate_number
  FROM "client_monthly_email_deliveries"
)
UPDATE "client_monthly_email_deliveries" AS delivery
SET "period_key" = delivery."period_key" || '-legacy-' || delivery."id"
FROM ranked
WHERE delivery."id" = ranked."id" AND ranked.duplicate_number > 1;--> statement-breakpoint
ALTER TABLE "client_monthly_email_deliveries" ALTER COLUMN "period_key" SET NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "client_monthly_delivery_email_period_unique" ON "client_monthly_email_deliveries" USING btree (lower(btrim("recipient_email")),"period_key");
