import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { resetGeneratedChildrenPreservingHub } from "./route-ownership.ts";

function withTemporaryHub(run: (hubDir: string) => void): void {
  const fixtureRoot = fs.mkdtempSync(path.join(os.tmpdir(), "apex-grid-hub-"));
  try {
    run(path.join(fixtureRoot, "resources"));
  } finally {
    fs.rmSync(fixtureRoot, { recursive: true, force: true });
  }
}

test("preserves an existing React hub byte-for-byte while replacing generated children", () => {
  withTemporaryHub((hubDir) => {
    const hubPath = path.join(hubDir, "index.html");
    const oldChildPath = path.join(hubDir, "old-child", "index.html");
    const newChildPath = path.join(hubDir, "new-child", "index.html");
    const hubBytes = Buffer.from([0x3c, 0x68, 0x31, 0x3e, 0xc2, 0xa0, 0x0a, 0x3c, 0x2f, 0x68, 0x31, 0x3e]);

    fs.mkdirSync(path.dirname(oldChildPath), { recursive: true });
    fs.writeFileSync(hubPath, hubBytes);
    fs.writeFileSync(oldChildPath, "stale child");

    resetGeneratedChildrenPreservingHub(hubDir);
    fs.mkdirSync(path.dirname(newChildPath), { recursive: true });
    fs.writeFileSync(newChildPath, "replacement child");

    assert.deepEqual(fs.readFileSync(hubPath), hubBytes);
    assert.equal(fs.existsSync(oldChildPath), false);
    assert.equal(fs.readFileSync(newChildPath, "utf8"), "replacement child");
  });
});

test("keeps a missing React hub absent while replacing generated children", () => {
  withTemporaryHub((hubDir) => {
    const hubPath = path.join(hubDir, "index.html");
    const oldChildPath = path.join(hubDir, "old-child", "index.html");
    const newChildPath = path.join(hubDir, "new-child", "index.html");

    fs.mkdirSync(path.dirname(oldChildPath), { recursive: true });
    fs.writeFileSync(oldChildPath, "stale child");

    resetGeneratedChildrenPreservingHub(hubDir);
    fs.mkdirSync(path.dirname(newChildPath), { recursive: true });
    fs.writeFileSync(newChildPath, "replacement child");

    assert.equal(fs.existsSync(hubPath), false);
    assert.equal(fs.existsSync(oldChildPath), false);
    assert.equal(fs.readFileSync(newChildPath, "utf8"), "replacement child");
  });
});