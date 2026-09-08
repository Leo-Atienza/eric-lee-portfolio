import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import FiguresSection from "@/components/FiguresSection";
import SkillsSection from "@/components/SkillsSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import CertificationsSection from "@/components/CertificationsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

/**
 * The whole page is one prerendered document (scripts/prerender.mjs): every section is in the
 * HTML before any JavaScript runs, so the first paint never waits on a chunk.
 * Scrolling is the browser's own. Anchors glide through `scroll-behavior: smooth` and land under
 * the fixed nav through `scroll-padding-top` (both in index.css), so they work before hydration
 * and the browser moves keyboard focus to the target itself.
 */
const Index = () => (
  <>
    <Navigation />
    <main id="main-content">
      <HeroSection />
      <AboutSection />
      <FiguresSection />
      <SkillsSection />
      <ExperienceSection />
      <ProjectsSection />
      <CertificationsSection />
      <ContactSection />
    </main>
    <Footer />
  </>
);

export default Index;
