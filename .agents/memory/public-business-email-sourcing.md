---
name: Public business email sourcing
description: Multi-method discovery and verification rules for the 2,027-contact outreach cohort.
---

Treat email-finder APIs as fallback tools, not the definition of a verified contact. A publicly displayed official-domain named or role-based business email can qualify when its company, source URL, and relevance are documented and it passes validation and production-history checks. Accept relevant role mailboxes such as estimating, bids, proposals, procurement, preconstruction, business development, development, construction, projects, contact, office, admin, and info.

Apply contact-confidence requirements after lane classification: named contacts require high confidence, while evidence-backed official role mailboxes qualify through publication evidence and must not be removed by a global high-confidence query filter.

Use Candelaria Design as a target-profile example for luxury custom residential outreach. Include architect-led luxury residential studios, custom home designers, high-end builders, and design-build firms even when they are not categorized strictly as homebuilders.

**Why:** The outreach cohort must continue growing when one enrichment provider reaches a quota. Rejecting public company addresses solely because they did not come from a finder API unnecessarily blocks legitimate contacts. A global named-confidence prefilter once hid an otherwise eligible public fallback pool and caused full staging shortfalls.

**How to apply:** Run company discovery, public email discovery, verification, lane classification, and deduplication as separate stages. Search official websites and documents first, then reliable public directories and indexed documents, then enrichment. Keep coarse database candidate queries lane-neutral and let the shared eligibility validator apply lane-specific confidence rules. For luxury residential prospects, use firm portfolio, services, and positioning—not only directory industry labels—to identify Candelaria-like firms. Never infer addresses from naming patterns. Skip unresolved companies and continue to new businesses until the completed cohort reaches 2,027.