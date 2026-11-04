import { AirportIcon } from "@/components/airport-scene/airport-icon";
import { PassengerSearch } from "@/components/airport-scene/passenger-search";
import type { Dictionary } from "@/i18n";

const panelClass = "invisible col-start-1 row-start-1 opacity-0 transition-[opacity,transform] duration-300 max-[700px]:transition-none motion-reduce:transition-none";
const cardClass = "rounded-md border border-(--device-border) bg-(--device-screen)";
const labelClass = "text-[10px] font-medium tracking-wide text-(--device-muted)";

function Barcode({ className = "" }: { className?: string }) {
  return <div aria-hidden="true" className={`h-7 bg-[repeating-linear-gradient(90deg,currentColor_0_2px,transparent_2px_4px,currentColor_4px_5px,transparent_5px_8px,currentColor_8px_12px,transparent_12px_14px)] ${className}`} />;
}

export function AirportWorkspace({ t }: { t: Dictionary["airport"] }) {
  return (
    <div data-airport-screen className="relative overflow-hidden rounded-lg border-[2px] border-(--device-frame) bg-(--device-screen) text-(--device-text) min-[701px]:shadow-[0_20px_60px_#24184c26] min-[701px]:border-[2px]">
      <div className="flex items-center justify-between bg-(--device-text) px-4 py-2 text-(--device-screen)">
        <p className="flex items-center gap-2 text-[11px] font-semibold"><AirportIcon name="plane" className="size-4" /> AERO <span className="hidden font-normal opacity-75 min-[701px]:inline">/ {t.workspace}</span></p>
        <p className="text-[9px] tracking-wider">{t.agent} <span className="ml-3 rounded border border-current px-1.5 py-0.5">{t.simulation}</span></p>
      </div>
      <div className="hidden items-center justify-between border-b border-(--device-border) bg-(--device-panel) px-4 py-2 text-[10px] min-[701px]:flex">
        <p className="flex gap-2 text-(--device-muted)"><span>{t.station} EZE</span><span>/</span><span>{t.departures}</span><span>/</span><span className="font-semibold text-(--device-text)">AO 281</span></p>
        <p className="font-mono text-[9px] text-(--device-muted)">T-A · COUNTER 024</p>
      </div>
      <div className="flex items-center justify-between gap-3 border-b border-(--device-border) px-4 py-3">
        <div className="flex items-center gap-3"><span className="font-mono text-[12px] font-bold">AO 281</span><span className="text-lg font-semibold tracking-tight">EZE <span className="mx-1 text-(--device-muted)"><AirportIcon name="arrow" /></span> MAD</span></div>
        <div className="flex items-center gap-4 text-[11px]"><span className="hidden min-[701px]:block">{t.departure} <b>22:45</b></span><span>{t.gate} <b>B12</b></span><span className="hidden rounded-sm bg-(--device-success) px-2 py-1 text-(--device-success-text) min-[901px]:block">{t.onTime}</span></div>
      </div>
      <div className="grid grid-cols-4 gap-1 border-b border-(--device-border) bg-(--device-panel) px-2 pt-1 text-[9px] min-[701px]:text-[11px]">
        {t.tasks.map((task, index) => <div key={task} data-airport-target={index === 1 ? "seat-tab" : index === 2 ? "bags-tab" : undefined} className={`border-b-2 border-transparent px-1 py-2 text-center text-(--device-muted) ${["group-data-[phase=0]/airport:border-(--device-accent) group-data-[phase=0]/airport:bg-(--device-screen) group-data-[phase=0]/airport:text-(--device-accent)", "group-data-[phase=1]/airport:border-(--device-accent) group-data-[phase=1]/airport:bg-(--device-screen) group-data-[phase=1]/airport:text-(--device-accent)", "group-data-[phase=2]/airport:border-(--device-accent) group-data-[phase=2]/airport:bg-(--device-screen) group-data-[phase=2]/airport:text-(--device-accent)", "group-data-[phase=3]/airport:border-(--device-accent) group-data-[phase=3]/airport:bg-(--device-screen) group-data-[phase=3]/airport:text-(--device-accent)"][index]}`}><span className="mr-1 font-mono">0{index + 1}</span>{task}</div>)}
      </div>
      <div className="grid min-[701px]:grid-cols-[190px_1fr]">
        {/* Both sidebar states occupy the same grid cell and retain their height,
            so revealing the reservation never changes the monitor's scale. */}
        <aside className="grid border-b border-(--device-border) bg-(--device-panel) p-3 min-[701px]:border-r min-[701px]:border-b-0 min-[701px]:p-4">
          <div className="invisible col-start-1 row-start-1 self-start py-1 min-[701px]:py-3 text-[10px] text-(--device-muted) group-data-[reservation-ready=false]/airport:visible"><p>{t.awaitingPassenger}</p><p className="mt-2 hidden max-w-[24ch] leading-relaxed min-[701px]:block">{t.searchHint}</p><div aria-hidden="true" className="invisible mt-4 hidden space-y-3 min-[701px]:block group-data-[search-state=loading]/airport:visible"><div className="h-3 w-28 rounded bg-(--device-muted)/15" /><div className="h-2 w-20 rounded bg-(--device-muted)/15" /></div></div>
          <div className="col-start-1 row-start-1 flex items-center justify-between gap-2 min-[701px]:block group-data-[reservation-ready=false]/airport:invisible">
          <div><p className={`${labelClass} hidden min-[701px]:block`}>{t.selected}</p><p className="text-[13px] font-semibold min-[701px]:mt-3 min-[701px]:text-base">Sofía Martínez</p><p className="mt-1 text-[10px] text-(--device-muted)">{t.reservation} <b className="font-mono text-(--device-text)">XK7R2P</b></p></div>
          <div className="mt-0 min-[701px]:mt-4"><p className="hidden text-[11px] text-(--device-muted) min-[701px]:block">{t.economy}</p><p className="mt-1 text-[10px] text-(--device-accent)"><AirportIcon name="check" /> {t.documents}</p></div>
          <div className="mt-5 hidden grid-cols-2 gap-2 min-[701px]:grid">
            <div className={`${cardClass} p-3`}><p className={labelClass}>{t.seat}</p><p className="mt-1 grid font-mono text-xl font-bold"><span className="col-start-1 row-start-1 group-data-[seat-assigned=true]/airport:hidden">—</span><span className="col-start-1 row-start-1 hidden group-data-[seat-assigned=true]/airport:inline">12A</span></p></div>
            <div className={`${cardClass} p-3`}><p className={labelClass}>{t.tasks[2]}</p><p className="mt-1 grid font-mono text-xl font-bold"><span className="col-start-1 row-start-1 group-data-[bag-accepted=true]/airport:hidden">—</span><span className="col-start-1 row-start-1 hidden group-data-[bag-accepted=true]/airport:inline">1</span></p></div>
          </div>
          <dl className="mt-5 hidden divide-y divide-(--device-border) border-y border-(--device-border) text-[10px] min-[701px]:block">
            {[[t.travelDocument, t.verified], [t.ticket, t.issuedTicket]].map(([label, value]) => <div key={label} className="py-2.5"><dt className="text-(--device-muted)">{label}</dt><dd className="mt-1 flex items-center gap-1 font-medium"><span className="text-(--device-accent)"><AirportIcon name="check" /></span>{value}</dd></div>)}
          </dl>
          <div className="mt-4 hidden min-[701px]:block"><p className={labelClass}>{t.serviceNotes}</p><p className="mt-1 text-[10px] leading-relaxed text-(--device-muted)">{t.noRequests}</p></div>
          </div>
        </aside>
        <div className="grid min-h-[280px] bg-(--device-canvas) p-3 min-[701px]:min-h-[370px] min-[701px]:p-4">
          <div data-airport-panel="0" className={`${panelClass} group-data-[phase=0]/airport:visible group-data-[phase=0]/airport:opacity-100`}>
            <PassengerSearch t={t} />
          </div>
          <div data-airport-panel="1" aria-hidden="true" inert className={`${panelClass} group-data-[phase=1]/airport:visible group-data-[phase=1]/airport:opacity-100`}>
            <div className="flex items-start justify-between gap-2"><div><h3 className="text-[14px] font-semibold">{t.chooseSeat}</h3><p className={`mt-1 ${labelClass}`}>{t.seatHint}</p></div><span className="rounded-lg bg-(--device-selection) px-3 py-2 font-mono text-(--device-selection-text) opacity-(--airport-seat)">12A <AirportIcon name="diagonal" /></span></div>
            <div className="relative mx-auto mt-2 h-[220px] min-[701px]:h-[300px] w-[340px] max-w-full overflow-hidden min-[701px]:mask-[linear-gradient(to_bottom,black_90%,transparent)]">
              <svg data-airport-aircraft aria-hidden="true" viewBox="0 0 340 900" className="pointer-events-none absolute top-0 left-1/2 h-[900px] w-[340px] max-w-none -translate-x-1/2 fill-(--device-panel) stroke-(--device-border)" strokeWidth="1.5">
                <path d="M105 172 8 270v22l97-39Zm130 0 97 98v22l-97-39Z" />
                <path d="m111 650-53 66v12l70-28Zm118 0 53 66v12l-70-28Z" />
              </svg>
              <div className="relative mx-auto h-[900px] w-fit border border-(--device-border) bg-(--device-screen) px-2.5 pt-24 pb-5 [border-radius:50%_50%_35%_35%/120px_120px_100px_100px]">
                <div aria-hidden="true" className="absolute top-10 left-1/2 flex -translate-x-1/2 gap-1"><span className="h-1.5 w-3 -skew-x-12 rounded-tl-full bg-(--device-border)" /><span className="h-1.5 w-3 skew-x-12 rounded-tr-full bg-(--device-border)" /></div>
              <div className="mb-2 grid grid-cols-[repeat(3,14px)_12px_repeat(3,14px)] gap-0.75 text-center font-mono text-[9px] text-(--device-muted)">{["A", "B", "C", "", "D", "E", "F"].map((letter, i) => <span key={i}>{letter}</span>)}</div>
              {Array.from({ length: 22 }, (_, index) => index + 10).map(row => <div key={row} className="mb-1 grid grid-cols-[repeat(3,14px)_12px_repeat(3,14px)] gap-0.75">{["A", "B", "C", "aisle", "D", "E", "F"].map((letter, col) => letter === "aisle" ? <span key={letter} className="self-center text-center font-mono text-[8px] text-(--device-muted)">{row}</span> : <div key={letter} data-airport-target={row === 12 && col === 0 ? "seat" : undefined} className={`relative flex h-5 items-center justify-center overflow-hidden rounded-t-[4px] rounded-b-sm border text-[9px] ${row === 12 && col === 0 ? "border-(--device-accent) bg-(--device-selection) text-(--device-selection-text) ring-2 ring-(--device-accent)/20" : (row + col) % 3 === 0 ? "border-(--device-border) bg-(--device-border) text-(--device-muted)" : "border-(--device-border) bg-(--device-canvas)"}`}>{row === 12 && col === 0 ? <span className="absolute inset-0 flex items-center justify-center bg-(--device-accent) text-(--device-screen) opacity-(--airport-seat)"><AirportIcon name="check" /></span> : (row + col) % 3 === 0 ? <AirportIcon name="close" /> : null}</div>)}</div>)}
              </div>
            </div>
            <div className="mt-2 flex justify-center gap-4 text-[9px] text-(--device-muted)"><span><AirportIcon name="seat" /> {t.available}</span><span><AirportIcon name="close" /> {t.occupied}</span><span className="text-(--device-accent)"><AirportIcon name="check" /> {t.assigned}</span></div>
            <p className="mt-2 text-center text-[10px] font-semibold text-(--device-accent) opacity-(--airport-seat)"><AirportIcon name="check" /> {t.seatConfirmed} · {t.window}</p>
          </div>
          <div data-airport-panel="2" aria-hidden="true" inert className={`${panelClass} group-data-[phase=2]/airport:visible group-data-[phase=2]/airport:opacity-100`}>
            <h3 className="text-[14px] font-semibold">{t.baggageTitle}</h3>
            <div className="mt-3 grid grid-cols-[1fr_1.3fr] gap-3">
              <div className={`${cardClass} flex flex-col items-center justify-center p-3`}>
                <svg aria-hidden="true" viewBox="0 0 80 100" className="h-20 w-16 -translate-y-[calc((1-var(--airport-bag))*12px)] text-(--device-accent)"><rect x="28" y="5" width="24" height="16" rx="5" fill="none" stroke="currentColor" strokeWidth="4"/><rect x="12" y="21" width="56" height="66" rx="10" fill="currentColor" opacity=".15"/><rect x="12" y="21" width="56" height="66" rx="10" fill="none" stroke="currentColor" strokeWidth="3"/><path d="M29 35v37m22-37v37" stroke="currentColor" strokeWidth="3"/><circle cx="25" cy="92" r="4" fill="currentColor"/><circle cx="55" cy="92" r="4" fill="currentColor"/></svg>
                <p data-airport-target="weight" className="mt-2 font-mono text-[24px] font-bold">18.0 <span className="text-[12px] font-normal">kg</span></p><p className={labelClass}>{t.weight}</p>
              </div>
              <div className="flex flex-col justify-center gap-2"><p className={labelClass}>{t.allowance}</p><p className="text-[17px] font-semibold">1 × 23 kg</p><div className="h-2 overflow-hidden rounded-full bg-(--device-border)"><div className="h-full w-[78.26%] origin-left scale-x-(--airport-bag) rounded-full bg-(--device-accent)" /></div><p className="text-[10px] leading-relaxed text-(--device-muted)">{t.withinAllowance}</p><div className="mt-1 opacity-(--airport-bag)"><p className="text-[9px] font-semibold text-(--device-accent)"><AirportIcon name="check" /> {t.bagAccepted}</p><Barcode className="mt-2 max-w-32" /></div></div>
            </div>
            <p data-airport-target="confirm" className="mt-3 rounded-lg bg-(--device-accent) px-3 py-2 text-center text-[11px] font-semibold text-(--device-screen)">{t.confirm}</p>
          </div>
          <div data-airport-panel="3" aria-hidden="true" inert className={`${panelClass} group-data-[phase=3]/airport:visible group-data-[phase=3]/airport:opacity-100`}>
            <div className="mb-3"><h3 className="text-[16px] font-semibold"><span className="mr-2 text-(--device-accent)"><AirportIcon name="check" /></span>{t.complete}</h3><p className={`mt-1 ${labelClass}`}>{t.completeDetail}</p></div>
            <div className="mx-auto max-w-[470px] translate-y-[calc((1-var(--airport-ticket))*18px)] flex gap-2 opacity-(--airport-ticket)">
              <div className={`${cardClass} min-w-0 flex-1 overflow-hidden`}><p className="bg-(--device-accent) px-3 py-2 text-[9px] font-semibold tracking-widest text-(--device-screen)">{t.boardingPass}</p><div className="p-3"><p className="text-[11px] font-semibold">MARTÍNEZ / SOFÍA</p><p className="my-2 flex items-center justify-between font-mono text-[26px] font-bold">EZE <span className="text-base text-(--device-accent)"><AirportIcon name="plane" /></span> MAD</p><div className="flex justify-between gap-2">{[[t.flight, "AO 281"], [t.seat, "12A"], [t.gate, "B12"], [t.boarding, "22:05"]].map(([label, value]) => <div key={label}><p className="text-[8px] text-(--device-muted)">{label}</p><p className="mt-1 font-mono text-[11px] font-semibold">{value}</p></div>)}</div><Barcode className="mt-3 h-5" /></div></div>
              <div className={`${cardClass} hidden w-24 flex-col items-center justify-between border-dashed p-3 min-[901px]:flex`}><p className="text-center text-[8px]">{t.bagTag}</p><p className="font-mono text-xl font-bold">MAD</p><p className="font-mono text-[9px]">18 KG / 01</p><Barcode className="w-full" /><p className="font-mono text-[8px]">AO 004281</p></div>
            </div>
            <p className="mt-3 text-center text-[9px] text-(--device-accent)"><AirportIcon name="check" /> {t.issued}</p>
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute top-(--airport-pointer-y) left-(--airport-pointer-x) z-20 opacity-(--airport-pointer-opacity,0) motion-reduce:hidden">
        <svg viewBox="0 0 24 30" className="h-7 w-6 origin-top-left scale-(--airport-pointer-scale,1) drop-shadow-[0_2px_3px_#0006] max-[700px]:hidden"><path d="M2 2v22l6-6 5 10 5-3-5-9 9-1Z" fill="var(--pop-ink)" stroke="white" strokeWidth="1.5" strokeLinejoin="round" /></svg>
        <div className="hidden size-6 -translate-1/2 scale-(--airport-pointer-scale,1) rounded-full border-2 border-(--device-accent) bg-(--device-accent)/25 ring-4 ring-(--device-accent)/15 max-[700px]:block" />
      </div>
      <div className="flex items-center justify-between border-t border-(--device-border) px-3 py-1.5 text-[8px] text-(--device-muted)"><span><span aria-hidden="true" className="mr-1 inline-block size-1 rounded-full bg-current align-middle" />{t.connected}</span><span className="font-mono">EZE / T-A / 024</span></div>
    </div>
  );
}
