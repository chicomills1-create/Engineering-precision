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

The approved operating cycle is autonomous: target 100 Direct regular, 50 Public regular, and 50 verified hot-market initial messages without another approval. Verified hot-market contacts beyond 50 may also send. Hot Lead follow-ups are additional to the 200-message initial-outreach baseline and do not consume the regular campaign's monthly ramp.

**Why:** The user chose a 100 Direct + 50 Public + 50 hot-market baseline so daily initial outreach reaches 200 when every verified lane is filled, while strong engaged Hot Leads receive follow-ups without reducing new-prospect capacity.

**How to apply:** Treat approval as standing authorization for the reviewed process. Enforce 100 Direct, 50 Public, and 50 verified hot-market initial messages per day; allow verified hot-market extras and leave unfilled slots empty. Apply this Phoenix-month ramp to regular campaign emails: September 2026 6,000; October 10,000; November 20,000; December 35,000; January 2027 onward 50,000 maximum. Hot Lead follow-ups are outside the ramp and may raise the monthly total. Keep ambiguous provider outcomes blocked until SendGrid reconciliation proves whether each message was accepted, delivered, or safe to retry.

An automated drip must create every approved sequence row before the initial delivery event; delivery handling can only schedule follow-ups that already exist. Reconcile missing rows idempotently on startup and derive their dates from verified delivery evidence.

**Why:** Initial-only campaign rows looked enrolled but produced no follow-ups, because the event handler had nothing to schedule. Existing delivered contacts also needed a safe backfill without duplicates or immediate sends.

**How to apply:** Create unscheduled sequences 2–4 transactionally with sequence 1, schedule them only after verified delivery, and make startup reconciliation safe to rerun with zero duplicate rows.