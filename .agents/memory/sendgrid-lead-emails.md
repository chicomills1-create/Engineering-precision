---
name: SendGrid lead emails
description: Deliverability setup and gotchas for lead-notification emails sent via the SendGrid connector
---

# SendGrid lead emails

- Recipients/config via `LEAD_NOTIFY_EMAIL` / `LEAD_NOTIFY_FROM_EMAIL` env vars (both info@apexgrideng.com). From-address must be a SendGrid-verified sender or sends 403.
- **Domain authentication is DONE and validated** (SendGrid whitelabel domain id 32391469, `automatic_security: true`): CNAMEs `em5956`, `s1._domainkey`, `s2._domainkey` → sendgrid.net live in GoDaddy DNS. SPF TXT includes `include:sendgrid.net`.
- **Why it was needed:** domain DMARC is `p=quarantine`; Microsoft 365 silently quarantined mail "from" the domain sent via SendGrid without aligned DKIM (not even in Junk — hidden quarantine at security.microsoft.com). SPF include alone does NOT fix DMARC alignment; SendGrid signs with sendgrid.net unless domain auth exists.
- **GoDaddy Conversations gotcha:** the user's GoDaddy Websites+Marketing "Conversations" feature had the info@ mailbox connected as a receiving channel — it intercepted ALL inbound mail before Outlook and re-notified the owner's personal Gmail (headers show notifications@mail.conversations.godaddy.com). Fixed by disconnecting the email channel in Conversations → Settings → Channels.
- Mailbox is Microsoft 365 via GoDaddy (MX apexgrideng-com.mail.protection.outlook.com). SendGrid account is shared across the user's other businesses — suppression lists contain unrelated domains.
- To debug delivery: connector proxy GET /v3/suppression/{blocks,bounces,spam_reports} and /v3/whitelabel/domains.
