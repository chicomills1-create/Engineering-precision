---
name: Census place population refresh
description: Reliable keyless source for nationwide incorporated-place population data.
---

Use the Census downloadable ACS five-year B01003 table-based summary file for nationwide place populations, joined to Gazetteer records by the seven-digit state-plus-place GEOID.

**Why:** Keyless Census API requests redirect to an HTML “missing key” page, which breaks JSON population refreshes. The official downloadable table remains available without credentials and covers nearly every active incorporated place.

**How to apply:** Parse GEO_ID rows beginning with 1600000US, map B01003_E001 to the Gazetteer GEOID, retain the ACS year and source URL, and preserve a prior population only when the current table lacks an estimate.