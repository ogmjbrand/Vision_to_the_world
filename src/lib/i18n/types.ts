export type ServiceCopy = {
  name: string;
  tagline: string;
  description: string;
  features: string[];
};

export type Dictionary = {
  nav: {
    services: string;
    packages: string;
    visa: string;
    insurance: string;
    about: string;
    login: string;
    signup: string;
  };
  footer: {
    blurb: string;
    servicesHeading: string;
    companyHeading: string;
    supportHeading: string;
    paymentsHeading: string;
    paymentsBlurb: string;
    company: { about: string; mission: string; account: string; admin: string };
    support: { faq: string; visa: string; insurance: string; contact: string; consultant: string };
    legal: { privacy: string; terms: string; refund: string };
    copyright: string;
    taglineBottom: string;
  };
  hero: {
    badge: string;
    titleLine1: string;
    titleLine2: string;
    titleLine3: string;
    subtitle: string;
  };
  servicesGrid: {
    eyebrow: string;
    title: string;
    description: string;
    explore: string;
  };
  howItWorks: {
    eyebrow: string;
    title: string;
    description: string;
    steps: { title: string; description: string }[];
  };
  paymentPartners: {
    trustLine: string;
  };
  testimonials: {
    eyebrow: string;
    title: string;
    description: string;
  };
  missionVision: {
    missionTitle: string;
    missionText: string;
    visionTitle: string;
    visionText: string;
  };
  cta: {
    title: string;
    description: string;
    createAccount: string;
    talkToConsultant: string;
  };
  services: {
    flights: ServiceCopy;
    hotels: ServiceCopy;
    "car-rental": ServiceCopy;
    "airport-transfers": ServiceCopy;
    packages: ServiceCopy;
    "visa-assistance": ServiceCopy;
    "travel-insurance": ServiceCopy;
  };
};

export function getServiceCopy(dict: Dictionary, slug: string): ServiceCopy {
  return (dict.services as Record<string, ServiceCopy>)[slug];
}
