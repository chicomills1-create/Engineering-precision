---
name: Verified outreach library
description: Durable policy for building and operating the Arizona-first architecture and commercial-construction prospect pool.
---

Maintain a persistent, auditable prospect library rather than relying on conversation context or agent memory for contact records. Start with Arizona architecture firms and commercial construction companies, then expand to California after Arizona coverage is exhausted.

Only add a recipient after public company/contact evidence and a successful business-email verification. Require a domain-matched email, a named decision-maker with a relevant role, public source URLs, and one recipient per normalized company. Keep rejected, ambiguous, mismatched, and incomplete records out of the send queue.

When extracting emails from public pages, attribute each address to the target company itself. Reject publisher, directory, vendor, partner, placeholder, and unclear third-party addresses; a different domain is acceptable only when the page explicitly identifies it as the target company's contact domain.

**Why:** Search-result and article pages often expose a valid email that belongs to the publisher rather than the company being researched. Saving those addresses creates false leads and can misdirect outreach.

**How to apply:** Ask the extractor for qualifying and rejected addresses separately, retain only qualifying addresses, and mark the site checked with no qualifying email when attribution is unclear.

Budget each finder credit as one potential final email address. Identify the reputable person and matching company domain through free public research first; never spend finder credits on broad employee discovery or curiosity searches. Use one paid name/domain lookup only for a pre-qualified person, then verify and run suppression checks before outreach.

Do not thin the company universe because enrichment fails. Preserve every legitimate, deduplicated Arizona or California architecture/construction company in the candidate library; attach one public named person and one email when available. A missing, rejected, or unresolved email remains a visible unresolved company record rather than a discarded company.

Keep the public person, role, company domain, source URL, and enrichment status for unresolved firms. Revisit those same firms later for a directly published business email before considering another paid lookup; never lose the company just because the first email path was empty.

Maintain two ordered library lanes: Personal and Public. Personal holds named individual contacts obtained through a single paid lookup after public qualification; Public holds company-published business emails found without finder credits. Work through Personal first, then revisit unresolved companies for the Public lane.

The operating priority is Personal first: spend at most one Finder credit on one publicly confirmed reputable person and matching domain, never retry a failed lookup or switch to another person to force a result. Save all other clearly attributed official-site emails in Public without paid credits. Prepare the next day's batch only after the current 150-send window, and do not mix in Public recipients until the Personal pool is exhausted or the owner explicitly approves a mixed batch.

Do not increase the daily ceiling solely because messages appear delivered. Review at least seven calendar days of bounce, complaint, unsubscribe, reply-stop, and provider-reconciliation evidence before a ramp. If the next approved target is 200 total, the arithmetic mix is 150 Personal plus 50 Public; 150 Personal plus 59 Public is 209 total and must be treated as a separate target.

**Why:** Named, publicly confirmed decision-makers are the highest-confidence audience, while company inboxes are useful as a later lane but carry different attribution and response risk. A staged ramp protects sender reputation and keeps the 5,000/month ceiling intact.

**How to apply:** Maintain separate Personal/Public counts and statuses, preserve paid-credit usage per lookup, stage tomorrow's messages for the next Phoenix 8:00 AM window, and require an explicit clean-delivery review before changing the 150/day ceiling.

If a reputable direct person cannot be confirmed or their individual email cannot be obtained responsibly, retain the company in the Public lane and save any official company email found there. Never spend repeated credits trying to force a personal address, and never discard the company or its public email.

The daily operating ceiling is 150 new eligible recipients at 8:00 AM America/Phoenix time. Enforce a hard monthly ceiling of 5,000 sends; 150 per day leaves a 350-500 message cushion in 30- and 31-day months. Every daily selection must exclude prior sends and all bounce, complaint, unsubscribe, and reply suppressions.

**Why:** Paid enrichment credits are finite, while the requested company coverage is broader than the immediately sendable list. Separating the company universe from email enrichment prevents low-yield lookups from silently hiding legitimate prospects.

**How to apply:** Keep operational contact data in the database/register with verification, approval, source, and suppression state. Use FindyMail for enrichment and verification without guessing addresses. Use durable scheduled execution or an always-running worker for the 8:00 AM trigger; an autoscaling in-process interval is not sufficient.

Run FindyMail name/domain enrichment in small paced batches and retry only explicit rate-limit responses. A successful HTTP response without a returned email is a legitimate no-result, not a reason to try another person.

**Why:** Larger concurrent batches can receive transient 429 responses even below the documented concurrency ceiling; treating those as finder failures understates the verified pool, while retrying genuine no-results violates the one-lookup rule.

**How to apply:** Keep each confirmed pair's result, pace requests in groups of roughly four, retry only 429s, and count a contact as verified only when the response contains an email.

Historical seed batches are satisfied when they retain at least their target count; surplus records must not block later batches.

**Why:** Older runs can legitimately retain more than the nominal target after reconciliation. Requiring exact equality causes startup to fail before newer verified batches are seeded.

**How to apply:** Fail when an idempotent seed remains below its required target, but accept counts at or above the target and let the shared daily slot ledger enforce the actual send ceiling.

For a 150-email daily batch, the paid-enrichment ceiling is the remaining email slots, not an open-ended budget to obtain a reserve. If five eligible messages already exist, no more than 145 paid lookups may be attempted.

**Why:** A 150-send target paired with 258 paid lookups is a planning failure even when the send queue eventually reaches 150. No-result lookups and rejected matches are a shortfall to report, not justification for exceeding the batch budget.

**How to apply:** Before research, record target, already-eligible count, and remaining paid-lookup allowance. Decrement the allowance per attempted lookup, stop at zero, and never spend paid credits on reserve contacts for that same batch.