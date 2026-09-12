---
name: Autoscale recurring jobs
description: Reliability rules for recurring work hosted inside an autoscale API service.
---

Do not treat an in-process timer or instance-local lock as a production scheduler on autoscale. Exact-time work needs Scheduled Deployment/Reserved VM compute plus a persistent time-slot claim, atomic ownership, startup catch-up, bounded retries, and an overlap guard.

**Why:** Autoscale instances can be absent at the deadline, restart after it, or run concurrently. A timer alone can miss a full period, and a local lock cannot prevent duplicate external requests or notifications across replicas.

**How to apply:** Prefer a Scheduled Deployment. Use a Reserved VM when one always-on process must also receive webhooks. Recovery that stages external work may fill only before the deadline and must never call dispatch; after the deadline it must refuse.