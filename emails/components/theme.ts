/**
 * Self-contained brand constants for the emails/ workspace.
 *
 * Deliberately not imported from src/lib/data/site-config.ts: the
 * react-email dev server (`npm run email:dev`) bundles this folder on its
 * own, outside of Next's build pipeline, so pulling in app-side modules
 * risks resolution issues. A little duplication here keeps the email
 * templates portable and independent of the app build.
 */

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://vision-to-the-world-i2wb.vercel.app";

export const brand = {
  name: "Vision To The World",
  tagline: "Your Journey. Your Choice. Your World.",
  logoUrl: `${siteUrl}/brand/logo.png`,
  logoWidth: 168,
  logoHeight: 98,
};

export const contact = {
  address: "571 Ontario Street, Buffalo, NY 14207",
  email: "visiontothew@gmail.com",
  phones: ["+1 (716) 430-5246", "+20 114 371 9505"],
  social: [
    { label: "Facebook", href: "https://www.facebook.com/share/17AzkFkdWi/" },
    {
      label: "Instagram",
      href: "https://www.instagram.com/vision_to_the_world/profilecard/?igsh=MXdzd2hjM2djejI5NQ==",
    },
    { label: "TikTok", href: "https://www.tiktok.com/@vision.to.the.wor3?_t=ZT-8yPyrXg2CDn&_r=1" },
    { label: "YouTube", href: "https://www.youtube.com/@visiontotheworld" },
  ],
};

/** Colors sampled from the actual logo mark (green arc + gold wordmark), not the site's muted UI palette — email branding stays true to the logo. */
export const colors = {
  green: "#14A03C",
  greenDark: "#0E7C2C",
  gold: "#F1BD33",
  goldLight: "#FFDA6A",
  ink: "#0D0D0D",
  white: "#FFFFFF",
  pageBg: "#F4F6F8",
  ice: "#E1F0F5",
  textMuted: "#5B6B7A",
  border: "#E4E9ED",
};

export function formatCurrency(amount: number, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}
