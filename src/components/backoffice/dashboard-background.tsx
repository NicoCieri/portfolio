/** Layered operational panels on a perspective workspace. */
export function DashboardBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-1 overflow-hidden mask-[linear-gradient(to_bottom,transparent_22%,black_42%,black_62%,transparent_86%)] forced-colors:hidden">
      <svg viewBox="0 0 1440 800" preserveAspectRatio="xMidYMid slice" className="h-full w-full opacity-[0.09] saturate-50 min-[701px]:opacity-[0.14]" fill="none">
        <defs>
          <linearGradient id="operations-floor" x1="720" y1="300" x2="720" y2="750" gradientUnits="userSpaceOnUse">
            <stop stopColor="var(--accent-mint)" stopOpacity=".1" />
            <stop offset="1" stopColor="var(--pop-blue)" stopOpacity=".6" />
          </linearGradient>
        </defs>
        <path d="M250 300H1190L1500 730H-60Z" fill="url(#operations-floor)" />
        <ellipse cx="190" cy="625" rx="205" ry="40" fill="var(--pop-ink)" opacity=".3" />
        <ellipse cx="1250" cy="625" rx="205" ry="40" fill="var(--pop-ink)" opacity=".3" />
        <g transform="rotate(-6 195 430)">
          <rect x="75" y="275" width="280" height="340" rx="14" fill="var(--pop-blue)" />
          <rect x="65" y="265" width="280" height="340" rx="14" fill="var(--accent-violet)" />
          <rect x="55" y="275" width="280" height="320" rx="12" fill="var(--pop-paper)" />
          <path d="M55 290v-25a10 10 0 0 1 10-10h84l18 20h158a10 10 0 0 1 10 10v25H55Z" fill="var(--pop-blue)" />
        {/* A work queue with assigned tasks, status pills and action menus. */}
        <g stroke="var(--text)" strokeWidth="2" strokeOpacity=".65">
          <path d="M55 290v-25a10 10 0 0 1 10-10h84l18 20h158a10 10 0 0 1 10 10v300a10 10 0 0 1-10 10H65a10 10 0 0 1-10-10Z" />
          <path d="M55 310h280M80 289h70" />
          <path d="M283 283h26m-20 7h14m-9 7h4" strokeLinecap="round" />
        </g>
        {[330, 412, 494].map((y, index) => (
          <g key={y}>
            <rect x="72" y={y} width="246" height="66" rx="8" fill="var(--accent-violet)" fillOpacity=".25" stroke="var(--text)" strokeOpacity=".5" strokeWidth="2" />
            <rect x="87" y={y + 15} width="16" height="16" rx="3" stroke="var(--text)" strokeOpacity=".6" strokeWidth="2" />
            {index === 2 && <path d={`m90 ${y + 23} 4 4 7-8`} stroke="var(--accent-mint)" strokeWidth="2" strokeLinecap="round" />}
            <path d={`M115 ${y + 21}h95m-95 15h60`} stroke="var(--text)" strokeOpacity=".55" strokeWidth="3" strokeLinecap="round" />
            <rect x="115" y={y + 45} width="53" height="9" rx="4.5" fill={index === 2 ? "var(--accent-mint)" : "var(--accent)"} fillOpacity=".65" />
            <circle cx="278" cy={y + 42} r="12" stroke="var(--text)" strokeOpacity=".5" strokeWidth="1.5" />
            <circle cx="278" cy={y + 39} r="3" fill="var(--text)" fillOpacity=".6" />
            <path d={`M272 ${y + 48}q6-9 12 0`} stroke="var(--text)" strokeOpacity=".6" strokeWidth="1.5" />
            {[0, 6, 12].map((offset) => <circle key={offset} cx={278 + offset} cy={y + 20} r="1.5" fill="var(--text)" fillOpacity=".6" />)}
          </g>
        ))}

        </g>
        <g transform="rotate(5 1245 425)">
          <rect x="1115" y="275" width="300" height="340" rx="12" fill="var(--pop-blue)" />
          <rect x="1105" y="265" width="300" height="340" rx="12" fill="var(--accent-violet)" />
          <rect x="1095" y="255" width="300" height="340" rx="12" fill="var(--pop-paper)" />
          <path d="M1107 255h276a12 12 0 0 1 12 12v28h-300v-28a12 12 0 0 1 12-12Z" fill="var(--pop-blue)" />
          <path d="M1095 295h35v300h-23a12 12 0 0 1-12-12Z" fill="var(--accent-violet)" />
        {/* Operational dashboard: KPI cards, order statuses and recent activity. */}
        <g stroke="var(--text)" strokeWidth="2" strokeOpacity=".6">
          <rect x="1095" y="255" width="300" height="340" rx="12" />
          <path d="M1095 295h300M1130 295v300M1150 276h100" />
          <rect x="1148" y="315" width="105" height="75" rx="7" fill="var(--accent-mint)" fillOpacity=".55" />
          <rect x="1268" y="315" width="105" height="75" rx="7" fill="var(--pop-pink)" fillOpacity=".55" />
          <rect x="1148" y="410" width="225" height="82" rx="7" fill="var(--accent-violet)" fillOpacity=".2" />
          <path d="M1148 515h225M1148 547h225M1148 579h225" strokeOpacity=".3" />
        </g>
        {[318, 350, 382, 414].map((y, index) => (
          <g key={y} stroke={index === 0 ? "var(--accent)" : "var(--text)"} strokeWidth="2" strokeOpacity=".6">
            <rect x="1106" y={y} width="12" height="12" rx="2" />
            {index === 0 && <path d={`M1112 ${y}v12m-6-6h12`} />}
          </g>
        ))}
        <g fill="var(--text)" fillOpacity=".8" fontFamily="ui-monospace, monospace" fontSize="25" fontWeight="600">
          <text x="1162" y="355">24</text>
          <text x="1282" y="355">08</text>
        </g>
        <g stroke="var(--text)" strokeWidth="3" strokeOpacity=".55" strokeLinecap="round">
          <path d="M1162 332h55m65 0h55M1162 373h30m90 0h30M1163 429h95" />
        </g>
        <rect x="1163" y="443" width="195" height="13" rx="6.5" fill="var(--text)" fillOpacity=".12" />
        <rect x="1163" y="443" width="121" height="13" rx="6.5" fill="var(--accent-mint)" fillOpacity=".65" />
        <rect x="1284" y="443" width="43" height="13" fill="var(--accent)" fillOpacity=".5" />
        <g stroke="var(--text)" strokeWidth="2" strokeOpacity=".45" strokeLinecap="round">
          <path d="M1176 474h45m30 0h35m30 0h35" />
        </g>
        {[471, 503, 535].map((y, index) => (
          <g key={y}>
            <circle cx="1162" cy={y} r={index === 0 ? 3 : 5} fill={index === 2 ? "var(--accent)" : "var(--accent-mint)"} fillOpacity=".65" />
            {index > 0 && <>
              <path d={`M1178 ${y}h85`} stroke="var(--text)" strokeWidth="3" strokeOpacity=".55" strokeLinecap="round" />
              <rect x="1312" y={y - 5} width="45" height="10" rx="5" fill={index === 1 ? "var(--accent-mint)" : "var(--accent)"} fillOpacity=".5" />
            </>}
          </g>
        ))}
        <path d="M1162 559v14m-4-7 4 4 7-8M1178 567h65" stroke="var(--text)" strokeOpacity=".45" strokeWidth="2" strokeLinecap="round" />
        </g>
        <g stroke="var(--text)" strokeOpacity=".25" strokeWidth="1.5">
          <path d="M80 615h230m-220 10h210M1110 615h270m-260 10h250" />
        </g>
      </svg>
    </div>
  );
}
