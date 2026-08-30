---
name: Outreach seed startup
description: Production startup rules for verified outreach backfills and the daily scheduler.
---

Verified outreach backfills must query and skip contacts already present before doing per-contact work, and the send scheduler must start independently of backfill completion.

**Why:** A production restart spent several minutes reprocessing the legacy library before reaching a replacement batch. During that delay the scheduler was not armed, so the preparation ledger temporarily showed a full shortfall even though the replacement contacts were available.

**How to apply:** Keep backfills idempotent and incremental, let shortfall preparation retry after new contacts land, and verify production with both startup logs and preparation-slot counts rather than relying on a development seed result.