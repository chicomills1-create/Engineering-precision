import { Router } from "express";
import { requireAuth } from "../middlewares/requireAuth";
import { readFile, access, readdir } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { and, desc, eq, sql } from "drizzle-orm";
import { db, leadsTable, seoAuditIssuesTable, seoAuditRunsTable, seoPerformanceSnapshotsTable, seoTrafficAlertsTable } from "@workspace/db";
import {
  getCachedResult,
  getCacheStats,
  inspectBatch,
  isGscConfigured,
  isQuotaExhausted,
  type GscVerdict,
} from "../lib/gscInspection";
import { querySearchAnalytics } from "../lib/gscInspection";
import {
  classifyAuditPage,
  duplicateMetadataValueIssues,
  extractAuditMetadata,
  type AuditIssueCandidate,
  type AuditMetadata,
} from "../lib/seoAudit";
import { buildTrafficAlerts, type PageEvidence, type PageQueryMetric } from "../lib/seoTrafficAlerts";

const router = Router();

// The production process starts from the workspace root, while development
// starts from the package directory. Resolve from the built server bundle so
// sitemap inventory works in both environments.
const API_BUNDLE_DIR = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = path.resolve(
  API_BUNDLE_DIR,
  process.env.NODE_ENV === "production"
    ? "../../apex-grid/dist/public"
    : "../../apex-grid/public",
);

type SitemapCategory =
  | "core" | "services" | "industries" | "solutions" | "resources" | "locations"
  | "architecture_locations" | "general_contracting_locations" | "other";

const SITEMAP_FILES = [
  { file: "sitemap-core.xml", category: "core" },
  { file: "sitemap-services.xml", category: "services" },
  { file: "sitemap-industries.xml", category: "industries" },
  { file: "sitemap-solutions.xml", category: "solutions" },
  { file: "sitemap-resources.xml", category: "resources" },
  { file: "sitemap-locations.xml", category: "locations" },
  { file: "sitemap-architecture-locations.xml", category: "architecture_locations" },
  { file: "sitemap-general-contracting-locations.xml", category: "general_contracting_locations" },
] as const;

let sitemapFilesCache: Array<{ file: string; category: SitemapCategory }> | null = null;
let sitemapFilesCacheAt = 0;
const SITEMAP_CACHE_TTL_MS = 5 * 60 * 1000;
async function getSitemapFiles(): Promise<Array<{ file: string; category: SitemapCategory }>> {
  if (sitemapFilesCache && Date.now() - sitemapFilesCacheAt < SITEMAP_CACHE_TTL_MS) return sitemapFilesCache;
  const known: Array<{ file: string; category: SitemapCategory }> = [...SITEMAP_FILES];
  try {
    const names = await readdir(PUBLIC_DIR);
    for (const file of names) {
      if (/^sitemap(?:[-_].+)?\.xml$/i.test(file) && !known.some((entry) => entry.file === file)) known.push({ file, category: "other" });
    }
  } catch { /* public directory errors are reported by the calling endpoint */ }
  sitemapFilesCache = known;
  sitemapFilesCacheAt = Date.now();
  return known;
}

interface SitemapEntry {
  url: string;
  path: string;
  sitemapFile: string;
  category: SitemapCategory;
  priority: string;
  lastmod: string;
  changefreq: string;
  hasTrailingSlash: boolean;
  hasStaticFile: boolean | null;
  softFourOhFourRisk: boolean;
  robotsBlocked: boolean;
  isHighPriority: boolean;
  gscVerdict: GscVerdict;
  gscCoverageState: string | null;
  gscCheckedAt: string | null;
}

type ParsedEntry = Omit<
  SitemapEntry,
  | "hasStaticFile"
  | "softFourOhFourRisk"
  | "robotsBlocked"
  | "isHighPriority"
  | "gscVerdict"
  | "gscCoverageState"
  | "gscCheckedAt"
>;

// ── Robots.txt parsing ────────────────────────────────────────────────────────

interface RobotsRule {
  type: "allow" | "disallow";
  path: string;
}

function parseRobotsTxt(content: string): RobotsRule[] {
  const rules: RobotsRule[] = [];
  const lines = content.split("\n").map((l) => l.trim());
  let inStarSection = false;

  for (const line of lines) {
    if (line.startsWith("#")) continue;

    const colonIdx = line.indexOf(":");
    if (colonIdx === -1) {
      // blank line ends a group
      continue;
    }

    const key = line.slice(0, colonIdx).trim().toLowerCase();
    const value = line.slice(colonIdx + 1).trim();

    if (key === "user-agent") {
      inStarSection = value === "*";
    } else if (inStarSection) {
      if (key === "allow" && value) {
        rules.push({ type: "allow", path: value });
      } else if (key === "disallow") {
        // empty disallow = allow all, still record so we can detect "allow all"
        rules.push({ type: "disallow", path: value });
      }
    }
  }

  return rules;
}

function isPathBlocked(rules: RobotsRule[], urlPath: string): boolean {
  // Standard precedence: most specific path wins; ties go to Allow.
  let bestMatchLength = -1;
  let bestMatchType: "allow" | "disallow" = "allow";

  for (const rule of rules) {
    // Empty disallow means "allow everything" — skip path matching
    if (rule.type === "disallow" && rule.path === "") continue;

    if (urlPath.startsWith(rule.path)) {
      if (rule.path.length > bestMatchLength) {
        bestMatchLength = rule.path.length;
        bestMatchType = rule.type;
      } else if (rule.path.length === bestMatchLength && rule.type === "allow") {
        // Same specificity: allow wins
        bestMatchType = "allow";
      }
    }
  }

  return bestMatchType === "disallow";
}

async function loadRobotsRules(): Promise<RobotsRule[]> {
  try {
    const content = await readFile(
      path.join(PUBLIC_DIR, "robots.txt"),
      "utf-8",
    );
    return parseRobotsTxt(content);
  } catch {
    // No robots.txt — treat as allow-all
    return [];
  }
}

function parseUrlEntries(
  xml: string,
  sitemapFile: string,
  category: SitemapCategory,
): ParsedEntry[] {
  const entries: ParsedEntry[] = [];
  const urlPattern = /<url>([\s\S]*?)<\/url>/g;
  let match: RegExpExecArray | null;

  while ((match = urlPattern.exec(xml)) !== null) {
    const block = match[1];
    const loc = block.match(/<loc>(.*?)<\/loc>/)?.[1]?.trim() ?? "";
    const lastmod = block.match(/<lastmod>(.*?)<\/lastmod>/)?.[1]?.trim() ?? "";
    const changefreq =
      block.match(/<changefreq>(.*?)<\/changefreq>/)?.[1]?.trim() ?? "";
    const priority =
      block.match(/<priority>(.*?)<\/priority>/)?.[1]?.trim() ?? "";

    if (!loc) continue;

    let urlPath = loc;
    try {
      urlPath = new URL(loc).pathname;
    } catch {
      // keep raw
    }

    entries.push({
      url: loc,
      path: urlPath,
      sitemapFile,
      category,
      priority,
      lastmod,
      changefreq,
      hasTrailingSlash: urlPath.endsWith("/"),
    });
  }

  return entries;
}

async function staticFileExists(urlPath: string): Promise<boolean> {
  // Normalise: strip leading slash
  const stripped = urlPath.replace(/^\//, "").replace(/\/$/, "");
  const candidates = [
    path.join(PUBLIC_DIR, stripped, "index.html"),
    path.join(PUBLIC_DIR, `${stripped}.html`),
  ];
  for (const candidate of candidates) {
    try {
      await access(candidate);
      return true;
    } catch {
      // not found, try next
    }
  }
  return false;
}

router.get(
  "/seo-status",
  requireAuth,
  async (req, res): Promise<void> => {
    try {
      // Load robots.txt rules once per request
      const robotsRules = await loadRobotsRules();

      const allEntries: SitemapEntry[] = [];

       for (const { file, category } of await getSitemapFiles()) {
        const xmlPath = path.join(PUBLIC_DIR, file);
        let xml: string;
        try {
          xml = await readFile(xmlPath, "utf-8");
        } catch {
          req.log.warn({ file }, "Sitemap file not found, skipping");
          continue;
        }

        const parsed = parseUrlEntries(xml, file, category);

        // Check static files in parallel, capped batches to avoid hitting fs limits
        const BATCH = 50;
        const withStatic: SitemapEntry[] = [];
        for (let i = 0; i < parsed.length; i += BATCH) {
          const batch = parsed.slice(i, i + BATCH);
          const results = await Promise.all(
            batch.map((e) => staticFileExists(e.path)),
          );
          batch.forEach((entry, j) => {
            const has = results[j];
            const gsc = getCachedResult(entry.url);
            const softFourOhFourRisk = !entry.hasTrailingSlash && !has;
            const robotsBlocked = isPathBlocked(robotsRules, entry.path);
            withStatic.push({
              ...entry,
              hasStaticFile: has,
              // Soft-404 risk: no trailing slash AND no static file found
              softFourOhFourRisk,
              // Blocked by robots.txt while listed in sitemap = high-priority conflict
              robotsBlocked,
              isHighPriority: softFourOhFourRisk || robotsBlocked,
              gscVerdict: gsc?.verdict ?? "unknown",
              gscCoverageState: gsc?.coverageState ?? null,
              gscCheckedAt: gsc?.checkedAt ?? null,
            });
          });
        }

        allEntries.push(...withStatic);
      }

      res.json({
        entries: allEntries,
        gsc: {
          configured: isGscConfigured(),
          quotaExhausted: isQuotaExhausted(),
          checkedCount: getCacheStats().checked,
        },
      });
    } catch (err) {
      req.log.error({ err }, "Failed to build SEO status");
      res.status(500).json({ error: "Failed to build SEO status" });
    }
  },
);

// Inspect a capped batch of not-yet-checked URLs against the GSC
// URL Inspection API. Batches stay small because of GSC quota limits
// (2,000/day). Highest-priority URLs are checked first.
router.post(
  "/seo-status/inspect",
  requireAuth,
  async (req, res): Promise<void> => {
    try {
      if (!isGscConfigured()) {
        res.status(409).json({
          error:
            "Google Search Console is not configured. Set the GOOGLE_SERVICE_ACCOUNT_KEY secret and add the service account to the Search Console property.",
        });
        return;
      }

      const rawLimit = Number(req.body?.limit);
      const limit = Math.min(
        Number.isFinite(rawLimit) && rawLimit > 0 ? Math.floor(rawLimit) : 50,
        100,
      );

      // Gather all sitemap URLs, highest priority first.
      const urls: { url: string; priority: number }[] = [];
      for (const { file, category } of await getSitemapFiles()) {
        const xmlPath = path.join(PUBLIC_DIR, file);
        let xml: string;
        try {
          xml = await readFile(xmlPath, "utf-8");
        } catch {
          continue;
        }
        for (const entry of parseUrlEntries(xml, file, category)) {
          urls.push({
            url: entry.url,
            priority: parseFloat(entry.priority) || 0,
          });
        }
      }
      urls.sort((a, b) => b.priority - a.priority);

      const outcome = await inspectBatch(
        urls.map((u) => u.url),
        limit,
      );

      res.json({
        ...outcome,
        checkedCount: getCacheStats().checked,
      });
    } catch (err) {
      req.log.error({ err }, "GSC batch inspection failed");
      res.status(500).json({ error: "GSC batch inspection failed" });
    }
  },
);

function dateOnly(value: unknown): string | null {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const parsed = new Date(`${value}T00:00:00Z`);
  return Number.isFinite(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value ? value : null;
}
function defaultPerformanceRange(): { startDate: string; endDate: string } {
  const end = new Date(Date.now() - 3 * 86400000);
  const start = new Date(end.getTime() - 179 * 86400000);
  return { startDate: start.toISOString().slice(0, 10), endDate: end.toISOString().slice(0, 10) };
}
function precedingPerformanceRange(startDate: string, endDate: string): { startDate: string; endDate: string } {
  const start = Date.parse(`${startDate}T00:00:00Z`);
  const end = Date.parse(`${endDate}T00:00:00Z`);
  const durationDays = Math.round((end - start) / 86400000) + 1;
  const previousEnd = new Date(start - 86400000);
  const previousStart = new Date(previousEnd.getTime() - (durationDays - 1) * 86400000);
  return { startDate: previousStart.toISOString().slice(0, 10), endDate: previousEnd.toISOString().slice(0, 10) };
}
function parsePageQueryMetric(row: { key: string; clicks: number; impressions: number; position: number }): PageQueryMetric | null {
  try {
    const parsed = JSON.parse(row.key) as { page?: unknown; query?: unknown };
    if (typeof parsed.page !== "string" || typeof parsed.query !== "string") return null;
    return { page: parsed.page, query: parsed.query, clicks: row.clicks, impressions: row.impressions, position: row.position };
  } catch {
    return null;
  }
}
function parsePageMetric(row: { key: string; clicks: number; impressions: number; position: number }): PageQueryMetric {
  return { page: row.key, query: "", clicks: row.clicks, impressions: row.impressions, position: row.position };
}
async function loadPageEvidence(pages: string[], entries: ParsedEntry[]): Promise<Map<string, PageEvidence>> {
  const sitemapPaths = new Set(entries.map((entry) => entry.path.endsWith("/") ? entry.path : `${entry.path}/`));
  let redirects: Record<string, string> = {};
  try { redirects = JSON.parse(await readFile(path.join(PUBLIC_DIR, "legacy-location-redirects.json"), "utf8")) as Record<string, string>; }
  catch { /* optional redirect registry */ }
  const evidence = new Map<string, PageEvidence>();
  for (let i = 0; i < pages.length; i += 20) await Promise.all(pages.slice(i, i + 20).map(async (page) => {
    let pathname = page;
    try { pathname = new URL(page).pathname; } catch { /* raw paths remain review-only */ }
    const normalizedPath = pathname.endsWith("/") ? pathname : `${pathname}/`;
    const exists = await staticFileExists(pathname);
    let html: string | null = null;
    if (exists) {
      const stripped = pathname.replace(/^\//, "").replace(/\/$/, "");
      try { html = await readFile(path.join(PUBLIC_DIR, stripped, "index.html"), "utf8"); }
      catch { try { html = await readFile(path.join(PUBLIC_DIR, `${stripped}.html`), "utf8"); } catch { /* existence remains useful */ } }
    }
    const canonical = html?.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)/i)?.[1] ?? null;
    evidence.set(page, {
      protected: sitemapPaths.has(normalizedPath),
      exists,
      noindex: Boolean(html && /<meta[^>]+name=["']robots["'][^>]+content=["'][^"']*noindex/i.test(html)),
      canonical,
      coverageState: getCachedResult(page)?.coverageState ?? null,
      redirect: redirects[pathname] !== undefined || redirects[normalizedPath] !== undefined,
    });
  }));
  return evidence;
}
async function sitemapEntries(): Promise<ParsedEntry[]> {
  const entries: ParsedEntry[] = [];
  for (const { file, category } of await getSitemapFiles()) {
    try { entries.push(...parseUrlEntries(await readFile(path.join(PUBLIC_DIR, file), "utf8"), file, category)); } catch { /* missing optional sitemap */ }
  }
  return entries;
}

router.post("/seo/dashboard/performance-sync", requireAuth, async (req, res): Promise<void> => {
  const fallback = defaultPerformanceRange();
  const suppliedStart = req.body?.startDate;
  const suppliedEnd = req.body?.endDate;
  const startDate = suppliedStart === undefined ? fallback.startDate : dateOnly(suppliedStart);
  const endDate = suppliedEnd === undefined ? fallback.endDate : dateOnly(suppliedEnd);
  if (!startDate || !endDate) {
    res.status(400).json({ error: "Dates must be real calendar dates in YYYY-MM-DD format." }); return;
  }
  if (startDate > endDate || (Date.parse(`${endDate}T00:00:00Z`) - Date.parse(`${startDate}T00:00:00Z`)) > 185 * 86400000) {
    res.status(400).json({ error: "Date range must be ordered and no longer than 186 days." }); return;
  }
  const previousRange = precedingPerformanceRange(startDate, endDate);
  const [site, pages, queries, pageQueries, previousPages, previousPageQueries] = await Promise.all([
    querySearchAnalytics(startDate, endDate, "site"),
    querySearchAnalytics(startDate, endDate, "page", 100_000),
    querySearchAnalytics(startDate, endDate, "query", 25_000),
    querySearchAnalytics(startDate, endDate, "page_query", 100_000),
    querySearchAnalytics(previousRange.startDate, previousRange.endDate, "page", 100_000),
    querySearchAnalytics(previousRange.startDate, previousRange.endDate, "page_query", 100_000),
  ]);
  if ([site, pages, queries, pageQueries, previousPages, previousPageQueries].some((result) => result.availability !== "available")) {
    const unavailable = [site, pages, queries, pageQueries, previousPages, previousPageQueries].find((result) => result.availability !== "available");
    res.status(503).json({
      availability: unavailable?.availability ?? "api_error",
      synced: false,
      error: unavailable?.error ?? "Search Console is unavailable.",
      totals: { pages: 0, queries: 0, pageQueries: 0 },
      alertsCreated: 0,
      completeness: { pages: false, queries: false, pageQueries: false, previousPages: false, previousPageQueries: false },
    }); return;
  }
  const completeness = {
    pages: pages.complete,
    queries: queries.complete,
    pageQueries: pageQueries.complete,
    previousPages: previousPages.complete,
    previousPageQueries: previousPageQueries.complete,
  };
  const rows = [
    ...site.rows.map((row) => ({ ...row, dimension: "site" })),
    ...pages.rows.map((row) => ({ ...row, dimension: "page" })),
    ...queries.rows.map((row) => ({ ...row, dimension: "query" })),
    ...pageQueries.rows.map((row) => ({ ...row, dimension: "page_query" })),
  ];
  const currentMetrics = pageQueries.rows.map(parsePageQueryMetric).filter((row): row is PageQueryMetric => row !== null);
  const previousMetrics = previousPageQueries.rows.map(parsePageQueryMetric).filter((row): row is PageQueryMetric => row !== null);
  const currentPageMetrics = pages.rows.map(parsePageMetric);
  const previousPageMetrics = previousPages.rows.map(parsePageMetric);
  const entries = await sitemapEntries();
  const evidence = await loadPageEvidence([...new Set([...currentMetrics, ...previousMetrics, ...currentPageMetrics, ...previousPageMetrics].map((row) => row.page))], entries);
  const fallbackEvidence: PageEvidence = { protected: false, exists: false, noindex: false, canonical: null, coverageState: null, redirect: false };
  const pageAlerts = buildTrafficAlerts(currentPageMetrics, previousPageMetrics, (page) => evidence.get(page) ?? fallbackEvidence, {
    currentComplete: pages.complete,
    previousComplete: previousPages.complete,
  });
  const queryAlerts = buildTrafficAlerts(currentMetrics, previousMetrics, (page) => evidence.get(page) ?? fallbackEvidence, {
    currentComplete: pageQueries.complete,
    previousComplete: previousPageQueries.complete,
    includeExcluded: false,
  });
  const alerts = [...pageAlerts, ...queryAlerts];
  const snapshotValues = rows.map((row) => ({
    periodStart: startDate, periodEnd: endDate, dimension: row.dimension, dimensionValue: row.key,
    clicks: Math.round(row.clicks), impressions: Math.round(row.impressions), ctr: String(row.ctr), position: String(row.position),
    completeness,
  }));
  const alertValues = alerts.map((alert) => ({
    periodStart: startDate,
    periodEnd: endDate,
    previousPeriodStart: previousRange.startDate,
    previousPeriodEnd: previousRange.endDate,
    page: alert.page,
    query: alert.query,
    severity: alert.severity,
    reason: alert.reason,
    message: alert.message,
    previousClicks: Math.round(alert.previousClicks),
    currentClicks: Math.round(alert.currentClicks),
    previousImpressions: Math.round(alert.previousImpressions),
    currentImpressions: Math.round(alert.currentImpressions),
    previousPosition: String(alert.previousPosition),
    currentPosition: String(alert.currentPosition),
    previousAvailable: alert.previousAvailable,
  }));
  await db.transaction(async (tx) => {
    await tx.delete(seoPerformanceSnapshotsTable).where(and(
      eq(seoPerformanceSnapshotsTable.periodStart, startDate),
      eq(seoPerformanceSnapshotsTable.periodEnd, endDate),
    ));
    for (let i = 0; i < snapshotValues.length; i += 500) await tx.insert(seoPerformanceSnapshotsTable).values(snapshotValues.slice(i, i + 500))
      .onConflictDoNothing();
    await tx.delete(seoTrafficAlertsTable).where(and(
      eq(seoTrafficAlertsTable.periodStart, startDate),
      eq(seoTrafficAlertsTable.periodEnd, endDate),
    ));
    for (let i = 0; i < alertValues.length; i += 500) await tx.insert(seoTrafficAlertsTable).values(alertValues.slice(i, i + 500));
  });
  res.json({ availability: "available", synced: true, error: null, startDate, endDate, totals: { pages: pages.rows.length, queries: queries.rows.length, pageQueries: pageQueries.rows.length }, alertsCreated: alerts.length, completeness });
});

router.post("/seo/dashboard/audit", requireAuth, async (req, res): Promise<void> => {
  const entries = await sitemapEntries();
  const rules = await loadRobotsRules();
  const run = await db.insert(seoAuditRunsTable).values({ status: "partial", urlsScanned: 0, issueCount: 0, summary: {} }).returning();
  const issues: AuditIssueCandidate[] = [];
  const metadata: AuditMetadata[] = [];
  const inbound = new Set<string>();
  for (let i = 0; i < entries.length; i += 20) await Promise.all(entries.slice(i, i + 20).map(async (entry) => {
    let html: string | null = null; const hasStaticFile = await staticFileExists(entry.path);
    if (hasStaticFile) { const stripped = entry.path.replace(/^\//, "").replace(/\/$/, ""); try { html = await readFile(path.join(PUBLIC_DIR, stripped, "index.html"), "utf8"); } catch { try { html = await readFile(path.join(PUBLIC_DIR, `${stripped}.html`), "utf8"); } catch { /* checked existence is best effort */ } } }
    issues.push(...classifyAuditPage({ url: entry.url, path: entry.path, html, hasStaticFile, robotsBlocked: isPathBlocked(rules, entry.path) }));
    if (html) {
      metadata.push(extractAuditMetadata(entry.url, html));
      for (const match of html.matchAll(/href=["'](\/[^"'?#]*)/gi)) {
        const href = match[1].endsWith("/") ? match[1] : `${match[1]}/`;
        inbound.add(href);
      }
    }
  }));
  const orphanIssues = entries
    .filter((entry) => entry.path !== "/" && !inbound.has(entry.path.endsWith("/") ? entry.path : `${entry.path}/`))
    .map((entry) => ({ url: entry.url, category: "orphan_risk", severity: "info" as const, message: "No internal HTML link to this sitemap URL was found.", details: {} }));
  issues.push(...duplicateMetadataValueIssues(metadata), ...orphanIssues);
  for (let i = 0; i < issues.length; i += 500) {
    await db.insert(seoAuditIssuesTable).values(issues.slice(i, i + 500).map((issue) => ({ auditRunId: run[0].id, ...issue })));
  }
  await db.update(seoAuditRunsTable).set({ status: "completed", completedAt: new Date(), urlsScanned: entries.length, issueCount: issues.length, summary: { sitemapFiles: (await getSitemapFiles()).length } }).where(eq(seoAuditRunsTable.id, run[0].id));
  res.json({ auditRunId: run[0].id, status: "completed", urlsScanned: entries.length, issues: issues.slice(0, 500) });
});

router.get("/seo/dashboard/issues", requireAuth, async (req, res): Promise<void> => {
  const limit = Math.min(Math.max(Number(req.query.limit) || 100, 1), 500);
  const latest = await db.select().from(seoAuditRunsTable).orderBy(desc(seoAuditRunsTable.completedAt)).limit(1);
  if (!latest[0]) { res.json([]); return; }
  let issues = await db.select().from(seoAuditIssuesTable).where(eq(seoAuditIssuesTable.auditRunId, latest[0].id)).limit(limit);
  for (const field of ["severity", "status", "category"] as const) if (typeof req.query[field] === "string") issues = issues.filter((issue) => issue[field] === req.query[field]);
  res.json(issues);
});

router.get("/seo/dashboard", requireAuth, async (_req, res): Promise<void> => {
  const entries = await sitemapEntries();
  const sitemapPaths = new Set(entries.map((entry) => entry.path.endsWith("/") ? entry.path : `${entry.path}/`));
  const [latestAudit, latestPerformancePeriod, performanceHistory, leads] = await Promise.all([
    db.select().from(seoAuditRunsTable).orderBy(desc(seoAuditRunsTable.completedAt)).limit(1),
    db.select({
      periodStart: seoPerformanceSnapshotsTable.periodStart,
      periodEnd: seoPerformanceSnapshotsTable.periodEnd,
    }).from(seoPerformanceSnapshotsTable).orderBy(desc(seoPerformanceSnapshotsTable.syncedAt)).limit(1),
    db.select({
      startDate: seoPerformanceSnapshotsTable.periodStart,
      endDate: seoPerformanceSnapshotsTable.periodEnd,
      clicks: seoPerformanceSnapshotsTable.clicks,
      impressions: seoPerformanceSnapshotsTable.impressions,
      position: seoPerformanceSnapshotsTable.position,
    }).from(seoPerformanceSnapshotsTable)
      .where(eq(seoPerformanceSnapshotsTable.dimension, "site"))
      .orderBy(desc(seoPerformanceSnapshotsTable.periodEnd))
      .limit(12),
    db.select({
      source: leadsTable.source,
      medium: leadsTable.medium,
      campaign: leadsTable.campaign,
      landingPath: leadsTable.landingPath,
      referrer: leadsTable.referrer,
      count: sql<number>`cast(count(*) as integer)`,
    }).from(leadsTable).groupBy(
      leadsTable.source,
      leadsTable.medium,
      leadsTable.campaign,
      leadsTable.landingPath,
      leadsTable.referrer,
    ),
  ]);
  const latestPeriod = latestPerformancePeriod[0];
  const [performance, pageQueryPerformance, trafficAlerts] = latestPeriod
    ? await Promise.all([
      db.select().from(seoPerformanceSnapshotsTable).where(and(
        eq(seoPerformanceSnapshotsTable.periodStart, latestPeriod.periodStart),
        eq(seoPerformanceSnapshotsTable.periodEnd, latestPeriod.periodEnd),
        sql`${seoPerformanceSnapshotsTable.dimension} <> 'page_query'`,
      )).orderBy(desc(seoPerformanceSnapshotsTable.clicks)).limit(500),
      db.select().from(seoPerformanceSnapshotsTable).where(and(
      eq(seoPerformanceSnapshotsTable.periodStart, latestPeriod.periodStart),
      eq(seoPerformanceSnapshotsTable.periodEnd, latestPeriod.periodEnd),
        eq(seoPerformanceSnapshotsTable.dimension, "page_query"),
      )).orderBy(desc(seoPerformanceSnapshotsTable.clicks), desc(seoPerformanceSnapshotsTable.impressions)).limit(25_000),
      db.select().from(seoTrafficAlertsTable).where(and(
        eq(seoTrafficAlertsTable.periodStart, latestPeriod.periodStart),
        eq(seoTrafficAlertsTable.periodEnd, latestPeriod.periodEnd),
      )).orderBy(
        sql`case ${seoTrafficAlertsTable.severity} when 'critical' then 2 when 'warning' then 1 else 0 end desc`,
        desc(seoTrafficAlertsTable.previousClicks),
      ).limit(250),
    ])
    : [[], [], []];
  const openIssues = latestAudit[0] ? await db.select().from(seoAuditIssuesTable).where(eq(seoAuditIssuesTable.auditRunId, latestAudit[0].id)).limit(25) : [];
  const keywordRetention = pageQueryPerformance.map((row) => {
    let page = "";
    let query = "";
    try {
      const parsed = JSON.parse(row.dimensionValue) as { page?: unknown; query?: unknown };
      page = typeof parsed.page === "string" ? parsed.page : "";
      query = typeof parsed.query === "string" ? parsed.query : "";
    } catch { /* malformed historical rows stay visible as at-risk */ }
    let pathname = page;
    try { pathname = new URL(page).pathname; } catch { /* retain raw path */ }
    const normalizedPath = pathname.endsWith("/") ? pathname : `${pathname}/`;
    return {
      page,
      query,
      clicks: row.clicks,
      impressions: row.impressions,
      position: row.position,
      status: sitemapPaths.has(normalizedPath) ? "protected" : "review",
    };
  }).sort((a, b) => b.clicks - a.clicks || b.impressions - a.impressions);
  res.json({
    inventory: {
      totalUrls: entries.length,
      byCategory: Object.fromEntries(entries.reduce((m, e) => m.set(e.category, (m.get(e.category) ?? 0) + 1), new Map<string, number>())),
    },
    performance,
    keywordRetention: {
      protectedCount: keywordRetention.filter((row) => row.status === "protected").length,
      reviewCount: keywordRetention.filter((row) => row.status === "review").length,
      reviewClicks: keywordRetention.filter((row) => row.status === "review").reduce((sum, row) => sum + row.clicks, 0),
      reviewImpressions: keywordRetention.filter((row) => row.status === "review").reduce((sum, row) => sum + row.impressions, 0),
      opportunities: keywordRetention.filter((row) => row.status === "review").slice(0, 100),
    },
    trafficAlerts,
    performanceCompleteness: (() => {
      const value = performance.find((row) => row.dimension === "site")?.completeness;
      if (value && typeof value === "object") return value;
      return { pages: false, queries: false, pageQueries: false, previousPages: false, previousPageQueries: false };
    })(),
    performanceHistory,
    organicAttribution: leads.filter((lead) => (lead.medium ?? "").toLowerCase() === "organic"),
    latestAudit: latestAudit[0] ?? null,
    openIssues,
  });
});

export default router;
