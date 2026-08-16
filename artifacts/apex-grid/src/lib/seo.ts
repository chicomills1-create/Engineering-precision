import { useEffect } from "react";

// Production site URL. Set VITE_SITE_URL once the app is published;
// canonical/OG URL tags are only emitted when this is configured.
export const SITE_URL: string = (import.meta.env.VITE_SITE_URL as string | undefined)?.replace(/\/$/, "") ?? "";

export interface PageMeta {
  title: string;
  description: string;
  /** Route path starting with "/", e.g. "/services" */
  path: string;
}

function setMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

/**
 * Injects a JSON-LD structured-data script for the current page and removes
 * it on unmount/route change.
 */
export function useJsonLd(data: object | null) {
  useEffect(() => {
    if (!data) return;
    const el = document.createElement("script");
    el.type = "application/ld+json";
    el.setAttribute("data-page-jsonld", "true");
    el.textContent = JSON.stringify(data);
    document.head.appendChild(el);
    return () => {
      el.remove();
    };
  }, [JSON.stringify(data)]);
}

export function usePageMeta({ title, description, path }: PageMeta) {
  useEffect(() => {
    document.title = title;
    setMeta("name", "description", description);
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:type", "website");
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);

    if (SITE_URL) {
      const url = `${SITE_URL}${path === "/" ? "/" : path}`;
      setMeta("property", "og:url", url);
      let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement("link");
        canonical.setAttribute("rel", "canonical");
        document.head.appendChild(canonical);
      }
      canonical.setAttribute("href", url);
    }
  }, [title, description, path]);
}

/**
 * Injects a JSON-LD structured data script into <head>.
 * One script per @type — re-running with a different schema replaces the old one.
 */
export function useJsonLd(schema: Record<string, unknown>) {
  useEffect(() => {
    const type = String(schema["@type"] ?? "unknown");
    const id = `jsonld-${type.toLowerCase()}`;
    let script = document.getElementById(id) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = id;
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(schema);
    return () => {
      document.getElementById(id)?.remove();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(schema)]);
}
