---
name: Past-client monthly outreach
description: Safety rules for consent-aware monthly email to contacts from archived client requests.
---

Treat monthly-contact consent as canonical per normalized email, not per project request. An opt-out must revoke eligibility across every request using the same trimmed, case-insensitive address.

**Why:** Project-level consent can leave an older opted-in request eligible after the same contact revokes permission on a newer request.

**How to apply:** Deduplicate and suppress using normalized email, recheck immediately before sending, and propagate consent changes to all matching client requests.

Claim each normalized recipient and Phoenix calendar month durably before calling the email provider.

**Why:** Browser retries, concurrent admins, and unknown provider outcomes can otherwise send duplicate monthly messages.

**How to apply:** Preserve the unique monthly claim even when delivery fails; never infer eligibility from a stale UI list.