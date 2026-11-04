import type { CSSProperties } from "react";

type DemoProgressProps = {
  progress?: `--${string}`;
  className?: string;
};

/** Decorative timeline; the scene's live region describes meaningful changes. */
export function DemoProgress({ progress, className = "" }: DemoProgressProps) {
  return (
    <div
      aria-hidden="true"
      data-demo-progress
      style={progress ? { "--demo-progress": `var(${progress}, 0)` } as CSSProperties : undefined}
      className={`h-1 shrink-0 overflow-hidden rounded-full bg-border ${className}`}
    >
      <div className="h-full origin-left scale-x-[clamp(0,var(--demo-progress,0),1)] rounded-full bg-accent motion-reduce:scale-x-100" />
    </div>
  );
}
