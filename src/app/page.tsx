import type { Metadata } from "next";
import Hero from "@/components/home/hero";
import ServicesGrid from "@/components/home/services-grid";
import FeaturesBentoGrid from "@/components/home/features-bento-grid";
import DestinationsGallery from "@/components/home/destinations-gallery";
import HowItWorks from "@/components/home/how-it-works";
import Testimonials from "@/components/home/testimonials";
import MissionVision from "@/components/home/mission-vision";
import PaymentPartners from "@/components/home/payment-partners";
import CTA from "@/components/home/cta";
import { canonicalFor } from "@/lib/seo";

export const metadata: Metadata = {
  ...canonicalFor("/"),
  title: "Vision To The World | Your Journey. Your Choice. Your World.",
  description:
    "Search, compare, book, and manage flights, hotels, car rentals, airport transfers, travel packages, visa assistance, and travel insurance — all in one self-service platform.",
};

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesGrid />
      <FeaturesBentoGrid />
      <DestinationsGallery />
      <HowItWorks />
      <Testimonials />
      <MissionVision />
      <PaymentPartners />
      <CTA />
    </>
  );
}
