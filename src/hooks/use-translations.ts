"use client";

import { useLocale } from "@/hooks/use-locale";
import { getDictionary, type Dictionary } from "@/i18n";

/** Returns the dictionary of the statically rendered locale document. */
export function useTranslations(): Dictionary {
  const { locale } = useLocale();
  return getDictionary(locale);
}
