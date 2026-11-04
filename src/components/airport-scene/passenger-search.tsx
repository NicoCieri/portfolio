import { AirportIcon } from "@/components/airport-scene/airport-icon";
import type { Dictionary } from "@/i18n";

const skeleton = "rounded bg-(--device-muted)/15";

export function PassengerSearch({ t }: { t: Dictionary["airport"] }) {
  return (
    <>
      <div className="mb-3 flex items-center justify-between">
        <h3 className="grid text-[14px] font-semibold"><span className="col-start-1 row-start-1 group-data-[search-state=ready]/airport:invisible">{t.findReservation}</span><span className="invisible col-start-1 row-start-1 group-data-[search-state=ready]/airport:visible">{t.manifest}</span></h3>
        <span className="invisible text-[9px] text-(--device-muted) group-data-[search-state=ready]/airport:visible">{t.results}</span>
      </div>
      <div className="mb-3 flex items-end gap-2">
        <div className="min-w-0 flex-1"><p className="mb-1.5 text-[9px] font-medium text-(--device-muted)">{t.pnrLabel}</p>
          <div data-airport-target="pnr" className="flex h-9 items-center rounded-md border border-(--device-border) bg-(--device-screen) px-3 text-[12px] group-data-[search-state=typing]/airport:border-(--device-accent) group-data-[search-state=typing]/airport:ring-2 group-data-[search-state=typing]/airport:ring-(--device-accent)/15">
            <span data-airport-pnr className="font-mono tracking-[.15em]" /><span aria-hidden="true" className="ml-0.5 hidden h-3.5 w-px bg-(--device-accent) group-data-[search-state=typing]/airport:block" />
            <span className="text-[10px] text-(--device-muted) group-data-[search-state=typing]/airport:hidden group-data-[search-state=loading]/airport:hidden group-data-[search-state=ready]/airport:hidden">{t.pnrPlaceholder}</span>
          </div>
        </div>
        <div data-airport-target="search" className="flex h-9 min-w-20 items-center justify-center rounded-md bg-(--device-accent) px-3 text-[10px] font-semibold text-(--device-screen)"><span className="group-data-[search-state=loading]/airport:hidden">{t.searchAction}</span><span className="hidden group-data-[search-state=loading]/airport:inline">{t.searching}</span></div>
      </div>
      <div data-airport-search-results aria-busy="false" className="grid">
        <div className="col-start-1 row-start-1 flex min-h-48 flex-col items-center justify-center gap-3 rounded-md border border-dashed border-(--device-border) p-5 text-center group-data-[search-state=loading]/airport:invisible group-data-[search-state=ready]/airport:invisible">
          <svg aria-hidden="true" viewBox="0 0 32 32" className="size-8 fill-none stroke-(--device-muted)" strokeWidth="1.5"><circle cx="13" cy="13" r="8"/><path d="m19 19 8 8M10 13h6m-3-3v6"/></svg>
          <p className="max-w-[28ch] text-[11px] leading-relaxed text-(--device-muted)">{t.searchHint}</p>
        </div>
        <div className="invisible col-start-1 row-start-1 group-data-[search-state=loading]/airport:visible">
          <p className="mb-3 flex items-center gap-2 text-[10px] text-(--device-muted)"><span aria-hidden="true" className="size-3 rounded-full border-2 border-(--device-border) border-t-(--device-accent) motion-safe:animate-spin" />{t.loadingReservation}</p>
          <div aria-hidden="true" className="overflow-hidden rounded-md border border-(--device-border) bg-(--device-screen) motion-safe:min-[701px]:animate-pulse">
            <div className="flex gap-8 border-b border-(--device-border) p-3"><div className={`${skeleton} h-2 w-20`} /><div className={`${skeleton} h-2 w-8`} /><div className={`${skeleton} h-2 w-14`} /></div>
            {[0, 1, 2, 3].map(row => <div key={row} className="flex items-center gap-4 border-b border-(--device-border) px-3 py-3"><div className={`${skeleton} h-5 w-5 rounded-full`} /><div className={`${skeleton} h-2 flex-1`} /><div className={`${skeleton} h-2 w-8`} /><div className={`${skeleton} h-4 w-16`} /></div>)}
          </div>
          <div aria-hidden="true" className="mt-4 flex gap-4"><div className={`${skeleton} h-2 w-24`} /><div className={`${skeleton} h-2 w-16`} /></div>
        </div>
        <div className="invisible col-start-1 row-start-1 group-data-[search-state=ready]/airport:visible">
          <div className="overflow-hidden rounded-md border border-(--device-border) bg-(--device-screen)">
            <table className="w-full text-left text-[10px]"><thead className="text-(--device-muted)"><tr className="border-b border-(--device-border)"><th className="px-3 py-2 font-medium">{t.name}</th><th className="font-medium">{t.seat}</th><th className="px-3 font-medium">{t.status}</th></tr></thead><tbody>{["Sofía Martínez", "Diego Torres", "Emma Wilson", "Lucas Silva"].map((name, index) => <tr key={name} data-airport-target={index === 0 ? "passenger" : undefined} className={index === 0 ? "bg-(--device-selection) font-semibold text-(--device-selection-text)" : "border-t border-(--device-border)"}><td className="px-3 py-2.5">{index === 0 && <span className="mr-1"><AirportIcon name="check" /></span>}{name}</td><td className="font-mono">{["—", "14C", "18F", "22D"][index]}</td><td className="px-3">{index === 0 ? t.pending : t.checkedIn}</td></tr>)}</tbody></table>
          </div>
          <div className="mt-3 flex items-center justify-between border-b border-(--device-border) pb-3 text-[10px]"><span className="text-(--device-muted)">{t.selected} · 001</span><span className="font-semibold text-(--device-accent)">{t.openRecord}</span></div>
          <div className="mt-4 hidden min-[701px]:block"><p className="mb-2 text-[10px] font-medium tracking-wide text-(--device-muted) uppercase">{t.flightContext}</p><dl className="grid grid-cols-3 gap-2">{[[t.aircraft, "A320 · 180Y"], [t.destination, "MAD / T4"], [t.departure, "22:45"]].map(([label, value]) => <div key={label} className="border-l-2 border-(--device-border) pl-2"><dt className="text-[10px] text-(--device-muted)">{label}</dt><dd className="mt-1 font-mono text-[11px] font-semibold">{value}</dd></div>)}</dl></div>
        </div>
      </div>
    </>
  );
}
