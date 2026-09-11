# SEO release steps

`seo:generate` writes and validates the local static SEO files. It never contacts
search engines, so it is safe to use during development and routine validation.

For a production SEO release:

1. Run `pnpm --filter @workspace/apex-grid run seo:generate`.
2. Build and publish the generated files.
3. Confirm the published sitemap is available at
   `https://www.apexgrideng.com/sitemap_index.xml`.
4. Run `pnpm --filter @workspace/apex-grid run seo:notify-search-engines`.

Run the notification command only after the generated sitemap and pages are live
in production. The command submits the existing generated sitemap to Bing and
the generated sitemap URLs to IndexNow; it does not regenerate local files.