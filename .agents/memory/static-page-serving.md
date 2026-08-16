---
name: Static page production serving
description: Why all 4,200 static SEO pages were soft-404ing in production and the definitive fix.
---

# Static Page Production Serving

## The Problem (Root Cause — Confirmed Aug 2026)
Replit's `kind:web` artifact with `serve = "static"` registers a static handler at the artifact's path. This handler:
- Serves exact file paths correctly (`/structural-engineering/index.html` → 200 ✓)
- Does NOT do directory-index resolution (`/structural-engineering/` → cannot find index.html inside)
- Falls through to the `[[services.production.rewrites]]` rule, which had `/* → /index.html`
- Result: every directory-style URL returned the SPA shell — a soft 404 to Google

This was masked in dev because curl tests hit `localhost:8080` directly (the API server), where `express.static` works correctly. The production proxy intercepts `/structural-engineering/` at the static handler before port 8080 ever sees it.

## The Definitive Fix (Applied Aug 2026)
Two coordinated artifact.toml changes via `verifyAndReplaceArtifactToml`:

**apex-grid** (`artifacts/apex-grid/.replit-artifact/artifact.toml`):
- Removed `serve = "static"`, `publicDir`, `[[services.production.rewrites]]`, AND `paths = ["/"]` from the `[[services]]` block
- Kept only the `build` step: `pnpm --filter @workspace/apex-grid run build`
- CRITICAL: `paths` must be removed entirely — if apex-grid keeps `paths = ["/"]` even without a production `serve`, Replit's proxy still routes `/` to apex-grid's port (22130) which isn't running in production → connection refused → 500 on every healthcheck → deployment fails

**api-server** (`artifacts/api-server/.replit-artifact/artifact.toml`):
- Changed `paths = ["/api"]` → `paths = ["/"]`
- ALL production traffic now routes to port 8080 (Express)
- `express.static(staticRoot)` resolves `/structural-engineering/` → `dist/public/structural-engineering/index.html` ✓
- `/api/*` routes through the Express router ✓
- SPA catch-all serves `dist/public/index.html` for React client-side routes ✓
- Healthcheck path: deployment probes `paths[0]` = `/` → returns 200 from express.static

## How to Apply
- **Never add `serve = "static"` + SPA rewrite to apex-grid** — it will break production static serving again
- **Never give apex-grid `paths = ["/"]`** in its `[[services]]` block — even without a production serve, this causes a 500 proxy conflict in production
- The `express.static` middleware in `api-server/src/app.ts` MUST come before `app.use("/api", router)`
- `staticRoot` is resolved via `import.meta.url`: `path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../apex-grid/dist/public")`
- Dev experience note: apex-grid's Vite dev server still runs on port 22130, but the proxy no longer routes to it (no `paths`). Dev preview shows the api-server's built output from `dist/public/` instead of Vite HMR. This is acceptable for SEO-focused work.

## Deployment Healthcheck Behavior
- Replit probes `paths[0]` of the service (NOT `health.startup.path` in the toml — that field appears to be ignored for startup checks)
- Previous config: `paths = ["/api"]` → healthcheck probed `/api` → health router returned 200
- Current config: `paths = ["/"]` → healthcheck probes `/` → express.static serves SPA index.html → 200

## Verification
After any deploy, confirm in GSC URL Inspection → Live Test:
- `https://apexgrideng.com/structural-engineering/` must show the real page title (not "MEP, Structural & Civil Engineering Firm")
- `Page availability` must say "Page is available to Google" (not Soft 404)
