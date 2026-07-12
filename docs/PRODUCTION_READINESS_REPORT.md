# Production Readiness Report — Vision To The World

Audit date: 2026-07-12
Scope: full-stack audit across auth, payments, bookings, email, security,
SEO, performance, accessibility, and mobile. Every issue below marked
**Fixed** has a corresponding code change in this commit; everything marked
**Recommendation** is a deliberate scope decision, explained inline, that
needs either a product decision or a dashboard/infra step outside this
codebase.

---

## 1. Authentication

| Flow | Status | Notes |
|---|---|---|
| Signup | ✅ Pass | `supabase.auth.signUp` + `handle_new_user` trigger creates the `profiles` row automatically. |
| Login | ✅ Pass | Password + now also magic link (see below). |
| Password reset | 🔴 **Fixed — was broken** | `reset-password/page.tsx` has always redirected to `/auth/update-password`, but that page never existed. Every password-reset link a customer clicked landed on a 404 with no way to actually set a new password. Added `src/app/auth/update-password/page.tsx`. |
| Email confirmation | ✅ Pass | `/auth/confirm` route (built last session) verifies the OTP and fires the Welcome email exactly once, guarded by `profiles.welcome_email_sent_at`. |
| Magic links | 🟡 **Fixed — was missing** | No UI existed to request a magic link at all. Added a "Use a magic link instead" toggle on the login page (`signInWithOtp`), routed through the same `/auth/confirm` handler. |
| Session management | ✅ Pass | Middleware refreshes the session on every request and gates `/dashboard`, `/admin`, `/checkout`. Cookies default to `sameSite: "lax"` (verified in `@supabase/ssr`'s source). |

**Recommendation:** Email change has no UI trigger — the profile form's email field is `disabled` with no update path. If self-service email changes are wanted, wire `supabase.auth.updateUser({ email })` into the profile form; Supabase will send its own confirmation email automatically. Left unbuilt since it wasn't clear this was intentionally locked down or just missing.

---

## 2. Payments

| Item | Status | Notes |
|---|---|---|
| Stripe Checkout | ✅ Pass (hardened) | `/api/checkout/stripe` now requires the customer to be signed in and stamps their user id into the session metadata — previously anyone, logged in or not, could hit this endpoint, and the resulting booking depended entirely on whoever's browser session was active when they later landed on the success page. |
| Webhook verification | ✅ Pass | Signature verified via `stripe.webhooks.constructEvent`; confirmed with a local test key that a forged signature is rejected (400) without any network call. |
| Successful payment handling | ✅ Pass | Webhook (`checkout.session.completed`) is now the authoritative fulfillment path, independent of the customer's browser — the success page remains a fast-feedback secondary path. |
| Failed payment handling | ✅ Pass (no code needed) | Stripe's own hosted Checkout page handles a declined card inline (retry without leaving Stripe); an abandoned/cancelled session simply returns to `/checkout` via `cancel_url`. No booking is ever created for a payment that didn't complete, so there's nothing to clean up. |
| Duplicate webhook protection | ✅ Pass | `bookings.stripe_session_id` is unique-constrained; `findBookingByStripeSession` checked before every insert. Verified this handles Stripe's automatic retries safely (retry finds the existing row, no-ops). |
| Refund support | 🔴 **Fixed — was completely absent** | Added a `charge.refunded` webhook handler that syncs `payments.status` and `bookings.status` the moment a refund is issued from the Stripe Dashboard. Deliberately did **not** build a custom in-app refund button — Stripe's own refund UI already has better safeguards (partial refunds, reason codes, dispute handling) than a bare custom action would, and duplicating it is more risk than value. Added a short note + link on `/admin/payments` instead. |
| Payment receipts | ✅ Pass | Invoice email fires alongside booking confirmation on every gateway, using the real `invoice_number` from the database. |

---

## 3. Booking System

All 7 services were checked against: unique booking ID, link to the authenticated customer, stored payment status, stored booking status.

Every paid service (**Flights, Hotels, Car Rentals, Airport Transfers, Tour Packages, Travel Insurance**) routes through the same `checkoutHref()` → `/checkout` → one of 3 payment components → the single `recordPaidBooking()` function. That function is the one place bookings are ever written, so all four requirements are satisfied **by construction** for every service that uses it — there's no per-service code path that could silently skip one of them.

**Visa & Travel Assistance is intentionally different** — it uses a "talk to a consultant" flow (`/contact#consultant`) instead of instant checkout, because visa case costs are variable and can't be sold at a fixed price. Confirmed this is a deliberate design choice (Travel Insurance sits right next to it in the codebase and correctly uses the instant-checkout path for its fixed-price plans), not an oversight — no fix needed.

**Also fixed as part of this audit:** `bookings.travel_date` was a real column that nothing ever populated — every booking had a `null` departure date, which would have made the Trip Reminder feature (see below) permanently useless. Threaded a real date through checkout for flights (search date), hotels (check-in), car rental (pickup date), and airport transfers (transfer date).

---

## 4. Email System

All 8 requested email types, verified against a real trigger:

| Email | Trigger | Status |
|---|---|---|
| Welcome | `/auth/confirm` after signup verification | ✅ |
| Booking confirmation | Stripe webhook + success page + PayPal/Cash App notification route | ✅ |
| Payment confirmation | Same as above — this app doesn't have a separate "payment confirmed" template distinct from Booking Confirmation + Invoice; both fire together immediately on payment. | ✅ (by design) |
| Password reset | Supabase's own template, sent via Supabase Auth | ✅ (per explicit instruction to leave this alone) |
| Email change | No UI trigger exists — see Authentication section above | 🟡 Not applicable until that UI exists |
| Magic link | Supabase's own template, now reachable from the login page | ✅ |
| Trip reminder | New daily cron, 7-day + 24-hour milestones, idempotent per booking | ✅ |
| Invoice | Same 3 trigger points as booking confirmation | ✅ |

Every send (all of the above, plus the contact-form notification/auto-reply and admin newsletter campaigns) goes through one retry/logging wrapper (`src/lib/resend/send.ts`) — 3 attempts with backoff on transient failures, and a row in the `email_logs` table for every attempt.

**Note:** true end-to-end delivery testing (does the email actually land in an inbox) could not be done from this sandbox — there's no network path to Resend's API here. Verified everything short of that: every template still renders correctly, `RESEND_API_KEY` is present in the environment, and the send wrapper's retry/logging logic is exercised by unit-level reasoning, not a live send. **Recommend a real end-to-end pass** (sign up a test account, complete a Stripe test-mode booking, trigger the cron manually) once deployed — checklist is in `docs/EMAIL_SETUP.md`.

---

## 5. Security

| Item | Status | Notes |
|---|---|---|
| No secret keys exposed | ✅ Pass | `.env*` gitignored (with `.env.example` explicitly re-tracked, no real values in it). Confirmed no client component (`"use client"`) references any server-only secret env var. |
| RLS enabled on all tables | ✅ Pass | Every table across both migrations (`profiles`, `bookings`, `payments`, `invoices`, `support_tickets`, `email_logs`, `newsletter_campaigns`) has `enable row level security` with explicit policies. |
| Proper API authorization | 🔴 **Fixed — real vulnerability** | `/api/notifications/booking-confirmation` and `/api/notifications/invoice` accepted an arbitrary `to` email address with **no authentication at all** — anyone could POST to either endpoint and get a real, branded "booking confirmed" or "invoice" email sent to any inbox, on demand, unlimited times. This was an open email-relay / spam vector using the site's own sending reputation. Fixed: both routes now require the caller to be signed in and only allow `to` to equal their own session email. |
| Input validation | 🟡 Partial | Added format/length validation to the contact form (the one fully public, unauthenticated route that accepts free-text input). Most other routes rely on type-checked request bodies without deeper validation (no zod/valibot anywhere in the codebase) — acceptable for authenticated, app-internal routes, worth adding a schema-validation library if the API surface grows. |
| Rate limiting | 🟡 **Added — best-effort only** | Added a lightweight in-memory limiter (`src/lib/rate-limit.ts`), applied to the contact form and the three public search endpoints (flights/hotels/locations). **Caveat, stated plainly:** this state lives in a single serverless function instance's memory, so it does not coordinate across instances under real traffic. It stops casual abuse for free; for real protection under load, put Upstash Redis + `@upstash/ratelimit` (or Vercel's Firewall) in front of these routes — that requires new infrastructure this sandbox can't provision. |
| CSRF protection | ✅ Pass | Session cookies default to `sameSite: "lax"` (confirmed in `@supabase/ssr`'s source), which blocks cookie attachment on cross-site POST requests — the relevant attack vector for this app's cookie-based auth. |
| Secure webhook verification | ✅ Pass | Stripe webhook signature verified via `stripe.webhooks.constructEvent`; tested locally that a missing or forged signature is rejected before any Supabase/email work happens. |

---

## 6. SEO

| Item | Status | Notes |
|---|---|---|
| Canonical URLs | 🔴 **Fixed** | The root layout set a single hardcoded canonical (`"/"`) with no per-page override, meaning *every* page on the site — `/flights`, `/faq`, `/privacy-policy`, all of them — was emitting `<link rel="canonical" href=".../">`, pointing at the homepage. This is a real duplicate-content signal to search engines. Added an explicit canonical to all 14 indexed pages via a small `canonicalFor()` helper. |
| sitemap.xml | 🔴 **Fixed** | Removed `/auth/login` and `/auth/sign-up` from the sitemap (they're now noindexed — see below; listing a noindexed page in the sitemap is contradictory). All 7 service pages and static pages present with sensible priority/frequency. |
| robots.txt | ✅ Pass | Disallows `/dashboard`, `/admin`, `/checkout`, `/api`; points to the sitemap. Deliberately left `/auth` un-disallowed even though those pages are now noindexed — blocking crawl would prevent Google from ever reading the `noindex` tag. |
| Open Graph | 🟡 Recommendation | Every page shares one fallback image (`egypt-pyramids-panorama.jpg`) and no page defines its own `openGraph`/`twitter` fields — a shared link to `/flights` and a shared link to `/faq` show the same pyramid photo. Real per-service OG images are a design/content task, not a code-audit fix — flagging for a follow-up. |
| Twitter Cards | ✅ Pass | `summary_large_image` configured site-wide in the root layout. |
| Structured Data | 🟡 Recommendation | Only `TravelAgency` (global) and `FAQPage` (FAQ page only) schema exist. A booking platform would benefit from `Service`/`Offer` schema on the 7 service pages and `BreadcrumbList` site-wide — scoped as a follow-up, not implemented here (content-authoring task, not a bug fix). |
| Homepage / auth metadata | 🔴 **Fixed** | Homepage had zero `metadata` export (silently inherited the generic root description). Login/sign-up/reset-password/update-password pages had no `robots` directive at all — added a shared `src/app/auth/layout.tsx` setting `noindex` (they're all client components, so metadata can't be exported from the pages themselves). |

---

## 7. Performance

| Item | Status | Notes |
|---|---|---|
| Image optimization | 🟡 Reviewed, left as-is | 5 raw `<img>` tags exist in real components (hero background, testimonial avatars, gallery tiles, video poster), each with a deliberate `eslint-disable` comment from when they were built — they're tied into Framer Motion crossfade/drag animations in ways that made `next/image` awkward at the time. Chose not to touch well-tested, already-shipped hero/gallery code this late in an already-large audit without being able to visually re-verify every animation. Flagging precisely rather than silently leaving it out of the report. |
| Lazy loading / code splitting | 🔴 **Fixed** | The `cobe` WebGL globe (used in exactly one homepage bento cell) was imported eagerly at the top of `features-bento-grid.tsx`, meaning its JS shipped in the same bundle as the rest of the homepage — including content well above the fold. Extracted it to its own module and dynamically imported with `ssr:false`, matching the pattern already used for the Leaflet map. |
| Caching | 🟡 Recommendation | Flight/hotel search routes call Amadeus with `cache: "no-store"` on every request — zero caching of upstream responses. This is defensible (live pricing shouldn't go stale), but even a 30-60s cache on identical repeated searches would cut redundant upstream calls. Not changed here: this sandbox has no network path to Amadeus, so a caching change to a live-pricing flow couldn't be verified end-to-end before shipping it — too risky to guess at blind. |
| Bundle size | ✅ Pass | Root layout and shared site chrome import nothing heavier than `next/navigation` and the nav/footer components — framer-motion, Leaflet, and cobe are all confined to the specific pages that use them. |
| Font loading | ✅ Pass | `next/font/google` with Latin subsetting; Next defaults to `display: swap`. |
| Static vs dynamic rendering | ✅ Pass | Every dynamically-rendered route has a clear reason (searchParams, auth, user-specific data) — no unjustified dynamic pages found. |

---

## 8. Accessibility

| Item | Status | Notes |
|---|---|---|
| Keyboard navigation | 🔴 **Fixed** | The desktop services dropdown only opened on `onMouseEnter` — a keyboard user tabbing to it and pressing Enter couldn't open it at all. Added an `onClick` toggle (works for both mouse and keyboard activation of a native `<button>`) plus Escape-to-close. |
| Screen reader support | 🔴 **Fixed (partial)** | The gallery lightbox modal had no `role="dialog"`/`aria-modal`/Escape handling — added all three. Its thumbnail dock switcher and the destinations-gallery tiles were mouse/touch-only `motion.div`s with no `tabIndex`, `role`, or keyboard handler — added `role="button"`, `tabIndex={0}`, `aria-label`, and Enter/Space activation to both. The testimonials card stack was **entirely drag-only** with no accessible alternative at all — added a visible, keyboard-operable "Next story" button that calls the same shuffle function as the drag gesture. |
| ARIA labels | 🔴 **Fixed (targeted)** | Mobile hamburger button had an accessible name (`aria-label="Toggle menu"`) but no `aria-expanded` — added it, plus `aria-controls` linking both the hamburger and the services-dropdown trigger to their panels. |
| Color contrast | 🟡 **Flagged, not changed** | Computed exact WCAG contrast ratios for the site's primary CTA color: white text on `accent-500` (#8b9a3a) is **3.10:1** — fails the 4.5:1 AA threshold for normal-size text (passes the 3:1 threshold for large/bold text or non-text UI components). The next shade down, `accent-600`, only reaches **4.01:1** — still short of 4.5. Deliberately did not change this: it's the site's signature brand color, used on dozens of already-shipped, previously-approved buttons across the whole site. A contrast fix here means visibly changing the site's primary accent color everywhere it appears — exactly the kind of visible, hard-to-reverse change that should get explicit sign-off rather than being silently bundled into an audit. Recommend either darkening the accent color by one more step, or bumping CTA button text to `font-bold` at 14px+ (qualifies for the 3:1 "large text" threshold) as a lower-impact fix. |

---

## 9. Mobile

Real device testing isn't possible from this sandbox — verified instead via Playwright's Android (Pixel 7), iPhone (14 Pro), and iPad (Pro 11) device emulation profiles across the homepage, flights search, checkout, login, and contact pages. All rendered cleanly: no horizontal overflow, text properly sized, tap targets full-width on phone, the search widget's 4 tabs reflow correctly between phone (partially below the fold, expected) and tablet (fully visible). The new magic-link toggle on the login page was confirmed to render correctly at phone width. No mobile-specific layout bugs found.

---

## 10. Final Audit

- `npm run lint` — clean, zero warnings or errors.
- `npm run build` (production, with typecheck) — clean, all 50 routes compile and generate successfully, including every new route added in this audit (`/auth/update-password`, `/api/webhooks/stripe` refund handling, `/api/admin/newsletter/send`, `/api/cron/trip-reminders`, `/api/newsletter/unsubscribe`).
- Every fix in this report is committed in this session's commit(s).

### Remaining issues (by design or requiring a decision outside this codebase)

1. **Email change UI** — no self-service flow exists; needs a product decision on whether to add one.
2. **OG image diversity + richer Schema.org markup** — content/design task, not a bug.
3. **Search-route response caching** — deliberately not touched without live verification against Amadeus.
4. **Rate limiting is best-effort (single-instance)** — needs Upstash/Vercel KV for true multi-instance protection.
5. **CTA button color contrast** — quantified above (3.10:1), needs an explicit decision since it's a visible brand-color change.
6. **Raw `<img>` tags in 5 animation-heavy components** — reviewed and deliberately left alone rather than risk regressing shipped, approved UI.
7. **Live email delivery** and **live Stripe webhook delivery** — both need a real deployment with real API keys to verify end-to-end; this sandbox has no network path to either Resend or Stripe. Manual verification checklists are in `docs/EMAIL_SETUP.md` and `docs/STRIPE_SETUP.md`.
