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
  },
];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}
