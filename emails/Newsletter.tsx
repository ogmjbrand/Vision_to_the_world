import { Column, Img, Row, Section, Text } from "@react-email/components";
import { EmailButton, EmailHeading, EmailLayout } from "./components/layout";
import { colors, siteUrl } from "./components/theme";

type Highlight = { title: string; location: string; image: string; href: string };

const highlights: Highlight[] = [
  {
    title: "Giza, Egypt",
    location: "From $640 round-trip",
    image: "/media/gallery/egypt-pyramids-panorama.jpg",
    href: "/flights",
  },
  {
    title: "Lakeside Vineyards",
    location: "7-day vacation package",
    image: "/media/gallery/vineyard-lake-sunset.jpg",
    href: "/packages",
  },
  {
    title: "Saffron Beach",
    location: "Beachfront stays worldwide",
    image: "/media/gallery/beachfront-dining.jpg",
    href: "/hotels",
  },
];

export default function NewsletterEmail({
  headline = "Where will your next trip take you?",
  intro = "New routes, fresh package deals, and real-time pricing across flights, hotels, and more — all in one place.",
}: {
  headline?: string;
  intro?: string;
}) {
  return (
    <EmailLayout preview={headline}>
      <EmailHeading>{headline}</EmailHeading>
      <Text style={paragraph}>{intro}</Text>

      {highlights.map((h) => (
        <Section key={h.title} style={{ margin: "20px 0" }}>
          <Img
            src={`${siteUrl}${h.image}`}
            width={496}
            height={200}
            alt={h.title}
            style={{ width: "100%", height: "auto", borderRadius: "10px", display: "block" }}
          />
          <Row style={{ marginTop: "10px" }}>
            <Column>
              <Text style={destTitle}>{h.title}</Text>
              <Text style={destSub}>{h.location}</Text>
            </Column>
            <Column style={{ textAlign: "right" as const, verticalAlign: "middle" }}>
              <a href={`${siteUrl}${h.href}`} style={link}>
                Explore &rarr;
              </a>
            </Column>
          </Row>
        </Section>
      ))}

      <EmailButton href={`${siteUrl}/packages`}>Browse all packages</EmailButton>

      <Text style={unsubscribe}>
        You&apos;re receiving this because you subscribed to Vision To The World updates.
      </Text>
    </EmailLayout>
  );
}

const paragraph = {
  fontSize: "14px",
  lineHeight: "1.7",
  color: colors.ink,
  margin: "0 0 8px",
};

const destTitle = {
  fontSize: "15px",
  fontWeight: 700,
  color: colors.ink,
  margin: 0,
};

const destSub = {
  fontSize: "12px",
  color: colors.textMuted,
  margin: "2px 0 0",
};

const link = {
  fontSize: "13px",
  fontWeight: 700,
  color: colors.greenDark,
  textDecoration: "none",
};

const unsubscribe = {
  fontSize: "11px",
  color: colors.textMuted,
  margin: "20px 0 0",
};
