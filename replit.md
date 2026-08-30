# Apex Grid Engineering

Marketing website for Apex Grid Engineering — a licensed engineering firm (MEP, Structural, Civil, Fire Protection, Title 24 / Energy Compliance, Architectural support) with a lead intake form.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

_Populate as you build — short repo map plus pointers to the source-of-truth file for DB schema, API contracts, theme files, etc._

## Architecture decisions

_Populate as you build — non-obvious choices a reader couldn't infer from the code (3-5 bullets)._

## Product

- `artifacts/apex-grid` — dark, cinematic marketing site at `/`, modeled on www.engides.com (the user is CEO of Engides): Home, About, Team, Portfolio, Industries, Services overview + `/services/:id` detail pages (mep, structural, civil, assessments), Resources guides, Contact, Privacy/Terms. Contact form posts to `POST /api/leads` (stored in `leads` table).
- `/admin` — Clerk-protected personal employee portal for jobs, inquiries, and workspace operations. `/admin/outreach` is the email approvals and outreach section, and `/admin/seo` is the SEO section; all remain behind the same `ADMIN_EMAILS` authorization. Auth is Replit-managed Clerk: proxy middleware + `clerkMiddleware` in `artifacts/api-server/src/app.ts`, `requireAuth` in `src/middlewares/requireAuth.ts`, sign-in/sign-up routes + themed Clerk UI in `artifacts/apex-grid/src/App.tsx`.
- Design: dark by default, near-black neutral bg (HSL 0 0% 4%), red accent (HSL 0 72% 48%), Space Grotesk headings / Inter body, 4px radius — user changed the original gold/navy palette to red and black; keep this look.

## Outreach exclusions

- Never research, qualify, draft outreach for, or contact Atmosphere Architects. Apex Grid already partners with them.
- Do not contact their owners Tim Boyle or Mike Hudson.

## Outreach batching

- Daily preparation may pre-approve a prospect without a manual click only when it meets the same hard standard as the approved batch: named high-confidence contact, verified business email, public contact evidence, current-need evidence, active campaign targeting, no suppression, and no prior initial send or sequence claim.
- Preparation must continue to use the shared 150-message Phoenix-day ledger and must never resend delivered messages or retry bounced, replied, or unsubscribed contacts.

## Quarterly state-data review

- `pnpm --filter @workspace/apex-grid run seo:review` — console report flagging state code data not verified in 9+ months (`artifacts/apex-grid/seo/review-report.ts`; shared logic in `seo/review-core.ts`)
- `pnpm --filter @workspace/apex-grid run seo:review:email` — same check, emails the result via the SendGrid connector (`seo/review-email.ts`; supports `--dry-run`). Recipient: `REVIEW_NOTIFY_EMAIL` → falls back to `LEAD_NOTIFY_EMAIL`; sender: `REVIEW_NOTIFY_FROM_EMAIL` → `LEAD_NOTIFY_FROM_EMAIL` → recipient. Sender must be SendGrid-verified or SendGrid returns 403.
- To run it quarterly: create a Scheduled Deployment in the Publishing tool with schedule "9am on the 1st of January, April, July, and October" (cron `0 9 1 1,4,7,10 *`) and run command `pnpm --filter @workspace/apex-grid run seo:review:email`.

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

_Populate as you build — sharp edges, "always run X before Y" rules._

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
