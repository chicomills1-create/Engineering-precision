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

function loadSitemapPaths(): Set<string> {
  const paths = new Set<string>();
  if (!fs.existsSync(staticRoot)) return paths;

  for (const filename of fs.readdirSync(staticRoot)) {
    if (!/^sitemap(?:[-_].+)?\.xml$/.test(filename)) continue;
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

// Serve the React shell for known client-side routes. Unknown paths still get
// the same branded not-found screen, but with a real 404 status so crawlers do
// not mistake arbitrary URLs for valid pages.
const sitemapPaths = loadSitemapPaths();
app.use((req, res) => {
  if (fs.existsSync(indexHtml)) {
    const pathname = normalizePathname(req.path);
    const isKnownSpaPath =
      sitemapPaths.has(pathname) ||
      explicitSpaPaths.has(pathname) ||
      pathname.startsWith("/sign-in/") ||
      pathname.startsWith("/sign-up/");
    res.status(isKnownSpaPath ? 200 : 404).sendFile(indexHtml);
  } else {
    res.status(404).send("Not found");
  }
});

export default app;
