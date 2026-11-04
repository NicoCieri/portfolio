import { en, type Dictionary } from "@/i18n/dictionaries/en";
import { es } from "@/i18n/dictionaries/es";
import { defaultLocale, type Locale } from "@/i18n/config";

export type { Dictionary } from "@/i18n/dictionaries/en";

export const dictionaries: Record<Locale, Dictionary> = { en, es };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries[defaultLocale];
}

/**
 * Replaces `{token}` placeholders in a string with the provided values.
 */
export function interpolate(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match,
  );
}
