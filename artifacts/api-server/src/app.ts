import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import express, { type Express } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import pinoHttp from "pino-http";
import { clerkMiddleware } from "@clerk/express";
import { publishableKeyFromHost } from "@clerk/shared/keys";
import {
  CLERK_PROXY_PATH,
  clerkProxyMiddleware,
  getClerkProxyHost,
} from "./middlewares/clerkProxyMiddleware";
import router from "./routes";
import { logger } from "./lib/logger";
import { wakeOutreachDispatchFromTraffic } from "./lib/outreachWorker";
import { mountApexDynamicRoutes } from "./dynamic/index.js";

// In both dev and production builds, dist/index.mjs lives at
// artifacts/api-server/dist/ — so apex-grid's static output is two levels up.
const __apiDir = path.dirname(fileURLToPath(import.meta.url));
const staticRoot = path.resolve(__apiDir, "../../apex-grid/dist/public");
const indexHtml = path.join(staticRoot, "index.html");

const explicitSpaPaths = new Set([
  "/privacy",
  "/terms",
  "/request-proposal",
  "/submit-project",
  "/client-portal",
  "/unsubscribe",
  "/capabilities",
  "/admin",
  "/admin/seo",
  "/admin/outreach",
  "/admin/linkedin",
  "/admin/growth",
  "/admin/reviews",
  "/admin/payroll",
  "/sign-in",
  "/sign-up",
]);

function normalizePathname(value: string): string {
  const withoutQuery = value.split("?")[0] || "/";
  return withoutQuery === "/" ? "/" : withoutQuery.replace(/\/+$/, "");
}

// Sitemap families whose URLs are client-rendered dynamic routes (wouter) with
// no static HTML on disk: franchise / verticals / buildings / specialties /
// projects / services-local city pages and wave1 metro pages (~2.1M URLs).
// Preloading all of them into a Set at boot OOMs the server, so they are
// recognized by path pattern (isDynamicSpaPath) instead. Only the small
// statically-generated sitemap families are preloaded below.
const DYNAMIC_SPA_SITEMAP_FAMILY = /^(?:franchise|verticals|buildings|specialties|projects|services-local|wave1)/;
const DYNAMIC_SPA_PATH_PREFIXES = new Set([
  "franchise",
  "verticals",
  "buildings",
  "specialties",
  "projects",
  "services-local",
  "wave1",
]);

// ── Thin programmatic city pages: noindex to conserve crawl budget ──────────
// These 4-segment city routes serve ~1.7M near-duplicate pages (franchise,
// verticals, buildings, projects, specialties-t2). They stay live for users
// but send X-Robots-Tag: noindex so Google concentrates crawl budget on the
// money pages (locations/, wave1, services). specialties t1 (pe-stamping
// etc.) and services-local remain indexable.
const NOINDEX_SPA_PREFIXES = new Set([
  "franchise",
  "verticals",
  "buildings",
  "projects",
]);
const NOINDEX_SPECIALTY_T2_SLUGS = new Set([
  "structural-peer-review",
  "mep-peer-review",
  "code-consulting",
  "accessibility-compliance",
  "leed-certification",
  "net-zero-design",
  "envelope-commissioning",
  "forensic-engineering",
  "expert-witness",
]);

function isNoindexSpaPath(pathname: string): boolean {
  const segs = pathname.replace(/^\/+|\/+$/g, "").split("/");
  if (segs.length !== 4) return false;
  if (NOINDEX_SPA_PREFIXES.has(segs[0])) return true;
  if (segs[0] === "specialties" && NOINDEX_SPECIALTY_T2_SLUGS.has(segs[1])) {
    return true;
  }
  return false;
}

function isDynamicSpaPath(pathname: string): boolean {
  const segs = pathname.replace(/^\/+|\/+$/g, "").split("/");
  return segs.length === 4 && DYNAMIC_SPA_PATH_PREFIXES.has(segs[0]);
}

function loadSitemapPaths(): Set<string> {
  const paths = new Set<string>();
  if (!fs.existsSync(staticRoot)) return paths;

  for (const filename of fs.readdirSync(staticRoot)) {
    if (!/^sitemap(?:[-_].+)?\.xml$/.test(filename)) continue;
    const family = filename.replace(/^sitemap[-_]/, "").replace(/\.xml$/, "");
    if (DYNAMIC_SPA_SITEMAP_FAMILY.test(family)) continue;
    const xml = fs.readFileSync(path.join(staticRoot, filename), "utf8");
    for (const match of xml.matchAll(/<loc>(https:\/\/apexgrideng\.com)?([^<]+)<\/loc>/g)) {
      const pathname = match[2];
      if (pathname?.startsWith("/")) paths.add(normalizePathname(pathname));
    }
  }

  return paths;
}

const app: Express = express();

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);

app.use((_req, res, next) => {
  res.once("finish", wakeOutreachDispatchFromTraffic);
  next();
});

app.use(CLERK_PROXY_PATH, clerkProxyMiddleware());

app.use(cors({ credentials: true, origin: true }));
app.use(
  "/api/outreach/webhooks/sendgrid-events",
  express.raw({ type: "application/json", limit: "1mb" }),
);
app.use(
  "/api/outreach/webhooks/inbound-reply",
  express.raw({ type: "multipart/form-data", limit: "10mb" }),
);
app.use(
  "/api/linkedin/webhooks/provider",
  express.raw({ type: "application/json", limit: "1mb" }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Resolve the publishable key from the incoming request host so the same
// server can serve multiple Clerk custom domains. Falls back to
// CLERK_PUBLISHABLE_KEY when the host doesn't map to a custom domain.
app.use(
  clerkMiddleware((req) => ({
    publishableKey: publishableKeyFromHost(
      getClerkProxyHost(req) ?? "",
      process.env.CLERK_PUBLISHABLE_KEY,
    ),
  })),
);

// Apex dynamic variation routes: /{service}/{state}/{city}/{variation}/
// 696,456 URLs rendered server-side on demand (no per-page files).
// Mounted BEFORE static — only matches the 4-segment variation pattern,
// so existing static URLs are never intercepted.
mountApexDynamicRoutes(app);

// Serve pre-rendered SEO pages with proper directory-index resolution.
// express.static resolves /structural-engineering/ → dist/public/structural-engineering/index.html
// before Express falls through to the SPA catch-all below.
if (fs.existsSync(staticRoot)) {
  const legacyRedirectsPath = path.join(staticRoot, "legacy-location-redirects.json");
  if (fs.existsSync(legacyRedirectsPath)) {
    const legacyRedirects = JSON.parse(fs.readFileSync(legacyRedirectsPath, "utf8")) as Record<string, string>;
    for (const [from, to] of Object.entries(legacyRedirects)) {
      app.get(from, (_req, res) => res.redirect(301, to));
    }
  }
  // Trailing-slash canonicalization for core pages (census fix Wave B,
  // 2026-10-19): each core URL exists in exactly one canonical form — React
  // core routes are slash-less (their canonical tags point there), generated
  // pages are slashed. Before this middleware both forms served a duplicate
  // 200. The non-canonical form now 301s to the canonical one. Legacy
  // redirect entries registered above run first and keep priority.
  const SLASHLESS_CORE_PATHS = new Set([
    "/about", "/contact", "/estimate", "/for-architects", "/for-contractors",
    "/for-developers", "/for-property-managers", "/industries", "/services",
    "/portfolio", "/military", "/resources", "/team", "/capabilities",
    "/privacy", "/terms", "/request-proposal", "/submit-project",
    "/client-portal", "/unsubscribe", "/admin", "/admin/seo",
    "/admin/outreach", "/admin/linkedin", "/admin/growth", "/admin/reviews",
    "/admin/payroll", "/sign-in", "/sign-up",
    "/services/mep", "/services/structural", "/services/civil",
    "/services/assessments", "/services/architecture",
  ]);
  app.use((req, res, next) => {
    if (req.method !== "GET" && req.method !== "HEAD") return next();
    const p = req.path;
    if (p === "/" || path.extname(p) || p.startsWith("/api")) return next();
    const qIndex = req.originalUrl.indexOf("?");
    const query = qIndex >= 0 ? req.originalUrl.slice(qIndex) : "";
    if (p.endsWith("/")) {
      const bare = p.replace(/\/+$/, "");
      if (SLASHLESS_CORE_PATHS.has(bare)) {
        return res.redirect(301, `${bare}${query}`);
      }
      return next();
    }
    if (SLASHLESS_CORE_PATHS.has(p)) return next();
    const directoryIndex = path.resolve(
      staticRoot,
      p.replace(/^\/+/, ""),
      "index.html",
    );
    if (
      directoryIndex.startsWith(`${staticRoot}${path.sep}`) &&
      fs.existsSync(directoryIndex)
    ) {
      return res.redirect(301, `${p}/${query}`);
    }
    return next();
  });
  // Keep canonical marketing URLs slashless while still serving their exact
  // prerendered directory index. express.static with redirects disabled only
  // resolves the trailing-slash form and would otherwise fall through to the
  // generic SPA shell.
  app.use((req, res, next) => {
    if (req.method !== "GET" && req.method !== "HEAD") return next();
    if (req.path === "/" || path.extname(req.path)) return next();

    let relativePath: string;
    try {
      relativePath = decodeURIComponent(req.path).replace(/^\/+|\/+$/g, "");
    } catch {
      return next();
    }

    const directoryIndex = path.resolve(staticRoot, relativePath, "index.html");
    if (
      directoryIndex.startsWith(`${staticRoot}${path.sep}`) &&
      fs.existsSync(directoryIndex)
    ) {
      return res.sendFile(directoryIndex);
    }
    return next();
  });
  app.use(express.static(staticRoot, { index: "index.html", redirect: false }));
}

app.use("/api", router);

// 410 Gone for removed orphan sitemap families (plan 2026-10-09,
// APEX-TORCH-RECOVERY-20261009; ChatGPT re-verified 2026-10-12).
// ~431K byte-identical homepage duplicates removed from sitemap 2026-10-07;
// zero traffic, zero backlinks. 410 deindexes faster than 404.
// Specialties pattern is restricted to the 6 t1 slugs on purpose — other
// /specialties/ paths (t2 city pages, noindexed) must stay live.
const ORPHAN_410_PATTERNS = [
  /^\/services-local\//,
  /^\/specialties\/(pe-stamping|plan-check-corrections|title-24-compliance|feasibility-study|permit-expediting|energy-code-compliance)\//,
  /^\/wave1\//,
];
app.use((req, res, next) => {
  if (ORPHAN_410_PATTERNS.some((p) => p.test(req.path))) {
    return res.status(410).send(`<!DOCTYPE html>
<html><head><title>410 Gone</title>
<meta name="robots" content="noindex"></head>
<body><h1>410 Gone</h1>
<p>This page has been permanently removed.</p></body></html>`);
  }
  next();
});

// Serve the React shell for known client-side routes. Unknown paths still get
// the same branded not-found screen, but with a real 404 status so crawlers do
// not mistake arbitrary URLs for valid pages.
const sitemapPaths = loadSitemapPaths();
app.use((req, res) => {
  if (fs.existsSync(indexHtml)) {
    const pathname = normalizePathname(req.path);
    const isKnownSpaPath =
      sitemapPaths.has(pathname) ||
      isDynamicSpaPath(pathname) ||
      explicitSpaPaths.has(pathname) ||
      pathname.startsWith("/sign-in/") ||
      pathname.startsWith("/sign-up/");
    // Thin programmatic city pages: keep live for users, noindex for crawlers.
    if (isNoindexSpaPath(pathname)) {
      res.set("X-Robots-Tag", "noindex, follow");
    }
    res.status(isKnownSpaPath ? 200 : 404).sendFile(indexHtml);
  } else {
    res.status(404).send("Not found");
  }
});

export default app;

