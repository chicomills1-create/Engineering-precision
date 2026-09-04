import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { BLOG_POSTS, type BlogPost } from "./blog";

const SITE = "https://apexgrideng.com";
const BUSINESS_ID = `${SITE}/#business`;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function blogPostingSchema(html: string, slug: string): Record<string, unknown> {
  const scripts = html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g);
  for (const match of scripts) {
    const schema = JSON.parse(match[1]) as Record<string, unknown>;
    if (schema["@type"] === "BlogPosting") return schema;
  }
  throw new Error(`[${slug}] Generated HTML is missing BlogPosting JSON-LD`);
}

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

export function verifyBlogPostAuthorship(post: BlogPost, html: string): void {
  const prefix = `[${post.slug}]`;
  const schema = blogPostingSchema(html, post.slug);
  const author = schema.author as Record<string, unknown> | undefined;
  const publisher = schema.publisher as Record<string, unknown> | undefined;

  assert(publisher?.["@type"] === "Organization", `${prefix} Publisher must be an Organization`);
  assert(publisher?.["@id"] === BUSINESS_ID, `${prefix} Publisher must point to ${BUSINESS_ID}`);
  assert(publisher?.name === "Apex Grid Engineering", `${prefix} Publisher must remain Apex Grid Engineering`);

  if (post.author) {
    assert(post.editorialApproval?.status === "approved", `${prefix} Named expert post must have editorial approval`);
    const profileUrl = escapeHtml(post.author.profileUrl);
    const authorName = escapeHtml(post.author.name);
    const authorRole = escapeHtml(post.author.role);
    const byline = `By <a href="${profileUrl}" rel="author">${authorName}</a> · ${authorRole}`;

    assert(html.includes(byline), `${prefix} Generated HTML is missing the visible founder-profile byline`);
    assert(
      html.includes(`<p class="note">${escapeHtml(post.editorialApproval.label)}</p>`),
      `${prefix} Generated HTML is missing the editorial-approval label`,
    );
    assert(author?.["@type"] === "Person", `${prefix} BlogPosting author must be a Person`);
    assert(author?.["@id"] === post.author.personId, `${prefix} BlogPosting author must point to ${post.author.personId}`);
    assert(
      author?.["@id"] === `${SITE}/jeremy-mills/#person`,
      `${prefix} Expert BlogPosting author must be Jeremy Mills`,
    );
  } else {
    assert(author?.["@type"] === "Organization", `${prefix} Legacy BlogPosting author must remain an Organization`);
    assert(author?.name === "Apex Grid Engineering", `${prefix} Legacy BlogPosting author must remain Apex Grid Engineering`);
    assert(author?.url === SITE, `${prefix} Legacy BlogPosting author must point to ${SITE}`);
  }
}

export function verifyGeneratedBlogAuthorship(blogDir: string): void {
  for (const post of BLOG_POSTS) {
    const htmlPath = path.join(blogDir, post.slug, "index.html");
    assert(fs.existsSync(htmlPath), `[${post.slug}] Generated blog HTML does not exist at ${htmlPath}`);
    verifyBlogPostAuthorship(post, fs.readFileSync(htmlPath, "utf8"));
  }
}

const isDirectRun = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isDirectRun) {
  const blogDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../public/blog");
  verifyGeneratedBlogAuthorship(blogDir);
  console.log(`Verified bylines, authors, and publisher for ${BLOG_POSTS.length} generated blog posts.`);
}