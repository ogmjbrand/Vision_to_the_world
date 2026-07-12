import { Img, Section, Text } from "@react-email/components";
import { EmailButton, EmailGreeting, EmailHeading, EmailLayout } from "./components/layout";
import { colors, siteUrl } from "./components/theme";

const checklist = [
  "Check your passport and visa are valid for entry",
  "Check in online and download your boarding pass",
  "Confirm your airport transfer pickup time",
  "Review your travel insurance coverage",
];

export default function TripReminderEmail({
  name = "Traveler",
  destination = "Cairo, Egypt",
  daysUntil = 3,
  departDate = "March 14, 2026",
  bookingRef = "VTW-000000",
}: {
  name?: string;
  destination?: string;
  daysUntil?: number;
  departDate?: string;
  bookingRef?: string;
}) {
  return (
    <EmailLayout preview={`${daysUntil} days until your trip to ${destination}`}>
      <EmailHeading>
        {daysUntil} {daysUntil === 1 ? "day" : "days"} until {destination} ✈️
      </EmailHeading>
      <EmailGreeting name={name} />
      <Text style={paragraph}>
        Your trip is coming up fast! Here&apos;s a quick reminder of your booking details and a
        checklist to make sure you&apos;re ready to go.
      </Text>

      <Section style={{ margin: "18px 0" }}>
        <Img
          src={`${siteUrl}/media/gallery/egypt-pyramids-panorama.jpg`}
          width={496}
          height={200}
          alt={destination}
          style={{ width: "100%", height: "auto", borderRadius: "10px", display: "block" }}
        />
      </Section>

      <Section style={card}>
        <Text style={eyebrow}>Departing</Text>
        <Text style={cardTitle}>{departDate}</Text>
        <Text style={cardRef}>Reference: {bookingRef}</Text>
      </Section>

      <Text style={{ ...paragraph, marginTop: "20px", fontWeight: 700 }}>Before you go:</Text>
      {checklist.map((item) => (
        <Text key={item} style={checklistItem}>
          &#9744; {item}
        </Text>
      ))}

      <EmailButton href={`${siteUrl}/dashboard/bookings`}>Manage my trip</EmailButton>
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
  padding: "16px 20px",
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
  fontSize: "16px",
  fontWeight: 700,
  color: colors.ink,
  margin: "4px 0 0",
};

const cardRef = {
  fontSize: "12px",
  color: colors.textMuted,
  margin: "4px 0 0",
};

const checklistItem = {
  fontSize: "13px",
  color: colors.ink,
  margin: "6px 0",
};
