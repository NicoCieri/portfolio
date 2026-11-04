"use client";

import { sceneReflowClass } from "@/components/scene-classes";

import type { ReactNode } from "react";
import { useCommerceScroll } from "@/hooks/use-commerce-scroll";

export function CommerceScrollScene({ children }: { children: ReactNode }) {
  const scene = useCommerceScroll();
  return <section ref={scene} id="ecommerce" aria-labelledby="commerce-heading" className={`${sceneReflowClass} [@media(scripting:enabled)]:[--scene-content-reveal:0] motion-reduce:[--scene-content-reveal:1] [view-timeline-name:--section-atmosphere] [view-timeline-axis:block] group/commerce relative h-[680svh] min-h-[calc(3400px+160svh)] max-[700px]:h-[702svh] max-[700px]:min-h-[calc(4420px+160svh)] [--commerce-progress:0] [--commerce-detail:0] [--commerce-complete:0] [--commerce-variant:0] [--commerce-cart:0] [--commerce-drawer:0] [--commerce-flight:0] [--commerce-flying:0] [--commerce-checkout:0] [--commerce-entrance:0] [--commerce-pointer:0] motion-reduce:h-auto max-[700px]:motion-reduce:h-auto motion-reduce:min-h-0 max-[700px]:motion-reduce:min-h-0 motion-reduce:[--commerce-detail:1] motion-reduce:[--commerce-complete:1] motion-reduce:[--commerce-checkout:1] motion-reduce:[--commerce-cart:1] motion-reduce:[--commerce-variant:1] motion-reduce:[--commerce-entrance:1]`} data-phase="discover">{children}</section>;
}
