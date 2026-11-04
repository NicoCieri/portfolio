"use client";

import { createContext, type ReactNode } from "react";
import { defaultLocale, type Locale } from "@/i18n/config";

export const LocaleContext = createContext<Locale>(defaultLocale);

export function LocaleProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  return <LocaleContext value={locale}>{children}</LocaleContext>;
}
