import { useHeroDetails } from "@/hooks/use-hero-details";

const layerFade =
  "absolute inset-0 opacity-0 group-data-[ready=true]/hero-details:animate-[hero-details-fade_800ms_ease-out_var(--layer-fade-delay)_both]";

/** Closer layers (higher depth) fade in first. */
const detailLayers = [
  { depth: 2, className: `${layerFade} z-[2] [--layer-fade-delay:0ms]` },
  { depth: 1, className: `${layerFade} z-[1] [--layer-fade-delay:520ms]` },
  { depth: 0, className: `${layerFade} z-[0] [--layer-fade-delay:1040ms]` },
] as const;

/** Subtle product-craft details falling across the hero. */
export function HeroBackground() {
  const details = useHeroDetails();
  return (
    <div
      ref={details}
      data-running="false"
      aria-hidden="true"
      className="group/hero-details pointer-events-none absolute inset-0 -z-1 overflow-hidden text-accent mask-[linear-gradient(to_bottom,transparent,black_10%,black_85%,transparent)] [--detail-x:0px] [--detail-depth:0] [--detail-size:48px] [--detail-duration:40s] [--detail-delay:0s] [--detail-start:0px] [--detail-end:100vh] [--detail-tilt:0deg] [--detail-turn:0deg] [--detail-opacity:0] motion-reduce:hidden forced-colors:hidden"
    >
      {detailLayers.map(({ depth, className }) => (
      <div key={depth} data-detail-layer={depth} className={className}>
      {Array.from({ length: 24 }, (_, index) => index).filter((index) => index % 3 === depth).map((index) => (
        <div key={index} data-falling-detail data-depth={depth} className="absolute top-0 left-[var(--detail-x)] z-[var(--detail-depth)] w-[var(--detail-size)] animate-[hero-detail-fall_var(--detail-duration)_linear_var(--detail-delay)_both] [animation-play-state:paused] group-data-[running=true]/hero-details:[animation-play-state:running]">
          <svg viewBox="0 0 100 100" className="w-full" fill="none">
            {index % 10 === 0 ? <>
              <rect x="13" y="23" width="75" height="62" rx="9" fill="var(--pop-blue)" />
              <rect x="7" y="17" width="75" height="62" rx="9" fill="var(--surface)" stroke="currentColor" strokeWidth="2" />
              <path d="M7 33h75m-54 13-8 8 8 8m31-16 8 8-8 8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              <path d="m46 44-7 20" stroke="var(--accent-violet)" strokeWidth="3" />
            </> : index % 10 === 1 ? <>
              <rect x="15" y="15" width="70" height="76" rx="10" fill="var(--accent-violet)" />
              <rect x="9" y="9" width="70" height="76" rx="10" fill="var(--surface)" stroke="currentColor" strokeWidth="2" />
              <rect x="19" y="19" width="50" height="30" rx="6" fill="var(--pop-pink)" />
              <path d="M19 61h50m-50 12h30" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            </> : index % 10 === 2 ? <>
              <path d="m8 60 40-17 44 17-40 19Z" fill="var(--pop-blue)" />
              <path d="m8 45 40-17 44 17-40 19Z" fill="var(--accent-violet)" />
              <path d="m8 30 40-17 44 17-40 19Z" fill="var(--surface)" stroke="currentColor" strokeWidth="2" />
              <path d="m37 29 10 5 16-8" stroke="currentColor" strokeWidth="2" />
            </> : index % 10 === 3 ? <>
              <path d="M24 12v65l17-17 15 28 13-7-15-27h25Z" fill="var(--accent-violet)" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
              <circle cx="24" cy="12" r="9" stroke="var(--pop-pink)" strokeDasharray="3 4" />
            </> : index % 10 === 4 ? <>
              <rect x="12" y="16" width="76" height="68" rx="10" fill="var(--surface)" stroke="currentColor" strokeWidth="2" />
              {["var(--pop-blue)", "var(--pop-pink)", "var(--accent-mint)", "var(--accent-violet)"].map((color,i)=><rect key={color} x={22+i%2*31} y={26+(i>1?26:0)} width="24" height="20" rx="5" fill={color} />)}
            </> : index % 10 === 5 ? <>
              <path d="M15 12v76m35-76v76m35-76v76M9 24h82M9 76h82" stroke="currentColor" strokeDasharray="3 4" />
              <rect x="20" y="29" width="60" height="42" rx="7" fill="var(--pop-blue)" />
              {[[15,24],[85,24],[15,76],[85,76]].map(([x,y])=><rect key={`${x}-${y}`} x={x-4} y={y-4} width="8" height="8" fill="var(--surface)" stroke="currentColor" />)}
            </> : index % 10 === 6 ? <>
              <rect x="9" y="12" width="82" height="76" rx="10" fill="var(--surface)" stroke="currentColor" strokeWidth="2" />
              <rect x="19" y="22" width="62" height="13" rx="4" fill="var(--accent-violet)" />
              <rect x="19" y="43" width="62" height="13" rx="4" stroke="currentColor" />
              <rect x="19" y="66" width="38" height="12" rx="6" fill="var(--pop-blue)" />
            </> : index % 10 === 7 ? <>
              <rect x="8" y="17" width="84" height="66" rx="8" fill="var(--surface)" stroke="currentColor" strokeWidth="2" />
              <rect x="17" y="26" width="16" height="48" rx="4" fill="var(--accent-violet)" />
              <rect x="41" y="26" width="42" height="19" rx="4" fill="var(--pop-pink)" />
              <rect x="41" y="53" width="18" height="21" rx="4" fill="var(--pop-blue)" />
              <rect x="65" y="53" width="18" height="21" rx="4" fill="var(--accent-mint)" />
            </> : index % 10 === 8 ? <>
              <path d="M21 20v60m29-60v60m29-60v60" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
              <rect x="11" y="31" width="20" height="14" rx="5" fill="var(--pop-blue)" />
              <rect x="40" y="58" width="20" height="14" rx="5" fill="var(--pop-pink)" />
              <rect x="69" y="23" width="20" height="14" rx="5" fill="var(--accent-mint)" />
            </> : <>
              <rect x="9" y="15" width="76" height="62" rx="10" fill="var(--surface)" stroke="currentColor" strokeWidth="2" />
              <path d="M21 31h48m-48 12h32" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              <rect x="20" y="54" width="32" height="13" rx="6.5" fill="var(--pop-blue)" />
              <circle cx="76" cy="73" r="18" fill="var(--accent-mint)" />
              <path d="m67 73 6 6 12-13" stroke="var(--pop-paper)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </>}
          </svg>
        </div>
      ))}
      </div>
      ))}
    </div>
  );
}
