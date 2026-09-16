---
name: SEO generator cleanup ordering
description: Prevent later parent-directory rebuilds from deleting newly generated nested SEO pages and discovery links.
---

Generate nested static additions only after the generator's final cleanup or rebuild of their parent directory.

**Why:** A batch added valid sitemap entries and initially wrote detail pages plus inbound links, but a later parent-tree `rmSync` and hub rebuild silently deleted the HTML and overwrote those links while leaving the sitemap intact.

**How to apply:** Before choosing an insertion point in a large generator, search for every cleanup of the route's parent tree. Place detail-page and inbound-link writes after the last cleanup, then run generation twice and verify the HTML files, exact sitemap counts, and exact inbound-marker counts.