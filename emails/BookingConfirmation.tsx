import { Section, Text } from "@react-email/components";
import { EmailButton, EmailGreeting, EmailHeading, EmailLayout } from "./components/layout";
import { colors, formatCurrency, siteUrl } from "./components/theme";

export default function BookingConfirmationEmail({
  name = "Traveler",
  title = "Flight to Cairo (CAI)",
  type = "Flight Booking",
  bookingRef = "VTW-000000",
  total = 0,
  currency = "USD",
}: {
  name?: string;
  title?: string;
  type?: string;
  bookingRef?: string;
  total?: number;
  currency?: string;
}) {
  return (
    <EmailLayout preview={`Booking confirmed: ${title}`}>
      <EmailHeading>Booking confirmed 🎉</EmailHeading>
      <EmailGreeting name={name} />
      <Text style={paragraph}>
        Thanks for booking with Vision To The World! Here&apos;s a summary of your trip:
      </Text>

      <Section style={card}>
        <Text style={eyebrow}>{type}</Text>
        <Text style={cardTitle}>{title}</Text>
        <Text style={cardRef}>Reference: {bookingRef}</Text>
        <Text style={cardTotal}>{formatCurrency(total, currency)}</Text>
      </Section>

      <Text style={paragraph}>
        You can view your e-ticket, download your invoice, and manage this booking anytime from
        your dashboard.
      </Text>

      <EmailButton href={`${siteUrl}/dashboard/bookings`}>View my bookings</EmailButton>
    </EmailLayout>
  );
}

const paragraph = {
  fontSize: "14px",
  lineHeight: "1.7",
  color: colors.ink,
  margin: "0 0 12px",
};

const card = {
  border: `1px solid ${colors.border}`,
  borderRadius: "10px",
  padding: "18px 20px",
  margin: "18px 0",
  backgroundColor: colors.pageBg,
};

const eyebrow = {
  fontSize: "11px",
  fontWeight: 700,
  textTransform: "uppercase" as const,
  letterSpacing: "0.06em",
  color: colors.textMuted,
  margin: 0,
};

const cardTitle = {
  fontSize: "17px",
  fontWeight: 700,
  color: colors.ink,
  margin: "4px 0 0",
};

const cardRef = {
  fontSize: "12px",
  color: colors.textMuted,
  margin: "4px 0 0",
};

const cardTotal = {
  fontSize: "22px",
  fontWeight: 700,
  color: colors.greenDark,
  margin: "12px 0 0",
};
