import { NextRequest, NextResponse } from "next/server";
import { searchHotels } from "@/lib/travel-search";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

/**
 * Hotel search endpoint.
 *
 * Uses the Amadeus Hotel Search API when AMADEUS_CLIENT_ID/SECRET are
 * configured (falls back to mock data automatically for destinations that
 * can't be resolved to an IATA city code, or on any upstream error).
 */
export async function GET(request: NextRequest) {
  const { allowed } = checkRateLimit(`hotels-search:${getClientIp(request)}`, {
    limit: 20,
    windowMs: 60 * 1000,
  });
  if (!allowed) {
    return NextResponse.json({ error: "Too many requests." }, { status: 429 });
  }

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

  const { source, results } = await searchHotels(destination, checkIn, checkOut, guests);

  return NextResponse.json({
    source,
    destination,
    checkIn,
    checkOut,
    results,
  });
}
