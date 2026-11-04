"use client";

import { venueSectionPath } from "@/lib/venue-geometry";
import { useTranslations } from "@/hooks/use-translations";

function VenueOverview() {
  return (
    <g className="opacity-[var(--booking-map-opacity,1)] group-data-[map-visible=false]/booking:hidden">
      <g className="origin-[258px_109px] [transform:translate(calc(var(--booking-map-zoom,0)*51px_+_var(--booking-map-dive,0)*122px),calc(var(--booking-map-zoom,0)*32px_+_var(--booking-map-dive,0)*121px))_scale(calc(1_+_var(--booking-map-zoom,0)*0.7_+_var(--booking-map-dive,0)*1.05))]">
        <ellipse cx="380" cy="230" rx="169" ry="99" fill="var(--device-screen)" />
        {Array.from({ length: 16 }, (_, index) => <path key={index} d={venueSectionPath(index)} fill={index < 5 ? "#a7aafa" : index < 10 ? "#c2b1eb" : "#ecc3d9"} stroke="var(--device-screen)" strokeWidth="3" />)}
        <rect x="275" y="168" width="210" height="124" rx="9" fill="var(--device-pitch)" stroke="var(--device-pitch-line)" strokeWidth="2" />
        <g stroke="var(--device-pitch-line)" strokeWidth="1.5">
          <path d="M380 168V292M275 195H308V265H275M485 195H452V265H485" />
          <circle cx="380" cy="230" r="24" /><circle cx="380" cy="230" r="2" fill="var(--device-pitch-line)" />
        </g>
        <text x="201" y="156" textAnchor="middle" fontSize="14" fontWeight="600" fill="#24184c">N-02</text>
        <text x="258" y="114" textAnchor="middle" fontSize="14" fontWeight="600" fill="#24184c">N-03</text>
        <g className="opacity-[var(--booking-section,0)]">
          <path className="hidden group-data-[section=N-02]/booking:block" d={venueSectionPath(1)} fill="#ff75bf" stroke="var(--device-accent)" strokeWidth="4" />
          <g className="group-data-[section=N-02]/booking:hidden"><path d={venueSectionPath(2)} fill="#ff75bf" stroke="var(--device-accent)" strokeWidth="4" />
          <circle cx="258" cy="109" r="11" fill="#24184c" />
          <path d="m253 109 4 4 7-8" stroke="#fff9ed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></g>
        </g>
        <g className="opacity-[var(--booking-section-feedback,0)]"><circle cx="201" cy="151" r="24" stroke="var(--device-accent)" strokeWidth="2" className="hidden group-data-[section=N-02]/booking:block" /><circle cx="258" cy="109" r="24" stroke="var(--device-accent)" strokeWidth="2" className="group-data-[section=N-02]/booking:hidden" /></g>
      </g>
    </g>
  );
}

function LimitedSeatGrid() {
  const t = useTranslations().seatSelection.ui;
  return (
    <g className="opacity-[var(--booking-first-grid,0)] group-data-[limited-visible=false]/booking:hidden" data-booking-limited-grid>
      <rect x="205" y="100" width="350" height="28" rx="14" fill="var(--device-pitch)" />
      <text x="380" y="119" textAnchor="middle" fontSize="13" fill="var(--device-text)">{t.towardsThePitch}</text>
      {Array.from({ length: 5 }, (_, row) => (
        <g key={row}>
          <text x={176 - row * 10} y={167 + row * 42} fontSize="13" fill="var(--device-muted)">{String.fromCharCode(65 + row)}</text>
          {Array.from({ length: 8 + row }, (_, col) => {
            const seats = 8 + row;
            const x = 380 + (col - (seats - 1) / 2) * 33;
            const y = 150 + row * 40 + (1 - ((col - (seats - 1) / 2) / (seats / 2)) ** 2) * 22;
            const available = row === 2 && col === 5;
            return <g key={col} data-booking-availability={available ? "available" : "unavailable"} transform={`translate(${x.toFixed(2)} ${y.toFixed(2)}) rotate(${((col - (seats - 1) / 2) * -3).toFixed(2)})`}><rect x="-12" width="24" height="24" rx="7" fill={available ? "var(--device-accent)" : "var(--device-border)"} fillOpacity={available ? "1" : ".4"} /><path d="M-7 18H7" stroke="var(--device-screen)" strokeOpacity=".4" strokeWidth="2" strokeLinecap="round" /></g>;
          })}
        </g>
      ))}
      <text x="380" y="398" textAnchor="middle" fontSize="14" fontWeight="600" fill="var(--device-text)">{t.limitedAvailability}</text>
    </g>
  );
}

function SeatGrid() {
  const t = useTranslations().seatSelection.ui;
  const selectionStyles = [
    "origin-[400px_218px] opacity-[var(--booking-selected-1,0)] [transform:scale(calc(0.88_+_var(--booking-selected-1,0)*0.12))]",
    "origin-[432px_218px] opacity-[var(--booking-selected-2,0)] [transform:scale(calc(0.88_+_var(--booking-selected-2,0)*0.12))]",
    "origin-[464px_218px] opacity-[var(--booking-selected-3,0)] [transform:scale(calc(0.88_+_var(--booking-selected-3,0)*0.12))]",
  ];
  return (
    <g className="group-data-[grid-visible=false]/booking:hidden opacity-[var(--booking-grid,0)] [transform:translateY(calc(22px_-_var(--booking-grid,0)*22px))]">
      <g className="origin-[380px_230px] [transform:translate(calc(var(--booking-seat-zoom,0)*156px_-_var(--booking-pan-x,0)*260px),calc(var(--booking-seat-zoom,0)*36px_-_var(--booking-pan-y,0)*40px))_scale(calc(1_+_var(--booking-seat-zoom,0)))]">
        <rect x="142" y="46" width="462" height="30" rx="15" fill="var(--device-pitch)" />
        <text x="373" y="66" textAnchor="middle" fontSize="13" fontWeight="500" fill="var(--device-text)">{t.towardsThePitch}</text>
        {Array.from({ length: 8 }, (_, row) => (
          <g key={row}>
            <text x="117" y={127 + row * 32} textAnchor="middle" fontSize="13" fill="var(--device-muted)" className="hidden min-[701px]:block">{String.fromCharCode(65 + row)}</text>
            {Array.from({ length: 14 }, (_, col) => {
              const x = 142 + col * 32 + (col >= 7 ? 22 : 0);
              const y = 110 + row * 32;
              const selected = row === 3 && col >= 7 && col <= 9;
              const taken = !selected && ((row * 14 + col) % 7 === 0 || (row * 14 + col) % 11 === 0);
              return (
                <g key={col}>
                  <rect x={x} y={y} width="24" height="24" rx="7" fill={taken ? "var(--device-border)" : "var(--device-accent)"} fillOpacity={taken ? ".4" : ".8"} />
                  <path d={`M${x + 5} ${y + 18}h14`} stroke="var(--device-screen)" strokeOpacity=".4" strokeWidth="2" strokeLinecap="round" />
                  {selected && <g className={selectionStyles[col - 7]}><rect x={x - 2} y={y - 2} width="28" height="28" rx="8" fill="#ff75bf" stroke="#24184c" strokeWidth="1.5" /><path d={`m${x + 6} ${y + 12} 4 4 8-9`} stroke="#24184c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></g>}
                </g>
              );
            })}
          </g>
        ))}
        <text x="373" y="405" textAnchor="middle" fontSize="12" fill="var(--device-muted)" className="hidden min-[701px]:block">{t.sectionLabel}</text>
      </g>
    </g>
  );
}

export function BookingMap({ touch = false }: { touch?: boolean }) {
  const t = useTranslations().seatSelection.ui;
  return (
    <svg data-booking-map viewBox="0 0 760 460" preserveAspectRatio={touch ? "xMidYMid slice" : "xMidYMid meet"} className="block h-full w-full" fill="none" role="img" aria-label={t.mapLabel}>
      <rect width="760" height="460" fill="var(--device-canvas)" />
      <g aria-hidden="true" className="group-data-[review=true]/booking:hidden"><VenueOverview /><LimitedSeatGrid /><SeatGrid /></g>
      <g aria-hidden="true" className="group-data-[review=true]/booking:hidden">
        <rect x="250" y="14" width="260" height="34" rx="17" fill="var(--device-panel)" stroke="var(--device-border)" />
        {Object.entries(t.actionLabels).map(([action, label]) => <text key={action} x="380" y="36" textAnchor="middle" fontSize="14" fontWeight="600" fill="var(--device-text)" className={`hidden ${action === "mapZoom" ? "group-data-[action=mapZoom]/booking:block" : action === "firstSection" ? "group-data-[action=firstSection]/booking:block" : action === "limited" ? "group-data-[action=limited]/booking:block" : action === "back" ? "group-data-[action=back]/booking:block" : action === "section" ? "group-data-[action=section]/booking:block" : action === "seatZoom" ? "group-data-[action=seatZoom]/booking:block" : action === "pan" ? "group-data-[action=pan]/booking:block" : action === "select" ? "group-data-[action=select]/booking:block" : "group-data-[action=continue]/booking:block"}`}>{label}</text>)}
      </g>
      <g aria-hidden="true" className="hidden group-data-[section=N-02]/booking:block opacity-[var(--booking-first-grid,0)]">
        <rect x="95" y="55" width="190" height="34" rx="12" fill="var(--device-panel)" stroke="var(--device-border)" />
        <text x="190" y="77" textAnchor="middle" fontSize="14" fontWeight="600" fill="var(--device-text)">← {t.backToMap}</text>
      </g>
      <foreignObject x="275" y="377" width="210" height="62" className="hidden group-data-[ready=true]/booking:block group-data-[review=true]/booking:hidden">
        <span aria-hidden="true" className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-(--device-accent) px-4 text-[17px] font-bold text-(--device-marker-text) shadow-lg [transform:scale(calc(1_-_var(--booking-continue-pressed,0)*0.07))]">{t.continue} →</span>
      </foreignObject>
      <foreignObject x="230" y="80" width="300" height="280" className="hidden group-data-[review=true]/booking:block">
        <div className="motion-safe:min-[701px]:animate-[booking-success-enter_550ms_cubic-bezier(0.16,1,0.3,1)_both] flex h-full flex-col justify-center rounded-2xl border border-(--device-border) bg-(--device-panel) p-6 text-center text-(--device-text)">
          <span className="motion-safe:min-[701px]:animate-[booking-success-pop_600ms_cubic-bezier(0.16,1,0.3,1)_100ms_both] mx-auto flex size-16 items-center justify-center rounded-full bg-(--device-selection) text-(--device-selection-text)">
            <svg viewBox="0 0 24 24" className="size-9" fill="none" aria-hidden="true"><path pathLength="1" className="motion-safe:min-[701px]:animate-[booking-success-check_350ms_ease-out_280ms_both]" d="m5 12 4 4L19 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </span>
          <p className="motion-safe:min-[701px]:animate-[booking-success-enter_450ms_ease-out_220ms_both] mt-5 rounded text-[24px] leading-tight font-bold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--device-text)">{t.reviewTitle}</p>
          <p className="mt-5 text-[12px] text-(--device-muted)">{t.noRealBooking}</p>
        </div>
      </foreignObject>
      {!touch && <g className="group-data-[review=true]/booking:hidden" transform="translate(678 366)">
        <rect width="40" height="76" rx="13" fill="var(--device-panel)" stroke="var(--device-border)" />
        <path d="M11 20h18M20 11v18M11 56h18" stroke="var(--device-text)" strokeWidth="2" strokeLinecap="round" />
        <path d="M8 38h24" stroke="var(--device-border)" />
      </g>}
      {touch ? (
        <>
          <g className="opacity-[var(--booking-gesture,0)]" fill="var(--device-accent)" fillOpacity=".18" stroke="var(--device-accent)" strokeWidth="2">
            <circle cy="208" r="17" className="[cx:calc(342px_-_var(--booking-gesture-spread,0)*42px)]" />
            <circle cy="252" r="17" className="[cx:calc(418px_+_var(--booking-gesture-spread,0)*42px)]" />
          </g>
          <g className="opacity-[var(--booking-touch,0)] [transform:translate(var(--booking-cursor-x,550px),var(--booking-cursor-y,340px))]">
            <circle r="21" fill="var(--device-accent)" fillOpacity=".14" stroke="var(--device-accent)" strokeWidth="2" />
            <circle r="6" fill="var(--device-accent)" />
          </g>
        </>
      ) : <g className="opacity-[var(--booking-cursor-opacity,0)] [transform:translate(var(--booking-cursor-x,550px),var(--booking-cursor-y,340px))]">
        <circle r="17" fill="var(--device-accent)" fillOpacity=".15" stroke="var(--device-accent)" strokeOpacity=".4" className="opacity-[var(--booking-pressed,0)]" />
        <path d="M0 0 3 26 10 19 16 30 22 27 16 16 26 15Z" fill="var(--device-text)" stroke="var(--device-screen)" strokeWidth="2" strokeLinejoin="round" />
      </g>}
    </svg>
  );
}
