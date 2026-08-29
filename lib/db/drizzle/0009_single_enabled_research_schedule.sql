WITH ranked_schedules AS (
	SELECT
		"id",
		row_number() OVER (ORDER BY "updated_at" DESC, "id" DESC) AS enabled_rank
	FROM "outreach_research_schedules"
	WHERE "enabled" = true
)
UPDATE "outreach_research_schedules"
SET "enabled" = false,
	"updated_at" = now()
FROM ranked_schedules
WHERE "outreach_research_schedules"."id" = ranked_schedules."id"
	AND ranked_schedules.enabled_rank > 1;--> statement-breakpoint
CREATE UNIQUE INDEX "outreach_research_schedules_enabled_singleton" ON "outreach_research_schedules" USING btree (((1))) WHERE "outreach_research_schedules"."enabled" = true;