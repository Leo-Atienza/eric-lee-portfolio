import { motion } from "framer-motion";
import { Award, Calendar, Sparkles } from "lucide-react";
import { springs } from "@/lib/springs";
import { useGSAPTextReveal } from "@/hooks/useGSAPTextReveal";

const certifications = [
  {
    title: "Data Analytics",
    issuer: "BrainStation",
    location: "Toronto, ON",
    period: "Nov 2023 – Jan 2024",
    status: "Completed",
  },
  {
    title: "SQL for Healthcare Professionals",
    issuer: "LinkedIn Learning",
    period: "October 2024",
    status: "Completed",
  },
  {
    title: "CompTIA A+ Core 1 and Core 2",
    issuer: "CompTIA CertMaster Learn",
    period: "September 2025 – Present",
    status: "In Progress",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.06,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: springs.standard,
  },
};

const CertificationsSection = () => {
  const textRef = useGSAPTextReveal();
  return (
    <section id="certifications" className="relative py-20 sm:py-32 overflow-hidden">
      {/* Background effect */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[400px] h-[400px] opacity-20"
        style={{
          background: 'radial-gradient(circle, hsl(217 91% 60% / 0.15) 0%, transparent 70%)',
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
          <h2 className="section-label mb-4">Certifications</h2>
          <h3 className="section-title gsap-reveal">Professional Development</h3>
        </motion.div>

        <motion.div
          className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {certifications.map((cert) => (
            <motion.div
              key={cert.title}
              variants={cardVariants}
              className="glass-card rounded-2xl sm:rounded-3xl p-5 sm:p-8 hover:border-primary/30 transition-colors duration-500 group"
              whileHover={{ y: -3, transition: springs.standard }}
            >
              <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
                <motion.div
                  className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-br from-primary/20 to-accent/10 text-primary group-hover:scale-105 transition-transform duration-500"
                  whileHover={{ y: -2, rotate: 8, scale: 1.1 }}
                  transition={springs.bouncy}
                >
                  <Award className="w-5 h-5 sm:w-6 sm:h-6" />
                </motion.div>
                <div className="flex-1">
                  <h4 className="font-bold text-base sm:text-lg mb-1">{cert.title}</h4>
                  <p className="text-primary font-medium text-sm sm:text-base">{cert.issuer}</p>
                  {cert.location && (
                    <p className="text-sm text-muted-foreground">{cert.location}</p>
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
                <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                  <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>{cert.period}</span>
                </div>
                <span className={`inline-flex items-center gap-1.5 text-xs sm:text-sm px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full font-medium ${
                  cert.status === "Completed"
                    ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                    : "bg-amber-500/15 text-amber-400 border border-amber-500/30"
                }`}>
                  {cert.status === "In Progress" && <Sparkles className="w-3 h-3" />}
                  {cert.status}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CertificationsSection;
