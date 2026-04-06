import { motion } from "framer-motion";
import { Award, Calendar, Sparkles, BadgeCheck } from "lucide-react";
import { springs } from "@/lib/springs";
import { useGSAPTextReveal } from "@/hooks/useGSAPTextReveal";

const certifications = [
  {
    title: "Data Analytics",
    issuer: "BrainStation",
    location: "Toronto, ON",
    period: "Nov 2023 – Jan 2024",
    status: "Completed",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    title: "SQL for Healthcare Professionals",
    issuer: "LinkedIn Learning",
    period: "October 2024",
    status: "Completed",
    gradient: "from-sky-500 to-blue-500",
  },
  {
    title: "Manage GA4 Data and Learn to Read Reports",
    issuer: "Google Analytics",
    period: "February 2026",
    status: "Completed",
    gradient: "from-amber-500 to-orange-500",
  },
  {
    title: "CompTIA A+ Core 1 and Core 2",
    issuer: "CompTIA CertMaster Learn",
    period: "September 2025 – Present",
    status: "In Progress",
    gradient: "from-red-500 to-rose-500",
  },
  {
    title: "QBO ProAdvisor Certification",
    issuer: "QuickBooks Online",
    period: "March 2026 – October 2027",
    status: "Completed",
    gradient: "from-emerald-500 to-green-500",
  },
  {
    title: "Salesforce CRM Trailblazer Badge",
    issuer: "Salesforce",
    period: "March 2026",
    status: "Completed",
    gradient: "from-indigo-500 to-blue-500",
  },
  {
    title: "Process Mapping for Business Analyst",
    issuer: "Salesforce Trailhead",
    period: "March 2026",
    status: "Completed",
    gradient: "from-violet-500 to-purple-500",
  },
  {
    title: "Essential Business Analyst Skills",
    issuer: "Salesforce Trailhead",
    period: "March 2026",
    status: "Completed",
    gradient: "from-purple-500 to-pink-500",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.06,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
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
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {certifications.map((cert) => (
            <motion.div
              key={cert.title}
              variants={cardVariants}
              className="glass-card rounded-2xl sm:rounded-3xl overflow-hidden group"
              whileHover={{ y: -4, transition: springs.standard }}
            >
              {/* Colored top accent bar */}
              <div className={`h-1 bg-gradient-to-r ${cert.gradient}`} />

              <div className="p-6 sm:p-8">
                {/* Header row: icon + status */}
                <div className="flex items-start justify-between mb-5">
                  <motion.div
                    className={`p-3 sm:p-3.5 rounded-xl bg-gradient-to-br ${cert.gradient} text-white shadow-lg`}
                    whileHover={{ scale: 1.08, rotate: 6 }}
                    transition={springs.bouncy}
                  >
                    <Award className="w-5 h-5 sm:w-6 sm:h-6" />
                  </motion.div>
                  <span className={`inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full font-medium ${
                    cert.status === "Completed"
                      ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                      : "bg-amber-500/15 text-amber-400 border border-amber-500/30"
                  }`}>
                    {cert.status === "In Progress"
                      ? <Sparkles className="w-3 h-3" />
                      : <BadgeCheck className="w-3 h-3" />
                    }
                    {cert.status}
                  </span>
                </div>

                {/* Title + Issuer */}
                <h4 className="font-bold text-lg sm:text-xl mb-2 leading-tight">{cert.title}</h4>
                <p className="text-primary font-semibold text-sm sm:text-base mb-1">{cert.issuer}</p>
                {cert.location && (
                  <p className="text-sm text-muted-foreground mb-1">{cert.location}</p>
                )}

                {/* Period */}
                <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground mt-4 pt-4 border-t border-border/40">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{cert.period}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CertificationsSection;
