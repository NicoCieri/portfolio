"use client";

import { Button } from "@/components/button";
import { useRef } from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageSelector } from "@/components/language-selector";
import { useLogoJump } from "@/hooks/use-logo-jump";
import { useLocale } from "@/hooks/use-locale";
import { localePaths } from "@/i18n/config";
import { useTranslations } from "@/hooks/use-translations";


export function SiteHeader() {
  const t = useTranslations();
  const { locale } = useLocale();
  const logoRef = useRef<HTMLSpanElement>(null);
  const homeSlotRef = useRef<HTMLSpanElement>(null);
  const awaySlotRef = useRef<HTMLSpanElement>(null);

  const { showAwaySlot, logoMarkStyle } = useLogoJump(logoRef, {
    home: homeSlotRef,
    away: awaySlotRef,
  });

  return (
    <header className="page-shell relative flex min-h-(--header-height) flex-wrap items-center justify-between gap-x-6 gap-y-3 overflow-visible border-b border-border py-5 min-[701px]:py-6">
      <Link
        className="relative inline-flex items-center overflow-visible text-body font-semibold tracking-[-0.025em] whitespace-nowrap"
        href={localePaths[locale]}
        aria-label={t.header.homepageAria}
      >
        <span ref={homeSlotRef} className="relative size-11 shrink-0 overflow-visible">
          <span
            ref={logoRef}
            className="pointer-events-auto absolute inset-0 flex size-11 origin-center items-center justify-center overflow-hidden rounded-2xl bg-(--pop-ink) pb-1 text-[27px] font-bold leading-none tracking-[-0.075em] text-(--pop-paper)"
            style={logoMarkStyle}
            aria-hidden="true"
          >
            nc.
          </span>
        </span>
        <span className="ml-3">Nicolás Cieri</span>
        <span
          ref={awaySlotRef}
          className={showAwaySlot ? "ml-3 size-11 shrink-0" : "h-11 w-0 shrink-0 overflow-hidden"}
          aria-hidden="true"
        />
      </Link>
      <div className="flex items-center gap-2 max-[640px]:w-full max-[640px]:justify-between">
        <nav className="-ml-3 flex flex-wrap gap-0.5 min-[701px]:ml-0 min-[701px]:gap-1" aria-label={t.header.mainNavigation}>
          <Button variant="ghost" size="sm" className="text-nav font-medium min-[701px]:px-4" href="#work">{t.header.work}</Button>
          <Button variant="ghost" size="sm" className="text-nav font-medium min-[701px]:px-4" href="#contact">{t.header.contact}</Button>
        </nav>
        <div className="flex items-center gap-2 max-[640px]:absolute max-[640px]:top-5 max-[640px]:right-0">
          <LanguageSelector />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
