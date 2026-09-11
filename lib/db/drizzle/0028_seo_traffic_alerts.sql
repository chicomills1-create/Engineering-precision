ALTER TABLE "seo_performance_snapshots" ADD COLUMN "completeness" jsonb DEFAULT '{}'::jsonb NOT NULL;
--> statement-breakpoint
CREATE TABLE "seo_traffic_alerts" (
	"id" serial PRIMARY KEY NOT NULL,
	"period_start" date NOT NULL,
	"period_end" date NOT NULL,
	"previous_period_start" date NOT NULL,
	"previous_period_end" date NOT NULL,
	"page" text NOT NULL,
	"query" text NOT NULL,
	"severity" text NOT NULL,
	"reason" text NOT NULL,
	"message" text NOT NULL,
	"previous_clicks" integer DEFAULT 0 NOT NULL,
	"current_clicks" integer DEFAULT 0 NOT NULL,
	"previous_impressions" integer DEFAULT 0 NOT NULL,
	"current_impressions" integer DEFAULT 0 NOT NULL,
	"previous_position" text DEFAULT '0' NOT NULL,
	"current_position" text DEFAULT '0' NOT NULL,
	"previous_available" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX "seo_traffic_alert_period_page_query_unique" ON "seo_traffic_alerts" USING btree ("period_start","period_end","page","query","reason");
--> statement-breakpoint
CREATE INDEX "seo_traffic_alert_latest_idx" ON "seo_traffic_alerts" USING btree ("period_end","severity");