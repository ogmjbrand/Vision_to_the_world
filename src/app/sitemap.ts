import type { MetadataRoute } from "next";
import { services } from "@/lib/data/services";
import { siteUrl } from "@/lib/data/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = [
    { path: "", priority: 1, frequency: "daily" as const },
    { path: "/about", priority: 0.6, frequency: "monthly" as const },
    { path: "/contact", priority: 0.6, frequency: "monthly" as const },
    { path: "/faq", priority: 0.6, frequency: "monthly" as const },
    { path: "/privacy-policy", priority: 0.3, frequency: "yearly" as const },
    { path: "/terms-conditions", priority: 0.3, frequency: "yearly" as const },
    { path: "/refund-policy", priority: 0.3, frequency: "yearly" as const },
  ];

  const serviceRoutes = services.map((service) => ({
    path: `/${service.slug}`,
    priority: 0.9,
    frequency: "weekly" as const,
  }));

  return [...staticRoutes, ...serviceRoutes].map((route) => ({
    url: `${siteUrl}${route.path}`,
    lastModified: now,
    changeFrequency: route.frequency,
    priority: route.priority,
  }));
}
