"use client";

import { useTranslations } from "@/hooks/use-translations";

export function SkipToContent() {
  const t = useTranslations();
  return (
    <a className="fixed top-3 left-4 z-50 rounded-full -translate-y-[160%] bg-foreground px-[18px] py-3 text-background focus:translate-y-0" href="#main-content">
      {t.common.skipToContent}
    </a>
  );
}
