import { NextRequest, NextResponse } from "next/server";
import { generateFlightResults } from "@/lib/data/mock-results";
import { isAmadeusConfigured } from "@/lib/amadeus/config";
import { fetchFlightOffers } from "@/lib/amadeus/flights";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const origin = searchParams.get("origin")?.trim();
  const destination = searchParams.get("destination")?.trim();
  const date = searchParams.get("date")?.trim();
  const travelers = Number(searchParams.get("travelers") ?? "1") || 1;

  if (!origin || !destination || !date) {
    return NextResponse.json(
      { error: "origin, destination, and date are required" },
      { status: 400 },
    );
  }

  let source: "amadeus" | "mock" = "mock";
  let results = generateFlightResults(origin, destination, date);

  if (isAmadeusConfigured) {
    try {
      const liveResults = await fetchFlightOffers(origin, destination, date, travelers);
      if (liveResults.length > 0) {
        results = liveResults;
        source = "amadeus";
      }
    } catch (err) {
      console.error("Amadeus flight search failed, falling back to mock data:", err);
    }
  }

  return NextResponse.json({
    source,
    origin: origin.toUpperCase(),
    destination: destination.toUpperCase(),
    date,
    results,
  });
}
