#!/bin/bash
set -e

pnpm install --frozen-lockfile

# Re-run API codegen so generated hooks (useListLeads, useUpdateLead, ...) always match openapi.yaml
pnpm --filter @workspace/api-spec run codegen

# Sync database schema
pnpm --filter @workspace/db run push-force

# Fail loudly if the merged web app would ship broken: typecheck + production build
pnpm --filter @workspace/apex-grid run typecheck
PORT=3000 BASE_PATH=/ pnpm --filter @workspace/apex-grid run build
