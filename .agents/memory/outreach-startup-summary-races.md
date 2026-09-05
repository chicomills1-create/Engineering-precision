---
name: Outreach startup summary races
description: How to verify outreach inventory when multiple Autoscale instances run startup preparation concurrently.
---

Autoscale can start more than one application instance during a publish. Concurrent startup preparation may leave the shared preparation-run summary marked `running` or showing an obsolete shortfall even when the idempotent message queue is complete.

**Why:** A production publish started two instances. One summary retained a 50-message shortfall while authoritative message-level queries showed all 100 Direct, 50 Public, and 50 Hot Market sequence-one messages queued without duplicate domains or early provider handoffs.

**How to apply:** Verify scheduled messages by prospect batch identity, sequence number, status, and scheduled time. Also check suppressions, duplicate active domains, `sent_at`, and provider IDs. Treat the preparation summary as diagnostic rather than authoritative when startup logs show multiple process IDs.