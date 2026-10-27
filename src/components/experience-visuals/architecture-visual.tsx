import { panelClasses, sceneClasses } from "@/components/illustration-classes";

export function ArchitectureVisual() {
  return (
    <figure className="min-w-0" aria-labelledby="architecture-visual-caption">
      <div className={`${sceneClasses} rounded-xl p-4 min-[541px]:p-6`}>
        <div className="mb-7 flex flex-wrap items-center justify-between gap-2 text-meta"><span className="font-mono text-accent-mint">Application boundaries</span><span className="text-secondary">Dependencies flow down</span></div>
        <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] items-start gap-x-4 min-[541px]:gap-x-8">
          <div className={`${panelClasses} col-span-full rounded-lg p-4`}><p className="text-body font-medium">Web application</p><p className="mt-1 text-small text-secondary">Next.js · Routes &amp; layouts</p></div>
          <div className="col-span-full h-6 w-px justify-self-center bg-linear-to-b from-accent-mint to-accent-blue/50" aria-hidden="true" />
          <div className="col-span-full rounded-lg border border-accent-blue/40 bg-surface p-4">
            <p className="text-body font-medium">Feature modules</p><p className="mt-1 text-small text-secondary">React · Domain state &amp; composition</p>
            <div className="mt-4 flex flex-wrap gap-2 text-meta text-accent-mint"><span className="rounded bg-accent-mint/8 px-2 py-1">Catalog</span><span className="rounded bg-accent-blue/8 px-2 py-1">Selection</span><span className="rounded bg-accent-violet/8 px-2 py-1">Account</span></div>
          </div>
          <div className="relative col-span-full mx-auto h-9 w-[53%]" aria-hidden="true"><div className="mx-auto h-4 w-px bg-accent-blue/60" /><div className="absolute inset-x-0 top-4 h-5 rounded-t-lg border-x border-t border-accent-blue/60" /></div>
          <div className={`${panelClasses} h-full rounded-lg p-3 min-[541px]:p-4`}><span className="mb-3 block h-1 w-8 rounded-full bg-accent-mint" aria-hidden="true" /><p className="text-small font-medium">Services</p><p className="mt-1 text-small leading-relaxed text-secondary">Typed API adapters</p></div>
          <div className={`${panelClasses} h-full rounded-lg p-3 min-[541px]:p-4`}><span className="mb-3 block h-1 w-8 rounded-full bg-accent-violet" aria-hidden="true" /><p className="text-small font-medium">Shared UI</p><p className="mt-1 text-small leading-relaxed text-secondary">Accessible primitives</p></div>
        </div>
        <p className="mt-5 text-center text-meta leading-relaxed text-secondary">TypeScript contracts across boundaries</p>
      </div>
      <figcaption className="mt-4 text-meta leading-relaxed text-muted" id="architecture-visual-caption">Conceptual architecture · Features consume services and shared UI; neither depends on a feature.</figcaption>
    </figure>
  );
}
