"use client";

import { sceneReflowClass } from "@/components/scene-classes";

import type { ReactNode } from "react";
import { useTicketingScroll } from "@/hooks/use-ticketing-scroll";

export function ScrollScene({ children }: { children: ReactNode }) {
  const scene = useTicketingScroll();

  return (
    <section
      ref={scene}
      id="ticketing"
      aria-labelledby="ticketing-heading"
      aria-describedby="ticketing-description"
      data-validated="false"
      data-phase="ready"
      data-revealed="false"
      className={`${sceneReflowClass} group/ticketing relative scroll-mt-0 h-[320svh] min-h-[calc(1240px+100svh)] max-[700px]:h-[338svh] max-[700px]:min-h-[calc(1612px+100svh)] text-foreground [--phone-width:clamp(116px,36vw,140px)] [--phone-gap:56px] min-[701px]:[--phone-gap:104px] [--phone-travel:clamp(8px,2.5vw,12px)] min-[701px]:[--phone-width:min(236px,22vw,29svh)] min-[701px]:[--phone-travel:clamp(60px,14vw,200px)] [@media(max-height:720px)]:[--phone-width:clamp(116px,20svh,144px)] motion-reduce:h-auto max-[700px]:motion-reduce:h-auto motion-reduce:min-h-0 max-[700px]:motion-reduce:min-h-0 motion-reduce:[--scene-progress:1] motion-reduce:[--scene-spread:0]`}
    >
      {children}
    </section>
  );
}
