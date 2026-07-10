import { NextRequest, NextResponse } from "next/server";
import { generateFlightResults } from "@/lib/data/mock-results";

/**
 * Flight search endpoint.
 *
 * When AMADEUS_CLIENT_ID / AMADEUS_CLIENT_SECRET are configured, this should
 * call the Amadeus Flight Offers Search API instead of the mock generator
 * below. The response shape is kept intentionally simple so the client and
 * the real integration can share the same contract.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const origin = searchParams.get("origin")?.trim();
  const destination = searchParams.get("destination")?.trim();
  const date = searchParams.get("date")?.trim();

  if (!origin || !destination || !date) {
    return NextResponse.json(
      { error: "origin, destination, and date are required" },
      { status: 400 },
    );
  }

  const hasAmadeusCredentials =
    !!process.env.AMADEUS_CLIENT_ID && !!process.env.AMADEUS_CLIENT_SECRET;

  const results = generateFlightResults(origin, destination, date);

  return NextResponse.json({
    source: hasAmadeusCredentials ? "amadeus" : "mock",
    origin: origin.toUpperCase(),
    destination: destination.toUpperCase(),
    date,
    results,
  });
}
