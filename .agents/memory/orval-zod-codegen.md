---
name: Orval zod codegen pitfall
description: integer types in openapi.yaml generate incompatible zod code
---
**Rule:** In `lib/api-spec/openapi.yaml`, use `type: number` instead of `type: integer` for numeric fields.

**Why:** Orval emits zod-v4-style `zod.int()` for `type: integer`, which fails against the workspace zod v3 import.

**How to apply:** Any spec edit adding numeric fields; run `pnpm --filter @workspace/api-spec run codegen` after spec changes.
