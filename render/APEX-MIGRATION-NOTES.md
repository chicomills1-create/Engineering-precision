# Apex Render migration — track notes (2026-09-22)

Branch: `apex-migration/render-exit` (from `migration/replit-exit-base` @ ec41bfd5).
Repo: chicomills1-create/engineering-precision.

## 1. drizzle-kit migrate startup failure — ROOT CAUSE (verified)

**Symptom (verified via Render API):** `apex-grid-app` (srv-daoomugae00c73ccccc0) —
every deploy since 2026-09-21 builds SUCCEED (`build_ended` status 2) then the
deploy (startup) FAILS with `nonZeroExit: 1` (`update_failed`). No live deploy yet.

**Chain (verified by reading the repo):**
1. Render `startCommand`: `pnpm --filter @workspace/api-server run start`
2. `artifacts/api-server/package.json` → `start`:
   `if [ "$NODE_ENV" = "production" ]; then pnpm --filter @workspace/db run migrate; fi && node --enable-source-maps ./dist/index.mjs`
   (NODE_ENV=production IS set on the service, so migrate always runs)
3. `lib/db/package.json` → `migrate`: `drizzle-kit migrate --config ./drizzle.config.ts`
4. `lib/db/drizzle.config.ts`:
   `if (!process.env.DATABASE_URL) { throw new Error("DATABASE_URL, ensure the database is provisioned"); }`
5. The Render service has only **2 of 44 env vars set** (`NODE_ENV`, `NODE_VERSION`).
   `DATABASE_URL` is unset → the config throws → exit 1 → deploy `update_failed`.

**EXACT FIX:** no code change needed — the migrate chain is correct and identical
to Replit. Supply `DATABASE_URL` (plus the rest of the env). Staged payloads:
`render/env/env-<service>.json` (bare arrays, ready for
`bin/render-api PUT /v1/services/{id}/env-vars @file` — full-replace).
`render/env/env-audit.md` lists all 66 keys: 9 self-sourced
(`NODE_VERSION`/`NODE_ENV` verified live, `LOG_LEVEL=info` verified code default
in `artifacts/api-server/src/lib/logger.ts`), 57 need Jeremy (values live in the
Replit deployment secrets panel — read-only copy, change nothing in Replit).
Placeholder in payloads: `__NEEDS_JEREMY__` (NOT real secrets — safe to commit).

**Verification status:** chain verified by direct file reads; failure mode matches
the observed exit-1-on-startup exactly. Cannot run migrate locally (no DB/deps
here) — first real proof is the Render deploy going green after the env PUT.

**Note:** Render's v1 API exposes no log-stream endpoint (404 on all log paths
tried); diagnosis used `/v1/services/{id}/events` (deploy_ended nonZeroExit 1)
plus the repo's own scripts/config.

## 2. Blueprint timing fix — DONE (pushed)

Outreach crons ran at 8AM Phoenix; operations send at **8PM Phoenix**.
Changed in BOTH `render.yaml` and `render/apex-render.yaml` (kept in sync):
- `apex-outreach-0800`: `0 15 * * *` → `0 3 * * *` (20:00 Phoenix = 03:00 UTC)
- `apex-outreach-0830`: `30 15 * * *` → `30 3 * * *` (20:30 Phoenix = 03:30 UTC)
- Header comments updated (03:00/03:30 UTC).
- Also unified the cron `buildCommand`s: root `render.yaml` was missing
  `NODE_ENV=development` on `pnpm install` (dev deps like esbuild would be absent
  at cron build time). Both files now identical and YAML-validated.
- Cron service NAMES kept as-is (`apex-outreach-0800/0830`) so a future blueprint
  sync does not orphan the existing `crn-*` services.

**Live-service alignment still needed** (dashboard or API, after push):
- Crons `crn-daoon3ff3r2c73dfpeh0` / `crn-daoon3ff3r2c73dfpee0`: schedule is still
  `0 15 * * *` / `30 15 * * *` — set to `0 3 * * *` / `30 3 * * *`. Their live
  `buildCommand` is Render's auto-detected default (`corepack enable && ... &&
  pnpm install && ...`) WITHOUT `NODE_ENV=development` — replace with the
  blueprint's cron buildCommand or the cron build will lack devDependencies.
- Web `srv-daoomugae00c73ccccc0`: `healthCheckPath` is EMPTY live (blueprint says
  `/`) — set to `/`.
- Then PUT the three env payloads (each PUT redeploys that service).

## 3. Outreach crons — stay SUSPENDED

Both crons verified `suspended` via API. Do NOT unsuspend until the send flow is
proven on Render. **Proof criteria (all must pass):**
1. `apex-grid-app` deploy green on Render with full env (migrate runs, `/`
   healthy, `/answers/` sample pages 200).
2. Trigger the daily runner manually once on Render (one-off job / dashboard run
   of `pnpm --filter @workspace/api-server run outreach:daily`) against a SMALL
   test batch; confirm SendGrid delivery events for the test batch.
3. Confirm the advisory-lock / `outreach_daily_runs` claim row behaves (no double
   claim) — check Render logs for the runner.
4. Only then unsuspend the crons (still at the 8PM Phoenix schedules).

## 4. Server-code copy — GAP (needs a Replit workspace export)

**Verified on the branch:** the full server/API/outreach tree IS present —
`artifacts/api-server/src` (app.ts, index.ts, routes/, lib/, middlewares/,
outreachDailyRunner.ts), `lib/*` (db, api-zod, estimate-engine, ...), `scripts/`,
`render/`, plus the 35k-page SEO tree. Render builds succeed, which proves the
tree is coherent.

**Gap:** the branch = Replit-pushed state @ ~2026-09-21 18:12 + blueprint commits.
The LIVE Replit workspace is ahead: it held local unpushed commits on 9/21
(workspace HEAD `86618befb` "Add bulk approval test data and update agent
metadata" — 404 on GitHub, i.e. never pushed), plus the 9/22 recovery-task
changes for tonight's 8pm send. That delta is unreachable from here: no local
Replit checkout exists on this machine, and no skill provides Replit workspace
file access (hard constraint: read-only code contact only, and there is no
channel at all).

**Needed to complete the copy:** a tarball of the LIVE Replit workspace limited
to the code dirs — `artifacts/api-server/`, `artifacts/apex-grid/` (src only,
not dist), `lib/`, `scripts/`, plus `package.json`, `pnpm-lock.yaml`,
`pnpm-workspace.yaml` (deps may have changed). Then: diff against this branch,
apply the delta as new commits here, push. Do NOT include `seo/` (content, not
server code) or `.replit` (may carry secrets).
