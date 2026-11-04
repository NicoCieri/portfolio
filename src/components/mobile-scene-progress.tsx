export function MobileSceneProgress() {
  return (
    <div
      aria-hidden="true"
      data-mobile-scene-progress
      className="pointer-events-none absolute bottom-[max(20px,env(safe-area-inset-bottom))] left-1/2 z-20 size-20 -translate-x-1/2 text-accent [--ring-fill:clamp(0,calc(var(--scene-travel,0)/0.94),1)] min-[701px]:hidden motion-reduce:hidden [@media(scripting:none)]:hidden [@media(max-height:600px),(max-width:359px)]:hidden"
    >
      <svg viewBox="0 0 80 80" fill="none" stroke="currentColor" className="size-full">
        <circle cx="40" cy="40" r="29" strokeWidth="2" className="stroke-border" />
        <g className="origin-center -rotate-90">
          <circle cx="40" cy="40" r="29" pathLength="1" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="1" className="[stroke-dashoffset:calc(1_-_var(--ring-fill))]" />
        </g>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center gap-0.5 font-mono text-[17px] font-medium tabular-nums">
        <span data-scene-progress-label>0</span><span className="text-[10px] text-secondary">%</span>
      </div>
    </div>
  );
}
