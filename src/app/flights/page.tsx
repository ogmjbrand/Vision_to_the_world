import type { Metadata } from "next";
import { SlidersHorizontal } from "lucide-react";
import ServiceHero from "@/components/services/service-hero";
import Container from "@/components/ui/container";
import SearchWidget from "@/components/search/search-widget";
import FlightCard from "@/components/flights/flight-card";
import { getService } from "@/lib/data/services";
import { generateFlightResults } from "@/lib/data/mock-results";

export const metadata: Metadata = {
  title: "Flight Booking",
  description:
    "Search and compare flights from multiple airlines with real-time pricing, flexible dates, and instant e-ticket delivery.",
};

const service = getService("flights")!;

export default async function FlightsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const origin = typeof params.origin === "string" ? params.origin : undefined;
  const destination =
    typeof params.destination === "string" ? params.destination : undefined;
  const date = typeof params.date === "string" ? params.date : undefined;

  const hasSearch = !!(origin && destination && date);
  const results = hasSearch
    ? generateFlightResults(origin, destination, date)
    : [];

  return (
    <>
      <ServiceHero service={service} />
      <Container className="py-12">
        <div className="-mt-24 mb-10">
          <SearchWidget />
        </div>

        {hasSearch ? (
          <div>
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-xl font-bold text-brand-950">
                {results.length} flights from {origin.toUpperCase()} to{" "}
                {destination.toUpperCase()}
              </h2>
              <span className="flex items-center gap-1.5 text-sm text-brand-500">
                <SlidersHorizontal className="h-4 w-4" />
                Sorted by price
              </span>
            </div>
            <div className="grid gap-4">
              {results.map((flight) => (
                <FlightCard key={flight.id} flight={flight} />
              ))}
            </div>
            <p className="mt-6 text-center text-xs text-brand-400">
              Results shown are illustrative pending live Amadeus
              integration credentials.
            </p>
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-brand-200 bg-brand-50/60 p-10 text-center">
            <p className="text-brand-700">
              Enter your origin, destination, and travel date above to see
              available flights.
            </p>
          </div>
        )}
      </Container>
    </>
  );
}
