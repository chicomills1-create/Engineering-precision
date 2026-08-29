import assert from "node:assert/strict";
import { afterEach, test } from "node:test";
import {
  makeOneClickUnsubscribeUrl,
  makeUnsubscribeUrl,
  verifyUnsubscribeToken,
} from "./unsubscribeToken";

const originalPublicUrl = process.env.PUBLIC_SITE_URL;
const originalSecret = process.env.UNSUBSCRIBE_SECRET;

afterEach(() => {
  if (originalPublicUrl === undefined) delete process.env.PUBLIC_SITE_URL;
  else process.env.PUBLIC_SITE_URL = originalPublicUrl;
  if (originalSecret === undefined) delete process.env.UNSUBSCRIBE_SECRET;
  else process.env.UNSUBSCRIBE_SECRET = originalSecret;
});

test("uses the public confirmation page for people and a separate API route for mail providers", () => {
  process.env.PUBLIC_SITE_URL = "https://apexgrideng.com/";
  process.env.UNSUBSCRIBE_SECRET = "unsubscribe-test-secret";

  const visibleUrl = makeUnsubscribeUrl("Person@Example.com");
  const oneClickUrl = makeOneClickUnsubscribeUrl("Person@Example.com");

  assert.match(visibleUrl ?? "", /^https:\/\/apexgrideng\.com\/unsubscribe\?/);
  assert.match(oneClickUrl ?? "", /^https:\/\/apexgrideng\.com\/api\/subscribers\/one-click-unsubscribe\?/);
  assert.notEqual(visibleUrl, oneClickUrl);

  const params = new URL(visibleUrl!).searchParams;
  assert.equal(params.get("email"), "person@example.com");
  assert.equal(verifyUnsubscribeToken(params.get("email")!, params.get("token")!), true);
});