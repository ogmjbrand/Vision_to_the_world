export const isAmadeusConfigured = !!(
  process.env.AMADEUS_CLIENT_ID && process.env.AMADEUS_CLIENT_SECRET
);

/** Amadeus self-service APIs are split across a test and production host. */
export const AMADEUS_BASE_URL =
  process.env.AMADEUS_ENV === "production"
    ? "https://api.amadeus.com"
    : "https://test.api.amadeus.com";
