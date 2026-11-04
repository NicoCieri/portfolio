export const locales = ["en", "es"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export function isLocale(value: string | null | undefined): value is Locale {
  return value === "en" || value === "es";
}

export const localeNames: Record<Locale, string> = {
  en: "English",
  es: "Español",
};

export const localeShortNames: Record<Locale, string> = {
  en: "EN",
  es: "ES",
};

export const localePaths: Record<Locale, string> = { en: "/", es: "/es" };
