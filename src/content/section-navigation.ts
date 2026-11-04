export const portfolioSections = [
  { id: "about", label: "Home" },
  { id: "ticketing", label: "Ticketing & access" },
  { id: "seat-selection", label: "Seat selection" },
  { id: "stadium-editor", label: "Visual editor" },
  { id: "backoffice", label: "Operational interfaces" },
  { id: "airport", label: "Airport operations" },
  { id: "ecommerce", label: "E-commerce" },
  { id: "craft", label: "AI-assisted engineering" },
  { id: "contact", label: "Contact" },
] as const;

export type PortfolioSectionId = (typeof portfolioSections)[number]["id"];
