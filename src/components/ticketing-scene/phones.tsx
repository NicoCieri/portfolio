"use client";

import { DevicePhone } from "@/components/devices/device-phone";
import { Hand } from "@/components/ticketing-scene/hand";
import { DemoQr } from "@/components/ticketing-scene/demo-qr";
import { useTranslations } from "@/hooks/use-translations";

const initialState = "absolute inset-0 flex flex-col p-3 opacity-100 transition-opacity duration-200 group-data-[validated=true]/ticketing:opacity-0 min-[701px]:p-5 max-[700px]:transition-none motion-reduce:transition-none";
const successState = "absolute inset-0 flex items-center justify-center px-3 text-center opacity-0 transition-opacity duration-300 group-data-[validated=true]/ticketing:opacity-100 min-[701px]:px-5 max-[700px]:transition-none motion-reduce:transition-none";
const attendeeReveal = "translate-y-2 scale-95 opacity-0 transition-[opacity,translate,scale] duration-500 ease-out group-data-[revealed=true]/ticketing:translate-y-0 group-data-[revealed=true]/ticketing:scale-100 group-data-[revealed=true]/ticketing:opacity-100 max-[700px]:transition-none motion-reduce:transition-none";
const controllerReveal = "translate-y-2 scale-95 opacity-0 transition-[opacity,translate,scale] duration-500 ease-out group-data-[validated=true]/ticketing:translate-y-0 group-data-[validated=true]/ticketing:scale-100 group-data-[validated=true]/ticketing:opacity-100 max-[700px]:transition-none motion-reduce:transition-none";
const attendeeCheck = "[stroke-dashoffset:1] transition-[stroke-dashoffset] delay-100 duration-500 ease-out group-data-[revealed=true]/ticketing:[stroke-dashoffset:0] max-[700px]:transition-none motion-reduce:transition-none";
const controllerCheck = "[stroke-dashoffset:1] transition-[stroke-dashoffset] delay-100 duration-500 ease-out group-data-[validated=true]/ticketing:[stroke-dashoffset:0] max-[700px]:transition-none motion-reduce:transition-none";

function SuccessScreen({ controller }: { controller: boolean }) {
  const t = useTranslations().ticketing.phone;
  return (
    <div className={`${successState} ${controller ? "bg-(--phone-success)" : "bg-(--phone-screen)"}`}>
      <div className={`flex w-full flex-col items-center ${controller ? controllerReveal : attendeeReveal}`}>
        <div className={`relative mb-3 flex size-12 shrink-0 items-center justify-center rounded-full min-[701px]:mb-4 min-[701px]:size-20 ${controller ? "bg-(--phone-badge) text-(--phone-badge-text)" : "bg-(--pop-blue) text-(--pop-paper)"}`}>
          {!controller && <svg viewBox="0 0 100 100" className="pointer-events-none absolute -inset-3 size-[calc(100%_+_24px)] text-(--pop-pink)" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="m50 4 0 6m32 8-4 4m18 28h-6m-8 32-4-4m-28 18v-6m-32-8 4-4M4 50h6m8-32 4 4" /></svg>}
          <svg viewBox="0 0 64 64" className="w-4/5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="32" cy="32" r="25" strokeOpacity=".3" /><path d="m19 32 9 9 18-20" pathLength="1" strokeDasharray="1" className={controller ? controllerCheck : attendeeCheck} /></svg>
        </div>
        <p className="text-[20px] leading-[1.1] font-bold tracking-tight min-[701px]:text-[30px]">{controller ? t.accessGranted : t.youreIn}</p>
        <p className="mt-3 text-[12px] leading-relaxed min-[701px]:text-small">{controller ? t.attendeeMayEnter : t.ticketConfirmed}</p>
        <p className="mt-2 hidden text-small leading-relaxed min-[701px]:block">{controller ? t.controllerDetail : t.attendeeDetail}</p>
        <span className="mt-4 max-w-full rounded-full bg-(--phone-badge) px-3 py-1.5 text-[11px] font-semibold text-(--phone-badge-text) min-[701px]:text-meta">{controller ? t.demoScan : t.demoPass}</span>
      </div>
    </div>
  );
}

export function Phone({ side }: { side: "attendee" | "controller" }) {
  const controller = side === "controller";
  const t = useTranslations().ticketing.phone;
  return (
    <div
      aria-hidden="true"
      className={`absolute text-(--phone-text) top-[53%] left-1/2 [@media(max-height:720px)]:top-[54%] aspect-[1/2.05] w-(--phone-width) ${controller
        ? "z-20 [transform:translate(calc(var(--phone-gap)_/_2_+_var(--scene-spread,1)_*_var(--phone-travel)_-_var(--scene-overlap,0)*((var(--phone-width)_+_var(--phone-gap))/_2)),calc(-50%_+_var(--scene-overlap,0)*var(--phone-width)*0.18))_rotate(calc(8deg_-_var(--scene-progress,0)_*_6deg))]"
        : "z-10 [transform:translate(calc(-100%_-_var(--phone-gap)_/_2_-_var(--scene-spread,1)_*_var(--phone-travel)_+_var(--scene-overlap,0)*((var(--phone-width)_+_var(--phone-gap))/_2)),-50%)_rotate(calc(-8deg_+_var(--scene-progress,0)_*_6deg))]"}`}
    >
      <Hand side={side} />
      <Hand side={side} thumb />
      <DevicePhone className="h-full" aspectRatio="auto" transparent={controller} screenBackground="var(--phone-screen)" screenClassName="text-(--phone-text)" showHomeIndicator={false}>
        {/* Only the compact scanner controls are painted; the viewfinder stays transparent. */}
        <div className={initialState}>
          <p className={`mt-3 text-[11px] font-bold min-[701px]:mt-5 min-[701px]:text-small ${controller ? "relative z-10 self-start rounded-lg border border-(--phone-border) bg-(--phone-panel) px-2 py-1" : ""}`}>{controller ? t.accessTitle : t.ticketTitle}</p>
          {controller ? (
            <>
              <div className="absolute inset-x-2 top-[20%] bottom-[17%] min-[701px]:inset-x-3">
                <svg viewBox="0 0 100 180" preserveAspectRatio="none" className="h-full w-full" fill="none" stroke="var(--phone-accent)" strokeWidth="2" strokeLinecap="round"><path d="M4 24V4h20M76 4h20v20M96 156v20H76M24 176H4v-20" /><path d="M8 106H92" stroke="var(--pop-pink)" strokeOpacity="1" /></svg>
              </div>
              <div className="absolute inset-x-2 bottom-2 rounded-lg border border-(--phone-border) bg-(--phone-panel) px-2 py-1.5 min-[701px]:inset-x-3 min-[701px]:bottom-3 min-[701px]:py-2">
                <p className="text-[12px] leading-tight font-bold group-data-[phase=scanning]/ticketing:hidden min-[701px]:text-small">{t.readyToScan}</p>
                <p className="hidden text-[12px] leading-tight font-bold group-data-[phase=scanning]/ticketing:block min-[701px]:text-small">{t.readingTicket}</p>
                <p className="mt-1 text-[11px] text-(--phone-accent) min-[701px]:text-meta">{t.gateDemo}</p>
              </div>
            </>
          ) : (
            <>
              <div className="relative mt-3 overflow-hidden rounded-lg bg-(--pop-blue) p-2 text-(--pop-paper) min-[701px]:mt-5 min-[701px]:p-4">
                <span className="absolute -top-4 -right-5 size-16 rounded-full border-[10px] border-(--pop-pink) min-[701px]:size-24" />
                <p className="relative text-[18px] leading-[1.05] font-bold min-[701px]:text-[30px]">Orbit<br />Social</p>
                <p className="relative mt-2 hidden min-[701px]:block min-[701px]:text-meta">{t.eventTagline}</p>
              </div>
              <div className="my-3 flex min-h-0 flex-1 items-center justify-center"><DemoQr /></div>
              <p className="text-[12px] font-medium min-[701px]:text-small">{t.generalEntry}</p>
              <p className="mt-1 font-mono text-[10px] min-[701px]:text-meta">{t.ticketCode}</p>
            </>
          )}
        </div>
        <SuccessScreen controller={controller} />
      </DevicePhone>
    </div>
  );
}
