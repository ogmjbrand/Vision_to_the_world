import Container from "@/components/ui/container";
import { Target, Eye } from "lucide-react";

export default function MissionVision() {
  return (
    <section id="mission" className="py-20">
      <Container>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-brand-100 bg-white p-8 shadow-sm">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-50 text-accent-600">
              <Target className="h-5 w-5" />
            </span>
            <h3 className="mt-4 text-xl font-bold text-brand-950">Our Mission</h3>
            <p className="mt-2 text-brand-700">
              To make travel simple, accessible, and affordable by providing
              an intelligent, self-service platform that connects travelers
              with the world&apos;s best travel services.
            </p>
          </div>
          <div className="rounded-2xl border border-brand-100 bg-white p-8 shadow-sm">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
              <Eye className="h-5 w-5" />
            </span>
            <h3 className="mt-4 text-xl font-bold text-brand-950">Our Vision</h3>
            <p className="mt-2 text-brand-700">
              To become one of the world&apos;s leading digital travel
              platforms, enabling millions of people to explore the world
              with confidence through innovative technology and exceptional
              customer experiences.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
