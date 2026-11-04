"use client";

import { useRef } from "react";

export function useThemeCurtain() {
  const curtainRef = useRef<HTMLDivElement>(null);
  const runningRef = useRef(false);

  async function playCurtain(swapTheme: () => void) {
    const curtain = curtainRef.current;
    if (!curtain || matchMedia("(prefers-reduced-motion: reduce), (max-width: 700px)").matches) {
      swapTheme();
      return;
    }
    if (runningRef.current) return;
    runningRef.current = true;

    // Freeze the target color so it does not flip when the theme changes mid-sweep.
    const falling = document.documentElement.dataset.theme !== "dark";
    curtain.style.color = getComputedStyle(document.documentElement).getPropertyValue("--theme-curtain").trim();
    curtain.style.clipPath = `url(#theme-curtain-${falling ? "fall" : "rise"})`;
    curtain.hidden = false;
    try {
      await curtain.animate(
        [{ transform: falling ? "translateY(-138svh)" : "translateY(100svh)" }, { transform: falling ? "translateY(-22svh)" : "translateY(-8svh)" }],
        { duration: 380, easing: "cubic-bezier(0.5, 0, 0.75, 0)", fill: "forwards" },
      ).finished;
      swapTheme();
      await curtain.animate(
        [{ opacity: 1 }, { opacity: 0 }],
        { duration: 280, easing: "ease-out", fill: "forwards" },
      ).finished;
    } finally {
      curtain.hidden = true;
      curtain.getAnimations().forEach((animation) => animation.cancel());
      runningRef.current = false;
    }
  }

  return { curtainRef, playCurtain };
}
