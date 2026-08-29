ALTER TABLE "growth_referral_partners" ADD COLUMN "referral_code" text;--> statement-breakpoint
UPDATE "growth_referral_partners"
SET "referral_code" = 'r_' || md5("id"::text || clock_timestamp()::text || random()::text)
WHERE "referral_code" IS NULL;--> statement-breakpoint
ALTER TABLE "growth_referral_partners" ALTER COLUMN "referral_code" SET NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX "growth_referral_partners_referral_code_unique" ON "growth_referral_partners" USING btree ("referral_code");