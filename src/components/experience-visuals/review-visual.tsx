import { panelClasses, sceneClasses } from "@/components/illustration-classes";

export function ReviewVisual() {
  return (
    <figure className="min-w-0" aria-labelledby="review-visual-caption">
      <div className={`${sceneClasses} rounded-xl px-1 py-5 min-[541px]:px-4 min-[541px]:py-6`}>
        <div className={`${panelClasses} min-[1101px]:[transform:perspective(1400px)_rotateY(-5deg)_rotateZ(1deg)] overflow-hidden rounded-xl`}>
          <div className="flex flex-wrap items-center justify-between gap-2 px-4 pt-5 min-[541px]:px-5"><span className="text-meta text-secondary">Sample pull request / 024</span><span className="rounded-full bg-accent-mint/10 px-2.5 py-1 text-meta text-accent-mint">In review</span></div>
          <h4 className="px-4 pt-3 text-body font-medium min-[541px]:px-5">Make the empty selection explicit</h4>
          <p className="px-4 pt-2 font-mono text-meta text-secondary min-[541px]:px-5">selection-boundary → main</p>
          <div className="m-4 overflow-hidden rounded-md bg-background/80 min-[541px]:m-5">
            <p className="border-b border-border px-3 py-3 font-mono text-meta text-secondary">selection.ts · TypeScript</p>
            <pre className="whitespace-pre-wrap break-words py-3 font-mono text-meta leading-[1.9] [overflow-wrap:anywhere]"><code><span className="block px-3 text-secondary">{"type Section = { name: string };"}</span><span className="block px-3 text-secondary">{"function label(section: Section | null) {"}</span><span className="block bg-[#fda4af0c] px-3 text-[#fda4af]">{"-  return section!.name;"}</span><span className="block bg-accent-mint/8 px-3 text-accent-mint">{"+  if (!section) return \"Choose a section\";"}</span><span className="block bg-accent-mint/8 px-3 text-accent-mint">{"+  return section.name;"}</span><span className="block px-3 text-secondary">{"}"}</span></code></pre>
          </div>
          <div className="grid gap-4 px-4 pb-5 min-[541px]:grid-cols-2 min-[541px]:px-5">
            <div className="flex items-start gap-3"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent-blue/15 text-meta text-accent-blue" aria-hidden="true">A</span><div><p className="text-small font-medium">Contributor A</p><p className="mt-1 text-small leading-relaxed text-secondary">Can we handle the empty state at this boundary?</p></div></div>
            <div className="flex items-start gap-3"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent-violet/15 text-meta text-accent-violet" aria-hidden="true">B</span><div><p className="text-small font-medium">Contributor B</p><p className="mt-1 text-small leading-relaxed text-secondary">Added a guard. I’ll cover the empty selection in a test, too.</p></div></div>
          </div>
        </div>
      </div>
      <figcaption className="mt-2 text-meta leading-relaxed text-muted" id="review-visual-caption">Fictional review · Sample code and contributors, not an employer pull request.</figcaption>
    </figure>
  );
}
