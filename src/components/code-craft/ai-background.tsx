/** Quiet AI computing and agent context behind the orchestration demo. */
export function AiBackground() {
  return (
    <div aria-hidden="true" className="max-[700px]:hidden pointer-events-none absolute inset-0 -z-1 overflow-hidden mask-[linear-gradient(to_bottom,transparent_22%,black_42%,black_62%,transparent_86%)] forced-colors:hidden">
      <svg viewBox="0 0 1440 800" preserveAspectRatio="xMidYMid slice" className="h-full w-full opacity-[0.09] saturate-50 min-[701px]:opacity-[0.14]" fill="none">
        <defs>
          <linearGradient id="ai-floor" x1="720" y1="260" x2="720" y2="750" gradientUnits="userSpaceOnUse">
            <stop stopColor="var(--pop-blue)" stopOpacity=".1" />
            <stop offset="1" stopColor="var(--accent-violet)" stopOpacity=".7" />
          </linearGradient>
        </defs>
        <path d="M200 280H1240L1530 760H-90Z" fill="url(#ai-floor)" />
        <ellipse cx="25" cy="560" rx="190" ry="50" fill="var(--pop-ink)" opacity=".3" />
        <ellipse cx="1410" cy="570" rx="190" ry="50" fill="var(--pop-ink)" opacity=".3" />
        <g transform="translate(-135 0) rotate(-8 150 390)">
          <rect x="75" y="322" width="180" height="180" rx="20" fill="var(--pop-blue)" />
        {/* A processor with branching circuit traces, without moving signals. */}
        <g stroke="var(--accent)" strokeWidth="2" strokeLinejoin="round">
          <rect x="60" y="300" width="180" height="180" rx="20" fill="var(--accent-violet)" />
          <rect x="80" y="320" width="140" height="140" rx="12" fill="var(--pop-blue)" strokeOpacity=".5" />
          {[0, 1, 2, 3, 4].map((pin) => (
            <g key={pin}>
              <path d={`M${106 + pin * 22} 300v-22m0 202v22M60 ${346 + pin * 22}H38m202 0h22`} />
            </g>
          ))}
          <path d="M106 278v-42H55v-45M194 278v-62h94v-42M38 368H12v-96M262 368h56v-94h75M262 434h72v100h70M106 502v50H44v61M194 502v85h93v62" strokeOpacity=".55" />
        </g>
        <g fill="var(--surface)" stroke="var(--accent)" strokeWidth="2">
          {[[55, 191], [288, 174], [12, 272], [393, 274], [404, 534], [44, 613], [287, 649]].map(([x, y]) => <circle key={x} cx={x} cy={y} r="5" />)}
        </g>
        <g stroke="var(--text)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="m106 409 18-48 18 48m-29-16h22m25-32h22m-11 0v48m-11 0h22" />
        </g>

        </g>
        <g transform="translate(170 0) rotate(7 1220 390)">
          <rect x="1125" y="260" width="214" height="130" rx="12" fill="var(--pop-blue)" />
          <rect x="1110" y="245" width="214" height="130" rx="12" fill="var(--pop-pink)" />
        {/* Layered context windows and an agent assistant. */}
        <g stroke="var(--text)" strokeOpacity=".65" strokeWidth="2">
          <path d="M1110 285v-28a12 12 0 0 1 12-12h190a12 12 0 0 1 12 12v118" />
          <rect x="1085" y="280" width="214" height="130" rx="12" fill="var(--pop-paper)" />
          <path d="M1085 310h214M1105 295h5m10 0h5m10 0h5M1110 333h142m-142 18h115m-115 18h80" strokeLinecap="round" />
          <path d="M1220 455v-24m-6-7a6 6 0 1 0 12 0 6 6 0 1 0-12 0Z" />
          <rect x="1165" y="455" width="110" height="80" rx="22" fill="var(--accent-violet)" />
          <rect x="1178" y="471" width="84" height="34" rx="12" fill="var(--pop-blue)" />
          <path d="M1165 480h-10v29h10m110-29h10v29h-10m-65 14h20" />
          <circle cx="1201" cy="488" r="5" fill="var(--accent)" />
          <circle cx="1239" cy="488" r="5" fill="var(--accent)" />
        </g>
        <path d="m1350 380 8 23 23 8-23 8-8 23-8-23-23-8 23-8Z" stroke="var(--accent)" strokeWidth="2" fill="var(--accent)" fillOpacity=".8" />

        </g>
        {/* A sparse neural texture stays behind the primary agent connections. */}
        <g stroke="var(--text)" strokeOpacity=".3" strokeWidth="1.5">
          <path d="m360 620 160-65 160 70 190-55 180 65m-530-80 40-300 120 370 70-335 120 280 75-305" />
          {[[360, 620], [520, 555], [680, 625], [870, 570], [1050, 635], [560, 255], [750, 290], [945, 265]].map(([x, y]) => <circle key={x} cx={x} cy={y} r="5" fill="var(--surface)" />)}
        </g>
      </svg>
    </div>
  );
}
