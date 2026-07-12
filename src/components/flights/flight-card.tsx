import { Plane, ArrowRight } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import type { FlightResult } from "@/lib/data/mock-results";
import { checkoutHref } from "@/lib/checkout";
import { LinkButton } from "@/components/ui/button";

export default function FlightCard({
  flight,
  travelDate,
}: {
  flight: FlightResult;
  travelDate?: string;
}) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-brand-100 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
          <Plane className="h-5 w-5" />
        </span>
        <div>
          <p className="text-sm font-semibold text-brand-950">
            {flight.airline} · {flight.flightNumber}
          </p>
          <div className="mt-1 flex items-center gap-2 text-sm text-brand-600">
            <span className="font-medium text-brand-900">{flight.departTime}</span>
            <span>{flight.origin}</span>
            <ArrowRight className="h-3.5 w-3.5" />
            <span>{flight.destination}</span>
            <span className="font-medium text-brand-900">{flight.arriveTime}</span>
          </div>
          <p className="mt-1 text-xs text-brand-500">
            {flight.duration} ·{" "}
            {flight.stops === 0 ? "Nonstop" : `${flight.stops} stop`} ·{" "}
            {flight.cabin}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
        <p className="text-xl font-bold text-brand-950">
          {formatCurrency(flight.price, flight.currency)}
        </p>
        <LinkButton
          href={checkoutHref({
            type: "Flight",
            title: `${flight.airline} ${flight.flightNumber} · ${flight.origin} → ${flight.destination}`,
            price: flight.price,
            currency: flight.currency,
            travelDate,
          })}
          size="sm"
        >
          Select
        </LinkButton>
      </div>
    </div>
  );
}
