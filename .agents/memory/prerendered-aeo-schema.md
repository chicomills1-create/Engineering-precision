---
name: Prerendered AEO schema
description: Ensures answer-engine structured data is present in final static HTML and matches visible page content.
---

Critical SEO/AEO JSON-LD must be emitted during server rendering, not only injected after hydration. Every FAQ question and answer in schema must also appear visibly on the page. New answer-page waves require an immediately post-byline 40–60 word direct answer, natural-language question H2s, semantic data lists or tables, and HowTo JSON-LD when visible sections explain a process.

**Why:** The React JSON-LD helper uses a browser effect, so the UI can look correct while the prerendered HTML contains no schema for crawlers. A batch audit caught this mismatch across all canonical industry pages.

**How to apply:** For each SEO/AEO batch, inspect and audit final `dist/public` HTML. Require parseable schema, visible/schema answer parity, canonical and robots correctness, unique metadata, one H1, and contextual inbound links from relevant established pages before expanding the batch.