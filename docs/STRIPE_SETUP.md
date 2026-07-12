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
- Events to send: `checkout.session.completed`, `payment_intent.succeeded`,
  and `charge.refunded` (all three required — the first records the
  booking and is the one that normally does the work; the second is a
  backstop that re-runs the exact same fulfillment if the first is ever
  lost in transit, so it's a no-op almost all the time; the third keeps
  `payments`/`bookings` status in sync when a refund is issued, whether
  from the admin panel's Stripe Dashboard link or directly in Stripe)

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
webhook** → try `checkout.session.completed`, `payment_intent.succeeded`,
and `charge.refunded` in turn. Check the endpoint's request log there for a
`200` on each. `payment_intent.succeeded` on its own (without a matching
Checkout Session) is expected to return `200` and do nothing — it only acts
when it can find the session that payment_intent belongs to.

For a real end-to-end test: complete an actual Stripe checkout, then check
`bookings`/`payments`/`invoices` in Supabase and the two emails in your
inbox. Both the webhook and the success page will attempt to record the
same booking — that's expected; `bookings.stripe_session_id` is
unique-constrained, so only the first to arrive actually inserts anything,
and the emails only send once. Then issue a refund from the Stripe
Dashboard for that payment and confirm the matching `payments` row flips to
`refunded` (and `bookings` to `cancelled`, for a full refund) within a few
seconds.

## Live mode vs. test mode

Stripe treats test and live payments as two separate environments, and this
trips people up more than anything else here:

- **API keys are mode-scoped.** `STRIPE_SECRET_KEY` must be the **live**
  secret key (`sk_live_...`) in Vercel's Production env for real charges to
  go through — `sk_test_...` will only ever create test-mode sessions that
  show up in Stripe's Test mode dashboard, never charge a real card, and
  never appear in Live mode reporting.
- **Webhook endpoints are mode-scoped too.** An endpoint created while the
  Dashboard's mode toggle (top-left) is set to Test only receives test-mode
  events. It will not fire for a real, live payment, no matter how it's
  configured. You need a **second, separate endpoint** created while toggled
  to **Live** — same URL, same three events — and its **own** signing secret.
- Whichever signing secret you copied in step 1, make sure it came from the
  endpoint you created under the mode matching `STRIPE_SECRET_KEY`. A
  live secret key paired with a test-mode endpoint's `STRIPE_WEBHOOK_SECRET`
  means real payments succeed on Stripe's side but the webhook silently
  fails signature verification (visible in this project's server logs as
  `[webhook:stripe] signature verification failed`) and no booking or email
  ever fires — the customer is charged with nothing recorded.

## Why the checkout session also needed a change

`src/app/api/checkout/stripe/route.ts` now requires the customer to be
signed in when starting checkout (previously it accepted the request from
anyone) and stamps their user id into the Stripe session's `metadata`. The
webhook has no browser session to read `getCurrentUser()` from — Stripe
calls it directly — so it needs that id to know which account the booking
belongs to.
