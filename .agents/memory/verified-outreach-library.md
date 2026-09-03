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

Maintain three ordered library lanes: Personal, Public, and Hot Market. Personal holds named contacts obtained through one paid lookup after public qualification; Public holds company-published emails found without finder credits; Hot Market requires current, strong project or market evidence and a verified contact.

The regular operating mix is 100 Personal plus 50 Public recipients per Phoenix day. The separate Hot Market lane targets 50 verified recipients; verified extras may send when available. Spend at most one Finder credit on one publicly confirmed reputable person and matching domain, never retry a failed lookup or switch people to force a result, and use clearly attributed official-site emails in zero-credit lanes.

The approved baseline is 200 initial campaign emails per Phoenix day: 100 Direct, 50 Public, and 50 Hot Market. Verified Hot Market extras are allowed. Hot Lead follow-ups are additional and do not consume the initial-campaign daily or monthly allocation.

**Why:** Personal, Public, and Hot Market contacts have different evidence, urgency, and credit costs. Separate targets preserve the regular pipeline while prioritizing current opportunities without pretending unverified records are sendable.

**How to apply:** Reserve 100 Direct and 50 Public regular slots, target 50 verified Hot Market messages, allow verified Hot Market extras, preserve paid-credit usage per lookup, and stage messages for the next Phoenix 8:00 AM window. Apply the approved monthly ramp only to initial campaign emails.

If a reputable direct person cannot be confirmed or their individual email cannot be obtained responsibly, retain the company in the Public lane and save any official company email found there. Never spend repeated credits trying to force a personal address, and never discard the company or its public email.

The daily operating baseline is 200 new eligible recipients at 8:00 AM America/Phoenix time: 100 Direct, 50 Public, and 50 Hot Market. Verified Hot Market extras and eligible Hot Lead follow-ups may raise the daily and monthly total. Every selection must exclude prior sends and all bounce, complaint, unsubscribe, and reply suppressions.

**Why:** Paid enrichment credits are finite, while requested national coverage is broader than the immediately sendable list. Separating the company universe from email enrichment and hot-market qualification prevents low-yield lookups or weak urgency signals from entering the send queue.

**How to apply:** Keep operational contact data in the database/register with verification, approval, source, urgency lane, and suppression state. Use FindyMail for enrichment and verification without guessing addresses. Use durable scheduled execution or an always-running worker for the 8:00 AM trigger; an autoscaling in-process interval is not sufficient.

National Hot Market replenishment must prefer zero-credit public evidence and accept honest shortfalls. Include established luxury-residential architecture/design firms and custom-home builders with substantial active portfolios and builder/owner collaboration, such as the profile represented by Candelaria Design Associates and Payne Cole Designs. Otherwise require a current project/permit/expansion/infrastructure/construction signal. Every record still requires a named relevant role and a visibly published company-domain email before automatic approval.

**Why:** Combining broad market discovery with guessed or weakly attributed contact data would fill the lane numerically while violating the verification standard and risking misdirected outreach.

**How to apply:** Search Arizona first, California second, then rotate through the remaining licensed states. Treat high-end residential architecture/design and luxury custom-home firms as Hot Market when their current portfolio indicates recurring engineering coordination opportunities. Keep builder and architect copy lanes separate, skip incomplete or duplicate records, and leave unused slots empty rather than lowering contact-evidence requirements.

Run FindyMail name/domain enrichment in small paced batches and retry only explicit rate-limit responses. A successful HTTP response without a returned email is a legitimate no-result, not a reason to try another person.

**Why:** Larger concurrent batches can receive transient 429 responses even below the documented concurrency ceiling; treating those as finder failures understates the verified pool, while retrying genuine no-results violates the one-lookup rule.

**How to apply:** Keep each confirmed pair's result, pace requests in groups of roughly four, retry only 429s, and count a contact as verified only when the response contains an email.

Historical seed batches are satisfied when they retain at least their target count; surplus records must not block later batches.

**Why:** Older runs can legitimately retain more than the nominal target after reconciliation. Requiring exact equality causes startup to fail before newer verified batches are seeded.

**How to apply:** Fail when an idempotent seed remains below its required target, but accept counts at or above the target and let the shared daily slot ledger enforce the actual send ceiling.

The paid-enrichment budget is a separate hard limit: use at most 150 paid credits per Phoenix calendar day, with one lookup per contact. Never exceed that budget to fill an email batch or create reserve contacts.

**Why:** The 150-credit allowance protects spend independently of the 200-email send target; treating lookup failures as a reason to keep spending caused unnecessary overrun.

**How to apply:** Count every attempted paid contact lookup before starting research, stop at 150 for the Phoenix day, and report any remaining email shortfall without purchasing additional lookups.

The paid-credit plan must be evaluated over a 30-day horizon. The regular Personal lane targets 100 recipients per day; the independent safety ceiling remains at most 150 paid lookups per Phoenix day unless the user lowers it separately.

**Why:** Daily send volume and the multi-day enrichment runway are separate planning constraints. The new 150-message regular allocation reduces the Personal send target, but it does not authorize extra paid lookups for the Hot Market lane.

**How to apply:** Report finder-credit coverage explicitly, target 100 Personal regular recipients, use public evidence first for Hot Market contacts, and do not spend beyond the existing per-day or 30-day credit plan.

Public business emails published on official company websites remain a zero-credit regular lane with 50 reserved daily slots. The 150 Direct/Public target, 50 Hot Market target, initial-campaign monthly ramp, and paid-credit ceiling are separate constraints.

**Why:** A company-published address can support compliant outreach without consuming a Finder credit; treating every send as a paid lookup wastes the enrichment budget and needlessly reduces future coverage.

**How to apply:** Select up to 100 qualified Personal contacts and 50 qualified Public contacts for the regular lane. Fill Hot Market only with current, verified evidence; allow verified extras; never use paid credits for publicly available addresses.
