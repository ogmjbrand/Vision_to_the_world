import { NextRequest, NextResponse } from "next/server";
import { generateHotelResults } from "@/lib/data/mock-results";
import { isAmadeusConfigured } from "@/lib/amadeus/config";
import { fetchHotelOffers } from "@/lib/amadeus/hotels";

/**
 * Hotel search endpoint.
 *
 * Uses the Amadeus Hotel Search API when AMADEUS_CLIENT_ID/SECRET are
 * configured (falls back to mock data automatically for destinations that
 * can't be resolved to an IATA city code, or on any upstream error). Swap
 * in BOOKING_API_KEY / the Booking.com Demand API here if that becomes
 * available instead.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const destination = searchParams.get("destination")?.trim();
  const checkIn = searchParams.get("checkIn")?.trim();
  const checkOut = searchParams.get("checkOut")?.trim();
  const guests = Number(searchParams.get("guests") ?? "2") || 2;

  if (!destination || !checkIn || !checkOut) {
    return NextResponse.json(
      { error: "destination, checkIn, and checkOut are required" },
      { status: 400 },
    );
  }

  let source: "amadeus" | "mock" = "mock";
  let results = generateHotelResults(destination);

  if (isAmadeusConfigured) {
    try {
      const liveResults = await fetchHotelOffers(destination, checkIn, checkOut, guests);
      if (liveResults && liveResults.length > 0) {
        results = liveResults;
        source = "amadeus";
      }
    } catch (err) {
      console.error("Amadeus hotel search failed, falling back to mock data:", err);
    }
  }

  return NextResponse.json({
    source,
    destination,
    checkIn,
    checkOut,
    results,
  });
}
