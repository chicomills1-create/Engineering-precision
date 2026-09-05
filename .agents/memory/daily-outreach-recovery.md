---
name: Daily outreach recovery
description: Durable scheduling and retry rules for the production daily outreach job.
---

Run the one-shot outreach job at 08:00 America/Phoenix with an 08:30 recovery
invocation. Use one durable row per Phoenix date as both the execution claim and
incident record. A recovery may reclaim only failed, partial, or sufficiently
abandoned work after acquiring the run-wide database advisory lock;
provider-ambiguous sends remain reconciliation-only.

**Why:** The website is autoscaled and cannot guarantee in-process timers.
Blindly retrying an uncertain provider handoff can duplicate outreach, while
reclaiming the primary during its intentional staging wait can overlap sends.
A session advisory lock releases automatically when a crashed runner loses its
database connection, unlike a timestamp lease.

**How to apply:** Keep the website/API deployment separate and available for
webhooks. Any scheduler or runner change must preserve the run-wide advisory
lock, daily database claim, and no-blind-retry rule.