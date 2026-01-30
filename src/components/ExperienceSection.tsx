import { motion } from "framer-motion";
import { TrendingUp, CheckCircle2 } from "lucide-react";

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
    title: "HELIX Entrepreneur",
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

const ExperienceSection = () => {
  return (
    <section id="experience" className="relative py-32 overflow-hidden">
      {/* Background effect */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-20"
        style={{
          background: 'radial-gradient(circle, hsl(260 80% 60% / 0.15) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          className="mb-16"
        >
          <h2 className="section-label mb-4">Experience</h2>
          <h3 className="section-title">Work History</h3>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-8 top-0 bottom-0 w-px timeline-line hidden md:block" />

          <div className="space-y-6 md:space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={`${exp.title}-${exp.company}`}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.15, ease: [0.4, 0, 0.2, 1] }}
                className="relative md:pl-24"
              >
                {/* Timeline dot */}
                <motion.div 
                  className="absolute left-0 md:left-6 top-10 timeline-dot hidden md:block"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.15 + 0.2 }}
                />

                <div className="glass-card rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 hover:border-primary/30 transition-all duration-500 group">
                  <div className="flex flex-col gap-3 mb-5 sm:mb-6">
                    <div>
                      <div className="flex items-start sm:items-center gap-2 sm:gap-3 flex-wrap mb-2">
                        <h4 className="text-lg sm:text-xl md:text-2xl font-bold leading-tight">{exp.title}</h4>
                        {exp.type && (
                          <span className="text-[10px] sm:text-xs px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 text-primary font-semibold">
                            {exp.type}
                          </span>
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
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 + i * 0.1 }}
                      >
                        <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-primary mt-0.5 flex-shrink-0 group-hover/item:scale-110 transition-transform" />
                        <span className="leading-relaxed text-sm sm:text-base">{achievement}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
