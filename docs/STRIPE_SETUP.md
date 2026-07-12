# Stripe webhook setup

Now that real Stripe payments are live on Vercel, one dashboard step is
required for bookings and emails to fire reliably. Everything else (the
checkout session, the success page) already worked — this closes the one
real gap: **if a customer's browser never makes it back to
`/checkout/success`** (closed tab, dropped connection, failed redirect —
all normal on mobile), the payment succeeds on Stripe's side but nothing
gets recorded and no confirmation/invoice email goes out. `src/app/api/webhooks/stripe/route.ts`
fixes that by having Stripe call the app directly, server-to-server, the
moment payment completes — independent of the customer's browser.

## 1. Add the webhook endpoint in Stripe

Stripe Dashboard → Developers → Webhooks → **Add endpoint**:

- Endpoint URL: `https://<your-deployed-domain>/api/webhooks/stripe`
- Events to send: `checkout.session.completed` (only one needed)

After creating it, open the endpoint and copy its **Signing secret**
(starts with `whsec_`).

## 2. Set the env var

Add to Vercel's project env vars (Production — and Preview too if you test
payments on preview deploys):

```
STRIPE_WEBHOOK_SECRET=whsec_...
```

This is separate from `STRIPE_SECRET_KEY` and from `SUPABASE_SERVICE_ROLE_KEY`
(the webhook also needs the latter — see `docs/EMAIL_SETUP.md` — to write
the booking without a logged-in browser session).

## 3. Test it

Stripe Dashboard → Developers → Webhooks → your endpoint → **Send test
webhook** → `checkout.session.completed`. Check the endpoint's request log
there for a `200`, and check the new `email_logs` Supabase table for
`booking_confirmation`/`invoice` rows.

For a real end-to-end test: complete an actual Stripe checkout, then check
`bookings`/`payments`/`invoices` in Supabase and the two emails in your
inbox. Both the webhook and the success page will attempt to record the
same booking — that's expected; `bookings.stripe_session_id` is
unique-constrained, so only the first to arrive actually inserts anything,
and the emails only send once.

## Why the checkout session also needed a change

`src/app/api/checkout/stripe/route.ts` now requires the customer to be
signed in when starting checkout (previously it accepted the request from
anyone) and stamps their user id into the Stripe session's `metadata`. The
webhook has no browser session to read `getCurrentUser()` from — Stripe
calls it directly — so it needs that id to know which account the booking
belongs to.
