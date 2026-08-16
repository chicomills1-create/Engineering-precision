---
name: Wikipedia image download pattern
description: How to download public-domain images (SVGs, PNGs) from Wikimedia Commons inside the Replit sandbox where CDN thumb URLs are blocked.
---

## The working pattern

Wikimedia CDN thumbnail URLs (`upload.wikimedia.org/wikipedia/commons/thumb/…`) return **400/403 in Replit** — blocked at the CDN level.

The **canonical file URLs** returned by the Wikipedia API work fine.

```javascript
// Node.js (run via ShellExec `node << 'EOF' … EOF`)
const apiUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=File:${encodeURIComponent(filename)}&prop=imageinfo&iiprop=url&format=json`;
const meta = await get(apiUrl);                              // get() = Node https.get wrapper
const json = JSON.parse(meta.buf.toString());
const page = Object.values(json.query.pages)[0];
if (!page.imageinfo) { /* file not found — try alternate filename */ }
const imageUrl = page.imageinfo[0].url;                     // canonical URL, not thumb
const img = await get(imageUrl);
fs.writeFileSync(localPath, img.buf);
```

**Why:** The API `imageinfo` URL points to the Swift object storage with a signed/routed path that Replit can reach; the thumb renderer endpoint rejects the request at a CDN layer.

## Gotchas

- **Rate limiting (429)**: Add 1–2 second delays between each API call + each image fetch. Honour `Retry-After` headers.
- **File not found**: Wikipedia file titles are case-sensitive and exact. If `imageinfo` is missing from the API response, the file title is wrong. Use `action=query&list=search&srnamespace=6&srsearch=…` to find the correct title.
- **Army seal**: The correct Wikipedia title is `Emblem_of_the_U.S._Department_of_the_Army.svg`, not `Seal_of_the_United_States_Department_of_the_Army.svg`.
- **VA seal**: `US-DeptOfVeteransAffairs-Seal.svg` — hyphenated, not underscored.
- Files are often SVGs; `<img src="…svg">` works fine in browsers. No conversion needed.

## Where files live

Military branch seals: `artifacts/apex-grid/public/images/military/{slug}.svg`
Served statically at `/images/military/{slug}.svg`.
