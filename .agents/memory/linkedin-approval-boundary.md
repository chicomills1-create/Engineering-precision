---
name: LinkedIn approval boundary
description: Durable governance rules for the employee LinkedIn B2B workflow.
---

LinkedIn research and draft preparation may be automated, but connection requests, messages, comments, and publishing remain employee-completed actions unless an official provider is explicitly approved later.

**Why:** Approval UI alone is not a safety boundary. Suppressed targets can re-enter through linked signals unless the server resolves the complete attribution chain, and per-record locks cannot enforce a global daily limit under concurrency.

**How to apply:** Derive approvers from authenticated server identity, keep immutable transition history, resolve person/company suppression through every linked entity, fail closed when provider capabilities are absent, and acquire one shared Phoenix-day quota lock before counting or reserving work. Once an external dispatch is durably claimed after the final suppression check, no manual transition or later suppression may cancel that claim; only signed provider reconciliation may finalize it.

The designated Apex Grid owner is the intended operator for any remaining manual social action; the 1099 team is not expected to perform social outreach.

**Why:** The owner is too busy to delegate social execution to contractors, so queue ownership must not imply that 1099s will send messages or publish content.

**How to apply:** Keep research, drafts, reminders, suppression checks, and reporting automated while treating the owner as the only manual executor unless an approved provider changes that boundary.
