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

- `artifacts/apex-grid` — dark, cinematic marketing site at `/`, modeled on www.engides.com (the user is CEO of Engides): Home, About, Portfolio, Industries, Services overview + `/services/:id` detail pages (mep, structural, civil, assessments), Resources guides, Contact, Privacy/Terms. No employee/team page by explicit request. Contact form posts to `POST /api/leads` (stored in `leads` table).
- `/admin` — Clerk-protected admin page listing all inquiries (newest first) via `GET /api/leads` (401 without a session). Auth is Replit-managed Clerk: proxy middleware + `clerkMiddleware` in `artifacts/api-server/src/app.ts`, `requireAuth` in `src/middlewares/requireAuth.ts`, sign-in/sign-up routes + themed Clerk UI in `artifacts/apex-grid/src/App.tsx`.
- Design: dark by default, near-black neutral bg (HSL 0 0% 4%), red accent (HSL 0 72% 48%), Space Grotesk headings / Inter body, 4px radius — user changed the original gold/navy palette to red and black; keep this look.

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

_Populate as you build — sharp edges, "always run X before Y" rules._

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
