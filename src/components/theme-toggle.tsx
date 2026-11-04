"use client";

import { Button } from "@/components/button";

import { useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { useTheme } from "@/hooks/use-theme";
import { useThemeCurtain } from "@/hooks/use-theme-curtain";
import { useTranslations } from "@/hooks/use-translations";

const sceneClass = "pointer-events-none absolute inset-0 size-full opacity-0 transition-opacity duration-(--motion-fast) group-hover:opacity-100 group-active:opacity-100 forced-colors:hidden";

const starTwinkles = [
  "theme-star [animation:theme-star-twinkle_1.6s_ease-in-out_infinite]",
  "theme-star [animation:theme-star-twinkle_2.2s_ease-in-out_0.35s_infinite]",
  "theme-star [animation:theme-star-twinkle_1.8s_ease-in-out_0.8s_infinite]",
  "theme-star [animation:theme-star-twinkle_2.4s_ease-in-out_0.15s_infinite]",
  "theme-star [animation:theme-star-twinkle_1.5s_ease-in-out_1s_infinite]",
];

const cloudMotion = "opacity-0 transition-[transform,opacity] duration-300 ease-out group-hover:opacity-100 group-active:opacity-100 motion-reduce:transition-none";

function ThemeScene({ night }: { night: boolean }) {
  if (night) {
    return (
      <svg aria-hidden="true" viewBox="0 0 44 44" className={`${sceneClass} text-(--pop-paper)`} fill="currentColor">
        <path className={starTwinkles[0]} d="M11 7.5 11.7 9.6 13.8 10.3 11.7 11 11 13.1 10.3 11 8.2 10.3 10.3 9.6Z" />
        <path className={starTwinkles[1]} d="M34 29.2 34.6 30.8 36.2 31.4 34.6 32 34 33.6 33.4 32 31.8 31.4 33.4 30.8Z" />
        <circle className={starTwinkles[2]} cx="34" cy="11" r="1.35" />
        <circle className={starTwinkles[3]} cx="10" cy="30" r="1.05" />
        <circle className={starTwinkles[4]} cx="29" cy="37" r="0.9" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 44 44" className="pointer-events-none absolute inset-0 size-full forced-colors:hidden" fill="#fff">
      <g className={`${cloudMotion} [transform:translateX(16px)] group-hover:[transform:translateX(0)] group-active:[transform:translateX(0)]`}>
        <path d="M28.4 13.2c.2-1.7 1.7-2.7 3.2-2.2.5-1.5 2.4-2 3.6-.7 1.1-1 2.9-.7 3.5.6 1.4-.1 2.6 1 2.3 2.4.8.4 1 1.4.3 2H28.6c-.4-.6-.4-1.4-.2-2.1z" />
      </g>
      <g className={`${cloudMotion} [transform:translateX(-16px)] group-hover:[transform:translateX(0)] group-active:[transform:translateX(0)]`}>
        <path d="M6.2 32.4c.2-1.6 1.6-2.5 3-2 .5-1.4 2.2-1.9 3.3-.6 1-.9 2.6-.6 3.2.6 1.3-.1 2.4.9 2.1 2.2.7.4.9 1.3.3 1.8H6.4c-.4-.5-.4-1.3-.2-2z" />
      </g>
    </svg>
  );
}

function Sun() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="relative z-1 size-6" fill="currentColor">
      <circle cx="12" cy="12" r="3.7" />
      {Array.from({ length: 8 }, (_, index) => (
        <rect key={index} x="11.15" y="4.55" width="1.7" height="2.85" rx="0.85" transform={`rotate(${index * 45} 12 12)`} />
      ))}
    </svg>
  );
}

const buttonClass = [
  "group relative inline-flex items-center justify-center overflow-hidden rounded-full border border-border bg-surface/50 text-secondary",
  "transition-[background-color,color,transform,box-shadow,border-color] duration-(--motion-fast)",
  "hover:border-transparent active:border-transparent active:shadow-[inset_0_2px_5px_#00000055]",
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent",
  "forced-colors:hover:bg-Highlight forced-colors:hover:text-HighlightText forced-colors:active:bg-Highlight forced-colors:active:text-HighlightText",
].join(" ");

const nightScene = "hover:bg-(--theme-toggle-night) hover:text-(--theme-toggle-night-icon) active:bg-(--theme-toggle-night-pressed) active:text-(--theme-toggle-night-icon)";
const dayScene = "hover:bg-(--theme-toggle-day) hover:text-(--theme-toggle-day-icon) active:bg-(--theme-toggle-day-pressed) active:text-(--theme-toggle-day-icon)";

function subscribeToHydration() {
  return () => {};
}

export function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();
  const t = useTranslations();
  const { curtainRef, playCurtain } = useThemeCurtain();
  const mounted = useSyncExternalStore(subscribeToHydration, () => true, () => false);

  return (
    <>
    {mounted && createPortal(
      <>
        <svg width="0" height="0" className="absolute" aria-hidden="true">
          <clipPath id="theme-curtain-rise" clipPathUnits="objectBoundingBox">
            <path d="M0 .031Q.0625 0 .125 .031T.25 .031T.375 .031T.5 .031T.625 .031T.75 .031T.875 .031T1 .031V1H0Z" />
          </clipPath>
          <clipPath id="theme-curtain-fall" clipPathUnits="objectBoundingBox">
            <path d="M0 .969Q.0625 1 .125 .969T.25 .969T.375 .969T.5 .969T.625 .969T.75 .969T.875 .969T1 .969V0H0Z" />
          </clipPath>
        </svg>
        <div ref={curtainRef} hidden aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-100 h-[130svh] bg-current will-change-[transform,opacity]" />
      </>,
      document.body,
    )}
    <Button variant="custom" size="icon"
      type="button"
      onClick={() => playCurtain(toggleTheme)}
      aria-label={t.themeToggle.ariaLabel}
      aria-pressed={isDark}
      title={isDark ? t.themeToggle.toLight : t.themeToggle.toDark}
      className={`${buttonClass} ${isDark ? dayScene : nightScene}`}
    >
      <ThemeScene night={!isDark} />
      {isDark ? <Sun /> : (
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="relative z-1 size-5">
          <path d="M20.5 14A8.5 8.5 0 0 1 10 3.5 8.5 8.5 0 1 0 20.5 14Z" />
        </svg>
      )}
    </Button>
    </>
  );
}
