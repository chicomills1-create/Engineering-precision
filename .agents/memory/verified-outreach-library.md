---
name: Verified outreach library
description: Durable policy for building and operating the Arizona-first architecture and commercial-construction prospect pool.
---

Maintain a persistent, auditable prospect library rather than relying on conversation context or agent memory for contact records. Start with Arizona architecture firms and commercial construction companies, then expand to California after Arizona coverage is exhausted.

Only add a recipient after public company/contact evidence and a successful business-email verification. Require a domain-matched email, a named decision-maker with a relevant role, public source URLs, and one recipient per normalized company. Keep rejected, ambiguous, mismatched, and incomplete records out of the send queue.

Budget each finder credit as one potential final email address. Identify the reputable person and matching company domain through free public research first; never spend finder credits on broad employee discovery or curiosity searches. Use one paid name/domain lookup only for a pre-qualified person, then verify and run suppression checks before outreach.

Do not thin the company universe because enrichment fails. Preserve every legitimate, deduplicated Arizona or California architecture/construction company in the candidate library; attach one public named person and one email when available. A missing, rejected, or unresolved email remains a visible unresolved company record rather than a discarded company.

Keep the public person, role, company domain, source URL, and enrichment status for unresolved firms. Revisit those same firms later for a directly published business email before considering another paid lookup; never lose the company just because the first email path was empty.

The daily operating target is 167 new eligible recipients at 8:00 AM America/Phoenix time. Enforce a hard monthly ceiling of 5,000 sends; 167 per day would otherwise exceed that ceiling in a 30-day month. Every daily selection must exclude prior sends and all bounce, complaint, unsubscribe, and reply suppressions.

**Why:** Paid enrichment credits are finite, while the requested company coverage is broader than the immediately sendable list. Separating the company universe from email enrichment prevents low-yield lookups from silently hiding legitimate prospects.

**How to apply:** Keep operational contact data in the database/register with verification, approval, source, and suppression state. Use FindyMail for enrichment and verification without guessing addresses. Use durable scheduled execution or an always-running worker for the 8:00 AM trigger; an autoscaling in-process interval is not sufficient.