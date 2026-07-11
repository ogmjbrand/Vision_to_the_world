import type { Dictionary } from "@/lib/i18n/types";

export const es: Dictionary = {
  nav: {
    services: "Servicios",
    packages: "Paquetes",
    visa: "Visado y Asistencia",
    insurance: "Seguro",
    about: "Nosotros",
    login: "Iniciar sesión",
    signup: "Registrarse",
  },
  footer: {
    blurb:
      "Una plataforma tecnológica de viajes de autoservicio de nueva generación para buscar, comparar, reservar y gestionar cada parte de tu viaje.",
    servicesHeading: "Servicios",
    companyHeading: "Empresa",
    supportHeading: "Soporte",
    paymentsHeading: "Pagos Seguros",
    paymentsBlurb: "Paga como prefieras con pasarelas de pago globales y regionales de confianza.",
    company: {
      about: "Sobre Nosotros",
      mission: "Misión y Visión",
      account: "Mi Cuenta",
      admin: "Administración",
    },
    support: {
      faq: "Preguntas Frecuentes",
      visa: "Visado y Asistencia de Viaje",
      insurance: "Seguro de Viaje",
      contact: "Contactar Soporte",
      consultant: "Hablar con un Asesor de Viajes",
    },
    legal: {
      privacy: "Política de Privacidad",
      terms: "Términos y Condiciones",
      refund: "Política de Reembolsos",
    },
    copyright: "{year} Vision To The World. Todos los derechos reservados.",
    taglineBottom: "Tu Viaje. Tu Elección. Tu Mundo.",
  },
  hero: {
    badge: "Viajes de autoservicio, hechos bien",
    titleLine1: "Tu Viaje.",
    titleLine2: "Tu Elección.",
    titleLine3: "Tu Mundo.",
    subtitle:
      "Busca, compara, reserva y gestiona vuelos, hoteles, alquiler de autos, traslados y paquetes de viaje completos, todo desde una sola plataforma digital, con ayuda experta siempre que la necesites.",
  },
  servicesGrid: {
    eyebrow: "Servicios Principales",
    title: "Todo lo que tu viaje necesita, en un solo lugar",
    description:
      "Ya sea que viajes por negocios, ocio, estudios, familia, peregrinación o aventura, planifica y reserva todo aquí.",
    explore: "Explorar",
  },
  howItWorks: {
    eyebrow: "Experiencia de Autoservicio",
    title: "Control total, de la búsqueda al viaje",
    description:
      "Un modelo de autoservicio totalmente digital, con asesores de viaje profesionales disponibles siempre que quieras un toque humano.",
    steps: [
      {
        title: "Crea una cuenta",
        description:
          "Regístrate en segundos y guarda los datos de tus viajeros para un check-out más rápido cada vez.",
      },
      {
        title: "Busca y compara",
        description:
          "Explora vuelos, hoteles, autos y paquetes con precios y disponibilidad en tiempo real.",
      },
      {
        title: "Reserva y paga con seguridad",
        description: "Elige tus opciones y paga con Stripe, PayPal o Cash App.",
      },
      {
        title: "Gestiona con confianza",
        description:
          "Recibe confirmaciones al instante, descarga facturas y controla o gestiona tus reservas en cualquier momento.",
      },
    ],
  },
  paymentPartners: {
    trustLine: "Pagos seguros y confiables desde cualquier parte del mundo",
  },
  testimonials: {
    eyebrow: "La confianza de viajeros de todo el mundo",
    title: "Lo que dicen nuestros viajeros",
    description:
      "Opiniones reales de personas que reservaron vuelos, hoteles, paquetes y más a través de Vision To The World.",
  },
  missionVision: {
    missionTitle: "Nuestra Misión",
    missionText:
      "Hacer que viajar sea simple, accesible y asequible mediante una plataforma inteligente de autoservicio que conecta a los viajeros con los mejores servicios de viaje del mundo.",
    visionTitle: "Nuestra Visión",
    visionText:
      "Convertirnos en una de las plataformas de viajes digitales líderes del mundo, permitiendo que millones de personas exploren el mundo con confianza gracias a tecnología innovadora y experiencias excepcionales.",
  },
  cta: {
    title: "¿Listo para explorar el mundo a tu manera?",
    description:
      "Crea tu cuenta gratuita y empieza a planear tu próximo viaje en minutos, o contacta a un asesor de viajes para ayuda personalizada.",
    createAccount: "Crear cuenta gratis",
    talkToConsultant: "Hablar con un asesor",
  },
  services: {
    flights: {
      name: "Reserva de Vuelos",
      tagline: "Vuela a donde quieras, a tu manera",
      description:
        "Busca y compara vuelos de múltiples aerolíneas con precios en tiempo real y boletos electrónicos instantáneos.",
      features: [
        "Busca y compara vuelos de múltiples aerolíneas",
        "Reservas de ida, ida y vuelta y multidestino",
        "Fechas de viaje flexibles",
        "Precios y disponibilidad en tiempo real",
        "Reserva en línea segura",
        "Entrega instantánea de boletos electrónicos",
      ],
    },
    hotels: {
      name: "Reserva de Hoteles",
      tagline: "Hospédate donde te lleve el viaje",
      description:
        "Descubre y reserva hoteles en todo el mundo con disponibilidad en tiempo real y confirmación instantánea.",
      features: [
        "Descubre hoteles en todo el mundo",
        "Compara opciones de habitación y precios",
        "Consulta comodidades, fotos y reseñas de huéspedes",
        "Reserva al instante con disponibilidad en tiempo real",
        "Recibe confirmación de reserva inmediata",
      ],
    },
    "car-rental": {
      name: "Alquiler de Autos",
      tagline: "Conduce tu propio itinerario",
      description: "Busca vehículos de alquiler en destinos de todo el mundo y reserva de forma segura en línea.",
      features: [
        "Busca vehículos de alquiler en múltiples destinos",
        "Compara compañías de alquiler y categorías de vehículos",
        "Opciones flexibles de recogida y devolución",
        "Reservas en línea seguras",
      ],
    },
    "airport-transfers": {
      name: "Traslados al Aeropuerto",
      tagline: "Un inicio y final sin contratiempos",
      description: "Reserva servicios confiables de recogida y traslado al aeropuerto, programados con anticipación.",
      features: [
        "Reserva servicios confiables de recogida y traslado al aeropuerto",
        "Programa traslados con anticipación",
        "Rastrea los detalles de tu reserva",
      ],
    },
    packages: {
      name: "Paquetes de Viaje",
      tagline: "Viajes seleccionados, listos para reservar",
      description: "Paquetes de vacaciones, luna de miel, familia, grupo, educativos y de viaje corporativo.",
      features: [
        "Paquetes vacacionales",
        "Paquetes de luna de miel",
        "Vacaciones familiares",
        "Viajes en grupo",
        "Tours educativos",
        "Paquetes de viaje corporativo",
      ],
    },
    "visa-assistance": {
      name: "Visado y Asistencia de Viaje",
      tagline: "Claridad antes de partir",
      description: "Información sobre visados, apoyo con documentación y requisitos de entrada al destino.",
      features: [
        "Información y orientación sobre visados",
        "Apoyo con la documentación de viaje",
        "Requisitos del destino",
        "Normas de entrada",
      ],
    },
    "travel-insurance": {
      name: "Seguro de Viaje",
      tagline: "Viaja con confianza",
      description: "Seguro opcional al momento de reservar, con cobertura médica y protección de cancelación.",
      features: [
        "Seguro opcional al reservar",
        "Opciones de cobertura médica",
        "Protección por cancelación de viaje",
        "Asistencia en emergencias de viaje",
      ],
    },
  },
};
