import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/legal/legal-page";
import { siteConfig, fullAddress } from "@/lib/data/site-config";
import { canonicalFor } from "@/lib/seo";

export const metadata: Metadata = {
  ...canonicalFor("/terms-conditions"),
  title: "Terms & Conditions",
  description:
    "The terms and conditions governing use of the Vision To The World self-service travel booking platform.",
};

export default function TermsConditionsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      updated="July 11, 2026"
      intro="These Terms & Conditions ('Terms') govern your use of the Vision To The World website and booking platform. By creating an account or making a booking, you agree to these Terms."
    >
      <LegalSection title="1. Our Role">
        <p>
          Vision To The World is a self-service travel technology platform. We provide the tools to
          search, compare, book, and manage flights, hotels, car rentals, airport transfers, travel
          packages, visa assistance, and travel insurance. For flights, hotels, and car rentals, we act as
          an intermediary connecting you with third-party airlines, hotels, rental companies, and other
          travel suppliers (including through the Amadeus travel platform). The final travel service is
          provided by that third party and is subject to their own terms, fare rules, and policies.
        </p>
      </LegalSection>

      <LegalSection title="2. Eligibility & Account Registration">
        <ul className="list-disc space-y-1 pl-5">
          <li>You must be at least 18 years old to create an account or make a booking.</li>
          <li>You are responsible for maintaining the confidentiality of your account credentials and for all activity under your account.</li>
          <li>You agree to provide accurate, current, and complete information when registering and booking.</li>
        </ul>
      </LegalSection>

      <LegalSection title="3. Bookings & Pricing">
        <ul className="list-disc space-y-1 pl-5">
          <li>Prices displayed are sourced from third-party suppliers in real time and can change until a booking is confirmed and paid for.</li>
          <li>A service fee of 10% is added to the supplier price at checkout to cover platform operations and support. This fee is disclosed before payment.</li>
          <li>Once a payment is confirmed, your booking is subject to the cancellation, change, and refund policy of the relevant airline, hotel, or supplier, in addition to our own <a href="/refund-policy" className="font-medium text-accent-600">Refund Policy</a>.</li>
          <li>You are responsible for reviewing all booking details (names, dates, destinations) before completing payment, as many suppliers restrict or charge for changes after confirmation.</li>
        </ul>
      </LegalSection>

      <LegalSection title="4. Payments">
        <p>
          We accept payment via Stripe, PayPal, and Cash App. Card and PayPal payments are processed
          immediately by our payment partners. Cash App payments are confirmed manually by our team, which
          may take up to one business day. Your booking is not guaranteed until payment is confirmed.
        </p>
      </LegalSection>

      <LegalSection title="5. Travel Documents & Visa Assistance">
        <p>
          You are solely responsible for ensuring you hold valid travel documents, passports, visas, and
          any health or entry requirements for your destination. Our visa assistance service provides
          information and documentation support but does not guarantee visa approval, which is determined
          solely by the relevant government or consulate.
        </p>
      </LegalSection>

      <LegalSection title="6. Travel Insurance">
        <p>
          Travel insurance offered at checkout is optional and provided by third-party insurance partners.
          Coverage terms, exclusions, and claims are governed by the insurer&apos;s policy documents, not by
          Vision To The World.
        </p>
      </LegalSection>

      <LegalSection title="7. Prohibited Use">
        <p>You agree not to use the platform to:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Submit false, fraudulent, or misleading booking or payment information.</li>
          <li>Attempt to circumvent payment, security, or access controls.</li>
          <li>Resell bookings made through the platform without authorization.</li>
          <li>Interfere with the platform&apos;s normal operation or attempt unauthorized access to other accounts.</li>
        </ul>
      </LegalSection>

      <LegalSection title="8. Limitation of Liability">
        <p>
          Vision To The World is not liable for acts, errors, omissions, delays, cancellations, or
          disruptions caused by third-party travel suppliers, airlines, hotels, insurers, or payment
          processors. To the maximum extent permitted by law, our total liability arising from your use of
          the platform is limited to the service fees you paid us for the booking in question.
        </p>
      </LegalSection>

      <LegalSection title="9. Governing Law">
        <p>
          These Terms are governed by the laws of the State of New York, United States, without regard to
          conflict of law principles.
        </p>
      </LegalSection>

      <LegalSection title="10. Changes to These Terms">
        <p>
          We may update these Terms from time to time. Continued use of the platform after changes are
          posted constitutes acceptance of the revised Terms.
        </p>
      </LegalSection>

      <LegalSection title="11. Contact Us">
        <p>
          Questions about these Terms can be directed to{" "}
          <a href={`mailto:${siteConfig.email}`} className="font-medium text-accent-600">
            {siteConfig.email}
          </a>{" "}
          or by mail to {fullAddress}.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
