// Sticky viewports use svh, which stays stable as mobile browser chrome opens or
// closes. Use that same reference for mobile progress instead of innerHeight.
// Desktop keeps its existing timing.
export function sceneScreenHeight(viewport: HTMLElement) {
  return window.matchMedia("(max-width: 700px)").matches ? viewport.offsetHeight : window.innerHeight;
}

// Reserve most of a screen of sticky travel after the narrative reaches 100%.
// Scene wrappers add one screen of height so the existing actions keep their spacing.
export function scrollSceneRange(sectionHeight: number, viewportHeight: number, windowHeight: number, entryLead = 0) {
  return Math.max(1, sectionHeight - viewportHeight + entryLead - windowHeight * 0.85);
}

// Initial skeleton: hold for 0.2 screens, then crossfade over 0.4 screens.
export const SCENE_INTRO_SCREENS = 0.6;
export function sceneContentReveal(scrollDistance: number, windowHeight: number) {
  const fraction = Math.max(0, Math.min(1, (scrollDistance / windowHeight - 0.2) / 0.4));
  return fraction * fraction * (3 - 2 * fraction);
}

// Give selected narrative intervals more scroll distance without using a clock.
export function mapSceneProgress(value: number, intervals: readonly (readonly [end: number, weight: number])[]) {
  const progress = Math.max(0, Math.min(1, value));
  let previous = 0;
  const total = intervals.reduce((sum, [end, weight]) => {
    const distance = (end - previous) * weight;
    previous = end;
    return sum + distance;
  }, 0);
  let remaining = progress * total;
  previous = 0;
  for (const [end, weight] of intervals) {
    const distance = (end - previous) * weight;
    if (remaining <= distance) return previous + remaining / weight;
    remaining -= distance;
    previous = end;
  }
  return 1;
}
