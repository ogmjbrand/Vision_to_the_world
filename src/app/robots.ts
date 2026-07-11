import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/data/site-config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dashboard", "/admin", "/checkout", "/api"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
