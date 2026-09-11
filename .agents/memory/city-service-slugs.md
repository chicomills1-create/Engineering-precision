---
name: City service slug consistency
description: Prevent service-support metadata from suppressing valid city canonicals.
---

City service-support metadata and route-ownership filters must use the same canonical slug vocabulary as the service registry.

**Why:** A semantic alias for energy compliance did not match the actual energy-code route slug. Generation still succeeded, but reviewed city pages remained noindex and disappeared from the sitemap until the mismatch was detected through corpus totals.

**How to apply:** When adding or renaming a service identifier, compare support metadata, specialty-route filtering, generated paths, sitemap output, and robots state together. Treat a material drop in indexable totals as a failed rollout even if canonical and sitemap audits report no structural errors.