import { panelClasses, sceneClasses } from "@/components/illustration-classes";

function seatingRing(inset: number) {
  const x = 94 + inset;
  const y = 105 + inset;
  const width = 412 - inset * 2;
  const height = 282 - inset * 2;
  const corner = 94 - inset * 0.5;

  return `M${x + corner} ${y}H${x + width - corner}L${x + width} ${y + corner}V${y + height - corner}L${x + width - corner} ${y + height}H${x + corner}L${x} ${y + height - corner}V${y + corner}Z`;
}

export function ArenaPreview() {
  return (
    <figure className="w-full min-w-0" aria-labelledby="arena-caption">
      <div className={`${sceneClasses} rounded-xl p-3 min-[541px]:p-5`}>
        <div className={`${panelClasses} overflow-hidden rounded-xl min-[1101px]:[transform:perspective(1400px)_rotateY(-5deg)_rotateZ(1deg)]`}>
          <div className="relative z-1 flex flex-wrap items-center justify-between gap-x-2.5 gap-y-2 border-b border-border px-4 py-5 text-small leading-[1.6] text-foreground min-[541px]:gap-y-2.5 min-[541px]:px-5 min-[901px]:px-3 min-[1101px]:flex-nowrap min-[1101px]:px-5">
            <span className="font-medium">ARENA <span className="ml-[5px] text-meta font-normal text-secondary">/ concept 001</span></span>
            <span className="inline-flex items-center gap-[7px] text-meta whitespace-nowrap text-secondary [&>span]:size-1.5 [&>span]:rounded-full [&>span]:bg-accent-mint"><span aria-hidden="true" /> Static study</span>
          </div>
          <svg className="block h-auto w-full" viewBox="0 0 600 490" role="img" aria-labelledby="venue-title venue-description">
            <title id="venue-title">ARENA — fictional stadium plan</title>
            <desc id="venue-description">
              An original overhead venue drawing with an octagonal seating bowl,
              a central pitch, and a highlighted east stand. Technical guides and
              section labels suggest a future interactive venue editor. This is a
              static illustration.
            </desc>
            <defs>
              <pattern id="arena-grid" width="24" height="24" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="1" r="0.6" fill="var(--accent-blue)" opacity="0.14" />
              </pattern>
              <linearGradient id="arena-bowl" x1="0" y1="0" x2="1" y2="1">
                <stop stopColor="var(--surface-elevated)" />
                <stop offset="1" stopColor="var(--background-alt)" />
              </linearGradient>
              <linearGradient id="arena-selection" x1="0" y1="0" x2="1" y2="1">
                <stop stopColor="var(--accent-mint)" stopOpacity="0.5" />
                <stop offset="0.55" stopColor="var(--accent-blue)" stopOpacity="0.3" />
                <stop offset="1" stopColor="var(--accent-violet)" stopOpacity="0.2" />
              </linearGradient>
              <radialGradient id="arena-light">
                <stop stopColor="var(--accent-blue)" stopOpacity="0.1" />
                <stop offset="1" stopColor="var(--accent-blue)" stopOpacity="0" />
              </radialGradient>
            </defs>
            <ellipse cx="365" cy="230" rx="250" ry="210" fill="url(#arena-light)" />
            <path fill="url(#arena-grid)" d="M0 0h600v490H0z" />
            <g fill="none" stroke="var(--muted)" strokeWidth="0.75" opacity="0.25">
              <path d="M300 30v430M36 246h528" strokeDasharray="3 7" />
              <circle cx="300" cy="246" r="204" strokeDasharray="2 9" />
              <path d="M30 68V48h20M550 48h20v20M30 422v20h20M550 442h20v-20" />
            </g>
            <g transform="rotate(-24 300 246)">
              <path d={seatingRing(-12)} fill="var(--background)" stroke="var(--border-control)" />
              <path d={seatingRing(0)} fill="url(#arena-bowl)" stroke="var(--accent-blue)" strokeWidth="1.2" />
              <path d="M412 105l94 94v94l-94 94-35-63 63-63v-30l-63-63Z" fill="url(#arena-selection)" stroke="var(--accent-mint)" strokeWidth="1.2" />
              <g fill="none" stroke="var(--accent-blue)" strokeWidth="0.8" opacity="0.4">
                {Array.from({ length: 8 }, (_, index) => (
                  <path key={index} d={seatingRing(8 + index * 7)} />
                ))}
              </g>
              <g fill="none" stroke="var(--background)" strokeWidth="4">
                <path d="m188 105 35 68m20-68 16 68m48-68v68m49-68-16 68m72-68-35 68M506 199l-68 34m68 13h-68m68 47-68-34M412 387l-35-68m-20 68-17-68m-40 68v-68m-57 68 16-68m-71 68 35-68M94 199l68 34m-68 13h68m-68 47 68-34" />
              </g>
              <path d={seatingRing(68)} fill="var(--background-alt)" stroke="var(--muted)" strokeOpacity="0.5" />
              <g fill="none" stroke="var(--muted)" strokeOpacity="0.55" strokeWidth="1">
                <rect x="208" y="199" width="184" height="94" rx="1" fill="#7cf7d408" />
                <path d="M300 199v94m-92-69h24v44h-24m184-44h-24v44h24m-184-31h9v18h-9m184-18h-9v18h9" />
                <circle cx="300" cy="246" r="17" />
                <circle cx="300" cy="246" r="1.5" fill="var(--muted)" />
                <path d="M205 244h-5v5h5m190-5h5v5h-5" />
              </g>
              <g fill="var(--accent-mint)">
                <circle cx="506" cy="199" r="3" /><circle cx="506" cy="293" r="3" />
                <circle cx="412" cy="105" r="3" /><circle cx="412" cy="387" r="3" />
              </g>
              <g className="font-mono text-[11px] tracking-[1px]" fill="var(--text-secondary)" textAnchor="middle">
                <text x="300" y="134">NORTH STAND</text><text x="300" y="369">SOUTH STAND</text>
              </g>
            </g>
            <g fill="none" strokeWidth="1">
              <path d="M456 179h41l19-20h54" stroke="var(--accent-mint)" />
              <circle cx="456" cy="179" r="3" fill="var(--accent-mint)" stroke="var(--background)" strokeWidth="2" />
              <path d="M159 326h-39l-23 24H40" stroke="var(--accent-blue)" />
              <circle cx="159" cy="326" r="2.5" fill="var(--muted)" />
            </g>
            <g className="font-mono text-[11px] tracking-[1px]">
              <text x="517" y="146" fill="var(--accent-mint)">EAST / 04</text>
              <text x="40" y="367" fill="var(--text-secondary)">ACCESS / 02</text>
              <text x="40" y="391" fill="var(--muted)">ENTRY LEVEL</text>
            </g>
            <g transform="translate(535 375)" fill="none" stroke="var(--muted)" strokeWidth="1">
              <path d="M0 28V0m-5 7 5-7 5 7M0 28h25m-6-5 6 5-6 5" />
              <text className="font-mono text-[11px] tracking-[1px]" x="-3" y="-10" fill="var(--text-secondary)" stroke="none">N</text>
            </g>
          </svg>
          <div className="relative z-1 flex flex-wrap items-center justify-between gap-x-2.5 gap-y-2 border-t border-border px-4 py-4 text-meta leading-[1.6] text-secondary min-[541px]:gap-y-2.5 min-[541px]:px-5 min-[901px]:px-3 min-[1101px]:flex-nowrap min-[1101px]:px-5">
            <span className="inline-flex items-center gap-[7px] whitespace-nowrap [&>span]:size-1.5 [&>span]:bg-accent"><span aria-hidden="true" /> East stand detail</span>
            <span>Plan view / 01</span>
          </div>
        </div>
      </div>
      <figcaption className="pt-4 text-meta leading-relaxed text-muted" id="arena-caption">
        Fictional venue geometry · Static SVG study
      </figcaption>
    </figure>
  );
}
