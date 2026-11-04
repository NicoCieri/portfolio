/** Architectural models on a perspective drafting surface. */
export function DesignBackground() {
  return (
    <div aria-hidden="true" className="max-[700px]:hidden pointer-events-none absolute inset-0 -z-1 overflow-hidden mask-[linear-gradient(to_bottom,transparent_22%,black_42%,black_62%,transparent_86%)] forced-colors:hidden">
      <svg viewBox="0 0 1440 800" preserveAspectRatio="xMidYMid slice" className="h-full w-full opacity-[0.09] saturate-50 min-[701px]:opacity-[0.14]" fill="none">
        <defs>
          <linearGradient id="architecture-floor" x1="720" y1="300" x2="720" y2="750" gradientUnits="userSpaceOnUse">
            <stop stopColor="var(--pop-blue)" stopOpacity=".1" />
            <stop offset="1" stopColor="var(--pop-pink)" stopOpacity=".6" />
          </linearGradient>
        </defs>
        <path d="M230 310H1210L1520 730H-80Z" fill="url(#architecture-floor)" />
        <g stroke="var(--text)" strokeOpacity=".2">
          <path d="M230 310-80 730M420 310 240 730M610 310 560 730M800 310 880 730M990 310 1200 730M1210 310 1520 730M175 385H1265M110 475H1330M35 580H1405" />
        </g>
        {/* A physical stadium model with a raised plinth and stepped seating bowl. */}
        <ellipse cx="190" cy="543" rx="208" ry="63" fill="var(--pop-ink)" opacity=".35" />
        <path d="m5 473 190-85 195 85v47l-195 90L5 520Z" fill="var(--pop-blue)" />
        <path d="m5 473 190 85 195-85-195-85Z" fill="var(--pop-paper)" />
        <path d="M195 558v52L5 520v-47Z" fill="var(--pop-ink)" opacity=".3" />
        <path d="M25 407v50a170 87 0 0 0 340 0v-50Z" fill="var(--pop-blue)" />
        <ellipse cx="195" cy="407" rx="170" ry="87" fill="var(--pop-pink)" />
        {[0, 1, 2, 3].map((tier) => (
          <ellipse key={tier} cx="195" cy={407 + tier * 9} rx={148 - tier * 15} ry={72 - tier * 9} fill={tier % 2 ? "var(--pop-blue)" : "var(--accent-violet)"} stroke="var(--pop-paper)" strokeOpacity=".35" strokeWidth="2" />
        ))}
        <ellipse cx="195" cy="438" rx="88" ry="42" fill="var(--accent-mint)" />
        <path d="m132 435 63-27 63 27-63 30Z" stroke="var(--pop-paper)" strokeWidth="2" />
        <path d="m164 421 63 30" stroke="var(--pop-paper)" strokeWidth="2" />
        {[55, 100, 145, 245, 290, 335].map((x) => <path key={x} d={`M${x} 452v29`} stroke="var(--pop-paper)" strokeWidth="5" strokeOpacity=".4" />)}
        {/* A grandstand model in perspective with colored terraces and canopy. */}
        <ellipse cx="1240" cy="563" rx="207" ry="55" fill="var(--pop-ink)" opacity=".3" />
        <path d="m1050 505 185-80 190 80v35l-190 82-185-82Z" fill="var(--pop-blue)" />
        <path d="m1050 505 185-80 190 80-190 80Z" fill="var(--pop-paper)" />
        {[0, 1, 2, 3, 4].map((row) => (
          <g key={row}>
            <path d={`m${1080 + row * 30} ${496 - row * 31} 130-56 65 28-130 56Z`} fill={row % 2 ? "var(--pop-pink)" : "var(--accent-violet)"} />
            <path d={`m${1080 + row * 30} ${496 - row * 31} 65 28v17l-65-28Z`} fill="var(--pop-blue)" />
          </g>
        ))}
        <path d="M1100 345v158m240-182v176" stroke="var(--pop-blue)" strokeWidth="12" />
        <path d="m1055 325 195-79 168 64v22l-194 80-169-65Z" fill="var(--pop-blue)" />
        <path d="m1055 325 195-79 168 64-194 80Z" fill="var(--accent-violet)" />
        <path d="m1080 327 144 54 168-69" stroke="var(--pop-paper)" strokeOpacity=".5" strokeWidth="3" />
        {/* Rolled site plan and drafting marks recede behind the models. */}
        <path d="m360 597 220-80 195 73-221 86Z" fill="var(--pop-paper)" />
        <path d="m402 594 161-57m-115 80 160-58m-99 82 160-58" stroke="var(--pop-blue)" strokeWidth="2" strokeOpacity=".5" />
        <path d="m775 590 15 18-220 85-16-17Z" fill="var(--accent-violet)" />
      </svg>
    </div>
  );
}
