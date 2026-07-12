import { NextRequest, NextResponse } from "next/server";
import { isAmadeusConfigured } from "@/lib/amadeus/config";
import { searchLocations } from "@/lib/amadeus/locations";
import { searchFallbackAirports } from "@/lib/data/airports";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

export async function GET(request: NextRequest) {
  // Higher limit than the flight/hotel search routes since this fires on
  // every debounced keystroke in the autocomplete, not just on submit.
  const { allowed } = checkRateLimit(`locations-search:${getClientIp(request)}`, {
    limit: 60,
    windowMs: 60 * 1000,
  });
  if (!allowed) {
    return NextResponse.json({ source: "mock", results: [] }, { status: 429 });
  }

  const { searchParams } = new URL(request.url);
  const keyword = searchParams.get("keyword")?.trim() ?? "";

  if (keyword.length < 2) {
    return NextResponse.json({ source: "mock", results: [] });
  }

  if (isAmadeusConfigured) {
    try {
      const results = await searchLocations(keyword);
      if (results.length > 0) {
        return NextResponse.json({ source: "amadeus", results });
      }
    } catch (err) {
      console.error("Amadeus location search failed, falling back to offline list:", err);
    }
  }

  return NextResponse.json({
    source: "mock",
    results: searchFallbackAirports(keyword),
  });
}
