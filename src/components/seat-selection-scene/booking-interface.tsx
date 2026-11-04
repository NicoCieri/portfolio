"use client";

import { BookingSelectionSummary } from "@/components/seat-selection-scene/booking-selection-summary";
import { BookingMap } from "@/components/seat-selection-scene/booking-map";
import { useTranslations } from "@/hooks/use-translations";

export function BookingInterface() {
  const t = useTranslations().seatSelection.ui;
  return (
    <div className="flex h-full min-h-0 flex-col bg-(--device-screen) text-(--device-text)">
      <div className="flex h-9 shrink-0 items-center justify-between gap-3 border-b border-(--device-border) bg-(--device-panel) px-3 min-[701px]:px-4">
        <p className="flex items-center gap-2 text-[13px] font-semibold"><span className="flex size-6 items-center justify-center rounded-full bg-(--pop-blue) text-white">o.</span>Orbit <span className="ml-1 font-normal text-(--device-muted)">/ {t.ticketsLabel}</span></p>
        <span className="hidden rounded-full bg-(--device-selection) px-2.5 py-1 text-[11px] font-semibold text-(--device-selection-text) min-[701px]:inline">{t.concept}</span>
      </div>
      <div className="flex shrink-0 items-center justify-between gap-4 px-3 py-2 min-[701px]:px-4">
        <div><p className="text-[17px] leading-tight font-semibold min-[701px]:text-[20px]">Orbit Social</p><p className="mt-1 text-[12px] text-(--device-muted)">{t.eventVenue}</p></div>
        <p className="hidden text-right text-[12px] font-medium text-(--device-muted) min-[701px]:block"><span className="group-data-[view=seats]/booking:hidden">{t.chooseSection}</span><span className="hidden group-data-[view=seats]/booking:inline"><span className="hidden group-data-[section=N-02]/booking:inline">{t.sectionN02}</span><span className="group-data-[section=N-02]/booking:hidden">{t.sectionSelectedAlt}</span></span></p>
      </div>
      <div className="flex min-h-0 flex-1 border-y border-(--device-border)">
        <div className="min-h-0 min-w-0 flex-1 overflow-hidden"><BookingMap /></div>
        <aside className="hidden w-[156px] shrink-0 border-l border-(--device-border) bg-(--device-panel) p-3 min-[901px]:block [@media(max-height:980px)]:hidden">
          <p className="text-[12px] font-medium text-(--device-muted)">{t.yourView}</p>
          <div className="mt-3 group-data-[view=seats]/booking:hidden"><p className="text-[18px] leading-tight font-semibold tracking-tight">{t.aPlaceLine1}<br />{t.aPlaceLine2}</p></div>
          <div className="mt-3 hidden group-data-[view=seats]/booking:block"><p className="text-[18px] leading-tight font-semibold tracking-tight">{t.closerLine1}<br />{t.closerLine2}</p></div>
          <div className="mt-4 rounded-xl border border-(--device-border) p-2"><p className="text-[12px] font-semibold">{t.northStand}</p><p className="mt-1 text-[12px] text-(--device-muted)"><span className="hidden group-data-[section=N-02]/booking:inline">{t.sectionN02}</span><span className="group-data-[section=N-02]/booking:hidden">{t.sectionN03}</span></p><div className="mt-2 hidden border-t border-(--device-border) pt-2 group-data-[selecting=true]/booking:block"><BookingSelectionSummary /></div></div>
          <p className="mt-4 text-[11px] leading-relaxed text-(--device-muted)">{t.illustrativeAvailability}<br />{t.noRealBooking}</p>
        </aside>
      </div>
      <div className="flex min-h-10 shrink-0 flex-wrap items-center justify-between gap-2 px-3 py-2 text-[12px] min-[701px]:px-4">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-(--device-muted)"><span className="flex items-center gap-1.5"><span className="size-2 rounded bg-(--device-accent)" />{t.available}</span><span className="hidden items-center gap-1.5 min-[701px]:flex"><span className="size-2 rounded bg-(--device-border)" />{t.unavailable}</span><span className="flex items-center gap-1.5"><span className="size-2 rounded bg-(--pop-pink)" />{t.selected}</span></div>
        <p className="hidden font-semibold min-[701px]:block"><span className="group-data-[selecting=true]/booking:hidden">{t.exploreYourView}</span><span className="hidden group-data-[selecting=true]/booking:block"><BookingSelectionSummary /></span></p>
      </div>
    </div>
  );
}
