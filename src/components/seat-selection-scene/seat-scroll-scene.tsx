"use client";

import { sceneReflowClass } from "@/components/scene-classes";

import type { ReactNode } from "react";
import { useSeatSelectionScroll } from "@/hooks/use-seat-selection-scroll";

export function SeatScrollScene({ children }: { children: ReactNode }) {
  const scene = useSeatSelectionScroll();
  return (
    <section ref={scene} id="seat-selection" aria-labelledby="booking-heading" aria-describedby="booking-description" data-step="1" data-phase="explore" data-view="map" data-count="0" data-section="N-03"
      className={`${sceneReflowClass} [view-timeline-name:--section-atmosphere] [view-timeline-axis:block] group/booking relative h-[600svh] min-h-[calc(2800px+100svh)] max-[700px]:h-[585svh] max-[700px]:min-h-[calc(3276px+100svh)] text-foreground [--booking-map-zoom:0] [--booking-section:0] [--booking-grid:0] [--booking-pan-x:0] [--booking-pan-y:0] [--booking-seat-zoom:0] [--booking-selected-1:0] [--booking-selected-2:0] [--booking-selected-3:0] [--booking-cursor-opacity:0] motion-reduce:h-auto max-[700px]:motion-reduce:h-auto motion-reduce:min-h-0 max-[700px]:motion-reduce:min-h-0 motion-reduce:[--booking-grid:1] motion-reduce:[--booking-map-opacity:0] motion-reduce:[--booking-pan-x:1] motion-reduce:[--booking-pan-y:1] motion-reduce:[--booking-seat-zoom:1] motion-reduce:[--booking-selected-1:1] motion-reduce:[--booking-selected-2:1] motion-reduce:[--booking-selected-3:1]`}>
      {children}
    </section>
  );
}
