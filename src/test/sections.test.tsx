import { render, screen, within } from "@testing-library/react";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import FiguresSection from "@/components/FiguresSection";
import SkillsSection from "@/components/SkillsSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import CertificationsSection from "@/components/CertificationsSection";
import ContactSection from "@/components/ContactSection";
import { NAV_SECTIONS, SECTIONS } from "@/lib/sections";

describe("section shortcuts", () => {
  it("point every nav shortcut at a section that exists on the page", () => {
    const { container } = render(
      <>
        <Navigation />
        <HeroSection />
        <AboutSection />
        <FiguresSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <CertificationsSection />
        <ContactSection />
      </>
    );

    const nav = screen.getAllByRole("navigation", { name: "Sections" })[0];
    for (const { id, label } of NAV_SECTIONS) {
      expect(within(nav).getByRole("link", { name: label })).toHaveAttribute("href", `#${id}`);
    }
    for (const { id } of SECTIONS) {
      expect(container.querySelector(`section#${id}`)).not.toBeNull();
    }
  });

  it("keep the section ids unique", () => {
    const ids = SECTIONS.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
