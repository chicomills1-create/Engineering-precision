---
name: Deployment cutover startup
description: Transient production 500s can occur when deployment traffic reaches the artifact sidecar before the API port opens.
---

Treat a burst of health-check 500s before the first “Server listening” event as a deployment cutover/startup condition, not automatically as an application-route failure.

**Why:** A Reserved VM deployment briefly returned 500 for every route while the artifact launcher was still starting the API process. The port opened about 25 seconds later, after which the homepage, sitemap, and generated SEO pages returned stable 200 responses. The application did not crash, and the new static pages were valid.

**How to apply:** Compare the first artifact-start timestamp with the first server-listening timestamp, then test production repeatedly after the port opens. Avoid changing or republishing application code unless errors continue after the server is listening.