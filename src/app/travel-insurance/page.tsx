import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import ServiceHero from "@/components/services/service-hero";
import Container from "@/components/ui/container";
import SectionHeading from "@/components/ui/section-heading";
import { LinkButton } from "@/components/ui/button";
import { getService } from "@/lib/data/services";
import { checkoutHref } from "@/lib/checkout";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Travel Insurance",
  description:
    "Optional travel insurance with medical coverage, trip cancellation protection, and 24/7 emergency support.",
};

const service = getService("travel-insurance")!;

const plans = [
  {
    name: "Essential",
    price: 19,
    period: "per trip",
    highlighted: false,
    features: [
      "Emergency medical coverage up to $50,000",
      "Trip cancellation protection",
      "24/7 travel assistance hotline",
      "Lost baggage reimbursement",
    ],
  },
  {
    name: "Complete",
    price: 39,
    period: "per trip",
    highlighted: true,
    features: [
      "Emergency medical coverage up to $150,000",
      "Trip cancellation & interruption protection",
      "24/7 travel assistance hotline",
      "Lost baggage & delay reimbursement",
      "Emergency medical evacuation",
    ],
  },
  {
    name: "Annual Multi-Trip",
    price: 149,
    period: "per year",
    highlighted: false,
    features: [
      "Unlimited trips up to 45 days each",
      "Emergency medical coverage up to $250,000",
      "Trip cancellation & interruption protection",
      "24/7 travel assistance hotline",
      "Emergency medical evacuation",
    ],
  },
];

export default function TravelInsurancePage() {
  return (
    <>
      <ServiceHero slug={service.slug} />
      <Container className="py-16">
        <SectionHeading
          eyebrow="Optional coverage"
          title="Choose the protection that fits your trip"
          description="Add insurance during checkout on any booking, or purchase standalone coverage for an upcoming trip."
          align="center"
          className="mx-auto"
        />

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                "flex flex-col rounded-2xl border p-7 shadow-sm",
                plan.highlighted
                  ? "border-accent-400 bg-brand-950 text-white ring-2 ring-accent-400"
                  : "border-brand-100 bg-white",
              )}
            >
              {plan.highlighted && (
                <span className="mb-3 inline-flex w-fit items-center rounded-full bg-accent-500 px-3 py-1 text-xs font-semibold text-white">
                  Most popular
                </span>
              )}
              <h3
                className={cn(
                  "text-lg font-semibold",
                  plan.highlighted ? "text-white" : "text-brand-950",
                )}
              >
                {plan.name}
              </h3>
              <p className="mt-2">
                <span
                  className={cn(
                    "text-3xl font-bold",
                    plan.highlighted ? "text-white" : "text-brand-950",
                  )}
                >
                  ${plan.price}
                </span>
                <span
                  className={cn(
                    "ml-1 text-sm",
                    plan.highlighted ? "text-brand-200" : "text-brand-500",
                  )}
                >
                  {plan.period}
                </span>
              </p>
              <ul className="mt-6 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm">
                    <CheckCircle2
                      className={cn(
                        "mt-0.5 h-4 w-4 shrink-0",
                        plan.highlighted ? "text-accent-400" : "text-brand-600",
                      )}
                    />
                    <span
                      className={plan.highlighted ? "text-brand-100" : "text-brand-700"}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
              <LinkButton
                href={checkoutHref({
                  type: "Travel Insurance",
                  title: `${plan.name} plan (${plan.period})`,
                  price: plan.price,
                  currency: "USD",
                })}
                className="mt-6"
                variant={plan.highlighted ? "primary" : "outline"}
              >
                Get {plan.name}
              </LinkButton>
            </div>
          ))}
        </div>
      </Container>
    </>
  );
}
