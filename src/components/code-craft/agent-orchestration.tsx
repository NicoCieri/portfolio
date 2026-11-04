"use client";

import { agentRoutes } from "@/components/code-craft/workflow";
import { useTranslations } from "@/hooks/use-translations";

const robotStyles = [
  "text-accent [--activation:1] [--charge:1] [--turn:0deg] group-data-[motion=true]/craft:[--activation:var(--craft-robot-0)] group-data-[motion=true]/craft:[--charge:var(--craft-charge-0)] group-data-[motion=true]/craft:[--turn:var(--craft-spin-0)]",
  "text-accent-violet [--activation:1] [--charge:1] [--turn:0deg] group-data-[motion=true]/craft:[--activation:var(--craft-robot-1)] group-data-[motion=true]/craft:[--charge:var(--craft-charge-1)] group-data-[motion=true]/craft:[--turn:var(--craft-spin-1)]",
  "text-accent [--activation:1] [--charge:1] [--turn:0deg] group-data-[motion=true]/craft:[--activation:var(--craft-robot-2)] group-data-[motion=true]/craft:[--charge:var(--craft-charge-2)] group-data-[motion=true]/craft:[--turn:var(--craft-spin-2)]",
];
const featureStyles = [
  "[--done:1] group-data-[motion=true]/craft:[--done:var(--craft-feature-0)]",
  "[--done:1] group-data-[motion=true]/craft:[--done:var(--craft-feature-1)]",
  "[--done:1] group-data-[motion=true]/craft:[--done:var(--craft-feature-2)]",
];

function RobotFace({ variant }: { variant: number }) {
  return (
    <g transform="scale(.43)">
      <path d="M0-35v-12" stroke="currentColor" strokeWidth="3" />
      <circle cy="-48" r="6" className="fill-accent-lime stroke-foreground" strokeWidth="2" />
      <rect x="-39" y="-24" width="78" height="58" rx="19" className="fill-surface-elevated" stroke="currentColor" strokeWidth="3" />
      <rect x="-48" y="-9" width="9" height="23" rx="4" fill="currentColor" /><rect x="39" y="-9" width="9" height="23" rx="4" fill="currentColor" />
      <rect x="-29" y="-13" width="58" height="28" rx="11" className="fill-(--pop-ink)" />
      {variant === 1 ? <path d="m-13-5-6 6 6 6m26-12 6 6-6 6" className="stroke-(--on-accent-lime) in-[[data-theme=dark]]:stroke-accent-lime" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /> : <g className="fill-(--on-accent-lime) in-[[data-theme=dark]]:fill-accent-lime"><circle cx="-13" cy="1" r="5" /><circle cx="13" cy="1" r="5" /></g>}
      <path d="M-9 25H9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </g>
  );
}

function AgentTeam({ x, y, index }: { x: number; y: number; index: number }) {
  return (
    <g data-agent-team transform={`translate(${x} ${y})`} className={`${robotStyles[index]} [--ring:currentColor] in-[[data-theme=dark]]:[--ring:color-mix(in_srgb,var(--color-accent-lime)_calc(var(--charge)*100%),currentColor)]`}>
      <g className="[opacity:calc(.5+var(--activation)*.5)] [transform:scale(calc(.85+var(--activation)*.15))]">
        <circle r="77" strokeWidth="9" className="stroke-(--ring) opacity-10" />
        <circle r="78" strokeWidth="3" strokeDasharray="22 15 4 15" className="stroke-(--ring) [transform:rotate(var(--turn))]" />
        <circle r="69" className="fill-surface stroke-border" />
        <circle r="63" fill="currentColor" fillOpacity="0.08" />
        <path d="M-29-20H29L0 32Z" strokeWidth="1.5" strokeDasharray="2 4" className="stroke-(--ring) opacity-40" />
        {[[-29, -20], [29, -20], [0, 32]].map(([cx, cy], member) => (
          <g key={member} data-team-member transform={`translate(${cx} ${cy})`}>
            <circle r="28" className="fill-surface stroke-border" strokeWidth="1.5" />
            <circle r="28" strokeWidth="1.5" strokeDasharray="7 12" className="stroke-(--ring) opacity-60 [transform:rotate(calc(var(--turn)*-1))]" />
            <RobotFace variant={member} />
          </g>
        ))}
      </g>
    </g>
  );
}

function Feature({ x, y, index, compact }: { x: number; y: number; index: number; compact: boolean }) {
  const deliverables = useTranslations().codeCraft.deliverables;
  return (
    <g transform={`translate(${x} ${y}) scale(${compact ? 0.9 : 1})`} className={`${featureStyles[index]} [--feature-stroke:var(--color-accent)] in-[[data-theme=dark]]:[--feature-stroke:color-mix(in_srgb,var(--color-accent-lime)_calc(var(--done)*100%),var(--color-accent))]`}>
      <g className="[opacity:calc(.3+var(--done)*.7)] [transform:translateY(calc((1-var(--done))*12px))]">
        <rect x="-62" y="-43" width="124" height="86" rx="15" strokeWidth="2" className="fill-surface stroke-(--feature-stroke)" />
        <path d="M-62-20H62" className="stroke-border" strokeWidth="2" />
        <circle cx="-46" cy="-31" r="3" className="fill-accent" /><circle cx="-35" cy="-31" r="3" className="fill-accent-violet" />
        {index === 0 ? <g>
          <rect x="-47" y="-5" width="25" height="32" rx="5" className="fill-accent/20" />
          <path d="M-10 0H44M-10 13H29" className="stroke-control" strokeWidth="3" strokeLinecap="round" />
          <rect x="-10" y="22" width="42" height="8" rx="4" className="fill-accent" />
        </g> : index === 1 ? <g>
          <rect x="-47" y="-6" width="19" height="35" rx="4" className="fill-accent/15" />
          <path d="M-16 29H44" className="stroke-control" strokeWidth="2" />
          <path d="M-8 22V12M10 22V3M28 22V-5" className="stroke-accent" strokeWidth="9" strokeLinecap="round" />
        </g> : <g>
          <rect x="-47" y="-5" width="36" height="13" rx="6" className="fill-accent" />
          <rect x="-1" y="-5" width="43" height="13" rx="4" className="stroke-control" />
          <rect x="-47" y="17" width="19" height="13" rx="4" className="fill-accent/20" />
          <path d="M-16 23H42" className="stroke-control" strokeWidth="3" strokeLinecap="round" />
        </g>}
        <g className="[transform-origin:51px_36px] [transform:scale(var(--done))]">
          <circle cx="51" cy="36" r="19" className="fill-accent-lime stroke-surface" strokeWidth="3" /><path d="m43 36 5 5 11-12" className="stroke-(--on-accent-lime)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </g>
      <text y="76" textAnchor="middle" className="fill-secondary text-[17px]">{compact ? <><tspan x="0">{deliverables[index].lines[0]}</tspan><tspan x="0" dy="21">{deliverables[index].lines[1]}</tspan></> : deliverables[index].label}</text>
    </g>
  );
}

function Graph({ compact }: { compact: boolean }) {
  const t = useTranslations().codeCraft;
  const robots = compact ? [[85, 280], [260, 280], [435, 280]] : [[480, 95], [480, 260], [480, 425]];
  const features = compact ? [[85, 525], [260, 525], [435, 525]] : [[875, 95], [875, 260], [875, 425]];
  const origin = compact ? [260, 70] : [120, 260];
  return (
    <svg aria-hidden="true" data-agent-diagram viewBox={compact ? "0 0 520 650" : "0 0 1000 540"} fill="none" className={`${compact ? "min-[701px]:hidden" : "hidden min-[701px]:block"} mx-auto h-full min-h-0 w-full overflow-visible`}>
      {agentRoutes(compact).map(({ path, packets }, index) => <g key={path}>
        <path d={path} className="stroke-accent/10" strokeWidth="12" />
        <path data-agent-route={index} d={path} className="stroke-control" strokeWidth="1.5" />
        <path data-agent-trace={index} d={path} pathLength="1" strokeWidth="3" strokeDasharray="1" className="stroke-accent" />
        {Array.from({ length: packets }, (_, packet) => <g key={packet} data-agent-packet data-route-index={index} data-packet-index={packet} className="opacity-0 motion-reduce:hidden">
          <rect x="-13" y="-10" width="26" height="20" rx="6" className="fill-accent-lime stroke-foreground" strokeWidth="1.5" />
          <path d="m-5-3-3 3 3 3m10-6 3 3-3 3" className="stroke-(--on-accent-lime)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </g>)}
      </g>)}
      <g transform={`translate(${origin.join(" ")})`}>
        <defs>
          <clipPath id={`craft-avatar-${compact ? "mobile" : "desktop"}`}>
            <circle r="54" />
          </clipPath>
        </defs>
        <circle r="55" className="fill-surface stroke-accent" strokeWidth="2" />
        <image data-nicolas-avatar href="/images/nicolas-avatar.webp" x="-74" y="-62" width="128" height="128" preserveAspectRatio="xMidYMid slice" clipPath={`url(#craft-avatar-${compact ? "mobile" : "desktop"})`} />
        <g data-avatar-orbit className="[--avatar-turn:0deg] group-data-[motion=true]/craft:[--avatar-turn:var(--craft-spin-0)] [transform:rotate(var(--avatar-turn))]">
          <circle r="65" className="stroke-accent" strokeWidth="3" strokeDasharray="1 10" strokeLinecap="round" />
          <circle cy="-65" r="4" className="fill-accent-lime stroke-surface" strokeWidth="1.5" />
        </g>
        <text x={compact ? -78 : 0} y={compact ? 7 : 92} textAnchor={compact ? "end" : "middle"} className="fill-foreground text-[23px] font-semibold">{t.name}</text>
      </g>
      {robots.map(([x, y], index) => <AgentTeam key={index} x={x} y={y} index={index} />)}
      {features.map(([x, y], index) => <Feature key={index} x={x} y={y} index={index} compact={compact} />)}
    </svg>
  );
}

export function AgentOrchestration() {
  const t = useTranslations().codeCraft;
  return (
    <figure className="relative isolate min-h-0 flex-1 overflow-hidden rounded-[28px] border border-accent/25 bg-surface/60 px-2 py-3 min-[701px]:px-5 [@media(max-height:600px),(max-width:359px)]:h-[480px] [@media(max-height:600px),(max-width:359px)]:flex-none motion-reduce:h-[480px] motion-reduce:flex-none">
      <Graph compact={false} /><Graph compact />
      <figcaption className="sr-only">{t.figcaption}</figcaption>
    </figure>
  );
}
