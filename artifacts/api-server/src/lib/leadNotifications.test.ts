import assert from "node:assert/strict";
import test from "node:test";
import type { LeadInput } from "@workspace/api-zod";
import { sendLeadNotificationEmail } from "./leadNotifications";

test("estimate leads send every RFQ detail to the owner through SendGrid", async () => {
  const previousFrom = process.env.LEAD_NOTIFY_FROM_EMAIL;
  process.env.LEAD_NOTIFY_FROM_EMAIL = "info@apexgrideng.com";

  let connectorName = "";
  let requestPath = "";
  let requestBody = "";
  const connectors = {
    async proxy(
      connector: string,
      path: string,
      options: { body: string },
    ) {
      connectorName = connector;
      requestPath = path;
      requestBody = options.body;
      return {
        ok: true,
        status: 202,
        async text() {
          return "";
        },
      };
    },
  };

  const lead: LeadInput = {
    name: "Taylor Client",
    email: "taylor@example.com",
    phone: "602-555-0100",
    company: "Example Development",
    projectType: "Commercial ground-up — MEP",
    services: "Commercial ground-up — MEP",
    source: "estimate",
    medium: "website",
    campaign: "instant-ballpark",
    landingPath: "/estimate",
    message: `Estimate Request:
Project Type: Commercial ground-up — MEP
Square Footage: 25,000 sqft
Location: Phoenix, Arizona
Estimate Headline: $22,500
Estimate Range: $17,500 - $30,000`,
  };

  try {
    const result = await sendLeadNotificationEmail(lead, { connectors });
    assert.deepEqual(result, { ok: true });
  } finally {
    if (previousFrom === undefined) {
      delete process.env.LEAD_NOTIFY_FROM_EMAIL;
    } else {
      process.env.LEAD_NOTIFY_FROM_EMAIL = previousFrom;
    }
  }

  assert.equal(connectorName, "sendgrid");
  assert.equal(requestPath, "/v3/mail/send");

  const payload = JSON.parse(requestBody) as {
    personalizations: Array<{ to: Array<{ email: string }> }>;
    from: { email: string };
    reply_to: { email: string; name: string };
    subject: string;
    content: Array<{ type: string; value: string }>;
  };
  assert.equal(
    payload.personalizations[0]?.to[0]?.email,
    "Chicomills1@gmail.com",
  );
  assert.equal(payload.from.email, "info@apexgrideng.com");
  assert.deepEqual(payload.reply_to, {
    email: "taylor@example.com",
    name: "Taylor Client",
  });
  assert.equal(payload.subject, "New RFQ lead — /estimate");

  const body = payload.content[0]?.value ?? "";
  for (const expected of [
    "Name: Taylor Client",
    "Email: taylor@example.com",
    "Phone: 602-555-0100",
    "Company: Example Development",
    "Project type: Commercial ground-up — MEP",
    "Square Footage: 25,000 sqft",
    "Location: Phoenix, Arizona",
    "Estimate Headline: $22,500",
    "Estimate Range: $17,500 - $30,000",
  ]) {
    assert.match(body, new RegExp(expected.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
});