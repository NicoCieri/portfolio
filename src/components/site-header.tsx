import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="page-shell flex flex-wrap items-center justify-between gap-3 py-5 min-[541px]:flex-nowrap min-[541px]:gap-8 min-[541px]:py-8">
      <Link
        className="inline-flex items-baseline gap-2.5 text-body font-[550] tracking-[-0.025em] whitespace-nowrap min-[541px]:gap-4 min-[541px]:text-[17px]"
        href="/"
        aria-label="Nicolás Cieri — Homepage"
      >
        <span className="text-[28px] font-[650] tracking-[-0.075em] min-[541px]:text-[30px]" aria-hidden="true">nc.</span>
        <span>Nicolás Cieri</span>
      </Link>
      <nav className="flex gap-5 min-[541px]:gap-8" aria-label="Main navigation">
        <a className="inline-flex min-h-11 items-center text-nav text-secondary transition-colors duration-(--motion-fast) ease-[ease] hover:text-foreground focus-visible:text-foreground" href="#work">Work</a>
        <a className="inline-flex min-h-11 items-center text-nav text-secondary transition-colors duration-(--motion-fast) ease-[ease] hover:text-foreground focus-visible:text-foreground" href="#about">About</a>
        <a className="inline-flex min-h-11 items-center text-nav text-secondary transition-colors duration-(--motion-fast) ease-[ease] hover:text-foreground focus-visible:text-foreground" href="mailto:ncierisalcedo@gmail.com">Contact</a>
      </nav>
    </header>
  );
}
