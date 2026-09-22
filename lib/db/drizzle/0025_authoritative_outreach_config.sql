CREATE TABLE IF NOT EXISTS "outreach_system_configs" (
  "id" serial PRIMARY KEY NOT NULL,
  "version" integer NOT NULL,
  "status" text DEFAULT 'active' NOT NULL,
  "policy" jsonb NOT NULL,
  "effective_from" timestamptz DEFAULT now() NOT NULL,
  "created_at" timestamptz DEFAULT now() NOT NULL
);
CREATE UNIQUE INDEX IF NOT EXISTS "outreach_system_configs_version_unique"
  ON "outreach_system_configs" ("version");
ALTER TABLE "outreach_prospects" ADD COLUMN IF NOT EXISTS "lead_score" integer DEFAULT 0 NOT NULL;
ALTER TABLE "outreach_prospects" ADD COLUMN IF NOT EXISTS "lead_status" text DEFAULT 'cold' NOT NULL;
INSERT INTO "outreach_system_configs" ("version", "policy")
VALUES (1, '{
  "monthlySchedules": [
    {"month":"2026-09","monthlyTarget":12000,"dailyTarget":400,"laneAllocations":{"named":100,"public":100,"hotMarket":100,"hotLead":100}},
    {"month":"2026-10","monthlyTarget":20000},
    {"month":"2026-11","monthlyTarget":35000},
    {"month":"2026-12","monthlyTarget":50000},
    {"month":"2027-01","monthlyTarget":50000}
  ],
  "forwardMonthlyCap":50000,
  "scoring": {
    "positiveReply":100,"reply":90,"multipleClicks":70,"click":55,
    "repeatedEngagement":50,"multipleOpens":25,"singleOpen":10,
    "negativeReply":-30
  },
  "verification": {
    "requireEvidence":true,
    "allowedMethods":["official_website","official_document","credible_directory","verification_provider"]
  },
  "suppression": {
    "reasons":["unsubscribe","do_not_contact","spam_complaint","hard_bounce","invalid","permanent"],
    "precedence":"absolute"
  },
  "sendingSafeguards": {
    "timezone":"America/Phoenix",
    "requireQualifiedInventory":true,
    "requireDeliverabilityReady":true,
    "maxMonthly":50000
  },
  "lifecycleStatuses":["cold","contacted","engaged","hot","replied","qualified","opportunity","proposal_requested","proposal_sent","client","not_interested","suppressed"]
}'::jsonb)
ON CONFLICT ("version") DO NOTHING;
