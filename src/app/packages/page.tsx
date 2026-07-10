import type { Metadata } from "next";
import Image from "next/image";
import { Clock } from "lucide-react";
import ServiceHero from "@/components/services/service-hero";
import Container from "@/components/ui/container";
import { LinkButton } from "@/components/ui/button";
import { getService } from "@/lib/data/services";
import { travelPackages } from "@/lib/data/packages";
import { formatCurrency } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Travel Packages",
  description:
    "Vacation, honeymoon, family, group, educational, and corporate travel packages — curated and ready to book.",
};

const service = getService("packages")!;

export default function PackagesPage() {
  return (
    <>
      <ServiceHero service={service} />
      <Container className="py-16">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {travelPackages.map((pkg) => (
            <div
              key={pkg.slug}
              className="flex flex-col overflow-hidden rounded-2xl border border-brand-100 bg-white shadow-sm"
            >
              <div className="relative h-44 w-full">
                <Image
                  src={pkg.image}
                  alt={pkg.name}
                  fill
                  className="object-cover"
                  unoptimized
                />
                <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-brand-800">
                  {pkg.category}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-base font-semibold text-brand-950">
                  {pkg.name}
                </h3>
                <p className="mt-1.5 flex-1 text-sm text-brand-600">
                  {pkg.description}
                </p>
                <p className="mt-3 flex items-center gap-1.5 text-xs text-brand-500">
                  <Clock className="h-3.5 w-3.5" />
                  {pkg.duration}
                </p>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {pkg.highlights.map((h) => (
                    <li
                      key={h}
                      className="rounded-full bg-brand-50 px-2.5 py-1 text-xs text-brand-700"
                    >
                      {h}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex items-end justify-between">
                  <p className="text-lg font-bold text-brand-950">
                    {formatCurrency(pkg.price, pkg.currency)}
                    <span className="text-sm font-normal text-brand-500">
                      {" "}
                      / person
                    </span>
                  </p>
                  <LinkButton href="/auth/login" size="sm">
                    Book package
                  </LinkButton>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </>
  );
}
