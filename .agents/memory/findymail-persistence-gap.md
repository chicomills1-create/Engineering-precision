---
name: FindyMail persistence gap
description: Why provider credit usage cannot be reconciled from the outreach database alone.
---

FindyMail searches have no database-backed request, response, or credit-usage ledger. Only successful results that survive domain, suppression, and duplicate checks are persisted on prospects; bulk imports may also retain row provenance.

**Why:** A production audit found substantial reported provider credit usage on a day with no new or updated prospects, verification timestamps, import rows, or staging records. The database could not identify which searches consumed those credits or why individual results were rejected.

**How to apply:** Do not infer successful acquisition from FindyMail credit consumption. Reconcile provider usage only after adding a non-sensitive request outcome ledger that records timestamps, prospect/company references, outcome categories, and whether a verified result was persisted.