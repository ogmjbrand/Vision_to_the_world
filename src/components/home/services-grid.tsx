import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "@/components/ui/container";
import SectionHeading from "@/components/ui/section-heading";
import { services } from "@/lib/data/services";

export default function ServicesGrid() {
  return (
    <section className="py-20">
      <Container>
        <SectionHeading
          eyebrow="Core Services"
          title="Everything your journey needs, in one place"
          description="Whether you travel for business, leisure, education, family, pilgrimage, or adventure — plan and book it all here."
        />

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/${service.slug}`}
              className="group flex flex-col rounded-2xl border border-brand-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 group-hover:bg-brand-900 group-hover:text-white">
                <service.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-4 text-lg font-semibold text-brand-950">
                {service.name}
              </h3>
              <p className="mt-1.5 text-sm text-brand-600">
                {service.description}
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent-600">
                Explore
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
