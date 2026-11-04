export function Hand({ side, thumb = false }: { side: "attendee" | "controller"; thumb?: boolean }) {
  const skin = side === "attendee" ? "#c77c56" : "#f2bb94";
  const shade = side === "attendee" ? "#a75e45" : "#dd956e";

  return (
    <svg viewBox="0 0 320 560" className={`pointer-events-none absolute top-0 -left-[24%] h-auto w-[148%] max-w-none overflow-visible ${side === "controller" ? "[clip-path:polygon(evenodd,0%_0%,100%_0%,100%_100%,0%_100%,0%_0%,16.2%_0%,16.2%_79.2%,83.8%_79.2%,83.8%_0%,16.2%_0%)]" : ""}`} aria-hidden="true">
      <g transform={side === "controller" ? "translate(320 0) scale(-1 1)" : undefined} stroke="var(--pop-ink)" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round">
        {thumb ? (
          <>
            <path d="M91 456C70 443 54 427 43 405C33 385 27 359 21 338C17 324 23 314 32 314C42 314 47 326 52 338L76 378C91 401 101 426 107 448Z" fill={skin} stroke="none" />
            {/* Keep the exposed contour open so the thumb blends into the palm. */}
            <path d="M70 443C58 431 49 417 43 405C33 385 27 359 21 338C17 324 23 314 32 314C42 314 47 326 52 338L76 378C84 390 90 402 95 416" fill="none" />
            <path d="M28 327 36 341M60 413c6 10 13 18 21 24" fill="none" stroke={shade} />
          </>
        ) : (
          <>
            <path d="M102 500 83 460C72 439 65 407 70 375L83 310C87 294 103 294 107 310L111 332 248 220C260 209 277 215 277 230L276 258C291 250 303 263 297 278L281 311C297 303 309 318 301 332L282 361C298 355 308 371 299 385L270 432C258 453 252 474 254 488L260 500Z" fill={skin} />
            <path d="m276 258-14 17m19 36-15 19m16 31-16 20M112 446c32 16 62 16 91 1" fill="none" stroke={shade} />
            {side === "controller" ? (
              <>
                <path d="m83 458 171-8 10 38-168 12Z" fill="#fff" />
                <path d="m90 483 172-9 44 176H128Z" fill="#17191f" />
                <path d="m105 494 146-8M268 531l17 92" fill="none" stroke="#3b3e47" />
                <circle cx="266" cy="548" r="3" fill="#696c75" stroke="none" />
                <circle cx="271" cy="566" r="3" fill="#696c75" stroke="none" />
              </>
            ) : (
              <>
                <path d="m83 458 171-8 18 50H89Z" fill="var(--pop-blue)" />
                <path d="m96 472 157-7" fill="none" stroke="#7787ff" />
              </>
            )}
          </>
        )}
      </g>
    </svg>
  );
}
