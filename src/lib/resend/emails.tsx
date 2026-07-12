import { siteConfig, siteUrl } from "@/lib/data/site-config";
import { formatCurrency } from "@/lib/utils";
import { sendEmail } from "@/lib/resend/send";
import { createUnsubscribeToken } from "@/lib/resend/unsubscribe";
import { EmailButton, EmailGreeting, EmailHeading, EmailLayout } from "../../../emails/components/layout";
import WelcomeEmail from "../../../emails/Welcome";
import BookingConfirmationEmail from "../../../emails/BookingConfirmation";
import InvoiceEmail from "../../../emails/Invoice";
import TripReminderEmail from "../../../emails/TripReminder";
import NewsletterEmail from "../../../emails/Newsletter";

const SITE_URL = siteUrl;

// ---------------------------------------------------------------------------
// Welcome — sent once, right after a new account's email is verified
// (src/app/auth/confirm/route.ts).
// ---------------------------------------------------------------------------
export async function sendWelcomeEmail(params: { to: string; name: string }) {
  return sendEmail({
    type: "welcome",
    to: params.to,
    subject: `Welcome to ${siteConfig.name}, ${params.name.split(" ")[0]}!`,
    react: WelcomeEmail({ name: params.name }),
    text: `Welcome to ${siteConfig.name}, ${params.name}! Your account is ready — start exploring flights, hotels, car rentals, and more at ${SITE_URL}/flights`,
  });
}

// ---------------------------------------------------------------------------
// Booking confirmation — sent immediately after a successful booking
// (Stripe: src/app/checkout/success/page.tsx; PayPal/Cash App:
// src/app/api/notifications/booking-confirmation/route.ts).
// ---------------------------------------------------------------------------
export async function sendBookingConfirmationEmail(params: {
  to: string;
  name?: string;
  title: string;
  type: string;
  bookingRef: string;
  total: number;
  currency: string;
}) {
  const name = params.name ?? params.to.split("@")[0];

  return sendEmail({
    type: "booking_confirmation",
    to: params.to,
    subject: `Booking confirmed: ${params.title}`,
    react: BookingConfirmationEmail({
      name,
      title: params.title,
      type: params.type,
      bookingRef: params.bookingRef,
      total: params.total,
      currency: params.currency,
    }),
    text: `Booking confirmed: ${params.title} (${params.type}) — ${formatCurrency(params.total, params.currency)}. Reference: ${params.bookingRef}. View your bookings at ${SITE_URL}/dashboard/bookings`,
    metadata: { bookingRef: params.bookingRef },
  });
}

// ---------------------------------------------------------------------------
// Invoice / receipt — sent immediately after a successful payment, alongside
// (not instead of) the booking confirmation. Same call sites as above.
// ---------------------------------------------------------------------------
export async function sendInvoiceEmail(params: {
  to: string;
  name?: string;
  invoiceNumber: string;
  subtotal: number;
  serviceFee: number;
  total: number;
  currency: string;
  title: string;
}) {
  const name = params.name ?? params.to.split("@")[0];
  const items = [
    { label: params.title, amount: params.subtotal },
    { label: "Service fee (10%)", amount: params.serviceFee },
  ];
  const date = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return sendEmail({
    type: "invoice",
    to: params.to,
    subject: `Your invoice ${params.invoiceNumber} from ${siteConfig.name}`,
    react: InvoiceEmail({
      name,
      invoiceNumber: params.invoiceNumber,
      date,
      items,
      currency: params.currency,
    }),
    text: `Invoice ${params.invoiceNumber}: ${params.title} — ${formatCurrency(params.total, params.currency)} total (${formatCurrency(params.serviceFee, params.currency)} service fee included). View it anytime at ${SITE_URL}/dashboard/invoices`,
    metadata: { invoiceNumber: params.invoiceNumber },
  });
}

// ---------------------------------------------------------------------------
// Trip reminder — sent by the cron job at src/app/api/cron/trip-reminders.
// ---------------------------------------------------------------------------
export async function sendTripReminderEmail(params: {
  to: string;
  name?: string;
  destination: string;
  daysUntil: number;
  departDate: string;
  bookingRef: string;
}) {
  const name = params.name ?? params.to.split("@")[0];

  return sendEmail({
    type: "trip_reminder",
    to: params.to,
    subject: `${params.daysUntil} ${params.daysUntil === 1 ? "day" : "days"} until ${params.destination}`,
    react: TripReminderEmail({
      name,
      destination: params.destination,
      daysUntil: params.daysUntil,
      departDate: params.departDate,
      bookingRef: params.bookingRef,
    }),
    text: `${params.daysUntil} days until your trip to ${params.destination} (departing ${params.departDate}). Reference: ${params.bookingRef}. Manage your trip at ${SITE_URL}/dashboard/bookings`,
    metadata: { bookingRef: params.bookingRef, daysUntil: params.daysUntil },
  });
}

// ---------------------------------------------------------------------------
// Newsletter — sent from the admin campaign composer
// (src/app/api/admin/newsletter/send/route.ts). One call per recipient so
// each gets its own retry/log row and a personal unsubscribe link.
// ---------------------------------------------------------------------------
export async function sendNewsletterEmail(params: {
  to: string;
  userId: string;
  headline: string;
  intro: string;
}) {
  const unsubscribeUrl = `${SITE_URL}/api/newsletter/unsubscribe?uid=${params.userId}&token=${createUnsubscribeToken(params.userId)}`;

  return sendEmail({
    type: "newsletter",
    to: params.to,
    subject: params.headline,
    react: NewsletterEmail({ headline: params.headline, intro: params.intro, unsubscribeUrl }),
    text: `${params.headline}\n\n${params.intro}\n\nBrowse packages at ${SITE_URL}/packages\n\nUnsubscribe: ${unsubscribeUrl}`,
  });
}

// ---------------------------------------------------------------------------
// Contact form — internal notification + auto-reply. Not part of the
// requested workflow list, but now shares the same branded layout (logo,
// footer) and retry/logging wrapper as everything else instead of a
// hand-rolled HTML string.
// ---------------------------------------------------------------------------
export async function sendContactNotificationEmail(params: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  return sendEmail({
    type: "contact_notification",
    to: siteConfig.email,
    replyTo: params.email,
    subject: `New support request: ${params.subject}`,
    react: (
      <EmailLayout preview={`New support request from ${params.name}`}>
        <EmailHeading>New support request</EmailHeading>
        <p style={{ fontSize: 14, color: "#0D0D0D", margin: "0 0 8px" }}>
          <strong>From:</strong> {params.name} ({params.email})
        </p>
        <p style={{ fontSize: 14, color: "#0D0D0D", margin: "0 0 12px" }}>
          <strong>Subject:</strong> {params.subject}
        </p>
        <p
          style={{
            fontSize: 14,
            color: "#0D0D0D",
            whiteSpace: "pre-wrap",
            backgroundColor: "#F4F6F8",
            borderRadius: 8,
            padding: 16,
          }}
        >
          {params.message}
        </p>
      </EmailLayout>
    ),
    text: `From: ${params.name} (${params.email})\nSubject: ${params.subject}\n\n${params.message}`,
  });
}

export async function sendContactAutoReplyEmail(params: { to: string; name: string }) {
  return sendEmail({
    type: "contact_auto_reply",
    to: params.to,
    subject: "We've received your message",
    react: (
      <EmailLayout preview="We've got your message">
        <EmailHeading>We&apos;ve got your message</EmailHeading>
        <EmailGreeting name={params.name} />
        <p style={{ fontSize: 14, lineHeight: 1.7, color: "#0D0D0D", margin: "0 0 12px" }}>
          Thanks for reaching out to {siteConfig.name}. A member of our travel support team will
          respond within 24 hours.
        </p>
        <p style={{ fontSize: 14, lineHeight: 1.7, color: "#0D0D0D", margin: "0 0 12px" }}>
          In the meantime, feel free to keep exploring flights, hotels, and travel packages on the
          platform.
        </p>
        <EmailButton href={`${SITE_URL}/flights`}>Continue exploring</EmailButton>
      </EmailLayout>
    ),
    text: `Hi ${params.name}, thanks for reaching out to ${siteConfig.name}. A member of our travel support team will respond within 24 hours.`,
  });
}
