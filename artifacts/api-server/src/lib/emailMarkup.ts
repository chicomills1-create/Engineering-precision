const COMPANY_NAME = "Apex Grid Engineering";
const COMPANY_ADDRESS = "22475 E Quintero Rd, Queen Creek, AZ 85142";

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
  const plainText = `${body.trim()}\n\n— ${COMPANY_NAME}\n${COMPANY_ADDRESS}\n\nUnsubscribe: ${unsubscribeUrl}`;
  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${COMPANY_NAME}</title>
  </head>
  <body style="margin:0;padding:0;background:#f3f6fa;color:#273449;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeEmailHtml(body.trim().slice(0, 120))}</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;background:#f3f6fa;">
      <tr>
        <td align="center" style="padding:28px 12px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:620px;background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;">
            <tr>
              <td style="padding:28px 32px 22px;border-top:4px solid #e77b2f;">
                <div style="color:#12304a;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:700;letter-spacing:1.4px;line-height:1.3;text-transform:uppercase;">${COMPANY_NAME}</div>
                <div style="margin-top:7px;color:#64748b;font-family:Arial,Helvetica,sans-serif;font-size:12px;letter-spacing:.2px;">Civil · Structural · MEP Engineering</div>
              </td>
            </tr>
            <tr>
              <td style="padding:5px 32px 18px;font-family:Arial,Helvetica,sans-serif;">
                ${renderBodyHtml(body)}
              </td>
            </tr>
            <tr>
              <td style="padding:0 32px 28px;font-family:Arial,Helvetica,sans-serif;">
                <div style="height:1px;background:#e2e8f0;font-size:1px;line-height:1px;">&nbsp;</div>
                <p style="margin:20px 0 4px;color:#12304a;font-size:14px;font-weight:700;line-height:1.4;">${COMPANY_NAME}</p>
                <p style="margin:0;color:#64748b;font-size:12px;line-height:1.6;">${COMPANY_ADDRESS}</p>
                <p style="margin:15px 0 0;font-size:12px;line-height:1.6;"><a href="${safeUnsubscribeUrl}" style="color:#456b91;text-decoration:underline;">Unsubscribe</a></p>
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