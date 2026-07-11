export const isStripeConfigured = !!process.env.STRIPE_SECRET_KEY;
export const isPayPalConfigured = !!process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

/** Vision To The World's service fee applied on top of every booking subtotal. */
export const SERVICE_FEE_RATE = 0.1;
