# Email workflow setup

Everything in this doc is a **dashboard/DNS step that can't be done from code** —
run through it once per environment (staging, production) after deploying the
code changes that reference it.

## 1. New environment variables

Add these alongside the existing Resend/Supabase vars (see `.env.example`):

| Variable | Where it's used | Notes |
|---|---|---|
| `SUPABASE_SERVICE_ROLE_KEY` | trip-reminder cron, newsletter send, email audit log | Supabase dashboard → Project Settings → API → `service_role` secret. **Never expose to the browser** — only read in server-only files (`src/lib/supabase/admin.ts`). |
| `CRON_SECRET` | `src/app/api/cron/trip-reminders/route.ts` | Any long random string. Vercel Cron automatically sends `Authorization: Bearer $CRON_SECRET` to routes listed in `vercel.json` when this env var is set — no extra Vercel config needed beyond setting the var. |
| `UNSUBSCRIBE_SECRET` | newsletter one-click unsubscribe links | Optional — falls back to `RESEND_API_KEY` if unset. Set an independent value in production. |

## 2. Run the new migration

`supabase/migrations/20260712133131_email_workflows.sql` adds:
- `profiles.welcome_email_sent_at`, `profiles.newsletter_opt_in`
- `bookings.reminder_7d_sent_at`, `bookings.reminder_24h_sent_at` (+ an index on `travel_date`)
- `email_logs` and `newsletter_campaigns` tables

Apply it the same way the initial schema was applied — `supabase db push` or paste it into the SQL Editor.

## 3. Populate `bookings.travel_date`

The trip-reminder cron only finds bookings where `travel_date` is set. As of
this change, flights/hotels/car-rental/airport-transfers all pass a real date
through checkout automatically (from whatever date the customer searched
with). Packages, visa assistance, and travel insurance still have no date
concept — those bookings simply won't get a trip reminder, which is expected.

## 4. Point Supabase's "Confirm signup" email at `/auth/confirm`

This is the one Supabase Auth email template that *does* need to change,
so the app's own Welcome-email hook fires. Everything else (password reset,
magic links) stays exactly as Supabase sends it today — nothing to change there.

Supabase Dashboard → Authentication → Email Templates → **Confirm signup** →
edit the template's link so it points at your app instead of Supabase's
default verify page. Concretely, change:

```
{{ .ConfirmationURL }}
```

to:

```
{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=signup
```

(Authentication → URL Configuration → make sure **Site URL** is set to your
real deployed URL, and that URL is also in the **Redirect URLs** allow-list.)

## 5. Configure Supabase Auth SMTP to send through Resend

Recommended over Supabase's default auth mailer (low daily send limit, not
your domain): Supabase Dashboard → Authentication → Settings → SMTP Settings
→ enable custom SMTP:

- Host: `smtp.resend.com`
- Port: `465` (or `587`)
- Username: `resend`
- Password: a Resend API key (Resend dashboard → API Keys — a *separate* key
  from `RESEND_API_KEY` is fine, or reuse the same one)
- Sender email: an address on your verified sending domain (see below)

This covers password reset, magic link, and (if you skip step 4) signup
confirmation emails too — they'll all be Resend-delivered but still
Supabase-templated, per the "leave auth emails in Supabase" recommendation.

## 6. Verify the sending domain in Resend

`src/lib/resend/config.ts` currently falls back to Resend's shared sandbox
sender (`onboarding@resend.dev`) because the comment there notes
`visiontotheworld.com` isn't DNS-verified yet. Until it is, every app email
(welcome, booking confirmation, invoice, trip reminder, newsletter, contact)
sends from the sandbox address, which is fine for testing but will look
unbranded and may hit spam filters at real volume.

Resend Dashboard → Domains → Add Domain → add the DNS records it gives you
(SPF/DKIM, typically 2-3 TXT/CNAME records) at your DNS provider → wait for
"Verified". Then set:

```
RESEND_FROM_EMAIL="Vision To The World <bookings@visiontotheworld.com>"
```

## 7. Enable the Vercel Cron

`vercel.json` declares a daily cron at `13:00 UTC` (~9am ET) hitting
`/api/cron/trip-reminders`. Vercel Cron is enabled automatically on deploy
for projects on a plan that supports it — no dashboard toggle needed beyond
having `CRON_SECRET` set (step 1). Confirm it's registered under the
project's **Settings → Cron Jobs** tab after deploying.

If you're not on Vercel, any external scheduler (GitHub Actions cron,
cron-job.org, etc.) can hit the same route — just send
`Authorization: Bearer $CRON_SECRET` once a day.

## 8. End-to-end test checklist

Once the above is done:
- [ ] Sign up a test account, confirm the email → Welcome email arrives, logo renders, `profiles.welcome_email_sent_at` is set.
- [ ] Complete a real (or Stripe test-mode) booking → Booking Confirmation + Invoice both arrive.
- [ ] Manually set a test booking's `travel_date` to 7 days out, hit `/api/cron/trip-reminders` with the right bearer token → Trip Reminder arrives, `reminder_7d_sent_at` is set, running it again doesn't re-send.
- [ ] Send a test newsletter campaign from `/admin/newsletter` as an admin user → email arrives, unsubscribe link works, `newsletter_campaigns` row is written.
- [ ] Check the `email_logs` table after each of the above — one row per send attempt, `status = 'sent'`.
