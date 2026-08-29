const COMPANY_NAME = "Apex Grid Engineering";
const LEGAL_COMPANY_NAME = "Apex Grid Engineering PLLC";
const CONTACT_NAME = "Jeremy Mills";
const CONTACT_TITLE = "CEO";
const CONTACT_PHONE = "480-490-0064";
const COMPANY_SITE = "https://apexgrideng.com";
const COMPANY_LOGO = `${COMPANY_SITE}/logo.svg`;

export function escapeEmailHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function renderBodyHtml(body: string): string {
  return body
    .trim()
    .split(/\n{2,}/)
    .filter(Boolean)
    .map((paragraph) => `<p style="margin:0 0 18px;color:#273449;font-size:16px;line-height:1.65;">${escapeEmailHtml(paragraph).replaceAll("\n", "<br>")}</p>`)
    .join("");
}

export function renderBrandedEmail(body: string, unsubscribeUrl: string): {
  plainText: string;
  html: string;
} {
  const safeUnsubscribeUrl = escapeEmailHtml(unsubscribeUrl);
  const plainText = `${body.trim()}\n\nBest regards,\n${CONTACT_NAME}\n${CONTACT_TITLE}\n${LEGAL_COMPANY_NAME}\n${CONTACT_PHONE}\n\nUnsubscribe: ${unsubscribeUrl}`;
  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${COMPANY_NAME}</title>
  </head>
  <body style="margin:0;padding:0;background:#ffffff;color:#202124;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeEmailHtml(body.trim().slice(0, 120))}</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;background:#ffffff;">
      <tr>
        <td align="left" style="padding:24px 18px 32px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:640px;">
            <tr>
              <td style="padding:0;font-family:Arial,Helvetica,sans-serif;">
                ${renderBodyHtml(body)}
                <p style="margin:28px 0 12px;color:#202124;font-size:16px;line-height:1.5;">Best regards,</p>
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0;">
                  <tr>
                    <td valign="top" style="padding:0 13px 0 0;">
                      <img src="${COMPANY_LOGO}" width="48" height="48" alt="Apex Grid Engineering logo" style="display:block;width:48px;height:48px;">
                    </td>
                    <td valign="top" style="padding:0;border-left:1px solid #d9dee5;">
                      <div style="padding-left:13px;color:#202124;font-size:16px;font-weight:700;line-height:1.4;">${CONTACT_NAME}</div>
                      <div style="padding-left:13px;color:#202124;font-size:14px;line-height:1.5;">${CONTACT_TITLE}</div>
                      <div style="padding-left:13px;color:#202124;font-size:14px;font-weight:700;line-height:1.5;">${LEGAL_COMPANY_NAME}</div>
                      <div style="padding-left:13px;font-size:14px;line-height:1.5;"><a href="tel:+14804900064" style="color:#245b8f;text-decoration:none;">${CONTACT_PHONE}</a></div>
                    </td>
                  </tr>
                </table>
                <p style="margin:26px 0 0;color:#80868b;font-size:11px;line-height:1.5;"><a href="${safeUnsubscribeUrl}" style="color:#80868b;text-decoration:underline;">Unsubscribe</a></p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
  return { plainText, html };
}