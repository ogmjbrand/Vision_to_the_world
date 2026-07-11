import Container from "@/components/ui/container";
import SectionHeading from "@/components/ui/section-heading";
import {
  UserPlus,
  Search,
  CreditCard,
  FileCheck,
  type LucideIcon,
} from "lucide-react";

const steps: { title: string; description: string; icon: LucideIcon }[] = [
  {
    title: "Create an account",
    description: "Sign up in seconds and save your traveler details for faster checkout every time.",
    icon: UserPlus,
  },
  {
    title: "Search & compare",
    description: "Browse flights, hotels, cars, and packages with real-time pricing and availability.",
    icon: Search,
  },
  {
    title: "Book & pay securely",
    description: "Choose your options and pay with Stripe, PayPal, or Cash App.",
    icon: CreditCard,
  },
  {
    title: "Manage with confidence",
    description: "Get instant confirmations, download invoices, and track or manage bookings anytime.",
    icon: FileCheck,
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-brand-50 py-20">
      <Container>
        <SectionHeading
          eyebrow="Self-Service Experience"
          title="Complete control, from search to trip"
          description="A fully digital self-service model — with professional travel consultants available whenever you want a human touch."
        />

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <div key={step.title} className="relative">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-900 text-white">
                <step.icon className="h-5 w-5" />
              </div>
              <span className="absolute right-0 top-0 text-4xl font-bold text-brand-200">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 text-base font-semibold text-brand-950">
                {step.title}
              </h3>
              <p className="mt-1.5 text-sm text-brand-600">{step.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
