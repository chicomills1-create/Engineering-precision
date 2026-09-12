---
name: Outreach acquisition versus sending
description: Keeps research throughput independent from the four-lane daily send contract.
---

Lead acquisition and email sending are separate pipelines. Discovery or verification failure must be logged but must not stop preparation and dispatch from draining already-eligible database inventory.

**Why:** The 400-email daily requirement is a send target of four independent 100-message lanes. Treating a discovery batch limit as a send limit silently lowers delivery and misreports inventory shortages.

**How to apply:** Keep discovery and verification limits configurable and bounded. Keep send quotas authoritative at 100 Public, 100 Verified, 100 Hit Market, and 100 September Hot. Never weaken suppression, deduplication, opt-out, evidence, campaign, provider, or ambiguous-send safeguards.