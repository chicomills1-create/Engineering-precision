---
name: Static page production serving
description: Why all 4,200 static SEO pages were soft-404ing in production and how the fix works.
---

# Static Page Production Serving

## The Problem
Replit's `kind: web` static handler (registered as `publicDir=artifacts/apex-grid/dist/public path=/`) does **SPA-fallback only** — for any URL that doesn't match an exact file path, it returns the root `index.html`. It does NOT do directory-index resolution (`/structural-engineering/` → `/structural-engineering/index.html`).

This meant every static SEO page except the homepage was returning the React SPA shell (5,501 bytes) to Googlebot, causing Google to classify them all as soft 404s.

**Why:**
- Exact file `GET /locations/texas/index.html` → 200, correct 15KB page ✓
- Directory `GET /locations/texas/` → 200, SPA shell ✗
- The static handler knows directories exist (it 301-redirects `/structural-engineering` → `/structural-engineering/`) but then returns root `index.html` for the trailing-slash URL

## The Fix
Added `express.static` to `artifacts/api-server/src/app.ts` **before** the `/api` router:

```typescript
const __apiDir = path.dirname(fileURLToPath(import.meta.url));
const staticRoot = path.resolve(__apiDir, "../../apex-grid/dist/public");

if (fs.existsSync(staticRoot)) {
  app.use(express.static(staticRoot, { index: "index.html", redirect: false }));
}
app.use("/api", router);

// SPA catch-all for React client-side routes
app.use((_req, res) => {
  const indexHtml = path.join(staticRoot, "index.html");
  res.sendFile(indexHtml);
});
```

**Why this works:** All traffic goes through the API server (port 8080). `express.static` resolves directory requests to `index.html` in that directory before Express falls through. `/api/*` is handled by the router. Everything else gets the React SPA shell via the catch-all.

## Path Resolution
`import.meta.url` in the bundled `dist/index.mjs` always points to `artifacts/api-server/dist/index.mjs` regardless of whether the process is run from the workspace root or the artifact dir. So `../../apex-grid/dist/public` reliably resolves to the static output directory.

## How to Apply
- After any change to `app.ts`, rebuild the API server: `pnpm --filter @workspace/api-server run build`
- The vite.config `staticDirIndex` middleware regex still applies for **dev** (Vite dev server, not API server)
- After adding new static top-level directories, verify they're in the vite.config regex for dev parity
- A redeploy is required after the app.ts change for production to pick it up
