import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import Logo from "@/components/layout/logo";
import { services } from "@/lib/data/services";

const company = [
  { href: "/about", label: "About Us" },
  { href: "/about#mission", label: "Mission & Vision" },
  { href: "/dashboard", label: "My Account" },
  { href: "/admin", label: "Admin" },
];

const support = [
  { href: "/visa-assistance", label: "Visa & Travel Assistance" },
  { href: "/travel-insurance", label: "Travel Insurance" },
  { href: "/contact", label: "Contact Support" },
  { href: "/contact#consultant", label: "Talk to a Travel Consultant" },
];

const payments = ["Paystack", "Flutterwave", "Stripe", "PayPal"];

export default function Footer() {
  return (
    <footer className="border-t border-brand-900 bg-brand-950 text-brand-100">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <Logo dark />
            <p className="mt-4 max-w-xs text-sm text-brand-300">
              A next-generation self-service travel technology platform to
              search, compare, book, and manage every part of your journey.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-brand-300">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-accent-400" />
                support@visiontotheworld.com
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-accent-400" />
                +1 (800) 555-0199
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-accent-400" />
                Serving travelers worldwide
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
              Services
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/${service.slug}`}
                    className="text-brand-300 hover:text-white"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
              Company
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              {company.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-brand-300 hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h3 className="mt-6 text-sm font-semibold uppercase tracking-wide text-white">
              Support
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              {support.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-brand-300 hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
              Secure Payments
            </h3>
            <p className="mt-4 text-sm text-brand-300">
              Pay your way with trusted global and regional payment gateways.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {payments.map((p) => (
                <span
                  key={p}
                  className="rounded-md border border-brand-800 bg-brand-900 px-3 py-1.5 text-xs font-medium text-brand-100"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-brand-900 pt-6 text-sm text-brand-400 sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} Vision To The World. All rights
            reserved.
          </p>
          <p>Your Journey. Your Choice. Your World.</p>
        </div>
      </div>
    </footer>
  );
}
