---
name: Outreach automation safety
description: Safety boundary for automated B2B email sequences.
---

Hands-off follow-up sending is allowed only while signed delivery events and monitored inbox replies are both verified, and pending messages can be cancelled immediately on reply, bounce, complaint, or unsubscribe.

**Why:** SendGrid outbound delivery alone cannot detect ordinary email replies. Automating sequences without reply detection risks continuing to email someone who has already responded.

**How to apply:** Fail closed whenever either evidence path is unhealthy. Keep the final pre-dispatch evidence check serialized with the send claim so a newly arrived stop signal wins before provider handoff.

When one SendGrid account already serves another system, preserve its single event-webhook destination through a fail-closed relay rather than overwriting it or requiring another paid account. Keep the primary mailbox MX unchanged; use an isolated reply subdomain and forward a copy into the normal inbox.

**Why:** A shared SendGrid account supports only one event destination, while moving the primary domain's MX would risk interrupting ordinary business email.

**How to apply:** Publish and verify the relay before switching the provider URL. Require a signed test event plus real reply, bounce, and unsubscribe tests before setting the relay-verification and automation flags.

Automated prospecting may prepare a conservative daily review list, but it must optimize for low bounce and low spam risk rather than filling a quota. Research automation must never approve prospects, verify guessed addresses, approve messages, or send email.

**Why:** The owner explicitly prioritizes sender reputation and non-spam outreach over volume; an incomplete list is safer than weak-fit organizations or uncertain addresses.

**How to apply:** Require public need evidence and deduplication, cap daily imports, leave contacts unverified, and keep approval and sending as separate employee actions.

Engaged prospects receive at most one automated follow-up: only after the initial email has verified delivery followed by an open or click event, and only after three Phoenix business days from the first qualifying engagement. The body asks for a reply and has no website CTA outside the signature.

**Why:** Opens and clicks are engagement signals, not proof of intent. One concise reply-first touch balances responsiveness with sender reputation and avoids reviving the superseded multi-message drip.

**How to apply:** Backfill qualifying opens and click-only engagements idempotently within the approved 30-day window. Treat reply, bounce, complaint, unsubscribe, suppression, or other delivery-warning evidence as a hard stop; prevent duplicate sequence claims and report opens/clicks separately from delivery and replies.