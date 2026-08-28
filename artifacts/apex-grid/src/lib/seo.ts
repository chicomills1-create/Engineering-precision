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
export function useJsonLd(schema: Record<string, unknown> | object | null) {
  useEffect(() => {
    if (!schema) return;
    const s = schema as Record<string, unknown>;
    const type = String(s["@type"] ?? "unknown");
    const entityId = typeof s["@id"] === "string" ? s["@id"] : "";
    const id = `jsonld-${(entityId || type).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`;
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
