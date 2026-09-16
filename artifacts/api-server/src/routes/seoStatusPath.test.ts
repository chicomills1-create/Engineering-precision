import assert from "node:assert/strict";
import test from "node:test";

import { sitemapPathKey } from "./seoStatusPath";

test("normalizes absolute and relative sitemap URLs symmetrically", () => {
  assert.equal(sitemapPathKey("https://apexgrideng.com/about/"), "/about");
  assert.equal(sitemapPathKey("https://apexgrideng.com/about"), "/about");
  assert.equal(sitemapPathKey("/about/"), "/about");
  assert.equal(sitemapPathKey("/about"), "/about");
});

test("normalizes the homepage without creating an empty key", () => {
  assert.equal(sitemapPathKey("https://apexgrideng.com/"), "/");
  assert.equal(sitemapPathKey("/"), "/");
});

test("removes duplicate boundary slashes and query fragments", () => {
  assert.equal(sitemapPathKey("//about///"), "/about");
  assert.equal(sitemapPathKey("https://apexgrideng.com/about/?source=gsc#top"), "/about");
});