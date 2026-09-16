---
name: Sitemap exact-URL status
description: Prevents canonical-looking sitemap URLs from being intercepted by production legacy redirects.
---

Every sitemap URL must return HTTP 200 at the exact listed URL when redirects are not followed. A generated self-canonical HTML file is insufficient if the server's legacy redirect registry intercepts the route first.

Every legacy redirect target must also exist as generated HTML, return 200, remain indexable and self-canonical, and contain substantive visible content. Redirect manifests must list reviewed service children explicitly; do not infer a complete service subtree from a city landing redirect because many directory cities have no generated service children.

**Why:** City expansion records can retain an old slug even after the canonical city dataset and server redirects move to a normalized slug. Static corpus audits then see valid HTML while production returns 301 and Search Console reports “Page with redirect.”

**How to apply:** After generation and prerendering, compare all sitemap paths with the complete generated redirect registry and run the no-follow HTTP validator over every sitemap URL. Validate every redirect target against the generated corpus. Preserve legacy redirects, but never emit their source paths in a sitemap.