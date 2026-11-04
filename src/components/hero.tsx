"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArgentinaFlag } from "@/components/argentina-flag";
import { BuenosAiresClock } from "@/components/buenos-aires-clock";
import { HeroBackground } from "@/components/hero-background";
import { useHeroPortraitParallax } from "@/hooks/use-hero-portrait-parallax";
import { useTranslations } from "@/hooks/use-translations";
import { Button } from "@/components/button";

export function Hero() {
  const t = useTranslations();
  const portraitStageRef = useRef<HTMLDivElement>(null);
  const portraitDiscRef = useRef<HTMLDivElement>(null);
  useHeroPortraitParallax(portraitStageRef, portraitDiscRef);

  return (
    <section className="relative isolate" id="about" aria-labelledby="hero-heading">
      <HeroBackground />
      <div data-hero-content className="page-shell relative flex min-h-[calc(100dvh-var(--header-height))] flex-col">
      <div className="pt-8 min-[701px]:pt-[clamp(40px,7svh,80px)]">
        <p className="mb-4 inline-flex items-center gap-2.5 rounded-full border border-border min-[701px]:border-foreground/15 bg-surface min-[701px]:bg-surface/65 px-4 py-2 text-meta font-medium min-[701px]:mb-8">
          <span className="size-2 shrink-0 rounded-full bg-accent" aria-hidden="true" />{t.hero.badge}
        </p>
        <div className="grid gap-4 min-[701px]:gap-8 min-[901px]:grid-cols-[1.35fr_1fr] min-[901px]:items-center min-[901px]:gap-10">
          <h1 className="max-w-[16ch] text-display leading-(--leading-display) font-bold tracking-[-0.065em]" id="hero-heading">
            <span className="block">{t.hero.headingLine1}</span>
            <span className="block">{t.hero.headingLine2}</span>
            <span className="block text-accent">{t.hero.headingLine3}</span>
          </h1>
          <div className="pb-1">
            <div
              ref={portraitStageRef}
              className="relative mx-auto mb-5 size-32 min-[701px]:[perspective:700px] min-[701px]:size-44 min-[901px]:size-52"
            >
              <div
                ref={portraitDiscRef}
                className="relative size-full overflow-hidden rounded-full border-2 border-(--hero-portrait-border) min-[701px]:[transform-style:preserve-3d] min-[701px]:will-change-transform"
              >
                <div aria-hidden="true" className="max-[700px]:hidden absolute inset-0 rounded-full bg-[radial-gradient(circle_at_35%_30%,var(--accent-lime),var(--accent)_75%)] opacity-25" />
                <Image
                  src="/images/nicolas-hero.webp"
                  alt={t.hero.imageAlt}
                  width={640}
                  height={616}
                  sizes="(min-width: 901px) 208px, (min-width: 701px) 176px, 128px"
                  preload
                  className="relative size-full -scale-x-100 object-cover object-top"
                />
              </div>
            </div>
            <p className="max-w-[36ch] text-[clamp(20px,1.9vw,26px)] leading-[1.5] tracking-[-0.02em] text-secondary">
              <span className="font-semibold text-foreground">{t.hero.introName}</span>{t.hero.introRest}
            </p>
          </div>
        </div>
        <dl className="mt-5 grid grid-cols-2 gap-5 border-t border-border pt-4 min-[801px]:mt-8 min-[801px]:gap-10">
          <div className="min-w-0">
            <dt className="text-small font-medium text-secondary min-[701px]:text-body">{t.hero.basedInLabel}</dt>
            <dd className="mt-2 text-[clamp(18px,1.8vw,24px)] leading-[1.3] font-semibold tracking-[-0.025em]">
              {t.hero.basedInCity}<span className="text-secondary">{t.hero.basedInCountry}</span>
              <ArgentinaFlag className="ml-2 inline-block h-[0.85em] w-auto align-[-0.1em]" />
              <span className="mt-1.5 block text-small font-normal tracking-normal text-secondary min-[701px]:ml-3 min-[701px]:inline-block min-[701px]:text-body">{t.hero.basedInTimezone}</span>
              <BuenosAiresClock
                label={t.hero.localTimeLabel}
                className="mt-2 block text-small tracking-normal text-secondary min-[701px]:text-body"
              />
            </dd>
          </div>
          <div className="min-w-0 min-[901px]:border-l min-[901px]:border-border min-[901px]:pl-10">
            <dt className="text-small font-medium text-secondary min-[701px]:text-body">{t.hero.experienceLabel}</dt>
            <dd className="mt-2 text-[clamp(18px,1.8vw,24px)] leading-[1.3] font-semibold tracking-[-0.025em]">
              {t.hero.experienceValue}
              <span className="mt-1.5 block text-small font-normal tracking-normal text-secondary min-[701px]:ml-3 min-[701px]:inline-block min-[701px]:text-body">{t.hero.experienceNote}</span>
              <ul className="mt-4 flex list-none flex-wrap gap-x-4 gap-y-2 p-0">
                {t.hero.skills.map((skill) => (
                  <li key={skill.id} className="inline-flex items-center gap-2 text-small font-medium tracking-normal text-secondary">
                    <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-accent" />
                    {skill.label}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        </dl>
      </div>
      <div className="flex min-h-32 flex-1 items-center justify-center py-6">
        <Button
          href="#work"
          className="max-w-full shrink-0 text-center"
        >
          {t.hero.exploreCta}
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="max-[700px]:animate-none! cta-arrow-bob size-5 shrink-0 animate-[cta-arrow-bob_1.1s_ease-in-out_infinite] group-hover/action:animate-[cta-arrow-bob_0.7s_ease-in-out_infinite]">
            <path d="M12 4v16m-6-6 6 6 6-6" />
          </svg>
        </Button>
      </div>
      </div>
    </section>
  );
}
