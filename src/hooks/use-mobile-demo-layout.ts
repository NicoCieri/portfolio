"use client";

import { useLayoutEffect, useRef } from "react";

const ART_WIDTH = 360;

/** Fits only the illustration into the space left by the mobile text/controls. */
export function useMobileDemoLayout() {
  const stage = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const element = stage.current;
    const art = element?.querySelector<HTMLElement>("[data-mobile-demo-art]");
    const viewport = element?.closest<HTMLElement>("[data-mobile-demo-viewport]");
    if (!element || !art || !viewport) return;
    const mobile = window.matchMedia("(max-width: 700px)");
    let frame: number | null = null;

    function measure() {
      frame = null;
      if (!element || !art || !viewport) return;
      if (!mobile.matches) {
        element.style.removeProperty("--demo-scale");
        element.style.removeProperty("--demo-stage-height");
        return;
      }
      const naturalHeight = art.offsetHeight;
      if (!naturalHeight) return;
      const style = getComputedStyle(viewport);
      const flow = Array.from(viewport.children).filter((child) => {
        const childStyle = getComputedStyle(child);
        return childStyle.position !== "absolute" && childStyle.position !== "fixed" && childStyle.display !== "none";
      });
      const occupied = flow.reduce((height, child) => height + (child as HTMLElement).offsetHeight, 0) - element.offsetHeight;
      const spacing = parseFloat(style.paddingTop) + parseFloat(style.paddingBottom) + (parseFloat(style.rowGap) || 0) * Math.max(0, flow.length - 1);
      // Compact/reduced-motion fallbacks are in normal flow and need only width fitting.
      const available = style.position === "sticky" ? Math.max(0, viewport.clientHeight - occupied - spacing - 4) : Infinity;
      const fillSpace = element.hasAttribute("data-mobile-demo-fill");
      const scale = Math.max(0.05, Math.min(fillSpace ? 1.15 : 0.85, element.clientWidth / ART_WIDTH, available / naturalHeight));
      const stageHeight = fillSpace && Number.isFinite(available) ? available : naturalHeight * scale;
      const values = { "--demo-scale": scale.toFixed(4), "--demo-stage-height": `${Math.floor(stageHeight)}px` };
      for (const [name, value] of Object.entries(values)) {
        if (element.style.getPropertyValue(name) !== value) element.style.setProperty(name, value);
      }
    }
    function schedule() {
      if (frame === null) frame = requestAnimationFrame(measure);
    }
    const observer = new ResizeObserver(schedule);
    observer.observe(viewport);
    observer.observe(art);
    for (const child of viewport.children) {
      if (getComputedStyle(child).position !== "absolute") observer.observe(child);
    }
    mobile.addEventListener("change", schedule);
    window.addEventListener("resize", schedule, { passive: true });
    measure();
    return () => {
      if (frame !== null) cancelAnimationFrame(frame);
      observer.disconnect();
      mobile.removeEventListener("change", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return stage;
}
