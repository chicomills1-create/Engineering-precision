---
name: Large static corpus in Vite
description: Why generated SEO trees must be excluded from Vite's development file watcher.
---

Generated SEO corpora at the scale of tens of thousands of HTML files must remain available to Vite's public-file server but be excluded from hot-reload file watching.

**Why:** At roughly 25,000 generated pages, Vite exhausted the Linux file-watcher limit and the web workflow crashed with `ENOSPC`. Disabling the public directory would also break direct development previews of static SEO routes, so watcher exclusion is the safe boundary.

**How to apply:** Whenever a new generated static route family is added, include its public-directory glob in the Vite watcher ignore list and restart the web workflow to confirm it stays running. Keep the static directory-index middleware aware of new top-level route families.