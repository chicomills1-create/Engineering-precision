import { Router } from "express";
import { requireAuth } from "../middlewares/requireAuth";
import { readFile, access } from "fs/promises";
import path from "path";

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
}

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
): Omit<SitemapEntry, "hasStaticFile" | "softFourOhFourRisk" | "robotsBlocked" | "isHighPriority">[] {
  const entries: Omit<SitemapEntry, "hasStaticFile" | "softFourOhFourRisk" | "robotsBlocked" | "isHighPriority">[] =
    [];
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
            });
          });
        }

        allEntries.push(...withStatic);
      }

      res.json(allEntries);
    } catch (err) {
      req.log.error({ err }, "Failed to build SEO status");
      res.status(500).json({ error: "Failed to build SEO status" });
    }
  },
);

export default router;
