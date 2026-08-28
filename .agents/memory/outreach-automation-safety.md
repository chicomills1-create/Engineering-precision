---
name: Outreach automation safety
description: Safety boundary for automated B2B email sequences.
---

Do not enable hands-off follow-up sending until the system receives both delivery events and inbox replies, and can cancel pending messages immediately on reply, bounce, complaint, or unsubscribe.

**Why:** SendGrid outbound delivery alone cannot detect ordinary email replies. Automating sequences without reply detection risks continuing to email someone who has already responded.

**How to apply:** Keep the current workflow at review, approve, and explicit send. Add signed delivery-event handling and a monitored reply mailbox before introducing a scheduler for follow-up messages.

When one SendGrid account already serves another system, preserve its single event-webhook destination through a fail-closed relay rather than overwriting it or requiring another paid account. Keep the primary mailbox MX unchanged; use an isolated reply subdomain and forward a copy into the normal inbox.

**Why:** A shared SendGrid account supports only one event destination, while moving the primary domain's MX would risk interrupting ordinary business email.

**How to apply:** Publish and verify the relay before switching the provider URL. Require a signed test event plus real reply, bounce, and unsubscribe tests before setting the relay-verification and automation flags.