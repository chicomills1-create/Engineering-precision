---
name: Outbound proof environments
description: How to avoid false end-to-end email proof when development sends and production webhooks use separate databases.
---

Run a controlled outbound proof from the same application environment and database that the provider webhook will update. A provider activity record proves acceptance and delivery, but it does not prove the application's signed callback or state transition when the send record lives in another environment.

**Why:** SendGrid webhooks target the public production endpoint. A message sent from a development database can be delivered successfully while its callback reaches production, where the referenced message and prospect IDs do not exist.

**How to apply:** For production readiness, create, approve, and send the proof through the published authenticated flow, then confirm the production delivery-event row and message status. Use provider activity only for reconciliation, not as a substitute for callback proof.