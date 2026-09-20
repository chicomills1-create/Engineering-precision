# Import brief: FindyMail-verified batches 2+3 → outreach inventory
Date: 2026-09-20. Owner: Chico. No owner tap needed — runs entirely in this workspace.

## What
Import 127 FindyMail-verified contacts (batch 2: 64 rows, batch 3: 63 rows) into the
production outreach inventory using the portal's OWN import function — the exact same
code path as the portal's "Recovered FindyMail inventory" upload UI
(`POST /outreach/inventory/import-upload` → `importRecoveredFindyMailInventory`).

## Source files (already on branch `import-batches-2-3-2026-09-20`)
- `artifacts/api-server/import-inbox/recovered-batch2-2026-09-20.csv` (64 rows)
- `artifacts/api-server/import-inbox/recovered-batch3-2026-09-20.csv` (63 rows)

CSV header (must stay exactly): `day,lane,company,contact_name,title,email,website,city,state,segment,project_signal,source_url`
Every row: lane=`verified`, non-empty company/contact_name/email/website/state/segment/project_signal/source_url,
except 6 batch-3 rows with empty title (sole-proprietor firms) — the import function will
legitimately exclude those as `missing_named_identity_or_title`. That is expected; do not invent titles.

## Steps
1. Merge branch `import-batches-2-3-2026-09-20` into workspace main (data files only, no code changes on the branch).
2. Write a ONE-OFF script (do NOT commit it; delete after the run), e.g.
   `artifacts/api-server/import-batches-2-3.oneoff.ts`:
   ```ts
   import { readFileSync } from "node:fs";
   import { importRecoveredFindyMailInventory } from "./src/lib/outreachInventory";
   import { db } from "@workspace/db";
   import { sql } from "drizzle-orm";
   async function main() {
     const pre = await db.execute(sql`select count(*)::int as c from prospects`);
     console.log("PRE_PROSPECTS", JSON.stringify(pre.rows ?? pre));
     for (const [file, label] of [
       ["./import-inbox/recovered-batch2-2026-09-20.csv", "recovered-batch2-2026-09-20.csv"],
       ["./import-inbox/recovered-batch3-2026-09-20.csv", "recovered-batch3-2026-09-20.csv"],
     ] as const) {
       const csv = readFileSync(new URL(file, import.meta.url), "utf8");
       const report = await importRecoveredFindyMailInventory({ actor: "chico-assistant", sourceFilename: label, csv });
       console.log("REPORT", label, JSON.stringify(report));
     }
     const post = await db.execute(sql`select count(*)::int as c from prospects`);
     console.log("POST_PROSPECTS", JSON.stringify(post.rows ?? post));
   }
   main().then(() => process.exit(0), (e) => { console.error("IMPORT_FAILED", e); process.exit(1); });
   ```
   Adjust the `@workspace/db` import path to whatever the api-server workspace actually uses
   (check how `src/routes/outreachInventory.ts` resolves it — it imports from `@workspace/db`).
3. **DB IDENTITY CHECK FIRST**: run a quick query `select count(*) from prospects` BEFORE the import.
   The production prospects table holds thousands of rows. If the count is near zero / looks like an
   empty dev database, STOP immediately and report — do NOT import into the wrong database.
   Only proceed when the count matches production scale.
4. Run the script with the project's TS runner (tsx). It performs the import inside one transaction
   per CSV, with the import's own validation/dedupe (duplicate email/domain, suppressions, bounces,
   prior recipients, domain-mismatch, campaign-state eligibility). Idempotent: re-running is safe
   (batchId = sha256 of CSV).
5. Report back: the PRE/POST prospects counts and both REPORT JSON blobs verbatim
   (sourceRows, importedPendingQualification, excluded, namedImported, exclusions map).
6. Delete the one-off script. Leave the two CSVs in `import-inbox/` as the import record.

## Hard boundaries
- Do NOT stage, schedule, send, or enqueue any email. Imports only add inventory (status `approved`,
  send-eligible) — exactly what the portal UI upload does. No outreach runner, no scheduler, no SendGrid calls.
- Do NOT touch any other code. No SEO files, no campaign config, no locks.
- Do NOT run `seo:generate`, builds, or publishes as part of this task.

## Expected outcome
- batch 2: 64 sourceRows, ~64 namedImported (all rows have name+title).
- batch 3: 63 sourceRows, ~57 namedImported, 6 excluded (`missing_named_identity_or_title`).
- Some rows may additionally exclude as `duplicate_email`/`duplicate_domain` if the firm already
  exists in production inventory — that is correct dedupe behavior; report the counts.
