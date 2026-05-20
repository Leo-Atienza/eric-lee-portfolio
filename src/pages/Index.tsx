import { lazy, Suspense, useEffect } from "react";
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
      lerp: 0.08,
      touchMultiplier: 1.5,
      smoothWheel: true,
      syncTouch: true,
      syncTouchLerp: 0.075,
    });

    // Keep GSAP ScrollTrigger in sync with Lenis's virtual scroll so scrub
    // animations (hero parallax, experience timeline) stay glued on touch.
    lenis.on("scroll", ScrollTrigger.update);

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    const handleScrollTop = () => lenis.scrollTo(0);
    window.addEventListener("lenis:scrollTop", handleScrollTop);

    return () => {
      window.removeEventListener("lenis:scrollTop", handleScrollTop);
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
      <SectionDivider />
      <Suspense fallback={<SectionSkeleton />}>
        <AboutSection />
      </Suspense>
      <SectionDivider />
      <Suspense fallback={<SectionSkeleton />}>
        <StatsSection />
      </Suspense>
      <SectionDivider />
      <Suspense fallback={<SectionSkeleton />}>
        <SkillsSection />
      </Suspense>
      <SectionDivider />
      <Suspense fallback={<SectionSkeleton />}>
        <ExperienceSection />
      </Suspense>
      <SectionDivider />
      <Suspense fallback={<SectionSkeleton />}>
        <ProjectsSection />
      </Suspense>
      <SectionDivider />
      <Suspense fallback={<SectionSkeleton />}>
        <CertificationsSection />
      </Suspense>
      <SectionDivider />
      <Suspense fallback={<SectionSkeleton />}>
        <ContactSection />
      </Suspense>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Index;
