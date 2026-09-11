---
name: SEO generator path ownership
description: How to avoid retaining stale static-generator output for routes also owned by React prerendering.
---

Some hub routes are written by both the large SEO generator and the React prerender build. After running the SEO generator, finish with the production build so the checked-in HTML for shared routes reflects the canonical React render.

**Why:** The SEO generator can replace React-owned hub pages with a different static template even when a task only targets deep generated pages. The subsequent production build restores those shared routes while preserving generated deep-page output.

**How to apply:** After SEO regeneration, inspect changed paths outside the intended generated family, run the configured production build, and confirm only intended generated pages remain changed.