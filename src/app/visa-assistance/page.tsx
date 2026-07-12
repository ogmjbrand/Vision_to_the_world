import type { Metadata } from "next";
import { FileText, Globe2, ShieldQuestion, Headphones } from "lucide-react";
import ServiceHero from "@/components/services/service-hero";
import Container from "@/components/ui/container";
import SectionHeading from "@/components/ui/section-heading";
import { LinkButton } from "@/components/ui/button";
import { getService } from "@/lib/data/services";
import { canonicalFor } from "@/lib/seo";

export const metadata: Metadata = {
  ...canonicalFor("/visa-assistance"),
  title: "Visa & Travel Assistance",
  description:
    "Visa information, documentation support, destination requirements, and entry regulations to help you travel with confidence.",
};

const service = getService("visa-assistance")!;

const topics = [
  {
    icon: Globe2,
    title: "Destination requirements",
    description:
      "Check entry rules, visa categories, and processing times for your destination before you book.",
  },
  {
    icon: FileText,
    title: "Documentation support",
    description:
      "Guidance on the forms, photos, and supporting documents required for a smooth application.",
  },
  {
    icon: ShieldQuestion,
    title: "Entry regulations",
    description:
      "Stay up to date on health, customs, and transit regulations that may affect your itinerary.",
  },
  {
    icon: Headphones,
    title: "Personalized assistance",
    description:
      "Complex itinerary or special circumstances? Connect with a travel consultant for tailored guidance.",
  },
];

export default function VisaAssistancePage() {
  return (
    <>
      <ServiceHero slug={service.slug} />
      <Container className="py-16">
        <SectionHeading
          eyebrow="Travel with confidence"
          title="Guidance for every step of your travel documentation"
          description="Requirements vary by nationality, destination, and purpose of travel. Our team helps you understand what's needed before you book."
        />

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {topics.map((topic) => (
            <div
              key={topic.title}
              className="flex gap-4 rounded-2xl border border-brand-100 bg-white p-6 shadow-sm"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <topic.icon className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-base font-semibold text-brand-950">
                  {topic.title}
                </h3>
                <p className="mt-1 text-sm text-brand-600">{topic.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div
          id="consultant"
          className="mt-12 flex flex-col items-center gap-4 rounded-2xl bg-brand-950 p-10 text-center"
        >
          <h3 className="text-2xl font-bold text-white">
            Need help with a complex visa case?
          </h3>
          <p className="max-w-xl text-brand-200">
            Speak with a professional travel consultant for personalized visa
            and documentation assistance.
          </p>
          <LinkButton href="/contact#consultant" size="lg">
            Talk to a consultant
          </LinkButton>
        </div>
      </Container>
    </>
  );
}
