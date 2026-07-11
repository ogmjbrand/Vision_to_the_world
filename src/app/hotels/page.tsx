import type { Metadata } from "next";
import { SlidersHorizontal } from "lucide-react";
import ServiceHero from "@/components/services/service-hero";
import Container from "@/components/ui/container";
import SearchWidget from "@/components/search/search-widget";
import HotelCard from "@/components/hotels/hotel-card";
import { getService } from "@/lib/data/services";
import { generateHotelResults } from "@/lib/data/mock-results";

export const metadata: Metadata = {
  title: "Hotel Booking",
  description:
    "Discover hotels worldwide, compare rooms and prices, and book instantly with real-time availability.",
};

const service = getService("hotels")!;

export default async function HotelsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const destination =
    typeof params.destination === "string" ? params.destination : undefined;
  const checkIn = typeof params.checkIn === "string" ? params.checkIn : undefined;
  const checkOut =
    typeof params.checkOut === "string" ? params.checkOut : undefined;

  const hasSearch = !!(destination && checkIn && checkOut);
  const results = hasSearch ? generateHotelResults(destination) : [];

  return (
    <>
      <ServiceHero slug={service.slug} />
      <Container className="py-12">
        <div className="-mt-24 mb-10">
          <SearchWidget />
        </div>

        {hasSearch ? (
          <div>
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-xl font-bold text-brand-950">
                {results.length} stays in {destination}
              </h2>
              <span className="flex items-center gap-1.5 text-sm text-brand-500">
                <SlidersHorizontal className="h-4 w-4" />
                Sorted by price
              </span>
            </div>
            <div className="grid gap-4">
              {results.map((hotel) => (
                <HotelCard key={hotel.id} hotel={hotel} />
              ))}
            </div>
            <p className="mt-6 text-center text-xs text-brand-400">
              Results shown are illustrative pending live Booking.com
              integration credentials.
            </p>
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-brand-200 bg-brand-50/60 p-10 text-center">
            <p className="text-brand-700">
              Enter a destination and your check-in / check-out dates above
              to see available hotels.
            </p>
          </div>
        )}
      </Container>
    </>
  );
}
