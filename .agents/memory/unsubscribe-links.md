---
name: Signed unsubscribe links
description: How unsubscribe tokens are signed and the db schema-drift gotcha
---
- Unsubscribe tokens are deterministic HMAC-SHA256 over the lowercased email, signed with `UNSUBSCRIBE_SECRET` falling back to `SESSION_SECRET`. **Why:** deterministic tokens keep every previously sent email link valid without storing tokens. **How to apply:** rotating those secrets invalidates all links already sent in emails.
- Welcome emails carry the tokenized link plus RFC 8058 `List-Unsubscribe` / `List-Unsubscribe-Post` headers; the one-click POST target is the frontend page, not the API.
- `PUBLIC_SITE_URL` is set in the production environment to the live domain so email links point at production. **How to apply:** production env var changes only take effect after the next publish.
- Gotcha found while testing: drizzle schema changes (e.g. `subscribers.unsubscribed_at`) are NOT auto-applied to the dev DB — run `pnpm --filter @workspace/db run push` (or check `\d table` in psql) when queries fail with "column does not exist"-style errors.
