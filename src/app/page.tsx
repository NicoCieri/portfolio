import { Hero } from "@/components/hero";
import { FeaturedWork } from "@/components/featured-work";
import { PortfolioShell } from "@/components/portfolio-shell";
import { SelectedExperience } from "@/components/selected-experience";

export default function Home() {
  return (
    <PortfolioShell>
      <Hero />
      <FeaturedWork />
      <SelectedExperience />
    </PortfolioShell>
  );
}
