/** Decorative shopping, product discovery and delivery illustrations. */
export function CommerceBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-1 overflow-hidden mask-[linear-gradient(to_bottom,transparent_22%,black_42%,black_62%,transparent_86%)] forced-colors:hidden">
      <svg viewBox="0 0 1440 800" preserveAspectRatio="xMidYMid slice" className="h-full w-full opacity-[0.09] saturate-50 min-[701px]:opacity-[0.14]" fill="none">
        <defs>
          <linearGradient id="commerce-floor" x1="720" y1="300" x2="720" y2="750" gradientUnits="userSpaceOnUse">
            <stop stopColor="var(--pop-pink)" stopOpacity=".1" />
            <stop offset="1" stopColor="var(--accent-violet)" stopOpacity=".6" />
          </linearGradient>
        </defs>
        <path d="M250 300H1190L1500 730H-60Z" fill="url(#commerce-floor)" />
        <ellipse cx="190" cy="529" rx="145" ry="24" fill="var(--pop-ink)" opacity=".3" />
        <ellipse cx="1240" cy="675" rx="140" ry="25" fill="var(--pop-ink)" opacity=".3" />
        {/* A shopping bag and price tag suggest browsing and purchase. */}
        <g stroke="var(--text)" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round">
          <path d="m95 335-20 175h205l-20-175Z" fill="var(--pop-blue)" />
          <path d="m260 335 38 25-18 150-35-15Z" fill="var(--accent-violet)" />
          <path d="M139 348v-44a39 39 0 0 1 78 0v44" />
          <path d="M93 495h169m-167-160 15 175m150-175-15 175" strokeOpacity=".4" />
          <path d="m154 423 17 17 34-36" stroke="var(--accent-mint)" strokeWidth="5" />
          <path d="m256 350 33-42 53 53-33 42-47-6Z" fill="var(--pop-pink)" />
          <circle cx="281" cy="357" r="5" />
          <path d="m292 365 25 25m-34-16 15 15M263 354q-18-40-46-35" strokeWidth="2" />
        </g>

        {/* Small catalog cards with product art, swatches and purchase controls. */}
        {[65, 213].map((x, index) => (
          <g key={x} transform={`translate(${x} 535) rotate(-6 64 50)`}>
            <rect x="6" y="8" width="128" height="103" rx="10" fill="var(--pop-blue)" />
            <rect fill="var(--pop-paper)" width="128" height="103" rx="10" stroke="var(--text)" strokeOpacity=".6" strokeWidth="2" />
            <rect x="10" y="10" width="108" height="54" rx="5" fill="var(--accent-violet)" fillOpacity=".8" />
            {index === 0 ? (
              <g stroke="var(--text)" strokeWidth="3" strokeLinecap="round">
                <path d="M48 39v-7a16 16 0 0 1 32 0v7" />
                <rect x="43" y="34" width="10" height="19" rx="4" fill="var(--accent)" fillOpacity=".8" />
                <rect x="75" y="34" width="10" height="19" rx="4" fill="var(--accent)" fillOpacity=".8" />
              </g>
            ) : (
              <g stroke="var(--text)" strokeWidth="2" strokeLinejoin="round">
                <path d="M64 41v13m-14 0h28M43 39a21 21 0 0 1 42 0Z" fill="var(--pop-pink)" fillOpacity=".3" />
              </g>
            )}
            <path d="M12 77h63m-63 12h30" stroke="var(--text)" strokeOpacity=".6" strokeWidth="3" strokeLinecap="round" />
            <circle cx="104" cy="84" r="9" fill="var(--accent-mint)" fillOpacity=".8" />
            <path d="M100 84h8m-4-4v8" stroke="var(--text)" strokeWidth="1.5" />
          </g>
        ))}

        {/* Shopping cart above a parcel ready for delivery. */}
        <g stroke="var(--text)" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round">
          <path d="m1125 318 216 0-27 100h-168Z" fill="var(--accent-violet)" />
          <path d="M1090 285h28l28 133h168l27-100h-216" />
          <path d="M1146 418v18h170M1153 347h174m-168 33h158m-135-62 10 100m41-100v100m50-100-10 100" strokeOpacity=".5" strokeWidth="2" />
          <circle cx="1171" cy="457" r="12" fill="var(--pop-blue)" />
          <circle cx="1292" cy="457" r="12" fill="var(--pop-blue)" />
          <path d="M1170 318v-43h58v43m-49-43v15h40v-15m23 43v-26h48v26" stroke="var(--accent)" />
          <path d="m1130 527 100-35 116 35v91l-102 40-114-40Z" fill="var(--accent-violet)" fillOpacity=".8" />
          <path d="m1130 527 100-35 116 35-102 40Z" fill="var(--pop-pink)" />
          <path d="m1130 527 114 40v91l-114-40Z" fill="var(--pop-blue)" />
          <path d="m1244 567 102-40v91l-102 40Z" fill="var(--accent-violet)" />
          <path d="m1130 527 114 40 102-40m-102 40v91m-62-148 114 39v30l-23 8v-30l-114-39" />
          <path d="m1264 605 47-17v22l-47 17Z" fill="var(--surface)" fillOpacity=".8" strokeWidth="2" />
          <path d="m1273 606 0 8m7-11v8m7-11v8m7-11v8m7-11v8" strokeWidth="1.5" />
        </g>
        <g stroke="var(--text)" strokeOpacity=".25" strokeWidth="2">
          <ellipse cx="180" cy="657" rx="132" ry="9" />
          <ellipse cx="1240" cy="674" rx="125" ry="9" />
        </g>
      </svg>
    </div>
  );
}
