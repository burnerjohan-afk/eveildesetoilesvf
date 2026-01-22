import { Metadata } from "next";

export const defaultMetadata: Metadata = {
  title: "Éveil des Étoiles - Formatrice petite enfance & Consultante EAJE",
  description:
    "Accompagnement professionnel pour les structures d'accueil petite enfance. Sécurisation, structuration et pilotage qualité.",
  keywords: ["EAJE", "petite enfance", "formation", "consultation", "crèche", "accompagnement"],
  authors: [{ name: "Laetitia CHIN" }],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://eveildesetoiles.fr",
    siteName: "Éveil des Étoiles",
    title: "Éveil des Étoiles - Formatrice petite enfance & Consultante EAJE",
    description:
      "Accompagnement professionnel pour les structures d'accueil petite enfance. Sécurisation, structuration et pilotage qualité.",
  },
};

export function generatePageMetadata(
  title: string,
  description: string,
  path: string = ""
): Metadata {
  return {
    title: `${title} | Éveil des Étoiles`,
    description,
    openGraph: {
      ...defaultMetadata.openGraph,
      title: `${title} | Éveil des Étoiles`,
      description,
      url: `https://eveildesetoiles.fr${path}`,
    },
  };
}

export function generateJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Éveil des Étoiles",
    description:
      "Formatrice petite enfance, EJE et Consultante EAJE. Accompagnement professionnel pour les structures d'accueil petite enfance.",
    provider: {
      "@type": "Person",
      name: "Laetitia CHIN",
      jobTitle: "Formatrice petite enfance / EJE / Consultante EAJE",
    },
    areaServed: "FR",
    serviceType: ["Formation", "Consultation", "Accompagnement EAJE"],
  };
}
