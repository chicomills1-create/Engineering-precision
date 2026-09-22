# Apex Render env-var audit

66 keys total across 3 services. `PUT /v1/services/{id}/env-vars` is FULL-REPLACE —
each service payload in env-payload.json is complete (includes already-set keys).

Service IDs:
- apex-grid-app: srv-daoomugae00c73ccccc0 (currently 2/44 set: NODE_ENV, NODE_VERSION)
- apex-outreach-0800: crn-daoon3ff3r2c73dfpeh0 (currently 0/11 set, suspended)
- apex-outreach-0830: crn-daoon3ff3r2c73dfpee0 (currently 0/11 set, suspended)

## Keys needing Jeremy (57)

### apex-grid-app (41 keys)
- `DATABASE_URL` — Neon prod (ep-snowy-resonance-ax38m1ci.c-4.us-east-2.aws.neon.tech/neondb). Copy password from Replit deploy secrets. NOTE: prod password was exposed in a Replit terminal 9/21 — rotation pending Jeremy's decision; after rotation, update this value too.
- `CLERK_PUBLISHABLE_KEY` — Secret/config value lives in the Replit deployment secrets panel (masked). Copy read-only from there; do not change anything in Replit.
- `CLERK_SECRET_KEY` — Secret/config value lives in the Replit deployment secrets panel (masked). Copy read-only from there; do not change anything in Replit.
- `SESSION_SECRET` — Secret/config value lives in the Replit deployment secrets panel (masked). Copy read-only from there; do not change anything in Replit.
- `ADMIN_EMAILS` — Secret/config value lives in the Replit deployment secrets panel (masked). Copy read-only from there; do not change anything in Replit.
- `OUTREACH_AUTOMATION_ENABLED` — Secret/config value lives in the Replit deployment secrets panel (masked). Copy read-only from there; do not change anything in Replit.
- `OUTREACH_CAMPAIGN_KEY` — Secret/config value lives in the Replit deployment secrets panel (masked). Copy read-only from there; do not change anything in Replit.
- `OUTREACH_CONFIG_BOOTSTRAP_ENABLED` — Secret/config value lives in the Replit deployment secrets panel (masked). Copy read-only from there; do not change anything in Replit.
- `OUTREACH_CONFIG_V2_BOOTSTRAP_ENABLED` — Secret/config value lives in the Replit deployment secrets panel (masked). Copy read-only from there; do not change anything in Replit.
- `OUTREACH_DISCOVERY_DAILY_CAP` — Secret/config value lives in the Replit deployment secrets panel (masked). Copy read-only from there; do not change anything in Replit.
- `OUTREACH_FROM_EMAIL` — REQUIRED by code (throws 'OUTREACH_FROM_EMAIL is not configured' if unset). Copy from Replit secrets.
- `OUTREACH_REPLY_PATH_VERIFIED` — Secret/config value lives in the Replit deployment secrets panel (masked). Copy read-only from there; do not change anything in Replit.
- `OUTREACH_REPLY_TO_EMAIL` — Falls back to OUTREACH_FROM_EMAIL in code if unset, but declared in blueprint — copy from Replit secrets.
- `OUTREACH_REPLY_WEBHOOK_TOKEN` — Secret/config value lives in the Replit deployment secrets panel (masked). Copy read-only from there; do not change anything in Replit.
- `OUTREACH_RESEARCH_AUTOMATION_ENABLED` — Secret/config value lives in the Replit deployment secrets panel (masked). Copy read-only from there; do not change anything in Replit.
- `OUTREACH_SEED_VERIFIED_BATCH` — Secret/config value lives in the Replit deployment secrets panel (masked). Copy read-only from there; do not change anything in Replit.
- `OUTREACH_VERIFICATION_BATCH_CAP` — Secret/config value lives in the Replit deployment secrets panel (masked). Copy read-only from there; do not change anything in Replit.
- `SENDGRID_DEDICATED_API_KEY` — Secret/config value lives in the Replit deployment secrets panel (masked). Copy read-only from there; do not change anything in Replit.
- `SENDGRID_EVENT_FORWARD_URL` — Secret/config value lives in the Replit deployment secrets panel (masked). Copy read-only from there; do not change anything in Replit.
- `SENDGRID_EVENT_PATH_VERIFIED` — Secret/config value lives in the Replit deployment secrets panel (masked). Copy read-only from there; do not change anything in Replit.
- `SENDGRID_EVENT_WEBHOOK_PUBLIC_KEY` — Secret/config value lives in the Replit deployment secrets panel (masked). Copy read-only from there; do not change anything in Replit.
- `SENDGRID_ISOLATION_VERIFIED` — Code checks === 'true' to use the dedicated key. Expected 'true'; confirm from Replit secrets.
- `SENDGRID_SUBUSER_USERNAME` — Could not retrieve via SendGrid API (403 on /v3/subusers with the connected key). Copy from Replit secrets.
- `SENDGRID_SUBUSER_VERIFIED` — Code checks === 'true' as alternate readiness path. Expected 'true'; confirm from Replit secrets.
- `UNSUBSCRIBE_SECRET` — Secret/config value lives in the Replit deployment secrets panel (masked). Copy read-only from there; do not change anything in Replit.
- `LEAD_NOTIFY_EMAIL` — Secret/config value lives in the Replit deployment secrets panel (masked). Copy read-only from there; do not change anything in Replit.
- `LEAD_NOTIFY_FROM_EMAIL` — Secret/config value lives in the Replit deployment secrets panel (masked). Copy read-only from there; do not change anything in Replit.
- `STATUS_NOTIFICATION_FROM_EMAIL` — Secret/config value lives in the Replit deployment secrets panel (masked). Copy read-only from there; do not change anything in Replit.
- `STATUS_NOTIFICATION_REPLY_TO_EMAIL` — Secret/config value lives in the Replit deployment secrets panel (masked). Copy read-only from there; do not change anything in Replit.
- `PUBLIC_SITE_URL` — Coordinator decision: pre-cutover use the Render service URL or keep https://apexgrideng.com (Replit prod value). Blueprint comment says update to apexgrideng.com after DNS cutover.
- `TURNSTILE_SECRET_KEY` — Secret/config value lives in the Replit deployment secrets panel (masked). Copy read-only from there; do not change anything in Replit.
- `LINKEDIN_API_VERSION` — Secret/config value lives in the Replit deployment secrets panel (masked). Copy read-only from there; do not change anything in Replit.
- `LINKEDIN_OFFICIAL_ACCESS_TOKEN` — Secret/config value lives in the Replit deployment secrets panel (masked). Copy read-only from there; do not change anything in Replit.
- `LINKEDIN_OFFICIAL_CLIENT_SECRET` — Secret/config value lives in the Replit deployment secrets panel (masked). Copy read-only from there; do not change anything in Replit.
- `LINKEDIN_OFFICIAL_ORGANIZATION_ID` — Secret/config value lives in the Replit deployment secrets panel (masked). Copy read-only from there; do not change anything in Replit.
- `LINKEDIN_OFFICIAL_PROVIDER_APPROVED` — Secret/config value lives in the Replit deployment secrets panel (masked). Copy read-only from there; do not change anything in Replit.
- `LINKEDIN_OFFICIAL_PROVIDER_ENABLED` — Secret/config value lives in the Replit deployment secrets panel (masked). Copy read-only from there; do not change anything in Replit.
- `LINKEDIN_OFFICIAL_SCOPES` — Secret/config value lives in the Replit deployment secrets panel (masked). Copy read-only from there; do not change anything in Replit.
- `GOOGLE_SERVICE_ACCOUNT_KEY` — Secret/config value lives in the Replit deployment secrets panel (masked). Copy read-only from there; do not change anything in Replit.
- `PRIVATE_OBJECT_DIR` — Secret/config value lives in the Replit deployment secrets panel (masked). Copy read-only from there; do not change anything in Replit.
- `PUBLIC_OBJECT_SEARCH_PATHS` — Secret/config value lives in the Replit deployment secrets panel (masked). Copy read-only from there; do not change anything in Replit.

### apex-outreach-0800 (8 keys)
- `DATABASE_URL` — Neon prod (ep-snowy-resonance-ax38m1ci.c-4.us-east-2.aws.neon.tech/neondb). Copy password from Replit deploy secrets. NOTE: prod password was exposed in a Replit terminal 9/21 — rotation pending Jeremy's decision; after rotation, update this value too.
- `OUTREACH_CAMPAIGN_KEY` — Secret/config value lives in the Replit deployment secrets panel (masked). Copy read-only from there; do not change anything in Replit.
- `SENDGRID_DEDICATED_API_KEY` — Secret/config value lives in the Replit deployment secrets panel (masked). Copy read-only from there; do not change anything in Replit.
- `SENDGRID_SUBUSER_USERNAME` — Could not retrieve via SendGrid API (403 on /v3/subusers with the connected key). Copy from Replit secrets.
- `SENDGRID_SUBUSER_VERIFIED` — Code checks === 'true' as alternate readiness path. Expected 'true'; confirm from Replit secrets.
- `OUTREACH_FROM_EMAIL` — REQUIRED by code (throws 'OUTREACH_FROM_EMAIL is not configured' if unset). Copy from Replit secrets.
- `OUTREACH_REPLY_TO_EMAIL` — Falls back to OUTREACH_FROM_EMAIL in code if unset, but declared in blueprint — copy from Replit secrets.
- `UNSUBSCRIBE_SECRET` — Secret/config value lives in the Replit deployment secrets panel (masked). Copy read-only from there; do not change anything in Replit.

### apex-outreach-0830 (8 keys)
- `DATABASE_URL` — Neon prod (ep-snowy-resonance-ax38m1ci.c-4.us-east-2.aws.neon.tech/neondb). Copy password from Replit deploy secrets. NOTE: prod password was exposed in a Replit terminal 9/21 — rotation pending Jeremy's decision; after rotation, update this value too.
- `OUTREACH_CAMPAIGN_KEY` — Secret/config value lives in the Replit deployment secrets panel (masked). Copy read-only from there; do not change anything in Replit.
- `SENDGRID_DEDICATED_API_KEY` — Secret/config value lives in the Replit deployment secrets panel (masked). Copy read-only from there; do not change anything in Replit.
- `SENDGRID_SUBUSER_USERNAME` — Could not retrieve via SendGrid API (403 on /v3/subusers with the connected key). Copy from Replit secrets.
- `SENDGRID_SUBUSER_VERIFIED` — Code checks === 'true' as alternate readiness path. Expected 'true'; confirm from Replit secrets.
- `OUTREACH_FROM_EMAIL` — REQUIRED by code (throws 'OUTREACH_FROM_EMAIL is not configured' if unset). Copy from Replit secrets.
- `OUTREACH_REPLY_TO_EMAIL` — Falls back to OUTREACH_FROM_EMAIL in code if unset, but declared in blueprint — copy from Replit secrets.
- `UNSUBSCRIBE_SECRET` — Secret/config value lives in the Replit deployment secrets panel (masked). Copy read-only from there; do not change anything in Replit.

## Self-sourced (9)

- `NODE_VERSION=24`, `NODE_ENV=production` — verified live on the Render web service via API.
- `LOG_LEVEL=info` — verified code default (`artifacts/api-server/src/lib/logger.ts`: `process.env.LOG_LEVEL ?? "info"`).

## Apply

```bash
cd ~/workspace/skills/render
bin/render-api PUT /v1/services/srv-daoomugae00c73ccccc0/env-vars @env-apex-grid-app.json
bin/render-api PUT /v1/services/crn-daoon3ff3r2c73dfpeh0/env-vars @env-apex-outreach-0800.json
bin/render-api PUT /v1/services/crn-daoon3ff3r2c73dfpee0/env-vars @env-apex-outreach-0830.json
```
env-payload.json is the combined reference; env-<service>.json files are the bare arrays ready to PUT.
Each PUT triggers a redeploy of that service — web will restart with migrations; crons stay suspended.
