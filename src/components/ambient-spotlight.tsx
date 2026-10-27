"use client";

import { useAmbientSpotlight } from "@/hooks/use-ambient-spotlight";

export function AmbientSpotlight() {
  const overlay = useAmbientSpotlight();

  return (
    <div
      ref={overlay}
      className="
        pointer-events-none fixed inset-0 z-0 forced-colors:hidden
        [--ambient-position:var(--ambient-x,70vw)_var(--ambient-y,30vh)]
        bg-[radial-gradient(ellipse_760px_640px_at_var(--ambient-position),rgba(114,168,255,0.075)_0%,rgba(155,140,255,0.035)_38%,transparent_78%)]
        [@media(min-width:541px)_and_(hover:none)]:[--ambient-position:70vw_30vh]
        [@media(min-width:541px)_and_(pointer:coarse)]:[--ambient-position:70vw_30vh]
        [@media(min-width:541px)_and_(prefers-reduced-motion:reduce)]:[--ambient-position:70vw_30vh]
        max-[541px]:[--ambient-position:55vw_38vh]
        max-[541px]:bg-[radial-gradient(ellipse_560px_680px_at_var(--ambient-position),rgba(114,168,255,0.085)_0%,rgba(155,140,255,0.04)_40%,transparent_85%)]
        before:absolute before:inset-0 before:content-['']
        before:[--dot-size:22px] before:[--dot-radius:0.75px] before:[--dot-edge:1.25px]
        before:[--dot-mask:radial-gradient(circle_at_center,#000_var(--dot-radius),transparent_var(--dot-edge))]
        before:[--light-mask:radial-gradient(ellipse_760px_640px_at_var(--ambient-position),#000_0%,rgba(0,0,0,0.65)_38%,transparent_78%)]
        before:bg-(image:--gradient-highlight) before:opacity-[calc(0.45*var(--ambient-dot-visibility,1))]
        before:[-webkit-mask-image:var(--dot-mask),var(--light-mask)]
        before:mask-[var(--dot-mask),var(--light-mask)]
        before:[-webkit-mask-size:var(--dot-size)_var(--dot-size),100%_100%]
        before:mask-size-[var(--dot-size)_var(--dot-size),100%_100%]
        before:[-webkit-mask-repeat:repeat,no-repeat] before:[mask-repeat:repeat,no-repeat]
        before:[-webkit-mask-composite:source-in] before:mask-intersect
        max-[541px]:before:[--dot-size:20px] max-[541px]:before:[--dot-radius:0.8px]
        max-[541px]:before:[--dot-edge:1.3px] max-[541px]:before:opacity-[calc(0.35*var(--ambient-dot-visibility,1))]
      "
      aria-hidden="true"
    />
  );
}
