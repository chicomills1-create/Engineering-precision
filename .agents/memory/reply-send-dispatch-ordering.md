---
name: Reply/send dispatch ordering
description: Safety rule for coordinating inbound replies with outbound provider dispatch.
---

Hold the normalized-email advisory lock through the final persisted-state check and provider dispatch. If reply processing wins the lock, outbound sending must release its reservations and refuse dispatch.

**Why:** Claiming an outbound row before sending is not sufficient. An inbound reply can stop the persisted sequence while a worker still holds a stale claimed object and sends it anyway.

**How to apply:** Any new reply, suppression, or send path must use the same per-email lock. Never infer a reply's message thread from recency; link message-level context only from verified correlation.