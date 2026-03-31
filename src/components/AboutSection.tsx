import { motion } from "framer-motion";
import { GraduationCap, Calendar, BookOpen, Sparkles } from "lucide-react";
import { springs } from "@/lib/springs";
import { useGSAPTextReveal } from "@/hooks/useGSAPTextReveal";

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.08,
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
      staggerChildren: 0.04,
      delayChildren: 0.1,
    },
  },
};

const childFade = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: springs.standard,
  },
};

const AboutSection = () => {
  const textRef = useGSAPTextReveal();
  const coursework = [
    "Business Systems Analysis",
    "Statistics",
    "Project Management",
    "Database Management",
    "Advanced Data Analytics",
    "Quantitative Analysis",
    "Risk Management",
    "Operations Management",
  ];

  return (
    <section id="about" className="relative py-20 sm:py-32 overflow-hidden">
      {/* Background accent */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] opacity-30"
        style={{
          background: 'radial-gradient(ellipse, hsl(217 91% 60% / 0.1) 0%, transparent 70%)',
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
          <h2 className="section-label mb-4">Summary</h2>
          <h3 className="section-title gsap-reveal">Education & Background</h3>
        </motion.div>

        <motion.div
          className="grid lg:grid-cols-2 gap-5 sm:gap-8"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div
            variants={cardVariants}
            className="glass-card rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 group"
            whileHover={{ y: -4, transition: springs.standard }}
          >
            <div className="flex items-start gap-3 sm:gap-5 mb-6 sm:mb-8">
              <motion.div
                className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-br from-primary/20 to-accent/10 text-primary"
                whileHover={{ scale: 1.06 }}
                transition={springs.bouncy}
              >
                <GraduationCap className="w-5 h-5 sm:w-7 sm:h-7" />
              </motion.div>
              <div>
                <h4 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2">Bachelor of Commerce</h4>
                <p className="text-primary font-semibold text-sm sm:text-lg">Business Technology Management (Honours)</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-primary/60" />
                <span className="font-medium">Seneca Polytechnic</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary/60" />
                <span>2022 – 2026</span>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed text-sm sm:text-base md:text-lg">
              Graduating April 2026 with strengths in SQL, Python, Excel, Power BI, and Tableau.
              Experienced in analyzing trends and building dashboards to surface key insights that
              support business decisions. Seeking full-time roles in analytics or consulting focused
              on KPI reporting, data quality, and insight-driven recommendations.
            </p>
          </motion.div>

          <motion.div
            variants={cardVariants}
            className="glass-card rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 group"
            whileHover={{ y: -4, transition: springs.standard }}
          >
            <div className="flex items-center gap-3 mb-6 sm:mb-8">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 45 }}
                transition={springs.bouncy}
              >
                <Sparkles className="w-5 h-5 text-primary" />
              </motion.div>
              <h4 className="text-xl sm:text-2xl font-bold">Relevant Coursework</h4>
            </div>
            <motion.div className="flex flex-wrap gap-2 sm:gap-3">
              {coursework.map((course) => (
                <motion.span
                  key={course}
                  variants={childFade}
                  className="skill-badge text-xs sm:text-sm md:text-base"
                  whileHover={{
                    scale: 1.05,
                    y: -1,
                    transition: springs.bouncy,
                  }}
                >
                  {course}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
