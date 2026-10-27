import type { Metadata } from "next";
import Link from "next/link";
import { PortfolioShell } from "@/components/portfolio-shell";
import { ProfessionalExperience } from "@/components/professional-experience";

export const metadata: Metadata = {
  title: "Professional Experience — Nicolás Cieri",
  description: "Nicolás Cieri’s frontend engineering career, technical leadership, and concurrent teaching appointments.",
};

export default function ExperiencePage() {
  return (
    <PortfolioShell experiencePage>
      <div className="page-shell pt-6 min-[541px]:pt-8">
        <Link className="inline-flex min-h-11 items-center text-ui text-secondary underline decoration-control underline-offset-8 transition-colors duration-(--motion-fast) hover:text-foreground focus-visible:text-foreground" href="/">Back to homepage</Link>
      </div>
      <ProfessionalExperience />
    </PortfolioShell>
  );
}
