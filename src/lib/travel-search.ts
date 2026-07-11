import { isAmadeusConfigured } from "@/lib/amadeus/config";
import { fetchFlightOffers } from "@/lib/amadeus/flights";
import { fetchHotelOffers } from "@/lib/amadeus/hotels";
import {
  generateFlightResults,
  generateHotelResults,
  type FlightResult,
  type HotelResult,
} from "@/lib/data/mock-results";

export type SearchSource = "amadeus" | "mock";

/**
 * Live worldwide flight search via Amadeus (any IATA origin/destination,
 * any country), falling back to deterministic mock data if Amadeus isn't
 * configured or the upstream request fails for any reason.
 */
export async function searchFlights(
  origin: string,
  destination: string,
  date: string,
  travelers = 1,
): Promise<{ source: SearchSource; results: FlightResult[] }> {
  if (isAmadeusConfigured) {
    try {
      const liveResults = await fetchFlightOffers(origin, destination, date, travelers);
      if (liveResults.length > 0) {
        return { source: "amadeus", results: liveResults };
      }
    } catch (err) {
      console.error("Amadeus flight search failed, falling back to mock data:", err);
    }
  }
  return { source: "mock", results: generateFlightResults(origin, destination, date) };
}

/**
 * Live worldwide hotel search via Amadeus (any city, any country),
 * falling back to deterministic mock data if Amadeus isn't configured,
 * the destination can't be resolved, or the upstream request fails.
 */
export async function searchHotels(
  destination: string,
  checkIn: string,
  checkOut: string,
  guests = 2,
): Promise<{ source: SearchSource; results: HotelResult[] }> {
  if (isAmadeusConfigured) {
    try {
      const liveResults = await fetchHotelOffers(destination, checkIn, checkOut, guests);
      if (liveResults && liveResults.length > 0) {
        return { source: "amadeus", results: liveResults };
      }
    } catch (err) {
      console.error("Amadeus hotel search failed, falling back to mock data:", err);
    }
  }
  return { source: "mock", results: generateHotelResults(destination) };
}
