import { motion } from "framer-motion";
import { GraduationCap, Calendar, BookOpen, Sparkles } from "lucide-react";

// Refined animation variants
const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.4,
      ease: [0.34, 1.56, 0.64, 1] as const,
    },
  }),
};

const AboutSection = () => {
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
    <section id="about" className="relative py-32 overflow-hidden">
      {/* Background accent */}
      <motion.div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px]"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 0.3, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        style={{
          background: 'radial-gradient(ellipse, hsl(217 91% 60% / 0.1) 0%, transparent 70%)',
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
          <h2 className="section-label mb-4">About</h2>
          <h3 className="section-title">Education & Background</h3>
        </motion.div>

        <motion.div 
          className="grid lg:grid-cols-2 gap-8"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <motion.div
            variants={cardVariants}
            className="glass-card rounded-3xl p-8 md:p-10 group"
            whileHover={{ y: -8, transition: { type: "spring", stiffness: 300, damping: 20 } }}
          >
            <div className="flex items-start gap-5 mb-8">
              <motion.div 
                className="p-4 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/10 text-primary"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <GraduationCap className="w-7 h-7" />
              </motion.div>
              <div>
                <h4 className="text-2xl font-bold mb-2">Bachelor of Commerce</h4>
                <p className="text-primary font-semibold text-lg">Business Technology Management (Honours)</p>
              </div>
            </div>

            <div className="flex items-center gap-6 text-muted-foreground mb-8">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-primary/60" />
                <span className="font-medium">Seneca Polytechnic</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary/60" />
                <span>2022 – 2026</span>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed text-lg">
              Graduating April 2026 with strengths in SQL, Python, Excel, Power BI, and Tableau. 
              Experienced in analyzing trends and building dashboards to surface key insights that 
              support business decisions. Seeking full-time roles in analytics or consulting focused 
              on KPI reporting, data quality, and insight-driven recommendations.
            </p>
          </motion.div>

          <motion.div
            variants={cardVariants}
            className="glass-card rounded-3xl p-8 md:p-10 group"
            whileHover={{ y: -8, transition: { type: "spring", stiffness: 300, damping: 20 } }}
          >
            <div className="flex items-center gap-3 mb-8">
              <motion.div
                whileHover={{ scale: 1.2, rotate: 180 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Sparkles className="w-5 h-5 text-primary" />
              </motion.div>
              <h4 className="text-2xl font-bold">Relevant Coursework</h4>
            </div>
            <motion.div 
              className="flex flex-wrap gap-3"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {coursework.map((course, index) => (
                <motion.span
                  key={course}
                  custom={index}
                  variants={badgeVariants}
                  className="skill-badge text-base"
                  whileHover={{ 
                    scale: 1.08, 
                    y: -4,
                    transition: { type: "spring", stiffness: 400 }
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
