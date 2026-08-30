---
name: Outreach delivery evidence
description: Defines the provider evidence required to describe an outreach message as sent.
---

Treat a message as handed off only when a SendGrid `processed` event or an equivalent confirmed provider-acceptance result exists. Never describe a prepared, scheduled, or merely persisted message as sent. Do not use `sent_at` alone as the delivery dashboard’s canonical count.

**Why:** A provider-processed message can bounce before `sent_at` is persisted, while a prepared message has not been dispatched at all. Conflating these states hid one real outbound attempt and made preparation look like delivery.

**How to apply:** Report processed/accepted, delivered, bounced/rejected, and unresolved counts separately for each Phoenix send window. Preserve immutable evidence for ambiguous outcomes and never redispatch them automatically.