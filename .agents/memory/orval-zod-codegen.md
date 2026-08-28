---
name: Orval zod codegen pitfalls
description: OpenAPI shapes that generate incompatible or colliding zod exports
---
**Rule:** In `lib/api-spec/openapi.yaml`, use `type: number` instead of `type: integer` for numeric fields.

**Why:** Orval emits zod-v4-style `zod.int()` for `type: integer`, which fails against the workspace zod v3 import.

**How to apply:** Any spec edit adding numeric fields; run `pnpm --filter @workspace/api-spec run codegen` after spec changes.

Also: `format: email` in the spec generates `zod.email()` (zod v4 API) which breaks against the lib's zod v3. Use a `pattern` regex instead of `format: email`.

**Rule:** Avoid query parameters on generated zod endpoints when the operation's parameter type collides with Orval's generated schema export; use a body-validated POST for action previews instead.

**Why:** Orval can emit the same `<OperationId>Params` name from both `generated/api` and `generated/types`, causing the api-zod barrel to fail with TS2308.

**How to apply:** If codegen reports a duplicate `*Params` export after adding query parameters, reshape the action as a `$ref` body schema rather than hand-editing generated barrels.
