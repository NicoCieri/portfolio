import type { CSSProperties } from "react";

function FlightRoute({ path, duration, delay, size }: { path: string; duration: number; delay: number; size: number }) {
  return (
    <g data-airport-flight>
      <path data-airport-route d={path} stroke="var(--accent)" strokeWidth="1.5" strokeOpacity=".6" strokeDasharray="2 9" strokeLinecap="round" />
      <g data-airport-plane
        style={{ "--flight-route": `path("${path}")`, "--flight-duration": `${duration}s`, "--flight-delay": `${delay}s` } as CSSProperties}
        className="[offset-path:var(--flight-route)] [offset-anchor:0px_0px] [offset-rotate:auto_90deg] motion-safe:animate-[airport-flight_var(--flight-duration)_linear_var(--flight-delay)_infinite] motion-reduce:[offset-distance:40%]">
        <g transform={`scale(${size})`}>
        <path d="M0-28C-4-28-5-18-5-7L-28 8v6l23-7v16l-8 6v4L0 29l13 4v-4L5 23V7l28 7V8L5-7C5-18 4-28 0-28Z" fill="var(--accent-violet)" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M-3-18h6M0 8v19" stroke="currentColor" strokeOpacity=".5" strokeWidth="1.5" />
        </g>
      </g>
    </g>
  );
}

function Suitcase() {
  return (
    <g stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M30 16V-9h37v25m-28-25v25m19-25v25" />
      <rect x="7" y="16" width="85" height="111" rx="12" fill="var(--accent-violet)" />
      <path d="M27 33v76m23-76v76m23-76v76" strokeOpacity=".5" />
      <circle cx="24" cy="134" r="5" fill="currentColor" /><circle cx="76" cy="134" r="5" fill="currentColor" />
      <path d="m85 20 31 12-4 45-34-9Z" fill="var(--surface)" /><path d="m88 40 16 6m-18 3 16 6m-18 3 16 6" strokeWidth="1.5" />
    </g>
  );
}

function BoardingPass() {
  return (
    <g stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
      <rect width="159" height="76" rx="6" fill="var(--surface)" />
      <path d="M114 0v76" strokeDasharray="3 5" />
      <path d="M13 18h39m-39 13h80m-80 17h25m13 0h27" strokeLinecap="round" />
      <path d="m79 12 7 6 10-3-6 7 1 9-7-7-10 1 7-6Z" fill="var(--accent)" strokeWidth="1" />
      {[0, 4, 9, 12, 18, 22].map(x => <path key={x} d={`M${124 + x} 14v47`} strokeWidth={x % 3 === 0 ? 3 : 1} />)}
      <path d="M13 63h39" stroke="var(--accent)" strokeWidth="3" />
    </g>
  );
}

/** Continuous flight traffic around stationary luggage and boarding passes. */
export function AirportBackground() {
  const sideClass = "absolute top-[19%] w-[clamp(190px,23vw,340px)] text-foreground opacity-[0.1] min-[701px]:opacity-[0.18]";
  return (
    <div aria-hidden="true" className="max-[700px]:hidden pointer-events-none absolute inset-0 -z-1 overflow-hidden mask-[linear-gradient(to_bottom,transparent_12%,black_30%,black_78%,transparent_98%)] forced-colors:hidden">
      {/* One shared flight surface prevents clipping at the side illustration bounds.
          Distinct bends share ordered control points, keeping the routes separated. */}
      <svg data-airport-flight-surface viewBox="0 0 1440 800" preserveAspectRatio="xMidYMid slice" fill="none" className="absolute inset-0 h-full w-full overflow-visible text-foreground opacity-[0.1] min-[701px]:opacity-[0.18]">
        <FlightRoute path="M-100 100C40 -80 190 300 360 150C560 310 810 -60 1030 100C1190 280 1370 -60 1540 130" size={0.36} duration={46} delay={-8} />
        <FlightRoute path="M1540 210C1370 70 1190 410 1030 190C810 60 560 390 360 280C190 370 40 50 -100 220" size={0.62} duration={27} delay={-18} />
        <FlightRoute path="M-100 290C40 105 190 525 360 335C560 535 810 120 1030 325C1190 460 1370 160 1540 350" size={0.48} duration={35} delay={-24} />
        <FlightRoute path="M1540 420C1370 265 1190 610 1030 390C810 270 560 590 360 475C190 580 40 245 -100 415" size={0.4} duration={42} delay={-12} />
        <FlightRoute path="M-100 490C40 300 190 725 360 530C560 725 810 320 1030 520C1190 660 1370 340 1540 555" size={0.7} duration={23} delay={-16} />
        <FlightRoute path="M1540 610C1370 455 1190 815 1030 590C810 465 560 790 360 680C190 780 40 450 -100 615" size={0.54} duration={31} delay={-25} />
      </svg>
      <svg viewBox="0 0 320 620" fill="none" className={`${sideClass} left-0 overflow-visible max-[700px]:-left-16`}>
        <g transform="translate(75 365) rotate(-6)"><Suitcase /></g>
        <g transform="translate(110 510) rotate(5)"><BoardingPass /></g>
      </svg>
      <svg viewBox="0 0 320 620" fill="none" className={`${sideClass} right-0 overflow-visible max-[700px]:-right-16`}>
        <g transform="translate(160 410) rotate(6)"><Suitcase /></g>
        <g transform="translate(45 500) rotate(-8)"><BoardingPass /></g>
      </svg>
    </div>
  );
}
