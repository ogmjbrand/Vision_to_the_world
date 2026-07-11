import { amadeusGet } from "@/lib/amadeus/client";
import type { FlightResult } from "@/lib/data/mock-results";

const AIRLINE_NAMES: Record<string, string> = {
  AA: "American Airlines",
  DL: "Delta Air Lines",
  UA: "United Airlines",
  BA: "British Airways",
  AF: "Air France",
  KL: "KLM",
  LH: "Lufthansa",
  EK: "Emirates",
  QR: "Qatar Airways",
  ET: "Ethiopian Airlines",
  KQ: "Kenya Airways",
  WB: "RwandAir",
  TK: "Turkish Airlines",
  EY: "Etihad Airways",
};

type AmadeusFlightOffersResponse = {
  data?: Array<{
    price: { total: string; currency: string };
    itineraries: Array<{
      duration: string;
      segments: Array<{
        departure: { iataCode: string; at: string };
        arrival: { iataCode: string; at: string };
        carrierCode: string;
        number: string;
      }>;
    }>;
    travelerPricings?: Array<{
      fareDetailsBySegment?: Array<{ cabin?: string }>;
    }>;
  }>;
};

function formatIsoDuration(iso: string) {
  const match = /P(?:\d+D)?T(?:(\d+)H)?(?:(\d+)M)?/.exec(iso);
  const hours = match?.[1] ?? "0";
  const minutes = match?.[2] ?? "0";
  return `${hours}h ${minutes}m`;
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}

export async function fetchFlightOffers(
  origin: string,
  destination: string,
  date: string,
  travelers = 1,
  max = 6,
): Promise<FlightResult[]> {
  const data = await amadeusGet<AmadeusFlightOffersResponse>(
    "/v2/shopping/flight-offers",
    {
      originLocationCode: origin.toUpperCase(),
      destinationLocationCode: destination.toUpperCase(),
      departureDate: date,
      adults: String(Math.max(1, travelers)),
      currencyCode: "USD",
      max: String(max),
    },
  );

  return (data.data ?? []).map((offer, i) => {
    const itinerary = offer.itineraries[0];
    const segments = itinerary.segments;
    const first = segments[0];
    const last = segments[segments.length - 1];
    const cabin = offer.travelerPricings?.[0]?.fareDetailsBySegment?.[0]?.cabin ?? "ECONOMY";

    return {
      id: `AMADEUS-${i}-${first.carrierCode}${first.number}`,
      airline: AIRLINE_NAMES[first.carrierCode] ?? first.carrierCode,
      flightNumber: `${first.carrierCode}${first.number}`,
      origin: first.departure.iataCode,
      destination: last.arrival.iataCode,
      departTime: formatTime(first.departure.at),
      arriveTime: formatTime(last.arrival.at),
      duration: formatIsoDuration(itinerary.duration),
      stops: segments.length - 1,
      cabin: cabin.charAt(0) + cabin.slice(1).toLowerCase(),
      price: Math.round(Number(offer.price.total)),
      currency: offer.price.currency,
    };
  });
}
