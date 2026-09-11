---
name: SEO generator path ownership
description: How to avoid retaining stale static-generator output for routes also owned by React prerendering.
---

Every generated route must have one output owner. React owns shared application hubs, while the large SEO generator may own static child pages beneath those hubs without replacing the hub HTML.

**Why:** Letting both pipelines write the same route caused SEO-only regeneration to replace canonical React output and create unrelated file churn.

**How to apply:** Declare new prerendered or generated route families in the shared ownership registry. Preserve a React-owned hub when clearing generator-owned children, and run the standard typecheck plus regeneration when route ownership changes.