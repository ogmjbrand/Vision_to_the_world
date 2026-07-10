import type { Metadata } from "next";
import { Users, Building2, GraduationCap, Plane as PlaneIcon, Landmark, Briefcase } from "lucide-react";
import Container from "@/components/ui/container";
import SectionHeading from "@/components/ui/section-heading";
import MissionVision from "@/components/home/mission-vision";
import CTA from "@/components/home/cta";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Vision To The World's mission, vision, and commitment to a secure, transparent, and seamless travel experience.",
};

const audiences = [
  { icon: Users, label: "Individual travelers" },
  { icon: Building2, label: "Families" },
  { icon: GraduationCap, label: "Students" },
  { icon: Briefcase, label: "Corporate organizations" },
  { icon: PlaneIcon, label: "Tourists" },
  { icon: Landmark, label: "Religious pilgrims" },
];

export default function AboutPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-brand-950 to-brand-800 py-16 sm:py-20">
        <Container>
          <div className="max-w-2xl">
            <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-accent-200 ring-1 ring-white/20">
              About Vision To The World
            </span>
            <h1 className="mt-5 text-3xl font-bold text-white sm:text-4xl">
              A complete digital travel ecosystem
            </h1>
            <p className="mt-4 text-brand-100">
              Vision To The World is a next-generation self-service travel
              technology platform that empowers travelers to independently
              search, compare, book, and manage every aspect of their journey
              through one seamless digital experience. Built with speed,
              security, and convenience at its core, the platform eliminates
              the need for traditional travel agents by giving users complete
              control over their travel plans anytime, anywhere.
            </p>
          </div>
        </Container>
      </section>

      <MissionVision />

      <section className="bg-brand-50 py-16">
        <Container>
          <SectionHeading
            eyebrow="Who we serve"
            title="Built for every kind of traveler"
            description="Whether traveling for business, leisure, education, family visits, religious pilgrimages, or adventure."
          />
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {audiences.map((a) => (
              <div
                key={a.label}
                className="flex flex-col items-center gap-2 rounded-xl border border-brand-100 bg-white p-4 text-center shadow-sm"
              >
                <a.icon className="h-6 w-6 text-brand-600" />
                <span className="text-xs font-medium text-brand-800">
                  {a.label}
                </span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container className="max-w-3xl">
          <SectionHeading title="Our Commitment" />
          <p className="mt-4 text-brand-700">
            Vision To The World is committed to delivering a secure,
            transparent, and seamless travel experience by combining advanced
            technology with trusted travel partners. Our goal is to simplify
            every stage of the travel journey, giving users the freedom to
            plan, book, and manage their trips with confidence while
            providing expert assistance whenever it is needed.
          </p>
          <p className="mt-4 text-brand-700">
            Vision To The World is more than a booking platform — it is a
            complete digital travel ecosystem designed to connect people with
            destinations across the globe through innovation, reliability,
            and convenience.
          </p>
        </Container>
      </section>

      <CTA />
    </>
  );
}
