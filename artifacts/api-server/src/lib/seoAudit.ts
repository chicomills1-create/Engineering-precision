export type SeoIssueSeverity = "critical" | "warning" | "info";
export interface AuditPage {
  url: string;
  path: string;
  html: string | null;
  hasStaticFile: boolean;
  robotsBlocked: boolean;
}
export interface AuditIssueCandidate {
  url: string;
  category: string;
  severity: SeoIssueSeverity;
  message: string;
  details: Record<string, unknown>;
}

const metaContent = (html: string, name: string) =>
  html.match(new RegExp(`<meta[^>]+(?:name|property)=["']${name}["'][^>]+content=["']([^"']*)`, "i"))?.[1] ??
  html.match(new RegExp(`<meta[^>]+content=["']([^"']*)["'][^>]+(?:name|property)=["']${name}["']`, "i"))?.[1] ?? "";

export interface AuditMetadata {
  url: string;
  title: string;
  description: string;
}

export function extractAuditMetadata(url: string, html: string): AuditMetadata {
  return {
    url,
    title: html.match(/<title>([\s\S]*?)<\/title>/i)?.[1]?.trim() ?? "",
    description: metaContent(html, "description"),
  };
}

export function classifyAuditPage(page: AuditPage): AuditIssueCandidate[] {
  const issues: AuditIssueCandidate[] = [];
  const shouldHaveStaticFile = page.path !== "/" && page.path.endsWith("/");
  if (!page.hasStaticFile && shouldHaveStaticFile) {
    issues.push({ url: page.url, category: "static_file", severity: "critical", message: "Static sitemap URL has no matching HTML file.", details: {} });
  }
  if (page.robotsBlocked) issues.push({ url: page.url, category: "robots", severity: "critical", message: "Sitemap URL is blocked by robots.txt.", details: {} });
  if (!page.html) return issues;
  const canonical = page.html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)/i)?.[1];
  if (!canonical) issues.push({ url: page.url, category: "canonical", severity: "warning", message: "Canonical link is missing.", details: {} });
  else if (canonical !== page.url) issues.push({ url: page.url, category: "canonical", severity: "warning", message: "Canonical URL does not match sitemap URL.", details: { canonical } });
  if (/<meta[^>]+name=["']robots["'][^>]+content=["'][^"']*noindex/i.test(page.html)) issues.push({ url: page.url, category: "noindex", severity: "critical", message: "Page is both sitemap-listed and marked noindex.", details: {} });
  if (!/<title>\s*\S[\s\S]*?<\/title>/i.test(page.html)) issues.push({ url: page.url, category: "title", severity: "warning", message: "Title is missing.", details: {} });
  if (!metaContent(page.html, "description")) issues.push({ url: page.url, category: "description", severity: "warning", message: "Meta description is missing.", details: {} });
  const scripts = [...page.html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  if (!scripts.length) issues.push({ url: page.url, category: "json_ld", severity: "info", message: "JSON-LD is missing.", details: {} });
  else if (scripts.some((s) => { try { JSON.parse(s[1]); return false; } catch { return true; } })) issues.push({ url: page.url, category: "json_ld", severity: "warning", message: "JSON-LD is not parseable.", details: {} });
  return issues;
}

export function duplicateMetadataIssues(pages: Array<{ url: string; html: string | null }>): AuditIssueCandidate[] {
  return duplicateMetadataValueIssues(
    pages
      .filter((page): page is { url: string; html: string } => page.html !== null)
      .map((page) => extractAuditMetadata(page.url, page.html)),
  );
}

export function duplicateMetadataValueIssues(pages: AuditMetadata[]): AuditIssueCandidate[] {
  const issues: AuditIssueCandidate[] = [];
  for (const kind of ["title", "description"] as const) {
    const groups = new Map<string, string[]>();
    for (const page of pages) {
      const value = page[kind];
      if (value) groups.set(value, [...(groups.get(value) ?? []), page.url]);
    }
    for (const [value, urls] of groups) if (urls.length > 1) for (const url of urls) issues.push({ url, category: `duplicate_${kind}`, severity: "warning", message: `Duplicate ${kind} shared by ${urls.length} pages.`, details: { value, urls } });
  }
  return issues;
}