---
name: Outreach automation safety
description: Safety boundary for automated B2B email sequences.
---

Do not enable hands-off follow-up sending until the system receives both delivery events and inbox replies, and can cancel pending messages immediately on reply, bounce, complaint, or unsubscribe.

**Why:** SendGrid outbound delivery alone cannot detect ordinary email replies. Automating sequences without reply detection risks continuing to email someone who has already responded.

**How to apply:** Keep the current workflow at review, approve, and explicit send. Add signed delivery-event handling and a monitored reply mailbox before introducing a scheduler for follow-up messages.