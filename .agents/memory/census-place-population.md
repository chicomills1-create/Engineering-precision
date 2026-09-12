---
name: Census place population refresh
description: Reliable keyless source for nationwide incorporated-place population data.
---

Use the Census downloadable ACS five-year B01003 table-based summary file for nationwide place populations, joined to Gazetteer records by the seven-digit state-plus-place GEOID. When ACS reports zero or omits a Gazetteer place, use the downloadable annual Population Estimates city/subcounty file as the official fallback.

**Why:** Keyless Census API requests redirect to an HTML “missing key” page, which breaks JSON population refreshes. ACS encodes some very small places as zero and can lag new or changed geographies; the official Population Estimates download distinguishes positive estimates from confirmed zeros.

**How to apply:** Prefer positive ACS values. Otherwise match the Population Estimates place summary by exact GEOID; use explicit reviewed crosswalks for renamed/reclassified geographies, never fuzzy joins. Store zero as confirmed zero, and keep unmatched new places unavailable/noindex rather than inferring a value.