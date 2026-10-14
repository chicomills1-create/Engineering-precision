// First-touch attribution.
//
// An inline capture script in index.html and seo/shell.ts stores the first
// landing URL's tracking params (gclid + UTMs) in sessionStorage, so they
// survive in-app navigation to a form page. Form submit handlers read through
// this helper: the current page URL wins, then the stored first touch.

const STORAGE_KEY = "apex:firstTouch";

export type AttributionParam = "gclid" | "utm_source" | "utm_medium" | "utm_campaign";

function readStoredFirstTouch(): Partial<Record<AttributionParam, string>> {
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed: unknown = JSON.parse(raw);
    if (parsed && typeof parsed === "object") {
      return parsed as Partial<Record<AttributionParam, string>>;
    }
  } catch {
    // sessionStorage unavailable (private mode, storage disabled) — fall through.
  }
  return {};
}

export function getFirstTouchValue(param: AttributionParam): string | undefined {
  const fromUrl = new URLSearchParams(window.location.search).get(param);
  if (fromUrl) return fromUrl;
  return readStoredFirstTouch()[param] || undefined;
}
