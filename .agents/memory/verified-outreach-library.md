---
name: Verified outreach library
description: Durable policy for building and operating the Arizona-first architecture and commercial-construction prospect pool.
---

Maintain a persistent, auditable prospect library rather than relying on conversation context or agent memory for contact records. Start with Arizona architecture firms and commercial construction companies, then expand to California after Arizona coverage is exhausted.

Only add a recipient after public company/contact evidence and a successful business-email verification. Require a domain-matched email, a named decision-maker with a relevant role, public source URLs, and one recipient per normalized company. Keep rejected, ambiguous, mismatched, and incomplete records out of the send queue.

The daily operating target is 167 new eligible recipients at 8:00 AM America/Phoenix time. Enforce a hard monthly ceiling of 5,000 sends; 167 per day would otherwise exceed that ceiling in a 30-day month. Every daily selection must exclude prior sends and all bounce, complaint, unsubscribe, and reply suppressions.

**Why:** The outreach goal requires repeatable daily selection from a large verified pool, while the sender must remain defensible and stop immediately for negative engagement signals.

**How to apply:** Keep operational contact data in the database/register with verification, approval, source, and suppression state. Use FindyMail for enrichment and verification without guessing addresses. Use durable scheduled execution or an always-running worker for the 8:00 AM trigger; an autoscaling in-process interval is not sufficient.