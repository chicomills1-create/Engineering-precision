WITH ranked_follow_ups AS (
  SELECT
    id,
    first_value(id) OVER (
      PARTITION BY prospect_id, coalesce(campaign_id, 0), sequence_number
      ORDER BY
        CASE status
          WHEN 'delivered' THEN 0
          WHEN 'sent' THEN 1
          WHEN 'sending' THEN 2
          WHEN 'approved' THEN 3
          WHEN 'draft' THEN 4
          ELSE 5
        END,
        (provider_message_id IS NOT NULL) DESC,
        sent_at DESC NULLS LAST,
        created_at,
        id
    ) AS keeper_id,
    row_number() OVER (
      PARTITION BY prospect_id, coalesce(campaign_id, 0), sequence_number
      ORDER BY
        CASE status
          WHEN 'delivered' THEN 0
          WHEN 'sent' THEN 1
          WHEN 'sending' THEN 2
          WHEN 'approved' THEN 3
          WHEN 'draft' THEN 4
          ELSE 5
        END,
        (provider_message_id IS NOT NULL) DESC,
        sent_at DESC NULLS LAST,
        created_at,
        id
    ) AS duplicate_rank
  FROM outreach_messages
  WHERE sequence_number > 1
)
UPDATE outreach_messages AS duplicate
SET
  sequence_number = -duplicate.id,
  status = CASE
    WHEN duplicate.status IN ('delivered', 'sent', 'bounced', 'replied', 'unsubscribed')
      THEN duplicate.status
    ELSE 'needs_review'
  END,
  error = concat_ws(
    '; ',
    nullif(duplicate.error, ''),
    'Quarantined duplicate follow-up; canonical message is ' || ranked.keeper_id
  )
FROM ranked_follow_ups AS ranked
WHERE duplicate.id = ranked.id
  AND ranked.duplicate_rank > 1;
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "outreach_messages_follow_up_sequence_unique" ON "outreach_messages" USING btree ("prospect_id",coalesce("campaign_id", 0),"sequence_number") WHERE "outreach_messages"."sequence_number" > 1;
