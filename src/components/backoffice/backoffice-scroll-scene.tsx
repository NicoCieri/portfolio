"use client";

import { sceneReflowClass } from "@/components/scene-classes";

import type { ReactNode } from "react";
import { useBackofficeScroll } from "@/hooks/use-backoffice-scroll";

export function BackofficeScrollScene({ children }: { children: ReactNode }) {
  const scene = useBackofficeScroll();
  return <section ref={scene} id="backoffice" aria-labelledby="backoffice-heading" aria-describedby="backoffice-description" data-phase="queue" data-changed="false" className={`${sceneReflowClass} [@media(scripting:enabled)]:[--scene-content-reveal:0] motion-reduce:[--scene-content-reveal:1] [view-timeline-name:--section-atmosphere] [view-timeline-axis:block] group/backoffice relative h-[560svh] min-h-[calc(2600px+160svh)] max-[700px]:h-[880svh] max-[700px]:min-h-[calc(5200px+160svh)] [--bo-progress:0] [--bo-panel:0] [--bo-selected:0] [--bo-cursor-opacity:0] motion-reduce:h-auto max-[700px]:motion-reduce:h-auto motion-reduce:min-h-0 max-[700px]:motion-reduce:min-h-0 motion-reduce:[--bo-panel:1] motion-reduce:[--bo-selected:1]`}>{children}</section>;
}
