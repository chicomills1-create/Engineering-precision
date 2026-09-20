---
name: Production import environment
description: Prevent workspace shell imports from silently targeting development after a separate production identity check.
---

Production read-only database queries and workspace shell processes use separate environment bindings. A successful production count through the database query interface does not mean a script launched with `tsx` will connect to production.

**Why:** A one-off inventory script was launched after a separate production identity check, but its own PRE count showed the development database. The import therefore changed development while production remained unchanged.

**How to apply:** For any intended production import, treat the script’s own PRE count as the binding check and stop before the first write when it differs from the known production count. Do not assume shell `DATABASE_URL` targets production.