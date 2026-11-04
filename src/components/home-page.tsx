import { Hero } from "@/components/hero";
import { SectionNavigation } from "@/components/section-navigation";
import { PortfolioShell } from "@/components/portfolio-shell";
import { TicketingExperience } from "@/components/ticketing-scene/ticketing-experience";
import { StadiumEditorExperience } from "@/components/stadium-editor-scene/stadium-editor-experience";
import { SeatSelectionExperience } from "@/components/seat-selection-scene/seat-selection-experience";
import { BackofficeExperience } from "@/components/backoffice/backoffice-experience";
import { AirportExperience } from "@/components/airport-scene/airport-experience";
import { CommerceExperience } from "@/components/commerce-scene/commerce-experience";
import { CodeCraft } from "@/components/code-craft/code-craft";

export function HomePage() {
  return (
    <PortfolioShell>
      <SectionNavigation />
      <Hero />
      <div id="work" className="scroll-mt-0">
        <TicketingExperience />
      </div>
      <SeatSelectionExperience />
      <StadiumEditorExperience />
      <BackofficeExperience />
      <AirportExperience />
      <CommerceExperience />
      <CodeCraft />
    </PortfolioShell>
  );
}
