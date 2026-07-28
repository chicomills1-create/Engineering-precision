---
name: Callback assistant bot gate
description: How Turnstile bot verification works on the public callback-chat endpoint and its dev-key fallback
---

The public callback-chat endpoint is gated by Cloudflare Turnstile: first message must carry a `botToken`, verified server-side via siteverify; success mints a 30-min HMAC conversation stamp (signed with SESSION_SECRET, bound to a random conversation ID + caller IP hash, capped at ~25 turns) that the client echoes on later turns so each conversation needs only one challenge. In production the server fails startup if TURNSTILE_SECRET_KEY or SESSION_SECRET is missing.

**Why:** distributed bots could bypass per-IP rate limiting and rack up AI costs/junk leads; a single-use token per conversation plus a signed stamp keeps the endpoint stateless.

**How to apply:** without `TURNSTILE_SECRET_KEY` / `VITE_TURNSTILE_SITE_KEY`, Cloudflare's documented always-pass test keys are used — fine for dev, but real keys must be set before production or the gate is decorative. Requests without a valid token/stamp get 403.
