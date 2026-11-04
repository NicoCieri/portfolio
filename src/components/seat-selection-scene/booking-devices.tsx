"use client";

import { DeviceMonitor } from "@/components/devices/device-monitor";
import { DevicePhone } from "@/components/devices/device-phone";
import { BookingInterface } from "@/components/seat-selection-scene/booking-interface";
import { BookingSelectionSummary } from "@/components/seat-selection-scene/booking-selection-summary";
import { BookingMap } from "@/components/seat-selection-scene/booking-map";
import { useTranslations } from "@/hooks/use-translations";

function BookingPhone() {
  const t = useTranslations().seatSelection.ui;
  return (
    <DevicePhone aria-hidden="true" screenBackground="var(--device-panel)">
      <div className="shrink-0 px-2 pt-5 pb-2 min-[701px]:px-3 min-[701px]:pt-6 min-[701px]:pb-3">
        <p className="text-[11px] font-semibold text-(--device-muted) min-[701px]:text-[12px]">{t.tickets}</p>
        <p className="mt-1 text-[15px] leading-tight font-bold tracking-tight min-[701px]:mt-2 min-[701px]:text-[19px]">Orbit Social</p>
        <p className="mt-1 text-[11px] text-(--device-muted)"><span className="group-data-[view=seats]/booking:hidden">{t.chooseSection}</span><span className="hidden group-data-[view=seats]/booking:inline"><span className="hidden group-data-[section=N-02]/booking:inline">{t.sectionN02}</span><span className="group-data-[section=N-02]/booking:hidden">{t.sectionSelected}</span></span></p>
      </div>
      <div className="min-h-0 flex-1 overflow-hidden border-y border-(--device-border) bg-(--device-canvas)"><BookingMap touch /></div>
      <div className="flex min-h-[52px] shrink-0 items-center px-2 py-2 min-[701px]:min-h-[72px] min-[701px]:px-3">
        <div className="group-data-[selecting=true]/booking:hidden"><p className="text-[11px] font-semibold min-[701px]:text-[13px]">{t.findYourView}</p><p className="mt-1 text-[10px] leading-snug text-(--device-muted) min-[701px]:text-[11px]">{t.pinchToZoom}<br />{t.dragToExplore}</p></div>
        <div className="hidden text-[11px] group-data-[selecting=true]/booking:block min-[701px]:text-[13px]"><BookingSelectionSummary /></div>
      </div>
    </DevicePhone>
  );
}

export function BookingDevices() {
  return (
    <div className="relative pb-3 min-[701px]:pb-4">
      <DeviceMonitor className="w-[84%]" screenClassName="max-[700px]:aspect-auto">
        <BookingInterface />
      </DeviceMonitor>
      <div className="absolute right-0 bottom-0 z-10 w-[36%] min-[701px]:w-[max(160px,24%)]"><BookingPhone /></div>
    </div>
  );
}
