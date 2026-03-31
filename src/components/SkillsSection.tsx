import { motion } from "framer-motion";
import { Database, BarChart3, Wrench, Users, FileText } from "lucide-react";
import { springs } from "@/lib/springs";
import { useGSAPTextReveal } from "@/hooks/useGSAPTextReveal";

const skillCategories = [
  {
    icon: Database,
    title: "Data Analysis",
    skills: ["Data Cleaning", "Data Validation", "SQL Querying", "KPI Tracking", "Trend Analysis", "ETL Process", "Data Profiling"],
    gradient: "from-blue-500 to-cyan-500",
    span: "md:col-span-1 md:row-span-2",
  },
  {
    icon: BarChart3,
    title: "Business Analysis",
    skills: ["Process Mapping", "User Stories", "Gap Analysis", "Requirements Gathering", "Workflow Optimization", "Agile"],
    gradient: "from-purple-500 to-pink-500",
    span: "md:col-span-1",
  },
  {
    icon: Wrench,
    title: "Tools & Technologies",
    skills: ["SQL", "Python", "Power BI", "Tableau", "Excel", "VBA", "Power Query", "Jira", "Confluence"],
    gradient: "from-orange-500 to-amber-500",
    span: "md:col-span-1",
  },
  {
    icon: FileText,
    title: "Reporting",
    skills: ["Data Visualization", "Interactive Dashboards", "KPI Tracking", "Executive Summaries", "Storytelling"],
    gradient: "from-emerald-500 to-teal-500",
    span: "md:col-span-1",
  },
  {
    icon: Users,
    title: "Soft Skills",
    skills: ["Analytical Thinking", "Problem Solving", "Communication", "Stakeholder Management", "Collaboration"],
    gradient: "from-rose-500 to-red-500",
    span: "md:col-span-1",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.06,
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
      staggerChildren: 0.035,
      delayChildren: 0.08,
    },
  },
};

const childFade = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: springs.standard,
  },
};

const SkillsSection = () => {
  const textRef = useGSAPTextReveal();
  return (
    <section id="skills" className="relative py-20 sm:py-32 bg-gradient-to-b from-secondary/30 to-transparent">
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, hsl(217 91% 60% / 0.05), transparent 70%)'
        }}
      />

      <div ref={textRef} className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={springs.standard}
          className="text-center mb-16"
        >
          <h2 className="section-label mb-4">Skills</h2>
          <h3 className="section-title gsap-reveal">Technical & Professional Expertise</h3>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 auto-rows-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {skillCategories.map((category) => (
            <motion.div
              key={category.title}
              variants={cardVariants}
              className={`glass-card rounded-2xl sm:rounded-3xl p-5 sm:p-7 group ${category.span}`}
              whileHover={{ y: -4, transition: springs.standard }}
            >
              <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                <motion.div
                  className={`p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-gradient-to-br ${category.gradient} text-white shadow-lg`}
                  whileHover={{ scale: 1.08, rotate: 6 }}
                  transition={springs.bouncy}
                >
                  <category.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </motion.div>
                <h4 className="text-lg sm:text-xl font-bold">{category.title}</h4>
              </div>

              <motion.div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <motion.span
                    key={skill}
                    variants={childFade}
                    className="skill-badge text-sm"
                    whileHover={{
                      scale: 1.06,
                      y: -1,
                      transition: springs.bouncy,
                    }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
