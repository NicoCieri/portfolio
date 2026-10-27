import { dataPanelClasses, panelClasses, sceneClasses } from "@/components/illustration-classes";

function SamplePassCode() {
  return (
    <svg viewBox="0 0 100 72" className="h-20 w-full" aria-hidden="true">
      <path d="M5 19V5H19M81 5H95V19M95 53V67H81M19 67H5V53" fill="none" stroke="var(--accent-blue)" strokeWidth="1.5" />
      <g fill="var(--accent-mint)">
        {[2, 1, 3, 1, 2, 2, 1, 3, 2, 1, 2, 3, 1, 2, 1, 2, 3, 1].map((width, index) => <rect key={index} x={15 + index * 4} y="19" width={width} height={index % 3 === 0 ? 36 : 30} opacity={index % 2 === 0 ? .9 : .5} />)}
      </g>
      <path d="M10 36H90" stroke="var(--accent-blue)" strokeOpacity=".5" />
    </svg>
  );
}

export function ProductInterfaces() {
  return (
    <figure className="min-w-0" aria-labelledby="product-visual-caption">
      <div className={`${sceneClasses} grid grid-cols-[minmax(0,1fr)_minmax(0,.7fr)] items-start gap-3 rounded-xl p-3 min-[541px]:p-5 min-[1101px]:block min-[1101px]:h-[390px]`}>
        <div className={`${panelClasses} min-[1101px]:[transform:perspective(1100px)_rotateY(9deg)_rotateZ(-4deg)] col-span-full min-w-0 rounded-lg p-4 min-[541px]:p-5 min-[1101px]:absolute min-[1101px]:top-7 min-[1101px]:left-1 min-[1101px]:w-[58%]`} aria-hidden="true">
          <div className="flex items-center justify-between gap-3"><span className="text-small font-medium">Event operations</span><span className="h-2 w-2 shrink-0 rounded-full bg-accent-mint" /></div>
          <p className="mt-4 text-meta text-secondary">Digital box office / Demo workspace</p>
          <div className="mt-3 space-y-2">
            {[
              ['Prism Nights', 'Box office open', 'bg-accent-mint/30'],
              ['Signal Assembly', 'Entry in progress', 'bg-accent-blue/30'],
              ['Orbit Sessions', 'Doors scheduled', 'bg-accent-violet/30'],
            ].map(([title, detail, color]) => (
              <div className="flex items-center gap-3 rounded-md bg-background/45 px-3 py-2.5" key={title}><span className={`h-8 w-1 shrink-0 rounded-full ${color}`} /><div><p className="text-small">{title}</p><p className="mt-0.5 text-meta text-secondary">{detail}</p></div></div>
            ))}
          </div>
          <p className="mt-4 text-meta text-muted">Fictional events / Web workspace</p>
        </div>
        <div className={`${dataPanelClasses} min-[1101px]:[transform:perspective(1100px)_rotateY(-7deg)_rotateZ(-2deg)] z-1 min-w-0 self-center rounded-lg p-3 min-[541px]:p-4 min-[1101px]:absolute min-[1101px]:top-18 min-[1101px]:left-[23%] min-[1101px]:w-[62%]`} aria-hidden="true">
          <p className="text-small font-medium">Ticket desk</p>
          <p className="mt-1 text-meta text-secondary">Prism Nights / Entry validation</p>
          <div className="mt-4 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-2 gap-y-3 text-meta">
            <span className="text-secondary">Ticket</span><span className="text-right text-secondary">State</span>
            <span className="font-mono">D-021</span><span className="rounded bg-accent-mint/10 px-1.5 py-1 text-center text-accent-mint">Valid</span>
            <span className="font-mono">D-022</span><span className="rounded bg-accent-violet/10 px-1.5 py-1 text-center text-accent-violet">Already used</span>
            <span className="font-mono">D-023</span><span className="rounded bg-surface-elevated px-1.5 py-1 text-center text-secondary">Not valid</span>
          </div>
        </div>
        <div className={`${panelClasses} min-[1101px]:[transform:perspective(900px)_rotateY(-12deg)_rotateZ(7deg)] z-2 min-w-0 rounded-[22px] p-2 min-[1101px]:absolute min-[1101px]:top-13 min-[1101px]:right-0 min-[1101px]:w-[26%]`} aria-hidden="true">
          <div className="mx-auto mb-2 h-1 w-8 rounded-full bg-control" />
          <div className="rounded-[14px] bg-background p-3">
            <p className="text-meta text-secondary">Demo pass</p>
            <p className="mt-2 text-small font-medium">Prism Nights</p>
            <div className="mt-3 rounded-md bg-linear-to-br from-accent-blue/15 via-surface to-accent-violet/15"><SamplePassCode /></div>
            <p className="mt-3 font-mono text-meta text-secondary">D-021 · Gate A</p>
            <div className="mt-3 rounded-md bg-accent-mint/10 px-2 py-2 text-center text-meta font-medium text-accent-mint">
              <svg viewBox="0 0 24 24" className="mx-auto mb-1 size-5" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="9" /><path d="m8 12 3 3 5-6" /></svg>
              Entry granted
            </div>
          </div>
        </div>
      </div>
      <figcaption className="mt-4 text-meta leading-relaxed text-muted" id="product-visual-caption">Illustrative interface concepts · Fictional events, ticket states and mobile access pass. Not real product screenshots or employer implementations.</figcaption>
    </figure>
  );
}
