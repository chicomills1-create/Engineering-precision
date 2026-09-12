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