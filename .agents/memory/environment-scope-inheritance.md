---
name: Environment scope inheritance
description: How to safely update a variable duplicated across shared and production scopes.
---

Prefer one shared environment-variable entry when the same value should apply in development and production. A shared entry is inherited by production, so a duplicate production entry is unnecessary and can prevent updates with a conflicting-scope error.

**Why:** Updating an admin allowlist required multiple attempts because the variable existed in both scopes. Removing the production duplicate and updating the shared value preserved behavior in both environments.

**How to apply:** Read both scopes without exposing values, preserve the union of required entries, remove only the redundant production entry, then update the shared entry.