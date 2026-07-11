import { getResendClient } from "@/lib/resend/server";
import { RESEND_FROM_EMAIL } from "@/lib/resend/config";
import { siteConfig, siteUrl } from "@/lib/data/site-config";
import { formatCurrency } from "@/lib/utils";

const BRAND_NAVY = "#0d0d0d";
const ACCENT = "#8b9a3a";
const SITE_URL = siteUrl;

function emailLayout(bodyHtml: string) {
  return `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#f4f6f8;font-family:Arial,Helvetica,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f8;padding:32px 0;">
      <tr>
        <td align="center">
          <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;">
            <tr>
              <td style="background:${BRAND_NAVY};padding:24px 32px;">
                <span style="color:#ffffff;font-size:18px;font-weight:bold;">Vision To The World</span>
                <div style="color:#e1f0f5;font-size:12px;margin-top:2px;">Your Journey. Your Choice. Your World.</div>
              </td>
            </tr>
            <tr>
              <td style="padding:32px;color:#0d0d0d;font-size:15px;line-height:1.6;">
                ${bodyHtml}
              </td>
            </tr>
            <tr>
              <td style="padding:20px 32px;background:#f4f6f8;color:#6b7c8f;font-size:12px;">
                ${siteConfig.address.street}, ${siteConfig.address.city}, ${siteConfig.address.state} ${siteConfig.address.zip}<br />
                ${siteConfig.email} · ${siteConfig.phones[0]}
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function button(label: string, href: string) {
  return `<a href="${href}" style="display:inline-block;margin-top:20px;background:${ACCENT};color:#ffffff;text-decoration:none;font-weight:bold;padding:12px 24px;border-radius:8px;">${label}</a>`;
}

export async function sendBookingConfirmationEmail(params: {
  to: string;
  title: string;
  type: string;
  total: number;
  currency: string;
}) {
  const resend = getResendClient();
  if (!resend) return { error: "Resend is not configured." };

  const html = emailLayout(`
    <h1 style="margin:0 0 16px;font-size:22px;">Booking confirmed 🎉</h1>
    <p>Thanks for booking with Vision To The World! Here's a summary of your trip:</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:20px 0;border:1px solid #e2e8f0;border-radius:8px;">
      <tr>
        <td style="padding:16px;">
          <div style="color:#6b7c8f;font-size:12px;text-transform:uppercase;letter-spacing:0.04em;">${params.type}</div>
          <div style="font-size:17px;font-weight:bold;margin-top:4px;">${params.title}</div>
          <div style="margin-top:12px;font-size:20px;font-weight:bold;color:${BRAND_NAVY};">${formatCurrency(params.total, params.currency)}</div>
        </td>
      </tr>
    </table>
    <p>You can view and manage this booking anytime from your dashboard.</p>
    ${button("View my bookings", `${SITE_URL}/dashboard/bookings`)}
  `);

  return resend.emails.send({
    from: RESEND_FROM_EMAIL,
    to: params.to,
    subject: `Booking confirmed: ${params.title}`,
    html,
    text: `Booking confirmed: ${params.title} (${params.type}) — ${formatCurrency(params.total, params.currency)}. View your bookings at ${SITE_URL}/dashboard/bookings`,
  });
}

export async function sendContactNotificationEmail(params: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  const resend = getResendClient();
  if (!resend) return { error: "Resend is not configured." };

  const html = emailLayout(`
    <h1 style="margin:0 0 16px;font-size:20px;">New support request</h1>
    <p><strong>From:</strong> ${params.name} (${params.email})</p>
    <p><strong>Subject:</strong> ${params.subject}</p>
    <p style="white-space:pre-wrap;background:#f4f6f8;border-radius:8px;padding:16px;margin-top:12px;">${params.message}</p>
  `);

  return resend.emails.send({
    from: RESEND_FROM_EMAIL,
    to: siteConfig.email,
    replyTo: params.email,
    subject: `New support request: ${params.subject}`,
    html,
    text: `From: ${params.name} (${params.email})\nSubject: ${params.subject}\n\n${params.message}`,
  });
}

export async function sendContactAutoReplyEmail(params: { to: string; name: string }) {
  const resend = getResendClient();
  if (!resend) return { error: "Resend is not configured." };

  const html = emailLayout(`
    <h1 style="margin:0 0 16px;font-size:20px;">We've got your message</h1>
    <p>Hi ${params.name},</p>
    <p>Thanks for reaching out to Vision To The World. A member of our travel support team will respond within 24 hours.</p>
    <p>In the meantime, feel free to keep exploring flights, hotels, and travel packages on the platform.</p>
  `);

  return resend.emails.send({
    from: RESEND_FROM_EMAIL,
    to: params.to,
    subject: "We've received your message",
    html,
    text: `Hi ${params.name}, thanks for reaching out to Vision To The World. A member of our travel support team will respond within 24 hours.`,
  });
}
