---
name: Promoted city evidence inheritance
description: Source-evidence rule when specialty location records replace generated city-service pages.
---

Specialty location-service output that owns the same route as a standard promoted city-service page must include the promoted city’s verified local source links.

**Why:** Generation order allows a specialty record to overwrite the standard page after the standard renderer has attached its evidence. Without explicit inheritance, an indexable promoted route can silently lose the sources required by the city promotion gate.

**How to apply:** When adding or changing a renderer that can own a promoted city route, pass the corresponding reviewed city record through and render the same evidence block. Keep the generation assertion strict rather than exempting overwritten routes.