const guests = [
  { x: 110, y: 455, scale: 1.05, coat: "var(--pop-blue)" },
  { x: 205, y: 470, scale: 0.9, coat: "var(--pop-pink)" },
  { x: 300, y: 410, scale: 0.76, coat: "var(--accent-mint)" },
  { x: 390, y: 370, scale: 0.65, coat: "var(--pop-blue)" },
  { x: 480, y: 340, scale: 0.56, coat: "var(--pop-pink)" },
  { x: 585, y: 325, scale: 0.5, coat: "var(--accent-mint)" },
  { x: 805, y: 320, scale: 0.52, coat: "var(--pop-blue)" },
  { x: 950, y: 355, scale: 0.68, coat: "var(--pop-pink)" },
  { x: 1135, y: 440, scale: 0.94, coat: "var(--accent-mint)" },
  { x: 1250, y: 460, scale: 1.08, coat: "var(--pop-blue)" },
  { x: 1360, y: 430, scale: 0.88, coat: "var(--pop-pink)" },
];

/** Decorative venue context; the ticket and scanner remain the foreground. */
export function EventEntrance() {
  return (
    <div className="max-[700px]:hidden pointer-events-none absolute inset-0 overflow-hidden mask-[linear-gradient(to_bottom,transparent_22%,black_42%,black_62%,transparent_86%)]" aria-hidden="true">
      <svg viewBox="0 0 1440 800" preserveAspectRatio="xMidYMid slice" className="h-full w-full opacity-[0.09] saturate-50 min-[701px]:opacity-[0.14]" fill="none">
        <defs>
          <linearGradient id="ticketing-door-glow" x1="720" y1="200" x2="720" y2="650" gradientUnits="userSpaceOnUse">
            <stop stopColor="var(--pop-blue)" stopOpacity=".4" />
            <stop offset="1" stopColor="var(--pop-pink)" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="ticketing-light-beam" x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="var(--pop-paper)" stopOpacity=".65" />
            <stop offset="1" stopColor="var(--pop-paper)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Entrance portal and the light spilling onto the pavement. */}
        <path d="M560 330H880L1100 740H340Z" fill="url(#ticketing-door-glow)" />
        <path d="M530 445V205Q530 185 550 185H890Q910 185 910 205V445" stroke="var(--text)" strokeWidth="18" strokeOpacity=".22" />
        <path d="M552 435V218H888V435" stroke="var(--pop-blue)" strokeWidth="4" strokeOpacity=".65" />
        <path d="M570 435V236H870V435" fill="url(#ticketing-door-glow)" stroke="var(--text)" strokeOpacity=".15" strokeWidth="2" />
        <rect x="615" y="195" width="210" height="54" rx="27" fill="var(--pop-blue)" />
        <text x="720" y="229" textAnchor="middle" fill="var(--pop-paper)" fontFamily="system-ui, sans-serif" fontSize="22" fontWeight="700" letterSpacing="3">ORBIT SOCIAL</text>
        <path d="M720 270V292m-8-8 8 8 8-8" stroke="var(--pop-paper)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

        {/* Overhead string lights and broad, static event spotlights. */}
        <path d="M-40 210Q290 330 530 200M910 200Q1170 330 1480 195" stroke="var(--text)" strokeOpacity=".25" strokeWidth="3" />
        {[60, 170, 280, 390, 1020, 1130, 1240, 1350].map((x, i) => (
          <g key={x} transform={`translate(${x} ${i < 4 ? [240, 260, 263, 245][i] : [245, 263, 255, 230][i - 4]})`}>
            <circle r="18" fill="var(--pop-pink)" opacity=".12" />
            <path d="M0-8V0" stroke="var(--text)" strokeWidth="2" strokeOpacity=".4" />
            <circle cy="4" r="5" fill="var(--pop-paper)" />
          </g>
        ))}
        <path d="m450 205-250 420h420Z" fill="url(#ticketing-light-beam)" opacity=".35" />
        <path d="m990 205-170 420h420Z" fill="url(#ticketing-light-beam)" opacity=".35" />
        <g fill="var(--text)" fillOpacity=".35">
          <rect x="432" y="189" width="36" height="16" rx="5" transform="rotate(18 450 197)" />
          <rect x="972" y="189" width="36" height="16" rx="5" transform="rotate(-18 990 197)" />
        </g>

        {/* Guests become smaller toward the entrance to establish a queue. */}
        {guests.map(({ x, y, scale, coat }, i) => (
          <g key={x} transform={`translate(${x} ${y}) scale(${scale})`}>
            <ellipse cy="167" rx="42" ry="9" fill="var(--text)" opacity=".08" />
            <path d="m-16 94-6 65m38-65 7 65" stroke="var(--text)" strokeOpacity=".6" strokeWidth="17" strokeLinecap="round" />
            <path d="M-33 84-28 28Q-26 12 0 12T28 28L34 84Z" fill={coat} />
            <path d="m-27 31-14 52m68-52 13 47" stroke={coat} strokeWidth="15" strokeLinecap="round" />
            <circle cy="-10" r="19" fill={i % 2 ? "#c77c56" : "#f2bb94"} />
            <path d="M-19-11Q-22-34 0-33T19-10L9-18-17-14Z" fill="var(--pop-ink)" />
            {i % 3 === 1 && <path d="M-27 40 17 82" stroke="var(--pop-ink)" strokeWidth="4" strokeOpacity=".5" />}
          </g>
        ))}

        {/* Queue ropes and posts frame the approaching attendee. */}
        <g stroke="var(--text)" strokeLinecap="round">
          <path d="M65 580Q150 660 270 540Q365 575 440 455Q515 475 565 396M875 396Q955 475 1010 455Q1090 575 1190 540Q1310 660 1410 580" stroke="var(--pop-blue)" strokeWidth="7" />
          {[
            [65, 580, 120], [270, 540, 108], [440, 455, 82], [565, 396, 62],
            [875, 396, 62], [1010, 455, 82], [1190, 540, 108], [1410, 580, 120],
          ].map(([x, y, height]) => (
            <g key={x}>
              <path d={`M${x} ${y}v${height}`} strokeWidth="6" strokeOpacity=".5" />
              <circle cx={x} cy={y} r="7" fill="var(--surface)" strokeWidth="3" strokeOpacity=".5" />
              <ellipse cx={x} cy={y + height} rx="19" ry="5" fill="var(--text)" fillOpacity=".3" stroke="none" />
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}
