import type { ComponentType } from "react";
import {
  FaCcVisa,
  FaCcMastercard,
  FaCcAmex,
  FaCcApplePay,
  FaGooglePay,
  FaCcAmazonPay,
} from "react-icons/fa6";
import { SiCashapp, SiKlarna } from "react-icons/si";
import { Zap } from "lucide-react";

export type IconComponent = ComponentType<{ className?: string; size?: number; "aria-hidden"?: boolean }>;

export type PaymentMethod = {
  id: string;
  label: string;
  Icon: IconComponent;
  /** Renders the tile as a dark badge (white glyph on near-black) instead of a
   * white card — used for marks like Link that are natively monochrome, so
   * they read correctly instead of looking like a flat placeholder next to
   * the full-color card network logos. */
  dark?: boolean;
};

/**
 * The payment methods Vision To The World accepts through Stripe Checkout.
 * Keep this in sync with which payment methods are actually toggled on in
 * the Stripe Dashboard (Settings -> Payment methods) — this list is a
 * customer-facing claim of what's accepted, not something Checkout reads
 * from automatically.
 */
export const paymentMethods: PaymentMethod[] = [
  { id: "visa", label: "Visa", Icon: FaCcVisa },
  { id: "mastercard", label: "Mastercard", Icon: FaCcMastercard },
  { id: "amex", label: "American Express", Icon: FaCcAmex },
  { id: "apple-pay", label: "Apple Pay", Icon: FaCcApplePay },
  { id: "google-pay", label: "Google Pay", Icon: FaGooglePay },
  { id: "link", label: "Link", Icon: Zap, dark: true },
  { id: "cashapp-pay", label: "Cash App Pay", Icon: SiCashapp },
  { id: "klarna", label: "Klarna", Icon: SiKlarna },
  { id: "amazon-pay", label: "Amazon Pay", Icon: FaCcAmazonPay },
];
