---
name: LinkedIn approval boundary
description: Durable governance rules for the employee LinkedIn B2B workflow.
---

LinkedIn research and draft preparation may be automated, but connection requests, messages, comments, and publishing remain employee-completed actions unless an official provider is explicitly approved later.

**Why:** Approval UI alone is not a safety boundary. Suppressed targets can re-enter through linked signals unless the server resolves the complete attribution chain, and per-record locks cannot enforce a global daily limit under concurrency.

**How to apply:** Derive approvers from authenticated server identity, keep immutable transition history, resolve person/company suppression through every linked entity, fail closed when provider capabilities are absent, and acquire one shared Phoenix-day quota lock before counting and completing or publishing.