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

The operating mix is 150 Personal plus 50 Public recipients per Phoenix day. Spend at most one Finder credit on one publicly confirmed reputable person and matching domain, never retry a failed lookup or switch people to force a result, and use clearly attributed official-site emails in the zero-credit Public lane.

The approved daily target is exactly 200: 150 Personal plus 50 Public. The hard Phoenix-calendar monthly ceiling is 6,000, allowing this mix for 30 days. The paid Finder ceiling remains independently capped at 150 lookups per Phoenix day.

**Why:** Personal and Public contacts have different evidence and credit costs. Separate quotas prevent either lane from consuming the other and make the 30-day 6,000-send decision explicit.

**How to apply:** Reserve 150 Personal and 50 Public preparation slots, preserve paid-credit usage per lookup, stage tomorrow's messages for the next Phoenix 8:00 AM window, and stop all sends at 6,000 in a Phoenix month.

If a reputable direct person cannot be confirmed or their individual email cannot be obtained responsibly, retain the company in the Public lane and save any official company email found there. Never spend repeated credits trying to force a personal address, and never discard the company or its public email.

The daily operating ceiling is 200 new eligible recipients at 8:00 AM America/Phoenix time, partitioned into 150 Personal and 50 Public slots. Enforce a hard monthly ceiling of 6,000 sends. Every daily selection must exclude prior sends and all bounce, complaint, unsubscribe, and reply suppressions.

**Why:** Paid enrichment credits are finite, while the requested company coverage is broader than the immediately sendable list. Separating the company universe from email enrichment prevents low-yield lookups from silently hiding legitimate prospects.

**How to apply:** Keep operational contact data in the database/register with verification, approval, source, and suppression state. Use FindyMail for enrichment and verification without guessing addresses. Use durable scheduled execution or an always-running worker for the 8:00 AM trigger; an autoscaling in-process interval is not sufficient.

Run FindyMail name/domain enrichment in small paced batches and retry only explicit rate-limit responses. A successful HTTP response without a returned email is a legitimate no-result, not a reason to try another person.

**Why:** Larger concurrent batches can receive transient 429 responses even below the documented concurrency ceiling; treating those as finder failures understates the verified pool, while retrying genuine no-results violates the one-lookup rule.

**How to apply:** Keep each confirmed pair's result, pace requests in groups of roughly four, retry only 429s, and count a contact as verified only when the response contains an email.

Historical seed batches are satisfied when they retain at least their target count; surplus records must not block later batches.

**Why:** Older runs can legitimately retain more than the nominal target after reconciliation. Requiring exact equality causes startup to fail before newer verified batches are seeded.

**How to apply:** Fail when an idempotent seed remains below its required target, but accept counts at or above the target and let the shared daily slot ledger enforce the actual send ceiling.

The paid-enrichment budget is a separate hard limit: use at most 150 paid credits per Phoenix calendar day, with one lookup per contact. Never exceed that budget to fill an email batch or create reserve contacts.

**Why:** The 150-credit allowance protects spend independently of the 200-email send target; treating lookup failures as a reason to keep spending caused unnecessary overrun.

**How to apply:** Count every attempted paid contact lookup before starting research, stop at 150 for the Phoenix day, and report any remaining email shortfall without purchasing additional lookups.

The paid-credit plan must be evaluated over a 30-day horizon: 150 paid contacts per day requires 4,500 finder credits. This does not authorize reducing the 150-contact Personal lane when the balance is short.

**Why:** Daily send volume and the multi-day enrichment runway are separate planning constraints; silently lowering the send target would change the operating decision instead of addressing the credit shortfall.

**How to apply:** Report current finder-credit coverage and the 30-day shortfall explicitly, keep the 150/day Personal target unchanged, and do not spend beyond the per-day or 30-day credit plan.

Public business emails published on official company websites are a zero-credit lane with 50 reserved daily slots. The 200-email target, its 150/50 lane split, and the 150-paid-credit ceiling are separate constraints.

**Why:** A company-published address can support compliant outreach without consuming a Finder credit; treating every send as a paid lookup wastes the enrichment budget and needlessly reduces future coverage.

**How to apply:** Select up to 150 qualified Personal contacts and exactly 50 qualified Public contacts. Never let surplus contacts in one lane consume the other lane's slots, and never use paid credits for Public contacts.
