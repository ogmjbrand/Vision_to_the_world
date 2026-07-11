export const isResendConfigured = !!process.env.RESEND_API_KEY;

/**
 * "visiontotheworld.com" is registered in Resend but not yet DNS-verified,
 * so sending from an @visiontotheworld.com address will fail until that's
 * done. Falls back to Resend's shared sandbox sender, which works without
 * domain verification. Once the domain shows "verified" in the Resend
 * dashboard, set RESEND_FROM_EMAIL to something like
 * "Vision To The World <bookings@visiontotheworld.com>".
 */
export const RESEND_FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL ?? "Vision To The World <onboarding@resend.dev>";
