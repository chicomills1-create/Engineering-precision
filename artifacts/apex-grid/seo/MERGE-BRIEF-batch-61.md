# MERGE BRIEF — SEO batch 61 → main → publish

READ THIS FILE FIRST. It survives chat compaction; the chat thread may not.

## What this is

Branch `seo-batch-ieil-61` contains the complete, validated SEO/AEO answer-page
batch 61 for apexgrideng.com, built on top of `seo-batch-iaid-60` (batches ≤60).

- Base: `seo-batch-iaid-60` (batches ≤60 — NOTE: if batches 59/60 were never
  merged to main separately, this branch chains on them, so merging this branch
  brings their 192 pages too)
- Contents: 8 new wave files, **96 unique answer pages**, 0 duplicate slugs
  (12 pages per wave):
  - `wave-ie-answer-pages.ts` — Pacific Northwest Engineering (12 pages: Seattle URM retrofit, Cascadia subduction seismic, Elliott Bay seawall, Spokane basalt, Tacoma lahar zones, Boise foothills, Vancouver WA vs Clark County permitting…)
  - `wave-if-answer-pages.ts` — Gulf Coast Deep South Engineering (12 pages: New Orleans soft-soil piles, hurricane wind uplift, Baton Rouge expansive clay, Mobile flood elevation, Biloxi elevation certificates, Birmingham tornado safe rooms, New Madrid seismic…)
  - `wave-ig-answer-pages.ts` — Desert Southwest Engineering (12 pages: Phoenix caliche/expansive soils, Phoenix vs Maricopa County plan review, Scottsdale desert-wash floodplain, Tucson monsoon detention, Flagstaff snow loads, Las Vegas caliche, Reno seismic, Santa Fe adobe retrofit, AZ earth fissures…)
  - `wave-ih-answer-pages.ts` — Colorado Front Range Engineering (12 pages: Denver bentonite, Denver CPD review, Boulder wildfire rebuild standards, Colorado Springs expansive soil + frost, hail-resistant roofs, Aspen snow loads, Grand Junction collapsible soils…)
  - `wave-ii-answer-pages.ts` — Upper Midwest Plains Engineering (12 pages: Minneapolis deep frost footings, St. Paul bluff limestone, Des Moines floodplain, KC expansive clay, Omaha loess, Fargo Red River floods, Wichita tornado shelters, Rochester MN karst…)
  - `wave-ij-answer-pages.ts` — Tennessee Valley Mid-South Engineering (12 pages: Nashville karst, Nashville-Davidson consolidated permitting, Memphis New Madrid seismic, Memphis bluff loess, Louisville karst, Huntsville tornado shelters, Paducah Ohio River floods…)
  - `wave-ik-answer-pages.ts` — Carolinas Virginia Engineering (12 pages: Charlotte Piedmont clay, Charlotte vs Mecklenburg County review, Charleston storm surge elevation, Myrtle Beach windborne debris, Norfolk sea-level rise, Asheville Blue Ridge landslides…)
  - `wave-il-answer-pages.ts` — Hawaii Pacific Island Engineering (12 pages: Honolulu basalt foundations, Honolulu DPP review, Waikiki high water table, Maui trade-wind corrosion, Kona lava-tube investigation, Oahu tsunami vertical evacuation, Lahaina wildfire rebuild standards…)
- Every wave is registered in `artifacts/apex-grid/seo/generate.ts`
  (imports + ALL_AEO_PAGES spreads + render loops) — verified before handoff.

## Pre-merge validation (already done by the site owner — spot-check, don't redo)

- `grep -c '^];'` on every wave file = exactly 1 (no orphaned array closers).
- All 8 waves pass esbuild: 8 passed, 0 failed. generate.ts passes esbuild.
- generate.ts wiring verified: 8 imports + 8 spreads + 8 render loops present,
  each loop byte-identical in shape to the batch-60 WAVE_ID loop
  (assertSlug + phase0AeoPage + assertPhase0Page + Jeremy Mills author-voice
  check + writeFileSync + pages++).
- 96 slugs unique within batch (96 total, 96 unique) and against all 5,572 live
  /answers/ slugs (checked against the live sitemap 2026-09-20) — 0 collisions.
- No double spaces, tabs, or trailing whitespace in any wave file (the build
  audit `seo:audit:corpus` fails on whitespace divergence between visible FAQ
  HTML and raw JSON-LD — this is what broke the batch-59/60 publish).
- All extraLinks hrefs point at existing /answers/ slugs or /estimate.
- Jurisdiction-intent angle woven in where natural (city vs unincorporated
  county/parish permitting, plan-check portals, submittal paths, AHJ-specific
  review boards). No PE claims, no invented code section numbers, no
  permit-approval promises.

## Steps (in order, stop and report if any step fails — do not skip)

1. `git checkout main && git pull && git merge --no-ff seo-batch-ieil-61`
2. Run the full test suite. All tests must pass (247 passed is the standing
   baseline; report the actual number).
3. Run `seo:generate`. Confirm output = **35,536 pages** (35,440 after batches
   59+60, plus this batch's 96). If batches 59+60 were never merged to main
   separately, this branch carries them too: expect 35,248 + 192 + 96 = 35,536
   — the target total is the same either way.
4. Confirm the new slugs are registered in the sitemap output.
5. Publish via Replit publish. Monitor the publish until it completes —
   watch for a stalled "Promote" phase and flag it early if it hangs.
   NOTE: a previous batch-58 publish kept running server-side after the browser
   session was lost and completed on its own — if the session drops, verify via
   the live sitemap count + sample pages before assuming failure.
6. Verify LIVE (build-green is NOT shipped):
   - Homepage, `/answers/`, and 3+ sampled new answer pages return 200.
   - Sitemap count increased by ~96 URLs (was 35,075 after batches 59+60;
     expect ~35,171 if batches 59+60 published first, or +192/+288 if this merge
     carries chained unmerged batches).
   - Sampled page has correct canonical + schema markup (Article + FAQPage +
     BreadcrumbList JSON-LD).
   - Sampled mobile performance is acceptable.

## Sample pages to verify live

- `/answers/seattle-urm-seismic-retrofit-requirements/`
- `/answers/phoenix-vs-maricopa-county-plan-review/`
- `/answers/minneapolis-deep-frost-footing-design/`
- `/answers/honolulu-dpp-plan-review-process/`

## Constraints (standing, non-negotiable)

- No redesign. Touch only what this merge needs.
- Do not break anything that currently works.
- Do NOT trigger any outreach/email jobs.
- If anything looks risky, stop and report — do not improvise.

## Report back

Deployment ID, generated page total, live sitemap count, sampled 200s,
and anything that failed.
