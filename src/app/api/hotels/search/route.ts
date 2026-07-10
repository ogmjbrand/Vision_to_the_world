import { NextRequest, NextResponse } from "next/server";
import { generateHotelResults } from "@/lib/data/mock-results";

/**
 * Hotel search endpoint.
 *
 * When BOOKING_API_KEY is configured, this should call the Booking.com
 * Demand API instead of the mock generator below. The response shape is
 * kept intentionally simple so the client and the real integration can
 * share the same contract.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const destination = searchParams.get("destination")?.trim();
  const checkIn = searchParams.get("checkIn")?.trim();
  const checkOut = searchParams.get("checkOut")?.trim();

  if (!destination || !checkIn || !checkOut) {
    return NextResponse.json(
      { error: "destination, checkIn, and checkOut are required" },
      { status: 400 },
    );
  }

  const hasBookingCredentials = !!process.env.BOOKING_API_KEY;

  const results = generateHotelResults(destination);

  return NextResponse.json({
    source: hasBookingCredentials ? "booking.com" : "mock",
    destination,
    checkIn,
    checkOut,
    results,
  });
}
