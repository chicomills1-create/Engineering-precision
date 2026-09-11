# City evidence link review — 2026-09-11

The normal health check (`10,000 ms` timeout, concurrency `6`) initially checked 114 unique approved sources and found 29 issues:

- 22 HTTP errors
- 3 off-domain redirects
- 3 inaccessible sources
- 1 generic redirect

## Replaced or removed

Broken or moved sources were replaced with current official pages for Austin Development Services and Economic Development, Denver Economic Development & Opportunity, Houston construction codes and amendments, Los Angeles Department of Building and Safety and Economic & Workforce Development, Phoenix building codes, APS service territory, Oncor service territory, SRP service territory, and current Tempe department pages.

The obsolete Glendale sports-and-entertainment link was removed because the same market category retains multiple current official Glendale economic-development and airport sources. The retired DOE climate-zone URL was replaced with the local National Weather Service authority.

## Reviewed automated-access exceptions

Exceptions are explicit, URL-specific, response-specific, and dated in the checker. HTTP exceptions match the exact reviewed response code. Network exceptions preserve the fetch cause chain and match its low-level error code. They do not hide 404s, redirects, server errors, DNS failures, TLS failures, timeouts, or connection errors other than the exact reviewed condition.

- Five ICC code-library pages remain because they provide the exact adopted model-code texts cited for Tempe and Glendale. City adoption and ordinance pages identify adoption or amendments but do not reproduce those texts.
- Atlanta's permit page remains because no equivalent official source was found for the city's AHJ and permit process. Its construction-code page remains because state sources do not establish Atlanta's local administration and requirements.
- Duke Energy's business page remains for the electric-provider evidence shared by Charlotte, Durham, Greensboro, and Raleigh. City water pages and state records do not provide equivalent commercial electric-service evidence.
- Los Angeles Economic & Workforce Development remains the official authority for the broad city market claim. Alternate City landing pages also reject the safe check, while available official reports cover narrower programs.
- Tempe's Development Services, building-code, economic-development, and municipal-water pages remain because no accessible official sources were found for the same AHJ process, current code guidance, citywide market role, and municipal utility authority.
- The SRP service-territory page remains because no stable official map, dataset, or city record was found for the same Tempe electric-territory boundary.
- The Oncor service-area map remains because it directly supports the Dallas territory claim. Accessible Oncor corporate pages describe the utility's role but do not establish the same geographic boundary; the exception applies only when the map request ends in `TimeoutError`.
- The official Novus Innovation Corridor project site remains because no ASU or City of Tempe source was found for the same project-specific market claim; the exception applies only to its reviewed TLS handshake rejection (`ERR_SSL_SSL/TLS_ALERT_HANDSHAKE_FAILURE`).

These sources remain authoritative and useful to a human reviewer. Any change in their observed failure class fails the check and requires a new editorial review.

## Replaced after equivalent-source review

The Map Service Center and legacy National Flood Hazard Layer portal URLs used by Tempe, Glendale, and Scottsdale were replaced with FEMA's National Flood Hazard Layer item page in the FEMA Geospatial Resource Center:

`https://gis-fema.hub.arcgis.com/maps/ae38b6f94eaf4abf97f986fa01921e13/about`

ArcGIS item metadata identifies the publisher as `FEMA_MAC` and the underlying service as FEMA's `hazards.fema.gov` NFHL MapServer. The FEMA resource page describes the same current effective NFHL data needed for parcel-specific flood screening, permits the normal safe health check, and avoids treating a citywide flood condition as established without a project-location query. This removes both FEMA portal exceptions and reduces the reviewed exception registry from 18 URLs to 16.