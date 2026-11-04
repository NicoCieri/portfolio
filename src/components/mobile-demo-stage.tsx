"use client";

import type { CSSProperties, ReactNode } from "react";
import { useMobileDemoLayout } from "@/hooks/use-mobile-demo-layout";

export const mobileDemoViewportClass = "max-[700px]:h-[calc(100dvh-env(safe-area-inset-bottom))] max-[700px]:min-h-0 max-[700px]:justify-start max-[700px]:gap-3 max-[700px]:pt-3! max-[700px]:pb-5! max-[700px]:[&>*]:shrink-0";
export const mobileDemoHeaderClass = "max-[700px]:shrink-0 max-[700px]:pt-0! max-[700px]:mb-0! max-[700px]:[&_h2]:text-[26px]! max-[700px]:[&_h2]:leading-[1.08]! max-[700px]:[&>p]:text-[12px] max-[700px]:[&>div]:mt-2 max-[700px]:[&>div]:gap-2 max-[700px]:[&>div>p]:text-[14px]! max-[700px]:[&>div>p]:leading-[1.5]!";
export const mobileDemoFigureClass = "max-[700px]:max-w-none! max-[700px]:shrink-0 max-[700px]:[&>figcaption]:hidden";

export function MobileDemoStage({ children, height, fillSpace = false }: { children: ReactNode; height?: number; fillSpace?: boolean }) {
  const stage = useMobileDemoLayout();
  return (
    <div ref={stage} data-mobile-demo-fill={fillSpace || undefined} className="contents max-[700px]:relative max-[700px]:block max-[700px]:h-[var(--demo-stage-height,240px)] max-[700px]:w-full max-[700px]:overflow-hidden">
      <div data-mobile-demo-art style={height ? { "--demo-base-height": `${height}px` } as CSSProperties : undefined} className={`contents max-[700px]:absolute max-[700px]:left-1/2 max-[700px]:block max-[700px]:h-[var(--demo-base-height,auto)] max-[700px]:w-[360px] ${fillSpace ? "max-[700px]:top-1/2 max-[700px]:[transform:translate(-50%,-50%)_scale(var(--demo-scale,0.7))] max-[700px]:origin-center" : "max-[700px]:origin-top max-[700px]:top-0 max-[700px]:[transform:translateX(-50%)_scale(var(--demo-scale,0.7))]"}`}>
        {children}
      </div>
    </div>
  );
}
