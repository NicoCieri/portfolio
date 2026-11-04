const drift = "motion-safe:supports-[animation-timeline:view()]:animate-[section-atmosphere-drift_1s_linear_both] motion-safe:supports-[animation-timeline:view()]:[animation-timeline:--section-atmosphere] motion-safe:supports-[animation-timeline:view()]:[animation-range:entry_0%_exit_100%]";

const tones = {
  violet: "[--atmosphere-main:var(--accent)] [--atmosphere-secondary:var(--accent-lime)]",
  pink: "[--atmosphere-main:var(--accent-lime)] [--atmosphere-secondary:var(--accent)]",
  mint: "[--atmosphere-main:var(--accent-mint)] [--atmosphere-secondary:var(--accent-lime)]",
};

/** Decorative layers follow the containing section's named view timeline. */
export function SectionAtmosphere({ tone = "violet" }: { tone?: keyof typeof tones }) {
  return (
    <div aria-hidden="true" className={`max-[700px]:hidden pointer-events-none absolute inset-0 -z-1 overflow-hidden mask-[linear-gradient(to_bottom,transparent,black_16%,black_84%,transparent)] forced-colors:hidden ${tones[tone]}`}>
      <div className={`absolute -left-[18%] top-[8%] size-[clamp(340px,65vw,800px)] rounded-full bg-[radial-gradient(circle,var(--atmosphere-main),transparent_70%)] opacity-[0.16] max-[700px]:opacity-[0.12] ${drift}`} />
      <div className={`absolute -right-[16%] bottom-[8%] size-[clamp(300px,55vw,680px)] rounded-full bg-[radial-gradient(circle,var(--atmosphere-secondary),transparent_70%)] opacity-[0.18] [--atmosphere-start-x:4vw] [--atmosphere-start-y:38svh] [--atmosphere-end-x:-6vw] [--atmosphere-end-y:-38svh] max-[700px]:opacity-[0.13] ${drift}`} />
    </div>
  );
}
