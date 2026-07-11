import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/legal/legal-page";
import { siteConfig } from "@/lib/data/site-config";

export const metadata: Metadata = {
  title: "Refund Policy",
  description:
    "How cancellations, changes, and refunds are handled for flights, hotels, car rentals, packages, visa assistance, and travel insurance booked through Vision To The World.",
};

export default function RefundPolicyPage() {
  return (
    <LegalPage
      title="Refund Policy"
      updated="July 11, 2026"
      intro="Because Vision To The World books directly with airlines, hotels, car rental companies, and other travel suppliers, most refunds are governed by that supplier's own fare rules and cancellation policy in addition to the terms below."
    >
      <LegalSection title="1. Supplier Cancellation Rules Apply">
        <p>
          Flights, hotels, car rentals, airport transfers, and packages are each subject to the specific
          cancellation, change, and refund rules set by the airline, hotel, rental company, or tour
          operator at the time of booking. These rules (refundable vs. non-refundable fares, cancellation
          windows, penalty fees) are shown before you complete payment wherever available.
        </p>
      </LegalSection>

      <LegalSection title="2. Service Fee">
        <p>
          The 5% service fee charged at checkout covers platform operations, payment processing, and
          booking support. It is non-refundable once a booking has been confirmed with the supplier, even
          if the underlying booking is later cancelled or refunded.
        </p>
      </LegalSection>

      <LegalSection title="3. How to Request a Cancellation or Refund">
        <ul className="list-disc space-y-1 pl-5">
          <li>Sign in to your dashboard and view the booking under &quot;My Bookings&quot;, or</li>
          <li>Contact our support team via the <a href="/contact" className="font-medium text-accent-600">contact page</a>, WhatsApp, or email, quoting your booking reference.</li>
        </ul>
        <p>We will confirm the supplier&apos;s applicable cancellation terms and process eligible refund requests with the supplier on your behalf.</p>
      </LegalSection>

      <LegalSection title="4. Refund Timelines">
        <p>
          Once a refund is approved by the supplier, we initiate it back to your original payment method.
          Stripe and PayPal refunds typically post within 5–10 business days, depending on your bank or
          card issuer. Cash App payments confirmed manually by our team are refunded via Cash App within
          the same timeframe once approved.
        </p>
      </LegalSection>

      <LegalSection title="5. Visa Assistance & Travel Insurance">
        <p>
          Visa assistance and documentation support fees are non-refundable once work has begun on your
          application, as they cover time and processing already performed. Travel insurance premiums are
          refundable only in accordance with the issuing insurer&apos;s own policy terms.
        </p>
      </LegalSection>

      <LegalSection title="6. Non-Refundable Situations">
        <ul className="list-disc space-y-1 pl-5">
          <li>No-shows or missed flights, check-ins, or pickups.</li>
          <li>Cancellations made outside the supplier&apos;s permitted cancellation window.</li>
          <li>Denied boarding or entry due to invalid or missing travel documents.</li>
          <li>Bookings explicitly marked as non-refundable at the time of purchase.</li>
        </ul>
      </LegalSection>

      <LegalSection title="7. Contact Us">
        <p>
          For help with a cancellation or refund, reach our support team at{" "}
          <a href={`mailto:${siteConfig.email}`} className="font-medium text-accent-600">
            {siteConfig.email}
          </a>{" "}
          or via WhatsApp at{" "}
          <a href={siteConfig.whatsappUrl} className="font-medium text-accent-600" target="_blank" rel="noopener noreferrer">
            {siteConfig.phones[0]}
          </a>
          .
        </p>
      </LegalSection>
    </LegalPage>
  );
}
