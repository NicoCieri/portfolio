import { GradientText } from "@/components/gradient-text";
import { ArenaPreview } from "@/components/arena-preview";

export function FeaturedWork() {
  return (
    <section className="page-shell mt-2 pt-6 pb-8 min-[541px]:mt-4 min-[541px]:pt-8 min-[541px]:pb-12" id="work" aria-labelledby="featured-heading">
      <div className="flex flex-wrap items-center justify-between gap-4 min-[541px]:flex-nowrap">
        <h2 className="text-body" id="featured-heading">
          <span className="mr-3 text-accent">01 /</span> Featured Work
        </h2>
        <span className="border border-border px-2 py-[5px] font-mono text-meta leading-[1.6] text-secondary">Independent concept</span>
      </div>
      <div className="mt-8 grid grid-cols-1 items-center gap-7 min-[541px]:mt-10 min-[541px]:gap-8 min-[901px]:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] min-[901px]:gap-10 min-[1101px]:gap-18">
        <div className="min-w-0">
          <p className="font-mono text-label leading-[1.6] tracking-[0.04em] text-muted uppercase">Spatial interfaces / Engineering study</p>
          <h3 className="mt-4 text-[56px] leading-[1.1] font-medium tracking-[-0.05em] min-[541px]:mt-5 min-[541px]:text-[clamp(56px,5vw,80px)]">ARENA</h3>
          <p className="mt-5 max-w-[52ch] text-lead leading-[1.65] text-secondary min-[541px]:mt-6 min-[901px]:max-w-[40ch]">
            A fictional venue editor and seating experience. An exploration of
            how complex spatial information can become a clear, usable interface.
          </p>
          <ul className="mt-7 flex list-none flex-wrap gap-2.5 p-0 [&>li]:border [&>li]:border-border [&>li]:px-3 [&>li]:py-1.5 [&>li]:font-mono [&>li]:text-meta [&>li]:leading-[1.6] [&>li]:text-secondary" aria-label="Technologies used in this study">
            <li>Next.js</li><li>TypeScript</li><li>SVG</li>
          </ul>
          <details className="group/notes mt-7">
            <summary className="gradient-trigger min-h-11 w-fit cursor-pointer list-[disclosure-closed] py-2 text-ui leading-normal font-[550] group-open/notes:list-[disclosure-open] group-open/notes:text-accent">
              <GradientText>Explore the concept</GradientText>
            </summary>
            <p className="mt-4 max-w-[48ch] text-body leading-[1.7] text-secondary">
              Venue geometry, seating sections, and layered information make an
              interesting interface engineering problem: how do you preserve
              context while letting someone work with precise details? This
              initial study establishes the visual language for that exploration.
              The preview is an original static SVG; the editor is not implemented yet.
            </p>
          </details>
        </div>
        <ArenaPreview />
      </div>
    </section>
  );
}
