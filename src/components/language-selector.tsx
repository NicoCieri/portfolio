"use client";

import { Button } from "@/components/button";

import { useLocale } from "@/hooks/use-locale";
import { useTranslations } from "@/hooks/use-translations";
import { locales, localeNames, localeShortNames, localePaths, type Locale } from "@/i18n/config";

const labelClass =
  "inline-flex h-full min-h-9 min-w-9 items-center justify-center px-3 text-meta font-semibold uppercase tracking-[0.04em]";

const thumbMotion =
  "duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none";

const shellClass = [
  "relative isolate inline-grid grid-cols-2 rounded-full border border-border bg-surface/50 p-0.5",
  "transition-colors duration-(--motion-fast)",
  "hover:bg-surface active:bg-foreground/10",
  "forced-colors:hover:bg-Highlight forced-colors:active:bg-Highlight",
].join(" ");

const optionClass = [
  labelClass,
  "relative z-1 cursor-pointer scroll-mb-0 rounded-full text-secondary transition-colors duration-(--motion-fast)",
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--focus-ring)",
  "forced-colors:aria-[current=page]:outline-2 forced-colors:aria-[current=page]:-outline-offset-2",
].join(" ");

function LanguageLabel({ option }: { option: Locale }) {
  return <span className={labelClass}>{localeShortNames[option]}</span>;
}

export function LanguageSelector({
  className = "",
  scrollToBottomOnChange = false,
}: {
  className?: string;
  scrollToBottomOnChange?: boolean;
}) {
  const { locale } = useLocale();
  const t = useTranslations();
  const spanish = locale === "es";

  return (
    <div role="group" aria-label={t.languageSelector.ariaLabel} className={`${shellClass} ${className}`}>
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute top-0.5 bottom-0.5 left-0.5 w-[calc(50%-0.125rem)] rounded-full bg-accent-lime transition-transform forced-colors:hidden ${spanish ? "translate-x-full" : "translate-x-0"} ${thumbMotion}`}
      />
      {locales.map((option) => (
        <Button variant="custom" size="custom"
          key={option}
          href={`${localePaths[option]}${scrollToBottomOnChange ? "#contact" : ""}`}
          hrefLang={option}
          lang={option}
          aria-current={locale === option ? "page" : undefined}
          aria-label={localeNames[option]}
          title={localeNames[option]}
          className={optionClass}
        >
          {localeShortNames[option]}
        </Button>
      ))}
      {/* A clipped copy keeps the label under the sliding pill in the inverse color. */}
      <span
        aria-hidden="true"
        inert
        className={`pointer-events-none absolute inset-0.5 z-2 grid grid-cols-2 text-(--on-accent-lime) transition-[clip-path] forced-colors:hidden ${spanish ? "[clip-path:inset(0_0_0_50%_round_999px)]" : "[clip-path:inset(0_50%_0_0_round_999px)]"} ${thumbMotion}`}
      >
        {locales.map((option) => (
          <LanguageLabel key={option} option={option} />
        ))}
      </span>
    </div>
  );
}
