import type { Dictionary } from "@/lib/i18n/types";

export const fr: Dictionary = {
  nav: {
    services: "Services",
    packages: "Forfaits",
    visa: "Visa et Assistance",
    insurance: "Assurance",
    about: "À propos",
    login: "Connexion",
    signup: "S'inscrire",
  },
  footer: {
    blurb:
      "Une plateforme technologique de voyage en libre-service de nouvelle génération pour rechercher, comparer, réserver et gérer chaque partie de votre voyage.",
    servicesHeading: "Services",
    companyHeading: "Entreprise",
    supportHeading: "Assistance",
    paymentsHeading: "Paiements Sécurisés",
    paymentsBlurb: "Payez comme vous le souhaitez avec des passerelles de paiement mondiales et régionales fiables.",
    company: {
      about: "À propos de nous",
      mission: "Mission et Vision",
      account: "Mon Compte",
      admin: "Administration",
    },
    support: {
      faq: "FAQ",
      visa: "Visa et Assistance Voyage",
      insurance: "Assurance Voyage",
      contact: "Contacter le Support",
      consultant: "Parler à un Conseiller Voyage",
    },
    legal: {
      privacy: "Politique de Confidentialité",
      terms: "Conditions Générales",
      refund: "Politique de Remboursement",
    },
    copyright: "{year} Vision To The World. Tous droits réservés.",
    taglineBottom: "Votre Voyage. Votre Choix. Votre Monde.",
  },
  hero: {
    badge: "Le voyage en libre-service, fait comme il faut",
    titleLine1: "Votre Voyage.",
    titleLine2: "Votre Choix.",
    titleLine3: "Votre Monde.",
    subtitle:
      "Recherchez, comparez, réservez et gérez vols, hôtels, locations de voiture, transferts et forfaits de voyage complets, le tout depuis une seule plateforme numérique, avec une aide experte dès que vous en avez besoin.",
  },
  servicesGrid: {
    eyebrow: "Services Essentiels",
    title: "Tout ce dont votre voyage a besoin, au même endroit",
    description:
      "Que vous voyagiez pour affaires, loisirs, études, en famille, en pèlerinage ou pour l'aventure, planifiez et réservez tout ici.",
    explore: "Découvrir",
  },
  howItWorks: {
    eyebrow: "Expérience en Libre-Service",
    title: "Le contrôle total, de la recherche au voyage",
    description:
      "Un modèle entièrement numérique en libre-service, avec des conseillers voyage professionnels disponibles dès que vous souhaitez un contact humain.",
    steps: [
      {
        title: "Créez un compte",
        description:
          "Inscrivez-vous en quelques secondes et enregistrez les informations de vos voyageurs pour un paiement plus rapide à chaque fois.",
      },
      {
        title: "Recherchez et comparez",
        description:
          "Parcourez vols, hôtels, voitures et forfaits avec des prix et disponibilités en temps réel.",
      },
      {
        title: "Réservez et payez en toute sécurité",
        description: "Choisissez vos options et payez avec Stripe, PayPal ou Cash App.",
      },
      {
        title: "Gérez en toute confiance",
        description:
          "Recevez des confirmations instantanées, téléchargez vos factures et suivez ou gérez vos réservations à tout moment.",
      },
    ],
  },
  paymentPartners: {
    trustLine: "Des paiements sûrs et fiables, où que vous soyez dans le monde",
  },
  testimonials: {
    eyebrow: "La confiance de voyageurs du monde entier",
    title: "Ce que disent nos voyageurs",
    description:
      "De vrais avis de personnes ayant réservé vols, hôtels, forfaits et plus encore avec Vision To The World.",
  },
  missionVision: {
    missionTitle: "Notre Mission",
    missionText:
      "Rendre le voyage simple, accessible et abordable grâce à une plateforme intelligente en libre-service qui connecte les voyageurs aux meilleurs services de voyage au monde.",
    visionTitle: "Notre Vision",
    visionText:
      "Devenir l'une des principales plateformes de voyage numérique au monde, permettant à des millions de personnes d'explorer le monde en toute confiance grâce à une technologie innovante et des expériences client exceptionnelles.",
  },
  cta: {
    title: "Prêt à explorer le monde à votre façon ?",
    description:
      "Créez votre compte gratuit et commencez à planifier votre prochain voyage en quelques minutes, ou contactez un conseiller voyage pour une aide personnalisée.",
    createAccount: "Créer un compte gratuit",
    talkToConsultant: "Parler à un conseiller",
  },
  services: {
    flights: {
      name: "Réservation de Vols",
      tagline: "Volez où vous voulez, à votre façon",
      description:
        "Recherchez et comparez les vols de plusieurs compagnies aériennes avec des prix en temps réel et des billets électroniques instantanés.",
      features: [
        "Recherchez et comparez les vols de plusieurs compagnies aériennes",
        "Réservations aller simple, aller-retour et multi-destinations",
        "Dates de voyage flexibles",
        "Prix et disponibilité en temps réel",
        "Réservation en ligne sécurisée",
        "Livraison instantanée du billet électronique",
      ],
    },
    hotels: {
      name: "Réservation d'Hôtels",
      tagline: "Séjournez où le voyage vous mène",
      description:
        "Découvrez et réservez des hôtels dans le monde entier avec disponibilité en temps réel et confirmation instantanée.",
      features: [
        "Découvrez des hôtels dans le monde entier",
        "Comparez les options de chambres et les prix",
        "Consultez équipements, photos et avis des clients",
        "Réservez instantanément avec disponibilité en temps réel",
        "Recevez une confirmation de réservation immédiate",
      ],
    },
    "car-rental": {
      name: "Location de Voiture",
      tagline: "Conduisez selon votre propre itinéraire",
      description:
        "Recherchez des véhicules de location dans des destinations du monde entier et réservez en ligne en toute sécurité.",
      features: [
        "Recherchez des véhicules de location dans plusieurs destinations",
        "Comparez les loueurs et catégories de véhicules",
        "Options flexibles de prise en charge et de retour",
        "Réservations en ligne sécurisées",
      ],
    },
    "airport-transfers": {
      name: "Transferts Aéroport",
      tagline: "Un départ et une arrivée sans accroc",
      description: "Réservez des services fiables de prise en charge et de dépose à l'aéroport, programmés à l'avance.",
      features: [
        "Réservez des services fiables de prise en charge et de dépose à l'aéroport",
        "Planifiez les transferts à l'avance",
        "Suivez les détails de votre réservation",
      ],
    },
    packages: {
      name: "Forfaits Voyage",
      tagline: "Des voyages sur mesure, prêts à réserver",
      description: "Forfaits vacances, lune de miel, famille, groupe, éducatifs et voyages d'affaires.",
      features: [
        "Forfaits vacances",
        "Forfaits lune de miel",
        "Vacances en famille",
        "Voyages de groupe",
        "Circuits éducatifs",
        "Forfaits voyage d'affaires",
      ],
    },
    "visa-assistance": {
      name: "Visa et Assistance Voyage",
      tagline: "De la clarté avant de partir",
      description: "Informations sur les visas, aide à la constitution des dossiers et exigences d'entrée à destination.",
      features: [
        "Informations et conseils sur les visas",
        "Aide à la documentation de voyage",
        "Exigences de destination",
        "Réglementations d'entrée",
      ],
    },
    "travel-insurance": {
      name: "Assurance Voyage",
      tagline: "Voyagez en toute confiance",
      description: "Assurance optionnelle lors de la réservation, avec couverture médicale et protection en cas d'annulation.",
      features: [
        "Assurance optionnelle lors de la réservation",
        "Options de couverture médicale",
        "Protection en cas d'annulation de voyage",
        "Assistance d'urgence en voyage",
      ],
    },
  },
};
