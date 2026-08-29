---
name: Outreach stop serialization
description: Database coordination required anywhere outreach eligibility can race with contact evidence or suppression.
---

Treat contact evidence, recipient suppression, message dispatch, and batch seeding as one concurrency domain. Serialize recipient-wide suppression/seeding with an email-scoped transaction lock, and serialize evidence/dispatch with a prospect row lock. Re-check eligibility while holding the relevant lock immediately before creating or sending a message.

**Why:** Independent “check, then write” flows can each be correct in isolation yet interleave so evidence stops existing messages just before another flow creates a new approved one, or a sender dispatches using stale contact state.

**How to apply:** Any new suppression source or outreach enqueue/send path must use the shared locking primitive and preserve non-active contact states. Recipient identity changes must reset verification and manual review rather than inherit prior approval.