---
name: Promoted city evidence inheritance
description: Source-evidence rule when specialty location records replace generated city-service pages.
---

Specialty location-service output that owns the same route as a standard promoted city-service page must include the promoted city’s verified local source links. A service expansion must not overwrite or sitemap a metro hub unless it also owns a complete, indexable hub page at that canonical route.

**Why:** Generation order allows a specialty record to overwrite the standard page after the standard renderer has attached its evidence. Without explicit inheritance, an indexable promoted route can silently lose the sources required by the city promotion gate. Adding planned metro roots to the sitemap can also expose redirects or URLs with no HTML owner.

**How to apply:** When adding or changing a renderer that can own a promoted city route, pass the corresponding reviewed city record through and render the same evidence block. Add only routes the renderer truly owns to the sitemap, and keep the generation and corpus assertions strict rather than exempting overwritten routes.