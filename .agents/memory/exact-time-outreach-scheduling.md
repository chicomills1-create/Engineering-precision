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

The approved operating cycle is autonomous: the 20:00 America/Phoenix run targets one 500-contact verified pool plus 100 hot leads. Named/shared, public, and hot-market contacts all draw from the same verified pool; there is no separate hot-market lane or cap. Eligible sequence-2 follow-ups are additional to the 600 initial-message target.

**Why:** The owner corrected the prior lane model: “500 verified” means every verified source in one pool, not 500 named plus separate public or hot-market capacity. Hot leads are capped at 100.

**How to apply:** Enforce a shared 500-message sequence-1 quota across named, public, and hot-market sources, plus a separate 100-message hot-lead quota. Keep source labels only for evidence and reporting, never as extra capacity. A one-time override must be campaign/date scoped, audited, provider-health and capacity checked, and must not alter the standing policy. Keep ambiguous provider outcomes blocked until SendGrid reconciliation proves whether each message was accepted, delivered, or safe to retry.

The authoritative monthly schedule is October 2026: 20,000 total; November: 35,000 total; December: 50,000 total; January 2027 onward: 50,000 total per month.

**Why:** These are monthly targets, not daily limits, and prior versions contained lower or ambiguously labeled values.

**How to apply:** Calculate post-September daily pacing from remaining monthly volume and remaining Phoenix sending days, subject to qualified inventory, provider health, deliverability safeguards, and the 50,000 monthly cap.

An automated drip must create every approved sequence row before the initial delivery event; delivery handling can only schedule follow-ups that already exist. Reconcile missing rows idempotently on startup and derive their dates from verified delivery evidence.

**Why:** Initial-only campaign rows looked enrolled but produced no follow-ups, because the event handler had nothing to schedule. Existing delivered contacts also needed a safe backfill without duplicates or immediate sends.

**How to apply:** Create unscheduled sequences 2–4 transactionally with sequence 1, schedule them only after verified delivery, and make startup reconciliation safe to rerun with zero duplicate rows.

The standing Apex Grid operating order is outcome-based, not reminder-based: at 8:00 AM America/Phoenix, ensure the approved outreach actually reaches the provider under all safety controls, then replenish verified prospects and prepare the next day's queue. If dispatch fails, continue recovery autonomously instead of merely reporting that it failed.

**Why:** The user explicitly established this as the single daily outreach responsibility after repeated cases where scheduled or approved messages remained unsent.

**How to apply:** Treat a due approved queue as active work until provider handoff evidence is persisted or a safety-critical blocker genuinely requires user action. Verify processed, delivered, bounced, and unresolved counts; after dispatch, research and stage verified replacements for the following Phoenix send window.

The durable daily runner must perform next-day preparation itself after research; all verified source variants share the unified verified-pool cap, and any next-day shortfall keeps the daily run partial for recovery rather than reporting success.

**Why:** A dispatch-only runner can send today's queue while silently leaving tomorrow empty, and source labels must not create extra capacity outside the unified verified pool.

**How to apply:** Every primary and recovery pass must persist the authoritative configured targets: 500 verified and 100 hot leads, with sequence-2 follow-ups reported separately. A skipped or still-running preparation claim must return its persisted shortfall; never convert it to zero.