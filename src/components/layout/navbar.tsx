"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import Logo from "@/components/layout/logo";
import { services } from "@/lib/data/services";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/components/i18n/language-provider";
import LanguageSwitcher from "@/components/i18n/language-switcher";
import { getServiceCopy } from "@/lib/i18n/types";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const { t } = useLanguage();

  const navLinks = [
    { href: "/packages", label: t.nav.packages },
    { href: "/visa-assistance", label: t.nav.visa },
    { href: "/travel-insurance", label: t.nav.insurance },
    { href: "/about", label: t.nav.about },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-brand-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex">
          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
            onKeyDown={(e) => {
              if (e.key === "Escape") setServicesOpen(false);
            }}
          >
            <button
              type="button"
              className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-brand-900 hover:bg-brand-50"
              aria-expanded={servicesOpen}
              aria-controls="services-menu"
              onClick={() => setServicesOpen((v) => !v)}
            >
              {t.nav.services}
              <ChevronDown className="h-4 w-4" />
            </button>
            {servicesOpen && (
              <div
                id="services-menu"
                className="absolute left-0 top-full w-[560px] rounded-xl border border-brand-100 bg-white p-3 shadow-xl"
              >
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
                          {getServiceCopy(t, service.slug).name}
                        </span>
                        <span className="block text-xs text-brand-600">
                          {getServiceCopy(t, service.slug).tagline}
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
          <LanguageSwitcher />
          <Link
            href="/auth/login"
            className="rounded-md px-3 py-2 text-sm font-semibold text-brand-900 hover:bg-brand-50"
          >
            {t.nav.login}
          </Link>
          <Link
            href="/auth/sign-up"
            className="rounded-md bg-accent-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-accent-600"
          >
            {t.nav.signup}
          </Link>
        </div>

        <button
          type="button"
          className="rounded-md p-2 text-brand-900 lg:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <div
        id="mobile-menu"
        className={cn(
          "lg:hidden overflow-hidden border-t border-brand-100 transition-[max-height]",
          mobileOpen ? "max-h-[720px]" : "max-h-0",
        )}
      >
        <div className="space-y-1 px-4 py-4">
          <p className="px-2 pb-1 text-xs font-semibold uppercase tracking-wide text-brand-400">
            {t.nav.services}
          </p>
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/${service.slug}`}
              className="flex items-center gap-2 rounded-md px-2 py-2 text-sm font-medium text-brand-900 hover:bg-brand-50"
              onClick={() => setMobileOpen(false)}
            >
              <service.icon className="h-4 w-4 text-brand-600" />
              {getServiceCopy(t, service.slug).name}
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
          <div className="px-2 pt-1">
            <LanguageSwitcher layout="inline" />
          </div>
          <div className="flex gap-2 px-2 pt-2">
            <Link
              href="/auth/login"
              className="flex-1 rounded-md border border-brand-200 px-3 py-2 text-center text-sm font-semibold text-brand-900"
              onClick={() => setMobileOpen(false)}
            >
              {t.nav.login}
            </Link>
            <Link
              href="/auth/sign-up"
              className="flex-1 rounded-md bg-accent-500 px-3 py-2 text-center text-sm font-semibold text-white"
              onClick={() => setMobileOpen(false)}
            >
              {t.nav.signup}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
