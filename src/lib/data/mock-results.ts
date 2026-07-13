export type FlightResult = {
  id: string;
  airline: string;
  flightNumber: string;
  origin: string;
  destination: string;
  departTime: string;
  arriveTime: string;
  duration: string;
  stops: number;
  cabin: string;
  price: number;
  currency: string;
};

export type HotelResult = {
  id: string;
  name: string;
  destination: string;
  rating: number;
  reviews: number;
  pricePerNight: number;
  currency: string;
  amenities: string[];
  image: string;
};

/**
 * Self-hosted stand-ins for hotel photos, cycled by result index. Previously
 * this pulled from https://picsum.photos, a third-party random-image CDN —
 * fine when reachable, but it's an external dependency with no upside for
 * placeholder content Vision To The World fully controls: any ad blocker,
 * corporate firewall, or CDN hiccup on the visitor's end breaks the image
 * with nothing the app can do about it. These ship with the app instead.
 */
export const HOTEL_IMAGES = [
  "/media/gallery/tropical-garden-villa.jpg",
  "/media/gallery/beachfront-dining.jpg",
  "/media/gallery/vineyard-lake-sunset.jpg",
  "/media/gallery/zanzibar-sandbar-poster.jpg",
  "/media/gallery/rainbow-valley.jpg",
  "/media/gallery/egypt-pyramids-panorama.jpg",
];

const AIRLINES = [
  "Vision Air",
  "SkyBridge Airlines",
  "Global Wings",
  "Meridian Airways",
  "Horizon Jet",
];

const HOTEL_CHAINS = [
  "Grand Meridian",
  "Horizon Suites",
  "The Voyager Hotel",
  "Palm Court Residences",
  "Northstar Inn",
];

const AMENITIES = [
  "Free Wi-Fi",
  "Breakfast included",
  "Pool",
  "Spa",
  "Airport shuttle",
  "Gym",
  "Pet friendly",
  "Free cancellation",
];

function seededRandom(seed: string) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = (Math.imul(31, h) + seed.charCodeAt(i)) | 0;
  }
  return () => {
    h = (Math.imul(48271, h) + 0x1234567) | 0;
    return ((h >>> 0) % 1000) / 1000;
  };
}

function formatTime(hour: number, minute: number) {
  const h = ((hour % 24) + 24) % 24;
  const period = h >= 12 ? "PM" : "AM";
  const displayHour = h % 12 === 0 ? 12 : h % 12;
  return `${displayHour}:${minute.toString().padStart(2, "0")} ${period}`;
}

/**
 * Deterministic mock results, standing in for a live Amadeus flight-offers
 * search. Swap the body of this function for an Amadeus API call and the
 * calling routes/pages need no changes.
 */
export function generateFlightResults(
  origin: string,
  destination: string,
  date: string,
  count = 6,
): FlightResult[] {
  const rand = seededRandom(`${origin}-${destination}-${date}`);
  return Array.from({ length: count }).map((_, i) => {
    const departHour = Math.floor(rand() * 20);
    const durationHours = 2 + Math.floor(rand() * 10);
    const stops = rand() > 0.6 ? 1 : 0;
    return {
      id: `FL-${i}-${Math.round(rand() * 1e6)}`,
      airline: AIRLINES[Math.floor(rand() * AIRLINES.length)],
      flightNumber: `VW${100 + Math.floor(rand() * 800)}`,
      origin: origin.toUpperCase(),
      destination: destination.toUpperCase(),
      departTime: formatTime(departHour, Math.floor(rand() * 60)),
      arriveTime: formatTime(departHour + durationHours, Math.floor(rand() * 60)),
      duration: `${durationHours}h ${Math.floor(rand() * 60)}m`,
      stops,
      cabin: "Economy",
      price: Math.round(180 + rand() * 900),
      currency: "USD",
    };
  }).sort((a, b) => a.price - b.price);
}

/**
 * Deterministic mock results standing in for a live Booking.com property
 * search. Swap the body for a real API call when credentials are available.
 */
export function generateHotelResults(
  destination: string,
  count = 6,
): HotelResult[] {
  const rand = seededRandom(destination.toLowerCase());
  return Array.from({ length: count }).map((_, i) => {
    const amenityCount = 3 + Math.floor(rand() * 3);
    const amenities = Array.from({ length: amenityCount }).map(
      () => AMENITIES[Math.floor(rand() * AMENITIES.length)],
    );
    return {
      id: `HT-${i}-${Math.round(rand() * 1e6)}`,
      name: `${HOTEL_CHAINS[Math.floor(rand() * HOTEL_CHAINS.length)]} ${destination}`,
      destination,
      rating: Math.round((3.5 + rand() * 1.5) * 10) / 10,
      reviews: Math.floor(80 + rand() * 3000),
      pricePerNight: Math.round(60 + rand() * 400),
      currency: "USD",
      amenities: Array.from(new Set(amenities)),
      image: HOTEL_IMAGES[i % HOTEL_IMAGES.length],
    };
  }).sort((a, b) => a.pricePerNight - b.pricePerNight);
}

export type CarResult = {
  id: string;
  company: string;
  category: string;
  model: string;
  transmission: string;
  seats: number;
  pricePerDay: number;
  currency: string;
};

const CAR_COMPANIES = ["GlobeDrive", "RoamCars", "VoyageRentals", "TrailBlazer Auto"];
const CAR_MODELS: Record<string, string[]> = {
  Economy: ["Toyota Corolla", "Hyundai Accent", "Kia Rio"],
  SUV: ["Toyota RAV4", "Honda CR-V", "Nissan X-Trail"],
  Luxury: ["Mercedes E-Class", "BMW 5 Series", "Audi A6"],
  "Van / Minibus": ["Toyota Hiace", "Mercedes Sprinter", "Ford Transit"],
};

/** Deterministic mock results standing in for a live car-rental supplier search. */
export function generateCarResults(
  location: string,
  vehicleType = "economy",
  count = 6,
): CarResult[] {
  const categoryMap: Record<string, string> = {
    economy: "Economy",
    suv: "SUV",
    luxury: "Luxury",
    van: "Van / Minibus",
  };
  const category = categoryMap[vehicleType] ?? "Economy";
  const rand = seededRandom(`${location.toLowerCase()}-${category}`);
  const models = CAR_MODELS[category];

  return Array.from({ length: count }).map((_, i) => ({
    id: `CR-${i}-${Math.round(rand() * 1e6)}`,
    company: CAR_COMPANIES[Math.floor(rand() * CAR_COMPANIES.length)],
    category,
    model: models[Math.floor(rand() * models.length)],
    transmission: rand() > 0.3 ? "Automatic" : "Manual",
    seats: category === "Van / Minibus" ? 12 : category === "SUV" ? 5 : 5,
    pricePerDay: Math.round(
      (category === "Luxury" ? 140 : category === "SUV" ? 75 : category === "Van / Minibus" ? 95 : 35) +
        rand() * 60,
    ),
    currency: "USD",
  })).sort((a, b) => a.pricePerDay - b.pricePerDay);
}

export type TransferResult = {
  id: string;
  provider: string;
  vehicle: string;
  capacity: number;
  meetAndGreet: boolean;
  price: number;
  currency: string;
};

const TRANSFER_PROVIDERS = ["SkyLink Transfers", "CityHop Rides", "Vision Chauffeurs"];

/** Deterministic mock results standing in for a live airport-transfer supplier search. */
export function generateTransferResults(
  airport: string,
  count = 4,
): TransferResult[] {
  const rand = seededRandom(`transfer-${airport.toLowerCase()}`);
  const vehicles = ["Sedan", "SUV", "Minivan", "Executive"];

  return Array.from({ length: count }).map((_, i) => ({
    id: `TR-${i}-${Math.round(rand() * 1e6)}`,
    provider: TRANSFER_PROVIDERS[Math.floor(rand() * TRANSFER_PROVIDERS.length)],
    vehicle: vehicles[i % vehicles.length],
    capacity: [4, 5, 7, 3][i % 4],
    meetAndGreet: rand() > 0.4,
    price: Math.round(25 + rand() * 90),
    currency: "USD",
  })).sort((a, b) => a.price - b.price);
}
