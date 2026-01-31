import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const experiences = [
  {
    title: "Finance, Accounting, Tax Specialist",
    company: "NeedList.org",
    location: "Toronto, ON",
    period: "June 2025 – August 2025",
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
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, x: -50, scale: 0.95 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

const achievementVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  }),
};

const ExperienceSection = () => {
  return (
    <section id="experience" className="relative py-32 overflow-hidden">
      {/* Background effect */}
      <motion.div 
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px]"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 0.2, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
        style={{
          background: 'radial-gradient(circle, hsl(260 80% 60% / 0.15) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-16"
        >
          <h2 className="section-label mb-4">Experience</h2>
          <h3 className="section-title">Work History</h3>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <motion.div 
            className="absolute left-0 md:left-8 top-0 bottom-0 w-px timeline-line hidden md:block"
            initial={{ scaleY: 0, originY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          />

          <motion.div 
            className="space-y-6 md:space-y-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {experiences.map((exp, index) => (
              <motion.div
                key={`${exp.title}-${exp.company}`}
                variants={cardVariants}
                className="relative md:pl-24"
              >
                {/* Timeline dot */}
                <motion.div 
                  className="absolute left-0 md:left-6 top-10 timeline-dot hidden md:block"
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ 
                    delay: index * 0.2 + 0.3, 
                    type: "spring", 
                    stiffness: 400,
                    damping: 15
                  }}
                />

                <motion.div 
                  className="glass-card rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 group"
                  whileHover={{ 
                    y: -6, 
                    transition: { type: "spring", stiffness: 300, damping: 20 } 
                  }}
                >
                  <div className="flex flex-col gap-3 mb-5 sm:mb-6">
                    <div>
                      <div className="flex items-start sm:items-center gap-2 sm:gap-3 flex-wrap mb-2">
                        <h4 className="text-lg sm:text-xl md:text-2xl font-bold leading-tight">{exp.title}</h4>
                        {exp.type && (
                          <motion.span 
                            className="text-[10px] sm:text-xs px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 text-primary font-semibold"
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5, type: "spring" }}
                          >
                            {exp.type}
                          </motion.span>
                        )}
                      </div>
                      <p className="text-primary font-semibold text-base sm:text-lg">{exp.company}</p>
                    </div>
                    <div className="text-xs sm:text-sm text-muted-foreground">
                      <p className="font-medium">{exp.period} • {exp.location}</p>
                    </div>
                  </div>

                  <ul className="space-y-3 sm:space-y-4">
                    {exp.achievements.map((achievement, i) => (
                      <motion.li 
                        key={i} 
                        className="flex items-start gap-3 sm:gap-4 text-muted-foreground group/item"
                        custom={i}
                        variants={achievementVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                      >
                        <motion.div
                          whileHover={{ scale: 1.2, rotate: 10 }}
                          transition={{ type: "spring", stiffness: 400 }}
                        >
                          <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-primary mt-0.5 flex-shrink-0" />
                        </motion.div>
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
