# Daily outreach scheduled deployment

The production configuration keeps the existing autoscale API deployment for
the website and SendGrid webhooks and uses a separate published
**Scheduled Deployment** from this same project:

- **Run command:** `pnpm --filter @workspace/api-server run outreach:daily`
- **UTC cron:** `0,30 15 * * *` (08:00 primary and 08:30 recovery in
  America/Phoenix, which does not observe daylight saving time)

The command is a one-shot runner: it does not start Express. It refuses to run
unless production outreach and research safeguards are enabled, performs
verified hot-market research before sends, and relies on the existing database
claims and send protections for safe overlap with the autoscale API process.

The durable `outreach_daily_runs` row is the daily execution and incident
record. A completed day is skipped by the recovery invocation. Failed or
partial days are reclaimed by the recovery invocation, while ambiguous
provider handoffs stay in `needs_review` and are only handled by reconciliation;
they are never blindly resent. A PostgreSQL session advisory lock is held for
the entire job. The recovery cannot overlap a slow live primary, and a crashed
primary releases the lock when its database session closes. Logs and the durable row report claimed,
provider-accepted, delivered, bounced, stopped, and unresolved totals.
When the recovery invocation creates the day's row, it records
`missed_primary` even if recovery completes successfully, leaving one durable
admin incident rather than hiding the missed primary run.