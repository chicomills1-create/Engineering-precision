---
name: Outreach admin response contracts
description: Durable rules for admin queue response schemas and dedicated cohort actions.
---

Admin queue response contracts must include every internal message source type that can be persisted, even when admin create/edit inputs intentionally allow only user-selectable attribution types.

**Why:** A valid internal lane value can otherwise make the entire queue response fail validation, hiding every message behind a generic load error.

**How to apply:** Whenever a new internal outreach source is introduced, update the read/response contract while keeping create/edit attribution inputs restricted.

For a fixed historical clicker cohort, validate the expected distinct clicker count before applying per-recipient delivery, suppression, reply, bounce, or dedupe exclusions; report those exclusions separately.

**Why:** Filtering one safety-conflict recipient before the cohort guard changes the cohort size and prevents the guarded action from reporting the skip it was designed to handle.

**How to apply:** Keep the batch identity check separate from recipient eligibility checks, and retain transactional rollback plus recipient-level locks.

Dedicated hot-lead dedupe must distinguish dedicated source types from ordinary sequence-two rows. An undispatched generic row that occupies the unique sequence slot may be converted in place; rows with dispatch evidence must be skipped.

**Why:** Treating every sequence-two row as a dedicated match falsely reports idempotency, while inserting beside it cannot succeed because the database reserves one follow-up per prospect, campaign, and sequence.

**How to apply:** Run safety checks first, dedupe dedicated sources second, then convert only draft/approved/review rows with no sent or provider evidence.

An admin tab that waits on several endpoint queries must be debugged as a composite surface, not from the tab title alone. Read schemas must represent production geography and evidence values even when write actions remain narrower.

**Why:** The queue UI masked campaign and prospect response-validation failures behind its generic message after the message endpoint itself was fixed.

**How to apply:** Inspect every parallel query and production validation error before attributing a composite loading failure to its primary-named resource.