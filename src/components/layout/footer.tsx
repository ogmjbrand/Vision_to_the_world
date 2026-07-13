"use client";

import Link from "next/link";
import { Mail, MapPin, Phone, MessageCircle } from "lucide-react";
import Logo from "@/components/layout/logo";
import { services } from "@/lib/data/services";
import { siteConfig, fullAddress } from "@/lib/data/site-config";
import { useLanguage } from "@/components/i18n/language-provider";
import { getServiceCopy } from "@/lib/i18n/types";
import LanguageSwitcher from "@/components/i18n/language-switcher";
import { socialLinks } from "@/lib/data/social-links";
import { paymentMethods } from "@/lib/data/payment-methods";
import { cn } from "@/lib/utils";

export default function Footer() {
  const { t } = useLanguage();

  const company = [
    { href: "/about", label: t.footer.company.about },
    { href: "/about#mission", label: t.footer.company.mission },
    { href: "/dashboard", label: t.footer.company.account },
    { href: "/admin", label: t.footer.company.admin },
  ];

  const support = [
    { href: "/faq", label: t.footer.support.faq },
    { href: "/visa-assistance", label: t.footer.support.visa },
    { href: "/travel-insurance", label: t.footer.support.insurance },
    { href: "/contact", label: t.footer.support.contact },
    { href: "/contact#consultant", label: t.footer.support.consultant },
  ];

  const legal = [
    { href: "/privacy-policy", label: t.footer.legal.privacy },
    { href: "/terms-conditions", label: t.footer.legal.terms },
    { href: "/refund-policy", label: t.footer.legal.refund },
  ];

  return (
    <footer className="border-t border-brand-900 bg-brand-950 text-brand-100">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <Logo dark />
            <p className="mt-4 max-w-xs text-sm text-brand-300">{t.footer.blurb}</p>
            <ul className="mt-4 space-y-2 text-sm text-brand-300">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-accent-400" />
                <a href={`mailto:${siteConfig.email}`} className="hover:text-white">
                  {siteConfig.email}
                </a>
              </li>
              {siteConfig.phones.map((phone) => (
                <li key={phone} className="flex items-center gap-2">
                  <Phone className="h-4 w-4 shrink-0 text-accent-400" />
                  <a
                    href={`tel:${phone.replace(/[^+\d]/g, "")}`}
                    className="hover:text-white"
                  >
                    {phone}
                  </a>
                </li>
              ))}
              <li className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4 shrink-0 text-accent-400" />
                <a
                  href={siteConfig.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  Chat on WhatsApp
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 shrink-0 text-accent-400" />
                {fullAddress}
              </li>
            </ul>

            <div className="mt-5 flex items-center gap-3">
              {socialLinks.map(({ key, label, Icon, url }) =>
                url ? (
                  <a
                    key={key}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-900 text-brand-200 transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent-600 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    <Icon aria-hidden size={24} />
                  </a>
                ) : (
                  <span
                    key={key}
                    title={`${label} link coming soon`}
                    aria-label={`${label} link coming soon`}
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-900/50 text-brand-600"
                  >
                    <Icon aria-hidden size={24} />
                  </span>
                ),
              )}
            </div>

            <div className="mt-5">
              <LanguageSwitcher variant="dark" className="[&>button]:pl-0" />
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
              {t.footer.servicesHeading}
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/${service.slug}`}
                    className="text-brand-300 hover:text-white"
                  >
                    {getServiceCopy(t, service.slug).name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
              {t.footer.companyHeading}
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
              {t.footer.supportHeading}
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
              {t.footer.paymentsHeading}
            </h3>
            <p className="mt-4 text-sm text-brand-300">{t.footer.paymentsBlurb}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {paymentMethods.map(({ id, label, Icon, dark }) => (
                <li key={id} title={label}>
                  <div
                    className={cn(
                      "flex h-9 w-12 items-center justify-center rounded-md border",
                      dark
                        ? "border-white/20 bg-black"
                        : "border-brand-800 bg-brand-900",
                    )}
                  >
                    <Icon aria-hidden size={20} className="text-brand-100" />
                    <span className="sr-only">{label}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-brand-900 pt-6 text-sm text-brand-400 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {t.footer.copyright.replace("{year}", String(new Date().getFullYear()))}</p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {legal.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <p>{t.footer.taglineBottom}</p>
        </div>
      </div>
    </footer>
  );
}
