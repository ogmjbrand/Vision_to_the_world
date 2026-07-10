export type TravelPackage = {
  slug: string;
  name: string;
  category: string;
  description: string;
  duration: string;
  price: number;
  currency: string;
  highlights: string[];
  image: string;
};

export const travelPackages: TravelPackage[] = [
  {
    slug: "santorini-vacation",
    name: "Santorini Getaway",
    category: "Vacation",
    description: "Relax on the caldera with sunset views, wine tastings, and boat excursions.",
    duration: "7 days / 6 nights",
    price: 1899,
    currency: "USD",
    highlights: ["Cliffside hotel", "Catamaran cruise", "Wine tasting tour"],
    image: "https://picsum.photos/seed/vttw-pkg-santorini/640/420",
  },
  {
    slug: "maldives-honeymoon",
    name: "Maldives Honeymoon",
    category: "Honeymoon",
    description: "Overwater villas, private dinners, and spa days for two.",
    duration: "6 days / 5 nights",
    price: 3299,
    currency: "USD",
    highlights: ["Overwater villa", "Couples spa", "Private beach dinner"],
    image: "https://picsum.photos/seed/vttw-pkg-maldives/640/420",
  },
  {
    slug: "orlando-family",
    name: "Orlando Family Fun",
    category: "Family",
    description: "Theme parks, kid-friendly resorts, and flexible daily itineraries.",
    duration: "5 days / 4 nights",
    price: 1499,
    currency: "USD",
    highlights: ["Theme park passes", "Family suite", "Airport transfers included"],
    image: "https://picsum.photos/seed/vttw-pkg-orlando/640/420",
  },
  {
    slug: "cape-town-group",
    name: "Cape Town Group Adventure",
    category: "Group Travel",
    description: "Safari excursions, coastal drives, and shared accommodation for groups.",
    duration: "8 days / 7 nights",
    price: 2199,
    currency: "USD",
    highlights: ["Game drive safari", "Table Mountain tour", "Group discounts"],
    image: "https://picsum.photos/seed/vttw-pkg-capetown/640/420",
  },
  {
    slug: "london-education",
    name: "London Educational Tour",
    category: "Educational",
    description: "Guided museum visits, university campus tours, and cultural workshops.",
    duration: "6 days / 5 nights",
    price: 1699,
    currency: "USD",
    highlights: ["Museum passes", "Campus tour", "Student group rates"],
    image: "https://picsum.photos/seed/vttw-pkg-london/640/420",
  },
  {
    slug: "dubai-corporate",
    name: "Dubai Corporate Retreat",
    category: "Corporate",
    description: "Conference-ready hotels, business lounges, and team-building excursions.",
    duration: "4 days / 3 nights",
    price: 2499,
    currency: "USD",
    highlights: ["Meeting rooms included", "Desert safari team event", "Business-class lounge access"],
    image: "https://picsum.photos/seed/vttw-pkg-dubai/640/420",
  },
];
