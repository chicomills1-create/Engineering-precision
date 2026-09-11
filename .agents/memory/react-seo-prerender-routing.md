---
name: React SEO prerender routing
description: Constraints for build-time React SEO output and production static routing.
---

Finite public React marketing routes should be rendered from the real components at build time, then audited only after prerendering has written the final HTML.

**Why:** Generator-time audits run before React-derived HTML exists and can report stale metadata or inbound links. Browser-oriented routing hooks also fail under React server rendering unless both pathname and search hooks are server-safe. In production, a slashless canonical can silently receive the generic SPA shell when static middleware only resolves the trailing-slash directory form.

**How to apply:** Run strict sitemap, canonical, H1, duplicate-title, and normalized internal-link checks against the final prerender output. Keep browser and SSR routing hooks separate. Before SPA fallback, serve an exact safe `<route>/index.html` for extensionless requests without changing the canonical URL.