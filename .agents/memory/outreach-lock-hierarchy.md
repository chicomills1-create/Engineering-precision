---
name: Outreach advisory-lock hierarchy
description: Prevent database pool starvation and recursive deadlocks in outreach dispatch, replies, and follow-up creation.
---

Session-level recipient advisory locks must use a dedicated connection pool, separate from the general query pool used by the protected operation.

**Why:** Holding recipient-lock connections from the general pool while the protected callbacks also needed general query connections caused production pool starvation and five-minute webhook timeouts.

**How to apply:** Any outreach path that holds a session advisory lock must obtain it from the dedicated lock pool; ordinary reads, writes, and transactions continue through the general database pool.

A protected operation must never reacquire the same recipient lock through another connection. When follow-up creation runs while dispatch already owns the recipient lock, skip only the redundant email-level transaction lock and retain the separate follow-up-scope lock.

**Why:** Initial-message dispatch reached SendGrid, then deadlocked while follow-up creation tried to acquire the already-held recipient key through another connection. Each batch therefore stopped after one accepted email.

**How to apply:** Pass explicit lock-ownership context into nested outreach operations. Preserve suppression, duplicate, quota, and follow-up-scope locks; bypass only a recipient lock already held by the caller.