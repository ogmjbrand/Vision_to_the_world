import { Text } from "@react-email/components";
import { EmailButton, EmailGreeting, EmailHeading, EmailLayout } from "./components/layout";
import { colors, formatCurrency, siteUrl } from "./components/theme";

type LineItem = { label: string; amount: number };

export default function InvoiceEmail({
  name = "Traveler",
  invoiceNumber = "INV-000000",
  date = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
  items = [
    { label: "Flight to Cairo (CAI) — 1 traveler", amount: 640 },
    { label: "Service fee (10%)", amount: 64 },
  ],
  currency = "USD",
}: {
  name?: string;
  invoiceNumber?: string;
  date?: string;
  items?: LineItem[];
  currency?: string;
}) {
  const total = items.reduce((sum, item) => sum + item.amount, 0);

  return (
    <EmailLayout preview={`Your invoice ${invoiceNumber} from Vision To The World`}>
      <EmailHeading>Your invoice</EmailHeading>
      <EmailGreeting name={name} />
      <Text style={paragraph}>
        Here&apos;s your receipt for the booking below. A copy is also available anytime from
        your dashboard.
      </Text>

      <table role="presentation" width="100%" cellPadding={0} cellSpacing={0} style={table}>
        <tbody>
          <tr>
            <td style={metaCell}>
              <Text style={metaLabel}>Invoice number</Text>
              <Text style={metaValue}>{invoiceNumber}</Text>
            </td>
            <td style={{ ...metaCell, textAlign: "right" as const }}>
              <Text style={metaLabel}>Date</Text>
              <Text style={metaValue}>{date}</Text>
            </td>
          </tr>
        </tbody>
      </table>

      <table role="presentation" width="100%" cellPadding={0} cellSpacing={0} style={itemsTable}>
        <tbody>
          {items.map((item) => (
            <tr key={item.label}>
              <td style={itemLabel}>{item.label}</td>
              <td style={itemAmount}>{formatCurrency(item.amount, currency)}</td>
            </tr>
          ))}
          <tr>
            <td style={totalLabel}>Total</td>
            <td style={totalAmount}>{formatCurrency(total, currency)}</td>
          </tr>
        </tbody>
      </table>

      <EmailButton href={`${siteUrl}/dashboard/invoices`}>View full invoice</EmailButton>
    </EmailLayout>
  );
}

const paragraph = {
  fontSize: "14px",
  lineHeight: "1.7",
  color: colors.ink,
  margin: "0 0 12px",
};

const table = { margin: "18px 0 8px" };

const metaCell = { padding: "0" };

const metaLabel = {
  fontSize: "11px",
  fontWeight: 700,
  textTransform: "uppercase" as const,
  letterSpacing: "0.05em",
  color: colors.textMuted,
  margin: 0,
};

const metaValue = {
  fontSize: "13px",
  fontWeight: 600,
  color: colors.ink,
  margin: "2px 0 0",
};

const itemsTable = {
  border: `1px solid ${colors.border}`,
  borderRadius: "10px",
  margin: "12px 0 0",
  overflow: "hidden",
};

const itemLabel = {
  fontSize: "13px",
  color: colors.ink,
  padding: "12px 16px",
  borderBottom: `1px solid ${colors.border}`,
};

const itemAmount = {
  fontSize: "13px",
  color: colors.ink,
  padding: "12px 16px",
  borderBottom: `1px solid ${colors.border}`,
  textAlign: "right" as const,
  whiteSpace: "nowrap" as const,
};

const totalLabel = {
  fontSize: "14px",
  fontWeight: 700,
  color: colors.ink,
  padding: "14px 16px",
  backgroundColor: colors.pageBg,
};

const totalAmount = {
  fontSize: "16px",
  fontWeight: 700,
  color: colors.greenDark,
  padding: "14px 16px",
  backgroundColor: colors.pageBg,
  textAlign: "right" as const,
  whiteSpace: "nowrap" as const,
};
