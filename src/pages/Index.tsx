import { lazy, Suspense, useEffect } from "react";
import Lenis from "lenis";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import ScrollProgress from "@/components/ScrollProgress";
import BackToTopFAB from "@/components/BackToTopFAB";
import SectionDivider from "@/components/SectionDivider";
import SectionSkeleton from "@/components/SectionSkeleton";

const AboutSection = lazy(() => import("@/components/AboutSection"));
const StatsSection = lazy(() => import("@/components/StatsSection"));
const SkillsSection = lazy(() => import("@/components/SkillsSection"));
const ExperienceSection = lazy(() => import("@/components/ExperienceSection"));
const ProjectsSection = lazy(() => import("@/components/ProjectsSection"));
const CertificationsSection = lazy(() => import("@/components/CertificationsSection"));
const ContactSection = lazy(() => import("@/components/ContactSection"));
const Footer = lazy(() => import("@/components/Footer"));

const Index = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.5,
      smoothWheel: true,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    const handleScrollTop = () => lenis.scrollTo(0);
    window.addEventListener('lenis:scrollTop', handleScrollTop);

    return () => {
      window.removeEventListener('lenis:scrollTop', handleScrollTop);
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <div id="main-content" className="min-h-screen bg-background">
      <ScrollProgress />
      <BackToTopFAB />
      <Navigation />
      <HeroSection />
      <Suspense fallback={<SectionSkeleton />}>
        <SectionDivider />
        <AboutSection />
        <SectionDivider />
        <StatsSection />
        <SectionDivider />
        <SkillsSection />
        <SectionDivider />
        <ExperienceSection />
        <SectionDivider />
        <ProjectsSection />
        <SectionDivider />
        <CertificationsSection />
        <SectionDivider />
        <ContactSection />
        <Footer />
      </Suspense>
    </div>
  );
};

export default Index;
