/**
 * Fetch every generated sitemap URL from an exact local production-routing
 * model. Redirects are never followed: each listed URL must itself return 200.
 */
import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC = process.env.SEO_OUTPUT_DIR
  ? path.resolve(__dirname, "..", process.env.SEO_OUTPUT_DIR)
  : path.resolve(__dirname, "../public");
const SITE = "https://apexgrideng.com";
const CONCURRENCY = 96;

function sitemapUrls(): string[] {
  const urls: string[] = [];
  for (const filename of fs.readdirSync(PUBLIC)) {
    if (!/^sitemap(?:[-_].+)?\.xml$/.test(filename)) continue;
    const xml = fs.readFileSync(path.join(PUBLIC, filename), "utf8");
    for (const match of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
      if (match[1].startsWith(SITE) && !/\.xml(?:$|\?)/i.test(match[1])) urls.push(match[1]);
    }
  }
  return [...new Set(urls)];
}

function safeFileForUrl(pathname: string): string | undefined {
  let relative: string;
  try {
    relative = decodeURIComponent(pathname).replace(/^\/+|\/+$/g, "");
  } catch {
    return undefined;
  }
  const candidate = pathname === "/"
    ? path.join(PUBLIC, "index.html")
    : path.extname(relative)
      ? path.resolve(PUBLIC, relative)
      : path.resolve(PUBLIC, relative, "index.html");
  if (candidate !== path.join(PUBLIC, "index.html") && !candidate.startsWith(`${PUBLIC}${path.sep}`)) return undefined;
  return candidate;
}

async function main() {
  if (!fs.existsSync(PUBLIC)) throw new Error(`SEO corpus missing: ${PUBLIC}`);
  const redirectFile = path.join(PUBLIC, "legacy-location-redirects.json");
  const redirects = fs.existsSync(redirectFile)
    ? JSON.parse(fs.readFileSync(redirectFile, "utf8")) as Record<string, string>
    : {};
  const urls = sitemapUrls();

  const server = http.createServer((req, res) => {
    const pathname = new URL(req.url ?? "/", "http://127.0.0.1").pathname;
    const redirectTarget = redirects[pathname];
    if (redirectTarget) {
      res.writeHead(301, { location: redirectTarget }).end();
      return;
    }
    const file = safeFileForUrl(pathname);
    if (!file || !fs.existsSync(file)) {
      res.writeHead(404).end();
      return;
    }
    res.writeHead(200).end();
  });

  await new Promise<void>((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });
  const address = server.address();
  if (!address || typeof address === "string") throw new Error("Sitemap HTTP validator could not start");
  const base = `http://127.0.0.1:${address.port}`;
  const failures: string[] = [];
  let next = 0;

  try {
    await Promise.all(Array.from({ length: CONCURRENCY }, async () => {
      while (true) {
        const index = next++;
        if (index >= urls.length) return;
        const expected = new URL(urls[index]);
        const response = await fetch(`${base}${expected.pathname}${expected.search}`, {
          method: "HEAD",
          redirect: "manual",
        });
        if (response.status !== 200 || response.url !== `${base}${expected.pathname}${expected.search}`) {
          failures.push(`${expected.pathname}: HTTP ${response.status}${response.headers.get("location") ? ` -> ${response.headers.get("location")}` : ""}`);
        }
      }
    }));
  } finally {
    await new Promise<void>((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
  }

  const result = {
    generatedAt: "deterministic",
    checked: urls.length,
    redirects: failures.filter((failure) => /HTTP 30[1278]/.test(failure)).length,
    non200: failures.length,
    failures: failures.length,
  };
  console.log(JSON.stringify(result));
  if (failures.length) {
    throw new Error(`Sitemap HTTP validation failed:\n${failures.slice(0, 20).join("\n")}`);
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});