const seatingRows = Array.from({ length: 5 }, (_, row) => ({
  scale: 0.65 + row * 0.16,
  seats: Array.from({ length: 25 }, (_, seat) => {
    const x = 32 + seat * 57;
    const curve = 1 - ((x - 720) / 720) ** 2;
    return { x, y: 285 + row * 76 + curve * 68, aisle: seat === 7 || seat === 17 };
  }),
}));

/** A quiet view from the stands, behind the booking devices. */
export function VenueBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-1 overflow-hidden mask-[linear-gradient(to_bottom,transparent_22%,black_42%,black_62%,transparent_86%)]">
      <svg viewBox="0 0 1440 800" preserveAspectRatio="xMidYMid slice" className="h-full w-full opacity-[0.09] saturate-50 min-[701px]:opacity-[0.14]" fill="none">
        <defs>
          <linearGradient id="booking-venue-light" x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="var(--pop-sky)" stopOpacity=".35" />
            <stop offset="1" stopColor="var(--pop-sky)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Roof structure and floodlights establish the scale of the venue. */}
        <g stroke="var(--text)" strokeOpacity=".25" strokeWidth="3">
          <path d="M-60 325Q720-15 1500 325M-60 353Q720 13 1500 353" />
          <path d="m60 276 15 24 80-69 15 24 90-66 12 25 95-59 10 26 100-49 7 27 105-38 4 28 109-28 0 28 109-17-4 28 105-6-7 27 100 5-10 26 95 15-12 25 90 26-15 24 80 36" />
        </g>
        {[170, 430, 1010, 1270].map((x) => (
          <g key={x} transform={`translate(${x} ${180 + ((x - 720) / 720) ** 2 * 110})`}>
            <path d="M-14 12-145 350H145L14 12Z" fill="url(#booking-venue-light)" />
            <rect x="-31" y="-7" width="62" height="24" rx="5" fill="var(--text)" fillOpacity=".3" />
            {[-20, 0, 20].map((light) => <rect key={light} x={light - 6} y="-1" width="12" height="11" rx="2" fill="var(--pop-paper)" />)}
          </g>
        ))}

        {/* Curved terraces, with two clear aisles through the seating blocks. */}
        {seatingRows.map(({ scale, seats }, row) => (
          <g key={row}>
            <path d={`M-30 ${320 + row * 76}Q720 ${458 + row * 76} 1470 ${320 + row * 76}`} stroke="var(--text)" strokeOpacity=".18" strokeWidth="2" />
            {seats.filter(({ aisle }) => !aisle).map(({ x, y }, seat) => (
              <g key={x} transform={`translate(${x} ${y}) scale(${scale})`}>
                <ellipse cy="44" rx="23" ry="5" fill="var(--text)" opacity=".08" />
                <path d="M-13 28v14m26-14v14" stroke="var(--text)" strokeWidth="4" strokeOpacity=".45" />
                <rect x="-19" y="-19" width="38" height="38" rx="9" fill={(seat + row) % 6 === 0 ? "var(--pop-pink)" : "var(--pop-blue)"} />
                <path d="M-12-11h24" stroke="var(--pop-paper)" strokeOpacity=".3" strokeWidth="2" strokeLinecap="round" />
                <rect x="-21" y="18" width="42" height="12" rx="5" fill="var(--accent-violet)" />
                <path d="M-25 9v13m50-13v13" stroke="var(--text)" strokeWidth="4" strokeOpacity=".45" strokeLinecap="round" />
              </g>
            ))}
          </g>
        ))}
        <path d="M-30 735Q720 855 1470 735" stroke="var(--text)" strokeOpacity=".18" strokeWidth="5" />
      </svg>
    </div>
  );
}
