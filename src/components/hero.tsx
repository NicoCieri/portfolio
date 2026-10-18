export function Hero() {
  return (
    <section
      className="page-shell grid grid-cols-1 pt-7 pb-8 min-[541px]:pt-10 min-[541px]:pb-12 min-[801px]:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] min-[801px]:gap-x-10 min-[801px]:pt-16 min-[1101px]:grid-cols-[minmax(0,1.85fr)_minmax(0,1fr)] min-[1101px]:gap-x-18"
      id="about"
      aria-labelledby="hero-heading"
    >
      <p className="mb-6 max-w-[30ch] text-small leading-[1.6] font-[450] tracking-[0.01em] text-secondary min-[541px]:mb-7 min-[541px]:max-w-none min-[541px]:leading-normal min-[801px]:col-span-2">
        Senior Frontend Engineer / Tech Lead
      </p>
      <h1 className="m-0 min-w-0 max-w-[16ch] text-display leading-(--leading-display) font-medium tracking-(--tracking-display) min-[801px]:max-w-none" id="hero-heading">
        <span className="block">I make{" "}</span>
        <span className="block">complex things{" "}</span>
        <span className="headline-gradient block">feel simple.</span>
      </h1>
      <div className="min-w-0 self-center pt-[26px] min-[541px]:pt-7 min-[801px]:pt-6">
        <p className="max-w-[54ch] text-lead leading-(--leading-body) text-secondary min-[801px]:max-w-[34ch]">
          I’m Nicolás. I turn complex engineering challenges into clear,
          scalable interfaces and help teams build software with care.
        </p>
        <div className="mt-6 flex flex-wrap gap-3 min-[541px]:mt-7 min-[801px]:flex-col min-[801px]:items-start min-[1101px]:flex-row min-[1101px]:items-stretch">
          <a
            className="inline-flex min-h-[50px] items-center justify-center rounded-(--radius-control) border border-transparent bg-foreground px-[18px] py-3 text-ui leading-normal font-[550] text-background shadow-(--shadow-control) transition-colors duration-(--motion-fast) ease-out hover:bg-primary-hover focus-visible:bg-primary-hover motion-reduce:transition-none min-[541px]:px-5 forced-colors:border-[ButtonText]"
            href="#work"
          >Explore work</a>
          <a
            className="inline-flex min-h-[50px] items-center justify-center rounded-(--radius-control) border border-control bg-surface px-[18px] py-3 text-ui leading-normal font-[550] text-foreground transition-colors duration-(--motion-fast) ease-out hover:border-muted hover:bg-surface-elevated focus-visible:border-muted focus-visible:bg-surface-elevated motion-reduce:transition-none min-[541px]:px-5 forced-colors:border-[ButtonText]"
            href="mailto:ncierisalcedo@gmail.com"
          >Get in touch</a>
        </div>
      </div>
      <dl className="col-span-full mt-9 grid grid-cols-1 gap-6 border-t border-border pt-6 min-[541px]:mt-10 min-[541px]:grid-cols-2 min-[541px]:gap-8 min-[541px]:pt-7 min-[801px]:mt-16">
        <div>
          <dt className="text-meta leading-normal text-muted">Based in</dt>
          <dd className="mt-2 flex flex-wrap items-baseline gap-x-4 gap-y-2 text-small leading-[1.6] text-secondary min-[541px]:text-body">
            <span>Buenos Aires, Argentina</span>{" "}
            <span className="font-mono text-small whitespace-nowrap">UTC−3</span>
          </dd>
        </div>
        <div>
          <dt className="text-meta leading-normal text-muted">Experience</dt>
          <dd className="mt-2 text-small leading-[1.6] text-secondary min-[541px]:text-body">10+ years in frontend engineering</dd>
        </div>
      </dl>
    </section>
  );
}
