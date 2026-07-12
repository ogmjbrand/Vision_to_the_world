import { Text } from "@react-email/components";
import { EmailButton, EmailGreeting, EmailHeading, EmailLayout } from "./components/layout";
import { colors } from "./components/theme";

export default function PasswordResetEmail({
  name = "Traveler",
  resetUrl = "https://vision-to-the-world-i2wb.vercel.app/auth/update-password",
}: {
  name?: string;
  resetUrl?: string;
}) {
  return (
    <EmailLayout preview="Reset your Vision To The World password">
      <EmailHeading>Reset your password</EmailHeading>
      <EmailGreeting name={name} />
      <Text style={paragraph}>
        We received a request to reset the password for your Vision To The World account. Click
        the button below to choose a new one.
      </Text>

      <EmailButton href={resetUrl}>Reset my password</EmailButton>

      <Text style={paragraph}>
        This link will expire in 60 minutes. If you didn&apos;t request a password reset, you can
        safely ignore this email — your password won&apos;t be changed.
      </Text>
      <Text style={muted}>
        Having trouble with the button? Copy and paste this URL into your browser:
        <br />
        {resetUrl}
      </Text>
    </EmailLayout>
  );
}

const paragraph = {
  fontSize: "14px",
  lineHeight: "1.7",
  color: colors.ink,
  margin: "0 0 12px",
};

const muted = {
  fontSize: "12px",
  lineHeight: "1.6",
  color: colors.textMuted,
  wordBreak: "break-all" as const,
  margin: "16px 0 0",
};
