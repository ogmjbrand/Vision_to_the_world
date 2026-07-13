import type { ComponentType } from "react";
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa6";
import { siteConfig } from "@/lib/data/site-config";

export type SocialLink = {
  key: keyof typeof siteConfig.social;
  label: string;
  Icon: ComponentType<{ className?: string; size?: number }>;
  url: string | null;
};

export const socialLinks: SocialLink[] = [
  { key: "facebook", label: "Facebook", Icon: FaFacebookF, url: siteConfig.social.facebook },
  { key: "instagram", label: "Instagram", Icon: FaInstagram, url: siteConfig.social.instagram },
  { key: "tiktok", label: "TikTok", Icon: FaTiktok, url: siteConfig.social.tiktok },
  { key: "youtube", label: "YouTube", Icon: FaYoutube, url: siteConfig.social.youtube },
];
