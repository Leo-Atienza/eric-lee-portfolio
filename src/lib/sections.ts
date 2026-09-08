/** The page's sections, in order. Drives the nav shortcuts and the current-section marker. */
export const SECTIONS = [
  { id: "about", label: "Summary" },
  { id: "figures", label: "Figures", nav: false },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "certifications", label: "Certifications" },
  { id: "contact", label: "Contact" },
] as const;

export const NAV_SECTIONS = SECTIONS.filter((section) => !("nav" in section && section.nav === false));

export type SectionId = (typeof SECTIONS)[number]["id"];
