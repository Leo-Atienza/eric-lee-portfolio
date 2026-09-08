import { useEffect } from "react";
import Lenis from "lenis";
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

const ANCHOR_OFFSET = -80; // nav height + breathing room

/**
 * The whole page is one prerendered document (scripts/prerender.mjs): every section is in the
 * HTML before any JavaScript runs, so the first paint never waits on a chunk.
 */
const Index = () => {
  useEffect(() => {
    // Reduced-motion readers keep native scrolling and instant anchor jumps.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // syncTouch stays OFF: it replaces iOS's compositor-thread momentum scroll with a
    // main-thread lerp (severe touch lag on real iPhones, invisible in DevTools emulation).
    // Lenis smooths wheel input only; touch keeps native momentum.
    const lenis = new Lenis({ lerp: 0.08, smoothWheel: true });

    let rafId = requestAnimationFrame(function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    });

    // In-page anchors hand focus to the target, then travel through Lenis,
    // so keyboard readers land where the link said, the skip link included.
    const onClick = (event: MouseEvent) => {
      const anchor = (event.target as Element | null)?.closest?.('a[href^="#"]') as HTMLAnchorElement | null;
      if (!anchor) return;
      const id = decodeURIComponent(anchor.getAttribute("href")!.slice(1));
      const target = id ? document.getElementById(id) : null;
      if (!target) return;
      event.preventDefault();
      history.pushState(null, "", `#${id}`);
      if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
      lenis.scrollTo(target, { offset: ANCHOR_OFFSET });
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
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
};

export default Index;
