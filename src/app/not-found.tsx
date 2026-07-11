import { Compass } from "lucide-react";
import Container from "@/components/ui/container";
import { LinkButton } from "@/components/ui/button";
import { services } from "@/lib/data/services";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center bg-brand-950 py-20">
      <Container className="text-center">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-accent-300 ring-1 ring-white/20">
          <Compass className="h-8 w-8" />
        </span>
        <p className="mt-6 text-sm font-semibold uppercase tracking-wide text-accent-400">
          404 error
        </p>
        <h1 className="mt-2 text-3xl font-bold text-white sm:text-4xl">
          Looks like this destination doesn&apos;t exist
        </h1>
        <p className="mx-auto mt-4 max-w-md text-brand-200">
          The page you&apos;re looking for may have moved or never existed.
          Let&apos;s get you back on course.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <LinkButton href="/" size="lg">
            Back to home
          </LinkButton>
          <LinkButton
            href="/contact"
            size="lg"
            variant="outline"
            className="border-white/30 text-white hover:bg-white/10"
          >
            Contact support
          </LinkButton>
        </div>

        <div className="mx-auto mt-12 flex max-w-2xl flex-wrap items-center justify-center gap-2">
          {services.map((service) => (
            <a
              key={service.slug}
              href={`/${service.slug}`}
              className="rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-brand-200 hover:bg-white/10 hover:text-white"
            >
              {service.name}
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}
