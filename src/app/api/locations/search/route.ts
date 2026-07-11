import { NextRequest, NextResponse } from "next/server";
import { isAmadeusConfigured } from "@/lib/amadeus/config";
import { searchLocations } from "@/lib/amadeus/locations";
import { searchFallbackAirports } from "@/lib/data/airports";

export async function GET(request: NextRequest) {
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
