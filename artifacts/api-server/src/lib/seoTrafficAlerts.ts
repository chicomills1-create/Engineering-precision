export type TrafficAlertReason =
  | "position_movement"
  | "redirect"
  | "noindex"
  | "missing_page"
  | "canonical_change"
  | "excluded_page"
  | "traffic_loss";

export interface PageQueryMetric {
  page: string;
  query: string;
  clicks: number;
  impressions: number;
  position: number;
}

export interface PageEvidence {
  protected: boolean;
  exists: boolean;
  noindex: boolean;
  canonical: string | null;
  coverageState: string | null;
  redirect: boolean;
}

export interface TrafficAlertCandidate {
  page: string;
  query: string;
  severity: "critical" | "warning" | "info";
  reason: TrafficAlertReason;
  message: string;
  previousClicks: number;
  currentClicks: number;
  previousImpressions: number;
  currentImpressions: number;
  previousPosition: number;
  currentPosition: number;
  previousAvailable: boolean;
}

function materialLoss(previous: PageQueryMetric, current: PageQueryMetric): boolean {
  const clickLoss = previous.clicks - current.clicks;
  const impressionLoss = previous.impressions - current.impressions;
  return (
    (previous.clicks >= 10 && clickLoss >= 5 && clickLoss / previous.clicks >= 0.3)
    || (previous.impressions >= 200 && impressionLoss >= 100 && impressionLoss / previous.impressions >= 0.3)
  );
}

function structuralReason(page: string, evidence: PageEvidence): TrafficAlertReason {
  const coverage = evidence.coverageState?.toLowerCase() ?? "";
  if (evidence.redirect || coverage.includes("redirect")) return "redirect";
  if (coverage.includes("not found") || coverage.includes("404")) return "missing_page";
  if (evidence.noindex || coverage.includes("noindex")) return "noindex";
  if (evidence.canonical && normalizeUrl(evidence.canonical, page) !== normalizeUrl(page, page)) return "canonical_change";
  return "traffic_loss";
}

function normalizeUrl(value: string, base: string): string {
  try {
    const url = new URL(value, base);
    url.hash = "";
    url.search = "";
    return `${url.origin}${url.pathname.replace(/\/+$/, "") || "/"}`;
  } catch {
    return value.replace(/\/+$/, "");
  }
}

function metricKey(row: PageQueryMetric): string {
  return JSON.stringify([row.page, row.query]);
}

export function buildTrafficAlerts(
  currentRows: PageQueryMetric[],
  previousRows: PageQueryMetric[],
  evidenceFor: (page: string) => PageEvidence,
  options: { currentComplete?: boolean; previousComplete?: boolean; includeExcluded?: boolean } = {},
): TrafficAlertCandidate[] {
  const currentComplete = options.currentComplete ?? true;
  const includeExcluded = options.includeExcluded ?? true;
  const currentByKey = new Map(currentRows.map((row) => [metricKey(row), row]));
  const previousByKey = new Map(previousRows.map((row) => [metricKey(row), row]));
  const alerts: TrafficAlertCandidate[] = [];

  for (const current of currentRows) {
    const evidence = evidenceFor(current.page);
    if (includeExcluded && !evidence.protected && (current.clicks > 0 || current.impressions >= 50)) {
      const previous = previousByKey.get(metricKey(current));
      alerts.push({
        page: current.page,
        query: current.query,
        severity: current.clicks >= 5 ? "critical" : "warning",
        reason: "excluded_page",
        message: "Search traffic is landing on a page outside the protected sitemap. Review evidence before changing indexation.",
        previousClicks: previous?.clicks ?? 0,
        currentClicks: current.clicks,
        previousImpressions: previous?.impressions ?? 0,
        currentImpressions: current.impressions,
        previousPosition: previous?.position ?? 0,
        currentPosition: current.position,
        previousAvailable: previous !== undefined || (options.previousComplete ?? true),
      });
    }
  }

  for (const previous of previousRows) {
    const evidence = evidenceFor(previous.page);
    if (!evidence.protected) continue;
    const currentMatch = currentByKey.get(metricKey(previous));
    if (!currentMatch && !currentComplete) continue;
    const current = currentMatch ?? { ...previous, clicks: 0, impressions: 0, position: 0 };
    if (!materialLoss(previous, current)) continue;
    const structural = structuralReason(previous.page, evidence);
    const positionWorsened = current.position > 0 && previous.position > 0 && current.position - previous.position >= 2;
    const reason = structural === "traffic_loss" && positionWorsened ? "position_movement" : structural;
    alerts.push({
      page: previous.page,
      query: previous.query,
      severity: reason === "position_movement" || reason === "traffic_loss" ? "warning" : "critical",
      reason,
      message: reason === "position_movement"
        ? "Material keyword traffic declined while average position worsened."
        : reason === "traffic_loss"
          ? "Material keyword traffic declined without a confirmed page-state or position cause."
          : `Material keyword traffic declined and the page is classified as ${reason.replace("_", " ")}.`,
      previousClicks: previous.clicks,
      currentClicks: current.clicks,
      previousImpressions: previous.impressions,
      currentImpressions: current.impressions,
      previousPosition: previous.position,
      currentPosition: current.position,
      previousAvailable: true,
    });
  }

  return alerts.sort((a, b) => {
    const severity = { critical: 2, warning: 1, info: 0 };
    return severity[b.severity] - severity[a.severity]
      || (b.previousClicks - b.currentClicks) - (a.previousClicks - a.currentClicks)
      || (b.currentClicks - a.currentClicks);
  });
}