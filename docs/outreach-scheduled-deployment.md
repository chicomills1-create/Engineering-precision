# Daily outreach Reserved VM scheduler

The production API uses a **Reserved VM** so the website, SendGrid webhooks,
and outreach scheduler remain continuously available in one deployment.

The API process starts the durable one-shot runner at 08:00 and 08:30 Phoenix.
If the VM restarts during either same-morning execution window, it immediately
recovers the missed slot. The one-shot runner still holds the PostgreSQL
advisory lock and owns the durable daily claim.

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