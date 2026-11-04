"use client";

import { DemoPlayer } from "@/components/demo-player";

import { Button } from "@/components/button";
import { MobileDemoStage, mobileDemoViewportClass, mobileDemoHeaderClass, mobileDemoFigureClass } from "@/components/mobile-demo-stage";
import { viewportReflowClass } from "@/components/scene-classes";

import { SectionAtmosphere } from "@/components/section-atmosphere";
import { BookingDevices } from "@/components/seat-selection-scene/booking-devices";
import { SeatScrollScene } from "@/components/seat-selection-scene/seat-scroll-scene";
import { VenueBackground } from "@/components/seat-selection-scene/venue-background";
import { useTranslations } from "@/hooks/use-translations";

const stepMeta = [
  { id: "explore", number: "01" },
  { id: "section", number: "02" },
  { id: "seats", number: "03" },
];

export function SeatSelectionExperience() {
  const t = useTranslations().seatSelection;
  const steps = stepMeta.map((meta, index) => ({ ...meta, ...t.steps[index] }));
  return (
    <SeatScrollScene>
      <div data-booking-viewport data-mobile-demo-viewport className={`${mobileDemoViewportClass} ${viewportReflowClass} isolate sticky top-0 flex h-[calc(100svh-88px-env(safe-area-inset-bottom))] min-h-[min(740px,calc(100svh-88px-env(safe-area-inset-bottom)))] flex-col justify-center gap-5 py-5 min-[701px]:gap-3 min-[701px]:py-4 motion-reduce:static motion-reduce:h-auto`}>
        <SectionAtmosphere tone="violet" />
        <VenueBackground />
        <header className={`${mobileDemoHeaderClass} page-shell`}>
          <p className="text-meta font-medium text-secondary">{t.eyebrow}</p>
          <div className="mt-3 grid gap-4 min-[901px]:grid-cols-[1.15fr_1fr] min-[901px]:items-start min-[901px]:gap-16">
            <h2 aria-label={`${t.headingLine1} ${t.headingLine2}${t.headingAccent}`} id="booking-heading" className="max-w-[22ch] text-[clamp(32px,3.8vw,48px)] leading-[1.05] font-bold tracking-[-0.045em]">{t.headingLine1}<br className="hidden min-[701px]:block" /> {t.headingLine2}<span className="text-accent">{t.headingAccent}</span></h2>
            <p id="booking-description" className="max-w-[40ch] text-body leading-[1.65] text-secondary min-[701px]:text-lead min-[901px]:pt-1">{t.description}</p>
          </div>
        </header>
        <figure className={`${mobileDemoFigureClass} page-shell min-[701px]:max-w-[min(1100px,calc((100svh-480px)*1.65))]`}>
          <DemoPlayer><MobileDemoStage fillSpace><BookingDevices /></MobileDemoStage></DemoPlayer>
          <figcaption className="mt-3 text-center text-[12px] text-secondary">{t.caption}</figcaption>
        </figure>
        <div className="page-shell hidden min-h-12 items-center justify-center text-center min-[701px]:flex">
          <Button data-booking-continue disabled size="sm" className="hidden! group-data-[ready=true]/booking:inline-flex! group-data-[review=true]/booking:hidden!">{t.ui.continue}</Button>
          <p data-booking-review tabIndex={-1} className="hidden rounded text-small font-semibold group-data-[review=true]/booking:block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--focus-ring)">{t.ui.reviewAnnouncement}</p>
        </div>
        <ol className="page-shell grid grid-cols-3 gap-3 min-[701px]:gap-8" aria-label={t.stepsAria}>
          {steps.map(({ id, number, title, copy }) => (
            <li key={id} className={`border-t-2 border-foreground/10 pt-3 ${id === "explore" ? "group-data-[phase=explore]/booking:border-accent" : id === "section" ? "group-data-[phase=section]/booking:border-accent" : "group-data-[view=seats]/booking:border-accent"}`}>
              <p className="text-[13px] leading-snug font-semibold min-[701px]:text-body"><span className="mb-1 block font-mono text-[11px] text-accent min-[701px]:mr-3 min-[701px]:inline">{number}</span>{title}</p>
              <p className="mt-1 hidden text-small text-secondary min-[701px]:block">{copy}</p>
            </li>
          ))}
        </ol>
      </div>
      <p data-booking-announcement role="status" aria-live="polite" aria-atomic="true" className="sr-only">{t.announcement}</p>
      <noscript><p className="page-shell py-5 text-small">{t.noscript}</p></noscript>
    </SeatScrollScene>
  );
}
