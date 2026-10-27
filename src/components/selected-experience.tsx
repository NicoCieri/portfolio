import Link from "next/link";
import { ProductInterfaces } from "@/components/experience-visuals/product-interfaces";
import { ArchitectureVisual } from "@/components/experience-visuals/architecture-visual";
import { ReviewVisual } from "@/components/experience-visuals/review-visual";

function ContextLabels({ labels, label }: { labels: string[]; label: string }) {
  return <ul className="mt-6 flex list-none flex-wrap gap-2 p-0" aria-label={label}>{labels.map((item) => <li className="rounded-sm border border-border bg-surface/35 px-2.5 py-1.5 text-meta leading-relaxed text-secondary" key={item}>{item}</li>)}</ul>;
}

export function SelectedExperience() {
  return (
    <section className="page-shell pt-6 pb-16 min-[541px]:pt-8 min-[541px]:pb-24" id="selected-experience" aria-labelledby="selected-experience-heading">
      <p className="text-small text-secondary"><span className="mr-4 text-accent-mint">02 /</span>Selected Experience</p>
      <div className="mt-4 grid min-w-0 grid-cols-1 gap-5 min-[901px]:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)] min-[901px]:items-end min-[901px]:gap-16">
        <h2 className="text-[clamp(34px,3.7vw,52px)] leading-[1.15] font-medium tracking-[-0.045em]" id="selected-experience-heading">The work behind the <span className="headline-gradient">experience.</span></h2>
        <p className="max-w-[46ch] text-body leading-[1.75] text-secondary">Different teams. Complex interfaces. A consistent focus on maintainable software and the people building it.</p>
      </div>

      <article className="mt-10 grid min-w-0 grid-cols-1 items-center gap-7 border-t border-border py-10 min-[541px]:py-12 min-[1001px]:grid-cols-[minmax(0,.85fr)_minmax(0,1.4fr)] min-[1001px]:gap-12" aria-labelledby="ticketing-experience-heading">
        <div className="min-w-0">
          <p className="font-mono text-small text-accent-mint">01 /</p>
          <h3 className="mt-4 text-[clamp(28px,2.5vw,36px)] leading-[1.2] font-medium tracking-[-0.035em]" id="ticketing-experience-heading">Ticketing &amp; Access Experiences</h3>
          <p className="mt-4 max-w-[48ch] text-lead leading-[1.7] text-secondary">I build web and mobile interfaces for ticketing and venue operations, where complex workflows need to feel intuitive for customers and operational teams.</p>
          <p className="mt-5 max-w-[52ch] text-small leading-[1.75] text-secondary">Experience in separate roles at Fanki, a Colombian startup, and ITTI, a Paraguayan company.</p>
        </div>
        <ProductInterfaces />
      </article>

      <article className="grid min-w-0 grid-cols-1 items-center gap-7 border-t border-border py-10 min-[541px]:py-12 min-[1001px]:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] min-[1001px]:gap-16" aria-labelledby="complex-interfaces-heading">
        <div className="min-w-0 min-[1001px]:col-start-2 min-[1001px]:row-start-1">
          <p className="font-mono text-small text-accent-mint">02 /</p>
          <h3 className="mt-4 text-[clamp(28px,2.5vw,36px)] leading-[1.2] font-medium tracking-[-0.035em]" id="complex-interfaces-heading">Engineering Complex Interfaces</h3>
          <p className="mt-4 max-w-[48ch] text-lead leading-[1.7] text-secondary">I build complex interfaces with reusable components, clear boundaries, and code that a team can maintain. State management and automated testing are part of that work.</p>
          <p className="mt-4 max-w-[52ch] text-body leading-[1.75] text-secondary">I care about performance and accessibility as part of those foundations, alongside the structure that lets a codebase evolve.</p>
          <ContextLabels labels={['React', 'Next.js', 'TypeScript', 'Testing', 'Accessibility']} label="Technical context and engineering priorities" />
        </div>
        <div className="min-w-0 min-[1001px]:col-start-1 min-[1001px]:row-start-1"><ArchitectureVisual /></div>
      </article>

      <article className="grid min-w-0 grid-cols-1 items-center gap-7 border-t border-border py-10 min-[541px]:py-12 min-[1001px]:grid-cols-[minmax(0,.85fr)_minmax(0,1.4fr)] min-[1001px]:gap-12" aria-labelledby="technical-leadership-heading">
        <div className="min-w-0">
          <p className="font-mono text-small text-accent-mint">03 /</p>
          <h3 className="mt-4 text-[clamp(28px,2.5vw,36px)] leading-[1.2] font-medium tracking-[-0.035em]" id="technical-leadership-heading">Technical Leadership</h3>
          <p className="mt-4 max-w-[48ch] text-lead leading-[1.7] text-secondary">I contribute to technical decisions, review code, and mentor engineers while staying close to implementation.</p>
          <p className="mt-4 max-w-[52ch] text-body leading-[1.75] text-secondary">I coordinate delivery with product, design, backend, and DevOps teams. Hands-on development and shared engineering judgment belong together.</p>
          <ContextLabels labels={['Code reviews', 'Mentoring', 'Hands-on development']} label="Technical leadership responsibilities" />
        </div>
        <ReviewVisual />
      </article>

      <div className="border-t border-border pt-5">
        <Link className="inline-flex min-h-11 items-center text-ui font-medium text-accent-mint underline decoration-accent-mint/40 underline-offset-8 transition-colors duration-(--motion-fast) hover:text-foreground focus-visible:text-foreground" href="/experience">View full professional experience</Link>
      </div>
    </section>
  );
}
