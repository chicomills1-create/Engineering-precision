#!/bin/bash
set -e

validation_dir="artifacts/apex-grid/.post-merge-dist"
trap 'rm -rf "$validation_dir"' EXIT

pnpm install --frozen-lockfile

# Re-run API codegen so generated hooks (useListLeads, useUpdateLead, ...) always match openapi.yaml
pnpm --filter @workspace/api-spec run codegen

# Sync database schema
pnpm --filter @workspace/db run push-force

# Rebuild generated pages before auditing them. Source changes to claims,
# canonicals, or schema can otherwise leave stale public HTML that makes the
# post-merge audit fail even though the generator contains the fix. Never notify
# search engines from this internal reconciliation run.
SKIP_SEARCH_ENGINE_SUBMISSION=1 pnpm --filter @workspace/apex-grid run seo:generate

# Fail loudly if the merged web app would ship broken. Vite assets compile into
# a temporary directory, while the prerender step refreshes the final public
# route HTML that the claim audit must inspect.
POST_MERGE_VALIDATION=1 PORT=3000 BASE_PATH=/ pnpm --filter @workspace/apex-grid run build
pnpm --filter @workspace/apex-grid run typecheck
