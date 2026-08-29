---
name: Exact-time outreach scheduling
description: Reliability requirement for outreach that must run at an exact Phoenix time.
---

Do not treat an in-process interval inside an autoscaling web service as a guaranteed exact-time scheduler. Use a durable scheduled trigger plus transactional queue claims or leases, with a preflight count before dispatch.

**Why:** Autoscaling services may be idle, restarted, or running multiple instances at the target time. An interval can therefore run late, not run, or run concurrently, even when message-level deduplication reduces duplicate delivery risk.

**How to apply:** For any commitment to dispatch a fixed batch at 8:00 AM America/Phoenix, prepare and verify the queue beforehand, require the full eligible count, trigger dispatch through a durable scheduler, and monitor the claimed, accepted, delivered, and stopped counts.

Manual approvals and automatic preparation must allocate from the same date-keyed slot ledger, under the same transaction lock. The daily send quota must be global across campaigns and must count same-day legacy sends that predate the current reservation key.

**Why:** A preparation-only lock still allows concurrent manual approvals to overfill the next window, and a campaign-scoped quota can exceed the promised account-wide daily ceiling. Mid-day quota-key changes can also reopen capacity unless already-sent messages are counted.

**How to apply:** Route every initial-message approval through the shared window allocator, enforce one global Phoenix-day ceiling at dispatch, and keep campaign limits as an additional constraint rather than the global limit itself.