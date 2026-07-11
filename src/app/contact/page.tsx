import type { Metadata } from "next";
import { Mail, Phone, Headphones, MessageCircle, MapPin } from "lucide-react";
import Container from "@/components/ui/container";
import SectionHeading from "@/components/ui/section-heading";
import ContactForm from "@/components/contact/contact-form";
import OfficeMapLoader from "@/components/contact/office-map-loader";
import { siteConfig, fullAddress } from "@/lib/data/site-config";

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
            <div className="space-y-3 rounded-2xl border border-brand-100 bg-white p-6 shadow-sm">
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-2 text-sm text-brand-700 hover:text-brand-950"
              >
                <Mail className="h-4 w-4 shrink-0 text-accent-600" />
                {siteConfig.email}
              </a>
              {siteConfig.phones.map((phone) => (
                <a
                  key={phone}
                  href={`tel:${phone.replace(/[^+\d]/g, "")}`}
                  className="flex items-center gap-2 text-sm text-brand-700 hover:text-brand-950"
                >
                  <Phone className="h-4 w-4 shrink-0 text-accent-600" />
                  {phone}
                </a>
              ))}
              <a
                href={siteConfig.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-brand-700 hover:text-brand-950"
              >
                <MessageCircle className="h-4 w-4 shrink-0 text-accent-600" />
                Chat on WhatsApp
              </a>
              <p className="flex items-start gap-2 text-sm text-brand-700">
                <MapPin className="h-4 w-4 shrink-0 text-accent-600" />
                {fullAddress}
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-brand-100 bg-white p-6 shadow-sm lg:col-span-2">
            <ContactForm />
          </div>
        </div>

        <div className="mt-10">
          <h3 className="text-base font-semibold text-brand-950">Find our office</h3>
          <p className="mt-1 text-sm text-brand-600">{fullAddress}</p>
          <div className="mt-4 h-[360px] overflow-hidden rounded-2xl border border-brand-100 shadow-sm">
            <OfficeMapLoader />
          </div>
        </div>
      </Container>
    </section>
  );
}
