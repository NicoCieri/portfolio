"use client";

import { sceneReflowClass } from "@/components/scene-classes";

import type { ReactNode } from "react";
import { useCraftScroll } from "@/hooks/use-craft-scroll";

export function CraftScrollScene({ children }: { children: ReactNode }) {
  const scene = useCraftScroll();

  return (
    <section ref={scene} id="craft" aria-labelledby="craft-heading" className={`${sceneReflowClass} [view-timeline-name:--section-atmosphere] [view-timeline-axis:block] group/craft relative my-8 h-[420svh] max-[700px]:h-[680svh] scroll-mt-0 py-4 [--craft-progress:0] min-[701px]:my-10 min-[701px]:py-5 motion-reduce:h-auto max-[700px]:motion-reduce:h-auto motion-reduce:py-0`}>
      {children}
    </section>
  );
}
