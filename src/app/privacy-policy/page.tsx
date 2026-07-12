import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, LegalSection } from "@/components/legal/legal-page";
import { siteConfig, fullAddress } from "@/lib/data/site-config";
import { canonicalFor } from "@/lib/seo";

export const metadata: Metadata = {
  ...canonicalFor("/privacy-policy"),
  title: "Privacy Policy",
  description:
    "How Vision To The World collects, uses, and protects your personal information when you use our travel booking platform.",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="July 11, 2026"
      intro="This Privacy Policy explains how Vision To The World ('we', 'us', 'our') collects, uses, discloses, and safeguards your information when you use our website and booking platform."
    >
      <LegalSection title="1. Information We Collect">
        <p>We collect information you provide directly to us, including:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Account information — name, email address, phone number, and password when you register.</li>
          <li>Booking information — traveler names, passport/ID details, travel dates, destinations, and preferences needed to complete flight, hotel, car rental, transfer, package, visa, or insurance bookings.</li>
          <li>Payment information — processed directly by our payment partners (Stripe, PayPal, Cash App); we do not store full card numbers on our servers.</li>
          <li>Communications — messages you send through our contact form, support tickets, or WhatsApp.</li>
        </ul>
        <p>We also automatically collect limited technical information (IP address, browser type, device information, and pages visited) to keep the platform secure and improve performance.</p>
      </LegalSection>

      <LegalSection title="2. How We Use Your Information">
        <ul className="list-disc space-y-1 pl-5">
          <li>To create and manage your account and dashboard.</li>
          <li>To search, process, and confirm bookings with airlines, hotels, car rental companies, and other travel suppliers.</li>
          <li>To process payments and send booking confirmations, invoices, and receipts.</li>
          <li>To respond to support requests and provide customer service.</li>
          <li>To detect, prevent, and address fraud, abuse, and security incidents.</li>
          <li>To comply with legal obligations, including those required for visa and travel documentation assistance.</li>
        </ul>
      </LegalSection>

      <LegalSection title="3. Sharing Your Information">
        <p>We share information only as necessary to deliver our services:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>With travel suppliers (airlines, hotels, car rental companies, and other providers, including via the Amadeus travel platform) to complete your bookings.</li>
          <li>With payment processors (Stripe, PayPal) to process transactions securely.</li>
          <li>With our database and authentication provider (Supabase) to store account and booking records.</li>
          <li>With our email provider (Resend) to deliver transactional emails such as booking confirmations.</li>
          <li>When required by law, regulation, legal process, or government request.</li>
        </ul>
        <p>We do not sell your personal information to third parties.</p>
      </LegalSection>

      <LegalSection title="4. Data Security">
        <p>
          We use industry-standard safeguards — including encrypted connections, access controls, and
          row-level security on our database — to protect your information. No method of transmission or
          storage is 100% secure, and we cannot guarantee absolute security.
        </p>
      </LegalSection>

      <LegalSection title="5. Data Retention">
        <p>
          We retain account and booking records for as long as your account is active or as needed to
          provide services, comply with legal obligations, resolve disputes, and enforce our agreements.
          You may request deletion of your account by contacting us at{" "}
          <a href={`mailto:${siteConfig.email}`} className="font-medium text-accent-600">
            {siteConfig.email}
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection title="6. Your Rights">
        <p>
          Depending on your location, you may have the right to access, correct, or delete your personal
          information, or object to certain processing. To exercise any of these rights, contact us using
          the details below.
        </p>
      </LegalSection>

      <LegalSection title="7. Children's Privacy">
        <p>
          Our services are not directed to individuals under 18. We do not knowingly collect personal
          information from children. Bookings for minors must be made by a parent or legal guardian.
        </p>
      </LegalSection>

      <LegalSection title="8. Changes to This Policy">
        <p>
          We may update this Privacy Policy from time to time. Material changes will be reflected by
          updating the &quot;Last updated&quot; date above. Continued use of the platform after changes
          take effect constitutes acceptance of the revised policy.
        </p>
      </LegalSection>

      <LegalSection title="9. Contact Us">
        <p>
          Questions about this Privacy Policy can be directed to{" "}
          <a href={`mailto:${siteConfig.email}`} className="font-medium text-accent-600">
            {siteConfig.email}
          </a>{" "}
          or by mail to {fullAddress}. You can also reach us through our{" "}
          <Link href="/contact" className="font-medium text-accent-600">
            contact page
          </Link>
          .
        </p>
      </LegalSection>
    </LegalPage>
  );
}
