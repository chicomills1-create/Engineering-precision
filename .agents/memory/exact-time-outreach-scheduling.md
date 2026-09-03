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

The approved operating cycle is autonomous: target 100 Personal regular, 50 Public regular, and 50 verified hot-market initial messages without another approval. Verified hot-market contacts beyond 50 may also send, subject to an absolute 6,000-message Phoenix-month ceiling. After dispatch or safe provider reconciliation, prepare the next regular batch and replenish the hot-market lane.

**Why:** The user chose a 100 Personal + 50 Public + 50 hot-market baseline so daily outreach reaches 200 when every verified lane is filled, while allowing unusually strong verified hot-market opportunities beyond 50. Requiring approval again delays the schedule; retrying an unresolved dispatch without reconciliation risks duplicate emails.

**How to apply:** Treat approval as standing authorization for the reviewed process. Enforce the 100/50 regular split, reserve 50 verified hot-market slots, allow verified extras, leave unfilled hot-market slots empty, and stop absolutely at 6,000 per Phoenix month. Keep ambiguous provider outcomes blocked until SendGrid reconciliation proves whether each message was accepted, delivered, or safe to retry.

An automated drip must create every approved sequence row before the initial delivery event; delivery handling can only schedule follow-ups that already exist. Reconcile missing rows idempotently on startup and derive their dates from verified delivery evidence.

**Why:** Initial-only campaign rows looked enrolled but produced no follow-ups, because the event handler had nothing to schedule. Existing delivered contacts also needed a safe backfill without duplicates or immediate sends.

**How to apply:** Create unscheduled sequences 2–4 transactionally with sequence 1, schedule them only after verified delivery, and make startup reconciliation safe to rerun with zero duplicate rows.