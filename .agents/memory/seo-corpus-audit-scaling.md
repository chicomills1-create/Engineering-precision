---
name: SEO corpus audit scaling
description: Reliability and reporting rules for auditing the large generated SEO corpus and interpreting Search Console data.
---

Full-corpus SEO audits must process generated HTML in bounded batches and retain only extracted metadata and normalized link sets. Never keep every complete page document in memory.

**Why:** The generated corpus is hundreds of megabytes. Holding all HTML until duplicate and orphan analysis finishes can exhaust Node memory or exceed a request timeout.

**How to apply:** Extract title, description, audit findings, and outbound paths while each batch is in memory; discard the HTML immediately and persist large issue sets in bounded database batches.

Search Console property totals must come from a separate Search Analytics query without page or query dimensions. Top-page rows are not equivalent to site totals, and average position must not be computed as a plain average of page averages.

**Why:** Capped page/query results materially undercount a large site and unweighted averages misstate Google performance.

**How to apply:** Persist an explicit site-level row for each reporting period and use it for headline clicks, impressions, CTR, and position. Label dimension-capped tables as top rows rather than totals.