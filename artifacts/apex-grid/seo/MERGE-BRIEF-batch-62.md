# MERGE BRIEF — SEO batch 62 → main → publish

READ THIS FILE FIRST. It survives chat compaction; the chat thread may not.

## What this is

Branch `seo-batch-imit-62` contains the complete, validated SEO/AEO answer-page
batch 62 for apexgrideng.com, built on top of `seo-batch-ieil-61` (batches ≤61).

- Base: `seo-batch-ieil-61` (batches ≤61 — NOTE: if batches 59/60/61 were never
  merged to main separately, this branch chains on them, so merging this branch
  brings their 288 pages too)
- Contents: 8 new wave files, **96 unique answer pages**, 0 duplicate slugs
  (12 pages per wave):
  - `wave-im-answer-pages.ts` — Oklahoma Crossroads Engineering (12 pages: OKC expansive clay, OKC vs Oklahoma County plan review, Tulsa tornado shelters/saferooms, induced seismicity, Norman expansive soils, Edmond stormwater, Tulsa historic retrofit, ice-storm resilience, Broken Arrow site development, OKC school storm shelters, Moore tornado standards, rural county subdivision…)
  - `wave-in-answer-pages.ts` — Ozark Highlands Engineering (12 pages: Springfield MO karst, Springfield vs Greene County review, Joplin tornado rebuild standards, Branson tourism commercial, Fayetteville AR karst stormwater, Table Rock lakefront walls, Bentonville growth infrastructure, dolomite excavation, Table Rock floodplain, Rogers expansive soils, hillside homes, septic-to-sewer conversion…)
  - `wave-io-answer-pages.ts` — Permian Basin Energy Engineering (12 pages: Midland caliche, Midland vs Midland County review, Odessa industrial, dust-storm envelopes, man-camp housing, produced-water facilities, commercial site civil, H2S setbacks, playa floodplain, Odessa expansive clay, wind erosion, oilfield service yards…)
  - `wave-ip-answer-pages.ts` — Texas Borderlands Engineering (12 pages: El Paso desert soils, El Paso vs El Paso County review, Laredo border warehouses, McAllen extreme heat, Rio Grande floodplain, Brownsville hurricane wind, colonia infrastructure, El Paso monsoon detention, Harlingen commercial, caliche roadways, border industrial parks, RGV expansive clay…)
  - `wave-iq-answer-pages.ts` — Puerto Rico and Caribbean Engineering (12 pages: San Juan hurricane wind, OGPe permit process, PR seismic, concrete masonry, microgrid resilience, Ponce floodplain, Caribbean corrosion, hillside foundations, San Juan historic retrofit, school hurricane shelters, Mayaguez coastal erosion, rainwater harvesting…)
  - `wave-ir-answer-pages.ts` — Tribal Nations Engineering (12 pages: Navajo Nation permit sovereignty, tribal land vs county permitting, Navajo off-grid water/septic, Cherokee Nation commercial, THPO cultural review, BIA roads access, Oglala Lakota housing, Choctaw facility standards, tribal health-clinic MEP, remote power resilience, Navajo expansive soils, tribal casino-resort structures…)
  - `wave-is-answer-pages.ts` — House of Worship Engineering (12 pages: sanctuary long-span structures, worship acoustics, fellowship-hall kitchens, steeple restoration, assembly-occupancy egress, church parking stormwater, HVAC noise control, classroom-addition permitting, historic church seismic retrofit, mosque prayer halls, synagogue security upgrades, parsonage ADUs…)
  - `wave-it-answer-pages.ts` — Tilt-Up Logistics Engineering (12 pages: tilt-up warehouse structures, DFW logistics parks, panel erection, ESFR fire protection, Inland Empire permitting, truck-court pavements, Atlanta logistics corridors, dock levelers, unincorporated-county industrial entitlements, flex combos, cold storage, Indianapolis hubs…)
- Every wave is registered in `artifacts/apex-grid/seo/generate.ts`
  (imports + ALL_AEO_PAGES spreads + render loops) — verified before handoff.

## Pre-merge validation (already done by the site owner — spot-check, don't redo)

- `grep -c '^];'` on every wave file = exactly 1 (no orphaned array closers).
- All 8 waves pass esbuild: 8 passed, 0 failed. generate.ts passes esbuild.
- generate.ts wiring verified: 8 imports + 8 spreads + 8 render loops present,
  each loop byte-identical in shape to the batch-61 WAVE_IL loop
  (assertSlug + phase0AeoPage + assertPhase0Page + Jeremy Mills author-voice
  check + writeFileSync + pages++).
- 96 slugs unique within batch (96 total, 96 unique) and against all 5,668 live
  /answers/ slugs (checked against the live sitemap + batch-61 slugs 2026-09-20)
  — 0 collisions. (One proposed slug,
  `oklahoma-school-storm-shelter-design`, collided with an existing live slug
  and was renamed to `oklahoma-school-storm-shelter-engineering` before push.)
- No double spaces inside string content, no tabs, no trailing whitespace in any
  wave file (the build audit `seo:audit:corpus` fails on whitespace divergence
  between visible FAQ HTML and raw JSON-LD — this is what broke the batch-59/60
  publish).
- All extraLinks hrefs point at existing /answers/ slugs or /estimate.
- Jurisdiction-intent angle woven in where natural (city vs unincorporated
  county/parish permitting, tribal AHJ sovereignty, plan-check portals,
  submittal paths, AHJ-specific review boards). No PE claims, no invented code
  section numbers, no permit-approval promises.

## Steps (in order, stop and report if any step fails — do not skip)

1. `git checkout main && git pull && git merge --no-ff seo-batch-imit-62`
2. Run the full test suite. All tests must pass (247 passed is the standing
   baseline; report the actual number).
3. Run `seo:generate`. Confirm output = **35,632 pages** (35,536 after batch 61,
   plus this batch's 96). If earlier batches were never merged to main
   separately, this branch carries them too — the target total is 35,632 either
   way (35,248 + 192 + 96 + 96 = 35,632).
4. Confirm the new slugs are registered in the sitemap output.
5. Publish via Replit publish. Monitor the publish until it completes —
   watch for a stalled "Promote" phase and flag it early if it hangs.
   NOTE: a previous batch-58 publish kept running server-side after the browser
   session was lost and completed on its own — if the session drops, verify via
   the live sitemap count + sample pages before assuming failure.
6. Verify LIVE (build-green is NOT shipped):
   - Homepage, `/answers/`, and 3+ sampled new answer pages return 200.
   - Sitemap count increased by ~96 URLs (was 35,171 after batch 61;
     expect ~35,267).
   - Sampled page has correct canonical + schema markup (Article + FAQPage +
     BreadcrumbList JSON-LD).
   - Sampled mobile performance is acceptable.

## Sample pages to verify live

- `/answers/oklahoma-city-expansive-clay-foundation-design/`
- `/answers/springfield-mo-karst-foundation-engineering/`
- `/answers/san-juan-hurricane-wind-structural-design/`
- `/answers/tilt-up-warehouse-structural-design/`

## Constraints (standing, non-negotiable)

- No redesign. Touch only what this merge needs.
- Do not break anything that currently works.
- Do NOT trigger any outreach/email jobs.
- If anything looks risky, stop and report — do not improvise.

## Report back

Deployment ID, generated page total, live sitemap count, sampled 200s,
and anything that failed.
