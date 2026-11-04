"use client";

import { useTranslations } from "@/hooks/use-translations";

const selections = [
  { count: 1, seats: "08", className: "hidden group-data-[count=1]/booking:inline" },
  { count: 2, seats: "08–09", className: "hidden group-data-[count=2]/booking:inline" },
  { count: 3, seats: "08–10", className: "hidden group-data-[count=3]/booking:inline" },
];

export function BookingSelectionSummary() {
  const t = useTranslations().seatSelection.ui;
  return (
    <span className="block">
      <span className="block font-semibold">{selections.map(({ count, className }) => <span key={count} className={className}>{count} {count === 1 ? t.seatSelectedSingular : t.seatSelectedPlural}</span>)}</span>
      <span className="mt-1 block text-[0.9em] font-normal text-(--device-muted)">{t.row} · {selections.map(({ count, seats, className }) => <span key={count} className={className}>{seats}</span>)}</span>
    </span>
  );
}
