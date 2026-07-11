import type { ReactNode } from "react";
import Container from "@/components/ui/container";

export function LegalPage({
  title,
  updated,
  intro,
  children,
}: {
  title: string;
  updated: string;
  intro?: string;
  children: ReactNode;
}) {
  return (
    <>
      <section className="border-b border-brand-100 bg-brand-950 py-14">
        <Container>
          <h1 className="text-3xl font-bold text-white sm:text-4xl">{title}</h1>
          <p className="mt-3 text-sm text-brand-300">Last updated: {updated}</p>
          {intro && <p className="mt-4 max-w-2xl text-brand-100">{intro}</p>}
        </Container>
      </section>
      <section className="py-14">
        <Container className="max-w-3xl">
          <div className="space-y-10">{children}</div>
        </Container>
      </section>
    </>
  );
}

export function LegalSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div>
      <h2 className="text-xl font-bold text-brand-950">{title}</h2>
      <div className="mt-3 space-y-3 text-sm leading-relaxed text-brand-700">
        {children}
      </div>
    </div>
  );
}
