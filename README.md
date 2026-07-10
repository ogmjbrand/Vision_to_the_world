# Vision To The World

**Your Journey. Your Choice. Your World.**

A next-generation self-service travel technology platform that empowers
travelers to independently search, compare, book, and manage every aspect of
their journey — flights, hotels, car rentals, airport transfers, travel
packages, visa assistance, and travel insurance — from one seamless digital
experience.

## Tech stack

- [Next.js](https://nextjs.org) (App Router) + React + TypeScript
- [Tailwind CSS](https://tailwindcss.com) v4
- [Supabase](https://supabase.com) — auth, database
- Amadeus API — flight search (mock fallback included)
- Booking.com API — hotel search (mock fallback included)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Copy `.env.example` to `.env.local` and fill in credentials to enable real
authentication and live search results:

```bash
cp .env.example .env.local
```

Without Supabase credentials, auth pages will show errors on submit; without
Amadeus/Booking.com credentials, flight and hotel search fall back to
deterministic mock data (`source: "mock"` in the API response) so the UI is
fully explorable without external services.

## Project structure

```
src/
  app/
    (marketing pages)        home, about, contact
    flights/ hotels/ car-rental/ airport-transfers/   search + results
    packages/ visa-assistance/ travel-insurance/       informational + catalog
    auth/                      login, sign-up, reset-password
    dashboard/                 self-service user account area
    admin/                     internal admin console
    api/flights/search         flight search endpoint (Amadeus-ready)
    api/hotels/search          hotel search endpoint (Booking.com-ready)
  components/                  layout, home, search, service, dashboard, admin UI
  lib/
    data/                      services, packages, and mock result generators
    supabase/                  browser/server/middleware Supabase clients
```

## Swapping in live travel-supplier data

`src/app/api/flights/search/route.ts` and `src/app/api/hotels/search/route.ts`
are the seams for real integrations: replace the calls to
`generateFlightResults` / `generateHotelResults` in
`src/lib/data/mock-results.ts` with calls to the Amadeus Flight Offers Search
API and the Booking.com Demand API respectively once credentials are set.

## Payments

The platform is designed to support Paystack, Flutterwave, Stripe, and
PayPal so travelers can pay with their preferred method. Payment gateway
integration is not yet wired up — see `.env.example` for the expected
credentials.
