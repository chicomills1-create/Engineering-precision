---
name: Callback assistant bot gate
description: How Turnstile bot verification works on the public callback-chat endpoint, its dev-key fallback, and the disabled-in-prod state
---

The public callback-chat endpoint is gated by Cloudflare Turnstile: first message must carry a `botToken`, verified server-side via siteverify; success mints a 30-min HMAC conversation stamp (signed with SESSION_SECRET, bound to a random conversation ID + caller IP hash, capped at ~25 turns) that the client echoes on later turns so each conversation needs only one challenge.

**Current state (Aug 2026, owner decision):** the assistant is DISABLED in production when TURNSTILE_SECRET_KEY or SESSION_SECRET is missing — the server boots normally, logs a warning, and the callback-chat routes return 503 (`CALLBACK_ASSISTANT_ENABLED` flag in botVerification). The frontend widget render in Shell is commented out. To re-enable: set TURNSTILE_SECRET_KEY + VITE_TURNSTILE_SITE_KEY, restore the two marked Shell lines, republish.

**Why:** distributed bots could bypass per-IP rate limiting and rack up AI costs/junk leads; the owner chose to launch without the assistant rather than set up Turnstile immediately, so disable-cleanly replaced fail-at-boot.

**How to apply:** in dev, Cloudflare's documented always-pass test keys are used — fine for dev only. When enabled, requests without a valid token/stamp get 403.
