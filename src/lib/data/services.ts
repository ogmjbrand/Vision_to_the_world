import {
  Plane,
  Hotel,
  Car,
  BusFront,
  Package,
  FileCheck2,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

export type Service = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  features: string[];
  /** Looping background video shown on the homepage services card, if set. */
  cardVideo?: string;
  cardVideoPoster?: string;
  /** Looping background video shown on the service's own hero banner, if set. */
  heroVideo?: string;
  heroVideoPoster?: string;
};

export const services: Service[] = [
  {
    slug: "flights",
    name: "Flight Booking",
    tagline: "Fly anywhere, on your terms",
    description:
      "Search and compare flights from multiple airlines with real-time pricing and instant e-tickets.",
    icon: Plane,
    features: [
      "Search and compare flights from multiple airlines",
      "One-way, round-trip, and multi-city bookings",
      "Flexible travel dates",
      "Real-time pricing and availability",
      "Secure online booking",
      "Instant e-ticket delivery",
    ],
    cardVideo: "/media/hero/flight-frankfurt-starry-takeoff.mp4",
    cardVideoPoster: "/media/hero/flight-frankfurt-starry-takeoff-poster.jpg",
    heroVideo: "/media/hero/flight-frankfurt-starry-takeoff.mp4",
    heroVideoPoster: "/media/hero/flight-frankfurt-starry-takeoff-poster.jpg",
  },
  {
    slug: "hotels",
    name: "Hotel Booking",
    tagline: "Stay wherever the journey takes you",
    description:
      "Discover and book hotels worldwide with real-time availability and instant confirmation.",
    icon: Hotel,
    features: [
      "Discover hotels worldwide",
      "Compare room options and prices",
      "View amenities, photos, and guest reviews",
      "Book instantly with real-time availability",
      "Receive immediate booking confirmation",
    ],
    cardVideo: "/media/services/hotel-sunset-suite.mp4",
    cardVideoPoster: "/media/services/hotel-sunset-suite-poster.jpg",
    heroVideo: "/media/services/hotel-suite-night.mp4",
    heroVideoPoster: "/media/services/hotel-suite-night-poster.jpg",
  },
  {
    slug: "car-rental",
    name: "Car Rental",
    tagline: "Drive your own itinerary",
    description:
      "Search rental vehicles in destinations worldwide and book securely online.",
    icon: Car,
    features: [
      "Search rental vehicles in multiple destinations",
      "Compare rental companies and vehicle categories",
      "Flexible pickup and return options",
      "Secure online reservations",
    ],
    cardVideo: "/media/services/car-rental-showcase.mp4",
    cardVideoPoster: "/media/services/car-rental-showcase-poster.jpg",
    heroVideo: "/media/services/car-rental-showcase.mp4",
    heroVideoPoster: "/media/services/car-rental-showcase-poster.jpg",
  },
  {
    slug: "airport-transfers",
    name: "Airport Transfers",
    tagline: "A smooth start and finish",
    description:
      "Book reliable airport pickup and drop-off services, scheduled in advance.",
    icon: BusFront,
    features: [
      "Book reliable airport pickup and drop-off services",
      "Schedule transfers in advance",
      "Track reservation details",
    ],
    cardVideo: "/media/services/airport-transfer-pickup.mp4",
    cardVideoPoster: "/media/services/airport-transfer-pickup-poster.jpg",
    heroVideo: "/media/services/airport-transfer-pickup.mp4",
    heroVideoPoster: "/media/services/airport-transfer-pickup-poster.jpg",
  },
  {
    slug: "packages",
    name: "Travel Packages",
    tagline: "Curated journeys, ready to book",
    description:
      "Vacation, honeymoon, family, group, educational, and corporate travel packages.",
    icon: Package,
    features: [
      "Vacation packages",
      "Honeymoon packages",
      "Family holidays",
      "Group travel",
      "Educational tours",
      "Corporate travel packages",
    ],
    cardVideo: "/media/services/packages-luxury-resort.mp4",
    cardVideoPoster: "/media/services/packages-luxury-resort-poster.jpg",
    heroVideo: "/media/services/packages-luxury-resort.mp4",
    heroVideoPoster: "/media/services/packages-luxury-resort-poster.jpg",
  },
  {
    slug: "visa-assistance",
    name: "Visa & Travel Assistance",
    tagline: "Clarity before you go",
    description:
      "Visa information, documentation support, and destination entry requirements.",
    icon: FileCheck2,
    features: [
      "Visa information and guidance",
      "Travel documentation support",
      "Destination requirements",
      "Entry regulations",
    ],
    cardVideo: "/media/services/visa-zanzibar-stay.mp4",
    cardVideoPoster: "/media/services/visa-zanzibar-stay-poster.jpg",
    heroVideo: "/media/services/visa-zanzibar-stay.mp4",
    heroVideoPoster: "/media/services/visa-zanzibar-stay-poster.jpg",
  },
  {
    slug: "travel-insurance",
    name: "Travel Insurance",
    tagline: "Travel with confidence",
    description:
      "Optional insurance during booking with medical coverage and cancellation protection.",
    icon: ShieldCheck,
    features: [
      "Optional insurance during booking",
      "Medical coverage options",
      "Trip cancellation protection",
      "Travel emergency support",
    ],
    cardVideo: "/media/services/insurance-bora-bora.mp4",
    cardVideoPoster: "/media/services/insurance-bora-bora-poster.jpg",
    heroVideo: "/media/services/insurance-bora-bora.mp4",
    heroVideoPoster: "/media/services/insurance-bora-bora-poster.jpg",
  },
];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}
