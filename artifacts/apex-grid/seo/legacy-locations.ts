import type { DirectoryCity } from "./location-verticals";

/**
 * Historical location URLs must never disappear during Census name
 * normalization. Each changed slug either redirects to its current canonical
 * place or remains as a canonical legacy page when no incorporated-place
 * replacement exists in the current Gazetteer.
 */
export const LEGACY_LOCATION_REDIRECTS: Readonly<Record<string, string>> = {
  "/locations/idaho/coeur-dalene/": "/locations/idaho/coeur-d-alene/",
  "/locations/illinois/ofallon/": "/locations/illinois/o-fallon/",
  "/locations/kentucky/lexington-fayette/": "/locations/kentucky/lexington-fayette-urban-county/",
  "/locations/kentucky/lexington/": "/locations/kentucky/lexington-fayette-urban-county/",
  "/locations/mississippi/diberville/": "/locations/mississippi/d-iberville/",
  "/locations/missouri/lees-summit/": "/locations/missouri/lee-s-summit/",
  "/locations/missouri/ofallon/": "/locations/missouri/o-fallon/",
  "/locations/nevada/carson/": "/locations/nevada/carson-city/",
  "/locations/new-york/new-york-city/": "/locations/new-york/new-york/",
  "/locations/new-york/new-york-city/mep-engineering/": "/locations/new-york/new-york/mep-engineering/",
  "/locations/new-york/new-york-city/structural-engineering/": "/locations/new-york/new-york/structural-engineering/",
  "/locations/new-york/new-york-city/civil-engineering/": "/locations/new-york/new-york/civil-engineering/",
  "/locations/new-york/new-york-city/energy-code-compliance/": "/locations/new-york/new-york/energy-code-compliance/",
  "/locations/new-york/new-york-city/energy-compliance/": "/locations/new-york/new-york/energy-compliance/",
  "/locations/new-york/new-york-city/pe-stamped-drawings/": "/locations/new-york/new-york/pe-stamped-drawings/",
  "/locations/pennsylvania/bethel-park/": "/locations/pennsylvania/bethel-park-municipality/",
  "/locations/pennsylvania/monroeville/": "/locations/pennsylvania/monroeville-municipality/",
  "/locations/pennsylvania/murrysville/": "/locations/pennsylvania/murrysville-municipality/",
  "/locations/utah/kearns-metro-township/": "/locations/utah/kearns/",
  "/locations/utah/magna-metro-township/": "/locations/utah/magna/",
};

export const RETAINED_LEGACY_LOCATIONS: ReadonlyArray<{
  stateSlug: string;
  city: DirectoryCity;
}> = [
  {
    stateSlug: "hawaii",
    city: {
      slug: "honolulu",
      name: "Honolulu",
      designation: "Consolidated city-county service area",
      lat: 21.3099,
      lng: -157.8581,
    },
  },
  {
    stateSlug: "kentucky",
    city: {
      slug: "louisville",
      name: "Louisville",
      designation: "Consolidated city-county service area",
      lat: 38.2527,
      lng: -85.7585,
    },
  },
];

export function locationPath(stateSlug: string, citySlug: string): string {
  return `/locations/${stateSlug}/${citySlug}/`;
}