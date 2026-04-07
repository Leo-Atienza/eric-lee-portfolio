import { useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { springs } from "@/lib/springs";
import { useGSAPTextReveal } from "@/hooks/useGSAPTextReveal";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    title: "Finance, Accounting, Tax Specialist",
    company: "NeedList.org",
    location: "Toronto, ON",
    period: "June 2025 – August 2025",
    duration: "3 months",
    type: "Volunteer",
    achievements: [
      "Improved tax reporting with Excel formulas and data validation, cutting calculation time by 50%",
      "Reduced rework by preparing audit-ready documents and reconciliation evidence, cutting revisions by 30%",
      "Strengthened stakeholder support by standardizing tax documentation and evidence",
    ],
  },
  {
    title: "HELIX Entrepreneur | SearGuard",
    company: "Seneca Polytechnic",
    location: "Toronto, ON",
    period: "May 2025 – August 2025",
    duration: "4 months",
    achievements: [
      "Improved pricing and budgeting by benchmarking 12 competitors and building a forecast model",
      "Reduced response time by building an intake workflow for 25 weekly requests, improving turnaround by 30%",
      "Increased delivery accountability by standardizing tracking and follow-ups, reducing missed items by 20%",
    ],
  },
  {
    title: "Customer Service Representative",
    company: "Seneca Polytechnic",
    location: "Toronto, ON",
    period: "August 2024 – Present",
    duration: "1+ year",
    achievements: [
      "Resolved customer issues on the same day by prioritizing high-volume requests, increasing same-day resolution by 20%",
      "Documented cases in Excel and troubleshot issues before escalation, reducing repeat follow-ups by 25%",
      "Coordinated with supervisors to escalate complex cases with clear summaries, improving turnaround by 15%",
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.18,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      ...springs.standard,
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
};

const childFade = {
  hidden: { opacity: 0, x: -6 },
  visible: {
    opacity: 1,
    x: 0,
    transition: springs.standard,
  },
};

const ExperienceSection = () => {
  const textRef = useGSAPTextReveal();

  // GSAP scroll-driven timeline progress
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".timeline-line-el",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".experience-container",
            start: "top 60%",
            end: "bottom 40%",
            scrub: 0.5,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" className="relative py-20 sm:py-32 overflow-hidden">
      {/* Background effect */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-20"
        style={{
          background: 'radial-gradient(circle, hsl(260 80% 60% / 0.15) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <div ref={textRef} className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={springs.standard}
          className="mb-16"
        >
          <h2 className="section-label mb-4">Experience</h2>
          <h3 className="section-title gsap-reveal">Work History</h3>
        </motion.div>

        <div className="relative experience-container">
          {/* Timeline line — GSAP scroll-driven */}
          <div
            className="timeline-line-el absolute left-0 md:left-8 top-0 bottom-0 w-px timeline-line hidden md:block"
            style={{ transformOrigin: "top", transform: "scaleY(0)" }}
          />

          <motion.div
            className="space-y-6 md:space-y-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {experiences.map((exp) => (
              <motion.div
                key={`${exp.title}-${exp.company}`}
                variants={cardVariants}
                className="relative md:pl-24 experience-card"
              >
                {/* Timeline dot with company initial */}
                <motion.div
                  className="timeline-dot-el absolute left-0 md:left-[22px] top-10 w-5 h-5 rounded-full hidden md:flex items-center justify-center text-[8px] font-bold text-white shadow-lg"
                  style={{ background: 'var(--gradient-primary)' }}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={springs.bouncy}
                >
                  {exp.company.charAt(0)}
                </motion.div>

                <motion.div
                  className="glass-card rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 group"
                  whileHover={{ y: -3, transition: springs.standard }}
                >
                  <div className="flex flex-col gap-3 mb-5 sm:mb-6">
                    <div>
                      <div className="flex items-start sm:items-center gap-2 sm:gap-3 flex-wrap mb-2">
                        <h4 className="text-lg sm:text-xl md:text-2xl font-bold leading-tight">{exp.title}</h4>
                        {exp.type && (
                          <span className="text-xs px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 text-primary font-semibold">
                            {exp.type}
                          </span>
                        )}
                      </div>
                      <p className="text-primary font-semibold text-base sm:text-lg">{exp.company}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap text-xs sm:text-sm text-muted-foreground">
                      <p className="font-medium">{exp.period} • {exp.location}</p>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-semibold">
                        {exp.duration}
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-3 sm:space-y-4">
                    {exp.achievements.map((achievement, i) => (
                      <motion.li
                        key={i}
                        className="flex items-start gap-3 sm:gap-4 text-muted-foreground"
                        variants={childFade}
                      >
                        <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="leading-relaxed text-sm sm:text-base">{achievement}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
