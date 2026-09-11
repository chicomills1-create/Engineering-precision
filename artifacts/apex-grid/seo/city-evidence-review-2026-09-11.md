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

- ICC code-library pages return `403` to the checker.
- City of Atlanta permit and code pages return `403` to the checker.
- Duke Energy's official business page returns `403` to the checker.
- Los Angeles Economic & Workforce Development returns `403` to the checker.
- Current City of Tempe pages return `403` to the checker.
- The SRP service-territory page returns `403` to the checker.
- The Oncor service-area map is accepted only when the request ends in `TimeoutError`.
- FEMA's interactive flood-map portal is accepted only when the connection is reset (`ECONNRESET`).
- The official Novus Innovation Corridor project site is accepted only for its reviewed TLS handshake rejection (`ERR_SSL_SSL/TLS_ALERT_HANDSHAKE_FAILURE`).

These sources remain authoritative and useful to a human reviewer. Any change in their observed failure class fails the check and requires a new editorial review.