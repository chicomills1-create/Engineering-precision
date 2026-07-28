---
name: SendGrid lead notification emails
description: Constraints and config for inquiry notification emails via the SendGrid connector
---

- Lead notification addresses come from env vars `LEAD_NOTIFY_EMAIL` (to) and `LEAD_NOTIFY_FROM_EMAIL` (from, defaults to recipient).
- **Rule:** SendGrid only sends from verified sender identities; unverified senders get a 403 (logged, non-fatal — the lead is still stored).
- **Why:** SendGrid sender-identity policy; cannot be bypassed in code.
- **How to apply:** If lead emails aren't arriving, check verified senders via connector proxy `GET /v3/verified_senders` from the api-server package dir (the sandbox's `listConnections('sendgrid')` returns empty in this project).
- `/v3/mail/send` success is 202 with an empty body — never call `.json()` on it.
- If SendGrid returns 400 "from email does not contain a valid address", check `LEAD_NOTIFY_FROM_EMAIL` in `.replit`/env for a malformed value before touching code — the send path is fine.
- Subscriber welcome emails reuse the same from-address env vars; sent fire-and-forget only on first-time signups (insert `.returning()` detects duplicates).
- The quarterly state-review email (apex-grid `seo:review:email`) reuses the same connector and falls back to the same env vars; it hits the same sender-verification 403 until a verified sender is configured.
- api-zod uses composite TS project refs: after api-zod schema changes, rebuild declarations with `tsc -b lib/api-zod` or dependent typechecks fail on stale `dist/` d.ts files.
