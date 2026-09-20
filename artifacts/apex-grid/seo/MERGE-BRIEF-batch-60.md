# MERGE BRIEF — SEO batch 60 → main → publish

READ THIS FILE FIRST. It survives chat compaction; the chat thread may not.

## What this is

Branch `seo-batch-iaid-60` contains the complete, validated SEO/AEO answer-page
batch 60 for apexgrideng.com, built on top of `seo-batch-hwhz-59` (batches ≤59).

- Base: `seo-batch-hwhz-59` (batches ≤59 — NOTE: batch 59's own publish leg may
  still be pending; this branch chains on it, so merging this branch brings
  batch 59's 96 pages too if they were never merged separately)
- Contents: 4 new wave files, **96 unique answer pages**, 0 duplicate slugs:
  - `wave-ia-answer-pages.ts` — New England Engineering (24 pages: Providence mill conversions, Boston triple-deckers, Portland Maine wharves, Vermont covered bridges, NH granite foundations, Cape Cod bluff erosion, nor'easter snow drifts…)
  - `wave-ib-answer-pages.ts` — Florida Peninsula Engineering (24 pages: Miami high-rise balconies, condo garage salt corrosion, Orlando sinkhole/karst, coral rock foundations, seawall replacement, theme park structures…)
  - `wave-ic-answer-pages.ts` — Texas Triangle Engineering (24 pages: Austin expansive clay, Dallas school tornado shelters, Edwards Aquifer karst, Houston gumbo clay, Texas hail roofs, TWIA windstorm…)
  - `wave-id-answer-pages.ts` — California Engineering (24 pages: LA soft-story program, SF hillside foundations, WUI wildfire hardening, Title 24, Bay Area liquefaction, HCAI hospital approval…)
- Every wave is registered in `artifacts/apex-grid/seo/generate.ts`
  (imports + ALL_AEO_PAGES spreads + render loops) — verified before handoff.

## Pre-merge validation (already done by the site owner — spot-check, don't redo)

- `grep -c '^];'` on every wave file = exactly 1 (no orphaned array closers).
- All 4 waves pass esbuild: 4 passed, 0 failed. generate.ts passes esbuild.
- generate.ts wiring verified: 4 imports + 4 spreads + 4 render loops present.
- 96 slugs unique within batch, against all 5,571 live /answers/ slugs
  (checked against the live sitemap 2026-09-20), and against batch 59's 96
  slugs — 0 collisions.
- White-hat uniqueness check passed: max pairwise Jaccard 0.32 on the two
  closest pages (Miami/Naples seawall pair — shared vocabulary only);
  0 identical sentences between them. No doorway pages, no spun duplicates.
- Jurisdiction-intent angle woven in where natural (city vs unincorporated county
  permitting, plan-check portals, submittal paths, AHJ-specific review boards).
  No PE claims, no invented code section numbers, no permit-approval promises.

## Steps (in order, stop and report if any step fails — do not skip)

1. `git checkout main && git pull && git merge --no-ff seo-batch-iaid-60`
2. Run the full test suite. All tests must pass.
3. Run `seo:generate`. Confirm output = previous generated total + **96 pages**
   (was 35,248 generated pages after batch 58; expect 35,440 if batch 59 is
   already in main, or 35,248 → 35,440 = +192 if this merge carries batch 59 too).
4. Confirm the new slugs are registered in the sitemap output.
5. Publish via Replit publish. Monitor the publish until it completes —
   watch for a stalled "Promote" phase and flag it early if it hangs.
   NOTE: a previous batch-58 publish kept running server-side after the browser
   session was lost and completed on its own — if the session drops, verify via
   the live sitemap count + sample pages before assuming failure.
6. Verify LIVE (build-green is NOT shipped):
   - Homepage, `/answers/`, and 3+ sampled new answer pages return 200.
   - Sitemap count increased by ~96 URLs (was 34,883 after batch 58; expect
     ~34,979 if batch 59 published first, ~35,075 if this merge carries both).
   - Sampled page has correct canonical + schema markup.
   - Sampled mobile performance is acceptable.

## Sample pages to verify live

- `/answers/boston-triple-decker-framing-assessment/`
- `/answers/miami-seawall-failure-replacement/`
- `/answers/austin-expansive-clay-foundation-design/`
- `/answers/los-angeles-soft-story-retrofit-program/`

## Constraints (standing, non-negotiable)

- No redesign. Touch only what this merge needs.
- Do not break anything that currently works.
- Do NOT trigger any outreach/email jobs.
- If anything looks risky, stop and report — do not improvise.

## Report back

Deployment ID, generated page total, live sitemap count, sampled 200s,
and anything that failed.
