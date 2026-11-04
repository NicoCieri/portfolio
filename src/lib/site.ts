import type { Metadata } from "next";
import { localePaths, type Locale } from "@/i18n/config";

export const site = {
  url: "https://nicocieri.dev",
  name: "Nicolás Cieri",
  title: "Nicolás Cieri — Senior Frontend Engineer",
  linkedin: "https://www.linkedin.com/in/nicolas-cieri-salcedo-6b37bb97/",
  descriptions: {
    en: "Nicolás Cieri, Senior Frontend Engineer. 10+ years building thoughtful interfaces for complex products, with experience in ticketing, operational tools and e-commerce.",
    es: "Nicolás Cieri, Senior Frontend Engineer. Más de 10 años construyendo interfaces para productos complejos, con experiencia en ticketing, herramientas de gestión y e-commerce.",
  },
} as const;

export function pageMetadata(locale: Locale): Metadata {
  const path = localePaths[locale];
  const description = site.descriptions[locale];
  const image = {
    url: "/images/social-card.png", width: 1200, height: 630,
    alt: "Nicolás Cieri — Senior Frontend Engineer · React · Next.js · TypeScript",
  };
  return {
    metadataBase: new URL(site.url),
    title: site.title, description,
    alternates: { canonical: path, languages: { en: "/", es: "/es", "x-default": "/" } },
    openGraph: {
      type: "website", url: path, siteName: site.name,
      title: site.title, description,
      locale: locale === "es" ? "es_AR" : "en_US",
      alternateLocale: locale === "es" ? "en_US" : "es_AR",
      images: [image],
    },
    twitter: { card: "summary_large_image", title: site.title, description, images: [image] },
    icons: { icon: [{ url: "/icon.svg", type: "image/svg+xml" }, { url: "/favicon.ico", sizes: "32x32" }], apple: "/apple-touch-icon.png" },
  };
}
