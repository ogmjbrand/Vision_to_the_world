import type { Metadata } from "next";
import { Mail, Phone, Headphones } from "lucide-react";
import Container from "@/components/ui/container";
import SectionHeading from "@/components/ui/section-heading";
import ContactForm from "@/components/contact/contact-form";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Vision To The World support or speak with a professional travel consultant for personalized assistance.",
};

export default function ContactPage() {
  return (
    <section className="py-16">
      <Container>
        <SectionHeading
          eyebrow="We're here to help"
          title="Contact & Travel Assistance"
          description="While Vision To The World is a self-service platform, our support team and travel consultants are available for complex itineraries or special requests."
        />

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-3">
          <div id="consultant" className="space-y-4 lg:col-span-1">
            <div className="rounded-2xl border border-brand-100 bg-white p-6 shadow-sm">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <Headphones className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-base font-semibold text-brand-950">
                Talk to a travel consultant
              </h3>
              <p className="mt-1 text-sm text-brand-600">
                For complex itineraries or special requests, our consultants
                provide personalized, professional assistance.
              </p>
            </div>
            <div className="rounded-2xl border border-brand-100 bg-white p-6 shadow-sm">
              <p className="flex items-center gap-2 text-sm text-brand-700">
                <Mail className="h-4 w-4 text-accent-600" />
                support@visiontotheworld.com
              </p>
              <p className="mt-2 flex items-center gap-2 text-sm text-brand-700">
                <Phone className="h-4 w-4 text-accent-600" />
                +1 (800) 555-0199
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-brand-100 bg-white p-6 shadow-sm lg:col-span-2">
            <ContactForm />
          </div>
        </div>
      </Container>
    </section>
  );
}
