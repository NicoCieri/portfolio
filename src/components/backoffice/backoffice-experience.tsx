"use client";

import { viewportReflowClass } from "@/components/scene-classes";

import { SectionAtmosphere } from "@/components/section-atmosphere";
import { BackofficeScrollScene } from "@/components/backoffice/backoffice-scroll-scene";
import { OperationsIllustration } from "@/components/backoffice/operations-illustration";
import { DashboardBackground } from "@/components/backoffice/dashboard-background";
import { useTranslations } from "@/hooks/use-translations";

export function BackofficeExperience() {
  const t = useTranslations().backoffice;
  return (
    <>
    <BackofficeScrollScene>
      <div data-backoffice-viewport className={`${viewportReflowClass} isolate sticky top-0 flex h-[calc(100svh-88px-env(safe-area-inset-bottom))] min-h-[min(620px,calc(100svh-88px-env(safe-area-inset-bottom)))] flex-col justify-center gap-6 py-8 min-[701px]:gap-5 min-[701px]:py-5 motion-reduce:static motion-reduce:h-auto`}>
        <SectionAtmosphere tone="mint" />
        <DashboardBackground />
      <header className="page-shell">
        <p className="text-meta font-medium text-secondary">{t.eyebrow}</p>
        <div className="mt-3 grid gap-4 min-[901px]:grid-cols-[1.15fr_1fr] min-[901px]:gap-16">
          <h2 aria-label={`${t.headingLine1} ${t.headingAccent}`} id="backoffice-heading" className="text-[clamp(32px,3.8vw,48px)] leading-[1.08] font-bold tracking-[-0.045em]">{t.headingLine1}<br />{" "}<span className="text-accent">{t.headingAccent}</span></h2>
          <p id="backoffice-description" className="max-w-[44ch] text-body leading-relaxed text-secondary min-[701px]:text-lead">{t.description}</p>
        </div>
      </header>
      <figure className="page-shell min-[701px]:max-w-[min(1100px,calc((100svh-428px)*2.12))]">
        <OperationsIllustration />
        <figcaption className="mt-3 text-center text-[12px] text-secondary">{t.caption}</figcaption>
      </figure>
      <ol className="page-shell grid grid-cols-3 gap-3 min-[701px]:gap-8" aria-label={t.stepsAria}>
        <li className="border-t-2 border-foreground/10 pt-3 group-data-[phase=queue]/backoffice:border-accent group-data-[phase=inspect]/backoffice:border-accent"><p className="text-small font-semibold"><span className="mr-2 font-mono text-[11px] text-accent">01</span>{t.steps[0].title}</p><p className="mt-1 hidden text-small text-secondary min-[701px]:block">{t.steps[0].copy}</p></li>
        <li className="border-t-2 border-foreground/10 pt-3 group-data-[phase=saving]/backoffice:border-accent"><p className="text-small font-semibold"><span className="mr-2 font-mono text-[11px] text-accent">02</span>{t.steps[1].title}</p><p className="mt-1 hidden text-small text-secondary min-[701px]:block">{t.steps[1].copy}</p></li>
        <li className="border-t-2 border-foreground/10 pt-3 group-data-[phase=error]/backoffice:border-accent group-data-[phase=retry]/backoffice:border-accent group-data-[phase=saved]/backoffice:border-accent"><p className="text-small font-semibold"><span className="mr-2 font-mono text-[11px] text-accent">03</span>{t.steps[2].title}</p><p className="mt-1 hidden text-small text-secondary min-[701px]:block">{t.steps[2].copy}</p></li>
      </ol>
      <div className="page-shell h-0.5 overflow-hidden rounded-full bg-foreground/10" aria-hidden="true"><div className="h-full origin-left scale-x-(--bo-progress) bg-accent motion-reduce:scale-x-100" /></div>
      </div>
      <p data-backoffice-announcement role="status" aria-live="polite" aria-atomic="true" className="sr-only">{t.announcement}</p>
      <noscript><p className="page-shell py-5 text-small">{t.noscript}</p></noscript>
    </BackofficeScrollScene>
    </>
  );
}
