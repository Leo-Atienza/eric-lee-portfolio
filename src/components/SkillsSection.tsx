import { motion } from "framer-motion";
import { Database, BarChart3, Wrench, Users, FileText, Calculator } from "lucide-react";
import { springs } from "@/lib/springs";
import { useGSAPTextReveal } from "@/hooks/useGSAPTextReveal";

interface Skill {
  name: string;
  proficiency?: number;
}

interface SkillCategory {
  icon: typeof Database;
  title: string;
  skills: Skill[];
  gradient: string;
  span: string;
  type: "bars" | "badges";
}

const skillCategories: SkillCategory[] = [
  {
    icon: Database,
    title: "Data Analysis",
    skills: [
      { name: "SQL Querying", proficiency: 95 },
      { name: "Data Cleaning", proficiency: 90 },
      { name: "Data Validation", proficiency: 90 },
      { name: "Key Performance Indicators", proficiency: 88 },
      { name: "Trend Analysis", proficiency: 85 },
      { name: "Insight Generation", proficiency: 85 },
      { name: "Data Quality Checks", proficiency: 85 },
      { name: "Dashboard Planning", proficiency: 82 },
      { name: "ETL Process", proficiency: 80 },
      { name: "Data Standardization", proficiency: 80 },
      { name: "Data Profiling", proficiency: 75 },
    ],
    gradient: "from-blue-500 to-cyan-500",
    span: "md:col-span-1 md:row-span-2",
    type: "bars",
  },
  {
    icon: BarChart3,
    title: "Business Analysis",
    skills: [
      { name: "Requirements Gathering", proficiency: 90 },
      { name: "Business Process Mapping", proficiency: 88 },
      { name: "Stakeholder Management", proficiency: 88 },
      { name: "Process Improvement", proficiency: 85 },
      { name: "User Stories", proficiency: 85 },
      { name: "Acceptance Criteria", proficiency: 82 },
      { name: "Gap Analysis", proficiency: 82 },
      { name: "Impact Analysis", proficiency: 80 },
      { name: "Workflow Optimization", proficiency: 80 },
      { name: "Agile Principles", proficiency: 78 },
    ],
    gradient: "from-purple-500 to-pink-500",
    span: "md:col-span-1",
    type: "bars",
  },
  {
    icon: Wrench,
    title: "Tools & Technologies",
    skills: [
      { name: "SQL", proficiency: 95 },
      { name: "Excel", proficiency: 92 },
      { name: "Power BI", proficiency: 90 },
      { name: "Microsoft Office", proficiency: 90 },
      { name: "Python", proficiency: 85 },
      { name: "Generative AI", proficiency: 85 },
      { name: "Prompt Engineering", proficiency: 85 },
      { name: "Tableau", proficiency: 82 },
      { name: "Power Query", proficiency: 80 },
      { name: "Jira", proficiency: 78 },
      { name: "Scrum", proficiency: 78 },
      { name: "Confluence", proficiency: 75 },
      { name: "SharePoint", proficiency: 75 },
      { name: "VBA", proficiency: 75 },
    ],
    gradient: "from-orange-500 to-amber-500",
    span: "md:col-span-1 md:row-span-2",
    type: "bars",
  },
  {
    icon: FileText,
    title: "Reporting",
    skills: [
      { name: "Data Visualization", proficiency: 92 },
      { name: "Interactive Dashboards", proficiency: 90 },
      { name: "KPI Tracking", proficiency: 88 },
      { name: "Management Reporting", proficiency: 85 },
      { name: "Executive Summaries", proficiency: 82 },
      { name: "Ad Hoc Reporting", proficiency: 80 },
      { name: "Storytelling", proficiency: 80 },
    ],
    gradient: "from-emerald-500 to-teal-500",
    span: "md:col-span-1",
    type: "bars",
  },
  {
    icon: Calculator,
    title: "Finance & Accounting",
    skills: [
      { name: "GAAP" },
      { name: "IFRS" },
      { name: "ASPE" },
      { name: "Accounts Payable/Receivable" },
      { name: "Tax Compliance" },
      { name: "Reconciliation" },
      { name: "Financial Reporting" },
      { name: "QuickBooks Online (ProAdvisor Certified)" },
      { name: "SAP" },
    ],
    gradient: "from-green-600 to-emerald-700",
    span: "md:col-span-3",
    type: "badges",
  },
  {
    icon: Users,
    title: "Soft Skills",
    skills: [
      { name: "Analytical Thinking" },
      { name: "Problem Solving" },
      { name: "Written and Verbal Communication" },
      { name: "Attention to Detail" },
      { name: "Decision Making" },
      { name: "Cross-Functional Communication" },
      { name: "Collaboration" },
      { name: "Time Management" },
      { name: "Adaptability" },
      { name: "Stakeholder Presentation" },
      { name: "Prioritization" },
    ],
    gradient: "from-rose-500 to-red-500",
    span: "md:col-span-3",
    type: "badges",
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
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, hsl(var(--primary) / 0.05), transparent 70%)'
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

              {category.type === "bars" ? (
                <div className="space-y-3 sm:space-y-4">
                  {category.skills.map((skill, i) => (
                    <motion.div
                      key={skill.name}
                      variants={childFade}
                      className="group/bar"
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-sm text-muted-foreground group-hover/bar:text-foreground transition-colors duration-300">
                          {skill.name}
                        </span>
                        <span className="text-xs text-muted-foreground/60 tabular-nums">
                          {skill.proficiency}%
                        </span>
                      </div>
                      <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                        <motion.div
                          className={`h-full rounded-full bg-gradient-to-r ${category.gradient}`}
                          style={{ width: `${skill.proficiency}%`, transformOrigin: "left" }}
                          initial={{ scaleX: 0 }}
                          whileInView={{ scaleX: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: Math.min(i, 8) * 0.06, ...springs.standard }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <motion.div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <motion.span
                      key={skill.name}
                      variants={childFade}
                      className="skill-badge text-sm"
                      whileHover={{
                        scale: 1.06,
                        y: -1,
                        transition: springs.bouncy,
                      }}
                    >
                      {skill.name}
                    </motion.span>
                  ))}
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
