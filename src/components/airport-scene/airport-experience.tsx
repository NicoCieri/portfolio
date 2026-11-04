"use client";

import { DemoPlayer } from "@/components/demo-player";

import { AirportBackground } from "@/components/airport-scene/airport-background";
import { AirportWorkspace } from "@/components/airport-scene/airport-workspace";
import { SectionAtmosphere } from "@/components/section-atmosphere";
import { sceneReflowClass, viewportReflowClass } from "@/components/scene-classes";
import { useAirportLayout } from "@/hooks/use-airport-layout";
import { useAirportScroll } from "@/hooks/use-airport-scroll";
import { useTranslations } from "@/hooks/use-translations";

const stepActive = [
  "group-data-[phase=0]/airport:border-accent",
  "group-data-[phase=1]/airport:border-accent",
  "group-data-[phase=2]/airport:border-accent group-data-[phase=3]/airport:border-accent",
];

export function AirportExperience() {
  const t = useTranslations().airport;
  const scene = useAirportScroll();
  const stage = useAirportLayout();
  return (
    <section ref={scene} id="airport" aria-labelledby="airport-heading" data-phase="0" data-search-state="idle" data-reservation-ready="false" className={`${sceneReflowClass} group/airport relative h-[600svh] min-h-[3400px] max-[700px]:h-[390svh] max-[700px]:min-h-[2210px] [view-timeline-name:--section-atmosphere] [view-timeline-axis:block] [--airport-progress:0] [--airport-seat:0] [--airport-bag:0] [--airport-ticket:0] motion-reduce:h-auto motion-reduce:min-h-0`}>
      <div data-airport-viewport className={`${viewportReflowClass} isolate sticky top-0 flex h-[calc(100svh-88px-env(safe-area-inset-bottom))] min-h-[min(640px,calc(100svh-88px-env(safe-area-inset-bottom)))] flex-col justify-center gap-4 py-4 max-[700px]:h-[calc(100dvh-env(safe-area-inset-bottom))] max-[700px]:min-h-0 max-[700px]:gap-3 max-[700px]:pb-5 motion-reduce:static motion-reduce:h-auto motion-reduce:min-h-0`}>
        <SectionAtmosphere tone="violet" />
        <AirportBackground />
        <header className="page-shell">
          <p className="text-meta font-medium text-secondary max-[700px]:text-[11px]">{t.eyebrow}</p>
          <div className="mt-3 grid gap-3 max-[700px]:mt-2 max-[700px]:gap-2 min-[901px]:grid-cols-[1.15fr_1fr] min-[901px]:gap-16">
            <h2 id="airport-heading" className="text-[clamp(30px,3.8vw,48px)] leading-[1.05] font-bold tracking-[-0.045em] max-[700px]:text-[26px]">{t.headingLine1}<br /><span className="text-accent">{t.headingAccent}</span></h2>
            <p className="max-w-[52ch] text-[12px] leading-relaxed text-secondary min-[701px]:text-body max-[700px]:text-[12px]">{t.description}</p>
          </div>
        </header>
        <DemoPlayer><div ref={stage} className="page-shell relative h-[440px] shrink-0">
          <figure data-airport-art aria-describedby="airport-summary" className="absolute top-0 left-1/2 w-[820px] origin-top [transform:translateX(-50%)_scale(var(--airport-scale,0.75))] max-[700px]:top-1/2 max-[700px]:origin-center max-[700px]:[transform:translate(-50%,-50%)_scale(var(--airport-scale,0.75))] max-[700px]:w-[640px]">
            <AirportWorkspace t={t} />
          </figure>
        </div></DemoPlayer>
        <ol aria-label={t.stepsAria} className="page-shell grid grid-cols-3 gap-3 min-[701px]:gap-8">
          {t.steps.map(({ title, copy }, index) => <li key={title} className={`border-t-2 border-foreground/10 pt-2 ${stepActive[index]}`}><p className="text-[11px] leading-snug font-semibold min-[701px]:text-small"><span className="mr-2 font-mono text-[10px] text-accent max-[700px]:mb-1 max-[700px]:block">0{index + 1}</span>{title}</p><p className="mt-1 hidden text-small text-secondary min-[901px]:block">{copy}</p></li>)}
        </ol>
        <div aria-hidden="true" className="page-shell hidden h-0.5 shrink-0 min-[701px]:block overflow-hidden rounded-full bg-foreground/10"><div className="h-full origin-left scale-x-(--airport-progress) bg-accent motion-reduce:scale-x-100" /></div>
        <p className="page-shell hidden text-center text-[10px] text-secondary min-[701px]:block motion-reduce:hidden">{t.hint}</p>
      </div>
      <p id="airport-summary" className="sr-only">{t.summary}</p>
      <p data-airport-announcement role="status" aria-live="polite" aria-atomic="true" className="sr-only">{t.searchAnnouncements.idle}</p>
      <noscript><p className="page-shell py-4 text-small">{t.summary}</p></noscript>
    </section>
  );
}
