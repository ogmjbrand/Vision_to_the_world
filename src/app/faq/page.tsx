import type { Metadata } from "next";
import Container from "@/components/ui/container";
import SectionHeading from "@/components/ui/section-heading";
import CTA from "@/components/home/cta";
import FaqAccordion from "@/components/faq/faq-accordion";
import { faqs } from "@/lib/data/faq";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers to common questions about booking flights, hotels, car rentals, visa assistance, and travel insurance with Vision To The World.",
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.flatMap((category) =>
    category.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  ),
};

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <section className="bg-brand-950 py-16">
        <Container>
          <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-accent-200 ring-1 ring-white/20">
            Frequently Asked Questions
          </span>
          <h1 className="mt-5 max-w-2xl text-3xl font-bold text-white sm:text-4xl">
            Everything you need to know before you book
          </h1>
          <p className="mt-4 max-w-2xl text-brand-100">
            Can&apos;t find your answer here? Reach out through our contact page and our support team
            will respond within 24 hours.
          </p>
        </Container>
      </section>

      <section className="py-16">
        <Container className="max-w-3xl">
          <SectionHeading title="Common Questions" className="mb-2" />
          <div className="mt-8">
            <FaqAccordion categories={faqs} />
          </div>
        </Container>
      </section>

      <CTA />
    </>
  );
}
