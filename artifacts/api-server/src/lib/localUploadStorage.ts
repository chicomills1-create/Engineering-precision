import { randomUUID } from "crypto";
import { promises as fs } from "fs";
import path from "path";

/**
 * Disk-backed upload storage for the Render migration.
 *
 * Replaces the Replit-sidecar GCS object storage (objectStorage.ts), which
 * cannot run on Render — there is no sidecar at 127.0.0.1:1106 outside
 * Replit, so every upload failed with "Failed to store file."
 *
 * Files are stored under UPLOAD_DIR. In production this is a Render
 * persistent disk mounted at /var/apex-uploads, so files survive restarts
 * and redeploys. Files are addressed by the same `/objects/uploads/<id>`
 * objectPath shape the rest of the code already uses, so routes, claim
 * tokens, download tokens, and database rows are unchanged.
 */

export class ObjectNotFoundError extends Error {
  constructor() {
    super("Object not found");
    this.name = "ObjectNotFoundError";
    Object.setPrototypeOf(ObjectNotFoundError.prototype, this);
  }
}

function uploadDir(): string {
  return process.env.UPLOAD_DIR || "/var/apex-uploads";
}

function fileIdFor(objectPath: string): string {
  const match = /^\/objects\/uploads\/([A-Za-z0-9][A-Za-z0-9._-]*)$/.exec(objectPath);
  if (!match) throw new ObjectNotFoundError();
  return match[1];
}

/** Persist an uploaded file; returns its objectPath (e.g. /objects/uploads/<uuid>.pdf). */
export async function saveUploadFile(body: Buffer, extension: string): Promise<string> {
  const dir = uploadDir();
  await fs.mkdir(dir, { recursive: true });
  const fileId = `${randomUUID()}.${extension}`;
  await fs.writeFile(path.join(dir, fileId), body);
  return `/objects/uploads/${fileId}`;
}

/** Read a previously stored upload. Throws ObjectNotFoundError when missing. */
export async function readUploadFile(objectPath: string): Promise<Buffer> {
  try {
    return await fs.readFile(path.join(uploadDir(), fileIdFor(objectPath)));
  } catch {
    throw new ObjectNotFoundError();
  }
}

/** Delete a stored upload. Idempotent — a missing file is already "deleted". */
export async function deleteUploadFile(objectPath: string): Promise<void> {
  try {
    await fs.unlink(path.join(uploadDir(), fileIdFor(objectPath)));
  } catch {
    // Already gone; nothing to do.
  }
}
