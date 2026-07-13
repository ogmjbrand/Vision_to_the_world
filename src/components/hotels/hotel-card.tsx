import Image from "next/image";
import { Star } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import type { HotelResult } from "@/lib/data/mock-results";
import { checkoutHref } from "@/lib/checkout-sign";
import { LinkButton } from "@/components/ui/button";

export default function HotelCard({
  hotel,
  travelDate,
}: {
  hotel: HotelResult;
  travelDate?: string;
}) {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-brand-100 bg-white shadow-sm sm:flex-row">
      <div className="relative h-48 w-full shrink-0 sm:h-auto sm:w-56">
        <Image
          src={hotel.image}
          alt={hotel.name}
          fill
          sizes="(min-width: 640px) 224px, 100vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-base font-semibold text-brand-950">
              {hotel.name}
            </h3>
            <span className="flex shrink-0 items-center gap-1 rounded-md bg-accent-50 px-2 py-1 text-xs font-semibold text-accent-700">
              <Star className="h-3.5 w-3.5 fill-accent-500 text-accent-500" />
              {hotel.rating}
            </span>
          </div>
          <p className="mt-1 text-xs text-brand-500">
            {hotel.reviews.toLocaleString()} reviews · {hotel.destination}
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {hotel.amenities.slice(0, 4).map((a) => (
              <span
                key={a}
                className="rounded-full bg-brand-50 px-2.5 py-1 text-xs text-brand-700"
              >
                {a}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-4 flex items-end justify-between">
          <div>
            <p className="text-lg font-bold text-brand-950">
              {formatCurrency(hotel.pricePerNight, hotel.currency)}
              <span className="text-sm font-normal text-brand-500"> / night</span>
            </p>
          </div>
          <LinkButton
            href={checkoutHref({
              type: "Hotel",
              title: hotel.name,
              price: hotel.pricePerNight,
              currency: hotel.currency,
              travelDate,
            })}
            size="sm"
          >
            Select
          </LinkButton>
        </div>
      </div>
    </div>
  );
}
