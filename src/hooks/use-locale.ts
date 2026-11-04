"use client";

import { useContext } from "react";
import { LocaleContext } from "@/components/locale-provider";

export function useLocale() {
  return { locale: useContext(LocaleContext) };
}
