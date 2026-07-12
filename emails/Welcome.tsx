import { Column, Img, Row, Section, Text } from "@react-email/components";
import { EmailButton, EmailGreeting, EmailHeading, EmailLayout } from "./components/layout";
import { colors, siteUrl } from "./components/theme";

const services = [
  { label: "Flights", href: "/flights" },
  { label: "Hotels", href: "/hotels" },
  { label: "Car Rental", href: "/car-rental" },
  { label: "Travel Packages", href: "/packages" },
];

export default function WelcomeEmail({
  name = "Traveler",
}: {
  name?: string;
}) {
  return (
    <EmailLayout preview={`Welcome to Vision To The World, ${name}!`}>
      <EmailHeading>Welcome aboard, {name.split(" ")[0]} 🌍</EmailHeading>
      <EmailGreeting name={name} />
      <Text style={paragraph}>
        Your account is ready. Vision To The World puts flights, hotels, car rentals, airport
        transfers, travel packages, visa assistance, and travel insurance in one place — search,
        compare, and book it all yourself, with real support whenever you want it.
      </Text>

      <Section style={{ margin: "24px 0" }}>
        <Img
          src={`${siteUrl}/media/gallery/egypt-pyramids-panorama.jpg`}
          width={496}
          height={220}
          alt="Giza, Egypt"
          style={{ width: "100%", height: "auto", borderRadius: "10px", display: "block" }}
        />
      </Section>

      <EmailButton href={`${siteUrl}/flights`}>Start exploring</EmailButton>

      <Text style={{ ...paragraph, marginTop: "24px", marginBottom: "8px" }}>
        A few places to start:
      </Text>
      <Row>
        {services.map((s) => (
          <Column key={s.label} style={pillCell}>
            <a href={`${siteUrl}${s.href}`} style={pill}>
              {s.label}
            </a>
          </Column>
        ))}
      </Row>
    </EmailLayout>
  );
}

const paragraph = {
  fontSize: "14px",
  lineHeight: "1.7",
  color: colors.ink,
  margin: "0 0 12px",
};

const pillCell = { padding: "4px" };

const pill = {
  display: "block",
  textAlign: "center" as const,
  fontSize: "12px",
  fontWeight: 700,
  color: colors.ink,
  backgroundColor: colors.ice,
  border: `1px solid ${colors.border}`,
  borderRadius: "8px",
  padding: "10px 6px",
  textDecoration: "none",
};
