import { Readable } from 'stream';
import express, {
  Router,
  type IRouter,
  type Request,
  type Response,
} from 'express';

import {
  ObjectNotFoundError,
  ObjectStorageService,
} from '../lib/objectStorage';
import { verifyDownloadToken } from '../lib/downloadToken';

const router: IRouter = Router();
const objectStorageService = new ObjectStorageService();
/** 20 MB server-side cap — enforced on the actual byte stream. */
const MAX_UPLOAD_BYTES = 20 * 1024 * 1024;

/** Extension allowlist — more reliable than MIME for CAD formats. */
const ALLOWED_EXTENSIONS = new Set([
  'pdf',
  'dwg',
  'dxf',
  'rvt',
  'doc',
  'docx',
  'xls',
  'xlsx',
  'ppt',
  'pptx',
  'zip',
  'jpg',
  'jpeg',
  'png',
  'tif',
  'tiff',
]);

/** Simple in-memory per-IP rate limiter for upload requests. */
const RATE_LIMIT = 10; // requests per window per IP
const RATE_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const uploadRateBuckets = new Map<string, { count: number; resetAt: number }>();
function uploadRateLimited(ip: string): boolean {
  const now = Date.now();
  // Opportunistic cleanup to keep the map bounded.
  if (uploadRateBuckets.size > 10_000) {
    for (const [k, v] of uploadRateBuckets) {
      if (v.resetAt <= now) uploadRateBuckets.delete(k);
    }
  }
  const bucket = uploadRateBuckets.get(ip);
  if (!bucket || bucket.resetAt <= now) {
    uploadRateBuckets.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  bucket.count += 1;
  return bucket.count > RATE_LIMIT;
}

/**
 * POST /storage/uploads
 *
 * Server-proxied upload for contact-form attachments.  File bytes are read
 * through this server (via express.raw), validated for extension and size,
 * then written to the private GCS bucket via an internally-generated presigned
 * PUT URL.  Clients never receive a write-capable URL, so limits cannot be
 * bypassed.
 *
 * The filename is passed via the `x-file-name` header (URI-encoded).
 *
 * Returns { objectPath, name } on success.
 */
router.post(
  '/storage/uploads',
  express.raw({ type: () => true, limit: MAX_UPLOAD_BYTES }),
  async (req: Request, res: Response) => {
    const ip = req.ip ?? 'unknown';
    if (uploadRateLimited(ip)) {
      res.status(429).json({ error: 'Too many upload requests. Try again later.' });
      return;
    }

    let name = '';
    try {
      name = decodeURIComponent(String(req.headers['x-file-name'] ?? ''));
    } catch {
      /* fall through to validation below */
    }
    const ext = name.includes('.') ? name.split('.').pop()!.toLowerCase() : '';
    if (!name || !ALLOWED_EXTENSIONS.has(ext)) {
      res.status(400).json({
        error: 'File type not accepted. Upload PDFs, images, CAD files, or office documents.',
      });
      return;
    }

    const body = req.body as unknown;
    if (!Buffer.isBuffer(body) || body.length === 0) {
      res.status(400).json({ error: 'No file content received' });
      return;
    }
    if (body.length > MAX_UPLOAD_BYTES) {
      res.status(413).json({ error: 'File exceeds the 20 MB upload limit' });
      return;
    }

    try {
      const { uploadURL, objectPath } =
        await objectStorageService.getObjectEntityUploadURL();

      const putResponse = await fetch(uploadURL, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/octet-stream' },
        body,
        signal: AbortSignal.timeout(60_000),
      });
      if (!putResponse.ok) {
        req.log.error(
          { status: putResponse.status },
          'Storage PUT failed for proxied upload',
        );
        res.status(502).json({ error: 'Failed to store file' });
        return;
      }

      res.json({ objectPath, name });
    } catch (error) {
      req.log.error({ err: error }, 'Error handling proxied upload');
      res.status(500).json({ error: 'Failed to store file' });
    }
  },
);

/**
 * GET /storage/public-objects/*
 *
 * Serve public assets from PUBLIC_OBJECT_SEARCH_PATHS.
 * Unconditionally public — no authentication or ACL checks.
 */
router.get(
  '/storage/public-objects/*filePath',
  async (req: Request, res: Response) => {
    try {
  const raw = req.params.path;
      const filePath = Array.isArray(raw) ? raw.join('/') : raw;
      const file = await objectStorageService.searchPublicObject(filePath);
      if (!file) {
        res.status(404).json({ error: 'File not found' });
        return;
      }

    const response = await objectStorageService.downloadObject(file);
      res.status(response.status);
      response.headers.forEach((value, key) => res.setHeader(key, value));

      if (response.body) {
      const nodeStream = Readable.fromWeb(
        response.body as ReadableStream<Uint8Array>,
      );
        nodeStream.pipe(res);
      } else {
        res.end();
      }
    } catch (error) {
      req.log.error({ err: error }, 'Error serving public object');
      res.status(500).json({ error: 'Failed to serve public object' });
    }
  },
);

/**
 * GET /storage/objects/*
 *
 * Serve private object entities from PRIVATE_OBJECT_DIR.
 * Requires a time-limited HMAC download token in the `token` query param.
 * Generate tokens with signDownloadPath() from lib/downloadToken.ts.
 *
 * Responses are forced to Content-Disposition: attachment +
 * Content-Type: application/octet-stream + X-Content-Type-Options: nosniff.
 */
router.get('/storage/objects/*path', async (req: Request, res: Response) => {
  const raw = req.params.path;
  const wildcardPath = Array.isArray(raw) ? raw.join('/') : raw;
  const objectPath = `/objects/${wildcardPath}`;

  const token = typeof req.query.token === 'string' ? req.query.token : '';
  if (!token || !verifyDownloadToken(objectPath, token)) {
    res.status(401).json({ error: 'Missing or invalid download token' });
    return;
  }

  try {
    const objectFile = await objectStorageService.getObjectEntityFile(objectPath);
    const response = await objectStorageService.downloadObject(objectFile);

    res.status(response.status);
    response.headers.forEach((value, key) => res.setHeader(key, value));

    const rawFilename = wildcardPath.split('/').pop() ?? 'attachment';
    const safeFilename = rawFilename.replace(/[^a-zA-Z0-9._-]/g, '_');
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Disposition', `attachment; filename="${safeFilename}"`);
    res.setHeader('X-Content-Type-Options', 'nosniff');

    if (response.body) {
      const nodeStream = Readable.fromWeb(
        response.body as ReadableStream<Uint8Array>,
      );
      nodeStream.pipe(res);
    } else {
      res.end();
    }
  } catch (error) {
    if (error instanceof ObjectNotFoundError) {
      req.log.warn({ err: error }, 'Object not found');
      res.status(404).json({ error: 'Object not found' });
      return;
    }
    req.log.error({ err: error }, 'Error serving object');
    res.status(500).json({ error: 'Failed to serve object' });
  }
});

export default router;
