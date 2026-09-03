#!/bin/bash
set -e

validation_dir="artifacts/apex-grid/.post-merge-dist"
trap 'rm -rf "$validation_dir"' EXIT

pnpm install --frozen-lockfile

# Re-run API codegen so generated hooks (useListLeads, useUpdateLead, ...) always match openapi.yaml
pnpm --filter @workspace/api-spec run codegen

# Sync database schema
pnpm --filter @workspace/db run push-force

# Fail loudly if the merged web app would ship broken. Compile the real app into
# a temporary directory without recopying the generated 598 MB SEO corpus.
pnpm --filter @workspace/apex-grid run typecheck
POST_MERGE_VALIDATION=1 PORT=3000 BASE_PATH=/ pnpm --filter @workspace/apex-grid run build
