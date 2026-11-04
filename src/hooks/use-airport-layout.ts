"use client";

import { useEffect, useRef } from "react";

/** Fit the operational screen into the space left by the narrative and steps. */
export function useAirportLayout() {
  const stage = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = stage.current;
    const viewport = element?.closest<HTMLElement>("[data-airport-viewport]");
    const art = element?.querySelector<HTMLElement>("[data-airport-art]");
    if (!element || !viewport || !art) return;
    let frame: number | null = null;
    function measure() {
      frame = null;
      if (!element || !viewport || !art) return;
      const style = getComputedStyle(viewport);
      const flow = Array.from(viewport.children).filter(child => {
        const childStyle = getComputedStyle(child);
        return childStyle.position !== "absolute" && childStyle.display !== "none";
      });
      const used = flow.reduce((height, child) => height + (child as HTMLElement).offsetHeight, 0) - element.offsetHeight;
      const spacing = parseFloat(style.paddingTop) + parseFloat(style.paddingBottom) + (parseFloat(style.rowGap) || 0) * Math.max(0, flow.length - 1);
      const available = style.position === "sticky" ? Math.max(0, viewport.clientHeight - used - spacing - 4) : Infinity;
      const scale = Math.min(1, element.clientWidth / art.offsetWidth, available / art.offsetHeight);
      element.style.setProperty("--airport-scale", String(Math.max(0.05, scale)));
      const fillSpace = window.matchMedia("(max-width: 700px)").matches && Number.isFinite(available);
      element.style.height = `${Math.floor(fillSpace ? available : art.offsetHeight * Math.max(0.05, scale))}px`;
    }
    function schedule() {
      if (frame === null) frame = requestAnimationFrame(measure);
    }
    const observer = new ResizeObserver(schedule);
    observer.observe(art);
    observer.observe(viewport);
    for (const child of viewport.children) observer.observe(child);
    window.addEventListener("resize", schedule);
    measure();
    return () => {
      if (frame !== null) cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", schedule);
    };
  }, []);
  return stage;
}
