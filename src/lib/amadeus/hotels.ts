import { amadeusGet } from "@/lib/amadeus/client";
import { searchLocations } from "@/lib/amadeus/locations";
import type { HotelResult } from "@/lib/data/mock-results";

/**
 * Fast-path city-name → IATA city code lookup for a handful of common
 * destinations, to avoid an extra round trip to the Amadeus Locations API.
 * Anything not listed here still resolves worldwide via resolveCityCode's
 * live Amadeus fallback below — this is a cache, not a limit.
 */
const CITY_CODES: Record<string, string> = {
  london: "LON",
  paris: "PAR",
  "new york": "NYC",
  dubai: "DXB",
  lagos: "LOS",
  cairo: "CAI",
  nairobi: "NBO",
  johannesburg: "JNB",
  "cape town": "CPT",
  istanbul: "IST",
  rome: "ROM",
  madrid: "MAD",
  barcelona: "BCN",
  berlin: "BER",
  amsterdam: "AMS",
  singapore: "SIN",
  tokyo: "TYO",
  bangkok: "BKK",
  dubaimarina: "DXB",
  toronto: "YTO",
  "los angeles": "LAX",
  miami: "MIA",
  chicago: "CHI",
  buffalo: "BUF",
  accra: "ACC",
  "addis ababa": "ADD",
};

/**
 * Resolves any worldwide city name (or an already-known IATA code) to an
 * Amadeus city code. Checks the static cache first, then a bare 3-letter
 * code passthrough, then falls back to a live Amadeus city search so no
 * country or destination is unsupported.
 */
async function resolveCityCode(destination: string): Promise<string | null> {
  const trimmed = destination.trim();
  const key = trimmed.toLowerCase();
  if (CITY_CODES[key]) return CITY_CODES[key];
  if (/^[a-zA-Z]{3}$/.test(trimmed)) return trimmed.toUpperCase();

  try {
    const matches = await searchLocations(trimmed);
    const city = matches.find((m) => m.subType === "CITY") ?? matches[0];
    return city?.iataCode ?? null;
  } catch (err) {
    console.error("Amadeus city lookup failed:", err);
    return null;
  }
}

type HotelListResponse = {
  data?: Array<{ hotelId: string; name: string; rating?: string }>;
};

type HotelOffersResponse = {
  data?: Array<{
    hotel: { hotelId: string; name: string; rating?: string; amenities?: string[] };
    offers: Array<{ price: { total: string; currency: string } }>;
  }>;
};

const AMENITY_LABELS: Record<string, string> = {
  SWIMMING_POOL: "Pool",
  SPA: "Spa",
  WIFI: "Free Wi-Fi",
  RESTAURANT: "Restaurant",
  PARKING: "Parking",
  FITNESS_CENTER: "Gym",
  AIR_CONDITIONING: "Air conditioning",
  PETS_ALLOWED: "Pet friendly",
  BUSINESS_CENTER: "Business center",
};

export async function fetchHotelOffers(
  destination: string,
  checkIn: string,
  checkOut: string,
  guests = 2,
  max = 6,
): Promise<HotelResult[] | null> {
  const cityCode = await resolveCityCode(destination);
  if (!cityCode) return null;

  const list = await amadeusGet<HotelListResponse>(
    "/v1/reference-data/locations/hotels/by-city",
    { cityCode },
  );

  const hotelIds = (list.data ?? []).slice(0, 20).map((h) => h.hotelId);
  if (hotelIds.length === 0) return null;

  const offers = await amadeusGet<HotelOffersResponse>("/v3/shopping/hotel-offers", {
    hotelIds: hotelIds.join(","),
    checkInDate: checkIn,
    checkOutDate: checkOut,
    adults: String(Math.max(1, guests)),
    currency: "USD",
  });

  return (offers.data ?? []).slice(0, max).map((entry, i) => {
    const offer = entry.offers[0];
    const amenities = (entry.hotel.amenities ?? [])
      .map((a) => AMENITY_LABELS[a])
      .filter((a): a is string => Boolean(a));

    return {
      id: `AMADEUS-${entry.hotel.hotelId}`,
      name: entry.hotel.name,
      destination,
      rating: entry.hotel.rating ? Number(entry.hotel.rating) : 4,
      reviews: 0,
      pricePerNight: offer ? Math.round(Number(offer.price.total)) : 0,
      currency: offer?.price.currency ?? "USD",
      amenities: amenities.length > 0 ? amenities : ["Free Wi-Fi"],
      image: `https://picsum.photos/seed/vttw-amadeus-${i}-${entry.hotel.hotelId}/640/420`,
    };
  });
}
