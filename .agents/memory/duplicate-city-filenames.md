---
name: Duplicate city filenames
description: Prevent one same-name city record from replacing another during nationwide expansion.
---

City modules for same-name cities in different states must use unique, state-qualified filenames while keeping the internal city slug unchanged.

**Why:** The city loader imports every TypeScript module by filename, while canonical routes use the record’s state and city slugs. Adding a second Fayetteville under the same filename replaced the existing record from another state.

**How to apply:** Before creating a city module, check both the canonical state/city key and existing filenames. Use names such as city-state.ts when a filename collision exists, and verify both state-specific canonical routes after generation.