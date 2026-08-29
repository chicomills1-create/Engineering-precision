/** URLs in this channel are evidence references, never LinkedIn action URLs. */
export type LinkedinUrlKind = "person" | "company" | "post";

export function normalizeLinkedinUrl(value: string, kind?: LinkedinUrlKind): string {
  let url: URL;
  try { url = new URL(value.trim()); } catch { throw new Error("A valid HTTPS LinkedIn URL is required"); }
  if (url.protocol !== "https:" || url.username || url.password) throw new Error("Only credential-free HTTPS LinkedIn URLs are allowed");
  const host = url.hostname.toLowerCase();
  if (host !== "linkedin.com" && host !== "www.linkedin.com") throw new Error("URL must use linkedin.com");
  const path = url.pathname.replace(/\/+$/, "") || "/";
  const inferred: LinkedinUrlKind | undefined = path.startsWith("/in/") ? "person"
    : path.startsWith("/company/") ? "company"
      : (path.startsWith("/posts/") || path.startsWith("/feed/update/")) ? "post" : undefined;
  if (!inferred || (kind && inferred !== kind)) throw new Error("LinkedIn URL must be an allowed public profile, company, or post URL");
  // Direct messaging, invitations, search, and other action paths never pass the allowlist.
  url.hostname = "www.linkedin.com";
  url.pathname = path;
  url.search = "";
  url.hash = "";
  return url.toString();
}

export function normalizeEvidenceUrl(value: string): string {
  const url = new URL(value.trim());
  if (url.protocol !== "https:" || url.username || url.password) throw new Error("Evidence URL must be credential-free HTTPS");
  if (url.hostname === "linkedin.com" || url.hostname === "www.linkedin.com") return normalizeLinkedinUrl(url.toString());
  url.search = "";
  url.hash = "";
  return url.toString();
}