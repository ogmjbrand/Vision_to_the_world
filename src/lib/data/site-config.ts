type SocialLinks = {
  facebook: string | null;
  instagram: string | null;
  tiktok: string | null;
  youtube: string | null;
};

export const siteConfig = {
  name: "Vision To The World",
  tagline: "Your Journey. Your Choice. Your World.",
  address: {
    street: "571 Ontario Street",
    city: "Buffalo",
    state: "NY",
    zip: "14207",
    country: "US",
  },
  phones: ["+1 (716) 430-5246", "+20 114 371 9505"],
  whatsappUrl: "https://wa.me/17164305246",
  email: "visiontothew@gmail.com",
  cashAppTag: "$LFFLLC24",
  social: {
    facebook: "https://www.facebook.com/share/17AzkFkdWi/",
    instagram:
      "https://www.instagram.com/vision_to_the_world/profilecard/?igsh=MXdzd2hjM2djejI5NQ==",
    tiktok: "https://www.tiktok.com/@vision.to.the.wor3?_t=ZT-8yPyrXg2CDn&_r=1",
    youtube: "https://www.youtube.com/@visiontotheworld",
  } satisfies SocialLinks,
};

export const fullAddress = `${siteConfig.address.street}, ${siteConfig.address.city}, ${siteConfig.address.state} ${siteConfig.address.zip}`;
