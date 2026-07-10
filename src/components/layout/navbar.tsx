"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import Logo from "@/components/layout/logo";
import { services } from "@/lib/data/services";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/packages", label: "Packages" },
  { href: "/visa-assistance", label: "Visa & Assistance" },
  { href: "/travel-insurance", label: "Insurance" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-brand-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex">
          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button
              className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-brand-900 hover:bg-brand-50"
              aria-expanded={servicesOpen}
            >
              Services
              <ChevronDown className="h-4 w-4" />
            </button>
            {servicesOpen && (
              <div className="absolute left-0 top-full w-[560px] rounded-xl border border-brand-100 bg-white p-3 shadow-xl">
                <div className="grid grid-cols-2 gap-1">
                  {services.map((service) => (
                    <Link
                      key={service.slug}
                      href={`/${service.slug}`}
                      className="flex items-start gap-3 rounded-lg p-3 hover:bg-brand-50"
                    >
                      <service.icon className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
                      <span>
                        <span className="block text-sm font-semibold text-brand-950">
                          {service.name}
                        </span>
                        <span className="block text-xs text-brand-600">
                          {service.tagline}
                        </span>
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-brand-900 hover:bg-brand-50"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Link
            href="/auth/login"
            className="rounded-md px-3 py-2 text-sm font-semibold text-brand-900 hover:bg-brand-50"
          >
            Log in
          </Link>
          <Link
            href="/auth/sign-up"
            className="rounded-md bg-accent-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-accent-600"
          >
            Sign up
          </Link>
        </div>

        <button
          className="rounded-md p-2 text-brand-900 lg:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <div
        className={cn(
          "lg:hidden overflow-hidden border-t border-brand-100 transition-[max-height]",
          mobileOpen ? "max-h-[720px]" : "max-h-0",
        )}
      >
        <div className="space-y-1 px-4 py-4">
          <p className="px-2 pb-1 text-xs font-semibold uppercase tracking-wide text-brand-400">
            Services
          </p>
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/${service.slug}`}
              className="flex items-center gap-2 rounded-md px-2 py-2 text-sm font-medium text-brand-900 hover:bg-brand-50"
              onClick={() => setMobileOpen(false)}
            >
              <service.icon className="h-4 w-4 text-brand-600" />
              {service.name}
            </Link>
          ))}
          <div className="my-2 border-t border-brand-100" />
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block rounded-md px-2 py-2 text-sm font-medium text-brand-900 hover:bg-brand-50"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="my-2 border-t border-brand-100" />
          <div className="flex gap-2 px-2 pt-1">
            <Link
              href="/auth/login"
              className="flex-1 rounded-md border border-brand-200 px-3 py-2 text-center text-sm font-semibold text-brand-900"
              onClick={() => setMobileOpen(false)}
            >
              Log in
            </Link>
            <Link
              href="/auth/sign-up"
              className="flex-1 rounded-md bg-accent-500 px-3 py-2 text-center text-sm font-semibold text-white"
              onClick={() => setMobileOpen(false)}
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
