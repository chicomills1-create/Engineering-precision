---
name: Public upload security
description: Why contact-form uploads are proxied through the API server instead of using presigned PUT URLs
---

Public (unauthenticated) file uploads must be proxied through the API server, which enforces the size cap and file-extension allowlist on the actual byte stream before writing to the private bucket.

**Why:** The sidecar-signed PUT URLs bind neither Content-Length nor Content-Type, so any client-side or metadata-based "validation" before minting a URL is bypassable — a caller can claim a small PDF and PUT anything. A completion review rejected exactly this pattern as a storage-abuse risk.

**How to apply:** Never hand a write-capable presigned URL to an unauthenticated caller. Keep the server-side extension allowlist in sync with the contact form's `ACCEPTED_TYPES` (extensions, not MIME types — browsers report empty/generic MIME for CAD files). Private object downloads stay behind the admin allowlist auth used by the leads inbox.
