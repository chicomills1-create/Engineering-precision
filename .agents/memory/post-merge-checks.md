---
name: Post-merge frontend checks
description: Lessons from task-agent merges breaking the apex-grid frontend
---
**Rule:** After a task-agent merge touching the web app, run `pnpm --filter @workspace/apex-grid run typecheck` and a production build (`PORT=3000 BASE_PATH=/ pnpm --filter @workspace/apex-grid run build`), and check workflow logs for runtime errors.

**Why:** A merged admin-auth task crashed the entire published site ("Cannot access 'basePath' before initialization") because a module-level `const clerkAppearance` referenced `basePath` declared later in the file (TDZ). Also, merged spec changes required rerunning `pnpm --filter @workspace/api-spec run codegen` locally before generated hooks (e.g. `useListLeads`) existed.

**How to apply:** Any time automatic_updates report a task merge, typecheck + build the affected artifact before assuming the preview/production is healthy. Note vite.config requires PORT and BASE_PATH env vars even for builds.

**Status (2026-07-28):** Automated. The post-merge script now runs codegen, typecheck, and a production build (fail-fast), and matching validation commands (`codegen`, `typecheck`, `build`) are registered. If a merge breaks the site, post-merge setup fails loudly instead of shipping a black site.
