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
- Removed `serve = "static"`, `publicDir`, and the `[[services.production.rewrites]]` block
- Kept only the `build` step: `pnpm --filter @workspace/apex-grid run build`
- apex-grid still generates `dist/public/` during deployment, but registers no static handler

**api-server** (`artifacts/api-server/.replit-artifact/artifact.toml`):
- Changed `paths = ["/api"]` → `paths = ["/"]`
- ALL production traffic now routes to port 8080 (Express)
- `express.static(staticRoot)` resolves `/structural-engineering/` → `dist/public/structural-engineering/index.html` ✓
- `/api/*` routes through the Express router ✓
- SPA catch-all serves `dist/public/index.html` for React client-side routes ✓
- Healthcheck path: `path = "/api/healthz"` — still works since Express handles all paths now

## How to Apply
- **Never add `serve = "static"` + SPA rewrite to apex-grid** — it will break production static serving again
- The `express.static` middleware in `api-server/src/app.ts` MUST come before `app.use("/api", router)`
- `staticRoot` is resolved via `import.meta.url`: `path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../apex-grid/dist/public")`
- If apex-grid production config is ever changed, verify `serve` is NOT set to `"static"` with a catch-all rewrite
- Dev still works: apex-grid Vite dev server handles `/` in dev; api-server handles `/api` in dev. Dev and prod routing differ — always verify static page serving in production via GSC Live Test after deploys, not just curl to port 8080.

## Verification
After any deploy, confirm in GSC URL Inspection → Live Test:
- `https://apexgrideng.com/structural-engineering/` must show the real page title (not "MEP, Structural & Civil Engineering Firm"), 
- `Page availability` must say "Page is available to Google" (not Soft 404)
