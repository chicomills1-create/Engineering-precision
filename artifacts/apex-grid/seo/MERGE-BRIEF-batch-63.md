# MERGE BRIEF — SEO batch 63 → main → publish

READ THIS FILE FIRST. It survives chat compaction; the chat thread may not.

## What this is

Branch `seo-batch-imit-63` contains the complete, validated SEO/AEO answer-page
batch 63 for apexgrideng.com, built on top of `seo-batch-imit-62` (batches ≤62).

- Base: `seo-batch-imit-62` (252 wave files, batches ≤62, sitemap 35,267 URLs)
- Contents: 8 new wave files, **96 unique answer pages**, 0 duplicate slugs:
  - `wave-iu-answer-pages.ts` — Jurisdiction & Permitting Authority (12 pages: unincorporated county permitting, annexation, ETJ, multi-jurisdiction projects, fire marshal AHJs, special districts, TX/FL/AZ/CA jurisdiction angles)
  - `wave-iv-answer-pages.ts` — Structural Engineering Deep Dives (12 pages: PT slabs, helical piers, micropiles, moment frames, podiums, ICF, tilt-up bracing, soft-story retrofit, flood/expansive soils, retaining walls, special inspections)
  - `wave-iw-answer-pages.ts` — MEP Systems Engineering (12 pages: hospital HVAC, lab exhaust, kitchen hoods, pool dehumidification, cleanrooms, vivariums, central plants, geothermal, DOAS, chilled beams, med gas, high-rise plumbing)
  - `wave-ix-answer-pages.ts` — Civil & Site Engineering (12 pages: detention vs retention, permeable pavement, lift stations, fire mains, grading, SWPPP, dry utilities, offsite improvements, TIS, floodplain, septic, water quality basins)
  - `wave-iy-answer-pages.ts` — Building-Type Engineering Guides (12 pages: equestrian, car wash, crematorium, sports complex, theater, gallery, hangar, fire station, police station, library, brewery, distillery)
  - `wave-iz-answer-pages.ts` — Energy Code & Building Performance (12 pages: energy modeling, 90.1 paths, BECx, air barriers, daylighting, cool roofs, demand response, battery storage, EVSE calcs, LPD, RCx, Level 2 audits)
  - `wave-ja-answer-pages.ts` — Fire Protection & Life Safety (12 pages: high-piled storage, standpipes, voice evacuation, atrium smoke control, fire pumps, emergency power, firestopping, stair pressurization, hazmat, flammable liquids, FACP, elevator recall)
  - `wave-jb-answer-pages.ts` — Emerging Building Technologies (12 pages: mass timber, modular MEP, CLT fire rating, container structures, net-zero, Passive House, hurricane/wildfire/tornado resilience, lab vibration, liquid cooling, indoor agriculture)
- Every wave is registered in `artifacts/apex-grid/seo/generate.ts`
  (imports + ALL_AEO_PAGES spreads + render loops) — verified before handoff.

## Pre-merge validation (already done by the site owner — spot-check, don't redo)

- `grep -c '^];'` on every wave file = exactly 1 (no orphaned array closers).
- All 8 waves pass esbuild: 8 passed, 0 failed. generate.ts passes esbuild.
- generate.ts wiring verified: 8 imports + 8 spreads + 8 render loops present.
- 96 slugs unique within batch and against all 5,956 existing live /answers/
  slugs (checked against the live sitemap 2026-09-20) — 0 collisions.
- White-hat uniqueness check: every page is standalone engineering guidance.
  No doorway pages, no spun duplicates.
- Jurisdiction-intent angle woven in where natural (city vs unincorporated county
  permitting, plan-check portals, submittal paths, AHJ-specific review).
  No PE claims, no invented code section numbers, no permit-approval promises.

## Steps (in order, stop and report if any step fails — do not skip)

1. `git checkout main && git pull && git merge --no-ff seo-batch-imit-63`
   - If generate.ts conflicts, keep BOTH wirings (all imports, all spreads,
     all render loops from both sides). Do not drop any wave.
2. Run the full test suite. All tests must pass.
3. Run `seo:generate`. Confirm output = previous generated total + **96 pages**
   (was 35,267 sitemap URLs after batch 62; expect 35,363).
4. Confirm the new slugs are registered in the sitemap output.
5. Publish via Replit publish. Monitor the publish until it completes —
   watch for a stalled "Promote" phase and flag it early if it hangs.
6. Verify LIVE (build-green is NOT shipped):
   - Homepage, `/answers/`, and 3+ sampled new answer pages return 200.
   - Sitemap count increased by ~96 URLs (was 35,267 at batch-63 check time).
   - Sampled page has correct canonical + schema markup.
   - Sampled mobile performance is acceptable.

## Sample pages to verify live

- `/answers/unincorporated-county-building-permit-process/`
- `/answers/helical-pier-foundation-design/`
- `/answers/mass-timber-structural-design/`
- `/answers/fire-pump-sizing-design/`

## Constraints (standing, non-negotiable)

- No redesign. Touch only what this merge needs.
- Do not break anything that currently works.
- Do NOT trigger any outreach/email jobs.
- If anything looks risky, stop and report — do not improvise.

## Report back

Branch head SHA, deployment ID, generated page total, live sitemap count,
sampled 200s, and anything that failed.
