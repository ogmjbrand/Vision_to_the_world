import type { LocationSuggestion } from "@/lib/amadeus/locations";

/**
 * Curated worldwide airport list used only as an offline fallback when the
 * live Amadeus Locations API is unavailable — covers major hubs across
 * every populated continent so search still feels global without a live
 * connection. The live API (searchLocations) covers far more than this.
 */
export const FALLBACK_AIRPORTS: LocationSuggestion[] = [
  // North America
  { iataCode: "JFK", name: "John F. Kennedy International", cityName: "New York", countryName: "United States", subType: "AIRPORT" },
  { iataCode: "LAX", name: "Los Angeles International", cityName: "Los Angeles", countryName: "United States", subType: "AIRPORT" },
  { iataCode: "ORD", name: "O'Hare International", cityName: "Chicago", countryName: "United States", subType: "AIRPORT" },
  { iataCode: "MIA", name: "Miami International", cityName: "Miami", countryName: "United States", subType: "AIRPORT" },
  { iataCode: "BUF", name: "Buffalo Niagara International", cityName: "Buffalo", countryName: "United States", subType: "AIRPORT" },
  { iataCode: "YYZ", name: "Toronto Pearson International", cityName: "Toronto", countryName: "Canada", subType: "AIRPORT" },
  { iataCode: "YVR", name: "Vancouver International", cityName: "Vancouver", countryName: "Canada", subType: "AIRPORT" },
  { iataCode: "MEX", name: "Mexico City International", cityName: "Mexico City", countryName: "Mexico", subType: "AIRPORT" },
  // South America
  { iataCode: "GRU", name: "São Paulo–Guarulhos International", cityName: "São Paulo", countryName: "Brazil", subType: "AIRPORT" },
  { iataCode: "GIG", name: "Rio de Janeiro–Galeão International", cityName: "Rio de Janeiro", countryName: "Brazil", subType: "AIRPORT" },
  { iataCode: "EZE", name: "Ministro Pistarini International", cityName: "Buenos Aires", countryName: "Argentina", subType: "AIRPORT" },
  { iataCode: "BOG", name: "El Dorado International", cityName: "Bogotá", countryName: "Colombia", subType: "AIRPORT" },
  { iataCode: "LIM", name: "Jorge Chávez International", cityName: "Lima", countryName: "Peru", subType: "AIRPORT" },
  { iataCode: "SCL", name: "Arturo Merino Benítez International", cityName: "Santiago", countryName: "Chile", subType: "AIRPORT" },
  // Europe
  { iataCode: "LHR", name: "Heathrow Airport", cityName: "London", countryName: "United Kingdom", subType: "AIRPORT" },
  { iataCode: "CDG", name: "Charles de Gaulle Airport", cityName: "Paris", countryName: "France", subType: "AIRPORT" },
  { iataCode: "FRA", name: "Frankfurt Airport", cityName: "Frankfurt", countryName: "Germany", subType: "AIRPORT" },
  { iataCode: "AMS", name: "Amsterdam Schiphol Airport", cityName: "Amsterdam", countryName: "Netherlands", subType: "AIRPORT" },
  { iataCode: "MAD", name: "Adolfo Suárez Madrid–Barajas", cityName: "Madrid", countryName: "Spain", subType: "AIRPORT" },
  { iataCode: "BCN", name: "Barcelona–El Prat Airport", cityName: "Barcelona", countryName: "Spain", subType: "AIRPORT" },
  { iataCode: "FCO", name: "Leonardo da Vinci–Fiumicino", cityName: "Rome", countryName: "Italy", subType: "AIRPORT" },
  { iataCode: "IST", name: "Istanbul Airport", cityName: "Istanbul", countryName: "Turkey", subType: "AIRPORT" },
  { iataCode: "ZRH", name: "Zurich Airport", cityName: "Zurich", countryName: "Switzerland", subType: "AIRPORT" },
  { iataCode: "LIS", name: "Humberto Delgado Airport", cityName: "Lisbon", countryName: "Portugal", subType: "AIRPORT" },
  { iataCode: "ATH", name: "Athens International", cityName: "Athens", countryName: "Greece", subType: "AIRPORT" },
  { iataCode: "SVO", name: "Sheremetyevo International", cityName: "Moscow", countryName: "Russia", subType: "AIRPORT" },
  // Africa
  { iataCode: "LOS", name: "Murtala Muhammed International", cityName: "Lagos", countryName: "Nigeria", subType: "AIRPORT" },
  { iataCode: "ABV", name: "Nnamdi Azikiwe International", cityName: "Abuja", countryName: "Nigeria", subType: "AIRPORT" },
  { iataCode: "CAI", name: "Cairo International", cityName: "Cairo", countryName: "Egypt", subType: "AIRPORT" },
  { iataCode: "JNB", name: "O.R. Tambo International", cityName: "Johannesburg", countryName: "South Africa", subType: "AIRPORT" },
  { iataCode: "CPT", name: "Cape Town International", cityName: "Cape Town", countryName: "South Africa", subType: "AIRPORT" },
  { iataCode: "NBO", name: "Jomo Kenyatta International", cityName: "Nairobi", countryName: "Kenya", subType: "AIRPORT" },
  { iataCode: "ACC", name: "Kotoka International", cityName: "Accra", countryName: "Ghana", subType: "AIRPORT" },
  { iataCode: "ADD", name: "Bole International", cityName: "Addis Ababa", countryName: "Ethiopia", subType: "AIRPORT" },
  { iataCode: "CMN", name: "Mohammed V International", cityName: "Casablanca", countryName: "Morocco", subType: "AIRPORT" },
  { iataCode: "DKR", name: "Blaise Diagne International", cityName: "Dakar", countryName: "Senegal", subType: "AIRPORT" },
  { iataCode: "DAR", name: "Julius Nyerere International", cityName: "Dar es Salaam", countryName: "Tanzania", subType: "AIRPORT" },
  // Middle East
  { iataCode: "DXB", name: "Dubai International", cityName: "Dubai", countryName: "United Arab Emirates", subType: "AIRPORT" },
  { iataCode: "AUH", name: "Abu Dhabi International", cityName: "Abu Dhabi", countryName: "United Arab Emirates", subType: "AIRPORT" },
  { iataCode: "DOH", name: "Hamad International", cityName: "Doha", countryName: "Qatar", subType: "AIRPORT" },
  { iataCode: "JED", name: "King Abdulaziz International", cityName: "Jeddah", countryName: "Saudi Arabia", subType: "AIRPORT" },
  { iataCode: "RUH", name: "King Khalid International", cityName: "Riyadh", countryName: "Saudi Arabia", subType: "AIRPORT" },
  { iataCode: "TLV", name: "Ben Gurion Airport", cityName: "Tel Aviv", countryName: "Israel", subType: "AIRPORT" },
  { iataCode: "AMM", name: "Queen Alia International", cityName: "Amman", countryName: "Jordan", subType: "AIRPORT" },
  // Asia
  { iataCode: "NRT", name: "Narita International", cityName: "Tokyo", countryName: "Japan", subType: "AIRPORT" },
  { iataCode: "HND", name: "Haneda Airport", cityName: "Tokyo", countryName: "Japan", subType: "AIRPORT" },
  { iataCode: "ICN", name: "Incheon International", cityName: "Seoul", countryName: "South Korea", subType: "AIRPORT" },
  { iataCode: "PEK", name: "Beijing Capital International", cityName: "Beijing", countryName: "China", subType: "AIRPORT" },
  { iataCode: "PVG", name: "Shanghai Pudong International", cityName: "Shanghai", countryName: "China", subType: "AIRPORT" },
  { iataCode: "HKG", name: "Hong Kong International", cityName: "Hong Kong", countryName: "China", subType: "AIRPORT" },
  { iataCode: "SIN", name: "Singapore Changi", cityName: "Singapore", countryName: "Singapore", subType: "AIRPORT" },
  { iataCode: "BKK", name: "Suvarnabhumi Airport", cityName: "Bangkok", countryName: "Thailand", subType: "AIRPORT" },
  { iataCode: "KUL", name: "Kuala Lumpur International", cityName: "Kuala Lumpur", countryName: "Malaysia", subType: "AIRPORT" },
  { iataCode: "CGK", name: "Soekarno–Hatta International", cityName: "Jakarta", countryName: "Indonesia", subType: "AIRPORT" },
  { iataCode: "MNL", name: "Ninoy Aquino International", cityName: "Manila", countryName: "Philippines", subType: "AIRPORT" },
  { iataCode: "DEL", name: "Indira Gandhi International", cityName: "New Delhi", countryName: "India", subType: "AIRPORT" },
  { iataCode: "BOM", name: "Chhatrapati Shivaji Maharaj International", cityName: "Mumbai", countryName: "India", subType: "AIRPORT" },
  { iataCode: "DAC", name: "Hazrat Shahjalal International", cityName: "Dhaka", countryName: "Bangladesh", subType: "AIRPORT" },
  { iataCode: "KHI", name: "Jinnah International", cityName: "Karachi", countryName: "Pakistan", subType: "AIRPORT" },
  // Oceania
  { iataCode: "SYD", name: "Sydney Kingsford Smith", cityName: "Sydney", countryName: "Australia", subType: "AIRPORT" },
  { iataCode: "MEL", name: "Melbourne Airport", cityName: "Melbourne", countryName: "Australia", subType: "AIRPORT" },
  { iataCode: "AKL", name: "Auckland Airport", cityName: "Auckland", countryName: "New Zealand", subType: "AIRPORT" },
];

export function searchFallbackAirports(keyword: string, limit = 8): LocationSuggestion[] {
  const q = keyword.trim().toLowerCase();
  if (!q) return [];
  return FALLBACK_AIRPORTS.filter(
    (a) =>
      a.cityName.toLowerCase().includes(q) ||
      a.countryName.toLowerCase().includes(q) ||
      a.name.toLowerCase().includes(q) ||
      a.iataCode.toLowerCase() === q,
  ).slice(0, limit);
}
