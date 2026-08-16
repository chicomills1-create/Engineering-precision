import { Router } from "express";
import { requireAuth } from "../middlewares/requireAuth";
import { readFile, access } from "fs/promises";
import path from "path";
import {
  getCachedResult,
  getCacheStats,
  inspectBatch,
  isGscConfigured,
  isQuotaExhausted,
  type GscVerdict,
} from "../lib/gscInspection";

const router = Router();

// Resolve the apex-grid public directory relative to the CWD (artifacts/api-server)
const PUBLIC_DIR = path.resolve(process.cwd(), "../apex-grid/public");

const SITEMAP_FILES = [
  { file: "sitemap-core.xml", category: "core" },
  { file: "sitemap-services.xml", category: "services" },
  { file: "sitemap-industries.xml", category: "industries" },
  { file: "sitemap-solutions.xml", category: "solutions" },
  { file: "sitemap-resources.xml", category: "resources" },
  { file: "sitemap-locations.xml", category: "locations" },
] as const;

type SitemapCategory = (typeof SITEMAP_FILES)[number]["category"];

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

      for (const { file, category } of SITEMAP_FILES) {
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
      for (const { file, category } of SITEMAP_FILES) {
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

export default router;
