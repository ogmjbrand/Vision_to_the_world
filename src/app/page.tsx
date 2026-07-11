import Hero from "@/components/home/hero";
import ServicesGrid from "@/components/home/services-grid";
import DestinationsGallery from "@/components/home/destinations-gallery";
import HowItWorks from "@/components/home/how-it-works";
import Testimonials from "@/components/home/testimonials";
import MissionVision from "@/components/home/mission-vision";
import PaymentPartners from "@/components/home/payment-partners";
import CTA from "@/components/home/cta";

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesGrid />
      <DestinationsGallery />
      <HowItWorks />
      <Testimonials />
      <MissionVision />
      <PaymentPartners />
      <CTA />
    </>
  );
}
