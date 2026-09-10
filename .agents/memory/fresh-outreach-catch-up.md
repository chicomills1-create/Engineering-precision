---
name: Fresh outreach catch-up
description: Authorization and safety boundary for the one-time 2,207-contact catch-up campaign.
---

Run a one-time catch-up cohort targeting exactly 2,207 fresh, independently verified sequence-one contacts. Count only durable SendGrid HTTP handoff evidence or qualifying provider events. Historical ambiguous attempts do not count and must never be replayed.

**Why:** The user authorized 2,207 fresh verified contacts instead of resending the 2,207 unresolved historical attempts, whose provider outcomes are ambiguous.

**How to apply:** Preserve the normal 100 Direct, 50 Public, and 50 recurring Hot Market daily limits. Reserve capacity atomically, retain reservations for ambiguous handoffs, release only definite non-handoffs, and stop cohort enrollment exactly at 2,207 provider acceptances.