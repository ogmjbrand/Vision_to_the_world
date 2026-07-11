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
- [Amadeus](https://developers.amadeus.com) self-service API — flight and hotel search (mock fallback included)
- [Stripe](https://stripe.com) Checkout, [PayPal](https://developer.paypal.com) Smart Buttons, Cash App (display-only) — payments

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Copy `.env.example` to `.env.local` and fill in credentials to enable real
authentication, live search results, and payments:

```bash
cp .env.example .env.local
```

Without Supabase credentials, auth pages will show errors on submit; without
Amadeus credentials, flight and hotel search fall back to deterministic mock
data (`source: "mock"` in the API response) so the UI is fully explorable
without external services. Without Stripe/PayPal credentials, the checkout
page shows those payment options as "not configured" but still displays the
Cash App option.

**Never commit real credentials.** `.env.local` is gitignored; only
`.env.example` (with empty values) is tracked in git.

## Project structure

```
src/
  app/
    (marketing pages)        home, about, contact
    flights/ hotels/ car-rental/ airport-transfers/   search + results
    packages/ visa-assistance/ travel-insurance/       informational + catalog
    auth/                      login, sign-up, reset-password
    checkout/                  order summary + Stripe/PayPal/Cash App payment
    dashboard/                 self-service user account area
    admin/                     internal admin console
    api/flights/search         flight search endpoint (Amadeus-backed, mock fallback)
    api/hotels/search          hotel search endpoint (Amadeus-backed, mock fallback)
    api/checkout/stripe        creates a Stripe Checkout Session
  components/                  layout, home, search, service, dashboard, admin, checkout UI
  lib/
    data/                      services, packages, site contact info, mock result generators
    supabase/                  browser/server/middleware Supabase clients
    amadeus/                   Amadeus OAuth client + flight/hotel search mapping
    stripe/                    Stripe client + config
    checkout.ts                shared order-total / checkout-link helpers
```

## Live data integrations

- **Flights**: `src/app/api/flights/search/route.ts` calls the real Amadeus
  Flight Offers Search API when `AMADEUS_CLIENT_ID`/`AMADEUS_CLIENT_SECRET`
  are set, with automatic fallback to mock data on any upstream error.
- **Hotels**: `src/app/api/hotels/search/route.ts` calls the Amadeus Hotel
  Search API (city lookup → hotel offers) for a small set of known
  destinations (`src/lib/amadeus/hotels.ts`); unmapped destinations and any
  upstream error fall back to mock data automatically.
- Neither integration has been exercised against the live Amadeus API from
  this repo's development environment (outbound network was sandboxed) —
  verify against a real deployment before relying on it.

## Payments

- **Stripe**: `/checkout` creates a redirect-based Checkout Session
  (`STRIPE_SECRET_KEY`) covering the item subtotal plus Vision To The World's
  5% service fee.
- **PayPal**: Smart Buttons rendered client-side (`NEXT_PUBLIC_PAYPAL_CLIENT_ID`).
  Order creation/capture happens entirely client-side — for production, move
  order capture to a server route that verifies the payment before marking a
  booking paid.
- **Cash App**: display-only — shows the configured cashtag with manual
  payment instructions (`NEXT_PUBLIC_CASHAPP_CASHTAG`); no API integration.
- Paystack and Flutterwave are documented as a future addition but not yet
  wired up.
