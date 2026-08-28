---
name: Private upload claims
description: Authorization rule for attaching private object-storage uploads to user-owned records.
---

Treating a random private object path as proof of ownership is unsafe. Every pending upload must have a server-generated, one-time claim credential bound to the authenticated principal when one exists, and the clear credential must not be persisted.

**Why:** Existence checks only prove that an object exists. Anyone who learns a valid path could otherwise attach that private object to a record they control and gain authorized download access through the new record.

**How to apply:** Persist a hash of a high-entropy claim token with the pending upload. When creating the owning record, atomically compare the path, token hash, unclaimed state, and uploader identity, consume the claim, and create the attachment in one transaction. Reject replays and guest/authenticated identity mismatches.