import { GoogleAuth } from "google-auth-library";
import { logger } from "./logger";

// Google Search Console URL Inspection integration.
//
// Uses a Google service account (JSON key in GOOGLE_SERVICE_ACCOUNT_KEY).
// The service account's email must be added as a user on the Search Console
// property (sc-domain:apexgrideng.com) for the API to return data.
//
// Results are cached in memory with a ~1 hour TTL. The URL Inspection API
// has strict quotas (2,000 requests/day, 600/minute per property), so URLs
// are only inspected in explicit, capped batches — never all at once.

export type GscVerdict = "indexed" | "not_indexed" | "unknown";

export interface GscResult {
  verdict: GscVerdict;
  coverageState: string | null;
  checkedAt: string; // ISO timestamp
}

const SITE_URL = "sc-domain:apexgrideng.com";
const INSPECT_ENDPOINT =
  "https://searchconsole.googleapis.com/v1/urlInspection/index:inspect";
const SEARCH_ANALYTICS_ENDPOINT =
  "https://searchconsole.googleapis.com/webmasters/v3/sites/sc-domain%3Aapexgrideng.com/searchAnalytics/query";
const SCOPE = "https://www.googleapis.com/auth/webmasters.readonly";

const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour
const QUOTA_COOLDOWN_MS = 15 * 60 * 1000; // back off 15 min after a 429

const cache = new Map<string, GscResult>();
let quotaExhaustedUntil = 0;

let auth: GoogleAuth | null | undefined;

function getAuth(): GoogleAuth | null {
  if (auth !== undefined) return auth;
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
  if (!raw) {
    auth = null;
    return auth;
  }
  try {
    const credentials = JSON.parse(raw);
    auth = new GoogleAuth({ credentials, scopes: [SCOPE] });
  } catch (err) {
    logger.error({ err }, "GOOGLE_SERVICE_ACCOUNT_KEY is not valid JSON");
    auth = null;
  }
  return auth;
}

export function isGscConfigured(): boolean {
  return getAuth() !== null;
}

export function isQuotaExhausted(): boolean {
  return Date.now() < quotaExhaustedUntil;
}

export function getCachedResult(url: string): GscResult | null {
  const hit = cache.get(url);
  if (!hit) return null;
  if (Date.now() - Date.parse(hit.checkedAt) > CACHE_TTL_MS) {
    cache.delete(url);
    return null;
  }
  return hit;
}

export function getCacheStats(): { checked: number } {
  // Prune expired entries while counting.
  const now = Date.now();
  for (const [url, result] of cache) {
    if (now - Date.parse(result.checkedAt) > CACHE_TTL_MS) cache.delete(url);
  }
  return { checked: cache.size };
}

interface InspectionResponse {
  inspectionResult?: {
    indexStatusResult?: {
      verdict?: string;
      coverageState?: string;
    };
  };
}

/**
 * Map a GSC index status verdict to our indexed/not-indexed/unknown state.
 * Per URL Inspection API semantics: PASS = URL is on Google; PARTIAL =
 * indexed with issues (still on Google); NEUTRAL = excluded / not indexed
 * (the non-error "not on Google" outcome); FAIL = not indexed due to error.
 * Missing or VERDICT_UNSPECIFIED = unknown. coverageState carries detail.
 */
export function mapIndexVerdict(verdict: string | undefined): GscVerdict {
  switch (verdict) {
    case "PASS":
    case "PARTIAL":
      return "indexed";
    case "NEUTRAL":
    case "FAIL":
      return "not_indexed";
    default:
      return "unknown";
  }
}

export type SearchAnalyticsAvailability =
  | "available"
  | "unconfigured"
  | "quota_exhausted"
  | "api_error";

export interface SearchAnalyticsRow {
  key: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

export interface SearchAnalyticsOutcome {
  availability: SearchAnalyticsAvailability;
  rows: SearchAnalyticsRow[];
  error: string | null;
  complete: boolean;
}

/**
 * Queries the official Search Analytics endpoint. An unavailable integration is
 * deliberately distinct from an empty report: empty rows only mean Google
 * returned no matching traffic.
 */
export async function querySearchAnalytics(
  startDate: string,
  endDate: string,
  dimension: "page" | "query" | "page_query" | "site",
  rowLimit = 1000,
): Promise<SearchAnalyticsOutcome> {
  const client = getAuth();
  if (!client) return { availability: "unconfigured", rows: [], error: "Google Search Console credentials are not configured.", complete: false };
  if (isQuotaExhausted()) return { availability: "quota_exhausted", rows: [], error: "Google Search Console quota is temporarily exhausted.", complete: false };
  try {
    const token = await client.getAccessToken();
    if (!token) return { availability: "api_error", rows: [], error: "Unable to obtain a Google Search Console access token.", complete: false };
    const maxRows = dimension === "site" ? 1 : Math.min(Math.max(rowLimit, 1), 100_000);
    const rawRows: Array<{ keys?: string[]; clicks?: number; impressions?: number; ctr?: number; position?: number }> = [];
    let complete = true;
    while (rawRows.length < maxRows) {
      const pageSize = Math.min(25_000, maxRows - rawRows.length);
      const response = await fetch(SEARCH_ANALYTICS_ENDPOINT, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          startDate,
          endDate,
          ...(dimension === "site" ? {} : { dimensions: dimension === "page_query" ? ["page", "query"] : [dimension] }),
          rowLimit: pageSize,
          startRow: rawRows.length,
        }),
      });
      if (response.status === 429) {
        quotaExhaustedUntil = Date.now() + QUOTA_COOLDOWN_MS;
        return { availability: "quota_exhausted", rows: [], error: "Google Search Console quota is temporarily exhausted.", complete: false };
      }
      if (!response.ok) return { availability: "api_error", rows: [], error: `Search Analytics request failed (${response.status}).`, complete: false };
      const payload = (await response.json()) as { rows?: Array<{ keys?: string[]; clicks?: number; impressions?: number; ctr?: number; position?: number }> };
      const batch = payload.rows ?? [];
      rawRows.push(...batch);
      if (batch.length < pageSize) break;
      if (rawRows.length >= maxRows) complete = false;
    }
    return {
      availability: "available",
      error: null,
      complete,
      rows: rawRows.map((row) => ({
        key: dimension === "site"
          ? "site"
          : dimension === "page_query"
            ? JSON.stringify({ page: row.keys?.[0] ?? "", query: row.keys?.[1] ?? "" })
            : row.keys?.[0] ?? "",
        clicks: row.clicks ?? 0,
        impressions: row.impressions ?? 0,
        ctr: row.ctr ?? 0,
        position: row.position ?? 0,
      })),
    };
  } catch (err) {
    logger.warn({ err }, "Search Analytics request failed");
    return { availability: "api_error", rows: [], error: "Search Analytics request could not be completed.", complete: false };
  }
}

async function inspectOne(url: string, token: string): Promise<GscResult> {
  const res = await fetch(INSPECT_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ inspectionUrl: url, siteUrl: SITE_URL }),
  });

  if (res.status === 429) {
    quotaExhaustedUntil = Date.now() + QUOTA_COOLDOWN_MS;
    throw Object.assign(new Error("GSC quota exceeded"), { quota: true });
  }
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`GSC inspect failed (${res.status}): ${body.slice(0, 300)}`);
  }

  const data = (await res.json()) as InspectionResponse;
  const status = data.inspectionResult?.indexStatusResult;
  return {
    verdict: mapIndexVerdict(status?.verdict),
    coverageState: status?.coverageState ?? null,
    checkedAt: new Date().toISOString(),
  };
}

export interface BatchOutcome {
  checked: number;
  indexed: number;
  notIndexed: number;
  errors: number;
  quotaExhausted: boolean;
}

/**
 * Inspect a capped batch of URLs that aren't in the cache yet.
 * Runs with small concurrency and stops immediately on quota exhaustion.
 */
export async function inspectBatch(
  urls: string[],
  limit: number,
): Promise<BatchOutcome> {
  const outcome: BatchOutcome = {
    checked: 0,
    indexed: 0,
    notIndexed: 0,
    errors: 0,
    quotaExhausted: isQuotaExhausted(),
  };

  const client = getAuth();
  if (!client || outcome.quotaExhausted) return outcome;

  const token = await client.getAccessToken();
  if (!token) throw new Error("Failed to obtain GSC access token");

  const pending = urls.filter((u) => !getCachedResult(u)).slice(0, limit);

  const CONCURRENCY = 3;
  let index = 0;
  let stop = false;

  async function worker(): Promise<void> {
    while (!stop) {
      const i = index++;
      if (i >= pending.length) return;
      const url = pending[i];
      try {
        const result = await inspectOne(url, token as string);
        cache.set(url, result);
        outcome.checked++;
        if (result.verdict === "indexed") outcome.indexed++;
        else if (result.verdict === "not_indexed") outcome.notIndexed++;
      } catch (err) {
        if ((err as { quota?: boolean }).quota) {
          outcome.quotaExhausted = true;
          stop = true;
          return;
        }
        outcome.errors++;
        logger.warn({ err, url }, "GSC inspection failed for URL");
      }
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(CONCURRENCY, pending.length) }, worker),
  );

  return outcome;
}
