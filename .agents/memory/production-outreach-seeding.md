---
name: Production outreach seeding
description: How reviewed outreach batches reach production when database migration journals are not reliable.
---

Use an idempotent, explicitly enabled startup seeder for reviewed outreach batches rather than a data migration.

**Why:** Development and production were created with schema push and do not have reliable Drizzle migration journals. A custom data migration tried to replay older schema migrations and failed before reaching the batch.

**How to apply:** Guard the seeder with a production-only environment flag, use stable dedupe keys, assert the exact intended queue size, keep sending automation disabled during seeding, and turn the seed flag off after production readiness is verified.