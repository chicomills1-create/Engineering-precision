---
name: API healthcheck root
description: Deployment healthchecks probe the API artifact's root path, not /healthz
---
Deployment healthchecks for the api-server artifact probe its preview root (`/api`), not `/api/healthz`. The Express router mounted at `/api` must answer 200 at `GET /`.

**Why:** A deploy showed endless `healthcheck /api returned status 500/404` even though `/api/healthz` was fine.

**How to apply:** When adding or restructuring API routes, keep a root `GET /` handler on the API router returning 200. (Prod no longer requires TURNSTILE_SECRET_KEY to boot — missing keys now just disable the callback assistant; see callback-bot-gate.)
