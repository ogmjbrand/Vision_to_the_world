export type Testimonial = {
  name: string;
  location: string;
  service: string;
  quote: string;
  rating: number;
};

export const testimonials: Testimonial[] = [
  {
    name: "Amara Okafor",
    location: "Buffalo, NY",
    service: "Flight Booking",
    quote:
      "Booked a round-trip to Lagos in under ten minutes and had my e-ticket instantly. No back-and-forth with an agent, no hidden fees at checkout — exactly what I needed.",
    rating: 5,
  },
  {
    name: "Daniel Reyes",
    location: "Cairo, Egypt",
    service: "Travel Package",
    quote:
      "Our family package to Egypt was seamless from search to landing. Every hotel and transfer was confirmed before we even left home, and support answered every question fast.",
    rating: 5,
  },
  {
    name: "Priya Nair",
    location: "Toronto, Canada",
    service: "Visa Assistance",
    quote:
      "The visa assistance team helped me get my documentation right the first time. Clear checklist, real answers, and none of the guesswork I expected.",
    rating: 5,
  },
  {
    name: "Marcus Bell",
    location: "Houston, TX",
    service: "Car Rental",
    quote:
      "Compared rental companies side by side and booked in minutes. The dashboard kept every confirmation in one place for our whole road trip.",
    rating: 4,
  },
  {
    name: "Fatima Hassan",
    location: "Alexandria, Egypt",
    service: "Hotel Booking",
    quote:
      "Real-time pricing meant no surprises at check-in. Vision To The World found us a better room than what I'd seen on other sites, for less.",
    rating: 5,
  },
  {
    name: "James Whitfield",
    location: "New York, NY",
    service: "Travel Insurance",
    quote:
      "Added travel insurance at checkout in one click. When my flight got delayed, the claims process was straightforward — no chasing anyone down.",
    rating: 5,
  },
];
