import type { Metadata } from "next";
import { BusFront, Users, BadgeCheck } from "lucide-react";
import ServiceHero from "@/components/services/service-hero";
import Container from "@/components/ui/container";
import SearchWidget from "@/components/search/search-widget";
import { LinkButton } from "@/components/ui/button";
import { getService } from "@/lib/data/services";
import { generateTransferResults } from "@/lib/data/mock-results";
import { checkoutHref } from "@/lib/checkout-sign";
import { formatCurrency } from "@/lib/utils";
import { canonicalFor } from "@/lib/seo";

export const metadata: Metadata = {
  ...canonicalFor("/airport-transfers"),
  title: "Airport Transfers",
  description:
    "Book reliable airport pickup and drop-off services and schedule transfers in advance.",
};

const service = getService("airport-transfers")!;

export default async function AirportTransfersPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const airport = typeof params.airport === "string" ? params.airport : undefined;
  const dropoff = typeof params.dropoff === "string" ? params.dropoff : undefined;
  const transferDate = typeof params.date === "string" ? params.date : undefined;

  const hasSearch = !!(airport && dropoff);
  const results = hasSearch ? generateTransferResults(airport) : [];

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
              {results.length} transfer options from {airport.toUpperCase()}{" "}
              to {dropoff}
            </h2>
            <div className="grid gap-4">
              {results.map((transfer) => (
                <div
                  key={transfer.id}
                  className="flex flex-col gap-4 rounded-2xl border border-brand-100 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-center gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                      <BusFront className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-brand-950">
                        {transfer.provider} · {transfer.vehicle}
                      </p>
                      <div className="mt-1 flex items-center gap-4 text-xs text-brand-600">
                        <span className="flex items-center gap-1">
                          <Users className="h-3.5 w-3.5" /> Up to{" "}
                          {transfer.capacity} passengers
                        </span>
                        {transfer.meetAndGreet && (
                          <span className="flex items-center gap-1 text-brand-700">
                            <BadgeCheck className="h-3.5 w-3.5 text-accent-500" />
                            Meet & greet included
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                    <p className="text-xl font-bold text-brand-950">
                      {formatCurrency(transfer.price, transfer.currency)}
                    </p>
                    <LinkButton
                      href={checkoutHref({
                        type: "Airport Transfer",
                        title: `${transfer.provider} · ${transfer.vehicle} (${airport.toUpperCase()} → ${dropoff})`,
                        price: transfer.price,
                        currency: transfer.currency,
                        travelDate: transferDate,
                      })}
                      size="sm"
                    >
                      Book transfer
                    </LinkButton>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-6 text-center text-xs text-brand-400">
              Results shown are illustrative pending live supplier
              integration credentials.
            </p>
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-brand-200 bg-brand-50/60 p-10 text-center">
            <p className="text-brand-700">
              Enter your airport and drop-off address above to see available
              transfer options.
            </p>
          </div>
        )}
      </Container>
    </>
  );
}
