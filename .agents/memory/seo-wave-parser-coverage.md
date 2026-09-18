---
name: SEO wave parser coverage
description: Why direct SEO generation must follow standalone TypeScript validation for answer-wave batches.
---

Standalone TypeScript validation does not reliably parse every SEO wave module. Treat a passing `tsc --noEmit` as insufficient and always run direct SEO generation before the production build.

**Why:** A batch with malformed array boundaries passed standalone TypeScript validation but failed repeatedly when `tsx seo/generate.ts` imported and transformed the wave module.

**How to apply:** For answer-wave integrations, preserve the gate order: standalone TypeScript, direct SEO generation, production build, then the standalone audits and built-output sitemap validation.