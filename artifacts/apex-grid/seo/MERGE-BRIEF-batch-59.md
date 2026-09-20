# MERGE BRIEF — SEO batch 59 → main → publish

READ THIS FILE FIRST. It survives chat compaction; the chat thread may not.

## What this is

Branch `seo-batch-hwhz-59` contains the complete, validated SEO/AEO answer-page
batch 59 for apexgrideng.com, built on top of `seo-batch-hshv-58` (batches ≤58).

- Base: `seo-batch-hshv-58` (228 wave files, batches ≤58)
- Contents: 4 new wave files, **96 unique answer pages**, 0 duplicate slugs:
  - `wave-hw-answer-pages.ts` — Great Lakes and Rust Belt Engineering (24 pages: Chicago greystones/two-flats, Detroit factories, lake-effect snow roofs, combined-sewer flooding, brownfield steel mills…)
  - `wave-hx-answer-pages.ts` — Appalachia and Ohio Valley Engineering (24 pages: mine subsidence, hillside foundations, Ohio River floodwalls, coal camp rehabs, karst…)
  - `wave-hy-answer-pages.ts` — Mid-Atlantic Capital Corridor Engineering (24 pages: DC rowhouses/underpinning, Formstone facades, trinity houses, marine clay, party walls…)
  - `wave-hz-answer-pages.ts` — Intermountain West Engineering (24 pages: bentonite soils, Wasatch fault seismic, WUI wildfire hardening, altitude HVAC derating, avalanche design…)
- Every wave is registered in `artifacts/apex-grid/seo/generate.ts`
  (imports + ALL_AEO_PAGES spreads + render loops) — verified before handoff.

## Pre-merge validation (already done by the site owner — spot-check, don't redo)

- `grep -c '^];'` on every wave file = exactly 1 (no orphaned array closers).
- All 4 waves pass esbuild: 4 passed, 0 failed. generate.ts passes esbuild.
- generate.ts wiring verified: 4 imports + 4 spreads + 4 render loops present.
- 96 slugs unique within batch and against all 5,572 existing live /answers/
  slugs (checked against the live sitemap 2026-09-20) — 0 collisions.
- White-hat uniqueness check passed: max sampled pairwise Jaccard 0.39 on the
  two closest pages (shared vocabulary only — snow/steep-slope topics); the only
  identical sentence between the closest pair was extraLinks boilerplate markup,
  not prose. No doorway pages, no spun duplicates.
- Jurisdiction-intent angle woven in where natural (city vs unincorporated county
  permitting, plan-check portals, submittal paths, AHJ-specific review boards).
  No PE claims, no invented code section numbers, no permit-approval promises.

## Steps (in order, stop and report if any step fails — do not skip)

1. `git checkout main && git pull && git merge --no-ff seo-batch-hwhz-59`
2. Run the full test suite. All tests must pass.
3. Run `seo:generate`. Confirm output = previous generated total + **96 pages**
   (was 35,248 generated pages after batch 58; expect 35,344).
4. Confirm the new slugs are registered in the sitemap output.
5. Publish via Replit publish. Monitor the publish until it completes —
   watch for a stalled "Promote" phase and flag it early if it hangs.
6. Verify LIVE (build-green is NOT shipped):
   - Homepage, `/answers/`, and 3+ sampled new answer pages return 200.
   - Sitemap count increased by ~96 URLs (was 34,893 at batch-59 check time).
   - Sampled page has correct canonical + schema markup.
   - Sampled mobile performance is acceptable.

## Sample pages to verify live

- `/answers/chicago-greystone-facade-restoration/`
- `/answers/pittsburgh-hillside-retaining-wall-design/`
- `/answers/baltimore-formstone-facade-restoration/`
- `/answers/salt-lake-city-wasatch-fault-seismic-design/`

## Constraints (standing, non-negotiable)

- No redesign. Touch only what this merge needs.
- Do not break anything that currently works.
- Do NOT trigger any outreach/email jobs.
- If anything looks risky, stop and report — do not improvise.

## Report back

Deployment ID, generated page total, live sitemap count, sampled 200s,
and anything that failed.
