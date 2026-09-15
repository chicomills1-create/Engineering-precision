---
name: Direct-to-dist SEO builds
description: Performance tradeoff and safety requirements for generating the large SEO corpus in the publish artifact.
---

Production builds generate the SEO corpus directly into the publish artifact after Vite clears it. Keep development generation pointed at the source public tree, and make corpus audits/tests accept an explicit output root so they validate the artifact being published.

**Why:** The source public tree is roughly 764 MB with about 29,340 HTML files. Direct generation removes Vite's full public-tree copy from production composition, but the measured local build increased from about 74 seconds to 149 seconds because full SEO regeneration replaced the copy step. Final artifact size remains roughly 780 MB because production still serves every page. Only an actual Publish measurement can determine whether Promote improves overall.

**How to apply:** Preserve the two static HTML files that are not generated, copy non-HTML public assets before generation, run React prerender only against dist during production, and require route-count, sitemap-hash, corpus, claims, similarity, and typecheck gates against dist before publishing.