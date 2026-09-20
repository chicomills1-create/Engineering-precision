import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { IMPORT_SSE_HEADERS, sendImportEvent } from "./importSse";

function fakeRes() {
  const chunks: string[] = [];
  return {
    chunks,
    writableEnded: false,
    destroyed: false,
    write(chunk: string) {
      chunks.push(chunk);
      return true;
    },
  };
}

describe("sendImportEvent", () => {
  it("writes a well-formed SSE frame with JSON data", () => {
    const res = fakeRes();
    assert.equal(sendImportEvent(res as never, "progress", { processed: 25, total: 100 }), true);
    assert.equal(res.chunks.join(""), 'event: progress\ndata: {"processed":25,"total":100}\n\n');
  });

  it("skips the write and returns false once the response has ended", () => {
    const res = fakeRes();
    res.writableEnded = true;
    assert.equal(sendImportEvent(res as never, "progress", { processed: 1, total: 2 }), false);
    assert.equal(res.chunks.length, 0);
  });

  it("skips the write and returns false on a destroyed socket", () => {
    const res = fakeRes();
    res.destroyed = true;
    assert.equal(sendImportEvent(res as never, "done", {}), false);
    assert.equal(res.chunks.length, 0);
  });

  it("never throws when the underlying write throws (client disconnected)", () => {
    const res = {
      writableEnded: false,
      destroyed: false,
      write() {
        throw new Error("socket hang up");
      },
    };
    assert.equal(sendImportEvent(res as never, "progress", {}), false);
  });

  it("exposes unbuffered streaming headers", () => {
    assert.equal(IMPORT_SSE_HEADERS["Content-Type"], "text/event-stream");
    assert.match(IMPORT_SSE_HEADERS["Cache-Control"], /no-cache/);
    assert.equal(IMPORT_SSE_HEADERS["X-Accel-Buffering"], "no");
  });
});
