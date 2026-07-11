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
  /** Not yet provided — populate once real profile URLs are shared. */
  social: {
    facebook: null as string | null,
    instagram: null as string | null,
    tiktok: null as string | null,
    youtube: null as string | null,
  },
};

export const fullAddress = `${siteConfig.address.street}, ${siteConfig.address.city}, ${siteConfig.address.state} ${siteConfig.address.zip}`;
