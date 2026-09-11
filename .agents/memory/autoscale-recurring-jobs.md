---
name: Autoscale recurring jobs
description: Reliability rules for recurring work hosted inside an autoscale API service.
---

Do not treat an in-process timer or instance-local lock as a production scheduler on autoscale. Recurring work owned by an autoscale service needs a persistent time-slot claim, atomic cross-replica ownership, startup catch-up, bounded retries, and an overlap guard.

**Why:** Autoscale instances can be absent at the deadline, restart after it, or run concurrently. A timer alone can miss a full period, and a local lock cannot prevent duplicate external requests or notifications across replicas.

**How to apply:** Prefer a platform Scheduled Deployment or Routine when it can be provisioned. Otherwise poll opportunistically from the service, derive a deterministic schedule slot, claim it in shared storage before external work, and retry only stale or explicitly failed claims within a small fixed limit.