export function sitemapPathKey(value: string): string {
  let pathname = value.startsWith("/")
    ? value.split(/[?#]/, 1)[0]
    : value;
  if (!value.startsWith("/")) {
    try { pathname = new URL(value, "https://apexgrideng.com").pathname; } catch { /* retain raw paths */ }
  }
  try { pathname = decodeURIComponent(pathname); } catch { /* retain encoded paths */ }
  const normalized = `/${pathname.replace(/^\/+|\/+$/g, "")}`;
  return normalized === "/" ? "/" : normalized;
}