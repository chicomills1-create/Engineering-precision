---
name: Post-merge frontend checks
description: Lessons from task-agent merges breaking the apex-grid frontend
---
**Rule:** After a task-agent merge touching the web app, run `pnpm --filter @workspace/apex-grid run typecheck` and a production build (`PORT=3000 BASE_PATH=/ pnpm --filter @workspace/apex-grid run build`), and check workflow logs for runtime errors.

**Why:** A merged admin-auth task crashed the entire published site ("Cannot access 'basePath' before initialization") because a module-level `const clerkAppearance` referenced `basePath` declared later in the file (TDZ). Also, merged spec changes required rerunning `pnpm --filter @workspace/api-spec run codegen` locally before generated hooks (e.g. `useListLeads`) existed.

**How to apply:** Any time automatic_updates report a task merge, typecheck + build the affected artifact before assuming the preview/production is healthy. Note vite.config requires PORT and BASE_PATH env vars even for builds.

**Also:** Merges can land botched route files (compile errors, orphaned code) — run the api-server typecheck too. And if a merged task changed the drizzle schema, run `pnpm --filter @workspace/db run push` or every affected endpoint 500s with "column does not exist".

**Large static corpus:** The generated SEO public tree is hundreds of megabytes and makes a normal Vite build too slow for the post-merge timeout. Post-merge validation should compile the real app into temporary output with static-public copying and minification disabled; normal production builds must still include the full corpus.

**Why:** The full post-merge sequence took 213 seconds even after the validation build avoided copying the generated SEO files; the original 120-second limit timed out after database sync and typecheck had begun.

**How to apply:** Keep the lightweight mode gated to the post-merge environment variable and clean its temporary output on exit. Use the ordinary Vite build for deployment and the dedicated build workflow.

**Generated-output audits:** Regenerate the static SEO corpus with search-engine submission disabled, then build/prerender, then run audits that scan `public/`.

**Why:** Claim and link audits otherwise inspect stale generated HTML and reject a merge even when its source generator contains the fix. Post-merge temporary-output mode can also accidentally redirect the SSR bundle away from the fixed path imported by the prerender script, causing current component changes to be rendered with a stale bundle.

**How to apply:** The prerender-bundle output path takes precedence over temporary client-build output. Keep generated-corpus audits after prerendering, and do not weaken an audit to make setup pass.

**Status (2026-07-28):** Automated. The post-merge script now runs codegen, typecheck, and a production build (fail-fast), and matching validation commands (`codegen`, `typecheck`, `build`) are registered. If a merge breaks the site, post-merge setup fails loudly instead of shipping a black site.
