import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import type { ReactNode } from "react";
import { brand, colors, contact } from "./theme";

export function EmailLayout({
  preview,
  children,
}: {
  preview: string;
  children: ReactNode;
}) {
  return (
    <Html>
      <Head />
      <Preview>{preview}</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Section style={styles.header}>
            <Img
              src={brand.logoUrl}
              width={brand.logoWidth}
              height={brand.logoHeight}
              alt={brand.name}
              style={{ margin: "0 auto", display: "block" }}
            />
            <Text style={styles.tagline}>{brand.tagline}</Text>
          </Section>

          <Section style={styles.content}>{children}</Section>

          <Hr style={styles.hr} />

          <Section style={styles.footer}>
            <Text style={styles.footerText}>
              {contact.address}
              <br />
              {contact.email} &middot; {contact.phones[0]}
            </Text>
            <Text style={styles.socialRow}>
              {contact.social.map((s, i) => (
                <span key={s.label}>
                  <Link href={s.href} style={styles.socialLink}>
                    {s.label}
                  </Link>
                  {i < contact.social.length - 1 ? "  ·  " : ""}
                </span>
              ))}
            </Text>
            <Text style={styles.copyright}>
              &copy; {new Date().getFullYear()} {brand.name}. All rights reserved.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

export function EmailButton({ href, children }: { href: string; children: ReactNode }) {
  return (
    <table role="presentation" cellPadding={0} cellSpacing={0} style={{ margin: "24px 0" }}>
      <tr>
        <td style={styles.buttonCell}>
          <Link href={href} style={styles.button}>
            {children}
          </Link>
        </td>
      </tr>
    </table>
  );
}

export function EmailHeading({ children }: { children: ReactNode }) {
  return <Text style={styles.heading}>{children}</Text>;
}

export function EmailGreeting({ name }: { name: string }) {
  return <Text style={styles.greeting}>Hi {name},</Text>;
}

const styles: Record<string, React.CSSProperties> = {
  body: {
    backgroundColor: colors.pageBg,
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    padding: "32px 0",
    margin: 0,
  },
  container: {
    backgroundColor: colors.white,
    maxWidth: "560px",
    margin: "0 auto",
    borderRadius: "12px",
    overflow: "hidden",
    border: `1px solid ${colors.border}`,
  },
  header: {
    backgroundColor: colors.ink,
    padding: "28px 32px 22px",
    borderBottom: `3px solid ${colors.gold}`,
  },
  tagline: {
    color: colors.ice,
    fontSize: "12px",
    textAlign: "center",
    margin: "10px 0 0",
    letterSpacing: "0.03em",
  },
  content: {
    padding: "32px",
    color: colors.ink,
  },
  heading: {
    fontSize: "22px",
    fontWeight: 700,
    color: colors.ink,
    margin: "0 0 16px",
  },
  greeting: {
    fontSize: "15px",
    color: colors.ink,
    margin: "0 0 12px",
  },
  buttonCell: {
    borderRadius: "8px",
    backgroundColor: colors.green,
  },
  button: {
    display: "inline-block",
    padding: "13px 28px",
    fontSize: "14px",
    fontWeight: 700,
    color: colors.white,
    textDecoration: "none",
  },
  hr: {
    borderColor: colors.border,
    margin: 0,
  },
  footer: {
    backgroundColor: colors.ice,
    padding: "22px 32px",
  },
  footerText: {
    fontSize: "12px",
    color: colors.textMuted,
    lineHeight: "1.6",
    margin: "0 0 10px",
    textAlign: "center",
  },
  socialRow: {
    fontSize: "12px",
    textAlign: "center",
    margin: "0 0 10px",
  },
  socialLink: {
    color: colors.greenDark,
    fontWeight: 600,
    textDecoration: "none",
  },
  copyright: {
    fontSize: "11px",
    color: colors.textMuted,
    textAlign: "center",
    margin: 0,
  },
};
