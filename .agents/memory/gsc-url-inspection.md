---
name: GSC URL inspection
description: Durable constraints for Google Search Console indexing checks on the admin SEO page
---

- No Replit connector exists for Google Search Console; auth requires a Google service-account JSON key (`GOOGLE_SERVICE_ACCOUNT_KEY` secret) whose email is added as a user on the `sc-domain:apexgrideng.com` property.
- The Google service-account key is only for the optional GSC URL Inspection verdict feature; IndexNow uses its separate public-site key file and does not require this secret.
- **Why batched:** URL Inspection API quota is ~2,000 requests/day per property; with 4,200+ sitemap URLs, only capped batches are viable — never inspect everything at once.
- **Verdict semantics:** PASS and PARTIAL mean the URL is on Google (PARTIAL = indexed with issues); NEUTRAL is the non-error "not on Google" outcome and FAIL the error one — both are not-indexed. Only missing/VERDICT_UNSPECIFIED is unknown. Getting NEUTRAL wrong falsely reports unindexed pages as indexed.
