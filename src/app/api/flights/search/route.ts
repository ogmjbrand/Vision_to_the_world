import { NextRequest, NextResponse } from "next/server";
import { searchFlights } from "@/lib/travel-search";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

export async function GET(request: NextRequest) {
  const { allowed } = checkRateLimit(`flights-search:${getClientIp(request)}`, {
    limit: 20,
    windowMs: 60 * 1000,
  });
  if (!allowed) {
    return NextResponse.json({ error: "Too many requests." }, { status: 429 });
  }

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
