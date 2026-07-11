import Image from "next/image";
import Container from "@/components/ui/container";
import SectionHeading from "@/components/ui/section-heading";
import { founders } from "@/lib/data/founders";

export default function Founders() {
  return (
    <section className="bg-brand-50 py-16">
      <Container>
        <SectionHeading
          eyebrow="Leadership"
          title="Meet the founders"
          description="The team behind Vision To The World's mission to make self-service travel simple and secure."
          align="center"
          className="mx-auto"
        />
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2">
          {founders.map((founder) => (
            <div
              key={founder.name}
              className="overflow-hidden rounded-2xl border border-brand-100 bg-white shadow-sm"
            >
              <div className="relative aspect-[4/5]">
                <Image
                  src={founder.photo}
                  alt={founder.name}
                  fill
                  sizes="(min-width: 640px) 320px, 90vw"
                  className="object-cover"
                />
              </div>
              <div className="p-5 text-center">
                <p className="text-lg font-bold text-brand-950">{founder.name}</p>
                <p className="text-sm font-medium text-accent-600">{founder.title}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
