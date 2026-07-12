import type { Metadata } from "next";
import { Car, Users, Gauge } from "lucide-react";
import ServiceHero from "@/components/services/service-hero";
import Container from "@/components/ui/container";
import SearchWidget from "@/components/search/search-widget";
import { LinkButton } from "@/components/ui/button";
import { getService } from "@/lib/data/services";
import { generateCarResults } from "@/lib/data/mock-results";
import { checkoutHref } from "@/lib/checkout-sign";
import { formatCurrency } from "@/lib/utils";
import { canonicalFor } from "@/lib/seo";

export const metadata: Metadata = {
  ...canonicalFor("/car-rental"),
  title: "Car Rental",
  description:
    "Search rental vehicles worldwide, compare rental companies and categories, and book securely online.",
};

const service = getService("car-rental")!;

export default async function CarRentalPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const location = typeof params.location === "string" ? params.location : undefined;
  const vehicleType =
    typeof params.vehicleType === "string" ? params.vehicleType : "economy";
  const pickupDate = typeof params.pickupDate === "string" ? params.pickupDate : undefined;

  const hasSearch = !!location;
  const results = hasSearch ? generateCarResults(location, vehicleType) : [];

  return (
    <>
      <ServiceHero slug={service.slug} />
      <Container className="py-12">
        <div className="-mt-24 mb-10">
          <SearchWidget />
        </div>

        {hasSearch ? (
          <div>
            <h2 className="mb-5 text-xl font-bold text-brand-950">
              {results.length} vehicles available in {location}
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((car) => (
                <div
                  key={car.id}
                  className="flex flex-col rounded-2xl border border-brand-100 bg-white p-5 shadow-sm"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                    <Car className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-base font-semibold text-brand-950">
                    {car.model}
                  </h3>
                  <p className="text-xs text-brand-500">
                    {car.company} · {car.category}
                  </p>
                  <div className="mt-3 flex items-center gap-4 text-xs text-brand-600">
                    <span className="flex items-center gap-1">
                      <Users className="h-3.5 w-3.5" /> {car.seats} seats
                    </span>
                    <span className="flex items-center gap-1">
                      <Gauge className="h-3.5 w-3.5" /> {car.transmission}
                    </span>
                  </div>
                  <div className="mt-4 flex items-end justify-between">
                    <p className="text-lg font-bold text-brand-950">
                      {formatCurrency(car.pricePerDay, car.currency)}
                      <span className="text-sm font-normal text-brand-500">
                        {" "}
                        / day
                      </span>
                    </p>
                    <LinkButton
                      href={checkoutHref({
                        type: "Car Rental",
                        title: `${car.model} · ${car.company} (${car.category})`,
                        price: car.pricePerDay,
                        currency: car.currency,
                        travelDate: pickupDate,
                      })}
                      size="sm"
                    >
                      Reserve
                    </LinkButton>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-6 text-center text-xs text-brand-400">
              Results shown are illustrative pending live rental-supplier
              integration credentials.
            </p>
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-brand-200 bg-brand-50/60 p-10 text-center">
            <p className="text-brand-700">
              Enter a pickup location above to see available rental vehicles.
            </p>
          </div>
        )}
      </Container>
    </>
  );
}
