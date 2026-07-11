import { amadeusGet } from "@/lib/amadeus/client";

export type LocationSuggestion = {
  iataCode: string;
  name: string;
  cityName: string;
  countryName: string;
  subType: "AIRPORT" | "CITY";
};

type LocationsResponse = {
  data?: Array<{
    subType: "AIRPORT" | "CITY";
    name: string;
    iataCode: string;
    address?: { cityName?: string; countryName?: string };
  }>;
};

/**
 * Worldwide city/airport keyword search via the Amadeus Locations API —
 * lets travelers search by city or airport name in any country instead of
 * needing to already know an IATA code.
 */
export async function searchLocations(keyword: string): Promise<LocationSuggestion[]> {
  const data = await amadeusGet<LocationsResponse>("/v1/reference-data/locations", {
    subType: "AIRPORT,CITY",
    keyword,
    "page[limit]": "8",
  });

  return (data.data ?? [])
    .filter((entry) => entry.iataCode)
    .map((entry) => ({
      iataCode: entry.iataCode,
      name: entry.name,
      cityName: entry.address?.cityName ?? entry.name,
      countryName: entry.address?.countryName ?? "",
      subType: entry.subType,
    }));
}
