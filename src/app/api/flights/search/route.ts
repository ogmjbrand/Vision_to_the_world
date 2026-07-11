import { NextRequest, NextResponse } from "next/server";
import { searchFlights } from "@/lib/travel-search";

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

  const { source, results } = await searchFlights(origin, destination, date, travelers);

  return NextResponse.json({
    source,
    origin: origin.toUpperCase(),
    destination: destination.toUpperCase(),
    date,
    results,
  });
}
